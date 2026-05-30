'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Zap, CheckCircle, AlertCircle, Clock, Key, RefreshCw, Settings, Plus } from "lucide-react"

const INTEGRATIONS = [
  {
    id: "core-banking", name: "Core Banking System", vendor: "FIS Systematics",
    category: "Core", status: "Connected", lastSync: "2 min ago",
    description: "Real-time transaction feed, account status, and customer profile data.",
    features: ["Live transaction stream", "Account freeze/unfreeze", "Customer PII lookup", "Balance queries"],
    apiVersion: "v3.2", callsToday: 14820
  },
  {
    id: "fraud-network", name: "FraudNet Intelligence Exchange", vendor: "Early Warning®",
    category: "Intelligence", status: "Connected", lastSync: "5 min ago",
    description: "Shared fraud intelligence network — receive and contribute scam signals across 2,400+ institutions.",
    features: ["Incoming threat signals", "Outbound alert sharing", "Compromised account registry", "Velocity patterns"],
    apiVersion: "v2.1", callsToday: 3410
  },
  {
    id: "fincen", name: "FinCEN SAR Submission", vendor: "Financial Crimes Enforcement Network",
    category: "Regulatory", status: "Connected", lastSync: "1 hour ago",
    description: "Direct SAR filing and BSA reporting pipeline.",
    features: ["SAR auto-generation", "Direct FinCEN submission", "Case reference linking", "Compliance audit trail"],
    apiVersion: "v4.0", callsToday: 12
  },
  {
    id: "twilio", name: "Customer Communications", vendor: "Twilio",
    category: "Comms", status: "Connected", lastSync: "Active",
    description: "Outbound SMS, voice alerts, and 2FA for Guardian Pause™ confirmations.",
    features: ["SMS alerts", "Voice callbacks", "2FA delivery", "Warm transfer"],
    apiVersion: "v2", callsToday: 482
  },
  {
    id: "lea-portal", name: "Law Enforcement Portal", vendor: "VIGISCAM™ LEA Gateway",
    category: "Legal", status: "Connected", lastSync: "1 day ago",
    description: "Secure evidence submission to FBI IC3, FTC, and local law enforcement.",
    features: ["Encrypted uploads", "Case tracking", "Subpoena response", "Chain-of-custody"],
    apiVersion: "v1.4", callsToday: 3
  },
  {
    id: "siem", name: "SIEM / SOC Integration", vendor: "Splunk Enterprise",
    category: "Security", status: "Disconnected", lastSync: "—",
    description: "Stream BankGuard events into your existing Security Operations Center infrastructure.",
    features: ["Real-time event stream", "Custom alert rules", "Correlation with cyber threats", "Incident enrichment"],
    apiVersion: "v3.0", callsToday: 0
  },
]

const categoryColor: Record<string, string> = {
  "Core": "bg-blue-100 text-blue-700",
  "Intelligence": "bg-purple-100 text-purple-700",
  "Regulatory": "bg-orange-100 text-orange-700",
  "Comms": "bg-green-100 text-green-700",
  "Legal": "bg-red-100 text-red-700",
  "Security": "bg-muted text-muted-foreground",
}

export default function BankGuardIntegrationsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    "core-banking": true, "fraud-network": true, "fincen": true, "twilio": true, "lea-portal": true, "siem": false
  })

  return (
    <PageLayout role="bankguard" title="Integrations" subtitle="Connect BankGuard to your existing banking and compliance infrastructure">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Integrations", value: "5", color: "text-green-600", icon: CheckCircle },
            { label: "Disconnected", value: "1", color: "text-muted-foreground", icon: AlertCircle },
            { label: "API Calls Today", value: "18,727", color: "text-primary", icon: Zap },
            { label: "Last Full Sync", value: "2 min ago", color: "text-foreground", icon: RefreshCw },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <Card key={i} className="p-4 flex items-center gap-4">
                <Icon className={`h-5 w-5 ${s.color}`} />
                <div>
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Add Integration CTA */}
        <Card className="p-4 border-dashed border-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Add a new integration</p>
              <p className="text-xs text-muted-foreground">Connect additional core banking, fraud networks, SIEM, or compliance systems.</p>
            </div>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Browse Integrations</Button>
          </div>
        </Card>

        {/* Integration Cards */}
        <div className="grid gap-4">
          {INTEGRATIONS.map((intg, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-foreground">{intg.name}</h3>
                      <Badge className={`text-xs border-0 ${categoryColor[intg.category]}`}>{intg.category}</Badge>
                      <Badge className={`text-xs border-0 ${intg.status === "Connected" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                        {intg.status === "Connected" ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                        {intg.status}
                      </Badge>
                    </div>
                    <Switch
                      checked={enabled[intg.id]}
                      onCheckedChange={(v) => setEnabled(prev => ({ ...prev, [intg.id]: v }))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{intg.vendor} · API {intg.apiVersion}</p>
                  <p className="text-sm text-muted-foreground mb-3">{intg.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {intg.features.map((f, j) => (
                      <Badge key={j} className="bg-muted text-muted-foreground border-0 text-xs">{f}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Last sync: {intg.lastSync}</span>
                      {intg.callsToday > 0 && <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> {intg.callsToday.toLocaleString()} calls today</span>}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1"><Key className="h-3 w-3" /> API Key</Button>
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1"><Settings className="h-3 w-3" /> Configure</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
