'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, CheckCircle } from "lucide-react"

export default function EnterpriseDevicesPage() {
  return (
    <PageLayout role="enterprise" title="Device Management" subtitle="Monitor and manage connected devices">
      <div className="space-y-6">
        {[
          { id: "DEV-001", type: "Desktop", owner: "Alice Chen", status: "Secure", lastSeen: "Now", mfa: "Enabled" },
          { id: "DEV-002", type: "Laptop", owner: "Bob Martinez", status: "Secure", lastSeen: "5 min ago", mfa: "Enabled" },
          { id: "DEV-003", type: "Mobile", owner: "Carol Williams", status: "Warning", lastSeen: "2 hours ago", mfa: "Disabled" },
        ].map((device) => (
          <Card key={device.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Monitor className="h-4 w-4 text-primary mt-1" />
                <div>
                  <h3 className="font-bold text-foreground">{device.type}</h3>
                  <p className="text-xs text-muted-foreground">{device.owner} · {device.lastSeen}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={device.status === "Secure" ? "bg-green-100 text-green-700 border-0" : "bg-yellow-100 text-yellow-700 border-0"}>{device.status}</Badge>
                <Badge variant="outline">{device.mfa === "Enabled" ? "MFA ✓" : "No MFA"}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
