'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, CheckCircle, Plus } from "lucide-react"

export default function EnterpriseIntegrationsPage() {
  return (
    <PageLayout role="enterprise" title="Integrations" subtitle="Connect third-party services and APIs">
      <div className="space-y-6">
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Integration</Button>
        {[
          { id: "INT-001", name: "Slack", status: "Connected", users: "892", lastSync: "2 min ago" },
          { id: "INT-002", name: "Microsoft Teams", status: "Connected", users: "745", lastSync: "5 min ago" },
          { id: "INT-003", name: "Salesforce", status: "Connected", users: "234", lastSync: "30 min ago" },
        ].map((integration) => (
          <Card key={integration.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{integration.name}</h3>
                  <Badge className="bg-green-100 text-green-700 border-0">{integration.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{integration.users} users · Synced {integration.lastSync}</p>
              </div>
              <Button size="sm" variant="outline">Manage</Button>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
