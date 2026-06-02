'use client'

import useSWR from 'swr'
import { PageLayout } from '@/components/dashboard/page-layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cpu, Loader2, Cloud, HardDrive } from 'lucide-react'
import { backend } from '@/lib/backend'
import { useAuth } from '@/lib/auth-context'

interface AiEngine {
  serviceKind: string
  label: string
  mode: 'STUB' | 'EXTERNAL'
  fallback: string
}
interface AiStatus {
  aiServiceConfigured: boolean
  defaultMode: 'STUB' | 'EXTERNAL'
  engines: AiEngine[]
  note: string
}
interface UsageRow {
  serviceKind: string
  source: 'STUB' | 'EXTERNAL'
  count: number
}

async function fetchStatus(): Promise<AiStatus> {
  const { data, error, response } = await backend.GET('/api/v1/intelligence/ai-status')
  if (error || !response.ok) throw new Error(`Failed to load AI status (${response.status})`)
  return data as unknown as AiStatus
}
async function fetchUsage(): Promise<UsageRow[]> {
  const { data, error, response } = await backend.GET('/api/v1/intelligence/ai-status/usage')
  if (error || !response.ok) throw new Error(`Failed to load usage (${response.status})`)
  return (data as unknown as UsageRow[]) ?? []
}

export default function AdminModelsPage() {
  const { isAuthenticated } = useAuth()
  const { data: status, error, isLoading } = useSWR(
    isAuthenticated ? 'ai-status' : null,
    fetchStatus,
    { revalidateOnFocus: false },
  )
  const { data: usage } = useSWR(isAuthenticated ? 'ai-usage' : null, fetchUsage, {
    revalidateOnFocus: false,
  })

  const countFor = (serviceKind: string, source: 'STUB' | 'EXTERNAL') =>
    usage?.find((u) => u.serviceKind === serviceKind && u.source === source)?.count ?? 0

  return (
    <PageLayout
      role="admin"
      title="AI Model Management"
      subtitle="Self-hosted open-model engine — live status per capability"
    >
      <div className="space-y-6">
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            Could not load AI status. {String((error as Error).message ?? error)}
          </div>
        )}
        {isLoading && !status && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading AI engine status…
          </div>
        )}

        {status && (
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {status.aiServiceConfigured ? (
                  <Cloud className="h-5 w-5 text-green-600" />
                ) : (
                  <HardDrive className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <h3 className="font-bold text-foreground">
                    AI worker {status.aiServiceConfigured ? 'connected' : 'not configured'}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Default mode: {status.defaultMode}
                    {status.aiServiceConfigured
                      ? ' — real self-hosted models'
                      : ' — deterministic in-process stubs'}
                  </p>
                </div>
              </div>
              <Badge
                className={
                  status.defaultMode === 'EXTERNAL'
                    ? 'bg-green-100 text-green-700 border-0'
                    : 'bg-muted text-muted-foreground border-0'
                }
              >
                {status.defaultMode}
              </Badge>
            </div>
          </Card>
        )}

        {status?.engines.map((engine) => (
          <Card key={engine.serviceKind} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Cpu className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{engine.label}</h3>
                  <Badge
                    className={
                      engine.mode === 'EXTERNAL'
                        ? 'bg-green-100 text-green-700 border-0'
                        : 'bg-muted text-muted-foreground border-0'
                    }
                  >
                    {engine.mode}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {engine.serviceKind} · fallback: {engine.fallback}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {countFor(engine.serviceKind, 'EXTERNAL').toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  real calls · {countFor(engine.serviceKind, 'STUB').toLocaleString()} stub
                </p>
              </div>
            </div>
          </Card>
        ))}

        {status?.note && <p className="text-xs text-muted-foreground">{status.note}</p>}
      </div>
    </PageLayout>
  )
}
