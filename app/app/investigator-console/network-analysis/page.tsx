'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Network, Users, AlertCircle, Link as LinkIcon } from "lucide-react"

export default function NetworkAnalysisPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Fraud Network Analysis</h1>
              <p className="text-muted-foreground">Visualize connections and relationships between suspects</p>
            </div>

            {/* Network Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Networks", value: "47" },
                { label: "Connected Nodes", value: "1,234" },
                { label: "Active Links", value: "2,891" },
                { label: "Key Figures", value: "156" },
              ].map((stat, i) => (
                <Card key={i} className="p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Network Visualization */}
              <div className="lg:col-span-2">
                <Card className="p-6 h-96 flex items-center justify-center bg-muted/50">
                  <div className="text-center">
                    <Network className="h-16 w-16 text-primary mx-auto mb-4 opacity-30" />
                    <p className="text-muted-foreground">Network graph visualization area</p>
                    <p className="text-sm text-muted-foreground mt-2">Interactive network analysis will display here</p>
                  </div>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Network Details */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Current Network
                  </h2>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted rounded">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Network ID</p>
                      <p className="font-mono text-foreground font-semibold">NET-2024-034</p>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Threat Level</p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-500">CRITICAL</Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Members</p>
                      <p className="text-2xl font-bold text-foreground">47</p>
                    </div>
                  </div>
                </Card>

                {/* Key Suspects */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Key Suspects
                  </h2>
                  <div className="space-y-3">
                    {[
                      { name: "Subject A", connections: 18, risk: "CRITICAL" },
                      { name: "Subject B", connections: 14, risk: "HIGH" },
                      { name: "Subject C", connections: 11, risk: "HIGH" },
                    ].map((suspect, i) => (
                      <div key={i} className="p-3 bg-muted rounded">
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-medium text-foreground text-sm">{suspect.name}</p>
                          <Badge className={
                            suspect.risk === "CRITICAL" ? "bg-red-500" : "bg-orange-500"
                          }>
                            {suspect.risk}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{suspect.connections} connections</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Analysis Tools */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Tools</h2>
                  <div className="space-y-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Export Network
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Print Report
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
