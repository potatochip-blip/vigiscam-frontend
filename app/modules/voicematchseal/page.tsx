'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mic, AudioWaveform, Zap, Lock, CheckCircle2, AlertTriangle } from "lucide-react"

export default function VoiceMatchSealPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <Badge className="bg-warning text-warning-foreground mb-6">Authenticity Verification</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            VoiceMatchSeal™: Voice Clone Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 text-pretty">
            Distinguishes genuine voices from AI-generated voice clones, voice spoofing, and synthetic audio impersonations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Enable VoiceMatchSeal</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Detection Methods */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Voice Authentication Methods</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Frequency Analysis", desc: "Analyzes voice spectrum patterns unique to each speaker." },
              { title: "Prosody Detection", desc: "Identifies natural speech rhythm, intonation, and pacing." },
              { title: "Phonetic Matching", desc: "Compares phonetic patterns against stored voice profiles." },
            ].map((method, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <AudioWaveform className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threats Detected */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">What VoiceMatchSeal Detects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { threat: "AI Voice Clones", indicator: "Generated via VALL-E, ElevenLabs, Descript" },
              { threat: "Voice Conversion", indicator: "Real voice distorted or converted" },
              { threat: "Voice Injection", indicator: "Synthetic audio spliced into recordings" },
              { threat: "Phone Spoofing", indicator: "Caller ID manipulation with altered voice" },
              { threat: "HiFi Audio Deepfakes", indicator: "High-fidelity synthetic speech generation" },
              { threat: "Emotional Mimicry", indicator: "AI learning emotional patterns to manipulate" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-card border border-border rounded-lg">
                <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.threat}</h3>
                  <p className="text-sm text-muted-foreground">{item.indicator}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accuracy */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Performance Metrics</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { stat: "98.6%", label: "Detection Accuracy" },
              { stat: "< 300ms", label: "Analysis Latency" },
              { stat: "50K+", label: "Voice Profiles Indexed" },
              { stat: "24/7", label: "Real-Time Monitoring" },
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
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Verify Every Voice</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">VoiceMatchSeal™ ensures that the voice on the other end is genuinely who they claim to be.</p>
          <Link href="/select-account-type">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Enable VoiceMatchSeal Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
