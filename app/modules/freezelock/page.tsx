import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lock, CheckCircle, ArrowRight, AlertTriangle, Zap } from "lucide-react"

const TRIGGERS = [
  { trigger: "Scam Threat Score™ exceeds 85", action: "Full FreezeLock activation" },
  { trigger: "Remote access tool detected mid-session", action: "Immediate remote session termination" },
  { trigger: "Gift card / crypto payment instruction detected", action: "Warning overlay + guardian alert" },
  { trigger: "Isolation command repeated 3+ times", action: "Trusted contact notified silently" },
  { trigger: "User manually presses emergency button", action: "Instant full lock + all contacts alerted" },
  { trigger: "Bank transfer initiated during active scam session", action: "Guardian Pause (24–72 hour delay)" },
]

const ACTIONS = [
  { action: "Screen freeze", desc: "Device screen locked — no interaction possible during the intervention." },
  { action: "Remote session terminated", desc: "All screen-sharing and remote control sessions instantly closed." },
  { action: "Active call ended", desc: "Voice call terminated to sever scammer contact." },
  { action: "Full-screen warning displayed", desc: "Clear, calm explanation shown to the user with next steps." },
  { action: "Trusted contacts alerted", desc: "SMS + push notification sent immediately to all designated family members." },
  { action: "Evidence snapshot taken", desc: "All session data, phrases, and anomalies captured and encrypted at the moment of activation." },
  { action: "SCAMZY™ network update", desc: "Scammer identifiers contributed to the global intelligence network." },
]

export default function FreezeLocKPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <section className="bg-danger py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-sm bg-danger-foreground/10 border border-danger-foreground/30 flex items-center justify-center"><Lock className="h-8 w-8 text-danger-foreground" /></div>
              <div>
                <Badge className="bg-danger-foreground/20 text-danger-foreground mb-1">Intervention Layer</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-danger-foreground">FreezeLock™</h1>
              </div>
            </div>
            <p className="text-xl text-danger-foreground/80 mb-4">Real-Time Protective Intervention Engine</p>
            <p className="text-danger-foreground/70 text-lg leading-relaxed text-pretty">
              When SCAMZY™ determines that danger is imminent, FreezeLock™ executes a coordinated protective intervention in under 4 seconds—freezing the screen, stopping remote access, terminating the call, alerting trusted contacts, and preserving evidence.
            </p>
            <div className="flex gap-3 mt-8">
              <Link href="/demo"><Button className="bg-danger-foreground text-danger hover:bg-danger-foreground/90">See FreezeLock in Action <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link href="/modules"><Button variant="outline" className="border-danger-foreground text-danger-foreground hover:bg-danger-foreground/10 bg-transparent">All Modules</Button></Link>
            </div>
          </div>
        </section>

        {/* Threat Score Indicator */}
        <section className="py-4 bg-danger/10 border-b border-danger/20">
          <div className="container mx-auto px-4 flex items-center justify-center gap-3">
            <Zap className="h-4 w-4 text-danger" />
            <span className="text-sm font-semibold text-danger">FreezeLock responds in under 4 seconds from threat detection to full intervention</span>
          </div>
        </section>

        {/* Triggers */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-secondary text-secondary-foreground mb-4">Trigger Logic</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3">What Triggers FreezeLock™</h2>
              <p className="text-muted-foreground">FreezeLock activates automatically based on threat score thresholds, or manually by the user or a guardian.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {TRIGGERS.map((t) => (
                <div key={t.trigger} className="bg-card border border-border rounded-sm p-4 grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-warning-foreground mt-0.5 shrink-0" />
                    <div className="text-sm text-foreground font-medium">{t.trigger}</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="h-4 w-4 text-danger mt-0.5 shrink-0" />
                    <div className="text-sm text-danger font-semibold">{t.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-danger text-danger-foreground mb-4">Actions Executed</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3">What FreezeLock™ Does in Under 4 Seconds</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {ACTIONS.map((a, i) => (
                <div key={a.action} className="bg-card border border-border rounded-sm p-4 flex items-start gap-4">
                  <span className="h-7 w-7 rounded-full bg-danger text-danger-foreground text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <div>
                    <div className="font-semibold text-foreground mb-1">{a.action}</div>
                    <p className="text-sm text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {[
                { title: "BankGuard — Guardian Pause", desc: "When FreezeLock detects an active scam during a bank transfer, Guardian Pause delays the transaction by 24–72 hours, surfaces an intervention prompt to the bank teller, and alerts the customer's designated contacts.", badge: "BankGuard" },
                { title: "PlatformShield — Account Intervention", desc: "For online platforms, FreezeLock triggers account moderation, blocks outgoing payments or transfers, and generates a case file for the trust & safety team to review.", badge: "PlatformShield" },
              ].map((e) => (
                <div key={e.title} className="bg-card border border-border rounded-sm p-6">
                  <Badge className="bg-secondary text-secondary-foreground mb-3">{e.badge}</Badge>
                  <h3 className="text-xl font-bold text-foreground mb-3">{e.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-danger">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-danger-foreground mb-4">4 seconds. That is all VIGISCAM™ needs to stop a scam in progress.</h2>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Link href="/demo"><Button className="bg-danger-foreground text-danger hover:bg-danger-foreground/90">Run Demo</Button></Link>
              <Link href="/modules/livefaceseal"><Button variant="outline" className="border-danger-foreground text-danger-foreground hover:bg-danger-foreground/10 bg-transparent">Next: LiveFaceSeal™ <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
