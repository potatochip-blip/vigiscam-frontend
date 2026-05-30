'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp } from "lucide-react"

export default function ReferralsPage() {
  return (
    <PageLayout role="agency" title="Partner Referrals" subtitle="Cross-agency case referrals and handoffs">
      <div className="space-y-6">
        {[
          {
            id: "REF-2024-001",
            case: "Wire Fraud Case #847",
            from: "FBI",
            to: "Secret Service",
            date: "Jan 14",
            status: "Accepted"
          },
          {
            id: "REF-2024-002",
            case: "Romance Scam - International",
            from: "RCMP",
            to: "FBI",
            date: "Jan 12",
            status: "Pending"
          },
          {
            id: "REF-2024-003",
            case: "Tech Support Fraud Cluster",
            from: "FTC",
            to: "12 Local Agencies",
            date: "Jan 10",
            status: "Accepted"
          },
        ].map((ref) => (
          <Card key={ref.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-foreground">{ref.case}</h3>
                  <Badge className={ref.status === "Accepted" ? "bg-green-500" : "bg-yellow-500"}>{ref.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{ref.id}</p>
              </div>
              <Button size="sm">View Details</Button>
            </div>
            <div className="grid sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">From</p><p className="text-sm font-medium text-foreground">{ref.from}</p></div>
              <div><p className="text-xs text-muted-foreground">To</p><p className="text-sm font-medium text-foreground">{ref.to}</p></div>
              <div><p className="text-xs text-muted-foreground">Date</p><p className="text-sm text-foreground">{ref.date}</p></div>
              <div><p className="text-xs text-muted-foreground">Status</p><p className="font-semibold text-foreground">{ref.status}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
