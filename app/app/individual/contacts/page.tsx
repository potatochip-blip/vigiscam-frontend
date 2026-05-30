'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Edit, Trash2 } from "lucide-react"

export default function IndividualTrustedContactsPage() {
  return (
    <PageLayout role="individual" title="Trusted Contacts" subtitle="Add family and friends to help verify identity">
      <div className="space-y-6">
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Trusted Contact</Button>

        {[
          { id: "CTN-001", name: "Mom (Linda Chen)", phone: "+1 555-0100", email: "linda@example.com", status: "Verified", role: "Primary Guardian" },
          { id: "CTN-002", name: "Brother (David Chen)", phone: "+1 555-0101", email: "david@example.com", status: "Verified", role: "Secondary Guardian" },
          { id: "CTN-003", name: "Best Friend (Sarah)", phone: "+1 555-0102", email: "sarah@example.com", status: "Pending", role: "Assistant" },
        ].map((contact) => (
          <Card key={contact.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{contact.name}</h3>
                  <Badge className={contact.status === "Verified" ? "bg-green-100 text-green-700 border-0" : "bg-yellow-100 text-yellow-700 border-0"}>{contact.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{contact.role}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><Edit className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline" className="gap-1"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium text-foreground">{contact.phone}</p></div>
              <div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium text-foreground">{contact.email}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
