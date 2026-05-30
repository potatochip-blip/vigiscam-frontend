import Link from "next/link"
import { VigiscamLogo } from "@/components/vigiscam-logo"

/**
 * A slim footer bar that renders the VIGISCAM™ logo linked back to the
 * home page. Injected globally at the root layout level so it appears on
 * every single page of the platform.
 */
export function HomeLogoBar() {
  return (
    <div className="w-full bg-primary border-t border-primary-foreground/10 py-4 flex items-center justify-center">
      <Link
        href="/"
        aria-label="Return to VIGISCAM™ home page"
        className="opacity-80 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
      >
        <VigiscamLogo size="sm" variant="full" inverted />
      </Link>
    </div>
  )
}
