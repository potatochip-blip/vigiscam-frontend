'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { EnterpriseAuditTable } from "@/components/portals/enterprise-tables"

export default function EnterpriseAuditPage() {
  return (
    <PageLayout role="enterprise" title="Audit Log" subtitle="Tenant-scoped, tamper-evident evidence chain">
      <div className="max-w-7xl mx-auto"><EnterpriseAuditTable /></div>
    </PageLayout>
  )
}
