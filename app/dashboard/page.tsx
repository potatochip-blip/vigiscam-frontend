"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Bell,
  Settings,
  Users,
  Activity,
  Eye,
  Mic,
  Monitor,
  Camera,
  Lock,
  LogOut,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Download,
  Play,
  Pause,
  RefreshCw,
  Home,
  BarChart3,
  History,
  UserCog,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const [protectionEnabled, setProtectionEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const protectionModules = [
    { name: "Remote Access Shield", icon: Monitor, enabled: true, status: "active" },
    { name: "Deepfake Detection", icon: Eye, enabled: true, status: "active" },
    { name: "Voice Authentication", icon: Mic, enabled: true, status: "active" },
    { name: "Camera Verification", icon: Camera, enabled: false, status: "disabled" },
    { name: "Behavior Analysis", icon: Activity, enabled: true, status: "active" },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "warning",
      title: "Suspicious Remote Access Attempt",
      description: "Blocked unauthorized TeamViewer connection",
      time: "2 hours ago",
      resolved: true,
    },
    {
      id: 2,
      type: "info",
      title: "Voice Pattern Verified",
      description: "Incoming call matched trusted contact: Sarah",
      time: "5 hours ago",
      resolved: true,
    },
    {
      id: 3,
      type: "critical",
      title: "Scam Phrase Detected",
      description: "Call terminated - detected gift card payment request",
      time: "1 day ago",
      resolved: true,
    },
    {
      id: 4,
      type: "warning",
      title: "Pressure Tactics Identified",
      description: "Caller used urgency language patterns",
      time: "2 days ago",
      resolved: true,
    },
  ]

  const trustedContacts = [
    { name: "Sarah Johnson", relation: "Daughter", phone: "+1 (555) 123-4567", verified: true },
    { name: "Michael Johnson", relation: "Son", phone: "+1 (555) 234-5678", verified: true },
    { name: "Dr. Smith", relation: "Doctor", phone: "+1 (555) 345-6789", verified: true },
  ]

  const sessionLogs = [
    { id: 1, date: "Dec 8, 2025", duration: "12 min", type: "Phone Call", risk: "low", flagged: false },
    { id: 2, date: "Dec 7, 2025", duration: "3 min", type: "Phone Call", risk: "high", flagged: true },
    { id: 3, date: "Dec 7, 2025", duration: "45 min", type: "Video Call", risk: "low", flagged: false },
    { id: 4, date: "Dec 6, 2025", duration: "8 min", type: "Remote Session", risk: "critical", flagged: true },
    { id: 5, date: "Dec 5, 2025", duration: "22 min", type: "Phone Call", risk: "low", flagged: false },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">FreezeGuard</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
              <div
                className={`h-2 w-2 rounded-full ${protectionEnabled ? "bg-green-500 animate-pulse" : "bg-muted-foreground"}`}
              />
              <span className="text-sm font-medium">
                {protectionEnabled ? "Protection Active" : "Protection Paused"}
              </span>
              <Switch checked={protectionEnabled} onCheckedChange={setProtectionEnabled} className="ml-2" />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/elderly-woman-portrait.png" alt="User" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Margaret Johnson</p>
                    <p className="text-xs text-muted-foreground">margaret@email.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <UserCog className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
          <nav className="flex flex-col gap-2 p-4">
            <Button
              variant={activeTab === "overview" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <Home className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "protection" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("protection")}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Protection
            </Button>
            <Button
              variant={activeTab === "alerts" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("alerts")}
            >
              <Bell className="mr-2 h-4 w-4" />
              Alerts
              <Badge variant="destructive" className="ml-auto">
                3
              </Badge>
            </Button>
            <Button
              variant={activeTab === "contacts" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("contacts")}
            >
              <Users className="mr-2 h-4 w-4" />
              Trusted Contacts
            </Button>
            <Button
              variant={activeTab === "sessions" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("sessions")}
            >
              <History className="mr-2 h-4 w-4" />
              Session Logs
            </Button>
            <Button
              variant={activeTab === "analytics" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>

            <div className="mt-auto pt-4 border-t">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {/* Mobile Tabs */}
          <div className="mb-6 md:hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="protection">Protection</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Protection Status Card */}
              <Card
                className={
                  protectionEnabled ? "border-green-500/50 bg-green-500/5" : "border-amber-500/50 bg-amber-500/5"
                }
              >
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full ${protectionEnabled ? "bg-green-500/20" : "bg-amber-500/20"}`}
                      >
                        {protectionEnabled ? (
                          <ShieldCheck className="h-8 w-8 text-green-600" />
                        ) : (
                          <ShieldAlert className="h-8 w-8 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">
                          {protectionEnabled ? "You're Protected" : "Protection Paused"}
                        </h2>
                        <p className="text-muted-foreground">
                          {protectionEnabled
                            ? "All security modules are active and monitoring"
                            : "Your protection is temporarily disabled"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Protection Score</p>
                        <p className="text-3xl font-bold text-green-600">94%</p>
                      </div>
                      <Button variant={protectionEnabled ? "outline" : "default"}>
                        {protectionEnabled ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Resume
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">47</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+12%</span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Calls Analyzed</CardTitle>
                    <Activity className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">234</div>
                    <p className="text-xs text-muted-foreground">98% verified safe</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
                    <Lock className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4/5</div>
                    <p className="text-xs text-muted-foreground">1 module disabled</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Days Protected</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">127</div>
                    <p className="text-xs text-muted-foreground">Since Aug 4, 2025</p>
                  </CardContent>
                </Card>
              </div>

              {/* Two Column Layout */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Alerts */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Alerts</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("alerts")}>
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAlerts.slice(0, 3).map((alert) => (
                        <div key={alert.id} className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 rounded-full p-1 ${
                              alert.type === "critical"
                                ? "bg-destructive/20 text-destructive"
                                : alert.type === "warning"
                                  ? "bg-amber-500/20 text-amber-600"
                                  : "bg-primary/20 text-primary"
                            }`}
                          >
                            {alert.type === "critical" ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : alert.type === "warning" ? (
                              <ShieldAlert className="h-4 w-4" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{alert.title}</p>
                            <p className="text-xs text-muted-foreground">{alert.description}</p>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                          </div>
                          {alert.resolved && (
                            <Badge variant="secondary" className="text-xs">
                              Resolved
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Protection Modules */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Protection Modules</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("protection")}>
                        Manage
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {protectionModules.map((module) => (
                        <div key={module.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`rounded-lg p-2 ${module.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                            >
                              <module.icon className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">{module.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={module.enabled ? "default" : "secondary"}>
                              {module.enabled ? "Active" : "Disabled"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Trusted Contacts Preview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Trusted Contacts</CardTitle>
                      <CardDescription>People who can verify your identity and receive alerts</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("contacts")}>
                      Manage
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {trustedContacts.map((contact) => (
                      <div key={contact.name} className="flex items-center gap-3 rounded-lg border p-3">
                        <Avatar>
                          <AvatarImage
                            src={`/.jpg?height=40&width=40&query=${contact.name} portrait`}
                          />
                          <AvatarFallback>
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.relation}</p>
                        </div>
                        {contact.verified && <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Protection Tab */}
          {activeTab === "protection" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Protection Settings</h1>
                <p className="text-muted-foreground">Configure your security modules and protection levels</p>
              </div>

              {/* Protection Level */}
              <Card>
                <CardHeader>
                  <CardTitle>Protection Level</CardTitle>
                  <CardDescription>Choose your overall protection sensitivity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { level: "Standard", desc: "Balanced protection for everyday use", recommended: false },
                      { level: "Enhanced", desc: "Increased monitoring and verification", recommended: true },
                      { level: "Maximum", desc: "Strictest protection with manual approvals", recommended: false },
                    ].map((option) => (
                      <button
                        key={option.level}
                        className={`relative rounded-lg border p-4 text-left transition-colors hover:border-primary ${
                          option.recommended ? "border-primary bg-primary/5" : ""
                        }`}
                      >
                        {option.recommended && <Badge className="absolute -top-2 right-2">Recommended</Badge>}
                        <h3 className="font-semibold">{option.level}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Individual Modules */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Modules</CardTitle>
                  <CardDescription>Enable or disable individual protection features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {protectionModules.map((module) => (
                      <div
                        key={module.name}
                        className="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`rounded-lg p-2.5 ${module.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                          >
                            <module.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{module.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {module.name === "Remote Access Shield" &&
                                "Detects and blocks unauthorized screen sharing and remote control software"}
                              {module.name === "Deepfake Detection" &&
                                "Analyzes video calls for AI-generated or manipulated faces"}
                              {module.name === "Voice Authentication" &&
                                "Verifies callers against your trusted contacts' voice patterns"}
                              {module.name === "Camera Verification" &&
                                "Uses camera to verify you're not under duress during calls"}
                              {module.name === "Behavior Analysis" &&
                                "Detects pressure tactics, urgency, and scam language patterns"}
                            </p>
                          </div>
                        </div>
                        <Switch defaultChecked={module.enabled} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Actions */}
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Emergency Actions</CardTitle>
                  <CardDescription>Immediate actions for suspected scam situations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Button variant="destructive" size="lg" className="h-auto py-4">
                      <div className="flex flex-col items-center gap-2">
                        <Lock className="h-6 w-6" />
                        <span className="font-semibold">Activate FreezeLock</span>
                        <span className="text-xs opacity-80">Immediately freeze all remote access</span>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-auto py-4 border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Bell className="h-6 w-6" />
                        <span className="font-semibold">Alert Trusted Contacts</span>
                        <span className="text-xs opacity-80">Send emergency notification</span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === "alerts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Security Alerts</h1>
                  <p className="text-muted-foreground">Review and manage security notifications</p>
                </div>
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>

              {/* Alert Filters */}
              <div className="flex gap-2 flex-wrap">
                <Button variant="secondary" size="sm">
                  All Alerts
                </Button>
                <Button variant="ghost" size="sm">
                  Critical
                </Button>
                <Button variant="ghost" size="sm">
                  Warnings
                </Button>
                <Button variant="ghost" size="sm">
                  Resolved
                </Button>
              </div>

              {/* Alerts List */}
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-0.5 rounded-full p-2 ${
                            alert.type === "critical"
                              ? "bg-destructive/20 text-destructive"
                              : alert.type === "warning"
                                ? "bg-amber-500/20 text-amber-600"
                                : "bg-primary/20 text-primary"
                          }`}
                        >
                          {alert.type === "critical" ? (
                            <AlertTriangle className="h-5 w-5" />
                          ) : alert.type === "warning" ? (
                            <ShieldAlert className="h-5 w-5" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{alert.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                            </div>
                            <Badge variant={alert.resolved ? "secondary" : "destructive"}>
                              {alert.resolved ? "Resolved" : "Active"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {alert.time}
                            </span>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                            {!alert.resolved && (
                              <Button variant="ghost" size="sm">
                                Mark Resolved
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === "contacts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Trusted Contacts</h1>
                  <p className="text-muted-foreground">Manage people who can verify your identity and receive alerts</p>
                </div>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Add Contact
                </Button>
              </div>

              {/* Contacts Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {trustedContacts.map((contact) => (
                  <Card key={contact.name}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`/.jpg?height=48&width=48&query=${contact.name} portrait`}
                          />
                          <AvatarFallback>
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{contact.name}</h3>
                            {contact.verified && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{contact.relation}</p>
                          <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Contact Card */}
                <Card className="border-dashed">
                  <CardContent className="p-4 flex flex-col items-center justify-center min-h-[180px] text-center">
                    <div className="rounded-full bg-muted p-3 mb-3">
                      <Users className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium">Add Trusted Contact</h3>
                    <p className="text-sm text-muted-foreground mt-1">Add family members or caregivers</p>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      Add Contact
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Voice Enrollment */}
              <Card>
                <CardHeader>
                  <CardTitle>Voice Enrollment</CardTitle>
                  <CardDescription>
                    Record voice samples for trusted contacts to enable voice verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trustedContacts.map((contact) => (
                      <div key={contact.name} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {contact.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {contact.verified ? "Voice enrolled" : "Not enrolled"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {contact.verified ? (
                            <>
                              <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                                Enrolled
                              </Badge>
                              <Button variant="ghost" size="sm">
                                Re-enroll
                              </Button>
                            </>
                          ) : (
                            <Button size="sm">
                              <Mic className="mr-2 h-4 w-4" />
                              Enroll Voice
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === "sessions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Session Logs</h1>
                  <p className="text-muted-foreground">Review recorded sessions and flagged interactions</p>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Logs
                </Button>
              </div>

              {/* Session Filters */}
              <div className="flex gap-2 flex-wrap">
                <Button variant="secondary" size="sm">
                  All Sessions
                </Button>
                <Button variant="ghost" size="sm">
                  Flagged Only
                </Button>
                <Button variant="ghost" size="sm">
                  Phone Calls
                </Button>
                <Button variant="ghost" size="sm">
                  Video Calls
                </Button>
                <Button variant="ghost" size="sm">
                  Remote Sessions
                </Button>
              </div>

              {/* Sessions Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-4 text-left text-sm font-medium">Date</th>
                          <th className="p-4 text-left text-sm font-medium">Type</th>
                          <th className="p-4 text-left text-sm font-medium">Duration</th>
                          <th className="p-4 text-left text-sm font-medium">Risk Level</th>
                          <th className="p-4 text-left text-sm font-medium">Status</th>
                          <th className="p-4 text-left text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessionLogs.map((session) => (
                          <tr key={session.id} className="border-b last:border-0">
                            <td className="p-4 text-sm">{session.date}</td>
                            <td className="p-4 text-sm">{session.type}</td>
                            <td className="p-4 text-sm">{session.duration}</td>
                            <td className="p-4">
                              <Badge
                                variant={
                                  session.risk === "critical"
                                    ? "destructive"
                                    : session.risk === "high"
                                      ? "destructive"
                                      : session.risk === "medium"
                                        ? "secondary"
                                        : "outline"
                                }
                              >
                                {session.risk.charAt(0).toUpperCase() + session.risk.slice(1)}
                              </Badge>
                            </td>
                            <td className="p-4">
                              {session.flagged ? (
                                <Badge variant="destructive">Flagged</Badge>
                              ) : (
                                <Badge variant="secondary">Clean</Badge>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Analytics</h1>
                <p className="text-muted-foreground">View your protection statistics and trends</p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Threats Blocked</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">47</div>
                    <Progress value={75} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">75% reduction vs. unprotected</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Scam Calls Detected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">23</div>
                    <Progress value={92} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">92% detection accuracy</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Remote Access Blocked</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12</div>
                    <Progress value={100} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">100% blocked successfully</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Deepfakes Detected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">3</div>
                    <Progress value={100} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">All verified as fake</p>
                  </CardContent>
                </Card>
              </div>

              {/* Protection Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Protection Activity</CardTitle>
                  <CardDescription>Your security events over the past 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Activity chart visualization</p>
                      <p className="text-sm">Showing threat detection trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Threat Breakdown */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Threat Types</CardTitle>
                    <CardDescription>Breakdown of detected threats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: "Phone Scams", count: 23, percent: 49, color: "bg-primary" },
                        { type: "Remote Access", count: 12, percent: 26, color: "bg-destructive" },
                        { type: "Phishing Attempts", count: 7, percent: 15, color: "bg-amber-500" },
                        { type: "Deepfake Calls", count: 3, percent: 6, color: "bg-purple-500" },
                        { type: "Other", count: 2, percent: 4, color: "bg-muted" },
                      ].map((item) => (
                        <div key={item.type} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>{item.type}</span>
                            <span className="font-medium">
                              {item.count} ({item.percent}%)
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Times</CardTitle>
                    <CardDescription>How quickly threats were neutralized</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { metric: "Average Detection Time", value: "1.2s", desc: "Time to identify threat" },
                        { metric: "Average Block Time", value: "0.3s", desc: "Time to neutralize after detection" },
                        { metric: "Alert Notification", value: "2.1s", desc: "Time to notify trusted contacts" },
                        { metric: "FreezeLock Activation", value: "0.5s", desc: "Emergency lockdown speed" },
                      ].map((item) => (
                        <div key={item.metric} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">{item.metric}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <span className="text-2xl font-bold text-primary">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
