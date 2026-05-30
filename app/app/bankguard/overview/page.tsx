'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertCircle, Users, DollarSign, Activity, TrendingUp, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BankGuardOverviewPage() {
  return (
    <PageLayout role="bankguard" title="BankGuard Overview" subtitle="Enterprise fraud detection and prevention">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Protected Customers", value: "245,800", color: "text-primary", icon: Users },
            { label: "Fraud Attempts Blocked", value: "1,847", color: "text-red-600", icon: AlertCircle },
            { label: "Total Protected", value: "$428M", color: "text-green-600", icon: DollarSign },
            { label: "Block Rate", value: "99.8%", color: "text-primary", icon: Shield },
            { label: "Avg Response Time", value: "120ms", color: "text-blue-600", icon: Activity },
          ].map((kpi, i) => {
            const Icon = kpi.icon
            return (
              <Card key={i} className="p-5">
                <Icon className={`h-5 w-5 ${kpi.color} mb-2`} />
                <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Live Threat Queue Preview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Active Threat Queue
                  <Badge className="bg-red-100 text-red-700 border-0 text-xs">
                    <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-1.5 animate-pulse" />
                    Live
                  </Badge>
                </h2>
                <Button size="sm" asChild><Link href="/app/bankguard/live-risk-queue">View All</Link></Button>
              </div>
              <div className="space-y-3">
                {[
                  { customer: "Customer #841-9923", threat: "Wire transfer to unknown account", amount: "$42,000", score: 94, action: "Auto-blocked" },
                  { customer: "Customer #507-2241", threat: "Velocity attack — 8 transactions/min", amount: "$1,200 x8", score: 88, action: "Flagged" },
                  { customer: "Customer #133-8810", threat: "Compromised business account", amount: "$158,000", score: 96, action: "Escalated" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-foreground">{t.customer}</span>
                        <Badge className={`text-xs border-0 ${t.score > 90 ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{t.score}/100</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{t.threat} · {t.amount}</p>
                    </div>
                    <Badge className="text-xs border-0 bg-primary/10 text-primary flex-shrink-0">{t.action}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Fraud Trend */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Fraud Trends (30 Days)
              </h2>
              <div className="space-y-3">
                {[
                  { label: "CEO Fraud", count: 312, pct: 34 },
                  { label: "Account Takeover", count: 256, pct: 28 },
                  { label: "Vendor Impersonation", count: 201, pct: 22 },
                  { label: "Deepfake Impersonation", count: 147, pct: 16 },
                ].map((t, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-muted-foreground">{t.label}</span>
                      <span className="font-semibold text-foreground">{t.count} ({t.pct}%)</span>
                    </div>
                    <Progress value={t.pct} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Quick Links */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Quick Navigation</h2>
              <div className="space-y-2">
                {[
                  { label: "Live Risk Queue", href: "/app/bankguard/live-risk-queue", icon: Activity },
                  { label: "Guardian Pause Requests", href: "/app/bankguard/guardian-pause", icon: Lock },
                  { label: "Teller Assist", href: "/app/bankguard/teller-assist", icon: Users },
                  { label: "Case Management", href: "/app/bankguard/cases", icon: Shield },
                  { label: "Evidence Exports", href: "/app/bankguard/evidence-exports", icon: Shield },
                ].map((l, i) => {
                  const Icon = l.icon
                  return (
                    <Link key={i} href={l.href} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">{l.label}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    </Link>
                  )
                })}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">System Health</h2>
              <div className="space-y-3 text-sm">
                {[
                  { label: "API Uptime", value: "99.99%", color: "text-green-600" },
                  { label: "Avg Response Time", value: "120ms", color: "text-foreground" },
                  { label: "False Positive Rate", value: "0.2%", color: "text-green-600" },
                  { label: "Models Active", value: "7/7", color: "text-green-600" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className={`font-semibold ${s.color}`}>{s.value}</span>
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
