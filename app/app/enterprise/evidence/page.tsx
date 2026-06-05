'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { EnterpriseAuditTable } from "@/components/portals/enterprise-tables"

export default function EnterpriseEvidencePage() {
  return (
    <PageLayout role="enterprise" title="Evidence Vault" subtitle="Chain-of-custody evidence for your organization">
      <div className="max-w-7xl mx-auto"><EnterpriseAuditTable /></div>
    </PageLayout>
  )
}
