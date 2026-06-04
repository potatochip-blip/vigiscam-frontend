'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PlatformModerationTable } from "@/components/portals/platform-moderation-table"

export default function PlatformShieldScriptFamiliesPage() {
  return (
    <PageLayout role="platformshield" title="Script Families" subtitle="Flagged content grouped by scam-script pattern">
      <div className="max-w-7xl mx-auto"><PlatformModerationTable /></div>
    </PageLayout>
  )
}
