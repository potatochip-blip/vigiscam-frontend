'use client'

import { useState } from "react"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  CreditCard, AlertTriangle, Shield, Users, Archive, CheckCircle,
  XCircle, Eye, Clock, Search, Download, Phone
} from "lucide-react"

const gcHistory = [
  {
    id: "GC-001",
    brand: "Google Play",
    amount: "$500",
    requestedBy: "Caller — ATO Impersonation",
    time: "1h ago",
    result: "blocked",
    reason: "Gift card payment for government debt is a scam tactic. ATO does not accept gift cards.",
    elderMode: true,
    approvalNeeded: true,
  },
  {
    id: "GC-002",
    brand: "Apple iTunes",
    amount: "$200",
    requestedBy: "Text message — Fake tech support",
    time: "3 days ago",
    result: "blocked",
    reason: "Caller instructed not to tell anyone about the code. Classic secrecy pressure.",
    elderMode: false,
    approvalNeeded: false,
  },
  {
    id: "GC-003",
    brand: "Steam",
    amount: "$50",
    requestedBy: "Self (personal purchase)",
    time: "5 days ago",
    result: "approved",
    reason: "Initiated by user from trusted device. No call or pressure detected.",
    elderMode: false,
    approvalNeeded: false,
  },
  {
    id: "GC-004",
    brand: "eBay",
    amount: "$300",
    requestedBy: "Romance contact — Instagram DM",
    time: "1 week ago",
    result: "flagged",
    reason: "Gift card requested by online-only contact after 3-week grooming conversation.",
    elderMode: true,
    approvalNeeded: true,
  },
]

const resultColors: Record<string, string> = {
  blocked: "bg-red-100 text-red-700",
  approved: "bg-green-100 text-green-700",
  flagged: "bg-yellow-100 text-yellow-700",
  pending: "bg-blue-100 text-blue-700",
}

export default function GiftCardGuardPage() {
  const [scanResult, setScanResult] = useState<null | "safe" | "scam" | "suspicious">(null)
  const [scanning, setScanning] = useState(false)
  const [selectedItem, setSelectedItem] = useState<typeof gcHistory[0] | null>(null)
  const [showDoNotReveal, setShowDoNotReveal] = useState(false)

  const runScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanResult("scam")
      setScanning(false)
      setShowDoNotReveal(true)
    }, 1500)
  }

  return (
    <PageLayout role="individual" title="GiftCardGuard™" subtitle="AI-powered protection against gift card scam requests">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Do Not Reveal Alert Modal */}
        <Dialog open={showDoNotReveal} onOpenChange={setShowDoNotReveal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                Do Not Reveal the Gift Card Code
              </DialogTitle>
              <DialogDescription>
                This request has been identified as a scam attempt.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground bg-red-50 border border-red-200 rounded-lg p-3">
                <strong className="text-red-800">Stop immediately.</strong> Do not read the gift card number or PIN to anyone over the phone, by text, or online.
                Legitimate organisations — including the ATO, banks, police, and tech companies — never request payment via gift cards.
              </p>
              <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1.5">
                <p className="font-semibold text-foreground">What to do now:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>1. Hang up or stop responding</li>
                  <li>2. Do not return the call to the same number</li>
                  <li>3. Contact your trusted contact or family member</li>
                  <li>4. Report the number to Scamwatch</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white col-span-2">
                  <Phone className="h-3.5 w-3.5 mr-1.5" /> Call a Trusted Contact Now
                </Button>
                <Button size="sm" variant="outline">
                  <Archive className="h-3.5 w-3.5 mr-1.5" /> Save Evidence
                </Button>
                <Button size="sm" variant="ghost" className="text-muted-foreground text-xs" onClick={() => setShowDoNotReveal(false)}>
                  I understand — dismiss
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Scam Requests Blocked", value: "3", color: "text-red-600", bg: "bg-red-50", icon: XCircle },
            { label: "Estimated Saved", value: "$1,000", color: "text-green-600", bg: "bg-green-50", icon: Shield },
            { label: "Elder Mode Protected", value: "Active", color: "text-primary", bg: "bg-primary/10", icon: Users },
            { label: "Scan Accuracy", value: "98%", color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
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

        <Tabs defaultValue="scan">
          <TabsList>
            <TabsTrigger value="scan">Scan a Request</TabsTrigger>
            <TabsTrigger value="history">Evidence History</TabsTrigger>
            <TabsTrigger value="family">Family Approval Flow</TabsTrigger>
            <TabsTrigger value="settings">Elder Protection</TabsTrigger>
          </TabsList>

          {/* Scan Tab */}
          <TabsContent value="scan" className="mt-4 space-y-4">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Scan a Gift Card Request</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter the brand, amount, and who is asking. GiftCardGuard™ will analyse the request for scam indicators.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Gift Card Brand</Label>
                  <Select defaultValue="google">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Google Play", "Apple iTunes", "Steam", "Amazon", "eBay", "Visa/Mastercard Prepaid", "Other"].map(b => (
                        <SelectItem key={b} value={b.toLowerCase()}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Amount Requested</Label>
                  <Input placeholder="e.g. $500" className="h-9" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Who is asking?</Label>
                  <Select defaultValue="caller">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Incoming phone caller", "Text message", "Email", "Online contact (social media)", "In person", "Government/authority"].map(w => (
                        <SelectItem key={w} value={w.toLowerCase()}>{w}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Stated Reason</Label>
                  <Input placeholder="e.g. Tax debt, computer virus fix..." className="h-9" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" id="secrecy" className="rounded" />
                <label htmlFor="secrecy">They told me not to tell anyone about this purchase</label>
              </div>
              <Button className="w-full sm:w-auto" onClick={runScan} disabled={scanning}>
                {scanning ? "Analysing..." : "Run GiftCardGuard™ Scan"}
              </Button>

              {scanResult && (
                <div className={`rounded-lg p-4 border mt-2 ${scanResult === "scam" ? "bg-red-50 border-red-200" : scanResult === "suspicious" ? "bg-yellow-50 border-yellow-200" : "bg-green-50 border-green-200"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {scanResult === "scam" ? <XCircle className="h-5 w-5 text-red-600" /> : scanResult === "suspicious" ? <AlertTriangle className="h-5 w-5 text-yellow-600" /> : <CheckCircle className="h-5 w-5 text-green-600" />}
                    <span className={`font-bold text-sm ${scanResult === "scam" ? "text-red-800" : scanResult === "suspicious" ? "text-yellow-800" : "text-green-800"}`}>
                      {scanResult === "scam" ? "HIGH RISK — Likely a Scam" : scanResult === "suspicious" ? "Suspicious — Proceed with Caution" : "Low Risk — Appears Safe"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {scanResult === "scam"
                      ? "Gift card payments demanded by callers claiming to be from government agencies, banks, or tech companies are a known scam tactic. 97% confidence this is fraudulent."
                      : scanResult === "suspicious"
                      ? "This request has some unusual patterns. Verify the requester's identity through an independent channel before proceeding."
                      : "No scam indicators detected. However, always verify the identity of the recipient before purchasing any gift card."}
                  </p>
                  {scanResult === "scam" && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8">
                        <Archive className="h-3.5 w-3.5 mr-1.5" /> Save Evidence
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 border-red-300 text-red-700">
                        <Users className="h-3.5 w-3.5 mr-1.5" /> Alert Trusted Contact
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-4 space-y-4">
            <div className="flex gap-3 flex-wrap items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search gift card history..." className="pl-9 h-9" />
              </div>
              <Button size="sm" variant="outline" className="h-9">
                <Download className="h-3.5 w-3.5 mr-1.5" /> Export Evidence
              </Button>
            </div>
            <Card className="divide-y divide-border overflow-hidden">
              {gcHistory.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-4 hover:bg-muted/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono text-muted-foreground">{item.id}</span>
                      <span className="text-sm font-semibold text-foreground">{item.brand} — {item.amount}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {item.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.requestedBy}</p>
                    <p className="text-xs text-primary mt-0.5">{item.reason}</p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {item.elderMode && <Badge className="text-[10px] border-0 bg-blue-50 text-blue-700">Elder Mode</Badge>}
                      {item.approvalNeeded && <Badge className="text-[10px] border-0 bg-orange-50 text-orange-700">Approval Required</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className={`text-xs border-0 capitalize ${resultColors[item.result]}`}>{item.result}</Badge>
                    <Button size="sm" variant="ghost" className="h-8" onClick={() => setSelectedItem(item)}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </Card>
          </TabsContent>

          {/* Family Approval Tab */}
          <TabsContent value="family" className="mt-4">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Family Approval Flow</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                When Elder Protection Mode is active, any gift card request over the threshold will require approval from a designated family member before it can be acted on.
              </p>
              <div className="space-y-3">
                {[
                  { name: "Margaret Smith", relation: "Primary Approver", status: "Active", notifyOn: ["Any gift card over $50"] },
                  { name: "James Smith", relation: "Secondary Approver", status: "Active", notifyOn: ["Over $200 if primary unavailable"] },
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary text-sm">{c.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{c.name} <span className="text-muted-foreground font-normal">— {c.relation}</span></p>
                        <p className="text-xs text-muted-foreground">{c.notifyOn[0]}</p>
                      </div>
                    </div>
                    <Badge className="text-xs border-0 bg-green-50 text-green-700">{c.status}</Badge>
                  </div>
                ))}
              </div>
              <Button size="sm" variant="outline">Manage Approvers</Button>
            </Card>
          </TabsContent>

          {/* Elder Protection Tab */}
          <TabsContent value="settings" className="mt-4">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-3 mb-1">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Elder Protection Mode</h3>
                <Badge className="text-xs border-0 bg-blue-50 text-blue-700 ml-auto">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Elder Protection Mode applies extra scrutiny to any gift card purchase, regardless of context. All purchases require family approval above the threshold.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Elder Protection Mode", default: true },
                  { label: "Require family approval for any gift card purchase", default: true },
                  { label: "Block all gift card purchases during active calls", default: true },
                  { label: "Alert trusted contact on any flagged gift card scan", default: true },
                  { label: "Show 'Do Not Reveal Code' warning every time", default: false },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <Label className="text-sm font-medium text-foreground">{s.label}</Label>
                    <Switch defaultChecked={s.default} />
                  </div>
                ))}
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Approval threshold (require approval above)</Label>
                <Select defaultValue="$50">
                  <SelectTrigger className="w-40 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["$0 (always)", "$50", "$100", "$200", "$500"].map(v => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button size="sm">Save Settings</Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Evidence detail modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Evidence Detail — {selectedItem?.id}</DialogTitle>
              <DialogDescription>GiftCardGuard™ scan result and evidence record</DialogDescription>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Brand</span><span className="font-semibold">{selectedItem.brand}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-semibold">{selectedItem.amount}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Requested by</span><span className="font-semibold text-right max-w-48 truncate">{selectedItem.requestedBy}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Result</span><Badge className={`text-xs border-0 capitalize ${resultColors[selectedItem.result]}`}>{selectedItem.result}</Badge></div>
                </div>
                <p className="text-sm text-muted-foreground">{selectedItem.reason}</p>
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
