'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { InvestigatorCasesTable } from "@/components/portals/investigator-cases-table"

export default function InvestigatorEntitiesPage() {
  return (
    <PageLayout role="investigator" title="Entities" subtitle="Cases by the entities under investigation">
      <div className="max-w-7xl mx-auto"><InvestigatorCasesTable /></div>
    </PageLayout>
  )
}
