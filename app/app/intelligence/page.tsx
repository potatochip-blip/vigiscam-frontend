"use client"

import Link from "next/link"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Radio,
  TrendingUp,
  ShieldCheck,
  Network,
  Database,
  Zap,
  Users,
  Globe,
  AlertTriangle,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react"
import {
  mockScamSignals,
  mockScamClusters,
  mockDetectionRules,
  mockRegistryReviewQueue,
  mockEvidenceEvents,
  signalStatusLabels,
  intelligenceScamCategoryLabels,
} from "@/lib/scam-intelligence-data"

const metrics = [
  { label: "New Signals Today", value: "47", icon: Radio, color: "text-blue-600", sub: "+12 from yesterday" },
  { label: "Signals Under Review", value: "8", icon: AlertTriangle, color: "text-amber-600", sub: "Awaiting analyst" },
  { label: "Verified Scam Patterns", value: "1,204", icon: ShieldCheck, color: "text-green-600", sub: "In detection system" },
  { label: "High-Risk Clusters", value: "5", icon: Network, color: "text-red-600", sub: "Active right now" },
  { label: "Public-Safe Registry", value: "15,247", icon: Database, color: "text-primary", sub: "Published entries" },
  { label: "Detection Rules Updated", value: "8", icon: Zap, color: "text-purple-600", sub: "Last 7 days" },
  { label: "Partner Reports", value: "134", icon: Globe, color: "text-indigo-600", sub: "This month" },
  { label: "User Reports", value: "2,891", icon: Users, color: "text-teal-600", sub: "This month" },
]

const statusColors: Record<string, string> = {
  "unverified-report": "bg-gray-100 text-gray-700 border-gray-200",
  "suspicious-signal": "bg-amber-100 text-amber-800 border-amber-200",
  "pattern-match": "bg-blue-100 text-blue-800 border-blue-200",
  "under-review": "bg-purple-100 text-purple-800 border-purple-200",
  "high-risk-indicator": "bg-red-100 text-red-800 border-red-200",
  "verified-scam-intelligence": "bg-green-100 text-green-800 border-green-200",
  "public-safe-alert": "bg-teal-100 text-teal-800 border-teal-200",
  "archived": "bg-slate-100 text-slate-600 border-slate-200",
}

export default function IntelligenceOverviewPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto space-y-6">

            {/* Page Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Radio className="h-5 w-5 text-primary" />
                <h1 className="text-2xl font-bold">SCAMZY™ Live Intelligence Engine</h1>
                <span className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-sm ml-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Continuously gather, score, verify, classify, and safely apply emerging scam intelligence.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((m) => {
                const Icon = m.icon
                return (
                  <Card key={m.label}>
                    <CardContent className="pt-5">
                      <div className="flex items-start justify-between mb-2">
                        <Icon className={`h-5 w-5 ${m.color}`} />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{m.value}</div>
                      <p className="text-xs font-medium text-muted-foreground mt-1">{m.label}</p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">{m.sub}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Quick Nav */}
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { label: "Live Signal Feed", href: "/app/intelligence/signals", icon: Radio, desc: "View and action all incoming signals" },
                { label: "Scam Clusters", href: "/app/intelligence/clusters", icon: Network, desc: "Browse and manage cluster intelligence" },
                { label: "Registry Review", href: "/app/intelligence/registry-review", icon: Database, desc: "Approve or reject registry candidates" },
                { label: "Detection Rules", href: "/app/intelligence/rules", icon: Zap, desc: "Review updated detection rules" },
              ].map((nav) => {
                const Icon = nav.icon
                return (
                  <Link key={nav.href} href={nav.href}>
                    <Card className="hover:border-primary hover:shadow-sm transition-all cursor-pointer h-full">
                      <CardContent className="pt-4">
                        <Icon className="h-5 w-5 text-primary mb-2" />
                        <p className="font-semibold text-sm text-foreground">{nav.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{nav.desc}</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>

            {/* Recent Signals + Evidence Events */}
            <div className="grid lg:grid-cols-3 gap-5">

              {/* Recent Signals */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Radio className="h-4 w-4 text-primary" />
                        Recent Signals
                      </CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/app/intelligence/signals">
                          View All <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockScamSignals.slice(0, 5).map((signal) => (
                        <div key={signal.id} className="flex items-center gap-3 p-2.5 rounded-md border bg-muted/30">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-xs font-medium truncate">{signal.indicator}</span>
                              <Badge variant="outline" className={`text-xs flex-shrink-0 border ${statusColors[signal.status]}`}>
                                {signalStatusLabels[signal.status]}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{intelligenceScamCategoryLabels[signal.category]}</span>
                              <span>·</span>
                              <span>{signal.geography}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className={`text-sm font-bold ${signal.riskScore >= 80 ? "text-red-600" : signal.riskScore >= 60 ? "text-amber-600" : "text-muted-foreground"}`}>
                              {signal.riskScore}
                            </div>
                            <div className="text-xs text-muted-foreground">risk</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Evidence Events */}
              <div>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Evidence Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockEvidenceEvents.slice(0, 6).map((evt) => (
                        <div key={evt.id} className="flex gap-2.5">
                          <div className="flex-shrink-0 mt-0.5">
                            {evt.eventType === "registry-approved" ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                            ) : evt.eventType === "registry-rejected" ? (
                              <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                            ) : (
                              <div className="h-3.5 w-3.5 rounded-full bg-primary/40" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-foreground leading-tight">{evt.summary}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{evt.actor}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>

            {/* Active Clusters Summary */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Network className="h-4 w-4 text-primary" />
                    Active Scam Clusters
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/app/intelligence/clusters">
                      View All <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockScamClusters.map((cluster) => (
                    <div key={cluster.id} className="flex items-center gap-4 p-3 rounded-md border bg-muted/20">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{cluster.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{intelligenceScamCategoryLabels[cluster.category]}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 text-xs text-muted-foreground">
                        <span>{cluster.linkedDomains + cluster.linkedPhones} indicators</span>
                        <span className={`font-semibold ${cluster.trend === "rising" ? "text-red-600" : cluster.trend === "declining" ? "text-green-600" : "text-amber-600"}`}>
                          {cluster.trend === "rising" ? "Rising" : cluster.trend === "declining" ? "Declining" : "Stable"}
                        </span>
                        <Badge variant="outline" className="text-xs">{cluster.confidenceLevel}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  )
}
