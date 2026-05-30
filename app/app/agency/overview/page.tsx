'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Stat } from "@/components/dashboard/stat"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Users, AlertTriangle, Globe, Zap } from "lucide-react"

const monthlyData = [
  { month: "Jan", cases: 234, resolved: 187, submitted: 23 },
  { month: "Feb", cases: 312, resolved: 248, submitted: 31 },
  { month: "Mar", cases: 289, resolved: 231, submitted: 28 },
  { month: "Apr", cases: 401, resolved: 321, submitted: 42 },
]

export default function AgencyOverviewPage() {
  return (
    <PageLayout role="agency" title="Agency Operations Center" subtitle="Multi-agency fraud investigation coordination">
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat icon={TrendingUp} title="Active Cases" value="847" trend={{ value: 12, isPositive: true }} description="this month" />
          <Stat icon={Users} title="Partner Agencies" value="23" description="7 international" />
          <Stat icon={AlertTriangle} title="Cases Submitted" value="156" description="To law enforcement" />
          <Stat icon={Zap} title="Intelligence Shares" value="342" description="This quarter" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-base font-bold text-foreground mb-4">Monthly Case Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cases" fill="var(--color-primary)" />
                <Bar dataKey="resolved" fill="var(--color-green-500)" />
                <Bar dataKey="submitted" fill="var(--color-blue-500)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-bold text-foreground mb-4">Regional Distribution</h3>
            <div className="space-y-3">
              {[
                { region: "North America", cases: 342, agencies: 8 },
                { region: "Europe", cases: 187, agencies: 6 },
                { region: "Asia-Pacific", cases: 156, agencies: 5 },
                { region: "Latin America", cases: 89, agencies: 3 },
                { region: "Africa & Middle East", cases: 73, agencies: 1 },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between pb-2 border-b border-border last:border-0">
                  <span className="text-sm text-foreground">{r.region}</span>
                  <span className="text-sm font-semibold text-foreground">{r.cases} cases · {r.agencies} agencies</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">Top Fraud Types This Month</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { type: "Wire Fraud", count: 234 },
              { type: "Romance Scams", count: 189 },
              { type: "Tech Support", count: 145 },
              { type: "Investment Fraud", count: 98 },
              { type: "Recovery Scams", count: 76 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </PageLayout>
  )
}
