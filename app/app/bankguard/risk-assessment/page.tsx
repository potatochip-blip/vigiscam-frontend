'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, Users, DollarSign } from "lucide-react"

export default function RiskAssessmentPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Risk Assessment & Analytics</h1>
              <p className="text-muted-foreground">Analyze fraud risk profiles and customer behaviors</p>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "High Risk Customers", value: "127", trend: "-8%" },
                { label: "Medium Risk Customers", value: "456", trend: "-12%" },
                { label: "Total Risk Score", value: "7.2/10", trend: "-2.1" },
                { label: "Customers Assessed", value: "28,450", trend: "+156" },
              ].map((metric, i) => (
                <Card key={i} className="p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{metric.label}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
                    <span className="text-xs text-green-600 font-semibold">{metric.trend}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Risk Distribution */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Risk Distribution
                  </h2>
                  <div className="space-y-4">
                    {[
                      { level: "Critical Risk", pct: 3, customers: 24, color: "bg-red-500" },
                      { level: "High Risk", pct: 12, customers: 127, color: "bg-orange-500" },
                      { level: "Medium Risk", pct: 28, customers: 456, color: "bg-yellow-500" },
                      { level: "Low Risk", pct: 57, customers: 2847, color: "bg-green-500" },
                    ].map((risk, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-foreground">{risk.level}</p>
                            <p className="text-xs text-muted-foreground">{risk.customers} customers</p>
                          </div>
                          <span className="text-sm font-semibold text-foreground">{risk.pct}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${risk.color}`} style={{ width: `${risk.pct}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* High Risk Customers */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Customers Requiring Attention
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Global Manufacturing Co",
                        risk: "CRITICAL",
                        score: 9.2,
                        reason: "Unusual transaction patterns",
                      },
                      {
                        name: "Tech Solutions Inc",
                        risk: "HIGH",
                        score: 8.7,
                        reason: "Frequent international transfers",
                      },
                      {
                        name: "Import Export Global",
                        risk: "HIGH",
                        score: 8.3,
                        reason: "New beneficiaries detected",
                      },
                    ].map((customer, i) => (
                      <div key={i} className="p-4 border border-border rounded-lg hover:bg-muted/50">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-foreground">{customer.name}</h4>
                          <Badge className={
                            customer.risk === "CRITICAL" ? "bg-red-500" : "bg-orange-500"
                          }>
                            {customer.risk}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">{customer.reason}</p>
                          <span className="text-lg font-bold text-foreground">{customer.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Risk Factors */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Top Risk Factors</h2>
                  <div className="space-y-3">
                    {[
                      { factor: "Transaction Size", weight: "28%" },
                      { factor: "Geographic Velocity", weight: "22%" },
                      { factor: "Beneficiary Status", weight: "18%" },
                      { factor: "Time Patterns", weight: "15%" },
                      { factor: "Customer Behavior", weight: "17%" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.factor}</span>
                        <span className="font-semibold text-foreground">{item.weight}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Assessment Tools */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Assessment Tools</h2>
                  <div className="space-y-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Run New Assessment
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Historical Data
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Export Report
                    </Button>
                  </div>
                </Card>

                {/* Legend */}
                <Card className="p-6 bg-blue-500/5 border border-blue-200">
                  <h3 className="font-semibold text-foreground mb-3">Understanding Risk Scores</h3>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p><span className="font-semibold">9-10:</span> Immediate action needed</p>
                    <p><span className="font-semibold">7-8:</span> Enhanced monitoring required</p>
                    <p><span className="font-semibold">5-6:</span> Standard monitoring</p>
                    <p><span className="font-semibold">0-4:</span> Low risk</p>
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
