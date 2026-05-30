'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Target, Users, TrendingUp } from "lucide-react"

export default function CampaignsPage() {
  return (
    <PageLayout role="agency" title="Multi-Agency Campaigns" subtitle="Coordinate agency-wide fraud prevention initiatives">
      <div className="space-y-6">
        {[
          {
            id: "CAM-2024-001",
            name: "Operation Wire Shutdown",
            agencies: 12,
            status: "Active",
            cases: 234,
            objective: "Disrupt wire fraud rings"
          },
          {
            id: "CAM-2024-002",
            name: "Romance Scam Task Force",
            agencies: 8,
            status: "Active",
            cases: 156,
            objective: "Combat international romance scams"
          },
          {
            id: "CAM-2024-003",
            name: "Tech Support Takedown",
            agencies: 15,
            status: "Planning",
            cases: 89,
            objective: "Coordinate takedown with ISPs"
          },
        ].map((campaign) => (
          <Card key={campaign.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Megaphone className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{campaign.name}</h3>
                  <Badge className={campaign.status === "Active" ? "bg-green-500" : "bg-blue-500"}>{campaign.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{campaign.id}</p>
              </div>
              <Button size="sm">Manage Campaign</Button>
            </div>
            <div className="grid sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Agencies</p><p className="font-semibold text-foreground">{campaign.agencies}</p></div>
              <div><p className="text-xs text-muted-foreground">Cases</p><p className="font-semibold text-foreground">{campaign.cases}</p></div>
              <div><p className="text-xs text-muted-foreground">Objective</p><p className="text-sm text-foreground">{campaign.objective}</p></div>
              <div><p className="text-xs text-muted-foreground">Status</p><p className="font-semibold text-foreground">{campaign.status}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
