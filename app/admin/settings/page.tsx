'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Settings, Save, Shield, Bell } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <PageLayout role="admin" title="System Settings" subtitle="Platform configuration and preferences">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="system">
          <TabsList className="mb-6">
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Platform Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Platform Name</label>
                  <Input defaultValue="VIGISCAM™ Platform" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Support Email</label>
                  <Input defaultValue="support@vigiscam.io" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Security Policy
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Require Admin MFA", desc: "All admins must use 2FA" },
                  { label: "IP Whitelist", desc: "Restrict admin access" },
                  { label: "Session Timeout", desc: "60 minutes" },
                ].map((sec, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{sec.label}</p>
                      <p className="text-xs text-muted-foreground">{sec.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" /> Feature Flags
              </h2>
              <div className="space-y-3">
                {[
                  { name: "Beta Features", enabled: false, desc: "Enable experimental features" },
                  { name: "Advanced Analytics", enabled: true, desc: "Enhanced reporting tools" },
                  { name: "API Rate Limiting", enabled: true, desc: "Protect against abuse" },
                ].map((flag, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{flag.name}</p>
                      <p className="text-xs text-muted-foreground">{flag.desc}</p>
                    </div>
                    <Switch defaultChecked={flag.enabled} />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3">
          <Button className="gap-2"><Save className="h-4 w-4" /> Save Settings</Button>
        </div>
      </div>
    </PageLayout>
  )
}
