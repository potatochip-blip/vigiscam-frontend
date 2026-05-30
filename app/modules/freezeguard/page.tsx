import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Monitor, CheckCircle, ArrowRight, AlertTriangle, Shield, Eye, Lock, Zap, Ban, Bell, Database } from "lucide-react"

const DETECTION_CAPABILITIES = [
  { 
    capability: "Remote Desktop Tool Detection", 
    desc: "Detects TeamViewer, AnyDesk, LogMeIn, ConnectWise, Chrome Remote Desktop, and other remote access tools being used to control the victim's device." 
  },
  { 
    capability: "Screen-Share Detection", 
    desc: "Identifies when screen sharing is active during calls via Zoom, Teams, Google Meet, or any application exposing the victim's screen to a remote party." 
  },
  { 
    capability: "Remote Cursor Detection", 
    desc: "Monitors for mouse movements and clicks that originate from a remote source rather than the local device." 
  },
  { 
    capability: "Suspicious Browser Session Monitoring", 
    desc: "Watches for banking, crypto, or financial sites being accessed while remote access is active—a critical scam indicator." 
  },
  { 
    capability: "Remote Input Blocking", 
    desc: "Can block remote keyboard and mouse input while preserving local user control to interrupt a takeover in progress." 
  },
  { 
    capability: "Technical Takeover Pattern Recognition", 
    desc: "Uses behavioral analysis to identify patterns consistent with tech support scams, refund scams, and remote-access fraud." 
  },
]

const PROTECTION_FLOW = [
  { 
    step: "01", 
    title: "Remote access detected", 
    desc: "FREEZEGUARD™ identifies that a remote control tool is active on the device or screen sharing is occurring.", 
    icon: Monitor 
  },
  { 
    step: "02", 
    title: "Context analyzed", 
    desc: "SCAMZY™ and A1SCAMSHIELD™ provide context—is this a legitimate IT session or a scam in progress?", 
    icon: Eye 
  },
  { 
    step: "03", 
    title: "Risk scored", 
    desc: "The Unified Scam Threat Score™ integrates remote-access signals with voice analysis, caller verification, and manipulation detection.", 
    icon: AlertTriangle 
  },
  { 
    step: "04", 
    title: "Warning issued", 
    desc: "If risk is moderate, a warning overlay is shown to the user. If critical, FreezeLock™ is triggered immediately.", 
    icon: Bell 
  },
  { 
    step: "05", 
    title: "Remote session blocked", 
    desc: "FREEZEGUARD™ terminates the remote access session, blocks remote input, and stops screen sharing instantly.", 
    icon: Ban 
  },
  { 
    step: "06", 
    title: "Evidence preserved", 
    desc: "All session data, tool identifiers, and remote connection metadata are captured and stored in Evidence Vault™.", 
    icon: Database 
  },
]

const INTEGRATION_POINTS = [
  { 
    module: "A1SCAMSHIELD™", 
    integration: "When scam language is detected during an active remote session, risk escalates rapidly.", 
    color: "border-primary bg-primary/5" 
  },
  { 
    module: "SCAMZY™", 
    integration: "Known scam actor signatures and behavioral patterns inform remote-access risk scoring.", 
    color: "border-accent bg-accent/10" 
  },
  { 
    module: "FreezeLock™", 
    integration: "When FREEZEGUARD™ detects critical risk, it hands off to FreezeLock™ for full intervention.", 
    color: "border-danger bg-danger/5" 
  },
  { 
    module: "Evidence Vault™", 
    integration: "All remote access sessions and interventions are logged with full chain-of-custody.", 
    color: "border-secondary bg-secondary/10" 
  },
]

export default function FreezeGuardModulePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-sm bg-primary-foreground/10 border border-primary-foreground/30 flex items-center justify-center">
                <Monitor className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <Badge className="bg-primary-foreground/20 text-primary-foreground mb-1">Protection Engine</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">FREEZEGUARD™</h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/80 mb-4">Real-Time Screen, Screen-Share & Remote-Access Protection Engine</p>
            <p className="text-primary-foreground/70 text-lg leading-relaxed text-pretty">
              FREEZEGUARD™ is the live remote-access and screen-share protection engine inside VIGISCAM™. When scammers attempt to control a user&apos;s device via TeamViewer, AnyDesk, or any remote desktop tool, FREEZEGUARD™ detects the takeover, blocks remote input, stops screen sharing, and works with FreezeLock™ to interrupt the attack before money or identity is lost.
            </p>
            <div className="flex gap-3 mt-8">
              <Link href="/demo">
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  See FREEZEGUARD™ in Action <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/modules">
                <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  All Modules
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Key Insight */}
        <section className="py-4 bg-primary/10 border-b border-primary/20">
          <div className="container mx-auto px-4 flex items-center justify-center gap-3">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">FREEZEGUARD™ is no longer the platform name—it is the core remote-access protection engine inside VIGISCAM™</span>
          </div>
        </section>

        {/* Where FREEZEGUARD fits */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-secondary text-secondary-foreground mb-4">Platform Architecture</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3">Where FREEZEGUARD™ Fits Inside VIGISCAM™</h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                VIGISCAM™ is the unified anti-scam platform. FREEZEGUARD™ is one of its core engines, specifically responsible for detecting and blocking remote-access takeovers in real time.
              </p>
            </div>
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-sm p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    VIGISCAM™ Platform
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The unified anti-scam platform that detects live scammer language, emotional manipulation, deepfake callers, remote-access abuse, and fraud-network signals.
                  </p>
                  <ul className="space-y-2 text-sm">
                    {["SCAMZY™ — Global Intelligence", "A1SCAMSHIELD™ — Language Detection", "FREEZEGUARD™ — Remote-Access Protection", "FreezeLock™ — Emergency Intervention", "Authenticity Suite — Deepfake Defense", "Evidence Vault™ — Forensic Preservation"].map((m) => (
                      <li key={m} className="flex items-center gap-2 text-foreground">
                        <CheckCircle className="h-4 w-4 text-success shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary" />
                    FREEZEGUARD™ Engine
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The real-time screen, screen-share, and remote-access protection engine that detects when scammers take control and stops them instantly.
                  </p>
                  <ul className="space-y-2 text-sm">
                    {["Remote desktop tool detection", "Screen-share monitoring", "Remote cursor detection", "Banking session protection", "Technical takeover prevention", "Handoff to FreezeLock™"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-foreground">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detection Capabilities */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-primary text-primary-foreground mb-4">Detection Capabilities</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3">What FREEZEGUARD™ Detects</h2>
              <p className="text-muted-foreground">FREEZEGUARD™ monitors for every form of remote device control that scammers use.</p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
              {DETECTION_CAPABILITIES.map((c) => (
                <div key={c.capability} className="bg-card border border-border rounded-sm p-5">
                  <div className="flex items-start gap-3">
                    <Monitor className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{c.capability}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Protection Flow */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-secondary text-secondary-foreground mb-4">Protection Flow</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3">How FREEZEGUARD™ Stops a Remote Takeover</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {PROTECTION_FLOW.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.step} className="bg-card border border-border rounded-sm p-5 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">Step {s.step}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Integration Points */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-accent text-accent-foreground mb-4">System Integration</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3">How FREEZEGUARD™ Works with Other Modules</h2>
            </div>
            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
              {INTEGRATION_POINTS.map((i) => (
                <div key={i.module} className={`border rounded-sm p-5 ${i.color}`}>
                  <h3 className="font-bold text-foreground mb-2">{i.module}</h3>
                  <p className="text-sm text-muted-foreground">{i.integration}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scam Types */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-danger text-danger-foreground mb-4">Scam Types Covered</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3">FREEZEGUARD™ Protects Against</h2>
            </div>
            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Tech Support Scams", desc: "Fake Microsoft, Apple, or antivirus support requesting remote access.", href: "/scam-types/tech-support" },
                { name: "Refund Scams", desc: "Scammers claiming to issue a refund while taking remote control.", href: "/scam-types/tech-support" },
                { name: "Bank Impersonation", desc: "Fraudsters posing as bank fraud departments to access accounts.", href: "/scam-types/bank-impersonation" },
                { name: "Remote Access Trojans", desc: "Malicious tools granting persistent remote control.", href: "/scam-types/remote-access" },
                { name: "Investment Scams", desc: "Scammers accessing trading platforms via screen share.", href: "/scam-types/crypto" },
                { name: "Government Impersonation", desc: "Fake IRS, SSA, or law enforcement demanding remote access.", href: "/scam-types/tech-support" },
              ].map((s) => (
                <Link key={s.name} href={s.href} className="bg-card border border-border rounded-sm p-4 hover:border-primary hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-foreground mb-1">{s.name}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              FREEZEGUARD™ stops remote takeovers before they become financial disasters.
            </h2>
            <p className="text-primary-foreground/70 mb-6 max-w-2xl mx-auto">
              Part of the VIGISCAM™ unified anti-scam platform—working alongside SCAMZY™, A1SCAMSHIELD™, FreezeLock™, and the Authenticity Suite.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/demo">
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Run Demo
                </Button>
              </Link>
              <Link href="/modules/freezelock">
                <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  Next: FreezeLock™ <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
