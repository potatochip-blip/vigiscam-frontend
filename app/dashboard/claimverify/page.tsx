'use client'

import { useState } from "react"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  CheckSquare, AlertTriangle, XCircle, CheckCircle, Clock,
  Archive, Users, Download, Eye, Shield, Search
} from "lucide-react"

const claimCategories = [
  { value: "romance", label: "Romance / Online Relationship" },
  { value: "business", label: "Business / Contractor / Builder" },
  { value: "charity", label: "Charity / Donation Request" },
  { value: "hospital", label: "Hospital / Medical Emergency" },
  { value: "oil-rig", label: "Oil Rig / Construction Worker Overseas" },
  { value: "inheritance", label: "Inheritance / Estate / Legal Settlement" },
  { value: "government", label: "Government / Authority / Law Enforcement" },
  { value: "immigration", label: "Immigration / Visa / Embassy" },
  { value: "job", label: "Job Offer / Employment / Remote Work" },
  { value: "investment", label: "Investment / Financial Opportunity" },
  { value: "crypto", label: "Crypto Recovery / Platform Support" },
  { value: "other", label: "Other" },
]

const verificationResults = [
  {
    id: "CV-001",
    category: "Oil Rig / Construction Worker Overseas",
    claimSummary: "Man on oil rig in Gulf of Mexico claims to need money sent for emergency tools",
    riskScore: 94,
    riskLevel: "critical",
    checkedAt: "2h ago",
    breakdown: [
      { label: "Story consistency", score: 12, max: 25, note: "Multiple contradictions in timeline" },
      { label: "Identity verifiability", score: 4, max: 25, note: "No verifiable professional profile or employer" },
      { label: "Communication pattern", score: 8, max: 25, note: "Grooming language, fast emotional escalation" },
      { label: "Request pattern", score: 5, max: 25, note: "Urgent financial request after short relationship" },
    ],
    aiSummary: "This claim matches known oil rig romance scam scripts. Over 3,400 similar cases in VIGISCAM™ database. Do not send money.",
  },
  {
    id: "CV-002",
    category: "Government / Authority",
    claimSummary: "Caller claims to be from the AFP and says a warrant has been issued for my arrest",
    riskScore: 98,
    riskLevel: "critical",
    checkedAt: "1 day ago",
    breakdown: [
      { label: "Story consistency", score: 5, max: 25, note: "AFP never contacts by phone about warrants" },
      { label: "Identity verifiability", score: 2, max: 25, note: "Number is spoofed — not AFP" },
      { label: "Communication pattern", score: 6, max: 25, note: "Fear and urgency pressure tactics" },
      { label: "Request pattern", score: 3, max: 25, note: "Requesting gift cards for 'court fees'" },
    ],
    aiSummary: "Classic government impersonation threat scam. Authorities never demand immediate payment to avoid arrest. Hang up immediately.",
  },
  {
    id: "CV-003",
    category: "Inheritance / Estate",
    claimSummary: "Lawyer claims I am entitled to $1.2M inheritance from a deceased relative I have never heard of",
    riskScore: 91,
    riskLevel: "critical",
    checkedAt: "3 days ago",
    breakdown: [
      { label: "Story consistency", score: 8, max: 25, note: "No verifiable deceased person or estate" },
      { label: "Identity verifiability", score: 6, max: 25, note: "Lawyer firm untraceable" },
      { label: "Communication pattern", score: 10, max: 25, note: "Pressure to keep secret" },
      { label: "Request pattern", score: 7, max: 25, note: "Advance fee required" },
    ],
    aiSummary: "Advance fee fraud (419 scam). No legitimate inheritance requires upfront payment from the beneficiary.",
  },
]

export default function ClaimVerifyPage() {
  const [category, setCategory] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verifyResult, setVerifyResult] = useState<typeof verificationResults[0] | null>(null)
  const [selectedResult, setSelectedResult] = useState<typeof verificationResults[0] | null>(null)

  const runVerification = () => {
    setVerifying(true)
    setTimeout(() => {
      setVerifyResult(verificationResults[0])
      setVerifying(false)
    }, 2000)
  }

  return (
    <PageLayout role="individual" title="ClaimVerify AI™" subtitle="Verify any story, identity, or claim before you act or send money">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Claims Verified", value: "3", color: "text-primary", bg: "bg-primary/10", icon: CheckSquare },
            { label: "Scam Claims Detected", value: "3", color: "text-red-600", bg: "bg-red-50", icon: XCircle },
            { label: "Estimated Saved", value: "$14,200", color: "text-green-600", bg: "bg-green-50", icon: Shield },
            { label: "Avg. Verification Time", value: "< 10s", color: "text-primary", bg: "bg-primary/10", icon: Clock },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="p-5">
                <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`h-4.5 w-4.5 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="verify">
          <TabsList>
            <TabsTrigger value="verify">Verify a Claim</TabsTrigger>
            <TabsTrigger value="history">Previous Verifications</TabsTrigger>
          </TabsList>

          {/* Verify Tab */}
          <TabsContent value="verify" className="mt-4 space-y-4">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Verify a Claim or Story</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Describe what someone is claiming and who they say they are. ClaimVerify AI™ will cross-reference known scam patterns, verify story consistency, and give you a risk result.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Claim Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select claim type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {claimCategories.map(c => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">How long have you known this person?</Label>
                  <Select defaultValue="weeks">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Less than 1 week", "1-4 weeks", "1-3 months", "3-12 months", "Over 1 year", "Never met in person"].map(v => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">How did you meet?</Label>
                  <Select defaultValue="online">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Dating app", "Social media", "Phone call (unsolicited)", "Email", "In person", "Gaming platform", "Other online"].map(v => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Are they asking for money or a financial action?</Label>
                  <Select defaultValue="yes">
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Yes — money transfer", "Yes — gift cards", "Yes — crypto", "Yes — account access", "Not yet but hinting", "No"].map(v => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Describe the claim or story in your own words</Label>
                <Textarea
                  placeholder="e.g. He says he works on an oil rig in the Gulf of Mexico and needs $3,000 for emergency equipment. He has been messaging me every day for 3 weeks..."
                  className="min-h-28 text-sm"
                />
              </div>
              <Button className="w-full sm:w-auto" onClick={runVerification} disabled={verifying}>
                {verifying ? "Verifying..." : "Run ClaimVerify AI™"}
              </Button>

              {/* Result */}
              {verifyResult && (
                <div className="rounded-lg border border-red-300 bg-red-50 p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-bold text-red-800 text-sm">HIGH RISK — Likely a Scam ({verifyResult.riskScore}/100)</span>
                    </div>
                    <Badge className="text-xs border-0 bg-red-100 text-red-700 flex-shrink-0">Critical</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{verifyResult.aiSummary}</p>
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-foreground">Verification Breakdown:</p>
                    {verifyResult.breakdown.map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">{item.label}</span>
                          <span className="text-xs text-muted-foreground">{item.score}/{item.max}</span>
                        </div>
                        <Progress value={(item.score / item.max) * 100} className="h-1.5 mb-1" />
                        <p className="text-xs text-muted-foreground">{item.note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8">
                      <Archive className="h-3.5 w-3.5 mr-1.5" /> Save Evidence
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 border-red-300 text-red-700">
                      <Users className="h-3.5 w-3.5 mr-1.5" /> Alert Trusted Contact
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 text-muted-foreground text-xs">
                      Continue Anyway (not recommended)
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-4 space-y-4">
            <div className="flex gap-3 flex-wrap items-center">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search verifications..." className="pl-9 h-9" />
              </div>
              <Button size="sm" variant="outline" className="h-9">
                <Download className="h-3.5 w-3.5 mr-1.5" /> Export
              </Button>
            </div>
            <div className="space-y-3">
              {verificationResults.map((result) => (
                <Card key={result.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground">{result.id}</span>
                        <Badge className="text-xs border-0 bg-red-100 text-red-700">{result.riskLevel.toUpperCase()} — {result.riskScore}/100</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{result.checkedAt}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{result.category}</p>
                      <p className="text-sm text-muted-foreground mt-0.5 truncate">{result.claimSummary}</p>
                      <p className="text-xs text-primary mt-1 line-clamp-2">{result.aiSummary}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 flex-shrink-0" onClick={() => setSelectedResult(result)}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
