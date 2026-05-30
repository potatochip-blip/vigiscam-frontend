'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import {
  AlertTriangle, Search, Clock, DollarSign, User, Phone,
  Ban, Eye, MessageSquare, ArrowUpRight, RefreshCw, Filter
} from "lucide-react"

const QUEUE = [
  {
    id: "TXN-88421", customer: "Customer #841-9923", bank: "First National", type: "Wire Transfer",
    threat: "Unknown overseas wire — first-time recipient", amount: "$42,000", score: 96,
    status: "Auto-Blocked", time: "0m ago", channel: "Online Banking", method: "VictimState AI™"
  },
  {
    id: "TXN-88419", customer: "Customer #507-2241", bank: "First National", type: "ACH Velocity",
    threat: "8 ACH pulls in 4 minutes from new payee", amount: "$9,600", score: 89,
    status: "Flagged", time: "2m ago", channel: "Mobile App", method: "Fraud Journey Engine™"
  },
  {
    id: "TXN-88415", customer: "Customer #133-8810", bank: "Heritage Bank", type: "Business Wire",
    threat: "CEO fraud — exec impersonation via email", amount: "$158,000", score: 97,
    status: "Escalated", time: "5m ago", channel: "Branch", method: "A1SCAMSHIELD™"
  },
  {
    id: "TXN-88410", customer: "Customer #992-0011", bank: "Summit Credit Union", type: "Card Present",
    threat: "Card cloning — 3 states in 90 minutes", amount: "$3,200", score: 82,
    status: "Flagged", time: "8m ago", channel: "POS", method: "VictimState AI™"
  },
  {
    id: "TXN-88405", customer: "Customer #227-5534", bank: "First National", type: "Remote Access",
    threat: "Active remote access session during transaction", amount: "$22,500", score: 94,
    status: "Auto-Blocked", time: "12m ago", channel: "Online Banking", method: "CamViguard™"
  },
  {
    id: "TXN-88401", customer: "Customer #668-7712", bank: "Heritage Bank", type: "Zelle Transfer",
    threat: "Romance scam — large Zelle to unknown", amount: "$8,800", score: 78,
    status: "In Review", time: "18m ago", channel: "Mobile App", method: "SCAMZY™"
  },
  {
    id: "TXN-88397", customer: "Customer #344-0029", bank: "Summit Credit Union", type: "Check Deposit",
    threat: "Counterfeit check — high-value rapid withdrawal", amount: "$15,000", score: 85,
    status: "Flagged", time: "25m ago", channel: "Branch", method: "Fraud Journey Engine™"
  },
  {
    id: "TXN-88391", customer: "Customer #910-3345", bank: "First National", type: "Crypto Purchase",
    threat: "Pig butchering — crypto bought by senior", amount: "$31,000", score: 91,
    status: "Escalated", time: "32m ago", channel: "Online Banking", method: "SCAMZY™"
  },
]

const statusColors: Record<string, string> = {
  "Auto-Blocked": "bg-red-100 text-red-700",
  "Flagged": "bg-yellow-100 text-yellow-700",
  "Escalated": "bg-orange-100 text-orange-700",
  "In Review": "bg-blue-100 text-blue-700",
}

export default function LiveRiskQueuePage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = QUEUE.filter(t =>
    (statusFilter === "all" || t.status === statusFilter) &&
    (t.customer.toLowerCase().includes(search.toLowerCase()) ||
     t.threat.toLowerCase().includes(search.toLowerCase()) ||
     t.id.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <PageLayout
      role="bankguard"
      title="Live Risk Queue"
      subtitle="Real-time fraud intervention powered by VictimState AI™ and Fraud Journey Engine™"
      alertCount={8}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Queue Depth", value: "8", sub: "Active threats", color: "text-red-600", icon: AlertTriangle },
            { label: "Auto-Blocked Today", value: "247", sub: "$1.8M protected", color: "text-green-600", icon: Ban },
            { label: "Avg Response Time", value: "94ms", sub: "Detection to action", color: "text-primary", icon: Clock },
            { label: "Escalated", value: "3", sub: "Awaiting agent review", color: "text-orange-600", icon: ArrowUpRight },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${s.color}`} />
                  <div>
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.sub}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customer, threat, ID..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Auto-Blocked">Auto-Blocked</SelectItem>
                <SelectItem value="Flagged">Flagged</SelectItem>
                <SelectItem value="Escalated">Escalated</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Badge className="bg-green-100 text-green-700 border-0 gap-1">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
              Live
            </Badge>
          </div>
        </Card>

        {/* Queue Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Transaction</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Threat</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Score</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Method</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-mono font-semibold text-foreground">{t.id}</p>
                      <p className="text-xs text-muted-foreground">{t.time} · {t.channel}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{t.customer}</p>
                          <p className="text-xs text-muted-foreground">{t.bank}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-64">
                      <p className="text-sm text-foreground">{t.type}</p>
                      <p className="text-xs text-muted-foreground">{t.threat}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-foreground">{t.amount.replace("$", "")}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${t.score > 90 ? "bg-red-500" : t.score > 80 ? "bg-orange-500" : "bg-yellow-500"}`}
                            style={{ width: `${t.score}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${t.score > 90 ? "text-red-600" : t.score > 80 ? "text-orange-600" : "text-yellow-600"}`}>{t.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs border-0 ${statusColors[t.status]}`}>{t.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-muted-foreground">{t.method}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1">
                          <Eye className="h-3 w-3" /> Review
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1">
                          <Phone className="h-3 w-3" /> Call
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1">
                          <MessageSquare className="h-3 w-3" /> Note
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">No transactions match your filters.</div>
          )}
        </Card>
      </div>
    </PageLayout>
  )
}
