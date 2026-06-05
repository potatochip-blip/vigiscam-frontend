'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyGuardianshipTable } from "@/components/portals/family-tables"

export default function FamilyCheckInsPage() {
  return (
    <PageLayout role="family" title="Check-ins" subtitle="Status of the loved ones you protect">
      <div className="max-w-7xl mx-auto"><FamilyGuardianshipTable /></div>
    </PageLayout>
  )
}
