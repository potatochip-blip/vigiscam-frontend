'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PlatformModerationTable } from "@/components/portals/platform-moderation-table"

export default function PlatformShieldGroomingDetectionPage() {
  return (
    <PageLayout role="platformshield" title="Grooming Detection" subtitle="Conversations flagged for grooming patterns">
      <div className="max-w-7xl mx-auto"><PlatformModerationTable category="groom" /></div>
    </PageLayout>
  )
}
