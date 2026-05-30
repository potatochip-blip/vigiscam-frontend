'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Network, Users, FileText, AlertTriangle, TrendingUp, Clock, ArrowRight } from "lucide-react"

const activeCases = [
  { id: "CASE-2847", name: "Operation Phantom Wire", type: "Romance Scam Ring", actors: 24, victims: 847, status: "Active", priority: "High" },
  { id: "CASE-2846", name: "Tech Support Cluster Alpha", type: "Tech Support Fraud", actors: 12, victims: 234, status: "Active", priority: "Medium" },
  { id: "CASE-2845", name: "Investment Fraud Cell 7", type: "Investment Scam", actors: 8, victims: 156, status: "Evidence Collection", priority: "High" },
]

const recentActivity = [
  { action: "New actor linked", case: "CASE-2847", time: "2 min ago" },
  { action: "Evidence package exported", case: "CASE-2845", time: "15 min ago" },
  { action: "Timeline updated", case: "CASE-2846", time: "1 hour ago" },
  { action: "Network graph expanded", case: "CASE-2847", time: "2 hours ago" },
]

export default function InvestigatorOverviewPage() {
  return (
    <PageLayout role="investigator" title="Investigator Console" subtitle="Advanced fraud investigation and evidence analysis tools">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Active Cases", value: "23", change: "+3 this week", icon: FileText, color: "text-primary" },
          { label: "Entities Tracked", value: "1,847", change: "Across all cases", icon: Users, color: "text-blue-500" },
          { label: "Network Nodes", value: "4,234", change: "Connected actors", icon: Network, color: "text-purple-500" },
          { label: "Evidence Items", value: "12.4K", change: "Preserved", icon: Search, color: "text-green-500" },
        ].map((stat, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Cases */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-foreground">Active Investigations</h2>
              <Button size="sm" variant="outline">View All Cases</Button>
            </div>

            <div className="space-y-4">
              {activeCases.map((caseItem) => (
                <div key={caseItem.id} className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${caseItem.priority === "High" ? "bg-red-100" : "bg-amber-100"}`}>
                      <FileText className={`h-5 w-5 ${caseItem.priority === "High" ? "text-red-600" : "text-amber-600"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{caseItem.name}</p>
                        <Badge variant="outline" className="text-xs">{caseItem.id}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{caseItem.type}</span>
                        <span>{caseItem.actors} actors</span>
                        <span>{caseItem.victims} victims</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={caseItem.status === "Active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
                      {caseItem.status}
                    </Badge>
                    <Button size="sm" variant="ghost" className="gap-1">
                      Open <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-base font-bold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.case}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-base font-bold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Search className="h-4 w-4" /> New Investigation
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <Network className="h-4 w-4" /> Network Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                <FileText className="h-4 w-4" /> Generate Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
