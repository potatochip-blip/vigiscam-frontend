'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Monitor } from "lucide-react"

export default function IndividualRemoteSessionsPage() {
  return (
    <PageLayout role="individual" title="Remote Sessions" subtitle="Remote-access monitoring on your devices">
      <div className="max-w-7xl mx-auto">
        <Card className="p-10 text-center">
          <Monitor className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">No active remote sessions</p>
          <p className="text-sm text-muted-foreground mt-1">
            VIGISCAM watches your enrolled devices for remote-access tools (AnyDesk, TeamViewer, etc.) that scammers use. Any detected session and its risk score appear here and on your Live Protection feed.
          </p>
        </Card>
      </div>
    </PageLayout>
  )
}
