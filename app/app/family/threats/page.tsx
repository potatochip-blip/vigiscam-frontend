'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyRiskEventsTable } from "@/components/portals/family-tables"

export default function FamilyThreatsPage() {
  return (
    <PageLayout role="family" title="Threats" subtitle="Detected scam threats targeting your family">
      <div className="max-w-7xl mx-auto"><FamilyRiskEventsTable emptyLabel="No active threats." /></div>
    </PageLayout>
  )
}
