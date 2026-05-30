'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lock, FileText, Download, Share2, Trash2, Archive } from "lucide-react"

export default function EvidenceVaultPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-primary text-primary-foreground mb-4">Evidence Vault</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Your Incident Evidence, Preserved
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Automatically document and encrypt every scam attempt. Share with law enforcement or keep for your records.
            </p>
          </div>
        </div>
      </section>

      {/* What Gets Captured */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">What Gets Captured</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                category: "Communications",
                items: ["Complete call transcripts", "Audio recordings", "Text/chat logs", "Email headers & content"],
              },
              {
                category: "Behavioral Data",
                items: ["Manipulation detection signals", "Emotional pressure tactics identified", "Urgency patterns", "Authority impersonation clues"],
              },
              {
                category: "Technical Evidence",
                items: ["Caller ID information", "Phone/device identifiers", "IP addresses & geolocation", "Deepfake detection results"],
              },
              {
                category: "Financial Trail",
                items: ["Transfer amounts & timing", "Payment methods used", "Recipient account info", "Transaction metadata"],
              },
            ].map((section, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{section.category}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vault Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Vault Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Lock,
                title: "End-to-End Encrypted",
                desc: "Your evidence is encrypted with AES-256. Only you can access it.",
              },
              {
                icon: FileText,
                title: "Auto-Generated Reports",
                desc: "Incident reports automatically compiled in prosecution-ready format.",
              },
              {
                icon: Download,
                title: "Export Anytime",
                desc: "Download your evidence as PDF, ZIP, or court-admissible formats.",
              },
              {
                icon: Share2,
                title: "Share with Law Enforcement",
                desc: "One-click sharing with FBI, local police, or FTC with permission tracking.",
              },
              {
                icon: Archive,
                title: "Permanent Archive",
                desc: "Evidence retained indefinitely for investigation or legal proceedings.",
              },
              {
                icon: Trash2,
                title: "Controlled Deletion",
                desc: "You decide when to delete. Secure wipe ensures permanent removal.",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Law Enforcement */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Helping Law Enforcement</h2>
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Our Evidence Vault is designed specifically for law enforcement investigators. When you authorize sharing:
              </p>
              <div className="space-y-4">
                {[
                  "Evidence automatically formatted for admissibility in court proceedings",
                  "Chain of custody maintained through encrypted audit logs",
                  "Multiple incident cases linked to identify organized scam networks",
                  "Behavioral patterns analyzed to identify repeat offenders",
                  "Geographic and temporal data helps establish jurisdiction",
                  "Prosecution packet includes all supporting documentation",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Real Impact</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                story: "Karen's Tech Support Scam",
                result: "Evidence Vault helped FBI identify and arrest scam ring operating in 4 states",
              },
              {
                story: "Investment Fraud Network",
                result: "Network linking identified 340 fake investment accounts operated by same group",
              },
              {
                story: "Romance Scam Prosecution",
                result: "Recorded evidence led to $2.3M in recovered assets returned to victims",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">{item.story}</h3>
                <p className="text-sm text-muted-foreground">{item.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Document Every Attack</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Protect yourself and help stop scammers. Get started with FreezeGuard today.</p>
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
