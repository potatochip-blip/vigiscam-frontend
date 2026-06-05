'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { InvestigatorCasesTable } from "@/components/portals/investigator-cases-table"

export default function InvestigatorCasesPage() {
  return (
    <PageLayout role="investigator" title="Investigation Cases" subtitle="All fraud investigation cases">
      <div className="max-w-7xl mx-auto"><InvestigatorCasesTable /></div>
    </PageLayout>
  )
}
