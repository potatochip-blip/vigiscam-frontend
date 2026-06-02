'use client'

import useSWR from 'swr'
import { PageLayout } from '@/components/dashboard/page-layout'
import { Card } from '@/components/ui/card'
import { Stat } from '@/components/dashboard/stat'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ShieldAlert, CreditCard, Users, Search, Loader2 } from 'lucide-react'
import { backend } from '@/lib/backend'
import { useAuth } from '@/lib/auth-context'

/** Shape of GET /api/v1/admin/oversight/overview (Phase 10F). */
interface OversightOverview {
  generatedAt: string
  protectionModules: {
    guardianPause: { total: number; active: number }
    scamHold: { total: number }
    giftCardGuard: { total: number }
    walletGuard: { total: number }
    claimVerify: { total: number }
    scamMirror: { total: number }
    trustedContactReview: { total: number; pending: number }
  }
  rolePortals: {
    bankGuard: { caseReviews: number; tellerScores: number }
    platformShield: { groomingChecks: number; moderationDecisions: number }
    investigator: { cases: number; open: number }
    enterprise: { policies: number; integrations: number }
  }
}

async function fetchOverview(): Promise<OversightOverview> {
  const { data, error, response } = await backend.GET('/api/v1/admin/oversight/overview')
  if (error || !response.ok) {
    throw new Error(`Failed to load overview (${response.status})`)
  }
  // The OpenAPI spec doesn't declare a response schema for this endpoint, so
  // openapi-fetch types `data` as undefined — cast through unknown.
  return data as unknown as OversightOverview
}

export default function AdminOverviewPage() {
  const { isAuthenticated } = useAuth()
  // Only fetch once the in-memory access token is set (auth restored).
  const { data, error, isLoading } = useSWR(
    isAuthenticated ? 'admin-oversight-overview' : null,
    fetchOverview,
    { revalidateOnFocus: false },
  )

  const pm = data?.protectionModules
  const rp = data?.rolePortals

  const chartData = pm
    ? [
        { name: 'Guardian Pause', count: pm.guardianPause.total },
        { name: 'ScamHold', count: pm.scamHold.total },
        { name: 'GiftCard', count: pm.giftCardGuard.total },
        { name: 'WalletGuard', count: pm.walletGuard.total },
        { name: 'ClaimVerify', count: pm.claimVerify.total },
        { name: 'ScamMirror', count: pm.scamMirror.total },
        { name: 'Trusted Contact', count: pm.trustedContactReview.total },
      ]
    : []

  return (
    <PageLayout
      role="admin"
      title="System Administration"
      subtitle="Platform-wide monitoring and control"
    >
      <div className="space-y-6">
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            Could not load live platform data. {String((error as Error).message ?? error)}
          </div>
        )}

        {isLoading && !data && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading live platform data…
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat
            icon={ShieldAlert}
            title="Guardian Pauses"
            value={pm ? pm.guardianPause.total.toLocaleString() : '—'}
            description={pm ? `${pm.guardianPause.active} active now` : 'Live across all tenants'}
          />
          <Stat
            icon={CreditCard}
            title="ScamHold Checks"
            value={pm ? pm.scamHold.total.toLocaleString() : '—'}
            description="Transactions screened"
          />
          <Stat
            icon={Users}
            title="Trusted-Contact Reviews"
            value={pm ? pm.trustedContactReview.total.toLocaleString() : '—'}
            description={pm ? `${pm.trustedContactReview.pending} pending` : 'Family escalations'}
          />
          <Stat
            icon={Search}
            title="Investigator Cases"
            value={rp ? rp.investigator.cases.toLocaleString() : '—'}
            description={rp ? `${rp.investigator.open} open` : 'Across agencies'}
          />
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-foreground">Protection Module Activity</h3>
            {data && (
              <span className="text-xs text-muted-foreground">
                as of {new Date(data.generatedAt).toLocaleString()}
              </span>
            )}
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Role Portal Activity</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <PortalCounts
              label="BankGuard"
              rows={
                rp
                  ? [
                      ['Case reviews', rp.bankGuard.caseReviews],
                      ['Teller scores', rp.bankGuard.tellerScores],
                    ]
                  : []
              }
            />
            <PortalCounts
              label="PlatformShield"
              rows={
                rp
                  ? [
                      ['Grooming checks', rp.platformShield.groomingChecks],
                      ['Moderations', rp.platformShield.moderationDecisions],
                    ]
                  : []
              }
            />
            <PortalCounts
              label="Investigator"
              rows={
                rp
                  ? [
                      ['Cases', rp.investigator.cases],
                      ['Open', rp.investigator.open],
                    ]
                  : []
              }
            />
            <PortalCounts
              label="Enterprise"
              rows={
                rp
                  ? [
                      ['Policies', rp.enterprise.policies],
                      ['Integrations', rp.enterprise.integrations],
                    ]
                  : []
              }
            />
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}

function PortalCounts({ label, rows }: { label: string; rows: Array<[string, number]> }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {rows.length === 0 ? (
        <p className="text-muted-foreground">—</p>
      ) : (
        <ul className="space-y-1">
          {rows.map(([k, v]) => (
            <li key={k} className="flex items-center justify-between">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-medium text-foreground">{v.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
