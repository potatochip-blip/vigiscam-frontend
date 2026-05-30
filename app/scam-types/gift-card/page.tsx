'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle, CheckCircle2, Shield, ArrowRight, CreditCard, Store, Phone } from "lucide-react"

export default function GiftCardScamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <Badge className="bg-danger text-danger-foreground mb-6">Gift Card Scam</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Gift Card Scams: The Untraceable Payment Method
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 text-pretty">
              Scammers demand payment via gift cards because they&apos;re nearly impossible to trace or recover. No legitimate business, government agency, or organization accepts gift cards as payment.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Get Protected Now</Button>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How Gift Card Scams Work</h2>
            <div className="space-y-4 max-w-4xl">
              {[
                { step: 1, title: "The Setup", desc: "Scammer establishes urgency through any scam type: tech support, IRS impersonation, romance, boss impersonation, etc." },
                { step: 2, title: "Payment Instructions", desc: "Instead of wire or credit card, they request payment via gift cards: Google Play, Apple, Amazon, Target, Walmart, etc." },
                { step: 3, title: "Store Visit", desc: "Victim is instructed to go to a store and purchase specific amounts. Often told to say it's for personal use if asked." },
                { step: 4, title: "Stay on the Line", desc: "Scammer keeps victim on phone throughout to prevent store employees from intervening." },
                { step: 5, title: "Read the Codes", desc: "Victim reads the card numbers and PINs to the scammer. Sometimes they send photos of the cards." },
                { step: 6, title: "Instant Drain", desc: "Scammer immediately redeems or sells the card codes. Money is gone within minutes, unrecoverable." },
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Common Gift Card Scam Scenarios</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { title: "IRS / Tax Scam", desc: "You owe back taxes and must pay immediately with gift cards to avoid arrest." },
                { title: "Tech Support", desc: "Your refund can only be processed if you pay the difference in gift cards." },
                { title: "Boss Impersonation", desc: "Your CEO needs you to urgently buy gift cards for client appreciation." },
                { title: "Utility Shutoff", desc: "Pay your overdue electric bill with gift cards in the next hour or be disconnected." },
                { title: "Prize/Lottery", desc: "Pay taxes on your winnings with gift cards to receive your prize." },
                { title: "Romance Scam", desc: "Help your online love interest with an emergency by sending gift card codes." },
              ].map((scenario, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-2">{scenario.title}</h3>
                  <p className="text-sm text-muted-foreground">{scenario.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Phrases */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Phrases That Signal Gift Card Scam</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                "We only accept payment via gift cards",
                "Go to the nearest Walmart/Target/CVS right now",
                "Don't tell the cashier what they're for",
                "Stay on the phone while you're at the store",
                "Read me the numbers on the back of the card",
                "Take a picture of the card and send it to me",
                "This is the fastest way to resolve your situation",
                "Gift cards are required for security purposes",
              ].map((phrase, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground italic">&quot;{phrase}&quot;</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FreezeGuard Detection */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How FreezeGuard Stops Gift Card Scams</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Phone className="h-8 w-8" />, title: "Call Detection", desc: "A1SCAMSHIELD recognizes gift card payment requests during calls and triggers immediate warning." },
                { icon: <Store className="h-8 w-8" />, title: "Location Awareness", desc: "When you enter a store while on suspicious call, FreezeGuard escalates alerts." },
                { icon: <CreditCard className="h-8 w-8" />, title: "Dual-Auth Block", desc: "Family Guardian and Dual-Auth can require approval before any gift card purchase." },
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

        {/* Key Facts */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-secondary-foreground text-center">Remember</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { fact: "No legitimate organization accepts gift cards as payment", icon: <CheckCircle2 className="h-6 w-6 text-accent" /> },
                  { fact: "The IRS will never call demanding immediate payment", icon: <CheckCircle2 className="h-6 w-6 text-accent" /> },
                  { fact: "Your utility company won't shut off power for gift cards", icon: <CheckCircle2 className="h-6 w-6 text-accent" /> },
                  { fact: "If asked to pay with gift cards, it's always a scam", icon: <CheckCircle2 className="h-6 w-6 text-accent" /> },
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

        {/* What To Do */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">If You&apos;ve Been Targeted</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4">If You Haven&apos;t Given Codes Yet</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Hang up immediately</li>
                  <li>Do NOT share the card numbers or PINs</li>
                  <li>Return unused cards to the store</li>
                  <li>Report to FTC at reportfraud.ftc.gov</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4">If You Already Gave Codes</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Contact the gift card company immediately</li>
                  <li>Report to FTC and FBI IC3</li>
                  <li>Keep the physical cards as evidence</li>
                  <li>File police report for documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Gift Cards Are For Gifts, Not Payments</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              FreezeGuard detects gift card scam requests in real-time and stops you before you lose money.
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
