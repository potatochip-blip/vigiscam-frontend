'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { BankQueueTable } from "@/components/portals/bank-queue-table"

export default function BankGuardTransactionMonitoringPage() {
  return (
    <PageLayout role="bankguard" title="Transaction Monitoring" subtitle="Flagged transactions under fraud review">
      <div className="max-w-7xl mx-auto"><BankQueueTable /></div>
    </PageLayout>
  )
}
