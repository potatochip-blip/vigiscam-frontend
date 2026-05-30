/**
 * VIGISCAM™ API Client
 * =====================
 * 
 * Centralized API client for all backend integrations.
 * 
 * BACKEND INTEGRATION INSTRUCTIONS:
 * 1. Set API_BASE_URL environment variable for production
 * 2. Implement authentication token handling
 * 3. Replace mock delays with real API calls
 * 4. Add proper error handling and retry logic
 * 
 * All methods are typed and ready for real backend connection.
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
  User,
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
} from "./types"

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"
const API_TIMEOUT = 30000 // 30 seconds

// ============================================================================
// HTTP CLIENT
// ============================================================================

interface RequestOptions extends RequestInit {
  timeout?: number
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { timeout = API_TIMEOUT, ...fetchOptions } = options
  
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    })
    
    clearTimeout(timeoutId)
    
    const data = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        error: {
          code: `HTTP_${response.status}`,
          message: data.error || response.statusText,
          timestamp: new Date().toISOString(),
        },
      }
    }
    
    return { success: true, data }
  } catch (error) {
    clearTimeout(timeoutId)
    
    if (error instanceof Error && error.name === "AbortError") {
      return {
        success: false,
        error: {
          code: "TIMEOUT",
          message: "Request timed out",
          timestamp: new Date().toISOString(),
        },
      }
    }
    
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: error instanceof Error ? error.message : "Network error",
        timestamp: new Date().toISOString(),
      },
    }
  }
}

// Helper to get auth token from storage
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  // TODO: Replace with secure token storage
  const session = localStorage.getItem("vigiscam_session")
  if (session) {
    try {
      const parsed = JSON.parse(session)
      return parsed.accessToken
    } catch {
      return null
    }
  }
  return null
}

// Authenticated request helper
async function authenticatedRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken()
  return request<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
}

// ============================================================================
// AUTHENTICATION API
// ============================================================================

export const authApi = {
  /**
   * Login with email and password
   * TODO: Connect to real authentication backend
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  /**
   * Register new user
   * TODO: Connect to real authentication backend
   */
  async signup(data: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    return request<SignupResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Logout current user
   */
  async logout(): Promise<ApiResponse<void>> {
    return authenticatedRequest<void>("/auth/logout", { method: "POST" })
  },

  /**
   * Get current user session
   */
  async getSession(): Promise<ApiResponse<AuthSession>> {
    return authenticatedRequest<AuthSession>("/auth/session")
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthSession>> {
    return request<AuthSession>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    })
  },

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return request<void>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, password: string): Promise<ApiResponse<void>> {
    return request<void>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    })
  },

  /**
   * Verify MFA code
   */
  async verifyMfa(code: string): Promise<ApiResponse<AuthSession>> {
    return authenticatedRequest<AuthSession>("/auth/verify-mfa", {
      method: "POST",
      body: JSON.stringify({ code }),
    })
  },
}

// ============================================================================
// SCAM INTELLIGENCE API
// ============================================================================

export const scamIntelligenceApi = {
  /**
   * Check an indicator against the registry
   */
  async checkIndicator(data: IndicatorCheckRequest): Promise<ApiResponse<IndicatorCheckResponse>> {
    return request<IndicatorCheckResponse>("/scam-intelligence/check", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Get registry entries with pagination and filtering
   */
  async getRegistry(
    params: PaginationParams & FilterParams = {}
  ): Promise<ApiResponse<PaginatedResponse<RegistryEntry>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value))
      }
    })
    return request<PaginatedResponse<RegistryEntry>>(
      `/scam-intelligence/registry?${searchParams.toString()}`
    )
  },

  /**
   * Get single registry entry by ID
   */
  async getRegistryEntry(id: string): Promise<ApiResponse<RegistryEntry>> {
    return request<RegistryEntry>(`/scam-intelligence/registry/${id}`)
  },

  /**
   * Get scam networks
   */
  async getNetworks(
    params: PaginationParams & FilterParams = {}
  ): Promise<ApiResponse<PaginatedResponse<ScamNetwork>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value))
      }
    })
    return request<PaginatedResponse<ScamNetwork>>(
      `/scam-intelligence/networks?${searchParams.toString()}`
    )
  },

  /**
   * Get network by ID
   */
  async getNetwork(id: string): Promise<ApiResponse<ScamNetwork>> {
    return request<ScamNetwork>(`/scam-intelligence/networks/${id}`)
  },

  /**
   * Get latest alerts
   */
  async getLatestAlerts(limit = 10): Promise<ApiResponse<RegistryEntry[]>> {
    return request<RegistryEntry[]>(`/scam-intelligence/latest-alerts?limit=${limit}`)
  },

  /**
   * Get takedowns
   */
  async getTakedowns(
    params: PaginationParams & FilterParams = {}
  ): Promise<ApiResponse<PaginatedResponse<RegistryEntry>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value))
      }
    })
    return request<PaginatedResponse<RegistryEntry>>(
      `/scam-intelligence/takedowns?${searchParams.toString()}`
    )
  },
}

// ============================================================================
// REPORTS API
// ============================================================================

export const reportsApi = {
  /**
   * Submit a new scam report
   */
  async submitReport(data: SubmitReportRequest): Promise<ApiResponse<SubmitReportResponse>> {
    // For file uploads, use FormData
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === "evidenceFiles" && Array.isArray(value)) {
        value.forEach((file) => formData.append("evidence", file))
      } else if (value !== undefined) {
        formData.append(key, String(value))
      }
    })
    
    return request<SubmitReportResponse>("/scam-intelligence/submit-report", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  },

  /**
   * Get user's submitted reports
   */
  async getMyReports(
    params: PaginationParams = {}
  ): Promise<ApiResponse<PaginatedResponse<ScamReport>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, String(value))
      }
    })
    return authenticatedRequest<PaginatedResponse<ScamReport>>(
      `/reports/my-reports?${searchParams.toString()}`
    )
  },

  /**
   * Get report by ID
   */
  async getReport(id: string): Promise<ApiResponse<ScamReport>> {
    return authenticatedRequest<ScamReport>(`/reports/${id}`)
  },

  /**
   * Add additional information to a report
   */
  async updateReport(id: string, data: Partial<ScamReport>): Promise<ApiResponse<ScamReport>> {
    return authenticatedRequest<ScamReport>(`/reports/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },
}

// ============================================================================
// CASES API (For investigators, agencies, admins)
// ============================================================================

export const casesApi = {
  /**
   * Get cases with pagination and filtering
   */
  async getCases(
    params: PaginationParams & FilterParams = {}
  ): Promise<ApiResponse<PaginatedResponse<Case>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value))
      }
    })
    return authenticatedRequest<PaginatedResponse<Case>>(
      `/cases?${searchParams.toString()}`
    )
  },

  /**
   * Get case by ID
   */
  async getCase(id: string): Promise<ApiResponse<Case>> {
    return authenticatedRequest<Case>(`/cases/${id}`)
  },

  /**
   * Create new case
   */
  async createCase(data: Partial<Case>): Promise<ApiResponse<Case>> {
    return authenticatedRequest<Case>("/cases", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Update case
   */
  async updateCase(id: string, data: Partial<Case>): Promise<ApiResponse<Case>> {
    return authenticatedRequest<Case>(`/cases/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  /**
   * Add note to case
   */
  async addNote(caseId: string, content: string, isInternal = false): Promise<ApiResponse<CaseNote>> {
    return authenticatedRequest<CaseNote>(`/cases/${caseId}/notes`, {
      method: "POST",
      body: JSON.stringify({ content, isInternal }),
    })
  },

  /**
   * Get case notes
   */
  async getNotes(caseId: string): Promise<ApiResponse<CaseNote[]>> {
    return authenticatedRequest<CaseNote[]>(`/cases/${caseId}/notes`)
  },
}

// ============================================================================
// ALERTS API
// ============================================================================

export const alertsApi = {
  /**
   * Get user's alerts
   */
  async getAlerts(
    params: PaginationParams & { unreadOnly?: boolean } = {}
  ): Promise<ApiResponse<PaginatedResponse<Alert>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, String(value))
      }
    })
    return authenticatedRequest<PaginatedResponse<Alert>>(
      `/alerts?${searchParams.toString()}`
    )
  },

  /**
   * Mark alert as read
   */
  async markAsRead(id: string): Promise<ApiResponse<Alert>> {
    return authenticatedRequest<Alert>(`/alerts/${id}/read`, { method: "POST" })
  },

  /**
   * Mark all alerts as read
   */
  async markAllAsRead(): Promise<ApiResponse<void>> {
    return authenticatedRequest<void>("/alerts/read-all", { method: "POST" })
  },

  /**
   * Get unread count
   */
  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    return authenticatedRequest<{ count: number }>("/alerts/unread-count")
  },
}

// ============================================================================
// DASHBOARD API
// ============================================================================

export const dashboardApi = {
  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    return authenticatedRequest<DashboardStats>("/dashboard/stats")
  },

  /**
   * Get activity log
   */
  async getActivityLog(
    params: PaginationParams = {}
  ): Promise<ApiResponse<PaginatedResponse<ActivityLogEntry>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, String(value))
      }
    })
    return authenticatedRequest<PaginatedResponse<ActivityLogEntry>>(
      `/dashboard/activity?${searchParams.toString()}`
    )
  },

  /**
   * Get threats trend data
   */
  async getThreatsTrend(days = 30): Promise<ApiResponse<{ date: string; count: number }[]>> {
    return authenticatedRequest<{ date: string; count: number }[]>(
      `/dashboard/threats-trend?days=${days}`
    )
  },
}

// ============================================================================
// ADMIN API
// ============================================================================

export const adminApi = {
  /**
   * Get verification queue
   */
  async getVerificationQueue(
    params: PaginationParams & FilterParams = {}
  ): Promise<ApiResponse<PaginatedResponse<VerificationQueueItem>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value))
      }
    })
    return authenticatedRequest<PaginatedResponse<VerificationQueueItem>>(
      `/admin/verification-queue?${searchParams.toString()}`
    )
  },

  /**
   * Make verification decision
   */
  async makeDecision(
    id: string,
    decision: ReviewDecision,
    notes?: string
  ): Promise<ApiResponse<VerificationQueueItem>> {
    return authenticatedRequest<VerificationQueueItem>(
      `/admin/verification-queue/${id}/decision`,
      {
        method: "POST",
        body: JSON.stringify({ decision, notes }),
      }
    )
  },

  /**
   * Get public registry drafts
   */
  async getPublicRegistryDrafts(
    params: PaginationParams & FilterParams = {}
  ): Promise<ApiResponse<PaginatedResponse<PublicRegistryDraft>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value))
      }
    })
    return authenticatedRequest<PaginatedResponse<PublicRegistryDraft>>(
      `/admin/public-registry?${searchParams.toString()}`
    )
  },

  /**
   * Update public registry entry
   */
  async updatePublicRegistryEntry(
    id: string,
    data: Partial<PublicRegistryDraft>
  ): Promise<ApiResponse<PublicRegistryDraft>> {
    return authenticatedRequest<PublicRegistryDraft>(`/admin/public-registry/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  /**
   * Publish registry entry
   */
  async publishEntry(id: string): Promise<ApiResponse<PublicRegistryDraft>> {
    return authenticatedRequest<PublicRegistryDraft>(
      `/admin/public-registry/${id}/publish`,
      { method: "POST" }
    )
  },

  /**
   * Unpublish registry entry
   */
  async unpublishEntry(id: string, reason?: string): Promise<ApiResponse<PublicRegistryDraft>> {
    return authenticatedRequest<PublicRegistryDraft>(
      `/admin/public-registry/${id}/unpublish`,
      {
        method: "POST",
        body: JSON.stringify({ reason }),
      }
    )
  },

  /**
   * Get corrections and appeals
   */
  async getAppeals(
    params: PaginationParams & FilterParams = {}
  ): Promise<ApiResponse<PaginatedResponse<CorrectionAppeal>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value))
      }
    })
    return authenticatedRequest<PaginatedResponse<CorrectionAppeal>>(
      `/admin/appeals?${searchParams.toString()}`
    )
  },

  /**
   * Resolve appeal
   */
  async resolveAppeal(
    id: string,
    resolution: "upheld" | "changed" | "removed",
    notes?: string
  ): Promise<ApiResponse<CorrectionAppeal>> {
    return authenticatedRequest<CorrectionAppeal>(`/admin/appeals/${id}/resolve`, {
      method: "POST",
      body: JSON.stringify({ resolution, notes }),
    })
  },

  /**
   * Get all users (admin only)
   */
  async getUsers(
    params: PaginationParams & FilterParams = {}
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value))
      }
    })
    return authenticatedRequest<PaginatedResponse<User>>(
      `/admin/users?${searchParams.toString()}`
    )
  },

  /**
   * Update user
   */
  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    return authenticatedRequest<User>(`/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },
}

// ============================================================================
// SETTINGS API
// ============================================================================

export const settingsApi = {
  /**
   * Get user settings
   */
  async getUserSettings(): Promise<ApiResponse<UserSettings>> {
    return authenticatedRequest<UserSettings>("/settings/user")
  },

  /**
   * Update user settings
   */
  async updateUserSettings(data: Partial<UserSettings>): Promise<ApiResponse<UserSettings>> {
    return authenticatedRequest<UserSettings>("/settings/user", {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  /**
   * Get organization settings (for org admins)
   */
  async getOrganizationSettings(): Promise<ApiResponse<OrganizationSettings>> {
    return authenticatedRequest<OrganizationSettings>("/settings/organization")
  },

  /**
   * Update organization settings
   */
  async updateOrganizationSettings(
    data: Partial<OrganizationSettings>
  ): Promise<ApiResponse<OrganizationSettings>> {
    return authenticatedRequest<OrganizationSettings>("/settings/organization", {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },
}

// ============================================================================
// EXPORT ALL APIs
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
}

export default api
