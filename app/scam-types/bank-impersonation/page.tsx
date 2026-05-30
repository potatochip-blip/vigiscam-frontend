'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle, CheckCircle2, Phone, CreditCard, Building, Shield, ArrowRight } from "lucide-react"

export default function BankImpersonationScamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <Badge className="bg-danger text-danger-foreground mb-6">Bank Impersonation Scam</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Bank Impersonation: When Your Bank Calls... But It&apos;s Not Your Bank
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 text-pretty">
              Scammers spoof bank phone numbers and pose as fraud department representatives, tricking victims into revealing account details or authorizing transfers to &quot;secure&quot; their funds.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Get Protected Now</Button>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How Bank Impersonation Scams Work</h2>
            <div className="space-y-4 max-w-4xl">
              {[
                { step: 1, title: "Spoofed Call From Your Bank", desc: "You receive a call that shows your bank's actual name and number on caller ID. The scammer may know your name and last 4 digits of your account." },
                { step: 2, title: "Urgent Fraud Alert", desc: "The caller claims there's suspicious activity on your account. Someone is trying to wire $5,000 from your account right now." },
                { step: 3, title: "Verification Trap", desc: "To 'verify your identity,' they ask you to confirm your full account number, PIN, or online banking password." },
                { step: 4, title: "Transfer to Safety", desc: "They instruct you to transfer money to a 'secure account' or purchase gift cards as 'fraud insurance.'" },
                { step: 5, title: "Money Gone", desc: "Once the transfer is complete or gift card codes are shared, the money is immediately moved offshore and unrecoverable." },
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
                "This is the fraud department at [Bank Name]",
                "We've detected suspicious activity on your account",
                "Your account has been compromised",
                "We need to verify some information for security purposes",
                "I need you to move your funds to a secure holding account",
                "Don't tell anyone about this call - it's confidential",
                "The criminals might be monitoring your account right now",
                "Time is critical - we need to act immediately",
                "I'll send you a security code to verify your identity",
                "Purchase gift cards as fraud protection insurance",
              ].map((phrase, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground italic">&quot;{phrase}&quot;</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fraud Journey */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Victim-State Progression</h2>
            <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {[
                { state: "Fear", desc: "Initial panic about account security", color: "bg-yellow-500" },
                { state: "Trust", desc: "Caller seems professional and helpful", color: "bg-blue-500" },
                { state: "Urgency", desc: "Pressure to act before 'it's too late'", color: "bg-orange-500" },
                { state: "Compliance", desc: "Following instructions to 'protect' funds", color: "bg-red-500" },
                { state: "Realization", desc: "Understanding the deception too late", color: "bg-gray-500" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className={`h-12 w-12 rounded-full ${item.color} flex items-center justify-center text-white text-sm font-bold mx-auto mb-3`}>{i + 1}</div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{item.state}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FreezeGuard Detection */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How FreezeGuard Detects Bank Impersonation</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> A1SCAMSHIELD Detection
                </h3>
                <ul className="space-y-3">
                  {[
                    "Recognizes urgent bank fraud script patterns",
                    "Detects verification request manipulation tactics",
                    "Identifies gift card and wire transfer requests",
                    "Flags 'secrecy' and 'confidentiality' pressure",
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
                  <Building className="h-5 w-5 text-primary" /> SCAMZY Intelligence
                </h3>
                <ul className="space-y-3">
                  {[
                    "Cross-references caller against known scam numbers",
                    "Tracks script families across thousands of cases",
                    "Links spoofed numbers to scam network clusters",
                    "Provides real-time risk scoring during call",
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

        {/* Intervention Points */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Intervention Points</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Phone className="h-6 w-6" />, title: "During Call", desc: "Real-time analysis flags manipulation tactics. FreezeLock can disconnect the call." },
                { icon: <CreditCard className="h-6 w-6" />, title: "Before Transfer", desc: "Dual-Auth requires trusted contact approval for any wire transfer or large purchase." },
                { icon: <Shield className="h-6 w-6" />, title: "After Detection", desc: "Evidence preserved, family alerted, and case ready for reporting to authorities." },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="text-primary mb-3 flex justify-center">{item.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Evidence Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Sample Evidence Timeline</h2>
            <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-6">
              <div className="space-y-4">
                {[
                  { time: "2:14:22 PM", event: "Incoming call from spoofed number (displayed as Chase Bank)", type: "call" },
                  { time: "2:14:45 PM", event: "A1SCAMSHIELD flags: 'Fraud department' script detected", type: "detection" },
                  { time: "2:15:30 PM", event: "Risk score elevated: Urgency language detected", type: "detection" },
                  { time: "2:16:12 PM", event: "Scammer requests account verification", type: "event" },
                  { time: "2:16:45 PM", event: "A1SCAMSHIELD flags: Verification trap pattern", type: "detection" },
                  { time: "2:17:00 PM", event: "FreezeLock activated - Call terminated", type: "intervention" },
                  { time: "2:17:01 PM", event: "Alert sent to trusted contact (Sarah)", type: "alert" },
                  { time: "2:17:05 PM", event: "Call recording and transcript saved to Evidence Vault", type: "evidence" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-xs font-mono text-muted-foreground w-24 shrink-0">{item.time}</span>
                    <Badge className={
                      item.type === 'detection' ? 'bg-yellow-500/20 text-yellow-600' :
                      item.type === 'intervention' ? 'bg-red-500/20 text-red-600' :
                      item.type === 'alert' ? 'bg-blue-500/20 text-blue-600' :
                      item.type === 'evidence' ? 'bg-green-500/20 text-green-600' :
                      'bg-muted text-muted-foreground'
                    }>{item.type}</Badge>
                    <span className="text-sm text-foreground">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Your Bank Will Never Ask For This</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Real banks don&apos;t call asking for passwords, gift cards, or money transfers. FreezeGuard knows the difference.
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
