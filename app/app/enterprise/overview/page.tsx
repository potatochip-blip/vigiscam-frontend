'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Stat } from "@/components/dashboard/stat"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { Users, Shield, Lock, TrendingUp, AlertTriangle, CreditCard } from "lucide-react"

const userData = [
  { month: "Jan", active: 234, inactive: 12, suspended: 2 },
  { month: "Feb", active: 245, inactive: 8, suspended: 3 },
  { month: "Mar", active: 256, inactive: 5, suspended: 2 },
]

export default function EnterpriseOverviewPage() {
  return (
    <PageLayout role="enterprise" title="Enterprise Dashboard" subtitle="Organization-wide fraud protection and compliance">
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat icon={Users} title="Active Users" value="892" description="Across 12 departments" />
          <Stat icon={Shield} title="Policies Active" value="47" description="All compliant" />
          <Stat icon={AlertTriangle} title="Incidents This Month" value="23" trend={{ value: 34, isPositive: true }} description="vs last month" />
          <Stat icon={CreditCard} title="Monthly Cost" value="$12,450" description="Within budget" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-base font-bold text-foreground mb-4">User Activity Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="var(--color-primary)" />
                <Line type="monotone" dataKey="inactive" stroke="var(--color-muted-foreground)" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-bold text-foreground mb-4">Department Distribution</h3>
            <div className="space-y-2">
              {[
                { dept: "Risk Management", users: 234, percent: 26 },
                { dept: "Fraud Operations", users: 189, percent: 21 },
                { dept: "Compliance", users: 167, percent: 19 },
                { dept: "Security", users: 145, percent: 16 },
                { dept: "Management", users: 157, percent: 18 },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{d.dept}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted/40 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${d.percent}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{d.users}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
