'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyProtectionSettingsCard } from "@/components/portals/family-tables"

export default function IndividualSettingsPage() {
  return (
    <PageLayout role="individual" title="Protection Settings" subtitle="Your active scam-protection controls">
      <div className="max-w-3xl mx-auto"><FamilyProtectionSettingsCard /></div>
    </PageLayout>
  )
}
