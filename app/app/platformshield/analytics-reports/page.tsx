'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PlatformModerationTable } from "@/components/portals/platform-moderation-table"

export default function PlatformShieldAnalyticsReportsPage() {
  return (
    <PageLayout role="platformshield" title="Analytics & Reports" subtitle="Moderation activity across the platform">
      <div className="max-w-7xl mx-auto"><PlatformModerationTable /></div>
    </PageLayout>
  )
}
