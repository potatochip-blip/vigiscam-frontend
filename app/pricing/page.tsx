'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "/month",
      desc: "Core scam detection for individuals",
      features: [
        "A1SCAMSHIELD™ live call detection",
        "FreezeLock™ emergency control",
        "Evidence Vault™",
        "ScamHold AI™ — transaction pausing",
        "Guardian Pause™ — basic pressure warnings",
        "GiftCardGuard™ — gift card protection",
        "5 Trusted Contacts",
        "24/7 monitoring",
        "Email support",
      ],
      cta: "Start Free Trial",
      href: "/signup?type=basic",
    },
    {
      name: "Family Guardian",
      price: "$19.99",
      period: "/month",
      desc: "Full protection for up to 10 family members",
      features: [
        "All Basic features",
        "Guardian Pause™ with trusted contact alerts",
        "Elder Mode pause protection",
        "WalletGuard AI™ — crypto risk checks",
        "ClaimVerify AI™ — story verification",
        "Multi-device monitoring",
        "Family dashboard & shared vault",
        "Emergency alerts to guardians",
        "20 Trusted Contacts",
        "Priority family support",
      ],
      cta: "Start Free Trial",
      href: "/signup?type=family",
      badge: "Most Popular",
    },
    {
      name: "Premium Shield",
      price: "$39.99",
      period: "/month",
      desc: "Complete protection suite for serious risk",
      features: [
        "All Family Guardian features",
        "Advanced Guardian Pause — custom duration",
        "ScamMirror™ — safe simulation lab",
        "Identity Collision Graph™",
        "LiveFaceSeal™ + VoiceMatchSeal™",
        "SCAMZY™ network linking",
        "Unlimited Trusted Contacts",
        "Investigator-grade evidence export",
        "Priority phone & chat support",
      ],
      cta: "Start Free Trial",
      href: "/signup?type=premium",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact us",
      desc: "For organizations, banks, and platforms",
      features: [
        "All Premium Shield features",
        "Guardian Pause™ policy controls & API",
        "API access & custom integrations",
        "BankGuard™ & PlatformShield™",
        "Dedicated account manager",
        "SLA guarantee (99.9%)",
        "Network intelligence tools",
        "24/7 enterprise support",
      ],
      cta: "Contact Sales",
      href: "/company/contact",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-primary text-primary-foreground mb-4">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Transparent Pricing, Powerful Protection
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Start free, upgrade anytime. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {plans.map((plan: typeof plans[0] & { highlight?: boolean }) => (
              <div key={plan.name} className={`relative bg-card border rounded-lg p-6 flex flex-col h-full ${plan.highlight ? "border-primary shadow-md" : "border-border"}`}>
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    {plan.badge}
                  </Badge>
                )}
                {plan.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                    Best Value
                  </Badge>
                )}
                <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-5">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button className={`w-full ${plan.highlight ? "bg-primary text-primary-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Feature Comparison</h2>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Basic</th>
                  <th className="text-center p-4 font-semibold">Family</th>
                  <th className="text-center p-4 font-semibold">Premium</th>
                  <th className="text-center p-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "A1SCAMSHIELD™", basic: true, family: true, premium: true, enterprise: true },
                  { feature: "FreezeLock™", basic: true, family: true, premium: true, enterprise: true },
                  { feature: "Evidence Vault™", basic: true, family: true, premium: true, enterprise: true },
                  { feature: "ScamHold AI™", basic: true, family: true, premium: true, enterprise: true },
                  { feature: "Guardian Pause™ (basic warnings)", basic: true, family: true, premium: true, enterprise: true },
                  { feature: "Guardian Pause™ — trusted contact alerts", basic: false, family: true, premium: true, enterprise: true },
                  { feature: "Guardian Pause™ — custom duration & Elder Mode", basic: false, family: false, premium: true, enterprise: true },
                  { feature: "GiftCardGuard™", basic: true, family: true, premium: true, enterprise: true },
                  { feature: "WalletGuard AI™", basic: false, family: true, premium: true, enterprise: true },
                  { feature: "ClaimVerify AI™", basic: false, family: true, premium: true, enterprise: true },
                  { feature: "ScamMirror™", basic: false, family: false, premium: true, enterprise: true },
                  { feature: "Identity Collision Graph™", basic: false, family: false, premium: true, enterprise: true },
                  { feature: "LiveFaceSeal™ + VoiceMatchSeal™", basic: false, family: false, premium: true, enterprise: true },
                  { feature: "SCAMZY™ Network Linking", basic: false, family: false, premium: true, enterprise: true },
                  { feature: "Multi-device monitoring", basic: false, family: true, premium: true, enterprise: true },
                  { feature: "API access", basic: false, family: false, premium: false, enterprise: true },
                  { feature: "BankGuard™ & PlatformShield™", basic: false, family: false, premium: false, enterprise: true },
                  { feature: "Dedicated support", basic: false, family: false, premium: false, enterprise: true },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="p-4 text-foreground font-medium">{row.feature}</td>
                    <td className="text-center p-4">
                      {row.basic ? <CheckCircle2 className="h-5 w-5 text-primary mx-auto" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="text-center p-4">
                      {row.family ? <CheckCircle2 className="h-5 w-5 text-primary mx-auto" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="text-center p-4">
                      {row.premium ? <CheckCircle2 className="h-5 w-5 text-primary mx-auto" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="text-center p-4">
                      {row.enterprise ? <CheckCircle2 className="h-5 w-5 text-primary mx-auto" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "Is there a free trial?", a: "Yes! Start with a 30-day free trial of any plan. No credit card required." },
              { q: "Can I change plans anytime?", a: "Absolutely. Upgrade, downgrade, or cancel anytime with no penalties." },
              { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers for enterprise accounts." },
              { q: "Do you offer discounts for annual billing?", a: "Yes. Save 20% when you pay annually instead of monthly." },
              { q: "Is my data encrypted?", a: "All data is encrypted end-to-end with military-grade encryption at rest and in transit." },
              { q: "What about customer support?", a: "Personal plans get email support. Family and Enterprise get priority phone and chat support." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-3">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Ready to Get Protected?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Start your free 30-day trial today. No credit card required.</p>
          <Link href="/select-account-type">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
