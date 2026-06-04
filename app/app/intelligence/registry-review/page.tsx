"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, CheckCircle2, XCircle, Loader2, AlertTriangle, Lock } from "lucide-react"
import { useVerificationQueue } from "@/lib/hooks"
import { api } from "@/lib/api-client"
import type { VerificationQueueItem } from "@/lib/types"

const statusColor: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700 border-gray-300",
  "under-review": "bg-purple-100 text-purple-800 border-purple-300",
  changed: "bg-green-100 text-green-800 border-green-300",
  upheld: "bg-blue-100 text-blue-800 border-blue-300",
  removed: "bg-red-100 text-red-800 border-red-300",
}

export default function RegistryReviewPage() {
  const { data, isLoading, error, mutate } = useVerificationQueue({ limit: 100 })
  const items: VerificationQueueItem[] = data?.data ?? []
  const [busy, setBusy] = useState<string | null>(null)

  const decide = async (item: VerificationQueueItem, decision: "approve" | "reject") => {
    setBusy(item.id)
    try {
      await api.admin.makeDecision(item.id, decision)
      await mutate()
    } finally {
      setBusy(null)
    }
  }

  const open = items.filter((i) => !i.decision)
  const resolved = items.filter((i) => i.decision)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto space-y-5">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2"><Database className="h-5 w-5 text-primary" /> Public-Safe Registry Review Queue</h1>
              <p className="text-sm text-muted-foreground mt-1">No raw report becomes public without independent review. Approve promotes to the registry; reject discards.</p>
            </div>

            {isLoading ? (
              <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading review queue…</div>
            ) : error ? (
              <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load the review queue (reviewer access required).</div>
            ) : (
              <>
                <Card>
                  <CardHeader className="pb-3"><CardTitle className="text-base">Awaiting Review ({open.length})</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {open.length === 0 ? <p className="text-sm text-muted-foreground">Nothing awaiting review.</p> : open.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-md border bg-muted/20">
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-sm font-medium truncate">{item.indicatorValue}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.indicatorType} · confidence {item.reviewerConfidence} · {item.repeatedReportCount} reports
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button size="sm" disabled={busy === item.id} onClick={() => decide(item, "approve")} className="gap-1 h-8 bg-green-600 hover:bg-green-700 text-white">
                            {busy === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />} Approve
                          </Button>
                          <Button size="sm" variant="outline" disabled={busy === item.id} onClick={() => decide(item, "reject")} className="gap-1 h-8 text-red-700 border-red-300">
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Lock className="h-4 w-4 text-muted-foreground" /> Resolved ({resolved.length})</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {resolved.length === 0 ? <p className="text-sm text-muted-foreground">No resolved items yet.</p> : resolved.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-md border">
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-sm font-medium truncate">{item.indicatorValue}</p>
                          <p className="text-xs text-muted-foreground">{item.indicatorType}</p>
                        </div>
                        <Badge variant="outline" className={`text-xs border ${statusColor[item.decision ?? "pending"] ?? ""}`}>{item.decision}</Badge>
                      </div>
                    ))}
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
