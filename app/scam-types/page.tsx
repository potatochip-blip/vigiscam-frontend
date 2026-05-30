'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertCircle, TrendingUp, Users, Globe, DollarSign, Shield, CreditCard, Heart, RefreshCw, Lock, Video, Monitor, FileText, ArrowRight } from "lucide-react"

const scamTypes = [
  {
    name: "Tech Support Scams",
    slug: "tech-support",
    icon: <Monitor className="h-6 w-6" />,
    desc: "Fake support calls claiming your device has a virus or issue",
    tactics: ["Pop-up warnings", "Fake caller ID", "Remote access requests", "Payment demands"],
    victims: "All ages, especially 65+",
    cost: "$800-15,000",
    detected: "99.2%",
    color: "bg-red-500",
  },
  {
    name: "Bank Impersonation",
    slug: "bank-impersonation",
    icon: <Shield className="h-6 w-6" />,
    desc: "Scammers pose as bank fraud department to steal credentials",
    tactics: ["Spoofed caller ID", "Urgency tactics", "Fake fraud alerts", "Transfer requests"],
    victims: "All banking customers",
    cost: "$5,000-100,000+",
    detected: "98.9%",
    color: "bg-blue-600",
  },
  {
    name: "Romance Scams",
    slug: "romance",
    icon: <Heart className="h-6 w-6" />,
    desc: "Fraudsters pose as romantic interests to extract money",
    tactics: ["Fake profiles", "Emotional manipulation", "Emergency stories", "Wire transfer requests"],
    victims: "Ages 40-70, divorced/widowed",
    cost: "$5,000-100,000+",
    detected: "98.7%",
    color: "bg-pink-500",
  },
  {
    name: "Recovery Scams",
    slug: "recovery",
    icon: <RefreshCw className="h-6 w-6" />,
    desc: "Targeting prior scam victims with fake recovery services",
    tactics: ["False promises", "Upfront fees", "Government impersonation", "Victim list sales"],
    victims: "Prior scam victims",
    cost: "$2,000-50,000",
    detected: "99.1%",
    color: "bg-purple-500",
  },
  {
    name: "Sextortion",
    slug: "sextortion",
    icon: <Lock className="h-6 w-6" />,
    desc: "Blackmail threats using intimate images or fake claims",
    tactics: ["Email bluffs", "Real content theft", "AI deepfakes", "Escalating demands"],
    victims: "Teens and adults",
    cost: "$500-10,000",
    detected: "97.5%",
    color: "bg-gray-700",
  },
  {
    name: "Gift Card Scams",
    slug: "gift-card",
    icon: <CreditCard className="h-6 w-6" />,
    desc: "Demanding payment via untraceable gift cards",
    tactics: ["IRS impersonation", "Urgency pressure", "Stay on line tactics", "Code requests"],
    victims: "All ages, especially elderly",
    cost: "$500-5,000",
    detected: "99.4%",
    color: "bg-green-600",
  },
  {
    name: "Cryptocurrency Scams",
    slug: "crypto",
    icon: <TrendingUp className="h-6 w-6" />,
    desc: "Pig butchering, fake exchanges, and crypto investment fraud",
    tactics: ["Fake platforms", "Guaranteed returns", "Relationship building", "Withdrawal fees"],
    victims: "Ages 25-60",
    cost: "$10,000-1,000,000+",
    detected: "96.5%",
    color: "bg-orange-500",
  },
  {
    name: "Remote Access Scams",
    slug: "remote-access",
    icon: <Globe className="h-6 w-6" />,
    desc: "Tricking victims into granting control of their devices",
    tactics: ["Software downloads", "Screen control", "Credential theft", "Malware installation"],
    victims: "All ages, tech-unfamiliar",
    cost: "$1,000-50,000",
    detected: "99.6%",
    color: "bg-yellow-600",
  },
  {
    name: "Deepfake Impersonation",
    slug: "deepfake-impersonation",
    icon: <Video className="h-6 w-6" />,
    desc: "AI-generated video and voice clones for impersonation",
    tactics: ["Video call fakes", "Voice cloning", "Executive fraud", "Family emergency"],
    victims: "Businesses, families",
    cost: "$25,000-25,000,000",
    detected: "94.8%",
    color: "bg-indigo-600",
  },
  {
    name: "Check Fraud & Carding",
    slug: "check-fraud-carding",
    icon: <FileText className="h-6 w-6" />,
    desc: "Fake checks, overpayment scams, and stolen card fraud",
    tactics: ["Overpayment", "Check washing", "Money mules", "Fake employment"],
    victims: "Online sellers, job seekers",
    cost: "$1,000-50,000",
    detected: "97.2%",
    color: "bg-teal-600",
  },
]

export default function ScamTypesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="bg-primary text-primary-foreground mb-4">Scam Intelligence Library</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Know Your Enemy
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Understanding scam types is the first step to protection. Learn the tactics criminals use and how VIGISCAM™ stops them.
              </p>
            </div>
          </div>
        </section>

        {/* Scam Type Grid */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {scamTypes.map((scam, i) => (
                <Link key={i} href={`/scam-types/${scam.slug}`}>
                  <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition-all h-full">
                    <div className={`${scam.color} h-2 w-full`}></div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`${scam.color} text-white h-10 w-10 rounded-lg flex items-center justify-center`}>
                          {scam.icon}
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{scam.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{scam.desc}</p>
                      
                      <div className="space-y-3 text-xs mb-4">
                        <div>
                          <p className="font-semibold text-foreground mb-1">Common Tactics:</p>
                          <ul className="space-y-1">
                            {scam.tactics.map((tactic, j) => (
                              <li key={j} className="text-muted-foreground flex gap-2">
                                <span>•</span> {tactic}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-2 border-t border-border">
                          <p className="text-muted-foreground"><span className="font-semibold text-foreground">Primary Victims:</span> {scam.victims}</p>
                          <p className="text-muted-foreground"><span className="font-semibold text-foreground">Avg Loss:</span> {scam.cost}</p>
                          <p className="text-primary"><span className="font-semibold">FreezeGuard Detection:</span> {scam.detected}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-primary text-sm font-medium">
                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Protection Strategy */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">How FreezeGuard Protects Against All Scam Types</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1. Identify",
                  desc: "A1SCAMSHIELD™ identifies manipulation signals and scam scripts in real-time across all communication channels",
                },
                {
                  step: "2. Alert",
                  desc: "You and your trusted contacts are immediately warned before money or data is compromised",
                },
                {
                  step: "3. Intervene",
                  desc: "FreezeLock™ stops the attack, terminates sessions, and preserves evidence for authorities",
                },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                  <Badge className="bg-primary text-primary-foreground mb-4">{item.step}</Badge>
                  <p className="text-muted-foreground">{item.desc}</p>
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
                { value: "10B+", label: "Lost to scams annually (US)" },
                { value: "98.2%", label: "Average detection rate" },
                { value: "2.4M+", label: "Users protected" },
                { value: "<3sec", label: "Intervention time" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-secondary-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Stop Scams Before They Start</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get real-time protection against all major scam types with VIGISCAM™.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Start Free Protection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
