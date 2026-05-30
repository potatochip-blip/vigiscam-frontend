'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Archive, Download } from "lucide-react"

export default function AdminEvidencePage() {
  return (
    <PageLayout role="admin" title="Evidence Management" subtitle="Platform-wide evidence vault and archival">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-4 text-center">
          <Card className="p-4"><p className="text-xs text-muted-foreground">Total Items</p><p className="text-2xl font-bold">891,234</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">Storage Used</p><p className="text-2xl font-bold">2.4 TB</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">Retention Days</p><p className="text-2xl font-bold">2,555</p></Card>
        </div>
        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Recent Archives</h3>
          <div className="space-y-2">
            {[
              { id: "ARC-001", name: "Q4 2023 Case Archive", items: 12456, size: "456 GB", created: "Jan 1, 2024" },
              { id: "ARC-002", name: "Investigation Records - Regional", items: 8934, size: "234 GB", created: "Dec 15, 2023" },
              { id: "ARC-003", name: "Compliance Documentation", items: 45678, size: "1.2 TB", created: "Dec 1, 2023" },
            ].map((archive) => (
              <div key={archive.id} className="flex items-center justify-between p-3 bg-muted/40 rounded">
                <div>
                  <p className="text-sm font-medium text-foreground">{archive.name}</p>
                  <p className="text-xs text-muted-foreground">{archive.items} items · {archive.size} · {archive.created}</p>
                </div>
                <Button size="sm" variant="outline" className="gap-1"><Download className="h-3 w-3" /></Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
