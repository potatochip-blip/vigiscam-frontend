"use client"

import { useMemo, useState } from "react"
import useSWR from "swr"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Radio, Search, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Signal = {
  id: string
  indicatorType?: string
  indicatorValue?: string
  status?: string
  category?: string | null
  geography?: string | null
  confidenceScore?: number
  reportCount?: number
  sourceType?: string
  createdAt?: string
}

async function fetchSignals(): Promise<Signal[]> {
  const { data, error, response } = await backend.GET("/api/v1/intelligence/signals")
  if (error || !response.ok) throw new Error(`Failed to load signals (${response.status})`)
  return (data as unknown as Signal[]) ?? []
}

const STATUSES = ["UNVERIFIED_REPORT", "SUSPICIOUS_SIGNAL", "PATTERN_MATCH", "UNDER_REVIEW", "HIGH_RISK_INDICATOR", "VERIFIED_SCAM_INTELLIGENCE", "PUBLIC_SAFE_ALERT", "ARCHIVED", "REJECTED"]
const statusColor = (s?: string) => {
  switch (s) {
    case "VERIFIED_SCAM_INTELLIGENCE": case "PUBLIC_SAFE_ALERT": return "bg-green-100 text-green-800 border-green-300"
    case "HIGH_RISK_INDICATOR": case "PATTERN_MATCH": return "bg-orange-100 text-orange-800 border-orange-300"
    case "SUSPICIOUS_SIGNAL": case "UNDER_REVIEW": return "bg-amber-100 text-amber-800 border-amber-300"
    case "REJECTED": case "ARCHIVED": return "bg-slate-100 text-slate-600 border-slate-300"
    default: return "bg-gray-100 text-gray-700 border-gray-300"
  }
}
const human = (s?: string) => (s ?? "").replace(/_/g, " ").toLowerCase()

export default function IntelligenceSignalsPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "intel-signals" : null, fetchSignals, { revalidateOnFocus: false })
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const signals = data ?? []
  const filtered = useMemo(() => signals.filter((s) => {
    const matchSearch = !search || (s.indicatorValue ?? "").toLowerCase().includes(search.toLowerCase()) || (s.category ?? "").toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || s.status === statusFilter
    return matchSearch && matchStatus
  }), [signals, search, statusFilter])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto space-y-5">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2"><Radio className="h-5 w-5 text-primary" /> Live Signal Feed</h1>
              <p className="text-sm text-muted-foreground mt-1">All incoming scam signals — scored, deduplicated, and routed for review.</p>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search by indicator or category…" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[220px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {STATUSES.map((s) => <SelectItem key={s} value={s}>{human(s)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">Signals ({isLoading ? "…" : filtered.length})</CardTitle></CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex items-center gap-2 py-12 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading signals…</div>
                ) : error ? (
                  <div className="flex items-center gap-2 py-12 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load signals (reviewer access required).</div>
                ) : filtered.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-6">No signals match the current filters.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b bg-muted/30"><tr>
                        {["Indicator", "Type", "Category", "Status", "Reports", "Confidence", "Collected"].map((h) => (
                          <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {filtered.map((s) => (
                          <tr key={s.id} className="border-b hover:bg-muted/20 transition-colors">
                            <td className="px-4 py-3 font-mono text-xs font-medium max-w-[220px] truncate">{s.indicatorValue ?? s.id.slice(0, 8)}</td>
                            <td className="px-4 py-3 text-xs text-muted-foreground">{human(s.indicatorType)}</td>
                            <td className="px-4 py-3 text-xs text-muted-foreground">{s.category ?? "—"}</td>
                            <td className="px-4 py-3"><Badge variant="outline" className={`text-xs border ${statusColor(s.status)}`}>{human(s.status)}</Badge></td>
                            <td className="px-4 py-3 text-xs">{s.reportCount ?? 0}</td>
                            <td className="px-4 py-3">
                              <span className={`text-sm font-bold ${(s.confidenceScore ?? 0) >= 80 ? "text-red-600" : (s.confidenceScore ?? 0) >= 55 ? "text-amber-600" : "text-muted-foreground"}`}>{s.confidenceScore ?? 0}</span>
                            </td>
                            <td className="px-4 py-3 text-xs text-muted-foreground">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
