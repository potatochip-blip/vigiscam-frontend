'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Activity, Eye } from "lucide-react"

export default function TransactionMonitoringPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Real-Time Transaction Monitoring</h1>
              <p className="text-muted-foreground">Monitor transactions as they happen with advanced AI detection</p>
            </div>

            {/* KPIs */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Transactions Scanned", value: "2.4M", subtext: "Last 24h" },
                { label: "Anomalies Detected", value: "847", subtext: "This week" },
                { label: "Block Rate", value: "99.8%", subtext: "Avg accuracy" },
                { label: "Avg Latency", value: "45ms", subtext: "Detection time" },
              ].map((kpi, i) => (
                <Card key={i} className="p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{kpi.label}</p>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{kpi.value}</h3>
                  <p className="text-xs text-muted-foreground">{kpi.subtext}</p>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Live Activity Stream */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Live Activity Stream
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        type: "Large Wire Transfer",
                        amount: "$450,000",
                        customer: "Global Corp",
                        risk: "HIGH",
                        action: "Flagged for review",
                      },
                      {
                        type: "International Payment",
                        amount: "$28,500",
                        customer: "Import LLC",
                        risk: "MEDIUM",
                        action: "Auto-approved",
                      },
                      {
                        type: "Batch Processing",
                        amount: "$1.2M",
                        customer: "Payroll Services",
                        risk: "LOW",
                        action: "Auto-approved",
                      },
                      {
                        type: "Unusual Timing",
                        amount: "$95,000",
                        customer: "Tech Startup",
                        risk: "MEDIUM",
                        action: "Pending review",
                      },
                    ].map((activity, i) => (
                      <div key={i} className="p-4 bg-muted rounded-lg flex items-start justify-between">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-foreground">{activity.type}</h4>
                            <Badge className={
                              activity.risk === "HIGH" ? "bg-red-500" :
                              activity.risk === "MEDIUM" ? "bg-yellow-500" :
                              "bg-green-500"
                            }>
                              {activity.risk}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">Customer: {activity.customer}</p>
                          <p className="text-sm font-semibold text-foreground">{activity.amount}</p>
                        </div>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          {activity.action === "Auto-approved" ? "View" : "Review"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Monitoring Rules */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Active Monitoring Rules</h2>
                  <div className="space-y-3">
                    {[
                      { rule: "Transaction Amount Threshold", status: "Active", triggered: 23 },
                      { rule: "Geographic Velocity Check", status: "Active", triggered: 8 },
                      { rule: "New Beneficiary Detection", status: "Active", triggered: 45 },
                      { rule: "Time-of-Day Anomaly", status: "Active", triggered: 12 },
                    ].map((rule, i) => (
                      <div key={i} className="p-4 bg-muted rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{rule.rule}</p>
                          <p className="text-sm text-muted-foreground">{rule.triggered} alerts this week</p>
                        </div>
                        <Badge className="bg-green-500">{rule.status}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Performance Metrics */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-muted-foreground">Accuracy</span>
                        <span className="font-semibold text-foreground">99.8%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "99.8%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-muted-foreground">False Positives</span>
                        <span className="font-semibold text-foreground">0.2%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: "0.2%" }}></div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* System Status */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    System Status
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge className="bg-green-500">Operational</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uptime</span>
                      <span className="text-foreground font-semibold">99.99%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Nodes</span>
                      <span className="text-foreground font-semibold">128</span>
                    </div>
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
                  <div className="space-y-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Configure Rules
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Reports
                    </Button>
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
