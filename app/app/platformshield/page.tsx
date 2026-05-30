'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Users, TrendingUp, Shield, Activity, BarChart3 } from "lucide-react"

export default function PlatformShieldDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">PlatformShield Enterprise Dashboard</h1>
              <p className="text-muted-foreground">Fraud protection for online marketplaces and platforms</p>
            </div>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {[
                { label: "Platform Users", value: "12.4M", color: "bg-blue-500/10 text-blue-600" },
                { label: "Scams Blocked", value: "89,240", color: "bg-red-500/10 text-red-600" },
                { label: "Protected Transactions", value: "$2.3B", color: "bg-green-500/10 text-green-600" },
                { label: "Detection Accuracy", value: "99.4%", color: "bg-purple-500/10 text-purple-600" },
                { label: "Avg Block Time", value: "85ms", color: "bg-orange-500/10 text-orange-600" },
              ].map((kpi, i) => (
                <Card key={i} className="p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{kpi.label}</p>
                  <h3 className={`text-2xl font-bold mb-1 ${kpi.color.split(' ')[1]}`}>{kpi.value}</h3>
                </Card>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Active Threats */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Active Threat Types (Last 24h)
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        type: "Romance Scams on Dating Features",
                        incidents: "1,247",
                        impact: "$3.2M",
                        status: "Auto-blocked",
                      },
                      {
                        type: "Listing Fraud (Fake Products)",
                        incidents: "8,650",
                        impact: "$12.4M",
                        status: "Suspended",
                      },
                      {
                        type: "Investment Scams",
                        incidents: "432",
                        impact: "$8.9M",
                        status: "Flagged",
                      },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{item.type}</h4>
                            <p className="text-sm text-muted-foreground">{item.incidents} incidents</p>
                          </div>
                          <Badge className="bg-primary">{item.status}</Badge>
                        </div>
                        <p className="text-sm text-foreground"><span className="text-muted-foreground">Prevented Loss:</span> {item.impact}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Platform Health */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Platform Health Metrics
                  </h2>
                  <div className="space-y-4">
                    {[
                      { metric: "Trust Score", value: 94, target: 95 },
                      { metric: "Transaction Safety", value: 98, target: 99 },
                      { metric: "Seller Legitimacy", value: 96, target: 97 },
                      { metric: "User Confidence", value: 92, target: 95 },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-muted-foreground">{item.metric}</span>
                          <span className="font-semibold text-foreground">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${item.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Key Metrics */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Key Metrics</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uptime</span>
                      <span className="font-semibold text-green-600">99.98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">False Positives</span>
                      <span className="font-semibold text-green-600">0.6%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Users Protected</span>
                      <span className="font-semibold text-foreground">12.4M</span>
                    </div>
                  </div>
                </Card>

                {/* Scam Categories */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Top Scam Categories</h2>
                  <div className="space-y-2">
                    {[
                      { name: "Listing Fraud", count: 8650 },
                      { name: "Romance/Dating", count: 1247 },
                      { name: "Investment", count: 432 },
                      { name: "Payment Fraud", count: 1890 },
                    ].map((cat, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{cat.name}</span>
                        <span className="font-semibold text-foreground">{cat.count}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Actions */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Management</h2>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-2">
                    Moderation Queue
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Configuration
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
