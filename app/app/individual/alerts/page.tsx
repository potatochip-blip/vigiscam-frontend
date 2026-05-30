'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, CheckCircle, Info, X, Archive, ArrowRight, Filter } from "lucide-react"
import { useState } from "react"

const allAlerts = [
  { id: 1, severity: "critical", title: "Remote Access Blocked", desc: "AnyDesk installation attempt detected and blocked during active call from +61 2 9876 5432. Scam call confirmed.", time: "2h ago", read: false, category: "Threat" },
  { id: 2, severity: "high", title: "Voice Cloning Detected", desc: "Incoming call used synthesized voice matching a known bank fraud pattern. Call was from +1 800 555 0123.", time: "5h ago", read: false, category: "Threat" },
  { id: 3, severity: "medium", title: "Phishing URL Blocked", desc: "Link in SMS message identified as phishing. Target: fake NAB login page. URL blocked before you could click.", time: "1d ago", read: true, category: "Blocked" },
  { id: 4, severity: "medium", title: "Scam Pattern in Email", desc: "Email from support@nab-verification.net matched gift card scam script family GP-0044. Moved to spam.", time: "2d ago", read: true, category: "Blocked" },
  { id: 5, severity: "low", title: "New Device Sign-in", desc: "Your account was accessed from a new device: iPhone 15 Pro. If this was not you, change your password immediately.", time: "3d ago", read: true, category: "Account" },
  { id: 6, severity: "info", title: "Weekly Threat Summary", desc: "This week: 3 scam calls blocked, 1 phishing link blocked, 0 remote access attempts. You remain protected.", time: "1w ago", read: true, category: "Report" },
]

const severityConfig: Record<string, { color: string; bg: string; icon: typeof Bell }> = {
  critical: { color: "text-red-700", bg: "bg-red-100", icon: AlertTriangle },
  high: { color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle },
  medium: { color: "text-yellow-700", bg: "bg-yellow-50", icon: AlertTriangle },
  low: { color: "text-blue-600", bg: "bg-blue-50", icon: Info },
  info: { color: "text-muted-foreground", bg: "bg-muted", icon: Info },
}

export default function AlertsPage() {
  const [filter, setFilter] = useState("All")
  const [alerts, setAlerts] = useState(allAlerts)

  const filtered = filter === "All" ? alerts : alerts.filter((a) =>
    filter === "Unread" ? !a.read : a.category === filter
  )

  const markAllRead = () => setAlerts(alerts.map((a) => ({ ...a, read: true })))
  const unreadCount = alerts.filter((a) => !a.read).length

  return (
    <PageLayout role="individual" title="Alerts" subtitle={`${unreadCount} unread alerts`} alertCount={unreadCount}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          {["All", "Unread", "Threat", "Blocked", "Account", "Report"].map((f) => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)}>
              {f}
              {f === "Unread" && unreadCount > 0 && (
                <span className="ml-1.5 bg-destructive text-destructive-foreground text-[10px] rounded-full px-1.5 py-0.5 font-bold">{unreadCount}</span>
              )}
            </Button>
          ))}
          <div className="ml-auto">
            <Button size="sm" variant="ghost" onClick={markAllRead}>Mark All Read</Button>
          </div>
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          {filtered.map((alert) => {
            const config = severityConfig[alert.severity]
            const Icon = config.icon
            return (
              <Card key={alert.id} className={`p-5 ${!alert.read ? "border-primary/30 bg-primary/5" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-foreground">{alert.title}</h3>
                        {!alert.read && <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                        <Badge className={`text-xs border-0 ${config.bg} ${config.color}`}>{alert.severity}</Badge>
                        <Badge className="text-xs border-0 bg-muted text-muted-foreground">{alert.category}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{alert.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.desc}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="ghost" className="h-7 text-xs flex items-center gap-1">
                        <Archive className="h-3 w-3" /> Save Evidence
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 text-xs flex items-center gap-1">
                        <ArrowRight className="h-3 w-3" /> View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </PageLayout>
  )
}
