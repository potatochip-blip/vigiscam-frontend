import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Database, Lock, FileText, Download, Share2, Clock, Shield,
  CheckCircle, ArrowRight, Users, Search, Layers, Eye, Hash
} from "lucide-react"

const CAPTURED_ITEMS = [
  { icon: FileText, label: "Full call transcripts", desc: "Verbatim scammer scripts with flagged phrases highlighted" },
  { icon: Eye, label: "Screen & remote session recordings", desc: "Timestamped captures of every remote-access event" },
  { icon: Hash, label: "Scammer identifiers", desc: "Phone numbers, IPs, wallet addresses, domains, device fingerprints" },
  { icon: Clock, label: "Fraud journey timeline", desc: "Stage-by-stage map of how the scam progressed" },
  { icon: Layers, label: "VictimState AI™ log", desc: "Emotional-state progression during the interaction" },
  { icon: Shield, label: "A1SCAMSHIELD™ phrase log", desc: "All detected manipulation phrases with severity scores" },
  { icon: Database, label: "SCAMZY™ network link", desc: "Association to known scam actors, clusters, and campaigns" },
  { icon: Lock, label: "Encryption certificate", desc: "Cryptographic hash and chain-of-custody document for court use" },
]

const EXPORT_TARGETS = [
  {
    icon: Search,
    title: "Law Enforcement",
    desc: "Court-admissible takedown packet with chain of custody, encrypted evidence, and actor identifiers ready for a subpoena.",
    badge: "Takedown Packet",
  },
  {
    icon: Users,
    title: "Financial Institutions",
    desc: "Fraud report export in bank-compliant format for dispute resolution, SAR filing, or Guardian Pause documentation.",
    badge: "Bank Export",
  },
  {
    icon: FileText,
    title: "Family Guardians",
    desc: "Plain-language summary of what happened, what was detected, and what actions VIGISCAM™ took — readable by any family member.",
    badge: "Family Summary",
  },
  {
    icon: Shield,
    title: "Insurance Claims",
    desc: "Timestamped, encrypted incident report suitable for submission to insurance carriers as documentation of scam-related loss.",
    badge: "Insurance Report",
  },
]

const CHAIN_STEPS = [
  { step: "01", label: "Detection", desc: "VIGISCAM™ detects a scam event and begins continuous evidence capture." },
  { step: "02", label: "Timestamping", desc: "Every captured item is cryptographically timestamped at the moment of collection." },
  { step: "03", label: "Encryption", desc: "AES-256 encryption applied immediately — only the case owner and authorized parties can decrypt." },
  { step: "04", label: "Hash Generation", desc: "A tamper-evident hash is generated. Any modification to the evidence is immediately detectable." },
  { step: "05", label: "Custody Log", desc: "Every access event is logged — who viewed, exported, or shared the evidence and when." },
  { step: "06", label: "Export & Delivery", desc: "Packaged as a secure, verifiable export for law enforcement, banks, or personal records." },
]

export default function EvidenceVaultModulePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">

        {/* Hero */}
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-start gap-5 mb-8">
              <div className="h-14 w-14 rounded-sm bg-accent flex items-center justify-center flex-shrink-0">
                <Database className="h-8 w-8 text-accent-foreground" />
              </div>
              <div>
                <Badge className="bg-accent text-accent-foreground mb-2">Protection Module</Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-balance">
                  Evidence Vault™
                </h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/80 mb-3 max-w-3xl font-medium">
              Tamper-Evident Scam Evidence &amp; Case Preservation Layer
            </p>
            <p className="text-primary-foreground/70 text-lg leading-relaxed text-pretty max-w-3xl mb-8">
              Evidence Vault™ automatically captures, encrypts, and chain-of-custody-seals every piece of evidence from a scam event — from the first manipulative phrase to the final remote-access termination — making it legally useful the moment it is needed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/demo">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  See Evidence Vault in Action <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/modules">
                <Button variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  All Modules
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Key Principle Bar */}
        <section className="py-4 bg-secondary border-b border-border">
          <div className="container mx-auto px-4 flex items-center justify-center gap-3">
            <Lock className="h-4 w-4 text-secondary-foreground" />
            <span className="text-sm font-semibold text-secondary-foreground">
              Every item captured by Evidence Vault™ is cryptographically sealed and court-admissible from the moment of detection.
            </span>
          </div>
        </section>

        {/* What It Captures */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <Badge className="bg-primary/10 text-primary border-0 mb-4">Automatic Capture</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
                Everything captured. Nothing lost.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Evidence Vault™ operates silently in the background. From the moment a scam signal is detected, it begins building a complete, encrypted record — no user action required.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CAPTURED_ITEMS.map((item, i) => {
                const Icon = item.icon
                return (
                  <Card key={i} className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{item.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Chain of Custody */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <Badge className="bg-secondary text-secondary-foreground mb-4">Chain of Custody</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
                Court-ready from capture to export
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Every step in the evidence lifecycle is cryptographically logged. Tampering is impossible to hide — and the chain of custody is always verifiable.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CHAIN_STEPS.map((s, i) => (
                <Card key={i} className="p-5 flex items-start gap-4">
                  <span className="text-2xl font-bold text-primary/30 flex-shrink-0 font-mono">{s.step}</span>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{s.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Export Targets */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <Badge className="bg-primary/10 text-primary border-0 mb-4">Export &amp; Delivery</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
                The right format for every recipient
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Evidence Vault™ packages evidence differently depending on who needs it — law enforcement, banks, families, or insurers each receive what they can actually use.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {EXPORT_TARGETS.map((t, i) => {
                const Icon = t.icon
                return (
                  <Card key={i} className="p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground">{t.title}</h3>
                        <Badge className="bg-secondary text-secondary-foreground text-xs">{t.badge}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Where It Fits */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <Badge className="bg-secondary text-secondary-foreground mb-4">Inside VIGISCAM™</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
                Evidence Vault™ is the final layer of every scam event
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { module: "A1SCAMSHIELD™", contribution: "Phrase logs, scam script matches, ScamScore™ readings" },
                { module: "SCAMZY™", contribution: "Network attribution, actor linkage, fraud journey stage" },
                { module: "FREEZEGUARD™", contribution: "Remote session logs, screen-share events, access attempts" },
                { module: "FreezeLock™", contribution: "Intervention timestamp, actions taken, call termination records" },
                { module: "Authenticity Suite", contribution: "Face, voice, scene verification results — real or AI-generated" },
                { module: "VictimState AI™", contribution: "Emotional vulnerability trajectory during the scam event" },
              ].map((item, i) => (
                <Card key={i} className="p-4 flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-primary mb-0.5">{item.module}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.contribution}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Database className="h-12 w-12 text-accent mx-auto mb-5" />
            <h2 className="text-3xl font-bold text-primary-foreground mb-4 text-balance">
              Evidence that holds up — automatically, every time.
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 text-pretty">
              VIGISCAM™ builds your case from the first scam signal to the final export — without you having to remember to press record.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/select-account-type">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8">
                  Start Protection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/evidence-vault">
                <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  View Evidence Vault Portal
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
