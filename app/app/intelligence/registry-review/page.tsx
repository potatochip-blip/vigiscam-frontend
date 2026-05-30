"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Database,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  mockRegistryReviewQueue,
  type RegistryReviewCandidate,
  intelligenceScamCategoryLabels,
  indicatorTypeLabels,
} from "@/lib/scam-intelligence-data"

const reviewStatusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700 border-gray-300",
  "in-review": "bg-purple-100 text-purple-800 border-purple-300",
  approved: "bg-green-100 text-green-800 border-green-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
}

export default function RegistryReviewPage() {
  const [queue, setQueue] = useState<RegistryReviewCandidate[]>(mockRegistryReviewQueue)
  const { toast } = useToast()

  const updateCandidate = (id: string, reviewStatus: RegistryReviewCandidate["reviewStatus"], publicSafe: boolean, label: string) => {
    setQueue((prev) =>
      prev.map((c) => c.id === id ? { ...c, reviewStatus, publicSafe } : c)
    )
    toast({ title: label, description: `Candidate ${id} has been updated.` })
  }

  const pending = queue.filter((c) => c.reviewStatus === "pending" || c.reviewStatus === "in-review")
  const resolved = queue.filter((c) => c.reviewStatus === "approved" || c.reviewStatus === "rejected")

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
                <Database className="h-5 w-5 text-primary" />
                Public-Safe Registry Review Queue
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Review and approve candidates before they are published in the public Scam Intelligence Registry. All victim data must be confirmed redacted before approval.
              </p>
            </div>

            {/* Policy Notice */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-md p-4">
              <Lock className="h-4 w-4 text-blue-700 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                <strong>Public-safe rule:</strong> Only approve candidates where (1) no victim personal data is present, (2) the indicator is verified scam infrastructure — not an unverified accusation, and (3) publication will not create legal risk or cause harm to a third party.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Pending", value: queue.filter((c) => c.reviewStatus === "pending").length, color: "text-gray-600" },
                { label: "In Review", value: queue.filter((c) => c.reviewStatus === "in-review").length, color: "text-purple-600" },
                { label: "Approved", value: queue.filter((c) => c.reviewStatus === "approved").length, color: "text-green-600" },
                { label: "Rejected", value: queue.filter((c) => c.reviewStatus === "rejected").length, color: "text-red-600" },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="pt-4">
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pending Review Table */}
            {pending.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Awaiting Review ({pending.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b bg-muted/30">
                        <tr>
                          {["Candidate ID", "Indicator Type", "Indicator Value", "Evidence", "Confidence", "Review Status", "Public Safe?", "Cluster", "Actions"].map((h) => (
                            <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {pending.map((candidate) => (
                          <tr key={candidate.id} className="border-b hover:bg-muted/20">
                            <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{candidate.id}</td>
                            <td className="px-4 py-3 text-xs">{indicatorTypeLabels[candidate.indicatorType]}</td>
                            <td className="px-4 py-3 font-mono text-xs max-w-[160px] truncate">{candidate.indicatorValue}</td>
                            <td className="px-4 py-3 text-xs font-medium">{candidate.evidenceCount}</td>
                            <td className="px-4 py-3">
                              <span className={`text-sm font-bold ${candidate.confidence >= 80 ? "text-green-700" : "text-amber-700"}`}>
                                {candidate.confidence}%
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className={`text-xs border ${reviewStatusColors[candidate.reviewStatus]}`}>
                                {candidate.reviewStatus.replace("-", " ")}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              {candidate.publicSafe ? (
                                <span className="flex items-center gap-1 text-xs text-green-700 font-medium">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Yes
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs text-amber-700 font-medium">
                                  <AlertTriangle className="h-3.5 w-3.5" />
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-xs text-muted-foreground max-w-[120px] truncate">
                              {candidate.linkedCluster ?? "—"}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1.5">
                                <Button
                                  size="sm"
                                  className="gap-1 text-xs h-7 px-2"
                                  onClick={() => updateCandidate(candidate.id, "approved", true, "Approved for public registry")}
                                >
                                  <CheckCircle2 className="h-3 w-3" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-1 text-xs h-7 px-2 bg-transparent"
                                  onClick={() => updateCandidate(candidate.id, "rejected", false, "Candidate rejected")}
                                >
                                  <XCircle className="h-3 w-3" />
                                  Reject
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Resolved Table */}
            {resolved.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-muted-foreground">Resolved ({resolved.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b bg-muted/30">
                        <tr>
                          {["Candidate ID", "Indicator Value", "Evidence", "Confidence", "Status", "Public Safe?"].map((h) => (
                            <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {resolved.map((candidate) => (
                          <tr key={candidate.id} className="border-b hover:bg-muted/20 opacity-75">
                            <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{candidate.id}</td>
                            <td className="px-4 py-3 font-mono text-xs">{candidate.indicatorValue}</td>
                            <td className="px-4 py-3 text-xs">{candidate.evidenceCount}</td>
                            <td className="px-4 py-3 text-xs font-bold">{candidate.confidence}%</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className={`text-xs border ${reviewStatusColors[candidate.reviewStatus]}`}>
                                {candidate.reviewStatus}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-xs">
                              {candidate.publicSafe ? "Yes" : "No"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
