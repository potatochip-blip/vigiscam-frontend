import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { VigiscamLogo } from "@/components/vigiscam-logo"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <Link href="/" className="flex justify-center mb-8">
          <VigiscamLogo size="sm" variant="full" />
        </Link>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Reset your password</h2>
          <p className="text-muted-foreground mt-2">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <ForgotPasswordForm />

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
