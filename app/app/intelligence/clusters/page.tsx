"use client"

import useSWR from "swr"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, Loader2, AlertTriangle } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

type Cluster = {
  id: string
  label?: string
  category?: string | null
  matchType?: string
  status?: string
  signalCount?: number
  confidenceScore?: number
  firstSeen?: string
  lastSeen?: string
}

async function fetchClusters(): Promise<Cluster[]> {
  const { data, error, response } = await backend.GET("/api/v1/intelligence/clusters")
  if (error || !response.ok) throw new Error(`Failed to load clusters (${response.status})`)
  return (data as unknown as Cluster[]) ?? []
}

export default function IntelligenceClustersPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(
    isAuthenticated ? "intel-clusters" : null,
    fetchClusters,
    { revalidateOnFocus: false },
  )
  const clusters = data ?? []

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto space-y-5">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Network className="h-5 w-5 text-primary" />
                Scam Pattern Clusters
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Groups of related scam signals sharing infrastructure, scripts, or behavioral patterns.
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading clusters…</div>
            ) : error ? (
              <div className="flex items-center gap-2 py-16 justify-center text-red-600"><AlertTriangle className="h-5 w-5" /> Could not load clusters (reviewer access required).</div>
            ) : clusters.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground"><Network className="h-8 w-8" /><p className="font-medium">No clusters formed yet</p></div>
            ) : (
              <div className="space-y-5">
                {clusters.map((cluster) => (
                  <Card key={cluster.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <CardTitle className="text-base">{cluster.label ?? "Cluster"}</CardTitle>
                            {cluster.category && <Badge variant="outline" className="text-xs">{cluster.category}</Badge>}
                            {cluster.matchType && <Badge variant="outline" className="text-xs">{cluster.matchType.replace(/_/g, " ").toLowerCase()}</Badge>}
                            {cluster.status && cluster.status !== "ACTIVE" && <Badge className="text-xs bg-muted text-muted-foreground border-0">{cluster.status}</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {cluster.lastSeen ? `last active ${new Date(cluster.lastSeen).toLocaleDateString()}` : ""}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-2xl font-bold text-primary">{cluster.confidenceScore ?? 0}%</div>
                          <div className="text-xs text-muted-foreground">confidence</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="bg-muted/40 rounded-md p-2.5 text-center">
                          <div className="text-lg font-bold">{cluster.signalCount ?? 0}</div>
                          <div className="text-xs text-muted-foreground">Linked signals</div>
                        </div>
                        <div className="bg-muted/40 rounded-md p-2.5 text-center">
                          <div className="text-lg font-bold">{cluster.confidenceScore ?? 0}</div>
                          <div className="text-xs text-muted-foreground">Confidence score</div>
                        </div>
                        <div className="bg-muted/40 rounded-md p-2.5 text-center">
                          <div className="text-sm font-bold">{cluster.firstSeen ? new Date(cluster.firstSeen).toLocaleDateString() : "—"}</div>
                          <div className="text-xs text-muted-foreground">First seen</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
