'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, AlertTriangle, Ban, CheckCircle2, Search, Eye, Flag, MoreVertical, Clock } from "lucide-react"

const flaggedAccounts = [
  { id: "ACC-8847", username: "@crypto_trader_pro", email: "***@gmail.com", riskScore: 94, flags: ["Grooming", "Financial"], created: "2 days ago", messages: 847, status: "Flagged" },
  { id: "ACC-8846", username: "investment_guru_2024", email: "***@outlook.com", riskScore: 89, flags: ["Investment Scam"], created: "5 days ago", messages: 234, status: "Reviewing" },
  { id: "ACC-8845", username: "@love_seeker_real", email: "***@yahoo.com", riskScore: 87, flags: ["Romance", "Identity"], created: "1 week ago", messages: 1289, status: "Flagged" },
  { id: "ACC-8844", username: "tech_support_help", email: "***@proton.me", riskScore: 92, flags: ["Tech Support"], created: "3 days ago", messages: 456, status: "Banned" },
  { id: "ACC-8843", username: "@government_official", email: "***@mail.ru", riskScore: 96, flags: ["Impersonation", "Government"], created: "1 day ago", messages: 89, status: "Flagged" },
]

export default function AccountsPage() {
  return (
    <PageLayout role="platformshield" title="Flagged Accounts" subtitle="Monitor and manage suspicious accounts detected by AI">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Flagged Accounts", value: "1,247", change: "+89 today", icon: AlertTriangle, color: "text-amber-500" },
          { label: "Under Review", value: "234", change: "Pending action", icon: Eye, color: "text-blue-500" },
          { label: "Banned Today", value: "156", change: "Accounts removed", icon: Ban, color: "text-red-500" },
          { label: "False Positives", value: "2.3%", change: "Accuracy rate", icon: CheckCircle2, color: "text-green-500" },
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

      {/* Search & Filter */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by username, email, or ID..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All Status</Button>
            <Button variant="outline" size="sm">All Flags</Button>
            <Button variant="outline" size="sm">Risk: High</Button>
          </div>
        </div>
      </Card>

      {/* Account List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-foreground">Suspicious Accounts</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Bulk Actions</Button>
            <Button size="sm">Export List</Button>
          </div>
        </div>

        <div className="space-y-4">
          {flaggedAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{account.username}</p>
                    <Badge variant="outline" className="text-xs">{account.id}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{account.email}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {account.created}</span>
                    <span>{account.messages} messages</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-1 hidden sm:flex">
                  {account.flags.map((flag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{flag}</Badge>
                  ))}
                </div>
                <div className={`text-sm font-bold ${account.riskScore >= 90 ? "text-red-500" : account.riskScore >= 80 ? "text-orange-500" : "text-amber-500"}`}>
                  {account.riskScore}%
                </div>
                <Badge className={account.status === "Banned" ? "bg-red-100 text-red-700" : account.status === "Reviewing" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}>
                  {account.status}
                </Badge>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Ban className="h-4 w-4" /></Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><MoreVertical className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 5 of 1,247 accounts</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
