import { mockRegistryEntries } from "@/lib/scam-intelligence-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      scamType,
      contactMethod,
      dateOccurred,
      description,
      scammerInfo,
      financialLoss,
      lossAmount,
      reporterName,
      reporterEmail,
      reporterPhone,
      anonymous,
      uploadedFiles = [],
    } = body

    // Validate required fields
    if (!description || !scamType) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Generate reference number
    const referenceNumber = `VS-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    // Check if indicator already exists in registry
    const indicatorMatch = mockRegistryEntries.find(
      (entry) =>
        entry.indicator.toLowerCase() === contactMethod?.toLowerCase() ||
        entry.summary.toLowerCase().includes(description.toLowerCase())
    )

    // Create report object
    const report = {
      referenceNumber,
      timestamp: new Date().toISOString(),
      scamType,
      contactMethod,
      dateOccurred,
      description,
      scammerInfo,
      financialLoss: financialLoss === "yes" ? parseFloat(lossAmount || "0") : 0,
      reporterName: anonymous ? "Anonymous" : reporterName,
      reporterEmail: anonymous ? null : reporterEmail,
      reporterPhone: anonymous ? null : reporterPhone,
      anonymous,
      uploadedFiles: uploadedFiles.length,
      indicatorMatch: indicatorMatch ? indicatorMatch.id : null,
      status: "pending",
      submittedAt: new Date().toISOString(),
    }

    // In a real application, this would be saved to a database
    console.log("[v0] Report submitted:", report)

    return Response.json(
      {
        success: true,
        referenceNumber,
        message: "Your report has been submitted for review",
        nextSteps: [
          "We will analyze your report within 24 hours",
          "If your report matches existing indicators, it will strengthen the verification",
          "You will receive updates about your report via email",
          "Your data is encrypted and handled with care",
        ],
        estimatedReview: "24 hours",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("[v0] Report submission error:", error)
    return Response.json(
      { error: "Failed to submit report" },
      { status: 500 }
    )
  }
}
