'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Video, Shield, Zap, Lock, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function CamViguardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <Badge className="bg-warning text-warning-foreground mb-6">Authenticity Verification</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            CamViguard™: Camera Feed Integrity Check
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 text-pretty">
            Detects manipulated video feeds, frame injections, and confirms that the camera feed is genuinely live and unaltered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Enable CamViguard</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Detection Technology */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">How CamViguard Works</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 font-bold">1</div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Live Stream Analysis</h3>
                  <p className="text-muted-foreground">Continuously analyzes video frame timing and encoding patterns.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 font-bold">2</div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Frame Integrity Check</h3>
                  <p className="text-muted-foreground">Verifies that video frames haven't been altered, duplicated, or injected.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 font-bold">3</div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Liveness Confirmation</h3>
                  <p className="text-muted-foreground">Confirms that video is genuinely live and not pre-recorded playback.</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center min-h-80">
              <Video className="h-20 w-20 text-primary opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Threats Detected */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">What CamViguard Detects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { threat: "Pre-Recorded Playback", desc: "Distinguishes live stream from recorded video loop." },
              { threat: "Frame Duplication", desc: "Detects when frames are repeated to simulate live action." },
              { threat: "Video Injection", desc: "Identifies spliced or inserted video segments." },
              { threat: "Codec Manipulation", desc: "Detects unusual encoding or compression artifacts." },
              { threat: "Timestamp Tampering", desc: "Verifies frame timing is consistent with live streaming." },
              { threat: "Feed Switching", desc: "Detects when video source is switched during call." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-card border border-border rounded-lg">
                <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.threat}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Performance Metrics</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { stat: "99.1%", label: "Frame Integrity Accuracy" },
              { stat: "< 100ms", label: "Detection Latency" },
              { stat: "60 FPS", label: "Supported Frame Rate" },
              { stat: "4K", label: "Maximum Resolution" },
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
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Verify Every Frame</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">CamViguard™ ensures that the video stream is genuinely live and hasn't been manipulated.</p>
          <Link href="/select-account-type">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Enable CamViguard Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
