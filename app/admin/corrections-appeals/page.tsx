"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Lock,
  Edit2,
  Scale,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  History,
  ShieldCheck,
  CalendarDays,
  Minus,
  Loader2,
  AlertTriangle,
} from "lucide-react"
import { useAppeals } from "@/lib/hooks"
import { api } from "@/lib/api-client"
import type { AppealStatus, CorrectionAppeal } from "@/lib/types"

const statusConfig: Record<AppealStatus, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  "pending": { label: "Pending", color: "bg-slate-100 text-slate-700", icon: Clock },
  "under-review": { label: "Under Review", color: "bg-yellow-100 text-yellow-800", icon: RotateCcw },
  "upheld": { label: "Upheld — No Change", color: "bg-blue-100 text-blue-800", icon: ShieldCheck },
  "changed": { label: "Record Changed", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  "removed": { label: "Record Removed", color: "bg-red-100 text-red-800", icon: XCircle },
}

const RESOLVED: AppealStatus[] = ["upheld", "changed", "removed"]
const OPEN: AppealStatus[] = ["pending", "under-review"]

function StatusChip({ status }: { status: AppealStatus }) {
  const cfg = statusConfig[status]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  )
}

export default function CorrectionsAppealsPage() {
  const { data, isLoading, error, mutate } = useAppeals({ limit: 100 })
  const items: CorrectionAppeal[] = data?.data ?? []

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const selected = items.find((i) => i.id === selectedId) ?? items[0] ?? null

  const corrections = items.filter((c) => c.appealType === "correction")
  const appeals = items.filter((c) => c.appealType !== "correction")

  const openCount = items.filter((c) => OPEN.includes(c.status)).length
  const closedCount = items.filter((c) => RESOLVED.includes(c.status)).length

  const select = (item: CorrectionAppeal) => {
    setSelectedId(item.id)
    setReviewNotes(item.reviewNotes ?? "")
  }

  const resolve = async (resolution: string) => {
    if (!selected || submitting) return
    setSubmitting(true)
    try {
      await api.admin.resolveAppeal(selected.id, resolution, reviewNotes)
      await mutate()
    } finally {
      setSubmitting(false)
    }
  }

  const renderListItem = (item: CorrectionAppeal) => (
    <button
      key={item.id}
      onClick={() => select(item)}
      className={`w-full text-left rounded-lg border p-3 transition-colors ${
        selected?.id === item.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-mono text-xs text-muted-foreground">{item.id.slice(0, 8)}</p>
          <p className="font-medium text-sm truncate">{item.indicatorValue}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.summary}</p>
        </div>
      </div>
      <div className="mt-2">
        <StatusChip status={item.status} />
      </div>
    </button>
  )

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-medium uppercase tracking-wider">Internal — Governance & Integrity</span>
                </div>
                <h1 className="text-3xl font-bold mb-1">Corrections & Appeals</h1>
                <p className="text-slate-300 text-sm">
                  External correction requests and appeals of published intelligence records. Full audit trail maintained for every decision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary bar */}
        <section className="bg-white border-b py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Edit2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{corrections.length}</span>
                <span className="text-muted-foreground">Correction Requests</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{appeals.length}</span>
                <span className="text-muted-foreground">Appeals</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="font-medium">{openCount}</span>
                <span className="text-muted-foreground">Open</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="font-medium">{closedCount}</span>
                <span className="text-muted-foreground">Closed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main split panel */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 py-20 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading corrections & appeals…
              </div>
            ) : error ? (
              <div className="flex items-center justify-center gap-2 py-20 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Could not load appeals. You may need to sign in with a reviewer account.
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
                <Scale className="h-8 w-8" />
                <p className="font-medium">No corrections or appeals</p>
                <p className="text-sm">Submitted correction requests and appeals will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List */}
                <div className="space-y-4">
                  {corrections.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1 flex items-center gap-1.5">
                        <Edit2 className="h-3 w-3" /> Correction Requests
                      </p>
                      {corrections.map(renderListItem)}
                    </div>
                  )}

                  {appeals.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1 flex items-center gap-1.5">
                        <Scale className="h-3 w-3" /> Appeals
                      </p>
                      {appeals.map(renderListItem)}
                    </div>
                  )}
                </div>

                {/* Detail panel */}
                <div className="lg:col-span-2 space-y-5">
                  {selected && (
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-xs font-mono text-muted-foreground">{selected.id.slice(0, 8)}</p>
                              <Badge variant="outline" className="text-xs capitalize">{selected.appealType}</Badge>
                            </div>
                            <CardTitle className="text-xl font-mono">{selected.indicatorValue}</CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">
                              Registry record: <span className="font-medium font-mono">{selected.registryId.slice(0, 8)}</span>
                            </p>
                          </div>
                          <StatusChip status={selected.status} />
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-5">
                        {/* Submission details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="rounded-md bg-muted p-3">
                            <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                            <div className="flex items-center gap-1.5 text-sm font-medium">
                              <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                              {new Date(selected.submittedAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="rounded-md bg-muted p-3">
                            <p className="text-xs text-muted-foreground mb-1">Submitted By</p>
                            <p className="text-sm font-medium">{selected.submitterName ?? selected.submitterEmail ?? "—"}</p>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <p className="text-sm font-semibold">Stated Reason</p>
                          <p className="text-sm text-muted-foreground bg-muted rounded-md p-3">{selected.summary}</p>
                        </div>

                        {selected.requestedChange && (
                          <div className="space-y-1.5">
                            <p className="text-sm font-semibold">Requested Change</p>
                            <p className="text-sm text-muted-foreground bg-muted rounded-md p-3">{selected.requestedChange}</p>
                          </div>
                        )}

                        <Separator />

                        {/* Review notes */}
                        <div className="space-y-1.5">
                          <Label htmlFor="review-notes" className="text-sm font-semibold">Reviewer Notes</Label>
                          <Textarea
                            id="review-notes"
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            rows={4}
                            placeholder="Document your analysis, evidence review, and reasoning (min. 10 characters)…"
                            disabled={RESOLVED.includes(selected.status)}
                          />
                        </div>

                        {/* Decision actions */}
                        {OPEN.includes(selected.status) && (
                          <div className="flex flex-wrap gap-3">
                            <Button size="sm" variant="outline" disabled={submitting} onClick={() => resolve("Uphold — no change")} className="gap-2 text-blue-700 border-blue-400 hover:bg-blue-50">
                              <ShieldCheck className="h-4 w-4" />
                              Uphold — No Change
                            </Button>
                            <Button size="sm" variant="outline" disabled={submitting} onClick={() => resolve("Apply correction")} className="gap-2 text-green-700 border-green-400 hover:bg-green-50">
                              <CheckCircle2 className="h-4 w-4" />
                              Apply Correction
                            </Button>
                            <Button size="sm" variant="outline" disabled={submitting} onClick={() => resolve("Remove record")} className="gap-2 text-red-700 border-red-400 hover:bg-red-50">
                              <XCircle className="h-4 w-4" />
                              Remove Record
                            </Button>
                          </div>
                        )}

                        {/* Resolved decision */}
                        {RESOLVED.includes(selected.status) && (
                          <div className={`rounded-md px-3 py-2.5 text-sm font-medium flex items-center gap-2 ${statusConfig[selected.status].color}`}>
                            <ShieldCheck className="h-4 w-4" />
                            Decision: {statusConfig[selected.status].label}
                            {selected.resolvedBy && <span className="font-normal">— {selected.resolvedBy.slice(0, 8)}</span>}
                            {selected.resolvedAt && <span className="font-normal text-xs">{new Date(selected.resolvedAt).toLocaleDateString()}</span>}
                          </div>
                        )}

                        {/* Existing reviewer notes (resolved cases) */}
                        {selected.reviewNotes && selected.status !== "pending" && (
                          <div className="space-y-1.5">
                            <p className="text-sm font-semibold flex items-center gap-1.5">
                              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                              Final Reviewer Notes
                            </p>
                            <p className="text-sm text-muted-foreground bg-muted rounded-md p-3">{selected.reviewNotes}</p>
                          </div>
                        )}

                        <Separator />

                        {/* Publication history audit trail */}
                        <div>
                          <p className="text-sm font-semibold flex items-center gap-1.5 mb-3">
                            <History className="h-4 w-4 text-muted-foreground" />
                            Publication History Audit Trail
                          </p>
                          {selected.resolution ? (
                            <div className="text-sm text-muted-foreground bg-muted rounded-md p-3">
                              {selected.resolution}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Minus className="h-4 w-4" />
                              No publication history recorded yet for this case.
                            </div>
                          )}
                        </div>

                        {/* Governance note */}
                        <div className="flex items-start gap-2 rounded-md bg-muted px-3 py-2.5 text-xs text-muted-foreground">
                          <Lock className="h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" />
                          All correction and appeal decisions are logged internally and form part of the permanent audit trail for this registry record. No correction or appeal detail is ever publicly disclosed.
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
