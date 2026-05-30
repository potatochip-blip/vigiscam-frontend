'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Plus } from "lucide-react"

export default function AdminTenantsPage() {
  return (
    <PageLayout role="admin" title="Tenant Management" subtitle="Create and manage enterprise tenants">
      <div className="space-y-6">
        <Button className="gap-2"><Plus className="h-4 w-4" /> Create Tenant</Button>
        {[
          { id: "TENANT-001", name: "Acme Corporation", users: 892, status: "Active", plan: "Enterprise Pro" },
          { id: "TENANT-002", name: "Global Bank Corp", users: 1245, status: "Active", plan: "Enterprise Max" },
          { id: "TENANT-003", name: "Tech Startup Inc", users: 45, status: "Trial", plan: "Starter" },
        ].map((tenant) => (
          <Card key={tenant.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{tenant.name}</h3>
                  <Badge className={tenant.status === "Active" ? "bg-green-100 text-green-700 border-0" : "bg-blue-100 text-blue-700 border-0"}>{tenant.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{tenant.users} users · {tenant.plan}</p>
              </div>
              <Button size="sm" variant="outline">Manage</Button>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
