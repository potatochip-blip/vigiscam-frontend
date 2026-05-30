'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Archive, FileText, Mic, Video, Image, Download, Trash2, Search, Lock, Upload, Eye, Pause } from "lucide-react"

const evidence = [
  { name: "Guardian Pause™ — Urgency + Secrecy Event", type: "pause", size: "12 KB", date: "Today 15:14", tags: ["Human Pause", "Critical", "ScamHold AI™"], hash: "sha256:gp991..." },
  { name: "Guardian Pause™ — Gift Card Code Reveal Block", type: "pause", size: "8 KB", date: "Today 13:52", tags: ["Human Pause", "High Risk", "GiftCardGuard™"], hash: "sha256:gp887..." },
  { name: "Call Recording — +61 2 9876 5432", type: "audio", size: "2.4 MB", date: "Yesterday 14:25", tags: ["Bank Impersonation", "High Risk"], hash: "sha256:a3f4c..." },
  { name: "AnyDesk Block Log — AD-48829331", type: "doc", size: "44 KB", date: "Yesterday 14:25", tags: ["Remote Access", "Blocked"], hash: "sha256:b8e91..." },
  { name: "Phishing SMS Screenshot", type: "image", size: "890 KB", date: "2 days ago", tags: ["Phishing", "SMS"], hash: "sha256:d2a7f..." },
  { name: "Scam Email Export", type: "doc", size: "120 KB", date: "3 days ago", tags: ["Email Scam", "Gift Card"], hash: "sha256:e1c34..." },
  { name: "Video Call — Deepfake Detected", type: "video", size: "18.7 MB", date: "1 week ago", tags: ["Deepfake", "High Risk"], hash: "sha256:f9d56..." },
]

const typeIcon: Record<string, typeof Archive> = { audio: Mic, doc: FileText, image: Image, video: Video, pause: Pause }
const typeColor: Record<string, string> = { audio: "text-blue-600", doc: "text-orange-600", image: "text-purple-600", video: "text-red-600", pause: "text-primary" }
const typeBg: Record<string, string> = { audio: "bg-blue-50", doc: "bg-orange-50", image: "bg-purple-50", video: "bg-red-50", pause: "bg-primary/10" }

export default function EvidenceVaultPage() {
  return (
    <PageLayout role="individual" title="Evidence Vault" subtitle="Encrypted, tamper-evident storage for scam evidence">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Security Banner */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">End-to-End Encrypted Vault</p>
              <p className="text-xs text-muted-foreground">All evidence is encrypted with your personal key. VIGISCAM™ cannot access the contents of your vault.</p>
            </div>
            <Button size="sm" variant="outline">Manage Encryption Key</Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: "Total Items", value: "25" },
            { label: "Human Pause Events", value: "12" },
            { label: "Court-Ready Packages", value: "3" },
            { label: "Retention Period", value: "90 days" },
          ].map((s, i) => (
            <Card key={i} className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Actions Row */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search evidence..." className="pl-9 h-9" />
          </div>
          <Button size="sm" className="flex items-center gap-2">
            <Upload className="h-4 w-4" /> Upload Evidence
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export Package
          </Button>
        </div>

        {/* Evidence List */}
        <Card className="divide-y divide-border">
          {evidence.map((item, i) => {
            const Icon = typeIcon[item.type]
            return (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                <div className={`w-10 h-10 rounded-lg ${typeBg[item.type]} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${typeColor[item.type]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {item.tags.map((tag) => (
                      <Badge key={tag} className="text-[10px] border-0 bg-muted text-muted-foreground">{tag}</Badge>
                    ))}
                    <span className="text-xs text-muted-foreground">{item.size} · {item.date}</span>
                  </div>
                  <code className="text-[10px] text-muted-foreground">{item.hash}</code>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="h-8">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )
          })}
        </Card>
      </div>
    </PageLayout>
  )
}
