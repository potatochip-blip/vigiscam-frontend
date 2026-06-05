'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function EnterpriseUsersPage() {
  return (
    <PageLayout role="enterprise" title="Users" subtitle="Members of your organization">
      <div className="max-w-7xl mx-auto">
        <Card className="p-10 text-center">
          <Users className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-foreground">Member management</p>
          <p className="text-sm text-muted-foreground mt-1">
            Member invitations, role assignment, and SSO provisioning for your tenant are managed by your VIGISCAM account team. Contact support to add or remove organization members.
          </p>
        </Card>
      </div>
    </PageLayout>
  )
}
