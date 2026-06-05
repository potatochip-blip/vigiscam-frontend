'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { InvestigatorCasesTable } from "@/components/portals/investigator-cases-table"

export default function InvestigatorReportsPage() {
  return (
    <PageLayout role="investigator" title="Reports" subtitle="Case reports across all investigations">
      <div className="max-w-7xl mx-auto"><InvestigatorCasesTable /></div>
    </PageLayout>
  )
}
