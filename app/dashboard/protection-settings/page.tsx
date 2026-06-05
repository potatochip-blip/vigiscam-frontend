'use client'

import { useEffect, useMemo, useState } from "react"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Shield, Archive, Settings, Heart, AlertTriangle, Loader2 } from "lucide-react"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"

/** Mirrors the backend protection-settings model (the only enforced settings). */
type Settings = {
  scamHoldEnabled: boolean
  guardianPauseEnabled: boolean
  giftCardGuardEnabled: boolean
  walletGuardEnabled: boolean
  claimVerifyEnabled: boolean
  scamMirrorEnabled: boolean
  identityGraphEnabled: boolean
  evidenceAutoSaveEnabled: boolean
  trustedContactRequired: boolean
  elderModeStrictLock: boolean
  allowContinueAnyway: boolean
  highRiskAmountThresholdMinor: number
  guardianPauseDurationSeconds: number
}

type BoolKey = {
  [K in keyof Settings]: Settings[K] extends boolean ? K : never
}[keyof Settings]

type ToggleDef = { key: BoolKey; label: string; desc: string }
type Section = { icon: React.ElementType; title: string; badge?: string; badgeColor?: string; toggles: ToggleDef[] }

const SECTIONS: Section[] = [
  {
    icon: Shield, title: "Core Protection Modules", badge: "Enforced", badgeColor: "bg-primary text-primary-foreground",
    toggles: [
      { key: "scamHoldEnabled", label: "ScamHold AI™", desc: "Hold high-risk bank transfers for review before they complete" },
      { key: "guardianPauseEnabled", label: "Guardian Pause™", desc: "Trigger a cooling-off pause on high-pressure events" },
      { key: "giftCardGuardEnabled", label: "GiftCardGuard™", desc: "Block gift-card purchases flagged during active scams" },
      { key: "walletGuardEnabled", label: "WalletGuard AI™", desc: "Screen outgoing crypto wallet addresses against the fraud database" },
      { key: "claimVerifyEnabled", label: "ClaimVerify AI™", desc: "Verify identity and authority claims made in conversations" },
      { key: "scamMirrorEnabled", label: "ScamMirror™", desc: "Enable the safe scam-simulation training lab" },
      { key: "identityGraphEnabled", label: "Identity Collision Graph™", desc: "Cross-reference identifiers across all fraud channels" },
    ],
  },
  {
    icon: Archive, title: "Evidence Vault™",
    toggles: [
      { key: "evidenceAutoSaveEnabled", label: "Auto-save high-risk events", desc: "Automatically archive flagged calls, holds, pauses, and verifications" },
    ],
  },
  {
    icon: Heart, title: "Trusted Contacts & Overrides",
    toggles: [
      { key: "trustedContactRequired", label: "Require trusted-contact approval", desc: "A guardian must approve high-risk actions before they proceed" },
      { key: "allowContinueAnyway", label: "Allow “Continue Anyway”", desc: "Let the user override a warning and proceed at their own risk" },
    ],
  },
  {
    icon: AlertTriangle, title: "Elder Mode", badge: "Accessibility", badgeColor: "bg-yellow-100 text-yellow-800",
    toggles: [
      { key: "elderModeStrictLock", label: "Elder Mode strict lock", desc: "Disable overrides and require trusted-contact approval on every high-risk action" },
    ],
  },
]

const THRESHOLDS = [
  { label: "$500", minor: 50000 }, { label: "$1,000", minor: 100000 },
  { label: "$2,000", minor: 200000 }, { label: "$5,000", minor: 500000 },
]
const DURATIONS = [
  { label: "15 seconds", s: 15 }, { label: "30 seconds", s: 30 },
  { label: "60 seconds", s: 60 }, { label: "2 minutes", s: 120 },
]

async function getSettings(): Promise<Settings> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, response } = await (backend.GET as any)("/api/v1/protection-settings")
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return data as Settings
}

export default function ProtectionSettingsPage() {
  const { isAuthenticated } = useAuth()
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) return
    let alive = true
    getSettings().then((s) => alive && setSettings(s)).catch((e) => alive && setLoadError(e.message))
    return () => { alive = false }
  }, [isAuthenticated])

  const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev))

  const thresholdLabel = useMemo(
    () => THRESHOLDS.find((t) => t.minor === settings?.highRiskAmountThresholdMinor)?.label ?? "$1,000",
    [settings?.highRiskAmountThresholdMinor],
  )
  const durationLabel = useMemo(
    () => DURATIONS.find((d) => d.s === settings?.guardianPauseDurationSeconds)?.label ?? "30 seconds",
    [settings?.guardianPauseDurationSeconds],
  )

  async function save() {
    if (!settings) return
    setSaving(true); setSaved(false)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error, response } = await (backend.PUT as any)("/api/v1/protection-settings", { body: settings })
      if (error || !response.ok) throw new Error(`Save failed (${response.status})`)
      setSaved(true); setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <PageLayout role="individual" title="Protection Settings" subtitle="Configure the enforced protection layers on your VIGISCAM™ account">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Settings className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Changes take effect immediately and are enforced on every transaction. When <strong>Elder Mode strict lock</strong> is on, overrides are disabled and high-risk actions require trusted-contact approval.
            </p>
          </div>
        </Card>

        {loadError && (
          <Card className="p-4 border-red-300"><p className="text-sm text-red-600 flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> {loadError}</p></Card>
        )}

        {!settings ? (
          <Card className="p-10 flex items-center gap-2 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading your settings…</Card>
        ) : (
          <>
            {SECTIONS.map((section) => {
              const Icon = section.icon
              return (
                <Card key={section.title} className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0"><Icon className="h-4 w-4 text-primary" /></div>
                    <h3 className="text-sm font-bold text-foreground">{section.title}</h3>
                    {section.badge && <Badge className={`text-[10px] border-0 ${section.badgeColor}`}>{section.badge}</Badge>}
                  </div>
                  <div className="space-y-3">
                    {section.toggles.map((t) => (
                      <div key={t.key} className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{t.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                        </div>
                        <Switch checked={settings[t.key]} onCheckedChange={(v) => set(t.key, v)} className="shrink-0 mt-0.5" />
                      </div>
                    ))}
                  </div>

                  {section.title === "Core Protection Modules" && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">ScamHold auto-hold threshold</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Hold transfers at or above this amount</p>
                          </div>
                          <Select value={thresholdLabel} onValueChange={(v) => set("highRiskAmountThresholdMinor", THRESHOLDS.find((t) => t.label === v)?.minor ?? 100000)}>
                            <SelectTrigger className="w-48 h-9 shrink-0"><SelectValue /></SelectTrigger>
                            <SelectContent>{THRESHOLDS.map((t) => <SelectItem key={t.label} value={t.label}>{t.label}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">Guardian Pause duration</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Length of the cooling-off countdown</p>
                          </div>
                          <Select value={durationLabel} onValueChange={(v) => set("guardianPauseDurationSeconds", DURATIONS.find((d) => d.label === v)?.s ?? 30)}>
                            <SelectTrigger className="w-48 h-9 shrink-0"><SelectValue /></SelectTrigger>
                            <SelectContent>{DURATIONS.map((d) => <SelectItem key={d.label} value={d.label}>{d.label}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}
                </Card>
              )
            })}

            <div className="flex justify-end pt-2">
              <Button onClick={save} disabled={saving} className="min-w-32">
                {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving…</> : saved ? "Saved!" : "Save All Settings"}
              </Button>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  )
}
