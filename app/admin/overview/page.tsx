'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Stat } from "@/components/dashboard/stat"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Users, Server, TrendingUp, AlertTriangle, Database, Cpu } from "lucide-react"

const systemData = [
  { time: "00:00", uptime: 99.99, activeUsers: 1240, apiCalls: 45000 },
  { time: "04:00", uptime: 99.98, activeUsers: 234, apiCalls: 8900 },
  { time: "08:00", uptime: 99.99, activeUsers: 3456, apiCalls: 128900 },
  { time: "12:00", uptime: 99.97, activeUsers: 5678, apiCalls: 234560 },
]

export default function AdminOverviewPage() {
  return (
    <PageLayout role="admin" title="System Administration" subtitle="Platform-wide monitoring and control">
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat icon={Server} title="System Uptime" value="99.97%" description="Last 30 days" />
          <Stat icon={Users} title="Total Users" value="124,567" trend={{ value: 2.3, isPositive: true }} description="this month" />
          <Stat icon={Database} title="Total Tenants" value="892" description="Active enterprises" />
          <Stat icon={Cpu} title="Avg Response" value="145ms" trend={{ value: 23, isPositive: true }} description="vs last month" />
        </div>

        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4">System Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={systemData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="activeUsers" fill="var(--color-primary)" />
              <Bar dataKey="apiCalls" fill="var(--color-blue-500)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </PageLayout>
  )
}
