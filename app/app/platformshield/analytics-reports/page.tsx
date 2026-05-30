'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, AlertCircle } from "lucide-react"

export default function AnalyticsReportsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
              <p className="text-muted-foreground">Platform fraud trends and performance metrics</p>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Users", value: "12.4M", trend: "+8.2%" },
                { label: "Fraud Prevention Rate", value: "99.4%", trend: "+0.3%" },
                { label: "Prevented Losses", value: "$2.4B", trend: "+12.1%" },
                { label: "Malicious Accounts Removed", value: "8,450", trend: "+5.4%" },
              ].map((metric, i) => (
                <Card key={i} className="p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{metric.label}</p>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{metric.value}</h3>
                  <p className="text-xs text-green-600 font-semibold">{metric.trend}</p>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Fraud Trends */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Fraud Trends (Last 30 Days)
                  </h2>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2 opacity-30" />
                      <p className="text-muted-foreground">Trend chart visualization</p>
                    </div>
                  </div>
                </Card>

                {/* Scam Categories */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">Scam Categories by Impact</h2>
                  <div className="space-y-4">
                    {[
                      { category: "Listing Fraud", amount: "$524M", percentage: 34, color: "bg-blue-500" },
                      { category: "Romance Scams", amount: "$387M", percentage: 25, color: "bg-pink-500" },
                      { category: "Investment Fraud", amount: "$298M", percentage: 19, color: "bg-orange-500" },
                      { category: "Payment Fraud", amount: "$198M", percentage: 13, color: "bg-purple-500" },
                      { category: "Other", amount: "$87M", percentage: 9, color: "bg-gray-500" },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          <p className="text-sm font-semibold text-foreground">{item.amount}</p>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Performance Summary */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Performance Summary</h2>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Detection Accuracy</span>
                        <span className="font-semibold text-foreground">99.4%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "99.4%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">False Positives</span>
                        <span className="font-semibold text-foreground">0.6%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: "0.6%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">System Uptime</span>
                        <span className="font-semibold text-foreground">99.99%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "99.99%" }}></div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Geographic Distribution */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Top Countries</h2>
                  <div className="space-y-2">
                    {[
                      { country: "United States", percentage: 45 },
                      { country: "United Kingdom", percentage: 18 },
                      { country: "Canada", percentage: 12 },
                      { country: "Australia", percentage: 10 },
                      { country: "Others", percentage: 15 },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.country}</span>
                        <span className="font-semibold text-foreground">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Report Options */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Generate Reports</h2>
                  <div className="space-y-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Download PDF Report
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Export CSV Data
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Custom Report
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
