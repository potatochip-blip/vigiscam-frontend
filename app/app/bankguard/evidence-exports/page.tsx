'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Archive, Download, FileText, Phone, Monitor, Search, Plus, Shield, CheckCircle, Clock, Lock } from "lucide-react"

const EXPORTS = [
  {
    id: "EXP-0881", caseId: "BKG-2024-0441", title: "CEO Wire Fraud — Full Evidence Package",
    type: "Law Enforcement", contents: ["Call recordings (7)", "Transaction logs", "IP trace report", "Scam script match", "VictimState AI™ report"],
    format: "Encrypted ZIP + PDF", status: "Ready", size: "48.2 MB", created: "Today, 2:14 PM", chain: "Verified"
  },
  {
    id: "EXP-0878", caseId: "BKG-2024-0439", title: "Romance Crypto Scam — Evidence Bundle",
    type: "Regulatory (FinCEN SAR)", contents: ["Transaction audit trail", "Crypto wallet addresses", "Communication logs", "Risk score timeline"],
    format: "Encrypted ZIP + CSV", status: "Ready", size: "12.8 MB", created: "Yesterday", chain: "Verified"
  },
  {
    id: "EXP-0874", caseId: "BKG-2024-0436", title: "Tech Support Remote Access — Session Evidence",
    type: "Law Enforcement", contents: ["Screen recording", "Remote session logs", "Keystroke capture", "Bank access logs"],
    format: "Encrypted ZIP", status: "In Progress", size: "—", created: "In preparation", chain: "Pending"
  },
  {
    id: "EXP-0869", caseId: "BKG-2024-0428", title: "Check Fraud Package",
    type: "Internal Audit", contents: ["Check images (front/back)", "Deposit records", "Withdrawal logs", "Branch CCTV timestamp"],
    format: "PDF Report", status: "Ready", size: "5.4 MB", created: "2 days ago", chain: "Verified"
  },
  {
    id: "EXP-0862", caseId: "BKG-2024-0419", title: "ACH Takeover — Resolved",
    type: "Internal Audit", contents: ["ACH transaction dump", "Login anomaly report", "Device fingerprint"],
    format: "CSV + PDF", status: "Archived", size: "3.1 MB", created: "2 weeks ago", chain: "Verified"
  },
]

const statusColor: Record<string, string> = {
  "Ready": "bg-green-100 text-green-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  "Archived": "bg-muted text-muted-foreground",
}

export default function EvidenceExportsPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selected, setSelected] = useState(EXPORTS[0])

  const filtered = EXPORTS.filter(e =>
    (typeFilter === "all" || e.type === typeFilter) &&
    (e.title.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <PageLayout role="bankguard" title="Evidence Exports" subtitle="Evidence Vault™ — tamper-evident, chain-of-custody compliant export packages">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Ready Packages", value: "3", color: "text-green-600", icon: CheckCircle },
            { label: "In Preparation", value: "1", color: "text-yellow-600", icon: Clock },
            { label: "Total Evidence Items", value: "35", color: "text-primary", icon: Archive },
            { label: "Chain Verified", value: "4/5", color: "text-foreground", icon: Shield },
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

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search packages..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Law Enforcement">Law Enforcement</SelectItem>
                <SelectItem value="Regulatory (FinCEN SAR)">Regulatory</SelectItem>
                <SelectItem value="Internal Audit">Internal Audit</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2 ml-auto"><Plus className="h-4 w-4" /> New Export Package</Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Package List */}
          <div className="lg:col-span-2 space-y-2">
            {filtered.map((e, i) => (
              <Card
                key={i}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${selected.id === e.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelected(e)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{e.id}</span>
                  <Badge className={`text-xs border-0 ${statusColor[e.status]}`}>{e.status}</Badge>
                </div>
                <p className="text-sm font-semibold text-foreground leading-snug mb-1">{e.title}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Archive className="h-3 w-3" />
                  <span>{e.type}</span>
                  <span>·</span>
                  <span>{e.created}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-mono text-muted-foreground mb-1">{selected.id} · {selected.caseId}</p>
                  <h2 className="text-lg font-bold text-foreground">{selected.title}</h2>
                </div>
                <Badge className={`text-sm border-0 px-3 py-1 ${statusColor[selected.status]}`}>{selected.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Export Type", value: selected.type, icon: FileText },
                  { label: "Format", value: selected.format, icon: Archive },
                  { label: "Package Size", value: selected.size, icon: Download },
                  { label: "Chain of Custody", value: selected.chain, icon: Shield },
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

              {/* Contents */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Archive className="h-4 w-4 text-primary" /> Package Contents
                </h3>
                <div className="space-y-2">
                  {selected.contents.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{item}</span>
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Chain of Custody */}
              {selected.chain === "Verified" && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg p-3 mb-4">
                  <Lock className="h-4 w-4" />
                  <span className="font-semibold">Chain of Custody Verified</span>
                  <span className="text-green-600">— SHA-256 hash locked, tamper-evident seal active</span>
                </div>
              )}

              <div className="flex gap-2">
                {selected.status === "Ready" && (
                  <>
                    <Button className="gap-2"><Download className="h-4 w-4" /> Download Package</Button>
                    <Button variant="outline" className="gap-2"><Shield className="h-4 w-4" /> Send to LEA Portal</Button>
                  </>
                )}
                {selected.status === "In Progress" && (
                  <Button disabled className="gap-2"><Clock className="h-4 w-4" /> Preparing...</Button>
                )}
                <Button variant="outline" className="gap-2"><FileText className="h-4 w-4" /> View Audit Log</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
