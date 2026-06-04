'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PlatformModerationTable } from "@/components/portals/platform-moderation-table"

export default function PlatformShieldAccountsPage() {
  return (
    <PageLayout role="platformshield" title="Flagged Accounts" subtitle="Accounts flagged for scam or abuse activity">
      <div className="max-w-7xl mx-auto"><PlatformModerationTable /></div>
    </PageLayout>
  )
}
