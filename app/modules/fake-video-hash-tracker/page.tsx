'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Video, Database, Search, AlertTriangle, Shield, Globe, CheckCircle2, ArrowRight } from "lucide-react"

export default function FakeVideoHashTrackerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-primary/5 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-primary text-primary-foreground mb-4">Module</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Fake Video Hash Tracker™
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Perceptual hashing database that identifies and tracks deepfake videos, pre-recorded scam loops, and recycled fraud content across the global scam ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/demo">
                  <Button className="bg-primary text-primary-foreground">See Demo</Button>
                </Link>
                <Link href="/modules/livefaceseal">
                  <Button variant="outline" className="bg-transparent">LiveFaceSeal Integration</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">How Hash Tracking Works</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <Video className="h-10 w-10" />,
                  title: "Video Capture",
                  desc: "Every video call and screen share is analyzed in real-time. Perceptual hashes are generated for facial regions, backgrounds, and motion patterns.",
                },
                {
                  icon: <Database className="h-10 w-10" />,
                  title: "Hash Database Query",
                  desc: "Generated hashes are compared against our global database of known scam videos, deepfake templates, and recycled fraud content.",
                },
                {
                  icon: <AlertTriangle className="h-10 w-10" />,
                  title: "Match & Alert",
                  desc: "When a match is found, the system alerts the user, logs the incident, and can trigger FreezeLock intervention.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-8 text-center">
                  <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="font-bold text-foreground text-lg mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detection Types */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">What We Detect</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Pre-Recorded Video Loops",
                  desc: "Scammers often use pre-recorded videos of fake bank employees, tech support agents, or law enforcement. We detect when the same video is used across multiple scam attempts.",
                },
                {
                  title: "Deepfake Face Swaps",
                  desc: "AI-generated face replacements that impersonate executives, family members, or officials. Our hashing detects known deepfake templates and generation artifacts.",
                },
                {
                  title: "Screen Share Manipulation",
                  desc: "Fake banking interfaces, manipulated account balances, and staged error messages used to create urgency during tech support scams.",
                },
                {
                  title: "Recycled Scam Content",
                  desc: "The same scam scenarios, scripts, and visual elements appear across thousands of attempts. We track and link them to criminal networks.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "2.4M+", label: "Hashes in Database" },
                { value: "98.7%", label: "Match Accuracy" },
                { value: "<100ms", label: "Query Time" },
                { value: "47", label: "Countries Tracked" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-secondary-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Technical Capabilities</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                "Perceptual hashing resistant to compression, cropping, and color adjustments",
                "Multi-modal analysis combining visual, audio, and temporal patterns",
                "Real-time streaming analysis without video storage",
                "Cross-reference with SCAMZY network intelligence",
                "Automatic submission of new scam videos to global database",
                "Integration with LiveFaceSeal for combined authenticity scoring",
                "API access for enterprise and platform deployments",
                "Privacy-preserving hashing that cannot reconstruct original video",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Part of the Authenticity Suite</h2>
              <p className="text-muted-foreground mb-8">
                Fake Video Hash Tracker works alongside our other authenticity modules for comprehensive caller verification.
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { name: "LiveFaceSeal™", href: "/modules/livefaceseal" },
                  { name: "VoiceMatchSeal™", href: "/modules/voicematchseal" },
                  { name: "SceneSeal™", href: "/modules/sceneseal" },
                  { name: "CamViguard™", href: "/modules/camviguard" },
                ].map((module) => (
                  <Link key={module.name} href={module.href}>
                    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors">
                      <span className="font-semibold text-primary text-sm">{module.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Stop Deepfakes Before They Cause Harm</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              The same fake videos are used in thousands of scams. Our hash database identifies them instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/select-account-type">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Get Protected <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/modules">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  View All Modules
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
