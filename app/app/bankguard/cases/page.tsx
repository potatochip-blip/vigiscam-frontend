'use client'

import { useMemo, useState } from "react"
import useSWR from "swr"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, FileText, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Case = { id: string; customerRef?: string; reason?: string; riskScore?: number; status?: string; amountMinor?: number; createdAt?: string }

async function fetchQueue(): Promise<Case[]> {
  const { data, error, response } = await backend.GET("/api/v1/bank-portal/queue")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as unknown as Case[]) ?? []
}

const money = (minor?: number) => (typeof minor === "number" ? `$${(minor / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "—")

export default function BankGuardCasesPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "bankguard-cases" : null, fetchQueue, { revalidateOnFocus: false })
  const [search, setSearch] = useState("")
  const cases = data ?? []
  const filtered = useMemo(() => cases.filter((c) =>
    !search || (c.customerRef ?? "").toLowerCase().includes(search.toLowerCase()) || (c.reason ?? "").toLowerCase().includes(search.toLowerCase())
  ), [cases, search])

  return (
    <PageLayout role="bankguard" title="Fraud Cases" subtitle="Customer fraud cases awaiting bank review">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search by customer or reason…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Card className="p-0">
          {isLoading ? (
            <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading cases…</div>
          ) : error ? (
            <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load cases (bank role required).</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground"><FileText className="h-8 w-8" /><p className="font-medium">No cases in the review queue</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/30"><tr>{["Customer", "Reason", "Amount", "Risk", "Status", "Opened"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
                ))}</tr></thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-muted/20">
                      <td className="px-4 py-3 font-medium">{c.customerRef ?? c.id.slice(0, 8)}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground max-w-[280px] truncate">{c.reason ?? "—"}</td>
                      <td className="px-4 py-3">{money(c.amountMinor)}</td>
                      <td className="px-4 py-3">{typeof c.riskScore === "number" && <Badge className={c.riskScore >= 80 ? "bg-red-100 text-red-700 border-0" : "bg-amber-100 text-amber-700 border-0"}>{c.riskScore}</Badge>}</td>
                      <td className="px-4 py-3"><Badge variant="outline" className="text-xs">{c.status ?? "—"}</Badge></td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}</td>
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
