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
import { mapRegistryEntry, toUpperSnake } from './mappers';

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

  async getRegistryEntry(_id: string): Promise<ApiResponse<RegistryEntry>> {
    // Backend exposes single-entry lookup as an admin route; the public
    // search returns everything the public UI needs. Resolve from the
    // cached search list at the call site, or wire when /registry/:id lands.
    return notImplemented<RegistryEntry>('getRegistryEntry');
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

  getTakedowns: (_p?: PaginationParams & FilterParams) =>
    notImplemented<PaginatedResponse<RegistryEntry>>('getTakedowns'),
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

export const alertsApi = {
  getAlerts: (_p?: PaginationParams & { unreadOnly?: boolean }) =>
    notImplemented<PaginatedResponse<Alert>>('getAlerts'),
  markAsRead: (_id: string) => notImplemented<Alert>('markAsRead'),
  markAllAsRead: () => notImplemented<void>('markAllAsRead'),
  getUnreadCount: () =>
    notImplemented<{ count: number }>('getUnreadCount'),
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

export const adminApi = {
  getVerificationQueue: (_p?: PaginationParams & FilterParams) =>
    notImplemented<PaginatedResponse<VerificationQueueItem>>(
      'getVerificationQueue',
    ),
  makeDecision: (_id: string, _d: ReviewDecision, _n?: string) =>
    notImplemented<VerificationQueueItem>('makeDecision'),
  getPublicRegistryDrafts: (_p?: PaginationParams & FilterParams) =>
    notImplemented<PaginatedResponse<PublicRegistryDraft>>(
      'getPublicRegistryDrafts',
    ),
  updateDraft: (_id: string, _d: Partial<PublicRegistryDraft>) =>
    notImplemented<PublicRegistryDraft>('updateDraft'),
  publishDraft: (_id: string) =>
    notImplemented<PublicRegistryDraft>('publishDraft'),
  unpublishDraft: (_id: string, _reason?: string) =>
    notImplemented<PublicRegistryDraft>('unpublishDraft'),
  getAppeals: (_p?: PaginationParams & FilterParams) =>
    notImplemented<PaginatedResponse<CorrectionAppeal>>('getAppeals'),
  resolveAppeal: (_id: string, _r: string, _n?: string) =>
    notImplemented<CorrectionAppeal>('resolveAppeal'),
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
};

export default api;
