'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyRiskEventsTable } from "@/components/portals/family-tables"

export default function IndividualLiveProtectionPage() {
  return (
    <PageLayout role="individual" title="Live Protection" subtitle="Real-time risk scoring on your activity">
      <div className="max-w-7xl mx-auto"><FamilyRiskEventsTable emptyLabel="No risk activity right now." /></div>
    </PageLayout>
  )
}
