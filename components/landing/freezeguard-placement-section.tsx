import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Lock, Monitor, MousePointer, Globe, AlertTriangle, Zap, ArrowRight, ShieldCheck } from "lucide-react"

const FREEZEGUARD_CAPABILITIES = [
  { icon: Monitor, label: "Screen-share detection", desc: "Identifies when the victim's screen is being shared with a remote party." },
  { icon: MousePointer, label: "Remote cursor control detection", desc: "Detects unauthorized keyboard and mouse activity from an external actor." },
  { icon: Globe, label: "Remote access tool monitoring", desc: "Tracks TeamViewer, AnyDesk, Chrome Remote Desktop, and 30+ other tools." },
  { icon: AlertTriangle, label: "Technical takeover alerts", desc: "Notifies the user, family guardian, and bank in real time." },
  { icon: Lock, label: "FreezeLock™ activation trigger", desc: "When risk threshold is crossed, triggers full screen freeze and session termination." },
  { icon: Zap, label: "4-second response time", desc: "From detection of unauthorized control to full session termination." },
]

export function FreezeGuardPlacementSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — Explanation */}
          <div>
            <Badge className="bg-primary/10 text-primary border-0 mb-4">Where FREEZEGUARD™ Fits Inside VIGISCAM™</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              FREEZEGUARD™ is not the platform. It is the protection engine inside it.
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                VIGISCAM™ is the full platform — the unified system covering every dimension of a modern scam. FREEZEGUARD™ is one of its most powerful core engines, specifically responsible for detecting and stopping remote-access and screen-sharing attacks.
              </p>
              <p>
                When a tech-support scammer convinces a victim to install AnyDesk, FREEZEGUARD™ detects the session the moment it begins. It monitors for remote cursor activity, unauthorized keyboard input, and screen-sharing streams — then triggers FreezeLock™ to terminate the session before the scammer can do damage.
              </p>
              <p>
                FREEZEGUARD™ works alongside A1SCAMSHIELD™, SCAMZY™, and the Authenticity Verification Suite — feeding its session signals into the unified Scam Threat Score™ that drives the full platform response.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/modules/freezeguard">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Explore FREEZEGUARD™ <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/platform">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                  Full Platform Overview
                </Button>
              </Link>
            </div>
          </div>

          {/* Right — Capabilities */}
          <div>
            <div className="bg-card border-2 border-border rounded-sm overflow-hidden">
              <div className="bg-primary px-5 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
                  <Lock className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground font-bold text-sm">FREEZEGUARD™</p>
                  <p className="text-primary-foreground/70 text-xs">Remote-Access Protection Engine inside VIGISCAM™</p>
                </div>
                <Badge className="ml-auto bg-green-500 text-white text-xs">ACTIVE</Badge>
              </div>

              <div className="divide-y divide-border">
                {FREEZEGUARD_CAPABILITIES.map((cap, i) => {
                  const Icon = cap.icon
                  return (
                    <div key={i} className="px-5 py-3.5 flex items-start gap-3">
                      <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{cap.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{cap.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="px-5 py-4 bg-muted/40 border-t border-border flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span className="text-xs text-muted-foreground font-medium">
                  Part of VIGISCAM™ — works with A1SCAMSHIELD™, SCAMZY™, FreezeLock™ and Evidence Vault™
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
