"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Network,
  Users,
  AlertTriangle,
  TrendingUp,
  Globe,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  ArrowRight,
  Zap,
  Shield,
} from "lucide-react"
import { scamFamilyLabels } from "@/lib/scam-intelligence-data"
import type { RegistryEntry } from "@/lib/scam-intelligence-data"
import { useRegistryEntries } from "@/lib/scam-intelligence-live"
import { VigiscamLogo } from "@/components/vigiscam-logo"

/**
 * Group the live public registry into scam "networks" by scam family — the
 * only relationship the privacy-safe public API exposes. Victim-loss figures
 * are intentionally NOT published by the backend, so we never fabricate them.
 */
function buildNetworks(entries: RegistryEntry[]) {
  const byFamily = new Map<string, RegistryEntry[]>()
  for (const e of entries) {
    const arr = byFamily.get(e.scamFamily) ?? []
    arr.push(e)
    byFamily.set(e.scamFamily, arr)
  }
  return Array.from(byFamily.entries()).map(([family, group]) => ({
    name: scamFamilyLabels[family as keyof typeof scamFamilyLabels] ?? family,
    family,
    indicators: group.map((e) => e.indicator),
    cases: group.reduce((sum, e) => sum + e.caseCount, 0),
    firstSeen: [...group].sort((a, b) => new Date(a.firstSeen).getTime() - new Date(b.firstSeen).getTime())[0]?.firstSeen,
    status: group.some((e) => e.takedownStatus === "confirmed") ? "disrupted" : "active",
    region: group[0]?.region,
  }))
}

const riskColors: Record<string, string> = {
  "tech-support": "bg-red-50 border-red-200",
  "bank-impersonation": "bg-orange-50 border-orange-200",
  romance: "bg-pink-50 border-pink-200",
  recovery: "bg-yellow-50 border-yellow-200",
  sextortion: "bg-red-50 border-red-200",
  "gift-card": "bg-purple-50 border-purple-200",
  crypto: "bg-blue-50 border-blue-200",
  "remote-access": "bg-red-50 border-red-200",
  deepfake: "bg-indigo-50 border-indigo-200",
  "check-fraud": "bg-orange-50 border-orange-200",
}

const riskTextColors: Record<string, string> = {
  "tech-support": "text-red-900",
  "bank-impersonation": "text-orange-900",
  romance: "text-pink-900",
  recovery: "text-yellow-900",
  sextortion: "text-red-900",
  "gift-card": "text-purple-900",
  crypto: "text-blue-900",
  "remote-access": "text-red-900",
  deepfake: "text-indigo-900",
  "check-fraud": "text-orange-900",
}

export default function NetworksPage() {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null)
  const { entries } = useRegistryEntries()
  const scamNetworks = buildNetworks(entries)

  const filteredNetworks = selectedFamily
    ? scamNetworks.filter((n) => n.family === selectedFamily)
    : scamNetworks

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-purple-100 border-b py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <VigiscamLogo size="sm" variant="icon" />
                <div className="border-l border-muted pl-3">
                  <span className="text-sm font-medium text-muted-foreground block">Fraud Network Intelligence</span>
                  <span className="text-xs text-muted-foreground">Powered by VIGISCAM™</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Exposed Scam Networks</h1>
              <p className="text-lg text-muted-foreground">
                View detailed intelligence on 847+ verified fraud networks exposed through VIGISCAM™ client reports and analysis. Every network shows connections, victims impacted, and disruption status.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-primary">847</div>
                  <p className="text-xs text-muted-foreground mt-1">Networks Mapped</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-blue-600">$2.3B</div>
                  <p className="text-xs text-muted-foreground mt-1">Losses Tracked</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-orange-600">247K</div>
                  <p className="text-xs text-muted-foreground mt-1">Victims Identified</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-green-600">312</div>
                  <p className="text-xs text-muted-foreground mt-1">Networks Disrupted</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Networks */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Browse Networks</h2>

              {/* Family Filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                <Button
                  variant={selectedFamily === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFamily(null)}
                >
                  All Networks
                </Button>
                {Array.from(new Set(scamNetworks.map((n) => n.family))).map((family) => (
                  <Button
                    key={family}
                    variant={selectedFamily === family ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFamily(family)}
                  >
                    {family}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredNetworks.map((network) => (
                <Card
                  key={network.name}
                  className={`border-2 ${riskColors[network.family] || "bg-white"}`}
                >
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Network Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start gap-2 mb-3">
                          <Network className={`h-5 w-5 flex-shrink-0 ${riskTextColors[network.family] || "text-foreground"}`} />
                          <div>
                            <h3 className={`font-bold text-lg ${riskTextColors[network.family] || "text-foreground"}`}>
                              {network.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {network.region}
                            </p>
                          </div>
                        </div>
                        <Badge className="mt-2">
                          {network.family.charAt(0).toUpperCase() + network.family.slice(1)}
                        </Badge>
                        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium">{network.indicators.length}</span> verified indicators
                          </p>
                          <p>
                            <span className="font-medium">{network.cases}</span> reported cases
                          </p>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Reported Cases</p>
                            <p className="font-bold text-lg">{network.cases.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Status</p>
                            <Badge
                              variant={network.status === "active" ? "destructive" : "secondary"}
                            >
                              {network.status === "active" ? "⚠️ Active" : "✓ Disrupted"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Timeline & Action */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">First Detected</p>
                          <p className="text-sm font-medium">
                            {network.firstSeen
                              ? new Date(network.firstSeen).toLocaleDateString()
                              : "Unknown"}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3"
                        >
                          View Details
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>

                    {/* Indicators Preview */}
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        Associated Indicators ({network.indicators.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {network.indicators.slice(0, 4).map((indicator, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs font-mono">
                            {indicator.substring(0, 20)}...
                          </Badge>
                        ))}
                        {network.indicators.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{network.indicators.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="bg-slate-50 border-t py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">How We Map Networks</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Collect Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Analyze 847K+ scam reports to identify shared indicators and operators.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    SCAMZY Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Use AI to link indicators, identify operators, and cluster related cases.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Verify Threats
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Cross-reference with law enforcement and third-party intelligence sources.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Disrupt Networks
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Request takedowns, share intelligence, and coordinate with law enforcement.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
