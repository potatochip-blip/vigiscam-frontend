'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { BankQueueTable } from "@/components/portals/bank-queue-table"

export default function BankGuardScamJourneysPage() {
  return (
    <PageLayout role="bankguard" title="Scam Journeys" subtitle="Customer cases mapped to scam progression">
      <div className="max-w-7xl mx-auto"><BankQueueTable /></div>
    </PageLayout>
  )
}
