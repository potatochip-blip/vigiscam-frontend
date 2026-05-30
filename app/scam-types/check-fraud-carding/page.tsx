'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle, CheckCircle2, Shield, ArrowRight, CreditCard, FileText, Mail, Package } from "lucide-react"

export default function CheckFraudCardingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <Badge className="bg-danger text-danger-foreground mb-6">Check Fraud & Carding</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Check Fraud & Carding: Old Crimes, New Tactics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 text-pretty">
              Criminals use stolen checks, washed checks, counterfeit checks, and stolen credit card data to drain accounts and make fraudulent purchases, often recruiting unwitting victims as money mules.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Get Protected Now</Button>
            </Link>
          </div>
        </section>

        {/* Types */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Types of Check & Card Fraud</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: <FileText className="h-8 w-8" />,
                  title: "Check Washing",
                  desc: "Criminals steal checks from mailboxes, chemically erase the ink, and rewrite them to themselves for larger amounts.",
                },
                {
                  icon: <Mail className="h-8 w-8" />,
                  title: "Counterfeit Checks",
                  desc: "Fake checks with real account numbers (from stolen data) are printed and deposited or used for payments.",
                },
                {
                  icon: <CreditCard className="h-8 w-8" />,
                  title: "Carding",
                  desc: "Using stolen credit card data to make purchases online, often testing cards with small purchases first.",
                },
                {
                  icon: <Package className="h-8 w-8" />,
                  title: "Money Mule Recruitment",
                  desc: "Victims are recruited to receive and forward payments, unknowingly laundering money from fraud.",
                },
              ].map((type, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 flex gap-4">
                  <div className="text-primary shrink-0">{type.icon}</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">{type.title}</h3>
                    <p className="text-sm text-muted-foreground">{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overpayment Scam */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">The Overpayment Check Scam</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                { step: 1, title: "The Setup", desc: "You're selling something online, renting property, or offering services. A buyer contacts you with interest." },
                { step: 2, title: "The Overpayment", desc: "They send a check for more than the agreed amount. 'I accidentally wrote it for $3,000 instead of $300.'" },
                { step: 3, title: "The Request", desc: "They ask you to deposit the check and wire back the difference, or send it to their 'shipper' or 'agent.'" },
                { step: 4, title: "The Deposit", desc: "Your bank makes the funds available quickly (by law). You send the 'overpayment' via wire or gift cards." },
                { step: 5, title: "The Bounce", desc: "Days or weeks later, the check is discovered to be fake or stolen. The bank reverses the deposit." },
                { step: 6, title: "The Loss", desc: "You owe the bank the full amount of the check, plus the money you already sent to the scammer." },
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

        {/* Common Scenarios */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Common Check Fraud Scenarios</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Online Sales", desc: "Buyer overpays for item, asks you to send difference to 'shipping company.'" },
                { title: "Job Scams", desc: "'Employer' sends check for equipment, asks you to forward funds to 'vendors.'" },
                { title: "Rental Scams", desc: "'Tenant' overpays deposit, needs refund before moving in." },
                { title: "Mystery Shopping", desc: "Sent check to 'evaluate' wire transfer services by actually sending money." },
                { title: "Car Wrap Scams", desc: "Paid to wrap car in advertising, but check is fraudulent overpayment." },
                { title: "Prize/Lottery", desc: "Won prize, but must pay 'taxes' from winnings check before receiving money." },
              ].map((scenario, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-2">{scenario.title}</h3>
                  <p className="text-sm text-muted-foreground">{scenario.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Warning Signs</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                "Check for more than agreed amount",
                "Pressure to send money quickly before check clears",
                "Asked to wire money or buy gift cards",
                "Buyer/employer you've never met in person",
                "Transaction seems too good to be true",
                "Asked to keep arrangement confidential",
                "Check appears to be from legitimate company",
                "Urgency: 'My shipper needs payment today'",
              ].map((sign, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{sign}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FreezeGuard Detection */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How FreezeGuard Helps</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> Detection
                </h3>
                <ul className="space-y-3">
                  {[
                    "A1SCAMSHIELD recognizes overpayment script patterns",
                    "Flags requests to send money after receiving payment",
                    "Detects job scam and mystery shopper language",
                    "Identifies money mule recruitment tactics",
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
                  <Shield className="h-5 w-5 text-primary" /> Protection
                </h3>
                <ul className="space-y-3">
                  {[
                    "Dual-Auth blocks wire transfers to new recipients",
                    "FreezeLock can pause suspicious transactions",
                    "Alerts family before irreversible action",
                    "Evidence preserved for bank disputes",
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

        {/* Key Facts */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-secondary-foreground text-center">Remember</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { fact: "Banks must make funds available quickly, but that doesn't mean the check has cleared", icon: <CheckCircle2 className="h-6 w-6 text-accent" /> },
                  { fact: "A check can bounce weeks after deposit", icon: <CheckCircle2 className="h-6 w-6 text-accent" /> },
                  { fact: "You are responsible for checks you deposit, even if they're fake", icon: <CheckCircle2 className="h-6 w-6 text-accent" /> },
                  { fact: "Never send money to someone who paid you with a check", icon: <CheckCircle2 className="h-6 w-6 text-accent" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {item.icon}
                    <span className="text-secondary-foreground">{item.fact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">If They Overpay, It&apos;s a Scam</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              FreezeGuard recognizes check fraud patterns and stops you before you send money to scammers.
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
