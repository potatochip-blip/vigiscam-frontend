'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ShieldCheck, AlertTriangle, Users, Eye, FileText, TrendingUp, ArrowRight, Activity } from "lucide-react"
import Link from "next/link"

export default function PlatformShieldOverviewPage() {
  return (
    <PageLayout role="platformshield" title="PlatformShield Overview" subtitle="AI-powered content moderation and scam network detection for digital platforms">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Content Scanned Today", value: "2.4M", color: "text-primary", icon: Eye },
            { label: "Scam Accounts Detected", value: "1,847", color: "text-red-600", icon: AlertTriangle },
            { label: "Grooming Signals", value: "312", color: "text-orange-600", icon: ShieldCheck },
            { label: "Accounts Suspended", value: "943", color: "text-green-600", icon: Users },
            { label: "Script Families Active", value: "28", color: "text-foreground", icon: FileText },
          ].map((kpi, i) => {
            const Icon = kpi.icon
            return (
              <Card key={i} className="p-5">
                <Icon className={`h-5 w-5 ${kpi.color} mb-2`} />
                <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Threat Activity */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Activity className="h-5 w-5 text-red-600" />
                  Live Threat Activity
                  <Badge className="bg-green-100 text-green-700 border-0 text-xs gap-1">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                    Live
                  </Badge>
                </h2>
                <Button size="sm" asChild><Link href="/app/platformshield/moderation-queue">View Queue</Link></Button>
              </div>
              <div className="space-y-3">
                {[
                  { type: "Grooming Network", desc: "47 accounts coordinating across Facebook Groups and Telegram", severity: "Critical", time: "3m ago" },
                  { type: "Recovery Scam Ring", desc: "Fake 'scam recovery' service targeting previous fraud victims", severity: "High", time: "12m ago" },
                  { type: "Fake Support Group", desc: "Impersonating VIGISCAM™ victim support — 1,200 members", severity: "High", time: "28m ago" },
                  { type: "Script Family Match", desc: "ROMANCE-CRYPTO-PIG-2024 script detected in 18 DMs", severity: "Medium", time: "45m ago" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.severity === "Critical" ? "bg-red-500" : item.severity === "High" ? "bg-orange-500" : "bg-yellow-500"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{item.type}</span>
                        <Badge className={`text-xs border-0 ${item.severity === "Critical" ? "bg-red-100 text-red-700" : item.severity === "High" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}>{item.severity}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Threat Category Breakdown */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Threat Category Breakdown (30 Days)
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Romance / Pig Butchering", count: 612, pct: 35 },
                  { label: "Grooming & Child Safety", count: 489, pct: 28 },
                  { label: "Recovery & Refund Scams", count: 384, pct: 22 },
                  { label: "Fake Support Groups", count: 262, pct: 15 },
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
            <Card className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Quick Navigation</h2>
              <div className="space-y-2">
                {[
                  { label: "Grooming Detection", href: "/app/platformshield/grooming-detection" },
                  { label: "Fake Support Groups", href: "/app/platformshield/fake-support-groups" },
                  { label: "Recovery Scams", href: "/app/platformshield/recovery-scams" },
                  { label: "Scam Rings", href: "/app/platformshield/scam-rings" },
                  { label: "Script Families", href: "/app/platformshield/script-families" },
                  { label: "Accounts", href: "/app/platformshield/accounts" },
                  { label: "Evidence Vault", href: "/app/platformshield/evidence" },
                ].map((l, i) => (
                  <Link key={i} href={l.href} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group">
                    <span className="text-sm font-medium text-foreground">{l.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">System Health</h2>
              <div className="space-y-3 text-sm">
                {[
                  { label: "SCAMZY™ Model", value: "v4.2 Active", color: "text-green-600" },
                  { label: "Content Scan Rate", value: "28K/min", color: "text-foreground" },
                  { label: "False Positive Rate", value: "0.4%", color: "text-green-600" },
                  { label: "Moderation Backlog", value: "47 items", color: "text-yellow-600" },
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
