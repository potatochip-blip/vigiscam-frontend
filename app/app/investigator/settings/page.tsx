'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function InvestigatorSettingsPage() {
  return (
    <PageLayout role="investigator" title="Settings" subtitle="Investigator console settings">
      <div className="max-w-7xl mx-auto">
        <Card className="p-10 text-center">
          <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">Console settings</p>
          <p className="text-sm text-muted-foreground mt-1">
            Investigator roles, case routing, and evidence retention are managed at the platform level by your VIGISCAM administrator.
          </p>
        </Card>
      </div>
    </PageLayout>
  )
}
