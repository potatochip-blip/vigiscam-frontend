'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { EnterpriseDevicesTable } from "@/components/portals/enterprise-tables"

export default function EnterpriseDevicesPage() {
  return (
    <PageLayout role="enterprise" title="Devices" subtitle="Protected device fleet across your organization">
      <div className="max-w-7xl mx-auto"><EnterpriseDevicesTable /></div>
    </PageLayout>
  )
}
