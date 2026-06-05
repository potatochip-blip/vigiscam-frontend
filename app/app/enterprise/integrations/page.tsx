'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { EnterpriseIntegrationsTable } from "@/components/portals/enterprise-tables"

export default function EnterpriseIntegrationsPage() {
  return (
    <PageLayout role="enterprise" title="Integrations" subtitle="Third-party integrations registered for your tenant">
      <div className="max-w-7xl mx-auto"><EnterpriseIntegrationsTable /></div>
    </PageLayout>
  )
}
