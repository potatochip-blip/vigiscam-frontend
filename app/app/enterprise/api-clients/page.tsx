'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { EnterpriseIntegrationsTable } from "@/components/portals/enterprise-tables"

export default function EnterpriseApiClientsPage() {
  return (
    <PageLayout role="enterprise" title="API Clients" subtitle="Registered API integrations and machine clients">
      <div className="max-w-7xl mx-auto"><EnterpriseIntegrationsTable /></div>
    </PageLayout>
  )
}
