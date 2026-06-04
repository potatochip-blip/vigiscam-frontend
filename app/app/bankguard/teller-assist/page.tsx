'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { BankQueueTable } from "@/components/portals/bank-queue-table"

export default function BankGuardTellerAssistPage() {
  return (
    <PageLayout role="bankguard" title="Teller Assist" subtitle="Customer cases a teller can review and score at the counter">
      <div className="max-w-7xl mx-auto"><BankQueueTable /></div>
    </PageLayout>
  )
}
