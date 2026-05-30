'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Shield, Activity, Phone, Monitor, Bell, Archive,
  AlertTriangle, CheckCircle, TrendingUp, Clock, ArrowRight
} from "lucide-react"
import Link from "next/link"

const recentAlerts = [
  { type: "High Risk Call", desc: "Incoming call showed voice cloning indicators", time: "2h ago", severity: "high" },
  { type: "Scam Pattern", desc: "Tech support scam script detected in email", time: "5h ago", severity: "medium" },
  { type: "Remote Access Attempt", desc: "AnyDesk install prompted by unknown caller", time: "1d ago", severity: "high" },
]

export default function IndividualOverviewPage() {
  return (
    <PageLayout role="individual" title="Individual Guardian" subtitle="Your personal scam protection dashboard">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Risk Score */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Current Risk Level", value: "Low", color: "text-green-600", bg: "bg-green-50", icon: Shield },
            { label: "Scams Blocked", value: "14", color: "text-primary", bg: "bg-primary/10", icon: CheckCircle },
            { label: "Calls Analyzed", value: "847", color: "text-blue-600", bg: "bg-blue-50", icon: Phone },
            { label: "Evidence Items", value: "23", color: "text-orange-600", bg: "bg-orange-50", icon: Archive },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="p-5">
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Protection Status */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Protection Status
            </h2>
            <div className="space-y-4">
              {[
                { label: "Call Shield (A1SCAMSHIELD)", status: "Active", pct: 100, color: "bg-green-500" },
                { label: "Voice Analysis (VoiceMatchSeal)", status: "Active", pct: 100, color: "bg-green-500" },
                { label: "Screen Guard (CamViguard)", status: "Active", pct: 100, color: "bg-green-500" },
                { label: "Remote Session Monitor", status: "Standby", pct: 0, color: "bg-muted" },
                { label: "Scam Intelligence (SCAMZY)", status: "Active", pct: 100, color: "bg-green-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground truncate">{item.label}</span>
                      <Badge className={item.status === "Active" ? "bg-green-100 text-green-700 border-0 text-xs" : "bg-muted text-muted-foreground border-0 text-xs"}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" asChild>
                <Link href="/app/individual/live-protection">View Live Protection</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/app/individual/settings">Configure</Link>
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Run Scam Check", href: "/app/individual/scam-check", icon: Shield },
                { label: "View Recent Alerts", href: "/app/individual/alerts", icon: Bell },
                { label: "Open Evidence Vault", href: "/app/individual/evidence-vault", icon: Archive },
                { label: "Manage Trusted Contacts", href: "/app/individual/trusted-contacts", icon: Activity },
              ].map((action, i) => {
                const Icon = action.icon
                return (
                  <Link key={i} href={action.href} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{action.label}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Recent Alerts
            </h2>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/app/individual/alerts">View All</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${alert.severity === "high" ? "bg-red-500" : "bg-yellow-500"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">{alert.type}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {alert.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{alert.desc}</p>
                </div>
                <Badge className={alert.severity === "high" ? "bg-red-100 text-red-700 border-0 text-xs flex-shrink-0" : "bg-yellow-100 text-yellow-700 border-0 text-xs flex-shrink-0"}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
