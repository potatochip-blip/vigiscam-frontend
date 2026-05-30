'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, TrendingDown, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function FraudManagementPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Fraud Management Center</h1>
              <p className="text-muted-foreground">Manage detected fraud cases and review patterns</p>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Cases Detected", value: "3,247", icon: AlertTriangle, color: "bg-orange-500/10 text-orange-600" },
                { label: "Cases Resolved", value: "2,891", icon: CheckCircle, color: "bg-green-500/10 text-green-600" },
                { label: "Pending Review", value: "356", icon: Clock, color: "bg-yellow-500/10 text-yellow-600" },
                { label: "Prevention Rate", value: "98.7%", icon: TrendingDown, color: "bg-blue-500/10 text-blue-600" },
              ].map((metric, i) => {
                const Icon = metric.icon
                return (
                  <Card key={i} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{metric.label}</p>
                        <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
                      </div>
                      <div className={`p-2 rounded-lg ${metric.color.split(' ')[0]}`}>
                        <Icon className={`h-5 w-5 ${metric.color.split(' ')[1]}`} />
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Filters and Search */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search case ID, customer, or transaction..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="bg-transparent gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </Card>

            {/* Cases Table */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Active Fraud Cases</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Case ID</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Customer</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Fraud Type</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "BG-234891", customer: "Acme Corp", type: "CEO Fraud", amount: "$125,000", status: "Under Review" },
                      { id: "BG-234890", customer: "Tech Inc", type: "Account Takeover", amount: "$45,600", status: "Resolved" },
                      { id: "BG-234889", customer: "Global Retail", type: "Vendor Impersonation", amount: "$89,300", status: "Escalated" },
                      { id: "BG-234888", customer: "Finance Corp", type: "Wire Fraud", amount: "$234,500", status: "Under Review" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/50">
                        <td className="py-4 px-4 font-mono text-foreground">{row.id}</td>
                        <td className="py-4 px-4 text-foreground">{row.customer}</td>
                        <td className="py-4 px-4 text-foreground">{row.type}</td>
                        <td className="py-4 px-4 font-semibold text-foreground">{row.amount}</td>
                        <td className="py-4 px-4">
                          <Badge className={
                            row.status === "Resolved" ? "bg-green-500" : 
                            row.status === "Escalated" ? "bg-red-500" : 
                            "bg-yellow-500"
                          }>
                            {row.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
