'use client'

import { useState } from "react"
import useSWR from "swr"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"
import {
  CheckSquare, AlertTriangle, XCircle, CheckCircle, Clock,
  Archive, Users, Download, Eye, Shield, Search, Loader2
} from "lucide-react"

const claimCategories = [
  { value: "romance", label: "Romance / Online Relationship" },
  { value: "business", label: "Business / Contractor / Builder" },
  { value: "charity", label: "Charity / Donation Request" },
  { value: "hospital", label: "Hospital / Medical Emergency" },
  { value: "oil-rig", label: "Oil Rig / Construction Worker Overseas" },
  { value: "inheritance", label: "Inheritance / Estate / Legal Settlement" },
  { value: "government", label: "Government / Authority / Law Enforcement" },
  { value: "immigration", label: "Immigration / Visa / Embassy" },
  { value: "job", label: "Job Offer / Employment / Remote Work" },
  { value: "investment", label: "Investment / Financial Opportunity" },
  { value: "crypto", label: "Crypto Recovery / Platform Support" },
  { value: "other", label: "Other" },
]

// ── Backend → display mapping ───────────────────────────────────────────────

type ClaimRow = {
  id: string
  claimType: string
  subject: unknown
  domainAgeDays?: number | null
  locationMismatch?: boolean
  imageReuseDetected?: boolean
  scamPhraseScore?: number | null
  paymentPressure?: boolean
  secrecyDetected?: boolean
  urgencyDetected?: boolean
  riskScore: number
  riskLevel: string
  decision?: string
  createdAt?: string
}

type BreakdownItem = { label: string; score: number; max: number; note: string }

type DisplayClaim = {
  id: string
  category: string
  claimSummary: string
  riskScore: number
  riskLevel: string
  checkedAt: string
  breakdown: BreakdownItem[]
  aiSummary: string
}

// Frontend category value -> backend ClaimVerifyType enum.
const CATEGORY_TO_TYPE: Record<string, string> = {
  romance: "ROMANCE",
  business: "BUSINESS_PARTNERSHIP",
  charity: "CHARITY",
  hospital: "HOSPITAL",
  "oil-rig": "OIL_PROJECT",
  inheritance: "INHERITANCE",
  government: "GOVERNMENT",
  immigration: "IMMIGRATION",
  job: "JOB",
  investment: "INVESTMENT",
  crypto: "OTHER",
  other: "OTHER",
}

function cvTitle(s?: string | null): string {
  return (s ?? "").toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function cvTimeAgo(iso?: string): string {
  if (!iso) return ""
  const s = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000))
  if (isNaN(s)) return ""
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60); if (m < 60) return `${m} min ago`
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24); return d === 1 ? "1 day ago" : `${d} days ago`
}

function subjectSummary(subject: unknown): string {
  if (subject && typeof subject === "object") {
    const s = subject as Record<string, unknown>
    const cand = s.note ?? s.claim ?? s.narrative ?? s.description ?? s.summary ?? s.name
    if (typeof cand === "string" && cand) return cand
    const vals = Object.values(s).filter((v) => typeof v === "string") as string[]
    if (vals.length) return vals.join(" · ")
  }
  return "Claim verification"
}

function buildBreakdown(r: ClaimRow): BreakdownItem[] {
  const out: BreakdownItem[] = [
    { label: "Overall risk", score: r.riskScore ?? 0, max: 100, note: `${cvTitle(r.riskLevel)} risk level` },
  ]
  if (r.scamPhraseScore != null)
    out.push({ label: "Scam-phrase signal", score: r.scamPhraseScore, max: 100, note: "NLP analysis of the claim narrative" })
  if (r.domainAgeDays != null)
    out.push({ label: "Domain age", score: Math.min(r.domainAgeDays, 365), max: 365, note: `${r.domainAgeDays} days old` })
  return out
}

function claimAiSummary(r: ClaimRow): string {
  const flags = [
    r.paymentPressure && "payment pressure",
    r.secrecyDetected && "secrecy",
    r.urgencyDetected && "urgency",
    r.locationMismatch && "location mismatch",
    r.imageReuseDetected && "reused profile images",
  ].filter(Boolean) as string[]
  let s = `${cvTitle(r.riskLevel)} risk (${r.riskScore}/100).`
  s += flags.length ? ` Detected: ${flags.join(", ")}.` : " No high-risk signals detected."
  if (r.decision && r.decision !== "PENDING") s += ` Outcome: ${cvTitle(r.decision)}.`
  return s
}

function mapClaim(r: ClaimRow): DisplayClaim {
  return {
    id: r.id,
    category: cvTitle(r.claimType),
    claimSummary: subjectSummary(r.subject),
    riskScore: r.riskScore,
    riskLevel: (r.riskLevel ?? "medium").toLowerCase(),
    checkedAt: cvTimeAgo(r.createdAt),
    breakdown: buildBreakdown(r),
    aiSummary: claimAiSummary(r),
  }
}

async function fetchClaimHistory(): Promise<DisplayClaim[]> {
  const { data, error } = await backend.GET("/api/v1/claimverify/history")
  if (error || !data) throw new Error("Could not load verification history")
  return (data as unknown as ClaimRow[]).map(mapClaim)
}

const RISK_PANEL: Record<string, { border: string; bg: string; text: string; badge: string; heading: string }> = {
  critical: { border: "border-red-300", bg: "bg-red-50", text: "text-red-800", badge: "bg-red-100 text-red-700", heading: "HIGH RISK — Likely a Scam" },
  high: { border: "border-red-300", bg: "bg-red-50", text: "text-red-800", badge: "bg-red-100 text-red-700", heading: "HIGH RISK — Likely a Scam" },
  medium: { border: "border-yellow-300", bg: "bg-yellow-50", text: "text-yellow-800", badge: "bg-yellow-100 text-yellow-700", heading: "CAUTION — Some Risk Signals" },
  low: { border: "border-green-300", bg: "bg-green-50", text: "text-green-800", badge: "bg-green-100 text-green-700", heading: "LOW RISK — No Strong Scam Signals" },
}

export default function ClaimVerifyPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading, mutate } = useSWR(
    isAuthenticated ? "claimverify-history" : null,
    fetchClaimHistory,
  )
  const verificationResults = data ?? []

  const [category, setCategory] = useState("")
  const [claimText, setClaimText] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const [verifyResult, setVerifyResult] = useState<DisplayClaim | null>(null)
  const [selectedResult, setSelectedResult] = useState<DisplayClaim | null>(null)

  const runVerification = async () => {
    setVerifying(true)
    setVerifyError(null)
    try {
      const claimType = CATEGORY_TO_TYPE[category] ?? "OTHER"
      const subject: Record<string, unknown> = { category: category || "other" }
      if (claimText.trim()) subject.note = claimText.trim()
      const { data: res, error: err } = await backend.POST("/api/v1/claimverify/verify", {
        body: { claimType, subject } as never,
      })
      if (err || !res) throw new Error("Verification failed")
      setVerifyResult(mapClaim(res as unknown as ClaimRow))
      void mutate() // refresh history with the new verification
    } catch {
      setVerifyError("Couldn't run the verification. Please try again.")
    } finally {
      setVerifying(false)
    }
  }

  return (
    <PageLayout role="individual" title="ClaimVerify AI™" subtitle="Verify any story, identity, or claim before you act or send money">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Claims Verified", value: String(verificationResults.length), color: "text-primary", bg: "bg-primary/10", icon: CheckSquare },
            { label: "Scam Claims Detected", value: String(verificationResults.filter((r) => r.riskLevel === "high" || r.riskLevel === "critical").length), color: "text-red-600", bg: "bg-red-50", icon: XCircle },
            { label: "Cleared / Low Risk", value: String(verificationResults.filter((r) => r.riskLevel === "low").length), color: "text-green-600", bg: "bg-green-50", icon: Shield },
            { label: "Avg. Verification Time", value: "< 10s", color: "text-primary", bg: "bg-primary/10", icon: Clock },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="p-5">
                <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`h-4.5 w-4.5 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="verify">
          <TabsList>
            <TabsTrigger value="verify">Verify a Claim</TabsTrigger>
            <TabsTrigger value="history">Previous Verifications</TabsTrigger>
          </TabsList>

          {/* Verify Tab */}
          <TabsContent value="verify" className="mt-4 space-y-4">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Verify a Claim or Story</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Describe what someone is claiming and who they say they are. ClaimVerify AI™ will cross-reference known scam patterns, verify story consistency, and give you a risk result.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Claim Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select claim type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {claimCategories.map(c => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">How long have you known this person?</Label>
                  <Select defaultValue="weeks">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Less than 1 week", "1-4 weeks", "1-3 months", "3-12 months", "Over 1 year", "Never met in person"].map(v => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">How did you meet?</Label>
                  <Select defaultValue="online">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Dating app", "Social media", "Phone call (unsolicited)", "Email", "In person", "Gaming platform", "Other online"].map(v => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Are they asking for money or a financial action?</Label>
                  <Select defaultValue="yes">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Yes — money transfer", "Yes — gift cards", "Yes — crypto", "Yes — account access", "Not yet but hinting", "No"].map(v => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Describe the claim or story in your own words</Label>
                <Textarea
                  value={claimText}
                  onChange={(e) => setClaimText(e.target.value)}
                  placeholder="e.g. He says he works on an oil rig in the Gulf of Mexico and needs $3,000 for emergency equipment. He has been messaging me every day for 3 weeks..."
                  className="min-h-28 text-sm"
                />
              </div>
              <Button className="w-full sm:w-auto" onClick={runVerification} disabled={verifying || !category}>
                {verifying ? (
                  <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> Verifying...</>
                ) : "Run ClaimVerify AI™"}
              </Button>
              {!category && !verifyResult && (
                <p className="text-xs text-muted-foreground">Select a claim category to run a verification.</p>
              )}
              {verifyError && <p className="text-sm text-destructive">{verifyError}</p>}

              {/* Result */}
              {verifyResult && (() => {
                const panel = RISK_PANEL[verifyResult.riskLevel] ?? RISK_PANEL.medium
                return (
                <div className={`rounded-lg border ${panel.border} ${panel.bg} p-5 space-y-4`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <XCircle className={`h-5 w-5 ${panel.text}`} />
                      <span className={`font-bold ${panel.text} text-sm`}>{panel.heading} ({verifyResult.riskScore}/100)</span>
                    </div>
                    <Badge className={`text-xs border-0 capitalize flex-shrink-0 ${panel.badge}`}>{verifyResult.riskLevel}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{verifyResult.aiSummary}</p>
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-foreground">Verification Breakdown:</p>
                    {verifyResult.breakdown.map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">{item.label}</span>
                          <span className="text-xs text-muted-foreground">{item.score}/{item.max}</span>
                        </div>
                        <Progress value={(item.score / item.max) * 100} className="h-1.5 mb-1" />
                        <p className="text-xs text-muted-foreground">{item.note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8">
                      <Archive className="h-3.5 w-3.5 mr-1.5" /> Save Evidence
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 border-red-300 text-red-700">
                      <Users className="h-3.5 w-3.5 mr-1.5" /> Alert Trusted Contact
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 text-muted-foreground text-xs">
                      Continue Anyway (not recommended)
                    </Button>
                  </div>
                </div>
                )
              })()}
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-4 space-y-4">
            <div className="flex gap-3 flex-wrap items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search verifications..." className="pl-9 h-9" />
              </div>
              <Button size="sm" variant="outline" className="h-9">
                <Download className="h-3.5 w-3.5 mr-1.5" /> Export
              </Button>
            </div>
            <div className="space-y-3">
              {!isAuthenticated ? (
                <Card className="p-12 text-center text-sm text-muted-foreground">
                  Sign in to view your verification history.
                </Card>
              ) : isLoading ? (
                <Card className="p-12 flex items-center justify-center text-sm text-muted-foreground gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading verifications...
                </Card>
              ) : error ? (
                <Card className="p-12 text-center text-sm text-destructive">
                  Couldn&apos;t load verification history. Please try again.
                </Card>
              ) : verificationResults.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <CheckSquare className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">No verifications yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Run a claim through ClaimVerify above and your results will be saved here.
                  </p>
                </Card>
              ) : (
                verificationResults.map((result) => {
                  const panel = RISK_PANEL[result.riskLevel] ?? RISK_PANEL.medium
                  return (
                    <Card key={result.id} className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-xs font-mono text-muted-foreground">{result.id.slice(0, 8)}</span>
                            <Badge className={`text-xs border-0 ${panel.badge}`}>{result.riskLevel.toUpperCase()} — {result.riskScore}/100</Badge>
                            {result.checkedAt && <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{result.checkedAt}</span>}
                          </div>
                          <p className="text-sm font-semibold text-foreground">{result.category}</p>
                          <p className="text-sm text-muted-foreground mt-0.5 truncate">{result.claimSummary}</p>
                          <p className="text-xs text-primary mt-1 line-clamp-2">{result.aiSummary}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 flex-shrink-0" onClick={() => setSelectedResult(result)}>
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </Card>
                  )
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
