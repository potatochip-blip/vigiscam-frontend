'use client'

import useSWR from 'swr'
import { PageLayout } from '@/components/dashboard/page-layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react'
import { backend } from '@/lib/backend'
import { useAuth } from '@/lib/auth-context'

interface EvidenceEvent {
  id: string
  eventType: string
  eventDescription: string
  eventHash: string
  previousHash: string | null
  occurredAt: string
  entityType: string
}
interface ChainVerification {
  intact: boolean
  totalEvents: number
  brokenAtSequence?: number
  reason?: string
}

async function fetchTimeline(): Promise<EvidenceEvent[]> {
  // entityType/entityId are optional (omit = no filter, full timeline).
  const { data, error, response } = await backend.GET('/api/v1/evidence/timeline')
  if (error || !response.ok) throw new Error(`Failed to load evidence (${response.status})`)
  return (data as unknown as EvidenceEvent[]) ?? []
}
async function fetchVerify(): Promise<ChainVerification> {
  const { data, error, response } = await backend.GET('/api/v1/evidence/verify')
  if (error || !response.ok) throw new Error(`Failed to verify chain (${response.status})`)
  return data as unknown as ChainVerification
}

export default function AdminEvidencePage() {
  const { isAuthenticated } = useAuth()
  const { data: timeline, error, isLoading } = useSWR(
    isAuthenticated ? 'evidence-timeline' : null,
    fetchTimeline,
    { revalidateOnFocus: false },
  )
  const { data: verify } = useSWR(isAuthenticated ? 'evidence-verify' : null, fetchVerify, {
    revalidateOnFocus: false,
  })

  return (
    <PageLayout
      role="admin"
      title="Evidence Vault"
      subtitle="Tamper-evident, hash-chained evidence for this tenant"
    >
      <div className="space-y-6">
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            Could not load evidence. {String((error as Error).message ?? error)}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="p-6">
            <p className="text-xs text-muted-foreground">Chain events</p>
            <p className="text-2xl font-bold text-foreground">
              {verify ? verify.totalEvents.toLocaleString() : '—'}
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2">
              {verify?.intact ? (
                <ShieldCheck className="h-5 w-5 text-green-600" />
              ) : verify ? (
                <ShieldAlert className="h-5 w-5 text-destructive" />
              ) : (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              )}
              <div>
                <p className="text-xs text-muted-foreground">Chain integrity</p>
                <p className="text-lg font-bold text-foreground">
                  {verify ? (verify.intact ? 'Intact' : 'Broken') : 'Verifying…'}
                </p>
              </div>
            </div>
            {verify && !verify.intact && verify.reason && (
              <p className="mt-2 text-xs text-destructive">{verify.reason}</p>
            )}
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Recent evidence events</h3>
          {isLoading && !timeline && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading evidence chain…
            </div>
          )}
          {timeline && timeline.length === 0 && (
            <p className="text-sm text-muted-foreground">No evidence events yet.</p>
          )}
          <div className="space-y-2">
            {timeline?.slice(0, 50).map((ev) => (
              <div key={ev.id} className="flex items-center justify-between p-3 bg-muted/40 rounded">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary/10 text-primary border-0">{ev.eventType}</Badge>
                    <span className="text-xs text-muted-foreground">{ev.entityType}</span>
                  </div>
                  <p className="text-sm text-foreground truncate mt-1">{ev.eventDescription}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-xs text-muted-foreground">
                    {new Date(ev.occurredAt).toLocaleString()}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground/60">
                    {ev.eventHash.slice(0, 12)}…
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
