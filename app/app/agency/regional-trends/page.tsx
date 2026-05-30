'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Map, TrendingUp, AlertTriangle, Eye } from "lucide-react"

export default function RegionalTrendsPage() {
  return (
    <PageLayout role="agency" title="Regional Fraud Trends" subtitle="Geographic analysis of scam patterns and hotspots">
      <div className="space-y-6">
        {[
          {
            region: "North America",
            cases: 342,
            topFraud: "Wire Fraud",
            trend: "↑ 18%",
            agencies: 8,
            status: "Critical"
          },
          {
            region: "Europe",
            cases: 187,
            topFraud: "Romance Scams",
            trend: "↓ 5%",
            agencies: 6,
            status: "High"
          },
          {
            region: "Asia-Pacific",
            cases: 156,
            topFraud: "Tech Support",
            trend: "↑ 23%",
            agencies: 5,
            status: "High"
          },
        ].map((r, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-foreground">{r.region}</h3>
                  <Badge className={r.status === "Critical" ? "bg-red-500" : "bg-orange-500"}>{r.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{r.agencies} partner agencies</p>
              </div>
              <Button size="sm">View Details</Button>
            </div>
            <div className="grid sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Active Cases</p><p className="font-semibold text-foreground">{r.cases}</p></div>
              <div><p className="text-xs text-muted-foreground">Top Fraud Type</p><p className="text-sm text-foreground">{r.topFraud}</p></div>
              <div><p className="text-xs text-muted-foreground">Trend</p><p className={r.trend.startsWith("↑") ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>{r.trend}</p></div>
              <div><p className="text-xs text-muted-foreground">Partner Agencies</p><p className="font-semibold text-foreground">{r.agencies}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
