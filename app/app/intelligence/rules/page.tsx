"use client"

import useSWR from "swr"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Clock, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Rule = {
  id: string
  name?: string
  ruleType?: string
  category?: string | null
  severity?: string
  status?: string
  version?: number
  updatedAt?: string
}

async function fetchRules(): Promise<Rule[]> {
  const { data, error, response } = await backend.GET("/api/v1/intelligence/rules")
  if (error || !response.ok) throw new Error(`Failed to load rules (${response.status})`)
  return (data as unknown as Rule[]) ?? []
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800 border-green-300",
  TESTING: "bg-amber-100 text-amber-800 border-amber-300",
  DRAFT: "bg-blue-100 text-blue-800 border-blue-300",
  DISABLED: "bg-slate-100 text-slate-600 border-slate-300",
  RETIRED: "bg-slate-100 text-slate-600 border-slate-300",
}
const sevWeight: Record<string, number> = { LOW: 30, MEDIUM: 55, HIGH: 78, CRITICAL: 95 }

export default function DetectionRulesPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(
    isAuthenticated ? "intel-rules" : null,
    fetchRules,
    { revalidateOnFocus: false },
  )
  const rules = data ?? []
  const count = (s: string) => rules.filter((r) => r.status === s).length

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto space-y-5">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" /> Detection Rule Updates
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Rules generated and updated from verified scam intelligence clusters and signals.
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading rules…</div>
            ) : error ? (
              <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load rules (reviewer access required).</div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <Card><CardContent className="pt-4"><div className="text-3xl font-bold text-green-600">{count("ACTIVE")}</div><p className="text-xs text-muted-foreground mt-1">Active</p></CardContent></Card>
                  <Card><CardContent className="pt-4"><div className="text-3xl font-bold text-amber-600">{count("TESTING") + count("DRAFT")}</div><p className="text-xs text-muted-foreground mt-1">Draft / Testing</p></CardContent></Card>
                  <Card><CardContent className="pt-4"><div className="text-3xl font-bold text-muted-foreground">{count("DISABLED") + count("RETIRED")}</div><p className="text-xs text-muted-foreground mt-1">Disabled / Retired</p></CardContent></Card>
                </div>

                <Card>
                  <CardHeader className="pb-3"><CardTitle className="text-base">All Detection Rules ({rules.length})</CardTitle></CardHeader>
                  <CardContent className="p-0">
                    {rules.length === 0 ? (
                      <p className="text-sm text-muted-foreground p-6">No detection rules yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="border-b bg-muted/30">
                            <tr>{["Rule Name", "Category", "Type", "Status", "Updated", "Severity"].map((h) => (
                              <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
                            ))}</tr>
                          </thead>
                          <tbody>
                            {rules.map((rule) => {
                              const w = sevWeight[rule.severity ?? "MEDIUM"] ?? 50
                              return (
                                <tr key={rule.id} className="border-b hover:bg-muted/20 transition-colors">
                                  <td className="px-4 py-3 text-sm font-medium max-w-[240px]">{rule.name ?? "Rule"}</td>
                                  <td className="px-4 py-3 text-xs text-muted-foreground">{rule.category ?? "—"}</td>
                                  <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{(rule.ruleType ?? "").replace(/_/g, " ").toLowerCase()}</Badge></td>
                                  <td className="px-4 py-3"><Badge variant="outline" className={`text-xs border ${statusColors[rule.status ?? "DRAFT"] ?? ""}`}>{rule.status ?? "DRAFT"}</Badge></td>
                                  <td className="px-4 py-3 text-xs text-muted-foreground"><div className="flex items-center gap-1"><Clock className="h-3 w-3" />{rule.updatedAt ? new Date(rule.updatedAt).toLocaleDateString() : "—"}</div></td>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                      <div className="h-1.5 w-14 rounded-full bg-muted overflow-hidden">
                                        <div className={`h-1.5 rounded-full ${w >= 85 ? "bg-red-500" : w >= 70 ? "bg-amber-500" : "bg-blue-500"}`} style={{ width: `${w}%` }} />
                                      </div>
                                      <span className="text-xs font-medium">{rule.severity ?? "—"}</span>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
