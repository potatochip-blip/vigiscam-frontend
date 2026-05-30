import Link from "next/link"
import { Mic, AlertTriangle, Eye, TrendingUp, Lock, Database, Network, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const steps = [
  {
    icon: Mic,
    step: "01",
    title: "Live scam signals detected",
    description: "A call or remote session begins. A1SCAMSHIELD™ listens for manipulation: urgency pressure, secrecy commands, fake authority language, payment instructions.",
    module: "A1SCAMSHIELD™",
  },
  {
    icon: Eye,
    step: "02",
    title: "Caller authenticity checked",
    description: "LiveFaceSeal™, VoiceMatchSeal™, SceneSeal™, and CamViguard™ verify whether the caller's face, voice, background, and camera feed are genuine or AI-generated.",
    module: "Authenticity Suite",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Scam journey understood",
    description: "SCAMZY™ identifies the fraud journey stage, victim emotional state (VictimState AI™), and scammer behavior pattern. Unified Scam Threat Score™ rises.",
    module: "SCAMZY™",
  },
  {
    icon: Lock,
    step: "04",
    title: "VIGISCAM™ intervenes",
    description: "When the threat score crosses critical thresholds, FREEZEGUARD™ detects the remote-access threat and FreezeLock™ activates: screen frozen, remote session terminated, call ended, trusted contacts alerted instantly.",
    module: "FREEZEGUARD™ + FreezeLock™",
  },
  {
    icon: Database,
    step: "05",
    title: "Evidence preserved",
    description: "Every scam phrase, remote session event, caller anomaly, and intervention action is encrypted and stored in Evidence Vault™ with full chain-of-custody for law enforcement.",
    module: "Evidence Vault™",
  },
  {
    icon: Network,
    step: "06",
    title: "Network exposed",
    description: "SCAMZY™ links the incident to the wider scam network—connecting wallets, phone numbers, domains, script families, and actor aliases across all prior cases.",
    module: "SCAMZY™",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <Badge className="bg-primary text-primary-foreground mb-4">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            From First Word to Full Network Exposure
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            VIGISCAM™ acts across the entire scam lifecycle—detecting signals, verifying callers, intervening in real time, preserving evidence, and linking the criminal network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-card border border-border rounded-sm p-6 relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-mono text-muted-foreground">Step {step.step}</span>
                  <Badge className="ml-2 text-xs bg-secondary text-secondary-foreground">{step.module}</Badge>
                </div>
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/how-it-works">
            <span className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              See the full detailed breakdown <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
