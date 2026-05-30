import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Archive, FileText, Mic, Download, Trash2, Lock, Eye } from "lucide-react"

const evidence = [
  { member: "Margaret Smith", name: "Call Recording — Bank Impersonation", type: "audio", size: "2.4 MB", date: "Today 14:23", tags: ["Bank Impersonation", "High Risk"] },
  { member: "Margaret Smith", name: "Phishing Email Export", type: "doc", size: "88 KB", date: "Today 10:05", tags: ["Phishing", "Email"] },
  { member: "Robert Smith", name: "SMS Scam Screenshot", type: "image", size: "440 KB", date: "3 days ago", tags: ["SMS", "Low Risk"] },
]

export default function FamilyEvidencePage() {
  return (
    <PageLayout role="family" title="Family Evidence" subtitle="Evidence collected from all protected family members">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-primary" />
            <p className="text-sm text-foreground">All family evidence is encrypted. Only you and authorized family members can access this vault.</p>
          </div>
        </Card>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-foreground">Evidence Items ({evidence.length})</h2>
          <Button size="sm" variant="outline" className="flex items-center gap-2"><Download className="h-4 w-4" />Export All</Button>
        </div>
        <Card className="divide-y divide-border">
          {evidence.map((e, i) => (
            <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                {e.type === "audio" ? <Mic className="h-4 w-4 text-primary" /> : <FileText className="h-4 w-4 text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-primary">{e.member}</span>
                </div>
                <p className="text-sm font-semibold text-foreground truncate">{e.name}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {e.tags.map((t) => <Badge key={t} className="text-[10px] border-0 bg-muted text-muted-foreground">{t}</Badge>)}
                  <span className="text-xs text-muted-foreground">{e.size} · {e.date}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-8"><Eye className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="ghost" className="h-8"><Download className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="ghost" className="h-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </PageLayout>
  )
}
