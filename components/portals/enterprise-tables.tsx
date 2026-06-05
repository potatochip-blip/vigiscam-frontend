'use client'

import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertTriangle, Inbox } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Row = Record<string, unknown>

const ACTIVE = (s?: string) => !!s && ["ACTIVE", "ENABLED", "ONLINE", "HEALTHY"].includes(s.toUpperCase())
const str = (v: unknown) => (v == null ? "" : typeof v === "string" ? v : JSON.stringify(v))
const date = (v: unknown) => {
  const d = v ? new Date(String(v)) : null
  return d && !isNaN(d.getTime()) ? d.toLocaleDateString() : "—"
}

/** Generic auth-gated live table. Caller supplies a fetcher + column renderers. */
function LiveTable<T extends Row>({
  swrKey, fetcher, headers, render, emptyLabel,
}: {
  swrKey: string
  fetcher: () => Promise<T[]>
  headers: string[]
  render: (row: T) => React.ReactNode[]
  emptyLabel: string
}) {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? swrKey : null, fetcher, { revalidateOnFocus: false })
  const rows = data ?? []
  return (
    <Card className="p-0">
      {isLoading ? (
        <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
      ) : error ? (
        <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load (enterprise-admin role required).</div>
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

async function get<T>(path: string): Promise<T[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, response } = await (backend.GET as any)(path)
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as T[]) ?? []
}

export function EnterprisePoliciesTable() {
  return (
    <LiveTable
      swrKey="ent-policies"
      fetcher={() => get<Row>("/api/v1/enterprise-portal/policies")}
      headers={["Policy", "Value", "Updated"]}
      emptyLabel="No policies set — tenant defaults apply."
      render={(r) => [
        <span className="font-medium font-mono text-xs">{str(r.key)}</span>,
        <span className="text-xs text-muted-foreground max-w-[360px] truncate inline-block">{str(r.value) || "—"}</span>,
        <span className="text-xs text-muted-foreground">{date(r.updatedAt ?? r.createdAt)}</span>,
      ]}
    />
  )
}

export function EnterpriseDevicesTable() {
  return (
    <LiveTable
      swrKey="ent-devices"
      fetcher={() => get<Row>("/api/v1/enterprise-portal/devices")}
      headers={["Device", "Platform", "Status", "Last seen"]}
      emptyLabel="No enrolled devices."
      render={(r) => [
        <span className="font-medium">{str(r.name) || str(r.id).slice(0, 8)}</span>,
        <span className="text-xs text-muted-foreground">{str(r.platform) || "—"}</span>,
        <Badge className={ACTIVE(str(r.status)) ? "bg-emerald-100 text-emerald-700 border-0" : "bg-muted text-muted-foreground border-0"}>{str(r.status) || "—"}</Badge>,
        <span className="text-xs text-muted-foreground">{date(r.lastSeenAt ?? r.createdAt)}</span>,
      ]}
    />
  )
}

export function EnterpriseIntegrationsTable() {
  return (
    <LiveTable
      swrKey="ent-integrations"
      fetcher={() => get<Row>("/api/v1/enterprise-portal/integrations")}
      headers={["Integration", "Kind", "Status", "Added"]}
      emptyLabel="No integrations registered."
      render={(r) => [
        <span className="font-medium">{str(r.name) || str(r.id).slice(0, 8)}</span>,
        <span className="text-xs text-muted-foreground">{str(r.kind) || "—"}</span>,
        <Badge className={ACTIVE(str(r.status)) ? "bg-emerald-100 text-emerald-700 border-0" : "bg-muted text-muted-foreground border-0"}>{str(r.status) || "—"}</Badge>,
        <span className="text-xs text-muted-foreground">{date(r.createdAt)}</span>,
      ]}
    />
  )
}

export function EnterpriseAuditTable() {
  return (
    <LiveTable
      swrKey="ent-audit"
      fetcher={() => get<Row>("/api/v1/enterprise-portal/audit-log")}
      headers={["Type", "Description", "Actor", "Logged"]}
      emptyLabel="No audit entries yet."
      render={(r) => [
        <Badge variant="outline" className="text-xs">{str(r.type) || str(r.eventType) || "EVENT"}</Badge>,
        <span className="max-w-[420px] truncate inline-block">{str(r.description) || str(r.summary) || "—"}</span>,
        <span className="text-xs text-muted-foreground">{str(r.actor) || str(r.actorId) || "—"}</span>,
        <span className="text-xs text-muted-foreground">{date(r.createdAt)}</span>,
      ]}
    />
  )
}

type Billing = {
  provider?: string
  providerActive?: boolean
  plan?: string
  status?: string
  manualInvoice?: boolean
  currentPeriodEnd?: string | null
  cancelAtPeriodEnd?: boolean
}

export function EnterpriseBillingCard() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "ent-billing" : null, async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error, response } = await (backend.GET as any)("/api/v1/enterprise-portal/billing")
    if (error || !response.ok) throw new Error(`Failed (${response.status})`)
    return data as Billing
  }, { revalidateOnFocus: false })

  if (isLoading) return <Card className="p-10 flex items-center gap-2 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading billing…</Card>
  if (error || !data) return <Card className="p-10 flex items-center gap-2 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load billing.</Card>

  const items: [string, React.ReactNode][] = [
    ["Plan", <span className="font-semibold">{data.plan ?? "—"}</span>],
    ["Status", <Badge className={data.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700 border-0" : "bg-muted text-muted-foreground border-0"}>{data.status ?? "—"}</Badge>],
    ["Provider", <span>{data.provider ?? "—"}{data.providerActive ? " (connected)" : ""}</span>],
    ["Billing mode", <span>{data.manualInvoice ? "Manual invoice" : "Self-serve (Stripe)"}</span>],
    ["Renews", <span>{data.currentPeriodEnd ? new Date(data.currentPeriodEnd).toLocaleDateString() : "—"}</span>],
    ["Cancels at period end", <span>{data.cancelAtPeriodEnd ? "Yes" : "No"}</span>],
  ]
  return (
    <Card className="p-6">
      <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
        {items.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between border-b border-dashed pb-2">
            <dt className="text-sm text-muted-foreground">{k}</dt>
            <dd className="text-sm">{v}</dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}
