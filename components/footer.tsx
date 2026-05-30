import Link from "next/link"
import { Facebook, Youtube, Mail, Linkedin } from "lucide-react"
import { VigiscamLogo } from "@/components/vigiscam-logo"

const footerLinks = {
  product: [
    { name: "Platform Overview", href: "/platform" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "All Modules", href: "/modules" },
    { name: "Pricing", href: "/pricing" },
    { name: "Live Demo", href: "/demo" },
  ],
  solutions: [
    { name: "Individuals", href: "/solutions/individuals" },
    { name: "Families", href: "/solutions/families" },
    { name: "Banks", href: "/solutions/banks" },
    { name: "Platforms", href: "/solutions/platforms" },
    { name: "Investigators", href: "/solutions/investigators" },
    { name: "Government", href: "/solutions/government" },
  ],
  intelligence: [
    { name: "SCAMZY™", href: "/modules/scamzy" },
    { name: "A1SCAMSHIELD™", href: "/modules/a1scamshield" },
    { name: "FREEZEGUARD™", href: "/modules/freezeguard" },
    { name: "FreezeLock™", href: "/modules/freezelock" },
    { name: "Authenticity Suite", href: "/modules/livefaceseal" },
    { name: "Evidence Vault™", href: "/evidence-vault" },
    { name: "Scam Types", href: "/scam-types" },
    { name: "Resources", href: "/resources" },
  ],
  company: [
    { name: "About", href: "/company/about" },
    { name: "Mission", href: "/company/mission" },
    { name: "Partners", href: "/partners" },
    { name: "Careers", href: "/company/careers" },
    { name: "Contact", href: "/company/contact" },
    { name: "Trust Center", href: "/trust-center" },
  ],
  scamIntel: [
    { name: "Live Intelligence", href: "/scam-intelligence/live" },
    { name: "Registry", href: "/scam-intelligence/registry" },
    { name: "Check an Indicator", href: "/scam-intelligence/check" },
    { name: "Exposed Networks", href: "/scam-intelligence/networks" },
    { name: "Latest Alerts", href: "/scam-intelligence/latest-alerts" },
    { name: "Verified Takedowns", href: "/scam-intelligence/takedowns" },
    { name: "Report a Scam", href: "/scam-intelligence/report" },
    { name: "Methodology", href: "/scam-intelligence/methodology" },
  ],
  legal: [
    { name: "Privacy", href: "/trust-center/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Ethical AI", href: "/trust-center/ethical-ai" },
    { name: "Consent", href: "/trust-center/consent" },
    { name: "Security", href: "/trust-center/security" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Social bar */}
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-8">
          {[
            { icon: <Facebook className="h-4 w-4" />, label: "Facebook", href: "#" },
            {
              icon: (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ),
              label: "X / Twitter",
              href: "#",
            },
            { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", href: "#" },
            { icon: <Youtube className="h-4 w-4" />, label: "YouTube", href: "#" },
            { icon: <Mail className="h-4 w-4" />, label: "Email Updates", href: "#" },
          ].map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="flex items-center gap-2 text-sm text-secondary-foreground hover:text-accent transition-colors"
            >
              {s.icon}
              <span className="hidden sm:inline">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <VigiscamLogo size="sm" variant="full" inverted />
            </Link>
            <p className="text-primary-foreground/75 text-sm leading-relaxed mb-4">
              Detect the Scam. Stop the Harm. Expose the Network.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-success/20 border border-success/30 text-success text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Platform Active — 24/7 Protection
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-accent text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-2.5">
              {footerLinks.product.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-primary-foreground/75 hover:text-accent text-sm transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4 text-accent text-sm uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-2.5">
              {footerLinks.solutions.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-primary-foreground/75 hover:text-accent text-sm transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Intelligence */}
          <div>
            <h3 className="font-semibold mb-4 text-accent text-sm uppercase tracking-wider">Intelligence</h3>
            <ul className="space-y-2.5">
              {footerLinks.intelligence.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-primary-foreground/75 hover:text-accent text-sm transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-accent text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-primary-foreground/75 hover:text-accent text-sm transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Scam Intelligence */}
          <div>
            <h3 className="font-semibold mb-4 text-accent text-sm uppercase tracking-wider">Scam Intelligence</h3>
            <ul className="space-y-2.5">
              {footerLinks.scamIntel.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-primary-foreground/75 hover:text-accent text-sm transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-accent text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="text-primary-foreground/75 hover:text-accent text-sm transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:text-accent transition-colors font-medium">
              VIGISCAM™
            </Link>
            . All rights reserved. SCAMZY™, A1SCAMSHIELD™, FREEZEGUARD™, FreezeLock™, LiveFaceSeal™, and Evidence Vault™ are trademarks of VIGISCAM™.
          </p>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
            <Link href="/accessibility" className="hover:text-accent transition-colors">Accessibility</Link>
            <Link href="/sitemap" className="hover:text-accent transition-colors">Site Map</Link>
            <Link href="/report" className="hover:text-accent transition-colors font-medium text-danger-foreground">Report a Scam</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
