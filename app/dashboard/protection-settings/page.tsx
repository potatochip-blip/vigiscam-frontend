'use client'

import { useState } from "react"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Shield, Lock, CreditCard, Wallet, CheckSquare, Eye, Fingerprint,
  Timer, Bell, Archive, Mic, Video, Settings, Heart, AlertTriangle
} from "lucide-react"

interface ToggleSetting {
  label: string
  desc: string
  defaultOn: boolean
}

interface SelectSetting {
  label: string
  desc?: string
  options: string[]
  default: string
}

interface Section {
  icon: React.ElementType
  title: string
  badge?: string
  badgeColor?: string
  toggles?: ToggleSetting[]
  selects?: SelectSetting[]
}

const sections: Section[] = [
  {
    icon: Shield,
    title: "A1SCAMSHIELD™",
    badge: "Core",
    badgeColor: "bg-primary text-primary-foreground",
    toggles: [
      { label: "Live call analysis", desc: "Analyse all incoming calls for manipulation and pressure in real time", defaultOn: true },
      { label: "Scam script detection", desc: "Detect known scammer script patterns and urgency phrases", defaultOn: true },
      { label: "Auto-alert trusted contacts on critical detection", desc: "Notify your guardians immediately on critical-level calls", defaultOn: true },
      { label: "Save call analysis to Evidence Vault", desc: "Store flagged call transcripts and audio summaries automatically", defaultOn: true },
    ],
    selects: [
      { label: "Sensitivity level", options: ["Low", "Medium", "High", "Maximum"], default: "High" },
      { label: "Alert threshold", options: ["Medium risk+", "High risk+", "Critical only"], default: "High risk+" },
    ],
  },
  {
    icon: Lock,
    title: "FreezeLock™",
    badge: "Critical",
    badgeColor: "bg-red-600 text-white",
    toggles: [
      { label: "Enable FreezeLock™ emergency control", desc: "Allow VIGISCAM™ to freeze the screen and end remote sessions during critical threats", defaultOn: true },
      { label: "Require PIN to unlock after freeze", desc: "Prevent scammers from bypassing FreezeLock™ with a personal PIN", defaultOn: true },
      { label: "Notify trusted contacts on freeze", desc: "Alert guardians immediately when FreezeLock™ activates", defaultOn: true },
    ],
  },
  {
    icon: Timer,
    title: "Guardian Pause™",
    badge: "New",
    badgeColor: "bg-accent text-accent-foreground",
    toggles: [
      { label: "Enable Guardian Pause™", desc: "Automatically trigger a 30-second pause on high-risk pressure events", defaultOn: true },
      { label: "Require pause before high-risk payments", desc: "Force a pause before any payment flagged as risky", defaultOn: true },
      { label: "Require pause before gift card code reveal", desc: "Pause before allowing the user to reveal gift card redemption codes", defaultOn: true },
      { label: "Require pause before crypto transfer", desc: "Pause before any outgoing crypto transaction during an active warning", defaultOn: true },
      { label: "Require trusted contact after repeated warnings", desc: "Lock out Continue Anyway and require a guardian to proceed", defaultOn: false },
      { label: "Save Human Pause events to Evidence Vault", desc: "Automatically log every Guardian Pause™ activation with timestamps and outcomes", defaultOn: true },
      { label: "Disable Continue Anyway (Elder Mode)", desc: "Remove the Continue Anyway option — recommended for elderly users", defaultOn: false },
      { label: "Play voice warning during pause", desc: "Read the pause message aloud during the countdown", defaultOn: false },
      { label: "Show large-text warning for elderly users", desc: "Use larger text and simpler language in the pause modal", defaultOn: false },
    ],
    selects: [
      { label: "Default pause duration", options: ["15 seconds", "30 seconds", "60 seconds", "2 minutes"], default: "30 seconds" },
      { label: "Require pause before suspicious link opening", options: ["Always", "Only if flagged", "Never"], default: "Only if flagged" },
    ],
  },
  {
    icon: Lock,
    title: "ScamHold AI™",
    toggles: [
      { label: "Auto-hold bank transfers above threshold", desc: "Automatically pause outgoing transfers that exceed the risk threshold", defaultOn: true },
      { label: "Notify trusted contacts on hold", desc: "Alert guardians immediately when a transaction is held", defaultOn: true },
      { label: "Save hold events to Evidence Vault", desc: "Log all ScamHold events with risk scores, context, and outcomes", defaultOn: true },
    ],
    selects: [
      { label: "Auto-hold bank transfers over", options: ["$500", "$1,000", "$2,000", "$5,000"], default: "$1,000" },
      { label: "Hold duration before auto-release", options: ["2 hours", "4 hours", "24 hours", "Until manually released"], default: "4 hours" },
    ],
  },
  {
    icon: CreditCard,
    title: "GiftCardGuard™",
    toggles: [
      { label: "Block gift card purchases during active calls", desc: "Prevent gift card transactions while a flagged call is in progress", defaultOn: true },
      { label: "Require trusted contact approval for purchases over threshold", desc: "Guardian must approve any purchase above the limit you set", defaultOn: false },
      { label: "Alert on gift card code reveal", desc: "Notify trusted contacts if a code reveal is attempted", defaultOn: true },
    ],
    selects: [
      { label: "Block threshold", options: ["Any amount", "$100+", "$200+", "$500+"], default: "$200+" },
    ],
  },
  {
    icon: Wallet,
    title: "WalletGuard AI™",
    toggles: [
      { label: "Scan all outgoing wallet addresses", desc: "Check every crypto address against the scam database before sending", defaultOn: true },
      { label: "Block known scam wallet addresses", desc: "Prevent transfers to addresses flagged as fraudulent", defaultOn: true },
      { label: "Alert on unexpected wallet switching", desc: "Warn if a payment destination changes mid-conversation", defaultOn: true },
    ],
  },
  {
    icon: CheckSquare,
    title: "ClaimVerify AI™",
    toggles: [
      { label: "Auto-verify incoming claims in conversation", desc: "Automatically check identity claims, organisation names, and authority statements", defaultOn: true },
      { label: "Flag suspicious claim patterns", desc: "Alert when claim patterns match known scammer deception tactics", defaultOn: true },
      { label: "Require verification before sharing personal information", desc: "Pause before the user shares any personal details with an unverified caller", defaultOn: false },
    ],
  },
  {
    icon: Eye,
    title: "ScamMirror™",
    toggles: [
      { label: "Enable ScamMirror™ simulation lab", desc: "Allow access to the safe scam simulation training environment", defaultOn: true },
      { label: "Save session results to Evidence Vault", desc: "Store simulation outcomes for future reference and training", defaultOn: false },
    ],
  },
  {
    icon: Fingerprint,
    title: "Identity Collision Graph™",
    toggles: [
      { label: "Enable cross-channel actor collision search", desc: "Allow VIGISCAM™ to cross-reference identifiers across all fraud channels", defaultOn: true },
      { label: "Auto-scan new contacts for collision matches", desc: "Scan any new phone number, email, or handle against the fraud graph", defaultOn: false },
    ],
  },
  {
    icon: Video,
    title: "LiveFaceSeal™ + VoiceMatchSeal™",
    toggles: [
      { label: "Enable deepfake face detection", desc: "Detect AI-generated or injected video faces in real time", defaultOn: true },
      { label: "Enable voice clone detection", desc: "Detect synthesised or cloned voice audio in real time", defaultOn: true },
      { label: "Alert and record if manipulation detected", desc: "Automatically alert and save to Evidence Vault on detection", defaultOn: true },
    ],
  },
  {
    icon: Archive,
    title: "Evidence Vault™",
    toggles: [
      { label: "Auto-save all high-risk events", desc: "Automatically archive flagged calls, holds, pauses, and verifications", defaultOn: true },
      { label: "Enable tamper-evident hashing", desc: "Generate SHA-256 cryptographic hash for each evidence item", defaultOn: true },
      { label: "Include Guardian Pause events", desc: "Save all Human Pause activations to the vault with full event detail", defaultOn: true },
    ],
    selects: [
      { label: "Default retention period", options: ["30 days", "90 days", "1 year", "Permanent"], default: "90 days" },
    ],
  },
  {
    icon: Bell,
    title: "Alerts & Notifications",
    toggles: [
      { label: "Push notifications for critical threats", desc: "Receive an immediate device notification on critical detections", defaultOn: true },
      { label: "Email digest of weekly activity", desc: "A weekly summary of protection events and alerts sent to your email", defaultOn: false },
      { label: "Notify trusted contacts by SMS", desc: "Send SMS alerts to your guardian contacts (carrier rates may apply)", defaultOn: true },
    ],
    selects: [
      { label: "Notification priority minimum", options: ["All events", "Medium+", "High+", "Critical only"], default: "High+" },
    ],
  },
  {
    icon: Heart,
    title: "Trusted Contacts",
    toggles: [
      { label: "Enable Guardian Contact permissions", desc: "Allow designated guardians to review and pause actions on your behalf", defaultOn: true },
      { label: "Require two-factor verification for guardian actions", desc: "Guardians must verify their identity before approving or blocking an action", defaultOn: false },
    ],
  },
  {
    icon: AlertTriangle,
    title: "Elder Mode",
    badge: "Accessibility",
    badgeColor: "bg-yellow-100 text-yellow-800",
    toggles: [
      { label: "Enable Elder Mode for this account", desc: "Activates larger text, simplified messages, and disables Continue Anyway", defaultOn: false },
      { label: "Disable Continue Anyway globally", desc: "Remove the Continue Anyway option from all warnings and pauses", defaultOn: false },
      { label: "Require trusted contact approval to override any block", desc: "Guardian must approve before any blocked action can proceed", defaultOn: false },
    ],
  },
]

export default function ProtectionSettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <PageLayout
      role="individual"
      title="Protection Settings"
      subtitle="Configure every module and protection layer across your VIGISCAM™ account"
    >
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Info Banner */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Settings className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Changes take effect immediately. Settings marked <Badge className="text-[10px] border-0 bg-red-600 text-white mx-1">Critical</Badge> affect your core safety protections and should only be changed if you fully understand the impact.
            </p>
          </div>
        </Card>

        <Tabs defaultValue="all">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="all">All Settings</TabsTrigger>
            <TabsTrigger value="pause">Guardian Pause</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="identity">Identity</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            {sections.map((section) => (
              <SettingsSection key={section.title} section={section} />
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={handleSave} className="min-w-32">
                {saved ? "Saved!" : "Save All Settings"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="pause" className="mt-4 space-y-4">
            {sections.filter(s => s.title === "Guardian Pause™").map((section) => (
              <SettingsSection key={section.title} section={section} />
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={handleSave} className="min-w-32">
                {saved ? "Saved!" : "Save Settings"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-4 space-y-4">
            {sections.filter(s => ["ScamHold AI™", "GiftCardGuard™", "WalletGuard AI™"].includes(s.title)).map((section) => (
              <SettingsSection key={section.title} section={section} />
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={handleSave} className="min-w-32">
                {saved ? "Saved!" : "Save Settings"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="identity" className="mt-4 space-y-4">
            {sections.filter(s => ["ClaimVerify AI™", "Identity Collision Graph™", "LiveFaceSeal™ + VoiceMatchSeal™"].includes(s.title)).map((section) => (
              <SettingsSection key={section.title} section={section} />
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={handleSave} className="min-w-32">
                {saved ? "Saved!" : "Save Settings"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-4 space-y-4">
            {sections.filter(s => ["Alerts & Notifications", "Trusted Contacts", "Evidence Vault™", "Elder Mode"].includes(s.title)).map((section) => (
              <SettingsSection key={section.title} section={section} />
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={handleSave} className="min-w-32">
                {saved ? "Saved!" : "Save Settings"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}

function SettingsSection({ section }: { section: Section }) {
  const Icon = section.icon
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-sm font-bold text-foreground">{section.title}</h3>
        {section.badge && (
          <Badge className={`text-[10px] border-0 ${section.badgeColor}`}>{section.badge}</Badge>
        )}
      </div>

      {section.toggles && (
        <div className="space-y-3">
          {section.toggles.map((t, i) => (
            <div key={i} className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{t.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
              </div>
              <Switch defaultChecked={t.defaultOn} className="shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      )}

      {section.selects && section.selects.length > 0 && (
        <>
          {section.toggles && <Separator />}
          <div className="space-y-3">
            {section.selects.map((s, i) => (
              <div key={i} className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                  {s.desc && <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>}
                </div>
                <Select defaultValue={s.default}>
                  <SelectTrigger className="w-48 h-9 shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {s.options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  )
}
