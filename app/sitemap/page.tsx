import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  Shield,
  Building,
  DollarSign,
  FileText,
  Users,
  Phone,
  Lock,
  Scale,
  Cookie,
  Globe,
  Briefcase,
  Handshake,
  Accessibility,
  LogIn,
  UserPlus,
  KeyRound,
  LayoutDashboard,
  AlertTriangle,
} from "lucide-react"

const sitemapSections = [
  {
    title: "Main Pages",
    links: [
      { name: "Home", href: "/", icon: Home },
      { name: "Features", href: "/features", icon: Shield },
      { name: "Solutions", href: "/solutions", icon: Building },
      { name: "Pricing", href: "/pricing", icon: DollarSign },
      { name: "Resources", href: "/resources", icon: FileText },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about", icon: Users },
      { name: "Contact", href: "/contact", icon: Phone },
      { name: "Careers", href: "/careers", icon: Briefcase },
      { name: "Partners", href: "/partners", icon: Handshake },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Log In", href: "/login", icon: LogIn },
      { name: "Sign Up", href: "/signup", icon: UserPlus },
      { name: "Forgot Password", href: "/forgot-password", icon: KeyRound },
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Report a Scam", href: "/report", icon: AlertTriangle },
      { name: "Help Center", href: "/resources#support", icon: FileText },
      { name: "Documentation", href: "/resources#docs", icon: FileText },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy", icon: Lock },
      { name: "Terms of Service", href: "/terms", icon: Scale },
      { name: "Cookie Policy", href: "/cookies", icon: Cookie },
      { name: "GDPR Compliance", href: "/gdpr", icon: Globe },
      { name: "Security", href: "/security", icon: Shield },
      { name: "Accessibility", href: "/accessibility", icon: Accessibility },
    ],
  },
  {
    title: "Features",
    links: [
      { name: "Remote Access Protection", href: "/features#remote-access", icon: Shield },
      { name: "Scam Detection", href: "/features#scam-detection", icon: AlertTriangle },
      { name: "Authenticity Verification", href: "/features#authenticity", icon: Users },
      { name: "Safety Alerts", href: "/features#alerts", icon: AlertTriangle },
      { name: "Evidence & Forensics", href: "/features#forensics", icon: FileText },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "For Families", href: "/solutions#families", icon: Users },
      { name: "For Enterprises", href: "/solutions#enterprise", icon: Building },
      { name: "For Banks & Financial", href: "/solutions#financial", icon: DollarSign },
      { name: "For Telecom", href: "/solutions#telecom", icon: Phone },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Site Map</h1>
            <p className="text-xl text-primary-foreground/80">
              A complete overview of all pages on the VIGISCAM™ website
            </p>
          </div>
        </section>

        {/* Sitemap Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sitemapSections.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg border-l-4 border-primary pl-3">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.links.map((link, i) => (
                        <li key={i}>
                          <Link
                            href={link.href}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <link.icon className="h-4 w-4" />
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Need Help Finding Something?</h2>
              <p className="text-muted-foreground mb-6">
                If you can't find what you're looking for, our support team is here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Contact Support
                </Link>
                <Link
                  href="/resources#support"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-muted transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
