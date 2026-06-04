'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { BankQueueTable } from "@/components/portals/bank-queue-table"

export default function BankGuardAnalyticsPage() {
  return (
    <PageLayout role="bankguard" title="Fraud Analytics" subtitle="Case-level analytics across the BankGuard review queue">
      <div className="max-w-7xl mx-auto"><BankQueueTable /></div>
    </PageLayout>
  )
}
