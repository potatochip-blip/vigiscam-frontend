'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyGuardianshipTable } from "@/components/portals/family-tables"

export default function FamilyMembersPage() {
  return (
    <PageLayout role="family" title="Family Members" subtitle="Everyone in your guardianship circle">
      <div className="max-w-7xl mx-auto"><FamilyGuardianshipTable /></div>
    </PageLayout>
  )
}
