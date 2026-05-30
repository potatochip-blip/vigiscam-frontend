'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Shield, Bell, AlertTriangle, CheckCircle, Heart, ArrowRight, Activity } from "lucide-react"
import Link from "next/link"

const members = [
  { name: "Margaret Smith", relation: "Mother", age: 72, risk: "medium", lastSeen: "2h ago", status: "At Risk — Suspicious call activity" },
  { name: "Robert Smith", relation: "Father", age: 74, risk: "low", lastSeen: "30min ago", status: "Protected — No threats" },
  { name: "Susan Lee", relation: "Aunt", age: 68, risk: "low", lastSeen: "1d ago", status: "Protected — No threats" },
]

export default function FamilyOverviewPage() {
  return (
    <PageLayout role="family" title="Family Guardian" subtitle="Protecting your loved ones from scams" alertCount={2}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Protected Members", value: "3", icon: Users, color: "text-primary", bg: "bg-primary/10" },
            { label: "Active Alerts", value: "2", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
            { label: "Threats Blocked (30d)", value: "8", icon: Shield, color: "text-green-600", bg: "bg-green-50" },
            { label: "Check-ins Overdue", value: "1", icon: Heart, color: "text-orange-600", bg: "bg-orange-50" },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <Card key={i} className="p-5">
                <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </Card>
            )
          })}
        </div>

        {/* Member Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Protected Loved Ones</h2>
            <Button size="sm" asChild>
              <Link href="/app/family/protected-loved-ones">Manage Members</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {members.map((m, i) => (
              <Card key={i} className={`p-5 border-l-4 ${m.risk === "high" ? "border-l-red-500" : m.risk === "medium" ? "border-l-yellow-500" : "border-l-green-500"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                      <span className="font-bold text-primary">{m.name[0]}</span>
                    </div>
                    <h3 className="font-bold text-foreground">{m.name}</h3>
                    <p className="text-xs text-muted-foreground">{m.relation} · Age {m.age}</p>
                  </div>
                  <Badge className={`text-xs border-0 ${m.risk === "high" ? "bg-red-100 text-red-700" : m.risk === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                    {m.risk} risk
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">Last seen: {m.lastSeen}</p>
                <p className="text-sm text-foreground">{m.status}</p>
                <Button size="sm" variant="ghost" className="mt-3 -ml-2 text-xs flex items-center gap-1">
                  View Details <ArrowRight className="h-3 w-3" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Recent Family Alerts
            </h2>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/app/family/alerts">View All</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { member: "Margaret Smith", alert: "Suspicious call from unknown number — high risk score 89/100", severity: "high", time: "2h ago" },
              { member: "Margaret Smith", alert: "Bank impersonation script detected in email", severity: "medium", time: "5h ago" },
              { member: "Robert Smith", alert: "Weekly protection summary — no threats detected", severity: "info", time: "1d ago" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg">
                <div className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${a.severity === "high" ? "bg-red-500" : a.severity === "medium" ? "bg-yellow-500" : "bg-blue-500"}`} />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-primary">{a.member}</span>
                  <p className="text-sm text-foreground">{a.alert}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
