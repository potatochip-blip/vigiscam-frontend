'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, Phone, Mail, Monitor, Info, Archive } from "lucide-react"

const alerts = [
  { member: "Margaret Smith", type: "High Risk Call", desc: "Incoming call from +61 2 9876 5432 matched bank impersonation script. Risk score: 89/100. Call intercepted and warning sent.", severity: "high", time: "2h ago", action: "Intercepted" },
  { member: "Margaret Smith", type: "Scam Email Detected", desc: "Email from support@nab-verification.net matched phishing pattern. Email quarantined before delivery.", severity: "medium", time: "5h ago", action: "Blocked" },
  { member: "Robert Smith", type: "Unknown Caller Advisory", desc: "Called received from an unknown international number. Low risk — caller did not match any scam patterns.", severity: "low", time: "1d ago", action: "Monitored" },
]

export default function FamilyAlertsPage() {
  return (
    <PageLayout role="family" title="Family Alerts" subtitle="Threat alerts across all protected members" alertCount={2}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex gap-2 flex-wrap">
          {["All", "Margaret Smith", "Robert Smith", "Susan Lee", "High Risk", "Unread"].map((f) => (
            <Button key={f} size="sm" variant={f === "All" ? "default" : "outline"}>{f}</Button>
          ))}
        </div>

        <div className="space-y-4">
          {alerts.map((a, i) => (
            <Card key={i} className={`p-5 ${a.severity === "high" ? "border-red-200" : a.severity === "medium" ? "border-yellow-200" : ""}`}>
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${a.severity === "high" ? "bg-red-100" : a.severity === "medium" ? "bg-yellow-100" : "bg-blue-100"}`}>
                  <AlertTriangle className={`h-4 w-4 ${a.severity === "high" ? "text-red-600" : a.severity === "medium" ? "text-yellow-600" : "text-blue-600"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-primary">{a.member}</span>
                      <h3 className="text-sm font-bold text-foreground">{a.type}</h3>
                      <Badge className={`text-xs border-0 ${a.severity === "high" ? "bg-red-100 text-red-700" : a.severity === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>{a.severity}</Badge>
                      <Badge className="text-xs border-0 bg-green-100 text-green-700">{a.action}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{a.desc}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-7 text-xs flex items-center gap-1">
                      <Archive className="h-3 w-3" /> Save Evidence
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs">View Full Report</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
