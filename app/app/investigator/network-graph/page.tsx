'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Network, Users, Phone, Mail, CreditCard, MapPin, ZoomIn, ZoomOut, Maximize2, Download } from "lucide-react"

export default function NetworkGraphPage() {
  return (
    <PageLayout role="investigator" title="Network Graph" subtitle="Visualize connections between actors, victims, and infrastructure">
      {/* Controls */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All Entities</Button>
            <Button variant="outline" size="sm">Actors Only</Button>
            <Button variant="outline" size="sm">Victims Only</Button>
            <Button variant="outline" size="sm">Infrastructure</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8"><ZoomOut className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-8 w-8"><ZoomIn className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-8 w-8"><Maximize2 className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" className="gap-1"><Download className="h-4 w-4" /> Export</Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Graph Visualization */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <div className="h-[500px] bg-muted/40 rounded-lg flex items-center justify-center relative">
              {/* Placeholder for network graph - in production, use a library like d3.js or vis.js */}
              <div className="text-center">
                <Network className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">Network Graph Visualization</p>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Interactive force-directed graph showing relationships between scam actors, victims, phone numbers, email addresses, and financial infrastructure.
                </p>
              </div>
              
              {/* Sample legend */}
              <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-foreground mb-2">Legend</p>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-muted-foreground">Scam Actor</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">Victim</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-muted-foreground">Phone Number</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">Financial Account</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card className="p-4">
            <h3 className="text-sm font-bold text-foreground mb-3">Graph Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Nodes</span>
                <span className="font-medium text-foreground">4,234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Edges</span>
                <span className="font-medium text-foreground">12,847</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Clusters</span>
                <span className="font-medium text-foreground">23</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Central Actors</span>
                <span className="font-medium text-foreground">8</span>
              </div>
            </div>
          </Card>

          {/* Entity Types */}
          <Card className="p-4">
            <h3 className="text-sm font-bold text-foreground mb-3">Entity Breakdown</h3>
            <div className="space-y-3">
              {[
                { icon: Users, label: "Actors", count: 156, color: "text-red-500" },
                { icon: Users, label: "Victims", count: 847, color: "text-blue-500" },
                { icon: Phone, label: "Phone Numbers", count: 234, color: "text-amber-500" },
                { icon: Mail, label: "Email Addresses", count: 189, color: "text-purple-500" },
                { icon: CreditCard, label: "Financial Accounts", count: 67, color: "text-green-500" },
                { icon: MapPin, label: "IP Addresses", count: 45, color: "text-cyan-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Selected Entity Info */}
          <Card className="p-4">
            <h3 className="text-sm font-bold text-foreground mb-3">Selected Entity</h3>
            <div className="text-center py-6 text-muted-foreground text-sm">
              Click on a node to view details
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
