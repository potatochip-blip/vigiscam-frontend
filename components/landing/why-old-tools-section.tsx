import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { X, CheckCircle, ShieldOff } from "lucide-react"

const OLD_TOOLS = [
  {
    tool: "Antivirus software",
    failReason: "Stops malware files — not human manipulation over a voice call.",
  },
  {
    tool: "Bank fraud alerts",
    failReason: "Flags unusual transactions after money moves — not before the victim decides to send it.",
  },
  {
    tool: "Call-blocking apps",
    failReason: "Blocks known numbers — scammers rotate thousands of numbers daily.",
  },
  {
    tool: "Security awareness training",
    failReason: "Teaches people what to watch for — but does nothing when a victim is in emotional crisis during an active scam.",
  },
  {
    tool: "Spam filters",
    failReason: "Catches scripted emails — scammers now use live voice, video, and remote access.",
  },
  {
    tool: "Password managers & 2FA",
    failReason: "Secure credentials — but the victim willingly hands access to the scammer.",
  },
]

const VIGISCAM_ADVANTAGES = [
  "Detects live manipulation language — not just known bad actors",
  "Intervenes during the call — not after the transfer",
  "Verifies whether the caller is real or AI-generated",
  "Monitors and terminates remote-access sessions in real time",
  "Links a single scam event to the full fraud network",
  "Automatically builds court-ready evidence — no user action required",
]

export function WhyOldToolsSection() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <Badge className="bg-danger text-danger-foreground mb-4">Why Old Tools Fail</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Every existing tool misses the point.
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Existing fraud tools were designed for a different era. They stop malware, flag transactions, and block known numbers. They do not stop a scammer who is already talking to your mother right now.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left — old tools */}
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <div className="bg-muted px-5 py-3 border-b border-border flex items-center gap-2">
              <ShieldOff className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">What fails against modern scams</span>
            </div>
            <div className="divide-y divide-border">
              {OLD_TOOLS.map((item, i) => (
                <div key={i} className="p-4 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="h-3 w-3 text-danger" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">{item.tool}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.failReason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — VIGISCAM */}
          <div className="bg-primary rounded-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-primary-foreground/15 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wide">What VIGISCAM™ does instead</span>
            </div>
            <div className="divide-y divide-primary-foreground/10">
              {VIGISCAM_ADVANTAGES.map((adv, i) => (
                <div key={i} className="p-4 flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-primary-foreground/90 leading-relaxed">{adv}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-primary-foreground/15">
              <Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
                See how VIGISCAM™ works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
