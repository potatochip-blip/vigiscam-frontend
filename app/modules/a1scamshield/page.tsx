import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, CheckCircle, ArrowRight, AlertTriangle } from "lucide-react"

const DETECTIONS = [
  { phrase: "Your computer is infected with a virus", type: "Tech Support", score: 94 },
  { phrase: "You must not tell your family about this", type: "Isolation Command", score: 98 },
  { phrase: "I'm calling from Microsoft Support", type: "Authority Impersonation", score: 87 },
  { phrase: "Act now or your account will be permanently closed", type: "Urgency Pressure", score: 92 },
  { phrase: "We need you to purchase gift cards to protect your money", type: "Payment Diversion", score: 99 },
  { phrase: "Your bank has flagged suspicious activity on your account", type: "Bank Impersonation", score: 89 },
]

const CAPABILITIES = [
  "Real-time NLP phrase detection across 40+ scam categories",
  "Urgency and pressure escalation tracking over call duration",
  "Secrecy and isolation command recognition",
  "Fake authority and impersonation language patterns",
  "Romance grooming progression detection",
  "Recovery scam promise pattern matching",
  "Payment instruction detection (gift card, crypto, wire)",
  "Scammer Emotion Fingerprint™ analysis",
  "Multi-language scam phrase library (38 languages)",
  "Continuous learning from Global Scam Behavior Corpus™",
]

export default function A1ScamShieldPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-sm bg-accent flex items-center justify-center"><Brain className="h-8 w-8 text-accent-foreground" /></div>
              <div>
                <Badge className="bg-accent text-accent-foreground mb-1">Detection Layer</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">A1SCAMSHIELD™</h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/80 mb-4 leading-relaxed">Live Scam Language & Manipulation Detection Engine</p>
            <p className="text-primary-foreground/70 text-lg text-pretty leading-relaxed">
              A1SCAMSHIELD™ listens for scam phrases, pressure, secrecy, isolation commands, fake authority language, romance grooming, recovery-scam promises, and payment instructions in real time—while the conversation is still unfolding.
            </p>
            <div className="flex gap-3 mt-8">
              <Link href="/demo"><Button className="bg-accent text-accent-foreground hover:bg-accent/90">See Live Demo <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link href="/modules"><Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">All Modules</Button></Link>
            </div>
          </div>
        </section>

        {/* Live detection demo */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-secondary text-secondary-foreground mb-4">Sample Detections</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3">Real Scam Phrases — Detected Instantly</h2>
              <p className="text-muted-foreground">These are actual scam phrases from the Global Scam Behavior Corpus™ that A1SCAMSHIELD™ detects in real time.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {DETECTIONS.map((d) => (
                <div key={d.phrase} className="bg-card border border-border rounded-sm p-4 flex items-center gap-4">
                  <AlertTriangle className="h-5 w-5 text-danger shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">&ldquo;{d.phrase}&rdquo;</p>
                    <Badge className="mt-1 bg-danger/10 text-danger border border-danger/20 text-xs">{d.type}</Badge>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-bold text-danger">{d.score}</div>
                    <div className="text-xs text-muted-foreground">confidence</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
              <div>
                <Badge className="bg-primary text-primary-foreground mb-4">Capabilities</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-6">What A1SCAMSHIELD™ Detects</h2>
                <ul className="space-y-3">
                  {CAPABILITIES.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />{c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Badge className="bg-secondary text-secondary-foreground mb-4">Platform Fit</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-6">Where It Fits</h2>
                <div className="space-y-4">
                  {[
                    { who: "Individual Users", role: "Listens silently during phone calls and alerts the user in real time." },
                    { who: "Family Guardian", role: "Triggers family alerts when dangerous language is detected in a loved one's call." },
                    { who: "BankGuard", role: "Enriches teller intervention scripts with detected scam language context." },
                    { who: "PlatformShield", role: "Scans written messages for grooming, recovery scam, and financial manipulation patterns." },
                    { who: "Investigator Console", role: "All detected phrases are logged to Evidence Vault™ for case building." },
                  ].map((w) => (
                    <div key={w.who} className="bg-card border border-border rounded-sm p-4">
                      <div className="font-semibold text-sm text-primary mb-1">{w.who}</div>
                      <p className="text-xs text-muted-foreground">{w.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">A1SCAMSHIELD™ is active the moment a call begins.</h2>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Link href="/demo"><Button className="bg-accent text-accent-foreground hover:bg-accent/90">Run Demo</Button></Link>
              <Link href="/modules/scamzy"><Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">Next: SCAMZY™ <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
