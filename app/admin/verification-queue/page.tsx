"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  ShieldCheck,
  Network,
  Mic2,
  Link2,
  Users,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  Clock,
} from "lucide-react"
import {
  mockVerificationQueue,
  indicatorTypeLabels,
  scamFamilyLabels,
  type VerificationQueueItem,
  type ReviewerDecision,
} from "@/lib/scam-intelligence-data"

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 85 ? "bg-green-500" : value >= 65 ? "bg-yellow-500" : "bg-red-500"
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Reviewer Confidence</span>
        <span className="font-bold">{value}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function ChecklistItem({ label, passed, note }: { label: string; passed: boolean; note?: string }) {
  return (
    <div className="flex items-start gap-2.5 py-2">
      {passed
        ? <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
        : <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />}
      <div>
        <p className={`text-sm font-medium ${passed ? "text-foreground" : "text-muted-foreground"}`}>{label}</p>
        {note && <p className="text-xs text-muted-foreground mt-0.5">{note}</p>}
      </div>
    </div>
  )
}

export default function VerificationQueuePage() {
  const [selected, setSelected] = useState<VerificationQueueItem>(mockVerificationQueue[0])
  const [notes, setNotes] = useState(selected.notes ?? "")
  const [submitted, setSubmitted] = useState<Record<string, ReviewerDecision>>({})

  function handleDecision(id: string, decision: ReviewerDecision) {
    setSubmitted((prev) => ({ ...prev, [id]: decision }))
  }

  const pending = mockVerificationQueue.filter((i) => !submitted[i.id] && !i.decision)
  const decided = mockVerificationQueue.filter((i) => submitted[i.id] || i.decision)

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
                  <span className="text-xs text-yellow-400 font-medium uppercase tracking-wider">Internal — Analyst Access Only</span>
                </div>
                <h1 className="text-3xl font-bold mb-1">Verification Queue</h1>
                <p className="text-slate-300 text-sm">
                  Evidence review, SCAMZY network matching, and public-safe approval gate. No record may be published without passing this review.
                </p>
              </div>
              <div className="flex gap-2">
                <Link href="/admin/intelligence-submissions">
                  <Button variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-700 gap-2 text-sm">
                    <ArrowLeft className="h-4 w-4" />
                    Submissions
                  </Button>
                </Link>
                <Link href="/admin/public-registry">
                  <Button variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-700 gap-2 text-sm">
                    Public Registry
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Queue stats */}
        <section className="bg-white border-b py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="font-medium">{pending.length}</span>
                <span className="text-muted-foreground">Awaiting Decision</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="font-medium">{decided.filter((i) => (submitted[i.id] ?? i.decision) === "approve").length}</span>
                <span className="text-muted-foreground">Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="font-medium">{decided.filter((i) => (submitted[i.id] ?? i.decision) === "reject").length}</span>
                <span className="text-muted-foreground">Rejected</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <span className="font-medium">{decided.filter((i) => (submitted[i.id] ?? i.decision) === "request-more-evidence").length}</span>
                <span className="text-muted-foreground">More Evidence Requested</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main split-panel */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left — item list */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1">Queue Items</p>
                {mockVerificationQueue.map((item) => {
                  const decision = submitted[item.id] ?? item.decision
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setSelected(item); setNotes(item.notes ?? "") }}
                      className={`w-full text-left rounded-lg border p-3 transition-colors ${
                        selected.id === item.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-mono text-xs text-muted-foreground">{item.id}</p>
                          <p className="font-medium text-sm truncate">{item.indicatorValue}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{indicatorTypeLabels[item.indicatorType]}</p>
                        </div>
                        {decision && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                            decision === "approve" ? "bg-green-100 text-green-800" :
                            decision === "reject" ? "bg-red-100 text-red-800" :
                            "bg-blue-100 text-blue-800"
                          }`}>
                            {decision === "approve" ? "Approved" : decision === "reject" ? "Rejected" : "More Evidence"}
                          </span>
                        )}
                        {!decision && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-800 flex-shrink-0">
                            Pending
                          </span>
                        )}
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Confidence</span>
                          <span className="font-medium">{item.reviewerConfidence}%</span>
                        </div>
                        <Progress value={item.reviewerConfidence} className="h-1.5" />
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Right — detail panel */}
              <div className="lg:col-span-2 space-y-5">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-mono text-muted-foreground">{selected.id} → SUB {selected.submissionId}</p>
                        <CardTitle className="text-xl mt-1 font-mono">{selected.indicatorValue}</CardTitle>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <Badge variant="outline">{indicatorTypeLabels[selected.indicatorType]}</Badge>
                          <Badge variant="outline">{scamFamilyLabels[selected.suspectedScamFamily]}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <ConfidenceBar value={selected.reviewerConfidence} />

                    <Separator />

                    {/* Evidence Checklist */}
                    <div>
                      <p className="text-sm font-semibold mb-2">Evidence Checklist</p>
                      <div className="divide-y divide-border">
                        <ChecklistItem
                          label="Corroborating report threshold met"
                          passed={selected.repeatedReportCount >= 5}
                          note={`${selected.repeatedReportCount} corroborating report${selected.repeatedReportCount !== 1 ? "s" : ""} (threshold: 5)`}
                        />
                        <ChecklistItem
                          label="SCAMZY™ network match confirmed"
                          passed={!!selected.scamzyNetworkMatch}
                          note={selected.scamzyNetworkMatch ?? "No network match found"}
                        />
                        <ChecklistItem
                          label="A1SCAMSHIELD™ script match"
                          passed={selected.a1ScamshieldScriptMatch}
                          note={selected.a1ScamshieldScriptMatch ? "Script pattern confirmed" : "No script pattern match"}
                        />
                        <ChecklistItem
                          label="Linked entity graph available"
                          passed={selected.linkedEntities.length > 0}
                          note={selected.linkedEntities.length > 0 ? selected.linkedEntities.join(", ") : "No linked entities"}
                        />
                        <ChecklistItem
                          label="Public-safe review completed"
                          passed={selected.publicSafeReviewed}
                          note={selected.publicSafeReviewed ? "No victim data or unverified allegations in proposed record" : "Public-safe review required before approval"}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Network & entity info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-md bg-muted p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Network className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold">SCAMZY™ Network Match</span>
                        </div>
                        <p className="text-sm">{selected.scamzyNetworkMatch ?? "None"}</p>
                      </div>
                      <div className="rounded-md bg-muted p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Mic2 className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold">A1SCAMSHIELD™ Script</span>
                        </div>
                        <p className="text-sm">{selected.a1ScamshieldScriptMatch ? "Pattern confirmed" : "No match"}</p>
                      </div>
                      <div className="rounded-md bg-muted p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold">Repeated Report Count</span>
                        </div>
                        <p className="text-sm font-bold">{selected.repeatedReportCount}</p>
                      </div>
                      <div className="rounded-md bg-muted p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Link2 className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold">Linked Entities</span>
                        </div>
                        <p className="text-sm">{selected.linkedEntities.length > 0 ? selected.linkedEntities.join(", ") : "None"}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Public-safe gate */}
                    {!selected.publicSafeReviewed && (
                      <Alert className="border-orange-200 bg-orange-50">
                        <EyeOff className="h-4 w-4 text-orange-700" />
                        <AlertDescription className="text-orange-800 text-sm">
                          <strong>Public-safe review required.</strong> Before approving this record for publication, confirm that the proposed public summary contains no victim personal data, no unverified allegations, and no internal case identifiers.
                        </AlertDescription>
                      </Alert>
                    )}
                    {selected.publicSafeReviewed && (
                      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
                        <Eye className="h-4 w-4" />
                        Public-safe review passed. Record may proceed to publication approval.
                      </div>
                    )}

                    {/* Reviewer notes */}
                    <div className="space-y-1.5">
                      <Label htmlFor="notes" className="text-sm font-semibold">Reviewer Notes</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        placeholder="Document your analysis, any concerns, or reasoning for decision..."
                      />
                    </div>

                    {/* Decision buttons */}
                    {!(submitted[selected.id] ?? selected.decision) ? (
                      <div className="flex flex-wrap gap-3">
                        <Button
                          className="gap-2 bg-green-700 hover:bg-green-800 text-white"
                          disabled={!selected.publicSafeReviewed}
                          onClick={() => handleDecision(selected.id, "approve")}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          Approve — Send to Public Registry
                        </Button>
                        <Button
                          variant="outline"
                          className="gap-2"
                          onClick={() => handleDecision(selected.id, "request-more-evidence")}
                        >
                          <MessageSquare className="h-4 w-4" />
                          Request More Evidence
                        </Button>
                        <Button
                          variant="outline"
                          className="gap-2 text-destructive border-destructive hover:bg-destructive/5"
                          onClick={() => handleDecision(selected.id, "reject")}
                        >
                          <ThumbsDown className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <div className={`flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium ${
                        (submitted[selected.id] ?? selected.decision) === "approve"
                          ? "bg-green-100 text-green-800"
                          : (submitted[selected.id] ?? selected.decision) === "reject"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        <ShieldCheck className="h-4 w-4" />
                        Decision recorded: {
                          (submitted[selected.id] ?? selected.decision) === "approve" ? "Approved — forwarded to Public Registry staging" :
                          (submitted[selected.id] ?? selected.decision) === "reject" ? "Rejected — record stays private" :
                          "More evidence requested — returned to Submissions"
                        }
                      </div>
                    )}

                    {!selected.publicSafeReviewed && !(submitted[selected.id] ?? selected.decision) && (
                      <p className="text-xs text-muted-foreground">
                        Approval is disabled until public-safe review is completed.
                      </p>
                    )}
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
