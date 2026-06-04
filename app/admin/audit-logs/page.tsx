'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Loader2, AlertTriangle } from "lucide-react"
import { useAdminAuditLogs } from "@/lib/hooks"

type AuditRow = {
  id: string
  action?: string
  actorType?: string | null
  actorId?: string | null
  targetType?: string | null
  targetId?: string | null
  ipAddress?: string | null
  createdAt?: string
}

export default function AdminAuditLogsPage() {
  const { data, isLoading, error } = useAdminAuditLogs()
  const logs = (data ?? []) as AuditRow[]

  return (
    <PageLayout role="admin" title="Audit Logs" subtitle="System-wide audit trail and change history">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading audit trail…
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600">
            <AlertTriangle className="h-5 w-5" /> Could not load audit logs (reviewer access required).
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
            <ClipboardList className="h-8 w-8" />
            <p className="font-medium">No audit entries yet</p>
          </div>
        ) : (
          logs.map((log) => {
            const resource = [log.targetType, log.targetId?.slice(0, 8)].filter(Boolean).join(" ")
            return (
              <Card key={log.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <ClipboardList className="h-4 w-4 text-primary" />
                      <h3 className="font-bold text-foreground">{log.action ?? "Action"}</h3>
                      {log.actorType && <Badge className="bg-slate-100 text-slate-700 border-0">{log.actorType}</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {log.actorId ? `${log.actorId.slice(0, 8)} · ` : ""}
                      {log.createdAt ? new Date(log.createdAt).toLocaleString() : ""}
                      {resource ? ` · ${resource}` : ""}
                      {log.ipAddress ? ` · ${log.ipAddress}` : ""}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </PageLayout>
  )
}
