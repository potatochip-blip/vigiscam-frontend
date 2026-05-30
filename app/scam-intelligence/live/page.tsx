"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Radio,
  ArrowRight,
  ShieldCheck,
  ScanSearch,
  Tags,
  Zap,
  CheckCircle2,
  Lock,
  Globe,
  TrendingUp,
  Activity,
} from "lucide-react"
import { VigiscamLogo } from "@/components/vigiscam-logo"

const signalCategories = [
  { name: "Tech Support Scam", count: "3,241", color: "bg-red-100 text-red-800 border-red-200" },
  { name: "Romance Scam", count: "2,188", color: "bg-pink-100 text-pink-800 border-pink-200" },
  { name: "Gift Card Scam", count: "1,874", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { name: "Crypto Scam", count: "2,432", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { name: "Government Impersonation", count: "1,561", color: "bg-orange-100 text-orange-800 border-orange-200" },
  { name: "Bank Impersonation", count: "1,893", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { name: "Marketplace Scam", count: "987", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  { name: "Fake Job Scam", count: "742", color: "bg-slate-100 text-slate-800 border-slate-200" },
  { name: "Remote Access Scam", count: "1,329", color: "bg-red-100 text-red-800 border-red-200" },
  { name: "Donation Scam", count: "433", color: "bg-green-100 text-green-800 border-green-200" },
  { name: "Business Email Scam", count: "618", color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
]

const featuredClusters = [
  {
    name: "Fake Microsoft Support Remote Access Cluster",
    description: "High-volume cluster impersonating Microsoft, Norton, and Windows support. Scripts include remote access pressure language, 'do not tell anyone' secrecy patterns, and AnyDesk/TeamViewer instructions.",
    signals: 236,
    confidence: 96,
    trend: "Rising",
    trendColor: "text-red-600",
  },
  {
    name: "IRS Urgency Payment Threat Cluster",
    description: "IRS and Social Security impersonation with arrest-threat urgency. Pivots from gift card to cryptocurrency payment demands. Peaks around US tax season.",
    signals: 312,
    confidence: 91,
    trend: "Rising",
    trendColor: "text-red-600",
  },
  {
    name: "Romance Crypto Investment Grooming Cluster",
    description: "Pig-butchering cluster using fake romantic personas on dating apps and Instagram. Cultivates relationships over weeks before directing victims to fraudulent investment platforms.",
    signals: 189,
    confidence: 88,
    trend: "Stable",
    trendColor: "text-amber-600",
  },
  {
    name: "Facebook Marketplace Deposit Scam Cluster",
    description: "Targets high-value item listings with fake payment portals and deposit requests. Sellers and buyers both targeted in vehicle and furniture transactions.",
    signals: 94,
    confidence: 79,
    trend: "Stable",
    trendColor: "text-amber-600",
  },
  {
    name: "Fake Bank Fraud Department Call Cluster",
    description: "APP fraud cluster impersonating Chase, NatWest, and Barclays fraud departments. SMS spoofing inserts messages into genuine bank threads, directing victims to transfer funds to 'safe accounts'.",
    signals: 271,
    confidence: 93,
    trend: "Rising",
    trendColor: "text-red-600",
  },
]

const pipelineSteps = [
  {
    icon: Radio,
    label: "Raw Signal",
    description: "A report, advisory, URL, or indicator enters SCAMZY™ from an approved source.",
    color: "bg-blue-600",
  },
  {
    icon: ScanSearch,
    label: "Deduplication",
    description: "Duplicate reports are merged. Related indicators are linked to existing clusters.",
    color: "bg-indigo-600",
  },
  {
    icon: Activity,
    label: "Reliability Score",
    description: "Source credibility, evidence strength, recency, and repetition are all scored.",
    color: "bg-purple-600",
  },
  {
    icon: Tags,
    label: "Pattern Match",
    description: "Signal is compared against known scam scripts, domains, phone patterns, and wallets.",
    color: "bg-orange-600",
  },
  {
    icon: ShieldCheck,
    label: "Review",
    description: "Uncertain signals are routed to human reviewers. Victim data is separated and protected.",
    color: "bg-red-600",
  },
  {
    icon: CheckCircle2,
    label: "Verified Intelligence",
    description: "Signal meets the evidence and confidence threshold. Classified as verified.",
    color: "bg-green-700",
  },
  {
    icon: Zap,
    label: "Detection Rule Update",
    description: "New phrases, patterns, or indicators update VIGISCAM™ detection rules in real time.",
    color: "bg-yellow-600",
  },
  {
    icon: Globe,
    label: "Public-Safe Registry",
    description: "After public-safe review, the indicator is published with all victim data redacted.",
    color: "bg-teal-600",
  },
]

export default function LiveIntelligencePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <VigiscamLogo size="md" variant="icon" inverted />
                <div className="border-l border-slate-600 pl-3">
                  <span className="text-sm font-medium block">ScamPulse AI™</span>
                  <span className="text-xs text-slate-400">SCAMZY™ Live Intelligence Engine</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1 rounded-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  Intelligence Active
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-4 text-balance">
                ScamPulse AI™ Live Intelligence
              </h1>
              <p className="text-xl text-slate-300 mb-3 text-pretty leading-relaxed">
                A continuously updating scam-intelligence layer that gathers, scores, verifies, classifies, and safely applies emerging scam patterns.
              </p>
              <p className="text-sm text-slate-400 mb-8">
                Live scam intelligence for a world where fraud changes daily.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Button size="lg" asChild>
                  <Link href="/scam-intelligence/check">
                    Check an Indicator
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-500 text-white hover:bg-slate-700 bg-transparent" asChild>
                  <Link href="/scam-intelligence/registry">
                    Search the Registry
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Safe Intelligence Rule */}
        <section className="bg-primary text-primary-foreground py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-center">
              <span className="font-semibold text-accent">Safe Intelligence Rule:</span>
              {["Collect", "Score", "Verify", "Classify", "Use Safely"].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="font-medium">{step}</span>
                  {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-primary-foreground/50" />}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Active Signal Sources", value: "11", sub: "Approved source types" },
                { label: "Scam Signal Categories", value: "11", sub: "Tracked categories" },
                { label: "Verified Intelligence Records", value: "15,247+", sub: "In public registry" },
                { label: "Detection Rules Active", value: "847", sub: "Updated from live signals" },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="pt-5">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <p className="text-sm font-medium text-foreground">{stat.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Signal Categories */}
        <section className="py-12 bg-slate-50 border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Signal Categories Tracked</h2>
            <div className="flex flex-wrap gap-3">
              {signalCategories.map((cat) => (
                <div
                  key={cat.name}
                  className={`flex items-center gap-2 px-3 py-2 rounded-sm border text-sm font-medium ${cat.color}`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs opacity-70">{cat.count} signals</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Classification Pipeline */}
        <section className="py-14 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Classification Pipeline</h2>
              <p className="text-muted-foreground text-sm">
                Every signal collected by VIGISCAM™ travels through a structured pipeline before any data is published or used to update detection rules.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {pipelineSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`h-7 w-7 rounded-sm flex items-center justify-center text-white flex-shrink-0 ${step.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">Step {i + 1}</div>
                    </div>
                    <h3 className="font-semibold text-sm text-foreground mb-1">{step.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Public-Safe Explanation */}
        <section className="py-12 bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-start gap-3 mb-4">
                <Lock className="h-6 w-6 text-blue-700 flex-shrink-0 mt-0.5" />
                <h2 className="text-xl font-bold text-blue-900">Public-Safe Intelligence Policy</h2>
              </div>
              <div className="space-y-3 text-sm text-blue-800">
                <p>
                  Raw reports are private until reviewed. VIGISCAM™ never automatically publishes a report submitted by a user or partner.
                  Every indicator in the public registry has passed three gates:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  {[
                    { label: "Client-reported", desc: "Submitted by a client or partner with first-hand knowledge of the scam event." },
                    { label: "VIGISCAM™-verified", desc: "Passed independent review, SCAMZY™ network matching, and script analysis." },
                    { label: "Public-safe approved", desc: "All victim data redacted. No unverified allegations. Dedicated review gate passed." },
                  ].map((gate) => (
                    <Card key={gate.label} className="border-blue-200 bg-white">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-700" />
                          <span className="font-semibold text-blue-900 text-sm">{gate.label}</span>
                        </div>
                        <p className="text-xs text-blue-700">{gate.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Clusters */}
        <section className="py-14 bg-white border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">Featured Scam Clusters</h2>
            <p className="text-muted-foreground text-sm mb-8">
              SCAMZY™ groups related signals into clusters representing active fraud operations. Each cluster drives detection rule updates and registry entries.
            </p>
            <div className="space-y-4">
              {featuredClusters.map((cluster) => (
                <Card key={cluster.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1">{cluster.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{cluster.description}</p>
                      </div>
                      <div className="flex md:flex-col gap-4 md:gap-2 md:items-end flex-shrink-0">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{cluster.confidence}%</div>
                          <div className="text-xs text-muted-foreground">Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{cluster.signals}</div>
                          <div className="text-xs text-muted-foreground">Signals</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-semibold ${cluster.trendColor}`}>{cluster.trend}</div>
                          <div className="text-xs text-muted-foreground">Trend</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-slate-50 border-t">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-bold mb-4">Check any indicator against live intelligence</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Every phone number, email, domain, URL, crypto wallet, or message you check is matched against VIGISCAM™ verified scam intelligence in real time.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button size="lg" asChild>
                <Link href="/scam-intelligence/check">
                  Check an Indicator
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/scam-intelligence/registry">
                  Search the Registry
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/scam-intelligence/methodology">
                  Read the Methodology
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
