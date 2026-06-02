"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { setAuthToken } from "@/lib/backend"

export type UserRole =
  | "individual"
  | "family"
  | "bankguard"
  | "platformshield"
  | "investigator"
  | "agency"
  | "enterprise"
  | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  /** The backend tenant this session is scoped to (FE-3). */
  tenantId?: string
  organization?: string
  avatar?: string
  verified: boolean
  onboardingComplete: boolean
}

interface AuthContextType {
  user: User | null
  selectedRole: UserRole | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  setSelectedRole: (role: UserRole) => void
  switchDemoRole: (role: UserRole) => void
  getDashboardPath: (role: UserRole) => string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for each role
const demoUsers: Record<UserRole, User> = {
  individual: {
    id: "usr_ind_001",
    email: "john.smith@email.com",
    name: "John Smith",
    role: "individual",
    verified: true,
    onboardingComplete: true,
  },
  family: {
    id: "usr_fam_001",
    email: "sarah.guardian@email.com",
    name: "Sarah Guardian",
    role: "family",
    verified: true,
    onboardingComplete: true,
  },
  bankguard: {
    id: "usr_bank_001",
    email: "l.reyes@firstnational.com",
    name: "Linda Reyes",
    role: "bankguard",
    organization: "First National Bank",
    verified: true,
    onboardingComplete: true,
  },
  platformshield: {
    id: "usr_plat_001",
    email: "m.chen@marketplace.io",
    name: "Michael Chen",
    role: "platformshield",
    organization: "SafeMarket Inc.",
    verified: true,
    onboardingComplete: true,
  },
  investigator: {
    id: "usr_inv_001",
    email: "j.torres@cybercrime.gov",
    name: "James Torres",
    role: "investigator",
    organization: "Cyber Crime Division",
    verified: true,
    onboardingComplete: true,
  },
  agency: {
    id: "usr_agency_001",
    email: "d.williams@ftc.gov",
    name: "Diana Williams",
    role: "agency",
    organization: "Federal Trade Commission",
    verified: true,
    onboardingComplete: true,
  },
  enterprise: {
    id: "usr_ent_001",
    email: "r.johnson@megacorp.com",
    name: "Robert Johnson",
    role: "enterprise",
    organization: "MegaCorp International",
    verified: true,
    onboardingComplete: true,
  },
  admin: {
    id: "usr_admin_001",
    email: "admin@vigiscam.com",
    name: "VIGISCAM Admin",
    role: "admin",
    organization: "VIGISCAM™",
    verified: true,
    onboardingComplete: true,
  },
}

// Role to dashboard path mapping
const roleDashboardPaths: Record<UserRole, string> = {
  individual: "/app/individual/overview",
  family: "/app/family/overview",
  bankguard: "/app/bankguard/overview",
  platformshield: "/app/platformshield/overview",
  investigator: "/app/investigator/overview",
  agency: "/app/agency/overview",
  enterprise: "/app/enterprise/overview",
  admin: "/admin/overview",
}

// Role route prefixes for access control
export const roleRoutePrefixes: Record<UserRole, string[]> = {
  individual: ["/app/individual"],
  family: ["/app/family"],
  bankguard: ["/app/bankguard"],
  platformshield: ["/app/platformshield"],
  investigator: ["/app/investigator", "/app/intelligence"],
  agency: ["/app/agency"],
  enterprise: ["/app/enterprise"],
  admin: ["/admin", "/app/intelligence"],
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Restore the session on mount by re-minting an access token from the
  // httpOnly refresh cookie. Tokens are never read from localStorage — only
  // the non-sensitive selected-role preference is.
  useEffect(() => {
    const storedRole = localStorage.getItem("vigiscam_selected_role")
    if (storedRole) {
      setSelectedRole(storedRole as UserRole)
    }

    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/api/auth/refresh", { method: "POST" })
        if (!cancelled && res.ok) {
          const data = (await res.json()) as {
            user: User
            accessToken: string
          }
          setUser(data.user)
          setAuthToken(data.accessToken)
        } else if (!cancelled) {
          setAuthToken(null)
        }
      } catch {
        if (!cancelled) setAuthToken(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) return false
      const data = (await res.json()) as { user: User; accessToken: string }
      setUser(data.user)
      setAuthToken(data.accessToken)
      // The httpOnly refresh cookie + readable role cookie are set by the
      // route handler — nothing token-related touches localStorage.
      return true
    } catch {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })
      if (!res.ok) return false
      const data = (await res.json()) as { user: User; accessToken: string }
      setUser(data.user)
      setAuthToken(data.accessToken)
      return true
    } catch {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Fire-and-forget the server-side revocation + cookie clear, then reset
    // local state immediately so the UI never blocks on the network.
    void fetch("/api/auth/logout", { method: "POST" }).catch(() => {})
    setUser(null)
    setSelectedRole(null)
    setAuthToken(null)
    localStorage.removeItem("vigiscam_selected_role")
    router.push("/login")
  }

  const handleSetSelectedRole = (role: UserRole) => {
    setSelectedRole(role)
    localStorage.setItem("vigiscam_selected_role", role)
  }

  const switchDemoRole = (role: UserRole) => {
    const demoUser = demoUsers[role]
    setUser(demoUser)
    setSelectedRole(role)
    localStorage.setItem("vigiscam_user", JSON.stringify(demoUser))
    localStorage.setItem("vigiscam_selected_role", role)
    document.cookie = `vigiscam_role=${role}; path=/; max-age=2592000; SameSite=Lax`
    router.push(roleDashboardPaths[role])
  }

  const getDashboardPath = (role: UserRole): string => {
    return roleDashboardPaths[role]
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        selectedRole,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        setSelectedRole: handleSetSelectedRole,
        switchDemoRole,
        getDashboardPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Hook to check if user can access a specific route
export function useRouteAccess(pathname: string): { canAccess: boolean; redirectPath: string } {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated || !user) {
    return { canAccess: false, redirectPath: "/login" }
  }
  
  const allowedPrefixes = roleRoutePrefixes[user.role]
  const canAccess = allowedPrefixes.some((prefix) => pathname.startsWith(prefix))
  
  return {
    canAccess,
    redirectPath: roleDashboardPaths[user.role],
  }
}
