'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingUp, Users, DollarSign, Activity, BarChart3 } from "lucide-react"

export default function BankGuardDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">BankGuard Enterprise Dashboard</h1>
              <p className="text-muted-foreground">Real-time wire transfer fraud detection and prevention</p>
            </div>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {[
                { label: "Active Customers", value: "245,800", color: "bg-blue-500/10 text-blue-600" },
                { label: "Fraud Attempts Blocked", value: "1,847", color: "bg-red-500/10 text-red-600" },
                { label: "Total Protected", value: "$428M", color: "bg-green-500/10 text-green-600" },
                { label: "Block Rate", value: "99.8%", color: "bg-purple-500/10 text-purple-600" },
                { label: "Avg Response Time", value: "120ms", color: "bg-orange-500/10 text-orange-600" },
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
                {/* Real-time Threats */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Active Threats (Last 24h)
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        threat: "Wire Transfer to Unknown Account",
                        customers: "843",
                        avg: "$15,400",
                        action: "Auto-blocked",
                      },
                      {
                        threat: "Velocity Attack Pattern",
                        customers: "627",
                        avg: "$8,200",
                        action: "Flagged for review",
                      },
                      {
                        threat: "Compromised Business Account",
                        customers: "312",
                        avg: "$45,600",
                        action: "Escalated",
                      },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{item.threat}</h4>
                            <p className="text-sm text-muted-foreground">{item.customers} customers affected</p>
                          </div>
                          <Badge className="bg-primary">{item.action}</Badge>
                        </div>
                        <p className="text-sm text-foreground"><span className="text-muted-foreground">Avg Loss Prevented:</span> {item.avg}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Fraud Trends */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Fraud Trends (30 Days)
                  </h2>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2 opacity-50" />
                      <p className="text-muted-foreground text-sm">Chart visualization placeholder</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Top Threats */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Top Threat Types</h2>
                  <div className="space-y-3">
                    {[
                      { name: "CEO Fraud", pct: 34 },
                      { name: "Account Takeover", pct: 28 },
                      { name: "Vendor Impersonation", pct: 22 },
                      { name: "Deepfake Impersonation", pct: 16 },
                    ].map((threat, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-muted-foreground">{threat.name}</span>
                          <span className="font-semibold text-foreground">{threat.pct}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${threat.pct}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Quick Stats</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">System Uptime</span>
                      <span className="font-semibold text-green-600">99.99%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Block Time</span>
                      <span className="font-semibold text-foreground">180ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">False Positives</span>
                      <span className="font-semibold text-green-600">0.2%</span>
                    </div>
                  </div>
                </Card>

                {/* Actions */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Actions</h2>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-2">
                    View Detailed Reports
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    API Status & Logs
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
