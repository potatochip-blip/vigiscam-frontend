"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Radio,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Archive,
  Star,
  Plus,
  AlertTriangle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  mockScamSignals,
  mockEvidenceEvents,
  type ScamSignal,
  signalStatusLabels,
  signalSourceLabels,
  intelligenceScamCategoryLabels,
  type SignalStatus,
  type IntelligenceScamCategory,
} from "@/lib/scam-intelligence-data"

const statusColors: Record<string, string> = {
  "unverified-report": "bg-gray-100 text-gray-700 border-gray-300",
  "suspicious-signal": "bg-amber-100 text-amber-800 border-amber-300",
  "pattern-match": "bg-blue-100 text-blue-800 border-blue-300",
  "under-review": "bg-purple-100 text-purple-800 border-purple-300",
  "high-risk-indicator": "bg-orange-100 text-orange-800 border-orange-300",
  "verified-scam-intelligence": "bg-green-100 text-green-800 border-green-300",
  "public-safe-alert": "bg-teal-100 text-teal-800 border-teal-300",
  "archived": "bg-slate-100 text-slate-600 border-slate-300",
}

export default function IntelligenceSignalsPage() {
  const [signals, setSignals] = useState<ScamSignal[]>(mockScamSignals)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<SignalStatus | "all">("all")
  const [categoryFilter, setCategoryFilter] = useState<IntelligenceScamCategory | "all">("all")
  const [selectedSignal, setSelectedSignal] = useState<ScamSignal | null>(null)
  const { toast } = useToast()

  const filtered = signals.filter((s) => {
    const matchSearch =
      !search ||
      s.indicator.toLowerCase().includes(search.toLowerCase()) ||
      s.geography.toLowerCase().includes(search.toLowerCase()) ||
      (s.linkedCluster ?? "").toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || s.status === statusFilter
    const matchCat = categoryFilter === "all" || s.category === categoryFilter
    return matchSearch && matchStatus && matchCat
  })

  const updateStatus = (id: string, status: SignalStatus, label: string) => {
    setSignals((prev) => prev.map((s) => s.id === id ? { ...s, status } : s))
    toast({ title: label, description: `Signal ${id} has been updated.` })
    setSelectedSignal(null)
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
                <Radio className="h-5 w-5 text-primary" />
                Live Scam Signal Feed
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                All incoming scam signals — review, promote, archive, and route to registry.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search indicator, geography, cluster..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
                <SelectTrigger className="w-52">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.entries(signalStatusLabels).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as any)}>
                <SelectTrigger className="w-52">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(intelligenceScamCategoryLabels).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => { setSearch(""); setStatusFilter("all"); setCategoryFilter("all") }} className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Clear
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">Showing {filtered.length} of {signals.length} signals</p>

            {/* Signal Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b bg-muted/30">
                      <tr>
                        {["ID", "Source", "Category", "Indicator", "Confidence", "Status", "Last Seen", "Geography", "Action"].map((h) => (
                          <th key={h} className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((signal) => (
                        <tr key={signal.id} className="border-b hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{signal.id}</td>
                          <td className="px-4 py-3 text-xs">{signalSourceLabels[signal.source]}</td>
                          <td className="px-4 py-3 text-xs">{intelligenceScamCategoryLabels[signal.category]}</td>
                          <td className="px-4 py-3">
                            <span className="font-mono text-xs truncate max-w-[140px] block">{signal.indicator}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-sm font-bold ${signal.confidence >= 80 ? "text-red-600" : signal.confidence >= 60 ? "text-amber-600" : "text-muted-foreground"}`}>
                              {signal.confidence}%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={`text-xs border ${statusColors[signal.status]}`}>
                              {signalStatusLabels[signal.status]}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">
                            {new Date(signal.lastSeen).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground max-w-[120px] truncate">{signal.geography}</td>
                          <td className="px-4 py-3">
                            <Button size="sm" variant="ghost" className="gap-1 text-xs" onClick={() => setSelectedSignal(signal)}>
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filtered.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground text-sm">No signals match your filters.</div>
                  )}
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>

      {/* Signal Detail Modal */}
      <Dialog open={!!selectedSignal} onOpenChange={() => setSelectedSignal(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-primary" />
              Signal Detail
            </DialogTitle>
            <DialogDescription>
              {selectedSignal?.id} — {selectedSignal && signalSourceLabels[selectedSignal.source]}
            </DialogDescription>
          </DialogHeader>
          {selectedSignal && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Indicator</p>
                <p className="font-mono text-sm font-medium break-all">{selectedSignal.indicator}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-medium mt-0.5">{intelligenceScamCategoryLabels[selectedSignal.category]}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="font-medium mt-0.5">{signalSourceLabels[selectedSignal.source]}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="font-bold mt-0.5 text-lg">{selectedSignal.confidence}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Risk Score</p>
                  <p className={`font-bold mt-0.5 text-lg ${selectedSignal.riskScore >= 80 ? "text-red-600" : "text-amber-600"}`}>{selectedSignal.riskScore}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Geography</p>
                  <p className="font-medium mt-0.5">{selectedSignal.geography}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Public Safe</p>
                  <p className="font-medium mt-0.5">{selectedSignal.publicSafe ? "Yes" : "Pending review"}</p>
                </div>
              </div>
              {selectedSignal.linkedCluster && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Linked Cluster</p>
                  <Badge variant="outline">{selectedSignal.linkedCluster}</Badge>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Evidence Summary</p>
                <p className="text-sm text-foreground bg-muted/40 rounded p-2">{selectedSignal.evidenceSummary}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <Badge variant="outline" className={`border ${statusColors[selectedSignal.status]}`}>
                  {signalStatusLabels[selectedSignal.status]}
                </Badge>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <Button size="sm" variant="outline" className="gap-1.5 bg-transparent" onClick={() => updateStatus(selectedSignal.id, "under-review", "Marked for review")}>
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Mark for Review
                </Button>
                <Button size="sm" className="gap-1.5" onClick={() => updateStatus(selectedSignal.id, "verified-scam-intelligence", "Promoted to verified")}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Promote to Verified
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 bg-transparent" onClick={() => updateStatus(selectedSignal.id, "high-risk-indicator", "Added to watchlist")}>
                  <Star className="h-3.5 w-3.5" />
                  Add to Watchlist
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 bg-transparent" onClick={() => updateStatus(selectedSignal.id, "archived", "Signal archived")}>
                  <Archive className="h-3.5 w-3.5" />
                  Archive
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 col-span-2 bg-transparent" onClick={() => {
                  toast({ title: "Registry entry created", description: `Candidate created for ${selectedSignal.id}` })
                  setSelectedSignal(null)
                }}>
                  <Plus className="h-3.5 w-3.5" />
                  Create Registry Entry
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}
