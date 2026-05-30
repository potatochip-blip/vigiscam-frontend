'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Network, Zap, Share2 } from "lucide-react"

export default function NetworkIntelligencePage() {
  return (
    <PageLayout role="agency" title="Network Intelligence" subtitle="Real-time threat intelligence across partner networks">
      <div className="space-y-6">
        {[
          {
            id: "INT-2024-001",
            threat: "Wire Fraud Network Alpha",
            severity: "Critical",
            discovered: "Jan 14",
            agencies: 8,
            status: "Coordinating"
          },
          {
            id: "INT-2024-002",
            threat: "International Romance Scam Syndicate",
            severity: "High",
            discovered: "Jan 12",
            agencies: 5,
            status: "Investigating"
          },
          {
            id: "INT-2024-003",
            threat: "Tech Support Fraud Cluster",
            severity: "High",
            discovered: "Jan 10",
            agencies: 12,
            status: "Takedown"
          },
        ].map((intel) => (
          <Card key={intel.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Network className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{intel.threat}</h3>
                  <Badge className={intel.severity === "Critical" ? "bg-red-500" : "bg-orange-500"}>{intel.severity}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{intel.id}</p>
              </div>
              <Button size="sm" className="gap-1"><Share2 className="h-3 w-3" /> Share Intel</Button>
            </div>
            <div className="grid sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Discovered</p><p className="text-sm text-foreground">{intel.discovered}</p></div>
              <div><p className="text-xs text-muted-foreground">Agencies Engaged</p><p className="font-semibold text-foreground">{intel.agencies}</p></div>
              <div><p className="text-xs text-muted-foreground">Status</p><p className="font-semibold text-foreground">{intel.status}</p></div>
              <div><Button size="sm" variant="outline">Full Report</Button></div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
