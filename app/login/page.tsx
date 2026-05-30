import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { VigiscamLogo } from "@/components/vigiscam-logo"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <Link href="/">
          <VigiscamLogo size="sm" variant="full" inverted />
        </Link>

        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-primary-foreground text-balance">
            Welcome back to the VIGISCAM™ Platform.
          </h1>
          <p className="text-lg text-primary-foreground/80 text-pretty">
            Access your protection dashboard to monitor alerts, manage settings, and keep your organization safe from scams and fraud.
          </p>
          
          <div className="space-y-3">
            {[
              "Real-time fraud detection and prevention",
              "AI-powered scam analysis and alerting",
              "Multi-role access control and compliance",
              "Enterprise-grade security and encryption",
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
            Protected by enterprise-grade encryption and AI security.
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
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <Link href="/" className="lg:hidden flex justify-center mb-8">
            <VigiscamLogo size="sm" variant="full" />
          </Link>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-foreground">Sign in to your account</h2>
            <p className="text-muted-foreground mt-2">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Start free trial
              </Link>
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
