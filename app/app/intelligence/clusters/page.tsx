"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Network,
  Phone,
  Mail,
  Globe,
  Wallet,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  mockScamClusters,
  intelligenceScamCategoryLabels,
} from "@/lib/scam-intelligence-data"

export default function IntelligenceClustersPage() {
  const { toast } = useToast()

  const handleAction = (clusterName: string, action: string) => {
    toast({ title: action, description: `Action applied to: ${clusterName}` })
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto space-y-5">

            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Network className="h-5 w-5 text-primary" />
                Scam Pattern Clusters
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Groups of related scam signals sharing infrastructure, scripts, or behavioral patterns.
              </p>
            </div>

            {/* Cluster Cards */}
            <div className="space-y-5">
              {mockScamClusters.map((cluster) => (
                <Card key={cluster.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-base">{cluster.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {intelligenceScamCategoryLabels[cluster.category]}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{cluster.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-2xl font-bold text-primary">{cluster.confidenceLevel}%</div>
                        <div className="text-xs text-muted-foreground">confidence</div>
                        <div className={`flex items-center gap-1 justify-end mt-1 text-xs font-semibold ${
                          cluster.trend === "rising" ? "text-red-600" : cluster.trend === "declining" ? "text-green-600" : "text-amber-600"
                        }`}>
                          {cluster.trend === "rising" ? <TrendingUp className="h-3.5 w-3.5" /> : cluster.trend === "declining" ? <TrendingDown className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                          {cluster.trend.charAt(0).toUpperCase() + cluster.trend.slice(1)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Indicator Counts */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                      {[
                        { icon: Phone, label: "Phone Numbers", count: cluster.linkedPhones },
                        { icon: Mail, label: "Emails", count: cluster.linkedEmails },
                        { icon: Globe, label: "Domains", count: cluster.linkedDomains },
                        { icon: Wallet, label: "Wallets", count: cluster.linkedWallets },
                        { icon: FileText, label: "Scripts", count: cluster.matchingScripts },
                      ].map(({ icon: Icon, label, count }) => (
                        <div key={label} className="bg-muted/40 rounded-md p-2.5 text-center">
                          <Icon className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                          <div className="text-lg font-bold">{count}</div>
                          <div className="text-xs text-muted-foreground leading-tight">{label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Recommended Action */}
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
                      <p className="text-xs font-semibold text-amber-900 mb-1">Recommended Action</p>
                      <p className="text-xs text-amber-800">{cluster.recommendedAction}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs bg-transparent"
                        onClick={() => handleAction(cluster.name, "Takedown filed")}>
                        File Takedown Request
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs bg-transparent"
                        onClick={() => handleAction(cluster.name, "Promoted to verified intelligence")}>
                        Promote to Verified
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs bg-transparent"
                        onClick={() => handleAction(cluster.name, "Shared with partner network")}>
                        Share with Partners
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs bg-transparent"
                        onClick={() => handleAction(cluster.name, "Alert published")}>
                        Publish Public Alert
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
