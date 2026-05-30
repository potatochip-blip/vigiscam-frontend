'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock } from "lucide-react"

export default function FamilyActivityPage() {
  return (
    <PageLayout role="family" title="Family Activity" subtitle="View protection activity across your family">
      <div className="space-y-4">
        {[
          { member: "Mom (Linda)", activity: "10 calls analyzed", type: "Call Shield", time: "2 hours ago", status: "Active" },
          { member: "Grandma (Margaret)", activity: "Threat detected and blocked", type: "Tech Support Scam", time: "1 hour ago", status: "Blocked" },
          { member: "Dad (Robert)", activity: "Email scanned for phishing", type: "Email Guard", time: "30 min ago", status: "Safe" },
          { member: "Sister (Emma)", activity: "5 SMS messages analyzed", type: "SMS Filter", time: "1 day ago", status: "Safe" },
          { member: "Mom (Linda)", activity: "Voice analysis completed", type: "Voice ID", time: "2 days ago", status: "Verified" },
          { member: "Grandma (Margaret)", activity: "Screen activity monitored", type: "Screen Guard", time: "3 days ago", status: "Normal" },
        ].map((entry, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">{entry.member}</span>
                  <Badge variant="outline" className="text-xs">{entry.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{entry.activity}</p>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {entry.time}</span>
              </div>
              <Badge className={entry.status === "Active" ? "bg-green-100 text-green-700 border-0" : entry.status === "Blocked" ? "bg-red-100 text-red-700 border-0" : entry.status === "Safe" ? "bg-green-100 text-green-700 border-0" : "bg-blue-100 text-blue-700 border-0"}>
                {entry.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
