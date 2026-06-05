'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyRiskEventsTable } from "@/components/portals/family-tables"

export default function FamilyLiveRiskPage() {
  return (
    <PageLayout role="family" title="Live Risk" subtitle="Real-time risk scoring across your family">
      <div className="max-w-7xl mx-auto"><FamilyRiskEventsTable emptyLabel="No risk activity right now." /></div>
    </PageLayout>
  )
}
