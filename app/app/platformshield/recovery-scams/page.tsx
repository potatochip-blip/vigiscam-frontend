'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PlatformModerationTable } from "@/components/portals/platform-moderation-table"

export default function PlatformShieldRecoveryScamsPage() {
  return (
    <PageLayout role="platformshield" title="Recovery Scams" subtitle="Recovery-scam content flagged on the platform">
      <div className="max-w-7xl mx-auto"><PlatformModerationTable category="recovery" /></div>
    </PageLayout>
  )
}
