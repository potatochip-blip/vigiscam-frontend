import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Target, Heart, Users, Award, Globe } from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We never compromise on security. Every decision we make prioritizes the protection of our users.",
  },
  {
    icon: Heart,
    title: "Empathy",
    description:
      "We understand the emotional and financial devastation scams cause, driving us to do better every day.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description:
      "Protection should be available to everyone, regardless of technical expertise or financial situation.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously evolve our AI to stay ahead of emerging threats and scam techniques.",
  },
]

const stats = [
  { value: "2M+", label: "Users Protected" },
  { value: "$500M+", label: "Fraud Prevented" },
  { value: "50+", label: "Countries Served" },
  { value: "99.7%", label: "Detection Rate" },
]

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former AI researcher at Stanford, focused on using technology to protect vulnerable populations.",
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-Founder",
    bio: "15+ years in cybersecurity, previously led fraud detection at a major financial institution.",
  },
  {
    name: "Jennifer Williams",
    role: "Chief Security Officer",
    bio: "Former FBI cybercrime investigator with expertise in social engineering and fraud prevention.",
  },
  {
    name: "David Park",
    role: "VP of Engineering",
    bio: "Built scalable security systems at Google and Cloudflare before joining VIGISCAM™.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission: A Scam-Free World</h1>
              <p className="text-lg text-muted-foreground">
                VIGISCAM™ was founded with a simple belief: everyone deserves to be protected from digital threats,
                especially those most vulnerable to exploitation.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    VIGISCAM™ was born from personal experience. In 2021, our co-founder Sarah watched helplessly
                    as her elderly father lost his retirement savings to a sophisticated tech support scam. The scammers
                    had used remote access tools and psychological manipulation to drain his accounts in under an hour.
                  </p>
                  <p>
                    That experience sparked a mission: to build AI-powered protection that could have stopped that scam
                    before it succeeded. Together with co-founder Michael, Sarah assembled a team of security experts,
                    AI researchers, and fraud investigators to create VIGISCAM™.
                  </p>
                  <p>
                    Today, VIGISCAM™ protects over 2 million users across 50 countries, from individual families to
                    major financial institutions. We&apos;ve prevented over $500 million in fraud and continue to evolve
                    our technology to stay ahead of ever-changing scam tactics.
                  </p>
                </div>
              </div>
              <div className="aspect-video bg-card rounded-xl border border-border overflow-hidden">
                <img src="/diverse-team-working-together-technology-office.jpg" alt="VIGISCAM™ team" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do at VIGISCAM™.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-card border-border text-center">
                  <CardContent className="pt-6">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
              <p className="text-muted-foreground">Meet the experts behind VIGISCAM™</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="pt-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 overflow-hidden">
                      <img
                        src={`/professional-headshot.png?height=96&width=96&query=professional headshot ${member.name}`}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
              <p className="text-muted-foreground">Recognized by industry leaders for innovation in security</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {[
                "Best Security Innovation 2024",
                "Forbes AI 50",
                "Gartner Cool Vendor",
                "TechCrunch Disrupt Winner",
              ].map((award, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                  <Award className="h-6 w-6 text-primary" />
                  <span className="font-medium">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">Global Presence</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  VIGISCAM™ operates in 50+ countries, with offices in San Francisco, London, Singapore, and
                  Sydney. Our distributed team ensures 24/7 protection and support for users worldwide.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Headquarters: San Francisco, CA</li>
                  <li>EMEA Hub: London, UK</li>
                  <li>APAC Hub: Singapore</li>
                  <li>ANZ Hub: Sydney, Australia</li>
                </ul>
              </div>
              <div className="aspect-video bg-card rounded-xl border border-border overflow-hidden">
                <img src="/world-map-office-locations.png" alt="Global offices map" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you&apos;re looking to protect your family or join our team, we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/careers">
                <Button size="lg" variant="outline" className="bg-transparent">
                  View Open Positions
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
