'use client'

import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertTriangle, Megaphone } from "lucide-react"
import { backend } from "@/lib/backend"

type Alert = {
  id: string
  title?: string
  region?: string
  severity?: string
  category?: string
  publishedAt?: string
  createdAt?: string
}

const sevClass = (s?: string) => {
  const u = (s ?? "").toUpperCase()
  if (u === "CRITICAL") return "bg-red-100 text-red-700 border-0"
  if (u === "WARNING") return "bg-amber-100 text-amber-700 border-0"
  return "bg-sky-100 text-sky-700 border-0"
}
const date = (v?: string) => {
  const d = v ? new Date(v) : null
  return d && !isNaN(d.getTime()) ? d.toLocaleDateString() : "—"
}

async function fetchAlerts(): Promise<Alert[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, response } = await (backend.GET as any)("/api/v1/public-alerts")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as Alert[]) ?? []
}

/** Live published public scam alerts (GET /public-alerts — public feed). */
export function PublicAlertsTable({ emptyLabel = "No published alerts." }: { emptyLabel?: string }) {
  const { data, error, isLoading } = useSWR("agency-public-alerts", fetchAlerts, { revalidateOnFocus: false })
  const rows = data ?? []
  return (
    <Card className="p-0">
      {isLoading ? (
        <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading alerts…</div>
      ) : error ? (
        <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load public alerts.</div>
      ) : rows.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground"><Megaphone className="h-8 w-8" /><p className="font-medium">{emptyLabel}</p></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/30"><tr>{["Alert", "Category", "Region", "Severity", "Published"].map((h) => (
              <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
            ))}</tr></thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-b hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium max-w-[360px] truncate">{a.title ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{a.category ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{a.region ?? "—"}</td>
                  <td className="px-4 py-3"><Badge className={sevClass(a.severity)}>{a.severity ?? "—"}</Badge></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{date(a.publishedAt ?? a.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
