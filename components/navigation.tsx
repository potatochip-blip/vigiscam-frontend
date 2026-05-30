"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown, Phone, AlertTriangle, Zap, Database } from "lucide-react"
import { cn } from "@/lib/utils"
import { VigiscamLogo } from "@/components/vigiscam-logo"

const platformItems = [
  { title: "Platform Overview", href: "/platform", description: "The unified VIGISCAM™ system architecture." },
  { title: "How It Works", href: "/how-it-works", description: "Step-by-step protection from detection to intervention." },
  { title: "SCAMZY™", href: "/modules/scamzy", description: "Global scam intelligence & fraud-network disruption core." },
  { title: "A1SCAMSHIELD™", href: "/modules/a1scamshield", description: "Live scam language & manipulation detection engine." },
  { title: "FREEZEGUARD™", href: "/modules/freezeguard", description: "Real-time screen, screen-share & remote-access protection." },
  { title: "FreezeLock™", href: "/modules/freezelock", description: "Emergency session freeze & protective intervention layer." },
  { title: "Evidence Vault™", href: "/evidence-vault", description: "Encrypted case preservation and export." },
  { title: "Authenticity Suite", href: "/modules/livefaceseal", description: "LiveFaceSeal™, VoiceMatchSeal™, SceneSeal™, CamViguard™." },
  { title: "All Modules", href: "/modules", description: "Browse every protection module in VIGISCAM™." },
]

const solutionItems = [
  { title: "For Individuals", href: "/solutions/individuals", description: "Personal real-time scam protection." },
  { title: "For Families", href: "/solutions/families", description: "Protect elderly parents and vulnerable loved ones." },
  { title: "For Banks", href: "/solutions/banks", description: "Customer fraud journey detection and Guardian Pause." },
  { title: "For Platforms", href: "/solutions/platforms", description: "Scam ring detection and grooming disruption." },
  { title: "For Investigators", href: "/solutions/investigators", description: "Network graph, entity linking, takedown packets." },
  { title: "For Government", href: "/solutions/government", description: "Regional intelligence and public alert systems." },
  { title: "For Enterprise", href: "/solutions/enterprise", description: "API-first deployment for enterprise security teams." },
]

const intelligenceItems = [
  { title: "SCAMZY™", href: "/modules/scamzy", description: "The global scam network brain." },
  { title: "A1SCAMSHIELD™", href: "/modules/a1scamshield", description: "Live scam language & manipulation detection engine." },
  { title: "FREEZEGUARD™", href: "/modules/freezeguard", description: "Real-time screen-share & remote-access protection." },
  { title: "FreezeLock™", href: "/modules/freezelock", description: "Emergency session freeze & protective intervention layer." },
  { title: "Authenticity Suite", href: "/modules/livefaceseal", description: "LiveFaceSeal™, VoiceMatchSeal™, SceneSeal™, CamViguard™." },
  { title: "Evidence Vault™", href: "/evidence-vault", description: "Case timelines, encrypted records, export tools." },
  { title: "Scam Types", href: "/scam-types", description: "Tech support, romance, deepfake, crypto, and more." },
  { title: "Resources", href: "/resources", description: "Guides, case studies, glossary, and downloads." },
]

const scamIntelItems = [
  { title: "Live Intelligence", href: "/scam-intelligence/live", description: "ScamPulse AI™ — how VIGISCAM™ tracks evolving scam tactics in real time." },
  { title: "Scam Intelligence Registry", href: "/scam-intelligence/registry", description: "Search verified scam indicators — phones, emails, domains, wallets." },
  { title: "Check an Indicator", href: "/scam-intelligence/check", description: "Instantly check if a number, email, message, or site is flagged." },
  { title: "Exposed Scam Networks", href: "/scam-intelligence/networks", description: "Verified fraud networks exposed through client reports." },
  { title: "Latest Scam Alerts", href: "/scam-intelligence/latest-alerts", description: "Newest verified scam campaigns and public warnings." },
  { title: "Verified Takedowns", href: "/scam-intelligence/takedowns", description: "Domains removed, accounts suspended, infrastructure disrupted." },
  { title: "Report a Scam", href: "/scam-intelligence/report", description: "Submit a suspicious indicator for private VIGISCAM™ review." },
  { title: "Methodology", href: "/scam-intelligence/methodology", description: "How VIGISCAM™ verifies and publishes scam intelligence." },
]

const companyItems = [
  { title: "About Us", href: "/company/about", description: "Our mission to protect every person from scams." },
  { title: "Mission", href: "/company/mission", description: "Why VIGISCAM™ exists." },
  { title: "Careers", href: "/company/careers", description: "Join the team fighting financial fraud." },
  { title: "Partners", href: "/partners", description: "Banks, telcos, and platforms we work with." },
  { title: "Contact", href: "/company/contact", description: "Talk to sales, support, or press." },
  { title: "Trust Center", href: "/trust-center", description: "Privacy, security, and ethical AI." },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <Link href="/company/about" className="hover:text-accent transition-colors">About</Link>
            <Link href="/company/contact" className="hover:text-accent transition-colors">Contact</Link>
            <Link href="/trust-center" className="hover:text-accent transition-colors">Trust Center</Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <span>1-800-VIGISCAM</span>
            </div>
            <Link href="/login" className="hover:text-accent transition-colors font-medium">Log In</Link>
            <Link href="/select-account-type">
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-sm text-xs font-semibold hover:bg-accent/90 transition-colors">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main brand bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <VigiscamLogo size="md" variant="full" />
          </Link>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/demo">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent gap-2">
                <Zap className="h-4 w-4" />
                Live Demo
              </Button>
            </Link>
            <Link href="/report">
              <Button className="bg-danger text-danger-foreground hover:bg-danger/90 gap-2">
                <AlertTriangle className="h-4 w-4" />
                Report a Scam
              </Button>
            </Link>
          </div>

          {/* Mobile */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] overflow-y-auto">
              <nav className="flex flex-col gap-3 mt-8">
                <MobileNavGroup title="Platform" items={platformItems} onClose={() => setMobileOpen(false)} />
                <MobileNavGroup title="Solutions" items={solutionItems} onClose={() => setMobileOpen(false)} />
                <MobileNavGroup title="Intelligence" items={intelligenceItems} onClose={() => setMobileOpen(false)} />
                <MobileNavGroup title="Scam Intelligence" items={scamIntelItems} onClose={() => setMobileOpen(false)} />
                <Link href="/pricing" className="text-base font-medium py-2 border-b border-border" onClick={() => setMobileOpen(false)}>Pricing</Link>
                <MobileNavGroup title="Company" items={companyItems} onClose={() => setMobileOpen(false)} />
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                  <Link href="/report" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-danger text-danger-foreground">
                      <AlertTriangle className="mr-2 h-4 w-4" />Report a Scam
                    </Button>
                  </Link>
                  <Link href="/demo" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full bg-transparent">Live Demo</Button>
                  </Link>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full bg-transparent">Log In</Button>
                  </Link>
                  <Link href="/select-account-type" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Secondary nav bar */}
      <nav className="bg-secondary text-secondary-foreground hidden lg:block border-b border-secondary/20">
        <div className="container mx-auto px-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-none h-12 px-5 text-sm font-medium">
                  Platform
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[680px] gap-2 p-4 grid-cols-2 bg-card shadow-lg">
                    {platformItems.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>{item.description}</ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-none h-12 px-5 text-sm font-medium">
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[560px] gap-2 p-4 grid-cols-2 bg-card shadow-lg">
                    {solutionItems.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>{item.description}</ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-none h-12 px-5 text-sm font-medium">
                  Intelligence
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[680px] gap-2 p-4 grid-cols-2 bg-card shadow-lg">
                    {intelligenceItems.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>{item.description}</ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-none h-12 px-5 text-sm font-medium">
                  <Database className="h-3.5 w-3.5 mr-1.5 text-accent" />
                  Scam Intelligence
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[680px] gap-2 p-4 grid-cols-2 bg-card shadow-lg">
                    {scamIntelItems.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>{item.description}</ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className="inline-flex h-12 items-center justify-center px-5 text-sm font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-none h-12 px-5 text-sm font-medium">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[520px] gap-2 p-4 grid-cols-2 bg-card shadow-lg">
                    {companyItems.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>{item.description}</ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <div className="flex-1" />

              <NavigationMenuItem>
                <Link href="/demo" legacyBehavior passHref>
                  <NavigationMenuLink className="inline-flex h-12 items-center justify-center px-5 text-sm font-medium text-accent hover:bg-primary hover:text-primary-foreground transition-colors font-semibold">
                    <Zap className="h-3.5 w-3.5 mr-1.5" />
                    Live Demo
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  )
}

function MobileNavGroup({
  title, items, onClose,
}: {
  title: string
  items: { title: string; href: string; description: string }[]
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-base font-medium py-2"
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="pl-3 flex flex-col gap-1 pb-2">
          {items.map((item) => (
            <Link key={item.title} href={item.href} className="text-sm text-muted-foreground hover:text-foreground py-1.5" onClick={onClose}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const ListItem = ({ className, title, children, href }: { className?: string; title: string; children: React.ReactNode; href: string }) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className={cn(
          "block select-none space-y-0.5 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted",
          className,
        )}
      >
        <div className="text-sm font-semibold leading-none text-primary">{title}</div>
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">{children}</p>
      </Link>
    </NavigationMenuLink>
  </li>
)
