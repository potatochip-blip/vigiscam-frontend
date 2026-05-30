'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Layers, Edit } from "lucide-react"

export default function AdminScriptGenomePage() {
  return (
    <PageLayout role="admin" title="Script Genome Database" subtitle="Analyze and classify fraud attack scripts">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-4 text-center">
          <Card className="p-4"><p className="text-xs text-muted-foreground">Total Scripts</p><p className="text-2xl font-bold">45,678</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">Variants Found</p><p className="text-2xl font-bold">12,345</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">New This Week</p><p className="text-2xl font-bold">234</p></Card>
        </div>
        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Script Families</h3>
          <div className="space-y-2">
            {[
              { family: "WireFraud.Alpha", variants: 45, risk: "Critical", discovered: "Jan 2024" },
              { family: "RomanceScam.Bravo", variants: 32, risk: "High", discovered: "Dec 2023" },
              { family: "TechSupport.Charlie", variants: 28, risk: "High", discovered: "Nov 2023" },
            ].map((script, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/40 rounded">
                <div>
                  <p className="text-sm font-medium text-foreground">{script.family}</p>
                  <p className="text-xs text-muted-foreground">Discovered {script.discovered}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={script.risk === "Critical" ? "bg-red-500" : "bg-orange-500"}>{script.risk}</Badge>
                  <span className="text-xs text-muted-foreground">{script.variants} variants</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
