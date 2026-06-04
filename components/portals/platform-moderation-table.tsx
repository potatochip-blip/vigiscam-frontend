'use client'

import { useMemo, useState } from "react"
import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Flag, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

export type ModItem = {
  id: string
  targetRef?: string
  contentRef?: string
  reason?: string
  category?: string | null
  riskScore?: number
  status?: string
  decision?: string
  createdAt?: string
}

async function fetchQueue(): Promise<ModItem[]> {
  const { data, error, response } = await backend.GET("/api/v1/platform-portal/moderation-queue")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as unknown as ModItem[]) ?? []
}

/**
 * Shared live table over the PlatformShield moderation queue. Used by every
 * PlatformShield content/abuse page so they show real data. `category` focuses
 * the view (e.g. grooming, recovery scams), `minRisk` filters by risk band.
 */
export function PlatformModerationTable({ category, minRisk = 0, search: searchable = true }: { category?: string; minRisk?: number; search?: boolean }) {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "platform-moderation" : null, fetchQueue, { revalidateOnFocus: false })
  const [search, setSearch] = useState("")

  const rows = useMemo(() => {
    let r = (data ?? []).filter((i) => (i.riskScore ?? 0) >= minRisk)
    if (category) r = r.filter((i) => (i.category ?? "").toLowerCase().includes(category.toLowerCase()) || (i.reason ?? "").toLowerCase().includes(category.toLowerCase()))
    if (search) r = r.filter((i) => (i.targetRef ?? i.contentRef ?? "").toLowerCase().includes(search.toLowerCase()) || (i.reason ?? "").toLowerCase().includes(search.toLowerCase()))
    return r
  }, [data, category, minRisk, search])

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      )}
      <Card className="p-0">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load the moderation queue (platform role required).</div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground"><Flag className="h-8 w-8" /><p className="font-medium">Nothing to review.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/30"><tr>{["Target", "Reason", "Category", "Risk", "Status", "Flagged"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
              ))}</tr></thead>
              <tbody>
                {rows.map((i) => (
                  <tr key={i.id} className="border-b hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium max-w-[200px] truncate">{i.targetRef ?? i.contentRef ?? i.id.slice(0, 8)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground max-w-[260px] truncate">{i.reason ?? "—"}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{i.category ?? "—"}</td>
                    <td className="px-4 py-3">{typeof i.riskScore === "number" && <Badge className={i.riskScore >= 80 ? "bg-red-100 text-red-700 border-0" : "bg-amber-100 text-amber-700 border-0"}>{i.riskScore}</Badge>}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs">{i.decision ?? i.status ?? "—"}</Badge></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{i.createdAt ? new Date(i.createdAt).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
