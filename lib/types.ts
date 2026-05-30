/**
 * VIGISCAM™ Backend Integration Types
 * =====================================
 * 
 * This file contains all TypeScript interfaces and types for backend integration.
 * When connecting to a real backend, ensure API responses match these types.
 * 
 * BACKEND INTEGRATION CHECKLIST:
 * - [ ] Replace mock data in lib/scam-intelligence-data.ts with API calls
 * - [ ] Connect auth-context.tsx to real authentication provider
 * - [ ] Implement all API routes in app/api/
 * - [ ] Add proper error handling and validation
 * - [ ] Set up database connections
 */

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export type UserRole =
  | "individual"
  | "family"
  | "bankguard"
  | "platformshield"
  | "investigator"
  | "agency"
  | "enterprise"
  | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organization?: string
  avatar?: string
  verified: boolean
  onboardingComplete: boolean
  createdAt?: string
  lastLoginAt?: string
  mfaEnabled?: boolean
  permissions?: string[]
}

export interface AuthSession {
  user: User
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export interface LoginRequest {
  email: string
  password: string
  mfaCode?: string
}

export interface LoginResponse {
  success: boolean
  session?: AuthSession
  requiresMfa?: boolean
  error?: string
}

export interface SignupRequest {
  email: string
  password: string
  name: string
  role: UserRole
  organization?: string
}

export interface SignupResponse {
  success: boolean
  user?: User
  error?: string
  verificationRequired?: boolean
}

// ============================================================================
// SCAM INTELLIGENCE
// ============================================================================

export type VerificationStatus = 
  | "verified-malicious" 
  | "high-risk-verified" 
  | "takedown-confirmed" 
  | "officially-reported"
  | "pending-verification"
  | "disputed"

export type IndicatorType = 
  | "domain" 
  | "url" 
  | "phone" 
  | "email" 
  | "wallet" 
  | "social-profile" 
  | "fake-support-page" 
  | "fake-company" 
  | "scam-script"
  | "ip-address"
  | "app-id"

export type ScamFamily = 
  | "tech-support" 
  | "bank-impersonation" 
  | "romance" 
  | "recovery" 
  | "sextortion" 
  | "gift-card" 
  | "crypto" 
  | "remote-access" 
  | "deepfake" 
  | "check-fraud"
  | "phishing"
  | "job-scam"
  | "government-impersonation"
  | "lottery"
  | "other"

export type TakedownStatus = 
  | "pending" 
  | "in-progress" 
  | "confirmed" 
  | "partial" 
  | "not-applicable"
  | "failed"

export type NetworkRisk = "critical" | "high" | "medium" | "low"

export interface RegistryEntry {
  id: string
  indicator: string
  type: IndicatorType
  scamFamily: ScamFamily
  status: VerificationStatus
  firstSeen: string
  lastSeen: string
  linkedNetwork?: string
  caseCount: number
  takedownStatus: TakedownStatus
  region: string
  summary: string
  commonPhrases: string[]
  relatedIndicators: string[]
  dateVerified: string
  recommendedAction: string
  evidenceSummary: string
  confidenceScore?: number
  sourceCount?: number
}

export interface IndicatorCheckRequest {
  indicator: string
  type?: IndicatorType
  includeRelated?: boolean
}

export interface IndicatorCheckResponse {
  success: boolean
  found: boolean
  count: number
  results: RegistryEntry[]
  riskScore?: number
  recommendations?: string[]
}

// ============================================================================
// SCAM REPORTS
// ============================================================================

export type ReportStatus = 
  | "submitted" 
  | "under-review" 
  | "verified" 
  | "rejected" 
  | "needs-more-info"
  | "merged"

export type ReportPriority = "critical" | "high" | "medium" | "low"

export interface ScamReport {
  id: string
  submittedAt: string
  submittedBy?: string
  status: ReportStatus
  priority: ReportPriority
  
  // Scam details
  scamType: ScamFamily
  indicatorType: IndicatorType
  indicatorValue: string
  
  // Victim information (anonymized)
  victimImpact?: "financial" | "emotional" | "both" | "near-miss"
  financialLoss?: number
  currency?: string
  
  // Evidence
  description: string
  evidenceFiles?: EvidenceFile[]
  
  // Analysis
  assignedTo?: string
  reviewNotes?: string
  linkedCases?: string[]
  
  // Timestamps
  reviewedAt?: string
  verifiedAt?: string
  updatedAt?: string
}

export interface EvidenceFile {
  id: string
  filename: string
  mimeType: string
  size: number
  uploadedAt: string
  url?: string
  hash?: string
  verified?: boolean
}

export interface SubmitReportRequest {
  scamType: ScamFamily
  indicatorType: IndicatorType
  indicatorValue: string
  description: string
  victimImpact?: string
  financialLoss?: number
  currency?: string
  evidenceFiles?: File[]
  contactEmail?: string
  anonymous?: boolean
}

export interface SubmitReportResponse {
  success: boolean
  reportId?: string
  error?: string
  estimatedReviewTime?: string
}

// ============================================================================
// NETWORK INTELLIGENCE
// ============================================================================

export interface ScamNetwork {
  id: string
  name: string
  aliases: string[]
  risk: NetworkRisk
  description: string
  firstIdentified: string
  lastActivity: string
  
  // Statistics
  totalIndicators: number
  activeIndicators: number
  confirmedCases: number
  estimatedVictims: number
  estimatedLosses: number
  
  // Geographic
  originRegions: string[]
  targetRegions: string[]
  
  // Tactics
  primaryScamTypes: ScamFamily[]
  tactics: string[]
  signatures: string[]
  
  // Related
  relatedNetworks: string[]
  linkedIndicators: string[]
  
  // Status
  takedownStatus: TakedownStatus
  lawEnforcementInvolved: boolean
}

// ============================================================================
// ALERTS & NOTIFICATIONS
// ============================================================================

export type AlertSeverity = "critical" | "high" | "medium" | "low" | "info"
export type AlertType = 
  | "new-threat" 
  | "network-activity" 
  | "takedown-update" 
  | "case-update"
  | "system"
  | "compliance"

export interface Alert {
  id: string
  type: AlertType
  severity: AlertSeverity
  title: string
  message: string
  createdAt: string
  readAt?: string
  actionUrl?: string
  metadata?: Record<string, unknown>
}

// ============================================================================
// DASHBOARD & ANALYTICS
// ============================================================================

export interface DashboardStats {
  // Overview
  totalThreatsDetected: number
  threatsDetectedChange: number
  activeCases: number
  activeCasesChange: number
  takedownsCompleted: number
  takedownsCompletedChange: number
  
  // Protection
  protectedUsers: number
  scamsBlocked: number
  moneyProtected: number
  
  // Trends
  threatsByType: { type: ScamFamily; count: number }[]
  threatsByRegion: { region: string; count: number }[]
  threatsTrend: { date: string; count: number }[]
}

export interface ActivityLogEntry {
  id: string
  timestamp: string
  action: string
  actor?: string
  target?: string
  details?: Record<string, unknown>
  ip?: string
  userAgent?: string
}

// ============================================================================
// CASE MANAGEMENT
// ============================================================================

export type CaseStatus = 
  | "open" 
  | "in-progress" 
  | "pending-evidence" 
  | "escalated"
  | "resolved" 
  | "closed"

export type CasePriority = "critical" | "high" | "medium" | "low"

export interface Case {
  id: string
  title: string
  description: string
  status: CaseStatus
  priority: CasePriority
  
  // Assignment
  assignedTo?: string
  team?: string
  
  // Related
  linkedReports: string[]
  linkedIndicators: string[]
  linkedNetworks: string[]
  
  // Evidence
  evidenceCount: number
  evidenceFiles: EvidenceFile[]
  
  // Victim
  victimCount: number
  estimatedLoss: number
  
  // Timestamps
  createdAt: string
  updatedAt: string
  resolvedAt?: string
  
  // Notes
  notes: CaseNote[]
}

export interface CaseNote {
  id: string
  caseId: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
  isInternal: boolean
}

// ============================================================================
// VERIFICATION & MODERATION
// ============================================================================

export type ReviewDecision = "approve" | "reject" | "request-more-evidence" | "escalate"

export interface VerificationQueueItem {
  id: string
  submissionId: string
  indicatorValue: string
  indicatorType: IndicatorType
  suspectedScamFamily: ScamFamily
  reviewerConfidence: number
  repeatedReportCount: number
  scamzyNetworkMatch?: string
  a1ScamshieldScriptMatch: boolean
  linkedEntities: string[]
  publicSafeReviewed: boolean
  notes?: string
  decision?: ReviewDecision
  assignedReviewer?: string
  createdAt: string
  reviewedAt?: string
}

// ============================================================================
// PUBLIC REGISTRY MANAGEMENT
// ============================================================================

export type VisibilityState = 
  | "private-only" 
  | "approved-public-safe" 
  | "published" 
  | "unpublished" 
  | "removed-after-correction"

export type PublicBadge = 
  | "Verified Malicious" 
  | "High-Risk Verified" 
  | "Officially Reported" 
  | "Takedown Confirmed"

export interface PublicRegistryDraft {
  id: string
  indicatorValue: string
  indicatorType: IndicatorType
  scamFamily: ScamFamily
  publicBadge: PublicBadge
  visibilityState: VisibilityState
  publicSafeSummary: string
  redactedFields: string[]
  publishedBy?: string
  publishedAt?: string
  unpublishedAt?: string
  lastEditedBy?: string
  lastEditedAt?: string
}

// ============================================================================
// CORRECTIONS & APPEALS
// ============================================================================

export type AppealStatus = 
  | "pending" 
  | "under-review" 
  | "upheld" 
  | "changed" 
  | "removed"

export type AppealType = "correction" | "removal" | "dispute"

export interface CorrectionAppeal {
  id: string
  registryId: string
  indicatorValue: string
  indicatorType: IndicatorType
  appealType: AppealType
  status: AppealStatus
  submittedAt: string
  submitterType: "subject" | "legal" | "platform"
  submitterEmail?: string
  summary: string
  evidenceProvided?: string[]
  resolution?: string
  resolvedAt?: string
  resolvedBy?: string
}

// ============================================================================
// SETTINGS & CONFIGURATION
// ============================================================================

export interface UserSettings {
  userId: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    alertTypes: AlertType[]
  }
  privacy: {
    shareAnonymousData: boolean
    showInDirectory: boolean
  }
  display: {
    theme: "light" | "dark" | "system"
    language: string
    timezone: string
  }
}

export interface OrganizationSettings {
  organizationId: string
  name: string
  domain?: string
  logo?: string
  ssoEnabled: boolean
  ssoProvider?: string
  mfaRequired: boolean
  ipWhitelist?: string[]
  dataRetentionDays: number
  apiRateLimit: number
}

// ============================================================================
// API PAGINATION & FILTERING
// ============================================================================

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface FilterParams {
  search?: string
  status?: string[]
  type?: string[]
  dateFrom?: string
  dateTo?: string
  region?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// ============================================================================
// API ERROR HANDLING
// ============================================================================

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: string
  requestId?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
}
