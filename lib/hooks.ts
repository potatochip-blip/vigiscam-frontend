/**
 * VIGISCAM™ Data Fetching Hooks
 * ==============================
 * 
 * SWR-based hooks for data fetching with caching, revalidation, and optimistic updates.
 * 
 * BACKEND INTEGRATION:
 * These hooks currently use mock data from lib/scam-intelligence-data.ts.
 * When connecting to a real backend:
 * 1. Update the fetcher functions to use the API client
 * 2. Remove mock data imports
 * 3. Add proper error boundaries in components
 */

import useSWR, { mutate as globalMutate } from "swr"
import useSWRMutation from "swr/mutation"
import { api } from "./api-client"
import type {
  RegistryEntry,
  ScamNetwork,
  ScamReport,
  Case,
  Alert,
  DashboardStats,
  VerificationQueueItem,
  PublicRegistryDraft,
  CorrectionAppeal,
  User,
  PaginationParams,
  FilterParams,
} from "./types"

// Import mock data for development
import {
  mockRegistryEntries,
  mockNetworks,
  mockVerificationQueue,
  mockPublicDrafts,
  mockCorrectionsAppeals,
  mockSubmissions,
  mockTakedownStatus,
} from "./scam-intelligence-data"

// ============================================================================
// CONFIGURATION
// ============================================================================

const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 5000,
  errorRetryCount: 3,
}

// ============================================================================
// SCAM INTELLIGENCE HOOKS
// ============================================================================

/**
 * Hook to check an indicator against the registry
 */
export function useIndicatorCheck() {
  return useSWRMutation(
    "/api/scam-intelligence/check",
    async (url, { arg }: { arg: { indicator: string } }) => {
      // TODO: Replace with real API call
      // const response = await api.scamIntelligence.checkIndicator(arg)
      // return response.data
      
      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 800))
      const results = mockRegistryEntries.filter((entry) =>
        entry.indicator.toLowerCase().includes(arg.indicator.toLowerCase())
      )
      return {
        found: results.length > 0,
        count: results.length,
        results,
      }
    }
  )
}

/**
 * Hook to get registry entries
 */
export function useRegistry(params: PaginationParams & FilterParams = {}) {
  return useSWR(
    ["registry", params],
    async () => {
      // TODO: Replace with real API call
      // const response = await api.scamIntelligence.getRegistry(params)
      // return response.data
      
      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 300))
      let data = [...mockRegistryEntries]
      
      // Apply search filter
      if (params.search) {
        const search = params.search.toLowerCase()
        data = data.filter(
          (entry) =>
            entry.indicator.toLowerCase().includes(search) ||
            entry.summary.toLowerCase().includes(search)
        )
      }
      
      // Apply type filter
      if (params.type?.length) {
        data = data.filter((entry) => params.type?.includes(entry.type))
      }
      
      // Apply status filter
      if (params.status?.length) {
        data = data.filter((entry) => params.status?.includes(entry.status))
      }
      
      const page = params.page || 1
      const limit = params.limit || 10
      const start = (page - 1) * limit
      const paginatedData = data.slice(start, start + limit)
      
      return {
        data: paginatedData,
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages: Math.ceil(data.length / limit),
          hasNext: start + limit < data.length,
          hasPrev: page > 1,
        },
      }
    },
    SWR_CONFIG
  )
}

/**
 * Hook to get a single registry entry
 */
export function useRegistryEntry(id: string | null) {
  return useSWR(
    id ? ["registry", id] : null,
    async () => {
      // TODO: Replace with real API call
      // const response = await api.scamIntelligence.getRegistryEntry(id)
      // return response.data
      
      await new Promise((resolve) => setTimeout(resolve, 200))
      return mockRegistryEntries.find((entry) => entry.id === id) || null
    },
    SWR_CONFIG
  )
}

/**
 * Hook to get scam networks
 */
export function useNetworks(params: PaginationParams & FilterParams = {}) {
  return useSWR(
    ["networks", params],
    async () => {
      // TODO: Replace with real API call
      // const response = await api.scamIntelligence.getNetworks(params)
      // return response.data
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      let data = [...mockNetworks]
      
      if (params.search) {
        const search = params.search.toLowerCase()
        data = data.filter(
          (network) =>
            network.name.toLowerCase().includes(search) ||
            network.description.toLowerCase().includes(search)
        )
      }
      
      const page = params.page || 1
      const limit = params.limit || 10
      const start = (page - 1) * limit
      
      return {
        data: data.slice(start, start + limit),
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages: Math.ceil(data.length / limit),
          hasNext: start + limit < data.length,
          hasPrev: page > 1,
        },
      }
    },
    SWR_CONFIG
  )
}

/**
 * Hook to get latest alerts
 */
export function useLatestAlerts(limit = 10) {
  return useSWR(
    ["latest-alerts", limit],
    async () => {
      // TODO: Replace with real API call
      // const response = await api.scamIntelligence.getLatestAlerts(limit)
      // return response.data
      
      await new Promise((resolve) => setTimeout(resolve, 200))
      return mockRegistryEntries
        .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime())
        .slice(0, limit)
    },
    SWR_CONFIG
  )
}

/**
 * Hook to get takedowns
 */
export function useTakedowns(params: PaginationParams & FilterParams = {}) {
  return useSWR(
    ["takedowns", params],
    async () => {
      // TODO: Replace with real API call
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      let data = [...mockTakedownStatus]
      
      if (params.search) {
        const search = params.search.toLowerCase()
        data = data.filter((td) => td.indicator.toLowerCase().includes(search))
      }
      
      const page = params.page || 1
      const limit = params.limit || 10
      const start = (page - 1) * limit
      
      return {
        data: data.slice(start, start + limit),
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages: Math.ceil(data.length / limit),
          hasNext: start + limit < data.length,
          hasPrev: page > 1,
        },
      }
    },
    SWR_CONFIG
  )
}

// ============================================================================
// DASHBOARD HOOKS
// ============================================================================

/**
 * Hook to get dashboard statistics
 */
export function useDashboardStats() {
  return useSWR(
    "dashboard-stats",
    async (): Promise<DashboardStats> => {
      // TODO: Replace with real API call
      // const response = await api.dashboard.getStats()
      // return response.data
      
      await new Promise((resolve) => setTimeout(resolve, 400))
      return {
        totalThreatsDetected: 12847,
        threatsDetectedChange: 12.5,
        activeCases: 342,
        activeCasesChange: -3.2,
        takedownsCompleted: 1893,
        takedownsCompletedChange: 8.7,
        protectedUsers: 2400000,
        scamsBlocked: 45892,
        moneyProtected: 127500000,
        threatsByType: [
          { type: "tech-support", count: 3421 },
          { type: "romance", count: 2891 },
          { type: "bank-impersonation", count: 2156 },
          { type: "crypto", count: 1872 },
          { type: "recovery", count: 1243 },
        ],
        threatsByRegion: [
          { region: "North America", count: 4521 },
          { region: "Europe", count: 3892 },
          { region: "Asia Pacific", count: 2341 },
          { region: "UK", count: 1243 },
        ],
        threatsTrend: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          count: Math.floor(Math.random() * 200) + 300,
        })),
      }
    },
    { ...SWR_CONFIG, refreshInterval: 60000 }
  )
}

// ============================================================================
// ADMIN HOOKS
// ============================================================================

/**
 * Hook to get verification queue
 */
export function useVerificationQueue(params: PaginationParams & FilterParams = {}) {
  return useSWR(
    ["verification-queue", params],
    async () => {
      // TODO: Replace with real API call
      // const response = await api.admin.getVerificationQueue(params)
      // return response.data
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      let data = [...mockVerificationQueue]
      
      const page = params.page || 1
      const limit = params.limit || 10
      const start = (page - 1) * limit
      
      return {
        data: data.slice(start, start + limit),
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages: Math.ceil(data.length / limit),
          hasNext: start + limit < data.length,
          hasPrev: page > 1,
        },
      }
    },
    SWR_CONFIG
  )
}

/**
 * Hook to get public registry drafts
 */
export function usePublicRegistryDrafts(params: PaginationParams & FilterParams = {}) {
  return useSWR(
    ["public-registry-drafts", params],
    async () => {
      // TODO: Replace with real API call
      // const response = await api.admin.getPublicRegistryDrafts(params)
      // return response.data
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      let data = [...mockPublicDrafts]
      
      if (params.status?.length) {
        data = data.filter((draft) => params.status?.includes(draft.visibilityState))
      }
      
      const page = params.page || 1
      const limit = params.limit || 10
      const start = (page - 1) * limit
      
      return {
        data: data.slice(start, start + limit),
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages: Math.ceil(data.length / limit),
          hasNext: start + limit < data.length,
          hasPrev: page > 1,
        },
      }
    },
    SWR_CONFIG
  )
}

/**
 * Hook to get corrections and appeals
 */
export function useAppeals(params: PaginationParams & FilterParams = {}) {
  return useSWR(
    ["appeals", params],
    async () => {
      // TODO: Replace with real API call
      // const response = await api.admin.getAppeals(params)
      // return response.data
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      let data = [...mockCorrectionsAppeals]
      
      if (params.status?.length) {
        data = data.filter((appeal) => params.status?.includes(appeal.status))
      }
      
      const page = params.page || 1
      const limit = params.limit || 10
      const start = (page - 1) * limit
      
      return {
        data: data.slice(start, start + limit),
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages: Math.ceil(data.length / limit),
          hasNext: start + limit < data.length,
          hasPrev: page > 1,
        },
      }
    },
    SWR_CONFIG
  )
}

/**
 * Hook to get submissions
 */
export function useSubmissions(params: PaginationParams & FilterParams = {}) {
  return useSWR(
    ["submissions", params],
    async () => {
      // TODO: Replace with real API call
      
      await new Promise((resolve) => setTimeout(resolve, 300))
      let data = [...mockSubmissions]
      
      if (params.status?.length) {
        data = data.filter((sub) => params.status?.includes(sub.status))
      }
      
      const page = params.page || 1
      const limit = params.limit || 10
      const start = (page - 1) * limit
      
      return {
        data: data.slice(start, start + limit),
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages: Math.ceil(data.length / limit),
          hasNext: start + limit < data.length,
          hasPrev: page > 1,
        },
      }
    },
    SWR_CONFIG
  )
}

// ============================================================================
// ALERTS HOOKS
// ============================================================================

/**
 * Hook to get user alerts
 */
export function useAlerts(params: PaginationParams & { unreadOnly?: boolean } = {}) {
  return useSWR(
    ["alerts", params],
    async () => {
      // TODO: Replace with real API call
      // const response = await api.alerts.getAlerts(params)
      // return response.data
      
      await new Promise((resolve) => setTimeout(resolve, 200))
      
      const mockAlerts: Alert[] = [
        {
          id: "alert-1",
          type: "new-threat",
          severity: "critical",
          title: "New High-Volume Scam Network Detected",
          message: "A new tech support scam network targeting US seniors has been identified.",
          createdAt: new Date().toISOString(),
          actionUrl: "/scam-intelligence/networks",
        },
        {
          id: "alert-2",
          type: "takedown-update",
          severity: "medium",
          title: "Takedown Confirmed",
          message: "microsoft-support-helpdesk.com has been successfully taken down.",
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          readAt: new Date(Date.now() - 1800000).toISOString(),
        },
        {
          id: "alert-3",
          type: "case-update",
          severity: "low",
          title: "Case Status Updated",
          message: "Case #CAS-2847 has been escalated to law enforcement.",
          createdAt: new Date(Date.now() - 7200000).toISOString(),
        },
      ]
      
      let data = [...mockAlerts]
      if (params.unreadOnly) {
        data = data.filter((alert) => !alert.readAt)
      }
      
      const page = params.page || 1
      const limit = params.limit || 10
      const start = (page - 1) * limit
      
      return {
        data: data.slice(start, start + limit),
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages: Math.ceil(data.length / limit),
          hasNext: start + limit < data.length,
          hasPrev: page > 1,
        },
      }
    },
    SWR_CONFIG
  )
}

/**
 * Hook to get unread alert count
 */
export function useUnreadAlertCount() {
  return useSWR(
    "unread-alert-count",
    async () => {
      // TODO: Replace with real API call
      // const response = await api.alerts.getUnreadCount()
      // return response.data?.count
      
      await new Promise((resolve) => setTimeout(resolve, 100))
      return 2 // Mock unread count
    },
    { ...SWR_CONFIG, refreshInterval: 30000 }
  )
}

// ============================================================================
// MUTATION HELPERS
// ============================================================================

/**
 * Invalidate and refetch data for a specific key pattern
 */
export function invalidateQueries(keyPattern: string | string[]) {
  const keys = Array.isArray(keyPattern) ? keyPattern : [keyPattern]
  keys.forEach((key) => {
    globalMutate(
      (cacheKey: unknown) =>
        Array.isArray(cacheKey) ? cacheKey[0] === key : cacheKey === key,
      undefined,
      { revalidate: true }
    )
  })
}

/**
 * Optimistically update cached data
 */
export function optimisticUpdate<T>(
  key: string | string[],
  updater: (data: T | undefined) => T
) {
  globalMutate(key, updater, { revalidate: false })
}
