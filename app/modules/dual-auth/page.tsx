'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Users, CheckCircle2, AlertTriangle, Phone, Lock, ArrowRight } from "lucide-react"

export default function DualAuthPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-primary/5 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-primary text-primary-foreground mb-4">Module</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Dual-Auth™
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Two-person authorization for high-risk financial transactions. Requires a trusted contact to approve wire transfers, large purchases, or account changes before they execute.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/demo">
                  <Button className="bg-primary text-primary-foreground">See Demo</Button>
                </Link>
                <Link href="/select-account-type">
                  <Button variant="outline" className="bg-transparent">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">How Dual-Auth Works</h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { step: "1", title: "Transaction Initiated", desc: "User attempts a wire transfer, large purchase, or account change above configured thresholds." },
                { step: "2", title: "Approval Request Sent", desc: "Trusted contact receives instant notification via app, SMS, or voice call with transaction details." },
                { step: "3", title: "Verification Call", desc: "Optional: system initiates a 3-way verification call between user, trusted contact, and AI moderator." },
                { step: "4", title: "Execute or Block", desc: "Transaction proceeds only with explicit approval. Denial triggers FreezeLock™ and alert escalation." },
              ].map((item) => (
                <div key={item.step} className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Protected Transaction Types</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Shield className="h-8 w-8" />, title: "Wire Transfers", desc: "Any wire transfer above configurable threshold requires trusted contact approval." },
                { icon: <Lock className="h-8 w-8" />, title: "Account Changes", desc: "Password resets, email changes, and security setting modifications need verification." },
                { icon: <Users className="h-8 w-8" />, title: "New Payees", desc: "Adding new payment recipients or beneficiaries triggers dual authorization." },
                { icon: <Phone className="h-8 w-8" />, title: "Remote Access", desc: "Granting remote desktop access during calls requires immediate family approval." },
                { icon: <AlertTriangle className="h-8 w-8" />, title: "Large Purchases", desc: "Gift card purchases, crypto transfers, and unusual spending patterns flagged." },
                { icon: <CheckCircle2 className="h-8 w-8" />, title: "Investment Actions", desc: "Moving retirement funds or liquidating assets requires secondary authorization." },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <div className="text-primary mb-4">{item.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Key Features</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                "Configurable thresholds per transaction type and user risk profile",
                "Multiple trusted contacts with priority ordering and fallback chains",
                "Time-boxed approval windows with automatic denial on expiration",
                "Emergency override codes for pre-approved trusted contacts",
                "Full audit trail of all approval requests and responses",
                "Integration with bank APIs for real-time transaction interception",
                "Voice biometric verification of approving contact",
                "Scam-context briefing provided to approver before decision",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Works With Your Existing Systems</h2>
              <p className="text-muted-foreground mb-8">
                Dual-Auth integrates with major banking platforms, payment processors, and enterprise systems through our API.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["BankGuard", "Family Guardian", "Enterprise Admin", "Custom API"].map((integration) => (
                  <Badge key={integration} className="bg-secondary text-secondary-foreground px-4 py-2">{integration}</Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Add Dual-Auth to Your Protection</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Two sets of eyes on high-risk transactions. Peace of mind for families and institutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/select-account-type">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/solutions/banks">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  For Banks
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
