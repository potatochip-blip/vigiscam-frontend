'use client'

import { useState, useEffect, useRef } from "react"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pause, Shield, Users, Archive, CheckCircle, Phone, AlertTriangle,
  Clock, Eye, Settings, Timer, ArrowRight, XCircle, ShieldCheck
} from "lucide-react"

const pauseHistory = [
  {
    id: "GP-001",
    datetime: "Today, 3:14 PM",
    triggerSource: "ScamHold AI™",
    pressureType: "Urgency + secrecy",
    riskLevel: "critical",
    userAction: "Sent to trusted contact",
    evidenceId: "EV-441",
  },
  {
    id: "GP-002",
    datetime: "Today, 1:52 PM",
    triggerSource: "GiftCardGuard™",
    pressureType: "Code reveal pressure",
    riskLevel: "high",
    userAction: "Blocked action",
    evidenceId: "EV-438",
  },
  {
    id: "GP-003",
    datetime: "Yesterday, 6:30 PM",
    triggerSource: "WalletGuard AI™",
    pressureType: "Wallet switch pressure",
    riskLevel: "high",
    userAction: "Completed pause",
    evidenceId: "EV-431",
  },
  {
    id: "GP-004",
    datetime: "Yesterday, 11:05 AM",
    triggerSource: "ClaimVerify AI™",
    pressureType: "Fake investment pressure",
    riskLevel: "medium",
    userAction: "Verified claim",
    evidenceId: "EV-427",
  },
  {
    id: "GP-005",
    datetime: "2 days ago",
    triggerSource: "EmotionShield AI™",
    pressureType: "Romance manipulation",
    riskLevel: "high",
    userAction: "Blocked action",
    evidenceId: "EV-419",
  },
]

const riskColors: Record<string, string> = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
}

const reflectionQuestions = [
  "Did someone tell you this is urgent?",
  "Did they tell you not to tell anyone?",
  "Are they asking for gift cards, crypto, wire transfer, or login codes?",
  "Did they threaten you, scare you, or pressure you?",
  "Would this request still make sense if you waited one hour?",
  "Can you verify this through an official phone number, website, or trusted person?",
]

export default function GuardianPausePage() {
  const [showCountdown, setShowCountdown] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [countdownComplete, setCountdownComplete] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startPause = () => {
    setCountdown(30)
    setCountdownComplete(false)
    setShowCountdown(true)
  }

  const stopCountdown = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setShowCountdown(false)
    setCountdownComplete(false)
  }

  useEffect(() => {
    if (!showCountdown) return
    if (countdown <= 0) {
      setCountdownComplete(true)
      return
    }
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          setCountdownComplete(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [showCountdown])

  const countdownPct = ((30 - countdown) / 30) * 100
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (countdownPct / 100) * circumference

  return (
    <PageLayout
      role="individual"
      title="Guardian Pause™"
      subtitle="Pause before you continue. Scammers often rush people. Take 30 seconds and verify this request."
    >
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Active Alert Banner */}
        {showAlert && (
          <Card className="p-4 border-red-300 bg-red-50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-red-800 text-sm">Take a Human Pause</p>
                <p className="text-sm text-red-700 mt-0.5">
                  This request may be using pressure, urgency, or emotional manipulation. Before you continue, take 30 seconds to think, verify, and protect yourself.
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8" onClick={startPause}>
                    <Pause className="h-3.5 w-3.5 mr-1.5" /> Start 30-Second Pause
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 border-red-300 text-red-700">
                    <Users className="h-3.5 w-3.5 mr-1.5" /> Contact Trusted Person
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 border-red-300 text-red-700">
                    <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> Verify First
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 text-red-600" onClick={() => setShowAlert(false)}>
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Pauses Triggered", value: "12", color: "text-primary", bg: "bg-primary/10", icon: Pause },
            { label: "Actions Blocked", value: "7", color: "text-red-600", bg: "bg-red-50", icon: XCircle },
            { label: "Verified Safe", value: "3", color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
            { label: "Est. Loss Prevented", value: "$9,200", color: "text-green-700", bg: "bg-green-50", icon: Shield },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="p-5">
                <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </Card>
            )
          })}
        </div>

        {/* Main Status Card */}
        <Card className="p-6">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Pause className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h2 className="text-lg font-bold text-foreground">Human Pause Protection</h2>
                <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                  Active — Ready
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Guardian Pause™ activates when VIGISCAM detects that you may be acting under urgency, fear, confusion, romance pressure, or financial manipulation. It gives you 30 seconds to slow down, verify, and protect yourself before continuing.
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                <Button size="sm" onClick={startPause}>
                  <Timer className="h-3.5 w-3.5 mr-1.5" /> Start 30-Second Pause
                </Button>
                <Button size="sm" variant="outline">
                  <Clock className="h-3.5 w-3.5 mr-1.5" /> Review Pause History
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="h-3.5 w-3.5 mr-1.5" /> Edit Pause Settings
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="history">
          <TabsList>
            <TabsTrigger value="history">Pause History</TabsTrigger>
            <TabsTrigger value="triggers">Trigger Rules</TabsTrigger>
            <TabsTrigger value="settings">Pause Settings</TabsTrigger>
          </TabsList>

          {/* History Table */}
          <TabsContent value="history" className="mt-4">
            <Card className="overflow-hidden divide-y divide-border">
              <div className="grid grid-cols-[1fr_auto_auto_auto_1fr_auto] gap-3 px-4 py-2.5 bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <span>Date / Time</span>
                <span>Trigger Source</span>
                <span>Pressure Type</span>
                <span>Risk</span>
                <span>User Action</span>
                <span>Evidence</span>
              </div>
              {pauseHistory.map((row) => (
                <div key={row.id} className="grid grid-cols-[1fr_auto_auto_auto_1fr_auto] gap-3 px-4 py-3.5 items-center text-sm hover:bg-muted/20 transition-colors">
                  <div>
                    <span className="text-foreground">{row.datetime}</span>
                    <span className="block text-xs text-muted-foreground font-mono">{row.id}</span>
                  </div>
                  <span className="text-muted-foreground text-xs whitespace-nowrap">{row.triggerSource}</span>
                  <span className="text-muted-foreground text-xs whitespace-nowrap">{row.pressureType}</span>
                  <Badge className={`text-xs border-0 capitalize ${riskColors[row.riskLevel]}`}>{row.riskLevel}</Badge>
                  <span className="text-foreground text-xs">{row.userAction}</span>
                  <Button size="sm" variant="outline" className="h-7 text-xs px-2">
                    <Eye className="h-3 w-3 mr-1" /> {row.evidenceId}
                  </Button>
                </div>
              ))}
            </Card>
          </TabsContent>

          {/* Trigger Rules */}
          <TabsContent value="triggers" className="mt-4">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Guardian Pause™ Trigger Conditions</h3>
              </div>
              <p className="text-sm text-muted-foreground">Guardian Pause™ automatically activates when any of the following are detected:</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { source: "ScamHold AI™", condition: "Risk level is Medium, High, or Critical" },
                  { source: "GiftCardGuard™", condition: "Gift card code reveal attempt detected" },
                  { source: "WalletGuard AI™", condition: "Wallet switching or suspicious address detected" },
                  { source: "ClaimVerify AI™", condition: "Suspicious or High-Risk Scam Pattern returned" },
                  { source: "EmotionShield AI™", condition: "Urgency, fear, secrecy, romance pressure, or threats" },
                  { source: "ScriptShifter AI™", condition: "Known scam phrase patterns detected" },
                  { source: "User Action", condition: "\"Continue Anyway\" clicked after high-risk warning" },
                  { source: "User Action", condition: "Crypto or payment attempted after a warning" },
                  { source: "User Action", condition: "Suspicious link opened after a warning" },
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-muted/40 rounded-lg">
                    <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-primary block">{t.source}</span>
                      <span className="text-xs text-muted-foreground">{t.condition}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="mt-4">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Guardian Pause™ Settings</h3>
              </div>
              {[
                {
                  label: "Default pause duration",
                  options: ["15 seconds", "30 seconds", "60 seconds", "2 minutes"],
                  default: "30 seconds",
                },
                {
                  label: "Require pause before high-risk payments",
                  options: ["Always", "Only if flagged", "Never"],
                  default: "Always",
                },
                {
                  label: "Require pause before gift card code reveal",
                  options: ["Always", "Only if flagged", "Never"],
                  default: "Always",
                },
                {
                  label: "Require pause before crypto transfer",
                  options: ["Always", "Only if flagged", "Never"],
                  default: "Always",
                },
                {
                  label: "Require trusted contact after repeated warnings",
                  options: ["After 2nd warning", "After 3rd warning", "Never"],
                  default: "After 2nd warning",
                },
                {
                  label: "Save Human Pause events to Evidence Vault",
                  options: ["Always", "Only high-risk", "Never"],
                  default: "Always",
                },
                {
                  label: "Disable \"Continue Anyway\" for Elder Mode",
                  options: ["Enabled", "Disabled"],
                  default: "Disabled",
                },
                {
                  label: "Play voice warning during pause",
                  options: ["Yes", "No"],
                  default: "No",
                },
                {
                  label: "Show large-text warning for elderly users",
                  options: ["Yes", "No"],
                  default: "No",
                },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-4 flex-wrap">
                  <label className="text-sm font-medium text-foreground flex-1">{s.label}</label>
                  <Select defaultValue={s.default}>
                    <SelectTrigger className="w-52 h-9 shrink-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {s.options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <Button size="sm" className="mt-2">Save Settings</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 30-Second Countdown Modal */}
      <Dialog open={showCountdown} onOpenChange={(open) => { if (!open) stopCountdown() }}>
        <DialogContent className="max-w-lg" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Pause className="h-5 w-5 text-primary" />
              Pause Before You Continue
            </DialogTitle>
            <DialogDescription>
              Scammers often rush people. Take 30 seconds and verify this request before you send money, reveal a code, click a link, or share sensitive information.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {/* Countdown Circle */}
            <div className="flex justify-center py-2">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <circle
                    cx="64" cy="64" r={radius}
                    fill="none"
                    stroke={countdownComplete ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="text-center">
                  {countdownComplete ? (
                    <CheckCircle className="h-10 w-10 text-primary mx-auto" />
                  ) : (
                    <>
                      <span className="text-3xl font-bold font-mono text-foreground tabular-nums">
                        00:{String(countdown).padStart(2, "0")}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">seconds</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Reflection Questions */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Ask yourself:</p>
              {reflectionQuestions.map((q, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground leading-snug">{q}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            {!countdownComplete ? (
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline" className="col-span-2 border-primary/40 text-primary">
                  <Phone className="h-3.5 w-3.5 mr-1.5" /> Call Trusted Contact
                </Button>
                <Button size="sm" variant="outline">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> Verify Request
                </Button>
                <Button size="sm" variant="outline">
                  <Archive className="h-3.5 w-3.5 mr-1.5" /> Save Evidence
                </Button>
                <Button size="sm" variant="ghost" className="col-span-2 text-muted-foreground text-xs" onClick={stopCountdown}>
                  Cancel Action
                </Button>
                <p className="col-span-2 text-center text-xs text-muted-foreground">
                  "Continue Anyway" is disabled until the pause is complete.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <p className="col-span-2 text-sm text-center font-medium text-foreground">
                  Pause complete. What would you like to do?
                </p>
                <Button size="sm" className="col-span-2 bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> I Verified This Request
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="h-3.5 w-3.5 mr-1.5" /> Send to Trusted Contact
                </Button>
                <Button size="sm" variant="outline">
                  <Archive className="h-3.5 w-3.5 mr-1.5" /> Block and Save Evidence
                </Button>
                <Button size="sm" variant="ghost" className="col-span-2 text-muted-foreground text-xs" onClick={stopCountdown}>
                  Continue Anyway
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  )
}
