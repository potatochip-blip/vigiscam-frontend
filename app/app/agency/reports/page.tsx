'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye } from "lucide-react"

export default function AgencyReportsPage() {
  return (
    <PageLayout role="agency" title="Agency Reports" subtitle="Consolidated reporting across all partner agencies">
      <div className="space-y-6">
        {[
          {
            id: "RPT-AGY-2024-001",
            name: "Quarterly Fraud Prevention Summary",
            type: "Executive Summary",
            pages: 28,
            generated: "Jan 14",
            agencies: 23
          },
          {
            id: "RPT-AGY-2024-002",
            name: "Regional Trends Analysis Q1 2024",
            type: "Strategic Analysis",
            pages: 45,
            generated: "Jan 12",
            agencies: 23
          },
          {
            id: "RPT-AGY-2024-003",
            name: "Inter-Agency Coordination Report",
            type: "Operations Report",
            pages: 34,
            generated: "Jan 8",
            agencies: 23
          },
        ].map((report) => (
          <Card key={report.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{report.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground">{report.type}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" /> Preview</Button>
                <Button size="sm" className="gap-1"><Download className="h-3 w-3" /> Download</Button>
              </div>
            </div>
            <div className="grid sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Pages</p><p className="font-semibold text-foreground">{report.pages}</p></div>
              <div><p className="text-xs text-muted-foreground">Generated</p><p className="text-sm text-foreground">{report.generated}</p></div>
              <div><p className="text-xs text-muted-foreground">Agencies</p><p className="font-semibold text-foreground">{report.agencies}</p></div>
              <div><Button size="sm" variant="outline">Share Report</Button></div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
