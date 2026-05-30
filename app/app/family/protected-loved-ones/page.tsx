'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Shield, Phone, Bell, Settings, AlertTriangle, CheckCircle, Activity } from "lucide-react"

const members = [
  {
    name: "Margaret Smith", relation: "Mother", age: 72, phone: "+61 4 1111 2222",
    risk: "medium", protection: ["Calls", "SMS", "Email", "Screen"],
    stats: { callsAnalyzed: 124, threatsBlocked: 5, lastThreat: "2h ago" },
    consent: "Full Monitoring — Informed"
  },
  {
    name: "Robert Smith", relation: "Father", age: 74, phone: "+61 4 3333 4444",
    risk: "low", protection: ["Calls", "SMS"],
    stats: { callsAnalyzed: 88, threatsBlocked: 2, lastThreat: "2 weeks ago" },
    consent: "Calls & SMS Only — Informed"
  },
  {
    name: "Susan Lee", relation: "Aunt", age: 68, phone: "+61 4 5555 6666",
    risk: "low", protection: ["Calls"],
    stats: { callsAnalyzed: 41, threatsBlocked: 1, lastThreat: "1 month ago" },
    consent: "Calls Only — Pending Confirmation"
  },
]

export default function ProtectedLovedOnesPage() {
  return (
    <PageLayout role="family" title="Protected Members" subtitle="Manage monitoring for each loved one">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">All monitoring requires the protected person&apos;s informed consent.</p>
          <Button size="sm" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Add Member
          </Button>
        </div>

        <div className="space-y-4">
          {members.map((m, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">{m.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-foreground">{m.name}</h3>
                        <Badge className={`text-xs border-0 ${m.risk === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                          {m.risk} risk
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{m.relation} · Age {m.age} · {m.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1.5 text-xs">
                        <Bell className="h-3.5 w-3.5" /> Alerts
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1.5 text-xs">
                        <Settings className="h-3.5 w-3.5" /> Configure
                      </Button>
                    </div>
                  </div>

                  {/* Protection Modules */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs text-muted-foreground">Active protection:</span>
                    {m.protection.map((p) => (
                      <Badge key={p} className="text-xs border-0 bg-primary/10 text-primary">{p}</Badge>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="grid sm:grid-cols-3 gap-3 mb-3">
                    {[
                      { label: "Calls Analyzed", value: m.stats.callsAnalyzed, icon: Phone },
                      { label: "Threats Blocked", value: m.stats.threatsBlocked, icon: Shield },
                      { label: "Last Threat", value: m.stats.lastThreat, icon: AlertTriangle },
                    ].map((s, j) => {
                      const Icon = s.icon
                      return (
                        <div key={j} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">{s.label}</p>
                            <p className="text-sm font-bold text-foreground">{s.value}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Consent */}
                  <div className={`flex items-center gap-2 text-xs p-2 rounded ${m.consent.includes("Pending") ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700"}`}>
                    {m.consent.includes("Pending") ? <AlertTriangle className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
                    Consent: {m.consent}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
