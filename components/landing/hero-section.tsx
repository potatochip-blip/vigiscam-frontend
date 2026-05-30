"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight, Zap, AlertTriangle, CheckCircle, TrendingUp, Network, Lock, Eye } from "lucide-react"

const SCAM_SCORE_STEPS = [12, 28, 45, 67, 82, 91]
const DETECTION_EVENTS = [
  { time: "0:04", event: "Call connected — caller claims to be Microsoft Support", type: "info" },
  { time: "0:12", event: "A1SCAMSHIELD™ — urgency pressure detected", type: "warn" },
  { time: "0:19", event: "Remote access request detected — TeamViewer", type: "danger" },
  { time: "0:26", event: "VoiceMatchSeal™ — caller voice mismatch flagged", type: "danger" },
  { time: "0:31", event: "ScamScore 91 — FreezeLock™ activated", type: "critical" },
  { time: "0:32", event: "Screen frozen. Remote session terminated. Family alerted.", type: "success" },
]

export function HeroSection() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const scamScore = SCAM_SCORE_STEPS[Math.min(step, SCAM_SCORE_STEPS.length - 1)]
  const events = DETECTION_EVENTS.slice(0, step + 1)

  useEffect(() => {
    if (!running) return
    if (step >= DETECTION_EVENTS.length - 1) { setRunning(false); return }
    const t = setTimeout(() => setStep((s) => s + 1), 1400)
    return () => clearTimeout(t)
  }, [running, step])

  const startDemo = () => { setStep(0); setRunning(true) }
  const resetDemo = () => { setStep(0); setRunning(false) }

  const scoreColor = scamScore < 40 ? "text-success" : scamScore < 70 ? "text-warning" : "text-danger"
  const scoreBg = scamScore < 40 ? "bg-success/10 border-success/30" : scamScore < 70 ? "bg-warning/10 border-warning/30" : "bg-danger/10 border-danger/30"

  return (
    <section className="relative overflow-hidden">
      {/* Announcement bar */}
      <div className="bg-primary py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground text-sm font-medium">
            <Badge className="bg-accent text-accent-foreground mr-2 text-xs">NEW</Badge>
            SCAMZY™ Global Intelligence Network now tracking 4.2M active scam actors across 38 countries.
            <Link href="/modules/scamzy" className="underline ml-2 hover:text-accent transition-colors">Learn more</Link>
          </p>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-secondary text-secondary-foreground mb-6 text-xs font-semibold uppercase tracking-wider">
                <Shield className="h-3.5 w-3.5" />
                Unified Anti-Scam Platform
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-foreground text-balance leading-[1.05]">
                A small monthly fee<br />
                could help prevent a<br />
                <span className="text-primary">life-changing financial loss.</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty max-w-xl">
                VIGISCAM™ is the unified anti-scam platform that detects live scammer language, emotional manipulation, deepfake callers, remote-access abuse, and fraud-network signals—then warns, freezes, blocks, alerts, preserves evidence, and exposes the network before harm is done.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/how-it-works">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-7">
                    See How It Works
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/platform">
                  <Button size="lg" variant="outline" className="h-12 px-7 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                    Explore the Platform
                  </Button>
                </Link>
                <Link href="/solutions/families">
                  <Button size="lg" variant="outline" className="h-12 px-7 bg-transparent border-border hover:bg-muted">
                    Protect My Family
                  </Button>
                </Link>
              </div>

              <Link href="/company/contact" className="block mb-10">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-10 px-6 text-sm font-semibold">
                  Request Enterprise Demo
                </Button>
              </Link>

              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
                {["No credit card required", "14-day free trial", "Cancel anytime", "SOC 2 certified"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-success" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Live Demo Widget */}
            <div className="relative">
              <div className="bg-card border border-border rounded-sm shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-primary px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-danger animate-pulse" />
                    <span className="text-primary-foreground text-sm font-semibold">VIGISCAM™ — Live Protection</span>
                  </div>
                  <Badge className="bg-success text-success-foreground text-xs">ACTIVE</Badge>
                </div>

                {/* ScamScore gauge */}
                <div className={`mx-5 mt-5 mb-4 p-4 rounded-sm border ${scoreBg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">Unified Scam Threat Score™</span>
                    <span className={`text-3xl font-bold tabular-nums ${scoreColor}`}>{scamScore}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-700 ${scamScore < 40 ? "bg-success" : scamScore < 70 ? "bg-warning" : "bg-danger"}`}
                      style={{ width: `${scamScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Safe</span><span>Suspicious</span><span>Critical</span>
                  </div>
                </div>

                {/* Events */}
                <div className="px-5 pb-4 space-y-2 min-h-[220px]">
                  {events.map((e, i) => (
                    <div key={i} className={`flex items-start gap-2.5 p-2.5 rounded-sm text-xs ${
                      e.type === "success" ? "bg-success/10 border border-success/20" :
                      e.type === "critical" ? "bg-danger/10 border border-danger/20" :
                      e.type === "danger" ? "bg-danger/5 border border-danger/10" :
                      e.type === "warn" ? "bg-warning/10 border border-warning/20" :
                      "bg-muted border border-border"
                    }`}>
                      <span className="font-mono text-muted-foreground shrink-0 mt-0.5">{e.time}</span>
                      <span className={`${e.type === "success" ? "text-success font-semibold" : e.type === "critical" ? "text-danger font-semibold" : e.type === "danger" ? "text-danger" : "text-foreground"}`}>
                        {e.event}
                      </span>
                    </div>
                  ))}
                  {!running && step === 0 && (
                    <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                      Press &quot;Run Simulation&quot; to start the demo
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="px-5 pb-5 flex gap-2 border-t border-border pt-3">
                  <Button size="sm" onClick={startDemo} disabled={running} className="bg-primary text-primary-foreground text-xs gap-1.5">
                    <Zap className="h-3 w-3" />
                    Run Simulation
                  </Button>
                  <Button size="sm" variant="outline" onClick={resetDemo} className="text-xs bg-transparent">Reset</Button>
                  <Link href="/demo" className="ml-auto">
                    <Button size="sm" variant="ghost" className="text-xs text-primary hover:text-primary">
                      Full Demo <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-primary-foreground/70 text-xs uppercase tracking-widest mb-4 font-medium">Protecting</p>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
            {[
              { label: "Families", href: "/solutions/families", icon: <Shield className="h-4 w-4" /> },
              { label: "Seniors", href: "/solutions/individuals", icon: <Shield className="h-4 w-4" /> },
              { label: "Banks", href: "/solutions/banks", icon: <Lock className="h-4 w-4" /> },
              { label: "Fintechs", href: "/solutions/banks", icon: <TrendingUp className="h-4 w-4" /> },
              { label: "Platforms", href: "/solutions/platforms", icon: <Network className="h-4 w-4" /> },
              { label: "Investigators", href: "/solutions/investigators", icon: <Eye className="h-4 w-4" /> },
              { label: "Governments", href: "/solutions/government", icon: <Shield className="h-4 w-4" /> },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-sm p-3 text-center transition-colors"
              >
                <div className="flex justify-center mb-1 text-primary-foreground/70">{item.icon}</div>
                <span className="text-xs font-medium text-primary-foreground">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
