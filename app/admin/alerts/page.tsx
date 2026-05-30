'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

export default function AdminAlertsPage() {
  return (
    <PageLayout role="admin" title="System Alerts" subtitle="Platform-wide security and performance alerts">
      <div className="space-y-6">
        {[
          { id: "SALERT-001", title: "High CPU Usage on Database Server", severity: "High", timestamp: "2 min ago", status: "Active" },
          { id: "SALERT-002", title: "API Response Time Degradation", severity: "High", timestamp: "15 min ago", status: "Active" },
          { id: "SALERT-003", title: "Tenant License Expiration (7 days)", severity: "Medium", timestamp: "1 hour ago", status: "Active" },
        ].map((alert) => (
          <Card key={alert.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`h-4 w-4 mt-1 ${alert.severity === "High" ? "text-red-600" : "text-orange-600"}`} />
                <div>
                  <h3 className="font-bold text-foreground">{alert.title}</h3>
                  <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                </div>
              </div>
              <Badge className={alert.severity === "High" ? "bg-red-500" : "bg-orange-500"}>{alert.severity}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
