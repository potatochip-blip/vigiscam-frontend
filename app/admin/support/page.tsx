'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Mail, Eye } from "lucide-react"

export default function AdminSupportPage() {
  return (
    <PageLayout role="admin" title="Customer Support" subtitle="Manage support tickets and customer inquiries">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-4 gap-4 text-center">
          <Card className="p-4"><p className="text-xs text-muted-foreground">Open Tickets</p><p className="text-2xl font-bold">47</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">Avg Response</p><p className="text-2xl font-bold">23m</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">Resolution Rate</p><p className="text-2xl font-bold">94%</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">CSAT Score</p><p className="text-2xl font-bold">4.8/5</p></Card>
        </div>

        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Recent Tickets</h3>
          <div className="space-y-3">
            {[
              { id: "TKT-001", subject: "API Integration Issue", customer: "Acme Corp", priority: "High", status: "In Progress" },
              { id: "TKT-002", subject: "Feature Request", customer: "Global Bank", priority: "Low", status: "Open" },
              { id: "TKT-003", subject: "Billing Question", customer: "Tech Startup", priority: "Medium", status: "Waiting" },
            ].map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 bg-muted/40 rounded">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{ticket.subject}</p>
                  <p className="text-xs text-muted-foreground">{ticket.customer}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={ticket.priority === "High" ? "bg-red-100 text-red-700 border-0" : ticket.priority === "Medium" ? "bg-orange-100 text-orange-700 border-0" : "bg-blue-100 text-blue-700 border-0"}>{ticket.priority}</Badge>
                  <Badge variant="outline">{ticket.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
