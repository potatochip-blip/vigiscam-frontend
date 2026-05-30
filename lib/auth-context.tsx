"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

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

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("vigiscam_user")
    const storedRole = localStorage.getItem("vigiscam_selected_role")
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("vigiscam_user")
      }
    }
    
    if (storedRole) {
      setSelectedRole(storedRole as UserRole)
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // For demo: use the selected role to determine which user to log in as
    const role = selectedRole || "individual"
    const demoUser = demoUsers[role]
    
    // Update demo user with provided email
    const loggedInUser: User = {
      ...demoUser,
      email: email || demoUser.email,
    }
    
    setUser(loggedInUser)
    localStorage.setItem("vigiscam_user", JSON.stringify(loggedInUser))
    // Mirror role to cookie so middleware can read it for SSR route guards
    document.cookie = `vigiscam_role=${loggedInUser.role}; path=/; max-age=2592000; SameSite=Lax`
    setIsLoading(false)
    
    return true
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const role = selectedRole || "individual"
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email,
      name,
      role,
      verified: false,
      onboardingComplete: false,
    }
    
    setUser(newUser)
    localStorage.setItem("vigiscam_user", JSON.stringify(newUser))
    document.cookie = `vigiscam_role=${newUser.role}; path=/; max-age=2592000; SameSite=Lax`
    setIsLoading(false)
    
    return true
  }

  const logout = () => {
    setUser(null)
    setSelectedRole(null)
    localStorage.removeItem("vigiscam_user")
    localStorage.removeItem("vigiscam_selected_role")
    // Clear role cookie
    document.cookie = "vigiscam_role=; path=/; max-age=0; SameSite=Lax"
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
