'use client'

import useSWR from 'swr'
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Loader2, AlertTriangle, KeyRound } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Webhook = { id: string; url?: string; description?: string | null; status?: string; active?: boolean; eventTypes?: string[] }
type PartnerKey = { id: string; name?: string; keyPrefix?: string; status?: string; active?: boolean; tenantId?: string }

async function fetchIntegrations(): Promise<{ webhooks: Webhook[]; keys: PartnerKey[] }> {
  const [w, k] = await Promise.all([
    backend.GET('/api/v1/admin/webhook-subscriptions'),
    backend.GET('/api/v1/admin/partner-keys'),
  ])
  if (!w.response.ok && !k.response.ok) throw new Error('Failed to load integrations')
  return {
    webhooks: ((w.data as unknown as Webhook[]) ?? []),
    keys: ((k.data as unknown as PartnerKey[]) ?? []),
  }
}

export default function AdminIntegrationsPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(
    isAuthenticated ? 'admin-integrations' : null,
    fetchIntegrations,
    { revalidateOnFocus: false },
  )

  return (
    <PageLayout role="admin" title="Platform Integrations" subtitle="Webhook event destinations and partner API access">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading integrations…
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600">
            <AlertTriangle className="h-5 w-5" /> Could not load integrations (reviewer access required).
          </div>
        ) : (
          <>
            <Card className="p-6">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Webhook Event Destinations</h3>
              {(data?.webhooks.length ?? 0) === 0 ? (
                <p className="text-sm text-muted-foreground">No webhook destinations configured.</p>
              ) : (
                <div className="space-y-2">
                  {data?.webhooks.map((w) => (
                    <div key={w.id} className="flex items-center justify-between p-3 bg-muted/40 rounded gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{w.description || w.url || w.id.slice(0, 8)}</p>
                        {w.url && <p className="text-xs text-muted-foreground truncate">{w.url}</p>}
                      </div>
                      <Badge className={(w.active ?? w.status === "ACTIVE") ? "bg-green-100 text-green-700 border-0" : "bg-muted text-muted-foreground border-0"}>
                        {w.active ?? w.status === "ACTIVE" ? "Active" : (w.status ?? "Inactive")}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2"><KeyRound className="h-4 w-4 text-primary" /> Partner API Keys</h3>
              {(data?.keys.length ?? 0) === 0 ? (
                <p className="text-sm text-muted-foreground">No partner API keys issued.</p>
              ) : (
                <div className="space-y-2">
                  {data?.keys.map((k) => (
                    <div key={k.id} className="flex items-center justify-between p-3 bg-muted/40 rounded gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{k.name ?? k.id.slice(0, 8)}</p>
                        {k.keyPrefix && <p className="text-xs text-muted-foreground font-mono">{k.keyPrefix}…</p>}
                      </div>
                      <Badge className={(k.active ?? k.status === "ACTIVE") ? "bg-green-100 text-green-700 border-0" : "bg-muted text-muted-foreground border-0"}>
                        {k.active ?? k.status === "ACTIVE" ? "Active" : (k.status ?? "Revoked")}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </PageLayout>
  )
}
