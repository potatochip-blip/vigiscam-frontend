'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Landmark, TrendingDown, Shield, CheckCircle2, BarChart3, Users, AlertTriangle } from "lucide-react"

export default function BanksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <Badge className="bg-primary text-primary-foreground mb-6">BankGuard</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Prevent Customer Fraud at Scale
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 text-pretty">
            BankGuard detects and interrupts scam-driven transfers before they complete, protecting your customers and reducing fraud losses by up to 78%.
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
          <h2 className="text-3xl font-bold mb-12 text-foreground">The Bank Fraud Challenge</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: "$100B+", label: "Annual fraud loss from consumer wire transfers" },
              { stat: "89%", label: "Of scam victims wire money to attacker accounts" },
              { stat: "< 10min", label: "Average time from first contact to fund transfer" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-danger mb-2">{item.stat}</div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BankGuard Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">BankGuard Detection Layers</h2>
          <div className="space-y-6">
            {[
              { layer: "Journey Detection", desc: "Identifies the scam journey stage—early relationship, urgency pressure, fund movement." },
              { layer: "Victim State AI™", desc: "Predicts customer emotional state during transaction to flag manipulation-driven behavior." },
              { layer: "Transfer Risk Scoring", desc: "Analyzes destination account, velocity, amount, and recipient patterns." },
              { layer: "Guardian Pause™", desc: "Optionally holds transfer for 24 hours while verifying with customer via different channel." },
              { layer: "Real-Time Network Check", desc: "Cross-references receiving account against SCAMZY™ known fraud wallets." },
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

      {/* Integration */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Integration Touchpoints</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { point: "Wire Transfer Submission", desc: "Monitor transfers flagged by velocity, destination, or fraud score." },
              { point: "Mobile Banking App", desc: "Integrate real-time alerts into customer mobile experience." },
              { point: "Call Center Integration", desc: "Surface risk scores to live agents verifying transactions." },
              { point: "Post-Fraud Recovery", desc: "Enable faster chargeback/reversal with integrated evidence from Evidence Vault™." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">{item.point}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Proven Results</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              {[
                { icon: TrendingDown, label: "78% Reduction in fraud losses", highlight: true },
                { icon: CheckCircle2, label: "94% Prevention rate in first quarter" },
                { icon: Users, label: "< 0.2% False positive rate" },
                { icon: Shield, label: "99.2% Customer satisfaction" },
              ].map((result, i) => (
                <div key={i} className="flex items-center gap-4 mb-6">
                  <result.icon className={`h-6 w-6 shrink-0 ${result.highlight ? "text-success" : "text-primary"}`} />
                  <span className={`font-semibold ${result.highlight ? "text-success" : "text-foreground"}`}>{result.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="font-bold text-foreground mb-6">ROI Timeline</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-semibold text-foreground">Month 1</span>
                  <p className="text-muted-foreground">Deployment & staff training complete</p>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Month 2-3</span>
                  <p className="text-muted-foreground">Fraud signals detected and tuned for your institution</p>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Month 4+</span>
                  <p className="text-muted-foreground">Full ROI realized through prevented losses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-border rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="font-bold text-foreground mb-6 text-lg">Compliance & Security</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">GLBA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">FDIC Best Practices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">ISO 27001 Accredited</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Protect Your Customers. Reduce Fraud Losses.</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">BankGuard integrates seamlessly into your existing fraud prevention stack.</p>
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
