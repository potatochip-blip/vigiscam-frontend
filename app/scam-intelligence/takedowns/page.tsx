"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Clock,
  Globe,
  AlertCircle,
  Zap,
  ShieldCheck,
  Users,
  TrendingDown,
  Calendar,
  MapPin,
  Target,
  ArrowRight,
  Filter,
} from "lucide-react"
import { mockRegistryEntries } from "@/lib/scam-intelligence-data"
import { VigiscamLogo } from "@/components/vigiscam-logo"
import { useState } from "react"

// Extract confirmed takedowns
const confirmedTakedowns = mockRegistryEntries
  .filter((entry) => entry.takedownStatus === "confirmed")
  .map((entry, idx) => ({
    id: idx,
    indicator: entry.indicator,
    type: entry.type,
    network: entry.linkedNetwork,
    family: entry.scamFamily,
    dateRequested: new Date(entry.firstSeen),
    dateConfirmed: new Date(new Date(entry.firstSeen).getTime() + Math.random() * 200 * 24 * 60 * 60 * 1000),
    reason: "Verified phishing and credential harvesting",
    action: `Domain seized by ${Math.random() > 0.5 ? "ICANN" : "hosting provider"}`,
    preventedLosses: Math.floor(Math.random() * 5000000 + 100000),
  }))
  .sort((a, b) => b.dateConfirmed.getTime() - a.dateConfirmed.getTime())

const inProgressTakedowns = mockRegistryEntries
  .filter((entry) => entry.takedownStatus === "in-progress")
  .map((entry, idx) => ({
    id: `ip-${idx}`,
    indicator: entry.indicator,
    type: entry.type,
    network: entry.linkedNetwork,
    family: entry.scamFamily,
    dateRequested: new Date(entry.firstSeen),
    daysInProgress: Math.floor(Math.random() * 180 + 1),
    provider: "Cloudflare / Google",
    status: "Awaiting provider response",
    caseCount: entry.caseCount,
  }))
  .slice(0, 5)

export default function TakedownsPage() {
  const [viewMode, setViewMode] = useState<"confirmed" | "progress">("confirmed")

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-green-100 border-b py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <VigiscamLogo size="sm" variant="icon" />
                <div className="border-l border-muted pl-3">
                  <span className="text-sm font-medium text-muted-foreground block">Disruption & Takedown</span>
                  <span className="text-xs text-muted-foreground">Powered by VIGISCAM™</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Verified Takedowns</h1>
              <p className="text-lg text-muted-foreground">
                Track confirmed takedowns of scam infrastructure. 1,204+ domains, phone numbers, and accounts have been removed or disrupted. Learn how VIGISCAM™ collaborates with platforms, hosting providers, and law enforcement to shut down fraud operations.
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
                  <div className="text-3xl font-bold text-green-600">1,204</div>
                  <p className="text-xs text-muted-foreground mt-1">Confirmed Takedowns</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-blue-600">$847M</div>
                  <p className="text-xs text-muted-foreground mt-1">Losses Prevented</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-purple-600">156</div>
                  <p className="text-xs text-muted-foreground mt-1">In Progress</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-orange-600">23</div>
                  <p className="text-xs text-muted-foreground mt-1">Days Avg Response</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* View Selector */}
        <section className="bg-white border-b py-4 sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "confirmed" ? "default" : "outline"}
                onClick={() => setViewMode("confirmed")}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirmed ({confirmedTakedowns.length})
              </Button>
              <Button
                variant={viewMode === "progress" ? "default" : "outline"}
                onClick={() => setViewMode("progress")}
              >
                <Zap className="h-4 w-4 mr-2" />
                In Progress ({inProgressTakedowns.length})
              </Button>
            </div>
          </div>
        </section>

        {/* Confirmed Takedowns */}
        {viewMode === "confirmed" && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Confirmed Takedowns</h2>
                <p className="text-muted-foreground mt-2">
                  Infrastructure successfully removed or disabled
                </p>
              </div>

              <div className="space-y-4">
                {confirmedTakedowns.slice(0, 10).map((takedown) => (
                  <Card key={takedown.id} className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Main Info */}
                        <div className="md:col-span-2">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                              <h3 className="font-mono text-sm font-bold break-all">
                                {takedown.indicator}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {takedown.network}
                              </p>
                            </div>
                          </div>
                          <Badge className="mt-3">{takedown.family}</Badge>
                        </div>

                        {/* Dates */}
                        <div>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-muted-foreground">Requested</p>
                              <p className="text-sm font-medium">
                                {takedown.dateRequested.toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Confirmed</p>
                              <p className="text-sm font-medium text-green-700">
                                {takedown.dateConfirmed.toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Timeline</p>
                              <p className="text-sm font-medium">
                                {Math.floor(
                                  (takedown.dateConfirmed.getTime() -
                                    takedown.dateRequested.getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )}{" "}
                                days
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Impact */}
                        <div className="flex flex-col justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Action Taken</p>
                            <p className="text-sm font-medium mt-1">{takedown.action}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {takedown.reason}
                            </p>
                          </div>
                          <div className="mt-3 p-3 bg-green-100 rounded">
                            <p className="text-xs text-muted-foreground">Losses Prevented</p>
                            <p className="text-lg font-bold text-green-700">
                              ${(takedown.preventedLosses / 1000000).toFixed(1)}M
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">
                  View All {confirmedTakedowns.length} Confirmed Takedowns
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* In Progress Takedowns */}
        {viewMode === "progress" && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">In Progress Takedowns</h2>
                <p className="text-muted-foreground mt-2">
                  Takedown requests pending provider action
                </p>
              </div>

              <div className="space-y-4">
                {inProgressTakedowns.map((takedown) => (
                  <Card key={takedown.id} className="border-orange-200 bg-orange-50">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Main Info */}
                        <div className="md:col-span-2">
                          <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                            <div>
                              <h3 className="font-mono text-sm font-bold break-all">
                                {takedown.indicator}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {takedown.network}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="mt-3">
                            {takedown.family}
                          </Badge>
                        </div>

                        {/* Timeline */}
                        <div>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-muted-foreground">Requested</p>
                              <p className="text-sm font-medium">
                                {takedown.dateRequested.toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Days Pending</p>
                              <p className="text-sm font-bold text-orange-700">
                                {takedown.daysInProgress} days
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="flex flex-col justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Provider</p>
                            <p className="text-sm font-medium">{takedown.provider}</p>
                            <div className="mt-3">
                              <Badge variant="secondary">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {takedown.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {takedown.caseCount} reports
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How We Do Takedowns */}
        <section className="bg-slate-50 border-t py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Our Takedown Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    1. Verify
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Analyze reports and confirm indicator is linked to active fraud operations.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    2. Identify Provider
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Determine hosting provider, domain registrar, or platform responsible for indicator.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    3. Submit Request
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  File formal takedown request with documented evidence of malicious activity.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    4. Monitor & Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Track removal and publish confirmation to inform users and prevent re-victimization.
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
