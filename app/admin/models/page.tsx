'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cpu, Play, Pause } from "lucide-react"

export default function AdminModelsPage() {
  return (
    <PageLayout role="admin" title="AI Model Management" subtitle="Deploy and manage machine learning models">
      <div className="space-y-6">
        {[
          { id: "MDL-001", name: "VictimState AI™ v4.2", type: "Risk Scoring", status: "Live", accuracy: "98.7%", version: "4.2" },
          { id: "MDL-002", name: "Fraud Journey Engine™ v3.1", type: "Pattern Detection", status: "Live", accuracy: "97.3%", version: "3.1" },
          { id: "MDL-003", name: "A1SCAMSHIELD™ v2.5", type: "Call Analysis", status: "Testing", accuracy: "96.1%", version: "2.5" },
        ].map((model) => (
          <Card key={model.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Cpu className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{model.name}</h3>
                  <Badge className={model.status === "Live" ? "bg-green-100 text-green-700 border-0" : "bg-blue-100 text-blue-700 border-0"}>{model.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{model.type} · v{model.version}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{model.accuracy}</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
