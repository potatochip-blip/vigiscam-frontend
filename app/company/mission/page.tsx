import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import {
  Shield, Eye, Network, Lock, AlertTriangle, Heart, Globe,
  ArrowRight, CheckCircle, Target, Zap, Users
} from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Protection Before Harm",
    description:
      "Every feature in VIGISCAM™ is designed to intervene before a victim transfers money, grants access, or loses trust. We act in the moment—not after the damage.",
  },
  {
    icon: Eye,
    title: "Transparency Without Surveillance",
    description:
      "We protect people, not profile them. Our AI operates on behavioral signals, not stored personal data. Consent is the foundation of every monitoring capability.",
  },
  {
    icon: Heart,
    title: "Dignity for Every Victim",
    description:
      "Scam victims are not foolish—they are targeted. VIGISCAM™ is built around this truth. Our systems protect without judgment and preserve evidence without shame.",
  },
  {
    icon: Network,
    title: "Disrupt the Network, Not Just the Call",
    description:
      "Blocking one call helps one person. Exposing the network behind it protects millions. SCAMZY™ maps every thread so investigators, banks, and agencies can act at scale.",
  },
  {
    icon: Globe,
    title: "Universal Access",
    description:
      "A grandmother in rural Ohio and a bank fraud analyst in London both deserve the same level of AI protection. VIGISCAM™ scales from personal device to national agency.",
  },
  {
    icon: Lock,
    title: "Ethical AI, Always",
    description:
      "We do not fabricate evidence, impersonate anyone, or generate content about real individuals. Every detection is grounded in verified signals, not AI hallucination.",
  },
]

const milestones = [
  {
    year: "2021",
    event: "VIGISCAM™ founded after a family member of our CEO nearly lost $80,000 to a tech-support scammer using remote access.",
  },
  {
    year: "2022",
    event: "First version of FREEZEGUARD™ deployed — detecting and freezing remote-access sessions in real time.",
  },
  {
    year: "2023",
    event: "A1SCAMSHIELD™ launched — live scam phrase detection across calls, chats, and screen text.",
  },
  {
    year: "2023",
    event: "SCAMZY™ goes live — the first AI system to link individual scam events to global fraud networks.",
  },
  {
    year: "2024",
    event: "BankGuard™ and PlatformShield™ portals launched, serving financial institutions and online platforms.",
  },
  {
    year: "2024",
    event: "Evidence Vault™ and Investigator Console deployed for law enforcement and cyber crime units.",
  },
  {
    year: "2025",
    event: "LiveFaceSeal™, VoiceMatchSeal™, and the full Authenticity Verification Suite released.",
  },
  {
    year: "2026",
    event: "VIGISCAM™ now protects individuals, families, banks, platforms, investigators, and government agencies across 38 countries.",
  },
]

export default function MissionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge className="bg-accent text-accent-foreground mb-6">Our Mission</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance leading-tight">
              Scams end lives without ending lives.
            </h1>
            <p className="text-xl text-primary-foreground/80 text-pretty max-w-3xl mx-auto leading-relaxed">
              They destroy savings, break families, and silence victims with shame. VIGISCAM™ exists because no existing technology was built to stop the human manipulation at the center of every scam — before the harm is done.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <Badge className="bg-primary/10 text-primary border-0 mb-4">Why We Exist</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-6 text-balance">
                  The world&apos;s first unified anti-scam platform — built to detect, protect, verify, and expose.
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Before VIGISCAM™, fraud detection meant flagging suspicious transactions — after money was already gone. Banks saw numbers. Regulators saw reports. Families saw nothing until it was too late.
                  </p>
                  <p>
                    VIGISCAM™ changes the intervention point. We detect the scammer&apos;s language while the call is live. We verify the caller&apos;s identity before a victim believes them. We freeze remote sessions before a screen is controlled. We map the criminal network before the next victim is found.
                  </p>
                  <p>
                    Our mission is to move the protection line from <strong className="text-foreground">after the loss</strong> to <strong className="text-foreground">before the obedience</strong>.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: AlertTriangle, label: "The problem we solve", value: "$10B+ lost to scams globally every year — with most victims never reporting." },
                  { icon: Target, label: "Our intervention point", value: "During the live conversation — before the victim acts, not after." },
                  { icon: Zap, label: "What makes us different", value: "We detect human manipulation, not just transactions or malware." },
                  { icon: Users, label: "Who we protect", value: "Individuals, families, banks, platforms, investigators, and governments." },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <Card key={i} className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-1">{item.label}</p>
                        <p className="text-sm text-foreground leading-relaxed">{item.value}</p>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <Badge className="bg-secondary text-secondary-foreground mb-4">Our Values</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">What we believe</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                These are not marketing statements. They are the principles that determine what we build, how we build it, and what we refuse to do.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, i) => {
                const Icon = value.icon
                return (
                  <Card key={i} className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-14">
              <Badge className="bg-primary/10 text-primary border-0 mb-4">Our Journey</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">From one close call to a global platform</h2>
            </div>
            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-px bg-border hidden sm:block" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="w-14 text-right flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{m.year}</span>
                    </div>
                    <div className="relative flex items-start gap-4">
                      <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow mt-1 flex-shrink-0 relative z-10" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4 text-balance">
              Every second VIGISCAM™ is active, someone is safer.
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 text-pretty">
              Join the platform built to stop scams at their source — not report on them after the damage is done.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/select-account-type">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8">
                  Start Protection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/company/about">
                <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  Meet the Team
                </Button>
              </Link>
              <Link href="/company/contact">
                <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/50 text-primary-foreground/80 hover:bg-primary-foreground/10 bg-transparent">
                  Contact Us
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
