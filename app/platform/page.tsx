import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Lock, Eye, Globe, Database, CheckCircle, XCircle } from "lucide-react"

const FIVE_BODIES = [
  {
    num: "01",
    title: "Conversation Body",
    desc: "The spoken and written words exchanged during the scam. A1SCAMSHIELD™ listens in real time for pressure phrases, secrecy commands, fake authority language, urgency escalation, and payment instructions.",
    module: "A1SCAMSHIELD™",
    icon: <Brain className="h-6 w-6" />,
  },
  {
    num: "02",
    title: "Emotional Body",
    desc: "The psychological manipulation applied to the victim. SCAMZY™ VictimState AI™ monitors emotional escalation, fear induction, cognitive override attempts, and trust-building patterns used by scammers.",
    module: "SCAMZY™ VictimState AI™",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    num: "03",
    title: "Technical Body",
    desc: "The tools used by scammers: remote access software, camera injection, voice changers, deepfake generators. FREEZEGUARD™, FreezeLock™, CamViguard™, SceneSeal™, and VoiceMatchSeal™ cover this layer.",
    module: "FREEZEGUARD™ + Auth Suite",
    icon: <Lock className="h-6 w-6" />,
  },
  {
    num: "04",
    title: "Transaction Body",
    desc: "The financial actions being driven: wire transfers, crypto conversions, gift card purchases, account access. BankGuard™ and Guardian Pause intervene before value leaves the victim.",
    module: "BankGuard™",
    icon: <Database className="h-6 w-6" />,
  },
  {
    num: "05",
    title: "Network Body",
    desc: "The criminal infrastructure behind the scam: phone clusters, domain farms, wallet chains, script families, actor aliases. SCAMZY™ maps and exposes the full network across every case.",
    module: "SCAMZY™ Intelligence",
    icon: <Eye className="h-6 w-6" />,
  },
]

const COMPARISON = [
  { feature: "Live call monitoring", traditional: false, fg: true },
  { feature: "Scam phrase detection (NLP)", traditional: false, fg: true },
  { feature: "Emotional manipulation detection", traditional: false, fg: true },
  { feature: "Remote access termination", traditional: false, fg: true },
  { feature: "Deepfake caller detection", traditional: false, fg: true },
  { feature: "Voice clone verification", traditional: false, fg: true },
  { feature: "Fraud journey mapping", traditional: false, fg: true },
  { feature: "Victim state assessment", traditional: false, fg: true },
  { feature: "Cross-case network graph", traditional: false, fg: true },
  { feature: "Evidence chain-of-custody", traditional: false, fg: true },
  { feature: "Guardian Pause (bank transfer delay)", traditional: false, fg: true },
  { feature: "Transaction monitoring", traditional: true, fg: true },
  { feature: "Malware / virus detection", traditional: true, fg: false },
  { feature: "Email spam filtering", traditional: true, fg: false },
]

export default function PlatformPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge className="bg-accent text-accent-foreground mb-4">Platform Overview</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
              The Unified VIGISCAM™ Platform
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 text-pretty leading-relaxed">
              A unified anti-scam protection platform powered by SCAMZY™ global intelligence, A1SCAMSHIELD™ live manipulation detection, and FREEZEGUARD™ remote-access protection. VIGISCAM™ covers every dimension of a modern scam.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/demo"><Button className="bg-accent text-accent-foreground hover:bg-accent/90">See Live Demo <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link href="/company/contact"><Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">Request Enterprise Briefing</Button></Link>
            </div>
          </div>
        </section>

        {/* Five Bodies of a Scam */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <Badge className="bg-secondary text-secondary-foreground mb-4">The Five-Body Model</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Every Scam Has Five Bodies. VIGISCAM™ Covers All Five.</h2>
              <p className="text-muted-foreground text-lg">Traditional tools see only transactions or malware. VIGISCAM™ addresses every dimension of human-targeted fraud.</p>
            </div>
            <div className="space-y-4 max-w-4xl mx-auto">
              {FIVE_BODIES.map((b) => (
                <div key={b.num} className="bg-card border border-border rounded-sm p-6 flex items-start gap-6">
                  <div className="text-3xl font-bold text-primary/20 font-mono w-10 shrink-0">{b.num}</div>
                  <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center text-primary shrink-0">{b.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                      <Badge className="bg-secondary text-secondary-foreground text-xs">{b.module}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Layers */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <Badge className="bg-primary text-primary-foreground mb-4">Architecture</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">Platform Layers</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { layer: "Detection Layer", modules: ["A1SCAMSHIELD™ — live NLP", "VictimState AI™", "Scammer Emotion Fingerprint™", "SCAMZY™ journey scoring"], color: "border-primary bg-primary/5" },
                { layer: "Intervention Layer", modules: ["FreezeLock™ — emergency stop", "Guardian Pause — bank delay", "Screen freeze & remote termination", "Trusted contact alert system"], color: "border-danger bg-danger/5" },
                { layer: "Intelligence Layer", modules: ["Global Scam Behavior Corpus™", "Cross-case actor linking", "Wallet / domain / phone graphing", "Takedown packet generation"], color: "border-accent bg-accent/10" },
              ].map((l) => (
                <div key={l.layer} className={`rounded-sm border p-6 ${l.color}`}>
                  <h3 className="font-bold text-foreground text-lg mb-4">{l.layer}</h3>
                  <ul className="space-y-2">
                    {l.modules.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <Badge className="bg-secondary text-secondary-foreground mb-4">Comparison</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">VIGISCAM™ vs Traditional Tools</h2>
            </div>
            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full border border-border rounded-sm overflow-hidden">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-4 text-sm font-semibold text-foreground">Capability</th>
                    <th className="text-center p-4 text-sm font-semibold text-muted-foreground">Traditional Tools</th>
                    <th className="text-center p-4 text-sm font-semibold text-primary">VIGISCAM™</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                      <td className="p-4 text-sm text-foreground">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.traditional ? <CheckCircle className="h-4 w-4 text-success mx-auto" /> : <XCircle className="h-4 w-4 text-muted-foreground/40 mx-auto" />}
                      </td>
                      <td className="p-4 text-center">
                        {row.fg ? <CheckCircle className="h-4 w-4 text-success mx-auto" /> : <XCircle className="h-4 w-4 text-muted-foreground/40 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to see the full platform?</h2>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Link href="/demo"><Button className="bg-accent text-accent-foreground hover:bg-accent/90">Run Interactive Demo</Button></Link>
              <Link href="/modules"><Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">Browse All Modules</Button></Link>
              <Link href="/pricing"><Button variant="outline" className="border-primary-foreground/50 text-primary-foreground/80 hover:bg-primary-foreground/10 bg-transparent">View Pricing</Button></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
