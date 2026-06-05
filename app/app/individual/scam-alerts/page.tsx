'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PublicAlertsTable } from "@/components/portals/agency-tables"

export default function IndividualScamAlertsPage() {
  return (
    <PageLayout role="individual" title="Scam Alerts" subtitle="Published scam warnings in your region">
      <div className="max-w-7xl mx-auto"><PublicAlertsTable emptyLabel="No published scam alerts right now." /></div>
    </PageLayout>
  )
}
