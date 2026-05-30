'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Network, Share2 } from "lucide-react"

export default function AdminNetworkIntelligencePage() {
  return (
    <PageLayout role="admin" title="Network Intelligence" subtitle="Global threat intelligence and actor networks">
      <div className="space-y-6">
        {[
          { id: "NINT-001", network: "Wire Fraud Ring Alpha", nodes: 347, edges: 1245, threat: "Critical", discovered: "Jan 2024" },
          { id: "NINT-002", network: "Romance Scam Syndicate", nodes: 234, edges: 892, threat: "High", discovered: "Dec 2023" },
          { id: "NINT-003", network: "Tech Support Cluster", nodes: 156, edges: 456, threat: "High", discovered: "Nov 2023" },
        ].map((network) => (
          <Card key={network.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Network className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{network.network}</h3>
                  <Badge className={network.threat === "Critical" ? "bg-red-500" : "bg-orange-500"}>{network.threat}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Discovered {network.discovered}</p>
              </div>
              <Button size="sm" className="gap-1"><Share2 className="h-3 w-3" /> Share</Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Nodes</p><p className="font-semibold">{network.nodes}</p></div>
              <div><p className="text-xs text-muted-foreground">Edges</p><p className="font-semibold">{network.edges}</p></div>
              <div><p className="text-xs text-muted-foreground">Density</p><p className="font-semibold">{((network.edges / (network.nodes * (network.nodes - 1) / 2)) * 100).toFixed(1)}%</p></div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
