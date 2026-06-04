'use client'

import useSWR from "swr"
import Link from "next/link"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertCircle, Activity, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Case = { id: string; customerRef?: string; riskScore?: number; status?: string; amountMinor?: number; reason?: string; createdAt?: string }

async function fetchQueue(): Promise<Case[]> {
  const { data, error, response } = await backend.GET("/api/v1/bank-portal/queue")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as unknown as Case[]) ?? []
}

export default function BankGuardOverviewPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "bankguard-queue" : null, fetchQueue, { revalidateOnFocus: false })
  const cases = data ?? []
  const highRisk = cases.filter((c) => (c.riskScore ?? 0) >= 80).length

  return (
    <PageLayout role="bankguard" title="BankGuard Overview" subtitle="Enterprise fraud detection and prevention">
      <div className="max-w-7xl mx-auto space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load the BankGuard queue (bank role required).</div>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="p-5"><AlertCircle className="h-5 w-5 text-red-600 mb-2" /><p className="text-xs text-muted-foreground mb-1">Cases in Queue</p><p className="text-xl font-bold">{cases.length}</p></Card>
              <Card className="p-5"><Shield className="h-5 w-5 text-primary mb-2" /><p className="text-xs text-muted-foreground mb-1">High-Risk Cases</p><p className="text-xl font-bold">{highRisk}</p></Card>
              <Card className="p-5"><Activity className="h-5 w-5 text-blue-600 mb-2" /><p className="text-xs text-muted-foreground mb-1">Open Reviews</p><p className="text-xl font-bold">{cases.filter((c) => c.status !== "RESOLVED").length}</p></Card>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" /> Active Threat Queue
                  <Badge className="bg-red-100 text-red-700 border-0 text-xs"><span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-1.5 animate-pulse" /> Live</Badge>
                </h2>
                <Button size="sm" asChild><Link href="/app/bankguard/live-risk-queue">View All</Link></Button>
              </div>
              {cases.length === 0 ? (
                <p className="text-sm text-muted-foreground">No cases in the queue.</p>
              ) : (
                <div className="space-y-3">
                  {cases.slice(0, 6).map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 rounded-md border bg-muted/30 gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{c.customerRef ?? c.id.slice(0, 8)}</p>
                        <p className="text-xs text-muted-foreground truncate">{c.reason ?? c.status ?? "—"}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {typeof c.riskScore === "number" && <Badge className={c.riskScore >= 80 ? "bg-red-100 text-red-700 border-0" : "bg-amber-100 text-amber-700 border-0"}>Risk {c.riskScore}</Badge>}
                        {c.status && <Badge variant="outline" className="text-xs">{c.status}</Badge>}
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
