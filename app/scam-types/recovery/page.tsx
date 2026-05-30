'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle, CheckCircle2, Shield, ArrowRight, RefreshCw, UserCheck, Scale } from "lucide-react"

export default function RecoveryScamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <Badge className="bg-danger text-danger-foreground mb-6">Recovery Scam</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Recovery Scams: Getting Scammed Twice
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 text-pretty">
              After losing money to a scam, victims are targeted again by criminals posing as recovery specialists, lawyers, or government agents who promise to get the money back — for a fee.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Get Protected Now</Button>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How Recovery Scams Work</h2>
            <div className="space-y-4 max-w-4xl">
              {[
                { step: 1, title: "Victim Lists Are Sold", desc: "Original scammers sell lists of victims to recovery scammers. They know exactly how much you lost and how." },
                { step: 2, title: "Unsolicited Contact", desc: "You receive a call, email, or social media message from someone claiming to be a recovery specialist, lawyer, or government agent." },
                { step: 3, title: "Credible Presentation", desc: "They have professional websites, fake government badges, and knowledge of your original scam. They seem legitimate." },
                { step: 4, title: "Upfront Fee Requested", desc: "To start the recovery process, they need payment: retainer fees, taxes, processing fees, or insurance costs." },
                { step: 5, title: "Repeated Fees", desc: "Each step requires another payment. Your money is almost recovered, just one more fee to complete the process." },
                { step: 6, title: "Disappearance", desc: "Eventually they stop responding. You've lost even more money trying to recover the original loss." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-6 bg-card border border-border rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">{item.step}</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Phrases */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Common Scammer Phrases</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                "We've recovered millions for scam victims like you",
                "We work with the FBI/FTC/SEC to recover stolen funds",
                "Your case has been assigned to our recovery team",
                "We've already located your stolen funds",
                "We just need a small processing fee to release your money",
                "This is a government-mandated recovery program",
                "Your name appeared on a victim restitution list",
                "We have a 98% success rate in recovering funds",
                "The scammers who stole from you have been arrested",
                "Time is limited — act now or lose your claim",
              ].map((phrase, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground italic">&quot;{phrase}&quot;</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Types */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Types of Recovery Scams</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Scale className="h-8 w-8" />, title: "Fake Law Firms", desc: "Websites impersonating real law firms or creating fictional ones, demanding retainer fees." },
                { icon: <UserCheck className="h-8 w-8" />, title: "Government Impersonators", desc: "Claiming to be from FTC, SEC, or FBI with fake badges and case numbers." },
                { icon: <RefreshCw className="h-8 w-8" />, title: "Crypto Recovery", desc: "Promising to recover lost cryptocurrency using 'blockchain tracing' for upfront fees." },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FreezeGuard Detection */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How FreezeGuard Detects Recovery Scams</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> A1SCAMSHIELD Detection
                </h3>
                <ul className="space-y-3">
                  {[
                    "Recognizes recovery scam script patterns",
                    "Detects government impersonation language",
                    "Flags upfront fee requests in recovery context",
                    "Identifies urgency tactics used by recovery scammers",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> SCAMZY Intelligence
                </h3>
                <ul className="space-y-3">
                  {[
                    "Tracks victim list resale networks",
                    "Identifies fake recovery firm websites",
                    "Links recovery scammers to original scam operations",
                    "Monitors social media for victim targeting",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What's Real */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Legitimate Recovery vs. Scams</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-success/50 rounded-lg p-6">
                <h3 className="font-bold text-success mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Legitimate Options
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Report to FTC at reportfraud.ftc.gov (free)</li>
                  <li>File complaint with FBI IC3 (free)</li>
                  <li>Contact your bank&apos;s fraud department</li>
                  <li>Work with licensed attorney (verify with state bar)</li>
                  <li>Government never contacts victims to recover funds</li>
                </ul>
              </div>
              <div className="bg-card border border-danger/50 rounded-lg p-6">
                <h3 className="font-bold text-danger mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Red Flags
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Unsolicited contact about recovery</li>
                  <li>Upfront fees required before any recovery</li>
                  <li>Pressure to act immediately</li>
                  <li>Requests for payment via wire, gift card, crypto</li>
                  <li>Claims of guaranteed or high success rates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Don&apos;t Get Scammed Twice</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Recovery scammers specifically target recent victims. FreezeGuard protects you from both the initial scam and the follow-up.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Protected Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
