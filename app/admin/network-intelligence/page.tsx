'use client'

import useSWR from 'swr'
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Campaign = {
  id: string
  label?: string
  category?: string | null
  riskScore?: number
  signalCount?: number
  memberCount?: number
  firstSeen?: string
  lastSeen?: string
}

async function fetchCampaigns(): Promise<Campaign[]> {
  const { data, error, response } = await backend.GET('/api/v1/intelligence/graph/campaigns')
  if (error || !response.ok) throw new Error(`Failed to load networks (${response.status})`)
  return (data as unknown as Campaign[]) ?? []
}

function threat(score: number) {
  if (score >= 80) return { label: "Critical", cls: "bg-red-500 text-white border-0" }
  if (score >= 60) return { label: "High", cls: "bg-orange-500 text-white border-0" }
  if (score >= 40) return { label: "Medium", cls: "bg-yellow-500 text-white border-0" }
  return { label: "Low", cls: "bg-slate-400 text-white border-0" }
}

export default function AdminNetworkIntelligencePage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(
    isAuthenticated ? 'admin-network-intel' : null,
    fetchCampaigns,
    { revalidateOnFocus: false },
  )
  const networks = data ?? []

  return (
    <PageLayout role="admin" title="Network Intelligence" subtitle="Global threat intelligence and actor networks">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading networks…
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600">
            <AlertTriangle className="h-5 w-5" /> Could not load networks (reviewer access required).
          </div>
        ) : networks.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
            <Network className="h-8 w-8" />
            <p className="font-medium">No fraud-actor networks mapped yet</p>
          </div>
        ) : (
          networks.map((network) => {
            const t = threat(network.riskScore ?? 0)
            return (
              <Card key={network.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Network className="h-4 w-4 text-primary" />
                      <h3 className="font-bold text-foreground line-clamp-1">{network.label ?? "Network"}</h3>
                      <Badge className={t.cls}>{t.label}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {network.category ?? "uncategorised"}
                      {network.lastSeen ? ` · last active ${new Date(network.lastSeen).toLocaleDateString()}` : ""}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                  <div><p className="text-xs text-muted-foreground">Members</p><p className="font-semibold">{network.memberCount ?? "—"}</p></div>
                  <div><p className="text-xs text-muted-foreground">Signals</p><p className="font-semibold">{network.signalCount ?? 0}</p></div>
                  <div><p className="text-xs text-muted-foreground">Risk</p><p className="font-semibold">{network.riskScore ?? 0}/100</p></div>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </PageLayout>
  )
}
