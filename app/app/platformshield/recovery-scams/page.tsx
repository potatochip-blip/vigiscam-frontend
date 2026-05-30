'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, DollarSign, Clock, Eye, Ban, CheckCircle2, ExternalLink } from "lucide-react"

const recoveryScams = [
  { id: "RS-2847", victimHandle: "@jenny_crypto", scammer: "CryptoRecoveryPro", platform: "Telegram", status: "Active", lossReported: "$12,400", detectedAt: "2 hours ago", confidence: 94 },
  { id: "RS-2846", victimHandle: "mike.trader", scammer: "FundsRetrievalExpert", platform: "Instagram", status: "Active", lossReported: "$8,750", detectedAt: "5 hours ago", confidence: 89 },
  { id: "RS-2845", victimHandle: "@sarah_investor", scammer: "LegalCryptoHelp", platform: "Twitter/X", status: "Investigating", lossReported: "$45,000", detectedAt: "8 hours ago", confidence: 91 },
  { id: "RS-2844", victimHandle: "david.m2024", scammer: "RecoverYourFunds", platform: "Facebook", status: "Blocked", lossReported: "$6,200", detectedAt: "1 day ago", confidence: 97 },
  { id: "RS-2843", victimHandle: "@crypto_jane", scammer: "TrustWalletSupport", platform: "Discord", status: "Blocked", lossReported: "$22,100", detectedAt: "1 day ago", confidence: 95 },
]

export default function RecoveryScamsPage() {
  return (
    <PageLayout role="platformshield" title="Recovery Scams" subtitle="Detect and block fake recovery service operators targeting scam victims">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Active Recovery Scams", value: "47", change: "+12 today", icon: AlertTriangle, color: "text-red-500" },
          { label: "Victims Protected", value: "284", change: "This week", icon: Shield, color: "text-green-500" },
          { label: "Prevented Losses", value: "$1.2M", change: "This month", icon: DollarSign, color: "text-blue-500" },
          { label: "Avg Detection Time", value: "4.2 min", change: "-18% faster", icon: Clock, color: "text-amber-500" },
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

      {/* Scam List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-foreground">Detected Recovery Scam Operations</h2>
          <Button size="sm">Export Report</Button>
        </div>

        <div className="space-y-4">
          {recoveryScams.map((scam) => (
            <div key={scam.id} className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{scam.scammer}</p>
                    <Badge variant="outline" className="text-xs">{scam.platform}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Targeting: {scam.victimHandle} | Loss: {scam.lossReported}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-muted-foreground">{scam.detectedAt}</p>
                  <p className="text-xs text-muted-foreground">Confidence: {scam.confidence}%</p>
                </div>
                <Badge className={scam.status === "Active" ? "bg-red-100 text-red-700" : scam.status === "Blocked" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                  {scam.status}
                </Badge>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Ban className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pattern Analysis */}
      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Common Recovery Scam Patterns</h3>
          <div className="space-y-3">
            {[
              { pattern: "Fake law firm impersonation", count: 34, trend: "+12%" },
              { pattern: "Cryptocurrency recovery expert", count: 28, trend: "+8%" },
              { pattern: "Government agency impersonation", count: 19, trend: "-3%" },
              { pattern: "Hacker for hire services", count: 15, trend: "+22%" },
              { pattern: "Class action lawsuit bait", count: 11, trend: "+5%" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{item.pattern}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">{item.count}</span>
                  <span className={`text-xs ${item.trend.startsWith("+") ? "text-red-500" : "text-green-500"}`}>{item.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Platform Distribution</h3>
          <div className="space-y-3">
            {[
              { platform: "Telegram", percentage: 38 },
              { platform: "Instagram", percentage: 24 },
              { platform: "Twitter/X", percentage: 18 },
              { platform: "Facebook", percentage: 12 },
              { platform: "Discord", percentage: 8 },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{item.platform}</span>
                  <span className="text-muted-foreground">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
