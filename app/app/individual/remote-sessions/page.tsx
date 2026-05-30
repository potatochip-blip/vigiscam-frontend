'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Monitor, AlertTriangle, CheckCircle, XCircle, Clock, Archive, Shield, Eye } from "lucide-react"

const sessions = [
  { app: "AnyDesk", id: "AD-48829331", status: "blocked", risk: "high", reason: "Initiated by unknown caller during active scam call", time: "Today 14:25", duration: "0s" },
  { app: "TeamViewer", id: "TV-77412990", status: "allowed", risk: "low", reason: "Pre-authorized — IT Support (verified company)", time: "Last week", duration: "12m 04s" },
  { app: "Chrome Remote Desktop", id: "CRD-99102", status: "flagged", risk: "medium", reason: "Session requested without prior contact", time: "3 days ago", duration: "2m 11s" },
]

export default function RemoteSessionsPage() {
  return (
    <PageLayout role="individual" title="Remote Sessions" subtitle="Monitor and control remote access to your device">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Alert */}
        <Card className="p-4 border-2 border-green-300 bg-green-50">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-foreground">Remote Session Guard: Active</p>
              <p className="text-xs text-muted-foreground">All remote access attempts are being monitored. Scam-initiated sessions are automatically blocked.</p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Sessions Blocked", value: "8", icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
            { label: "Sessions Flagged", value: "3", icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "Authorized Sessions", value: "12", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <Card key={i} className="p-5">
                <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center mb-2`}>
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </Card>
            )
          })}
        </div>

        {/* Session List */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              Session History
            </h2>
            <Button size="sm" variant="outline">Configure Auto-Block Rules</Button>
          </div>
          <div className="space-y-4">
            {sessions.map((s, i) => (
              <div key={i} className={`p-4 rounded-lg border ${s.status === "blocked" ? "border-red-200 bg-red-50/50" : s.status === "flagged" ? "border-yellow-200 bg-yellow-50/50" : "border-green-200 bg-green-50/50"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <Monitor className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{s.app}</span>
                        <code className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{s.id}</code>
                        <Badge className={`text-xs border-0 ${s.status === "blocked" ? "bg-red-100 text-red-700" : s.status === "flagged" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                          {s.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{s.reason}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{s.time}</span>
                        <span>Duration: {s.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="ghost" className="h-8 text-xs">
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      Details
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 text-xs">
                      <Archive className="h-3.5 w-3.5 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Trusted Apps */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Pre-Authorized Remote Apps</h2>
          <p className="text-sm text-muted-foreground mb-4">These apps are allowed without an approval prompt. Remove any you no longer trust.</p>
          <div className="space-y-2">
            {[
              { app: "TeamViewer", added: "Added by you — IT Support", authorized: true },
              { app: "Zoom", added: "Added by you — Video Meetings", authorized: true },
            ].map((app, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{app.app}</p>
                    <p className="text-xs text-muted-foreground">{app.added}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-xs text-destructive">Remove</Button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-4">Add Trusted App</Button>
        </Card>
      </div>
    </PageLayout>
  )
}
