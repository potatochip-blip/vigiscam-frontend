'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radio, Loader2, AlertTriangle } from "lucide-react"
import { useAdminLiveSessions } from "@/lib/hooks"

type SessionRow = {
  id: string
  type?: string
  status?: string
  riskScore?: number
  startedAt?: string
  endedAt?: string | null
  userId?: string
  tenantId?: string
}

export default function AdminLiveSessionsPage() {
  const { data, isLoading, error } = useAdminLiveSessions()
  const sessions = (data ?? []) as SessionRow[]

  return (
    <PageLayout role="admin" title="Live Sessions" subtitle="Monitor active user sessions in real-time">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading sessions…
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600">
            <AlertTriangle className="h-5 w-5" /> Could not load sessions (reviewer access required).
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
            <Radio className="h-8 w-8" />
            <p className="font-medium">No sessions</p>
          </div>
        ) : (
          sessions.map((session) => {
            const active = session.status === "ACTIVE"
            return (
              <Card key={session.id} className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Radio className={`h-4 w-4 ${active ? "text-green-500 animate-pulse" : "text-muted-foreground"}`} />
                      <h3 className="font-bold text-foreground">{session.type ?? "Session"}</h3>
                      <Badge className={active ? "bg-green-100 text-green-700 border-0" : "bg-gray-100 text-gray-700 border-0"}>
                        {session.status ?? "—"}
                      </Badge>
                      {typeof session.riskScore === "number" && session.riskScore > 0 && (
                        <Badge className="bg-orange-100 text-orange-700 border-0">Risk {session.riskScore}</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.userId ? `user ${session.userId.slice(0, 8)} · ` : ""}
                      {session.startedAt ? `started ${new Date(session.startedAt).toLocaleString()}` : ""}
                      {session.endedAt ? ` · ended ${new Date(session.endedAt).toLocaleTimeString()}` : ""}
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
