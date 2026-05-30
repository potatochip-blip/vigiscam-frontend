'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell, Shield, Users, Lock } from "lucide-react"

export default function FamilySettingsPage() {
  return (
    <PageLayout role="family" title="Settings" subtitle="Manage your Family Guardian preferences">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5"><Bell className="h-5 w-5 text-primary" /><h2 className="text-lg font-bold text-foreground">Alert Preferences</h2></div>
          <div className="space-y-4">
            {[
              { label: "Critical Threat Alerts", desc: "Immediate notification for high-risk events on any family member", on: true },
              { label: "Medium Risk Alerts", desc: "Notify me for medium-severity detections", on: true },
              { label: "Weekly Family Summary", desc: "Weekly digest of protection activity for all members", on: false },
              { label: "Check-in Miss Alerts", desc: "Alert me if a scheduled check-in is missed", on: true },
              { label: "New Device Detected", desc: "Alert when a new device is linked to a family member's account", on: true },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-sm font-medium text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                  <Switch defaultChecked={item.on} />
                </div>
                {i < 4 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-5"><Shield className="h-5 w-5 text-primary" /><h2 className="text-lg font-bold text-foreground">Intervention Settings</h2></div>
          <div className="space-y-4">
            {[
              { label: "Auto-Alert on Critical Risk", desc: "Automatically notify me and the protected person on risk score > 80", on: true },
              { label: "Guardian Pause Enabled", desc: "Allow family to request transaction pause through participating banks", on: false },
              { label: "Auto-Save High Risk Evidence", desc: "Automatically save evidence for events with risk score > 70", on: true },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-sm font-medium text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                  <Switch defaultChecked={item.on} />
                </div>
                {i < 2 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4"><Lock className="h-5 w-5 text-primary" /><h2 className="text-lg font-bold text-foreground">Account</h2></div>
          <div className="space-y-3">
            <Button variant="outline" size="sm" className="w-full justify-start">Change Password</Button>
            <Button variant="outline" size="sm" className="w-full justify-start">Manage Two-Factor Authentication</Button>
            <Button variant="outline" size="sm" className="w-full justify-start">Download My Data</Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
