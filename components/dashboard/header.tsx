'use client'

import { Bell, Search, User, ChevronDown, LogOut, Settings, RefreshCw, Shield, Users, Landmark, Globe, Building2, Briefcase, Lock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useAuth, type UserRole } from "@/lib/auth-context"

const roleInfo: Record<UserRole, { label: string; icon: React.ElementType; color: string; shortLabel: string }> = {
  individual: { label: "Individual Guardian", shortLabel: "Individual", icon: Shield, color: "bg-blue-100 text-blue-700" },
  family: { label: "Family Guardian", shortLabel: "Family", icon: Heart, color: "bg-green-100 text-green-700" },
  bankguard: { label: "BankGuard", shortLabel: "BankGuard", icon: Landmark, color: "bg-amber-100 text-amber-700" },
  platformshield: { label: "PlatformShield", shortLabel: "Platform", icon: Globe, color: "bg-purple-100 text-purple-700" },
  investigator: { label: "Investigator Console", shortLabel: "Investigator", icon: Search, color: "bg-orange-100 text-orange-700" },
  agency: { label: "Agency Console", shortLabel: "Agency", icon: Building2, color: "bg-cyan-100 text-cyan-700" },
  enterprise: { label: "Enterprise Admin", shortLabel: "Enterprise", icon: Briefcase, color: "bg-indigo-100 text-indigo-700" },
  admin: { label: "Internal Operations", shortLabel: "Admin", icon: Lock, color: "bg-red-100 text-red-700" },
}

interface HeaderProps {
  title?: string
  subtitle?: string
  alertCount?: number
}

export function Header({ title, subtitle, alertCount = 3 }: HeaderProps) {
  const { user, logout, switchDemoRole, isAuthenticated } = useAuth()
  
  const currentRole = user?.role || "individual"
  const currentRoleInfo = roleInfo[currentRole]
  const RoleIcon = currentRoleInfo.icon

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4 flex-1">
        {title && (
          <div>
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        <div className="relative max-w-sm flex-1 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 h-9 bg-muted border-0 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Current Role Badge */}
        {isAuthenticated && (
          <Badge className={`${currentRoleInfo.color} border-0 gap-1.5 hidden sm:flex`}>
            <RoleIcon className="h-3 w-3" />
            <span className="hidden lg:inline">{currentRoleInfo.shortLabel}</span>
          </Badge>
        )}

        {/* Alert Bell */}
        <Button variant="ghost" size="icon" className="relative" asChild>
          <Link href="#alerts">
            <Bell className="h-4 w-4" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                {alertCount}
              </span>
            )}
          </Link>
        </Button>

        {/* Risk Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-full">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-600">Protected</span>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9 px-3">
              <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                <User className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="hidden md:block text-sm font-medium max-w-24 truncate">
                {user?.name || "Account"}
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.name || "Guest"}</p>
              <p className="text-xs text-muted-foreground">{user?.email || "Not signed in"}</p>
              {user?.organization && (
                <p className="text-xs text-muted-foreground mt-0.5">{user.organization}</p>
              )}
            </div>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link
                href={currentRole === "admin" ? "/admin/settings" : `/app/${currentRole}/settings`}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Profile Settings
              </Link>
            </DropdownMenuItem>
            
            {/* Demo Role Switcher */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Switch Portal (Demo)
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-48">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Select Portal</DropdownMenuLabel>
                {(Object.keys(roleInfo) as UserRole[]).map((role) => {
                  const info = roleInfo[role]
                  const Icon = info.icon
                  const isActive = role === currentRole
                  return (
                    <DropdownMenuItem
                      key={role}
                      onClick={() => switchDemoRole(role)}
                      className={`flex items-center gap-2 ${isActive ? "bg-muted" : ""}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{info.label}</span>
                      {isActive && <span className="ml-auto text-xs text-primary">Active</span>}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={logout} className="text-destructive flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
