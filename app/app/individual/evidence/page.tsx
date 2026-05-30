'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Archive, Download, Eye, Trash2 } from "lucide-react"

export default function IndividualEvidenceVaultPage() {
  return (
    <PageLayout role="individual" title="Evidence Vault" subtitle="Secure storage for scam evidence and records">
      <div className="space-y-6">
        {[
          { id: "EVD-IND-001", name: "Scam Call Recording", type: "Audio", size: "2.4 MB", collected: "Jan 14", action: "Call Blocked" },
          { id: "EVD-IND-002", name: "Phishing Email Screenshots", type: "Images", size: "156 KB", collected: "Jan 12", action: "Email Flagged" },
          { id: "EVD-IND-003", name: "Tech Support Chat Transcript", type: "Text", size: "34 KB", collected: "Jan 8", action: "Chat Prevented" },
          { id: "EVD-IND-004", name: "Malicious Link Evidence", type: "URL + Screenshot", size: "89 KB", collected: "Jan 5", action: "Link Blocked" },
        ].map((evidence) => (
          <Card key={evidence.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Archive className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{evidence.name}</h3>
                  <Badge variant="outline">{evidence.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{evidence.size} · Collected {evidence.collected}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline" className="gap-1"><Download className="h-3 w-3" /></Button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{evidence.action}</span>
              <Button size="sm" variant="outline" className="gap-1 text-destructive"><Trash2 className="h-3 w-3" /> Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
