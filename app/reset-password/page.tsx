import Link from "next/link"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { VigiscamLogo } from "@/components/vigiscam-logo"

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <Link href="/" className="flex justify-center mb-8">
          <VigiscamLogo size="sm" variant="full" />
        </Link>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Set new password</h2>
          <p className="text-muted-foreground mt-2">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <ResetPasswordForm />

        <div className="text-center">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
