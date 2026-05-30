'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Users, Shield, Bell, MapPin, TrendingUp } from "lucide-react"

export default function FamilyDashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Status Overview */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">Family Protection Dashboard</h1>
              <p className="text-muted-foreground mb-6">Monitor and protect up to 10 family members in real-time</p>
            </div>

            {/* Family Members Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  name: "Mom",
                  status: "Protected",
                  lastActivity: "Active now",
                  threat: 0,
                  device: "iPhone 12",
                },
                {
                  name: "Dad",
                  status: "Protected",
                  lastActivity: "2 hours ago",
                  threat: 0,
                  device: "Samsung Galaxy",
                },
                {
                  name: "Grandma",
                  status: "Protected",
                  lastActivity: "30 mins ago",
                  threat: 1,
                  device: "iPad",
                },
              ].map((member, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                      <p className="text-xs text-muted-foreground">{member.device}</p>
                    </div>
                    <Badge className={member.threat === 0 ? "bg-green-500" : "bg-yellow-500"}>
                      {member.threat === 0 ? "Safe" : "Warning"}
                    </Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-semibold">Status:</span> {member.status}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-semibold">Last activity:</span> {member.lastActivity}
                    </p>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-9">
                    View Details
                  </Button>
                </Card>
              ))}

              {/* Add Family Member */}
              <Card className="p-6 border-2 border-dashed border-border hover:border-primary transition-all cursor-pointer flex items-center justify-center min-h-[220px]">
                <div className="text-center">
                  <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground mb-2">Add Family Member</p>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    + Add
                  </Button>
                </div>
              </Card>
            </div>

            {/* Alerts & Incidents */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Recent Alerts */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Recent Alerts
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        member: "Grandma",
                        threat: "Tech Support Scam Attempt",
                        time: "1 hour ago",
                        status: "Blocked",
                      },
                      {
                        member: "Mom",
                        threat: "Suspicious Email Link",
                        time: "3 hours ago",
                        status: "Flagged",
                      },
                      {
                        member: "Dad",
                        threat: "Normal activity detected",
                        time: "Yesterday",
                        status: "Clear",
                      },
                    ].map((alert, i) => (
                      <div key={i} className="flex gap-4 pb-4 border-b border-border last:border-0">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                          alert.status === 'Blocked' ? 'bg-red-500/10' : alert.status === 'Flagged' ? 'bg-yellow-500/10' : 'bg-green-500/10'
                        }`}>
                          <Shield className={`h-5 w-5 ${
                            alert.status === 'Blocked' ? 'text-red-600' : alert.status === 'Flagged' ? 'text-yellow-600' : 'text-green-600'
                          }`} />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold text-foreground">{alert.member}</h4>
                            <Badge className={`text-xs ${
                              alert.status === 'Blocked' ? 'bg-red-500' : alert.status === 'Flagged' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}>{alert.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{alert.threat}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Activity Timeline */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Family Activity Timeline</h2>
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2 opacity-50" />
                      <p className="text-muted-foreground text-sm">Activity chart placeholder</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Emergency Actions */}
                <Card className="p-6 border-l-4 border-primary">
                  <h2 className="text-lg font-bold text-foreground mb-4">Emergency Actions</h2>
                  <div className="space-y-2">
                    <Button className="w-full bg-red-600 text-white hover:bg-red-700 h-10">
                      Emergency Alert All
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent h-10">
                      Contact Support
                    </Button>
                  </div>
                </Card>

                {/* Notifications */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </h2>
                  <div className="space-y-3 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-muted-foreground">Critical threats</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-muted-foreground">Suspicious activity</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-muted-foreground">Daily summaries</span>
                    </label>
                  </div>
                </Card>

                {/* Family Stats */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Family Stats</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Members Protected</span>
                      <span className="font-semibold text-foreground">3/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Threats Blocked</span>
                      <span className="font-semibold text-foreground">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Savings</span>
                      <span className="font-semibold text-primary">$12,450</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
