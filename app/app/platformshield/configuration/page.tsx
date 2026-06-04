'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function PlatformShieldConfigurationPage() {
  return (
    <PageLayout role="platformshield" title="Configuration" subtitle="PlatformShield moderation configuration">
      <div className="max-w-7xl mx-auto">
        <Card className="p-10 text-center">
          <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">Moderation configuration</p>
          <p className="text-sm text-muted-foreground mt-1">
            Auto-moderation thresholds, content categories, and reviewer routing are configured per platform by your VIGISCAM administrator.
          </p>
        </Card>
      </div>
    </PageLayout>
  )
}
