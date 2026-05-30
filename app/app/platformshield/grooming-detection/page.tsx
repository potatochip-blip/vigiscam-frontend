'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, ShieldAlert, Users, Clock, MessageSquare, Flag, Lock } from "lucide-react"

const cases = [
  { id: "GD-8821", type: "Minor Grooming Risk", platform: "Facebook Groups", accounts: 3, victims: 2, score: 97, time: "4m ago", status: "Critical" },
  { id: "GD-8820", type: "Romance Exploitation", platform: "Instagram DMs", accounts: 1, victims: 1, score: 89, time: "22m ago", status: "High" },
  { id: "GD-8819", type: "Gift Card Grooming", platform: "TikTok Comments", accounts: 5, victims: 4, score: 82, time: "1h ago", status: "High" },
  { id: "GD-8818", type: "Isolation Pattern", platform: "Discord", accounts: 2, victims: 3, score: 75, time: "2h ago", status: "Medium" },
  { id: "GD-8817", type: "Trust Building", platform: "Facebook Messenger", accounts: 1, victims: 1, score: 70, time: "3h ago", status: "Medium" },
  { id: "GD-8816", type: "Minor Grooming Risk", platform: "Telegram", accounts: 8, victims: 6, score: 95, time: "5h ago", status: "Critical" },
]

export default function GroomingDetectionPage() {
  return (
    <PageLayout role="platformshield" title="Grooming Detection" subtitle="AI-powered detection of child grooming patterns, exploitation scripts, and predatory account networks">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Active Cases", value: "312", color: "text-red-600" },
            { label: "Accounts Flagged", value: "47", color: "text-orange-600" },
            { label: "Suspended Today", value: "29", color: "text-green-600" },
            { label: "Law Enforcement Referrals", value: "8", color: "text-foreground" },
          ].map((s, i) => (
            <Card key={i} className="p-5">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-600" /> Active Grooming Alerts
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9 h-8 w-56" placeholder="Search cases..." />
                </div>
              </div>
              <div className="space-y-3">
                {cases.map((c, i) => (
                  <div key={i} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground">{c.id}</span>
                          <Badge className={`text-xs border-0 ${c.status === "Critical" ? "bg-red-100 text-red-700" : c.status === "High" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}>{c.status}</Badge>
                          <Badge className="text-xs bg-muted text-muted-foreground border-0">{c.platform}</Badge>
                        </div>
                        <p className="text-sm font-semibold text-foreground mb-1">{c.type}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.accounts} accounts</span>
                          <span className="flex items-center gap-1"><Flag className="h-3 w-3" />{c.victims} victims</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.time}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground mb-2">Risk: {c.score}</p>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-7 text-xs gap-1"><Lock className="h-3 w-3" />Suspend</Button>
                          <Button size="sm" className="h-7 text-xs">Escalate</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Grooming Pattern Types</h2>
              <div className="space-y-3">
                {[
                  { pattern: "Trust Building", count: 128, pct: 41 },
                  { pattern: "Isolation Tactics", count: 89, pct: 28 },
                  { pattern: "Gift/Financial Grooming", count: 62, pct: 20 },
                  { pattern: "Image Solicitation", count: 33, pct: 11 },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{p.pattern}</span>
                      <span className="font-semibold text-foreground">{p.count}</span>
                    </div>
                    <Progress value={p.pct} className="h-1.5" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Platform Distribution</h2>
              <div className="space-y-2">
                {[
                  { platform: "Facebook", pct: 38 },
                  { platform: "Instagram", pct: 24 },
                  { platform: "Discord", pct: 18 },
                  { platform: "TikTok", pct: 12 },
                  { platform: "Telegram", pct: 8 },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-20">{p.platform}</span>
                    <div className="flex-1 bg-muted rounded h-1.5">
                      <div className="bg-red-500 h-1.5 rounded" style={{ width: `${p.pct}%` }} />
                    </div>
                    <span className="font-semibold text-foreground w-8 text-right">{p.pct}%</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Script Keywords Detected
              </h2>
              <div className="flex flex-wrap gap-2">
                {["just between us", "don't tell your parents", "special friend", "gift card", "send me a photo", "you're so mature", "I trust you"].map((kw, i) => (
                  <Badge key={i} className="bg-red-50 text-red-700 border border-red-200 text-xs">{kw}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
