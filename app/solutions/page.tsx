'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

const SOLUTIONS = [
  {
    name: "Individuals",
    desc: "Personal real-time scam protection on any device.",
    href: "/solutions/individuals",
    features: ["Personal Shield", "All detection modules", "Evidence Vault"],
  },
  {
    name: "Families",
    desc: "Monitor and protect elderly or vulnerable loved ones.",
    href: "/solutions/families",
    features: ["Family Guardian", "Emergency intervention", "Family alerts"],
    badge: "Most Popular",
  },
  {
    name: "Banks",
    desc: "Detect and interrupt scam-driven wire transfers.",
    href: "/solutions/banks",
    features: ["BankGuard", "Guardian Pause", "Transfer risk scoring"],
  },
  {
    name: "Platforms",
    desc: "Disrupt organized scam rings at scale.",
    href: "/solutions/platforms",
    features: ["PlatformShield", "Account clustering", "Takedown coordination"],
  },
  {
    name: "Law Enforcement",
    desc: "Solve cases. Map criminal networks.",
    href: "/solutions/investigators",
    features: ["Investigator Console", "Network mapping", "Case management"],
  },
  {
    name: "Government",
    desc: "Regional fraud prevention and public protection.",
    href: "/solutions/government",
    features: ["Agency Intelligence", "Threat briefings", "Public alert campaigns"],
  },
]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-primary text-primary-foreground mb-4">Solutions</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Protection for Every Stakeholder
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              From individuals to enterprises, from families to governments—VIGISCAM™ has a solution tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Cards */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SOLUTIONS.map((solution) => (
              <Link key={solution.name} href={solution.href}>
                <div className="group bg-card border border-border hover:border-primary rounded-lg p-8 h-full hover:shadow-lg transition-all cursor-pointer relative">
                  {solution.badge && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      {solution.badge}
                    </Badge>
                  )}
                  <h3 className="text-2xl font-bold text-foreground mb-2">{solution.name}</h3>
                  <p className="text-muted-foreground mb-6">{solution.desc}</p>
                  <ul className="space-y-2 mb-8">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:underline">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Multi-Stakeholder */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Why Multiple Perspectives Matter</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Victim Protection",
                desc: "Individual users and families need real-time intervention to stop scams before they lose money or data.",
              },
              {
                title: "Financial Security",
                desc: "Banks and payment platforms need to detect fraud at the transaction level before funds are irreversibly transferred.",
              },
              {
                title: "Criminal Disruption",
                desc: "Law enforcement and governments need network intelligence to dismantle organized scam operations at the source.",
              },
            ].map((reason, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-3 text-lg">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Real-World Use Cases</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                scenario: "Elderly Parent",
                solution: "Family Guardian",
                outcome: "Alert sent to adult child within 3 seconds. Tech support scam blocked before remote access granted.",
              },
              {
                scenario: "Bank Customer",
                solution: "BankGuard + Guardian Pause",
                outcome: "Wire transfer on hold for 24 hours. Customer contact verification prevented $12,000 loss.",
              },
              {
                scenario: "Platform Trust & Safety",
                solution: "PlatformShield",
                outcome: "340 romance scam accounts identified as coordinated network. Simultaneous removal. Network disrupted.",
              },
              {
                scenario: "FBI Investigation",
                solution: "Investigator Console",
                outcome: "Network graph linked 17 fragmented cases to single criminal organization across 3 countries. Prosecution support.",
              },
            ].map((useCase, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-foreground">{useCase.scenario}</h3>
                    <Badge className="mt-2 bg-primary text-primary-foreground text-xs">{useCase.solution}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{useCase.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Find Your Solution</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Explore the solution that best fits your needs.</p>
          <Link href="/select-account-type">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
