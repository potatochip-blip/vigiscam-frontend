'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function BankGuardSettingsPage() {
  return (
    <PageLayout role="bankguard" title="Settings" subtitle="BankGuard portal configuration">
      <div className="max-w-7xl mx-auto">
        <Card className="p-10 text-center">
          <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">Institution settings</p>
          <p className="text-sm text-muted-foreground mt-1">
            Risk thresholds, reviewer roles, and escalation rules are managed at the institution level by your VIGISCAM administrator.
          </p>
        </Card>
      </div>
    </PageLayout>
  )
}
