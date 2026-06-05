'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PublicAlertsTable } from "@/components/portals/agency-tables"

export default function AgencyScamHotspotsPage() {
  return (
    <PageLayout role="agency" title="Scam Hotspots" subtitle="Highest-severity alerts by region">
      <div className="max-w-7xl mx-auto"><PublicAlertsTable emptyLabel="No hotspots flagged." /></div>
    </PageLayout>
  )
}
