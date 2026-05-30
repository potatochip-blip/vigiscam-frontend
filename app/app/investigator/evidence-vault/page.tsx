'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Archive, FileText, Download, Eye } from "lucide-react"

export default function EvidenceVaultPage() {
  return (
    <PageLayout role="investigator" title="Evidence Vault" subtitle="Secure evidence storage and chain of custody tracking">
      <div className="space-y-6">
        {[
          { id: "EVD-2024-001", name: "Wire Transfer Records - Case #847", type: "Bank Records", size: "2.4 MB", collected: "Jan 14", chain: "Verified" },
          { id: "EVD-2024-002", name: "Chat Logs - Romance Scam Ring", type: "Screenshots", size: "156 KB", collected: "Jan 12", chain: "Verified" },
          { id: "EVD-2024-003", name: "Phone Call Recording - Tech Support", type: "Audio", size: "18.7 MB", collected: "Jan 10", chain: "Verified" },
          { id: "EVD-2024-004", name: "Device Fingerprints - Network Analysis", type: "Metadata", size: "342 KB", collected: "Jan 8", chain: "Verified" },
        ].map((evidence) => (
          <Card key={evidence.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Archive className="h-4 w-4 text-primary" />
                  {evidence.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{evidence.id}</p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-0">{evidence.chain}</Badge>
            </div>
            <div className="grid sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Type</p><p className="text-sm font-medium text-foreground">{evidence.type}</p></div>
              <div><p className="text-xs text-muted-foreground">Size</p><p className="text-sm font-medium text-foreground">{evidence.size}</p></div>
              <div><p className="text-xs text-muted-foreground">Collected</p><p className="text-sm font-medium text-foreground">{evidence.collected}</p></div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" /> View</Button>
                <Button size="sm" variant="outline" className="gap-1"><Download className="h-3 w-3" /> Export</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
