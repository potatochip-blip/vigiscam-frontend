import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Globe, Lock, Video, Mic, Camera, Eye, Shield, Database, Key, Hash, Monitor } from "lucide-react"

const MODULES = [
  {
    icon: <Brain className="h-8 w-8" />,
    name: "A1SCAMSHIELD™",
    tagline: "Live Scam Language & Manipulation Detection Engine",
    desc: "Listens for scam phrases, pressure tactics, secrecy commands, fake authority language, romance grooming, and payment instructions in real time. The first line of detection.",
    href: "/modules/a1scamshield",
    category: "Detection",
    badge: "Core Module",
    color: "border-primary bg-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    name: "SCAMZY™",
    tagline: "Global Scam Intelligence & Fraud-Network Disruption Core",
    desc: "Studies scammer language, fraud journeys, victim-state patterns, criminal infrastructure, actor linkages, wallets, domains, scripts, and cross-case behavior to reveal the network behind every scam.",
    href: "/modules/scamzy",
    category: "Intelligence",
    badge: "Core Module",
    color: "border-accent bg-accent/10",
    iconColor: "text-accent-foreground",
  },
  {
    icon: <Monitor className="h-8 w-8" />,
    name: "FREEZEGUARD™",
    tagline: "Real-Time Screen, Screen-Share & Remote-Access Protection Engine",
    desc: "Detects when scammers attempt to control a user's device via remote desktop tools, screen sharing, or TeamViewer-style applications—then blocks remote input, stops screen sharing, and triggers FreezeLock™ intervention before money or identity is lost.",
    href: "/modules/freezeguard",
    category: "Protection",
    badge: "Core Module",
    color: "border-primary bg-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: <Lock className="h-8 w-8" />,
    name: "FreezeLock™",
    tagline: "Emergency Session Freeze & Protective Intervention Layer",
    desc: "Activates when danger becomes critical—freezing the screen, stopping screen sharing, terminating remote access, ending the call, alerting trusted contacts, and preserving evidence.",
    href: "/modules/freezelock",
    category: "Intervention",
    badge: "Core Module",
    color: "border-danger bg-danger/5",
    iconColor: "text-danger",
  },
  {
    icon: <Video className="h-8 w-8" />,
    name: "LiveFaceSeal™",
    tagline: "Deepfake Face Detection & Caller Identity Verification",
    desc: "Analyzes live video streams frame-by-frame for deepfake artifacts, facial inconsistencies, animation anomalies, and identity mismatches. Runs silently during any video call.",
    href: "/modules/livefaceseal",
    category: "Authenticity",
    badge: "Auth Suite",
    color: "border-warning bg-warning/10",
    iconColor: "text-warning-foreground",
  },
  {
    icon: <Mic className="h-8 w-8" />,
    name: "VoiceMatchSeal™",
    tagline: "Voice Clone Detection & Biometric Verification",
    desc: "Detects AI-generated and cloned voices by analyzing pitch variance, breath patterns, neural synthesis artifacts, and biometric signatures against claimed identity.",
    href: "/modules/voicematchseal",
    category: "Authenticity",
    badge: "Auth Suite",
    color: "border-warning bg-warning/10",
    iconColor: "text-warning-foreground",
  },
  {
    icon: <Camera className="h-8 w-8" />,
    name: "SceneSeal™",
    tagline: "Background Scene & Environment Verification",
    desc: "Verifies whether a caller's background scene is genuine or a virtual replacement used to conceal the scammer's true location and identity.",
    href: "/modules/sceneseal",
    category: "Authenticity",
    badge: "Auth Suite",
    color: "border-warning bg-warning/10",
    iconColor: "text-warning-foreground",
  },
  {
    icon: <Eye className="h-8 w-8" />,
    name: "CamViguard™",
    tagline: "Camera Feed Integrity & Injection Detection",
    desc: "Monitors whether a webcam feed is being injected with pre-recorded or AI-generated video content, detecting virtual camera drivers and feed manipulation in real time.",
    href: "/modules/camviguard",
    category: "Authenticity",
    badge: "Auth Suite",
    color: "border-warning bg-warning/10",
    iconColor: "text-warning-foreground",
  },
  {
    icon: <Key className="h-8 w-8" />,
    name: "DualAuth Challenge Generator™",
    tagline: "Real-Time Identity Challenge System",
    desc: "Generates live, unpredictable challenges (micro-expressions, random phrases, environmental prompts) that a deepfake AI cannot respond to, definitively verifying human presence.",
    href: "/modules/dual-auth",
    category: "Authenticity",
    badge: "Auth Suite",
    color: "border-warning bg-warning/10",
    iconColor: "text-warning-foreground",
  },
  {
    icon: <Hash className="h-8 w-8" />,
    name: "Anti-Fake Video Hash Tracker™",
    tagline: "Known Deepfake Video Fingerprinting & Matching",
    desc: "Maintains a database of known deepfake video hashes. Incoming video streams are fingerprinted and compared against this database to detect reuse of known synthetic content.",
    href: "/modules/fake-video-hash-tracker",
    category: "Authenticity",
    badge: "Auth Suite",
    color: "border-warning bg-warning/10",
    iconColor: "text-warning-foreground",
  },
  {
    icon: <Database className="h-8 w-8" />,
    name: "Evidence Vault™",
    tagline: "Encrypted Case Preservation & Chain-of-Custody Engine",
    desc: "Captures every scam phrase, session event, caller anomaly, and intervention action with military-grade encryption, tamper-evident logging, and export tools for families, banks, and law enforcement.",
    href: "/modules/evidence-vault",
    category: "Forensics",
    badge: "Core Module",
    color: "border-primary bg-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    name: "Family Guardian",
    tagline: "Consent-Based Family Protection Hub",
    desc: "Gives family members a dashboard to monitor loved ones, receive real-time alerts, review evidence summaries, manage consent settings, and send check-ins.",
    href: "/solutions/families",
    category: "Consumer",
    badge: "Solution",
    color: "border-success bg-success/5",
    iconColor: "text-success",
  },
]

const CATEGORIES = ["All", "Detection", "Intelligence", "Intervention", "Authenticity", "Forensics", "Consumer"]

export default function ModulesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge className="bg-accent text-accent-foreground mb-4">Platform Modules</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
              Every Module. One Unified System.
            </h1>
            <p className="text-xl text-primary-foreground/80 text-pretty leading-relaxed">
              VIGISCAM™ is built from specialized modules that each target a different attack surface of a modern scam—all working together as a single, coordinated defense.
            </p>
          </div>
        </section>

        <section className="py-6 bg-secondary border-b border-border">
          <div className="container mx-auto px-4 flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((c) => (
              <Badge key={c} className="bg-secondary-foreground/10 text-secondary-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer px-4 py-1.5 text-sm transition-colors">
                {c}
              </Badge>
            ))}
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULES.map((m) => (
                <Link key={m.name} href={m.href} className={`group border rounded-sm p-6 hover:shadow-md transition-all ${m.color}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={m.iconColor}>{m.icon}</div>
                    <div className="flex gap-2">
                      <Badge className="bg-secondary text-secondary-foreground text-xs">{m.category}</Badge>
                      <Badge className="bg-primary/10 text-primary text-xs">{m.badge}</Badge>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{m.name}</h3>
                  <p className="text-xs font-medium text-muted-foreground mb-3 italic">{m.tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  <span className="text-primary text-xs font-medium mt-4 inline-flex items-center gap-1">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">See all modules working together</h2>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Link href="/demo"><Badge className="bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-accent/90 transition-colors">Run Live Demo</Badge></Link>
              <Link href="/platform"><Badge className="bg-primary-foreground/10 text-primary-foreground px-6 py-3 text-sm cursor-pointer hover:bg-primary-foreground/20 transition-colors">Platform Overview</Badge></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
