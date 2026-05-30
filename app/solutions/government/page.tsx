'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Globe, AlertTriangle, TrendingUp, Users, FileText, Map, Bell, CheckCircle2, ArrowRight } from "lucide-react"

export default function GovernmentSolutionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-primary/5 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-primary text-primary-foreground mb-4">For Government Agencies</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Regional Fraud Intelligence & Public Protection
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Real-time scam intelligence for government agencies, consumer protection bureaus, and law enforcement. Monitor regional fraud trends, issue public alerts, and coordinate cross-agency responses.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/company/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground">
                    Request Government Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="bg-transparent">Watch Overview</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Agency Intelligence Capabilities</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: <Map className="h-8 w-8" />,
                  title: "Regional Trend Mapping",
                  desc: "Heat maps showing scam activity by zip code, county, and state. Track emerging fraud patterns before they spread.",
                },
                {
                  icon: <TrendingUp className="h-8 w-8" />,
                  title: "Scam Cluster Detection",
                  desc: "Identify coordinated scam campaigns targeting your jurisdiction. See script families, actor networks, and victim profiles.",
                },
                {
                  icon: <Bell className="h-8 w-8" />,
                  title: "Public Alert System",
                  desc: "Issue targeted warnings to at-risk populations. Integrate with emergency broadcast systems and social media.",
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Victim Referral Pipeline",
                  desc: "Receive victim reports with full evidence packages. Coordinate with consumer protection and victim services.",
                },
                {
                  icon: <Globe className="h-8 w-8" />,
                  title: "Cross-Jurisdictional Intel",
                  desc: "Share intelligence with other agencies. Track scam networks that operate across state and national borders.",
                },
                {
                  icon: <FileText className="h-8 w-8" />,
                  title: "Compliance Reporting",
                  desc: "Generate reports for legislative oversight, budget justification, and inter-agency coordination.",
                },
              ].map((cap, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <div className="text-primary mb-4">{cap.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Features */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Agency Console Features</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Regional Trends Dashboard",
                    features: ["Real-time scam volume metrics", "Geographic heat maps", "Demographic targeting analysis", "Trend forecasting"],
                  },
                  {
                    title: "Scam Hotspot Alerts",
                    features: ["Automated spike detection", "Area-specific briefings", "Configurable thresholds", "Push notifications"],
                  },
                  {
                    title: "Public Campaign Manager",
                    features: ["Alert template library", "Multi-channel distribution", "Audience targeting", "Effectiveness tracking"],
                  },
                  {
                    title: "Network Intelligence Feed",
                    features: ["SCAMZY integration", "Actor profiles", "Script genome tracking", "Cross-case linking"],
                  },
                  {
                    title: "Referral Management",
                    features: ["Victim intake queue", "Evidence package review", "Case assignment", "Status tracking"],
                  },
                  {
                    title: "Reporting & Analytics",
                    features: ["Legislative reports", "Budget impact analysis", "Outcome metrics", "Export to PDF/Excel"],
                  },
                ].map((section, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-bold text-foreground mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Government Use Cases</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  agency: "State Consumer Protection Bureau",
                  scenario: "Monitored rising tech support scam cluster targeting elderly residents in rural counties.",
                  outcome: "Issued targeted public alert. 40% reduction in victim reports within 2 weeks.",
                },
                {
                  agency: "Metropolitan Police Cybercrime Unit",
                  scenario: "Received referral with full evidence package from FreezeGuard user who stopped a romance scam.",
                  outcome: "Linked case to 15 other victims. Coordinated with FBI for international takedown.",
                },
                {
                  agency: "Federal Trade Commission Regional Office",
                  scenario: "Used SCAMZY intelligence to map cryptocurrency scam network operating across 12 states.",
                  outcome: "Published consumer advisory. Provided intelligence to DOJ for prosecution.",
                },
              ].map((useCase, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <Badge className="bg-primary text-primary-foreground mb-3">{useCase.agency}</Badge>
                  <p className="text-foreground mb-3">{useCase.scenario}</p>
                  <p className="text-sm text-muted-foreground"><strong>Outcome:</strong> {useCase.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Government-Grade Security</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "FedRAMP Ready", desc: "Architecture designed for federal authorization." },
                { title: "CJIS Compliant", desc: "Meets Criminal Justice Information Services requirements." },
                { title: "StateRAMP Ready", desc: "State-level security authorization pathway." },
                { title: "SOC 2 Type II", desc: "Annual third-party security audit." },
                { title: "End-to-End Encryption", desc: "Data encrypted at rest and in transit." },
                { title: "Role-Based Access", desc: "Granular permissions and audit logging." },
              ].map((cert, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                  <h3 className="font-bold text-foreground mb-2">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
              Protect Your Jurisdiction
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join the network of government agencies using FreezeGuard intelligence to protect citizens from fraud.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/company/contact">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Request Government Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/trust-center">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  Security & Compliance
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
