'use client'

import { useState } from "react"
import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Heart, UserPlus, Bell, Shield, Phone, Mail, Edit, Trash2,
  CheckCircle, Lock, CreditCard, Eye, AlertTriangle
} from "lucide-react"

const contacts = [
  {
    id: "TC-001",
    name: "Margaret Smith",
    relation: "Mother",
    phone: "+61 4 1111 2222",
    email: "margaret@example.com",
    role: "Guardian",
    verified: true,
    permissions: {
      scamhold: true,
      giftcardguard: true,
      walletguard: true,
      emergencyAlerts: true,
      approvalReview: true,
    },
    notifyOn: ["High Risk Calls", "ScamHold Pauses", "Gift Card Blocks", "Remote Access Attempts"],
  },
  {
    id: "TC-002",
    name: "James Smith",
    relation: "Son",
    phone: "+61 4 3333 4444",
    email: "james@example.com",
    role: "Emergency Contact",
    verified: true,
    permissions: {
      scamhold: false,
      giftcardguard: true,
      walletguard: false,
      emergencyAlerts: true,
      approvalReview: false,
    },
    notifyOn: ["Critical Alerts Only"],
  },
  {
    id: "TC-003",
    name: "Dr. Sarah Lee",
    relation: "Financial Advisor",
    phone: "+61 2 5555 6666",
    email: "sarah@advisor.com",
    role: "Verify Only",
    verified: false,
    permissions: {
      scamhold: false,
      giftcardguard: false,
      walletguard: false,
      emergencyAlerts: false,
      approvalReview: true,
    },
    notifyOn: [],
  },
]

const permissionLabels: Record<string, { label: string; icon: React.ElementType; desc: string }> = {
  scamhold: { label: "ScamHold AI™", icon: Lock, desc: "Can review and approve ScamHold pauses" },
  giftcardguard: { label: "GiftCardGuard™", icon: CreditCard, desc: "Can approve gift card purchase requests" },
  walletguard: { label: "WalletGuard AI™", icon: Shield, desc: "Notified of suspicious wallet checks" },
  emergencyAlerts: { label: "Emergency Alerts", icon: AlertTriangle, desc: "Receives critical threat notifications" },
  approvalReview: { label: "Approval Review", icon: Eye, desc: "Can review and vote on pending actions" },
}

export default function TrustedContactsPage() {
  const [showAdd, setShowAdd] = useState(false)
  const [editContact, setEditContact] = useState<typeof contacts[0] | null>(null)

  return (
    <PageLayout role="individual" title="Trusted Contacts" subtitle="People who can help verify, approve, and respond to scam threats on your behalf">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <Card className="p-5 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground">How Trusted Contacts Work</p>
              <p className="text-sm text-muted-foreground mt-1">
                Trusted Contacts are notified when you encounter a high-risk event. Guardians can pause financial transactions and approve actions on your behalf.
                You control exactly what each contact can see and do.
              </p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Total Contacts", value: "3", color: "text-primary", bg: "bg-primary/10" },
            { label: "Guardians", value: "1", color: "text-green-600", bg: "bg-green-50" },
            { label: "Verified", value: "2", color: "text-green-600", bg: "bg-green-50" },
            { label: "Alerts Sent This Month", value: "4", color: "text-orange-600", bg: "bg-orange-50" },
          ].map((s, i) => (
            <Card key={i} className="p-5">
              <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
                <Heart className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </Card>
          ))}
        </div>

        {/* Contact List Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-foreground">Your Contacts</h2>
          <Button size="sm" className="flex items-center gap-2" onClick={() => setShowAdd(true)}>
            <UserPlus className="h-4 w-4" /> Add Contact
          </Button>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4">
          {contacts.map((c) => (
            <Card key={c.id} className="p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary">{c.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-foreground">{c.name}</h3>
                      {c.verified && <CheckCircle className="h-4 w-4 text-green-600" />}
                      <Badge className="text-xs border-0 bg-primary/10 text-primary">{c.role}</Badge>
                      <Badge className="text-xs border-0 bg-muted text-muted-foreground">{c.relation}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{c.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{c.email}</span>
                    </div>
                    {c.notifyOn.length > 0 && (
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <Bell className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Notified for:</span>
                        {c.notifyOn.map((n) => (
                          <Badge key={n} className="text-[10px] border-0 bg-blue-50 text-blue-700">{n}</Badge>
                        ))}
                      </div>
                    )}
                    {!c.verified && (
                      <p className="text-xs text-yellow-600 mt-2">Pending verification — an email has been sent to confirm</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="h-8" onClick={() => setEditContact(c)}><Edit className="h-3.5 w-3.5" /></Button>
                  <Button size="sm" variant="ghost" className="h-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>

              {/* Module Permissions */}
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Module Permissions</p>
                <div className="grid sm:grid-cols-3 gap-2">
                  {Object.entries(c.permissions).map(([key, enabled]) => {
                    const perm = permissionLabels[key]
                    if (!perm) return null
                    const Icon = perm.icon
                    return (
                      <div key={key} className={`flex items-center gap-2 p-2 rounded-md ${enabled ? "bg-green-50" : "bg-muted/40"}`}>
                        <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${enabled ? "text-green-600" : "text-muted-foreground"}`} />
                        <span className={`text-xs font-medium ${enabled ? "text-green-800" : "text-muted-foreground"}`}>{perm.label}</span>
                        {enabled ? <CheckCircle className="h-3 w-3 text-green-600 ml-auto" /> : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Guardian Pause Info */}
        <Card className="p-5 border-border">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground">Guardian Pause</p>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                A Guardian Contact can request a temporary pause on your bank transactions if you become unreachable during a suspected scam.
                This must be enabled separately with your participating bank.
              </p>
              <Button size="sm" variant="outline">Set Up Guardian Pause</Button>
            </div>
          </div>
        </Card>

        {/* Add Contact Modal */}
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Trusted Contact</DialogTitle>
              <DialogDescription>Add a trusted person who can help protect you from scams.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Full Name</Label>
                  <Input placeholder="e.g. Margaret Smith" className="h-9" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Relationship</Label>
                  <Input placeholder="e.g. Mother, Son" className="h-9" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Phone</Label>
                  <Input placeholder="+61 4 ..." className="h-9" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Email</Label>
                  <Input placeholder="email@example.com" className="h-9" />
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Role</Label>
                <Select defaultValue="emergency">
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guardian">Guardian (full permissions)</SelectItem>
                    <SelectItem value="emergency">Emergency Contact (alerts only)</SelectItem>
                    <SelectItem value="verify">Verify Only (approval review)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-semibold text-foreground mb-3">Module Permissions</p>
                <div className="space-y-3">
                  {Object.entries(permissionLabels).map(([key, perm]) => {
                    const Icon = perm.icon
                    return (
                      <div key={key} className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <Icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{perm.label}</p>
                            <p className="text-xs text-muted-foreground">{perm.desc}</p>
                          </div>
                        </div>
                        <Switch defaultChecked={key === "emergencyAlerts"} />
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">Send Invitation</Button>
                <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  )
}
