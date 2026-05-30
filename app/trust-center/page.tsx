import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Brain, UserCheck, FileText, Eye, ArrowRight, CheckCircle } from "lucide-react"

const sections = [
  {
    icon: Lock,
    title: "Privacy Policy",
    description: "How we collect, use, store, and protect your personal data. Full transparency on data flows.",
    href: "/trust-center/privacy",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "Security Architecture",
    description: "End-to-end encryption, zero-knowledge storage, penetration testing, and compliance certifications.",
    href: "/trust-center/security",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Brain,
    title: "Ethical AI",
    description: "Our commitments to fairness, explainability, no identity fabrication, and responsible AI use.",
    href: "/trust-center/ethical-ai",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: UserCheck,
    title: "Consent Framework",
    description: "How consent is obtained, maintained, and revoked across individual, family, and enterprise contexts.",
    href: "/trust-center/consent",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: FileText,
    title: "Evidence Governance",
    description: "Chain of custody, evidence integrity, legal admissibility, and retention policies.",
    href: "/trust-center/evidence-governance",
    color: "text-red-600",
    bg: "bg-red-50",
  },
]

const commitments = [
  "No identity fabrication — ever",
  "Consent-based monitoring only",
  "End-to-end encrypted evidence",
  "User-controlled data retention",
  "Transparent AI decision logs",
  "Family Guardian safeguards built-in",
  "Third-party annual audits",
  "Zero-knowledge architecture",
]

export default function TrustCenterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm mb-6">
              <Shield className="h-4 w-4" />
              Trust &amp; Transparency
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">FreezeGuard Trust Center</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              We protect people from scams — with complete transparency, ethical AI, and your privacy as a non-negotiable foundation.
            </p>
          </div>
        </section>

        {/* Core Commitments */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-foreground mb-10">Our Core Commitments</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {commitments.map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-medium">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sections Grid */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-2">Trust Center Sections</h2>
            <p className="text-muted-foreground mb-10">Detailed documentation on every aspect of how we operate responsibly.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <Link key={section.href} href={section.href}>
                    <Card className="p-6 h-full hover:shadow-md transition-shadow group border border-border">
                      <div className={`w-12 h-12 rounded-xl ${section.bg} flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 ${section.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                      <span className="text-sm text-primary font-medium flex items-center gap-1">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-2xl mx-auto text-center">
            <Eye className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Questions About Our Practices?</h2>
            <p className="text-muted-foreground mb-6">
              Our Privacy &amp; Ethics team responds to all inquiries within 2 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/company/contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                Contact Privacy Team
              </Link>
              <Link href="/resources" className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md font-medium hover:bg-muted transition-colors text-foreground">
                View Documentation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
