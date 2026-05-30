'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Settings, Save, Bell, Shield, Users } from "lucide-react"

export default function AgencySettingsPage() {
  return (
    <PageLayout role="agency" title="Agency Settings" subtitle="Configure agency coordination and communication">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="partners">Partner Agencies</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Agency Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Agency Name</label>
                  <Input defaultValue="Federal Bureau of Investigation" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Primary Contact</label>
                  <Input defaultValue="fraud-operations@fbi.gov" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Region</label>
                  <Input defaultValue="North America" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Coordination Preferences</h2>
              <div className="space-y-3">
                {[
                  { label: "Auto-share alerts with partners", desc: "Share new threats immediately" },
                  { label: "Real-time case synchronization", desc: "Keep case data in sync" },
                  { label: "Regional trend notifications", desc: "Daily hotspot alerts" },
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

          <TabsContent value="partners" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Partner Agencies
              </h2>
              <div className="space-y-3">
                {[
                  { name: "Secret Service", region: "North America", contact: "ss@dhs.gov" },
                  { name: "RCMP", region: "Canada", contact: "fraud@rcmp.gc.ca" },
                  { name: "Interpol", region: "International", contact: "coordination@interpol.int" },
                ].map((partner, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{partner.name}</p>
                      <p className="text-xs text-muted-foreground">{partner.region} · {partner.contact}</p>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full gap-2"><Users className="h-4 w-4" /> Add Partner Agency</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Connected Systems</h2>
              <div className="space-y-3">
                {[
                  { system: "FBI CISS", status: "Connected" },
                  { system: "Interpol I-24/7", status: "Connected" },
                  { system: "IC3 Database", status: "Connecting..." },
                ].map((int, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{int.system}</span>
                    <span className={int.status === "Connected" ? "text-green-600 text-xs font-semibold" : "text-blue-600 text-xs"}>{int.status}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Security & Compliance
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Two-Factor Authentication", desc: "Required for all users" },
                  { label: "Data encryption in transit", desc: "TLS 1.3+", enabled: true },
                  { label: "Audit logging", desc: "All access logged and monitored" },
                ].map((sec, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{sec.label}</p>
                      <p className="text-xs text-muted-foreground">{sec.desc}</p>
                    </div>
                    <Switch defaultChecked={sec.enabled} />
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
