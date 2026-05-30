'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, Laptop, CheckCircle, AlertTriangle, Trash2, Shield, PlusCircle, Wifi } from "lucide-react"

const devices = [
  { name: "iPhone 15 Pro", type: "phone", os: "iOS 18.2", lastSeen: "Now", status: "protected", agent: "VIGISCAM™ Mobile v4.2.1" },
  { name: "MacBook Pro 14\"", type: "laptop", os: "macOS 15.2", lastSeen: "2h ago", status: "protected", agent: "VIGISCAM™ Desktop v4.2.1" },
  { name: "iPad Air", type: "tablet", os: "iPadOS 18.2", lastSeen: "3 days ago", status: "outdated", agent: "VIGISCAM™ Mobile v4.1.0" },
  { name: "Windows PC (Work)", type: "desktop", os: "Windows 11", lastSeen: "1 week ago", status: "unprotected", agent: "Not installed" },
]

const typeIcon: Record<string, typeof Monitor> = { phone: Smartphone, laptop: Laptop, tablet: Monitor, desktop: Monitor }

export default function DevicesPage() {
  return (
    <PageLayout role="individual" title="Devices" subtitle="Manage devices protected by VIGISCAM™">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Protected", value: "2", color: "text-green-600" },
              { label: "Needs Update", value: "1", color: "text-yellow-600" },
              { label: "Unprotected", value: "1", color: "text-red-600" },
            ].map((s, i) => (
              <Card key={i} className="p-4 text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </Card>
            ))}
          </div>
          <Button size="sm" className="flex items-center gap-2 ml-4">
            <PlusCircle className="h-4 w-4" /> Add Device
          </Button>
        </div>

        <div className="space-y-4">
          {devices.map((device, i) => {
            const Icon = typeIcon[device.type]
            return (
              <Card key={i} className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-foreground">{device.name}</h3>
                      <Badge className={`text-xs border-0 ${device.status === "protected" ? "bg-green-100 text-green-700" : device.status === "outdated" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                        {device.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      <p>{device.os}</p>
                      <p className="flex items-center gap-1.5"><Wifi className="h-3.5 w-3.5" /> Last seen: {device.lastSeen}</p>
                      <p className="text-xs">Agent: {device.agent}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {device.status === "outdated" && <Button size="sm" variant="outline" className="text-xs">Update Agent</Button>}
                    {device.status === "unprotected" && <Button size="sm" className="text-xs"><Shield className="h-3.5 w-3.5 mr-1" />Install</Button>}
                    <Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
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
