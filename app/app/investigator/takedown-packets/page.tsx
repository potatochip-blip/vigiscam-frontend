'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { InvestigatorCasesTable } from "@/components/portals/investigator-cases-table"

export default function InvestigatorTakedownPacketsPage() {
  return (
    <PageLayout role="investigator" title="Takedown Packets" subtitle="Cases prepared for takedown and referral">
      <div className="max-w-7xl mx-auto"><InvestigatorCasesTable openOnly /></div>
    </PageLayout>
  )
}
