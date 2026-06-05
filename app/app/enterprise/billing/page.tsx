'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { EnterpriseBillingCard } from "@/components/portals/enterprise-tables"
import { useBillingActions } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function EnterpriseBillingPage() {
  const { manageBilling, busy } = useBillingActions()
  return (
    <PageLayout role="enterprise" title="Billing" subtitle="Live subscription state for your organization">
      <div className="max-w-3xl mx-auto space-y-4">
        <EnterpriseBillingCard />
        <div className="flex justify-end">
          <Button onClick={() => manageBilling()} disabled={!!busy}>
            {busy ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Opening…</> : "Manage billing"}
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
