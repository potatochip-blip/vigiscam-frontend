import Link from "next/link"
import { Shield, Brain, Lock, Eye, Video, Mic, Camera, Database, Users, Building, Globe, Search, CreditCard, Fingerprint, CheckSquare, Pause, Timer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const PILLARS = [
  {
    icon: <Brain className="h-6 w-6" />,
    badge: "A1SCAMSHIELD™",
    title: "Detect the Scam",
    description: "Detects the scammer's words, pressure tactics, and manipulation signals while the conversation is still unfolding.",
    href: "/modules/a1scamshield",
    bg: "bg-primary/5 border-primary/20",
    iconColor: "text-primary",
    badgeColor: "bg-primary text-primary-foreground",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    badge: "FreezeLock™",
    title: "Stop the Harm",
    description: "Freezes the screen, stops remote control, ends dangerous sessions, and alerts trusted contacts before loss occurs.",
    href: "/modules/freezelock",
    bg: "bg-danger/5 border-danger/20",
    iconColor: "text-danger",
    badgeColor: "bg-danger text-danger-foreground",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    badge: "Authenticity Suite",
    title: "Verify the Caller",
    description: "Verifies whether the caller, camera, voice, face, and scene are real—or AI-generated, injected, or manipulated.",
    href: "/modules/livefaceseal",
    bg: "bg-warning/10 border-warning/30",
    iconColor: "text-warning-foreground",
    badgeColor: "bg-warning text-warning-foreground",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    badge: "SCAMZY™",
    title: "Expose the Network",
    description: "Maps the fraud journey, predicts the next move, and links the scam to the wider criminal network behind it.",
    href: "/modules/scamzy",
    bg: "bg-accent/20 border-accent/30",
    iconColor: "text-accent-foreground",
    badgeColor: "bg-accent text-accent-foreground",
  },
]

const MODULES = [
  { icon: <Brain className="h-5 w-5" />, name: "A1SCAMSHIELD™", desc: "Live manipulation detection", href: "/modules/a1scamshield" },
  { icon: <Globe className="h-5 w-5" />, name: "SCAMZY™", desc: "Global scam intelligence", href: "/modules/scamzy" },
  { icon: <Lock className="h-5 w-5" />, name: "FreezeLock™", desc: "Emergency intervention", href: "/modules/freezelock" },
  { icon: <Video className="h-5 w-5" />, name: "LiveFaceSeal™", desc: "Deepfake face detection", href: "/modules/livefaceseal" },
  { icon: <Mic className="h-5 w-5" />, name: "VoiceMatchSeal™", desc: "Voice clone detection", href: "/modules/voicematchseal" },
  { icon: <Camera className="h-5 w-5" />, name: "SceneSeal™", desc: "Background scene verification", href: "/modules/sceneseal" },
  { icon: <Eye className="h-5 w-5" />, name: "CamViguard™", desc: "Camera feed integrity check", href: "/modules/camviguard" },
  { icon: <Database className="h-5 w-5" />, name: "Evidence Vault™", desc: "Encrypted case preservation", href: "/evidence-vault" },
  { icon: <Users className="h-5 w-5" />, name: "Family Guardian", desc: "Loved-one protection hub", href: "/solutions/families" },
  { icon: <Building className="h-5 w-5" />, name: "BankGuard", desc: "Customer fraud detection", href: "/solutions/banks" },
  { icon: <Shield className="h-5 w-5" />, name: "PlatformShield", desc: "Scam ring disruption", href: "/solutions/platforms" },
  { icon: <Search className="h-5 w-5" />, name: "Investigator Console", desc: "Network graph & case tools", href: "/solutions/investigators" },
  { icon: <Pause className="h-5 w-5" />, name: "ScamHold AI™", desc: "Pause risky financial actions", href: "/dashboard/scamhold" },
  { icon: <Timer className="h-5 w-5" />, name: "Guardian Pause™", desc: "30-second break for scammer pressure", href: "/dashboard/guardian-pause" },
  { icon: <CreditCard className="h-5 w-5" />, name: "GiftCardGuard™", desc: "Gift card fraud prevention", href: "/dashboard/giftcardguard" },
  { icon: <Shield className="h-5 w-5" />, name: "WalletGuard AI™", desc: "Crypto wallet risk checks", href: "/dashboard/walletguard" },
  { icon: <CheckSquare className="h-5 w-5" />, name: "ClaimVerify AI™", desc: "Verify identity & story claims", href: "/dashboard/claimverify" },
  { icon: <Eye className="h-5 w-5" />, name: "ScamMirror™", desc: "Safe scam simulation lab", href: "/dashboard/scammirror" },
  { icon: <Fingerprint className="h-5 w-5" />, name: "Identity Graph™", desc: "Expose cross-channel fraud actors", href: "/dashboard/identity-graph" },
]

export function FeaturesSection() {
  return (
    <>
      {/* Scam Reality Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <Badge className="bg-danger text-danger-foreground mb-4">The New Scam Reality</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Scams Are No Longer Just Emails.
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              They are live, emotional, AI-assisted, and networked. Current tools see only transactions or malware. VIGISCAM™ sees the human manipulation behind the harm.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { stat: "$10B+", label: "Lost to scams globally per year", color: "text-danger" },
              { stat: "68%", label: "Of victims never reported the incident", color: "text-warning-foreground" },
              { stat: "4.2M", label: "Active scam actors tracked by SCAMZY™", color: "text-primary" },
              { stat: "< 4s", label: "Average VIGISCAM™ intervention time", color: "text-success" },
            ].map((s) => (
              <div key={s.stat} className="bg-card border border-border rounded-sm p-6 text-center">
                <div className={`text-4xl font-bold mb-2 ${s.color}`}>{s.stat}</div>
                <div className="text-sm text-muted-foreground text-pretty">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <Badge className="bg-primary text-primary-foreground mb-4">Unified Platform</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              One Platform. Four Layers of Protection.
            </h2>
            <p className="text-muted-foreground text-lg text-pretty">
              VIGISCAM™ covers every dimension of a modern scam—from the first manipulative word to the criminal network behind it.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p) => (
              <Link key={p.title} href={p.href} className={`group border rounded-sm p-6 transition-all hover:shadow-md ${p.bg}`}>
                <div className={`mb-4 ${p.iconColor}`}>{p.icon}</div>
                <Badge className={`mb-3 text-xs ${p.badgeColor}`}>{p.badge}</Badge>
                <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full Module Grid */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <Badge className="bg-secondary text-secondary-foreground mb-4">Complete Ecosystem</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">Core Platform Modules</h2>
            <p className="text-muted-foreground">Every module works together as one unified system—not separate products.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MODULES.map((m) => (
              <Link
                key={m.name}
                href={m.href}
                className="bg-card border border-border rounded-sm p-4 flex items-start gap-3 hover:border-primary hover:shadow-sm transition-all group"
              >
                <div className="text-primary mt-0.5 shrink-0">{m.icon}</div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{m.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m.desc}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/modules">
              <span className="text-primary text-sm font-medium hover:underline">View all modules →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
