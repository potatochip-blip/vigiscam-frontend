'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Fingerprint, Shield, AlertTriangle, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function EntitiesPage() {
  return (
    <PageLayout role="investigator" title="Entities & Actors" subtitle="Track individual suspects and entity profiles">
      <div className="space-y-6">
        <Input placeholder="Search by phone, email, name, or account..." />

        <div className="grid gap-6">
          {[
            { id: "ACTOR-001", name: "Michael Chen", type: "Primary Suspect", phones: 7, emails: 12, accounts: 23, risk: "Critical" },
            { id: "ACTOR-002", name: "Sarah Johnson", type: "Co-conspirator", phones: 4, emails: 6, accounts: 11, risk: "High" },
            { id: "ACTOR-003", name: "James Wilson", type: "Money Mule", phones: 2, emails: 3, accounts: 5, risk: "Medium" },
          ].map((actor) => (
            <Card key={actor.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-foreground">{actor.name}</h3>
                    <Badge className={actor.risk === "Critical" ? "bg-red-500" : actor.risk === "High" ? "bg-orange-500" : "bg-yellow-500"}>{actor.risk}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{actor.type} · {actor.id}</p>
                </div>
                <Button size="sm">View Profile</Button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                <div><p className="text-xs text-muted-foreground">Phones</p><p className="font-semibold text-foreground">{actor.phones}</p></div>
                <div><p className="text-xs text-muted-foreground">Emails</p><p className="font-semibold text-foreground">{actor.emails}</p></div>
                <div><p className="text-xs text-muted-foreground">Accounts</p><p className="font-semibold text-foreground">{actor.accounts}</p></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
