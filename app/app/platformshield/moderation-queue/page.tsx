'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PlatformModerationTable } from "@/components/portals/platform-moderation-table"

export default function PlatformShieldModerationQueuePage() {
  return (
    <PageLayout role="platformshield" title="Moderation Queue" subtitle="Flagged content and accounts awaiting moderation">
      <div className="max-w-7xl mx-auto"><PlatformModerationTable /></div>
    </PageLayout>
  )
}
