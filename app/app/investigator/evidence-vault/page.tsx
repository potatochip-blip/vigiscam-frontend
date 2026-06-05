'use client'

import useSWR from "swr"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertTriangle, FileArchive } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type EvidenceEntry = {
  id: string
  type?: string
  description?: string
  actor?: string | null
  createdAt?: string
}

async function fetchTimeline(): Promise<EvidenceEntry[]> {
  const { data, error, response } = await backend.GET("/api/v1/evidence/timeline")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as unknown as EvidenceEntry[]) ?? []
}

export default function InvestigatorEvidenceVaultPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "investigator-evidence" : null, fetchTimeline, { revalidateOnFocus: false })
  const rows = data ?? []

  return (
    <PageLayout role="investigator" title="Evidence Vault" subtitle="Chain-of-custody evidence timeline">
      <div className="max-w-7xl mx-auto">
        <Card className="p-0">
          {isLoading ? (
            <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading evidence…</div>
          ) : error ? (
            <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load evidence timeline.</div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground"><FileArchive className="h-8 w-8" /><p className="font-medium">No evidence entries.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/30"><tr>{["Type", "Description", "Actor", "Logged"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
                ))}</tr></thead>
                <tbody>
                  {rows.map((e) => (
                    <tr key={e.id} className="border-b hover:bg-muted/20">
                      <td className="px-4 py-3">{e.type && <Badge variant="outline" className="text-xs">{e.type}</Badge>}</td>
                      <td className="px-4 py-3 max-w-[420px] truncate">{e.description ?? "—"}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{e.actor ?? "—"}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{e.createdAt ? new Date(e.createdAt).toLocaleString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </PageLayout>
  )
}
