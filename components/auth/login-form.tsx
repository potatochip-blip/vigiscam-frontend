"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Loader2, ArrowLeft, Shield, Users, Landmark, Globe, Search, Building2, Briefcase, Lock, Heart } from "lucide-react"
import { useAuth, type UserRole } from "@/lib/auth-context"

const roleInfo: Record<UserRole, { label: string; icon: React.ElementType; color: string }> = {
  individual: { label: "Individual Guardian", icon: Shield, color: "bg-blue-100 text-blue-700" },
  family: { label: "Family Guardian", icon: Heart, color: "bg-green-100 text-green-700" },
  bankguard: { label: "BankGuard", icon: Landmark, color: "bg-amber-100 text-amber-700" },
  platformshield: { label: "PlatformShield", icon: Globe, color: "bg-purple-100 text-purple-700" },
  investigator: { label: "Investigator Console", icon: Search, color: "bg-orange-100 text-orange-700" },
  agency: { label: "Agency Console", icon: Building2, color: "bg-cyan-100 text-cyan-700" },
  enterprise: { label: "Enterprise Admin", icon: Briefcase, color: "bg-indigo-100 text-indigo-700" },
  admin: { label: "Internal Operations", icon: Lock, color: "bg-red-100 text-red-700" },
}

export function LoginForm() {
  const router = useRouter()
  const { selectedRole, login, getDashboardPath, setSelectedRole } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")

  const currentRole = selectedRole || "individual"
  const RoleIcon = roleInfo[currentRole].icon

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setNotice("")
    setIsLoading(true)

    try {
      const account = await login(formData.email, formData.password)
      if (!account) {
        setError("Invalid credentials. Please try again.")
        return
      }

      // Route by the account's REAL role — never the role picked in the UI.
      // If the user explicitly picked a different portal, flag the mismatch
      // before sending them to the dashboard their account actually grants.
      if (selectedRole && selectedRole !== account.role) {
        setNotice(
          `This is a ${roleInfo[account.role].label} account, not ${roleInfo[selectedRole].label}. ` +
            `Taking you to your ${roleInfo[account.role].label} dashboard.`,
        )
        setTimeout(() => router.push(getDashboardPath(account.role)), 1500)
        return
      }

      router.push(getDashboardPath(account.role))
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Selected Role Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Signing in as:</span>
          <Badge className={`${roleInfo[currentRole].color} border-0 gap-1.5`}>
            <RoleIcon className="h-3 w-3" />
            {roleInfo[currentRole].label}
          </Badge>
        </div>
        <Link 
          href="/select-account-type" 
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" />
          Change
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        {notice && (
          <div className="p-3 rounded-lg bg-amber-100 border border-amber-200 text-amber-800 text-sm">
            {notice}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-input"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="bg-input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.remember}
            onCheckedChange={(checked) => setFormData({ ...formData, remember: checked as boolean })}
          />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember me for 30 days
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" className="bg-transparent">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button type="button" variant="outline" className="bg-transparent">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            Apple
          </Button>
        </div>

        {/* Demo Quick Access */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-3">Demo: Quick access to any portal</p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {(Object.keys(roleInfo) as UserRole[]).map((role) => {
              const info = roleInfo[role]
              const Icon = info.icon
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                    currentRole === role 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{role === "platformshield" ? "Platform" : role === "investigator" ? "Invest." : role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </button>
              )
            })}
          </div>
        </div>
      </form>
    </div>
  )
}
