'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react"

export default function TechSupportScamPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <Badge className="bg-danger text-danger-foreground mb-6">Tech Support Scam</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Tech Support Scams: The #1 Threat to Elderly Users
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 text-pretty">
            A scammer poses as tech support, gains remote access to your device, and either steals credentials or convinces you to send money for fake fixes.
          </p>
          <Link href="/select-account-type">
            <Button size="lg" className="bg-primary text-primary-foreground">Get Protected Now</Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">How Tech Support Scams Work</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: "Unsolicited Call or Pop-up", desc: 'You receive a call or see a pop-up claiming to be from Microsoft, Apple, or your ISP. "Your computer has a virus."' },
              { step: 2, title: "Pressure to Act Immediately", desc: "The scammer uses urgency and fear. Your data is at risk. Your account will be frozen. Act now." },
              { step: 3, title: "Remote Access Granted", desc: "You're asked to download TeamViewer, AnyDesk, or Chrome Remote Desktop to let them fix the issue." },
              { step: 4, title: "Money Requested", desc: "Once connected, they either steal passwords or demand payment ($200-$500) via gift card or wire transfer." },
              { step: 5, title: "Data Exfiltration", desc: "Your banking credentials, photos, and personal files are copied while you watch them work on screen." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-6 bg-card border border-border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Red Flags to Watch For</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Unsolicited call claiming to be from tech company",
              "Pop-ups saying your device is infected or locked",
              "Requests to download remote access software",
              "Pressure to act immediately or device will be locked",
              "Request for payment via gift card or wire transfer",
              "Request to give them control of your device",
              "Asking for passwords, credit card numbers, or banking info",
              "Heavy accent or unusual speech patterns (not always)",
            ].map((flag, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{flag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FreezeGuard Protection */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">How FreezeGuard Protects You</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {[
                { title: "Detects Remote Access Attempts", desc: "A1SCAMSHIELD™ recognizes when someone tries to connect via TeamViewer, AnyDesk, or similar tools." },
                { title: "Verifies the Caller", desc: "LiveFaceSeal™ and VoiceMatchSeal™ confirm whether the caller is genuine tech support or a scammer." },
                { title: "Blocks Session Immediately", desc: "FreezeLock™ terminates the remote session and freezes your device." },
                { title: "Alerts Your Family", desc: "Trusted contacts are instantly notified so they can help verify the situation." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">99.2%</div>
              <p className="text-muted-foreground">Prevention rate for tech support scams</p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Do */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-foreground">What to Do If You&apos;ve Been Targeted</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-4">Immediate Actions</h3>
              <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                <li>Hang up the phone or close the browser tab</li>
                <li>Do NOT click any links or download files</li>
                <li>Do NOT give them remote access</li>
                <li>Do NOT send money</li>
                <li>Enable FreezeGuard to freeze your device</li>
              </ol>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-4">Report & Protect</h3>
              <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                <li>Report to local police department</li>
                <li>Report to FBI IC3 (ic3.gov)</li>
                <li>Report to FTC (reportfraud.ftc.gov)</li>
                <li>Change passwords for all accounts</li>
                <li>Check bank and credit card statements</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Stop Tech Support Scams Before They Start</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">FreezeGuard detects and blocks tech support scammers in real time.</p>
          <Link href="/select-account-type">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Protected Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
