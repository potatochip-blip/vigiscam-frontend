'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Video, Eye, Zap, Lock, BarChart3, CheckCircle2, AlertCircle } from "lucide-react"

export default function LiveFaceSealPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <Badge className="bg-warning text-warning-foreground mb-6">Authenticity Verification</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            LiveFaceSeal™: Deepfake Face Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 text-pretty">
            Real-time biometric verification that detects AI-generated faces, deepfakes, and identity spoofing before the scam can proceed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Enable LiveFaceSeal</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Facial Recognition</h3>
                    <p className="text-muted-foreground">Analyzes 100+ facial landmarks and micro-expressions in real-time video feeds.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Authenticity Scoring</h3>
                    <p className="text-muted-foreground">Compares live facial biometrics against known deepfake patterns and AI-generation signatures.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Instant Alert</h3>
                    <p className="text-muted-foreground">If spoofing is detected, an immediate alert blocks the session and freezes the device.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center min-h-96">
              <div className="flex flex-col items-center justify-center text-center">
                <Video className="h-16 w-16 text-primary mb-4" />
                <p className="text-muted-foreground">Real-time face biometric analysis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Detection Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Deepfake Detection", desc: "Identifies AI-generated faces with 99.2% accuracy." },
              { icon: Zap, title: "Real-Time Processing", desc: "< 500ms detection latency during live calls." },
              { icon: Lock, title: "Liveness Detection", desc: "Distinguishes live faces from photos, videos, masks." },
              { icon: BarChart3, title: "Micro-Expression Analysis", desc: "Catches emotional inconsistencies in AI faces." },
              { icon: AlertCircle, title: "Spoofing Prevention", desc: "Detects 3D masks, face swaps, and synthetic audio." },
              { icon: CheckCircle2, title: "Identity Verification", desc: "Cross-references against known identity databases." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <item.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Works With</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {["Zoom", "Microsoft Teams", "Google Meet", "WhatsApp", "Telegram", "Apple FaceTime", "Skype", "Discord"].map((app) => (
              <div key={app} className="bg-card border border-border rounded-lg p-4 text-center text-foreground font-medium">
                {app}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Stop Deepfake Impersonations Today</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">LiveFaceSeal™ works seamlessly with all major video platforms.</p>
          <Link href="/select-account-type">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Enable LiveFaceSeal Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
