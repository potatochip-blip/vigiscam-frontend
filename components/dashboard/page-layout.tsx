import { Sidebar, DashboardRole } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { HomeLogoBar } from "@/components/home-logo-bar"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  role: DashboardRole
  title?: string
  subtitle?: string
  alertCount?: number
  children: React.ReactNode
  className?: string
}

export function PageLayout({ role, title, subtitle, alertCount, children, className }: PageLayoutProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} subtitle={subtitle} alertCount={alertCount} />
        <main className={cn("flex-1 overflow-auto", className)}>
          <div className="p-6">
            {children}
          </div>
          <HomeLogoBar />
        </main>
      </div>
    </div>
  )
}
