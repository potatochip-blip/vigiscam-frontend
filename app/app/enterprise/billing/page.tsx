'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign, TrendingUp } from "lucide-react"

export default function EnterpriseBillingPage() {
  return (
    <PageLayout role="enterprise" title="Billing & Subscriptions" subtitle="Manage plans, invoices, and billing information">
      <div className="space-y-6">
        <Card className="p-6 bg-primary/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground mb-1">Current Plan</h3>
              <p className="text-2xl font-bold text-primary">Enterprise Pro</p>
              <p className="text-xs text-muted-foreground">$12,450/month · 892 users · Unlimited storage</p>
            </div>
            <Button>Upgrade Plan</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-base font-bold text-foreground mb-4">Recent Invoices</h2>
          <div className="space-y-3">
            {[
              { id: "INV-2024-001", date: "Jan 1, 2024", amount: "$12,450", status: "Paid" },
              { id: "INV-2024-002", date: "Dec 1, 2023", amount: "$12,450", status: "Paid" },
              { id: "INV-2024-003", date: "Nov 1, 2023", amount: "$11,200", status: "Paid" },
            ].map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{invoice.id}</p>
                  <p className="text-xs text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{invoice.amount}</span>
                  <Badge className="bg-green-100 text-green-700 border-0">{invoice.status}</Badge>
                  <Button size="sm" variant="outline">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
