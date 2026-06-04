'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { PlatformModerationTable } from "@/components/portals/platform-moderation-table"

export default function PlatformShieldScamRingsPage() {
  return (
    <PageLayout role="platformshield" title="Scam Rings" subtitle="Coordinated scam networks detected on the platform">
      <div className="max-w-7xl mx-auto"><PlatformModerationTable minRisk={60} /></div>
    </PageLayout>
  )
}
