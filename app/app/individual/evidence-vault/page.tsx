'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyRiskEventsTable } from "@/components/portals/family-tables"

export default function IndividualEvidenceVaultPage() {
  return (
    <PageLayout role="individual" title="Evidence Vault" subtitle="Your secured protection evidence">
      <div className="max-w-7xl mx-auto"><FamilyRiskEventsTable emptyLabel="No evidence stored yet." /></div>
    </PageLayout>
  )
}
