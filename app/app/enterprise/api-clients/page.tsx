'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Key, Plus, Edit } from "lucide-react"

export default function EnterpriseAPIClientsPage() {
  return (
    <PageLayout role="enterprise" title="API Clients" subtitle="Manage API keys and application integrations">
      <div className="space-y-6">
        <Button className="gap-2"><Plus className="h-4 w-4" /> New API Client</Button>
        {[
          { id: "CLI-001", name: "Mobile App v2.1", status: "Active", requests: "1.2M", lastActive: "Now" },
          { id: "CLI-002", name: "Dashboard Integration", status: "Active", requests: "856K", lastActive: "2 min ago" },
          { id: "CLI-003", name: "Legacy System", status: "Deprecated", requests: "12K", lastActive: "3 days ago" },
        ].map((client) => (
          <Card key={client.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Key className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{client.name}</h3>
                  <Badge className={client.status === "Active" ? "bg-green-100 text-green-700 border-0" : "bg-gray-100 text-gray-700 border-0"}>{client.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{client.requests} requests · Last active {client.lastActive}</p>
              </div>
              <Button size="sm" variant="outline" className="gap-1"><Edit className="h-3 w-3" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
