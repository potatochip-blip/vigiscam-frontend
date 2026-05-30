'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Edit, Plus } from "lucide-react"

export default function EnterprisePoliciesPage() {
  return (
    <PageLayout role="enterprise" title="Security Policies" subtitle="Manage organization security and fraud prevention policies">
      <div className="space-y-6">
        <Button className="gap-2"><Plus className="h-4 w-4" /> Create Policy</Button>
        {[
          { id: "POL-001", name: "Wire Transfer Limits", type: "Transaction Control", status: "Active", users: 892 },
          { id: "POL-002", name: "Two-Factor Authentication", type: "Access Control", status: "Active", users: 892 },
          { id: "POL-003", name: "Suspicious Activity Alerts", type: "Monitoring", status: "Active", users: 745 },
        ].map((policy) => (
          <Card key={policy.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{policy.name}</h3>
                  <Badge className="bg-green-100 text-green-700 border-0">{policy.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{policy.type} · Applied to {policy.users} users</p>
              </div>
              <Button size="sm" variant="outline" className="gap-1"><Edit className="h-3 w-3" /> Edit</Button>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
