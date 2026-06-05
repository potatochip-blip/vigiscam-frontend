'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PublicAlertsTable } from "@/components/portals/agency-tables"

export default function AgencyReportsPage() {
  return (
    <PageLayout role="agency" title="Reports" subtitle="Published public-alert reports">
      <div className="max-w-7xl mx-auto"><PublicAlertsTable emptyLabel="No reports published yet." /></div>
    </PageLayout>
  )
}
