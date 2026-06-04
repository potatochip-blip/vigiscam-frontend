'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor, Loader2, AlertTriangle } from "lucide-react"
import { useAdminDevices } from "@/lib/hooks"

type DeviceRow = {
  id: string
  name?: string
  type?: string
  platform?: string | null
  status?: string
  trusted?: boolean
  lastSeenAt?: string | null
  tenantId?: string
}

export default function AdminDevicesPage() {
  const { data, isLoading, error } = useAdminDevices()
  const devices = (data ?? []) as DeviceRow[]

  return (
    <PageLayout role="admin" title="Device Monitoring" subtitle="Track and manage all platform devices">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading devices…
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600">
            <AlertTriangle className="h-5 w-5" /> Could not load devices (reviewer access required).
          </div>
        ) : devices.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
            <Monitor className="h-8 w-8" />
            <p className="font-medium">No registered devices yet</p>
          </div>
        ) : (
          devices.map((device) => (
            <Card key={device.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Monitor className="h-4 w-4 text-primary" />
                    <h3 className="font-bold text-foreground">{device.name ?? device.type ?? "Device"}</h3>
                    <Badge className={device.status === "ACTIVE" ? "bg-green-100 text-green-700 border-0" : "bg-yellow-100 text-yellow-700 border-0"}>
                      {device.status ?? "—"}
                    </Badge>
                    {device.trusted && <Badge className="bg-blue-100 text-blue-700 border-0">Trusted</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {[device.type, device.platform].filter(Boolean).join(" · ")}
                    {device.lastSeenAt ? ` · last seen ${new Date(device.lastSeenAt).toLocaleString()}` : ""}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </PageLayout>
  )
}
