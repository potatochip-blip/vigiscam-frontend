'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
              <p className="text-muted-foreground">Generate and access comprehensive fraud reports</p>
            </div>

            {/* Report Statistics */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Reports Generated", value: "247", trend: "+32 this month" },
                { label: "Scheduled Reports", value: "18", trend: "Active" },
                { label: "Last Updated", value: "2 hours ago", trend: "Updated" },
              ].map((stat, i) => (
                <Card key={i} className="p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">{stat.trend}</p>
                </Card>
              ))}
            </div>

            {/* Search and Filters */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search reports by name or date..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="bg-transparent gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </Button>
              </div>
            </Card>

            {/* Reports List */}
            <div className="space-y-4">
              {[
                {
                  title: "Monthly Fraud Activity Report",
                  date: "May 2024",
                  size: "2.4 MB",
                  type: "PDF",
                  status: "Available",
                },
                {
                  title: "Q2 Risk Assessment Summary",
                  date: "April 2024",
                  size: "1.8 MB",
                  type: "PDF",
                  status: "Available",
                },
                {
                  title: "Transaction Patterns Analysis",
                  date: "May 2024",
                  size: "3.2 MB",
                  type: "Excel",
                  status: "Available",
                },
                {
                  title: "Customer Risk Profiling",
                  date: "May 2024",
                  size: "1.5 MB",
                  type: "PDF",
                  status: "Processing",
                },
                {
                  title: "Fraud Trends 2024",
                  date: "May 2024",
                  size: "4.1 MB",
                  type: "PDF",
                  status: "Available",
                },
              ].map((report, i) => (
                <Card key={i} className="p-6 flex items-center justify-between hover:shadow-md transition-all">
                  <div className="flex items-start gap-4 flex-grow">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{report.date}</span>
                        <span>{report.size}</span>
                        <Badge variant="outline" className="bg-transparent">{report.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={report.status === "Available" ? "bg-green-500" : "bg-yellow-500"}>
                      {report.status}
                    </Badge>
                    <Button 
                      size="sm" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={report.status !== "Available"}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Generate Report */}
            <Card className="p-8 mt-8 border-2 border-dashed">
              <div className="text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-foreground mb-2">Generate Custom Report</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create a custom report with specific date ranges, metrics, and data filters
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Create New Report
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
