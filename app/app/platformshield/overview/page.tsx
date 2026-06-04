'use client'

import useSWR from "swr"
import Link from "next/link"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShieldAlert, Flag, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type ModItem = { id: string; targetRef?: string; reason?: string; riskScore?: number; status?: string; decision?: string; createdAt?: string }

async function fetchQueue(): Promise<ModItem[]> {
  const { data, error, response } = await backend.GET("/api/v1/platform-portal/moderation-queue")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as unknown as ModItem[]) ?? []
}

export default function PlatformShieldOverviewPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "platformshield-queue" : null, fetchQueue, { revalidateOnFocus: false })
  const items = data ?? []

  return (
    <PageLayout role="platformshield" title="PlatformShield Overview" subtitle="AI-powered content moderation and scam network detection for digital platforms">
      <div className="max-w-7xl mx-auto space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load the moderation queue (platform role required).</div>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="p-5"><Flag className="h-5 w-5 text-red-600 mb-2" /><p className="text-xs text-muted-foreground mb-1">In Moderation Queue</p><p className="text-xl font-bold">{items.length}</p></Card>
              <Card className="p-5"><ShieldAlert className="h-5 w-5 text-primary mb-2" /><p className="text-xs text-muted-foreground mb-1">High-Risk</p><p className="text-xl font-bold">{items.filter((i) => (i.riskScore ?? 0) >= 80).length}</p></Card>
              <Card className="p-5"><Flag className="h-5 w-5 text-amber-600 mb-2" /><p className="text-xs text-muted-foreground mb-1">Undecided</p><p className="text-xl font-bold">{items.filter((i) => !i.decision).length}</p></Card>
            </div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Flag className="h-5 w-5 text-red-600" /> Moderation Queue</h2>
                <Button size="sm" asChild><Link href="/app/platformshield/moderation-queue">View All</Link></Button>
              </div>
              {items.length === 0 ? <p className="text-sm text-muted-foreground">Moderation queue is empty.</p> : (
                <div className="space-y-3">
                  {items.slice(0, 6).map((i) => (
                    <div key={i.id} className="flex items-center justify-between p-3 rounded-md border bg-muted/30 gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{i.targetRef ?? i.id.slice(0, 8)}</p>
                        <p className="text-xs text-muted-foreground truncate">{i.reason ?? i.status ?? "—"}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {typeof i.riskScore === "number" && <Badge className={i.riskScore >= 80 ? "bg-red-100 text-red-700 border-0" : "bg-amber-100 text-amber-700 border-0"}>Risk {i.riskScore}</Badge>}
                        {i.decision && <Badge variant="outline" className="text-xs">{i.decision}</Badge>}
                      </div>
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
