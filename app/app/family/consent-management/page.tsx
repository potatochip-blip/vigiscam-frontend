'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyConsentTable, FamilyTrustedContactsTable } from "@/components/portals/family-tables"

export default function FamilyConsentManagementPage() {
  return (
    <PageLayout role="family" title="Consent Management" subtitle="Who can monitor you, and your trusted contacts">
      <div className="max-w-7xl mx-auto space-y-8">
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">People monitoring my account</h2>
          <FamilyConsentTable />
        </section>
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">My trusted contacts</h2>
          <FamilyTrustedContactsTable />
        </section>
      </div>
    </PageLayout>
  )
}
