'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Shield, Clock, Lock, TrendingUp, Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Status Banner */}
            <div className="mb-8 bg-green-500/10 border border-green-500/30 rounded-lg p-6 flex items-start gap-4">
              <Shield className="h-6 w-6 text-green-600 shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-foreground mb-1">System Active & Protected</h2>
                <p className="text-sm text-muted-foreground">All detection modules running. 0 active threats detected in the last 24 hours.</p>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Threats Blocked", value: "24", change: "+3 this week" },
                { label: "Avg Response Time", value: "180ms", change: "Sub-second detection" },
                { label: "Protection Score", value: "98/100", change: "+2 from yesterday" },
                { label: "Last Updated", value: "2 hours ago", change: "Real-time monitoring" },
              ].map((kpi, i) => (
                <Card key={i} className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{kpi.label}</p>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{kpi.value}</h3>
                  <p className="text-xs text-primary">{kpi.change}</p>
                </Card>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Recent Activity */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        type: "blocked",
                        title: "Tech Support Scam Blocked",
                        desc: "Caller claiming to be from Microsoft",
                        time: "2 hours ago",
                        risk: "Critical",
                      },
                      {
                        type: "warning",
                        title: "Suspicious Link Detected",
                        desc: "Email with phishing characteristics",
                        time: "4 hours ago",
                        risk: "High",
                      },
                      {
                        type: "info",
                        title: "System Update Complete",
                        desc: "Detection modules updated to latest version",
                        time: "Yesterday",
                        risk: "Info",
                      },
                    ].map((activity, i) => (
                      <div key={i} className="flex gap-4 pb-4 border-b border-border last:border-0">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                          activity.type === 'blocked' ? 'bg-red-500/10' : activity.type === 'warning' ? 'bg-yellow-500/10' : 'bg-blue-500/10'
                        }`}>
                          <AlertCircle className={`h-5 w-5 ${
                            activity.type === 'blocked' ? 'text-red-600' : activity.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold text-foreground">{activity.title}</h4>
                            <Badge className={`text-xs ${
                              activity.risk === 'Critical' ? 'bg-red-500' : activity.risk === 'High' ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}>{activity.risk}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{activity.desc}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Threat Trends */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Threat Trends (7 Days)
                  </h2>
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2 opacity-50" />
                      <p className="text-muted-foreground text-sm">Chart visualization placeholder</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Active Devices */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Devices Protected</h2>
                  <div className="space-y-3">
                    {[
                      { name: "MacBook Pro", status: "Active", ip: "192.168.1.100" },
                      { name: "iPhone 14", status: "Active", ip: "192.168.1.101" },
                      { name: "iPad Air", status: "Last seen 2h ago", ip: "192.168.1.102" },
                    ].map((device, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Shield className="h-5 w-5 text-primary shrink-0" />
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-foreground">{device.name}</p>
                          <p className="text-xs text-muted-foreground">{device.status}</p>
                        </div>
                        <Badge variant="outline" className="bg-transparent text-xs">{device.ip}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
                  <div className="space-y-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Lock className="h-4 w-4 mr-2" />
                      Emergency FreezeLock
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Evidence Vault
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Settings & Preferences
                    </Button>
                  </div>
                </Card>

                {/* Support */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Need Help?</h2>
                  <p className="text-sm text-muted-foreground mb-4">24/7 support team ready to assist</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Contact Support
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
