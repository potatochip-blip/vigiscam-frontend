'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyRiskEventsTable } from "@/components/portals/family-tables"

export default function FamilyAlertsPage() {
  return (
    <PageLayout role="family" title="Alerts" subtitle="Scam and risk alerts across your family">
      <div className="max-w-7xl mx-auto"><FamilyRiskEventsTable emptyLabel="No alerts — all clear." /></div>
    </PageLayout>
  )
}
