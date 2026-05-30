'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Eye, Download } from "lucide-react"

export default function IndividualAlertsPage() {
  return (
    <PageLayout role="individual" title="Security Alerts" subtitle="View and manage all scam protection alerts">
      <div className="space-y-6">
        {[
          { id: "ALT-IND-001", title: "Voice Cloning Detected", desc: "Incoming call showed deepfake voice indicators", severity: "Critical", timestamp: "2 min ago", action: "Call Blocked" },
          { id: "ALT-IND-002", title: "Tech Support Scam Pattern", desc: "Email matched known tech support fraud script", severity: "High", timestamp: "1 hour ago", action: "Email Flagged" },
          { id: "ALT-IND-003", title: "Phishing Link Detected", desc: "Text message contained malicious link", severity: "High", timestamp: "3 hours ago", action: "Link Blocked" },
          { id: "ALT-IND-004", title: "Suspicious Remote Access", desc: "AnyDesk installation attempt from unknown source", severity: "Critical", timestamp: "1 day ago", action: "Prevented" },
        ].map((alert) => (
          <Card key={alert.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className={`h-4 w-4 ${alert.severity === "Critical" ? "text-red-600" : "text-orange-600"}`} />
                  <h3 className="font-bold text-foreground">{alert.title}</h3>
                  <Badge className={alert.severity === "Critical" ? "bg-red-500" : "bg-orange-500"}>{alert.severity}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{alert.desc}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline" className="gap-1"><Download className="h-3 w-3" /></Button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {alert.timestamp}</div>
              <Badge variant="outline" className="bg-green-50 text-green-700">{alert.action}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
