'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layers, Loader2, AlertTriangle } from "lucide-react"
import { useAdminScriptGenome } from "@/lib/hooks"

type ScriptRow = {
  id: string
  label?: string
  category?: string | null
  riskScore?: number
  signalCount?: number
  firstSeen?: string
  lastSeen?: string
}

function riskBadge(score: number) {
  if (score >= 80) return { label: "Critical", cls: "bg-red-500 text-white border-0" }
  if (score >= 60) return { label: "High", cls: "bg-orange-500 text-white border-0" }
  if (score >= 40) return { label: "Medium", cls: "bg-yellow-500 text-white border-0" }
  return { label: "Low", cls: "bg-slate-400 text-white border-0" }
}

export default function AdminScriptGenomePage() {
  const { data, isLoading, error } = useAdminScriptGenome()
  const scripts = (data ?? []) as ScriptRow[]
  const totalSignals = scripts.reduce((s, r) => s + (r.signalCount ?? 0), 0)

  return (
    <PageLayout role="admin" title="Script Genome Database" subtitle="Analyze and classify fraud attack scripts">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading script genome…
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600">
            <AlertTriangle className="h-5 w-5" /> Could not load the script genome (reviewer access required).
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-4 text-center">
              <Card className="p-4"><p className="text-xs text-muted-foreground">Script Patterns</p><p className="text-2xl font-bold">{scripts.length}</p></Card>
              <Card className="p-4"><p className="text-xs text-muted-foreground">Linked Signals</p><p className="text-2xl font-bold">{totalSignals.toLocaleString()}</p></Card>
              <Card className="p-4"><p className="text-xs text-muted-foreground">Critical</p><p className="text-2xl font-bold">{scripts.filter((s) => (s.riskScore ?? 0) >= 80).length}</p></Card>
            </div>
            <Card className="p-6">
              <h3 className="text-base font-bold text-foreground mb-4">Script Patterns</h3>
              {scripts.length === 0 ? (
                <p className="text-sm text-muted-foreground flex items-center gap-2"><Layers className="h-4 w-4" /> No script patterns mined yet.</p>
              ) : (
                <div className="space-y-2">
                  {scripts.map((s) => {
                    const rb = riskBadge(s.riskScore ?? 0)
                    return (
                      <div key={s.id} className="flex items-center justify-between p-3 bg-muted/40 rounded gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-1">{s.label ?? "Pattern"}</p>
                          <p className="text-xs text-muted-foreground">
                            {s.category ?? "uncategorised"}
                            {s.lastSeen ? ` · last seen ${new Date(s.lastSeen).toLocaleDateString()}` : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge className={rb.cls}>{rb.label}</Badge>
                          <span className="text-xs text-muted-foreground">{s.signalCount ?? 0} signals</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </PageLayout>
  )
}
