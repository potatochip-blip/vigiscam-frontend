'use client'

import useSWR from "swr"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield, Activity, Bell, Archive,
  AlertTriangle, CheckCircle, Monitor, Users, Clock, ArrowRight, Loader2
} from "lucide-react"
import Link from "next/link"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type RiskEvent = { id: string; eventType?: string; riskLevel?: string; riskScore?: number; createdAt?: string }

async function getArr<T>(path: string): Promise<T[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, response } = await (backend.GET as any)(path)
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as T[]) ?? []
}
async function getObj(path: string): Promise<Record<string, unknown>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, response } = await (backend.GET as any)(path)
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as Record<string, unknown>) ?? {}
}

const RANK: Record<string, number> = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 }
const levelColor = (lvl: string) => {
  const u = lvl.toUpperCase()
  if (u === "CRITICAL" || u === "HIGH") return "text-red-600"
  if (u === "MEDIUM") return "text-amber-600"
  return "text-green-600"
}
const dotColor = (lvl?: string) => {
  const u = (lvl ?? "").toUpperCase()
  return u === "CRITICAL" || u === "HIGH" ? "bg-red-500" : u === "MEDIUM" ? "bg-yellow-500" : "bg-green-500"
}
const sinceLabel = (v?: string) => {
  if (!v) return "—"
  const d = new Date(v)
  if (isNaN(d.getTime())) return "—"
  const mins = Math.round((Date.now() - d.getTime()) / 60000)
  if (mins < 60) return `${Math.max(mins, 1)}m ago`
  if (mins < 1440) return `${Math.round(mins / 60)}h ago`
  return `${Math.round(mins / 1440)}d ago`
}

const PROTECTION_MODULES: [string, string][] = [
  ["scamHoldEnabled", "ScamHold (AI call/transfer hold)"],
  ["guardianPauseEnabled", "Guardian Pause"],
  ["giftCardGuardEnabled", "Gift Card Guard"],
  ["walletGuardEnabled", "Wallet Guard"],
  ["claimVerifyEnabled", "Claim Verify"],
]

export default function IndividualOverviewPage() {
  const { isAuthenticated } = useAuth()
  const { data: events, isLoading: le } = useSWR(isAuthenticated ? "ind-ov-events" : null, () => getArr<RiskEvent>("/api/v1/risk-events"), { revalidateOnFocus: false })
  const { data: settings } = useSWR(isAuthenticated ? "ind-ov-settings" : null, () => getObj("/api/v1/protection-settings"), { revalidateOnFocus: false })
  const { data: devices } = useSWR(isAuthenticated ? "ind-ov-devices" : null, () => getArr<unknown>("/api/v1/devices"), { revalidateOnFocus: false })
  const { data: contacts } = useSWR(isAuthenticated ? "ind-ov-contacts" : null, () => getArr<unknown>("/api/v1/trusted-contacts"), { revalidateOnFocus: false })

  const evs = events ?? []
  const highestRank = evs.reduce((m, e) => Math.max(m, RANK[(e.riskLevel ?? "").toUpperCase()] ?? 0), 0)
  const riskLabel = highestRank >= 4 ? "Critical" : highestRank === 3 ? "High" : highestRank === 2 ? "Medium" : "Low"
  const blocked = evs.filter((e) => ["HIGH", "CRITICAL"].includes((e.riskLevel ?? "").toUpperCase())).length
  const recent = [...evs].sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()).slice(0, 5)

  const stats = [
    { label: "Current Risk Level", value: riskLabel, color: levelColor(riskLabel), bg: "bg-muted", icon: Shield },
    { label: "High-Risk Events", value: String(blocked), color: "text-primary", bg: "bg-primary/10", icon: CheckCircle },
    { label: "Protected Devices", value: String(devices?.length ?? 0), color: "text-blue-600", bg: "bg-blue-50", icon: Monitor },
    { label: "Trusted Contacts", value: String(contacts?.length ?? 0), color: "text-orange-600", bg: "bg-orange-50", icon: Users },
  ]

  return (
    <PageLayout role="individual" title="Individual Guardian" subtitle="Your personal scam protection dashboard">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
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
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Protection Status
            </h2>
            <div className="space-y-4">
              {PROTECTION_MODULES.map(([key, label]) => {
                const on = !!settings?.[key]
                return (
                  <div key={key} className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground truncate">{label}</span>
                        <Badge className={on ? "bg-green-100 text-green-700 border-0 text-xs" : "bg-muted text-muted-foreground border-0 text-xs"}>
                          {on ? "Active" : "Off"}
                        </Badge>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${on ? "bg-green-500" : "bg-muted"} rounded-full`} style={{ width: on ? "100%" : "0%" }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" asChild><Link href="/app/individual/live-protection">View Live Protection</Link></Button>
              <Button size="sm" variant="outline" asChild><Link href="/app/individual/settings">Configure</Link></Button>
            </div>
          </Card>

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

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Recent Alerts
            </h2>
            <Button size="sm" variant="ghost" asChild><Link href="/app/individual/alerts">View All</Link></Button>
          </div>
          {le ? (
            <div className="flex items-center gap-2 py-10 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
          ) : recent.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground"><CheckCircle className="h-8 w-8 text-green-500" /><p className="font-medium">No alerts — you're all clear.</p></div>
          ) : (
            <div className="space-y-3">
              {recent.map((alert) => {
                const lvl = (alert.riskLevel ?? "LOW").toUpperCase()
                const high = lvl === "HIGH" || lvl === "CRITICAL"
                return (
                  <div key={alert.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${dotColor(lvl)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-foreground">{alert.eventType ?? "Risk event"}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {sinceLabel(alert.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">Risk score {alert.riskScore ?? "—"}/100</p>
                    </div>
                    <Badge className={high ? "bg-red-100 text-red-700 border-0 text-xs flex-shrink-0" : "bg-yellow-100 text-yellow-700 border-0 text-xs flex-shrink-0"}>
                      {lvl}
                    </Badge>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      </div>
    </PageLayout>
  )
}
