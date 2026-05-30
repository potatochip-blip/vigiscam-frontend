'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Lock, Users, AlertCircle, Download } from "lucide-react"

export default function ResourcesPage() {
  const resources = [
    {
      category: "Documentation",
      icon: BookOpen,
      items: [
        { title: "Getting Started Guide", desc: "Set up VIGISCAM™ in 5 minutes", href: "#" },
        { title: "API Reference", desc: "Complete integration documentation", href: "#" },
        { title: "Security Architecture", desc: "How our AI detection works", href: "#" },
        { title: "FAQ", desc: "Common questions answered", href: "#" },
      ],
    },
    {
      category: "Learning",
      icon: Users,
      items: [
        { title: "Webinar: Scam Psychology", desc: "Understanding attacker tactics", href: "#" },
        { title: "Case Studies", desc: "Real-world prevention stories", href: "#" },
        { title: "Video Tutorials", desc: "Step-by-step feature walkthroughs", href: "#" },
        { title: "Blog", desc: "Latest fraud trends and insights", href: "#" },
      ],
    },
    {
      category: "Security",
      icon: Lock,
      items: [
        { title: "Security Audit Report", desc: "Third-party security validation", href: "#" },
        { title: "Data Privacy Policy", desc: "How we protect your data", href: "#" },
        { title: "Compliance Documentation", desc: "GDPR, CCPA, SOC 2 certifications", href: "#" },
        { title: "Vulnerability Disclosure", desc: "Report security issues responsibly", href: "#" },
      ],
    },
    {
      category: "Business",
      icon: FileText,
      items: [
        { title: "Press Kit", desc: "Brand assets and company info", href: "#" },
        { title: "Terms of Service", desc: "Legal terms and conditions", href: "#" },
        { title: "Enterprise SLA", desc: "Service level agreement details", href: "#" },
        { title: "Pricing Sheet", desc: "Detailed feature comparison", href: "#" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-primary text-primary-foreground mb-4">Resources</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Learn & Build
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Documentation, tutorials, guides, and more to help you get the most from VIGISCAM™.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((category) => (
              <div key={category.category} className="bg-card border border-border rounded-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
                </div>
                <div className="space-y-4">
                  {category.items.map((item, i) => (
                    <Link key={i} href={item.href} className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group">
                      <h3 className="font-bold text-foreground group-hover:text-primary">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Featured Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: AlertCircle,
                title: "Scam Prevention Guide",
                desc: "Learn 15 warning signs of common scams and how to protect yourself.",
              },
              {
                icon: Download,
                title: "Quick Start PDF",
                desc: "Download and print our setup guide for reference.",
              },
              {
                icon: Lock,
                title: "Security Whitepaper",
                desc: "Deep dive into our AI and encryption architecture.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <Button variant="outline" className="bg-transparent">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Still Have Questions?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Our support team is ready to help.</p>
          <Link href="/company/contact">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Contact Support
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
