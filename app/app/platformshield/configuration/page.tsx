'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, Eye, Lock, AlertCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

export default function PlatformConfigurationPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Platform Configuration</h1>
              <p className="text-muted-foreground">Customize fraud detection and moderation settings</p>
            </div>

            {/* Detection Rules */}
            <Card className="p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Detection Rules</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">Real-Time Listing Scan</p>
                    <p className="text-sm text-muted-foreground">Scan new listings for fraud indicators</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">User Verification</p>
                    <p className="text-sm text-muted-foreground">Require identity verification for high-risk users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">Transaction Limits</p>
                    <p className="text-sm text-muted-foreground">Enforce daily/monthly transaction limits</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">Payment Method Verification</p>
                    <p className="text-sm text-muted-foreground">Verify payment methods before processing</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Pattern-Based Detection</p>
                    <p className="text-sm text-muted-foreground">Detect suspicious behavior patterns</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            {/* Threshold Settings */}
            <Card className="p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <AlertCircle className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Risk Thresholds</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Auto-Block Score Threshold</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="0" max="100" defaultValue="85" className="flex-grow" />
                    <span className="text-lg font-semibold text-foreground">85/100</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Transactions scoring above this are automatically blocked</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Manual Review Threshold</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="0" max="100" defaultValue="60" className="flex-grow" />
                    <span className="text-lg font-semibold text-foreground">60/100</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Transactions in this range go to moderation queue</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">New User Transaction Limit</label>
                  <Input type="number" placeholder="$500" defaultValue="500" />
                  <p className="text-xs text-muted-foreground mt-2">Maximum transaction amount for new users</p>
                </div>
              </div>
            </Card>

            {/* Privacy & Security */}
            <Card className="p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Privacy & Security</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">Data Encryption</p>
                    <p className="text-sm text-muted-foreground">End-to-end encryption for sensitive data</p>
                  </div>
                  <Badge className="bg-green-500">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">Data Retention</p>
                    <p className="text-sm text-muted-foreground">Automatically delete sensitive data after 90 days</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Audit Logging</p>
                    <p className="text-sm text-muted-foreground">Log all moderation actions for compliance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Eye className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Alert Configuration</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground">Critical fraud detection</p>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground">New scam network identified</p>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">System anomalies detected</p>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            {/* Save Changes */}
            <div className="flex gap-3 justify-end">
              <Button variant="outline" className="bg-transparent">
                Reset to Default
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Save Configuration
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
