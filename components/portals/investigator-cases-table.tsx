'use client'

import { useMemo, useState } from "react"
import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, FolderOpen, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

export type Investigation = {
  id: string
  title?: string
  caseNumber?: string
  status?: string
  priority?: string
  category?: string | null
  createdAt?: string
}

async function fetchCases(): Promise<Investigation[]> {
  const { data, error, response } = await backend.GET("/api/v1/investigator-portal/cases")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as unknown as Investigation[]) ?? []
}

const OPEN = (s?: string) => !!s && !["CLOSED", "RESOLVED", "ARCHIVED"].includes(s)

/** Shared live table over the investigator case load. `openOnly` filters to active cases. */
export function InvestigatorCasesTable({ openOnly = false, search: searchable = true }: { openOnly?: boolean; search?: boolean }) {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "investigator-cases" : null, fetchCases, { revalidateOnFocus: false })
  const [search, setSearch] = useState("")

  const rows = useMemo(() => {
    let r = data ?? []
    if (openOnly) r = r.filter((c) => OPEN(c.status))
    if (search) r = r.filter((c) => (c.title ?? c.caseNumber ?? "").toLowerCase().includes(search.toLowerCase()))
    return r
  }, [data, openOnly, search])

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search cases…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      )}
      <Card className="p-0">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading cases…</div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load cases (investigator role required).</div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground"><FolderOpen className="h-8 w-8" /><p className="font-medium">No cases.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/30"><tr>{["Case", "Category", "Priority", "Status", "Opened"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
              ))}</tr></thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium max-w-[280px] truncate">{c.title ?? c.caseNumber ?? c.id.slice(0, 8)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{c.category ?? "—"}</td>
                    <td className="px-4 py-3">{c.priority && <Badge variant="outline" className="text-xs">{c.priority}</Badge>}</td>
                    <td className="px-4 py-3"><Badge className={OPEN(c.status) ? "bg-amber-100 text-amber-700 border-0" : "bg-muted text-muted-foreground border-0"}>{c.status ?? "—"}</Badge></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}</td>
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
