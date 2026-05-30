'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link2, Network, Zap, Download } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ActorLinkingPage() {
  return (
    <PageLayout role="investigator" title="Actor Linking" subtitle="Connect and correlate suspect identities across platforms">
      <div className="space-y-6">
        <Input placeholder="Search actors or relationships..." />

        {[
          {
            id: "LNK-2024-001",
            primary: "Michael Chen",
            linked: ["Sarah Johnson", "James Wilson", "David Lee"],
            confidence: "95%",
            methods: ["Phone matching", "IP correlation", "Payment routing"]
          },
          {
            id: "LNK-2024-002",
            primary: "Romance Scam Ring",
            linked: ["Profile SCAM-847", "Profile SCAM-892", "Profile SCAM-954"],
            confidence: "88%",
            methods: ["Device fingerprint", "Chat pattern analysis"]
          },
        ].map((link) => (
          <Card key={link.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  {link.primary}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{link.id}</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-0">Confidence: {link.confidence}</Badge>
            </div>
            <div className="mb-4 pb-4 border-b border-border">
              <p className="text-xs text-muted-foreground mb-2">Linked Entities</p>
              <div className="flex flex-wrap gap-2">
                {link.linked.map((entity, i) => (
                  <Badge key={i} variant="outline">{entity}</Badge>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Linking Methods</p>
              <div className="flex flex-wrap gap-2">
                {link.methods.map((method, i) => (
                  <span key={i} className="text-xs bg-muted/40 text-muted-foreground px-2 py-1 rounded">{method}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm">View Network</Button>
              <Button size="sm" variant="outline" className="gap-1"><Download className="h-3 w-3" /> Export</Button>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
