/**
 * Pure mappers between the backend wire shape and the frontend's v0-style
 * domain types. Two flavour differences to bridge:
 *
 *   1. **Casing.** Backend uses UPPER_SNAKE for enums (`VERIFIED_MALICIOUS`,
 *      `DOMAIN`, `PHISHING`). Frontend types are lowercase-kebab
 *      (`verified-malicious`, `domain`, `phishing`).
 *   2. **Field naming.** Backend (Prisma) uses `indicatorValue`,
 *      `evidenceCount`. Frontend uses `indicator`, `caseCount`.
 *
 * Every mapper is a pure function. If a frontend field has no backend
 * source (e.g. `region`, `commonPhrases`), it gets a sensible default.
 */
import type {
  Alert,
  AlertSeverity,
  AlertType,
  IndicatorType,
  RegistryEntry,
  ScamFamily,
  TakedownStatus,
  VerificationStatus,
} from './types';

// ─── Enum mappers ────────────────────────────────────────────────────────────

/** Convert UPPER_SNAKE → lowercase-kebab. `VERIFIED_MALICIOUS` → `verified-malicious`. */
function toKebab(s: string): string {
  return s.toLowerCase().replace(/_/g, '-');
}

/** Convert lowercase-kebab → UPPER_SNAKE. Inverse of toKebab. */
export function toUpperSnake(s: string): string {
  return s.toUpperCase().replace(/-/g, '_');
}

export function mapIndicatorType(backendType: string): IndicatorType {
  const k = toKebab(backendType);
  // Backend enum: DOMAIN, URL, PHONE, EMAIL, CRYPTO_WALLET, SOCIAL_PROFILE, IP_ADDRESS
  const map: Record<string, IndicatorType> = {
    domain: 'domain',
    url: 'url',
    phone: 'phone',
    email: 'email',
    'crypto-wallet': 'wallet',
    'social-profile': 'social-profile',
    'ip-address': 'ip-address',
  };
  return map[k] ?? 'other' as IndicatorType;
}

export function mapScamFamily(backendCategory: string): ScamFamily {
  const k = toKebab(backendCategory);
  const known: ScamFamily[] = [
    'tech-support',
    'bank-impersonation',
    'romance',
    'recovery',
    'sextortion',
    'gift-card',
    'crypto',
    'remote-access',
    'deepfake',
    'check-fraud',
    'phishing',
    'job-scam',
    'government-impersonation',
    'lottery',
    'other',
  ];
  return (known as string[]).includes(k) ? (k as ScamFamily) : 'other';
}

export function mapVerificationStatus(
  publicStatus: string | null | undefined,
): VerificationStatus {
  if (!publicStatus) return 'pending-verification';
  const k = toKebab(publicStatus);
  // Backend RegistryPublicStatus → frontend VerificationStatus.
  const map: Record<string, VerificationStatus> = {
    'verified-malicious': 'verified-malicious',
    'high-risk-verified': 'high-risk-verified',
    'officially-reported': 'officially-reported',
    'takedown-confirmed': 'takedown-confirmed',
  };
  return map[k] ?? 'pending-verification';
}

/** Backend AlertSeverity (INFO|WARNING|HIGH|CRITICAL) → frontend AlertSeverity. */
export function mapAlertSeverity(s: string): AlertSeverity {
  const map: Record<string, AlertSeverity> = {
    INFO: 'info',
    WARNING: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  };
  return map[(s ?? '').toUpperCase()] ?? 'info';
}

/**
 * Backend Alert.type is a free-form string; best-effort map it onto the
 * frontend's AlertType union, falling back to 'system'.
 */
export function mapAlertType(t: string): AlertType {
  const k = (t ?? '').toLowerCase();
  if (k.includes('takedown')) return 'takedown-update';
  if (k.includes('case')) return 'case-update';
  if (k.includes('network')) return 'network-activity';
  if (k.includes('complian')) return 'compliance';
  if (k.includes('threat') || k.includes('risk') || k.includes('scam') || k.includes('fraud'))
    return 'new-threat';
  return 'system';
}

/** Backend Alert (Prisma row) → frontend Alert. */
export function mapAlert(
  a: {
    id: string;
    type: string;
    severity: string;
    title: string;
    message: string;
    readAt?: string | Date | null;
    createdAt: string | Date;
  },
): Alert {
  return {
    id: a.id,
    type: mapAlertType(a.type),
    severity: mapAlertSeverity(a.severity),
    title: a.title,
    message: a.message,
    createdAt: new Date(a.createdAt).toISOString(),
    readAt: a.readAt ? new Date(a.readAt).toISOString() : undefined,
  };
}

// ─── Object mappers ─────────────────────────────────────────────────────────

/**
 * Backend `PublicRegistryEntry` (registry.mapper.ts in backend) →
 * frontend `RegistryEntry`. Fields the backend doesn't expose
 * (region, linkedNetwork, commonPhrases, etc.) get safe defaults.
 */
export function mapRegistryEntry(
  b: {
    id: string;
    indicatorType: string;
    indicator: string;
    category: string;
    publicStatus: string | null;
    riskLevel?: string;
    summary: string;
    recommendedAction: string | null;
    firstSeen: string | Date | null;
    lastSeen: string | Date | null;
    evidenceCount: number;
    publishedAt: string | Date | null;
  },
): RegistryEntry {
  const asIso = (d: string | Date | null): string =>
    d ? new Date(d).toISOString() : new Date(0).toISOString();
  return {
    id: b.id,
    indicator: b.indicator,
    type: mapIndicatorType(b.indicatorType),
    scamFamily: mapScamFamily(b.category),
    status: mapVerificationStatus(b.publicStatus),
    firstSeen: asIso(b.firstSeen),
    lastSeen: asIso(b.lastSeen),
    caseCount: b.evidenceCount,
    takedownStatus: 'pending' as TakedownStatus, // backend doesn't expose this on public entries
    region: 'global',
    summary: b.summary,
    commonPhrases: [],
    relatedIndicators: [],
    dateVerified: asIso(b.publishedAt),
    recommendedAction: b.recommendedAction ?? '',
    evidenceSummary: '',
  };
}
