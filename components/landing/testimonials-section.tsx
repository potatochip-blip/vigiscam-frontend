import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Quote, ArrowRight } from "lucide-react"

const testimonials = [
  {
    quote: "FreezeGuard caught the tech support scammer mid-call. It froze the screen before my father could give them access to his bank. The Evidence Vault export helped the police immediately.",
    author: "Sarah Mitchell",
    role: "Family Guardian User",
    avatar: "SM",
    tag: "Family Protection",
  },
  {
    quote: "We integrated BankGuard into our wire transfer workflow. In the first quarter, it flagged 94 romance-scam-motivated transfers and saved our customers over $4M in losses.",
    author: "Michael Chen",
    role: "Chief Security Officer, Regional Bank",
    avatar: "MC",
    tag: "BankGuard",
  },
  {
    quote: "The Investigator Console gave our team a network graph that connected 17 separate scam cases to one criminal group operating across three countries. That was a breakthrough.",
    author: "Det. James Okafor",
    role: "Financial Crimes Unit, Metropolitan Police",
    avatar: "JO",
    tag: "Investigator Console",
  },
  {
    quote: "SCAMZY linked the script pattern in our moderation queue to a known West African fraud ring. We took down 340 accounts in one coordinated action.",
    author: "Priya Nair",
    role: "Trust & Safety Lead, Major Marketplace",
    avatar: "PN",
    tag: "PlatformShield",
  },
  {
    quote: "My 74-year-old mother was on the phone with a fake IRS agent. FreezeGuard interrupted, alerted me, and the call was evidence-logged. She didn't lose a cent.",
    author: "Jennifer Williams",
    role: "Family Guardian User",
    avatar: "JW",
    tag: "Family Protection",
  },
  {
    quote: "As a regional government, we used FreezeGuard's agency dashboard to run three public scam awareness campaigns based on real-time cluster intelligence from SCAMZY.",
    author: "Commissioner A. Reyes",
    role: "Cybercrime Division, State Government",
    avatar: "AR",
    tag: "Government Agency",
  },
]

const USE_CASES = [
  { label: "Elderly Tech-Support Scam", href: "/scam-types/tech-support" },
  { label: "Fake Bank Call", href: "/scam-types/bank-impersonation" },
  { label: "Romance Scam", href: "/scam-types/romance" },
  { label: "Recovery Scam", href: "/scam-types/recovery" },
  { label: "Gift Card / Crypto Scam", href: "/scam-types/gift-card" },
  { label: "Deepfake Executive Impersonation", href: "/scam-types/deepfake-impersonation" },
  { label: "Platform Scam Ring Detection", href: "/scam-types/remote-access" },
]

const WHO_WE_SERVE = [
  { label: "Individuals", desc: "Personal real-time scam protection on any device.", href: "/solutions/individuals" },
  { label: "Families", desc: "Monitor and protect elderly or vulnerable loved ones.", href: "/solutions/families" },
  { label: "Banks", desc: "Customer fraud journey detection and Guardian Pause.", href: "/solutions/banks" },
  { label: "Platforms", desc: "Scam ring detection and grooming disruption at scale.", href: "/solutions/platforms" },
  { label: "Investigators", desc: "Network graph, entity linking, and takedown packets.", href: "/solutions/investigators" },
  { label: "Governments", desc: "Regional intelligence dashboards and public alert campaigns.", href: "/solutions/government" },
]

export function TestimonialsSection() {
  return (
    <>
      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <Badge className="bg-primary text-primary-foreground mb-4">Real Results</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
              Trusted by Families, Banks, Investigators & Governments
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-card border-border rounded-sm">
                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="h-7 w-7 text-accent" />
                    <Badge className="bg-secondary text-secondary-foreground text-xs">{t.tag}</Badge>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-6 flex-grow">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <Avatar className="rounded-sm h-9 w-9">
                      <AvatarFallback className="bg-secondary text-secondary-foreground rounded-sm text-xs">
                        {t.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm text-primary">{t.author}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Badge className="bg-secondary text-secondary-foreground mb-4">Scam Types Covered</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">Every Major Scam. One Platform.</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {USE_CASES.map((u) => (
              <Link key={u.label} href={u.href}>
                <Badge className="bg-card border border-border text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-sm cursor-pointer rounded-sm">
                  {u.label}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/scam-types" className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
              Browse full scam library <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Who It Serves */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Badge className="bg-primary text-primary-foreground mb-4">Who It Serves</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">Built for Every Stakeholder in Scam Prevention</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_WE_SERVE.map((w) => (
              <Link key={w.label} href={w.href} className="bg-card border border-border rounded-sm p-6 hover:border-primary hover:shadow-sm transition-all group">
                <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-primary/80">{w.label}</h3>
                <p className="text-sm text-muted-foreground">{w.desc}</p>
                <span className="text-xs text-primary mt-3 inline-flex items-center gap-1 font-medium">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
