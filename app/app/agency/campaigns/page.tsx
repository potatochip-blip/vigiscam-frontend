'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { InvestigatorCasesTable } from "@/components/portals/investigator-cases-table"

export default function AgencyCampaignsPage() {
  return (
    <PageLayout role="agency" title="Campaigns" subtitle="Coordinated fraud campaigns under investigation">
      <div className="max-w-7xl mx-auto"><InvestigatorCasesTable /></div>
    </PageLayout>
  )
}
