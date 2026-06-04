'use client'

import useSWR from "swr"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Archive, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type EvidenceEvent = { id: string; eventType?: string; eventDescription?: string; entityType?: string; createdAt?: string }

async function fetchTimeline(): Promise<EvidenceEvent[]> {
  const { data, error, response } = await backend.GET("/api/v1/evidence/timeline")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  const d = data as unknown
  return Array.isArray(d) ? (d as EvidenceEvent[]) : ((d as { events?: EvidenceEvent[] })?.events ?? [])
}

export default function PlatformShieldEvidencePage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "platform-evidence" : null, fetchTimeline, { revalidateOnFocus: false })
  const events = data ?? []

  return (
    <PageLayout role="platformshield" title="Evidence Vault" subtitle="Hash-chained evidence trail">
      <div className="max-w-7xl mx-auto space-y-3">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading evidence…</div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load evidence.</div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground"><Archive className="h-8 w-8" /><p className="font-medium">No evidence events yet</p></div>
        ) : events.map((e) => (
          <Card key={e.id} className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{e.eventDescription ?? e.eventType ?? "Event"}</p>
                <p className="text-xs text-muted-foreground">{e.entityType}{e.createdAt ? ` · ${new Date(e.createdAt).toLocaleString()}` : ""}</p>
              </div>
              {e.eventType && <Badge variant="outline" className="text-xs flex-shrink-0">{e.eventType}</Badge>}
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
