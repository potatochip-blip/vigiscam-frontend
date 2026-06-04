'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { BankQueueTable } from "@/components/portals/bank-queue-table"

export default function BankGuardRiskAssessmentPage() {
  return (
    <PageLayout role="bankguard" title="Risk Assessment" subtitle="High-risk transactions flagged for assessment">
      <div className="max-w-7xl mx-auto"><BankQueueTable minRisk={60} /></div>
    </PageLayout>
  )
}
