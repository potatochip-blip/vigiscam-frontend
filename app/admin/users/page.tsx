'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Loader2, AlertTriangle } from "lucide-react"
import { useAdminUsers } from "@/lib/hooks"

const ROLE_LABEL: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  REVIEWER: "Reviewer",
  COMPLIANCE_OFFICER: "Compliance",
  SUPPORT: "Support",
  INDIVIDUAL: "Individual",
  FAMILY_GUARDIAN: "Family Guardian",
  PROTECTED_USER: "Protected User",
  BANK_ADMIN: "Bank Admin",
  BANK_ANALYST: "Bank Analyst",
  PLATFORM_ADMIN: "Platform Admin",
  PLATFORM_MODERATOR: "Platform Moderator",
  INVESTIGATOR: "Investigator",
  AGENCY_ANALYST: "Agency Analyst",
  ENTERPRISE_ADMIN: "Enterprise Admin",
}

export default function AdminUsersPage() {
  const { data, isLoading, error } = useAdminUsers()
  const users = data ?? []

  return (
    <PageLayout role="admin" title="User Management" subtitle="Manage all system users and admin roles">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading users…
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600">
            <AlertTriangle className="h-5 w-5" /> Could not load users (reviewer access required).
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
            <Users className="h-8 w-8" />
            <p className="font-medium">No users yet</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">{users.length} account{users.length !== 1 ? "s" : ""}</p>
            {users.map((user) => (
              <Card key={user.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground">{user.fullName}</h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                      {user.lastLoginAt ? ` · last login ${new Date(user.lastLoginAt).toLocaleDateString()}` : " · never logged in"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {user.elderModeEnabled && <Badge className="bg-amber-100 text-amber-700 border-0">Elder Mode</Badge>}
                    <Badge variant={user.status === "ACTIVE" ? "outline" : "secondary"}>
                      {user.role ? (ROLE_LABEL[user.role] ?? user.role) : "—"}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </PageLayout>
  )
}
