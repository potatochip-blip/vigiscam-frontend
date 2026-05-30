"use client"

import { AuthProvider } from "@/lib/auth-context"
import { RouteGuard } from "@/components/auth/route-guard"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <RouteGuard>
        {children}
      </RouteGuard>
    </AuthProvider>
  )
}
