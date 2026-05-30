import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, CheckCircle, ArrowRight, Network, TrendingUp, User } from "lucide-react"

const NETWORK_ENTITIES = [
  { type: "Phone Number", value: "+1-888-302-XXXX", links: 47, risk: "Critical" },
  { type: "Domain", value: "microsoft-support-help.com", links: 23, risk: "Critical" },
  { type: "Crypto Wallet", value: "bc1q...4x7z", links: 12, risk: "High" },
  { type: "Script Family", value: "Tech Support → Gift Card Loop", links: 318, risk: "Critical" },
  { type: "Actor Alias", value: '"Agent Johnson" cluster', links: 8, risk: "High" },
]

const JOURNEY_STAGES = [
  { stage: 1, name: "Initial Contact", desc: "Scammer makes first contact via phone, social, or email. Often impersonates authority." },
  { stage: 2, name: "Trust Building", desc: "Builds false credibility using official-sounding language, fake credentials, spoofed caller ID." },
  { stage: 3, name: "Victim Control", desc: "Isolates victim, creates urgency, suppresses rational thinking through fear or emotional manipulation." },
  { stage: 4, name: "Payment Extraction", desc: "Directs victim to gift cards, crypto, wire transfers. May use 'money mule' intermediaries." },
  { stage: 5, name: "Continuation / Recovery Scam", desc: "If victim resists or loses money, a secondary scammer poses as a 'recovery specialist'." },
]

export default function ScamzyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-sm bg-accent flex items-center justify-center"><Globe className="h-8 w-8 text-accent-foreground" /></div>
              <div>
                <Badge className="bg-accent text-accent-foreground mb-1">Intelligence Layer</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">SCAMZY™</h1>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/80 mb-4">Global Scam Intelligence & Fraud-Network Disruption Core</p>
            <p className="text-primary-foreground/70 text-lg leading-relaxed text-pretty">
              The global scam intelligence brain inside VIGISCAM™. SCAMZY™ studies scammer language, fraud journeys, victim-state patterns, criminal infrastructure, actor linkages, wallets, domains, scripts, and cross-case behavior to reveal not only what scam is happening—but the network behind it.
            </p>
            <div className="flex gap-3 mt-8">
              <Link href="/demo"><Button className="bg-accent text-accent-foreground hover:bg-accent/90">See SCAMZY in Action <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link href="/modules"><Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">All Modules</Button></Link>
            </div>
          </div>
        </section>

        {/* Fraud Journey Stages */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-secondary text-secondary-foreground mb-4">Fraud Journey Engine</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3">SCAMZY™ Maps the 5-Stage Fraud Journey</h2>
              <p className="text-muted-foreground">Every scam follows a predictable journey. SCAMZY™ identifies where the victim is in real time and predicts the scammer&apos;s next move.</p>
            </div>
            <div className="max-w-4xl mx-auto relative">
              <div className="hidden md:block absolute left-5 top-8 bottom-8 w-0.5 bg-border" />
              <div className="space-y-4">
                {JOURNEY_STAGES.map((s) => (
                  <div key={s.stage} className="flex items-start gap-6 bg-card border border-border rounded-sm p-5">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0 z-10">{s.stage}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-foreground">{s.name}</h3>
                        <Badge className="bg-muted text-muted-foreground text-xs">Stage {s.stage}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Network Entities */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-primary text-primary-foreground mb-4">Network Intelligence</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-3">Sample Network Entities Tracked by SCAMZY™</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {NETWORK_ENTITIES.map((e) => (
                <div key={e.value} className="bg-card border border-border rounded-sm p-4 flex items-center gap-4">
                  <Network className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-0.5">{e.type}</div>
                    <div className="font-mono text-sm font-semibold text-foreground">{e.value}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-foreground">{e.links} links</div>
                    <Badge className={`text-xs ${e.risk === "Critical" ? "bg-danger text-danger-foreground" : "bg-warning text-warning-foreground"}`}>{e.risk}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats + Key Capabilities */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-14">
              {[
                { icon: <Globe className="h-6 w-6" />, stat: "4.2M+", label: "Scam actors tracked" },
                { icon: <TrendingUp className="h-6 w-6" />, stat: "38", label: "Countries covered" },
                { icon: <User className="h-6 w-6" />, stat: "318K+", label: "Script families mapped" },
              ].map((s) => (
                <div key={s.label} className="bg-card border border-border rounded-sm p-6 text-center">
                  <div className="text-primary mx-auto mb-3 flex justify-center">{s.icon}</div>
                  <div className="text-4xl font-bold text-primary mb-1">{s.stat}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">SCAMZY™ Core Capabilities</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Unified Scam Threat Score™ (real-time)",
                  "VictimState AI™ emotional state monitoring",
                  "Scammer Emotion Fingerprint™ analysis",
                  "Fraud journey prediction engine",
                  "Cross-case actor linking",
                  "Wallet / phone / domain graph",
                  "Script family taxonomy (318K+ patterns)",
                  "Global Scam Behavior Corpus™",
                  "Takedown packet generation",
                  "Law enforcement report builder",
                ].map((c) => (
                  <div key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />{c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">SCAMZY™ is the intelligence brain behind every FreezeGuard intervention.</h2>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Link href="/demo"><Button className="bg-accent text-accent-foreground hover:bg-accent/90">Run Demo</Button></Link>
              <Link href="/modules/freezelock"><Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">Next: FreezeLock™ <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
