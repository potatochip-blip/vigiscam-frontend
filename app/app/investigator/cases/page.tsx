'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Search, Plus, Users, Clock, MoreVertical, Filter } from "lucide-react"

const cases = [
  { id: "CASE-2847", name: "Operation Phantom Wire", type: "Romance Scam Ring", actors: 24, victims: 847, created: "Dec 15, 2024", status: "Active", priority: "High", lead: "Agent Smith" },
  { id: "CASE-2846", name: "Tech Support Cluster Alpha", type: "Tech Support Fraud", actors: 12, victims: 234, created: "Dec 10, 2024", status: "Active", priority: "Medium", lead: "Agent Johnson" },
  { id: "CASE-2845", name: "Investment Fraud Cell 7", type: "Investment Scam", actors: 8, victims: 156, created: "Dec 5, 2024", status: "Evidence Collection", priority: "High", lead: "Agent Williams" },
  { id: "CASE-2844", name: "Gift Card Scam Network", type: "Gift Card Fraud", actors: 45, victims: 1234, created: "Nov 28, 2024", status: "Prosecution", priority: "High", lead: "Agent Brown" },
  { id: "CASE-2843", name: "Crypto Recovery Scam", type: "Recovery Scam", actors: 6, victims: 89, created: "Nov 20, 2024", status: "Closed", priority: "Low", lead: "Agent Davis" },
]

export default function CasesPage() {
  return (
    <PageLayout role="investigator" title="Case Management" subtitle="Manage and track fraud investigations">
      {/* Actions Bar */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search cases by ID, name, or type..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1"><Filter className="h-4 w-4" /> Filter</Button>
            <Button size="sm" className="gap-1"><Plus className="h-4 w-4" /> New Case</Button>
          </div>
        </div>
      </Card>

      {/* Cases List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-foreground">All Cases ({cases.length})</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export</Button>
          </div>
        </div>

        <div className="space-y-4">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="flex items-center justify-between p-4 bg-muted/40 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  caseItem.priority === "High" ? "bg-red-100" : caseItem.priority === "Medium" ? "bg-amber-100" : "bg-blue-100"
                }`}>
                  <FileText className={`h-5 w-5 ${
                    caseItem.priority === "High" ? "text-red-600" : caseItem.priority === "Medium" ? "text-amber-600" : "text-blue-600"
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{caseItem.name}</p>
                    <Badge variant="outline" className="text-xs">{caseItem.id}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{caseItem.type}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {caseItem.actors} actors</span>
                    <span>{caseItem.victims} victims</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {caseItem.created}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{caseItem.lead}</p>
                  <p className="text-xs text-muted-foreground">Lead Investigator</p>
                </div>
                <Badge className={
                  caseItem.status === "Active" ? "bg-green-100 text-green-700" : 
                  caseItem.status === "Evidence Collection" ? "bg-blue-100 text-blue-700" :
                  caseItem.status === "Prosecution" ? "bg-purple-100 text-purple-700" :
                  "bg-gray-100 text-gray-700"
                }>
                  {caseItem.status}
                </Badge>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {cases.length} cases</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
