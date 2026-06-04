'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Zap } from "lucide-react"

export default function BankGuardIntegrationsPage() {
  return (
    <PageLayout role="bankguard" title="Integrations" subtitle="Connect BankGuard to your core banking systems">
      <div className="max-w-7xl mx-auto">
        <Card className="p-10 text-center">
          <Zap className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">No integrations connected</p>
          <p className="text-sm text-muted-foreground mt-1">
            Core-banking and case-management integrations are provisioned per institution. Contact your VIGISCAM account manager to enable them.
          </p>
        </Card>
      </div>
    </PageLayout>
  )
}
