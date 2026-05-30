'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, Phone, Globe, MessageSquare, Upload, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

const mockResult = {
  score: 87,
  verdict: "High Risk",
  type: "Bank Impersonation",
  signals: [
    "Phone number not registered to any bank",
    "Caller used high-pressure urgency tactics",
    "Requested wire transfer to external account",
    "Script matches known ANZ impersonation pattern",
  ],
  recommendation: "Do not proceed. Hang up and call your bank directly using the number on the back of your card.",
}

export default function ScamCheckPage() {
  const [tab, setTab] = useState<"phone" | "url" | "text" | "file">("phone")
  const [input, setInput] = useState("")
  const [result, setResult] = useState<typeof mockResult | null>(null)
  const [loading, setLoading] = useState(false)

  const runCheck = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setResult(mockResult) }, 1500)
  }

  return (
    <PageLayout role="individual" title="Scam Check" subtitle="Check any phone number, URL, message, or file for scam indicators">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Check Type Tabs */}
        <Card className="p-6">
          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              { key: "phone", label: "Phone Number", icon: Phone },
              { key: "url", label: "URL / Link", icon: Globe },
              { key: "text", label: "Message / Script", icon: MessageSquare },
              { key: "file", label: "File / Screenshot", icon: Upload },
            ].map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.key}
                  onClick={() => { setTab(t.key as typeof tab); setResult(null) }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              )
            })}
          </div>

          {tab === "text" ? (
            <Textarea
              placeholder="Paste the suspicious message, script, or email text here..."
              className="mb-4 min-h-32"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : tab === "file" ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Drop a screenshot, audio file, or document here</p>
              <Button variant="outline" size="sm" className="mt-3">Browse Files</Button>
            </div>
          ) : (
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={tab === "phone" ? "Enter phone number e.g. +61 2 1234 5678" : "Enter URL e.g. https://suspicious-link.com"}
                className="pl-9"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          )}

          <Button onClick={runCheck} disabled={loading} className="w-full">
            {loading ? "Analyzing..." : "Run Scam Check"}
          </Button>
        </Card>

        {/* Result */}
        {result && (
          <Card className={`p-6 border-2 ${result.score > 70 ? "border-red-300" : result.score > 40 ? "border-yellow-300" : "border-green-300"}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {result.score > 70 ? <XCircle className="h-5 w-5 text-red-600" /> : <CheckCircle className="h-5 w-5 text-green-600" />}
                  <h2 className="text-xl font-bold text-foreground">{result.verdict}</h2>
                </div>
                <p className="text-sm text-muted-foreground">Scam Type: <span className="font-medium text-foreground">{result.type}</span></p>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${result.score > 70 ? "text-red-600" : "text-green-600"}`}>{result.score}</div>
                <p className="text-xs text-muted-foreground">Risk Score / 100</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-bold text-foreground mb-2">Detection Signals</h3>
              <ul className="space-y-1.5">
                {result.signals.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm font-medium text-red-700">{result.recommendation}</p>
            </div>

            <div className="flex gap-2 mt-4">
              <Button size="sm">Save to Evidence Vault</Button>
              <Button size="sm" variant="outline">Report to Authorities</Button>
            </div>
          </Card>
        )}

        {/* Recent Checks */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Checks</h2>
          <div className="space-y-3">
            {[
              { input: "+61 2 9876 5432", result: "High Risk", type: "Bank Impersonation", score: 92, time: "2h ago" },
              { input: "https://nab-secure-login.net", result: "High Risk", type: "Phishing URL", score: 98, time: "1d ago" },
              { input: "+61 3 5555 1234", result: "Low Risk", type: "Legitimate", score: 12, time: "3d ago" },
            ].map((check, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg text-sm">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{check.input}</p>
                  <p className="text-xs text-muted-foreground">{check.type}</p>
                </div>
                <Badge className={`text-xs border-0 ${check.score > 70 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                  {check.score}/100
                </Badge>
                <span className="text-xs text-muted-foreground">{check.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
