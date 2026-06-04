'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { HelpCircle, Loader2, AlertTriangle } from "lucide-react"
import { useAdminSupport } from "@/lib/hooks"

type SupportData = { tickets?: unknown[]; openCount?: number; resolvedCount?: number }

export default function AdminSupportPage() {
  const { data, isLoading, error } = useAdminSupport()
  const s = (data ?? {}) as SupportData

  return (
    <PageLayout role="admin" title="Customer Support" subtitle="Manage support tickets and customer inquiries">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading support…
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600">
            <AlertTriangle className="h-5 w-5" /> Could not load support data.
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-4 text-center">
              <Card className="p-4"><p className="text-xs text-muted-foreground">Open Tickets</p><p className="text-2xl font-bold">{s.openCount ?? 0}</p></Card>
              <Card className="p-4"><p className="text-xs text-muted-foreground">Resolved</p><p className="text-2xl font-bold">{s.resolvedCount ?? 0}</p></Card>
              <Card className="p-4"><p className="text-xs text-muted-foreground">Total</p><p className="text-2xl font-bold">{s.tickets?.length ?? 0}</p></Card>
            </div>
            <Card className="p-6">
              <h3 className="text-base font-bold text-foreground mb-4">Recent Tickets</h3>
              {(s.tickets?.length ?? 0) === 0 ? (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" /> No support tickets. (Ticketing integration not yet enabled.)
                </p>
              ) : null}
            </Card>
          </>
        )}
      </div>
    </PageLayout>
  )
}
