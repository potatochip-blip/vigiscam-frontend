"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Inbox,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Lock,
  ShieldCheck,
  Loader2,
} from "lucide-react"
import {
  indicatorTypeLabels,
  scamFamilyLabels,
} from "@/lib/scam-intelligence-data"
import { useSubmissions } from "@/lib/hooks"
import type { Submission, SubmissionStatus } from "@/lib/types"

const statusConfig: Record<SubmissionStatus, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  "new": { label: "New", color: "bg-blue-100 text-blue-800", icon: Inbox },
  "under-review": { label: "Under Review", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  "needs-more-evidence": { label: "Needs Evidence", color: "bg-orange-100 text-orange-800", icon: AlertTriangle },
  "rejected": { label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
  "approved-for-verification": { label: "Approved for Verification", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
}

const submitterTypeColors: Record<string, string> = {
  client: "bg-primary/10 text-primary",
  partner: "bg-purple-100 text-purple-800",
  anonymous: "bg-slate-100 text-slate-700",
}

function StatusBadge({ status }: { status: SubmissionStatus }) {
  const cfg = statusConfig[status]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  )
}

const statusCounts = (submissions: Submission[]) => {
  const counts: Record<SubmissionStatus, number> = {
    "new": 0, "under-review": 0, "needs-more-evidence": 0, "rejected": 0, "approved-for-verification": 0,
  }
  submissions.forEach((s) => counts[s.status]++)
  return counts
}

export default function IntelligenceSubmissionsPage() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<SubmissionStatus | "all">("all")
  const [filterType, setFilterType] = useState("all")

  const { data, isLoading, error } = useSubmissions({ limit: 200 })
  const submissions: Submission[] = useMemo(() => data?.data ?? [], [data])

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      const matchSearch =
        !search ||
        s.indicatorValue.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
      const matchStatus = filterStatus === "all" || s.status === filterStatus
      const matchType = filterType === "all" || s.indicatorType === filterType
      return matchSearch && matchStatus && matchType
    })
  }, [submissions, search, filterStatus, filterType])

  const counts = statusCounts(submissions)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-medium uppercase tracking-wider">Internal — Not Publicly Visible</span>
                </div>
                <h1 className="text-3xl font-bold mb-1">Intelligence Submissions</h1>
                <p className="text-slate-300 text-sm">All incoming client-reported scam indicators. Raw reports are private and never publicly exposed.</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/admin/verification-queue">
                  <Button variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-700 gap-2 text-sm">
                    Verification Queue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Status Summary */}
        <section className="bg-white border-b py-5">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4">
              {(Object.keys(statusConfig) as SubmissionStatus[]).map((status) => {
                const cfg = statusConfig[status]
                const Icon = cfg.icon
                return (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(filterStatus === status ? "all" : status)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-colors ${
                      filterStatus === status ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{cfg.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${cfg.color}`}>{counts[status]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Filters + Table */}
        <section className="py-8">
          <div className="container mx-auto px-4 space-y-4">
            {/* Search & Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search by indicator, ID, or description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Indicator type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {(["phone", "email", "domain", "url", "wallet", "social-profile", "fake-support-page", "fake-company"] as const).map((t) => (
                    <SelectItem key={t} value={t}>{indicatorTypeLabels[t]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">{filtered.length} submission{filtered.length !== 1 ? "s" : ""}</span>
            </div>

            {/* Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">ID</TableHead>
                      <TableHead>Indicator</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Scam Family</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Evidence</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" /> Loading submissions…
                          </span>
                        </TableCell>
                      </TableRow>
                    )}
                    {!isLoading && error && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-12 text-red-600">
                          Could not load submissions. You may need to sign in with a reviewer account.
                        </TableCell>
                      </TableRow>
                    )}
                    {!isLoading && !error && filtered.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                          No submissions match the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                    {filtered.map((sub) => (
                      <TableRow key={sub.id} className="hover:bg-muted/40">
                        <TableCell className="font-mono text-xs">{sub.id}</TableCell>
                        <TableCell>
                          <p className="font-mono text-sm font-medium">{sub.indicatorValue}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{sub.description}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{indicatorTypeLabels[sub.indicatorType as keyof typeof indicatorTypeLabels] ?? sub.indicatorType}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{scamFamilyLabels[sub.suspectedScamFamily as keyof typeof scamFamilyLabels] ?? sub.suspectedScamFamily}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{new Date(sub.submittedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${submitterTypeColors[sub.submitterType]}`}>
                            {sub.submitterType}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm font-medium">{sub.evidenceCount}</TableCell>
                        <TableCell><StatusBadge status={sub.status} /></TableCell>
                        <TableCell>
                          {sub.linkedVerificationId && (
                            <Link href="/admin/verification-queue">
                              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs gap-1">
                                Queue <ArrowRight className="h-3 w-3" />
                              </Button>
                            </Link>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Privacy reminder */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-md px-4 py-2.5">
              <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
              These records are internal only. No submission data is publicly accessible until it passes independent verification and a public-safe review gate.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
