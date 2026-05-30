import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Lock, Database, Eye, Globe, Trash2, UserCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyTrustPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/trust-center" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Trust Center
          </Link>
          <div className="mb-10">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">Last updated: January 2025. Effective: January 2025.</p>
          </div>

          <div className="space-y-8">
            {[
              {
                icon: Database,
                title: "What Data We Collect",
                content: [
                  "Device metadata (model, OS version, identifiers) to deliver protection services",
                  "Call audio fragments — processed locally on-device, never stored without explicit consent",
                  "Screen activity during active monitoring sessions — ephemeral, consent-gated",
                  "Scam encounter reports and evidence you explicitly choose to submit",
                  "Account credentials (encrypted, hashed passwords) and contact information",
                  "Usage analytics to improve detection accuracy — anonymized and aggregated only",
                ],
              },
              {
                icon: Eye,
                title: "How We Use Your Data",
                content: [
                  "Real-time scam and fraud detection — the core service you signed up for",
                  "Training and improving AI detection models — only with explicit opt-in consent",
                  "Communicating alerts, warnings, and service notifications to you",
                  "Responding to law enforcement requests with valid legal process only",
                  "Generating anonymized threat intelligence reports — never individually identifiable",
                ],
              },
              {
                icon: Globe,
                title: "Data Sharing",
                content: [
                  "We never sell your personal data to third parties — ever",
                  "Law enforcement: only with valid court order, warrant, or legal process",
                  "Service providers (cloud, security auditors): bound by strict data processing agreements",
                  "Research partners: anonymized, aggregated datasets only with your consent",
                  "Affiliates and subsidiaries: only where required to deliver your contracted service",
                ],
              },
              {
                icon: Trash2,
                title: "Data Retention & Deletion",
                content: [
                  "Active account data: retained for duration of subscription plus 30 days",
                  "Evidence submissions: user-controlled; delete any time from Evidence Vault",
                  "Call fragments: purged within 24 hours unless explicitly saved to Evidence Vault",
                  "Account deletion: complete data purge within 30 days of request",
                  "Backups: rotated and fully purged within 90 days",
                  "Compliance holds: data preserved only where legally required, clearly flagged to user",
                ],
              },
              {
                icon: UserCheck,
                title: "Your Rights",
                content: [
                  "Access: Request a full copy of all data we hold about you",
                  "Correction: Update or correct inaccurate personal data",
                  "Deletion: Request complete erasure of your account and all associated data",
                  "Portability: Export your data in machine-readable format",
                  "Objection: Opt out of any AI model training use of your data",
                  "Complaint: Lodge a complaint with your local data protection authority",
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
                      <h2 className="text-lg font-bold text-foreground mb-3">{section.title}</h2>
                      <ul className="space-y-2">
                        {section.content.map((item, j) => (
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

          <div className="mt-10 p-6 bg-primary/5 rounded-xl border border-primary/20">
            <h3 className="font-bold text-foreground mb-2">Contact Our Privacy Team</h3>
            <p className="text-sm text-muted-foreground">
              Email: <span className="text-primary">privacy@vigiscam.ai</span> — Response within 2 business days.
              For urgent requests, use the Contact page and select "Privacy &amp; Data Rights."
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
