import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Brain, Lock, Eye, Globe, Database, ArrowRight } from "lucide-react"

const BODIES = [
  {
    number: "01",
    icon: Brain,
    system: "A1SCAMSHIELD™",
    title: "The Manipulation",
    description:
      "Every scam starts with language. Urgency commands, fake authority, isolation pressure, payment triggers. A1SCAMSHIELD™ detects every phrase the scammer uses while the conversation is still happening.",
    href: "/modules/a1scamshield",
    color: "text-primary",
    bg: "bg-primary/5 border-primary/15",
    iconBg: "bg-primary/10",
  },
  {
    number: "02",
    icon: Eye,
    system: "Authenticity Suite",
    title: "The Deception",
    description:
      "Deepfake callers. Cloned voices. AI-generated faces. Fake backgrounds. LiveFaceSeal™, VoiceMatchSeal™, SceneSeal™, and CamViguard™ verify whether what the victim sees and hears is real.",
    href: "/modules/livefaceseal",
    color: "text-warning-foreground",
    bg: "bg-warning/5 border-warning/15",
    iconBg: "bg-warning/10",
  },
  {
    number: "03",
    icon: Lock,
    system: "FREEZEGUARD™ + FreezeLock™",
    title: "The Takeover",
    description:
      "Remote access tools are the hands of the scammer inside the victim's device. FREEZEGUARD™ detects the session the moment it begins. FreezeLock™ terminates it, freezes the screen, and alerts everyone who matters.",
    href: "/modules/freezeguard",
    color: "text-danger",
    bg: "bg-danger/5 border-danger/15",
    iconBg: "bg-danger/10",
  },
  {
    number: "04",
    icon: Globe,
    system: "SCAMZY™",
    title: "The Network",
    description:
      "No scam is isolated. Behind every tech-support call is a call center. Behind every romance profile is a script family. SCAMZY™ maps the fraud journey, links the actors, and exposes the criminal infrastructure.",
    href: "/modules/scamzy",
    color: "text-accent-foreground",
    bg: "bg-accent/10 border-accent/20",
    iconBg: "bg-accent/15",
  },
  {
    number: "05",
    icon: Database,
    system: "Evidence Vault™",
    title: "The Proof",
    description:
      "A scam that is stopped but not documented will be repeated. Evidence Vault™ captures, encrypts, and chain-of-custody-seals everything — ready for law enforcement, banks, families, or insurers.",
    href: "/modules/evidence-vault",
    color: "text-muted-foreground",
    bg: "bg-muted border-border",
    iconBg: "bg-secondary",
  },
]

export function FiveBodiesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <Badge className="bg-secondary text-secondary-foreground mb-4">The Five Bodies of a Scam</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            A scam is not one event. It is five.
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Every scam has a manipulation layer, a deception layer, a takeover layer, a network layer, and a proof layer. VIGISCAM™ is the only platform built to address all five — in real time.
          </p>
        </div>

        <div className="space-y-4">
          {BODIES.map((body) => {
            const Icon = body.icon
            return (
              <Link
                key={body.number}
                href={body.href}
                className={`group flex items-start gap-5 p-6 rounded-sm border transition-all hover:shadow-md ${body.bg}`}
              >
                <span className="text-3xl font-bold text-foreground/15 font-mono flex-shrink-0 mt-1 w-10">
                  {body.number}
                </span>
                <div className={`w-12 h-12 rounded-lg ${body.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${body.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-bold text-foreground text-lg">{body.title}</h3>
                    <Badge className="bg-background/60 text-foreground/70 border border-border text-xs">
                      {body.system}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{body.description}</p>
                </div>
                <ArrowRight className={`h-5 w-5 ${body.color} flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity`} />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
