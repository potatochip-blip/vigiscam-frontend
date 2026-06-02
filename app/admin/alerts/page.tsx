'use client'

import useSWR from 'swr'
import { PageLayout } from '@/components/dashboard/page-layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { backend } from '@/lib/backend'
import { useAuth } from '@/lib/auth-context'

interface Alert {
  id: string
  type: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string
  title: string
  message: string
  readAt: string | null
  createdAt: string
}

async function fetchAlerts(): Promise<Alert[]> {
  // `unread` is optional on the backend (empty = all); spec marks it required.
  const { data, error, response } = await backend.GET('/api/v1/alerts', {
    params: { query: { unread: '' } },
  })
  if (error || !response.ok) throw new Error(`Failed to load alerts (${response.status})`)
  // The endpoint may return a bare array or a paginated shape.
  const raw = data as unknown as Alert[] | { items?: Alert[] }
  return Array.isArray(raw) ? raw : (raw.items ?? [])
}

const sevColor = (s: string) =>
  s === 'CRITICAL' || s === 'HIGH'
    ? 'bg-red-500 text-white'
    : s === 'MEDIUM'
      ? 'bg-orange-500 text-white'
      : 'bg-muted text-muted-foreground'

export default function AdminAlertsPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(
    isAuthenticated ? 'admin-alerts' : null,
    fetchAlerts,
    { revalidateOnFocus: false },
  )

  return (
    <PageLayout role="admin" title="System Alerts" subtitle="Alerts for your tenant">
      <div className="space-y-6">
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            Could not load alerts. {String((error as Error).message ?? error)}
          </div>
        )}
        {isLoading && !data && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading alerts…
          </div>
        )}
        {data && data.length === 0 && (
          <p className="text-sm text-muted-foreground">No alerts for this tenant.</p>
        )}

        {data?.map((alert) => (
          <Card key={alert.id} className={`p-6 ${alert.readAt ? 'opacity-70' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className={`h-4 w-4 mt-1 ${
                    alert.severity === 'HIGH' || alert.severity === 'CRITICAL'
                      ? 'text-red-600'
                      : 'text-orange-600'
                  }`}
                />
                <div>
                  <h3 className="font-bold text-foreground">{alert.title}</h3>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.type} · {new Date(alert.createdAt).toLocaleString()}
                    {alert.readAt ? ' · read' : ''}
                  </p>
                </div>
              </div>
              <Badge className={`${sevColor(alert.severity)} border-0`}>{alert.severity}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
