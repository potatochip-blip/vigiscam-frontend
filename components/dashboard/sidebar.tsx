'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Shield, Phone, Monitor, Bell, Archive, Users, Settings, LogOut,
  Activity, Eye, FileText, Network, GitBranch, Search, AlertTriangle, BarChart3,
  Lock, Zap, Globe, Database, Key, CreditCard, ClipboardList, UserCheck,
  MessageSquare, Flag, BookOpen, Cpu, Layers, HelpCircle, Radio, MapPin,
  Megaphone, Link2, TrendingUp, Package, CheckSquare, UserCog, ChevronLeft,
  ChevronRight, Fingerprint, Video, Hash, Navigation, Home,
  CalendarCheck, Heart, ShieldCheck, Timer
} from "lucide-react"
import { VigiscamLogo } from "@/components/vigiscam-logo"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"

export type DashboardRole =
  | "individual"
  | "family"
  | "bankguard"
  | "platformshield"
  | "investigator"
  | "agency"
  | "enterprise"
  | "admin"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: string
  badgeColor?: string
}

const roleNavItems: Record<DashboardRole, NavItem[]> = {
  individual: [
    { label: "Overview", href: "/app/individual/overview", icon: LayoutDashboard },
    { label: "Live Protection", href: "/app/individual/live-protection", icon: Activity, badge: "LIVE", badgeColor: "bg-green-500" },
    { label: "Scam Check", href: "/app/individual/scam-check", icon: Search },
    { label: "ScamHold AI™", href: "/dashboard/scamhold", icon: Lock },
    { label: "Guardian Pause™", href: "/dashboard/guardian-pause", icon: Timer },
    { label: "GiftCardGuard™", href: "/dashboard/giftcardguard", icon: CreditCard },
    { label: "WalletGuard AI™", href: "/dashboard/walletguard", icon: Shield },
    { label: "ClaimVerify AI™", href: "/dashboard/claimverify", icon: CheckSquare },
    { label: "ScamMirror™", href: "/dashboard/scammirror", icon: Eye },
    { label: "Identity Graph™", href: "/dashboard/identity-graph", icon: Fingerprint },
    { label: "Calls", href: "/app/individual/calls", icon: Phone },
    { label: "Remote Sessions", href: "/app/individual/remote-sessions", icon: Monitor },
    { label: "Alerts", href: "/app/individual/alerts", icon: Bell },
    { label: "Evidence Vault", href: "/app/individual/evidence-vault", icon: Archive },
    { label: "Trusted Contacts", href: "/dashboard/trusted-contacts", icon: Heart },
    { label: "Devices", href: "/app/individual/devices", icon: Cpu },
    { label: "Education", href: "/app/individual/education", icon: BookOpen },
    { label: "Protection Settings", href: "/dashboard/protection-settings", icon: Settings },
  ],
  family: [
    { label: "Overview", href: "/app/family/overview", icon: LayoutDashboard },
    { label: "Protected Members", href: "/app/family/protected-loved-ones", icon: Users },
    { label: "Alerts", href: "/app/family/alerts", icon: Bell, badge: "3", badgeColor: "bg-red-500" },
    { label: "Live Risk", href: "/app/family/live-risk", icon: Activity, badge: "LIVE", badgeColor: "bg-green-500" },
    { label: "Review Center", href: "/app/family/review-center", icon: Eye },
    { label: "Evidence", href: "/app/family/evidence", icon: Archive },
    { label: "Consent Management", href: "/app/family/consent-management", icon: CheckSquare },
    { label: "Check-ins", href: "/app/family/check-ins", icon: CalendarCheck },
    { label: "Settings", href: "/app/family/settings", icon: Settings },
  ],
  bankguard: [
    { label: "Overview", href: "/app/bankguard/overview", icon: LayoutDashboard },
    { label: "Live Risk Queue", href: "/app/bankguard/live-risk-queue", icon: Activity, badge: "LIVE", badgeColor: "bg-green-500" },
    { label: "Customer Risk", href: "/app/bankguard/customer-risk", icon: UserCheck },
    { label: "Guardian Pause™", href: "/app/bankguard/guardian-pause", icon: Lock },
    { label: "Scam Journeys", href: "/app/bankguard/scam-journeys", icon: GitBranch },
    { label: "Teller Assist", href: "/app/bankguard/teller-assist", icon: HelpCircle },
    { label: "Cases", href: "/app/bankguard/cases", icon: ClipboardList },
    { label: "Analytics", href: "/app/bankguard/analytics", icon: BarChart3 },
    { label: "Evidence Exports", href: "/app/bankguard/evidence-exports", icon: Archive },
    { label: "Integrations", href: "/app/bankguard/integrations", icon: Zap },
    { label: "Settings", href: "/app/bankguard/settings", icon: Settings },
  ],
  platformshield: [
    { label: "Overview", href: "/app/platformshield/overview", icon: LayoutDashboard },
    { label: "Grooming Detection", href: "/app/platformshield/grooming-detection", icon: AlertTriangle, badge: "12", badgeColor: "bg-red-500" },
    { label: "Fake Support Groups", href: "/app/platformshield/fake-support-groups", icon: Users },
    { label: "Recovery Scams", href: "/app/platformshield/recovery-scams", icon: Shield },
    { label: "Scam Rings", href: "/app/platformshield/scam-rings", icon: Network },
    { label: "Moderation Queue", href: "/app/platformshield/moderation-queue", icon: Eye },
    { label: "Script Families", href: "/app/platformshield/script-families", icon: FileText },
    { label: "Accounts", href: "/app/platformshield/accounts", icon: UserCog },
    { label: "Evidence", href: "/app/platformshield/evidence", icon: Archive },
    { label: "Settings", href: "/app/platformshield/settings", icon: Settings },
  ],
  investigator: [
    { label: "Overview", href: "/app/investigator/overview", icon: LayoutDashboard },
    { label: "Cases", href: "/app/investigator/cases", icon: ClipboardList },
    { label: "Network Graph", href: "/app/investigator/network-graph", icon: Network },
    { label: "Clusters", href: "/app/investigator/clusters", icon: Layers },
    { label: "Entities", href: "/app/investigator/entities", icon: Fingerprint },
    { label: "Timelines", href: "/app/investigator/timelines", icon: GitBranch },
    { label: "Evidence Vault", href: "/app/investigator/evidence-vault", icon: Archive },
    { label: "Actor Linking", href: "/app/investigator/actor-linking", icon: Link2 },
    { label: "Takedown Packets", href: "/app/investigator/takedown-packets", icon: Package },
    { label: "Reports", href: "/app/investigator/reports", icon: FileText },
    { label: "Settings", href: "/app/investigator/settings", icon: Settings },
  ],
  agency: [
    { label: "Overview", href: "/app/agency/overview", icon: LayoutDashboard },
    { label: "Regional Trends", href: "/app/agency/regional-trends", icon: TrendingUp },
    { label: "Scam Hotspots", href: "/app/agency/scam-hotspots", icon: MapPin },
    { label: "Campaigns", href: "/app/agency/campaigns", icon: Megaphone },
    { label: "Public Alerts", href: "/app/agency/public-alerts", icon: Radio, badge: "2", badgeColor: "bg-red-500" },
    { label: "Network Intelligence", href: "/app/agency/network-intelligence", icon: Network },
    { label: "Referrals", href: "/app/agency/referrals", icon: Navigation },
    { label: "Reports", href: "/app/agency/reports", icon: FileText },
    { label: "Settings", href: "/app/agency/settings", icon: Settings },
  ],
  enterprise: [
    { label: "Overview", href: "/app/enterprise/overview", icon: LayoutDashboard },
    { label: "Users", href: "/app/enterprise/users", icon: Users },
    { label: "Policies", href: "/app/enterprise/policies", icon: Shield },
    { label: "Devices", href: "/app/enterprise/devices", icon: Monitor },
    { label: "Alerts", href: "/app/enterprise/alerts", icon: Bell },
    { label: "Evidence", href: "/app/enterprise/evidence", icon: Archive },
    { label: "Integrations", href: "/app/enterprise/integrations", icon: Zap },
    { label: "API Clients", href: "/app/enterprise/api-clients", icon: Key },
    { label: "Audit", href: "/app/enterprise/audit", icon: ClipboardList },
    { label: "Billing", href: "/app/enterprise/billing", icon: CreditCard },
    { label: "Settings", href: "/app/enterprise/settings", icon: Settings },
  ],
  admin: [
    { label: "Overview", href: "/admin/overview", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Tenants", href: "/admin/tenants", icon: Globe },
    { label: "Devices", href: "/admin/devices", icon: Monitor },
    { label: "Live Sessions", href: "/admin/live-sessions", icon: Activity, badge: "LIVE", badgeColor: "bg-green-500" },
    { label: "Alerts", href: "/admin/alerts", icon: Bell },
    { label: "AI Models", href: "/admin/models", icon: Cpu },
    { label: "Scam Corpus", href: "/admin/scam-corpus", icon: Database },
    { label: "Script Genome", href: "/admin/script-genome", icon: Layers },
    { label: "Network Intel", href: "/admin/network-intelligence", icon: Network },
    { label: "— Intelligence —", href: "/app/intelligence", icon: Radio, badge: "NEW", badgeColor: "bg-accent" },
    { label: "Signal Feed", href: "/app/intelligence/signals", icon: Activity },
    { label: "Clusters", href: "/app/intelligence/clusters", icon: Layers },
    { label: "Registry Review", href: "/app/intelligence/registry-review", icon: Database },
    { label: "Detection Rules", href: "/app/intelligence/rules", icon: Zap },
    { label: "Evidence", href: "/admin/evidence", icon: Archive },
    { label: "Integrations", href: "/admin/integrations", icon: Zap },
    { label: "Billing", href: "/admin/billing", icon: CreditCard },
    { label: "Compliance", href: "/admin/compliance", icon: ShieldCheck },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: ClipboardList },
    { label: "Support", href: "/admin/support", icon: MessageSquare },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ],
}

const roleLabels: Record<DashboardRole, { name: string; color: string; icon: React.ElementType }> = {
  individual: { name: "Individual Guardian", color: "text-blue-400", icon: Shield },
  family: { name: "Family Guardian", color: "text-green-400", icon: Heart },
  bankguard: { name: "BankGuard", color: "text-gold-400", icon: Lock },
  platformshield: { name: "PlatformShield", color: "text-purple-400", icon: ShieldCheck },
  investigator: { name: "Investigator Console", color: "text-orange-400", icon: Search },
  agency: { name: "Agency Console", color: "text-cyan-400", icon: Globe },
  enterprise: { name: "Enterprise Admin", color: "text-indigo-400", icon: Layers },
  admin: { name: "VIGISCAM Admin", color: "text-red-400", icon: Flag },
}

interface SidebarProps {
  role?: DashboardRole
}

export function Sidebar({ role = "individual" }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { logout } = useAuth()
  const items = roleNavItems[role]
  const roleInfo = roleLabels[role]
  const RoleIcon = roleInfo.icon

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center border-b border-sidebar-border p-4 gap-3", collapsed && "justify-center px-2")}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 flex-1 min-w-0">
            <VigiscamLogo size="sm" variant="full" inverted />
          </Link>
        )}
        {collapsed && (
          <Link href="/" title="Back to VIGISCAM™ home">
            <VigiscamLogo size="sm" variant="icon" inverted />
          </Link>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors group relative",
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="truncate flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white", item.badgeColor)}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-2 space-y-1">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <Home className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Back to Site</span>}
        </Link>
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  )
}
