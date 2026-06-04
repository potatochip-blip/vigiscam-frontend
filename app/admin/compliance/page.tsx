'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, CheckCircle, Loader2, AlertTriangle, FileText } from "lucide-react"
import { useAdminCompliance } from "@/lib/hooks"

type ComplianceData = {
  dataSubjectRequests?: unknown[]
  retentionPolicies?: unknown[]
  legalHolds?: unknown[]
  openCount?: number
}

// Static platform certifications (company facts, not tenant data).
const CERTS = [
  { standard: "SOC 2 Type II", expires: "In progress" },
  { standard: "ISO 27001", expires: "In progress" },
  { standard: "GDPR Aligned", expires: "Ongoing" },
]

export default function AdminCompliancePage() {
  const { data, isLoading, error } = useAdminCompliance()
  const c = (data ?? {}) as ComplianceData

  return (
    <PageLayout role="admin" title="Compliance & Regulations" subtitle="Manage compliance requirements and certifications">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-4">
          {CERTS.map((cert) => (
            <Card key={cert.standard} className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">{cert.standard}</p>
              <p className="text-xs text-muted-foreground">{cert.expires}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> Data-Subject Requests &amp; Legal Holds
          </h3>
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
          ) : error ? (
            <div className="flex items-center gap-2 text-red-600 text-sm"><AlertTriangle className="h-4 w-4" /> Could not load compliance data.</div>
          ) : (
            <div className="space-y-3">
              <div className="grid sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded bg-muted/40"><p className="text-xs text-muted-foreground">Open Requests</p><p className="text-xl font-bold">{c.openCount ?? (c.dataSubjectRequests?.length ?? 0)}</p></div>
                <div className="p-3 rounded bg-muted/40"><p className="text-xs text-muted-foreground">Legal Holds</p><p className="text-xl font-bold">{c.legalHolds?.length ?? 0}</p></div>
                <div className="p-3 rounded bg-muted/40"><p className="text-xs text-muted-foreground">Retention Policies</p><p className="text-xl font-bold">{c.retentionPolicies?.length ?? 0}</p></div>
              </div>
              {(c.dataSubjectRequests?.length ?? 0) === 0 && (
                <p className="text-sm text-muted-foreground flex items-center gap-2"><FileText className="h-4 w-4" /> No open data-subject requests or legal holds.</p>
              )}
            </div>
          )}
        </Card>
      </div>
    </PageLayout>
  )
}
