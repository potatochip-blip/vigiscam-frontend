import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Server, Key, ShieldCheck, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

const certifications = [
  { name: "SOC 2 Type II", status: "Certified", color: "bg-green-100 text-green-700" },
  { name: "ISO 27001", status: "Certified", color: "bg-green-100 text-green-700" },
  { name: "GDPR Compliant", status: "Compliant", color: "bg-blue-100 text-blue-700" },
  { name: "CCPA Compliant", status: "Compliant", color: "bg-blue-100 text-blue-700" },
  { name: "HIPAA Ready", status: "Available", color: "bg-orange-100 text-orange-700" },
  { name: "PCI DSS", status: "Level 1", color: "bg-green-100 text-green-700" },
]

export default function SecurityTrustPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/trust-center" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Trust Center
          </Link>
          <div className="mb-10">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">Security Architecture</h1>
            <p className="text-xl text-muted-foreground">End-to-end encryption, zero-trust access, and continuous security monitoring.</p>
          </div>

          {/* Certifications */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">Certifications &amp; Compliance</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-sm text-foreground">{cert.name}</span>
                  </div>
                  <Badge className={`text-xs ${cert.color} border-0`}>{cert.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: Lock,
                title: "Encryption",
                items: [
                  "AES-256-GCM encryption for all data at rest",
                  "TLS 1.3 for all data in transit",
                  "End-to-end encrypted Evidence Vault — keys held only by the user",
                  "Zero-knowledge architecture for sensitive detection data",
                  "Hardware Security Modules (HSMs) for key management",
                ],
              },
              {
                icon: Server,
                title: "Infrastructure",
                items: [
                  "SOC 2 Type II certified data centers across 3 regions",
                  "Immutable infrastructure — no persistent server access",
                  "Network segmentation and micro-perimeters",
                  "Real-time DDoS protection and rate limiting",
                  "99.99% uptime SLA with automatic failover",
                ],
              },
              {
                icon: Key,
                title: "Access Control",
                items: [
                  "Zero-trust network access (ZTNA) for all internal systems",
                  "Mandatory MFA for all employee and admin accounts",
                  "Just-in-time privileged access — no standing admin rights",
                  "Role-based access control (RBAC) with least-privilege enforcement",
                  "Complete audit trail of all data access and administrative actions",
                ],
              },
              {
                icon: ShieldCheck,
                title: "Security Operations",
                items: [
                  "Annual third-party penetration testing by independent security firms",
                  "Continuous vulnerability scanning and automated patching",
                  "24/7 Security Operations Center (SOC) monitoring",
                  "Bug bounty program — responsible disclosure rewarded",
                  "Incident response plan with 4-hour notification SLA for critical incidents",
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

          <div className="mt-10 p-6 bg-primary/5 rounded-xl border border-primary/20">
            <h3 className="font-bold text-foreground mb-2">Report a Security Issue</h3>
            <p className="text-sm text-muted-foreground">
              Email: <span className="text-primary">security@vigiscam.ai</span> — We acknowledge within 24 hours and remediate critical issues within 72 hours.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
