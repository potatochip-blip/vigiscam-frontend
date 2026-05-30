'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClipboardList } from "lucide-react"

export default function AdminAuditLogsPage() {
  return (
    <PageLayout role="admin" title="Audit Logs" subtitle="System-wide audit trail and change history">
      <div className="space-y-6">
        {[
          { id: "SYS-LOG-001", action: "Tenant Created", admin: "System Administrator", timestamp: "Jan 14 09:30", resource: "Acme Corp", status: "Success" },
          { id: "SYS-LOG-002", action: "Model Deployed", admin: "Platform Engineer", timestamp: "Jan 14 08:15", resource: "VictimState AI™ v4.2", status: "Success" },
          { id: "SYS-LOG-003", action: "Database Backup", admin: "System", timestamp: "Jan 14 04:00", resource: "Production DB", status: "Success" },
        ].map((log) => (
          <Card key={log.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{log.action}</h3>
                  <Badge className="bg-green-100 text-green-700 border-0">{log.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{log.admin} · {log.timestamp} · {log.resource}</p>
              </div>
              <Button size="sm" variant="outline">Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
