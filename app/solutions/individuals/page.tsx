'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Brain, Lock, Eye, Database, Bell, CheckCircle2, ArrowRight, Smartphone, Laptop } from "lucide-react"

export default function IndividualsSolutionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-primary/5 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-primary text-primary-foreground mb-4">For Individuals</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Personal Real-Time Scam Protection
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                VIGISCAM™ runs silently on your devices, detecting scam attempts in real-time and intervening before you lose money or personal information.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/select-account-type">
                  <Button size="lg" className="bg-primary text-primary-foreground">
                    Start Free Protection <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="bg-transparent">Watch Demo</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Complete Personal Protection</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: <Brain className="h-8 w-8" />,
                  title: "A1SCAMSHIELD™ Detection",
                  desc: "AI analyzes every call and remote session for manipulation tactics, urgency pressure, and scam language patterns.",
                },
                {
                  icon: <Eye className="h-8 w-8" />,
                  title: "Caller Verification",
                  desc: "LiveFaceSeal, VoiceMatchSeal, and SceneSeal verify that callers are who they claim to be.",
                },
                {
                  icon: <Lock className="h-8 w-8" />,
                  title: "FreezeLock™ Intervention",
                  desc: "When threats are detected, your screen freezes, remote access is blocked, and the scam is stopped.",
                },
                {
                  icon: <Bell className="h-8 w-8" />,
                  title: "Real-Time Alerts",
                  desc: "Get instant warnings when something suspicious is happening. Never be caught off guard.",
                },
                {
                  icon: <Database className="h-8 w-8" />,
                  title: "Evidence Vault™",
                  desc: "Every scam attempt is logged with timestamps, recordings, and full context for reporting.",
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "24/7 Protection",
                  desc: "Always-on monitoring across all your devices. Works in the background without slowing you down.",
                },
              ].map((feature, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">How It Protects You</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  { step: "1", title: "Install on Your Devices", desc: "Quick setup on Windows, Mac, iOS, and Android. Works silently in the background." },
                  { step: "2", title: "AI Monitors Activity", desc: "Our AI watches for scam signals during calls, video chats, and remote sessions." },
                  { step: "3", title: "Threats Detected Instantly", desc: "When manipulation tactics or fake identities are detected, you're alerted immediately." },
                  { step: "4", title: "Automatic Intervention", desc: "FreezeLock activates to stop the threat. Your screen freezes, remote access ends." },
                  { step: "5", title: "Evidence Preserved", desc: "Full incident timeline saved for your review and potential reporting to authorities." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 items-start">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shrink-0">
                      {item.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Devices */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Works on All Your Devices</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Laptop className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-foreground text-lg mb-2">Desktop & Laptop</h3>
                <p className="text-muted-foreground mb-4">Windows 10+ and macOS 12+</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Remote access monitoring</li>
                  <li>Screen share protection</li>
                  <li>Browser extension available</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-foreground text-lg mb-2">Mobile</h3>
                <p className="text-muted-foreground mb-4">iOS 15+ and Android 10+</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Call screening</li>
                  <li>SMS scam detection</li>
                  <li>Video call protection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Scam Types */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Scams We Stop</h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                "Tech Support Scams",
                "Bank Impersonation",
                "IRS/Government Scams",
                "Romance Scams",
                "Crypto Scams",
                "Gift Card Scams",
                "Recovery Scams",
                "Sextortion",
                "Deepfake Impersonation",
                "Remote Access Fraud",
              ].map((scam) => (
                <Badge key={scam} className="bg-card border border-border text-foreground px-4 py-2 text-sm">
                  {scam}
                </Badge>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/scam-types" className="text-primary font-medium hover:underline">
                View full scam library →
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Simple Pricing</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="font-bold text-foreground text-xl mb-2">Free</h3>
                <p className="text-muted-foreground mb-4">Basic protection to get started</p>
                <ul className="space-y-2 mb-6">
                  {["1 device", "Basic scam detection", "Email alerts", "7-day evidence retention"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button variant="outline" className="w-full bg-transparent">Get Started Free</Button>
                </Link>
              </div>
              <div className="bg-card border-2 border-primary rounded-lg p-8 relative">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">Recommended</Badge>
                <h3 className="font-bold text-foreground text-xl mb-2">Personal Shield</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">$9.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {["3 devices", "Full A1SCAMSHIELD", "FreezeLock intervention", "Caller verification", "Evidence Vault", "Priority support"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/select-account-type">
                  <Button className="w-full bg-primary text-primary-foreground">Start 14-Day Trial</Button>
                </Link>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/pricing" className="text-primary font-medium hover:underline">
                See all plans and features →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
              Scammers Are Getting Smarter. Stay Ahead.
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join over 2 million people protected by VIGISCAM™.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Start Free Protection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
