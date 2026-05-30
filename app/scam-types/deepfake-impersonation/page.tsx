'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertTriangle, CheckCircle2, Shield, ArrowRight, Video, Mic, Eye, UserX } from "lucide-react"

export default function DeepfakeImpersonationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <Badge className="bg-danger text-danger-foreground mb-6">Deepfake Impersonation</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Deepfake Scams: When You Can&apos;t Trust Your Eyes or Ears
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 text-pretty">
              AI-generated videos and voice clones allow criminals to impersonate executives, family members, and trusted figures with frightening accuracy, enabling fraud at unprecedented scale.
            </p>
            <Link href="/select-account-type">
              <Button size="lg" className="bg-primary text-primary-foreground">Get Protected Now</Button>
            </Link>
          </div>
        </section>

        {/* Types */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Types of Deepfake Scams</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: <Video className="h-8 w-8" />,
                  title: "Video Call Impersonation",
                  desc: "Real-time deepfake video of CEO, family member, or official on Zoom/video call requesting urgent wire transfer.",
                },
                {
                  icon: <Mic className="h-8 w-8" />,
                  title: "Voice Clone Calls",
                  desc: "AI-cloned voice of family member claiming emergency: 'Mom, I'm in jail and need bail money.'",
                },
                {
                  icon: <UserX className="h-8 w-8" />,
                  title: "Fake Celebrity Endorsements",
                  desc: "Deepfake videos of celebrities promoting investment scams, crypto schemes, or products.",
                },
                {
                  icon: <Eye className="h-8 w-8" />,
                  title: "Pre-Recorded Loops",
                  desc: "Scammer uses pre-recorded deepfake video in calls, unable to respond to real-time challenges.",
                },
              ].map((type, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 flex gap-4">
                  <div className="text-primary shrink-0">{type.icon}</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">{type.title}</h3>
                    <p className="text-sm text-muted-foreground">{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real Cases */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Real Deepfake Scam Cases</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Hong Kong Finance Worker: $25.6 Million",
                  desc: "Employee joined video call with what appeared to be CFO and colleagues. All were deepfakes. Transferred funds to scammers over multiple transactions.",
                },
                {
                  title: "UK Energy Company: $243,000",
                  desc: "CEO received call from what sounded exactly like parent company's CEO demanding urgent wire transfer to Hungarian supplier.",
                },
                {
                  title: "Elderly Parents: Grandparent Scam 2.0",
                  desc: "Voice clone of grandchild calls claiming to be arrested, needs bail money immediately. Voice is indistinguishable from real grandchild.",
                },
              ].map((caseItem, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <Badge className="bg-danger/10 text-danger mb-3">Real Case</Badge>
                  <h3 className="font-bold text-foreground mb-2">{caseItem.title}</h3>
                  <p className="text-muted-foreground">{caseItem.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How To Detect */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Signs of Deepfake Video</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                "Unnatural blinking patterns or no blinking",
                "Odd lighting or shadows on face",
                "Lips slightly out of sync with audio",
                "Strange artifacts around hairline or ears",
                "Person avoids turning head or looking away",
                "Background inconsistencies or warping",
                "Unable to perform unusual requests (touch nose, etc.)",
                "Audio quality doesn't match video quality",
              ].map((sign, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{sign}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FreezeGuard Detection */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">How FreezeGuard Detects Deepfakes</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" /> LiveFaceSeal™
                </h3>
                <ul className="space-y-3">
                  {[
                    "Real-time liveness detection during video calls",
                    "Challenge-response verification (blink, turn head)",
                    "Analyzes micro-expressions and eye movements",
                    "Detects AI generation artifacts",
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
                  <Mic className="h-5 w-5 text-primary" /> VoiceMatchSeal™
                </h3>
                <ul className="space-y-3">
                  {[
                    "Analyzes voice for AI synthesis markers",
                    "Compares against known voice profiles",
                    "Detects unnatural speech patterns",
                    "Identifies compression artifacts from cloning",
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

        {/* Additional Tools */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Additional Protection</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Fake Video Hash Tracker", desc: "Compares incoming video against database of known scam deepfakes and pre-recorded loops.", href: "/modules/fake-video-hash-tracker" },
                { title: "SceneSeal™", desc: "Verifies background authenticity and detects virtual backgrounds used to mask scammer location.", href: "/modules/sceneseal" },
                { title: "Dual-Auth™", desc: "Requires secondary approval for any financial transaction requested during video calls.", href: "/modules/dual-auth" },
              ].map((tool, i) => (
                <Link key={i} href={tool.href}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors h-full">
                    <h3 className="font-bold text-primary mb-2">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">{tool.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Protection Tips */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-foreground">Protect Yourself</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                "Establish code words with family members for emergency verification",
                "Always verify unexpected requests through a separate channel",
                "Ask the caller to do something unexpected (touch their ear, hold up fingers)",
                "Be suspicious of any urgent financial request, regardless of who appears to be asking",
                "Use FreezeGuard's authenticity verification on all video calls",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Seeing Isn&apos;t Believing Anymore</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              FreezeGuard verifies caller authenticity when your eyes and ears can be fooled.
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
