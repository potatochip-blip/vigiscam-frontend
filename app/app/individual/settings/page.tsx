'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Lock, Trash2, Download } from "lucide-react"

export default function IndividualSettingsPage() {
  return (
    <PageLayout role="individual" title="Settings" subtitle="Manage your account and protection preferences">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Profile</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Full Name</Label>
              <Input defaultValue="John Smith" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Email Address</Label>
              <Input defaultValue="john@example.com" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Phone Number</Label>
              <Input defaultValue="+61 4 0000 1111" />
            </div>
          </div>
          <Button size="sm">Save Profile</Button>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: "High Risk Call Alerts", desc: "Notify me immediately when a high-risk call is detected", default: true },
              { label: "Scam Pattern Alerts", desc: "Notify me when scam patterns are found in emails or SMS", default: true },
              { label: "Remote Access Alerts", desc: "Notify me when remote access software is detected", default: true },
              { label: "Weekly Summary Email", desc: "Receive a weekly digest of your protection activity", default: false },
              { label: "Trusted Contact Notifications", desc: "Alert trusted contacts when I face a critical threat", default: true },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.default} />
                </div>
                {i < 4 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Privacy Controls */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Privacy Controls</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: "Call Monitoring", desc: "Allow VIGISCAM™ to analyze incoming calls in real-time", default: true },
              { label: "Screen Guard", desc: "Monitor screen activity for remote access threats", default: true },
              { label: "AI Model Training", desc: "Allow my anonymized data to improve detection models", default: false },
              { label: "Location-Based Threat Intel", desc: "Use my region to show relevant scam campaigns", default: true },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.default} />
                </div>
                {i < 3 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Security</h2>
          </div>
          <div className="space-y-3">
            <Button variant="outline" size="sm" className="w-full justify-start">Change Password</Button>
            <Button variant="outline" size="sm" className="w-full justify-start">Enable Two-Factor Authentication</Button>
            <Button variant="outline" size="sm" className="w-full justify-start">Manage Active Sessions</Button>
            <Button variant="outline" size="sm" className="w-full justify-start flex items-center gap-2">
              <Download className="h-4 w-4" /> Download My Data
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-destructive/30">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="h-5 w-5 text-destructive" />
            <h2 className="text-lg font-bold text-destructive">Danger Zone</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Deleting your account will permanently remove all your data, evidence, and protection settings. This cannot be undone.</p>
          <Button variant="destructive" size="sm">Delete Account</Button>
        </Card>
      </div>
    </PageLayout>
  )
}
