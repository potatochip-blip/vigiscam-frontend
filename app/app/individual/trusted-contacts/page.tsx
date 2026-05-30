'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, UserPlus, Bell, Shield, Phone, Mail, Edit, Trash2, CheckCircle } from "lucide-react"

const contacts = [
  { name: "Margaret Smith", relation: "Mother", phone: "+61 4 1111 2222", email: "margaret@example.com", role: "Guardian", notifyOn: ["High Risk Calls", "Remote Access", "Evidence Saved"], verified: true },
  { name: "James Smith", relation: "Son", phone: "+61 4 3333 4444", email: "james@example.com", role: "Emergency Contact", notifyOn: ["Critical Alerts"], verified: true },
  { name: "Dr. Sarah Lee", relation: "Financial Advisor", phone: "+61 2 5555 6666", email: "sarah@advisor.com", role: "Verify Only", notifyOn: [], verified: false },
]

export default function TrustedContactsPage() {
  return (
    <PageLayout role="individual" title="Trusted Contacts" subtitle="People who can help verify and respond to scam threats">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Info */}
        <Card className="p-5 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground">How Trusted Contacts Work</p>
              <p className="text-sm text-muted-foreground mt-1">
                Trusted Contacts can be notified when you encounter a high-risk event. They can also be set as Guardians who can pause transactions on your behalf if you become unreachable during a suspected scam.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-foreground">Your Contacts ({contacts.length})</h2>
          <Button size="sm" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Add Contact
          </Button>
        </div>

        <div className="space-y-4">
          {contacts.map((c, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-start justify-between gap-4">
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
                      <p className="text-xs text-yellow-600 mt-2">Pending verification — an email was sent to confirm</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="h-8"><Edit className="h-3.5 w-3.5" /></Button>
                  <Button size="sm" variant="ghost" className="h-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
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
                A Guardian Contact can request a temporary pause on your bank transactions if you become unreachable. Your bank must verify the request. This feature must be enabled with your bank separately.
              </p>
              <Button size="sm" variant="outline">Set Up Guardian Pause</Button>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
