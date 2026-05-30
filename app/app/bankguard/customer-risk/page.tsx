'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Search, User, TrendingUp, AlertTriangle, ShieldCheck, Phone, FileText, Eye } from "lucide-react"

const CUSTOMERS = [
  {
    id: "841-9923", name: "Margaret T.", age: 74, segment: "Senior",
    riskScore: 91, riskLevel: "Critical", lastIncident: "Wire fraud attempt",
    totalExposure: "$42,000", victimState: "Active grooming", freezeLock: false,
    protectedSince: "Mar 2023", scamType: "CEO Impersonation", calls: 14
  },
  {
    id: "133-8810", name: "David H.", age: 62, segment: "Business",
    riskScore: 88, riskLevel: "High", lastIncident: "Business email compromise",
    totalExposure: "$158,000", victimState: "Post-incident", freezeLock: true,
    protectedSince: "Jan 2022", scamType: "Vendor Impersonation", calls: 7
  },
  {
    id: "227-5534", name: "Robert K.", age: 69, segment: "Senior",
    riskScore: 82, riskLevel: "High", lastIncident: "Remote access scam",
    totalExposure: "$22,500", victimState: "Cooling off", freezeLock: false,
    protectedSince: "Jun 2023", scamType: "Tech Support", calls: 9
  },
  {
    id: "910-3345", name: "Patricia N.", age: 71, segment: "Senior",
    riskScore: 79, riskLevel: "Elevated", lastIncident: "Crypto romance scam",
    totalExposure: "$31,000", victimState: "Active engagement", freezeLock: false,
    protectedSince: "Aug 2023", scamType: "Romance / Pig Butchering", calls: 22
  },
  {
    id: "507-2241", name: "James B.", age: 45, segment: "Consumer",
    riskScore: 62, riskLevel: "Medium", lastIncident: "ACH velocity pattern",
    totalExposure: "$9,600", victimState: "Resolved", freezeLock: false,
    protectedSince: "Nov 2022", scamType: "Account Takeover", calls: 3
  },
  {
    id: "344-0029", name: "Susan L.", age: 58, segment: "Consumer",
    riskScore: 55, riskLevel: "Medium", lastIncident: "Counterfeit check",
    totalExposure: "$15,000", victimState: "Monitoring", freezeLock: false,
    protectedSince: "Feb 2023", scamType: "Check Fraud", calls: 2
  },
  {
    id: "668-7712", name: "William C.", age: 67, segment: "Senior",
    riskScore: 48, riskLevel: "Low", lastIncident: "Zelle romance transfer",
    totalExposure: "$8,800", victimState: "Stable", freezeLock: false,
    protectedSince: "May 2023", scamType: "Romance Scam", calls: 5
  },
]

const levelColors: Record<string, string> = {
  "Critical": "bg-red-100 text-red-700",
  "High": "bg-orange-100 text-orange-700",
  "Elevated": "bg-yellow-100 text-yellow-700",
  "Medium": "bg-blue-100 text-blue-700",
  "Low": "bg-green-100 text-green-700",
}

export default function CustomerRiskPage() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(CUSTOMERS[0])

  const filtered = CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.includes(search) ||
    c.scamType.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PageLayout role="bankguard" title="Customer Risk Profiles" subtitle="VictimState AI™ individual risk scoring and intervention tracking">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Critical Risk", value: "1", color: "text-red-600" },
            { label: "High Risk", value: "2", color: "text-orange-600" },
            { label: "Total Exposure", value: "$287K", color: "text-foreground" },
            { label: "FreezeLock Active", value: "1", color: "text-primary" },
          ].map((s, i) => (
            <Card key={i} className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Customer List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="space-y-2">
              {filtered.map((c, i) => (
                <Card
                  key={i}
                  className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${selected.id === c.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelected(c)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">{c.name}</span>
                      {c.freezeLock && <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">FreezeLock™</Badge>}
                    </div>
                    <Badge className={`text-xs border-0 ${levelColors[c.riskLevel]}`}>{c.riskLevel}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={c.riskScore} className="h-1.5 flex-1" />
                    <span className="text-xs font-bold text-foreground w-6">{c.riskScore}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{c.scamType} · #{c.id}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Detail Panel */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selected.name}</h2>
                  <p className="text-sm text-muted-foreground">Customer #{selected.id} · Age {selected.age} · {selected.segment}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Protected since {selected.protectedSince}</p>
                </div>
                <Badge className={`text-sm border-0 px-3 py-1 ${levelColors[selected.riskLevel]}`}>{selected.riskLevel} Risk</Badge>
              </div>

              {/* Risk Score Gauge */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">VictimState AI™ Score</span>
                  <span className={`text-2xl font-bold ${selected.riskScore > 80 ? "text-red-600" : selected.riskScore > 60 ? "text-orange-600" : "text-green-600"}`}>{selected.riskScore}/100</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${selected.riskScore > 80 ? "bg-red-500" : selected.riskScore > 60 ? "bg-orange-500" : "bg-green-500"}`}
                    style={{ width: `${selected.riskScore}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Last Incident", value: selected.lastIncident, icon: AlertTriangle },
                  { label: "Total Exposure", value: selected.totalExposure, icon: TrendingUp },
                  { label: "VictimState", value: selected.victimState, icon: ShieldCheck },
                  { label: "Calls Analyzed", value: `${selected.calls} calls`, icon: Phone },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="gap-2">
                  <Eye className="h-4 w-4" /> Full Profile
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Phone className="h-4 w-4" /> Contact
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" /> Create Case
                </Button>
                {!selected.freezeLock && (
                  <Button size="sm" variant="destructive" className="gap-2">
                    FreezeLock™ Account
                  </Button>
                )}
                {selected.freezeLock && (
                  <Badge className="bg-blue-100 text-blue-700 border-0 px-3 py-1.5 text-sm">FreezeLock™ Active</Badge>
                )}
              </div>
            </Card>

            {/* Scam Journey */}
            <Card className="p-6">
              <h3 className="text-base font-bold text-foreground mb-4">Fraud Journey Engine™ — Incident Timeline</h3>
              <div className="relative space-y-4">
                {[
                  { label: "Initial Contact", desc: "Received unsolicited call from spoofed bank number", time: "14 days ago", color: "bg-yellow-500" },
                  { label: "Grooming Phase", desc: "Multiple calls building trust, script-matched to known CEO fraud pattern", time: "10 days ago", color: "bg-orange-500" },
                  { label: "Transaction Attempt", desc: selected.lastIncident + " initiated via online banking", time: "2 days ago", color: "bg-red-500" },
                  { label: "VIGISCAM™ Intervention", desc: "VictimState AI™ scored 91 — transaction auto-blocked", time: "2 days ago", color: "bg-primary" },
                ].map((ev, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${ev.color} mt-0.5 flex-shrink-0`} />
                      {i < 3 && <div className="w-0.5 bg-border flex-1 mt-1 mb-1" />}
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-semibold text-foreground">{ev.label}</p>
                      <p className="text-xs text-muted-foreground">{ev.desc}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{ev.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
