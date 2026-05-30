"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, CheckCircle2, Calendar, Phone, Mail, MapPin, Edit, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
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
            <span className="font-semibold">Profile</span>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl py-8 px-4">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/elderly-woman-portrait.png" />
                <AvatarFallback className="text-2xl">MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <h1 className="text-2xl font-bold">Margaret Johnson</h1>
                  <Badge variant="secondary" className="w-fit mx-auto md:mx-0">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">Protected since August 4, 2025</p>
                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    margaret@email.com
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    +1 (555) 987-6543
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    San Francisco, CA
                  </div>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/dashboard/settings">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Protection Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Protection Statistics</CardTitle>
              <CardDescription>Your security at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-primary">127</p>
                  <p className="text-sm text-muted-foreground">Days Protected</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-green-600">47</p>
                  <p className="text-sm text-muted-foreground">Threats Blocked</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold">234</p>
                  <p className="text-sm text-muted-foreground">Calls Analyzed</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-primary">94%</p>
                  <p className="text-sm text-muted-foreground">Protection Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Info */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Your current plan details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Family Plan</p>
                    <p className="text-sm text-muted-foreground">Up to 5 protected users</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billing Cycle</span>
                  <span>Monthly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span>$29.99/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Billing</span>
                  <span>December 15, 2025</span>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/dashboard/settings">Manage Subscription</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Trusted Contacts */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Trusted Contacts</CardTitle>
                  <CardDescription>People who receive alerts and can verify your identity</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Manage
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { name: "Sarah Johnson", relation: "Daughter", phone: "+1 (555) 123-4567", verified: true },
                  { name: "Michael Johnson", relation: "Son", phone: "+1 (555) 234-5678", verified: true },
                  { name: "Dr. Smith", relation: "Doctor", phone: "+1 (555) 345-6789", verified: true },
                ].map((contact) => (
                  <div key={contact.name} className="flex items-center gap-3 p-3 rounded-lg border">
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
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium truncate">{contact.name}</p>
                        {contact.verified && <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{contact.relation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest security events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: Shield,
                    title: "Suspicious call blocked",
                    desc: "Detected scam language patterns",
                    time: "2 hours ago",
                    type: "warning",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Voice verified",
                    desc: "Incoming call from Sarah Johnson",
                    time: "5 hours ago",
                    type: "success",
                  },
                  {
                    icon: Calendar,
                    title: "Weekly report generated",
                    desc: "Your protection summary is ready",
                    time: "1 day ago",
                    type: "info",
                  },
                  {
                    icon: Shield,
                    title: "Remote access attempt blocked",
                    desc: "TeamViewer connection denied",
                    time: "2 days ago",
                    type: "warning",
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className={`rounded-full p-2 ${
                        activity.type === "warning"
                          ? "bg-amber-500/20 text-amber-600"
                          : activity.type === "success"
                            ? "bg-green-500/20 text-green-600"
                            : "bg-primary/20 text-primary"
                      }`}
                    >
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.desc}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
