'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { FamilyReviewsTable } from "@/components/portals/family-tables"

export default function FamilyReviewCenterPage() {
  return (
    <PageLayout role="family" title="Review Center" subtitle="High-risk actions awaiting trusted-contact review">
      <div className="max-w-7xl mx-auto"><FamilyReviewsTable /></div>
    </PageLayout>
  )
}
