import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Radio,
  ScanSearch,
  ShieldCheck,
  Tags,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

const pipeline = [
  { label: "Collect", color: "bg-blue-600" },
  { label: "Score", color: "bg-indigo-600" },
  { label: "Verify", color: "bg-purple-600" },
  { label: "Classify", color: "bg-orange-600" },
  { label: "Use Safely", color: "bg-green-600" },
]

const cards = [
  {
    icon: Radio,
    title: "Collect Signals",
    body: "VIGISCAM™ gathers scam-related signals from approved sources: user reports, public advisories, verified alerts, partner submissions, suspicious URLs, phone numbers, emails, wallets, and known scam language patterns.",
    color: "border-blue-200 bg-blue-50/50",
    iconColor: "text-blue-600",
  },
  {
    icon: ScanSearch,
    title: "Score Reliability",
    body: "Each signal is evaluated by source type, recency, evidence strength, scam category, geographic relevance, repetition, and similarity to known scam patterns.",
    color: "border-indigo-200 bg-indigo-50/50",
    iconColor: "text-indigo-600",
  },
  {
    icon: ShieldCheck,
    title: "Verify and Review",
    body: "Raw reports are not automatically made public. VIGISCAM™ routes uncertain signals for review, deduplicates reports, and separates unverified claims from confirmed scam intelligence.",
    color: "border-purple-200 bg-purple-50/50",
    iconColor: "text-purple-600",
  },
  {
    icon: Tags,
    title: "Classify Scam Patterns",
    body: "Signals are organized into scam categories: tech support, romance, gift card, crypto, government impersonation, bank impersonation, marketplace fraud, fake job scams, and remote takeover scams.",
    color: "border-orange-200 bg-orange-50/50",
    iconColor: "text-orange-600",
  },
  {
    icon: Zap,
    title: "Update Protection",
    body: "Verified intelligence improves warning messages, detection prompts, risk scoring, family alerts, user education, and Scam Intelligence Registry entries.",
    color: "border-green-200 bg-green-50/50",
    iconColor: "text-green-600",
  },
]

export function ScamPulseSection() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        {/* Eyebrow + Title */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <Badge className="bg-accent text-accent-foreground mb-4 text-xs font-semibold uppercase tracking-wider">
            Live Scam Intelligence
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 text-balance">
            VIGISCAM™ Learns as Scams Evolve
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Scammers change scripts, phone numbers, fake websites, emails, wallets, remote-access tactics, and emotional manipulation patterns every day.{" "}
            <span className="font-semibold text-foreground">ScamPulse AI™</span> helps VIGISCAM™ stay updated by gathering scam signals, scoring reliability, clustering related cases, and turning verified intelligence into safer detection rules.
          </p>
        </div>

        {/* Pipeline Flow */}
        <div className="flex items-center justify-center gap-1 md:gap-2 flex-wrap mb-14">
          {pipeline.map((step, i) => (
            <div key={step.label} className="flex items-center gap-1 md:gap-2">
              <div className={`${step.color} text-white text-xs font-bold px-3 py-1.5 rounded-sm`}>
                {step.label}
              </div>
              {i < pipeline.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Five Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Card key={card.title} className={`border ${card.color}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2.5">
                    <Icon className={`h-5 w-5 flex-shrink-0 ${card.iconColor}`} />
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                </CardContent>
              </Card>
            )
          })}

          {/* Callout Card */}
          <Card className="border border-primary/20 bg-primary/5 md:col-span-2 lg:col-span-1 flex flex-col justify-center">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-foreground leading-relaxed">
                  Clients report. VIGISCAM™ verifies. The public sees only verified, public-safe scam intelligence.
                </p>
              </div>
              <p className="text-xs text-muted-foreground mb-5">
                Most scam tools wait for manual updates. VIGISCAM™ is designed to stay aware of new scam tactics as they emerge.
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/scam-intelligence/live">
                  <Button size="sm" className="w-full gap-2">
                    <Radio className="h-3.5 w-3.5" />
                    ScamPulse AI™ Live Intelligence
                  </Button>
                </Link>
                <Link href="/scam-intelligence/check">
                  <Button size="sm" variant="outline" className="w-full bg-transparent gap-2">
                    Check an Indicator
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sub-branding line */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">ScamPulse AI™</span> is powered by the{" "}
            <span className="font-semibold text-foreground">SCAMZY™ Live Intelligence Engine</span> —
            live scam intelligence for a world where fraud changes daily.
          </p>
        </div>
      </div>
    </section>
  )
}
