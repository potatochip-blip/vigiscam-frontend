'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, AlertTriangle, ThumbsDown, Clock, Ban } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ModerationQueuePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Moderation Queue</h1>
              <p className="text-muted-foreground">Review and manage flagged content and users</p>
            </div>

            {/* Queue Stats */}
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {[
                { label: "In Queue", value: "347", color: "text-orange-600" },
                { label: "Pending Review", value: "89", color: "text-red-600" },
                { label: "High Priority", value: "23", color: "text-red-700" },
                { label: "Approved Today", value: "1,247", color: "text-green-600" },
                { label: "Rejected Today", value: "432", color: "text-blue-600" },
              ].map((stat, i) => (
                <Card key={i} className="p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{stat.label}</p>
                  <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
                </Card>
              ))}
            </div>

            {/* Filter Bar */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Input placeholder="Search by username, listing ID, or email..." />
                </div>
                <select className="px-4 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>Priority: High</option>
                  <option>Priority: All</option>
                  <option>Priority: Medium</option>
                  <option>Priority: Low</option>
                </select>
                <select className="px-4 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>Type: All</option>
                  <option>Type: Listing</option>
                  <option>Type: User</option>
                  <option>Type: Payment</option>
                </select>
              </div>
            </Card>

            {/* Review Items */}
            <div className="space-y-4">
              {[
                {
                  id: "USR-234891",
                  type: "User Profile",
                  reason: "Suspected fraud ring account",
                  priority: "CRITICAL",
                  reporter: 45,
                  date: "2 hours ago",
                },
                {
                  id: "LST-234890",
                  type: "Listing",
                  reason: "Fake designer handbags",
                  priority: "HIGH",
                  reporter: 12,
                  date: "4 hours ago",
                },
                {
                  id: "PAY-234889",
                  type: "Payment Method",
                  reason: "Stolen credit card detected",
                  priority: "CRITICAL",
                  reporter: 1,
                  date: "6 hours ago",
                },
                {
                  id: "USR-234888",
                  type: "User Profile",
                  reason: "Romance scam suspected",
                  priority: "HIGH",
                  reporter: 23,
                  date: "8 hours ago",
                },
                {
                  id: "LST-234887",
                  type: "Listing",
                  reason: "Investment scam promotion",
                  priority: "CRITICAL",
                  reporter: 34,
                  date: "10 hours ago",
                },
              ].map((item, i) => (
                <Card key={i} className="p-6 hover:shadow-md transition-all">
                  <div className="grid md:grid-cols-6 gap-4 items-center">
                    <div>
                      <p className="text-xs text-muted-foreground font-mono mb-1">{item.id}</p>
                      <p className="font-semibold text-foreground">{item.type}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">{item.reason}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        item.priority === "CRITICAL" ? "bg-red-500" : "bg-orange-500"
                      }>
                        {item.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.reporter} reports</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                        Approve
                      </Button>
                      <Button size="sm" className="bg-red-600 text-white hover:bg-red-700">
                        Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
