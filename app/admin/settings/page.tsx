'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Shield, Bell, Loader2, AlertTriangle } from "lucide-react"
import { useAdminSettings } from "@/lib/hooks"

type Settings = {
  maintenanceMode?: boolean
  signupsEnabled?: boolean
  aiEnabled?: boolean
  billingEnabled?: boolean
  defaultGuardianPauseSeconds?: number
}

export default function AdminSettingsPage() {
  const { data, isLoading, error } = useAdminSettings()
  const s = (data ?? {}) as Settings

  const flags = [
    { name: "Maintenance Mode", value: !!s.maintenanceMode, desc: "Take the platform offline for maintenance" },
    { name: "Signups Enabled", value: s.signupsEnabled ?? true, desc: "Allow new account registration" },
    { name: "AI Engine Enabled", value: s.aiEnabled ?? true, desc: "Use the external AI scoring service" },
    { name: "Billing Enabled", value: s.billingEnabled ?? true, desc: "Stripe checkout + portal active" },
  ]

  return (
    <PageLayout role="admin" title="System Settings" subtitle="Platform configuration and preferences">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="features">
          <TabsList className="mb-6">
            <TabsTrigger value="features">Feature Flags</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" /> Live Platform Flags
              </h2>
              {isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground text-sm"><Loader2 className="h-4 w-4 animate-spin" /> Loading settings…</div>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-600 text-sm"><AlertTriangle className="h-4 w-4" /> Could not load settings.</div>
              ) : (
                <div className="space-y-3">
                  {flags.map((flag) => (
                    <div key={flag.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{flag.name}</p>
                        <p className="text-xs text-muted-foreground">{flag.desc}</p>
                      </div>
                      <Switch checked={flag.value} disabled />
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-2">
                    <p className="text-sm font-semibold text-foreground">Default Guardian Pause</p>
                    <span className="text-sm text-muted-foreground">{s.defaultGuardianPauseSeconds ?? 30}s</span>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">These reflect live platform state (read-only; editing requires the settings write API).</p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Platform Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Platform Name</label>
                  <Input defaultValue="VIGISCAM™ Platform" disabled />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Support Email</label>
                  <Input defaultValue="support@vigiscam.io" disabled />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Security Policy
              </h2>
              <p className="text-sm text-muted-foreground">
                Admin MFA, IP allow-listing, and session timeout are enforced at the infrastructure layer.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
