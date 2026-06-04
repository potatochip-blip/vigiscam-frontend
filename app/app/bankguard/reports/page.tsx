'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { BankQueueTable } from "@/components/portals/bank-queue-table"

export default function BankGuardReportsPage() {
  return (
    <PageLayout role="bankguard" title="Reports" subtitle="Case reports across the BankGuard review queue">
      <div className="max-w-7xl mx-auto"><BankQueueTable /></div>
    </PageLayout>
  )
}
