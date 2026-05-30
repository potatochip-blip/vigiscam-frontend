'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageSquare, Globe, Users } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function CallAnalysisPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Call & Communication Analysis</h1>
              <p className="text-muted-foreground">Analyze phone calls, messages, and communication patterns</p>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Calls Analyzed", value: "12,847" },
                { label: "Unique Phone Numbers", value: "1,234" },
                { label: "Call Duration (Total)", value: "487 hrs" },
                { label: "Pattern Matches", value: "347" },
              ].map((metric, i) => (
                <Card key={i} className="p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{metric.label}</p>
                  <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
                </Card>
              ))}
            </div>

            {/* Search and Filter */}
            <Card className="p-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Phone Number</label>
                  <Input placeholder="Enter phone number to analyze..." />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">From Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">To Date</label>
                    <Input type="date" />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Call Records */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Analyzed Call Records
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        number: "+1 (555) 234-5678",
                        date: "May 25, 2024, 2:15 PM",
                        duration: "12:34",
                        risk: "HIGH",
                        analysis: "Matches known scammer pattern",
                      },
                      {
                        number: "+1 (555) 234-5679",
                        date: "May 25, 2024, 3:45 PM",
                        duration: "8:22",
                        risk: "CRITICAL",
                        analysis: "Connected to 5 other suspects",
                      },
                      {
                        number: "+1 (555) 234-5680",
                        date: "May 25, 2024, 5:20 PM",
                        duration: "15:47",
                        risk: "HIGH",
                        analysis: "Voice stress analysis detected deception",
                      },
                    ].map((record, i) => (
                      <div key={i} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-mono font-semibold text-foreground">{record.number}</p>
                            <p className="text-xs text-muted-foreground mt-1">{record.date}</p>
                          </div>
                          <Badge className={
                            record.risk === "CRITICAL" ? "bg-red-500" : "bg-orange-500"
                          }>
                            {record.risk}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">{record.analysis}</p>
                          <span className="text-sm font-semibold text-foreground">{record.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Communication Pattern */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Communication Patterns
                  </h2>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Users className="h-12 w-12 text-primary mx-auto mb-2 opacity-30" />
                      <p className="text-muted-foreground">Communication frequency chart</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Analysis Summary */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Analysis Summary</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Duration</span>
                      <span className="font-semibold text-foreground">36:43</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Call Length</span>
                      <span className="font-semibold text-foreground">12:14</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peak Time</span>
                      <span className="font-semibold text-foreground">2:00 PM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Risk Score</span>
                      <span className="font-semibold text-red-600">9.2/10</span>
                    </div>
                  </div>
                </Card>

                {/* Detected Networks */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Connected Numbers</h2>
                  <div className="space-y-2">
                    {[
                      "+1 (555) 234-5679",
                      "+1 (555) 234-5680",
                      "+1 (555) 234-5681",
                      "+1 (555) 234-5682",
                    ].map((number, i) => (
                      <div key={i} className="p-2 bg-muted rounded text-sm font-mono text-foreground">
                        {number}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Actions */}
                <Card className="p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Actions</h2>
                  <div className="space-y-2">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Generate Report
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Export Data
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Share Analysis
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
