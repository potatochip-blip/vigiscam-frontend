'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Edit, Trash2, Shield, AlertTriangle } from "lucide-react"

export default function FamilyMembersPage() {
  return (
    <PageLayout role="family" title="Family Members" subtitle="Manage and monitor your family's protection">
      <div className="space-y-6">
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Family Member</Button>

        {[
          { id: "MEM-001", name: "Mom (Linda Chen)", email: "linda@example.com", phone: "+1 555-0100", role: "Primary", status: "Protected", riskLevel: "Low", lastseen: "1 min ago" },
          { id: "MEM-002", name: "Dad (Robert Chen)", email: "robert@example.com", phone: "+1 555-0101", role: "Primary", status: "Protected", riskLevel: "Low", lastseen: "30 min ago" },
          { id: "MEM-003", name: "Grandma (Margaret Lee)", email: "margaret@example.com", phone: "+1 555-0102", role: "Secondary", status: "Protected", riskLevel: "Medium", lastseen: "2 hours ago" },
          { id: "MEM-004", name: "Sister (Emma Chen)", email: "emma@example.com", phone: "+1 555-0103", role: "Secondary", status: "Protected", riskLevel: "Low", lastseen: "5 hours ago" },
        ].map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <Badge variant="outline">{member.role}</Badge>
                  <Badge className={member.riskLevel === "Low" ? "bg-green-100 text-green-700 border-0" : "bg-yellow-100 text-yellow-700 border-0"}>{member.riskLevel}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Last seen: {member.lastseen}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><Shield className="h-3 w-3" /> View</Button>
                <Button size="sm" variant="outline" className="gap-1"><Edit className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline" className="gap-1"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium text-foreground">{member.email}</p></div>
              <div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium text-foreground">{member.phone}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
