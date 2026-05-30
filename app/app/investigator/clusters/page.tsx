'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Layers, Network, Search, Download, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ClustersPage() {
  return (
    <PageLayout role="investigator" title="Fraud Clusters" subtitle="View connected fraud networks and actor groupings">
      <div className="space-y-6">
        <div className="flex gap-4 items-center">
          <Input placeholder="Search clusters..." className="flex-1" />
          <Button size="sm" className="gap-2"><Search className="h-4 w-4" /> Search</Button>
          <Button size="sm" variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
        </div>

        <div className="grid gap-6">
          {[
            { id: "CLU-2024-001", name: "Wire Fraud Ring Alpha", members: 47, risk: "Critical", discovered: "Jan 14" },
            { id: "CLU-2024-002", name: "Romance Scam Network", members: 23, risk: "High", discovered: "Jan 12" },
            { id: "CLU-2024-003", name: "Tech Support Cluster", members: 15, risk: "Medium", discovered: "Jan 10" },
          ].map((cluster) => (
            <Card key={cluster.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-foreground">{cluster.name}</h3>
                    <Badge className={cluster.risk === "Critical" ? "bg-red-500" : cluster.risk === "High" ? "bg-orange-500" : "bg-yellow-500"}>{cluster.risk}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{cluster.id}</p>
                </div>
                <Button size="sm">Analyze</Button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div><p className="text-xs text-muted-foreground">Members</p><p className="font-semibold text-foreground">{cluster.members}</p></div>
                <div><p className="text-xs text-muted-foreground">Discovered</p><p className="font-semibold text-foreground">{cluster.discovered}</p></div>
                <div><p className="text-xs text-muted-foreground">Status</p><p className="font-semibold text-foreground text-green-600">Active</p></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
