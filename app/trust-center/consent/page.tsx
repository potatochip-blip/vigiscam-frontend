import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { UserCheck, ToggleLeft, Heart, Building, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ConsentTrustPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/trust-center" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Trust Center
          </Link>
          <div className="mb-10">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <UserCheck className="h-6 w-6 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">Consent Framework</h1>
            <p className="text-xl text-muted-foreground">
              Monitoring only happens with explicit, informed, revocable consent. No exceptions.
            </p>
          </div>

          {/* Principles */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { label: "Explicit", desc: "Consent must be actively given — never assumed or implied" },
              { label: "Informed", desc: "Users know exactly what they are consenting to, in plain language" },
              { label: "Revocable", desc: "Consent can be withdrawn at any time, instantly, with full effect" },
            ].map((p, i) => (
              <Card key={i} className="p-5 text-center border border-border">
                <div className="text-2xl font-bold text-primary mb-2">{p.label}</div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            {[
              {
                icon: UserCheck,
                title: "Individual Consent",
                items: [
                  "Account creation requires explicit opt-in to each monitoring category separately",
                  "Call monitoring: consent required per-session, shown as visible indicator during monitoring",
                  "Screen monitoring: consent required per-session with a visible on-screen overlay",
                  "Evidence submission: always user-initiated, never automatic",
                  "AI model training: separate opt-in, clearly distinguished from service operation",
                ],
              },
              {
                icon: Heart,
                title: "Family Guardian Safeguards",
                items: [
                  "Protected loved ones must be informed that Family Guardian monitoring is active",
                  "Adults cannot be silently monitored — notification requirement is hardcoded, not configurable",
                  "Protected persons can view exactly what monitoring is active and by whom",
                  "Protected persons can escalate disagreements to FreezeGuard's independent review process",
                  "Minors: parental consent required; age-appropriate transparency communications provided",
                  "Family Guardian cannot access private conversations — only scam risk signals",
                ],
              },
              {
                icon: Building,
                title: "Enterprise &amp; Bank Consent",
                items: [
                  "Employee monitoring requires disclosure in employment agreements — we provide templates",
                  "Customer monitoring by banks requires consent at account opening or explicit re-consent",
                  "Monitoring scope is contractually limited — cannot be expanded without user re-consent",
                  "Customers can opt out of real-time monitoring and use static-only protection instead",
                ],
              },
              {
                icon: RefreshCw,
                title: "Withdrawing Consent",
                items: [
                  "Withdraw any consent category instantly from Settings > Privacy Controls",
                  "Withdrawal takes effect immediately — no data collected from that moment forward",
                  "Withdrawal does not retroactively delete already-submitted evidence (contact Privacy team for that)",
                  "Service continues operating with remaining consented monitoring categories",
                  "Account can be fully deleted (all data removed) at any time from Settings",
                ],
              },
              {
                icon: ToggleLeft,
                title: "Consent Records",
                items: [
                  "Every consent action is timestamped and stored in a tamper-evident consent log",
                  "Users can download their full consent history at any time",
                  "Consent records are retained for 7 years for legal compliance (separate from personal data)",
                  "Regulators and auditors can verify consent records via our compliance portal",
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
                      <h3 className="text-lg font-bold text-foreground mb-3">{section.title}</h3>
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
