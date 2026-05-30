export type VerificationStatus = "verified-malicious" | "high-risk-verified" | "takedown-confirmed" | "officially-reported"
export type IndicatorType = "domain" | "url" | "phone" | "email" | "wallet" | "social-profile" | "fake-support-page" | "fake-company" | "scam-script"
export type ScamFamily = "tech-support" | "bank-impersonation" | "romance" | "recovery" | "sextortion" | "gift-card" | "crypto" | "remote-access" | "deepfake" | "check-fraud"
export type TakedownStatus = "pending" | "in-progress" | "confirmed" | "partial" | "not-applicable"
export type NetworkRisk = "critical" | "high" | "medium"

export const verificationStatusLabels: Record<VerificationStatus, string> = {
  "verified-malicious": "Verified Malicious",
  "high-risk-verified": "High-Risk Verified",
  "takedown-confirmed": "Takedown Confirmed",
  "officially-reported": "Officially Reported",
}

export const indicatorTypeLabels: Record<IndicatorType, string> = {
  domain: "Website / Domain",
  url: "URL",
  phone: "Phone Number",
  email: "Email Address",
  wallet: "Wallet Address",
  "social-profile": "Social Profile",
  "fake-support-page": "Fake Support Page",
  "fake-company": "Fake Company",
  "scam-script": "Scam Script",
}

export const scamFamilyLabels: Record<ScamFamily, string> = {
  "tech-support": "Tech Support",
  "bank-impersonation": "Bank Impersonation",
  romance: "Romance / Pig Butchering",
  recovery: "Recovery Scam",
  sextortion: "Sextortion",
  "gift-card": "Gift Card",
  crypto: "Crypto / Investment",
  "remote-access": "Remote Access",
  deepfake: "Deepfake Impersonation",
  "check-fraud": "Check Fraud / Carding",
}

export interface RegistryEntry {
  id: string
  indicator: string
  type: IndicatorType
  scamFamily: ScamFamily
  status: VerificationStatus
  firstSeen: string
  lastSeen: string
  linkedNetwork: string
  caseCount: number
  takedownStatus: TakedownStatus
  region: string
  summary: string
  commonPhrases: string[]
  relatedIndicators: string[]
  dateVerified: string
  recommendedAction: string
  evidenceSummary: string
}

export const mockRegistryEntries: RegistryEntry[] = [
  {
    id: "REG-001",
    indicator: "microsoft-support-helpdesk.com",
    type: "domain",
    scamFamily: "tech-support",
    status: "takedown-confirmed",
    firstSeen: "2025-08-12",
    lastSeen: "2026-01-04",
    linkedNetwork: "Tech Support Cluster A",
    caseCount: 342,
    takedownStatus: "confirmed",
    region: "India / US-targeted",
    summary: "Fake Microsoft support domain used to harvest remote access credentials. Deceptive pop-ups directed victims to call a toll-free number.",
    commonPhrases: ["Your computer has been compromised", "Call Microsoft immediately", "We detected a virus on your system", "Press Alt+F4 to stop the infection"],
    relatedIndicators: ["1-877-288-4101", "support@ms-helpdesk.net", "windows-security-alert.com"],
    dateVerified: "2025-09-01",
    recommendedAction: "Do not visit this domain. If you received a pop-up from this site, do not call the number displayed. Report to FTC.",
    evidenceSummary: "342 verified client reports corroborated by SCAMZY™ script matching and domain registration analysis. Domain seized January 2026.",
  },
  {
    id: "REG-002",
    indicator: "+1-877-288-4101",
    type: "phone",
    scamFamily: "tech-support",
    status: "verified-malicious",
    firstSeen: "2025-07-20",
    lastSeen: "2026-04-28",
    linkedNetwork: "Tech Support Cluster A",
    caseCount: 218,
    takedownStatus: "in-progress",
    region: "Routed via US VOIP, operators in India",
    summary: "High-volume tech support scam phone number. Operators impersonate Microsoft, Norton, and McAfee agents. Victims instructed to install remote access software.",
    commonPhrases: ["This is Windows technical support", "Your license has expired", "We need remote access to clean your computer", "There are 47 viruses on your system"],
    relatedIndicators: ["microsoft-support-helpdesk.com", "support@ms-helpdesk.net", "+1-877-288-4102"],
    dateVerified: "2025-08-15",
    recommendedAction: "Do not call this number. If contacted, hang up immediately. Report to FTC ReportFraud.ftc.gov.",
    evidenceSummary: "218 verified client cases. A1SCAMSHIELD™ acoustic analysis confirmed identical voice patterns across 94% of cases. Number linked to Tech Support Cluster A.",
  },
  {
    id: "REG-003",
    indicator: "refund-recovery-specialists.net",
    type: "domain",
    scamFamily: "recovery",
    status: "verified-malicious",
    firstSeen: "2025-11-03",
    lastSeen: "2026-04-30",
    linkedNetwork: "Sextortion Recovery Re-Exploitation Cluster",
    caseCount: 87,
    takedownStatus: "pending",
    region: "West Africa / UK-targeted",
    summary: "Recovery scam targeting prior fraud victims. Claims to recover lost funds for an upfront fee. Often contacts victims of prior sextortion cases.",
    commonPhrases: ["We have recovered funds in your name", "Pay a small processing fee to receive your refund", "We work with Interpol and FBI", "Your case has been approved"],
    relatedIndicators: ["recovery@refund-recovery-specialists.net", "+44-203-289-5541"],
    dateVerified: "2025-12-10",
    recommendedAction: "Legitimate recovery agencies do not charge upfront fees. Do not send money or share financial information.",
    evidenceSummary: "87 verified cases, primarily prior sextortion and romance scam victims re-targeted. SCAMZY™ linked to known West Africa recovery ring.",
  },
  {
    id: "REG-004",
    indicator: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    type: "wallet",
    scamFamily: "crypto",
    status: "verified-malicious",
    firstSeen: "2025-06-01",
    lastSeen: "2026-02-14",
    linkedNetwork: "Gift Card / Crypto Coaching Ring",
    caseCount: 156,
    takedownStatus: "not-applicable",
    region: "Global",
    summary: "Bitcoin wallet address linked to pig-butchering investment fraud. Victims coached over weeks via fake romantic relationship before being directed to send crypto.",
    commonPhrases: ["I want to show you how I make money", "Just invest a small amount to see returns", "You can withdraw anytime", "The platform requires a tax payment to release funds"],
    relatedIndicators: ["fake-forex-platform.io", "invest-advisor-24.com"],
    dateVerified: "2025-08-20",
    recommendedAction: "Do not send cryptocurrency to this address. If you have, contact your bank and file a report with the IC3 at ic3.gov.",
    evidenceSummary: "Blockchain analysis confirmed 156 inbound transactions from verified victim reports. Wallet linked to larger pig-butchering network.",
  },
  {
    id: "REG-005",
    indicator: "facebook.com/groups/official-vigiscam-support-2024",
    type: "fake-support-page",
    scamFamily: "recovery",
    status: "takedown-confirmed",
    firstSeen: "2025-09-14",
    lastSeen: "2025-12-22",
    linkedNetwork: "Sextortion Recovery Re-Exploitation Cluster",
    caseCount: 44,
    takedownStatus: "confirmed",
    region: "Ghana / UK and US-targeted",
    summary: "Fake VIGISCAM™ support group on Facebook with 1,200+ members. Posed as official victim support to extract further payments and personal data from scam victims.",
    commonPhrases: ["We can help you get your money back", "Send us your case details", "Official VIGISCAM recovery team"],
    relatedIndicators: ["recovery@refund-recovery-specialists.net"],
    dateVerified: "2025-10-01",
    recommendedAction: "VIGISCAM™ does not operate public Facebook groups. If you were contacted through this group, do not share personal or financial information.",
    evidenceSummary: "44 verified cases. Facebook group removed December 2025 following evidence submission to Meta.",
  },
  {
    id: "REG-006",
    indicator: "davidchen_forex_trader",
    type: "social-profile",
    scamFamily: "romance",
    status: "high-risk-verified",
    firstSeen: "2025-10-05",
    lastSeen: "2026-04-22",
    linkedNetwork: "Romance Crisis Monetization Network",
    caseCount: 73,
    takedownStatus: "in-progress",
    region: "Southeast Asia / US, UK, AU-targeted",
    summary: "Fake romantic persona operating across multiple platforms. Profile photographs are stolen from public social media. Targets singles aged 45-70 before pivoting to crypto investment fraud.",
    commonPhrases: ["I am a forex trader living in Singapore", "I want to show you how to invest safely", "We can build a future together"],
    relatedIndicators: ["fake-forex-platform.io", "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"],
    dateVerified: "2025-11-15",
    recommendedAction: "Do not send money to people you have only met online. Reverse image search profile photos. Report to your platform and IC3.",
    evidenceSummary: "73 verified reports across dating apps and Instagram. SCAMZY™ matched behavioral script to Romance Crisis Monetization Network.",
  },
  {
    id: "REG-007",
    indicator: "secure-account-transfer.barclays-uk.com",
    type: "domain",
    scamFamily: "bank-impersonation",
    status: "takedown-confirmed",
    firstSeen: "2025-12-01",
    lastSeen: "2026-01-30",
    linkedNetwork: "Fake Bank Safe-Account Impersonation Cluster",
    caseCount: 129,
    takedownStatus: "confirmed",
    region: "UK-targeted",
    summary: "Domain impersonating Barclays Bank. Used in authorised push payment (APP) fraud. Victims told their account was compromised and directed to transfer funds to a 'safe account'.",
    commonPhrases: ["Your account has been compromised", "Transfer your funds to our secure holding account", "This is urgent — your savings are at risk"],
    relatedIndicators: ["+44-800-328-1221", "security@barclays-uk-secure.com"],
    dateVerified: "2025-12-15",
    recommendedAction: "Banks never ask you to move money to a 'safe account'. If you receive this instruction, hang up and call the number on the back of your card.",
    evidenceSummary: "129 verified APP fraud cases in UK. Domain taken down January 2026. Linked to call centre infrastructure in Eastern Europe.",
  },
]

export interface NetworkEntry {
  id: string
  name: string
  scamFamily: ScamFamily
  indicatorCount: number
  caseCount: number
  infrastructure: string[]
  firstSeen: string
  lastSeen: string
  takedownStatus: TakedownStatus
  riskLevel: NetworkRisk
  overview: string
  scamJourney: string[]
  geography: string[]
  evidenceConfidence: number
  currentStatus: string
  recommendedAction: string
}

export const mockNetworks: NetworkEntry[] = [
  {
    id: "NET-001",
    name: "Tech Support Cluster A",
    scamFamily: "tech-support",
    indicatorCount: 47,
    caseCount: 890,
    infrastructure: ["15 domains", "23 phone numbers", "4 email domains", "2 RDP infrastructure clusters"],
    firstSeen: "2024-03-01",
    lastSeen: "2026-04-30",
    takedownStatus: "partial",
    riskLevel: "critical",
    overview: "One of the highest-volume tech support fraud networks targeting English-speaking populations. Operates call centres in India with US-routed VOIP numbers. Impersonates Microsoft, Norton, McAfee, and Amazon.",
    scamJourney: ["Victim visits legitimate site, served malicious ad with fake virus alert", "Pop-up displays toll-free number — victim calls", "Agent claims to be from Microsoft Technical Support", "Victim directed to install AnyDesk or TeamViewer", "Agent displays fake diagnostic tools showing 'infections'", "Victim pays $299–$999 for 'virus removal' or 'support plan'", "Bank details captured; secondary fraud follows"],
    geography: ["India (operations)", "United States (primary targets)", "Canada", "United Kingdom", "Australia"],
    evidenceConfidence: 96,
    currentStatus: "Active — reduced capacity following partial domain seizures in January 2026",
    recommendedAction: "Do not call phone numbers shown in pop-up browser alerts. Legitimate companies do not cold-call about computer viruses.",
  },
  {
    id: "NET-002",
    name: "Romance Crisis Monetization Network",
    scamFamily: "romance",
    indicatorCount: 31,
    caseCount: 412,
    infrastructure: ["8 fake personas", "5 crypto wallets", "3 fake investment platforms", "WhatsApp and Telegram infrastructure"],
    firstSeen: "2024-09-01",
    lastSeen: "2026-04-29",
    takedownStatus: "in-progress",
    riskLevel: "critical",
    overview: "Pig-butchering romance fraud network targeting singles aged 45-70 across dating apps and social media. Fake romantic relationships cultivated over weeks before victims are coached into crypto investments on fraudulent platforms.",
    scamJourney: ["Fake profile initiates contact on dating app or Instagram", "Romance cultivated over 4-8 weeks via messaging apps", "Scammer shares 'investment success story'", "Victim directed to fake crypto platform", "Small initial deposit allowed to 'grow'", "Victim encouraged to deposit larger sums", "Platform blocks withdrawals; victim asked for 'tax payment'", "Contact ceases after maximum extraction"],
    geography: ["Southeast Asia (operations)", "United States", "United Kingdom", "Australia", "Canada"],
    evidenceConfidence: 88,
    currentStatus: "Active — new personas created regularly to replace flagged profiles",
    recommendedAction: "Never send money to someone you have only met online. Reverse image search all profile photos.",
  },
  {
    id: "NET-003",
    name: "Sextortion Recovery Re-Exploitation Cluster",
    scamFamily: "sextortion",
    indicatorCount: 19,
    caseCount: 187,
    infrastructure: ["6 recovery domains", "4 fake Facebook groups", "3 email addresses", "Telegram channels"],
    firstSeen: "2025-02-01",
    lastSeen: "2026-04-25",
    takedownStatus: "in-progress",
    riskLevel: "high",
    overview: "Secondary exploitation network that targets victims of prior sextortion scams. Poses as recovery specialists, law enforcement liaisons, or victim support groups. Extracts additional payments under the guise of recovering lost funds or prosecuting original scammers.",
    scamJourney: ["Victim of prior sextortion is contacted by 'recovery specialist'", "Operator claims to have identified original scammer", "Victim asked to pay upfront 'processing fee'", "Additional fees requested as 'case progresses'", "No recovery is ever provided"],
    geography: ["West Africa (operations)", "United Kingdom (primary targets)", "United States", "Canada"],
    evidenceConfidence: 82,
    currentStatus: "Active — Facebook groups regularly recreated after removal",
    recommendedAction: "Legitimate recovery agencies do not charge upfront fees. No service can guarantee recovery of scam losses.",
  },
  {
    id: "NET-004",
    name: "Gift Card / Crypto Coaching Ring",
    scamFamily: "gift-card",
    indicatorCount: 28,
    caseCount: 334,
    infrastructure: ["12 VOIP numbers", "6 fake company names", "5 crypto wallets", "Email campaigns"],
    firstSeen: "2024-11-01",
    lastSeen: "2026-04-28",
    takedownStatus: "pending",
    riskLevel: "high",
    overview: "Network combining gift card and cryptocurrency fraud. Initially requests gift card payments as 'government fees' or 'security deposits', then pivots to crypto coaching schemes for larger extraction.",
    scamJourney: ["Cold call impersonating IRS, Social Security, or Medicare", "Victim told they owe tax or face arrest", "Payment demanded via gift cards", "If victim pays, scammer returns as 'crypto recovery specialist'", "Victim directed to crypto platform for 'reimbursement'", "Larger crypto extraction follows"],
    geography: ["South Asia (operations)", "United States (primary targets)", "Canada"],
    evidenceConfidence: 79,
    currentStatus: "Active — high volume of new campaigns following US tax season",
    recommendedAction: "The IRS never demands payment by gift card. No government agency requests cryptocurrency payments.",
  },
  {
    id: "NET-005",
    name: "Fake Bank Safe-Account Impersonation Cluster",
    scamFamily: "bank-impersonation",
    indicatorCount: 22,
    caseCount: 298,
    infrastructure: ["9 domains", "7 phone numbers", "SMS spoofing infrastructure", "3 call centres"],
    firstSeen: "2025-01-01",
    lastSeen: "2026-04-30",
    takedownStatus: "in-progress",
    riskLevel: "critical",
    overview: "Authorised push payment (APP) fraud network targeting UK, Australian, and US bank customers. Impersonates bank fraud departments and instructs victims to move funds to 'safe accounts' controlled by the network.",
    scamJourney: ["Victim receives spoofed SMS appearing to come from their bank", "Follow-up call from 'fraud department'", "Told their account has been compromised by an insider", "Instructed to transfer funds to 'temporary safe account'", "'Safe account' is controlled by the network", "Funds immediately laundered through multiple mule accounts"],
    geography: ["Eastern Europe (operations)", "United Kingdom (primary targets)", "Australia", "United States"],
    evidenceConfidence: 91,
    currentStatus: "Active — new spoofing infrastructure deployed February 2026",
    recommendedAction: "Your bank will never ask you to move money to a 'safe account'. Always call the number on the back of your card.",
  },
]

export interface AlertEntry {
  id: string
  title: string
  severity: "critical" | "high" | "medium"
  scamFamily: ScamFamily
  indicators: string[]
  summary: string
  dateVerified: string
  recommendedAction: string
  linkedNetwork?: string
}

export const mockAlerts: AlertEntry[] = [
  {
    id: "ALERT-001",
    title: "New Fake Microsoft Refund Campaign — High Volume",
    severity: "critical",
    scamFamily: "tech-support",
    indicators: ["microsoft-refund-portal.com", "+1-888-302-7164", "refund@ms-support.net"],
    summary: "New wave of unsolicited calls offering Microsoft refunds for discontinued products. Victims directed to fake portal and instructed to log in to banking apps for 'refund verification'. Screen-share used to capture credentials.",
    dateVerified: "2026-05-08",
    recommendedAction: "Do not call back unsolicited refund offers. Microsoft does not proactively call customers about refunds. Hang up and call Microsoft directly using official contact page.",
    linkedNetwork: "Tech Support Cluster A",
  },
  {
    id: "ALERT-002",
    title: "Bank Safe-Account Impersonation Wave — UK NatWest and Barclays",
    severity: "critical",
    scamFamily: "bank-impersonation",
    indicators: ["secure-natwest-transfer.com", "+44-800-328-1221", "natwest-fraud-team.co.uk"],
    summary: "Surge in APP fraud impersonating NatWest and Barclays fraud departments. SMS spoofing makes messages appear in genuine bank thread. Victims instructed to urgently transfer savings to 'protected' accounts.",
    dateVerified: "2026-05-06",
    recommendedAction: "Your bank will never ask you to move money to protect it. Hang up and call the number on the back of your card.",
    linkedNetwork: "Fake Bank Safe-Account Impersonation Cluster",
  },
  {
    id: "ALERT-003",
    title: "Recovery Scam Targeting Prior Sextortion Victims",
    severity: "high",
    scamFamily: "recovery",
    indicators: ["sextortion-victims-help.org", "recovery@victim-support-unit.com"],
    summary: "Victims of prior sextortion scams are being contacted by a 'victim support unit' offering to identify and prosecute original scammers. Upfront fees of $200–$800 collected. No recovery is provided.",
    dateVerified: "2026-05-04",
    recommendedAction: "Legitimate victim support organisations do not charge fees. Report to Action Fraud (UK) or IC3 (US).",
    linkedNetwork: "Sextortion Recovery Re-Exploitation Cluster",
  },
  {
    id: "ALERT-004",
    title: "New Crypto Wallet Cluster — Gift Card to Crypto Pivot",
    severity: "high",
    scamFamily: "crypto",
    indicators: ["bc1q5h7rp8x2z4...", "invest-secure-24.io", "+1-844-209-3317"],
    summary: "IRS and Social Security impersonation calls demanding initial gift card payment, followed by 'crypto reimbursement' pivot. Victims directed to fraudulent exchange. New wallet cluster identified across 41 cases.",
    dateVerified: "2026-05-02",
    recommendedAction: "The IRS never accepts gift cards. No government agency reimburses via cryptocurrency. Report to FTC and IC3.",
    linkedNetwork: "Gift Card / Crypto Coaching Ring",
  },
  {
    id: "ALERT-005",
    title: "Deepfake CEO Voice Fraud — Enterprise Targeting",
    severity: "high",
    scamFamily: "deepfake",
    indicators: ["finance@corporategroup-secure.com", "voicemail-secure-transfers.com"],
    summary: "AI-generated voice deepfakes impersonating company CEOs in finance department calls. Employees instructed to make urgent wire transfers for 'confidential acquisitions'. Three confirmed enterprise losses in Q1 2026.",
    dateVerified: "2026-04-29",
    recommendedAction: "Always verify unusual financial transfer requests via a separate confirmed channel. Establish verbal code phrases for out-of-band confirmation.",
  },
  {
    id: "ALERT-006",
    title: "Romance Pig-Butchering Surge — New Dating App Personas",
    severity: "medium",
    scamFamily: "romance",
    indicators: ["davidchen_forex_trader (Instagram)", "invest-my-future.io"],
    summary: "New batch of fake romantic personas identified across Hinge, Bumble, and Instagram. Persona pattern: claims Singapore-based wealth manager or oil platform engineer. Targets aged 45-70. Pivot to crypto investment after 3-6 weeks.",
    dateVerified: "2026-04-27",
    recommendedAction: "Reverse image search all profile photos. Never send money to someone you have only met online.",
    linkedNetwork: "Romance Crisis Monetization Network",
  },
]

export interface TakedownEntry {
  id: string
  indicator: string
  type: IndicatorType
  actionTaken: string
  actionDate: string
  scamFamily: ScamFamily
  publicImpact: string
  linkedAlert?: string
  linkedNetwork?: string
  status: "completed" | "partial" | "in-progress"
}

export const mockTakedowns: TakedownEntry[] = [
  { id: "TD-001", indicator: "microsoft-support-helpdesk.com", type: "domain", actionTaken: "Domain seized by registrar following evidence submission", actionDate: "2026-01-04", scamFamily: "tech-support", publicImpact: "342 active scam sessions disrupted. Estimated $180K in losses prevented.", linkedAlert: "ALERT-001", linkedNetwork: "Tech Support Cluster A", status: "completed" },
  { id: "TD-002", indicator: "facebook.com/groups/official-vigiscam-support-2024", type: "fake-support-page", actionTaken: "Group removed by Meta following coordinated evidence report", actionDate: "2025-12-22", scamFamily: "recovery", publicImpact: "1,200+ members protected from secondary exploitation.", linkedNetwork: "Sextortion Recovery Re-Exploitation Cluster", status: "completed" },
  { id: "TD-003", indicator: "secure-account-transfer.barclays-uk.com", type: "domain", actionTaken: "Domain taken offline by hosting provider; referred to NCSC", actionDate: "2026-01-30", scamFamily: "bank-impersonation", publicImpact: "129 APP fraud cases linked. Estimated £2.3M in attempted fraud disrupted.", linkedNetwork: "Fake Bank Safe-Account Impersonation Cluster", status: "completed" },
  { id: "TD-004", indicator: "windows-security-alert.com", type: "domain", actionTaken: "Domain suspended following ICANN abuse report", actionDate: "2025-11-15", scamFamily: "tech-support", publicImpact: "87 verified cases. Fake browser lock-screen campaigns disrupted.", linkedNetwork: "Tech Support Cluster A", status: "completed" },
  { id: "TD-005", indicator: "secure-natwest-transfer.com", type: "domain", actionTaken: "Hosting suspended; referred to UK FCA and NCSC", actionDate: "2026-03-10", scamFamily: "bank-impersonation", publicImpact: "64 APP fraud cases. Domain removed; SMS spoofing infrastructure under investigation.", linkedAlert: "ALERT-002", linkedNetwork: "Fake Bank Safe-Account Impersonation Cluster", status: "partial" },
  { id: "TD-006", indicator: "refund-recovery-specialists.net", type: "domain", actionTaken: "ICANN abuse complaint filed; registrar review in progress", actionDate: "2026-04-02", scamFamily: "recovery", publicImpact: "Pending — 87 cases linked. Takedown expected within 30 days.", linkedNetwork: "Sextortion Recovery Re-Exploitation Cluster", status: "in-progress" },
]

// Verification Queue types and data
export type ReviewerDecision = "approve" | "reject" | "request-more-evidence"

export interface VerificationQueueItem {
  id: string
  submissionId: string
  indicatorValue: string
  indicatorType: IndicatorType
  suspectedScamFamily: ScamFamily
  reviewerConfidence: number
  repeatedReportCount: number
  scamzyNetworkMatch: string | null
  a1ScamshieldScriptMatch: boolean
  linkedEntities: string[]
  publicSafeReviewed: boolean
  notes?: string
  decision?: ReviewerDecision
}

export const mockVerificationQueue: VerificationQueueItem[] = [
  {
    id: "VQ-001",
    submissionId: "SUB-2847",
    indicatorValue: "support-microsoft-365.com",
    indicatorType: "domain",
    suspectedScamFamily: "tech-support",
    reviewerConfidence: 92,
    repeatedReportCount: 14,
    scamzyNetworkMatch: "Tech Support Cluster A",
    a1ScamshieldScriptMatch: true,
    linkedEntities: ["+1-888-555-0142", "microsoft-support-helpdesk.com"],
    publicSafeReviewed: true,
    notes: "Clear network match. Multiple corroborating reports with consistent script pattern.",
  },
  {
    id: "VQ-002",
    submissionId: "SUB-2851",
    indicatorValue: "+44-800-123-4567",
    indicatorType: "phone",
    suspectedScamFamily: "bank-impersonation",
    reviewerConfidence: 78,
    repeatedReportCount: 6,
    scamzyNetworkMatch: "Fake Bank Safe-Account Impersonation Cluster",
    a1ScamshieldScriptMatch: false,
    linkedEntities: ["secure-natwest-transfer.com"],
    publicSafeReviewed: false,
    notes: "Awaiting public-safe review. Potential victim identifiers in submission.",
  },
  {
    id: "VQ-003",
    submissionId: "SUB-2853",
    indicatorValue: "invest-my-future.io",
    indicatorType: "domain",
    suspectedScamFamily: "romance",
    reviewerConfidence: 65,
    repeatedReportCount: 3,
    scamzyNetworkMatch: null,
    a1ScamshieldScriptMatch: false,
    linkedEntities: [],
    publicSafeReviewed: true,
    decision: "request-more-evidence",
  },
]

// Public Registry types and data
export type VisibilityState = "private-only" | "approved-public-safe" | "published" | "unpublished" | "removed-after-correction"
export type PublicBadge = "Verified Malicious" | "High-Risk Verified" | "Officially Reported" | "Takedown Confirmed"

export const visibilityStateLabels: Record<VisibilityState, string> = {
  "private-only": "Private Only",
  "approved-public-safe": "Approved — Public Safe",
  "published": "Published",
  "unpublished": "Unpublished",
  "removed-after-correction": "Removed After Correction",
}

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

export const mockPublicDrafts: PublicRegistryDraft[] = [
  {
    id: "PUB-001",
    indicatorValue: "microsoft-support-helpdesk.com",
    indicatorType: "domain",
    scamFamily: "tech-support",
    publicBadge: "Takedown Confirmed",
    visibilityState: "published",
    publicSafeSummary: "Fake Microsoft support domain used to harvest remote access credentials. Deceptive pop-ups directed victims to call a toll-free number. Domain seized January 2026.",
    redactedFields: ["victim_names", "case_ids", "internal_notes"],
    publishedBy: "analyst@vigiscam.com",
    publishedAt: "2026-01-15T10:30:00Z",
    lastEditedBy: "senior-analyst@vigiscam.com",
    lastEditedAt: "2026-01-14T16:45:00Z",
  },
  {
    id: "PUB-002",
    indicatorValue: "+1-877-288-4101",
    indicatorType: "phone",
    scamFamily: "tech-support",
    publicBadge: "Verified Malicious",
    visibilityState: "approved-public-safe",
    publicSafeSummary: "High-volume tech support scam phone number. Operators impersonate Microsoft, Norton, and McAfee agents. Victims instructed to install remote access software.",
    redactedFields: ["victim_names", "financial_details", "internal_notes"],
    lastEditedBy: "analyst@vigiscam.com",
    lastEditedAt: "2026-04-28T09:15:00Z",
  },
  {
    id: "PUB-003",
    indicatorValue: "secure-natwest-transfer.com",
    indicatorType: "domain",
    scamFamily: "bank-impersonation",
    publicBadge: "High-Risk Verified",
    visibilityState: "unpublished",
    publicSafeSummary: "Domain impersonating NatWest Bank used in APP fraud. Victims told their account was compromised and directed to transfer funds.",
    redactedFields: ["victim_names", "financial_details", "case_ids"],
    publishedBy: "analyst@vigiscam.com",
    publishedAt: "2026-03-01T14:00:00Z",
    unpublishedAt: "2026-03-15T11:30:00Z",
    lastEditedBy: "legal@vigiscam.com",
    lastEditedAt: "2026-03-15T11:30:00Z",
  },
]

// Takedown Status types and data
export interface TakedownStatusRecord {
  id: string
  indicator: string
  indicatorType: IndicatorType
  scamFamily: ScamFamily
  linkedNetwork?: string
  currentStatus: "under-review" | "action-filed" | "confirmed" | "partial" | "stalled"
  actionType: string
  filedDate: string
  lastUpdate: string
  notes: string
  publiclyVisible: boolean
}

export const mockTakedownStatus: TakedownStatusRecord[] = [
  {
    id: "TK-001",
    indicator: "microsoft-support-helpdesk.com",
    indicatorType: "domain",
    scamFamily: "tech-support",
    linkedNetwork: "Tech Support Cluster A",
    currentStatus: "confirmed",
    actionType: "Domain registrar abuse report",
    filedDate: "2025-12-15",
    lastUpdate: "2026-01-04",
    notes: "Domain successfully seized by registrar. Confirmed offline.",
    publiclyVisible: true,
  },
  {
    id: "TK-002",
    indicator: "secure-natwest-transfer.com",
    indicatorType: "domain",
    scamFamily: "bank-impersonation",
    linkedNetwork: "Fake Bank Safe-Account Impersonation Cluster",
    currentStatus: "partial",
    actionType: "Hosting provider abuse report + NCSC referral",
    filedDate: "2026-02-20",
    lastUpdate: "2026-03-10",
    notes: "Hosting suspended. SMS spoofing infrastructure still active.",
    publiclyVisible: true,
  },
  {
    id: "TK-003",
    indicator: "refund-recovery-specialists.net",
    indicatorType: "domain",
    scamFamily: "recovery",
    linkedNetwork: "Sextortion Recovery Re-Exploitation Cluster",
    currentStatus: "action-filed",
    actionType: "ICANN abuse complaint",
    filedDate: "2026-04-02",
    lastUpdate: "2026-04-15",
    notes: "Registrar review in progress. Expected resolution within 30 days.",
    publiclyVisible: false,
  },
]

// Submissions types and data
export type SubmissionStatus = "new" | "under-review" | "needs-more-evidence" | "verified" | "rejected"

export const submissionStatusLabels: Record<SubmissionStatus, string> = {
  "new": "New",
  "under-review": "Under Review",
  "needs-more-evidence": "Needs More Evidence",
  "verified": "Verified",
  "rejected": "Rejected",
}

export interface Submission {
  id: string
  submittedAt: string
  indicatorValue: string
  indicatorType: IndicatorType
  suspectedScamFamily: ScamFamily
  status: SubmissionStatus
  submitterType: "victim" | "professional" | "anonymous"
  hasEvidence: boolean
  priority: "high" | "medium" | "low"
  summary: string
}

export const mockSubmissions: Submission[] = [
  {
    id: "SUB-2847",
    submittedAt: "2026-05-09T14:30:00Z",
    indicatorValue: "support-microsoft-365.com",
    indicatorType: "domain",
    suspectedScamFamily: "tech-support",
    status: "under-review",
    submitterType: "victim",
    hasEvidence: true,
    priority: "high",
    summary: "Received pop-up claiming computer infected. Called number and gave remote access.",
  },
  {
    id: "SUB-2848",
    submittedAt: "2026-05-09T12:15:00Z",
    indicatorValue: "+1-888-555-0199",
    indicatorType: "phone",
    suspectedScamFamily: "bank-impersonation",
    status: "new",
    submitterType: "professional",
    hasEvidence: true,
    priority: "high",
    summary: "Call center impersonating Chase fraud department. Multiple client reports.",
  },
  {
    id: "SUB-2849",
    submittedAt: "2026-05-08T09:45:00Z",
    indicatorValue: "invest-crypto-profits.io",
    indicatorType: "domain",
    suspectedScamFamily: "crypto",
    status: "needs-more-evidence",
    submitterType: "anonymous",
    hasEvidence: false,
    priority: "medium",
    summary: "Suspicious crypto platform. Unable to withdraw funds.",
  },
]

// ============================================================
// SCAMZY™ LIVE INTELLIGENCE ENGINE — Mock Data
// ============================================================

export type SignalStatus =
  | "unverified-report"
  | "suspicious-signal"
  | "pattern-match"
  | "under-review"
  | "high-risk-indicator"
  | "verified-scam-intelligence"
  | "public-safe-alert"
  | "archived"

export type SignalSourceType =
  | "user-report"
  | "public-advisory"
  | "verified-news"
  | "partner-report"
  | "bank-business-report"
  | "community-report"
  | "scam-registry-match"
  | "investigator-submission"

export type IntelligenceScamCategory =
  | "tech-support"
  | "romance"
  | "gift-card"
  | "crypto"
  | "government-impersonation"
  | "bank-impersonation"
  | "marketplace"
  | "fake-job"
  | "remote-access"
  | "donation"
  | "business-email"

export const signalStatusLabels: Record<SignalStatus, string> = {
  "unverified-report": "Unverified Report",
  "suspicious-signal": "Suspicious Signal",
  "pattern-match": "Pattern Match",
  "under-review": "Under Review",
  "high-risk-indicator": "High-Risk Indicator",
  "verified-scam-intelligence": "Verified Scam Intelligence",
  "public-safe-alert": "Public-Safe Alert",
  "archived": "Archived",
}

export const signalSourceLabels: Record<SignalSourceType, string> = {
  "user-report": "User Report",
  "public-advisory": "Public Advisory",
  "verified-news": "Verified News",
  "partner-report": "Partner Report",
  "bank-business-report": "Bank/Business Report",
  "community-report": "Community Report",
  "scam-registry-match": "Scam Registry Match",
  "investigator-submission": "Investigator Submission",
}

export const intelligenceScamCategoryLabels: Record<IntelligenceScamCategory, string> = {
  "tech-support": "Tech Support Scam",
  "romance": "Romance Scam",
  "gift-card": "Gift Card Scam",
  "crypto": "Crypto Scam",
  "government-impersonation": "Government Impersonation",
  "bank-impersonation": "Bank Impersonation",
  "marketplace": "Marketplace Scam",
  "fake-job": "Fake Job Scam",
  "remote-access": "Remote Access Scam",
  "donation": "Donation Scam",
  "business-email": "Business Email Scam",
}

export interface ScamSignal {
  id: string
  source: SignalSourceType
  category: IntelligenceScamCategory
  indicator: string
  confidence: number
  status: SignalStatus
  lastSeen: string
  geography: string
  linkedCluster?: string
  evidenceSummary: string
  reviewNotes?: string
  riskScore: number
  publicSafe: boolean
}

export const mockScamSignals: ScamSignal[] = [
  {
    id: "SIG-001",
    source: "user-report",
    category: "tech-support",
    indicator: "support-win365.example.com",
    confidence: 91,
    status: "verified-scam-intelligence",
    lastSeen: "2026-05-15",
    geography: "US / India-operated",
    linkedCluster: "Fake Microsoft Support Remote Access Cluster",
    evidenceSummary: "147 matching reports with remote access pressure language and AnyDesk instructions.",
    riskScore: 94,
    publicSafe: true,
  },
  {
    id: "SIG-002",
    source: "bank-business-report",
    category: "bank-impersonation",
    indicator: "+1-888-555-0198",
    confidence: 84,
    status: "high-risk-indicator",
    lastSeen: "2026-05-14",
    geography: "UK / Eastern Europe-operated",
    linkedCluster: "Fake Bank Fraud Department Call Cluster",
    evidenceSummary: "23 reports of callers impersonating Chase fraud team with safe-account transfer instructions.",
    riskScore: 88,
    publicSafe: false,
  },
  {
    id: "SIG-003",
    source: "investigator-submission",
    category: "crypto",
    indicator: "coinvest-returns.example.io",
    confidence: 78,
    status: "pattern-match",
    lastSeen: "2026-05-13",
    geography: "Southeast Asia / Global",
    linkedCluster: "Romance Crypto Investment Grooming Cluster",
    evidenceSummary: "Script patterns match known pig-butchering sequences. 41 corroborating reports.",
    riskScore: 81,
    publicSafe: false,
  },
  {
    id: "SIG-004",
    source: "public-advisory",
    category: "government-impersonation",
    indicator: "irs-refund-secure.example.net",
    confidence: 96,
    status: "public-safe-alert",
    lastSeen: "2026-05-15",
    geography: "US-targeted / South Asia-operated",
    linkedCluster: "IRS Urgency Payment Threat Cluster",
    evidenceSummary: "CISA advisory corroborated by 312 user reports. Domain mimics irs.gov with urgency payment portal.",
    riskScore: 97,
    publicSafe: true,
  },
  {
    id: "SIG-005",
    source: "user-report",
    category: "romance",
    indicator: "alex_investor_sg (Instagram)",
    confidence: 62,
    status: "under-review",
    lastSeen: "2026-05-12",
    geography: "Southeast Asia / US-targeted",
    linkedCluster: "Romance Crypto Investment Grooming Cluster",
    evidenceSummary: "8 reports of romantic grooming over 4-6 weeks followed by crypto investment pivot.",
    riskScore: 67,
    publicSafe: false,
  },
  {
    id: "SIG-006",
    source: "community-report",
    category: "marketplace",
    indicator: "payment-confirm-fb.example.com",
    confidence: 71,
    status: "suspicious-signal",
    lastSeen: "2026-05-11",
    geography: "US / Canada",
    linkedCluster: "Facebook Marketplace Deposit Scam Cluster",
    evidenceSummary: "Fake payment confirmation pages used in Facebook Marketplace car and furniture scams.",
    riskScore: 74,
    publicSafe: false,
  },
  {
    id: "SIG-007",
    source: "partner-report",
    category: "tech-support",
    indicator: "anydesk-support-session.example.org",
    confidence: 88,
    status: "verified-scam-intelligence",
    lastSeen: "2026-05-14",
    geography: "India / US, UK, AU-targeted",
    linkedCluster: "Fake Microsoft Support Remote Access Cluster",
    evidenceSummary: "Domain used to deliver fake AnyDesk support instructions. 89 partner-corroborated cases.",
    riskScore: 92,
    publicSafe: true,
  },
  {
    id: "SIG-008",
    source: "scam-registry-match",
    category: "bank-impersonation",
    indicator: "secure-transfer.natwest-verify.example.co.uk",
    confidence: 93,
    status: "verified-scam-intelligence",
    lastSeen: "2026-05-15",
    geography: "UK-targeted / Eastern Europe-operated",
    linkedCluster: "Fake Bank Fraud Department Call Cluster",
    evidenceSummary: "Domain pattern matches active cluster. 156 APP fraud cases linked to this subdomain pattern.",
    riskScore: 95,
    publicSafe: true,
  },
  {
    id: "SIG-009",
    source: "user-report",
    category: "fake-job",
    indicator: "remote-jobs-verified.example.biz",
    confidence: 55,
    status: "unverified-report",
    lastSeen: "2026-05-10",
    geography: "US / Nigeria-operated",
    linkedCluster: undefined,
    evidenceSummary: "Single report of fake remote data entry job requiring upfront equipment payment.",
    riskScore: 58,
    publicSafe: false,
  },
  {
    id: "SIG-010",
    source: "verified-news",
    category: "gift-card",
    indicator: "+1-844-555-0177",
    confidence: 87,
    status: "high-risk-indicator",
    lastSeen: "2026-05-13",
    geography: "US-targeted / South Asia-operated",
    linkedCluster: "IRS Urgency Payment Threat Cluster",
    evidenceSummary: "FTC bulletin matches 67 user reports. IRS impersonation with gift card payment demand.",
    riskScore: 89,
    publicSafe: true,
  },
]

export interface ScamCluster {
  id: string
  name: string
  category: IntelligenceScamCategory
  linkedPhones: number
  linkedEmails: number
  linkedDomains: number
  linkedWallets: number
  matchingScripts: number
  confidenceLevel: number
  trend: "rising" | "stable" | "declining"
  recommendedAction: string
  description: string
  lastUpdated: string
}

export const mockScamClusters: ScamCluster[] = [
  {
    id: "CLU-001",
    name: "Fake Microsoft Support Remote Access Cluster",
    category: "tech-support",
    linkedPhones: 23,
    linkedEmails: 8,
    linkedDomains: 15,
    linkedWallets: 0,
    matchingScripts: 4,
    confidenceLevel: 96,
    trend: "rising",
    recommendedAction: "Promote top 5 domains and 3 phone numbers to Verified Scam Intelligence. File takedown requests.",
    description: "High-volume cluster impersonating Microsoft, Norton, and Windows support. Operates remote access fraud via AnyDesk and TeamViewer. Scripts include 'your computer has been compromised' and 'do not tell anyone'.",
    lastUpdated: "2026-05-15",
  },
  {
    id: "CLU-002",
    name: "IRS Urgency Payment Threat Cluster",
    category: "government-impersonation",
    linkedPhones: 19,
    linkedEmails: 4,
    linkedDomains: 7,
    linkedWallets: 3,
    matchingScripts: 6,
    confidenceLevel: 91,
    trend: "rising",
    recommendedAction: "Coordinate with FTC and IRS for official advisory. Escalate top indicators to Public-Safe Alert.",
    description: "IRS and Social Security impersonation cluster using urgency threats ('arrest warrant', 'account frozen'). Pivots from gift card to crypto payment demands. Peaks around US tax season.",
    lastUpdated: "2026-05-14",
  },
  {
    id: "CLU-003",
    name: "Romance Crypto Investment Grooming Cluster",
    category: "romance",
    linkedPhones: 7,
    linkedEmails: 12,
    linkedDomains: 9,
    linkedWallets: 14,
    matchingScripts: 8,
    confidenceLevel: 88,
    trend: "stable",
    recommendedAction: "Monitor new wallet addresses. Coordinate takedown of 3 fraudulent investment platforms.",
    description: "Pig-butchering romance cluster operating across dating apps and Instagram. Fake Singapore-based investors cultivate relationships over 4-8 weeks before directing victims to fraudulent crypto platforms.",
    lastUpdated: "2026-05-13",
  },
  {
    id: "CLU-004",
    name: "Facebook Marketplace Deposit Scam Cluster",
    category: "marketplace",
    linkedPhones: 11,
    linkedEmails: 6,
    linkedDomains: 4,
    linkedWallets: 2,
    matchingScripts: 3,
    confidenceLevel: 79,
    trend: "stable",
    recommendedAction: "Submit fake payment domain reports to Meta Trust & Safety team.",
    description: "Marketplace fraud cluster targeting high-value item listings (vehicles, furniture, electronics). Sellers and buyers targeted with fake payment portals and deposit requests.",
    lastUpdated: "2026-05-11",
  },
  {
    id: "CLU-005",
    name: "Fake Bank Fraud Department Call Cluster",
    category: "bank-impersonation",
    linkedPhones: 17,
    linkedEmails: 5,
    linkedDomains: 9,
    linkedWallets: 0,
    matchingScripts: 5,
    confidenceLevel: 93,
    trend: "rising",
    recommendedAction: "Share intelligence with UK FCA and US CFPB. Escalate spoofing infrastructure to telecom providers.",
    description: "APP fraud cluster impersonating Chase, NatWest, Barclays, and Wells Fargo fraud departments. SMS spoofing inserts messages into genuine bank threads. Safe-account transfer instruction pattern.",
    lastUpdated: "2026-05-15",
  },
]

export interface DetectionRule {
  id: string
  name: string
  category: IntelligenceScamCategory
  triggerType: "phrase-match" | "url-pattern" | "behavioral" | "network-graph" | "acoustic"
  updatedFrom: string
  status: "active" | "testing" | "deprecated"
  lastUpdated: string
  riskWeight: number
}

export const mockDetectionRules: DetectionRule[] = [
  {
    id: "RULE-001",
    name: "Remote Access Pressure Phrase Set v7",
    category: "tech-support",
    triggerType: "phrase-match",
    updatedFrom: "CLU-001 script analysis",
    status: "active",
    lastUpdated: "2026-05-14",
    riskWeight: 88,
  },
  {
    id: "RULE-002",
    name: "IRS Urgency Domain Pattern v4",
    category: "government-impersonation",
    triggerType: "url-pattern",
    updatedFrom: "CLU-002 domain clustering",
    status: "active",
    lastUpdated: "2026-05-13",
    riskWeight: 92,
  },
  {
    id: "RULE-003",
    name: "Gift Card Payment Instruction Language",
    category: "gift-card",
    triggerType: "phrase-match",
    updatedFrom: "SIG-010 field analysis",
    status: "active",
    lastUpdated: "2026-05-10",
    riskWeight: 85,
  },
  {
    id: "RULE-004",
    name: "Pig-Butchering Romance Script Sequence",
    category: "romance",
    triggerType: "behavioral",
    updatedFrom: "CLU-003 behavioral cluster",
    status: "testing",
    lastUpdated: "2026-05-12",
    riskWeight: 76,
  },
  {
    id: "RULE-005",
    name: "Safe-Account Transfer Phrase Detector",
    category: "bank-impersonation",
    triggerType: "phrase-match",
    updatedFrom: "CLU-005 script update",
    status: "active",
    lastUpdated: "2026-05-15",
    riskWeight: 94,
  },
  {
    id: "RULE-006",
    name: "Fake Investment Platform URL Pattern",
    category: "crypto",
    triggerType: "url-pattern",
    updatedFrom: "CLU-003 domain set",
    status: "active",
    lastUpdated: "2026-05-11",
    riskWeight: 81,
  },
  {
    id: "RULE-007",
    name: "AnyDesk/TeamViewer Social Engineering Script",
    category: "remote-access",
    triggerType: "phrase-match",
    updatedFrom: "CLU-001 phrase expansion",
    status: "active",
    lastUpdated: "2026-05-14",
    riskWeight: 90,
  },
  {
    id: "RULE-008",
    name: "CEO Voice Clone Transfer Request",
    category: "business-email",
    triggerType: "acoustic",
    updatedFrom: "ALERT-005 acoustic analysis",
    status: "testing",
    lastUpdated: "2026-05-09",
    riskWeight: 87,
  },
]

export interface RegistryReviewCandidate {
  id: string
  indicatorType: IndicatorType
  indicatorValue: string
  evidenceCount: number
  confidence: number
  reviewStatus: "pending" | "in-review" | "approved" | "rejected"
  publicSafe: boolean
  linkedCluster?: string
  category: IntelligenceScamCategory
}

export const mockRegistryReviewQueue: RegistryReviewCandidate[] = [
  {
    id: "RRQ-001",
    indicatorType: "domain",
    indicatorValue: "support-win365.example.com",
    evidenceCount: 147,
    confidence: 91,
    reviewStatus: "approved",
    publicSafe: true,
    linkedCluster: "Fake Microsoft Support Remote Access Cluster",
    category: "tech-support",
  },
  {
    id: "RRQ-002",
    indicatorType: "phone",
    indicatorValue: "+1-888-555-0198",
    evidenceCount: 23,
    confidence: 84,
    reviewStatus: "in-review",
    publicSafe: false,
    linkedCluster: "Fake Bank Fraud Department Call Cluster",
    category: "bank-impersonation",
  },
  {
    id: "RRQ-003",
    indicatorType: "domain",
    indicatorValue: "irs-refund-secure.example.net",
    evidenceCount: 312,
    confidence: 96,
    reviewStatus: "approved",
    publicSafe: true,
    linkedCluster: "IRS Urgency Payment Threat Cluster",
    category: "government-impersonation",
  },
  {
    id: "RRQ-004",
    indicatorType: "wallet",
    indicatorValue: "bc1q7example3n9k2f4p8r1z5y6...",
    evidenceCount: 41,
    confidence: 78,
    reviewStatus: "pending",
    publicSafe: false,
    linkedCluster: "Romance Crypto Investment Grooming Cluster",
    category: "crypto",
  },
  {
    id: "RRQ-005",
    indicatorType: "domain",
    indicatorValue: "payment-confirm-fb.example.com",
    evidenceCount: 18,
    confidence: 71,
    reviewStatus: "in-review",
    publicSafe: false,
    linkedCluster: "Facebook Marketplace Deposit Scam Cluster",
    category: "marketplace",
  },
  {
    id: "RRQ-006",
    indicatorType: "phone",
    indicatorValue: "+1-844-555-0177",
    evidenceCount: 67,
    confidence: 87,
    reviewStatus: "approved",
    publicSafe: true,
    linkedCluster: "IRS Urgency Payment Threat Cluster",
    category: "gift-card",
  },
]

export interface EvidenceEvent {
  id: string
  signalId: string
  eventType: "signal-collected" | "score-calculated" | "cluster-linked" | "review-performed" | "rule-updated" | "registry-candidate-created" | "registry-approved" | "registry-rejected"
  timestamp: string
  summary: string
  actor: string
}

export const mockEvidenceEvents: EvidenceEvent[] = [
  {
    id: "EVT-001",
    signalId: "SIG-001",
    eventType: "signal-collected",
    timestamp: "2026-05-15T08:12:00Z",
    summary: "Signal collected from 147 user reports via VIGISCAM™ client app.",
    actor: "SCAMZY™ Collector",
  },
  {
    id: "EVT-002",
    signalId: "SIG-001",
    eventType: "score-calculated",
    timestamp: "2026-05-15T08:13:45Z",
    summary: "Reliability score calculated: 91/100. Source credibility: high. Pattern strength: strong.",
    actor: "SCAMZY™ Scoring Engine",
  },
  {
    id: "EVT-003",
    signalId: "SIG-001",
    eventType: "cluster-linked",
    timestamp: "2026-05-15T08:14:10Z",
    summary: "Linked to CLU-001 (Fake Microsoft Support Remote Access Cluster) with 96% network match.",
    actor: "SCAMZY™ Cluster Engine",
  },
  {
    id: "EVT-004",
    signalId: "SIG-001",
    eventType: "review-performed",
    timestamp: "2026-05-15T09:30:00Z",
    summary: "Manual review completed. Indicator confirmed as scam infrastructure. Public-safe review passed.",
    actor: "analyst@vigiscam.com",
  },
  {
    id: "EVT-005",
    signalId: "SIG-001",
    eventType: "rule-updated",
    timestamp: "2026-05-15T09:45:00Z",
    summary: "Detection rule RULE-001 updated with 3 new phrase variants from this signal.",
    actor: "SCAMZY™ Rule Engine",
  },
  {
    id: "EVT-006",
    signalId: "SIG-001",
    eventType: "registry-candidate-created",
    timestamp: "2026-05-15T09:46:00Z",
    summary: "Registry candidate RRQ-001 created. Pending public-safe approval.",
    actor: "SCAMZY™ Registry Pipeline",
  },
  {
    id: "EVT-007",
    signalId: "SIG-001",
    eventType: "registry-approved",
    timestamp: "2026-05-15T10:00:00Z",
    summary: "Registry entry approved for public display. All victim data redacted. Public-safe criteria met.",
    actor: "senior-analyst@vigiscam.com",
  },
  {
    id: "EVT-008",
    signalId: "SIG-004",
    eventType: "signal-collected",
    timestamp: "2026-05-15T07:00:00Z",
    summary: "Signal collected from CISA public advisory + 312 corroborating user reports.",
    actor: "SCAMZY™ Collector",
  },
]

// Corrections & Appeals types and data
export type AppealStatus = "pending" | "under-review" | "upheld" | "changed" | "removed"

export interface CorrectionAppeal {
  id: string
  registryId: string
  indicatorValue: string
  indicatorType: IndicatorType
  appealType: "correction" | "removal" | "dispute"
  status: AppealStatus
  submittedAt: string
  submitterType: "subject" | "legal" | "platform"
  summary: string
  resolution?: string
  resolvedAt?: string
}

export const mockCorrectionsAppeals: CorrectionAppeal[] = [
  {
    id: "APP-001",
    registryId: "REG-007",
    indicatorValue: "secure-account-transfer.barclays-uk.com",
    indicatorType: "domain",
    appealType: "correction",
    status: "upheld",
    submittedAt: "2026-02-10T10:00:00Z",
    submitterType: "legal",
    summary: "Legal counsel for domain registrant claims domain was hijacked and client is not responsible.",
    resolution: "Evidence reviewed. Domain registration records confirm registrant purchased domain for malicious use. Appeal denied.",
    resolvedAt: "2026-02-20T16:30:00Z",
  },
  {
    id: "APP-002",
    registryId: "PUB-002",
    indicatorValue: "+1-877-288-4101",
    indicatorType: "phone",
    appealType: "removal",
    status: "pending",
    submittedAt: "2026-05-08T09:00:00Z",
    submitterType: "platform",
    summary: "Telecom provider claims number was recycled and new owner is legitimate business.",
  },
  {
    id: "APP-003",
    registryId: "REG-003",
    indicatorValue: "refund-recovery-specialists.net",
    indicatorType: "domain",
    appealType: "dispute",
    status: "under-review",
    submittedAt: "2026-04-28T14:15:00Z",
    submitterType: "subject",
    summary: "Domain owner disputes classification. Claims to be legitimate debt recovery service.",
  },
]
