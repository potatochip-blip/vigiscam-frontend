'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, CheckCircle } from "lucide-react"

export default function AdminCompliancePage() {
  return (
    <PageLayout role="admin" title="Compliance & Regulations" subtitle="Manage compliance requirements and certifications">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-4">
          {[
            { standard: "SOC 2 Type II", status: "Certified", expires: "Dec 2024" },
            { standard: "ISO 27001", status: "Certified", expires: "Mar 2025" },
            { standard: "GDPR Compliant", status: "Verified", expires: "Ongoing" },
          ].map((cert, i) => (
            <Card key={i} className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">{cert.standard}</p>
              <p className="text-xs text-muted-foreground">{cert.expires}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> Compliance Checklist
          </h3>
          <div className="space-y-2">
            {[
              { item: "Annual Penetration Testing", status: "Complete", date: "Jan 2024" },
              { item: "Data Privacy Impact Assessment", status: "In Progress", date: "Due Feb 2024" },
              { item: "Incident Response Drill", status: "Complete", date: "Dec 2023" },
              { item: "Security Audit", status: "Scheduled", date: "Q2 2024" },
            ].map((check, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/40 rounded">
                <span className="text-sm text-foreground">{check.item}</span>
                <div className="flex items-center gap-2">
                  <Badge className={check.status === "Complete" ? "bg-green-100 text-green-700 border-0" : check.status === "In Progress" ? "bg-blue-100 text-blue-700 border-0" : "bg-purple-100 text-purple-700 border-0"}>{check.status}</Badge>
                  <span className="text-xs text-muted-foreground">{check.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
