'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { InvestigatorCasesTable } from "@/components/portals/investigator-cases-table"

export default function InvestigatorActorLinkingPage() {
  return (
    <PageLayout role="investigator" title="Actor Linking" subtitle="Cases linked to identified fraud actors">
      <div className="max-w-7xl mx-auto"><InvestigatorCasesTable /></div>
    </PageLayout>
  )
}
