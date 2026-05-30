'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock } from "lucide-react"

export default function FamilyThreatsPage() {
  return (
    <PageLayout role="family" title="Family Threats" subtitle="Monitor all threats affecting your family">
      <div className="space-y-4">
        {[
          { id: "THR-001", member: "Grandma (Margaret)", type: "Tech Support Scam", desc: "Caller claiming to be from Microsoft support", severity: "Critical", status: "Blocked", time: "1 hour ago" },
          { id: "THR-002", member: "Dad (Robert)", type: "Phishing Email", desc: "Bank impersonation email with login link", severity: "High", status: "Flagged", time: "3 hours ago" },
          { id: "THR-003", member: "Mom (Linda)", type: "Romance Scam", desc: "Dating app profile with investment proposal", severity: "High", status: "Reported", time: "1 day ago" },
          { id: "THR-004", member: "Sister (Emma)", type: "Malicious Link", desc: "SMS with shortened URL to phishing site", severity: "Medium", status: "Blocked", time: "2 days ago" },
          { id: "THR-005", member: "Grandma (Margaret)", type: "Prize Scam", desc: "Email claiming lottery winnings", severity: "Medium", status: "Flagged", time: "3 days ago" },
        ].map((threat) => (
          <Card key={threat.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className={`h-4 w-4 ${threat.severity === "Critical" ? "text-red-600" : "text-orange-600"}`} />
                  <h3 className="font-bold text-foreground">{threat.type}</h3>
                  <Badge className={threat.severity === "Critical" ? "bg-red-500" : "bg-orange-500"}>{threat.severity}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{threat.desc}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-muted-foreground"><strong>{threat.member}</strong></span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {threat.time}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 flex-shrink-0">{threat.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
