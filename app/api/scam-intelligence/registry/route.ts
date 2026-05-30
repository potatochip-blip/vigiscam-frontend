/**
 * GET /api/scam-intelligence/registry
 * 
 * Returns paginated registry entries with optional filtering.
 * 
 * Query Parameters:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10, max: 100)
 * - search: Search term for indicator or summary
 * - type: Filter by indicator type (comma-separated)
 * - status: Filter by verification status (comma-separated)
 * - scamFamily: Filter by scam family (comma-separated)
 * - sortBy: Sort field (default: lastSeen)
 * - sortOrder: Sort order (asc/desc, default: desc)
 * 
 * BACKEND INTEGRATION:
 * - Query database with pagination
 * - Apply filters efficiently (use indexes)
 * - Return standardized paginated response
 */

import { NextResponse } from "next/server"
import { mockRegistryEntries } from "@/lib/scam-intelligence-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse pagination params
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")))
    
    // Parse filter params
    const search = searchParams.get("search")?.toLowerCase()
    const types = searchParams.get("type")?.split(",").filter(Boolean)
    const statuses = searchParams.get("status")?.split(",").filter(Boolean)
    const scamFamilies = searchParams.get("scamFamily")?.split(",").filter(Boolean)
    
    // Parse sort params
    const sortBy = searchParams.get("sortBy") || "lastSeen"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // TODO: Replace with real database query
    // Example with Supabase:
    // let query = supabase
    //   .from('registry_entries')
    //   .select('*', { count: 'exact' })
    //   .order(sortBy, { ascending: sortOrder === 'asc' })
    //   .range((page - 1) * limit, page * limit - 1)
    // 
    // if (search) query = query.ilike('indicator', `%${search}%`)
    // if (types?.length) query = query.in('indicator_type', types)
    // if (statuses?.length) query = query.in('status', statuses)

    // Filter mock data
    let filtered = [...mockRegistryEntries]
    
    if (search) {
      filtered = filtered.filter(
        (entry) =>
          entry.indicator.toLowerCase().includes(search) ||
          entry.summary.toLowerCase().includes(search) ||
          entry.linkedNetwork?.toLowerCase().includes(search)
      )
    }
    
    if (types?.length) {
      filtered = filtered.filter((entry) => types.includes(entry.type))
    }
    
    if (statuses?.length) {
      filtered = filtered.filter((entry) => statuses.includes(entry.status))
    }
    
    if (scamFamilies?.length) {
      filtered = filtered.filter((entry) => scamFamilies.includes(entry.scamFamily))
    }
    
    // Sort
    filtered.sort((a, b) => {
      const aVal = a[sortBy as keyof typeof a] as string
      const bVal = b[sortBy as keyof typeof b] as string
      const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0
      return sortOrder === "desc" ? -comparison : comparison
    })
    
    // Paginate
    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const data = filtered.slice(start, start + limit)

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Registry fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
