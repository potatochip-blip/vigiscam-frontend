'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { GitBranch, AlertTriangle, TrendingUp, Phone, DollarSign, ChevronDown, ChevronRight } from "lucide-react"

const JOURNEYS = [
  {
    id: "SJ-0041", name: "CEO Impersonation Wire Fraud", category: "Business",
    victims: 12, totalLoss: "$680,000", avgLoss: "$56,667", successRate: 34,
    scriptFamily: "CORP-WIRE-CEO-2024", status: "Active Campaign",
    steps: [
      { phase: "Reconnaissance", desc: "Harvests exec names from LinkedIn/company site. Spoofs CFO email domain.", channel: "Email", duration: "1-3 days" },
      { phase: "Relationship Build", desc: "Sends urgent but plausible wire request. References real company projects.", channel: "Email", duration: "Hours" },
      { phase: "Pressure Application", desc: "Caller posing as CEO applies urgency — 'Don't tell anyone, deal-sensitive'", channel: "Phone", duration: "20-40 min" },
      { phase: "Transaction Execution", desc: "Wire transfer submitted by employee or via banker assist", channel: "Online/Branch", duration: "Immediate" },
      { phase: "Layering", desc: "Funds moved to crypto exchange within 4-6 hours", channel: "Crypto", duration: "Hours" },
    ]
  },
  {
    id: "SJ-0039", name: "Pig Butchering Crypto Romance", category: "Individual",
    victims: 8, totalLoss: "$224,000", avgLoss: "$28,000", successRate: 61,
    scriptFamily: "ROMANCE-CRYPTO-PIG-2024", status: "Active Campaign",
    steps: [
      { phase: "Platform Contact", desc: "Target approached on dating app or social media by attractive profile", channel: "Social", duration: "Day 1" },
      { phase: "Trust Building", desc: "Daily contact over weeks building emotional dependency", channel: "Messaging", duration: "2-6 weeks" },
      { phase: "Investment Introduction", desc: "Scammer shares 'exclusive investment tip' on fake crypto platform", channel: "App", duration: "Days" },
      { phase: "Small Win", desc: "Victim shown fabricated profits to reinforce trust", channel: "App", duration: "Days" },
      { phase: "Escalation", desc: "Victim deposits increasingly large sums. FreezeLock™ triggered.", channel: "Bank/Crypto", duration: "Days-weeks" },
    ]
  },
  {
    id: "SJ-0037", name: "Tech Support Remote Access", category: "Senior",
    victims: 24, totalLoss: "$192,000", avgLoss: "$8,000", successRate: 44,
    scriptFamily: "TECHSUPPORT-REMOTE-2024", status: "Active Campaign",
    steps: [
      { phase: "Alarm Trigger", desc: "Pop-up or call claims device infected — displays Microsoft/Apple branding", channel: "Browser/Phone", duration: "Minutes" },
      { phase: "Remote Install", desc: "Victim guided to install AnyDesk or TeamViewer", channel: "Screen Share", duration: "10-20 min" },
      { phase: "Gift Card Demand", desc: "Agent claims to need payment via Google Play or Amazon gift cards", channel: "In-store", duration: "Hours" },
      { phase: "Bank Account Access", desc: "Agent requests banking login 'to process refund'", channel: "Screen", duration: "Minutes" },
      { phase: "Drain", desc: "Multiple Zelle/wire transfers executed while victim watches", channel: "Online Banking", duration: "Minutes" },
    ]
  },
]

export default function ScamJourneysPage() {
  const [selected, setSelected] = useState(JOURNEYS[0])
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  return (
    <PageLayout role="bankguard" title="Scam Journeys" subtitle="Fraud Journey Engine™ — visualize, map, and counter active scam attack patterns">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Campaigns", value: "3", color: "text-red-600" },
            { label: "Total Victims", value: "44", color: "text-orange-600" },
            { label: "Total Loss Tracked", value: "$1.1M", color: "text-foreground" },
            { label: "Script Families", value: "3", color: "text-primary" },
          ].map((s, i) => (
            <Card key={i} className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Journey List */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" /> Active Scam Campaigns
            </h2>
            {JOURNEYS.map((j, i) => (
              <Card
                key={i}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${selected.id === j.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelected(j)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-red-100 text-red-700 border-0 text-xs">{j.status}</Badge>
                  <span className="text-xs text-muted-foreground">{j.id}</span>
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">{j.name}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{j.victims} victims</span>
                  <span>·</span>
                  <span className="text-red-600 font-medium">{j.totalLoss}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-semibold text-foreground">{j.successRate}%</span>
                  </div>
                  <Progress value={j.successRate} className="h-1.5" />
                </div>
              </Card>
            ))}
          </div>

          {/* Journey Detail */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{selected.name}</h2>
                  <p className="text-sm text-muted-foreground">{selected.id} · Script Family: {selected.scriptFamily}</p>
                </div>
                <Badge className="bg-red-100 text-red-700 border-0">{selected.status}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Victims", value: selected.victims.toString(), icon: AlertTriangle, color: "text-red-600" },
                  { label: "Total Loss", value: selected.totalLoss, icon: DollarSign, color: "text-foreground" },
                  { label: "Avg Loss/Victim", value: selected.avgLoss, icon: TrendingUp, color: "text-orange-600" },
                ].map((s, i) => {
                  const Icon = s.icon
                  return (
                    <div key={i} className="bg-muted/50 rounded-lg p-3 text-center">
                      <Icon className={`h-4 w-4 ${s.color} mx-auto mb-1`} />
                      <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  )
                })}
              </div>

              <h3 className="text-sm font-bold text-foreground mb-3">Attack Phases (Fraud Journey Engine™)</h3>
              <div className="space-y-2">
                {selected.steps.map((step, i) => (
                  <div key={i} className="border border-border rounded-lg overflow-hidden">
                    <button
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                      onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                    >
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                      <span className="text-sm font-semibold text-foreground flex-1">{step.phase}</span>
                      <Badge className="bg-muted text-muted-foreground border-0 text-xs">{step.channel}</Badge>
                      {expandedStep === i ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </button>
                    {expandedStep === i && (
                      <div className="px-4 pb-3 border-t border-border bg-muted/30">
                        <p className="text-sm text-foreground mt-2">{step.desc}</p>
                        <p className="text-xs text-muted-foreground mt-1">Typical duration: {step.duration}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex gap-3">
              <Button className="gap-2 flex-1"><AlertTriangle className="h-4 w-4" /> Issue Alert to All Customers</Button>
              <Button variant="outline" className="gap-2">Export Journey Report</Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
