import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mic, Eye, TrendingUp, Lock, Database, Network, ArrowRight, CheckCircle } from "lucide-react"

const STEPS = [
  {
    step: "01",
    icon: <Mic className="h-7 w-7" />,
    title: "A call or remote session begins",
    module: "A1SCAMSHIELD™",
    consumer: "VIGISCAM™ activates silently the moment a call connects or screen sharing is detected. The user sees nothing except a small status indicator.",
    enterprise: "For banks, the moment a customer initiates a high-risk transaction or enters a teller interaction, BankGuard begins monitoring the session context.",
    detections: ["Call source identified", "Remote access tool presence detected", "Session recording initialized (encrypted)"],
  },
  {
    step: "02",
    icon: <Mic className="h-7 w-7" />,
    title: "A1SCAMSHIELD™ listens for manipulation",
    module: "A1SCAMSHIELD™",
    consumer: "Real-time NLP scans every spoken word for scam phrases, urgency escalation, secrecy commands, fake authority language, and payment pressure patterns.",
    enterprise: "PlatformShield applies A1SCAMSHIELD™ to written messages, flagging grooming progressions, recovery-scam language, and financial transition signals.",
    detections: ["Urgency phrase: 'Your account will be closed'", "Secrecy command: 'Don't tell your family'", "Authority claim: 'I'm calling from Microsoft'"],
  },
  {
    step: "03",
    icon: <Eye className="h-7 w-7" />,
    title: "Authenticity Suite checks the caller",
    module: "Authenticity Suite",
    consumer: "LiveFaceSeal™ checks the video feed for deepfake artifacts. VoiceMatchSeal™ compares voice patterns. SceneSeal™ detects virtual backgrounds hiding real locations.",
    enterprise: "For investigators, the Authenticity Suite output is stored as timestamped evidence with confidence scores for each verification check.",
    detections: ["Face: No deepfake artifacts detected", "Voice: Mismatch with claimed identity (73% confidence)", "Scene: Virtual background detected — real location concealed"],
  },
  {
    step: "04",
    icon: <TrendingUp className="h-7 w-7" />,
    title: "SCAMZY™ identifies the scam journey",
    module: "SCAMZY™",
    consumer: "SCAMZY™ compares the current session against 4.2M known scam actor profiles, script families, and fraud journey templates. The Unified Scam Threat Score™ updates in real time.",
    enterprise: "The fraud journey stage is surfaced to bank tellers, platform moderators, or investigators with recommended intervention scripts.",
    detections: ["Script family: 'Tech Support → Remote Access → Gift Card'", "Journey stage: Stage 3 — Victim Control", "VictimState: Fearful, compliant, isolated"],
  },
  {
    step: "05",
    icon: <Lock className="h-7 w-7" />,
    title: "FreezeLock™ intervenes",
    module: "FreezeLock™",
    consumer: "When the Scam Threat Score crosses critical threshold, FreezeLock™ executes: screen frozen, remote session terminated, call ended. A full-screen warning appears for the user.",
    enterprise: "For banks, Guardian Pause delays the wire transfer by 24–72 hours and surfaces a teller intervention prompt with recommended script. For platforms, the account enters moderation.",
    detections: ["Screen frozen — remote control blocked", "Call terminated", "Trusted contact alerted via SMS + app push", "Emergency intervention logged"],
  },
  {
    step: "06",
    icon: <Database className="h-7 w-7" />,
    title: "Evidence Vault™ preserves the case",
    module: "Evidence Vault™",
    consumer: "Every scam phrase detected, remote session event, caller anomaly, intervention action, and timestamp is encrypted and stored in Evidence Vault™ with full chain-of-custody.",
    enterprise: "Evidence packages can be exported in law enforcement, bank compliance, or family review formats. Tamper-evident logs are cryptographically signed.",
    detections: ["23 scam phrases captured", "Session recording encrypted (AES-256)", "Caller identity evidence package generated", "Export ready: Law Enforcement, Family, Bank Compliance"],
  },
  {
    step: "07",
    icon: <Network className="h-7 w-7" />,
    title: "SCAMZY™ links the wider network",
    module: "SCAMZY™ Intelligence",
    consumer: "After the incident, SCAMZY™ links the phone number, script pattern, and payment instructions to the global scam intelligence database—helping protect others from the same actor.",
    enterprise: "Investigators receive an actor-linking report showing all other cases connected to the same script family, wallet cluster, or domain set.",
    detections: ["Phone linked to 47 prior reports", "Script family traced to known West African fraud ring", "2 connected wallets flagged", "Network cluster updated — 12 new actor links"],
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge className="bg-accent text-accent-foreground mb-4">How It Works</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
              From First Signal to Full Network Exposure
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed text-pretty">
              VIGISCAM™ acts across the entire scam lifecycle in real time. Here is exactly how each step works—for consumers, enterprises, and investigators.
            </p>
          </div>
        </section>

        {/* Version Toggle Info */}
        <div className="bg-secondary py-4 border-b border-border">
          <div className="container mx-auto px-4 flex items-center justify-center gap-8 text-sm text-secondary-foreground">
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-primary inline-block" /> Consumer / Family view</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-accent inline-block" /> Enterprise / Bank / Platform view</span>
          </div>
        </div>

        {/* Steps */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="space-y-8">
              {STEPS.map((s, i) => (
                <div key={s.step} className="bg-card border border-border rounded-sm overflow-hidden">
                  <div className="bg-muted px-6 py-4 flex items-center gap-4 border-b border-border">
                    <span className="text-2xl font-bold font-mono text-primary/30">{s.step}</span>
                    <div className="h-10 w-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary shrink-0">{s.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg">{s.title}</h3>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground text-xs shrink-0">{s.module}</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="p-6 border-r border-border">
                      <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Consumer / Family</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.consumer}</p>
                    </div>
                    <div className="p-6 bg-accent/5">
                      <div className="text-xs font-semibold text-accent-foreground uppercase tracking-wider mb-3">Enterprise / Investigator</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.enterprise}</p>
                    </div>
                  </div>
                  <div className="bg-muted/40 px-6 py-4 border-t border-border">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Detection outputs at this step</div>
                    <div className="flex flex-wrap gap-2">
                      {s.detections.map((d) => (
                        <span key={d} className="inline-flex items-center gap-1.5 text-xs bg-card border border-border rounded-sm px-3 py-1">
                          <CheckCircle className="h-3 w-3 text-success" />{d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-6">See it in action with a live simulation</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/demo"><Button className="bg-accent text-accent-foreground hover:bg-accent/90">Run Interactive Demo <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link href="/modules"><Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">Explore All Modules</Button></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
