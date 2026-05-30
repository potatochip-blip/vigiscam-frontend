'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Plus } from "lucide-react"

export default function AdminIntegrationsPage() {
  return (
    <PageLayout role="admin" title="Platform Integrations" subtitle="Manage third-party integrations and APIs">
      <div className="space-y-6">
        <Button className="gap-2"><Plus className="h-4 w-4" /> New Integration</Button>
        {[
          { id: "PINT-001", name: "FBI CISS API", status: "Connected", orgs: 234, uptime: "99.99%" },
          { id: "PINT-002", name: "Interpol I-24/7", status: "Connected", orgs: 156, uptime: "99.97%" },
          { id: "PINT-003", name: "IC3 Database", status: "Testing", orgs: 0, uptime: "—" },
        ].map((integration) => (
          <Card key={integration.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{integration.name}</h3>
                  <Badge className={integration.status === "Connected" ? "bg-green-100 text-green-700 border-0" : "bg-blue-100 text-blue-700 border-0"}>{integration.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{integration.orgs} organizations · {integration.uptime} uptime</p>
              </div>
              <Button size="sm" variant="outline">Configure</Button>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
