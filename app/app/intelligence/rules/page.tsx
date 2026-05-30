"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, CheckCircle2, Clock, Archive } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  mockDetectionRules,
  intelligenceScamCategoryLabels,
} from "@/lib/scam-intelligence-data"

const triggerTypeLabels: Record<string, string> = {
  "phrase-match": "Phrase Match",
  "url-pattern": "URL Pattern",
  behavioral: "Behavioral",
  "network-graph": "Network Graph",
  acoustic: "Acoustic",
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 border-green-300",
  testing: "bg-amber-100 text-amber-800 border-amber-300",
  deprecated: "bg-slate-100 text-slate-600 border-slate-300",
}

export default function DetectionRulesPage() {
  const { toast } = useToast()

  const handleAction = (ruleId: string, action: string) => {
    toast({ title: action, description: `Rule ${ruleId} updated.` })
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
                <Zap className="h-5 w-5 text-primary" />
                Detection Rule Updates
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Rules generated and updated from verified scam intelligence clusters and signals.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Active Rules", value: mockDetectionRules.filter((r) => r.status === "active").length, color: "text-green-600" },
                { label: "In Testing", value: mockDetectionRules.filter((r) => r.status === "testing").length, color: "text-amber-600" },
                { label: "Deprecated", value: mockDetectionRules.filter((r) => r.status === "deprecated").length, color: "text-muted-foreground" },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="pt-4">
                    <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Rules Table */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">All Detection Rules ({mockDetectionRules.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b bg-muted/30">
                      <tr>
                        {["Rule ID", "Rule Name", "Category", "Trigger Type", "Updated From", "Status", "Last Updated", "Risk Weight", "Actions"].map((h) => (
                          <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockDetectionRules.map((rule) => (
                        <tr key={rule.id} className="border-b hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{rule.id}</td>
                          <td className="px-4 py-3 text-sm font-medium max-w-[200px]">{rule.name}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{intelligenceScamCategoryLabels[rule.category]}</td>
                          <td className="px-4 py-3">
                            <Badge variant="secondary" className="text-xs">{triggerTypeLabels[rule.triggerType]}</Badge>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{rule.updatedFrom}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={`text-xs border ${statusColors[rule.status]}`}>
                              {rule.status.charAt(0).toUpperCase() + rule.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(rule.lastUpdated).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <div className="h-1.5 w-14 rounded-full bg-muted overflow-hidden">
                                <div
                                  className={`h-1.5 rounded-full ${rule.riskWeight >= 85 ? "bg-red-500" : rule.riskWeight >= 70 ? "bg-amber-500" : "bg-blue-500"}`}
                                  style={{ width: `${rule.riskWeight}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">{rule.riskWeight}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {rule.status === "testing" && (
                                <Button size="sm" className="gap-1 text-xs h-7 px-2"
                                  onClick={() => handleAction(rule.id, "Rule activated")}>
                                  <CheckCircle2 className="h-3 w-3" />
                                  Activate
                                </Button>
                              )}
                              {rule.status === "active" && (
                                <Button size="sm" variant="outline" className="gap-1 text-xs h-7 px-2 bg-transparent"
                                  onClick={() => handleAction(rule.id, "Rule deprecated")}>
                                  <Archive className="h-3 w-3" />
                                  Deprecate
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
