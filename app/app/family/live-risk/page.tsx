'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Phone, AlertTriangle, Shield, Zap } from "lucide-react"
import { useState } from "react"

const members = [
  { name: "Margaret Smith", risk: 62, status: "On active call", activeCall: true, modules: { calls: true, sms: true, email: true, screen: true } },
  { name: "Robert Smith", risk: 8, status: "No active threats", activeCall: false, modules: { calls: true, sms: true, email: false, screen: false } },
  { name: "Susan Lee", risk: 5, status: "No activity", activeCall: false, modules: { calls: true, sms: false, email: false, screen: false } },
]

function RiskGauge({ score }: { score: number }) {
  const color = score > 60 ? "text-red-600" : score > 30 ? "text-yellow-600" : "text-green-600"
  const bg = score > 60 ? "bg-red-500" : score > 30 ? "bg-yellow-500" : "bg-green-500"
  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${color}`}>{score}</div>
      <div className="text-xs text-muted-foreground">/ 100</div>
      <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden w-24 mx-auto">
        <div className={`h-full ${bg} rounded-full transition-all`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export default function FamilyLiveRiskPage() {
  return (
    <PageLayout role="family" title="Live Risk Monitor" subtitle="Real-time risk status for all protected members">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-700 border-0">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
            Live — Updating every 5 seconds
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {members.map((m, i) => (
            <Card key={i} className={`p-5 ${m.risk > 60 ? "border-red-300" : ""}`}>
              {m.activeCall && (
                <div className="flex items-center gap-2 text-xs text-red-600 font-semibold mb-3 bg-red-50 px-2 py-1 rounded">
                  <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
                  ACTIVE CALL IN PROGRESS
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-foreground">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.status}</p>
                </div>
                <RiskGauge score={m.risk} />
              </div>
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {Object.entries(m.modules).map(([key, active]) => (
                  <div key={key} className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded ${active ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-green-500" : "bg-muted-foreground"}`} />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                ))}
              </div>
              {m.activeCall && (
                <Button size="sm" variant="destructive" className="w-full flex items-center gap-2 text-xs">
                  <Zap className="h-3.5 w-3.5" /> Intervene Now
                </Button>
              )}
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" /> Live Event Stream
          </h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {[
              { time: "14:32:04", member: "Margaret", event: "Call in progress — risk climbing: 62/100", color: "text-red-600" },
              { time: "14:31:50", member: "Margaret", event: "Voice pattern: possible scripted pressure tactic", color: "text-yellow-600" },
              { time: "14:31:22", member: "Margaret", event: "Call answered — analyzing caller identity", color: "text-blue-600" },
              { time: "14:28:11", member: "Robert", event: "SMS analyzed — clean", color: "text-green-600" },
              { time: "14:15:00", member: "Susan", event: "No activity", color: "text-muted-foreground" },
            ].map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 text-sm">
                <span className="text-xs text-muted-foreground font-mono w-16">{e.time}</span>
                <span className="text-xs font-bold text-primary w-20">{e.member}</span>
                <span className={`flex-1 ${e.color}`}>{e.event}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
