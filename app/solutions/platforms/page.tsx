'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Network, Zap, Globe, TrendingDown, CheckCircle2, AlertTriangle, Users } from "lucide-react"

export default function PlatformsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <Badge className="bg-primary text-primary-foreground mb-6">PlatformShield</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Disrupt Scam Rings at Scale
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 text-pretty">
            PlatformShield detects organized scam rings, identifies coordinated accounts, and enables coordinated takedowns at the network level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/company/contact">
              <Button size="lg" className="bg-primary text-primary-foreground">Schedule Demo</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Enterprise Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">The Platform Scam Challenge</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: "1000+", label: "New scam accounts per day on major platforms" },
              { stat: "95%", label: "Of scams involve organized rings, not lone actors" },
              { stat: "40%", label: "Account reactivation rate after ban" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-danger mb-2">{item.stat}</div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PlatformShield Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">PlatformShield Detection Layers</h2>
          <div className="space-y-6">
            {[
              { layer: "Account Clustering", desc: "SCAMZY™ identifies linked accounts operating scam scripts from the same grooming patterns." },
              { layer: "Profile Forensics", desc: "Analyzes user bios, behavior, payment methods, and IP patterns to detect coordinated operations." },
              { layer: "Grooming Detection", desc: "Recognizes romance, investment, and job-offer grooming frameworks deployed by organized rings." },
              { layer: "Network Mapping", desc: "Links discovered accounts to prior takedowns, cross-platform presence, and international networks." },
              { layer: "Takedown Coordination", desc: "Generates coordinated ban packets and law enforcement briefings for simultaneous account suspension." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-card border border-border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">{i + 1}</div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.layer}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Integration */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Platform Integration</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Direct moderation queue integration",
              "Real-time suspicious account flagging",
              "Automated grooming pattern detection",
              "Cross-platform account linking",
              "Coordinated takedown orchestration",
              "Law enforcement notification system",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Proven Network Disruption</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Major Marketplace", stat: "340 accounts", desc: "Coordinated takedown of romance scam ring across 3 countries in a single action." },
              { title: "Social Platform", stat: "12,000+ accounts", desc: "Six-month operation mapping investment scam network linked to Nigerian criminal enterprise." },
              { title: "Dating App", stat: "8,500 accounts", desc: "Rapid response to romance scam cluster grooming 50,000+ victims simultaneously." },
              { title: "Job Board", stat: "2,100 accounts", desc: "Takedown of fake employment offer network targeting international remote workers." },
            ].map((case_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">{case_.title}</h3>
                  <span className="text-2xl font-bold text-danger">{case_.stat}</span>
                </div>
                <p className="text-sm text-muted-foreground">{case_.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Impact Metrics</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { stat: "95%", label: "Scam Ring Detection Rate" },
              { stat: "12h", label: "Time to Network Mapping" },
              { stat: "68%", label: "Reduction in reactivations" },
              { stat: "89%", label: "Coordinated takedown success" },
            ].map((metric, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{metric.stat}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Stop Scam Rings, Not Just Individual Accounts</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">PlatformShield enables coordinated takedowns across your entire network.</p>
          <Link href="/company/contact">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Schedule a Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
