'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { BankQueueTable } from "@/components/portals/bank-queue-table"

export default function BankGuardLiveRiskQueuePage() {
  return (
    <PageLayout role="bankguard" title="Live Risk Queue" subtitle="Real-time customer fraud cases awaiting review">
      <div className="max-w-7xl mx-auto"><BankQueueTable /></div>
    </PageLayout>
  )
}
