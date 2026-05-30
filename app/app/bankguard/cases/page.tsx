'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Search, FileText, Clock, DollarSign, User, Plus, Filter, CheckCircle, AlertTriangle, Archive } from "lucide-react"

const CASES = [
  { id: "BKG-2024-0441", title: "CEO Wire Fraud — Heritage Bank Business Account", customer: "David H.", loss: "$158,000", status: "Open", priority: "Critical", type: "Business Email Compromise", assignee: "L. Reyes", opened: "2 days ago", evidence: 7 },
  { id: "BKG-2024-0439", title: "Romance Crypto Scam — Senior Customer", customer: "Patricia N.", loss: "$31,000", status: "Open", priority: "High", type: "Pig Butchering", assignee: "M. Chang", opened: "3 days ago", evidence: 4 },
  { id: "BKG-2024-0436", title: "Tech Support Remote Access Drain", customer: "Robert K.", loss: "$22,500", status: "In Progress", priority: "High", type: "Remote Access Fraud", assignee: "J. Torres", opened: "5 days ago", evidence: 9 },
  { id: "BKG-2024-0431", title: "Card Cloning — Multi-State POS Attack", customer: "Customer #992-0011", loss: "$3,200", status: "In Progress", priority: "Medium", type: "Card Present Fraud", assignee: "L. Reyes", opened: "1 week ago", evidence: 3 },
  { id: "BKG-2024-0428", title: "Counterfeit Check Rapid Withdrawal", customer: "Susan L.", loss: "$15,000", status: "Pending Docs", priority: "Medium", type: "Check Fraud", assignee: "M. Chang", opened: "1 week ago", evidence: 2 },
  { id: "BKG-2024-0419", title: "ACH Velocity — Account Takeover Attempt", customer: "James B.", loss: "$0", status: "Resolved", priority: "Low", type: "Account Takeover", assignee: "J. Torres", opened: "2 weeks ago", evidence: 6 },
  { id: "BKG-2024-0412", title: "Zelle Romance Transfer", customer: "William C.", loss: "$8,800", status: "Closed", priority: "Low", type: "Romance Scam", assignee: "L. Reyes", opened: "3 weeks ago", evidence: 4 },
]

const statusColor: Record<string, string> = {
  "Open": "bg-red-100 text-red-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Pending Docs": "bg-yellow-100 text-yellow-700",
  "Resolved": "bg-green-100 text-green-700",
  "Closed": "bg-muted text-muted-foreground",
}

const priorityColor: Record<string, string> = {
  "Critical": "text-red-600",
  "High": "text-orange-600",
  "Medium": "text-yellow-600",
  "Low": "text-muted-foreground",
}

export default function BankGuardCasesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selected, setSelected] = useState(CASES[0])

  const filtered = CASES.filter(c =>
    (statusFilter === "all" || c.status === statusFilter) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) ||
     c.id.toLowerCase().includes(search.toLowerCase()) ||
     c.customer.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <PageLayout role="bankguard" title="Case Management" subtitle="End-to-end fraud case lifecycle management with Evidence Vault™">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Open Cases", value: "2", color: "text-red-600", icon: AlertTriangle },
            { label: "In Progress", value: "2", color: "text-blue-600", icon: Clock },
            { label: "Total Loss Tracked", value: "$238K", color: "text-foreground", icon: DollarSign },
            { label: "Evidence Items", value: "35", color: "text-primary", icon: Archive },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <Card key={i} className="p-4 flex items-center gap-4">
                <Icon className={`h-5 w-5 ${s.color}`} />
                <div>
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Filters + New Case */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search cases..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending Docs">Pending Docs</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2 ml-auto"><Plus className="h-4 w-4" /> New Case</Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Case List */}
          <div className="lg:col-span-2 space-y-2">
            {filtered.map((c, i) => (
              <Card
                key={i}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${selected.id === c.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelected(c)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{c.id}</span>
                  <Badge className={`text-xs border-0 ${statusColor[c.status]}`}>{c.status}</Badge>
                </div>
                <p className="text-sm font-semibold text-foreground mb-1 leading-snug">{c.title}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>{c.customer}</span>
                  <span>·</span>
                  <span className={`font-semibold ${c.loss === "$0" ? "text-green-600" : "text-red-600"}`}>{c.loss}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Case Detail */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-mono text-muted-foreground mb-1">{selected.id}</p>
                  <h2 className="text-lg font-bold text-foreground leading-snug">{selected.title}</h2>
                </div>
                <Badge className={`text-sm border-0 px-3 py-1 ${statusColor[selected.status]}`}>{selected.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Customer", value: selected.customer, icon: User },
                  { label: "Loss Amount", value: selected.loss, icon: DollarSign },
                  { label: "Fraud Type", value: selected.type, icon: AlertTriangle },
                  { label: "Assignee", value: selected.assignee, icon: FileText },
                  { label: "Opened", value: selected.opened, icon: Clock },
                  { label: "Evidence Items", value: `${selected.evidence} items`, icon: Archive },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="bg-muted/40 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="gap-2"><Archive className="h-4 w-4" /> Evidence Vault™</Button>
                <Button size="sm" variant="outline" className="gap-2"><FileText className="h-4 w-4" /> Add Note</Button>
                <Button size="sm" variant="outline" className="gap-2"><CheckCircle className="h-4 w-4" /> Update Status</Button>
                <Button size="sm" variant="outline">Export for LEA</Button>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <h3 className="text-base font-bold text-foreground mb-4">Case Timeline</h3>
              <div className="space-y-4">
                {[
                  { event: "Case Opened", desc: "Auto-generated from live risk queue transaction TXN-88415", time: selected.opened, icon: AlertTriangle, color: "text-red-500" },
                  { event: "Evidence Collected", desc: `${selected.evidence} items captured — call recordings, transaction logs, IP traces`, time: "1 day ago", icon: Archive, color: "text-primary" },
                  { event: "Customer Contacted", desc: "Branch manager spoke with customer — confirmed scam in progress", time: "1 day ago", icon: User, color: "text-orange-500" },
                  { event: "Guardian Pause™ Activated", desc: "Account suspended pending investigation", time: "2 days ago", icon: CheckCircle, color: "text-green-500" },
                ].map((ev, i) => {
                  const Icon = ev.icon
                  return (
                    <div key={i} className="flex gap-3">
                      <Icon className={`h-4 w-4 ${ev.color} flex-shrink-0 mt-0.5`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">{ev.event}</span>
                          <span className="text-xs text-muted-foreground">{ev.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{ev.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
