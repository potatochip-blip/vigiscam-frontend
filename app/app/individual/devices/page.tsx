'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { IndividualDevicesTable } from "@/components/portals/individual-tables"

export default function IndividualDevicesPage() {
  return (
    <PageLayout role="individual" title="Devices" subtitle="Devices protected under your account">
      <div className="max-w-7xl mx-auto"><IndividualDevicesTable /></div>
    </PageLayout>
  )
}
