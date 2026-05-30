'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Key, Bell, Shield, Users, Save, RefreshCw } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BankGuardSettingsPage() {
  return (
    <PageLayout role="bankguard" title="BankGuard Settings" subtitle="Configure fraud detection thresholds, notifications, team access, and API keys">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="detection">
          <TabsList className="mb-6">
            <TabsTrigger value="detection">Detection</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="team">Team Access</TabsTrigger>
            <TabsTrigger value="api">API & Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="detection" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Risk Score Thresholds
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Auto-Block Threshold", value: "90", desc: "Transactions scoring above this are automatically blocked" },
                  { label: "Escalation Threshold", value: "80", desc: "Scores above this trigger fraud team escalation" },
                  { label: "Flag for Review Threshold", value: "65", desc: "Scores above this are flagged for manual review" },
                  { label: "Guardian Pause™ Auto-Trigger", value: "85", desc: "VictimState AI™ score to auto-initiate account pause" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input defaultValue={item.value} className="w-20 text-center" type="number" />
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Detection Modules</h2>
              <div className="space-y-3">
                {[
                  { name: "VictimState AI™ — Real-time customer vulnerability scoring", enabled: true },
                  { name: "Fraud Journey Engine™ — Multi-step scam pattern tracking", enabled: true },
                  { name: "A1SCAMSHIELD™ — Call-time scam detection", enabled: true },
                  { name: "SCAMZY™ — Cross-channel scam intelligence", enabled: true },
                  { name: "FreezeLock™ — Automatic account suspension", enabled: true },
                  { name: "Teller Assist — Branch and call center scripts", enabled: true },
                  { name: "Crypto Monitoring — Wallet and exchange pattern detection", enabled: false },
                ].map((mod, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{mod.name}</span>
                    <Switch defaultChecked={mod.enabled} />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Transaction Monitoring Limits</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Wire Transfer Alert Threshold", value: "$10,000" },
                  { label: "ACH Velocity Window", value: "15 min" },
                  { label: "Zelle Daily Limit Alert", value: "$5,000" },
                  { label: "Cash Withdrawal Alert", value: "$3,000" },
                ].map((item, i) => (
                  <div key={i}>
                    <label className="text-xs text-muted-foreground block mb-1">{item.label}</label>
                    <Input defaultValue={item.value} />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" /> Alert Channels
              </h2>
              <div className="space-y-4">
                {[
                  { channel: "Email Alerts", desc: "Critical fraud events and case updates", enabled: true },
                  { channel: "SMS Alerts", desc: "Auto-block and Guardian Pause™ events", enabled: true },
                  { channel: "Webhook", desc: "Real-time event stream to your SIEM/SOAR", enabled: false },
                  { channel: "In-App Notifications", desc: "All events surfaced in dashboard", enabled: true },
                  { channel: "Slack Integration", desc: "Post alerts to #fraud-ops channel", enabled: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.channel}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.enabled} />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Escalation Contacts</h2>
              <div className="space-y-3">
                {[
                  { name: "Primary Fraud Officer", email: "fraud@bank.com", phone: "+1 555-0100" },
                  { name: "Compliance Team", email: "compliance@bank.com", phone: "+1 555-0101" },
                  { name: "24/7 Escalation Hotline", email: "—", phone: "+1 555-0102" },
                ].map((contact, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.email} · {contact.phone}</p>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full gap-2"><Users className="h-4 w-4" /> Add Contact</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Team Members
              </h2>
              <div className="space-y-3">
                {[
                  { name: "L. Reyes", role: "Fraud Manager", email: "l.reyes@bank.com", access: "Admin" },
                  { name: "M. Chang", role: "Fraud Analyst", email: "m.chang@bank.com", access: "Analyst" },
                  { name: "J. Torres", role: "Fraud Investigator", email: "j.torres@bank.com", access: "Investigator" },
                  { name: "P. Morrison", role: "Compliance Officer", email: "p.morrison@bank.com", access: "Read Only" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{member.name} — {member.role}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary border-0 text-xs">{member.access}</Badge>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full gap-2"><Users className="h-4 w-4" /> Invite Team Member</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Key className="h-4 w-4 text-primary" /> API Keys
              </h2>
              <div className="space-y-4">
                {[
                  { name: "Production API Key", key: "fg_prod_•••••••••••••••••8f2a", created: "Jan 2024", lastUsed: "2 min ago" },
                  { name: "Sandbox API Key", key: "fg_test_•••••••••••••••••c419", created: "Nov 2023", lastUsed: "1 week ago" },
                ].map((apiKey, i) => (
                  <div key={i} className="bg-muted/40 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-foreground">{apiKey.name}</p>
                      <Badge className="bg-green-100 text-green-700 border-0 text-xs">Active</Badge>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground mb-2">{apiKey.key}</p>
                    <p className="text-xs text-muted-foreground">Created: {apiKey.created} · Last used: {apiKey.lastUsed}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs">Rotate</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs">Revoke</Button>
                    </div>
                  </div>
                ))}
                <Button className="gap-2"><Key className="h-4 w-4" /> Generate New API Key</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Webhook Endpoint</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Endpoint URL</label>
                  <Input defaultValue="https://your-bank.com/webhooks/freezeguard" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Events to Send</label>
                  <Select defaultValue="all">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="critical">Critical Only</SelectItem>
                      <SelectItem value="blocks">Auto-Blocks Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="gap-2"><Save className="h-4 w-4" /> Save Webhook</Button>
                  <Button variant="outline" className="gap-2"><RefreshCw className="h-4 w-4" /> Test</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3">
          <Button className="gap-2"><Save className="h-4 w-4" /> Save All Settings</Button>
          <Button variant="outline">Reset to Defaults</Button>
        </div>
      </div>
    </PageLayout>
  )
}
