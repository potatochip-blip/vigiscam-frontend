'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyRiskEventsTable } from "@/components/portals/family-tables"

export default function FamilyActivityPage() {
  return (
    <PageLayout role="family" title="Activity" subtitle="Recent protection activity across your family">
      <div className="max-w-7xl mx-auto"><FamilyRiskEventsTable emptyLabel="No activity yet." /></div>
    </PageLayout>
  )
}
