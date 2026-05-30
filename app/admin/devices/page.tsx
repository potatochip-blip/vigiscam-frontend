'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Activity } from "lucide-react"

export default function AdminDevicesPage() {
  return (
    <PageLayout role="admin" title="Device Monitoring" subtitle="Track and manage all platform devices">
      <div className="space-y-6">
        {[
          { id: "DEV-SYS-001", type: "API Server", status: "Healthy", cpu: "42%", memory: "58%", uptime: "45 days" },
          { id: "DEV-SYS-002", type: "Cache Server", status: "Healthy", cpu: "28%", memory: "71%", uptime: "45 days" },
          { id: "DEV-SYS-003", type: "Database", status: "Warning", cpu: "89%", memory: "94%", uptime: "45 days" },
        ].map((device) => (
          <Card key={device.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Monitor className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{device.type}</h3>
                  <Badge className={device.status === "Healthy" ? "bg-green-100 text-green-700 border-0" : "bg-yellow-100 text-yellow-700 border-0"}>{device.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Uptime: {device.uptime}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span>CPU: {device.cpu}</span>
                <span>Memory: {device.memory}</span>
                <Button size="sm" variant="outline">Details</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
