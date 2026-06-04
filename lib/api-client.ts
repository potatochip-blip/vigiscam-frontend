/**
 * VIGISCAM™ API Client
 * =====================
 *
 * Public surface (`authApi`, `scamIntelligenceApi`, `reportsApi`, etc.) is
 * unchanged from the v0 export so existing page code keeps building. The
 * implementations underneath are split into two categories:
 *
 *   • **Wired to the real backend** — auth (login/register/refresh/me/logout),
 *     scam-check, public registry search, latest alerts, public scam-report
 *     submit. These call `lib/backend.ts` and map shapes via `lib/mappers.ts`.
 *
 *   • **Still stubbed** — cases, dashboard, admin/verification-queue, settings,
 *     etc. These either have no backend equivalent yet or use shapes the
 *     backend has but the v0 demo pages render differently. They return a
 *     standard `NOT_IMPLEMENTED` envelope so callers see the gap explicitly
 *     instead of silently breaking.
 *
 * As real backend endpoints land for the stubbed areas, swap the
 * `notImplemented(...)` calls for `backend.POST(...)` + a mapper.
 */
import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  FilterParams,
  // Auth
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  AuthSession,
  // Scam Intelligence
  IndicatorCheckRequest,
  IndicatorCheckResponse,
  IndicatorType,
  ScamFamily,
  IdentityCollisionResult,
  Submission,
  SubmissionStatus,
  TakedownRecord,
  TakedownCurrentStatus,
  RegistryEntry,
  ScamNetwork,
  // Reports
  SubmitReportRequest,
  SubmitReportResponse,
  ScamReport,
  // Cases
  Case,
  CaseNote,
  // Alerts
  Alert,
  // Dashboard
  DashboardStats,
  ActivityLogEntry,
  // Verification
  VerificationQueueItem,
  ReviewDecision,
  // Public Registry
  PublicRegistryDraft,
  // Appeals
  CorrectionAppeal,
  // Settings
  UserSettings,
  OrganizationSettings,
} from './types';
import { backend, setAuthToken } from './backend';
import {
  mapAlert,
  mapIndicatorType,
  mapRegistryEntry,
  mapScamFamily,
  toUpperSnake,
} from './mappers';

// ============================================================================
// HELPERS
// ============================================================================

function ok<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

function fail(code: string, message: string): ApiResponse<never> {
  return {
    success: false,
    error: { code, message, timestamp: new Date().toISOString() },
  };
}

/** Wrap a fully-materialized array into the frontend's pagination envelope
 *  (the admin/intelligence backend endpoints return plain arrays, capped). */
function paginate<T>(items: T[], params: PaginationParams = {}): PaginatedResponse<T> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const start = (page - 1) * limit;
  return {
    data: items.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages: Math.max(1, Math.ceil(items.length / limit)),
      hasNext: start + limit < items.length,
      hasPrev: page > 1,
    },
  };
}

/** Convert openapi-fetch's `{ data, error, response }` to `ApiResponse<T>`. */
function fromBackend<T>(
  data: unknown,
  error: unknown,
  response: Response,
): ApiResponse<T> {
  if (error || !data) {
    const msg =
      (error as { message?: string })?.message ?? response.statusText;
    return fail(`HTTP_${response.status}`, msg);
  }
  return ok(data as T);
}

/**
 * Used by methods that have no backend equivalent yet. Returning an error
 * envelope (instead of throwing) keeps SWR hooks well-behaved.
 */
function notImplemented<T>(surface: string): Promise<ApiResponse<T>> {
  return Promise.resolve(
    fail(
      'NOT_IMPLEMENTED',
      `${surface} is not yet wired to the real backend. ` +
        'Tracked in lib/api-client.ts.',
    ),
  );
}

// ============================================================================
// AUTH — wired to /api/v1/auth/*
// ============================================================================

export const authApi = {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const { data, error, response } = await backend.POST('/api/v1/auth/login', {
      body: { email: credentials.email, password: credentials.password },
    });
    if (error || !data) {
      return ok({ success: false, error: 'Invalid email or password' });
    }
    const body = data as {
      accessToken: string;
      refreshToken: string;
      user: { id: string; email: string; fullName?: string };
    };
    setAuthToken(body.accessToken);
    const session: AuthSession = {
      user: {
        id: body.user.id,
        email: body.user.email,
        name: body.user.fullName ?? body.user.email,
        role: 'individual',
        verified: true,
        onboardingComplete: true,
      },
      accessToken: body.accessToken,
      refreshToken: body.refreshToken,
      expiresAt: Date.now() + 15 * 60 * 1000, // backend JWT TTL is 15m
    };
    return ok({ success: true, session });
  },

  async signup(req: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    const { data, error, response } = await backend.POST(
      '/api/v1/auth/register',
      {
        body: {
          email: req.email,
          password: req.password,
          fullName: req.name,
        },
      },
    );
    if (error || !data) {
      const msg =
        (error as unknown as { message?: string } | undefined)?.message ??
        response.statusText;
      return ok({ success: false, error: msg });
    }
    const body = data as {
      accessToken: string;
      user: { id: string; email: string; fullName?: string };
    };
    setAuthToken(body.accessToken);
    return ok({
      success: true,
      user: {
        id: body.user.id,
        email: body.user.email,
        name: body.user.fullName ?? body.user.email,
        role: req.role,
        verified: false,
        onboardingComplete: false,
      },
    });
  },

  async logout(): Promise<ApiResponse<void>> {
    // Backend has no /auth/logout; refresh-token revoke endpoint exists but
    // requires the refresh token. The auth bridge in FE-3 handles this.
    setAuthToken(null);
    return ok(undefined as unknown as void);
  },

  async getSession(): Promise<ApiResponse<AuthSession>> {
    const { data, error, response } = await backend.GET('/api/v1/auth/me');
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const me = data as {
      id: string;
      email: string;
      fullName?: string;
    };
    return ok({
      user: {
        id: me.id,
        email: me.email,
        name: me.fullName ?? me.email,
        role: 'individual',
        verified: true,
        onboardingComplete: true,
      },
      accessToken: '', // session call doesn't reissue tokens
      refreshToken: '',
      expiresAt: Date.now() + 15 * 60 * 1000,
    });
  },

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthSession>> {
    const { data, error, response } = await backend.POST(
      '/api/v1/auth/refresh',
      { body: { refreshToken } },
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const body = data as {
      accessToken: string;
      refreshToken: string;
      user: { id: string; email: string; fullName?: string };
    };
    setAuthToken(body.accessToken);
    return ok({
      user: {
        id: body.user.id,
        email: body.user.email,
        name: body.user.fullName ?? body.user.email,
        role: 'individual',
        verified: true,
        onboardingComplete: true,
      },
      accessToken: body.accessToken,
      refreshToken: body.refreshToken,
      expiresAt: Date.now() + 15 * 60 * 1000,
    });
  },

  // Password reset / MFA are not in the backend yet — stub explicitly.
  forgotPassword: (_email: string) => notImplemented<void>('forgotPassword'),
  resetPassword: (_t: string, _p: string) =>
    notImplemented<void>('resetPassword'),
  verifyMfa: (_code: string) => notImplemented<AuthSession>('verifyMfa'),
};

// ============================================================================
// SCAM INTELLIGENCE — wired to /api/v1/registry/*, /scam-check, /public-alerts
// ============================================================================

/** Raw backend ScamSignal row (reviewer list view). */
type BackendSignalRow = {
  id: string;
  sourceType: string;
  category: string | null;
  indicatorType: string;
  indicatorValue: string;
  description: string | null;
  rawText: string | null;
  reportCount: number;
  status: string;
  createdAt: string;
};

/** Map the backend ScamSignalStatus onto the triage table's five buckets. */
function mapSubmissionStatus(status: string): SubmissionStatus {
  switch (status) {
    case 'UNVERIFIED_REPORT':
      return 'new';
    case 'SUSPICIOUS_SIGNAL':
    case 'PATTERN_MATCH':
    case 'UNDER_REVIEW':
    case 'HIGH_RISK_INDICATOR':
      return 'under-review';
    case 'VERIFIED_SCAM_INTELLIGENCE':
    case 'PUBLIC_SAFE_ALERT':
      return 'approved-for-verification';
    case 'REJECTED':
    case 'ARCHIVED':
      return 'rejected';
    default:
      return 'new';
  }
}

/** Map a signal's source to the table's submitter taxonomy. */
function mapSubmitterType(sourceType: string): Submission['submitterType'] {
  switch (sourceType) {
    case 'INTERNAL':
      return 'client';
    case 'PARTNER_REPORT':
    case 'BANK_REPORT':
    case 'INVESTIGATOR':
    case 'GOVERNMENT_ADVISORY':
      return 'partner';
    default:
      return 'anonymous';
  }
}

function mapSubmission(s: BackendSignalRow): Submission {
  return {
    id: s.id,
    submittedAt: s.createdAt,
    indicatorValue: s.indicatorValue,
    indicatorType: mapIndicatorType(s.indicatorType),
    suspectedScamFamily: mapScamFamily(s.category ?? ''),
    status: mapSubmissionStatus(s.status),
    submitterType: mapSubmitterType(s.sourceType),
    description: s.description ?? s.rawText ?? '',
    // The signal carries a corroborating-report count rather than a discrete
    // evidence-attachment count; surface it as the table's "Evidence" figure.
    evidenceCount: s.reportCount,
  };
}

/** Raw backend TakedownRequest row (list view — no registryEntry include). */
type BackendTakedownRow = {
  id: string;
  registryEntryId: string;
  providerType: string;
  providerName: string;
  providerReference: string | null;
  status: string;
  details: string;
  outcomeNotes: string | null;
  submittedAt: string | null;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/** Map the backend TakedownStatus enum onto the tracker's five UI buckets. */
function mapTakedownStatus(status: string): TakedownCurrentStatus {
  switch (status) {
    case 'DRAFT':
    case 'SUBMITTED':
      return 'under-review';
    case 'ACKNOWLEDGED':
    case 'IN_PROGRESS':
      return 'action-filed';
    case 'COMPLETED':
      return 'confirmed';
    case 'WITHDRAWN':
      return 'partial';
    case 'REJECTED':
      return 'stalled';
    default:
      return 'under-review';
  }
}

function mapTakedownRecord(r: BackendTakedownRow): TakedownRecord {
  const currentStatus = mapTakedownStatus(r.status);
  // Derive an audit timeline from the timestamps the backend records.
  const statusHistory: TakedownRecord['statusHistory'] = [
    { date: r.createdAt, status: 'under-review' as const, note: 'Takedown request created.' },
  ];
  if (r.submittedAt) {
    statusHistory.push({
      date: r.submittedAt,
      status: 'action-filed',
      note: `Submitted to ${r.providerName} (${r.providerType.replace(/_/g, ' ').toLowerCase()}).`,
    });
  }
  if (r.resolvedAt) {
    statusHistory.push({
      date: r.resolvedAt,
      status: currentStatus,
      note: r.outcomeNotes ?? `Resolved as ${r.status.toLowerCase()}.`,
    });
  }
  return {
    id: r.id,
    registryEntryId: r.registryEntryId,
    providerType: r.providerType,
    providerName: r.providerName,
    providerReference: r.providerReference,
    currentStatus,
    details: r.details,
    outcomeNotes: r.outcomeNotes,
    submittedAt: r.submittedAt,
    resolvedAt: r.resolvedAt,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    // A confirmed (COMPLETED) takedown is the only state eligible for the
    // public Verified Takedowns surface.
    publicDisplayEligible: r.status === 'COMPLETED',
    statusHistory,
  };
}

export const scamIntelligenceApi = {
  async checkIndicator(
    req: IndicatorCheckRequest,
  ): Promise<ApiResponse<IndicatorCheckResponse>> {
    // The backend's Prisma IndicatorType enum is the source of truth;
    // toUpperSnake produces a string in that vocabulary, but TypeScript
    // can't statically prove it. The cast-through-unknown is a no-op at
    // runtime — server-side validation rejects anything off-vocabulary.
    const checkBody = {
      indicatorType: toUpperSnake(req.type ?? 'phone'),
      indicatorValue: req.indicator,
    };
    const { data, error, response } = await backend.POST('/api/v1/scam-check', {
      body: checkBody as unknown as never,
    });
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const body = data as {
      riskScore?: number;
      recommendation?: string;
      matchedSignals?: Array<unknown>;
    };
    return ok({
      success: true,
      found: (body.matchedSignals?.length ?? 0) > 0,
      count: body.matchedSignals?.length ?? 0,
      results: [], // backend scam-check doesn't return registry entries inline
      riskScore: body.riskScore,
      recommendations: body.recommendation ? [body.recommendation] : [],
    });
  },

  async getRegistry(
    params: PaginationParams & FilterParams = {},
  ): Promise<ApiResponse<PaginatedResponse<RegistryEntry>>> {
    const { data, error, response } = await backend.GET(
      '/api/v1/registry/search',
      {
        params: {
          query: {
            q: params.search,
            page: params.page,
            limit: params.limit,
          },
        },
      },
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const body = data as {
      items: Array<Parameters<typeof mapRegistryEntry>[0]>;
      page: number;
      limit: number;
      hasMore: boolean;
    };
    return ok({
      data: body.items.map(mapRegistryEntry),
      pagination: {
        page: body.page,
        limit: body.limit,
        total: body.items.length, // backend doesn't surface a global count
        totalPages: body.hasMore ? body.page + 1 : body.page,
        hasNext: body.hasMore,
        hasPrev: body.page > 1,
      },
    });
  },

  // CP-13 — wired to the internal single-entry lookup.
  async getRegistryEntry(id: string): Promise<ApiResponse<RegistryEntry>> {
    const { data, error, response } = await backend.GET(
      '/api/v1/intelligence/registry/{id}',
      { params: { path: { id } } },
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const e = data as unknown as {
      id: string;
      indicatorType: string;
      indicatorValue: string;
      category: string;
      publicStatus: string | null;
      publicSafeSummary: string;
      recommendedAction: string | null;
      firstSeen: string | null;
      lastSeen: string | null;
      evidenceCount: number;
      publishedAt: string | null;
    };
    return ok(
      mapRegistryEntry({
        id: e.id,
        indicatorType: e.indicatorType,
        indicator: e.indicatorValue,
        category: e.category,
        publicStatus: e.publicStatus,
        summary: e.publicSafeSummary,
        recommendedAction: e.recommendedAction,
        firstSeen: e.firstSeen,
        lastSeen: e.lastSeen,
        evidenceCount: e.evidenceCount,
        publishedAt: e.publishedAt,
      }),
    );
  },

  // Networks & takedowns are admin-scoped on the backend — not on the
  // public surface yet.
  getNetworks: (_p?: PaginationParams & FilterParams) =>
    notImplemented<PaginatedResponse<ScamNetwork>>('getNetworks'),
  getNetwork: (_id: string) => notImplemented<ScamNetwork>('getNetwork'),

  async getLatestAlerts(limit = 10): Promise<ApiResponse<RegistryEntry[]>> {
    // Public alerts is a separate concept from registry entries on the
    // backend, but the public UI surfaces them in the same "latest alerts"
    // strip. Map them into the RegistryEntry shape with sensible defaults.
    const { data, error, response } = await backend.GET(
      '/api/v1/public-alerts',
      { params: { query: { limit } } },
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const body = data as Array<{
      id: string;
      title: string;
      body: string;
      severity: string;
      region?: string;
      publishedAt: string;
    }>;
    return ok(
      body.map((a) => ({
        id: a.id,
        indicator: a.title,
        type: 'other' as RegistryEntry['type'],
        scamFamily: 'other' as RegistryEntry['scamFamily'],
        status: 'verified-malicious' as RegistryEntry['status'],
        firstSeen: a.publishedAt,
        lastSeen: a.publishedAt,
        caseCount: 0,
        takedownStatus: 'not-applicable' as RegistryEntry['takedownStatus'],
        region: a.region ?? 'global',
        summary: a.body,
        commonPhrases: [],
        relatedIndicators: [],
        dateVerified: a.publishedAt,
        recommendedAction: '',
        evidenceSummary: '',
      })),
    );
  },

  // CP-13 — wired to the admin takedown tracker (backend TakedownRequest rows).
  async getTakedowns(
    params: PaginationParams & FilterParams = {},
  ): Promise<ApiResponse<PaginatedResponse<TakedownRecord>>> {
    const { data, error, response } = await backend.GET('/api/v1/intelligence/takedowns');
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const items = (data as unknown as BackendTakedownRow[]).map(mapTakedownRecord);
    return ok(paginate(items, params));
  },

  // CP-13 — consumer-safe Identity Collision search. Returns a masked cluster
  // (no PII / internal fields) for the dashboard identity-graph page.
  async searchIdentityCollision(
    query: string,
    searchType: string,
  ): Promise<ApiResponse<IdentityCollisionResult>> {
    const { data, error, response } = await backend.POST(
      '/api/v1/identity-collision/search',
      { body: { query, searchType } as unknown as never },
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    return ok(data as unknown as IdentityCollisionResult);
  },

  // CP-13 — internal intelligence submissions = raw scam signals awaiting triage.
  async getSubmissions(
    params: PaginationParams & FilterParams = {},
  ): Promise<ApiResponse<PaginatedResponse<Submission>>> {
    const { data, error, response } = await backend.GET('/api/v1/intelligence/signals');
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const items = (data as unknown as BackendSignalRow[]).map(mapSubmission);
    return ok(paginate(items, params));
  },
};

// ============================================================================
// REPORTS — public submit wired; user-scoped reads are admin-only on backend
// ============================================================================

export const reportsApi = {
  async submitReport(
    req: SubmitReportRequest,
  ): Promise<ApiResponse<SubmitReportResponse>> {
    // Same enum-narrowing rationale as scam-check above.
    const reportBody = {
      indicatorType: toUpperSnake(req.indicatorType),
      indicatorValue: req.indicatorValue,
      category: req.scamType ? toUpperSnake(req.scamType) : undefined,
      description: req.description,
    };
    const { data, error, response } = await backend.POST(
      '/api/v1/scam-reports',
      { body: reportBody as unknown as never },
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const body = data as { signalId: string; status: string };
    return ok({
      success: true,
      reportId: body.signalId,
      status: 'submitted',
    });
  },

  getMyReports: (_p?: PaginationParams) =>
    notImplemented<PaginatedResponse<ScamReport>>('getMyReports'),
  getReport: (_id: string) => notImplemented<ScamReport>('getReport'),
  updateReport: (_id: string, _d: Partial<ScamReport>) =>
    notImplemented<ScamReport>('updateReport'),
};

// ============================================================================
// CASES / ALERTS / DASHBOARD / ADMIN / SETTINGS — stubs pending backend
// ============================================================================

export const casesApi = {
  getCases: (_p?: PaginationParams & FilterParams) =>
    notImplemented<PaginatedResponse<Case>>('getCases'),
  getCase: (_id: string) => notImplemented<Case>('getCase'),
  createCase: (_d: Partial<Case>) => notImplemented<Case>('createCase'),
  updateCase: (_id: string, _d: Partial<Case>) =>
    notImplemented<Case>('updateCase'),
  addNote: (_id: string, _c: string, _i?: boolean) =>
    notImplemented<CaseNote>('addNote'),
  getNotes: (_id: string) => notImplemented<CaseNote[]>('getNotes'),
};

/** Raw backend Alert row shape (Prisma model Alert). */
type BackendAlertRow = {
  id: string;
  type: string;
  severity: string;
  title: string;
  message: string;
  readAt?: string | null;
  createdAt: string;
};

export const alertsApi = {
  // Wired to GET /api/v1/alerts. The backend caps the list at 100 (most-recent
  // first) and the generated client doesn't yet carry the `unread` query param,
  // so unread filtering + pagination are applied client-side over that list.
  async getAlerts(
    params: PaginationParams & { unreadOnly?: boolean } = {},
  ): Promise<ApiResponse<PaginatedResponse<Alert>>> {
    const { data, error, response } = await backend.GET('/api/v1/alerts');
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    let mapped = (data as BackendAlertRow[]).map(mapAlert);
    if (params.unreadOnly) {
      mapped = mapped.filter((a) => !a.readAt);
    }
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const start = (page - 1) * limit;
    return ok({
      data: mapped.slice(start, start + limit),
      pagination: {
        page,
        limit,
        total: mapped.length,
        totalPages: Math.max(1, Math.ceil(mapped.length / limit)),
        hasNext: start + limit < mapped.length,
        hasPrev: page > 1,
      },
    });
  },

  async markAsRead(id: string): Promise<ApiResponse<Alert>> {
    const { data, error, response } = await backend.POST(
      '/api/v1/alerts/{id}/read',
      { params: { path: { id } } },
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    return ok(mapAlert(data as BackendAlertRow));
  },

  // Backend has no bulk-read endpoint; mark each unread alert read in parallel.
  async markAllAsRead(): Promise<ApiResponse<void>> {
    const { data, error, response } = await backend.GET('/api/v1/alerts');
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const unread = (data as BackendAlertRow[]).filter((a) => !a.readAt);
    await Promise.all(
      unread.map((a) =>
        backend.POST('/api/v1/alerts/{id}/read', { params: { path: { id: a.id } } }),
      ),
    );
    return ok(undefined as unknown as void);
  },

  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    const { data, error } = await backend.GET('/api/v1/alerts');
    if (error || !data) {
      // Soft-fail to zero — an unread badge should never break the shell.
      return ok({ count: 0 });
    }
    return ok({
      count: (data as BackendAlertRow[]).filter((a) => !a.readAt).length,
    });
  },
};

export const dashboardApi = {
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    // Real backend has /intelligence/metrics which returns the dashboard
    // dimensions. Pass-through as-is — the shape is close enough that
    // typed DashboardStats can use it directly for now.
    const { data, error, response } = await backend.GET(
      '/api/v1/intelligence/metrics',
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    return ok(data as DashboardStats);
  },
  getActivityLog: (_p?: PaginationParams) =>
    notImplemented<PaginatedResponse<ActivityLogEntry>>('getActivityLog'),
  getThreatsTrend: (_days?: number) =>
    notImplemented<{ date: string; count: number }[]>('getThreatsTrend'),
};

/** Raw RegistryReviewQueue row + denormalised signal summary. */
type BackendReviewQueueRow = {
  id: string;
  signalId: string | null;
  registryEntryId: string | null;
  reviewStatus: string;
  publicSafe: boolean;
  assignedToUserId: string | null;
  reviewNotes: string | null;
  decision: string | null;
  createdAt: string;
  updatedAt: string;
  signal: {
    id: string;
    indicatorType: string;
    indicatorValue: string;
    status: string;
    confidenceScore: number | null;
    reportCount: number;
  } | null;
};

function mapReviewQueueItem(r: BackendReviewQueueRow): VerificationQueueItem {
  const decisionMap: Record<string, ReviewDecision> = {
    APPROVED: 'approve',
    REJECTED: 'reject',
    ESCALATED: 'escalate',
  };
  return {
    // Key the item by its registry entry when present so makeDecision can act
    // on the registry lifecycle; fall back to the queue-item id.
    id: r.registryEntryId ?? r.id,
    submissionId: r.signalId ?? r.id,
    indicatorValue: r.signal?.indicatorValue ?? '—',
    indicatorType: r.signal
      ? mapIndicatorType(r.signal.indicatorType)
      : ('other' as IndicatorType),
    suspectedScamFamily: 'other' as ScamFamily,
    reviewerConfidence: r.signal?.confidenceScore ?? 0,
    repeatedReportCount: r.signal?.reportCount ?? 0,
    a1ScamshieldScriptMatch: false,
    linkedEntities: [],
    publicSafeReviewed: r.publicSafe,
    notes: r.reviewNotes ?? undefined,
    decision: r.decision ? decisionMap[r.decision] : undefined,
    assignedReviewer: r.assignedToUserId ?? undefined,
    createdAt: r.createdAt,
    reviewedAt: r.reviewStatus === 'PENDING' ? undefined : r.updatedAt,
  };
}

/** Raw RegistryEntry row (internal view). */
type BackendRegistryEntryRow = {
  id: string;
  indicatorType: string;
  indicatorValue: string;
  category: string;
  status: string;
  publicStatus: string | null;
  publicSafeSummary: string;
  publishedAt: string | null;
  updatedAt: string;
  approvedByUserId: string | null;
};

function mapRegistryDraft(e: BackendRegistryEntryRow): PublicRegistryDraft {
  const visibilityState: PublicRegistryDraft['visibilityState'] =
    e.publicStatus === 'PUBLISHED'
      ? 'published'
      : e.publicStatus === 'UNPUBLISHED'
        ? 'unpublished'
        : e.status === 'APPROVED_PUBLIC_SAFE'
          ? 'approved-public-safe'
          : 'private-only';
  return {
    id: e.id,
    indicatorValue: e.indicatorValue,
    indicatorType: mapIndicatorType(e.indicatorType),
    scamFamily: mapScamFamily(e.category),
    publicBadge: 'Verified Malicious',
    visibilityState,
    publicSafeSummary: e.publicSafeSummary,
    redactedFields: [],
    publishedBy: e.approvedByUserId ?? undefined,
    publishedAt: e.publishedAt ?? undefined,
    lastEditedAt: e.updatedAt,
  };
}

/** Raw RegistryAppeal row. */
type BackendAppealRow = {
  id: string;
  registryEntryId: string;
  appealType: string;
  status: string;
  submitterName: string;
  submitterEmail: string;
  submitterRelationship: string | null;
  reason: string;
  requestedChange: string | null;
  reviewNotes: string | null;
  resolutionAction: string | null;
  reviewedByUserId: string | null;
  reviewedAt: string | null;
  createdAt: string;
};

function mapCorrectionAppeal(a: BackendAppealRow): CorrectionAppeal {
  const statusMap: Record<string, CorrectionAppeal['status']> = {
    SUBMITTED: 'pending',
    UNDER_REVIEW: 'under-review',
    ACCEPTED: 'changed',
    REJECTED: 'upheld',
    RESOLVED: 'changed',
  };
  const typeMap: Record<string, CorrectionAppeal['appealType']> = {
    CORRECTION: 'correction',
    REMOVAL: 'removal',
    OWNERSHIP_DISPUTE: 'dispute',
  };
  return {
    id: a.id,
    registryId: a.registryEntryId,
    indicatorValue: '—', // not denormalised on the appeal row
    indicatorType: 'other' as IndicatorType,
    appealType: typeMap[a.appealType] ?? 'correction',
    status: statusMap[a.status] ?? 'pending',
    submittedAt: a.createdAt,
    submitterType:
      a.submitterRelationship === 'legal' ? 'legal' : 'subject',
    submitterName: a.submitterName,
    submitterEmail: a.submitterEmail,
    summary: a.reason,
    requestedChange: a.requestedChange ?? undefined,
    reviewNotes: a.reviewNotes ?? undefined,
    resolution: a.resolutionAction ?? undefined,
    resolvedAt: a.reviewedAt ?? undefined,
    resolvedBy: a.reviewedByUserId ?? undefined,
  };
}

export const adminApi = {
  // CP-13 — wired to the internal review queue.
  async getVerificationQueue(
    params: PaginationParams & FilterParams = {},
  ): Promise<ApiResponse<PaginatedResponse<VerificationQueueItem>>> {
    const { data, error, response } = await backend.GET(
      '/api/v1/intelligence/review-queue',
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const items = (data as unknown as BackendReviewQueueRow[]).map(
      mapReviewQueueItem,
    );
    return ok(paginate(items, params));
  },

  // CP-13 — approve/reject drive the registry lifecycle; the queue id we
  // surface is the registry entry id (see mapReviewQueueItem). escalate /
  // request-more-evidence have no backend transition yet.
  async makeDecision(
    id: string,
    decision: ReviewDecision,
    _notes?: string,
  ): Promise<ApiResponse<VerificationQueueItem>> {
    const path =
      decision === 'approve'
        ? ('/api/v1/intelligence/registry/{id}/approve' as const)
        : decision === 'reject'
          ? ('/api/v1/intelligence/registry/{id}/reject' as const)
          : null;
    if (!path) {
      return fail(
        'UNSUPPORTED_DECISION',
        `"${decision}" is not a backend-supported registry transition`,
      );
    }
    const { data, error, response } = await backend.POST(path, {
      params: { path: { id } },
    });
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const e = data as unknown as BackendRegistryEntryRow;
    // Echo the resulting entry back in the queue-item shape.
    return ok(
      mapReviewQueueItem({
        id: e.id,
        signalId: null,
        registryEntryId: e.id,
        reviewStatus: e.status,
        publicSafe: e.status === 'APPROVED_PUBLIC_SAFE',
        assignedToUserId: e.approvedByUserId,
        reviewNotes: null,
        decision: decision === 'approve' ? 'APPROVED' : 'REJECTED',
        createdAt: e.updatedAt,
        updatedAt: e.updatedAt,
        signal: {
          id: e.id,
          indicatorType: e.indicatorType,
          indicatorValue: e.indicatorValue,
          status: e.status,
          confidenceScore: 0,
          reportCount: 0,
        },
      }),
    );
  },

  // CP-13 — wired to the internal registry list (entries on their way to /
  // already on the public registry).
  async getPublicRegistryDrafts(
    params: PaginationParams & FilterParams = {},
  ): Promise<ApiResponse<PaginatedResponse<PublicRegistryDraft>>> {
    const { data, error, response } = await backend.GET(
      '/api/v1/intelligence/registry',
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const items = (data as unknown as BackendRegistryEntryRow[]).map(
      mapRegistryDraft,
    );
    return ok(paginate(items, params));
  },

  // No partial-edit endpoint on the backend — edits flow through the
  // candidate/approve lifecycle, not a freeform draft update.
  updateDraft: (_id: string, _d: Partial<PublicRegistryDraft>) =>
    notImplemented<PublicRegistryDraft>('updateDraft'),

  // CP-13 — publish / unpublish drive the public registry visibility.
  async publishDraft(id: string): Promise<ApiResponse<PublicRegistryDraft>> {
    const { data, error, response } = await backend.POST(
      '/api/v1/intelligence/registry/{id}/publish',
      { params: { path: { id } } },
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    return ok(mapRegistryDraft(data as unknown as BackendRegistryEntryRow));
  },

  async unpublishDraft(
    id: string,
    _reason?: string,
  ): Promise<ApiResponse<PublicRegistryDraft>> {
    const { data, error, response } = await backend.POST(
      '/api/v1/intelligence/registry/{id}/unpublish',
      { params: { path: { id } } },
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    return ok(mapRegistryDraft(data as unknown as BackendRegistryEntryRow));
  },

  // CP-13 — wired to the registry appeals queue.
  async getAppeals(
    params: PaginationParams & FilterParams = {},
  ): Promise<ApiResponse<PaginatedResponse<CorrectionAppeal>>> {
    const { data, error, response } = await backend.GET(
      '/api/v1/intelligence/registry-appeals',
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    const items = (data as unknown as BackendAppealRow[]).map(
      mapCorrectionAppeal,
    );
    return ok(paginate(items, params));
  },

  // CP-13 — record the accept/reject decision on an appeal.
  async resolveAppeal(
    id: string,
    resolution: string,
    notes?: string,
  ): Promise<ApiResponse<CorrectionAppeal>> {
    const accepted = /accept|uphold|change|remov/i.test(resolution);
    const { data, error, response } = await backend.POST(
      '/api/v1/intelligence/registry-appeals/{id}/decide',
      {
        params: { path: { id } },
        body: {
          decision: accepted ? 'ACCEPTED' : 'REJECTED',
          reviewNotes:
            notes && notes.length >= 10
              ? notes
              : `Resolution recorded via console: ${resolution}`,
          resolutionAction: resolution,
        } as unknown as never,
      },
    );
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    return ok(mapCorrectionAppeal(data as unknown as BackendAppealRow));
  },
};

export const settingsApi = {
  getUserSettings: () => notImplemented<UserSettings>('getUserSettings'),
  updateUserSettings: (_d: Partial<UserSettings>) =>
    notImplemented<UserSettings>('updateUserSettings'),
  getOrganizationSettings: () =>
    notImplemented<OrganizationSettings>('getOrganizationSettings'),
  updateOrganizationSettings: (_d: Partial<OrganizationSettings>) =>
    notImplemented<OrganizationSettings>('updateOrganizationSettings'),
};

// ============================================================================
// BILLING — Stripe checkout / portal / subscription (live)
// ============================================================================

export type BillingPlanCode = 'FREE' | 'BASIC' | 'FAMILY_GUARDIAN' | 'PREMIUM_SHIELD';
export type PurchasablePlanCode = Exclude<BillingPlanCode, 'FREE'>;

export interface BillingSubscription {
  tenantId: string;
  plan: BillingPlanCode;
  status: string;
  stripeCustomerId: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  manualInvoice: boolean;
  stripeConfigured: boolean;
}

export const billingApi = {
  // GET /billing/subscription — the tenant's current plan + status.
  async getSubscription(): Promise<ApiResponse<BillingSubscription>> {
    const { data, error, response } = await backend.GET('/api/v1/billing/subscription');
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    return ok(data as unknown as BillingSubscription);
  },

  // POST /billing/checkout — start a Stripe Checkout session for a paid plan.
  // Returns the hosted checkout URL the caller should redirect the browser to.
  async startCheckout(
    plan: PurchasablePlanCode,
    opts: { successUrl?: string; cancelUrl?: string } = {},
  ): Promise<ApiResponse<{ checkoutUrl: string | null; sessionId: string }>> {
    const { data, error, response } = await backend.POST('/api/v1/billing/checkout', {
      body: {
        plan,
        ...(opts.successUrl ? { successUrl: opts.successUrl } : {}),
        ...(opts.cancelUrl ? { cancelUrl: opts.cancelUrl } : {}),
      } as unknown as never,
    });
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    return ok(data as unknown as { checkoutUrl: string | null; sessionId: string });
  },

  // POST /billing/portal — open the Stripe Billing Portal to manage card/cancel.
  // The return URL is derived server-side from APP_PUBLIC_URL.
  async openPortal(): Promise<ApiResponse<{ url: string }>> {
    const { data, error, response } = await backend.POST('/api/v1/billing/portal', {
      body: {} as unknown as never,
    });
    if (error || !data) {
      return fail(`HTTP_${response.status}`, response.statusText);
    }
    return ok(data as unknown as { url: string });
  },
};

// ============================================================================
// ADMIN CONSOLE — internal-staff read surfaces (FE-6)
// ============================================================================

/** Normalise an openapi-fetch result into our ApiResponse envelope. */
function adminResult<T>(
  data: unknown,
  error: unknown,
  response: { status: number; statusText: string },
): ApiResponse<T> {
  if (error || data === undefined || data === null) {
    return fail(`HTTP_${response.status}`, response.statusText);
  }
  return ok(data as unknown as T);
}

export interface AdminUserRow {
  id: string; email: string; fullName: string; status: string;
  role: string | null; tenantId: string | null; elderModeEnabled: boolean;
  lastLoginAt: string | null; createdAt: string;
}
export interface AdminTenantRow {
  id: string; name: string; type: string; status?: string; createdAt: string;
  [k: string]: unknown;
}
export interface AdminRevenue {
  mrr: number; arr: number; activeSubscriptions: number; totalSubscriptions: number;
  planDistribution: { plan: string; label: string; subscriptions: number; monthlyRevenue: number }[];
}

type Dict = Record<string, unknown>;

export const adminConsoleApi = {
  async getUsers(): Promise<ApiResponse<AdminUserRow[]>> {
    const r = await backend.GET('/api/v1/admin/users');
    return adminResult<AdminUserRow[]>(r.data, r.error, r.response);
  },
  async getTenants(): Promise<ApiResponse<AdminTenantRow[]>> {
    const r = await backend.GET('/api/v1/admin/oversight/tenants');
    return adminResult<AdminTenantRow[]>(r.data, r.error, r.response);
  },
  async getStaff(): Promise<ApiResponse<Dict[]>> {
    const r = await backend.GET('/api/v1/admin/staff');
    return adminResult<Dict[]>(r.data, r.error, r.response);
  },
  async getDevices(): Promise<ApiResponse<Dict[]>> {
    const r = await backend.GET('/api/v1/admin/devices');
    return adminResult<Dict[]>(r.data, r.error, r.response);
  },
  async getLiveSessions(): Promise<ApiResponse<Dict[]>> {
    const r = await backend.GET('/api/v1/admin/live-sessions');
    return adminResult<Dict[]>(r.data, r.error, r.response);
  },
  async getAuditLogs(): Promise<ApiResponse<Dict[]>> {
    const r = await backend.GET('/api/v1/admin/audit-logs');
    return adminResult<Dict[]>(r.data, r.error, r.response);
  },
  async getRevenue(): Promise<ApiResponse<AdminRevenue>> {
    const r = await backend.GET('/api/v1/admin/revenue');
    return adminResult<AdminRevenue>(r.data, r.error, r.response);
  },
  async getScamCorpus(): Promise<ApiResponse<Dict[]>> {
    const r = await backend.GET('/api/v1/admin/scam-corpus');
    return adminResult<Dict[]>(r.data, r.error, r.response);
  },
  async getScriptGenome(): Promise<ApiResponse<Dict[]>> {
    const r = await backend.GET('/api/v1/admin/script-genome');
    return adminResult<Dict[]>(r.data, r.error, r.response);
  },
  async getCompliance(): Promise<ApiResponse<Dict>> {
    const r = await backend.GET('/api/v1/admin/compliance');
    return adminResult<Dict>(r.data, r.error, r.response);
  },
  async getSupport(): Promise<ApiResponse<Dict>> {
    const r = await backend.GET('/api/v1/admin/support');
    return adminResult<Dict>(r.data, r.error, r.response);
  },
  async getSettings(): Promise<ApiResponse<Dict>> {
    const r = await backend.GET('/api/v1/admin/settings');
    return adminResult<Dict>(r.data, r.error, r.response);
  },
  async getOverview(): Promise<ApiResponse<Dict>> {
    const r = await backend.GET('/api/v1/admin/oversight/overview');
    return adminResult<Dict>(r.data, r.error, r.response);
  },
};

// ============================================================================
// EXPORT
// ============================================================================

export const api = {
  auth: authApi,
  scamIntelligence: scamIntelligenceApi,
  reports: reportsApi,
  cases: casesApi,
  alerts: alertsApi,
  dashboard: dashboardApi,
  admin: adminApi,
  settings: settingsApi,
  billing: billingApi,
  adminConsole: adminConsoleApi,
};

export default api;
