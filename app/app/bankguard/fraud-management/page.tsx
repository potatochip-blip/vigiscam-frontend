'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { BankQueueTable } from "@/components/portals/bank-queue-table"

export default function BankGuardFraudManagementPage() {
  return (
    <PageLayout role="bankguard" title="Fraud Management" subtitle="Manage and resolve active fraud cases">
      <div className="max-w-7xl mx-auto"><BankQueueTable /></div>
    </PageLayout>
  )
}
