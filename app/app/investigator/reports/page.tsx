'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Share2, Calendar } from "lucide-react"

export default function InvestigatorReportsPage() {
  return (
    <PageLayout role="investigator" title="Investigation Reports" subtitle="Generate and manage case reports and findings">
      <div className="space-y-6">
        {[
          {
            id: "RPT-2024-001",
            name: "Wire Fraud Ring Alpha - Final Report",
            type: "Investigation Summary",
            pages: 47,
            generated: "Jan 14",
            status: "Complete"
          },
          {
            id: "RPT-2024-002",
            name: "Romance Scam Network - Timeline Analysis",
            type: "Temporal Analysis",
            pages: 23,
            generated: "Jan 12",
            status: "Complete"
          },
          {
            id: "RPT-2024-003",
            name: "Cross-Platform Actor Correlation",
            type: "Network Analysis",
            pages: 34,
            generated: "Jan 8",
            status: "Draft"
          },
        ].map((report) => (
          <Card key={report.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{report.name}</h3>
                  <Badge className={report.status === "Complete" ? "bg-green-100 text-green-700 border-0" : "bg-yellow-100 text-yellow-700 border-0"}>{report.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{report.type}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><Download className="h-3 w-3" /> Download</Button>
                <Button size="sm" variant="outline" className="gap-1"><Share2 className="h-3 w-3" /> Share</Button>
              </div>
            </div>
            <div className="flex gap-6 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Pages</p><p className="font-semibold text-foreground">{report.pages}</p></div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> {report.generated}</div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
