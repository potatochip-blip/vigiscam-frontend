'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { InvestigatorCasesTable } from "@/components/portals/investigator-cases-table"

export default function AgencyNetworkIntelligencePage() {
  return (
    <PageLayout role="agency" title="Network Intelligence" subtitle="Cross-agency fraud network cases">
      <div className="max-w-7xl mx-auto"><InvestigatorCasesTable /></div>
    </PageLayout>
  )
}
