import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Database,
  Zap,
  Shield,
  Lock,
  Users,
  Globe,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"
import { VigiscamLogo } from "@/components/vigiscam-logo"

export default function MethodologyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-b py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <VigiscamLogo size="sm" variant="icon" />
                <div className="border-l border-muted pl-3">
                  <span className="text-sm font-medium text-muted-foreground block">Transparency & Trust</span>
                  <span className="text-xs text-muted-foreground">Powered by VIGISCAM™</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">Our Methodology</h1>
              <p className="text-lg text-muted-foreground">
                Learn how VIGISCAM™ verifies, publishes, and maintains the world&apos;s most reliable scam intelligence database. Transparency is fundamental to our mission.
              </p>
            </div>
          </div>
        </section>

        {/* Data Collection */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">1. Data Collection & Verification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Client Reports
                </h3>
                <p className="text-muted-foreground mb-4">
                  VIGISCAM™ users submit detailed scam reports when they encounter suspicious activity. Each report includes:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    Phone numbers, email addresses, domains, or wallet addresses
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    Conversation transcripts or recordings
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    Timeline of interactions and requests
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    Financial information (amounts requested/lost)
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    Target location and demographics
                  </li>
                </ul>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Data Quality Standards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-sm mb-1">Automated Validation</p>
                    <p className="text-xs text-muted-foreground">
                      Format checking, duplicate detection, and basic content verification
                    </p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="font-medium text-sm mb-1">Cross-Reference Matching</p>
                    <p className="text-xs text-muted-foreground">
                      Compare against existing indicators to identify linked accounts
                    </p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="font-medium text-sm mb-1">SCAMZY™ Analysis</p>
                    <p className="text-xs text-muted-foreground">
                      AI network analysis and pattern matching against known fraud operations
                    </p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="font-medium text-sm mb-1">Confidence Scoring</p>
                    <p className="text-xs text-muted-foreground">
                      Assign reliability score based on evidence quality and corroboration
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Intelligence & Analysis */}
        <section className="py-12 bg-slate-50 border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">2. Intelligence & Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    SCAMZY™ Network Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    Our proprietary AI system analyzes patterns across all indicators to identify fraud rings and network connections:
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Phone number clustering and routing analysis</li>
                    <li>Email domain and provider pattern matching</li>
                    <li>Cryptocurrency transaction flow analysis</li>
                    <li>Social media account linking and timeline analysis</li>
                    <li>Script similarity and linguistic pattern matching</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    A1SCAMSHIELD™ Linguistic Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    Advanced linguistic and acoustic analysis detects manipulation tactics:
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Common phrases and psychological manipulation patterns</li>
                    <li>Voice acoustic patterns and cloning detection</li>
                    <li>Deepfake video/audio analysis</li>
                    <li>Language patterns unique to specific scam families</li>
                    <li>Urgency and fear-based messaging detection</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Verification Process */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">3. Verification Process</h2>

            <div className="space-y-6">
              {/* Single Report */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Single Report Received
                  </CardTitle>
                  <CardDescription>
                    A user reports a suspicious phone number claiming to be from their bank
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Status: <Badge>Unverified</Badge>
                </CardContent>
              </Card>

              {/* AI Analysis */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    AI Analysis & Linking
                  </CardTitle>
                  <CardDescription>
                    SCAMZY™ analyzes the number and finds 47 similar cases with identical scripting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    Our system identifies:
                  </p>
                  <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                    <li>Related phone numbers (same VOIP provider)</li>
                    <li>Linked email addresses and social accounts</li>
                    <li>Identical phrases and call scripts</li>
                    <li>Coordinated timing across multiple victims</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Threshold */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Verification Threshold Met
                  </CardTitle>
                  <CardDescription>
                    20+ corroborating reports + AI analysis confidence score 85%+
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Status: <Badge className="bg-green-600">Verified Malicious</Badge>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-bold mb-3 text-sm">Verification Standards</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-1">Minimum Reports</p>
                  <p className="text-muted-foreground">20+ corroborating cases for high-risk designation</p>
                </div>
                <div>
                  <p className="font-medium mb-1">AI Confidence</p>
                  <p className="text-muted-foreground">85%+ network match probability from SCAMZY™</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Geographic Diversity</p>
                  <p className="text-muted-foreground">Reports from multiple regions to reduce false positives</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publication & Maintenance */}
        <section className="py-12 bg-slate-50 border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">4. Publication & Maintenance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Public Registry
                </h3>
                <p className="text-muted-foreground mb-4">
                  Verified indicators are published in our searchable registry with:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Verification status and date</li>
                  <li>Network connections and relationships</li>
                  <li>Case count and geographic targeting</li>
                  <li>Common phrases and tactics</li>
                  <li>Recommended actions for users</li>
                  <li>Takedown status and timeline</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Ongoing Monitoring
                </h3>
                <p className="text-muted-foreground mb-4">
                  Each entry is continuously updated based on:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>New case reports and victim feedback</li>
                  <li>Activity status (active, dormant, disrupted)</li>
                  <li>Network evolution and new variants</li>
                  <li>Takedown confirmation and removal</li>
                  <li>Law enforcement collaboration updates</li>
                  <li>Intelligence from partner organizations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Data Quality & Accuracy */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">5. Data Quality & Accuracy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">False Positive Mitigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>We use multiple safeguards to prevent false positives:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Cross-reference with legitimate business numbers</li>
                    <li>Verify legitimate domain ownership</li>
                    <li>Require geographic diversity in reports</li>
                    <li>AI confidence thresholds</li>
                    <li>Manual review for borderline cases</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Privacy Protection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>User privacy is protected through:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Anonymized report processing</li>
                    <li>No personal victim information published</li>
                    <li>Encrypted storage of case details</li>
                    <li>Access controls for sensitive data</li>
                    <li>GDPR and privacy law compliance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Regular Audits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>Quality assurance through:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Quarterly accuracy reviews</li>
                    <li>Manual spot-checking of entries</li>
                    <li>User feedback mechanisms</li>
                    <li>Third-party validation studies</li>
                    <li>Continuous AI model improvement</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What VIGISCAM Publishes — and What It Never Publishes */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">What VIGISCAM™ Publishes — and What It Never Publishes</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Public scam intelligence carries a responsibility to be accurate and to protect the people who reported it. These rules are not optional — they are the foundation of our credibility.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-green-900">
                    <CheckCircle2 className="h-4 w-4 text-green-700" />
                    What VIGISCAM™ Publishes
                  </CardTitle>
                  <CardDescription className="text-green-800">
                    Only records that meet all three criteria below
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-green-800">
                  <div className="flex gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Client-reported</p>
                      <p>The indicator was submitted by a client or partner with first-hand knowledge of the scam event.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">VIGISCAM™-verified</p>
                      <p>The submission has passed independent analyst review, SCAMZY™ network matching, and A1SCAMSHIELD™ script analysis where applicable.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Public-safe</p>
                      <p>The published record contains no victim personal data, no unverified allegations, and no internal case identifiers. A dedicated public-safe review gate is required before any record can be published.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-red-900">
                    <Lock className="h-4 w-4 text-red-700" />
                    What VIGISCAM™ Never Publishes
                  </CardTitle>
                  <CardDescription className="text-red-800">
                    These categories are permanently private regardless of volume or confidence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2.5 text-sm text-red-800">
                  {[
                    ["Raw reports", "Submissions are received privately and stay private until verification is complete."],
                    ["Victim identities", "Names, contact details, account numbers, and any personally identifiable information of victims are never published."],
                    ["Unverified allegations", "A claim is not a fact. No indicator is published solely on the basis of a single submission, regardless of how confident the reporter is."],
                    ["Under-review submissions", "Records in the verification pipeline are invisible to the public until they have passed every review stage."],
                    ["Rejected or insufficient-evidence records", "A rejected submission is permanently private. It cannot appear in the public registry under any circumstance."],
                    ["Internal case notes and reviewer details", "Analyst notes, reviewer identities, internal case IDs, and workflow metadata remain internal."],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex gap-2.5">
                      <span className="text-red-500 font-bold flex-shrink-0 mt-0.5">—</span>
                      <div>
                        <p className="font-semibold">{title}</p>
                        <p>{desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Responsibility & Limitations */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">6. Responsibility & Limitations</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Our Commitment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    VIGISCAM™ is committed to publishing the most accurate scam intelligence available. We take responsibility for our data seriously and maintain transparent processes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Known Limitations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Not all scams are reported, creating potential blind spots</li>
                    <li>Sophisticated operators may avoid detection temporarily</li>
                    <li>International scams may have limited documentation</li>
                    <li>Real-time detection has inherent lag</li>
                    <li>Some indicators may be reused legitimately (phone numbers, domains)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">If You Find an Error</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-3">
                  <p>If you believe an entry in our registry is inaccurate:</p>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Submit a detailed report with evidence</li>
                    <li>Include documentation of the legitimate use of the indicator</li>
                    <li>Provide alternative indicators if available</li>
                  </ol>
                  <Button className="mt-3 w-full" variant="outline">
                    Report a Database Error
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
