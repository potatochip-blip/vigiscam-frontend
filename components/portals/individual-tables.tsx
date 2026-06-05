'use client'

import { useState } from "react"
import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, AlertTriangle, Monitor, ShieldCheck, ShieldAlert } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

const date = (v: unknown) => {
  const d = v ? new Date(String(v)) : null
  return d && !isNaN(d.getTime()) ? d.toLocaleDateString() : "—"
}
const statusClass = (s?: string) =>
  (s ?? "").toUpperCase() === "ACTIVE" ? "bg-emerald-100 text-emerald-700 border-0" : "bg-muted text-muted-foreground border-0"
const riskClass = (lvl?: string) => {
  const u = (lvl ?? "").toUpperCase()
  if (u === "CRITICAL") return "bg-red-100 text-red-700 border-0"
  if (u === "HIGH") return "bg-orange-100 text-orange-700 border-0"
  if (u === "MEDIUM") return "bg-amber-100 text-amber-700 border-0"
  if (u === "LOW") return "bg-emerald-100 text-emerald-700 border-0"
  return "bg-muted text-muted-foreground border-0"
}

type Device = { id: string; name?: string; platform?: string; status?: string; lastSeenAt?: string; createdAt?: string }

async function fetchDevices(): Promise<Device[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, response } = await (backend.GET as any)("/api/v1/devices")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as Device[]) ?? []
}

/** The signed-in user's protected devices (GET /devices). */
export function IndividualDevicesTable() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "ind-devices" : null, fetchDevices, { revalidateOnFocus: false })
  const rows = data ?? []
  return (
    <Card className="p-0">
      {isLoading ? (
        <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading devices…</div>
      ) : error ? (
        <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load your devices.</div>
      ) : rows.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground"><Monitor className="h-8 w-8" /><p className="font-medium">No protected devices yet.</p></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/30"><tr>{["Device", "Platform", "Status", "Last seen"].map((h) => (
              <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
            ))}</tr></thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.id} className="border-b hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{d.name ?? d.id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{d.platform ?? "—"}</td>
                  <td className="px-4 py-3"><Badge className={statusClass(d.status)}>{d.status ?? "—"}</Badge></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{date(d.lastSeenAt ?? d.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}

const INDICATORS = ["PHONE", "EMAIL", "DOMAIN", "URL", "CRYPTO_WALLET", "SCAM_PHRASE", "FAKE_COMPANY", "SOCIAL_PROFILE", "OTHER"] as const

type ScamCheckResult = {
  riskScore: number
  riskLevel: string
  category?: string
  assessment?: string
  matchedIntelligence?: { inPublicRegistry?: boolean; reportsOnRecord?: number; scamLanguageDetected?: string[] }
  recommendedAction?: string
  safeNextSteps?: string[]
}

/** Interactive scam check (POST /scam-check) — live risk scoring, no login required. */
export function ScamCheckForm() {
  const [indicatorType, setIndicatorType] = useState<string>("PHONE")
  const [indicatorValue, setIndicatorValue] = useState("")
  const [rawText, setRawText] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ScamCheckResult | null>(null)

  async function run() {
    if (!indicatorValue.trim()) return
    setBusy(true); setError(null); setResult(null)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error, response } = await (backend.POST as any)("/api/v1/scam-check", {
        body: { indicatorType, indicatorValue: indicatorValue.trim(), ...(rawText.trim() ? { rawText: rawText.trim() } : {}) },
      })
      if (error || !response.ok) throw new Error(`Check failed (${response.status})`)
      setResult(data as ScamCheckResult)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Check failed")
    } finally {
      setBusy(false)
    }
  }

  const high = result && ["HIGH", "CRITICAL"].includes((result.riskLevel ?? "").toUpperCase())

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <div className="grid sm:grid-cols-[180px_1fr] gap-3">
          <select
            className="border rounded-md px-3 py-2 text-sm bg-background"
            value={indicatorType}
            onChange={(e) => setIndicatorType(e.target.value)}
          >
            {INDICATORS.map((i) => <option key={i} value={i}>{i.replace(/_/g, " ")}</option>)}
          </select>
          <Input placeholder="Phone, email, link, wallet, company name…" value={indicatorValue} onChange={(e) => setIndicatorValue(e.target.value)} />
        </div>
        <Textarea placeholder="Optional: paste the message or transcript to scan for scam language" value={rawText} onChange={(e) => setRawText(e.target.value)} rows={3} />
        <div className="flex justify-end">
          <Button onClick={run} disabled={busy || !indicatorValue.trim()}>
            {busy ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Checking…</> : "Check for scam risk"}
          </Button>
        </div>
        {error && <p className="text-sm text-red-600 flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> {error}</p>}
      </Card>

      {result && (
        <Card className={`p-6 ${high ? "border-red-300" : "border-emerald-300"}`}>
          <div className="flex items-center gap-3 mb-4">
            {high ? <ShieldAlert className="h-8 w-8 text-red-600" /> : <ShieldCheck className="h-8 w-8 text-emerald-600" />}
            <div>
              <div className="flex items-center gap-2">
                <Badge className={riskClass(result.riskLevel)}>{result.riskLevel}</Badge>
                <span className="text-sm text-muted-foreground">Risk score {result.riskScore}/100</span>
              </div>
              {result.assessment && <p className="text-sm mt-1">{result.assessment}</p>}
            </div>
          </div>
          {result.recommendedAction && (
            <p className="text-sm font-semibold mb-3">{result.recommendedAction.replace(/_/g, " ")}</p>
          )}
          <div className="grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground mb-3">
            <div>In public registry: <span className="font-medium text-foreground">{result.matchedIntelligence?.inPublicRegistry ? "Yes" : "No"}</span></div>
            <div>Reports on record: <span className="font-medium text-foreground">{result.matchedIntelligence?.reportsOnRecord ?? 0}</span></div>
            <div>Scam language: <span className="font-medium text-foreground">{result.matchedIntelligence?.scamLanguageDetected?.length ? result.matchedIntelligence.scamLanguageDetected.join(", ") : "none"}</span></div>
          </div>
          {result.safeNextSteps?.length ? (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Safe next steps</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {result.safeNextSteps.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          ) : null}
        </Card>
      )}
    </div>
  )
}
