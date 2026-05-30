'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, AlertTriangle } from "lucide-react"

export default function ScamHotspotsPage() {
  return (
    <PageLayout role="agency" title="Scam Hotspots" subtitle="Identify geographic concentrations of fraud activity">
      <div className="space-y-6">
        {[
          { city: "Los Angeles, CA", cases: 187, fraudType: "Wire Fraud", intensity: "Critical", growth: "↑ 34%" },
          { city: "New York, NY", cases: 156, fraudType: "Romance Scams", intensity: "High", growth: "↓ 8%" },
          { city: "Miami, FL", cases: 134, fraudType: "Money Laundering", intensity: "High", growth: "↑ 12%" },
          { city: "Toronto, Canada", cases: 98, fraudType: "Investment Fraud", intensity: "Medium", growth: "↑ 5%" },
          { city: "London, UK", cases: 87, fraudType: "Tech Support", intensity: "Medium", growth: "↑ 19%" },
        ].map((hotspot, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{hotspot.city}</h3>
                  <Badge className={hotspot.intensity === "Critical" ? "bg-red-500" : hotspot.intensity === "High" ? "bg-orange-500" : "bg-yellow-500"}>{hotspot.intensity}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{hotspot.fraudType}</p>
              </div>
              <Button size="sm">Investigate</Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Cases</p><p className="font-semibold text-foreground">{hotspot.cases}</p></div>
              <div><p className="text-xs text-muted-foreground">Primary Type</p><p className="text-sm text-foreground">{hotspot.fraudType}</p></div>
              <div><p className="text-xs text-muted-foreground">Growth</p><p className={hotspot.growth.startsWith("↑") ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>{hotspot.growth}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
