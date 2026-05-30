'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Mic, Monitor, Phone, Shield, AlertTriangle, Eye, Volume2, Pause, Play } from "lucide-react"
import { useState } from "react"

export default function LiveProtectionPage() {
  const [monitoring, setMonitoring] = useState(true)

  return (
    <PageLayout role="individual" title="Live Protection" subtitle="Real-time monitoring and threat detection">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Status Banner */}
        <Card className={`p-4 border-2 ${monitoring ? "border-green-500 bg-green-50" : "border-muted"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${monitoring ? "bg-green-500 animate-pulse" : "bg-muted-foreground"}`} />
              <span className="font-semibold text-foreground">
                {monitoring ? "Active Monitoring — All Systems Operational" : "Monitoring Paused"}
              </span>
            </div>
            <Button
              variant={monitoring ? "destructive" : "default"}
              size="sm"
              onClick={() => setMonitoring(!monitoring)}
              className="flex items-center gap-2"
            >
              {monitoring ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {monitoring ? "Pause Monitoring" : "Resume Monitoring"}
            </Button>
          </div>
        </Card>

        {/* Module Status Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "A1SCAMSHIELD", label: "Call Analysis", icon: Phone, status: "Monitoring", detail: "847 calls analyzed today", color: "text-green-600", bg: "bg-green-50" },
            { name: "VoiceMatchSeal", label: "Voice Authentication", icon: Mic, status: "Active", detail: "No cloning detected", color: "text-blue-600", bg: "bg-blue-50" },
            { name: "CamViguard", label: "Screen Guard", icon: Eye, status: monitoring ? "Active" : "Paused", detail: "Watching for RAT activity", color: "text-purple-600", bg: "bg-purple-50" },
            { name: "SceneSeal", label: "Scene Analysis", icon: Monitor, status: "Standby", detail: "Activates on video call", color: "text-orange-600", bg: "bg-orange-50" },
            { name: "SCAMZY", label: "Scam Intelligence", icon: Shield, status: "Active", detail: "0 active threats", color: "text-green-600", bg: "bg-green-50" },
            { name: "LiveFaceSeal", label: "Deepfake Detection", icon: Volume2, status: "Standby", detail: "Activates on video call", color: "text-gray-600", bg: "bg-gray-50" },
          ].map((mod, i) => {
            const Icon = mod.icon
            return (
              <Card key={i} className="p-5">
                <div className={`w-10 h-10 ${mod.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`h-5 w-5 ${mod.color}`} />
                </div>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-xs text-muted-foreground">{mod.name}</p>
                    <p className="text-sm font-bold text-foreground">{mod.label}</p>
                  </div>
                  <Badge className={`text-xs border-0 ${mod.status === "Active" || mod.status === "Monitoring" ? "bg-green-100 text-green-700" : mod.status === "Paused" ? "bg-red-100 text-red-700" : "bg-muted text-muted-foreground"}`}>
                    {mod.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{mod.detail}</p>
              </Card>
            )
          })}
        </div>

        {/* Live Feed */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Live Event Feed
            </h2>
            <Badge className="bg-green-100 text-green-700 border-0 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 inline-block animate-pulse" />
              Live
            </Badge>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {[
              { time: "14:32:01", event: "Call screened — no threat detected", module: "A1SCAMSHIELD", color: "text-green-600" },
              { time: "14:31:44", event: "Voice analysis: caller identity verified", module: "VoiceMatchSeal", color: "text-blue-600" },
              { time: "14:28:12", event: "Email scanned — no scam indicators", module: "SCAMZY", color: "text-green-600" },
              { time: "14:15:33", event: "SMS analyzed — phishing link detected and blocked", module: "SCAMZY", color: "text-red-600" },
              { time: "13:58:07", event: "Screen activity normal — no RAT patterns", module: "CamViguard", color: "text-green-600" },
              { time: "13:44:21", event: "Call screened — no threat detected", module: "A1SCAMSHIELD", color: "text-green-600" },
              { time: "13:20:55", event: "Deepfake check: video call analyzed — authentic", module: "LiveFaceSeal", color: "text-blue-600" },
            ].map((event, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors text-sm">
                <span className="text-xs text-muted-foreground font-mono w-16 flex-shrink-0">{event.time}</span>
                <span className={`flex-1 ${event.color}`}>{event.event}</span>
                <Badge className="text-[10px] border-0 bg-muted text-muted-foreground">{event.module}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Threat Alert */}
        <Card className="p-6 border-yellow-300 bg-yellow-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-foreground mb-1">Advisory: Active Phishing Campaign Detected</h3>
              <p className="text-sm text-muted-foreground">
                SCAMZY intelligence indicates an active bank impersonation campaign targeting your area. Be extra cautious of calls claiming to be from your bank.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
