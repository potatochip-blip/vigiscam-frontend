'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle, CheckCircle2, Shield, ArrowRight, TrendingUp, Wallet, Lock, Globe } from "lucide-react"

export default function CryptoScamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <Badge className="bg-danger text-danger-foreground mb-6">Cryptocurrency Scam</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Crypto Scams: From Pig Butchering to Fake Exchanges
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 text-pretty">
              Criminals exploit cryptocurrency&apos;s complexity and irreversibility to steal billions annually through fake investment platforms, romance-investment hybrids, and fraudulent exchanges.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Get Protected Now</Button>
            </Link>
          </div>
        </section>

        {/* Types */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Types of Crypto Scams</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Pig Butchering (Romance + Investment)",
                  desc: "Scammers build romantic relationship, then introduce 'amazing' crypto investment opportunity. Victims see fake profits, invest more, then can't withdraw.",
                },
                {
                  title: "Fake Exchanges & Platforms",
                  desc: "Professional-looking crypto platforms that show fake gains. When you try to withdraw, there are fees, taxes, or the site disappears.",
                },
                {
                  title: "Pump and Dump",
                  desc: "Scammers artificially inflate token prices through hype, sell their holdings, leaving investors with worthless coins.",
                },
                {
                  title: "Fake Giveaways",
                  desc: "'Send 1 Bitcoin, get 2 back' schemes impersonating Elon Musk, exchanges, or celebrities. You send crypto, nothing returns.",
                },
                {
                  title: "Rug Pulls",
                  desc: "Developers create promising crypto project, attract investment, then abandon it and disappear with the funds.",
                },
                {
                  title: "Phishing for Wallet Keys",
                  desc: "Fake wallet apps, support scams, or seed phrase theft that gives scammers access to your entire crypto portfolio.",
                },
              ].map((type, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pig Butchering Deep Dive */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Pig Butchering: The Biggest Threat</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                { step: 1, title: "Random Contact", desc: "Wrong number text, LinkedIn connection, dating app match. Often attractive profile, claims to be successful investor." },
                { step: 2, title: "Friendship Phase", desc: "Weeks of normal conversation. Building trust, sharing life details. No mention of money yet." },
                { step: 3, title: "Investment Introduction", desc: "'I've been making great returns with this trading platform.' Shows screenshots of profits." },
                { step: 4, title: "Small Test", desc: "You try with small amount. The platform shows gains. You can even withdraw small amounts to build trust." },
                { step: 5, title: "Increasing Investment", desc: "'Invest more for bigger returns.' Platform shows your money growing. You invest savings, retirement, loans." },
                { step: 6, title: "Withdrawal Block", desc: "When you try to withdraw, there are fees, taxes, or verification required. Each payment leads to another." },
                { step: 7, title: "Total Loss", desc: "Platform disappears, scammer vanishes. Everything is gone. Often victims lose $100,000+." },
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
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Phrases That Signal Crypto Scam</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                "I'll teach you how to trade crypto and make passive income",
                "Guaranteed returns of 10%+ monthly",
                "My uncle works at this exclusive platform",
                "This opportunity won't last long",
                "I made $50,000 last month, look at my dashboard",
                "Just need to pay taxes/fees to unlock your withdrawal",
                "Send me your seed phrase to verify your wallet",
                "Double your Bitcoin instantly",
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
            <h2 className="text-3xl font-bold mb-12 text-foreground">How FreezeGuard Detects Crypto Scams</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> A1SCAMSHIELD Detection
                </h3>
                <ul className="space-y-3">
                  {[
                    "Recognizes pig butchering conversation patterns",
                    "Detects guaranteed return promises",
                    "Flags investment pitches from online contacts",
                    "Identifies fake platform URLs and patterns",
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
                  <Globe className="h-5 w-5 text-primary" /> SCAMZY Intelligence
                </h3>
                <ul className="space-y-3">
                  {[
                    "Database of known scam wallet addresses",
                    "Tracks fake exchange domains",
                    "Identifies script families across victims",
                    "Links pig butchering networks globally",
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

        {/* Intervention */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Intervention Points</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <TrendingUp className="h-8 w-8" />, title: "Conversation Analysis", desc: "A1SCAMSHIELD detects investment pitch patterns in messages from online contacts." },
                { icon: <Wallet className="h-8 w-8" />, title: "Transaction Alert", desc: "Dual-Auth requires trusted contact approval before crypto transfers to new addresses." },
                { icon: <Lock className="h-8 w-8" />, title: "Seed Phrase Protection", desc: "FreezeLock blocks any app or message requesting your seed phrase or private keys." },
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

        {/* Stats */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "$3.9B", label: "Lost to crypto scams in 2023" },
                { value: "$67K", label: "Median pig butchering loss" },
                { value: "80%", label: "Start from online contact" },
                { value: "0%", label: "Recovery rate once sent" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-secondary-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Crypto Is Irreversible. Protection Isn&apos;t Optional.</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              FreezeGuard detects crypto scam patterns and stops you before you make an irreversible transfer.
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
