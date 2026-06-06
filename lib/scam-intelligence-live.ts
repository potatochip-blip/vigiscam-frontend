'use client'

/**
 * Live adapter for the public Scam-Intelligence tool.
 *
 * Maps the backend's privacy-safe public registry (GET /registry/search, no
 * login) onto the FE `RegistryEntry` shape the marketing pages already render,
 * so those pages show real published intelligence instead of mock data. Fields
 * the public API deliberately does NOT expose (network linkage, region, common
 * phrases, related indicators) get safe neutral defaults — privacy by
 * construction, never fabricated detail.
 */
import useSWR from "swr"
import { backend } from "@/lib/backend"
import type {
  RegistryEntry, IndicatorType, ScamFamily, VerificationStatus, TakedownStatus,
} from "@/lib/scam-intelligence-data"

type PublicRegistryEntry = {
  id: string
  indicatorType: string
  indicator: string
  category: string
  publicStatus: string | null
  riskLevel: string
  summary: string
  recommendedAction: string | null
  firstSeen: string | null
  lastSeen: string | null
  evidenceCount: number
  publishedAt: string | null
}

const INDICATOR_MAP: Record<string, IndicatorType> = {
  PHONE: "phone", EMAIL: "email", DOMAIN: "domain", URL: "url",
  CRYPTO_WALLET: "wallet", SOCIAL_PROFILE: "social-profile",
  FAKE_COMPANY: "fake-company", SCAM_PHRASE: "scam-script",
}

const FAMILY_MAP: Record<string, ScamFamily> = {
  TECH_SUPPORT: "tech-support", BANK_IMPERSONATION: "bank-impersonation",
  ROMANCE: "romance", RECOVERY: "recovery", SEXTORTION: "sextortion",
  GIFT_CARD: "gift-card", CRYPTO: "crypto", CRYPTO_SCAM: "crypto",
  REMOTE_ACCESS: "remote-access", DEEPFAKE: "deepfake", CHECK_FRAUD: "check-fraud",
}

function mapIndicator(t: string): IndicatorType {
  return INDICATOR_MAP[t?.toUpperCase()] ?? "domain"
}
function mapFamily(category: string): ScamFamily {
  return FAMILY_MAP[category?.toUpperCase()] ?? "tech-support"
}
function mapStatus(publicStatus: string | null, riskLevel: string): VerificationStatus {
  const ps = (publicStatus ?? "").toUpperCase()
  if (ps.includes("TAKEDOWN") || ps.includes("SEIZED")) return "takedown-confirmed"
  if (ps.includes("REPORTED")) return "officially-reported"
  const rl = (riskLevel ?? "").toUpperCase()
  return rl === "CRITICAL" || rl === "HIGH" ? "verified-malicious" : "high-risk-verified"
}
function mapTakedown(publicStatus: string | null): TakedownStatus {
  const ps = (publicStatus ?? "").toUpperCase()
  if (ps.includes("TAKEDOWN") || ps.includes("SEIZED")) return "confirmed"
  return "not-applicable"
}
const day = (v: string | null) => (v ? new Date(v).toISOString().slice(0, 10) : "")

/** Project a backend public-registry entry onto the FE RegistryEntry shape. */
export function toFeRegistryEntry(e: PublicRegistryEntry): RegistryEntry {
  return {
    id: e.id,
    indicator: e.indicator,
    type: mapIndicator(e.indicatorType),
    scamFamily: mapFamily(e.category),
    status: mapStatus(e.publicStatus, e.riskLevel),
    firstSeen: day(e.firstSeen),
    lastSeen: day(e.lastSeen),
    linkedNetwork: "Unclassified",
    caseCount: e.evidenceCount ?? 0,
    takedownStatus: mapTakedown(e.publicStatus),
    region: "Global",
    summary: e.summary ?? "",
    commonPhrases: [],
    relatedIndicators: [],
    dateVerified: day(e.publishedAt),
    recommendedAction: e.recommendedAction ?? "",
    evidenceSummary: `${e.evidenceCount ?? 0} verified report${(e.evidenceCount ?? 0) === 1 ? "" : "s"} on record.`,
  }
}

async function fetchRegistry(q?: string): Promise<RegistryEntry[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, response } = await (backend.GET as any)("/api/v1/registry/search", {
    params: { query: { limit: 100, ...(q ? { q } : {}) } },
  })
  if (error || !response.ok) throw new Error(`Registry search failed (${response.status})`)
  const items = (data?.items ?? data ?? []) as PublicRegistryEntry[]
  return items.map(toFeRegistryEntry)
}

/** Live published scam-registry entries (public, no login). */
export function useRegistryEntries(q?: string) {
  const { data, error, isLoading } = useSWR(["public-registry", q ?? ""], () => fetchRegistry(q), { revalidateOnFocus: false })
  return { entries: data ?? [], isLoading, error: error as Error | undefined }
}
