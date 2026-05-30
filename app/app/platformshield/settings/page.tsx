'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Shield, Bell, Key, Globe, Users, Database, Webhook } from "lucide-react"

export default function SettingsPage() {
  return (
    <PageLayout role="platformshield" title="Settings" subtitle="Configure your PlatformShield integration">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Detection Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">Detection Settings</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Real-time Grooming Detection</p>
                  <p className="text-xs text-muted-foreground">Monitor conversations for grooming patterns</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Scam Ring Analysis</p>
                  <p className="text-xs text-muted-foreground">Detect coordinated fraud operations</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Script Family Tracking</p>
                  <p className="text-xs text-muted-foreground">Track scam script evolution</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Auto-ban High Risk Accounts</p>
                  <p className="text-xs text-muted-foreground">Automatically ban accounts with 95%+ risk score</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* API Configuration */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Key className="h-5 w-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">API Configuration</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <Input id="apiKey" value="ps_live_*******************" readOnly className="font-mono" />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook">Webhook URL</Label>
                <Input id="webhook" placeholder="https://your-platform.com/webhooks/freezeguard" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rateLimit">Rate Limit (requests/min)</Label>
                <Input id="rateLimit" type="number" defaultValue="1000" />
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Critical Alerts</p>
                  <p className="text-xs text-muted-foreground">High-risk detections and system issues</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Daily Digest</p>
                  <p className="text-xs text-muted-foreground">Summary of daily activity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Weekly Reports</p>
                  <p className="text-xs text-muted-foreground">Detailed weekly analytics</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-base font-bold text-foreground mb-4">Platform Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium text-foreground">Enterprise</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">API Calls (MTD)</span>
                <span className="font-medium text-foreground">2.4M / 10M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accounts Monitored</span>
                <span className="font-medium text-foreground">1.2M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Retention</span>
                <span className="font-medium text-foreground">90 days</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-bold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Database className="h-4 w-4" /> API Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Webhook className="h-4 w-4" /> Webhook Logs
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Users className="h-4 w-4" /> Team Management
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Globe className="h-4 w-4" /> Integration Status
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
