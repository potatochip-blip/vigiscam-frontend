'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Mail } from "lucide-react"

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-primary text-primary-foreground mb-4">Press</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Press Kit & Media Resources
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Official company information, brand assets, and press releases for journalists and media partners.
            </p>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Media Inquiries</h2>
            <p className="text-muted-foreground mb-6">
              For press inquiries, interview requests, or media coverage, please contact:
            </p>
            <a href="mailto:press@vigiscam.ai" className="inline-flex items-center gap-2 text-primary hover:underline">
              <Mail className="h-5 w-5" />
              press@vigiscam.ai
            </a>
          </div>

          {/* Assets */}
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Brand Assets & Downloads</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Logo Files",
                desc: "Full resolution logos in multiple formats (PNG, SVG, PDF)",
                items: ["Logo Dark", "Logo Light", "Logo Mark Only", "Logo Horizontal"],
              },
              {
                title: "Brand Guidelines",
                desc: "Complete brand guidelines and usage standards",
                items: ["Color Palette", "Typography", "Logo Usage", "Marketing Materials"],
              },
              {
                title: "Product Screenshots",
                desc: "High-resolution product images and dashboard screenshots",
                items: ["Dashboard Views", "Feature Screens", "Mobile Views", "Use Cases"],
              },
              {
                title: "Executive Bios",
                desc: "Biographies of company leadership and founders",
                items: ["CEO Bio", "CTO Bio", "Advisors", "Team Profiles"],
              },
            ].map((asset, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{asset.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{asset.desc}</p>
                <ul className="space-y-2 mb-4">
                  {asset.items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>•</span> {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Recent Press Releases</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                date: "May 2026",
                headline: "VIGISCAM™ Raises $50M Series B to Scale AI Fraud Prevention",
                desc: "Led by Sequoia Capital, funding will accelerate platform expansion and new detection modules",
              },
              {
                date: "March 2026",
                headline: "FBI Partners with VIGISCAM™ on National Scam Ring Investigation",
                desc: "Evidence Vault technology helps identify and prosecute organized fraud network",
              },
              {
                date: "January 2026",
                headline: "VIGISCAM™ Announces 99.2% Detection Rate for Tech Support Scams",
                desc: "New acoustic analysis capabilities identify manipulation signals with industry-leading accuracy",
              },
              {
                date: "November 2025",
                headline: "Major Bank Deploys FreezeGuard BankGuard to 5M Customers",
                desc: "Regional bank reduces wire transfer fraud by 78% in first quarter",
              },
              {
                date: "September 2025",
                headline: "VIGISCAM™ Launches Emergency Response for Romance Scam Victims",
                desc: "New features provide real-time intervention for online dating platform users",
              },
            ].map((release, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <Badge className="bg-primary text-primary-foreground mb-3">{release.date}</Badge>
                <h3 className="text-lg font-bold text-foreground mb-2">{release.headline}</h3>
                <p className="text-muted-foreground mb-4">{release.desc}</p>
                <Link href="#" className="inline-flex items-center gap-1 text-primary hover:underline text-sm">
                  Read Full Release <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In The News */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">In The News</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { outlet: "Forbes", headline: "The AI Company Stopping Scammers Before They Strike" },
              { outlet: "Wall Street Journal", headline: "New Tech Offers Real-Time Protection Against Romance Scams" },
              { outlet: "NPR", headline: "How AI is Fighting Back Against Fraud" },
              { outlet: "TechCrunch", headline: "FreezeGuard Raises Series B to Combat Growing Scam Crisis" },
            ].map((news, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <p className="text-primary text-sm font-semibold mb-2">{news.outlet}</p>
                <h3 className="font-bold text-foreground">{news.headline}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Media Inquiries</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Have a question for our press team?</p>
          <a href="mailto:press@vigiscam.ai">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Contact Press Team
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}
