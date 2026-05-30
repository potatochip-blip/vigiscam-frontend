"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Filter,
  Users,
  TrendingUp,
  Zap,
  ShieldCheck,
  MoreVertical,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Loader2,
} from "lucide-react"

// Mock data for pending verifications
const pendingReports = [
  {
    id: "SUB-001",
    submittedBy: "User #8473",
    date: "2026-05-10",
    indicator: "+1-877-555-0101",
    type: "phone",
    family: "tech-support",
    description: "Caller claimed to be from Microsoft support, asked for remote access",
    caseCount: 3,
    status: "pending",
    confidence: 0.78,
    similarity: "High match with Tech Support Cluster A",
  },
  {
    id: "SUB-002",
    submittedBy: "User #5821",
    date: "2026-05-09",
    indicator: "crypto-wallet-secure.io",
    type: "domain",
    family: "crypto",
    description: "Fake crypto exchange directing users to provide wallet seed phrases",
    caseCount: 7,
    status: "pending",
    confidence: 0.92,
    similarity: "Links to known pig-butchering ring",
  },
  {
    id: "SUB-003",
    submittedBy: "User #9234",
    date: "2026-05-08",
    indicator: "support@refund-recovery.net",
    type: "email",
    family: "recovery",
    description: "Recovery scam targeting prior fraud victims",
    caseCount: 12,
    status: "pending",
    confidence: 0.85,
    similarity: "Exact match with existing recovery cluster",
  },
]

const verifiedReports = [
  {
    id: "VER-001",
    indicator: "microsoft-support-helpdesk.com",
    type: "domain",
    cases: 342,
    verified: "2026-04-15",
    status: "verified-malicious",
    consensus: "99.2%",
  },
  {
    id: "VER-002",
    indicator: "+1-877-288-4101",
    type: "phone",
    cases: 218,
    verified: "2026-04-10",
    status: "verified-malicious",
    consensus: "98.7%",
  },
]

const stats = [
  { label: "Pending Review", value: "47", icon: Clock, color: "text-orange-600" },
  { label: "Verified Today", value: "12", icon: CheckCircle2, color: "text-green-600" },
  { label: "Under Analysis", value: "23", icon: Zap, color: "text-blue-600" },
  { label: "Awaiting Consensus", value: "8", icon: Users, color: "text-purple-600" },
]

export default function IntelligenceVerificationPage() {
  const [selectedReport, setSelectedReport] = useState<typeof pendingReports[0] | null>(null)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Intelligence Verification Dashboard</h1>
                <p className="text-slate-300">
                  Review, analyze, and approve submitted scam indicators
                </p>
              </div>
              <ShieldCheck className="h-12 w-12 opacity-50" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {stat.label}
                          </p>
                          <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        </div>
                        <Icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="pending">
                  Pending ({pendingReports.length})
                </TabsTrigger>
                <TabsTrigger value="verified">
                  Recently Verified ({verifiedReports.length})
                </TabsTrigger>
                <TabsTrigger value="analysis">Under Analysis</TabsTrigger>
              </TabsList>

              {/* Pending Tab */}
              <TabsContent value="pending">
                <div className="space-y-4">
                  {pendingReports.map((report) => (
                    <Card
                      key={report.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedReport(report)}
                    >
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          {/* Indicator */}
                          <div className="md:col-span-2">
                            <div className="flex items-start gap-2 mb-2">
                              <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                              <div>
                                <p className="font-mono text-sm font-bold break-all">
                                  {report.indicator}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {report.description}
                                </p>
                              </div>
                            </div>
                            <Badge className="text-xs mt-2">{report.family}</Badge>
                          </div>

                          {/* AI Analysis */}
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              AI Confidence
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{
                                    width: `${report.confidence * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm font-bold text-blue-600">
                                {Math.round(report.confidence * 100)}%
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              {report.similarity}
                            </p>
                          </div>

                          {/* Cases */}
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Corroborating Reports
                            </p>
                            <p className="text-2xl font-bold">{report.caseCount}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {report.caseCount >= 20 ? "✓ Meets threshold" : "Needs more"}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2">
                            <Button size="sm" variant="default" className="gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1">
                              <ThumbsDown className="h-4 w-4" />
                              Review
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Verified Tab */}
              <TabsContent value="verified">
                <div className="space-y-4">
                  {verifiedReports.map((report) => (
                    <Card key={report.id} className="border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                              <p className="font-mono text-sm font-bold">
                                {report.indicator}
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-xs mt-2">
                              {report.type}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Cases</p>
                            <p className="text-xl font-bold">{report.cases}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Verified</p>
                            <p className="text-sm">{report.verified}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Consensus</p>
                            <p className="text-lg font-bold text-green-600">
                              {report.consensus}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Analysis Tab */}
              <TabsContent value="analysis">
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin opacity-50" />
                    <p>23 indicators currently undergoing SCAMZY™ network analysis...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
