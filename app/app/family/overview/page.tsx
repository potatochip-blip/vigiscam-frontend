'use client'

import useSWR from "swr"
import Link from "next/link"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Heart, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type GuardianLink = {
  id: string
  protectedName?: string
  protectedUserName?: string
  relationship?: string | null
  status?: string
  riskLevel?: string
}

async function fetchGuarded(): Promise<GuardianLink[]> {
  const { data, error, response } = await backend.GET("/api/v1/guardianship/as-guardian")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  const d = data as unknown
  if (Array.isArray(d)) return d as GuardianLink[]
  // Some shapes wrap the list — be defensive.
  const obj = (d ?? {}) as { links?: GuardianLink[]; protected?: GuardianLink[] }
  return obj.links ?? obj.protected ?? []
}

export default function FamilyOverviewPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(isAuthenticated ? "family-guarded" : null, fetchGuarded, { revalidateOnFocus: false })
  const guarded = data ?? []

  return (
    <PageLayout role="family" title="Family Guardian" subtitle="Protecting your loved ones from scams">
      <div className="max-w-7xl mx-auto space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load your protected loved ones.</div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="p-5"><Users className="h-5 w-5 text-primary mb-2" /><p className="text-xs text-muted-foreground mb-1">Protected Loved Ones</p><p className="text-xl font-bold">{guarded.length}</p></Card>
              <Card className="p-5"><Heart className="h-5 w-5 text-pink-600 mb-2" /><p className="text-xs text-muted-foreground mb-1">Active Links</p><p className="text-xl font-bold">{guarded.filter((g) => g.status === "ACTIVE" || !g.status).length}</p></Card>
            </div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Protected Loved Ones</h2>
                <Button size="sm" asChild><Link href="/app/family/protected-loved-ones">Manage</Link></Button>
              </div>
              {guarded.length === 0 ? (
                <p className="text-sm text-muted-foreground">You aren&apos;t guarding anyone yet. Invite a loved one to start protecting them.</p>
              ) : (
                <div className="space-y-3">
                  {guarded.map((g) => (
                    <div key={g.id} className="flex items-center justify-between p-3 rounded-md border bg-muted/30 gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{g.protectedName ?? g.protectedUserName ?? "Loved one"}</p>
                        <p className="text-xs text-muted-foreground">{g.relationship ?? "family"}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {g.riskLevel && <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">{g.riskLevel}</Badge>}
                        <Badge variant="outline" className="text-xs">{g.status ?? "ACTIVE"}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </PageLayout>
  )
}
