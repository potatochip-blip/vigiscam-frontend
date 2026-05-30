'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, AlertTriangle, Clock, Info, Shield } from "lucide-react"

const memberConsents = [
  {
    member: "Margaret Smith", age: 72,
    consents: [
      { type: "Call Monitoring", granted: true, date: "Jan 15, 2025", method: "In-App" },
      { type: "SMS Monitoring", granted: true, date: "Jan 15, 2025", method: "In-App" },
      { type: "Email Scanning", granted: true, date: "Jan 15, 2025", method: "In-App" },
      { type: "Screen Monitoring", granted: true, date: "Jan 15, 2025", method: "In-App" },
      { type: "Evidence Collection", granted: true, date: "Jan 15, 2025", method: "In-App" },
    ]
  },
  {
    member: "Susan Lee", age: 68,
    consents: [
      { type: "Call Monitoring", granted: true, date: "Feb 1, 2025", method: "Email" },
      { type: "SMS Monitoring", granted: false, date: null, method: null },
      { type: "Email Scanning", granted: false, date: null, method: null },
      { type: "Screen Monitoring", granted: false, date: null, method: null },
      { type: "Evidence Collection", granted: true, date: "Feb 1, 2025", method: "Email" },
    ]
  },
]

export default function ConsentManagementPage() {
  return (
    <PageLayout role="family" title="Consent Management" subtitle="Manage and track consent for each protected family member">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-foreground">Consent-Based Monitoring Only</p>
              <p className="text-sm text-muted-foreground">VIGISCAM™ requires informed consent from each protected person. You cannot monitor someone without their knowledge.</p>
            </div>
          </div>
        </Card>

        {memberConsents.map((mc, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-foreground">{mc.member}</h3>
                <p className="text-sm text-muted-foreground">Age {mc.age}</p>
              </div>
              <Button size="sm" variant="outline">Resend Consent Request</Button>
            </div>
            <div className="space-y-3">
              {mc.consents.map((c, j) => (
                <div key={j} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {c.granted ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.type}</p>
                      {c.date && <p className="text-xs text-muted-foreground">Granted {c.date} via {c.method}</p>}
                      {!c.date && <p className="text-xs text-muted-foreground">Not consented</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={c.granted} disabled={!c.granted} />
                    {!c.granted && (
                      <Button size="sm" variant="outline" className="text-xs h-7">Request</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
