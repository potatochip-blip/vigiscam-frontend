'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign } from "lucide-react"

export default function AdminBillingPage() {
  return (
    <PageLayout role="admin" title="Platform Billing" subtitle="Manage subscriptions and revenue">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-4 gap-4 text-center">
          <Card className="p-4"><p className="text-xs text-muted-foreground">MRR</p><p className="text-2xl font-bold">$127K</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">Active Subs</p><p className="text-2xl font-bold">892</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">Churn Rate</p><p className="text-2xl font-bold">2.3%</p></Card>
          <Card className="p-4"><p className="text-xs text-muted-foreground">ARR</p><p className="text-2xl font-bold">$1.52M</p></Card>
        </div>
        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Plan Distribution</h3>
          <div className="space-y-2">
            {[
              { plan: "Enterprise Max", subs: 234, revenue: "$45,600/mo", churn: "0.8%" },
              { plan: "Enterprise Pro", subs: 456, revenue: "$54,720/mo", churn: "1.2%" },
              { plan: "Starter", subs: 202, revenue: "$26,660/mo", churn: "8.9%" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/40 rounded">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.plan}</p>
                  <p className="text-xs text-muted-foreground">{p.subs} subscriptions</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-semibold text-foreground">{p.revenue}</p>
                  <p className="text-muted-foreground">Churn: {p.churn}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
