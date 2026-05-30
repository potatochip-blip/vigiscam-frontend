'use client'

import { useState } from "react"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Eye, Play, AlertTriangle, CheckCircle, Archive, Download,
  Monitor, Phone, CreditCard, Heart, Shield, Cpu, TrendingUp, ChevronRight
} from "lucide-react"

const simulations = [
  {
    id: "SIM-001",
    title: "Tech Support Remote Access Scam",
    icon: Cpu,
    duration: "~8 min",
    difficulty: "Common",
    difficultyColor: "bg-orange-100 text-orange-700",
    description: "A caller from 'Microsoft Support' tells you your computer has a virus. They walk you through downloading AnyDesk so they can 'fix' it remotely.",
    script: [
      { speaker: "Scammer", line: "Hello, this is John from Microsoft Security. We have detected a serious virus on your computer. You need to act immediately." },
      { speaker: "AI Observer", line: "Red flag: Microsoft does not call users unsolicited about viruses. The caller will now request remote access.", type: "warning" },
      { speaker: "Scammer", line: "Please download AnyDesk on your computer. It is free. Just go to anydesk.com and install it so I can help you." },
      { speaker: "AI Observer", line: "Red flag: Remote access software is the scammer's tool. Once connected, they can access your banking, files, and passwords.", type: "warning" },
      { speaker: "Scammer", line: "Now give me your 9-digit AnyDesk ID so I can connect. Do not tell anyone about this — it is confidential." },
      { speaker: "AI Observer", line: "Red flag: Secrecy request is a manipulation tactic. Legitimate support never demands confidentiality.", type: "warning" },
    ],
    tactics: ["Urgency and fear", "Impersonation of trusted brand", "Remote access request", "Secrecy instruction"],
    outcome: "If you gave access: Scammer transfers money from banking site, installs permanent backdoor, may demand ransom.",
  },
  {
    id: "SIM-002",
    title: "Government Gift Card Demand",
    icon: CreditCard,
    duration: "~5 min",
    difficulty: "Very Common",
    difficultyColor: "bg-red-100 text-red-700",
    description: "A caller claims to be from the ATO and says you owe $2,400 in unpaid taxes. They demand immediate payment via Google Play gift cards to avoid arrest.",
    script: [
      { speaker: "Scammer", line: "This is Officer Williams from the Australian Taxation Office. We have a warrant for your arrest due to unpaid tax debt." },
      { speaker: "AI Observer", line: "Red flag: The ATO does not threaten arrest by phone. Arrest warrants require court process.", type: "warning" },
      { speaker: "Scammer", line: "To avoid arrest today, you must pay $2,400 via Google Play gift cards. Go to Woolworths right now." },
      { speaker: "AI Observer", line: "Red flag: No government agency accepts gift cards as payment. This is a defining scam indicator.", type: "warning" },
      { speaker: "Scammer", line: "Buy the cards and call this number back with the codes. Do not tell the cashier why you are buying them." },
      { speaker: "AI Observer", line: "Red flag: Instructions to lie to the cashier confirm this is fraud. Hang up immediately.", type: "warning" },
    ],
    tactics: ["Authority impersonation", "Arrest threat", "Gift card payment demand", "Cashier secrecy instruction"],
    outcome: "If you complied: $2,400 irreversibly transferred. Gift card codes cannot be recovered once shared.",
  },
  {
    id: "SIM-003",
    title: "Romance Crypto Investment Grooming",
    icon: Heart,
    duration: "~15 min",
    difficulty: "High Loss Risk",
    difficultyColor: "bg-red-100 text-red-700",
    description: "Over 6 weeks, 'Alex' — met on a dating app — builds a relationship and then introduces you to a 'safe' crypto investment platform with guaranteed returns.",
    script: [
      { speaker: "Alex (Scammer)", line: "I had such a great day! I was just thinking of you. How is everything going? I feel like we really understand each other." },
      { speaker: "AI Observer", line: "Observation: Love bombing — frequent affection and emotional intensity early in the relationship to build trust quickly.", type: "warning" },
      { speaker: "Alex (Scammer)", line: "My uncle works in crypto investments. I have been earning 30% returns every month. I wanted to share this only with you." },
      { speaker: "AI Observer", line: "Red flag: Guaranteed high returns are always fraudulent. No legitimate investment guarantees 30% monthly returns.", type: "warning" },
      { speaker: "Alex (Scammer)", line: "You only need to put in $5,000 to start. I will guide you. The platform is coinvest-returns.io. I already made $12,000 this month." },
      { speaker: "AI Observer", line: "Red flag: Fake investment platforms allow initial 'profits' to be shown — but withdrawals will be blocked. This is pig-butchering.", type: "warning" },
    ],
    tactics: ["Love bombing", "Exclusive investment access", "Guaranteed returns", "Fake profit dashboard", "Withdrawal blocking"],
    outcome: "If you invested: Platform shows fake profits but blocks withdrawals. Scammer eventually disappears. Average pig-butchering loss: $35,000.",
  },
  {
    id: "SIM-004",
    title: "Bank Fraud Safe-Account Transfer",
    icon: Shield,
    duration: "~6 min",
    difficulty: "High Loss Risk",
    difficultyColor: "bg-red-100 text-red-700",
    description: "Your bank's SMS thread suddenly contains a message warning of fraud. A caller then rings from what appears to be your bank's number.",
    script: [
      { speaker: "Scammer (SMS)", line: "ALERT: Suspicious transaction detected on your account. Do not authorise. Call us immediately: 13 2221" },
      { speaker: "AI Observer", line: "Red flag: SMS spoofing inserts scam messages into genuine bank threads. Always call your bank from the number on your card.", type: "warning" },
      { speaker: "Scammer", line: "Hello, I am calling from CommBank security. We detected a $3,200 fraud attempt. We need to move your money to a safe account we control." },
      { speaker: "AI Observer", line: "Red flag: Banks never ask you to move money to a 'safe account'. This is the most common APP fraud tactic.", type: "warning" },
      { speaker: "Scammer", line: "Please transfer $8,500 to BSB 062-001 account 34567890. This is our secure account for fraud victims." },
      { speaker: "AI Observer", line: "Red flag: The 'safe account' belongs to the scammer. Authorised push payment fraud is rarely reversible.", type: "warning" },
    ],
    tactics: ["SMS spoofing into genuine thread", "Bank caller ID spoofing", "Safe-account transfer", "Urgency and legitimacy illusion"],
    outcome: "If you transferred: Money leaves immediately. Scammer withdraws cash within minutes. Average APP fraud loss: $15,000.",
  },
  {
    id: "SIM-005",
    title: "Fake Job Upfront Payment",
    icon: TrendingUp,
    duration: "~4 min",
    difficulty: "Common",
    difficultyColor: "bg-orange-100 text-orange-700",
    description: "A job offer for remote data entry arrives. The 'employer' asks you to buy equipment from their approved supplier — and reimburse yourself from your first paycheck.",
    script: [
      { speaker: "Scammer", line: "Congratulations! You have been selected for our remote data entry role. You will earn $800-$1,200 per week working from home." },
      { speaker: "AI Observer", line: "Observation: Vague job title, high pay, unsolicited offer. Proceed with caution.", type: "warning" },
      { speaker: "Scammer", line: "We will send you a company cheque for $3,500 to buy your equipment. Please purchase from our approved supplier and send the rest back." },
      { speaker: "AI Observer", line: "Red flag: Overpayment cheque scam. The cheque will bounce after you send money. You will owe the full amount.", type: "warning" },
      { speaker: "Scammer", line: "Please transfer $2,800 to our equipment supplier at paypal.me/officedepot-equipment-au right now so we can ship your laptop." },
      { speaker: "AI Observer", line: "Red flag: Legitimate employers never ask employees to send money. PayPal links for 'suppliers' are personal accounts.", type: "warning" },
    ],
    tactics: ["Unsolicited job offer", "Overpayment cheque fraud", "Equipment purchase redirect", "Fake company identity"],
    outcome: "If you paid: Cheque bounces, you lose $2,800. No job exists. Email and number disappear.",
  },
  {
    id: "SIM-006",
    title: "Crypto Recovery Scam",
    icon: Monitor,
    duration: "~7 min",
    difficulty: "Common",
    difficultyColor: "bg-orange-100 text-orange-700",
    description: "After posting about losing $10,000 in a previous crypto scam, a 'specialist' contacts you offering to recover your funds — for an upfront fee.",
    script: [
      { speaker: "Scammer", line: "Hi, I saw your post about losing money to a crypto scam. I am a certified recovery specialist. I have helped 340 people get their funds back." },
      { speaker: "AI Observer", line: "Red flag: Crypto recovery scams specifically target previous victims. Once scammed, victims are added to lists sold between scam networks.", type: "warning" },
      { speaker: "Scammer", line: "I can recover your $10,000. My success rate is 97%. I only charge 15% once funds are recovered. But there is a $400 KYC processing fee upfront." },
      { speaker: "AI Observer", line: "Red flag: 'Upfront fee for recovery' is the scam. Cryptocurrency transactions cannot be reversed by any specialist.", type: "warning" },
      { speaker: "Scammer", line: "I need your wallet seed phrase to initiate the trace. This is completely secure — our system encrypts it immediately." },
      { speaker: "AI Observer", line: "CRITICAL: Never share your wallet seed phrase with anyone. It gives complete access to all funds in your wallet — immediately.", type: "critical" },
    ],
    tactics: ["Victim targeting (re-victimisation)", "False authority and success rate", "Upfront fee extraction", "Seed phrase theft"],
    outcome: "If you shared your seed phrase: Your entire wallet is drained immediately. The previous $10,000 loss becomes a total loss.",
  },
]

export default function ScamMirrorPage() {
  const [activeSimId, setActiveSimId] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const activeSim = simulations.find(s => s.id === activeSimId)

  const startSim = (id: string) => {
    setActiveSimId(id)
    setActiveStep(0)
  }

  const nextStep = () => {
    if (activeSim && activeStep < activeSim.script.length - 1) {
      setActiveStep(s => s + 1)
    }
  }

  return (
    <PageLayout role="individual" title="ScamMirror™" subtitle="Safe simulation environment — experience and recognise scam tactics without any risk">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Info Banner */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Eye className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Safe Simulation Environment</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                All simulations are fictional and educational. No real calls are made. No money or data is at risk.
                Each simulation shows you how scams unfold in real time with AI observation notes.
              </p>
            </div>
          </div>
        </Card>

        {/* Split-screen layout when simulation is active */}
        {activeSimId && activeSim ? (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Simulation Panel */}
            <div className="lg:col-span-3 space-y-4">
              <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold text-foreground">{activeSim.title}</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => setActiveSimId(null)}>
                    Exit Simulation
                  </Button>
                </div>
                <div className="space-y-3 min-h-64">
                  {activeSim.script.slice(0, activeStep + 1).map((line, i) => (
                    <div key={i} className={`rounded-lg p-3 text-sm ${
                      line.type === "warning" ? "bg-red-50 border border-red-200" :
                      line.type === "critical" ? "bg-red-100 border border-red-400" :
                      line.speaker.includes("Scammer") || line.speaker.includes("Alex") ? "bg-muted/50" : "bg-primary/5"
                    }`}>
                      <p className={`text-xs font-bold mb-1 ${
                        line.type === "warning" ? "text-red-700" :
                        line.type === "critical" ? "text-red-900" :
                        line.speaker.includes("Scammer") || line.speaker.includes("Alex") ? "text-muted-foreground" : "text-primary"
                      }`}>
                        {line.speaker}
                        {line.type === "critical" && " — CRITICAL WARNING"}
                      </p>
                      <p className={line.type ? "text-red-800" : "text-foreground"}>{line.line}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-4">
                  {activeStep < activeSim.script.length - 1 ? (
                    <Button size="sm" onClick={nextStep}>
                      Next <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  ) : (
                    <Badge className="bg-green-100 text-green-700 border-0">Simulation Complete</Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{activeStep + 1} / {activeSim.script.length} steps</span>
                </div>
              </Card>
            </div>

            {/* AI Observer Panel */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">AI Observer Panel</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Tactics Used</p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSim.tactics.map((t, i) => (
                        <Badge key={i} className="text-[10px] border-0 bg-red-50 text-red-700">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Likely Outcome if Complied</p>
                    <p className="text-xs text-muted-foreground">{activeSim.outcome}</p>
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Flags Detected So Far</p>
                    {activeSim.script
                      .slice(0, activeStep + 1)
                      .filter(l => l.type === "warning" || l.type === "critical")
                      .map((l, i) => (
                        <div key={i} className="flex items-start gap-1.5 mb-1.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">{l.line.substring(0, 80)}...</span>
                        </div>
                      ))}
                  </div>
                </div>
              </Card>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Archive className="h-3.5 w-3.5 mr-1.5" /> Export Evidence
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Simulation Cards Grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {simulations.map((sim) => {
              const Icon = sim.icon
              return (
                <Card key={sim.id} className="p-5 flex flex-col gap-3 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge className={`text-[10px] border-0 flex-shrink-0 ${sim.difficultyColor}`}>{sim.difficulty}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-1">{sim.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{sim.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {sim.tactics.slice(0, 3).map((t, i) => (
                      <Badge key={i} className="text-[10px] border-0 bg-muted text-muted-foreground">{t}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="h-3 w-3" />{sim.duration}</span>
                    <Button size="sm" className="h-8" onClick={() => startSim(sim.id)}>
                      <Play className="h-3.5 w-3.5 mr-1.5" /> Start Simulation
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Stats Row */}
        {!activeSimId && (
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Simulations Completed", value: "2", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
              { label: "Tactics Encountered", value: "14", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
              { label: "Evidence Exports", value: "1", icon: Archive, color: "text-primary", bg: "bg-primary/10" },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <Card key={i} className="p-5">
                  <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className={`h-4.5 w-4.5 ${s.color}`} />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
