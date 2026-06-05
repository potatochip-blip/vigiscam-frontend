'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyRiskEventsTable } from "@/components/portals/family-tables"

export default function IndividualAlertsPage() {
  return (
    <PageLayout role="individual" title="Alerts" subtitle="Risk and scam alerts on your account">
      <div className="max-w-7xl mx-auto"><FamilyRiskEventsTable emptyLabel="No alerts — you're all clear." /></div>
    </PageLayout>
  )
}
