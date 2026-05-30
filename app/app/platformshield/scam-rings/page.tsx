'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Network, Users, AlertTriangle, Globe, Eye, Target, Link2, MapPin } from "lucide-react"

const scamRings = [
  { id: "SR-001", name: "Lagos Network Alpha", accounts: 847, victims: 2340, revenue: "$4.2M", region: "West Africa", status: "Active", threat: "Critical" },
  { id: "SR-002", name: "Romance Syndicate 7", accounts: 412, victims: 1890, revenue: "$2.8M", region: "SE Asia", status: "Active", threat: "High" },
  { id: "SR-003", name: "Tech Support Cluster", accounts: 234, victims: 890, revenue: "$1.1M", region: "India", status: "Disrupted", threat: "Medium" },
  { id: "SR-004", name: "Crypto Recovery Ring", accounts: 156, victims: 445, revenue: "$890K", region: "Eastern Europe", status: "Active", threat: "High" },
  { id: "SR-005", name: "Investment Fraud Cell", accounts: 89, victims: 234, revenue: "$560K", region: "North America", status: "Investigating", threat: "Medium" },
]

export default function ScamRingsPage() {
  return (
    <PageLayout role="platformshield" title="Scam Rings" subtitle="Track and disrupt coordinated fraud operations across your platform">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Active Scam Rings", value: "23", change: "+3 this week", icon: Network, color: "text-red-500" },
          { label: "Linked Accounts", value: "3,847", change: "Under monitoring", icon: Users, color: "text-amber-500" },
          { label: "Estimated Losses", value: "$12.4M", change: "Last 30 days", icon: AlertTriangle, color: "text-orange-500" },
          { label: "Regions Affected", value: "18", change: "Countries", icon: Globe, color: "text-blue-500" },
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

      {/* Ring List */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-foreground">Identified Scam Networks</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Network Graph</Button>
            <Button size="sm">Generate Takedown</Button>
          </div>
        </div>

        <div className="space-y-4">
          {scamRings.map((ring) => (
            <div key={ring.id} className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${ring.threat === "Critical" ? "bg-red-100" : ring.threat === "High" ? "bg-orange-100" : "bg-amber-100"}`}>
                  <Network className={`h-5 w-5 ${ring.threat === "Critical" ? "text-red-600" : ring.threat === "High" ? "text-orange-600" : "text-amber-600"}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{ring.name}</p>
                    <Badge variant="outline" className="text-xs">{ring.id}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {ring.accounts} accounts</span>
                    <span className="flex items-center gap-1"><Target className="h-3 w-3" /> {ring.victims} victims</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {ring.region}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-foreground">{ring.revenue}</p>
                  <p className="text-xs text-muted-foreground">Est. Revenue</p>
                </div>
                <Badge className={ring.threat === "Critical" ? "bg-red-100 text-red-700" : ring.threat === "High" ? "bg-orange-100 text-orange-700" : "bg-amber-100 text-amber-700"}>
                  {ring.threat}
                </Badge>
                <Badge className={ring.status === "Active" ? "bg-red-100 text-red-700" : ring.status === "Disrupted" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
                  {ring.status}
                </Badge>
                <Button size="sm" variant="outline" className="gap-1">
                  <Eye className="h-4 w-4" /> View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Network Visualization Placeholder */}
      <Card className="p-6">
        <h3 className="text-base font-bold text-foreground mb-4">Network Relationship Map</h3>
        <div className="h-64 bg-muted/40 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Network className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Interactive network graph visualization</p>
            <p className="text-xs text-muted-foreground">Select a scam ring to view connections</p>
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
