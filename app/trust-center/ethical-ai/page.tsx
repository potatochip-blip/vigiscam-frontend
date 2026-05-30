import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Brain, XCircle, BarChart3, Users, Zap, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EthicalAIPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/trust-center" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Trust Center
          </Link>
          <div className="mb-10">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">Ethical AI Principles</h1>
            <p className="text-xl text-muted-foreground">
              We build AI that protects people — with accountability, fairness, and hard limits on what it will never do.
            </p>
          </div>

          {/* Hard Limits Banner */}
          <Card className="p-6 mb-8 border-destructive/30 bg-destructive/5">
            <div className="flex items-start gap-3">
              <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-bold text-foreground mb-3">Absolute Prohibitions — Things Our AI Will Never Do</h2>
                <ul className="space-y-2">
                  {[
                    "Fabricate or generate false identities, fake evidence, or synthetic audio/video of real people",
                    "Make autonomous decisions to freeze accounts, restrict services, or take punitive action without human review",
                    "Profile or discriminate based on protected characteristics (race, religion, nationality, gender, age)",
                    "Share detection data with advertisers, data brokers, or any commercial third party",
                    "Operate surveillance outside of explicit, revocable user consent",
                    "Provide false confidence — all risk scores include uncertainty bounds and must be reviewable",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <XCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            {[
              {
                icon: BarChart3,
                title: "Transparency &amp; Explainability",
                items: [
                  "Every risk score includes a human-readable explanation of contributing factors",
                  "AI decisions that affect users must be reviewable and contestable",
                  "Model training data sources are documented and available on request",
                  "Detection confidence levels are always shown — we never hide uncertainty",
                  "Automated intervention (e.g., Guardian Pause) always requires human confirmation",
                ],
              },
              {
                icon: Users,
                title: "Fairness &amp; Bias Prevention",
                items: [
                  "Quarterly bias audits across demographics, geographies, and languages",
                  "Training datasets curated to prevent over-representation or under-representation",
                  "Independent third-party fairness evaluation annually",
                  "Disparate impact monitoring in production — flagged automatically if detected",
                  "Continuous red-teaming against adversarial and edge-case inputs",
                ],
              },
              {
                icon: Eye,
                title: "Human Oversight",
                items: [
                  "All high-stakes decisions (account flags, law enforcement referrals) require human review",
                  "Humans can override, correct, and provide feedback on any AI output",
                  "Internal AI ethics board reviews all new model deployments",
                  "External ethics advisory panel with independent researchers and advocates",
                  "Escalation paths for users who disagree with AI assessments",
                ],
              },
              {
                icon: Zap,
                title: "On-Device AI Philosophy",
                items: [
                  "Maximum processing happens on-device to minimize data exposure",
                  "Cloud processing only where on-device compute is insufficient and with explicit consent",
                  "Data minimization: models extract risk signals, not raw personal data",
                  "Federated learning used where possible to improve models without centralizing data",
                ],
              },
            ].map((section, i) => {
              const Icon = section.icon
              return (
                <Card key={i} className="p-6 border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: section.title }} />
                      <ul className="space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
