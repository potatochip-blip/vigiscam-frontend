'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyTrustedContactsTable } from "@/components/portals/family-tables"

export default function IndividualContactsPage() {
  return (
    <PageLayout role="individual" title="Contacts" subtitle="Your trusted contacts">
      <div className="max-w-7xl mx-auto"><FamilyTrustedContactsTable /></div>
    </PageLayout>
  )
}
