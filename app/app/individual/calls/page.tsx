'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyRiskEventsTable } from "@/components/portals/family-tables"

export default function IndividualCallsPage() {
  return (
    <PageLayout role="individual" title="Calls" subtitle="Risk events from monitored calls">
      <div className="max-w-7xl mx-auto"><FamilyRiskEventsTable emptyLabel="No call risk events." /></div>
    </PageLayout>
  )
}
