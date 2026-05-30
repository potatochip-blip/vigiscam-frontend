"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Database,
  TrendingUp,
  Clock,
  Shield,
  Filter,
  ArrowRight,
  AlertTriangle,
  Phone,
  Mail,
  Globe,
  Wallet,
  User,
  CheckCircle2,
  ExternalLink,
  Lock,
} from "lucide-react"
import {
  mockRegistryEntries,
  type IndicatorType,
  type ScamFamily,
  indicatorTypeLabels,
  scamFamilyLabels,
} from "@/lib/scam-intelligence-data"
import { IndicatorTypeBadge } from "@/components/scam-intelligence/indicator-type-badge"
import { VerificationBadge } from "@/components/scam-intelligence/verification-badge"
import { VigiscamLogo } from "@/components/vigiscam-logo"

const INDICATOR_TYPES: IndicatorType[] = [
  "domain",
  "url",
  "phone",
  "email",
  "wallet",
  "social-profile",
  "fake-support-page",
  "fake-company",
  "scam-script",
]

const SCAM_FAMILIES: ScamFamily[] = [
  "tech-support",
  "bank-impersonation",
  "romance",
  "recovery",
  "sextortion",
  "gift-card",
  "crypto",
  "remote-access",
  "deepfake",
  "check-fraud",
]

export default function RegistryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<IndicatorType | "all">("all")
  const [selectedFamily, setSelectedFamily] = useState<ScamFamily | "all">("all")
  const [sortBy, setSortBy] = useState<"recent" | "cases">("recent")

  const filteredEntries = useMemo(() => {
    let results = mockRegistryEntries

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(
        (entry) =>
          entry.indicator.toLowerCase().includes(term) ||
          entry.summary.toLowerCase().includes(term) ||
          entry.linkedNetwork.toLowerCase().includes(term) ||
          entry.commonPhrases.some((p) => p.toLowerCase().includes(term))
      )
    }

    if (selectedType !== "all") {
      results = results.filter((entry) => entry.type === selectedType)
    }

    if (selectedFamily !== "all") {
      results = results.filter((entry) => entry.scamFamily === selectedFamily)
    }

    if (sortBy === "cases") {
      results.sort((a, b) => b.caseCount - a.caseCount)
    } else {
      results.sort(
        (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
      )
    }

    return results
  }, [searchTerm, selectedType, selectedFamily, sortBy])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-slate-100 border-b">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <VigiscamLogo size="sm" variant="icon" />
                <div className="border-l border-muted pl-3">
                  <span className="text-sm font-medium text-muted-foreground block">Scam Intelligence Registry</span>
                  <span className="text-xs text-muted-foreground">Powered by VIGISCAM™</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Verified Scam Indicators Database</h1>
              <p className="text-lg text-muted-foreground">
                Client-reported, VIGISCAM™-verified, public-safe scam indicators. Every record has passed independent verification and a public-safe review. Raw reports and unverified allegations are never published.
              </p>
            </div>
          </div>
        </section>

        {/* Policy notice */}
        <section className="bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-sm text-blue-800">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                <span>Raw reports remain strictly private</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                <span>Only verified, public-safe records are shown here</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                <span>Badges: Verified Malicious · High-Risk Verified · Officially Reported · Takedown Confirmed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar — reflects actual demo data */}
        <section className="border-b bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-primary">{mockRegistryEntries.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Published Indicators</p>
                  <p className="text-xs text-orange-600 mt-0.5 font-medium">Demo dataset</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-orange-600">
                    {mockRegistryEntries.filter((e) => e.takedownStatus !== "confirmed").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Active Threats</p>
                  <p className="text-xs text-orange-600 mt-0.5 font-medium">Demo dataset</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-green-600">
                    {mockRegistryEntries.filter((e) => e.takedownStatus === "confirmed").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Takedowns Confirmed</p>
                  <p className="text-xs text-orange-600 mt-0.5 font-medium">Demo dataset</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold text-blue-600">
                    {new Set(mockRegistryEntries.map((e) => e.linkedNetwork)).size}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Fraud Networks Mapped</p>
                  <p className="text-xs text-orange-600 mt-0.5 font-medium">Demo dataset</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="bg-white border-b sticky top-16 z-40">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search indicators, domains, phone numbers, wallets, networks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Indicator Type</Label>
                  <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {INDICATOR_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {indicatorTypeLabels[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Scam Family</Label>
                  <Select value={selectedFamily} onValueChange={(value: any) => setSelectedFamily(value)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Families</SelectItem>
                      {SCAM_FAMILIES.map((family) => (
                        <SelectItem key={family} value={family}>
                          {scamFamilyLabels[family]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium">Sort By</Label>
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="cases">Most Cases</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedType("all")
                      setSelectedFamily("all")
                      setSortBy("recent")
                    }}
                    className="w-full h-9"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold">{filteredEntries.length}</span> of{" "}
                <span className="font-semibold">{mockRegistryEntries.length}</span> entries
              </p>
            </div>

            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No indicators found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you&apos;re looking for.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEntries.map((entry) => (
                  <Card key={entry.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Indicator */}
                        <div className="md:col-span-2">
                          <div className="flex items-start gap-3 mb-3">
                            <IndicatorTypeBadge type={entry.type} size="md" showLabel={false} />
                            <div className="flex-1 min-w-0">
                              <div className="font-mono text-sm font-medium break-all text-foreground">
                                {entry.indicator}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                ID: {entry.id}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {entry.summary}
                          </p>
                        </div>

                        {/* Status and Details */}
                        <div>
                          <div className="flex flex-col gap-2">
                            <VerificationBadge status={entry.status} size="sm" />
                            <Badge variant="outline" className="text-xs">
                              {scamFamilyLabels[entry.scamFamily]}
                            </Badge>
                            <div className="text-xs text-muted-foreground">
                              <div className="flex items-center gap-1 mt-1">
                                <AlertTriangle className="h-3 w-3" />
                                {entry.caseCount} cases
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col justify-between">
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Last seen: {new Date(entry.lastSeen).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              Network: {entry.linkedNetwork}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            asChild
                          >
                            <Link href={`/scam-intelligence/registry/${entry.id}`}>
                              View Details
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Additional Info */}
        <section className="bg-slate-50 border-t py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">About This Database</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      How We Verify
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>Every entry in this database is verified through:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Client scam reports and case analysis</li>
                      <li>SCAMZY™ AI network analysis and script matching</li>
                      <li>A1SCAMSHIELD™ acoustic and linguistic analysis</li>
                      <li>Third-party intelligence and law enforcement data</li>
                      <li>Blockchain and domain registration analysis</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      How We Use It
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>This registry powers:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Real-time call/SMS/email blocking for VIGISCAM™ users</li>
                      <li>Financial institution fraud prevention systems</li>
                      <li>Takedown requests to platforms and hosts</li>
                      <li>Law enforcement investigations</li>
                      <li>Public education and awareness campaigns</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
