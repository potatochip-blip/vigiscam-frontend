"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  AlertTriangle,
  CheckCircle2,
  Search,
  Phone,
  Mail,
  Globe,
  Wallet,
  Shield,
  AlertCircle,
  MessageSquare,
  Building2,
  Monitor,
  CreditCard,
  Archive,
  Bell,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react"
import { mockRegistryEntries } from "@/lib/scam-intelligence-data"
import { VerificationBadge } from "@/components/scam-intelligence/verification-badge"
import { IndicatorTypeBadge } from "@/components/scam-intelligence/indicator-type-badge"
import { VigiscamLogo } from "@/components/vigiscam-logo"

// Mock result that matches the spec exactly — shown when a "tech support" query is entered
const DEMO_RESULT = {
  riskScore: 91,
  category: "Tech Support Remote Access Scam",
  matchedPatterns: [
    "Remote support pressure language",
    '"Do not tell anyone" secrecy pattern',
    "AnyDesk/TeamViewer instruction",
    "Fake Microsoft support cluster",
  ],
  similarReports: 218,
  lastSeen: "2026-05-15",
  suggestedAction:
    "Do not continue. End the session. Do not share codes or credentials. Contact a trusted person immediately.",
  linkedNetwork: "Tech Support Cluster A",
  confidence: 94,
  status: "verified-scam-intelligence" as const,
}

type TabType = "message" | "phone" | "email" | "domain" | "wallet" | "company" | "remote" | "payment"

const tabs: { value: TabType; label: string; icon: React.ElementType; placeholder: string }[] = [
  { value: "message", label: "Message", icon: MessageSquare, placeholder: "Paste a suspicious message or script here..." },
  { value: "phone", label: "Phone", icon: Phone, placeholder: "+1-877-288-4101" },
  { value: "email", label: "Email", icon: Mail, placeholder: "support@ms-helpdesk.net" },
  { value: "domain", label: "Domain", icon: Globe, placeholder: "microsoft-support-helpdesk.com" },
  { value: "wallet", label: "Wallet", icon: Wallet, placeholder: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
  { value: "company", label: "Company", icon: Building2, placeholder: "Fake company or support service name..." },
  { value: "remote", label: "Remote Tool", icon: Monitor, placeholder: "AnyDesk ID, TeamViewer code, or session link..." },
  { value: "payment", label: "Payment", icon: CreditCard, placeholder: "Gift card instructions, wire details, or payment instructions..." },
]

function RiskScoreMeter({ score }: { score: number }) {
  const color = score >= 80 ? "bg-red-500" : score >= 60 ? "bg-orange-500" : "bg-yellow-500"
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Risk Score</span>
        <span className={`text-2xl font-bold ${score >= 80 ? "text-red-600" : score >= 60 ? "text-orange-600" : "text-yellow-600"}`}>
          {score} <span className="text-sm text-muted-foreground">/ 100</span>
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export default function CheckIndicatorPage() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState<TabType>("phone")
  const [results, setResults] = useState<typeof mockRegistryEntries | null>(null)
  const [showDemoResult, setShowDemoResult] = useState(false)
  const [searched, setSearched] = useState(false)
  const [saved, setSaved] = useState(false)
  const [reported, setReported] = useState(false)
  const [alerted, setAlerted] = useState(false)
  const { toast } = useToast()

  const handleSearch = () => {
    if (!query.trim()) return
    setSearched(true)
    setSaved(false)
    setReported(false)
    setAlerted(false)

    const lower = query.toLowerCase()
    // Show the detailed demo result for queries that contain "microsoft", "anydesk", "teamviewer", or "remote"
    const isDemoTrigger =
      lower.includes("microsoft") ||
      lower.includes("anydesk") ||
      lower.includes("teamviewer") ||
      lower.includes("remote") ||
      lower.includes("support") ||
      lower.includes("877") ||
      lower.includes("tech")

    setShowDemoResult(isDemoTrigger)

    const foundEntries = mockRegistryEntries.filter((entry) =>
      entry.indicator.toLowerCase().includes(lower)
    )
    setResults(foundEntries)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  const handleSave = () => {
    setSaved(true)
    toast({ title: "Saved to Evidence Vault", description: "This result has been added to your Evidence Vault for safekeeping." })
  }

  const handleReport = () => {
    setReported(true)
    toast({ title: "Report submitted", description: "Your report has been submitted for private VIGISCAM™ review." })
  }

  const handleAlert = () => {
    setAlerted(true)
    toast({ title: "Family alert sent", description: "A safety alert has been sent to your trusted contacts." })
  }

  const hasAnyResult = showDemoResult || (results && results.length > 0)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 border-b py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <VigiscamLogo size="sm" variant="icon" />
                <div className="border-l border-muted pl-3">
                  <span className="text-sm font-medium text-muted-foreground block">ScamPulse AI™ Check</span>
                  <span className="text-xs text-muted-foreground">Powered by SCAMZY™ Live Intelligence</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Check Against Live Scam Intelligence</h1>
              <p className="text-lg text-muted-foreground">
                Enter a suspicious message, phone number, email, website, domain, URL, crypto wallet, fake company name, remote access instruction, or payment instruction to check it against VIGISCAM™ verified scam intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="bg-white border-b py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Check an Indicator</CardTitle>
                  <CardDescription>Select a category and enter your indicator below</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as TabType); setQuery("") }}>
                    <TabsList className="grid w-full grid-cols-4 mb-2">
                      {tabs.slice(0, 4).map((tab) => {
                        const Icon = tab.icon
                        return (
                          <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-1 text-xs">
                            <Icon className="h-3 w-3" />
                            {tab.label}
                          </TabsTrigger>
                        )
                      })}
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-4 mb-4">
                      {tabs.slice(4).map((tab) => {
                        const Icon = tab.icon
                        return (
                          <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-1 text-xs">
                            <Icon className="h-3 w-3" />
                            {tab.label}
                          </TabsTrigger>
                        )
                      })}
                    </TabsList>

                    {tabs.map((tab) => (
                      <TabsContent key={tab.value} value={tab.value} className="mt-0">
                        {tab.value === "message" ? (
                          <div className="space-y-2">
                            <Label htmlFor="message-input">{tab.label}</Label>
                            <Textarea
                              id="message-input"
                              placeholder={tab.placeholder}
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              rows={4}
                              className="resize-none"
                            />
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label htmlFor={`${tab.value}-input`}>{tab.label}</Label>
                            <Input
                              id={`${tab.value}-input`}
                              placeholder={tab.placeholder}
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              onKeyPress={handleKeyPress}
                            />
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>

                  <Button onClick={handleSearch} className="w-full" disabled={!query.trim()}>
                    <Search className="h-4 w-4 mr-2" />
                    Check Against Live Intelligence
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Results */}
        {searched && (
          <section className="bg-white py-10">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto space-y-4">

                {/* Demo high-detail result */}
                {showDemoResult && (
                  <Card className="border-red-300 bg-red-50">
                    <CardContent className="pt-4 space-y-5">
                      {/* Alert banner */}
                      <Alert className="bg-red-100 border-red-300">
                        <AlertTriangle className="h-4 w-4 text-red-700" />
                        <AlertTitle className="text-red-900 font-bold">HIGH SCAM RISK DETECTED</AlertTitle>
                        <AlertDescription className="text-red-800">
                          This indicator matches active scam intelligence. Do not engage further.
                        </AlertDescription>
                      </Alert>

                      {/* Risk Score Meter */}
                      <RiskScoreMeter score={DEMO_RESULT.riskScore} />

                      {/* Category + Confidence */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Scam Category</Label>
                          <div className="mt-1">
                            <Badge variant="destructive" className="text-xs">{DEMO_RESULT.category}</Badge>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Intelligence Confidence</Label>
                          <p className="text-sm font-bold mt-1">{DEMO_RESULT.confidence}%</p>
                        </div>
                      </div>

                      {/* Matched Intelligence Patterns */}
                      <div>
                        <Label className="text-xs text-muted-foreground">Matched Intelligence Patterns</Label>
                        <div className="mt-2 space-y-1.5">
                          {DEMO_RESULT.matchedPatterns.map((pattern) => (
                            <div key={pattern} className="flex items-center gap-2 text-sm text-red-900">
                              <AlertTriangle className="h-3.5 w-3.5 text-red-600 flex-shrink-0" />
                              {pattern}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Similar reports + last seen */}
                      <div className="grid grid-cols-3 gap-4 pt-3 border-t border-red-200">
                        <div>
                          <Label className="text-xs text-muted-foreground">Similar Reports</Label>
                          <p className="text-lg font-bold mt-1">{DEMO_RESULT.similarReports}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Last Seen</Label>
                          <p className="text-sm font-medium mt-1">{new Date(DEMO_RESULT.lastSeen).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Linked Cluster</Label>
                          <p className="text-xs font-medium mt-1 leading-tight">{DEMO_RESULT.linkedNetwork}</p>
                        </div>
                      </div>

                      {/* Suggested Action */}
                      <div className="bg-white border border-red-200 rounded-md p-3">
                        <Label className="text-xs text-muted-foreground block mb-1">Recommended Action</Label>
                        <p className="text-sm font-semibold text-red-900">{DEMO_RESULT.suggestedAction}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-red-200">
                        <Button
                          size="sm"
                          variant={saved ? "secondary" : "outline"}
                          className="gap-1.5 text-xs bg-white border-red-300 hover:bg-red-50"
                          onClick={handleSave}
                          disabled={saved}
                        >
                          <Archive className="h-3.5 w-3.5" />
                          {saved ? "Saved" : "Save to Vault"}
                        </Button>
                        <Button
                          size="sm"
                          variant={reported ? "secondary" : "outline"}
                          className="gap-1.5 text-xs bg-white border-red-300 hover:bg-red-50"
                          onClick={handleReport}
                          disabled={reported}
                        >
                          <AlertCircle className="h-3.5 w-3.5" />
                          {reported ? "Reported" : "Report Activity"}
                        </Button>
                        <Button
                          size="sm"
                          variant={alerted ? "secondary" : "outline"}
                          className="gap-1.5 text-xs bg-white border-red-300 hover:bg-red-50"
                          onClick={handleAlert}
                          disabled={alerted}
                        >
                          <Bell className="h-3.5 w-3.5" />
                          {alerted ? "Alerted" : "Family Alert"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Registry results */}
                {results && results.map((result) => (
                  <Card key={result.id} className="border-orange-200 bg-orange-50">
                    <CardContent className="pt-4 space-y-4">
                      <Alert className="bg-red-50 border-red-200">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-900">VERIFIED SCAM INDICATOR</AlertTitle>
                        <AlertDescription className="text-red-800">
                          This indicator is listed in the VIGISCAM™ Scam Intelligence Registry.
                        </AlertDescription>
                      </Alert>
                      <div>
                        <Label className="text-xs text-muted-foreground">Indicator</Label>
                        <div className="font-mono text-sm font-medium mt-1 break-all">{result.indicator}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Status</Label>
                          <div className="mt-1"><VerificationBadge status={result.status} size="sm" /></div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Type</Label>
                          <div className="mt-1"><IndicatorTypeBadge type={result.type} size="sm" /></div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Summary</Label>
                        <p className="text-sm mt-1">{result.summary}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                        <div>
                          <Label className="text-xs text-muted-foreground">Scam Type</Label>
                          <Badge variant="secondary" className="mt-1">{result.scamFamily}</Badge>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Verified Cases</Label>
                          <p className="text-sm font-medium mt-1">{result.caseCount}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Last Seen</Label>
                          <p className="text-sm mt-1">{new Date(result.lastSeen).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="bg-white border border-orange-200 rounded-md p-3">
                        <Label className="text-xs text-muted-foreground block mb-1">Recommended Action</Label>
                        <p className="text-sm font-semibold">{result.recommendedAction}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-orange-200">
                        <Button size="sm" variant="outline" className="gap-1.5 text-xs bg-white" onClick={handleSave} disabled={saved}>
                          <Archive className="h-3.5 w-3.5" />
                          {saved ? "Saved" : "Save to Vault"}
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1.5 text-xs bg-white" onClick={handleReport} disabled={reported}>
                          <AlertCircle className="h-3.5 w-3.5" />
                          {reported ? "Reported" : "Report"}
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1.5 text-xs bg-white" onClick={handleAlert} disabled={alerted}>
                          <Bell className="h-3.5 w-3.5" />
                          {alerted ? "Alerted" : "Alert Family"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Not found */}
                {!hasAnyResult && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-green-900 mb-1">No Verified Match Found</h3>
                          <p className="text-sm text-green-800 mb-3">
                            This indicator is not in our verified scam intelligence database. This does not mean the item is safe — use caution and submit a report if suspicious.
                          </p>
                          <Button size="sm" variant="outline" className="bg-white border-green-300 text-green-800 gap-1.5" onClick={handleReport}>
                            <AlertCircle className="h-3.5 w-3.5" />
                            Submit a Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

              </div>
            </div>
          </section>
        )}

        {/* Safety Tips */}
        <section className="bg-slate-50 border-t py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Safety Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      If Flagged
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Do not call the number or click any links</li>
                      <li>Do not give remote access to anyone</li>
                      <li>Do not share codes, passwords, or financial details</li>
                      <li>End the call or close the session immediately</li>
                      <li>Contact a trusted person or call your bank</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Not Found — Still Be Cautious
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <ul className="list-disc list-inside space-y-1">
                      <li>New scam numbers appear every day</li>
                      <li>Not in the registry does not mean safe</li>
                      <li>Submit a report so others can be protected</li>
                      <li>Check the scam types library for pattern recognition</li>
                      <li>Trust your instincts — end suspicious contact</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <Toaster />
    </>
  )
}
