'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Shield, DollarSign, AlertTriangle, Download, Calendar } from "lucide-react"

const monthlyData = [
  { month: "Nov", blocked: 148, flagged: 52, losses: 18 },
  { month: "Dec", blocked: 162, flagged: 61, losses: 14 },
  { month: "Jan", blocked: 178, flagged: 58, losses: 9 },
  { month: "Feb", blocked: 201, flagged: 74, losses: 12 },
  { month: "Mar", blocked: 219, flagged: 68, losses: 7 },
  { month: "Apr", blocked: 247, flagged: 82, losses: 5 },
]

const fraudTypes = [
  { name: "CEO / BEC", value: 34, color: "#2563eb" },
  { name: "Account Takeover", value: 28, color: "#dc2626" },
  { name: "Vendor Impersonation", value: 22, color: "#f59e0b" },
  { name: "Deepfake / Impersonation", value: 16, color: "#7c3aed" },
]

const channelData = [
  { channel: "Online Banking", incidents: 312, loss: 1240000, blocked: 94 },
  { channel: "Branch", incidents: 187, loss: 890000, blocked: 98 },
  { channel: "Mobile App", incidents: 241, loss: 620000, blocked: 91 },
  { channel: "Phone / Call Center", incidents: 143, loss: 480000, blocked: 87 },
  { channel: "ATM / POS", incidents: 98, loss: 210000, blocked: 96 },
]

const protectionLoss = [
  { month: "Nov", protected: 2400000, loss: 180000 },
  { month: "Dec", protected: 2800000, loss: 140000 },
  { month: "Jan", protected: 3200000, loss: 90000 },
  { month: "Feb", protected: 3900000, loss: 120000 },
  { month: "Mar", protected: 4100000, loss: 70000 },
  { month: "Apr", protected: 4800000, loss: 50000 },
]

export default function BankGuardAnalyticsPage() {
  const [period, setPeriod] = useState("6m")

  return (
    <PageLayout role="bankguard" title="Analytics & Intelligence" subtitle="Fraud Trend Engine — performance, exposure, and attack pattern analysis">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {["1m", "3m", "6m", "1y"].map(p => (
              <Button key={p} size="sm" variant={period === p ? "default" : "outline"} onClick={() => setPeriod(p)}>
                {p}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Fraud Blocked (6mo)", value: "1,155", sub: "+12% vs prior period", color: "text-primary", icon: Shield },
            { label: "Protected (6mo)", value: "$21.8M", sub: "Value of blocked fraud", color: "text-green-600", icon: DollarSign },
            { label: "Avg Block Rate", value: "99.8%", sub: "Across all channels", color: "text-primary", icon: TrendingUp },
            { label: "False Positives", value: "0.2%", sub: "Industry avg: 1.4%", color: "text-foreground", icon: AlertTriangle },
          ].map((kpi, i) => {
            const Icon = kpi.icon
            return (
              <Card key={i} className="p-5">
                <Icon className={`h-5 w-5 ${kpi.color} mb-2`} />
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
                <p className="text-xs text-muted-foreground">{kpi.sub}</p>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Monthly Incidents */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Monthly Fraud Activity</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="blocked" fill="#2563eb" name="Blocked" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="flagged" fill="#f59e0b" name="Flagged" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="losses" fill="#dc2626" name="Successful (Loss)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Fraud Type Breakdown */}
          <Card className="p-6">
            <h2 className="text-base font-bold text-foreground mb-4">Fraud Type Distribution</h2>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={fraudTypes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={45}>
                  {fraudTypes.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-3">
              {fraudTypes.map((t, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className="text-foreground">{t.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{t.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Protection vs Loss Trend */}
        <Card className="p-6">
          <h2 className="text-base font-bold text-foreground mb-4">Protection vs. Loss Trend ($)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={protectionLoss}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => [`$${(v / 1000).toFixed(0)}K`]} />
              <Line type="monotone" dataKey="protected" stroke="#2563eb" strokeWidth={2} name="Protected" dot={false} />
              <Line type="monotone" dataKey="loss" stroke="#dc2626" strokeWidth={2} name="Loss" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Channel Performance */}
        <Card className="p-6">
          <h2 className="text-base font-bold text-foreground mb-4">Channel Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Channel</th>
                  <th className="text-left py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Incidents</th>
                  <th className="text-left py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Exposure</th>
                  <th className="text-left py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Block Rate</th>
                </tr>
              </thead>
              <tbody>
                {channelData.map((row, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/30">
                    <td className="py-3 text-sm font-medium text-foreground">{row.channel}</td>
                    <td className="py-3 text-sm text-foreground">{row.incidents}</td>
                    <td className="py-3 text-sm text-foreground">${(row.loss / 1000).toFixed(0)}K</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={row.blocked} className="h-2 w-24" />
                        <span className={`text-sm font-semibold ${row.blocked > 95 ? "text-green-600" : row.blocked > 90 ? "text-primary" : "text-yellow-600"}`}>{row.blocked}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
