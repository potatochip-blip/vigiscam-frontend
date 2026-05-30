'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle, CheckCircle2, Heart, Video, DollarSign, Shield, ArrowRight, Clock } from "lucide-react"

export default function RomanceScamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <Badge className="bg-danger text-danger-foreground mb-6">Romance Scam</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Romance Scams: Fake Love, Real Financial Devastation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 text-pretty">
              Scammers build emotional relationships over weeks or months, then exploit that trust to extract money through fake emergencies, investment schemes, or requests for help.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Get Protected Now</Button>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How Romance Scams Work</h2>
            <div className="space-y-4 max-w-4xl">
              {[
                { step: 1, title: "Initial Contact", desc: "Scammer creates attractive profile on dating apps, social media, or even LinkedIn. Often claims to be military, doctor, or businessman abroad." },
                { step: 2, title: "Love Bombing", desc: "Intense affection, constant messaging, quick professions of love. They make you feel special and create emotional dependency." },
                { step: 3, title: "Excuses to Avoid Video", desc: "Always reasons they can't video chat: bad connection, broken camera, in a dangerous area. Uses stolen photos or deepfake video." },
                { step: 4, title: "The First Ask", desc: "An emergency: medical bills, travel costs to visit you, business opportunity gone wrong. Small amount to test your willingness." },
                { step: 5, title: "Escalating Requests", desc: "Each crisis gets bigger. You've already invested emotionally and financially. Sunk cost fallacy keeps you sending money." },
                { step: 6, title: "The Final Ask", desc: "Often a large 'final' amount that will solve everything and let you finally meet. After this, they disappear or invent new crises." },
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
                "I've never felt this way about anyone before",
                "I can't wait to meet you and start our life together",
                "My camera/phone is broken, I'll fix it soon",
                "I'm stuck here and need help with an emergency",
                "If you really loved me, you would help me",
                "I'll pay you back as soon as I get home",
                "Don't tell anyone about us yet",
                "I need you to receive a package for me",
                "Let me show you how to invest and make money for our future",
                "I'm working on an oil rig / deployed overseas / stuck in customs",
              ].map((phrase, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <Heart className="h-5 w-5 text-danger shrink-0 mt-0.5" />
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
            <div className="grid md:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {[
                { state: "Loneliness", desc: "Seeking connection online", weeks: "Week 1" },
                { state: "Excitement", desc: "New romantic interest", weeks: "Week 2-3" },
                { state: "Attachment", desc: "Deep emotional bond forms", weeks: "Week 4-8" },
                { state: "Worry", desc: "Partner has 'emergency'", weeks: "Week 8-10" },
                { state: "Sacrifice", desc: "Sending money to help", weeks: "Week 10-20" },
                { state: "Denial", desc: "Ignoring red flags", weeks: "Week 20+" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-xs text-muted-foreground mb-2">{item.weeks}</div>
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-3">{i + 1}</div>
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
            <h2 className="text-3xl font-bold mb-12 text-foreground">How FreezeGuard Detects Romance Scams</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> A1SCAMSHIELD Detection
                </h3>
                <ul className="space-y-3">
                  {[
                    "Recognizes love-bombing language patterns",
                    "Detects emergency-based money request scripts",
                    "Identifies isolation and secrecy tactics",
                    "Flags investment pitch within romantic context",
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
                  <Video className="h-5 w-5 text-primary" /> Authenticity Suite
                </h3>
                <ul className="space-y-3">
                  {[
                    "LiveFaceSeal verifies video calls are real-time",
                    "Fake Video Hash Tracker identifies stolen photos",
                    "VoiceMatchSeal detects voice manipulation",
                    "Cross-references photos against known scam databases",
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
                { icon: <Clock className="h-6 w-6" />, title: "Pattern Recognition", desc: "Alerts after detecting consistent romance scam communication patterns over days." },
                { icon: <DollarSign className="h-6 w-6" />, title: "Money Request", desc: "Dual-Auth blocks any wire transfer, gift card purchase, or crypto send requested by new contact." },
                { icon: <Shield className="h-6 w-6" />, title: "Family Alert", desc: "Trusted contacts notified when romance scam risk detected, enabling supportive intervention." },
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

        {/* Stats */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "$1.3B", label: "Lost to romance scams in 2023" },
                { value: "70,000+", label: "Victims reported annually" },
                { value: "$52,000", label: "Average loss per victim" },
                { value: "40%", label: "Start on social media" },
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
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Real Love Doesn&apos;t Ask For Money</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              FreezeGuard protects you and your loved ones from romance scams with AI that recognizes the manipulation.
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
