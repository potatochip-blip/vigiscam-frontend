'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarCheck, CheckCircle, Clock, AlertTriangle, Phone, MessageSquare, PlusCircle } from "lucide-react"

const checkIns = [
  { member: "Margaret Smith", schedule: "Daily at 10:00 AM", lastCheckIn: "Today 9:58 AM", status: "completed", method: "App" },
  { member: "Robert Smith", schedule: "Every 2 days at 2:00 PM", lastCheckIn: "Yesterday 2:03 PM", status: "due", method: "SMS" },
  { member: "Susan Lee", schedule: "Weekly on Sunday", lastCheckIn: "Sun Jan 26 at 11:00 AM", status: "completed", method: "Phone Call" },
]

export default function CheckInsPage() {
  return (
    <PageLayout role="family" title="Check-ins" subtitle="Scheduled welfare check-ins for protected family members">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-4 bg-muted/50">
          <div className="flex items-start gap-3">
            <CalendarCheck className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Check-ins are gentle welfare contacts with your loved ones. If a check-in is missed, you are alerted automatically.
            </p>
          </div>
        </Card>

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-foreground">Active Check-in Schedules</h2>
          <Button size="sm" className="flex items-center gap-2"><PlusCircle className="h-4 w-4" />Add Check-in</Button>
        </div>

        <div className="space-y-4">
          {checkIns.map((c, i) => (
            <Card key={i} className={`p-5 ${c.status === "missed" ? "border-red-200" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${c.status === "completed" ? "bg-green-100" : c.status === "due" ? "bg-yellow-100" : "bg-red-100"}`}>
                    {c.status === "completed" ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Clock className="h-5 w-5 text-yellow-600" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{c.member}</h3>
                    <p className="text-sm text-muted-foreground">Schedule: {c.schedule}</p>
                    <p className="text-sm text-muted-foreground">Last check-in: {c.lastCheckIn} via {c.method}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge className={`text-xs border-0 ${c.status === "completed" ? "bg-green-100 text-green-700" : c.status === "due" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                    {c.status === "due" ? "Due Now" : c.status}
                  </Badge>
                  {c.status === "due" && (
                    <Button size="sm" className="text-xs flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" /> Check In
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
