'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { EnterprisePoliciesTable } from "@/components/portals/enterprise-tables"

export default function EnterprisePoliciesPage() {
  return (
    <PageLayout role="enterprise" title="Policies" subtitle="Protection policies applied across your organization">
      <div className="max-w-7xl mx-auto"><EnterprisePoliciesTable /></div>
    </PageLayout>
  )
}
