'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle, CheckCircle2, Shield, ArrowRight, Eye, MessageSquare, Lock, Users } from "lucide-react"

export default function SextortionScamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <Badge className="bg-danger text-danger-foreground mb-6">Sextortion Scam</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Sextortion: Digital Blackmail Targeting All Ages
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 text-pretty">
              Criminals threaten to release intimate images or videos unless victims pay. They may have real content, claim to have content, or use AI-generated deepfakes. Increasingly targeting teenagers and young adults.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Get Protected Now</Button>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How Sextortion Scams Work</h2>
            <div className="space-y-4 max-w-4xl">
              {[
                { step: 1, title: "Initial Contact", desc: "Scammer connects on social media, dating apps, or gaming platforms. Often poses as an attractive peer or romantic interest." },
                { step: 2, title: "Trust Building", desc: "Days or weeks of friendly conversation. They may share (fake) intimate content first to encourage reciprocation." },
                { step: 3, title: "Content Obtained", desc: "Victim shares intimate images or video, or engages in video chat where scammer secretly records. Sometimes AI-generated deepfakes are created." },
                { step: 4, title: "Threat Begins", desc: "Scammer reveals true intent: Pay money or the content will be sent to family, friends, employer, or posted publicly." },
                { step: 5, title: "Escalating Demands", desc: "Each payment leads to more demands. Scammers may still release content regardless of payment." },
                { step: 6, title: "Psychological Devastation", desc: "Victims experience shame, fear, isolation. Tragically, some young victims have died by suicide." },
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

        {/* Types */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Types of Sextortion</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Eye className="h-8 w-8" />, title: "Real Content", desc: "Victim actually shared intimate content which scammer now uses to extort." },
                { icon: <MessageSquare className="h-8 w-8" />, title: "Email Bluff", desc: "Mass emails claiming to have hacked your device and recorded you. Usually fake." },
                { icon: <Lock className="h-8 w-8" />, title: "AI Deepfake", desc: "Scammer creates fake intimate images using AI from public social media photos." },
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

        {/* Common Phrases */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Common Threat Messages</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                "I have videos of you watching adult content",
                "Pay $500 in Bitcoin or I send this to everyone you know",
                "I hacked your webcam and recorded everything",
                "Send money in 24 hours or your life is ruined",
                "I have your contact list from your hacked email",
                "This is not a joke - look at this screenshot",
                "I will send to your parents/employer/spouse",
                "Pay now and I delete everything",
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
            <h2 className="text-3xl font-bold mb-12 text-foreground">How FreezeGuard Helps</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> Detection & Prevention
                </h3>
                <ul className="space-y-3">
                  {[
                    "A1SCAMSHIELD detects grooming conversation patterns",
                    "Flags requests for intimate content from new contacts",
                    "Recognizes sextortion threat language",
                    "Detects mass-email sextortion campaigns",
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
                  <Users className="h-5 w-5 text-primary" /> Family Protection
                </h3>
                <ul className="space-y-3">
                  {[
                    "Family Guardian alerts parents to risky conversations",
                    "Age-appropriate privacy settings available",
                    "Safe reporting path without victim shaming",
                    "Evidence preservation for law enforcement",
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

        {/* What To Do */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">If You&apos;re Being Extorted</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-success/50 rounded-lg p-6">
                <h3 className="font-bold text-success mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Do This
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Stop all communication with the scammer</li>
                  <li>Do NOT pay - it rarely stops the threats</li>
                  <li>Preserve all evidence (screenshots, messages)</li>
                  <li>Report to FBI IC3 and local police</li>
                  <li>Talk to a trusted adult or counselor</li>
                  <li>Report the account on the platform</li>
                  <li>Contact NCMEC if under 18 (CyberTipline.org)</li>
                </ul>
              </div>
              <div className="bg-card border border-danger/50 rounded-lg p-6">
                <h3 className="font-bold text-danger mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Don&apos;t Do This
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Don&apos;t pay the ransom</li>
                  <li>Don&apos;t send more content</li>
                  <li>Don&apos;t engage or negotiate</li>
                  <li>Don&apos;t delete evidence</li>
                  <li>Don&apos;t blame yourself</li>
                  <li>Don&apos;t handle it alone</li>
                  <li>Don&apos;t assume it&apos;s hopeless</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Crisis Resources</h2>
              <p className="text-muted-foreground mb-8">
                If you or someone you know is struggling, help is available.
              </p>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="font-semibold text-foreground">National Suicide Prevention Lifeline</p>
                  <p className="text-muted-foreground">988 (call or text)</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="font-semibold text-foreground">Crisis Text Line</p>
                  <p className="text-muted-foreground">Text HOME to 741741</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="font-semibold text-foreground">FBI IC3 Report</p>
                  <p className="text-muted-foreground">ic3.gov</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Protect Your Family From Sextortion</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              FreezeGuard detects grooming patterns and sextortion threats before they escalate.
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
