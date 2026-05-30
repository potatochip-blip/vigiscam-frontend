"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Database,
  Network,
  Bell,
  ShieldCheck,
  BookOpen,
  TrendingUp,
  Users,
  Globe,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Zap,
  Lock,
  Target,
  Smartphone,
} from "lucide-react"
import { mockRegistryEntries } from "@/lib/scam-intelligence-data"
import { VigiscamLogo } from "@/components/vigiscam-logo"

const stats = [
  {
    label: "Total Indicators",
    value: "15,247",
    icon: Database,
    color: "text-blue-600",
  },
  {
    label: "Networks Exposed",
    value: "847",
    icon: Network,
    color: "text-purple-600",
  },
  {
    label: "Takedowns Confirmed",
    value: "1,204",
    icon: CheckCircle2,
    color: "text-green-600",
  },
  {
    label: "Losses Prevented",
    value: "$2.3B",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const recentIndicators = mockRegistryEntries.slice(0, 5).map((entry) => ({
  indicator: entry.indicator,
  type: entry.type,
  family: entry.scamFamily,
  status: entry.status,
  cases: entry.caseCount,
  dateAdded: entry.lastSeen,
}))

const features = [
  {
    title: "Scam Intelligence Registry",
    description: "Search 15,000+ verified scam indicators — phones, emails, domains, wallets.",
    icon: Search,
    href: "/scam-intelligence/registry",
    color: "bg-blue-50",
  },
  {
    title: "Exposed Scam Networks",
    description: "View detailed intelligence on 847+ verified fraud networks with connections and disruption status.",
    icon: Network,
    href: "/scam-intelligence/networks",
    color: "bg-purple-50",
  },
  {
    title: "Check an Indicator",
    description: "Instantly verify if a number, email, or site is flagged in our database.",
    icon: Zap,
    href: "/scam-intelligence/check",
    color: "bg-amber-50",
  },
  {
    title: "Latest Scam Alerts",
    description: "Real-time alerts about new campaigns, active threats, and emerging fraud rings.",
    icon: Bell,
    href: "/scam-intelligence/latest-alerts",
    color: "bg-red-50",
  },
  {
    title: "Verified Takedowns",
    description: "Domains removed, accounts suspended, infrastructure disrupted. 1,204+ confirmed.",
    icon: ShieldCheck,
    href: "/scam-intelligence/takedowns",
    color: "bg-green-50",
  },
  {
    title: "Methodology",
    description: "Learn how we verify, analyze, and publish scam intelligence with transparency.",
    icon: BookOpen,
    href: "/scam-intelligence/methodology",
    color: "bg-indigo-50",
  },
]

export default function ScamIntelligencePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <VigiscamLogo size="md" variant="icon" inverted />
                <div className="border-l border-slate-600 pl-3">
                  <span className="text-sm font-medium block">Real-Time Intelligence</span>
                  <span className="text-xs text-slate-400">Powered by VIGISCAM™</span>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4">Scam Intelligence Registry</h1>
              <p className="text-xl text-slate-300 mb-8">
                The world&apos;s largest verified database of scam indicators and fraud networks. Real-time intelligence powered by SCAMZY™ AI and 847K+ user reports.
              </p>
              <div className="flex gap-3">
                <Button size="lg" asChild>
                  <Link href="/scam-intelligence/check">
                    Check an Indicator
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/scam-intelligence/registry">
                    Search Registry
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white border-b py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {stat.label}
                          </p>
                          <p className="text-3xl font-bold">{stat.value}</p>
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

        {/* Main Features Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-3">Explore Intelligence</h2>
              <p className="text-muted-foreground">
                Access verified scam indicators, networks, alerts, and takedowns
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Link
                    key={feature.href}
                    href={feature.href}
                    className="group"
                  >
                    <Card className={`h-full transition-all hover:shadow-lg hover:border-primary ${feature.color}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Icon className="h-8 w-8 text-primary" />
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Recent Indicators */}
        <section className="py-12 bg-slate-50 border-t">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Recently Verified Indicators</h2>
              <Button variant="outline" asChild>
                <Link href="/scam-intelligence/registry">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="space-y-3">
              {recentIndicators.map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm font-medium truncate">
                          {item.indicator}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.family} • {item.cases} cases
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.type}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <Link href="/scam-intelligence/check">
                            Check
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Users Report Scams",
                  description: "VIGISCAM™ users submit detailed scam reports with evidence.",
                  icon: Users,
                },
                {
                  step: "2",
                  title: "AI Analyzes",
                  description: "SCAMZY™ links indicators and identifies fraud networks.",
                  icon: Zap,
                },
                {
                  step: "3",
                  title: "We Verify",
                  description: "Multiple corroborating reports confirm malicious activity.",
                  icon: CheckCircle2,
                },
                {
                  step: "4",
                  title: "We Publish",
                  description: "Verified indicators are added to the public registry.",
                  icon: Globe,
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.step}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold mb-4">
                          {item.step}
                        </div>
                        <Icon className="h-8 w-8 text-primary mb-3" />
                        <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Why Trust Our Intelligence</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Verified Data",
                  description:
                    "Every indicator verified through 20+ corroborating reports and AI confidence scoring.",
                  icon: ShieldCheck,
                },
                {
                  title: "AI-Powered",
                  description:
                    "SCAMZY™ analyzes patterns across 15,000+ indicators to identify networks and connections.",
                  icon: Zap,
                },
                {
                  title: "Transparent",
                  description:
                    "Full methodology published. Learn how we verify, analyze, and maintain the database.",
                  icon: BookOpen,
                },
                {
                  title: "Real-Time",
                  description:
                    "Updated daily with new threats, takedowns, and network intelligence.",
                  icon: TrendingUp,
                },
                {
                  title: "Actionable",
                  description:
                    "Clear indicators with recommended actions and context for users and institutions.",
                  icon: Target,
                },
                {
                  title: "Privacy-First",
                  description:
                    "Anonymized reporting and zero publication of victim personal information.",
                  icon: Lock,
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <Card key={idx}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100 border-t">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Protect Yourself Now</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Check any phone number, email, domain, or wallet address against our verified scam database in seconds.
            </p>
            <div className="flex gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href="/scam-intelligence/check">
                  Start Checking Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/report">
                  Report a Scam
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
