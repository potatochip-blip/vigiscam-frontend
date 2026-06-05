'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PublicAlertsTable } from "@/components/portals/agency-tables"

export default function AgencyRegionalTrendsPage() {
  return (
    <PageLayout role="agency" title="Regional Trends" subtitle="Scam alert activity by region">
      <div className="max-w-7xl mx-auto"><PublicAlertsTable emptyLabel="No regional alert activity yet." /></div>
    </PageLayout>
  )
}
