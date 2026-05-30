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
import {
  Lock, AlertTriangle, CheckCircle, Clock, Shield, Phone, CreditCard,
  Archive, Users, Search, Filter, Download, Eye, XCircle, ArrowRight, Pause
} from "lucide-react"

const riskyActions = [
  {
    id: "SH-001",
    type: "Bank Transfer",
    description: "Transfer $4,800 to 'Investment Account' — new payee, never used before",
    risk: "critical",
    riskScore: 97,
    trigger: "New payee + caller pressure language detected",
    time: "2 min ago",
    status: "held",
    amount: "$4,800",
    destination: "BSB 062-001 Acct 12345678",
    caller: "+61 2 9876 5432",
    callerFlag: "Impersonating ANZ Fraud Team",
  },
  {
    id: "SH-002",
    type: "Gift Card Purchase",
    description: "Request to purchase $500 Google Play gift cards at Woolworths",
    risk: "high",
    riskScore: 89,
    trigger: "Gift card request during phone call — ATO impersonation script match",
    time: "1h ago",
    status: "held",
    amount: "$500",
    destination: "Google Play (gift card)",
    caller: "+61 1300 555 987",
    callerFlag: "Impersonating Australian Taxation Office",
  },
  {
    id: "SH-003",
    type: "Remote Access Approval",
    description: "AnyDesk connection request from unknown party ID 492-837-124",
    risk: "critical",
    riskScore: 95,
    trigger: "Remote access during financial conversation",
    time: "3h ago",
    status: "blocked",
    amount: "N/A",
    destination: "AnyDesk ID: 492-837-124",
    caller: "+1 800 555 0199",
    callerFlag: "Impersonating Microsoft Support",
  },
  {
    id: "SH-004",
    type: "Crypto Purchase",
    description: "Attempt to send 0.42 ETH to external wallet via Coinbase",
    risk: "high",
    riskScore: 82,
    trigger: "Crypto transfer prompted by romance contact over 6 weeks",
    time: "Yesterday",
    status: "released",
    amount: "0.42 ETH (~$1,240)",
    destination: "0x4f3a...d91c",
    caller: "alex_investor_sg (Instagram)",
    callerFlag: "Suspected pig-butchering romance",
  },
  {
    id: "SH-005",
    type: "Password Reset",
    description: "Bank portal password reset while caller remained on line",
    risk: "medium",
    riskScore: 71,
    trigger: "Credential change during active call",
    time: "2 days ago",
    status: "reviewed",
    amount: "N/A",
    destination: "CommBank portal",
    caller: "+61 2 1111 2222",
    callerFlag: "Possible social engineering",
  },
]

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

export default function ScamHoldPage() {
  const [selectedAction, setSelectedAction] = useState<typeof riskyActions[0] | null>(null)
  const [showAlert, setShowAlert] = useState(true)
  const [filter, setFilter] = useState("all")

  const filtered = riskyActions.filter(a => filter === "all" || a.status === filter)

  return (
    <PageLayout role="individual" title="ScamHold AI™" subtitle="Smart holds on risky financial actions before harm occurs">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* High-Risk Alert Banner */}
        {showAlert && (
          <Card className="p-4 border-red-300 bg-red-50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-red-800 text-sm">High-Risk Payment Detected — Action Required</p>
                <p className="text-sm text-red-700 mt-0.5">
                  A $4,800 bank transfer has been flagged and paused. The caller is impersonating ANZ&apos;s fraud team.
                  Do not proceed until verified.
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8" onClick={() => setSelectedAction(riskyActions[0])}>
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
            { label: "Active Holds", value: "2", color: "text-red-600", bg: "bg-red-50", icon: Pause },
            { label: "Blocked Today", value: "1", color: "text-destructive", bg: "bg-destructive/10", icon: XCircle },
            { label: "Total Saved (Est.)", value: "$6,540", color: "text-green-600", bg: "bg-green-50", icon: Shield },
            { label: "Hold Accuracy", value: "96%", color: "text-primary", bg: "bg-primary/10", icon: CheckCircle },
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
            <TabsTrigger value="trusted">Trusted Contact Review</TabsTrigger>
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
              {filtered.map((action) => (
                <div key={action.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-4 items-center hover:bg-muted/20 transition-colors">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono text-muted-foreground">{action.id}</span>
                      <span className="text-sm font-semibold text-foreground">{action.type}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {action.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{action.description}</p>
                    <p className="text-xs text-primary mt-0.5">{action.trigger}</p>
                  </div>
                  <Badge className={`text-xs border-0 ${riskColors[action.risk]}`}>{action.riskScore}</Badge>
                  <Badge className={`text-xs border-0 capitalize ${statusColors[action.status]}`}>{action.status}</Badge>
                  <Button size="sm" variant="outline" className="h-8" onClick={() => setSelectedAction(action)}>
                    <Eye className="h-3.5 w-3.5 mr-1" /> Review
                  </Button>
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="trusted" className="mt-4">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Trusted Contact Review Queue</h3>
              </div>
              <p className="text-sm text-muted-foreground">These contacts have been notified of holds and can approve or flag the action on your behalf.</p>
              {[
                { name: "Margaret Smith", relation: "Mother", status: "Notified", time: "2 min ago", action: "SH-001 — $4,800 Transfer" },
                { name: "James Smith", relation: "Son", status: "Reviewed — Flagged", time: "1h ago", action: "SH-002 — Gift Card Purchase" },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/40 rounded-lg gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary text-sm">{c.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{c.name} <span className="text-muted-foreground font-normal">— {c.relation}</span></p>
                      <p className="text-xs text-muted-foreground">{c.action}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge className={`text-xs border-0 ${c.status.includes("Flagged") ? "bg-red-100 text-red-700" : "bg-blue-50 text-blue-700"}`}>{c.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{c.time}</p>
                  </div>
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">ScamHold AI™ Settings</h3>
              </div>
              {[
                { label: "Auto-hold bank transfers over", type: "select", options: ["$500", "$1,000", "$2,000", "$5,000"], default: "$1,000" },
                { label: "Transaction types monitored", type: "select", options: ["All types", "Bank transfers only", "Crypto only", "Gift cards only"], default: "All types" },
                { label: "Hold duration before auto-release", type: "select", options: ["2 hours", "4 hours", "24 hours", "Until manually released"], default: "4 hours" },
                { label: "Notify trusted contacts on hold", type: "select", options: ["Immediately", "After 15 min", "Never"], default: "Immediately" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <label className="text-sm font-medium text-foreground">{s.label}</label>
                  <Select defaultValue={s.default}>
                    <SelectTrigger className="w-52 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {s.options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
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
                <div className="flex justify-between"><span className="text-muted-foreground">Case ID</span><span className="font-mono font-semibold">{selectedAction.id}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Amount / Target</span><span className="font-semibold">{selectedAction.amount}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Destination</span><span className="font-semibold text-right max-w-52 truncate">{selectedAction.destination}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Caller / Contact</span><span className="font-semibold">{selectedAction.caller}</span></div>
                <div className="flex justify-between items-start gap-2"><span className="text-muted-foreground shrink-0">AI Flag</span><Badge className="bg-red-100 text-red-700 border-0 text-xs text-right">{selectedAction.callerFlag}</Badge></div>
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
