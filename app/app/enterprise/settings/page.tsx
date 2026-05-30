'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Settings, Save, Bell, Shield, Lock } from "lucide-react"

export default function EnterpriseSettingsPage() {
  return (
    <PageLayout role="enterprise" title="Enterprise Settings" subtitle="Organization configuration and preferences">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="organization">
          <TabsList className="mb-6">
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="organization" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Organization Info</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Organization Name</label>
                  <Input defaultValue="Acme Corporation" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Admin Email</label>
                  <Input defaultValue="admin@acme.com" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Security Settings
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Require Two-Factor Authentication", desc: "For all users" },
                  { label: "Enforce Strong Passwords", desc: "12+ chars, mixed case, numbers" },
                  { label: "Session Timeout", desc: "30 minutes of inactivity" },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{setting.label}</p>
                      <p className="text-xs text-muted-foreground">{setting.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" /> Alert Preferences
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Security Alerts", enabled: true },
                  { label: "Billing Alerts", enabled: true },
                  { label: "System Maintenance", enabled: false },
                ].map((notif, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{notif.label}</span>
                    <Switch defaultChecked={notif.enabled} />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3">
          <Button className="gap-2"><Save className="h-4 w-4" /> Save Settings</Button>
          <Button variant="outline">Reset to Defaults</Button>
        </div>
      </div>
    </PageLayout>
  )
}
