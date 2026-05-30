"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Globe,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Upload,
  Download,
  Edit2,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Slash,
} from "lucide-react"
import {
  mockPublicDrafts,
  indicatorTypeLabels,
  scamFamilyLabels,
  visibilityStateLabels,
  type PublicRegistryDraft,
  type VisibilityState,
  type PublicBadge,
} from "@/lib/scam-intelligence-data"

const visibilityConfig: Record<VisibilityState, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  "private-only": { color: "bg-slate-100 text-slate-700", icon: Lock },
  "approved-public-safe": { color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
  "published": { color: "bg-green-100 text-green-800", icon: Globe },
  "unpublished": { color: "bg-yellow-100 text-yellow-800", icon: EyeOff },
  "removed-after-correction": { color: "bg-red-100 text-red-800", icon: Slash },
}

const badgeColors: Record<PublicBadge, string> = {
  "Verified Malicious": "bg-red-600 text-white",
  "High-Risk Verified": "bg-orange-500 text-white",
  "Officially Reported": "bg-blue-600 text-white",
  "Takedown Confirmed": "bg-green-700 text-white",
}

function VisibilityChip({ state }: { state: VisibilityState }) {
  const cfg = visibilityConfig[state]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
      <Icon className="h-3 w-3" />
      {visibilityStateLabels[state]}
    </span>
  )
}

export default function AdminPublicRegistryPage() {
  const [records, setRecords] = useState<PublicRegistryDraft[]>(mockPublicDrafts)
  const [selected, setSelected] = useState<PublicRegistryDraft>(mockPublicDrafts[0])
  const [editingSummary, setEditingSummary] = useState(false)
  const [draftSummary, setDraftSummary] = useState(selected.publicSafeSummary)

  function handlePublish(id: string) {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, visibilityState: "published", publishedAt: new Date().toISOString() }
          : r
      )
    )
    setSelected((prev) => prev.id === id ? { ...prev, visibilityState: "published", publishedAt: new Date().toISOString() } : prev)
  }

  function handleUnpublish(id: string) {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, visibilityState: "unpublished", unpublishedAt: new Date().toISOString() } : r
      )
    )
    setSelected((prev) => prev.id === id ? { ...prev, visibilityState: "unpublished" } : prev)
  }

  function saveSummary() {
    setRecords((prev) => prev.map((r) => r.id === selected.id ? { ...r, publicSafeSummary: draftSummary } : r))
    setSelected((prev) => ({ ...prev, publicSafeSummary: draftSummary }))
    setEditingSummary(false)
  }

  const currentRecord = records.find((r) => r.id === selected.id) ?? selected
  const draft = records.filter((r) => r.visibilityState === "approved-public-safe")
  const published = records.filter((r) => r.visibilityState === "published")
  const other = records.filter((r) => !["approved-public-safe", "published"].includes(r.visibilityState))

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-medium uppercase tracking-wider">Internal — Registry Staging</span>
                </div>
                <h1 className="text-3xl font-bold mb-1">Public Registry Staging</h1>
                <p className="text-slate-300 text-sm">
                  Draft, approve, publish, and unpublish verified public-safe intelligence records. Only published records are visible in the public registry.
                </p>
              </div>
              <div className="flex gap-2">
                <Link href="/admin/verification-queue">
                  <Button variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-700 gap-2 text-sm">
                    <ArrowLeft className="h-4 w-4" />
                    Verification Queue
                  </Button>
                </Link>
                <Link href="/scam-intelligence/registry" target="_blank">
                  <Button variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-700 gap-2 text-sm">
                    Public Registry
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Summary bar */}
        <section className="bg-white border-b py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <span className="font-medium">{draft.length}</span>
                <span className="text-muted-foreground">Approved — Awaiting Publish</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-green-600" />
                <span className="font-medium">{published.length}</span>
                <span className="text-muted-foreground">Currently Published</span>
              </div>
              <div className="flex items-center gap-2">
                <EyeOff className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{other.length}</span>
                <span className="text-muted-foreground">Other States</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main split panel */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Record list */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1">All Staged Records</p>
                {records.map((record) => (
                  <button
                    key={record.id}
                    onClick={() => { setSelected(record); setDraftSummary(record.publicSafeSummary); setEditingSummary(false) }}
                    className={`w-full text-left rounded-lg border p-3 transition-colors ${
                      selected.id === record.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <p className="font-mono text-xs text-muted-foreground">{record.id}</p>
                    <p className="font-medium text-sm truncate mt-0.5">{record.indicatorValue}</p>
                    <div className="flex items-center justify-between mt-2 gap-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${badgeColors[record.publicBadge]}`}>
                        {record.publicBadge}
                      </span>
                      <VisibilityChip state={record.visibilityState} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Detail panel */}
              <div className="lg:col-span-2 space-y-5">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-mono text-muted-foreground">{currentRecord.id}</p>
                        <CardTitle className="text-xl mt-1 font-mono">{currentRecord.indicatorValue}</CardTitle>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <Badge variant="outline">{indicatorTypeLabels[currentRecord.indicatorType]}</Badge>
                          <Badge variant="outline">{scamFamilyLabels[currentRecord.scamFamily]}</Badge>
                          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${badgeColors[currentRecord.publicBadge]}`}>
                            {currentRecord.publicBadge}
                          </span>
                        </div>
                      </div>
                      <VisibilityChip state={currentRecord.visibilityState} />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    {/* Public-safe summary editor */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-semibold">Public-Safe Summary</Label>
                        {!editingSummary && (
                          <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs" onClick={() => setEditingSummary(true)}>
                            <Edit2 className="h-3 w-3" />
                            Edit
                          </Button>
                        )}
                      </div>
                      {editingSummary ? (
                        <div className="space-y-2">
                          <Textarea
                            value={draftSummary}
                            onChange={(e) => setDraftSummary(e.target.value)}
                            rows={4}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={saveSummary}>Save</Button>
                            <Button size="sm" variant="ghost" onClick={() => { setEditingSummary(false); setDraftSummary(currentRecord.publicSafeSummary) }}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground bg-muted rounded-md p-3">{currentRecord.publicSafeSummary}</p>
                      )}
                    </div>

                    <Separator />

                    {/* Field-level redactions */}
                    <div>
                      <p className="text-sm font-semibold mb-2">Redacted Fields (never published)</p>
                      <div className="flex flex-wrap gap-2">
                        {currentRecord.redactedFields.map((field) => (
                          <span key={field} className="inline-flex items-center gap-1.5 text-xs bg-red-50 text-red-800 border border-red-200 rounded-full px-2.5 py-0.5">
                            <EyeOff className="h-3 w-3" />
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Registry preview */}
                    <div>
                      <p className="text-sm font-semibold mb-3">Registry Preview (public-facing)</p>
                      <div className="border rounded-lg p-4 bg-slate-50 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-mono font-bold">{currentRecord.indicatorValue}</p>
                          <span className={`text-xs px-2.5 py-1 rounded font-semibold ${badgeColors[currentRecord.publicBadge]}`}>
                            {currentRecord.publicBadge}
                          </span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">{indicatorTypeLabels[currentRecord.indicatorType]}</Badge>
                          <Badge variant="outline" className="text-xs">{scamFamilyLabels[currentRecord.scamFamily]}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{currentRecord.publicSafeSummary}</p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                          Verified by VIGISCAM™ — No victim data — No unverified allegations
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Audit info */}
                    <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2">
                      {currentRecord.publishedBy && <p>Approved by: <span className="font-medium text-foreground">{currentRecord.publishedBy}</span></p>}
                      {currentRecord.lastEditedBy && <p>Last edited by: <span className="font-medium text-foreground">{currentRecord.lastEditedBy}</span></p>}
                      {currentRecord.lastEditedAt && <p>Last edited: <span className="font-medium text-foreground">{new Date(currentRecord.lastEditedAt).toLocaleString()}</span></p>}
                      {currentRecord.publishedAt && <p>Published: <span className="font-medium text-foreground">{new Date(currentRecord.publishedAt).toLocaleString()}</span></p>}
                    </div>

                    <Separator />

                    {/* Publish / unpublish controls */}
                    <div className="flex gap-3 flex-wrap">
                      {currentRecord.visibilityState === "approved-public-safe" && (
                        <Button
                          className="gap-2 bg-green-700 hover:bg-green-800 text-white"
                          onClick={() => handlePublish(currentRecord.id)}
                        >
                          <Upload className="h-4 w-4" />
                          Publish to Public Registry
                        </Button>
                      )}
                      {currentRecord.visibilityState === "published" && (
                        <Button
                          variant="outline"
                          className="gap-2 text-yellow-700 border-yellow-400 hover:bg-yellow-50"
                          onClick={() => handleUnpublish(currentRecord.id)}
                        >
                          <Download className="h-4 w-4" />
                          Unpublish
                        </Button>
                      )}
                      {!["approved-public-safe", "published"].includes(currentRecord.visibilityState) && (
                        <p className="text-sm text-muted-foreground">
                          This record is currently <strong>{visibilityStateLabels[currentRecord.visibilityState]}</strong> and cannot be published from this state.
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-md px-3 py-2">
                      <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
                      Only records in <strong className="mx-1">Published</strong> state are visible in the public Scam Intelligence Registry.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
