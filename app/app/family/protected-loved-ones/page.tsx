'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyGuardianshipTable } from "@/components/portals/family-tables"

export default function FamilyProtectedLovedOnesPage() {
  return (
    <PageLayout role="family" title="Protected Loved Ones" subtitle="People you actively protect">
      <div className="max-w-7xl mx-auto"><FamilyGuardianshipTable /></div>
    </PageLayout>
  )
}
