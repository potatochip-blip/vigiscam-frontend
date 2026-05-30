'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Lock, Unlock, AlertTriangle, Phone, Clock, User, CheckCircle, XCircle, ShieldCheck } from "lucide-react"

const PAUSES = [
  {
    id: "GP-0091", customer: "Margaret T.", accountNo: "****9923", type: "Full Account Pause",
    reason: "Active wire fraud in progress — customer being coached by scammer",
    requestedBy: "Auto (VictimState AI™)", time: "4 min ago", duration: "72 hours",
    status: "Active", verifiedBy: null, exposure: "$42,000"
  },
  {
    id: "GP-0088", customer: "Robert K.", accountNo: "****5534", type: "Wire/ACH Only",
    reason: "Remote access session detected during attempted wire transfer",
    requestedBy: "Teller: J. Morrison", time: "2 hours ago", duration: "24 hours",
    status: "Active", verifiedBy: "Branch Manager L. Chung", exposure: "$22,500"
  },
  {
    id: "GP-0085", customer: "Patricia N.", accountNo: "****3345", type: "Outgoing Only",
    reason: "Suspected romance scam — large crypto withdrawals to unknown wallet",
    requestedBy: "Auto (SCAMZY™)", time: "6 hours ago", duration: "48 hours",
    status: "Pending Review", verifiedBy: null, exposure: "$31,000"
  },
  {
    id: "GP-0081", customer: "David H.", accountNo: "****8810", type: "Full Account Pause",
    reason: "Business email compromise — $158K wire attempted from CFO spoof",
    requestedBy: "Fraud Team", time: "1 day ago", duration: "7 days",
    status: "Lifted", verifiedBy: "Risk Officer: P. Reyes", exposure: "$158,000"
  },
  {
    id: "GP-0077", customer: "William C.", accountNo: "****7712", type: "Zelle/P2P Only",
    reason: "Unusual Zelle pattern — 4 transfers to new recipient in 48h",
    requestedBy: "Auto (Fraud Journey Engine™)", time: "2 days ago", duration: "24 hours",
    status: "Expired", verifiedBy: null, exposure: "$8,800"
  },
]

const statusColor: Record<string, string> = {
  "Active": "bg-red-100 text-red-700",
  "Pending Review": "bg-yellow-100 text-yellow-700",
  "Lifted": "bg-green-100 text-green-700",
  "Expired": "bg-muted text-muted-foreground",
}

export default function GuardianPausePage() {
  const [selected, setSelected] = useState(PAUSES[0])

  return (
    <PageLayout role="bankguard" title="Guardian Pause™" subtitle="Real-time account suspension and fraud intervention controls">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Pauses", value: "2", color: "text-red-600", icon: Lock },
            { label: "Pending Review", value: "1", color: "text-yellow-600", icon: AlertTriangle },
            { label: "Total Protected Today", value: "$255K", color: "text-primary", icon: ShieldCheck },
            { label: "Avg Resolution Time", value: "1.8 hrs", color: "text-foreground", icon: Clock },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <Card key={i} className="p-4 flex items-center gap-4">
                <Icon className={`h-6 w-6 ${s.color}`} />
                <div>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* List */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-base font-bold text-foreground">Guardian Pause Requests</h2>
            {PAUSES.map((p, i) => (
              <Card
                key={i}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${selected.id === p.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelected(p)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {p.status === "Active" ? <Lock className="h-4 w-4 text-red-500" /> : <Unlock className="h-4 w-4 text-muted-foreground" />}
                    <span className="text-sm font-semibold text-foreground">{p.customer}</span>
                  </div>
                  <Badge className={`text-xs border-0 ${statusColor[p.status]}`}>{p.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground pl-6">{p.type} · {p.id}</p>
                <p className="text-xs text-muted-foreground pl-6 mt-0.5">{p.time}</p>
              </Card>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="h-5 w-5 text-red-500" />
                    <h2 className="text-xl font-bold text-foreground">{selected.customer}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">{selected.id} · Account {selected.accountNo}</p>
                </div>
                <Badge className={`text-sm border-0 px-3 py-1 ${statusColor[selected.status]}`}>{selected.status}</Badge>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Pause Reason</p>
                  <p className="text-sm text-foreground">{selected.reason}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Pause Type", value: selected.type, icon: Lock },
                    { label: "Exposure at Risk", value: selected.exposure, icon: AlertTriangle },
                    { label: "Requested By", value: selected.requestedBy, icon: User },
                    { label: "Duration", value: selected.duration, icon: Clock },
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} className="bg-muted/30 rounded-lg p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{item.label}</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{item.value}</p>
                      </div>
                    )
                  })}
                </div>

                {selected.verifiedBy && (
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg p-3">
                    <CheckCircle className="h-4 w-4" />
                    <span>Verified by: {selected.verifiedBy}</span>
                  </div>
                )}
              </div>

              {selected.status === "Pending Review" && (
                <div className="mt-6 flex gap-3">
                  <Button className="gap-2 flex-1">
                    <Lock className="h-4 w-4" /> Approve Pause
                  </Button>
                  <Button variant="outline" className="gap-2 flex-1">
                    <XCircle className="h-4 w-4" /> Deny
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" /> Call Customer
                  </Button>
                </div>
              )}
              {selected.status === "Active" && (
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Unlock className="h-4 w-4" /> Lift Pause
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" /> Call Customer
                  </Button>
                  <Button size="sm" variant="outline">Extend Duration</Button>
                </div>
              )}
            </Card>

            {/* Checklist */}
            <Card className="p-6">
              <h3 className="text-base font-bold text-foreground mb-4">Resolution Checklist</h3>
              <div className="space-y-3">
                {[
                  { step: "Verify customer identity via dual authentication", done: true },
                  { step: "Confirm no ongoing scammer contact", done: true },
                  { step: "Review full transaction history", done: selected.status !== "Pending Review" },
                  { step: "Complete VictimState AI™ reassessment", done: false },
                  { step: "Document case outcome", done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.done
                      ? <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      : <div className="h-4 w-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />}
                    <span className={`text-sm ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.step}</span>
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
