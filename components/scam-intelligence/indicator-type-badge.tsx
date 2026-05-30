import { cn } from "@/lib/utils"
import { Globe, Link, Phone, Mail, Wallet, User, Monitor, Building, FileText } from "lucide-react"
import type { IndicatorType } from "@/lib/scam-intelligence-data"
import { indicatorTypeLabels } from "@/lib/scam-intelligence-data"

interface IndicatorTypeBadgeProps {
  type: IndicatorType
  size?: "sm" | "md"
  showLabel?: boolean
}

const typeConfig: Record<IndicatorType, { icon: React.ElementType; className: string }> = {
  domain: { icon: Globe, className: "bg-slate-100 text-slate-700 border-slate-200" },
  url: { icon: Link, className: "bg-slate-100 text-slate-700 border-slate-200" },
  phone: { icon: Phone, className: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  email: { icon: Mail, className: "bg-purple-50 text-purple-700 border-purple-200" },
  wallet: { icon: Wallet, className: "bg-amber-50 text-amber-700 border-amber-200" },
  "social-profile": { icon: User, className: "bg-sky-50 text-sky-700 border-sky-200" },
  "fake-support-page": { icon: Monitor, className: "bg-red-50 text-red-700 border-red-200" },
  "fake-company": { icon: Building, className: "bg-orange-50 text-orange-700 border-orange-200" },
  "scam-script": { icon: FileText, className: "bg-teal-50 text-teal-700 border-teal-200" },
}

export function IndicatorTypeBadge({ type, size = "md", showLabel = true }: IndicatorTypeBadgeProps) {
  const config = typeConfig[type]
  const Icon = config.icon
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border font-medium",
        config.className,
        size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      )}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {showLabel && indicatorTypeLabels[type]}
    </span>
  )
}
