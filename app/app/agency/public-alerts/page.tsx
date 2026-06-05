'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PublicAlertsTable } from "@/components/portals/agency-tables"

export default function AgencyPublicAlertsPage() {
  return (
    <PageLayout role="agency" title="Public Alerts" subtitle="Published scam alerts for the public">
      <div className="max-w-7xl mx-auto"><PublicAlertsTable /></div>
    </PageLayout>
  )
}
