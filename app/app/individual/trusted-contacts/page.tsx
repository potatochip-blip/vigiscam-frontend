'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyTrustedContactsTable } from "@/components/portals/family-tables"

export default function IndividualTrustedContactsPage() {
  return (
    <PageLayout role="individual" title="Trusted Contacts" subtitle="People who can approve your high-risk actions">
      <div className="max-w-7xl mx-auto"><FamilyTrustedContactsTable /></div>
    </PageLayout>
  )
}
