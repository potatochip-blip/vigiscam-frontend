'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Heart, Shield, Smartphone, Clock, AlertCircle, BarChart3, CheckCircle2 } from "lucide-react"

export default function FamiliesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <Badge className="bg-primary text-primary-foreground mb-6">Family Guardian</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Protect Your Loved Ones From Scams
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 text-pretty">
            Family Guardian enables you to monitor and protect vulnerable family members—especially elderly relatives—with real-time alerts and emergency intervention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/select-account-type?product=family-guardian">
              <Button size="lg" className="bg-primary text-primary-foreground">Start Protecting Family</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Family Plans</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">How Family Guardian Works</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              {[
                { icon: Smartphone, title: "One-Click Setup", desc: "Install on parent/grandparent device. No complex configuration needed." },
                { icon: Clock, title: "24/7 Real-Time Monitoring", desc: "FreezeGuard runs silently, always watching for scam signals." },
                { icon: AlertCircle, title: "Instant Family Alerts", desc: "Receive SMS, email, and push notifications immediately if threat detected." },
                { icon: Shield, title: "Emergency Intervention", desc: "With permission, remotely freeze device, end call, or block remote access." },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <feature.icon className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center min-h-80">
              <Users className="h-20 w-20 text-primary opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Family Roles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Protect Multiple Family Members</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { role: "Elderly Parent", desc: "Monitor for tech support, romance, and recovery scams targeting retirees." },
              { role: "Young Adult Child", desc: "Protect from dating, job offer, and AI-driven social engineering attacks." },
              { role: "Grandparent", desc: "Prevent gift card, wire transfer, and grandson emergency scams." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-3">{item.role}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Family Guardian Impact</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { stat: "2M+", label: "Protected Family Members" },
              { stat: "98.2%", label: "Scam Prevention Rate" },
              { stat: "< 4s", label: "Average Alert Time" },
              { stat: "$120M+", label: "Total Losses Prevented" },
            ].map((metric, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{metric.stat}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="font-bold text-foreground mb-4 text-lg">Respectful Privacy by Design</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />No spyware or location tracking</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />Only alerts on scam-specific signals</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />End-to-end encrypted alerts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />User maintains full device control</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Family Guardian Plans</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Personal Shield", price: "Free", features: ["Individual protection", "A1SCAMSHIELD™", "FreezeLock™", "Basic support"] },
              { name: "Family Guardian", price: "$9.99/mo", features: ["Monitor up to 5 family members", "All Authenticity Suite modules", "Emergency intervention", "Priority support"], best: true },
              { name: "ElderCare Plus", price: "$19.99/mo", features: ["Monitor up to 10 family members", "All modules + Investigator Console", "1-on-1 setup assistance", "24/7 phone support"] },
            ].map((plan, i) => (
              <div key={i} className={`rounded-lg p-8 border-2 transition-all ${plan.best ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                {plan.best && <Badge className="bg-primary text-primary-foreground mb-4">Most Popular</Badge>}
                <h3 className="font-bold text-lg text-foreground mb-2">{plan.name}</h3>
                <div className="text-2xl font-bold text-primary mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.best ? "default" : "outline"}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Protect Your Family Today</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Start with one family member and expand to protect your entire family.</p>
          <Link href="/select-account-type?product=family-guardian">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Start Family Guardian
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
