'use client'

import useSWR from "swr"
import Link from "next/link"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, FolderOpen, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Investigation = { id: string; title?: string; status?: string; priority?: string; caseNumber?: string; createdAt?: string }

async function fetchCases(): Promise<Investigation[]> {
  const { data, error, response } = await backend.GET("/api/v1/investigator-portal/cases")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as unknown as Investigation[]) ?? []
}

export default function InvestigatorOverviewPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "investigator-cases" : null, fetchCases, { revalidateOnFocus: false })
  const cases = data ?? []
  const open = cases.filter((c) => c.status && !["CLOSED", "RESOLVED", "ARCHIVED"].includes(c.status)).length

  return (
    <PageLayout role="investigator" title="Investigator Console" subtitle="Advanced fraud investigation and evidence analysis tools">
      <div className="max-w-7xl mx-auto space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load cases (investigator role required).</div>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="p-5"><FolderOpen className="h-5 w-5 text-primary mb-2" /><p className="text-xs text-muted-foreground mb-1">Total Cases</p><p className="text-xl font-bold">{cases.length}</p></Card>
              <Card className="p-5"><Search className="h-5 w-5 text-amber-600 mb-2" /><p className="text-xs text-muted-foreground mb-1">Open Cases</p><p className="text-xl font-bold">{open}</p></Card>
              <Card className="p-5"><FolderOpen className="h-5 w-5 text-green-600 mb-2" /><p className="text-xs text-muted-foreground mb-1">Closed</p><p className="text-xl font-bold">{cases.length - open}</p></Card>
            </div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><FolderOpen className="h-5 w-5 text-primary" /> Recent Cases</h2>
                <Button size="sm" asChild><Link href="/app/investigator/cases">View All</Link></Button>
              </div>
              {cases.length === 0 ? <p className="text-sm text-muted-foreground">No investigation cases yet.</p> : (
                <div className="space-y-3">
                  {cases.slice(0, 6).map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 rounded-md border bg-muted/30 gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{c.title ?? c.caseNumber ?? c.id.slice(0, 8)}</p>
                        <p className="text-xs text-muted-foreground">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {c.priority && <Badge variant="outline" className="text-xs">{c.priority}</Badge>}
                        {c.status && <Badge className="bg-muted text-muted-foreground border-0 text-xs">{c.status}</Badge>}
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
