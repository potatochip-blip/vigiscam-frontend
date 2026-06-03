'use client'

import { useState } from "react"
import useSWR from "swr"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"
import {
  Shield, AlertTriangle, CheckCircle, XCircle, Clock, Search,
  Download, Eye, Archive, Users, Copy, Flag, Link2, Loader2
} from "lucide-react"

// ── Backend → display mapping ───────────────────────────────────────────────

type WalletRow = {
  id: string
  network: string
  address: string
  addressValid: boolean
  reputation: string
  clipboardSwapDetected: boolean
  walletSwitched: boolean
  graphMatchScore?: number | null
  urgencyDetected: boolean
  secrecyDetected: boolean
  riskScore: number
  riskLevel: string
  decision?: string
  createdAt?: string
}

type DisplayWallet = {
  id: string
  address: string
  chain: string
  riskScore: number
  riskLevel: string
  flags: string[]
  firstSeen: string
  lastSeen: string
  checkedAt: string
  saved: boolean
}

const NETWORK_LABEL: Record<string, string> = {
  ETH: "Ethereum", BTC: "Bitcoin", TRX: "TRON", SOL: "Solana", BSC: "BNB Chain",
  MATIC: "Polygon", ARBITRUM: "Arbitrum", OPTIMISM: "Optimism", OTHER: "Other",
}

function inferNetwork(address: string): string {
  const a = address.trim()
  if (/^0x[0-9a-fA-F]{40}$/.test(a)) return "ETH"
  if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{20,}$/.test(a)) return "BTC"
  if (/^T[1-9A-HJ-NP-Za-km-z]{20,}$/.test(a)) return "TRX"
  return "OTHER"
}

function wgTitle(s?: string | null): string {
  return (s ?? "").toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function wgDate(iso?: string): string {
  if (!iso) return "—"
  const d = new Date(iso)
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString()
}

function wgTimeAgo(iso?: string): string {
  if (!iso) return ""
  const s = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000))
  if (isNaN(s)) return ""
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60); if (m < 60) return `${m} min ago`
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24); return d === 1 ? "1 day ago" : `${d} days ago`
}

function buildWalletFlags(r: WalletRow): string[] {
  const flags: string[] = []
  if (!r.addressValid) flags.push("Invalid address format for this network")
  if (r.reputation && r.reputation !== "UNKNOWN") flags.push(`Reputation: ${wgTitle(r.reputation)}`)
  if (r.clipboardSwapDetected) flags.push("Clipboard swap detected")
  if (r.walletSwitched) flags.push("Recipient wallet switched mid-transaction")
  if (r.graphMatchScore != null) flags.push(`Cluster match score ${r.graphMatchScore}/100`)
  if (r.urgencyDetected) flags.push("Urgency pressure detected")
  if (r.secrecyDetected) flags.push("Secrecy pressure detected")
  if (flags.length === 0) flags.push("No adverse intelligence found")
  return flags
}

function mapWallet(r: WalletRow): DisplayWallet {
  return {
    id: r.id,
    address: r.address,
    chain: NETWORK_LABEL[r.network] ?? wgTitle(r.network),
    riskScore: r.riskScore,
    riskLevel: (r.riskLevel ?? "medium").toLowerCase(),
    flags: buildWalletFlags(r),
    firstSeen: wgDate(r.createdAt),
    lastSeen: wgDate(r.createdAt),
    checkedAt: wgTimeAgo(r.createdAt),
    saved: !!r.decision && r.decision !== "PENDING",
  }
}

async function fetchWalletHistory(): Promise<DisplayWallet[]> {
  const { data, error } = await backend.GET("/api/v1/walletguard/history")
  if (error || !data) throw new Error("Could not load wallet check history")
  return (data as unknown as WalletRow[]).map(mapWallet)
}

const riskColors: Record<string, string> = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
}

const riskBarColors: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
}

export default function WalletGuardPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading, mutate } = useSWR(
    isAuthenticated ? "walletguard-history" : null,
    fetchWalletHistory,
  )
  const walletHistory = data ?? []

  const [address, setAddress] = useState("")
  const [checkResult, setCheckResult] = useState<DisplayWallet | null>(null)
  const [checking, setChecking] = useState(false)
  const [checkError, setCheckError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<DisplayWallet | null>(null)
  const [showClipboardAlert, setShowClipboardAlert] = useState(false)

  const runCheck = async () => {
    if (!address.trim()) return
    setChecking(true)
    setCheckError(null)
    try {
      const { data: res, error: err } = await backend.POST("/api/v1/walletguard/check", {
        body: { network: inferNetwork(address), address: address.trim() } as never,
      })
      if (err || !res) throw new Error("Check failed")
      setCheckResult(mapWallet(res as unknown as WalletRow))
      void mutate()
    } catch {
      setCheckError("Couldn't check that address. Please try again.")
    } finally {
      setChecking(false)
    }
  }

  return (
    <PageLayout role="individual" title="WalletGuard AI™" subtitle="Crypto wallet risk checks, clipboard swap alerts, and scam wallet reporting">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Clipboard Swap Alert */}
        <Dialog open={showClipboardAlert} onOpenChange={setShowClipboardAlert}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-orange-700">
                <AlertTriangle className="h-5 w-5" />
                Suspicious Wallet Address Detected
              </DialogTitle>
              <DialogDescription>
                Your clipboard may have been tampered with by malware.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm">
                <p className="font-bold text-orange-800 mb-1">Clipboard Swap Warning</p>
                <p className="text-orange-700">
                  The wallet address in your clipboard does not match the address you intended to paste.
                  Clipboard-hijacking malware replaces crypto addresses at the moment of paste.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-sm">
                <div><span className="text-muted-foreground">Intended address:</span><br /><code className="text-xs text-foreground">0x4f3a...d91c (verified)</code></div>
                <div><span className="text-muted-foreground">Clipboard address:</span><br /><code className="text-xs text-red-600">bc1q7n9k...HIGH RISK</code></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white col-span-2">
                  <XCircle className="h-3.5 w-3.5 mr-1.5" /> Block Transaction — Scan Device
                </Button>
                <Button size="sm" variant="outline">
                  <Archive className="h-3.5 w-3.5 mr-1.5" /> Save Evidence
                </Button>
                <Button size="sm" variant="ghost" className="text-muted-foreground text-xs" onClick={() => setShowClipboardAlert(false)}>
                  Continue Anyway (not recommended)
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Wallets Checked", value: String(walletHistory.length), color: "text-primary", bg: "bg-primary/10", icon: Search },
            { label: "High Risk Found", value: String(walletHistory.filter((w) => w.riskLevel === "high" || w.riskLevel === "critical").length), color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle },
            { label: "Saved / Decided", value: String(walletHistory.filter((w) => w.saved).length), color: "text-orange-600", bg: "bg-orange-50", icon: Archive },
            { label: "Low Risk", value: String(walletHistory.filter((w) => w.riskLevel === "low").length), color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="p-5">
                <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`h-4.5 w-4.5 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </Card>
            )
          })}
        </div>

        {/* Demo clipboard alert button */}
        <Card className="p-4 border-orange-200 bg-orange-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Copy className="h-5 w-5 text-orange-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-orange-800">Clipboard Swap Protection — Active</p>
              <p className="text-xs text-orange-700">WalletGuard AI™ monitors your clipboard for address-hijacking malware during crypto transactions.</p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 flex-shrink-0" onClick={() => setShowClipboardAlert(true)}>
            Simulate Alert
          </Button>
        </Card>

        <Tabs defaultValue="check">
          <TabsList>
            <TabsTrigger value="check">Check a Wallet</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="report">Report / Save</TabsTrigger>
          </TabsList>

          {/* Wallet Checker Tab */}
          <TabsContent value="check" className="mt-4 space-y-4">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Wallet Address Risk Check</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Paste a crypto wallet address to check it against VIGISCAM™&apos;s scam wallet intelligence database.
              </p>
              <div className="flex gap-3">
                <Input
                  placeholder="Paste wallet address (BTC, ETH, TRON, SOL...)"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="h-9 font-mono text-sm"
                />
                <Button className="flex-shrink-0 h-9" onClick={runCheck} disabled={checking || !address.trim()}>
                  {checking ? (<><Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> Checking...</>) : "Check"}
                </Button>
              </div>
              {checkError && <p className="text-sm text-destructive">{checkError}</p>}

              {checkResult && (
                <div className={`rounded-lg border p-5 space-y-4 ${checkResult.riskLevel === "critical" ? "border-red-300 bg-red-50" : checkResult.riskLevel === "high" ? "border-orange-200 bg-orange-50" : "border-green-200 bg-green-50"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {checkResult.riskLevel === "critical" || checkResult.riskLevel === "high"
                          ? <XCircle className="h-5 w-5 text-red-600" />
                          : <CheckCircle className="h-5 w-5 text-green-600" />}
                        <span className={`font-bold text-sm ${checkResult.riskLevel === "critical" ? "text-red-800" : checkResult.riskLevel === "high" ? "text-orange-800" : "text-green-800"}`}>
                          Risk Level: {checkResult.riskLevel.toUpperCase()} ({checkResult.riskScore}/100)
                        </span>
                      </div>
                      <code className="text-xs text-muted-foreground break-all">{checkResult.address}</code>
                    </div>
                    <Badge className={`text-xs border-0 flex-shrink-0 ${riskColors[checkResult.riskLevel]}`}>{checkResult.chain}</Badge>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Risk Score</span>
                      <span className="text-xs font-bold">{checkResult.riskScore}/100</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${riskBarColors[checkResult.riskLevel]}`} style={{ width: `${checkResult.riskScore}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-foreground">Intelligence Flags:</p>
                    {checkResult.flags.map((flag, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <AlertTriangle className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        {flag}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8">
                      <Archive className="h-3.5 w-3.5 mr-1.5" /> Save to Evidence Vault
                    </Button>
                    <Button size="sm" variant="outline" className="h-8">
                      <Flag className="h-3.5 w-3.5 mr-1.5" /> Report to VIGISCAM™
                    </Button>
                    <Button size="sm" variant="outline" className="h-8">
                      <Users className="h-3.5 w-3.5 mr-1.5" /> Alert Trusted Contact
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 text-muted-foreground text-xs">
                      Continue Anyway (not recommended)
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-4 space-y-4">
            <div className="flex gap-3 flex-wrap items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search wallet checks..." className="pl-9 h-9" />
              </div>
              <Button size="sm" variant="outline" className="h-9">
                <Download className="h-3.5 w-3.5 mr-1.5" /> Export
              </Button>
            </div>
            <div className="space-y-3">
              {!isAuthenticated ? (
                <Card className="p-12 text-center text-sm text-muted-foreground">
                  Sign in to view your wallet check history.
                </Card>
              ) : isLoading ? (
                <Card className="p-12 flex items-center justify-center text-sm text-muted-foreground gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading wallet checks...
                </Card>
              ) : error ? (
                <Card className="p-12 text-center text-sm text-destructive">
                  Couldn&apos;t load wallet history. Please try again.
                </Card>
              ) : walletHistory.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">No wallet checks yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Paste a crypto address in the Check tab to screen it against VIGISCAM wallet intelligence.
                  </p>
                </Card>
              ) : (
                walletHistory.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-mono text-muted-foreground">{item.id.slice(0, 8)}</span>
                          <Badge className={`text-xs border-0 ${riskColors[item.riskLevel] ?? riskColors.medium}`}>{item.riskLevel.toUpperCase()} — {item.riskScore}/100</Badge>
                          <Badge className="text-xs border-0 bg-muted text-muted-foreground">{item.chain}</Badge>
                          {item.checkedAt && <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{item.checkedAt}</span>}
                        </div>
                        <code className="text-xs text-muted-foreground break-all">{item.address.substring(0, 42)}{item.address.length > 42 ? "..." : ""}</code>
                        <div className="flex gap-1 mt-1.5 flex-wrap">
                          {item.flags.slice(0, 2).map((f, i) => (
                            <Badge key={i} className="text-[10px] border-0 bg-muted text-muted-foreground">{f}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.saved && <Badge className="text-xs border-0 bg-blue-50 text-blue-700">Decided</Badge>}
                        <Button size="sm" variant="ghost" className="h-8" onClick={() => setSelectedItem(item)}>
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Report Tab */}
          <TabsContent value="report" className="mt-4">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <Flag className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Report a Suspicious Wallet</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Submit a suspicious wallet address to VIGISCAM™ intelligence. Your submission is reviewed by analysts and, if verified, added to the scam wallet registry.
              </p>
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Wallet Address</Label>
                  <Input placeholder="Full wallet address" className="h-9 font-mono text-sm" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Blockchain / Network</Label>
                  <Input placeholder="e.g. Bitcoin, Ethereum, TRON, Solana" className="h-9" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">How did you encounter this wallet?</Label>
                  <Input placeholder="e.g. romance contact asked me to send crypto here" className="h-9" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Any supporting evidence (optional)</Label>
                  <Input placeholder="Screenshot filename, call recording, URL..." className="h-9" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>This wallet will be cross-referenced with SCAMZY™ network data and existing victim reports.</span>
                </div>
                <Button size="sm">Submit Report</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Detail Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Wallet Risk Detail — {selectedItem?.id}</DialogTitle>
              <DialogDescription>Full intelligence report for this wallet address</DialogDescription>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Address</span><code className="text-xs font-semibold max-w-52 truncate">{selectedItem.address}</code></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Chain</span><span className="font-semibold">{selectedItem.chain}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Risk Score</span><span className={`font-bold ${selectedItem.riskScore >= 90 ? "text-red-600" : "text-orange-600"}`}>{selectedItem.riskScore}/100</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">First Seen</span><span>{selectedItem.firstSeen}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Last Seen</span><span>{selectedItem.lastSeen}</span></div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">Intelligence Flags:</p>
                  {selectedItem.flags.map((flag, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground mb-1.5">
                      <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {flag}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1"><Archive className="h-3.5 w-3.5 mr-1.5" /> Save to Evidence Vault</Button>
                  <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  )
}
