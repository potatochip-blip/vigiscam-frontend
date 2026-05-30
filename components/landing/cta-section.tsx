import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Phone, Shield, Database, Lock } from "lucide-react"

const PRICING_TIERS = [
  {
    name: "Personal & Family",
    desc: "Free, Personal Shield, Family Guardian, ElderCare Plus",
    href: "/pricing",
    icon: <Shield className="h-5 w-5" />,
    badge: "From Free",
  },
  {
    name: "Enterprise",
    desc: "BankGuard, PlatformShield, Investigator Console, Enterprise API",
    href: "/pricing",
    icon: <Database className="h-5 w-5" />,
    badge: "Custom Pricing",
  },
  {
    name: "Government / Investigations",
    desc: "Agency Intelligence, Regional Fraud Operations, Custom Deployment",
    href: "/pricing",
    icon: <Lock className="h-5 w-5" />,
    badge: "Contact Us",
  },
]

export function CTASection() {
  return (
    <>
      {/* Pricing Preview */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Badge className="bg-secondary text-secondary-foreground mb-4">Pricing</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">Protection for Every Scale</h2>
            <p className="text-muted-foreground">From individual users to national governments.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {PRICING_TIERS.map((t) => (
              <Link key={t.name} href={t.href} className="bg-card border border-border rounded-sm p-6 hover:border-primary hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary">{t.icon}</div>
                  <Badge className="bg-accent text-accent-foreground text-xs">{t.badge}</Badge>
                </div>
                <h3 className="font-bold text-foreground mb-2">{t.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                <span className="text-primary text-xs font-medium mt-4 inline-flex items-center gap-1">
                  View plans <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                See full pricing & feature matrix
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-accent-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground text-balance">
              A scam does not need hours to destroy a life.<br />VIGISCAM™ only needs seconds to stop it.
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 text-pretty">
              VIGISCAM™ is not just a screen-freezing tool. It is the world&apos;s first unified system that detects the scam, protects the victim, verifies the caller, interrupts the harm, preserves the evidence, and exposes the criminal network behind it—powered by SCAMZY™, A1SCAMSHIELD™, FREEZEGUARD™, FreezeLock™, and the Authenticity Verification Suite.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/select-account-type">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 font-semibold">
                  Start Personal Protection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  Explore Enterprise
                </Button>
              </Link>
              <Link href="/company/contact">
                <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/50 text-primary-foreground/80 hover:bg-primary-foreground/10 bg-transparent">
                  <Phone className="mr-2 h-4 w-4" />
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
