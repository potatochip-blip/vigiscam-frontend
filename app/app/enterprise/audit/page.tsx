'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Eye } from "lucide-react"

export default function EnterpriseAuditPage() {
  return (
    <PageLayout role="enterprise" title="Audit Logs" subtitle="Track all system activity and user actions">
      <div className="space-y-6">
        {[
          { id: "LOG-001", action: "Policy Updated", user: "Alice Chen", timestamp: "Jan 14 09:30", resource: "Wire Transfer Limits", status: "Success" },
          { id: "LOG-002", action: "User Invited", user: "Alice Chen", timestamp: "Jan 14 08:15", resource: "Carol Williams", status: "Success" },
          { id: "LOG-003", action: "API Key Rotated", user: "Bob Martinez", timestamp: "Jan 13 16:45", resource: "Mobile App v2.1", status: "Success" },
        ].map((log) => (
          <Card key={log.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{log.action}</h3>
                  <Badge className="bg-green-100 text-green-700 border-0">{log.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{log.user} · {log.timestamp} · {log.resource}</p>
              </div>
              <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
