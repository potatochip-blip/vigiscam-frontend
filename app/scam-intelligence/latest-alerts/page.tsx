"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertTriangle,
  Clock,
  TrendingUp,
  MapPin,
  Users,
  DollarSign,
  ArrowRight,
  Zap,
  Bell,
  Target,
} from "lucide-react"
import { useRegistryEntries } from "@/lib/scam-intelligence-live"
import { VigiscamLogo } from "@/components/vigiscam-logo"

const activeCampaigns = [
  {
    name: "Holiday Shipping Scams",
    description: "Fake package delivery notifications directing to credential harvesting sites.",
    indicators: 243,
    caseCount: 1847,
    region: "Global",
    severity: "critical",
  },
  {
    name: "AI Voice Cloning Scams",
    description: "Deepfake audio of family members requesting emergency wire transfers.",
    indicators: 156,
    caseCount: 623,
    region: "North America",
    severity: "high",
  },
  {
    name: "LinkedIn Recruiter Scams",
    description: "Fake job offers leading to credential harvesting and work-from-home fraud.",
    indicators: 89,
    caseCount: 412,
    region: "Global",
    severity: "high",
  },
  {
    name: "Medical Payment Scams",
    description: "Fake hospital billing departments requesting payment for unrecognized charges.",
    indicators: 67,
    caseCount: 298,
    region: "US",
    severity: "medium",
  },
]

export default function LatestAlertsPage() {
  const { entries } = useRegistryEntries()
  const recentAlerts = [...entries]
    .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime())
    .slice(0, 10)
    .map((entry, idx) => ({
      id: idx,
      title: `${entry.scamFamily} indicator: ${entry.indicator}`,
      description: entry.summary,
      type: entry.scamFamily,
      indicator: entry.indicator,
      caseCount: entry.caseCount,
      region: entry.region,
      date: entry.lastSeen,
      severity: entry.status === "verified-malicious" ? "critical" : "high",
      affectedCount: entry.caseCount,
    }))
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-50 to-red-100 border-b py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <VigiscamLogo size="sm" variant="icon" />
                <div className="border-l border-muted pl-3">
                  <span className="text-sm font-medium text-muted-foreground block">Real-Time Intelligence</span>
                  <span className="text-xs text-muted-foreground">Powered by VIGISCAM™</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Latest Scam Alerts</h1>
              <p className="text-lg text-muted-foreground">
                Stay informed about newly verified scam campaigns, active networks, and emerging threats. Updated daily with verified indicators and regional targeting information.
              </p>
            </div>
          </div>
        </section>

        {/* Alert Banner */}
        <section className="bg-white border-b py-6">
          <div className="container mx-auto px-4">
            <Alert className="bg-orange-50 border-orange-200">
              <Zap className="h-4 w-4 text-orange-600" />
              <AlertTitle className="text-orange-900">
                New AI Voice Cloning Campaign Detected
              </AlertTitle>
              <AlertDescription className="text-orange-800">
                A sophisticated deepfake operation is actively targeting families. Victims receive calls from scammers impersonating relatives requesting emergency wire transfers. Our systems detected 87 new cases in the past 24 hours.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Recent Alerts */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Recent Indicators Added (Last 30 Days)</h2>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`border-l-4 ${
                    alert.severity === "critical"
                      ? "border-l-red-600 bg-red-50"
                      : "border-l-orange-600 bg-orange-50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Alert Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start gap-2 mb-2">
                          <AlertTriangle
                            className={`h-5 w-5 flex-shrink-0 ${
                              alert.severity === "critical"
                                ? "text-red-600"
                                : "text-orange-600"
                            }`}
                          />
                          <div>
                            <h3 className="font-bold text-foreground">
                              {alert.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {alert.description}
                            </p>
                          </div>
                        </div>
                        <Badge className="mt-2" variant="secondary">
                          {alert.type}
                        </Badge>
                      </div>

                      {/* Metrics */}
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Indicator</p>
                          <p className="text-xs font-mono font-medium mt-0.5 truncate">
                            {alert.indicator}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Cases Reported</p>
                          <p className="text-sm font-bold">{alert.caseCount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Region</p>
                          <p className="text-xs font-medium">{alert.region}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(alert.date).toLocaleDateString()}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          View Details
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Active Campaigns */}
        <section className="py-12 bg-slate-50 border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Active Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCampaigns.map((campaign, idx) => (
                <Card key={idx} className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          {campaign.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {campaign.description}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          campaign.severity === "critical"
                            ? "destructive"
                            : campaign.severity === "high"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {campaign.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Total Indicators</p>
                        <p className="text-2xl font-bold mt-1">{campaign.indicators}</p>
                      </div>
                      <div className="bg-background p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Reports</p>
                        <p className="text-2xl font-bold mt-1">{campaign.caseCount}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Target Region</p>
                        <p className="text-sm font-medium mt-1">{campaign.region}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Impact</p>
                        <p className="text-sm font-medium mt-1">
                          ${Math.floor(campaign.caseCount * 450 / 1000)}K+ losses
                        </p>
                      </div>
                    </div>
                    <Button className="w-full mt-2" variant="outline">
                      View Campaign Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="py-12 bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Get alerts about new scam campaigns, emerging threats, and network disruptions delivered to your email.
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
