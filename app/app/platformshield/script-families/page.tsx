'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, GitBranch, AlertTriangle, TrendingUp, Eye, Copy, Clock } from "lucide-react"

const scriptFamilies = [
  { id: "SF-001", name: "Romance Opener v4.2", category: "Romance", variants: 847, detections: 12400, lastSeen: "2 min ago", evolution: "+12 variants", status: "Active" },
  { id: "SF-002", name: "Tech Support Microsoft", category: "Tech Support", variants: 234, detections: 8900, lastSeen: "15 min ago", evolution: "+3 variants", status: "Active" },
  { id: "SF-003", name: "Crypto Investment Pitch", category: "Investment", variants: 156, detections: 5600, lastSeen: "1 hour ago", evolution: "+8 variants", status: "Active" },
  { id: "SF-004", name: "IRS Threat Script", category: "Government", variants: 89, detections: 3400, lastSeen: "3 hours ago", evolution: "+2 variants", status: "Declining" },
  { id: "SF-005", name: "Amazon Refund Scam", category: "E-Commerce", variants: 67, detections: 2100, lastSeen: "6 hours ago", evolution: "Stable", status: "Stable" },
]

export default function ScriptFamiliesPage() {
  return (
    <PageLayout role="platformshield" title="Script Families" subtitle="AI-identified scam script clusters and their evolutionary variants">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Script Families", value: "142", change: "+8 this week", icon: FileText, color: "text-primary" },
          { label: "Total Variants", value: "2,847", change: "Tracked", icon: GitBranch, color: "text-purple-500" },
          { label: "Active Campaigns", value: "89", change: "In progress", icon: AlertTriangle, color: "text-amber-500" },
          { label: "Evolution Rate", value: "+4.2%", change: "Daily mutations", icon: TrendingUp, color: "text-blue-500" },
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

      {/* Script Families List */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-foreground">Tracked Script Families</h2>
          <Button size="sm">Export Signatures</Button>
        </div>

        <div className="space-y-4">
          {scriptFamilies.map((script) => (
            <div key={script.id} className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{script.name}</p>
                    <Badge variant="outline" className="text-xs">{script.category}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><GitBranch className="h-3 w-3" /> {script.variants} variants</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {script.detections.toLocaleString()} detections</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {script.lastSeen}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{script.evolution}</p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
                <Badge className={script.status === "Active" ? "bg-red-100 text-red-700" : script.status === "Declining" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
                  {script.status}
                </Badge>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Copy className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sample Script Preview */}
      <Card className="p-6">
        <h3 className="text-base font-bold text-foreground mb-4">Script Analysis Preview</h3>
        <div className="bg-muted/40 rounded-lg p-4 font-mono text-sm text-muted-foreground">
          <p className="text-foreground font-semibold mb-2"># Romance Opener v4.2 - Base Template</p>
          <p className="mb-1">GREETING: &quot;Hello [NAME], I saw your profile and...&quot;</p>
          <p className="mb-1">HOOK: [MUTUAL_INTEREST] + [COMPLIMENT]</p>
          <p className="mb-1">BACKSTORY: [PROFESSION] + [TRAGEDY] + [ISOLATION]</p>
          <p className="mb-1">ESCALATION: [EMOTIONAL_INVESTMENT] → [FINANCIAL_ASK]</p>
          <p className="text-xs text-muted-foreground mt-4">AI-extracted pattern from 12,400+ detected messages</p>
        </div>
      </Card>
    </PageLayout>
  )
}
