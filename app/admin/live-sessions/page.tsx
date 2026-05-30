'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Radio, Eye } from "lucide-react"

export default function AdminLiveSessionsPage() {
  return (
    <PageLayout role="admin" title="Live Sessions" subtitle="Monitor active user sessions in real-time">
      <div className="space-y-6">
        {[
          { id: "SES-001", user: "Alice Chen", org: "Acme Corp", status: "Active", lastActivity: "Now", ip: "192.168.1.1" },
          { id: "SES-002", user: "Bob Martinez", org: "Global Bank", status: "Active", lastActivity: "30s ago", ip: "203.0.113.45" },
          { id: "SES-003", user: "Carol Williams", org: "Acme Corp", status: "Idle", lastActivity: "5 min ago", ip: "198.51.100.89" },
        ].map((session) => (
          <Card key={session.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Radio className="h-4 w-4 text-green-500 animate-pulse" />
                  <h3 className="font-bold text-foreground">{session.user}</h3>
                  <Badge className={session.status === "Active" ? "bg-green-100 text-green-700 border-0" : "bg-gray-100 text-gray-700 border-0"}>{session.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{session.org} · {session.ip}</p>
              </div>
              <div className="text-xs text-muted-foreground mr-4">{session.lastActivity}</div>
              <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
