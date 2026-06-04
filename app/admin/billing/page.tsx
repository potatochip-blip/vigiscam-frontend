'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Loader2, AlertTriangle } from "lucide-react"
import { useAdminRevenue } from "@/lib/hooks"

function money(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(2)}`
}

export default function AdminBillingPage() {
  const { data, isLoading, error } = useAdminRevenue()

  return (
    <PageLayout role="admin" title="Platform Billing" subtitle="Manage subscriptions and revenue">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading revenue…
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600">
            <AlertTriangle className="h-5 w-5" /> Could not load revenue (reviewer access required).
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-4 gap-4 text-center">
              <Card className="p-4"><p className="text-xs text-muted-foreground">MRR</p><p className="text-2xl font-bold">{money(data?.mrr ?? 0)}</p></Card>
              <Card className="p-4"><p className="text-xs text-muted-foreground">Active Subs</p><p className="text-2xl font-bold">{data?.activeSubscriptions ?? 0}</p></Card>
              <Card className="p-4"><p className="text-xs text-muted-foreground">Total Subs</p><p className="text-2xl font-bold">{data?.totalSubscriptions ?? 0}</p></Card>
              <Card className="p-4"><p className="text-xs text-muted-foreground">ARR</p><p className="text-2xl font-bold">{money(data?.arr ?? 0)}</p></Card>
            </div>
            <Card className="p-6">
              <h3 className="text-base font-bold text-foreground mb-4">Plan Distribution</h3>
              {(data?.planDistribution?.length ?? 0) === 0 ? (
                <p className="text-sm text-muted-foreground">No active paid subscriptions yet.</p>
              ) : (
                <div className="space-y-2">
                  {data?.planDistribution.map((p) => (
                    <div key={p.plan} className="flex items-center justify-between p-3 bg-muted/40 rounded">
                      <div>
                        <p className="text-sm font-medium text-foreground">{p.label}</p>
                        <p className="text-xs text-muted-foreground">{p.subscriptions} subscription{p.subscriptions !== 1 ? "s" : ""}</p>
                      </div>
                      <div className="text-right text-xs">
                        <p className="font-semibold text-foreground">{money(p.monthlyRevenue)}/mo</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </PageLayout>
  )
}
