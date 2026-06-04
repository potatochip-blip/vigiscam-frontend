"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ShieldOff,
  Lock,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Pause,
  Eye,
  EyeOff,
  CalendarDays,
  ArrowRight,
  Loader2,
} from "lucide-react"
import { useTakedowns } from "@/lib/hooks"
import type { TakedownCurrentStatus, TakedownRecord } from "@/lib/types"

const statusConfig: Record<TakedownCurrentStatus, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  "under-review": { label: "Under Review", color: "bg-blue-100 text-blue-800", icon: Clock },
  "action-filed": { label: "Action Filed", color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
  "confirmed": { label: "Confirmed Takedown", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  "partial": { label: "Partial", color: "bg-orange-100 text-orange-800", icon: Pause },
  "stalled": { label: "Stalled", color: "bg-red-100 text-red-800", icon: ShieldOff },
}

function StatusChip({ status }: { status: TakedownCurrentStatus }) {
  const cfg = statusConfig[status]
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  )
}

function providerTypeLabel(t: string): string {
  return t
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function targetLabel(r: TakedownRecord): string {
  return r.providerReference ?? r.providerName
}

export default function AdminTakedownStatusPage() {
  const { data, isLoading, error } = useTakedowns({ limit: 200 })
  const records: TakedownRecord[] = data?.data ?? []

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = records.find((r) => r.id === selectedId) ?? records[0] ?? null

  const counts = (Object.keys(statusConfig) as TakedownCurrentStatus[]).reduce((acc, key) => {
    acc[key] = records.filter((r) => r.currentStatus === key).length
    return acc
  }, {} as Record<TakedownCurrentStatus, number>)

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
                  <span className="text-xs text-yellow-400 font-medium uppercase tracking-wider">Internal — Disruption Operations</span>
                </div>
                <h1 className="text-3xl font-bold mb-1">Takedown Status Tracker</h1>
                <p className="text-slate-300 text-sm">
                  Domains, URLs, accounts, phone numbers, and wallets under active disruption review. Tracks action history and public display eligibility.
                </p>
              </div>
              <Link href="/admin/public-registry">
                <Button variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-700 gap-2 text-sm">
                  Public Registry
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Status summary */}
        <section className="bg-white border-b py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4">
              {(Object.keys(statusConfig) as TakedownCurrentStatus[]).map((status) => {
                const cfg = statusConfig[status]
                const Icon = cfg.icon
                return (
                  <div key={status} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${cfg.color}`}>
                    <Icon className="h-3.5 w-3.5" />
                    {cfg.label}: <strong>{counts[status]}</strong>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main split panel */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 py-20 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading takedown records…
              </div>
            ) : error ? (
              <div className="flex items-center justify-center gap-2 py-20 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Could not load takedown records. You may need to sign in with a reviewer account.
              </div>
            ) : records.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
                <ShieldOff className="h-8 w-8" />
                <p className="font-medium">No takedown requests</p>
                <p className="text-sm">Disruption actions filed against scam infrastructure will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1">All Records</p>
                  {records.map((record) => (
                    <button
                      key={record.id}
                      onClick={() => setSelectedId(record.id)}
                      className={`w-full text-left rounded-lg border p-3 transition-colors ${
                        selected?.id === record.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <p className="font-mono text-xs text-muted-foreground">{record.id.slice(0, 8)}</p>
                      <p className="font-medium text-sm truncate mt-0.5">{targetLabel(record)}</p>
                      <p className="text-xs text-muted-foreground">{providerTypeLabel(record.providerType)}</p>
                      <div className="flex items-center justify-between mt-2 gap-2">
                        <StatusChip status={record.currentStatus} />
                        {record.publicDisplayEligible
                          ? <span className="inline-flex items-center gap-1 text-xs text-green-700"><Eye className="h-3 w-3" /> Public</span>
                          : <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><EyeOff className="h-3 w-3" /> Private</span>}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Detail */}
                <div className="lg:col-span-2 space-y-5">
                  {selected && (
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-mono text-muted-foreground">{selected.id.slice(0, 8)}</p>
                            <CardTitle className="text-xl mt-1 font-mono">{targetLabel(selected)}</CardTitle>
                            <div className="flex gap-2 mt-2 flex-wrap items-center">
                              <Badge variant="outline">{providerTypeLabel(selected.providerType)}</Badge>
                              <span className="text-xs text-muted-foreground">{selected.providerName}</span>
                            </div>
                          </div>
                          <StatusChip status={selected.currentStatus} />
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-5">
                        {/* Key metadata */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div className="rounded-md bg-muted p-3">
                            <p className="text-xs text-muted-foreground mb-1">Linked Registry Record</p>
                            <p className="text-sm font-mono font-medium">{selected.registryEntryId.slice(0, 8)}</p>
                          </div>
                          <div className="rounded-md bg-muted p-3">
                            <p className="text-xs text-muted-foreground mb-1">Action Date</p>
                            <p className="text-sm font-medium">
                              {selected.submittedAt ? new Date(selected.submittedAt).toLocaleDateString() : "Pending"}
                            </p>
                          </div>
                          <div className="rounded-md bg-muted p-3">
                            <p className="text-xs text-muted-foreground mb-1">Public Display Eligible</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {selected.publicDisplayEligible
                                ? <><Eye className="h-4 w-4 text-green-600" /><span className="text-sm font-medium text-green-700">Yes</span></>
                                : <><EyeOff className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium text-muted-foreground">Not yet</span></>}
                            </div>
                          </div>
                        </div>

                        {selected.details && (
                          <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                            <strong className="text-foreground">Request details:</strong> {selected.details}
                          </div>
                        )}

                        {selected.outcomeNotes && (
                          <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
                            <strong>Analyst note:</strong> {selected.outcomeNotes}
                          </div>
                        )}

                        <Separator />

                        {/* Status history */}
                        <div>
                          <p className="text-sm font-semibold mb-4">Status History</p>
                          <ol className="relative border-l border-muted-foreground/20 space-y-5 ml-2">
                            {selected.statusHistory.map((entry, i) => {
                              const isLast = i === selected.statusHistory.length - 1
                              return (
                                <li key={i} className="ml-5">
                                  <span className={`absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full ring-2 ring-background ${
                                    isLast ? "bg-primary" : "bg-muted-foreground/30"
                                  }`} />
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</span>
                                    <StatusChip status={entry.status} />
                                  </div>
                                  <p className="text-sm text-foreground">{entry.note}</p>
                                </li>
                              )
                            })}
                          </ol>
                        </div>

                        <Separator />

                        {/* Public eligibility note */}
                        {!selected.publicDisplayEligible ? (
                          <div className="flex items-start gap-2 rounded-md bg-muted px-3 py-2.5 text-sm text-muted-foreground">
                            <EyeOff className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            This record is not yet eligible for public display. It will remain private until the linked registry record is published and the takedown action is confirmed.
                          </div>
                        ) : (
                          <div className="flex items-start gap-2 rounded-md bg-green-50 border border-green-200 px-3 py-2.5 text-sm text-green-800">
                            <Eye className="h-4 w-4 flex-shrink-0 mt-0.5 text-green-700" />
                            This record is eligible for public display on the Verified Takedowns page.
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
