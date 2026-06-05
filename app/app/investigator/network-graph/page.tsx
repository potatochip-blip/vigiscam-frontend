'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { InvestigatorCasesTable } from "@/components/portals/investigator-cases-table"

export default function InvestigatorNetworkGraphPage() {
  return (
    <PageLayout role="investigator" title="Network Graph" subtitle="Cases mapped across the fraud network">
      <div className="max-w-7xl mx-auto"><InvestigatorCasesTable /></div>
    </PageLayout>
  )
}
