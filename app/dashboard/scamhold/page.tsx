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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"
import {
  Lock, AlertTriangle, CheckCircle, Clock, Shield, Phone, CreditCard,
  Archive, Users, Search, Filter, Download, Eye, XCircle, ArrowRight, Pause, Loader2
} from "lucide-react"

// ── Backend → display mapping ───────────────────────────────────────────────

type ScamHoldRow = {
  id: string
  transactionType: string
  amountMinor: number | string
  currency: string
  recipient: string
  recipientRisk: string
  urgencyDetected: boolean
  secrecyDetected: boolean
  activeCommunication: boolean
  riskScore: number
  riskLevel: string
  status: string
  decisionNotes?: string | null
  createdAt?: string
  decidedAt?: string | null
}

type DisplayAction = {
  id: string
  type: string
  description: string
  risk: string
  riskScore: number
  trigger: string
  time: string
  status: string
  statusLabel: string
  amount: string
  destination: string
  caller: string
  callerFlag: string
}

const STATUS_MAP: Record<string, { key: string; label: string }> = {
  PENDING: { key: "held", label: "Pending" },
  BLOCK: { key: "blocked", label: "Blocked" },
  RELEASE_AFTER_VERIFICATION: { key: "released", label: "Released" },
  CONTINUE_ANYWAY: { key: "released", label: "Continued" },
  SEND_TO_TRUSTED_CONTACT: { key: "reviewed", label: "Sent to Contact" },
  SAVE_ONLY: { key: "reviewed", label: "Saved" },
}

function titleCase(s: string): string {
  return s.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatAmount(minor: number | string, currency: string): string {
  const n = Number(minor)
  if (!isFinite(n) || n <= 0) return "N/A"
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: currency || "USD" }).format(n / 100)
  } catch {
    return `${(n / 100).toFixed(2)} ${currency}`
  }
}

function timeAgo(iso?: string | null): string {
  if (!iso) return ""
  const then = new Date(iso).getTime()
  if (isNaN(then)) return ""
  const s = Math.max(0, Math.floor((Date.now() - then) / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m} min ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return d === 1 ? "Yesterday" : `${d} days ago`
}

function mapRow(r: ScamHoldRow): DisplayAction {
  const status = STATUS_MAP[r.status] ?? { key: "reviewed", label: titleCase(r.status ?? "Pending") }
  const flags: string[] = []
  if (r.urgencyDetected) flags.push("urgency")
  if (r.secrecyDetected) flags.push("secrecy")
  if (r.activeCommunication) flags.push("active call")
  const trigger = flags.length
    ? `Detected: ${flags.join(" + ")}`
    : `Flagged by ScamHold risk rules (score ${r.riskScore})`
  const amount = formatAmount(r.amountMinor, r.currency)
  return {
    id: r.id,
    type: titleCase(r.transactionType),
    description: `${amount === "N/A" ? "Transaction" : amount} to ${r.recipient}`,
    risk: (r.riskLevel ?? "medium").toLowerCase(),
    riskScore: r.riskScore,
    trigger,
    time: timeAgo(r.createdAt ?? r.decidedAt),
    status: status.key,
    statusLabel: status.label,
    amount,
    destination: r.recipient,
    caller: r.decisionNotes ?? "—",
    callerFlag: r.recipientRisk && r.recipientRisk !== "UNKNOWN" ? titleCase(r.recipientRisk) : "Risk flagged",
  }
}

const riskColors: Record<string, string> = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
}

const statusColors: Record<string, string> = {
  held: "bg-red-50 text-red-600",
  blocked: "bg-destructive/10 text-destructive",
  released: "bg-green-50 text-green-700",
  reviewed: "bg-muted text-muted-foreground",
}

async function fetchHistory(): Promise<DisplayAction[]> {
  const { data, error } = await backend.GET("/api/v1/scamhold/history")
  if (error || !data) throw new Error("Could not load ScamHold history")
  return (data as unknown as ScamHoldRow[]).map(mapRow)
}

export default function ScamHoldPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(
    isAuthenticated ? "scamhold-history" : null,
    fetchHistory,
  )
  const [selectedAction, setSelectedAction] = useState<DisplayAction | null>(null)
  const [showAlert, setShowAlert] = useState(true)
  const [filter, setFilter] = useState("all")

  const actions = data ?? []
  const filtered = actions.filter((a) => filter === "all" || a.status === filter)

  // Stats derived from real data.
  const activeHolds = actions.filter((a) => a.status === "held").length
  const blocked = actions.filter((a) => a.status === "blocked").length
  const topAlert = actions.find((a) => a.status === "held") ?? null

  return (
    <PageLayout role="individual" title="ScamHold AI™" subtitle="Smart holds on risky financial actions before harm occurs">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* High-Risk Alert Banner — only when there's a real active hold */}
        {showAlert && topAlert && (
          <Card className="p-4 border-red-300 bg-red-50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-red-800 text-sm">High-Risk Action Held — Review Required</p>
                <p className="text-sm text-red-700 mt-0.5">
                  {topAlert.description} was flagged ({topAlert.callerFlag}). Do not proceed until verified.
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8" onClick={() => setSelectedAction(topAlert)}>
                    <Eye className="h-3.5 w-3.5 mr-1" /> Review Hold
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 border-red-300 text-red-700">
                    <Users className="h-3.5 w-3.5 mr-1" /> Alert Trusted Contact
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 text-red-600" onClick={() => setShowAlert(false)}>
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Holds", value: String(activeHolds), color: "text-red-600", bg: "bg-red-50", icon: Pause },
            { label: "Blocked", value: String(blocked), color: "text-destructive", bg: "bg-destructive/10", icon: XCircle },
            { label: "Total Logged", value: String(actions.length), color: "text-primary", bg: "bg-primary/10", icon: Shield },
            { label: "Reviewed", value: String(actions.filter((a) => a.status === "reviewed").length), color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
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

        <Tabs defaultValue="holds">
          <TabsList>
            <TabsTrigger value="holds">Risky Action Log</TabsTrigger>
            <TabsTrigger value="settings">Hold Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="holds" className="space-y-4 mt-4">
            {/* Filters */}
            <div className="flex gap-3 flex-wrap items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search actions..." className="pl-9 h-9" />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40 h-9">
                  <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="held">Held</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="released">Released</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline" className="h-9">
                <Download className="h-3.5 w-3.5 mr-1.5" /> Export
              </Button>
            </div>

            {/* Table */}
            <Card className="divide-y divide-border overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2 bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <span>Action</span>
                <span>Risk</span>
                <span>Status</span>
                <span>Actions</span>
              </div>

              {/* States */}
              {!isAuthenticated ? (
                <div className="px-4 py-12 text-center text-sm text-muted-foreground">
                  Sign in to view your ScamHold activity.
                </div>
              ) : isLoading ? (
                <div className="px-4 py-12 flex items-center justify-center text-sm text-muted-foreground gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading your held actions...
                </div>
              ) : error ? (
                <div className="px-4 py-12 text-center text-sm text-destructive">
                  Couldn&apos;t load ScamHold history. Please try again.
                </div>
              ) : filtered.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">No risky actions held</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {actions.length === 0
                      ? "ScamHold is active. Flagged financial actions will appear here before they complete."
                      : "No actions match this filter."}
                  </p>
                </div>
              ) : (
                filtered.map((action) => (
                  <div key={action.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-4 items-center hover:bg-muted/20 transition-colors">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground">{action.id.slice(0, 8)}</span>
                        <span className="text-sm font-semibold text-foreground">{action.type}</span>
                        {action.time && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {action.time}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{action.description}</p>
                      <p className="text-xs text-primary mt-0.5">{action.trigger}</p>
                    </div>
                    <Badge className={`text-xs border-0 ${riskColors[action.risk] ?? riskColors.medium}`}>{action.riskScore}</Badge>
                    <Badge className={`text-xs border-0 capitalize ${statusColors[action.status] ?? statusColors.reviewed}`}>{action.statusLabel}</Badge>
                    <Button size="sm" variant="outline" className="h-8" onClick={() => setSelectedAction(action)}>
                      <Eye className="h-3.5 w-3.5 mr-1" /> Review
                    </Button>
                  </div>
                ))
              )}
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">ScamHold AI™ Settings</h3>
              </div>
              {[
                { label: "Auto-hold bank transfers over", options: ["$500", "$1,000", "$2,000", "$5,000"], default: "$1,000" },
                { label: "Transaction types monitored", options: ["All types", "Bank transfers only", "Crypto only", "Gift cards only"], default: "All types" },
                { label: "Hold duration before auto-release", options: ["2 hours", "4 hours", "24 hours", "Until manually released"], default: "4 hours" },
                { label: "Notify trusted contacts on hold", options: ["Immediately", "After 15 min", "Never"], default: "Immediately" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <label className="text-sm font-medium text-foreground">{s.label}</label>
                  <Select defaultValue={s.default}>
                    <SelectTrigger className="w-52 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {s.options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <Button size="sm">Save Settings</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Smart Hold Modal */}
      <Dialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              ScamHold AI™ — {selectedAction?.type}
            </DialogTitle>
            <DialogDescription>
              Review the flagged action before deciding how to proceed.
            </DialogDescription>
          </DialogHeader>
          {selectedAction && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Case ID</span><span className="font-mono font-semibold">{selectedAction.id.slice(0, 8)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Amount / Target</span><span className="font-semibold">{selectedAction.amount}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Destination</span><span className="font-semibold text-right max-w-52 truncate">{selectedAction.destination}</span></div>
                <div className="flex justify-between items-start gap-2"><span className="text-muted-foreground shrink-0">Risk Flag</span><Badge className="bg-red-100 text-red-700 border-0 text-xs text-right">{selectedAction.callerFlag}</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Risk Score</span><span className={`font-bold ${selectedAction.riskScore >= 90 ? "text-red-600" : "text-orange-600"}`}>{selectedAction.riskScore}/100</span></div>
              </div>
              <p className="text-sm text-muted-foreground bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <strong className="text-yellow-800">AI Observation:</strong> {selectedAction.trigger}. Do not provide account details or proceed with this action until independently verified.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white col-span-2">
                  <Pause className="h-3.5 w-3.5 mr-1.5" /> Keep Hold Active
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-3.5 w-3.5 mr-1.5" /> Call My Bank Directly
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="h-3.5 w-3.5 mr-1.5" /> Alert Trusted Contact
                </Button>
                <Button size="sm" variant="outline">
                  <Archive className="h-3.5 w-3.5 mr-1.5" /> Save Evidence
                </Button>
                <Button size="sm" variant="ghost" className="text-muted-foreground text-xs">
                  Continue Anyway (not recommended)
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  )
}
