'use client'

import { useState } from "react"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Fingerprint, Search, AlertTriangle, Network, Archive, Download,
  Phone, Mail, Globe, Hash, Image, Mic, Users, Link2, CheckCircle, Eye
} from "lucide-react"

const searchTypes = [
  { value: "name", label: "Name", icon: Users },
  { value: "phone", label: "Phone Number", icon: Phone },
  { value: "email", label: "Email Address", icon: Mail },
  { value: "wallet", label: "Crypto Wallet", icon: Hash },
  { value: "domain", label: "Website / Domain", icon: Globe },
  { value: "handle", label: "Social Media Handle", icon: Users },
  { value: "image", label: "Profile Image (hash)", icon: Image },
  { value: "voice", label: "Voice Sample", icon: Mic },
  { value: "phrase", label: "Script Phrase", icon: Mail },
]

const mockCollisionResult = {
  query: "alex_investor_sg",
  queryType: "Social Media Handle",
  matchCount: 4,
  clusterName: "Romance Crypto Investment Grooming Cluster",
  riskScore: 88,
  nodes: [
    { type: "handle", value: "alex_investor_sg (Instagram)", role: "Primary contact", risk: "critical" },
    { type: "handle", value: "alex.chen.sg (Facebook)", role: "Alt identity", risk: "high" },
    { type: "phone", value: "+65 8888 0123", role: "Contact number", risk: "high" },
    { type: "wallet", value: "0x4f3a9c2d...example", role: "Crypto destination", risk: "critical" },
    { type: "domain", value: "coinvest-returns.example.io", role: "Investment platform", risk: "critical" },
    { type: "image", value: "profile_hash_af92c (stock photo match — 14 scam profiles)", role: "Profile photo reuse", risk: "critical" },
    { type: "email", value: "alex.c.invest@proton.me", role: "Email used", risk: "medium" },
    { type: "phrase", value: '"I only share this with people I truly trust"', role: "Script phrase match", risk: "high" },
  ],
  victimReports: 14,
  linkedClusters: ["Romance Crypto Investment Grooming Cluster", "Southeast Asia Pig-Butchering Network"],
  firstSeen: "2025-08-14",
  lastActive: "2026-05-14",
}

const searchHistory = [
  {
    id: "IG-001",
    query: "alex_investor_sg",
    type: "Social Media Handle",
    matches: 4,
    riskScore: 88,
    cluster: "Romance Crypto Investment Grooming Cluster",
    checkedAt: "2h ago",
  },
  {
    id: "IG-002",
    query: "+1-888-555-0198",
    type: "Phone Number",
    matches: 2,
    riskScore: 84,
    cluster: "Fake Bank Fraud Department Call Cluster",
    checkedAt: "1 day ago",
  },
  {
    id: "IG-003",
    query: "support-win365.example.com",
    type: "Website / Domain",
    matches: 6,
    riskScore: 91,
    cluster: "Fake Microsoft Support Remote Access Cluster",
    checkedAt: "3 days ago",
  },
]

const riskColors: Record<string, string> = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
}

const nodeIcons: Record<string, typeof Fingerprint> = {
  handle: Users,
  phone: Phone,
  wallet: Hash,
  domain: Globe,
  email: Mail,
  image: Image,
  voice: Mic,
  phrase: Mail,
}

export default function IdentityGraphPage() {
  const [searchType, setSearchType] = useState("handle")
  const [query, setQuery] = useState("")
  const [searching, setSearching] = useState(false)
  const [result, setResult] = useState<typeof mockCollisionResult | null>(null)

  const runSearch = () => {
    setSearching(true)
    setTimeout(() => {
      setResult(mockCollisionResult)
      setSearching(false)
    }, 2000)
  }

  return (
    <PageLayout role="individual" title="Identity Collision Graph™" subtitle="Expose fraud actors by cross-referencing names, phones, emails, wallets, handles, images, voice, and script phrases">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Searches Run", value: "3", color: "text-primary", bg: "bg-primary/10", icon: Search },
            { label: "Fraud Actors Found", value: "2", color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle },
            { label: "Linked Indicators", value: "18", color: "text-orange-600", bg: "bg-orange-50", icon: Link2 },
            { label: "Clusters Exposed", value: "3", color: "text-primary", bg: "bg-primary/10", icon: Network },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="p-5">
                <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`h-4.5 w-4.5 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="search">
          <TabsList>
            <TabsTrigger value="search">Search Graph</TabsTrigger>
            <TabsTrigger value="history">Search History</TabsTrigger>
            <TabsTrigger value="clusters">Cluster Table</TabsTrigger>
          </TabsList>

          {/* Search Tab */}
          <TabsContent value="search" className="mt-4 space-y-4">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Identity Collision Search</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter any identifier — a name, phone, email, wallet, handle, domain, image hash, voice sample, or a phrase you heard — and VIGISCAM™ will cross-reference it against the global fraud actor graph.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Search Type</Label>
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {searchTypes.map(t => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs text-muted-foreground mb-1.5 block">
                    {searchTypes.find(t => t.value === searchType)?.label || "Identifier"}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder={`Enter ${searchTypes.find(t => t.value === searchType)?.label?.toLowerCase() || "identifier"}...`}
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      className="h-9"
                    />
                    <Button className="flex-shrink-0 h-9" onClick={runSearch} disabled={searching}>
                      {searching ? "Searching..." : <><Search className="h-4 w-4 mr-1.5" /> Search</>}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Result */}
              {result && (
                <div className="space-y-5 pt-2">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="font-bold text-red-800">Fraud Actor Match Found — {result.matchCount} linked identifiers</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">&quot;{result.query}&quot;</strong> matches {result.victimReports} victim reports across{" "}
                        <strong className="text-foreground">{result.linkedClusters.length}</strong> known scam clusters.
                      </p>
                    </div>
                    <Badge className="text-xs border-0 bg-red-100 text-red-700 flex-shrink-0">Risk: {result.riskScore}/100</Badge>
                  </div>

                  {/* Graph-style visual section */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Collision Graph — Linked Identifiers</p>
                    <div className="relative">
                      {/* Central node */}
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-red-100 border-2 border-red-400 flex items-center justify-center mb-2">
                          <Fingerprint className="h-7 w-7 text-red-600" />
                        </div>
                        <Badge className="text-xs border-0 bg-red-100 text-red-700">{result.query}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{result.clusterName}</p>
                      </div>
                      {/* Connected nodes */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {result.nodes.map((node, i) => {
                          const Icon = nodeIcons[node.type] || Fingerprint
                          return (
                            <div key={i} className={`rounded-lg border p-3 flex flex-col gap-2 ${node.risk === "critical" ? "border-red-300 bg-red-50" : node.risk === "high" ? "border-orange-200 bg-orange-50" : "border-border bg-muted/30"}`}>
                              <div className="flex items-center gap-2">
                                <Icon className={`h-4 w-4 flex-shrink-0 ${node.risk === "critical" ? "text-red-600" : node.risk === "high" ? "text-orange-600" : "text-muted-foreground"}`} />
                                <Badge className={`text-[10px] border-0 ${riskColors[node.risk]}`}>{node.type}</Badge>
                              </div>
                              <p className="text-xs font-semibold text-foreground truncate">{node.value}</p>
                              <p className="text-xs text-muted-foreground">{node.role}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Cluster links */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Linked Scam Clusters</p>
                    <div className="space-y-2">
                      {result.linkedClusters.map((cluster, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg">
                          <Network className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium text-foreground">{cluster}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" className="bg-primary text-primary-foreground">
                      <Archive className="h-3.5 w-3.5 mr-1.5" /> Export Evidence Bundle
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3.5 w-3.5 mr-1.5" /> Download Report
                    </Button>
                    <Button size="sm" variant="outline">
                      <Users className="h-3.5 w-3.5 mr-1.5" /> Alert Trusted Contact
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-4 space-y-4">
            <div className="flex gap-3 flex-wrap items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search history..." className="pl-9 h-9" />
              </div>
              <Button size="sm" variant="outline" className="h-9">
                <Download className="h-3.5 w-3.5 mr-1.5" /> Export All
              </Button>
            </div>
            <div className="space-y-3">
              {searchHistory.map((item) => (
                <Card key={item.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground">{item.id}</span>
                        <Badge className="text-xs border-0 bg-orange-100 text-orange-700">{item.riskScore}/100 Risk</Badge>
                        <Badge className="text-xs border-0 bg-muted text-muted-foreground">{item.type}</Badge>
                        <span className="text-xs text-muted-foreground">{item.checkedAt}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground font-mono">{item.query}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.matches} linked identifiers — {item.cluster}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 flex-shrink-0">
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cluster Table Tab */}
          <TabsContent value="clusters" className="mt-4">
            <Card className="divide-y divide-border overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-2 bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <span>Cluster Name</span>
                <span>Actors</span>
                <span>Indicators</span>
                <span>Victims</span>
                <span>Risk</span>
              </div>
              {[
                { name: "Romance Crypto Investment Grooming Cluster", actors: 23, indicators: 48, victims: 312, risk: "critical" },
                { name: "Fake Microsoft Support Remote Access Cluster", actors: 41, indicators: 89, victims: 847, risk: "critical" },
                { name: "Fake Bank Fraud Department Call Cluster", actors: 17, indicators: 35, victims: 156, risk: "high" },
                { name: "IRS Urgency Payment Threat Cluster", actors: 29, indicators: 61, victims: 431, risk: "critical" },
                { name: "Facebook Marketplace Deposit Scam Cluster", actors: 8, indicators: 19, victims: 67, risk: "high" },
              ].map((cluster, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-4 items-center hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <Network className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground truncate">{cluster.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground text-right">{cluster.actors}</span>
                  <span className="text-sm text-muted-foreground text-right">{cluster.indicators}</span>
                  <span className="text-sm text-muted-foreground text-right">{cluster.victims}</span>
                  <Badge className={`text-xs border-0 capitalize ${riskColors[cluster.risk]}`}>{cluster.risk}</Badge>
                </div>
              ))}
            </Card>
            <div className="flex justify-end">
              <Button size="sm" variant="outline" className="h-9">
                <Archive className="h-3.5 w-3.5 mr-1.5" /> Export Evidence Bundle
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
