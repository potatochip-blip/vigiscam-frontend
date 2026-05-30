'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitBranch, Calendar, User, DollarSign } from "lucide-react"

export default function TimelinesPage() {
  return (
    <PageLayout role="investigator" title="Investigation Timelines" subtitle="Chronological fraud event sequences and activity patterns">
      <div className="space-y-6">
        {[
          {
            id: "TL-2024-001",
            name: "Wire Fraud Case #847",
            events: [
              { date: "Jan 14 09:32", event: "Account Created", actor: "M. Chen" },
              { date: "Jan 14 14:15", event: "KYC Verification", actor: "System" },
              { date: "Jan 14 16:45", event: "Wire Transfer $50K", actor: "M. Chen" },
              { date: "Jan 14 17:20", event: "Auto-Blocked by VIGISCAM™", actor: "System" },
            ]
          },
          {
            id: "TL-2024-002",
            name: "Romance Scam Investigation",
            events: [
              { date: "Jan 12 08:00", event: "Victim Report Submitted", actor: "Victim" },
              { date: "Jan 12 09:30", event: "Profile Match Found", actor: "System" },
              { date: "Jan 12 11:00", event: "Cross-Platform Correlation", actor: "Investigator" },
            ]
          },
        ].map((timeline) => (
          <Card key={timeline.id} className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-foreground">{timeline.name}</h3>
                <p className="text-xs text-muted-foreground">{timeline.id}</p>
              </div>
              <Button size="sm">Export Timeline</Button>
            </div>
            <div className="space-y-4">
              {timeline.events.map((evt, i) => (
                <div key={i} className="flex gap-4 relative pb-4 last:pb-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{evt.event}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{evt.date}</span>
                      <span>by {evt.actor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
