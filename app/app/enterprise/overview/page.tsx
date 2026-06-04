'use client'

import useSWR from "swr"
import Link from "next/link"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, ScrollText, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Audit = { id: string; action?: string; actorType?: string | null; targetType?: string | null; createdAt?: string }
type Policy = { key?: string; value?: unknown }

async function fetchEnterprise() {
  const [a, p] = await Promise.all([
    backend.GET("/api/v1/enterprise-portal/audit-log"),
    backend.GET("/api/v1/enterprise-portal/policies"),
  ])
  if (!a.response.ok && !p.response.ok) throw new Error("Failed")
  return {
    audit: ((a.data as unknown as Audit[]) ?? []),
    policies: ((p.data as unknown as Policy[]) ?? []),
  }
}

export default function EnterpriseOverviewPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "enterprise-overview" : null, fetchEnterprise, { revalidateOnFocus: false })

  return (
    <PageLayout role="enterprise" title="Enterprise Dashboard" subtitle="Organization-wide fraud protection and compliance">
      <div className="max-w-7xl mx-auto space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load enterprise data (enterprise role required).</div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="p-5"><ScrollText className="h-5 w-5 text-primary mb-2" /><p className="text-xs text-muted-foreground mb-1">Governance Policies</p><p className="text-xl font-bold">{data?.policies.length ?? 0}</p></Card>
              <Card className="p-5"><Building2 className="h-5 w-5 text-blue-600 mb-2" /><p className="text-xs text-muted-foreground mb-1">Recent Activity</p><p className="text-xl font-bold">{data?.audit.length ?? 0}</p></Card>
            </div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><ScrollText className="h-5 w-5 text-primary" /> Recent Activity</h2>
                <Button size="sm" asChild><Link href="/app/enterprise/audit">View Audit Log</Link></Button>
              </div>
              {(data?.audit.length ?? 0) === 0 ? <p className="text-sm text-muted-foreground">No recent activity.</p> : (
                <div className="space-y-2">
                  {data?.audit.slice(0, 8).map((a) => (
                    <div key={a.id} className="flex items-center justify-between p-3 rounded-md border bg-muted/20 gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{a.action ?? "Event"}</p>
                        <p className="text-xs text-muted-foreground">{[a.actorType, a.targetType].filter(Boolean).join(" · ")}</p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : ""}</span>
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
