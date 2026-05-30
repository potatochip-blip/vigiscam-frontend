import { cn } from "@/lib/utils"
import { ShieldCheck, ShieldAlert, ShieldOff, FileCheck } from "lucide-react"
import type { VerificationStatus } from "@/lib/scam-intelligence-data"
import { verificationStatusLabels } from "@/lib/scam-intelligence-data"

interface VerificationBadgeProps {
  status: VerificationStatus
  size?: "sm" | "md"
  showIcon?: boolean
}

const statusConfig: Record<VerificationStatus, { icon: React.ElementType; className: string }> = {
  "verified-malicious": { icon: ShieldOff, className: "bg-red-50 text-red-700 border-red-200" },
  "high-risk-verified": { icon: ShieldAlert, className: "bg-orange-50 text-orange-700 border-orange-200" },
  "takedown-confirmed": { icon: ShieldCheck, className: "bg-green-50 text-green-700 border-green-200" },
  "officially-reported": { icon: FileCheck, className: "bg-blue-50 text-blue-700 border-blue-200" },
}

export function VerificationBadge({ status, size = "md", showIcon = true }: VerificationBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border font-medium",
        config.className,
        size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      )}
    >
      {showIcon && <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />}
      {verificationStatusLabels[status]}
    </span>
  )
}
