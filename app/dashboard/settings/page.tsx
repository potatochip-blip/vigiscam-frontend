"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  ArrowLeft,
  Bell,
  Lock,
  User,
  CreditCard,
  Globe,
  Smartphone,
  Mail,
  Volume2,
  Eye,
  Trash2,
  Download,
  Loader2,
  AlertTriangle,
  ExternalLink,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSubscription, useBillingActions } from "@/lib/hooks"

const PLAN_LABELS: Record<string, string> = {
  FREE: "Free",
  BASIC: "Basic",
  FAMILY_GUARDIAN: "Family Guardian",
  PREMIUM_SHIELD: "Premium Shield",
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    trustedAlerts: true,
    weeklyReport: false,
  })
  const { data: subscription, isLoading: subLoading } = useSubscription()
  const { manageBilling, busy: billingBusy, error: billingError } = useBillingActions()

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Settings</span>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl py-8 px-4">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/elderly-woman-portrait.png" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Margaret" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Johnson" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="margaret@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 987-6543" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" defaultValue="123 Oak Street, San Francisco, CA 94102" />
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/30">
                  <div>
                    <p className="font-medium">Export All Data</p>
                    <p className="text-sm text-muted-foreground">Download all your data and session logs</p>
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/30">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive text message alerts</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Trusted Contact Alerts</p>
                        <p className="text-sm text-muted-foreground">Notify family members of threats</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.trustedAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, trustedAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Weekly Summary Report</p>
                        <p className="text-sm text-muted-foreground">Receive weekly protection summary</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.weeklyReport}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Sensitivity</CardTitle>
                <CardDescription>Configure when you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Alert Threshold</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Only critical threats</SelectItem>
                      <SelectItem value="medium">Medium - Warnings and critical</SelectItem>
                      <SelectItem value="high">High - All potential threats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quiet Hours</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">From</Label>
                      <Input type="time" defaultValue="22:00" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">To</Label>
                      <Input type="time" defaultValue="07:00" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Critical alerts will still come through during quiet hours
                  </p>
                </div>

                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password & Authentication</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">SMS Authentication</p>
                      <p className="text-sm text-muted-foreground">Receive codes via text message</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">Use an app like Google Authenticator</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login Activity</CardTitle>
                <CardDescription>Recent logins to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { device: "iPhone 14 Pro", location: "San Francisco, CA", time: "Now", current: true },
                    { device: "MacBook Pro", location: "San Francisco, CA", time: "2 hours ago", current: false },
                    { device: "iPad Air", location: "San Francisco, CA", time: "Yesterday", current: false },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{session.device}</p>
                          <p className="text-sm text-muted-foreground">
                            {session.location} · {session.time}
                          </p>
                        </div>
                      </div>
                      {session.current ? (
                        <span className="text-xs text-green-600 font-medium">Current</span>
                      ) : (
                        <Button variant="ghost" size="sm">
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            {billingError && (
              <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                {billingError}
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subLoading ? (
                  <div className="flex items-center gap-2 p-4 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading your plan…
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div>
                        <p className="font-semibold text-lg">
                          {PLAN_LABELS[subscription?.plan ?? "FREE"] ?? "Free"} Plan
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Status: <span className="capitalize">{(subscription?.status ?? "inactive").toLowerCase()}</span>
                          {subscription?.currentPeriodEnd && (
                            <> · {subscription.cancelAtPeriodEnd ? "Ends" : "Renews"} {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</>
                          )}
                        </p>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href="/pricing">
                          {subscription && subscription.plan !== "FREE" ? "Change Plan" : "Upgrade"}
                        </Link>
                      </Button>
                    </div>

                    {subscription?.cancelAtPeriodEnd && (
                      <p className="text-sm text-amber-600">
                        Your subscription is set to cancel at the end of the current period.
                      </p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment & Invoices</CardTitle>
                <CardDescription>
                  Update your card, download invoices, or cancel — securely through Stripe.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subscription && subscription.plan !== "FREE" ? (
                  <Button
                    variant="outline"
                    disabled={billingBusy === "portal"}
                    onClick={() => manageBilling()}
                    className="gap-2"
                  >
                    {billingBusy === "portal" ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Opening…</>
                    ) : (
                      <><CreditCard className="h-4 w-4" /> Manage Billing <ExternalLink className="h-3.5 w-3.5" /></>
                    )}
                  </Button>
                ) : (
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CreditCard className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    You&apos;re on the Free plan. Choose a paid plan to add a payment method and unlock premium protection.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>Customize how the app looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Text Size</Label>
                  <Select defaultValue="large">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="extra-large">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>Make the app easier to use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Voice Announcements</p>
                      <p className="text-sm text-muted-foreground">Speak alerts aloud</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">High Contrast Mode</p>
                      <p className="text-sm text-muted-foreground">Increase visual contrast</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Vibration Alerts</p>
                      <p className="text-sm text-muted-foreground">Vibrate on notifications</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>Control your data and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics</p>
                    <p className="text-sm text-muted-foreground">Help improve FreezeGuard with usage data</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session Recording</p>
                    <p className="text-sm text-muted-foreground">Record sessions for evidence and review</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button variant="outline">Manage Data Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
