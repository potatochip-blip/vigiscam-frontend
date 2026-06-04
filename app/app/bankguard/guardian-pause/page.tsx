'use client'

import useSWR from "swr"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldQuestion, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Pause = { id: string; riskLevel?: string; triggerType?: string; triggerSummary?: string; status?: string; startedAt?: string }

async function fetchPauses(): Promise<Pause[]> {
  const { data, error, response } = await backend.GET("/api/v1/guardian-pause/history")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as unknown as Pause[]) ?? []
}

export default function BankGuardGuardianPausePage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "bankguard-pauses" : null, fetchPauses, { revalidateOnFocus: false })
  const pauses = data ?? []

  return (
    <PageLayout role="bankguard" title="Guardian Pause" subtitle="Transaction pauses triggered for at-risk customers">
      <div className="max-w-7xl mx-auto space-y-4">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load pauses.</div>
        ) : pauses.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground"><ShieldQuestion className="h-8 w-8" /><p className="font-medium">No Guardian Pause events</p></div>
        ) : pauses.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{p.triggerSummary ?? p.triggerType ?? "Pause"}</p>
                <p className="text-xs text-muted-foreground">{p.startedAt ? new Date(p.startedAt).toLocaleString() : ""}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {p.riskLevel && <Badge className="bg-amber-100 text-amber-700 border-0">{p.riskLevel}</Badge>}
                {p.status && <Badge variant="outline" className="text-xs">{p.status}</Badge>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
