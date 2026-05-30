'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Archive, FileText, Image, Video, MessageSquare, Download, Eye, Shield, Clock, Filter } from "lucide-react"

const evidenceItems = [
  { id: "EV-94847", type: "Conversation", content: "Romance scam progression - 47 messages", account: "@fake_lover_99", size: "2.4 MB", date: "Today, 2:34 PM", status: "Preserved" },
  { id: "EV-94846", type: "Images", content: "Stolen identity photos (12 images)", account: "crypto_trader_pro", size: "8.7 MB", date: "Today, 11:22 AM", status: "Preserved" },
  { id: "EV-94845", type: "Video", content: "Deepfake video evidence", account: "@investment_guru", size: "45.2 MB", date: "Yesterday", status: "Analyzing" },
  { id: "EV-94844", type: "Profile", content: "Account metadata and history", account: "tech_support_help", size: "1.1 MB", date: "Yesterday", status: "Preserved" },
  { id: "EV-94843", type: "Conversation", content: "Tech support scam transcript", account: "@ms_support_real", size: "890 KB", date: "2 days ago", status: "Exported" },
]

const typeIcons: Record<string, React.ElementType> = {
  Conversation: MessageSquare,
  Images: Image,
  Video: Video,
  Profile: FileText,
}

export default function EvidencePage() {
  return (
    <PageLayout role="platformshield" title="Evidence Vault" subtitle="Preserved evidence from detected scam operations">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Total Evidence Items", value: "12,847", change: "+234 today", icon: Archive, color: "text-primary" },
          { label: "Conversations", value: "8,234", change: "Preserved", icon: MessageSquare, color: "text-blue-500" },
          { label: "Media Files", value: "3,456", change: "Images & videos", icon: Image, color: "text-purple-500" },
          { label: "Law Enforcement Exports", value: "89", change: "This month", icon: Shield, color: "text-green-500" },
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

      {/* Evidence List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-foreground">Preserved Evidence</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1"><Filter className="h-4 w-4" /> Filter</Button>
            <Button size="sm">Export Package</Button>
          </div>
        </div>

        <div className="space-y-4">
          {evidenceItems.map((item) => {
            const TypeIcon = typeIcons[item.type] || FileText
            return (
              <div key={item.id} className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TypeIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{item.content}</p>
                      <Badge variant="outline" className="text-xs">{item.type}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{item.account}</span>
                      <span>{item.size}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={item.status === "Preserved" ? "bg-green-100 text-green-700" : item.status === "Exported" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}>
                    {item.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Download className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 5 of 12,847 items</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>

      {/* Export Options */}
      <Card className="p-6 mt-6">
        <h3 className="text-base font-bold text-foreground mb-4">Law Enforcement Export</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Generate court-ready evidence packages with chain of custody documentation, hashes, and metadata for law enforcement cooperation.
        </p>
        <div className="flex gap-3">
          <Button variant="outline">Generate Takedown Packet</Button>
          <Button variant="outline">Create LE Report</Button>
          <Button>Schedule Export</Button>
        </div>
      </Card>
    </PageLayout>
  )
}
