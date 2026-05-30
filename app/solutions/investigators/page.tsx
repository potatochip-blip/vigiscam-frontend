'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Network, Database, Eye, CheckCircle2, MapPin, TrendingUp, Users, FileText } from "lucide-react"

export default function InvestigatorsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <Badge className="bg-primary text-primary-foreground mb-6">Investigator Console</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Solve Scam Cases. Map Criminal Networks.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 text-pretty">
            The Investigator Console transforms raw scam data into actionable intelligence—linking cases, identifying actors, and building prosecution evidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/company/contact">
              <Button size="lg" className="bg-primary text-primary-foreground">Request Access</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Tools */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Investigator Console Tools</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Network, title: "Network Graph Visualization", desc: "Interactive graph showing connections between scammers, victims, accounts, wallets, and devices across time." },
              { icon: Database, title: "Case Repository", desc: "Search, filter, and link similar scam incidents by pattern, script, actor behavior, or geography." },
              { icon: Eye, title: "Entity Linking", desc: "SCAMZY™ automatically connects phone numbers, emails, wallets, payment methods, and IP addresses." },
              { icon: FileText, title: "Takedown Packet Generator", desc: "Automatically compile evidence, network diagrams, and witness statements into prosecution briefings." },
            ].map((tool, i) => (
              <div key={i} className="flex gap-4">
                <tool.icon className="h-8 w-8 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Investigator Use Cases</h2>
          <div className="space-y-6">
            {[
              { use: "Cold Case Review", desc: "Link unsolved scam incidents to active criminal networks, uncovering connections missed in initial investigation." },
              { use: "Network Mapping", desc: "Visualize the full criminal enterprise—from victims to money launderers to kingpins—in one graph." },
              { use: "International Cooperation", desc: "Share anonymized network intelligence with law enforcement partners across countries." },
              { use: "Asset Tracing", desc: "Follow stolen funds through cryptocurrency wallets, money mule accounts, and shell companies." },
              { use: "Prosecution Support", desc: "Generate court-ready evidence packets with chain-of-custody documentation and expert testimony." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-card border border-border rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.use}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Works With Your Systems</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {["FBI VCAC", "Interpol", "Regional Police", "CyberTipline", "IC3", "Secret Service", "Financial Task Force", "Fraud Bureau"].map((agency) => (
              <div key={agency} className="bg-card border border-border rounded-lg p-4 text-center text-sm font-medium text-foreground">
                {agency}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Investigation Impact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, stat: "3.2x", label: "Higher case resolution rate with network mapping" },
              { icon: Users, stat: "12x", label: "Faster actor identification across networks" },
              { icon: MapPin, stat: "40+", label: "Countries covered by SCAMZY™ intelligence" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{item.stat}</div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detailed */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Real-Time Case Dashboard", items: ["Active investigations", "Case status tracking", "Resource allocation", "Team collaboration"] },
              { title: "Advanced Search", items: ["Full-text case search", "Phone/email/wallet queries", "Geographic filtering", "Temporal analysis"] },
              { title: "Network Intelligence", items: ["Actor profiles", "Link analysis", "Behavioral clustering", "Predictive mapping"] },
              { title: "Evidence Management", items: ["Encrypted vault", "Chain of custody", "Export formats", "Legal certifications"] },
            ].map((feature, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Equip Your Investigation Team</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">The Investigator Console transforms fragmented case data into prosecutable intelligence.</p>
          <Link href="/company/contact">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Request Console Access
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
