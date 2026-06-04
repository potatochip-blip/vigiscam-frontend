'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PlatformModerationTable } from "@/components/portals/platform-moderation-table"

export default function PlatformShieldFakeSupportGroupsPage() {
  return (
    <PageLayout role="platformshield" title="Fake Support Groups" subtitle="Impersonation and fake-support content under review">
      <div className="max-w-7xl mx-auto"><PlatformModerationTable category="support" /></div>
    </PageLayout>
  )
}
