"use client"

import Link from "next/link"
import useSWR from "swr"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Radio, ShieldCheck, Network, Database, Zap, Users, Globe, AlertTriangle,
  ArrowRight, Loader2,
} from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Metrics = {
  signals?: { newToday?: number; underReview?: number; verified?: number; userReports?: number; partnerReports?: number }
  clusters?: { active?: number; highRisk?: number }
  registry?: { published?: number; candidates?: number }
  rules?: { active?: number }
}
type Signal = { id: string; indicatorValue?: string; status?: string; category?: string | null; geography?: string | null; confidenceScore?: number }
type Cluster = { id: string; label?: string; category?: string | null; signalCount?: number; confidenceScore?: number }

async function fetchOverview() {
  const [m, s, c] = await Promise.all([
    backend.GET("/api/v1/intelligence/metrics"),
    backend.GET("/api/v1/intelligence/signals"),
    backend.GET("/api/v1/intelligence/clusters"),
  ])
  if (!m.response.ok) throw new Error(`Failed (${m.response.status})`)
  return {
    metrics: (m.data as unknown as Metrics) ?? {},
    signals: ((s.data as unknown as Signal[]) ?? []).slice(0, 6),
    clusters: ((c.data as unknown as Cluster[]) ?? []).slice(0, 6),
  }
}

export default function IntelligenceOverviewPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "intel-overview" : null, fetchOverview, { revalidateOnFocus: false })
  const m = data?.metrics ?? {}

  const cards = [
    { label: "New Signals Today", value: m.signals?.newToday ?? 0, icon: Radio, color: "text-blue-600" },
    { label: "Signals Under Review", value: m.signals?.underReview ?? 0, icon: AlertTriangle, color: "text-amber-600" },
    { label: "Verified Patterns", value: m.signals?.verified ?? 0, icon: ShieldCheck, color: "text-green-600" },
    { label: "High-Risk Clusters", value: m.clusters?.highRisk ?? 0, icon: Network, color: "text-red-600" },
    { label: "Published Registry", value: m.registry?.published ?? 0, icon: Database, color: "text-primary" },
    { label: "Active Rules", value: m.rules?.active ?? 0, icon: Zap, color: "text-purple-600" },
    { label: "Partner Reports", value: m.signals?.partnerReports ?? 0, icon: Globe, color: "text-indigo-600" },
    { label: "User Reports", value: m.signals?.userReports ?? 0, icon: Users, color: "text-teal-600" },
  ]
  const nav = [
    { label: "Live Signal Feed", href: "/app/intelligence/signals", icon: Radio, desc: "View and action all incoming signals" },
    { label: "Scam Clusters", href: "/app/intelligence/clusters", icon: Network, desc: "Browse and manage cluster intelligence" },
    { label: "Registry Review", href: "/app/intelligence/registry-review", icon: Database, desc: "Approve or reject registry candidates" },
    { label: "Detection Rules", href: "/app/intelligence/rules", icon: Zap, desc: "Review updated detection rules" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Radio className="h-5 w-5 text-primary" />
                <h1 className="text-2xl font-bold">SCAMZY™ Live Intelligence Engine</h1>
                <span className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-sm ml-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Active
                </span>
              </div>
              <p className="text-muted-foreground text-sm">Continuously gather, score, verify, classify, and safely apply emerging scam intelligence.</p>
            </div>

            {isLoading ? (
              <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading intelligence…</div>
            ) : error ? (
              <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load intelligence (reviewer access required).</div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cards.map((m2) => {
                    const Icon = m2.icon
                    return (
                      <Card key={m2.label}><CardContent className="pt-5">
                        <Icon className={`h-5 w-5 ${m2.color} mb-2`} />
                        <div className="text-2xl font-bold text-foreground">{m2.value.toLocaleString()}</div>
                        <p className="text-xs font-medium text-muted-foreground mt-1">{m2.label}</p>
                      </CardContent></Card>
                    )
                  })}
                </div>

                <div className="grid md:grid-cols-4 gap-3">
                  {nav.map((n) => {
                    const Icon = n.icon
                    return (
                      <Link key={n.href} href={n.href}>
                        <Card className="hover:border-primary hover:shadow-sm transition-all cursor-pointer h-full"><CardContent className="pt-4">
                          <Icon className="h-5 w-5 text-primary mb-2" />
                          <p className="font-semibold text-sm text-foreground">{n.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{n.desc}</p>
                        </CardContent></Card>
                      </Link>
                    )
                  })}
                </div>

                <Card>
                  <CardHeader className="pb-3"><div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2"><Radio className="h-4 w-4 text-primary" /> Recent Signals</CardTitle>
                    <Button variant="ghost" size="sm" asChild><Link href="/app/intelligence/signals">View All <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link></Button>
                  </div></CardHeader>
                  <CardContent>
                    {(data?.signals.length ?? 0) === 0 ? <p className="text-sm text-muted-foreground">No signals yet.</p> : (
                      <div className="space-y-3">
                        {data?.signals.map((sig) => (
                          <div key={sig.id} className="flex items-center gap-3 p-2.5 rounded-md border bg-muted/30">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-xs font-medium truncate">{sig.indicatorValue ?? sig.id.slice(0, 8)}</span>
                                {sig.status && <Badge variant="outline" className="text-xs flex-shrink-0">{sig.status.replace(/_/g, " ").toLowerCase()}</Badge>}
                              </div>
                              <div className="text-xs text-muted-foreground">{[sig.category, sig.geography].filter(Boolean).join(" · ")}</div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className={`text-sm font-bold ${(sig.confidenceScore ?? 0) >= 80 ? "text-red-600" : (sig.confidenceScore ?? 0) >= 60 ? "text-amber-600" : "text-muted-foreground"}`}>{sig.confidenceScore ?? 0}</div>
                              <div className="text-xs text-muted-foreground">conf.</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3"><div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2"><Network className="h-4 w-4 text-primary" /> Active Scam Clusters</CardTitle>
                    <Button variant="ghost" size="sm" asChild><Link href="/app/intelligence/clusters">View All <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link></Button>
                  </div></CardHeader>
                  <CardContent>
                    {(data?.clusters.length ?? 0) === 0 ? <p className="text-sm text-muted-foreground">No clusters yet.</p> : (
                      <div className="space-y-2">
                        {data?.clusters.map((cluster) => (
                          <div key={cluster.id} className="flex items-center gap-4 p-3 rounded-md border bg-muted/20">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold truncate">{cluster.label ?? "Cluster"}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{cluster.category ?? "—"}</p>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0 text-xs text-muted-foreground">
                              <span>{cluster.signalCount ?? 0} signals</span>
                              <Badge variant="outline" className="text-xs">{cluster.confidenceScore ?? 0}%</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
