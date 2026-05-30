'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Eye } from "lucide-react"

export default function EnterpriseAlertsPage() {
  return (
    <PageLayout role="enterprise" title="Security Alerts" subtitle="View and manage organization-wide security alerts">
      <div className="space-y-6">
        {[
          { id: "ALT-001", title: "Unusual Login From New Location", severity: "High", timestamp: "2 min ago", source: "Alice Chen", status: "Active" },
          { id: "ALT-002", title: "Multiple Failed Auth Attempts", severity: "Critical", timestamp: "15 min ago", source: "System", status: "Active" },
          { id: "ALT-003", title: "Suspicious Data Export", severity: "High", timestamp: "1 hour ago", source: "Bob Martinez", status: "Resolved" },
        ].map((alert) => (
          <Card key={alert.id} className="p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`h-4 w-4 mt-1 ${alert.severity === "Critical" ? "text-red-600" : "text-orange-600"}`} />
                <div>
                  <h3 className="font-bold text-foreground">{alert.title}</h3>
                  <p className="text-xs text-muted-foreground">{alert.source} · {alert.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={alert.severity === "Critical" ? "bg-red-500" : "bg-orange-500"}>{alert.severity}</Badge>
                <Badge className={alert.status === "Active" ? "bg-blue-100 text-blue-700 border-0" : "bg-green-100 text-green-700 border-0"}>{alert.status}</Badge>
              </div>
            </div>
            <div className="flex gap-2 mt-4"><Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" /> Investigate</Button></div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
