'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Search, Filter, Archive, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const calls = [
  { number: "+61 2 9876 5432", direction: "in", duration: "4m 12s", risk: "high", verdict: "Bank Impersonation", time: "Today 14:23", analyzed: true },
  { number: "+61 3 5555 1234", direction: "in", duration: "1m 05s", risk: "low", verdict: "Legitimate", time: "Today 11:08", analyzed: true },
  { number: "+1 800 555 0123", direction: "in", duration: "2m 47s", risk: "medium", verdict: "Suspected Scam", time: "Yesterday 16:44", analyzed: true },
  { number: "+61 4 1234 5678", direction: "out", duration: "8m 31s", risk: "low", verdict: "Outgoing", time: "Yesterday 09:15", analyzed: false },
  { number: "Unknown", direction: "missed", duration: "—", risk: "medium", verdict: "Unanswered", time: "2 days ago", analyzed: false },
  { number: "+61 2 8000 7777", direction: "in", duration: "6m 02s", risk: "high", verdict: "Tech Support Scam", time: "3 days ago", analyzed: true },
]

const directionIcon: Record<string, typeof Phone> = {
  in: PhoneIncoming,
  out: PhoneOutgoing,
  missed: PhoneMissed,
}

export default function CallsPage() {
  return (
    <PageLayout role="individual" title="Calls" subtitle="Call history with real-time scam analysis">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Total Calls", value: "847", icon: Phone, color: "text-primary" },
            { label: "Scams Blocked", value: "14", icon: AlertTriangle, color: "text-red-600" },
            { label: "Calls Analyzed", value: "743", icon: CheckCircle, color: "text-green-600" },
            { label: "Avg Risk Score", value: "12/100", icon: Clock, color: "text-blue-600" },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${s.color}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search calls..." className="pl-9 h-9" />
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            {["All", "High Risk", "Medium Risk", "Low Risk"].map((f) => (
              <Button key={f} variant={f === "All" ? "default" : "outline"} size="sm">{f}</Button>
            ))}
          </div>
        </Card>

        {/* Call List */}
        <Card className="divide-y divide-border">
          {calls.map((call, i) => {
            const Icon = directionIcon[call.direction]
            return (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${call.direction === "missed" ? "bg-red-100" : "bg-muted"}`}>
                  <Icon className={`h-4 w-4 ${call.direction === "missed" ? "text-red-600" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{call.number}</span>
                    {call.analyzed && (
                      <Badge className={`text-xs border-0 ${call.risk === "high" ? "bg-red-100 text-red-700" : call.risk === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                        {call.verdict}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{call.time} · {call.duration}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {call.analyzed && (
                    <Button size="sm" variant="ghost" className="h-8 text-xs">
                      <Archive className="h-3.5 w-3.5 mr-1" />
                      Save
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="h-8 text-xs">Details</Button>
                </div>
              </div>
            )
          })}
        </Card>
      </div>
    </PageLayout>
  )
}
