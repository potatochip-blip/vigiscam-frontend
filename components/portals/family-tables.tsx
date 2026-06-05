'use client'

import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertTriangle, Inbox } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Row = Record<string, unknown>
const str = (v: unknown) => (v == null ? "" : typeof v === "string" ? v : String(v))
const date = (v: unknown) => {
  const d = v ? new Date(String(v)) : null
  return d && !isNaN(d.getTime()) ? d.toLocaleDateString() : "—"
}
const riskClass = (lvl?: string) => {
  const u = (lvl ?? "").toUpperCase()
  if (u === "CRITICAL") return "bg-red-100 text-red-700 border-0"
  if (u === "HIGH") return "bg-orange-100 text-orange-700 border-0"
  if (u === "MEDIUM") return "bg-amber-100 text-amber-700 border-0"
  if (u === "LOW") return "bg-emerald-100 text-emerald-700 border-0"
  return "bg-muted text-muted-foreground border-0"
}
const statusClass = (s?: string) =>
  (s ?? "").toUpperCase() === "ACTIVE" ? "bg-emerald-100 text-emerald-700 border-0" : "bg-muted text-muted-foreground border-0"

async function get<T>(path: string): Promise<T[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, response } = await (backend.GET as any)(path)
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as T[]) ?? []
}

function LiveTable<T extends Row>({
  swrKey, fetcher, headers, render, emptyLabel, errorLabel,
}: {
  swrKey: string
  fetcher: () => Promise<T[]>
  headers: string[]
  render: (row: T) => React.ReactNode[]
  emptyLabel: string
  errorLabel?: string
}) {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? swrKey : null, fetcher, { revalidateOnFocus: false })
  const rows = data ?? []
  return (
    <Card className="p-0">
      {isLoading ? (
        <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
      ) : error ? (
        <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> {errorLabel ?? "Could not load."}</div>
      ) : rows.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground"><Inbox className="h-8 w-8" /><p className="font-medium">{emptyLabel}</p></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/30"><tr>{headers.map((h) => (
              <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
            ))}</tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={str(r.id) || i} className="border-b hover:bg-muted/20">
                  {render(r).map((cell, j) => <td key={j} className="px-4 py-3">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}

/** People I protect as a guardian (GET /guardianship/as-guardian). */
export function FamilyGuardianshipTable() {
  return (
    <LiveTable
      swrKey="fam-as-guardian"
      fetcher={() => get<Row>("/api/v1/guardianship/as-guardian")}
      headers={["Protected person", "Status", "Consent granted", "Since"]}
      emptyLabel="You aren't protecting anyone yet."
      errorLabel="Could not load your protected loved ones."
      render={(r) => [
        <span className="font-medium font-mono text-xs">{str(r.protectedUserId).slice(0, 12) || "—"}</span>,
        <Badge className={statusClass(str(r.status))}>{str(r.status) || "—"}</Badge>,
        <span className="text-xs text-muted-foreground">{r.consentGrantedAt ? date(r.consentGrantedAt) : "Awaiting consent"}</span>,
        <span className="text-xs text-muted-foreground">{date(r.createdAt)}</span>,
      ]}
    />
  )
}

/** People who protect me (GET /guardianship/as-protected) — what I've consented to. */
export function FamilyConsentTable() {
  return (
    <LiveTable
      swrKey="fam-as-protected"
      fetcher={() => get<Row>("/api/v1/guardianship/as-protected")}
      headers={["Guardian", "Status", "Consent granted", "Since"]}
      emptyLabel="No one is monitoring your account."
      errorLabel="Could not load your consent records."
      render={(r) => [
        <span className="font-medium font-mono text-xs">{str(r.guardianUserId).slice(0, 12) || "—"}</span>,
        <Badge className={statusClass(str(r.status))}>{str(r.status) || "—"}</Badge>,
        <span className="text-xs text-muted-foreground">{r.consentGrantedAt ? date(r.consentGrantedAt) : "Not granted"}</span>,
        <span className="text-xs text-muted-foreground">{date(r.createdAt)}</span>,
      ]}
    />
  )
}

/** My trusted contacts (GET /trusted-contacts). */
export function FamilyTrustedContactsTable() {
  return (
    <LiveTable
      swrKey="fam-trusted"
      fetcher={() => get<Row>("/api/v1/trusted-contacts")}
      headers={["Name", "Relationship", "Contact", "Added"]}
      emptyLabel="No trusted contacts yet."
      errorLabel="Could not load trusted contacts."
      render={(r) => [
        <span className="font-medium">{str(r.name) || "—"}</span>,
        <span className="text-xs text-muted-foreground">{str(r.relationship) || "—"}</span>,
        <span className="text-xs text-muted-foreground">{str(r.email) || str(r.phone) || "—"}</span>,
        <span className="text-xs text-muted-foreground">{date(r.createdAt)}</span>,
      ]}
    />
  )
}

/** Trusted-contact review requests (GET /trusted-contacts/reviews). */
export function FamilyReviewsTable() {
  return (
    <LiveTable
      swrKey="fam-reviews"
      fetcher={() => get<Row>("/api/v1/trusted-contacts/reviews")}
      headers={["Trigger", "Risk", "Status", "Requested"]}
      emptyLabel="No review requests."
      errorLabel="Could not load review requests."
      render={(r) => [
        <span className="text-xs">{str(r.triggerModule) || "—"}</span>,
        <Badge className={riskClass(str(r.riskLevel))}>{str(r.riskLevel) || "—"}</Badge>,
        <Badge className={statusClass(str(r.status))}>{str(r.status) || "—"}</Badge>,
        <span className="text-xs text-muted-foreground">{date(r.createdAt)}</span>,
      ]}
    />
  )
}

/** My risk events (GET /risk-events) — alerts / threats / live risk / activity. */
export function FamilyRiskEventsTable({ emptyLabel = "No risk events." }: { emptyLabel?: string }) {
  return (
    <LiveTable
      swrKey="fam-risk-events"
      fetcher={() => get<Row>("/api/v1/risk-events")}
      headers={["Event", "Risk", "Score", "When"]}
      emptyLabel={emptyLabel}
      errorLabel="Could not load risk events."
      render={(r) => [
        <span className="font-medium">{str(r.eventType) || "—"}</span>,
        <Badge className={riskClass(str(r.riskLevel))}>{str(r.riskLevel) || "—"}</Badge>,
        <span className="text-xs text-muted-foreground">{str(r.riskScore) || "—"}</span>,
        <span className="text-xs text-muted-foreground">{date(r.createdAt)}</span>,
      ]}
    />
  )
}

const SETTING_LABELS: Record<string, string> = {
  scamHoldEnabled: "ScamHold (AI call/transfer hold)",
  guardianPauseEnabled: "Guardian Pause",
  giftCardGuardEnabled: "Gift Card Guard",
  walletGuardEnabled: "Wallet Guard",
  claimVerifyEnabled: "Claim Verify",
  trustedContactRequired: "Require trusted-contact approval",
  elderModeStrictLock: "Elder Mode strict lock",
  allowContinueAnyway: "Allow “continue anyway”",
}

/** Live protection settings (GET /protection-settings), read-only display. */
export function FamilyProtectionSettingsCard() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "fam-protection-settings" : null, async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error, response } = await (backend.GET as any)("/api/v1/protection-settings")
    if (error || !response.ok) throw new Error(`Failed (${response.status})`)
    return data as Record<string, unknown>
  }, { revalidateOnFocus: false })

  if (isLoading) return <Card className="p-10 flex items-center gap-2 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading protection settings…</Card>
  if (error || !data) return <Card className="p-10 flex items-center gap-2 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load protection settings.</Card>

  return (
    <Card className="p-6">
      <dl className="space-y-3">
        {Object.entries(SETTING_LABELS).map(([key, label]) => (
          <div key={key} className="flex items-center justify-between border-b border-dashed pb-2">
            <dt className="text-sm">{label}</dt>
            <dd>
              <Badge className={data[key] ? "bg-emerald-100 text-emerald-700 border-0" : "bg-muted text-muted-foreground border-0"}>
                {data[key] ? "On" : "Off"}
              </Badge>
            </dd>
          </div>
        ))}
      </dl>
      <p className="text-xs text-muted-foreground mt-4">
        These protections are enforced on every transaction. When Elder Mode strict lock is on, high-risk actions require trusted-contact approval and cannot be overridden.
      </p>
    </Card>
  )
}
