'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Camera, MapPin, Zap, Lock, CheckCircle2, AlertTriangle, BarChart3 } from "lucide-react"

export default function SceneSealPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <Badge className="bg-warning text-warning-foreground mb-6">Authenticity Verification</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            SceneSeal™: Background Scene Verification
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 text-pretty">
            Authenticates video backgrounds to detect AI-generated scenes, green-screen manipulation, and location spoofing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Enable SceneSeal</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Scene Analysis */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Scene Verification Methods</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Camera, title: "Lighting Analysis", desc: "Verifies shadow patterns and light source consistency." },
              { icon: MapPin, title: "Location Authenticity", desc: "Confirms geographic plausibility of background." },
              { icon: BarChart3, title: "Pixel Distribution", desc: "Detects AI-generated or edited backgrounds." },
              { icon: Zap, title: "Real-Time Detection", desc: "Analyzes scene changes during video call." },
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

      {/* What It Detects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Threats Detected</h2>
          <div className="space-y-4">
            {[
              { threat: "Green Screen Spoofing", desc: "Physical green screen or digital background replacement." },
              { threat: "AI-Generated Backgrounds", desc: "Synthetic scenes created by generative models." },
              { threat: "Video Injection", desc: "Pre-recorded scenes inserted into live call stream." },
              { threat: "Location Masquerade", desc: "Fake setting designed to impersonate trusted location." },
              { threat: "Office Simulation", desc: "Manufactured corporate environment to fake authority." },
              { threat: "Deepfake Composites", desc: "Mismatched faces and backgrounds in single frame." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-card border border-border rounded-lg">
                <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground">{item.threat}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Accuracy & Speed</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: "97.1%", label: "Scene Authenticity Accuracy" },
              { stat: "< 600ms", label: "Background Analysis Time" },
              { stat: "1M+", label: "Scenes Analyzed Daily" },
            ].map((metric, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{metric.stat}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Verify the Scene, Not Just the Face</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">SceneSeal™ ensures that the background is real and consistent with claimed location.</p>
          <Link href="/select-account-type">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Enable SceneSeal Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
