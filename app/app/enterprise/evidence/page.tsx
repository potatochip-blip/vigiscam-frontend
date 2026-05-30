'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Archive, Download, Eye } from "lucide-react"

export default function EnterpriseEvidencePage() {
  return (
    <PageLayout role="enterprise" title="Evidence Repository" subtitle="Centralized evidence storage and chain of custody">
      <div className="space-y-6">
        {[
          { id: "EVD-ENT-001", name: "Q4 Fraud Incident Report", type: "Documents", size: "12.4 MB", collected: "Jan 14", status: "Secure" },
          { id: "EVD-ENT-002", name: "Suspicious Transaction Records", type: "Bank Records", size: "8.7 MB", collected: "Jan 12", status: "Secure" },
          { id: "EVD-ENT-003", name: "Employee Chat Logs Archive", type: "Communications", size: "156 MB", collected: "Jan 8", status: "Secure" },
        ].map((evidence) => (
          <Card key={evidence.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Archive className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{evidence.name}</h3>
                  <Badge className="bg-green-100 text-green-700 border-0">{evidence.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{evidence.type} · {evidence.size}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline" className="gap-1"><Download className="h-3 w-3" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
