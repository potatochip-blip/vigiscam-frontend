import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Role-to-allowed-prefix mapping — must match auth-context.ts roleRoutePrefixes
const ROLE_PREFIXES: Record<string, string[]> = {
  individual: ["/app/individual"],
  family: ["/app/family"],
  bankguard: ["/app/bankguard"],
  platformshield: ["/app/platformshield"],
  investigator: ["/app/investigator", "/app/intelligence"],
  agency: ["/app/agency"],
  enterprise: ["/app/enterprise"],
  admin: ["/admin", "/app/intelligence"],
}

const ROLE_DASHBOARD: Record<string, string> = {
  individual: "/app/individual/overview",
  family: "/app/family/overview",
  bankguard: "/app/bankguard/overview",
  platformshield: "/app/platformshield/overview",
  investigator: "/app/investigator/overview",
  agency: "/app/agency/overview",
  enterprise: "/app/enterprise/overview",
  admin: "/admin/overview",
}

// Protected route prefixes that require authentication
const PROTECTED_PREFIXES = ["/app/", "/admin/"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  if (!isProtected) return NextResponse.next()

  // Read the stored user from cookies (set by client-side localStorage via a cookie mirror)
  // For this demo app, we use a cookie-based check for SSR route protection
  const userCookie = request.cookies.get("vigiscam_role")
  const role = userCookie?.value

  // No session — redirect to login
  if (!role) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check role-to-route access
  const allowedPrefixes = ROLE_PREFIXES[role]
  if (!allowedPrefixes) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const canAccess = allowedPrefixes.some((prefix) => pathname.startsWith(prefix))
  if (!canAccess) {
    // Redirect to their own dashboard instead of a hard error
    const correctDashboard = ROLE_DASHBOARD[role] || "/login"
    return NextResponse.redirect(new URL(correctDashboard, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/app/:path*", "/admin/:path*"],
}
