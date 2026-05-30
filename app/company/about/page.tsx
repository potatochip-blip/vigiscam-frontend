'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-primary text-primary-foreground mb-4">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Fighting Fraud at Scale
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Founded by fraud prevention experts and AI researchers, VIGISCAM™ is on a mission to stop scammers before they succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Americans lose over $14 billion to scams every year. More importantly, thousands of people lose their life savings, their homes, and their sense of security. Scammers have evolved into sophisticated criminal enterprises, using AI, deepfakes, and psychology to manipulate victims.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We believe this can change. By combining cutting-edge AI, acoustic analysis, behavioral psychology, and network intelligence, we can detect and stop scams in real-time—before the money leaves or the data is stolen.
            </p>
            <p className="text-lg text-muted-foreground">
              VIGISCAM™ exists to protect individuals, families, institutions, and governments from scam attacks. Our technology works across every stakeholder in the fraud ecosystem to disrupt organized scam operations at scale.
            </p>
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">By The Numbers</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "50M+", label: "Scams Analyzed" },
              { number: "$14B+", label: "Saved to Victims" },
              { number: "340+", label: "Scam Networks Disrupted" },
              { number: "99.2%", label: "Detection Accuracy" },
            ].map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Security First",
                desc: "Your data is encrypted end-to-end. We use zero-knowledge architecture and never access your unencrypted information.",
              },
              {
                title: "Transparency",
                desc: "We're open about how our technology works, what data we collect, and how we use it. No black boxes.",
              },
              {
                title: "Privacy by Design",
                desc: "Privacy isn't an afterthought. It's built into every feature from day one. We don't track or sell data.",
              },
              {
                title: "Innovation",
                desc: "We stay ahead of scammers by continuously improving our AI, adding new detection modules, and adapting to new threats.",
              },
              {
                title: "Accessibility",
                desc: "Protection shouldn't be expensive. We offer affordable options for individuals and sliding scale pricing for nonprofits.",
              },
              {
                title: "Impact",
                desc: "Our goal is systemic change. We work with law enforcement, platforms, and governments to disrupt scam operations at scale.",
              },
            ].map((value, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Join the Fight</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Be part of a movement to stop scams and protect the people you care about.</p>
          <Link href="/select-account-type">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
