'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Building, Code, Users, Settings, Lock, Database, Zap, CheckCircle2, ArrowRight } from "lucide-react"

export default function EnterpriseSolutionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-primary/5 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-primary text-primary-foreground mb-4">For Enterprise</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                API-First Scam Protection for Enterprise Security Teams
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Deploy VIGISCAM™ across your organization with full API access, SSO integration, custom policies, and enterprise-grade SLAs. Protect employees, customers, and brand reputation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/company/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground">
                    Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="bg-transparent">Schedule Demo</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Enterprise Capabilities</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: <Code className="h-8 w-8" />,
                  title: "Full API Access",
                  desc: "RESTful APIs for scam detection, threat scoring, evidence retrieval, and policy management. Webhooks for real-time alerts.",
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "SSO & SCIM",
                  desc: "SAML 2.0 and OIDC integration. Automatic user provisioning with SCIM. Works with Okta, Azure AD, and more.",
                },
                {
                  icon: <Settings className="h-8 w-8" />,
                  title: "Custom Policies",
                  desc: "Define organization-specific detection rules, intervention thresholds, and escalation workflows.",
                },
                {
                  icon: <Lock className="h-8 w-8" />,
                  title: "Role-Based Access",
                  desc: "Granular permissions for security teams, HR, legal, and executives. Full audit logging.",
                },
                {
                  icon: <Database className="h-8 w-8" />,
                  title: "Data Residency",
                  desc: "Choose where your data lives. US, EU, and APAC regions available. On-premise deployment options.",
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "Real-Time Dashboard",
                  desc: "Centralized view of all protected users, active threats, intervention history, and security posture.",
                },
              ].map((cap, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <div className="text-primary mb-4">{cap.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Enterprise Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Executive Protection",
                  desc: "Protect C-suite executives from deepfake impersonation, business email compromise, and targeted social engineering.",
                },
                {
                  title: "Employee Training",
                  desc: "Run simulated scam scenarios to train employees. Track security awareness metrics across departments.",
                },
                {
                  title: "Customer Service Security",
                  desc: "Protect call center staff from scammers impersonating customers. Verify caller identity in real-time.",
                },
                {
                  title: "Vendor Verification",
                  desc: "Detect fake invoices, impersonated vendors, and payment redirect scams targeting accounts payable.",
                },
              ].map((useCase, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Integrations</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {["Okta", "Azure AD", "Slack", "Microsoft Teams", "Salesforce", "ServiceNow", "Splunk", "PagerDuty"].map((integration) => (
                  <div key={integration} className="bg-card border border-border rounded-lg p-4 text-center">
                    <span className="font-medium text-foreground">{integration}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground">
                Plus webhooks and REST APIs for custom integrations with any system.
              </p>
            </div>
          </div>
        </section>

        {/* SLA & Support */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Enterprise SLA & Support</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "99.99% Uptime SLA",
                  items: ["Redundant infrastructure", "Automatic failover", "Real-time status page", "Incident credits"],
                },
                {
                  title: "Dedicated Support",
                  items: ["Named account manager", "24/7 priority support", "Quarterly business reviews", "Custom training"],
                },
                {
                  title: "Security Commitments",
                  items: ["SOC 2 Type II certified", "Penetration testing", "Bug bounty program", "Security questionnaire support"],
                },
              ].map((sla, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-4">{sla.title}</h3>
                  <ul className="space-y-2">
                    {sla.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Enterprise Pricing</h2>
              <p className="text-muted-foreground mb-8">
                Custom pricing based on user count, API usage, and deployment requirements. Volume discounts available.
              </p>
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Starting at</div>
                    <div className="text-2xl font-bold text-foreground">$5/user/mo</div>
                    <div className="text-sm text-muted-foreground">1,000+ users</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">API Calls</div>
                    <div className="text-2xl font-bold text-foreground">Unlimited</div>
                    <div className="text-sm text-muted-foreground">Fair use policy</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Contract</div>
                    <div className="text-2xl font-bold text-foreground">Annual</div>
                    <div className="text-sm text-muted-foreground">Multi-year discounts</div>
                  </div>
                </div>
                <Link href="/company/contact">
                  <Button className="bg-primary text-primary-foreground">Get Custom Quote</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
              Secure Your Enterprise
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join leading organizations that trust VIGISCAM™ for enterprise-grade scam protection.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/company/contact">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
