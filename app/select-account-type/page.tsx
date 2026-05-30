"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, Users, Building2, Globe, Search, Landmark, Briefcase, Lock, ArrowRight, CheckCircle2, Heart } from "lucide-react"
import { VigiscamLogo } from "@/components/vigiscam-logo"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth, type UserRole } from "@/lib/auth-context"

interface RoleOption {
  id: UserRole
  title: string
  subtitle: string
  description: string
  icon: React.ElementType
  features: string[]
  badge?: string
  badgeVariant?: "default" | "secondary" | "outline"
  requiresVerification?: boolean
  color: string
  bgColor: string
}

const roleOptions: RoleOption[] = [
  {
    id: "individual",
    title: "Protect Myself",
    subtitle: "Individual Guardian",
    description: "Personal protection against scams, fraud, and financial exploitation with real-time AI monitoring.",
    icon: Shield,
    features: ["Real-time scam detection", "Call & text monitoring", "Evidence vault", "Trusted contacts"],
    badge: "Free Trial",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "family",
    title: "Protect My Family",
    subtitle: "Family Guardian",
    description: "Monitor and protect vulnerable loved ones with consent-based oversight and instant alerts.",
    icon: Heart,
    features: ["Multi-member protection", "Guardian alerts", "Consent management", "Wellness check-ins"],
    badge: "Popular",
    badgeVariant: "default",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "bankguard",
    title: "BankGuard Access",
    subtitle: "Financial Institution Portal",
    description: "Enterprise fraud prevention for banks and credit unions with VictimState AI and Guardian Pause.",
    icon: Landmark,
    features: ["VictimState AI scoring", "Live risk queue", "Guardian Pause", "Regulatory compliance"],
    requiresVerification: true,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    id: "platformshield",
    title: "PlatformShield Access",
    subtitle: "Marketplace & Platform Portal",
    description: "Protect your platform users from grooming, fake support scams, and coordinated fraud rings.",
    icon: Globe,
    features: ["Grooming detection", "Scam ring analysis", "Content moderation", "User protection"],
    requiresVerification: true,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "investigator",
    title: "Investigator Console",
    subtitle: "Law Enforcement & Analysts",
    description: "Advanced investigation tools for fraud analysts, law enforcement, and cybercrime units.",
    icon: Search,
    features: ["Network graph analysis", "Entity linking", "Evidence packaging", "Takedown packets"],
    requiresVerification: true,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: "agency",
    title: "Agency Console",
    subtitle: "Government & Regulatory",
    description: "Regional fraud intelligence, public alert systems, and cross-agency coordination tools.",
    icon: Building2,
    features: ["Regional trends", "Public alerts", "Campaign management", "Cross-agency intel"],
    requiresVerification: true,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  {
    id: "enterprise",
    title: "Enterprise Admin",
    subtitle: "Organization Workspace",
    description: "Centralized administration for large organizations deploying VIGISCAM™ across teams.",
    icon: Briefcase,
    features: ["User management", "Policy controls", "SSO integration", "Audit logging"],
    requiresVerification: true,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    id: "admin",
    title: "Internal Operations",
    subtitle: "VIGISCAM Staff Only",
    description: "Internal administration console for VIGISCAM™ platform operations and support.",
    icon: Lock,
    features: ["Platform administration", "Tenant management", "Model oversight", "Support tools"],
    requiresVerification: true,
    badge: "Staff Only",
    badgeVariant: "outline",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
]

export default function SelectAccountTypePage() {
  const router = useRouter()
  const { setSelectedRole } = useAuth()

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <VigiscamLogo size="sm" variant="full" />
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">Already have an account?</span>
              <Link href="/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-0">Step 1 of 2</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose Your VIGISCAM™ Access Path
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Select the portal that matches your protection needs. Each environment is tailored to your role with specialized tools and capabilities.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roleOptions.map((option) => {
            const Icon = option.icon
            return (
              <Card
                key={option.id}
                onClick={() => handleRoleSelect(option.id)}
                className="relative p-6 cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-200 group bg-card border-2 border-border"
              >
                {/* Badge */}
                {option.badge && (
                  <Badge
                    variant={option.badgeVariant || "secondary"}
                    className={`absolute top-4 right-4 text-xs ${option.badgeVariant === "default" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    {option.badge}
                  </Badge>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${option.bgColor} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon className={`h-6 w-6 ${option.color}`} />
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-bold text-foreground mb-1">{option.title}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-3">{option.subtitle}</p>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {option.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-4">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Verification Notice */}
                {option.requiresVerification && (
                  <p className="text-xs text-muted-foreground/70 mb-4 flex items-center gap-1.5">
                    <Lock className="h-3 w-3" />
                    Requires verification
                  </p>
                )}

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all mt-auto pt-2">
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            )
          })}
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-6 py-4 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Not sure which portal is right for you?</span>
            <Link href="/company/contact" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              Talk to our team <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Protected by enterprise-grade encryption and AI security.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
