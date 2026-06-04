'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Loader2, AlertTriangle } from "lucide-react"
import { useAdminScamCorpus } from "@/lib/hooks"

type CorpusRow = {
  id: string
  code?: string
  name?: string
  description?: string | null
  riskWeight?: number
  active?: boolean
  registryEntries?: number
}

export default function AdminScamCorpusPage() {
  const { data, isLoading, error } = useAdminScamCorpus()
  const categories = (data ?? []) as CorpusRow[]
  const totalEntries = categories.reduce((sum, c) => sum + (c.registryEntries ?? 0), 0)
  const activeCount = categories.filter((c) => c.active).length

  return (
    <PageLayout role="admin" title="Scam Corpus Database" subtitle="Central repository of known fraud patterns and signatures">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 py-16 justify-center text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading corpus…
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 py-16 justify-center text-red-600">
            <AlertTriangle className="h-5 w-5" /> Could not load the scam corpus (reviewer access required).
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-4 text-center">
              <Card className="p-4"><p className="text-xs text-muted-foreground">Categories</p><p className="text-2xl font-bold">{categories.length}</p></Card>
              <Card className="p-4"><p className="text-xs text-muted-foreground">Active</p><p className="text-2xl font-bold">{activeCount}</p></Card>
              <Card className="p-4"><p className="text-xs text-muted-foreground">Registry Entries</p><p className="text-2xl font-bold">{totalEntries.toLocaleString()}</p></Card>
            </div>
            <Card className="p-6">
              <h3 className="text-base font-bold text-foreground mb-4">Scam Categories</h3>
              {categories.length === 0 ? (
                <p className="text-sm text-muted-foreground flex items-center gap-2"><Database className="h-4 w-4" /> No categories seeded yet.</p>
              ) : (
                <div className="space-y-2">
                  {categories.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 bg-muted/40 rounded gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{c.name ?? c.code}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{c.description ?? c.code}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {typeof c.riskWeight === "number" && <Badge variant="outline">risk {c.riskWeight}</Badge>}
                        <Badge variant="outline">{c.registryEntries ?? 0} entries</Badge>
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
