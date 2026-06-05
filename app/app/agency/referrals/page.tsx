'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { InvestigatorCasesTable } from "@/components/portals/investigator-cases-table"

export default function AgencyReferralsPage() {
  return (
    <PageLayout role="agency" title="Referrals" subtitle="Cases referred for cross-agency action">
      <div className="max-w-7xl mx-auto"><InvestigatorCasesTable openOnly /></div>
    </PageLayout>
  )
}
