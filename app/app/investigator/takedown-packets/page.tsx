'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Download, Eye, Send } from "lucide-react"

export default function TakedownPacketsPage() {
  return (
    <PageLayout role="investigator" title="Takedown Packets" subtitle="Coordinated takedown evidence packages for enforcement">
      <div className="space-y-6">
        {[
          {
            id: "PKT-2024-001",
            name: "Wire Fraud Ring Alpha - Evidence Package",
            status: "Ready",
            evidence: 23,
            actors: 7,
            agencies: "FBI, Secret Service",
            created: "Jan 14"
          },
          {
            id: "PKT-2024-002",
            name: "Romance Scam Network - International",
            status: "In Review",
            evidence: 45,
            actors: 12,
            agencies: "FBI, RCMP, Interpol",
            created: "Jan 12"
          },
          {
            id: "PKT-2024-003",
            name: "Tech Support Fraud - Takedown Ready",
            status: "Submitted",
            evidence: 18,
            actors: 4,
            agencies: "FTC, IC3",
            created: "Jan 10"
          },
        ].map((packet) => (
          <Card key={packet.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-foreground">{packet.name}</h3>
                  <Badge className={packet.status === "Ready" ? "bg-green-500" : packet.status === "In Review" ? "bg-blue-500" : "bg-purple-500"}>{packet.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{packet.id}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" /> Preview</Button>
                <Button size="sm" className="gap-1"><Send className="h-3 w-3" /> Send</Button>
              </div>
            </div>
            <div className="grid sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Evidence Files</p><p className="font-semibold text-foreground">{packet.evidence}</p></div>
              <div><p className="text-xs text-muted-foreground">Actors Included</p><p className="font-semibold text-foreground">{packet.actors}</p></div>
              <div><p className="text-xs text-muted-foreground">Agencies</p><p className="text-xs text-foreground">{packet.agencies}</p></div>
              <div><p className="text-xs text-muted-foreground">Created</p><p className="font-semibold text-foreground">{packet.created}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
