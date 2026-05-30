'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Zap, Heart } from "lucide-react"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-primary text-primary-foreground mb-4">Careers</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Join the Mission to Stop Scams
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              We&apos;re building the AI that fights fraud at scale. Join a team of experts dedicated to protecting people.
            </p>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Why VIGISCAM™</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Impact",
                desc: "Your work directly protects millions of people from fraud",
              },
              {
                icon: Users,
                title: "Team",
                desc: "Work with fraud experts, AI researchers, and security specialists",
              },
              {
                icon: Heart,
                title: "Culture",
                desc: "Remote-first, flexible, and mission-driven team environment",
              },
              {
                icon: Briefcase,
                title: "Growth",
                desc: "Competitive compensation, equity, and career development",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <item.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Open Positions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                role: "Senior AI/ML Engineer",
                team: "Engineering",
                location: "Remote",
                type: "Full-time",
              },
              {
                role: "Fraud Detection Researcher",
                team: "Research",
                location: "Remote or SF",
                type: "Full-time",
              },
              {
                role: "Security Engineer",
                team: "Security",
                location: "Remote",
                type: "Full-time",
              },
              {
                role: "Product Manager, Consumer",
                team: "Product",
                location: "Remote or SF",
                type: "Full-time",
              },
              {
                role: "Sales Engineer (Enterprise)",
                team: "Sales",
                location: "Remote or SF",
                type: "Full-time",
              },
              {
                role: "Support Specialist (24/7)",
                team: "Support",
                location: "Remote",
                type: "Full-time",
              },
            ].map((job, i) => (
              <Link key={i} href="#" className="block">
                <div className="bg-card border border-border hover:border-primary rounded-lg p-6 transition-all hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-foreground mb-2">{job.role}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-transparent text-xs">{job.team}</Badge>
                        <Badge variant="outline" className="bg-transparent text-xs">{job.location}</Badge>
                        <Badge variant="outline" className="bg-transparent text-xs">{job.type}</Badge>
                      </div>
                    </div>
                    <span className="text-primary text-sm font-medium">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Perks & Benefits</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                category: "Compensation",
                items: ["Competitive salary", "Equity options", "Annual performance bonus", "401(k) matching"],
              },
              {
                category: "Health & Wellness",
                items: ["Medical, dental, vision", "Mental health support", "Gym membership", "Wellness stipend"],
              },
              {
                category: "Time Off",
                items: ["Unlimited PTO", "12 company holidays", "Parental leave (16+ weeks)", "sabbaticals"],
              },
              {
                category: "Work & Flexibility",
                items: ["Remote-first", "Flexible hours", "Home office stipend", "Professional development"],
              },
            ].map((benefit, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4">{benefit.category}</h3>
                <ul className="space-y-2">
                  {benefit.items.map((item, j) => (
                    <li key={j} className="text-muted-foreground text-sm flex items-center gap-2">
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

      {/* Diversity */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">We Are Committed to Diversity</h2>
            <p className="text-lg text-muted-foreground mb-8">
              VIGISCAM™ is an equal opportunity employer. We celebrate diversity and are dedicated to creating an inclusive environment for all employees.
            </p>
            <p className="text-muted-foreground">
              We actively encourage applications from people of all backgrounds, including women, people of color, LGBTQ+ individuals, people with disabilities, and veterans.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Ready to Make an Impact?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Check out our open positions and apply today.</p>
          <a href="mailto:careers@vigiscam.ai">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              View All Jobs
            </Button>
          </a>
        </div>
      </section>
    </div>
  )
}
