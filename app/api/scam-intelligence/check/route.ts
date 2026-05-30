import { mockRegistryEntries } from "@/lib/scam-intelligence-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { indicator } = body

    if (!indicator || indicator.trim().length === 0) {
      return Response.json(
        { error: "Indicator is required" },
        { status: 400 }
      )
    }

    // Search for matching indicators
    const results = mockRegistryEntries.filter((entry) =>
      entry.indicator.toLowerCase().includes(indicator.toLowerCase())
    )

    return Response.json({
      success: true,
      found: results.length > 0,
      count: results.length,
      results: results.map((entry) => ({
        id: entry.id,
        indicator: entry.indicator,
        type: entry.type,
        scamFamily: entry.scamFamily,
        status: entry.status,
        caseCount: entry.caseCount,
        firstSeen: entry.firstSeen,
        lastSeen: entry.lastSeen,
        linkedNetwork: entry.linkedNetwork,
        summary: entry.summary,
        recommendedAction: entry.recommendedAction,
        region: entry.region,
      })),
    })
  } catch (error) {
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
