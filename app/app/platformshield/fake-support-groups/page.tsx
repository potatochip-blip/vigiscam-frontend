'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, AlertTriangle, Globe, Eye, Ban } from "lucide-react"

const groups = [
  { id: "FSG-441", name: "Scam Victims Recovery Support 2024", platform: "Facebook", members: 2847, admins: 3, type: "Recovery Scam Funnel", score: 96, country: "Nigeria", created: "Oct 2023" },
  { id: "FSG-440", name: "VIGISCAM Official Help Community", platform: "Facebook", members: 1203, admins: 1, type: "Brand Impersonation", score: 94, country: "Ghana", created: "Nov 2023" },
  { id: "FSG-439", name: "Wire Transfer Fraud Victims Unite", platform: "Facebook", members: 889, admins: 2, type: "Secondary Targeting", score: 91, country: "UK", created: "Dec 2023" },
  { id: "FSG-438", name: "Crypto Scam Survivors Network", platform: "Telegram", members: 4512, admins: 5, type: "Recovery Scam Funnel", score: 88, country: "Unknown", created: "Sep 2023" },
  { id: "FSG-437", name: "Romance Scam Healing Circle", platform: "Reddit", members: 321, admins: 1, type: "Secondary Exploitation", score: 79, country: "India", created: "Jan 2024" },
  { id: "FSG-436", name: "Bank Fraud Victims — Legal Help", platform: "Facebook", members: 671, admins: 2, type: "Fake Legal Services", score: 85, country: "South Africa", created: "Nov 2023" },
]

export default function FakeSupportGroupsPage() {
  return (
    <PageLayout role="platformshield" title="Fake Support Groups" subtitle="Detect and dismantle fraudulent victim support communities used to re-exploit scam survivors">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Active Groups Monitored", value: "184", color: "text-red-600" },
            { label: "Total Members at Risk", value: "48,203", color: "text-orange-600" },
            { label: "Groups Taken Down (30d)", value: "31", color: "text-green-600" },
            { label: "Secondary Victims Identified", value: "892", color: "text-foreground" },
          ].map((s, i) => (
            <Card key={i} className="p-5">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-red-600" /> Detected Fake Support Groups
            </h2>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Filter by Platform</Button>
              <Button size="sm">Export Report</Button>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 text-xs text-muted-foreground font-medium">Group</th>
                  <th className="pb-3 text-xs text-muted-foreground font-medium">Platform</th>
                  <th className="pb-3 text-xs text-muted-foreground font-medium">Members</th>
                  <th className="pb-3 text-xs text-muted-foreground font-medium">Type</th>
                  <th className="pb-3 text-xs text-muted-foreground font-medium">Origin</th>
                  <th className="pb-3 text-xs text-muted-foreground font-medium">Risk</th>
                  <th className="pb-3 text-xs text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g, i) => (
                  <tr key={i} className="border-b border-border/60 hover:bg-muted/30">
                    <td className="py-3">
                      <div>
                        <p className="font-semibold text-foreground text-xs">{g.name}</p>
                        <p className="text-xs text-muted-foreground">{g.id} · Created {g.created}</p>
                      </div>
                    </td>
                    <td className="py-3"><Badge className="bg-blue-50 text-blue-700 border-0 text-xs">{g.platform}</Badge></td>
                    <td className="py-3 font-semibold text-foreground">{g.members.toLocaleString()}</td>
                    <td className="py-3"><Badge className="bg-red-50 text-red-700 border-0 text-xs">{g.type}</Badge></td>
                    <td className="py-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Globe className="h-3 w-3" />{g.country}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`font-bold text-sm ${g.score >= 90 ? "text-red-600" : g.score >= 80 ? "text-orange-600" : "text-yellow-600"}`}>{g.score}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1"><Eye className="h-3 w-3" />Review</Button>
                        <Button size="sm" className="h-7 text-xs gap-1 bg-red-600 hover:bg-red-700"><Ban className="h-3 w-3" />Remove</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" /> Common Deception Tactics
            </h2>
            <div className="space-y-3">
              {[
                { tactic: "Brand Impersonation", desc: "Posing as legitimate recovery services or banks", count: 41 },
                { tactic: "Peer Legitimacy", desc: "Using real victim posts to gain trust before targeting", count: 37 },
                { tactic: "Paid Admin Access", desc: "Members pay for 'premium' support/recovery help", count: 28 },
                { tactic: "Data Harvesting", desc: "Collecting personal/banking info under guise of case filing", count: 24 },
                { tactic: "Secondary Scam Funnel", desc: "Pushing victims to third-party 'recovery' scam services", count: 54 },
              ].map((t, i) => (
                <div key={i} className="flex items-start justify-between p-3 bg-muted/40 rounded">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.tactic}</p>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 border-0 ml-2">{t.count}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-base font-bold text-foreground mb-4">Takedown History (Last 30 Days)</h2>
            <div className="space-y-2">
              {[
                { name: "Crypto Recovery Elite UK", platform: "Facebook", date: "May 8", members: 3210 },
                { name: "Fraud Victims Legal Aid SA", platform: "Telegram", date: "May 7", members: 892 },
                { name: "Bank Scam Refund Network", platform: "WhatsApp", date: "May 6", members: 1447 },
                { name: "Romance Scam Help Network", platform: "Facebook", date: "May 5", members: 2108 },
                { name: "FTC Scam Recovery Official", platform: "Facebook", date: "May 4", members: 5621 },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <div>
                    <p className="text-xs font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.platform} · {t.members.toLocaleString()} members</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-0 text-xs">Removed {t.date}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
