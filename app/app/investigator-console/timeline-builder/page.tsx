'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, AlertCircle, FileText } from "lucide-react"

export default function TimelineBuilderPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Investigation Timeline</h1>
              <p className="text-muted-foreground">Create and analyze chronological investigation timelines</p>
            </div>

            {/* Case Selection */}
            <Card className="p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-1">Current Investigation</p>
                  <p className="font-semibold text-foreground">INV-2026-0847 - Tech Support Scam Ring</p>
                </div>
                <Button variant="outline" className="bg-transparent">
                  Change Case
                </Button>
              </div>
            </Card>

            {/* Timeline Visualization */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Investigation Timeline
              </h2>
              <div className="space-y-6">
                {[
                  {
                    date: "May 15, 2024",
                    time: "09:32 AM",
                    event: "Initial Report Filed",
                    description: "Victim reported first suspicious contact",
                    type: "report",
                  },
                  {
                    date: "May 16, 2024",
                    time: "02:15 PM",
                    event: "Phone Records Obtained",
                    description: "Subpoena served to telecom provider",
                    type: "evidence",
                  },
                  {
                    date: "May 18, 2024",
                    time: "11:47 AM",
                    event: "Suspect Identified",
                    description: "Cross-reference with known perpetrators",
                    type: "suspect",
                  },
                  {
                    date: "May 22, 2024",
                    time: "04:20 PM",
                    event: "Network Analysis Complete",
                    description: "Connected to 12 other suspects in ring",
                    type: "network",
                  },
                  {
                    date: "May 25, 2024",
                    time: "10:00 AM",
                    event: "Warrant Obtained",
                    description: "Court authorized surveillance and search",
                    type: "legal",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold text-white mb-2 ${
                        item.type === 'report' ? 'bg-blue-500' :
                        item.type === 'evidence' ? 'bg-green-500' :
                        item.type === 'suspect' ? 'bg-red-500' :
                        item.type === 'network' ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`}>
                        {i + 1}
                      </div>
                      {i < 4 && <div className="h-12 w-0.5 bg-border"></div>}
                    </div>
                    <div className="pb-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{item.date} at {item.time}</p>
                          <h4 className="font-semibold text-foreground mt-1">{item.event}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                        <Badge className={
                          item.type === 'report' ? 'bg-blue-500' :
                          item.type === 'evidence' ? 'bg-green-500' :
                          item.type === 'suspect' ? 'bg-red-500' :
                          item.type === 'network' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }>
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Timeline Tools */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Timeline Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Add Event
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Export Timeline
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Print Report
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
