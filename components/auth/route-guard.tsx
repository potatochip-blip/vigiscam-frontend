"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth, roleRoutePrefixes, type UserRole } from "@/lib/auth-context"
import { Loader2, ShieldAlert, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

// Routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/select-account-type",
  "/forgot-password",
  "/reset-password",
  // Marketing / platform
  "/platform",
  "/how-it-works",
  "/modules",
  "/pricing",
  "/demo",
  "/features",
  "/resources",
  "/evidence-vault",
  "/report",
  "/partners",
  "/accessibility",
  "/sitemap",
  "/cookies",
  "/gdpr",
  // Solutions
  "/solutions",
  // Scam types
  "/scam-types",
  // Scam Intelligence (all public)
  "/scam-intelligence",
  // Trust Center (all public)
  "/trust-center",
  // Legal
  "/terms",
  "/privacy",
  "/security",
  // Company
  "/company",
  "/about",
  "/contact",
  "/careers",
  "/blog",
]

// Check if a path starts with any of the public routes
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => {
    if (route === "/") return pathname === "/"
    return pathname === route || pathname.startsWith(route + "/")
  })
}

// Get the role that owns a given path
function getPathRole(pathname: string): UserRole | null {
  for (const [role, prefixes] of Object.entries(roleRoutePrefixes)) {
    if (prefixes.some(prefix => pathname.startsWith(prefix))) {
      return role as UserRole
    }
  }
  return null
}

interface RouteGuardProps {
  children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { user, isAuthenticated, isLoading, getDashboardPath } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    // Don't check auth while loading
    if (isLoading) return

    // Public routes are always accessible
    if (isPublicRoute(pathname)) {
      setAuthorized(true)
      setAccessDenied(false)
      return
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
      setAuthorized(false)
      setAccessDenied(false)
      router.push("/login")
      return
    }

    // Check if user has access to this path
    const pathRole = getPathRole(pathname)
    
    if (pathRole && pathRole !== user.role) {
      // User is trying to access a route they don't have permission for
      setAuthorized(false)
      setAccessDenied(true)
      return
    }

    // User is authorized
    setAuthorized(true)
    setAccessDenied(false)
  }, [pathname, isAuthenticated, isLoading, user, router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show access denied page
  if (accessDenied && user) {
    const correctDashboard = getDashboardPath(user.role)
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Access Restricted</h1>
            <p className="text-muted-foreground">
              You don&apos;t have permission to access this area. This section requires a different access level.
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Your access level:</strong>{" "}
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
            <p className="mt-1">
              <strong className="text-foreground">Requested area:</strong>{" "}
              {pathname}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => router.push(correctDashboard)}
              className="flex-1 gap-2"
            >
              <Home className="h-4 w-4" />
              Go to My Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.back()}
              className="flex-1 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Need access to this area?{" "}
            <Link href="/company/contact" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </Card>
      </div>
    )
  }

  // If not authorized and not on a public route, show nothing (redirecting)
  if (!authorized && !isPublicRoute(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
