'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Search, AlertTriangle, CheckCircle, ShieldCheck, User, Phone, MessageSquare, Lightbulb, Clock } from "lucide-react"

const SCRIPTS = [
  {
    trigger: "Customer wants to wire money to someone they met online",
    riskLevel: "Critical",
    script: "I need to pause here for your protection. Have you met this person in person? Sending large amounts to someone you've only met online is one of the most common ways people lose money. Can I ask you a few questions before we proceed?",
    nextSteps: ["Ask how long they've known the recipient", "Ask if anyone told them to keep this transfer secret", "Initiate VictimState AI™ score check", "Offer Guardian Pause™ if score > 60"]
  },
  {
    trigger: "Customer is buying gift cards 'for their grandchild'",
    riskLevel: "High",
    script: "I'm glad you came in today. I want to make sure you're protected — government agencies, utilities, and family members never ask for payment via gift cards. If someone asked you to buy these as a payment, this is almost always a scam. Can we talk about what's happening?",
    nextSteps: ["Ask who requested the gift cards", "Do not complete cash transaction yet", "Contact branch manager", "File internal scam report"]
  },
  {
    trigger: "Customer is nervous, rushed, or being directed by phone",
    riskLevel: "High",
    script: "I can see you seem to be in a hurry. I want to help you, but I also want to make sure you're safe. If someone on the phone is telling you what to do right now, can you hang up and call us back directly? We can verify everything through our official number.",
    nextSteps: ["Ask them to step away from phone", "Offer private consultation room", "Do NOT proceed while caller is active", "Escalate to fraud supervisor"]
  },
  {
    trigger: "Customer wants to withdraw large cash amount for 'safe keeping'",
    riskLevel: "Elevated",
    script: "I want to make sure your money stays safe. Sometimes scammers convince people that their bank isn't safe and they should withdraw everything. Your deposits here are insured. Can I ask what's prompting this?",
    nextSteps: ["Do not refuse — but delay", "Engage manager", "Offer to verify any suspicious calls the customer received", "Document interaction"]
  },
  {
    trigger: "Elderly customer accompanied by unfamiliar person",
    riskLevel: "Elevated",
    script: "Thank you for coming in today. Would you mind if I spoke with [customer name] privately for just a moment? We have a standard security check we like to do for large transactions.",
    nextSteps: ["Separate customer from companion", "Check for signs of coercion", "Run VictimState AI™ profile check", "Alert fraud supervisor if concerns persist"]
  },
]

const riskColor: Record<string, string> = {
  "Critical": "bg-red-100 text-red-700",
  "High": "bg-orange-100 text-orange-700",
  "Elevated": "bg-yellow-100 text-yellow-700",
}

export default function TellerAssistPage() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(SCRIPTS[0])
  const [customerLookup, setCustomerLookup] = useState("")
  const [notes, setNotes] = useState("")

  const filtered = SCRIPTS.filter(s =>
    s.trigger.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PageLayout role="bankguard" title="Teller Assist" subtitle="Real-time branch and call center intervention guides powered by SCAMZY™">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Alert Bar */}
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-orange-800">Active Campaign Alert: CEO Wire Fraud — 12 incidents this week</p>
              <p className="text-xs text-orange-600">Script family CORP-WIRE-CEO-2024 is actively targeting business accounts. Stay alert for urgent wire requests from &quot;executives&quot;.</p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Script Library */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" /> Intervention Script Library
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search situation..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="space-y-2">
              {filtered.map((s, i) => (
                <Card
                  key={i}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${selected.trigger === s.trigger ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelected(s)}
                >
                  <Badge className={`text-xs border-0 mb-2 ${riskColor[s.riskLevel]}`}>{s.riskLevel}</Badge>
                  <p className="text-sm text-foreground">{s.trigger}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-3 space-y-4">
            {/* Script */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`text-sm border-0 px-3 py-1 ${riskColor[selected.riskLevel]}`}>{selected.riskLevel} Risk</Badge>
              </div>
              <p className="text-sm font-semibold text-foreground mb-3">{selected.trigger}</p>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">Recommended Script (SCAMZY™)</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed italic">&ldquo;{selected.script}&rdquo;</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Next Steps
                </h3>
                <div className="space-y-2">
                  {selected.nextSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                      <p className="text-sm text-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Customer Lookup */}
            <Card className="p-6">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" /> Quick Customer Lookup
              </h3>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Account # or customer name..."
                  value={customerLookup}
                  onChange={e => setCustomerLookup(e.target.value)}
                  className="flex-1"
                />
                <Button className="gap-2"><Search className="h-4 w-4" /> Lookup</Button>
              </div>
              {customerLookup && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">Margaret T. — #841-9923</span>
                    <Badge className="bg-red-100 text-red-700 border-0 text-xs">Risk: 91 — Critical</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <span>VictimState: Active grooming</span>
                    <span>FreezeLock™: Not active</span>
                    <span>Calls flagged: 14</span>
                    <span>Last incident: 2 days ago</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="gap-1"><Phone className="h-3 w-3" /> Call</Button>
                    <Button size="sm" variant="destructive" className="gap-1">Initiate FreezeLock™</Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Incident Log */}
            <Card className="p-6">
              <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Log This Interaction
              </h3>
              <Textarea
                placeholder="Describe what happened, what script was used, and outcome..."
                className="mb-3"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <Button className="gap-2"><CheckCircle className="h-4 w-4" /> Submit Log</Button>
                <Button variant="outline" className="gap-2"><AlertTriangle className="h-4 w-4" /> Escalate to Fraud Team</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
