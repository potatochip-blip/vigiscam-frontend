'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Upload, Search } from "lucide-react"

export default function AdminScamCorpusPage() {
  return (
    <PageLayout role="admin" title="Scam Corpus Database" subtitle="Central repository of known fraud patterns and signatures">
      <div className="space-y-6">
        <Button className="gap-2"><Upload className="h-4 w-4" /> Import Samples</Button>
        <div className="grid lg:grid-cols-3 gap-4 text-center">
          <Card className="p-4"><p className="text-xs text-muted-foreground">Total Samples</p><p className="text-2xl font-bold">127,456</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">Active Patterns</p><p className="text-2xl font-bold">8,234</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">Last Updated</p><p className="text-2xl font-bold">2 hrs ago</p></Card>
        </div>
        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Recent Classifications</h3>
          <div className="space-y-2">
            {[
              { id: "SCM-001", pattern: "Wire Fraud Ring Alpha", samples: 234, discovered: "3 days ago" },
              { id: "SCM-002", pattern: "Romance Scam Variant B", samples: 156, discovered: "5 days ago" },
              { id: "SCM-003", pattern: "Tech Support Attack Pattern", samples: 89, discovered: "1 week ago" },
            ].map((scam) => (
              <div key={scam.id} className="flex items-center justify-between p-3 bg-muted/40 rounded">
                <div>
                  <p className="text-sm font-medium text-foreground">{scam.pattern}</p>
                  <p className="text-xs text-muted-foreground">{scam.discovered}</p>
                </div>
                <Badge variant="outline">{scam.samples} samples</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
