'use client'

import useSWR from "swr"
import Link from "next/link"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Megaphone, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Alert = { id: string; title?: string; body?: string; severity?: string; region?: string; publishedAt?: string }

async function fetchAlerts(): Promise<Alert[]> {
  const { data, error, response } = await backend.GET("/api/v1/public-alerts")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as unknown as Alert[]) ?? []
}

export default function AgencyOverviewPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "agency-alerts" : null, fetchAlerts, { revalidateOnFocus: false })
  const alerts = data ?? []

  return (
    <PageLayout role="agency" title="Agency Operations Center" subtitle="Multi-agency fraud investigation coordination">
      <div className="max-w-7xl mx-auto space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load public alerts.</div>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="p-5"><Megaphone className="h-5 w-5 text-primary mb-2" /><p className="text-xs text-muted-foreground mb-1">Published Alerts</p><p className="text-xl font-bold">{alerts.length}</p></Card>
              <Card className="p-5"><AlertTriangle className="h-5 w-5 text-red-600 mb-2" /><p className="text-xs text-muted-foreground mb-1">Critical/High</p><p className="text-xl font-bold">{alerts.filter((a) => ["CRITICAL", "HIGH"].includes((a.severity ?? "").toUpperCase())).length}</p></Card>
              <Card className="p-5"><Globe className="h-5 w-5 text-blue-600 mb-2" /><p className="text-xs text-muted-foreground mb-1">Regions</p><p className="text-xl font-bold">{new Set(alerts.map((a) => a.region).filter(Boolean)).size}</p></Card>
            </div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Megaphone className="h-5 w-5 text-primary" /> Public Scam Alerts</h2>
                <Button size="sm" asChild><Link href="/app/agency/public-alerts">View All</Link></Button>
              </div>
              {alerts.length === 0 ? <p className="text-sm text-muted-foreground">No public alerts published yet.</p> : (
                <div className="space-y-3">
                  {alerts.slice(0, 6).map((a) => (
                    <div key={a.id} className="flex items-center justify-between p-3 rounded-md border bg-muted/30 gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{a.title ?? "Alert"}</p>
                        <p className="text-xs text-muted-foreground truncate">{a.region ?? "global"}{a.publishedAt ? ` · ${new Date(a.publishedAt).toLocaleDateString()}` : ""}</p>
                      </div>
                      {a.severity && <Badge className={["CRITICAL", "HIGH"].includes(a.severity.toUpperCase()) ? "bg-red-100 text-red-700 border-0" : "bg-amber-100 text-amber-700 border-0"}>{a.severity}</Badge>}
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
