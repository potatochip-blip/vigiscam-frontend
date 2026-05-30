'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Users, Network, FileText, Activity, Search } from "lucide-react"

export default function InvestigatorConsolePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Investigator Console</h1>
              <p className="text-muted-foreground">Law enforcement and government fraud investigation platform</p>
            </div>

            {/* Key Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Active Cases", value: "847", icon: FileText },
                { label: "Scam Networks", value: "340", icon: Network },
                { label: "Suspects Identified", value: "12,450", icon: Users },
                { label: "Total Impact", value: "$2.4B", icon: AlertTriangle },
              ].map((stat, i) => (
                <Card key={i} className="p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                </Card>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Recent Cases */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Active Investigations
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        caseId: "INV-2026-0847",
                        title: "Tech Support Scam Ring - 4 State Operation",
                        agency: "FBI Cyber Division",
                        suspects: 23,
                        impact: "$847K",
                        status: "In Progress",
                      },
                      {
                        caseId: "INV-2026-0823",
                        title: "Romance Scam Network - International",
                        agency: "Interpol",
                        suspects: 67,
                        impact: "$3.2M",
                        status: "Prosecution",
                      },
                      {
                        caseId: "INV-2026-0801",
                        title: "Investment Fraud Collective",
                        agency: "SEC Enforcement",
                        suspects: 34,
                        impact: "$12.4M",
                        status: "Closed",
                      },
                    ].map((case_, i) => (
                      <div key={i} className="p-4 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{case_.title}</h4>
                            <p className="text-xs text-muted-foreground">{case_.caseId} • {case_.agency}</p>
                          </div>
                          <Badge className={case_.status === 'Closed' ? 'bg-green-500' : case_.status === 'Prosecution' ? 'bg-orange-500' : 'bg-blue-500'}>
                            {case_.status}
                          </Badge>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <span className="text-muted-foreground"><span className="font-semibold text-foreground">{case_.suspects}</span> suspects</span>
                          <span className="text-muted-foreground"><span className="font-semibold text-foreground">{case_.impact}</span> impact</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Network Analysis */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    Scam Network Graph
                  </h2>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Network className="h-12 w-12 text-primary mx-auto mb-2 opacity-50" />
                      <p className="text-muted-foreground text-sm">Network visualization placeholder</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Search Tools */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search & Investigation
                  </h2>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Phone number, email, or account..."
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                    />
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Search Database
                    </Button>
                  </div>
                </Card>

                {/* Case Statistics */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Case Statistics</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Case Duration</span>
                      <span className="font-semibold text-foreground">6.4 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conviction Rate</span>
                      <span className="font-semibold text-green-600">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Assets Recovered</span>
                      <span className="font-semibold text-foreground">$847M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Arrests Made</span>
                      <span className="font-semibold text-foreground">3,247</span>
                    </div>
                  </div>
                </Card>

                {/* Evidence Access */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Evidence Vault Access</h2>
                  <p className="text-sm text-muted-foreground mb-4">Securely access victim evidence and documentation</p>
                  <div className="space-y-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-9">
                      Request Evidence
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent h-9">
                      Shared with Me
                    </Button>
                  </div>
                </Card>

                {/* Tools */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Investigation Tools</h2>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full bg-transparent h-9 justify-start text-sm">
                      Call Analysis
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent h-9 justify-start text-sm">
                      Location Tracking
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent h-9 justify-start text-sm">
                      Timeline Builder
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
