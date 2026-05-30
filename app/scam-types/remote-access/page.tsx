'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle, CheckCircle2, Shield, ArrowRight, Monitor, Eye, Download, Lock } from "lucide-react"

export default function RemoteAccessScamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <Badge className="bg-danger text-danger-foreground mb-6">Remote Access Scam</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Remote Access Scams: When You Give Control To Criminals
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 text-pretty">
              Scammers convince victims to install remote access software (TeamViewer, AnyDesk, LogMeIn), gaining complete control of their computer to steal credentials, money, and personal data.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Get Protected Now</Button>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How Remote Access Scams Work</h2>
            <div className="space-y-4 max-w-4xl">
              {[
                { step: 1, title: "Initial Contact", desc: "Call or pop-up claiming to be from Microsoft, Apple, your ISP, or bank. Sometimes they claim you've been hacked or have a virus." },
                { step: 2, title: "Urgency Created", desc: "Your computer is infected. Hackers are accessing your bank right now. Your files will be encrypted. Act immediately." },
                { step: 3, title: "Software Download", desc: "Victim is instructed to download AnyDesk, TeamViewer, LogMeIn, or UltraViewer and share the access code." },
                { step: 4, title: "Full Control Gained", desc: "Scammer can now see your screen, control your mouse and keyboard, and access everything on your computer." },
                { step: 5, title: "Theft Begins", desc: "While pretending to 'fix' issues, they access banking, steal credentials, install malware, or exfiltrate files." },
                { step: 6, title: "Payment Demand", desc: "After 'fixing' the problem, they demand payment for services, often asking you to log into your bank while they watch." },
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

        {/* Software Used */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Software Commonly Abused</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: "AnyDesk", desc: "Lightweight remote access tool. Scammers favor it because it's quick to install and hard for victims to detect." },
                { name: "TeamViewer", desc: "Popular legitimate tool abused by scammers. They'll ask you to share the Partner ID and password." },
                { name: "UltraViewer", desc: "Free tool often used in scams originating from certain regions. Similar functionality to others." },
                { name: "LogMeIn/GoTo", desc: "Enterprise tools sometimes used in business email compromise and tech support scams." },
                { name: "Chrome Remote Desktop", desc: "Google's remote tool, sometimes used because victims trust Google branding." },
                { name: "Quick Assist (Windows)", desc: "Built into Windows, sometimes exploited by scammers claiming to be Microsoft support." },
              ].map((software, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-bold text-foreground mb-2">{software.name}</h3>
                  <p className="text-sm text-muted-foreground">{software.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
              Note: These are legitimate tools used for valid IT support. The scam is in how criminals convince you to install them and grant access.
            </p>
          </div>
        </section>

        {/* What They Do */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">What Scammers Do With Access</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Eye className="h-6 w-6" />, title: "Watch You Type Passwords", desc: "They observe as you log into banking, email, and other accounts." },
                { icon: <Download className="h-6 w-6" />, title: "Install Malware", desc: "Keyloggers, ransomware, and backdoors for future access." },
                { icon: <Monitor className="h-6 w-6" />, title: "Transfer Money", desc: "While you watch, they initiate transfers, sometimes disguising them." },
                { icon: <Lock className="h-6 w-6" />, title: "Lock You Out", desc: "Change passwords, enable 2FA on accounts they now control." },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 flex gap-4">
                  <div className="text-primary shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FreezeGuard Detection */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How FreezeGuard Stops Remote Access Scams</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> CamViguard™ Detection
                </h3>
                <ul className="space-y-3">
                  {[
                    "Detects when remote access software is launched",
                    "Monitors for incoming remote sessions",
                    "Alerts when mouse/keyboard control is external",
                    "Tracks clipboard access by remote party",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> FreezeLock™ Response
                </h3>
                <ul className="space-y-3">
                  {[
                    "Instantly terminates unauthorized remote sessions",
                    "Freezes screen to prevent further access",
                    "Alerts trusted contacts immediately",
                    "Preserves evidence of access attempt",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence Timeline */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Sample Evidence Timeline</h2>
            <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-6">
              <div className="space-y-4">
                {[
                  { time: "3:22:14 PM", event: "AnyDesk.exe download initiated from suspicious call context", type: "detection" },
                  { time: "3:23:01 PM", event: "AnyDesk installation completed", type: "event" },
                  { time: "3:23:45 PM", event: "Remote session initiated from IP 45.xxx.xxx.xxx (India)", type: "detection" },
                  { time: "3:23:46 PM", event: "CamViguard detects external mouse control", type: "detection" },
                  { time: "3:23:50 PM", event: "FreezeLock activated - Remote session terminated", type: "intervention" },
                  { time: "3:23:51 PM", event: "Screen frozen, all input blocked", type: "intervention" },
                  { time: "3:23:52 PM", event: "Alert sent to trusted contact (Michael)", type: "alert" },
                  { time: "3:23:55 PM", event: "Session recording saved to Evidence Vault", type: "evidence" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-xs font-mono text-muted-foreground w-24 shrink-0">{item.time}</span>
                    <Badge className={
                      item.type === 'detection' ? 'bg-yellow-500/20 text-yellow-600' :
                      item.type === 'intervention' ? 'bg-red-500/20 text-red-600' :
                      item.type === 'alert' ? 'bg-blue-500/20 text-blue-600' :
                      item.type === 'evidence' ? 'bg-green-500/20 text-green-600' :
                      'bg-muted text-muted-foreground'
                    }>{item.type}</Badge>
                    <span className="text-sm text-foreground">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Never Give Remote Access to Strangers</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              FreezeGuard detects and blocks unauthorized remote access before criminals can steal your data.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Protected Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
