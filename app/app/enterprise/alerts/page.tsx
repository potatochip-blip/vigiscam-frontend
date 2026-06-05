'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { EnterpriseAuditTable } from "@/components/portals/enterprise-tables"

export default function EnterpriseAlertsPage() {
  return (
    <PageLayout role="enterprise" title="Security Alerts" subtitle="Risk and protection events across your organization">
      <div className="max-w-7xl mx-auto"><EnterpriseAuditTable /></div>
    </PageLayout>
  )
}
