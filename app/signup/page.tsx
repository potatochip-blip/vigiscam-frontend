import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { SignupForm } from "@/components/auth/signup-form"
import { VigiscamLogo } from "@/components/vigiscam-logo"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <Link href="/">
          <VigiscamLogo size="sm" variant="full" inverted />
        </Link>

        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-primary-foreground text-balance">
            Start protecting what matters most.
          </h1>
          <p className="text-lg text-primary-foreground/80 text-pretty">
            Join over 2 million users and 500+ financial institutions who trust VIGISCAM™ to protect against sophisticated scams and fraud.
          </p>
          
          <div className="space-y-3">
            {[
              "14-day free trial, no credit card required",
              "Real-time AI protection from day one",
              "Role-specific dashboards and tools",
              "Enterprise-grade security and compliance",
              "Cancel anytime, no questions asked",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-primary-foreground/90">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-primary-foreground/60">
            Trusted by banks, telecom providers, and families worldwide.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-primary-foreground/60">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              All systems operational
            </div>
            <span className="text-xs text-primary-foreground/40">|</span>
            <span className="text-xs text-primary-foreground/60">SOC 2 Type II Certified</span>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-8">
          <Link href="/" className="lg:hidden flex justify-center mb-8">
            <VigiscamLogo size="sm" variant="full" />
          </Link>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
            <p className="text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <SignupForm />
        </div>
      </div>
    </div>
  )
}
