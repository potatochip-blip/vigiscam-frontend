import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Brain, Eye, Bell, FileText, Lock, Zap, Cpu, Smartphone, Cloud, Globe, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const mainFeatures = [
  {
    id: "remote-access",
    icon: Shield,
    title: "Remote Access Protection",
    description:
      "Our AI continuously monitors for unauthorized remote access attempts, detecting screen-sharing tools, remote desktop connections, and suspicious cursor movements.",
    capabilities: [
      "Real-time detection of AnyDesk, TeamViewer, and other remote tools",
      "Mouse movement pattern analysis to detect non-human control",
      "Automatic session blocking when threats detected",
      "Instant FreezeLock activation capability",
    ],
  },
  {
    id: "scam-detection",
    icon: Brain,
    title: "Scam Behavior Intelligence",
    description:
      "Advanced NLP models analyze conversations in real-time, identifying manipulation tactics, urgency pressure, and known scam scripts used by fraudsters.",
    capabilities: [
      "Real-time voice and text analysis",
      "Detection of 50+ known scam phrase patterns",
      "Urgency and pressure tactic recognition",
      "Emotional manipulation detection",
    ],
  },
  {
    id: "authenticity",
    icon: Eye,
    title: "Authenticity Verification",
    description:
      "Multi-layer verification system confirms the identity of callers using deepfake detection, voice biometrics, and scene analysis.",
    capabilities: [
      "Deepfake video detection with 99.7% accuracy",
      "Voice biometric matching against known contacts",
      "Scene authenticity analysis",
      "Caller ID verification and spoofing detection",
    ],
  },
  {
    id: "alerts",
    icon: Bell,
    title: "Real-Time Safety Alerts",
    description:
      "Customizable warning system that alerts users during suspicious activity and immediately notifies designated family members or contacts.",
    capabilities: [
      "In-call warning pop-ups",
      "Customizable alert thresholds",
      "Multi-channel family notifications (SMS, app, email)",
      "Escalation to authorities when configured",
    ],
  },
  {
    id: "forensics",
    icon: FileText,
    title: "Evidence & Forensics",
    description:
      "Secure, encrypted logging of all detected scam attempts for review, reporting to authorities, and potential legal proceedings.",
    capabilities: [
      "Encrypted session recording",
      "Tamper-proof evidence logs",
      "Easy export for law enforcement",
      "Historical pattern analysis",
    ],
  },
  {
    id: "freezelock",
    icon: Lock,
    title: "FreezeLock Emergency Mode",
    description:
      "One-tap emergency activation that immediately freezes all device activity, blocks ongoing scam attempts, and alerts your entire trusted network.",
    capabilities: [
      "Instant device lockdown",
      "All active connections terminated",
      "Emergency contact notification",
      "Location sharing with trusted contacts",
    ],
  },
]

const additionalFeatures = [
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Sub-50ms response time ensures threats are blocked before damage occurs.",
  },
  {
    icon: Cpu,
    title: "On-Device AI",
    description: "Privacy-first approach with AI processing happening locally on your device.",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Protection across all devices - desktop, mobile, and tablet.",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description: "Secure cloud backup of settings and trusted contacts across devices.",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Scam detection in 40+ languages for global protection.",
  },
  {
    icon: Users,
    title: "Family Dashboard",
    description: "Centralized monitoring for all protected family members.",
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section - DFPS style with navy banner */}
        <section className="bg-secondary py-4">
          <div className="container mx-auto px-4">
            <p className="text-secondary-foreground text-center font-medium">
              Comprehensive AI-powered protection for individuals and families
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="border-l-4 border-primary pl-4 mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">Advanced Protection Features</h1>
              <p className="text-lg text-muted-foreground">
                VIGISCAM™ combines multiple security layers powered by cutting-edge artificial intelligence to
                provide comprehensive protection against all forms of digital scams and fraud.
              </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {mainFeatures.map((feature, index) => (
                <div key={feature.id} id={feature.id} className="bg-card rounded-sm border border-border p-8">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <div className="h-14 w-14 rounded-sm bg-secondary flex items-center justify-center mb-6">
                        <feature.icon className="h-7 w-7 text-secondary-foreground" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4 text-primary">{feature.title}</h2>
                      <p className="text-muted-foreground mb-6">{feature.description}</p>
                      <ul className="space-y-3">
                        {feature.capabilities.map((capability, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <svg
                              className="h-5 w-5 text-success mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-foreground">{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1 w-full lg:w-auto">
                      <div className="aspect-video bg-muted rounded-sm border border-border overflow-hidden">
                        <img
                          src={`/.jpg?height=300&width=500&query=${feature.title} security dashboard`}
                          alt={`${feature.title} visualization`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="border-l-4 border-primary pl-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-2">More Powerful Features</h2>
              <p className="text-lg text-muted-foreground">
                Every aspect of VIGISCAM™ is designed to provide seamless, comprehensive protection.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <Card key={index} className="bg-card border-border rounded-sm">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-sm bg-secondary flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <CardTitle className="text-primary">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Ready to Get Protected?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Start your 14-day free trial today and experience the peace of mind that comes with AI-powered protection.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
