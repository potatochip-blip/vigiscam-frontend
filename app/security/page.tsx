'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lock, Shield, Eye, Database, Zap, AlertCircle } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-primary text-primary-foreground mb-4">Security</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Your Security is Our Priority
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Military-grade encryption, zero-knowledge architecture, and independent security audits.
            </p>
          </div>
        </div>
      </section>

      {/* Core Security Features */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Security Foundation</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Lock,
                title: "End-to-End Encryption",
                desc: "All data encrypted with AES-256 at rest and TLS 1.3 in transit.",
              },
              {
                icon: Shield,
                title: "Zero-Knowledge Architecture",
                desc: "We never have access to your unencrypted data or personal information.",
              },
              {
                icon: Eye,
                title: "Privacy First",
                desc: "No tracking pixels, analytics, or third-party data sharing. Ever.",
              },
              {
                icon: Database,
                title: "Secure Data Storage",
                desc: "Data stored in secure, geographically distributed data centers.",
              },
              {
                icon: Zap,
                title: "Rate Limiting",
                desc: "Advanced DDoS protection and automatic threat mitigation.",
              },
              {
                icon: AlertCircle,
                title: "Anomaly Detection",
                desc: "Real-time monitoring for suspicious access patterns and intrusions.",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Compliance & Certifications</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { name: "SOC 2 Type II", desc: "Annual third-party security and availability audit" },
                { name: "ISO 27001", desc: "International security management standard certified" },
                { name: "GDPR Compliant", desc: "Full compliance with EU data protection regulations" },
                { name: "CCPA Compliant", desc: "California Consumer Privacy Act compliance verified" },
                { name: "HIPAA Ready", desc: "Healthcare-grade security and privacy controls" },
                { name: "PCI DSS Level 1", desc: "Highest payment card industry security standards" },
              ].map((cert, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-1">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Incident Response</h2>
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Badge className="bg-primary text-primary-foreground">1</Badge>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Detection</h3>
                  <p className="text-sm text-muted-foreground">Automated monitoring detects security anomalies within seconds.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Badge className="bg-primary text-primary-foreground">2</Badge>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Alert</h3>
                  <p className="text-sm text-muted-foreground">Immediate notification to on-call security team. Response time: {'<'}15 minutes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Badge className="bg-primary text-primary-foreground">3</Badge>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Containment</h3>
                  <p className="text-sm text-muted-foreground">Threat isolated and contained. Customer data protection verified.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Badge className="bg-primary text-primary-foreground">4</Badge>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Communication</h3>
                  <p className="text-sm text-muted-foreground">Full transparency to customers. Detailed incident report provided within 72 hours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vulnerability Disclosure */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Responsible Disclosure</h2>
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8">
            <p className="text-muted-foreground mb-6">
              We welcome security researchers and take all reports seriously. If you discover a vulnerability, please report it responsibly:
            </p>
            <div className="bg-muted rounded-lg p-6 mb-6">
              <p className="font-mono text-sm text-foreground">security@vigiscam.ai</p>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Do not disclose publicly before we have had a reasonable time to patch</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Provide clear description of vulnerability and reproduction steps</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>We will acknowledge receipt within 24 hours</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Security researchers may receive recognition and rewards</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Have Security Questions?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Our security team is available to discuss your concerns.</p>
          <Link href="/company/contact">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Contact Security Team
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
