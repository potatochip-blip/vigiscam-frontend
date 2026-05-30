import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { FileText, Lock, GitBranch, Scale, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EvidenceGovernancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/trust-center" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Trust Center
          </Link>
          <div className="mb-10">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">Evidence Governance</h1>
            <p className="text-xl text-muted-foreground">
              Chain of custody, cryptographic integrity, legal admissibility, and user-controlled retention.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: Lock,
                title: "Evidence Integrity",
                items: [
                  "Every evidence file is hashed with SHA-256 at capture — hash stored immutably",
                  "Tamper detection: any modification to evidence files is automatically detected and flagged",
                  "Cryptographic timestamps from a certified timestamping authority (RFC 3161)",
                  "Evidence metadata (capture device, time, method) stored separately and cryptographically linked",
                  "Evidence Vault uses end-to-end encryption — only the user holds the decryption key",
                ],
              },
              {
                icon: GitBranch,
                title: "Chain of Custody",
                items: [
                  "Full audit log of every access, export, share, or modification to evidence",
                  "Access logs include user identity, timestamp, IP address, and action taken",
                  "Evidence export packages include a signed manifest for legal proceedings",
                  "Law enforcement export format: court-ready bundles with hash verification scripts",
                  "Chain of custody report auto-generated for any evidence submitted to investigators",
                ],
              },
              {
                icon: Scale,
                title: "Legal Admissibility",
                items: [
                  "Evidence collected using methods designed to meet civil and criminal admissibility standards",
                  "Legal export bundles include: original files, hashes, timestamps, access logs, capture metadata",
                  "Expert witness documentation available for prosecutions using FreezeGuard evidence",
                  "International jurisdiction support: EU, UK, US, AU, CA legal frameworks addressed",
                  "Not legal advice — users should consult attorneys for specific admissibility questions",
                ],
              },
              {
                icon: Trash2,
                title: "Retention &amp; Deletion",
                items: [
                  "Default retention: 90 days — configurable up to 7 years per user settings",
                  "User-controlled deletion: delete any evidence item immediately, permanently",
                  "Automatic deletion: configure auto-purge after X days for any evidence category",
                  "Account deletion: all evidence purged within 30 days (backups cleared within 90 days)",
                  "Legal hold: evidence can be preserved during active legal proceedings on user request",
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
