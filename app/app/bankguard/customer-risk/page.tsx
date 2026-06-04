'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { BankQueueTable } from "@/components/portals/bank-queue-table"

export default function BankGuardCustomerRiskPage() {
  return (
    <PageLayout role="bankguard" title="Customer Risk" subtitle="Customers with active fraud risk on their accounts">
      <div className="max-w-7xl mx-auto"><BankQueueTable /></div>
    </PageLayout>
  )
}
