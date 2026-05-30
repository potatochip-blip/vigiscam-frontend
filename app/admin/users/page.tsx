'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Edit, Trash2 } from "lucide-react"

export default function AdminUsersPage() {
  return (
    <PageLayout role="admin" title="User Management" subtitle="Manage all system users and admin roles">
      <div className="space-y-6">
        <Button className="gap-2"><Plus className="h-4 w-4" /> Create Admin User</Button>
        {[
          { id: "ADMIN-001", name: "System Administrator", email: "admin@freezeguard.io", role: "Super Admin", orgs: 892, lastLogin: "Now" },
          { id: "ADMIN-002", name: "Support Team Lead", email: "support@freezeguard.io", role: "Support Admin", orgs: 892, lastLogin: "5 min ago" },
          { id: "ADMIN-003", name: "Platform Engineer", email: "platform@freezeguard.io", role: "Tech Admin", orgs: 892, lastLogin: "1 hour ago" },
        ].map((user) => (
          <Card key={user.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{user.name}</h3>
                <p className="text-xs text-muted-foreground">{user.email} · {user.orgs} organizations</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{user.role}</Badge>
                <Button size="sm" variant="outline" className="gap-1"><Edit className="h-3 w-3" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
