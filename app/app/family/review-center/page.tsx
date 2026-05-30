'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, CheckCircle, XCircle, Clock, Archive, AlertTriangle } from "lucide-react"

const items = [
  { member: "Margaret Smith", type: "Suspicious Call Recording", desc: "4min 12sec call — risk score 89. Review and decide: report to bank, save as evidence, or dismiss.", time: "2h ago", status: "pending" },
  { member: "Margaret Smith", type: "Flagged Email", desc: "Email from support@nab-verification.net. Matched phishing pattern. Quarantined.", time: "5h ago", status: "pending" },
  { member: "Robert Smith", type: "Unknown Caller — Low Risk", desc: "International call from +1 555 000 1234. Risk: 15/100. No scam pattern match.", time: "1d ago", status: "dismissed" },
]

export default function ReviewCenterPage() {
  return (
    <PageLayout role="family" title="Review Center" subtitle="Review and take action on flagged events for your loved ones">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
          <p className="text-sm text-yellow-700 font-medium">2 items require your review</p>
        </div>

        <div className="flex gap-2">
          {["All", "Pending", "Dismissed", "Actioned"].map((f) => (
            <Button key={f} size="sm" variant={f === "All" ? "default" : "outline"}>{f}</Button>
          ))}
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <Card key={i} className={`p-5 ${item.status === "pending" ? "border-yellow-200" : ""}`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary">{item.member}</span>
                    <Badge className={`text-xs border-0 ${item.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-muted text-muted-foreground"}`}>
                      {item.status}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{item.type}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />{item.time}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
              {item.status === "pending" && (
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" className="flex items-center gap-1.5"><Archive className="h-3.5 w-3.5" />Save Evidence</Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" />Report to Bank</Button>
                  <Button size="sm" variant="ghost" className="flex items-center gap-1.5 text-muted-foreground"><XCircle className="h-3.5 w-3.5" />Dismiss</Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
