'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function EnterpriseSettingsPage() {
  return (
    <PageLayout role="enterprise" title="Settings" subtitle="Organization settings">
      <div className="max-w-7xl mx-auto">
        <Card className="p-10 text-center">
          <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">Organization settings</p>
          <p className="text-sm text-muted-foreground mt-1">
            Protection policies are configured on the Policies page. SSO, data-residency, and contract settings are managed by your VIGISCAM account team.
          </p>
        </Card>
      </div>
    </PageLayout>
  )
}
