'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Settings, Save, Key, Bell, Shield } from "lucide-react"

export default function InvestigatorSettingsPage() {
  return (
    <PageLayout role="investigator" title="Investigator Settings" subtitle="Customize investigation tools and preferences">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="api">API Access</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Investigator Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Badge Number</label>
                  <Input defaultValue="INV-2024-847" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Agency</label>
                  <Input defaultValue="FBI Cyber Division" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground">Two-Factor Authentication</p>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Investigation Preferences</h2>
              <div className="space-y-3">
                {[
                  { label: "Auto-sync across platforms", desc: "Automatically correlate actors" },
                  { label: "Real-time alerts on new clusters", desc: "Get notified immediately" },
                  { label: "Case recommendations", desc: "AI-powered case suggestions" },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{pref.label}</p>
                      <p className="text-xs text-muted-foreground">{pref.desc}</p>
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
              <div className="space-y-4">
                {[
                  { name: "New clusters detected", enabled: true },
                  { name: "Case escalations", enabled: true },
                  { name: "Evidence found matching query", enabled: true },
                  { name: "Actor linking completed", enabled: false },
                  { name: "Takedown packages ready", enabled: true },
                  { name: "Weekly summary report", enabled: false },
                ].map((alert, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{alert.name}</span>
                    <Switch defaultChecked={alert.enabled} />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Key className="h-4 w-4 text-primary" /> API Keys
              </h2>
              <div className="space-y-4">
                <div className="bg-muted/40 rounded-lg p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Investigator API Key</p>
                  <p className="text-xs font-mono text-muted-foreground mb-2">inv_••••••••••••••••••2847</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs">Rotate</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Revoke</Button>
                  </div>
                </div>
                <Button className="gap-2"><Key className="h-4 w-4" /> Generate New API Key</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Privacy & Security
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Hide case details in reports", desc: "Redact sensitive information" },
                  { label: "Limit case access by rank", desc: "Only show cases appropriate to level" },
                  { label: "Audit my investigation history", desc: "Track my case activity" },
                ].map((privacy, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{privacy.label}</p>
                      <p className="text-xs text-muted-foreground">{privacy.desc}</p>
                    </div>
                    <Switch defaultChecked={i === 0} />
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
