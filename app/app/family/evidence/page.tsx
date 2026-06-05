'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyRiskEventsTable } from "@/components/portals/family-tables"

export default function FamilyEvidencePage() {
  return (
    <PageLayout role="family" title="Evidence" subtitle="Your tamper-evident protection record">
      <div className="max-w-7xl mx-auto"><FamilyRiskEventsTable emptyLabel="No evidence recorded yet." /></div>
    </PageLayout>
  )
}
