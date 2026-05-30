import { cn } from "@/lib/utils"

interface VigiscamLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "full" | "icon" | "wordmark"
  inverted?: boolean
}

const sizes = {
  sm: { icon: 32, wordmarkH: 14, subH: 10 },
  md: { icon: 44, wordmarkH: 18, subH: 11 },
  lg: { icon: 56, wordmarkH: 22, subH: 12 },
  xl: { icon: 72, wordmarkH: 28, subH: 14 },
}

export function VigiscamLogo({ className, size = "md", variant = "full", inverted = false }: VigiscamLogoProps) {
  const s = sizes[size]
  const primaryColor = inverted ? "#ffffff" : "#1e3a5f"
  const accentColor = "#c9952a"
  const bgColor = inverted ? "rgba(255,255,255,0.12)" : primaryColor

  const IconMark = () => (
    <svg
      width={s.icon}
      height={s.icon}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Shield base */}
      <path
        d="M28 4L6 13v14c0 12.5 9.4 24.2 22 27 12.6-2.8 22-14.5 22-27V13L28 4z"
        fill={bgColor}
      />
      {/* Shield inner highlight border */}
      <path
        d="M28 8L9 16v11c0 10.8 8.1 20.8 19 23.4 10.9-2.6 19-12.6 19-23.4V16L28 8z"
        fill="none"
        stroke={accentColor}
        strokeWidth="1.2"
        opacity="0.6"
      />
      {/* Eye outer */}
      <ellipse cx="28" cy="27" rx="11" ry="7.5" fill="none" stroke={inverted ? "white" : "white"} strokeWidth="2" />
      {/* Eye iris */}
      <circle cx="28" cy="27" r="4.5" fill={accentColor} />
      {/* Eye pupil */}
      <circle cx="28" cy="27" r="2.2" fill={inverted ? primaryColor : "white"} />
      {/* Eye shine */}
      <circle cx="29.8" cy="25.5" r="0.9" fill="white" opacity="0.9" />
      {/* Slash through — representing "detect and neutralize" */}
      <line x1="16" y1="38" x2="38" y2="18" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      {/* Slash cap dots */}
      <circle cx="16.5" cy="37.5" r="1.4" fill={accentColor} opacity="0.7" />
      <circle cx="37.5" cy="18.5" r="1.4" fill={accentColor} opacity="0.7" />
    </svg>
  )

  if (variant === "icon") {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <IconMark />
      </span>
    )
  }

  if (variant === "wordmark") {
    return (
      <span className={cn("inline-flex flex-col leading-none", className)}>
        <span
          style={{ fontSize: s.wordmarkH, color: inverted ? "white" : primaryColor, letterSpacing: "0.12em", fontWeight: 800, lineHeight: 1 }}
          className="font-sans uppercase"
        >
          VIGISCAM™
        </span>
        <span
          style={{ fontSize: s.subH, color: inverted ? "rgba(255,255,255,0.65)" : "rgba(30,58,95,0.55)", letterSpacing: "0.05em", lineHeight: 1.4 }}
          className="font-sans"
        >
          Unified Anti-Scam Platform
        </span>
      </span>
    )
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <IconMark />
      <span className="inline-flex flex-col leading-none">
        <span
          style={{ fontSize: s.wordmarkH, color: inverted ? "white" : primaryColor, letterSpacing: "0.12em", fontWeight: 800, lineHeight: 1 }}
          className="font-sans uppercase"
        >
          VIGISCAM™
        </span>
        <span
          style={{ fontSize: s.subH, color: inverted ? "rgba(255,255,255,0.65)" : "rgba(30,58,95,0.55)", letterSpacing: "0.05em", lineHeight: 1.4 }}
          className="font-sans"
        >
          Unified Anti-Scam Platform
        </span>
      </span>
    </span>
  )
}
