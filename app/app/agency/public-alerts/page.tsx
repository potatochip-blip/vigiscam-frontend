'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Eye, Download } from "lucide-react"

export default function PublicAlertsPage() {
  return (
    <PageLayout role="agency" title="Public Alerts & Advisories" subtitle="Publish fraud warnings to the public and media">
      <div className="space-y-6">
        {[
          {
            id: "ALERT-2024-001",
            title: "Critical Alert: Wire Fraud Ring Operating in 12 States",
            severity: "Critical",
            published: "Jan 14",
            views: 12400,
            status: "Active"
          },
          {
            id: "ALERT-2024-002",
            title: "Warning: Romance Scam Network Targets Seniors",
            severity: "High",
            published: "Jan 12",
            views: 8900,
            status: "Active"
          },
          {
            id: "ALERT-2024-003",
            title: "Advisory: Tech Support Fraud Surge During Tax Season",
            severity: "High",
            published: "Jan 8",
            views: 5600,
            status: "Active"
          },
        ].map((alert) => (
          <Card key={alert.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{alert.title}</h3>
                  <Badge className={alert.severity === "Critical" ? "bg-red-500" : "bg-orange-500"}>{alert.severity}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{alert.id}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" /> Preview</Button>
                <Button size="sm" variant="outline" className="gap-1"><Download className="h-3 w-3" /> Share</Button>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Published</p><p className="text-sm text-foreground">{alert.published}</p></div>
              <div><p className="text-xs text-muted-foreground">Public Views</p><p className="font-semibold text-foreground">{alert.views.toLocaleString()}</p></div>
              <div><p className="text-xs text-muted-foreground">Status</p><p className="font-semibold text-green-600">{alert.status}</p></div>
            </div>
          </Card>
        ))}
        <Button className="w-full">+ Create New Public Alert</Button>
      </div>
    </PageLayout>
  )
}
