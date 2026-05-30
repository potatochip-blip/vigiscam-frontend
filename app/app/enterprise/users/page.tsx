'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Role, Edit, Trash2, Plus } from "lucide-react"

export default function EnterpriseUsersPage() {
  return (
    <PageLayout role="enterprise" title="User Management" subtitle="Manage users, permissions, and team access">
      <div className="space-y-6">
        <Button className="gap-2"><Plus className="h-4 w-4" /> Invite User</Button>
        {[
          { id: "USR-001", name: "Alice Chen", email: "alice.chen@company.com", role: "Admin", dept: "Risk Mgmt", status: "Active" },
          { id: "USR-002", name: "Bob Martinez", email: "bob.martinez@company.com", role: "Manager", dept: "Fraud Ops", status: "Active" },
          { id: "USR-003", name: "Carol Williams", email: "carol.williams@company.com", role: "Analyst", dept: "Compliance", status: "Active" },
        ].map((user) => (
          <Card key={user.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{user.name}</h3>
                <p className="text-xs text-muted-foreground">{user.email} · {user.dept}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{user.role}</Badge>
                <Badge className="bg-green-100 text-green-700 border-0">{user.status}</Badge>
                <Button size="sm" variant="outline" className="gap-1"><Edit className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline" className="gap-1"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
