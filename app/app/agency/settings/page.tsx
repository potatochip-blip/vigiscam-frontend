'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function AgencySettingsPage() {
  return (
    <PageLayout role="agency" title="Settings" subtitle="Agency operations settings">
      <div className="max-w-7xl mx-auto">
        <Card className="p-10 text-center">
          <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">Agency settings</p>
          <p className="text-sm text-muted-foreground mt-1">
            Analyst roles, jurisdiction scope, and inter-agency data-sharing agreements are provisioned by your VIGISCAM account team.
          </p>
        </Card>
      </div>
    </PageLayout>
  )
}
