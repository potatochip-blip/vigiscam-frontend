'use client'

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  Play, Pause, RotateCcw, Volume2, VolumeX, ChevronRight, AlertTriangle,
  Shield, ShieldAlert, ShieldCheck, ShieldX, Phone, PhoneOff, Monitor,
  Lock, Eye, Brain, Database, Network, Mic, Video, CheckCircle2,
  XCircle, Clock, Zap, Activity, Terminal, Radio, Users, ArrowRight,
  Fingerprint, Camera, Globe, AlertCircle
} from "lucide-react"

// Demo scenario types
type ScenarioId = "tech-support" | "romance" | "bank-impersonation" | "deepfake" | "crypto" | "recovery"

interface DemoStep {
  id: number
  timestamp: string
  phase: "initiation" | "detection" | "escalation" | "intervention" | "evidence"
  title: string
  description: string
  scammerDialogue?: string
  victimDialogue?: string
  detections: string[]
  activeModules: string[]
  threatScore: number
  alerts: string[]
  consoleOutputs: string[]
}

interface Scenario {
  id: ScenarioId
  title: string
  subtitle: string
  duration: string
  icon: React.ReactNode
  color: string
  steps: DemoStep[]
}

const SCENARIOS: Scenario[] = [
  {
    id: "tech-support",
    title: "Tech Support Scam",
    subtitle: "Remote access fraud detection",
    duration: "2:45",
    icon: <Monitor className="h-5 w-5" />,
    color: "border-primary bg-primary/10",
    steps: [
      {
        id: 1,
        timestamp: "00:00",
        phase: "initiation",
        title: "Call Initiated",
        description: "Incoming call detected. VIGISCAM™ activates silently.",
        scammerDialogue: "Hello, this is Microsoft Technical Support. We've detected a serious virus on your computer.",
        detections: ["Incoming call from +1-877-288-4101", "Caller ID: Spoofed (Microsoft)", "A1SCAMSHIELD™ activated"],
        activeModules: ["A1SCAMSHIELD™"],
        threatScore: 15,
        alerts: [],
        consoleOutputs: [
          "[00:00:01] Session initialized",
          "[00:00:02] Audio stream connected",
          "[00:00:03] A1SCAMSHIELD™ NLP engine active",
          "[00:00:04] Caller ID analysis: SPOOFED",
        ],
      },
      {
        id: 2,
        timestamp: "00:15",
        phase: "detection",
        title: "Scam Phrases Detected",
        description: "A1SCAMSHIELD™ identifies manipulation language patterns.",
        scammerDialogue: "Your computer has been compromised. Hackers from Russia are accessing your bank accounts right now. This is very urgent.",
        detections: [
          "PHRASE: 'computer compromised' — Tech Support Script",
          "PHRASE: 'hackers accessing bank' — Fear Induction",
          "PHRASE: 'very urgent' — Urgency Escalation",
          "Script Family Match: Tech Support Cluster A (92% confidence)",
        ],
        activeModules: ["A1SCAMSHIELD™", "SCAMZY™"],
        threatScore: 38,
        alerts: ["Script pattern matches known scam family"],
        consoleOutputs: [
          "[00:15:01] NLP: Scam phrase detected — 'compromised'",
          "[00:15:03] NLP: Fear induction pattern identified",
          "[00:15:05] SCAMZY™: Script family match — Tech Support Cluster A",
          "[00:15:07] Threat score updated: 38",
        ],
      },
      {
        id: 3,
        timestamp: "00:32",
        phase: "detection",
        title: "Authority Impersonation",
        description: "Fake authority claims detected. SCAMZY™ links to known network.",
        scammerDialogue: "I am a senior technician, badge number MT-4892. Microsoft has authorized me to help you. Do not hang up or your computer will be permanently damaged.",
        victimDialogue: "Oh my, what should I do?",
        detections: [
          "PHRASE: 'badge number' — Fake Authority Marker",
          "PHRASE: 'do not hang up' — Victim Isolation",
          "PHRASE: 'permanently damaged' — Threat Escalation",
          "VictimState: Fearful, compliant (67%)",
        ],
        activeModules: ["A1SCAMSHIELD™", "SCAMZY™", "VictimState AI™"],
        threatScore: 52,
        alerts: ["Victim isolation attempt detected", "VictimState entering vulnerable zone"],
        consoleOutputs: [
          "[00:32:01] NLP: Authority impersonation detected",
          "[00:32:04] VictimState AI™: Fear response detected in victim",
          "[00:32:06] NLP: Victim isolation command identified",
          "[00:32:08] Alert: Victim entering vulnerable state",
        ],
      },
      {
        id: 4,
        timestamp: "00:58",
        phase: "escalation",
        title: "Remote Access Request",
        description: "FREEZEGUARD™ detects remote access software launch.",
        scammerDialogue: "Now I need you to go to support-connect.com and download the remote assistance tool. This will let me remove the virus.",
        detections: [
          "PHRASE: 'download remote assistance' — Remote Access Trigger",
          "URL: support-connect.com — Known scam domain",
          "FREEZEGUARD™: AnyDesk.exe launch detected",
          "Remote session request intercepted",
        ],
        activeModules: ["A1SCAMSHIELD™", "SCAMZY™", "FREEZEGUARD™"],
        threatScore: 74,
        alerts: ["CRITICAL: Remote access software detected", "Known scam domain referenced"],
        consoleOutputs: [
          "[00:58:01] NLP: Remote access trigger phrase detected",
          "[00:58:03] URL flagged: support-connect.com (Malicious)",
          "[00:58:05] FREEZEGUARD™: AnyDesk.exe process detected",
          "[00:58:07] ALERT: Remote session request intercepted",
          "[00:58:09] Threat score CRITICAL: 74",
        ],
      },
      {
        id: 5,
        timestamp: "01:24",
        phase: "escalation",
        title: "Payment Demand",
        description: "Scammer demands payment. Network linked to 342 prior cases.",
        scammerDialogue: "To complete the repair, you need to purchase a Microsoft Security License. Go to Target and buy five $200 gift cards. Do not tell the cashier what they are for.",
        detections: [
          "PHRASE: 'purchase gift cards' — Payment Extraction",
          "PHRASE: 'do not tell' — Secrecy Command",
          "Amount: $1,000 in gift cards",
          "SCAMZY™: Phone linked to 342 prior cases",
        ],
        activeModules: ["A1SCAMSHIELD™", "SCAMZY™", "FREEZEGUARD™", "BankGuard™"],
        threatScore: 89,
        alerts: ["CRITICAL: Gift card payment demanded", "Secrecy command issued", "Network: 342 linked cases"],
        consoleOutputs: [
          "[01:24:01] NLP: Payment extraction phrase detected",
          "[01:24:03] NLP: Secrecy command — 'do not tell'",
          "[01:24:05] BankGuard™: Gift card payment trigger",
          "[01:24:07] SCAMZY™: Caller linked to 342 prior cases",
          "[01:24:09] THREAT LEVEL: CRITICAL (89)",
        ],
      },
      {
        id: 6,
        timestamp: "01:42",
        phase: "intervention",
        title: "FreezeLock™ Activated",
        description: "Critical threshold crossed. Emergency intervention triggered.",
        detections: [
          "FreezeLock™: ACTIVATED",
          "Screen frozen — remote input blocked",
          "AnyDesk session terminated",
          "Call ended automatically",
          "Trusted contacts alerted via SMS",
        ],
        activeModules: ["FreezeLock™", "Evidence Vault™"],
        threatScore: 100,
        alerts: ["INTERVENTION COMPLETE", "Victim protected", "Evidence preserved"],
        consoleOutputs: [
          "[01:42:01] ⚠️ CRITICAL THRESHOLD EXCEEDED",
          "[01:42:02] FreezeLock™ ACTIVATING...",
          "[01:42:03] Screen FROZEN — Remote input BLOCKED",
          "[01:42:04] AnyDesk session TERMINATED",
          "[01:42:05] Call connection ENDED",
          "[01:42:06] SMS sent to: Mom (Trusted Contact)",
          "[01:42:07] Evidence Vault™: Session preserved",
          "[01:42:08] ✓ INTERVENTION COMPLETE",
        ],
      },
      {
        id: 7,
        timestamp: "02:15",
        phase: "evidence",
        title: "Evidence Package Generated",
        description: "Complete incident documentation ready for review.",
        detections: [
          "12 scam phrases captured",
          "1 remote access attempt blocked",
          "1 payment demand intercepted",
          "Full audio recording encrypted",
          "Network linkage: Tech Support Cluster A",
        ],
        activeModules: ["Evidence Vault™", "SCAMZY™"],
        threatScore: 0,
        alerts: ["Case closed — victim protected", "Evidence ready for export"],
        consoleOutputs: [
          "[02:15:01] Evidence Vault™: Generating incident report...",
          "[02:15:03] Phrases captured: 12",
          "[02:15:04] Remote sessions blocked: 1",
          "[02:15:05] Payment demands intercepted: 1",
          "[02:15:06] Audio recording: AES-256 encrypted",
          "[02:15:08] Network linkage complete",
          "[02:15:10] ✓ Evidence package ready",
          "[02:15:12] Export formats: Law Enforcement, Family, Bank",
        ],
      },
    ],
  },
  {
    id: "romance",
    title: "Romance Scam",
    subtitle: "Pig butchering detection",
    duration: "4:00",
    icon: <Users className="h-5 w-5" />,
    color: "border-pink-500 bg-pink-500/10",
    steps: [
      {
        id: 1,
        timestamp: "00:00",
        phase: "initiation",
        title: "Video Call Started",
        description: "Video call initiated. Authenticity Suite activated.",
        detections: ["Video call connected", "LiveFaceSeal™ activated", "VoiceMatchSeal™ activated"],
        activeModules: ["LiveFaceSeal™", "VoiceMatchSeal™", "A1SCAMSHIELD™"],
        threatScore: 10,
        alerts: [],
        consoleOutputs: [
          "[00:00:01] Video stream connected",
          "[00:00:02] LiveFaceSeal™ analyzing frames",
          "[00:00:03] VoiceMatchSeal™ voice capture initiated",
        ],
      },
      {
        id: 2,
        timestamp: "00:45",
        phase: "detection",
        title: "Deepfake Detected",
        description: "LiveFaceSeal™ identifies synthetic face artifacts.",
        scammerDialogue: "My love, I miss you so much. I cannot wait for us to be together.",
        detections: [
          "LiveFaceSeal™: Facial boundary artifacts detected",
          "Frame inconsistency: 23% variance",
          "Lip sync delay: 180ms (abnormal)",
          "ALERT: Likely deepfake video",
        ],
        activeModules: ["LiveFaceSeal™", "VoiceMatchSeal™", "SceneSeal™"],
        threatScore: 45,
        alerts: ["Deepfake indicators detected"],
        consoleOutputs: [
          "[00:45:01] LiveFaceSeal™: Analyzing facial boundaries...",
          "[00:45:03] ANOMALY: Facial mesh artifacts detected",
          "[00:45:05] Lip sync analysis: 180ms delay (threshold: 80ms)",
          "[00:45:07] ALERT: Deepfake probability 87%",
        ],
      },
      {
        id: 3,
        timestamp: "01:30",
        phase: "escalation",
        title: "Financial Grooming",
        description: "A1SCAMSHIELD™ detects romance scam script patterns.",
        scammerDialogue: "I have a wonderful investment opportunity. My uncle in Hong Kong has a crypto platform. If you invest $5,000, I can double it in two weeks.",
        detections: [
          "PHRASE: 'investment opportunity' — Financial Grooming",
          "PHRASE: 'crypto platform' — Pig Butchering Marker",
          "PHRASE: 'double it' — Unrealistic Returns",
          "Script Family: Romance → Crypto Pipeline",
        ],
        activeModules: ["A1SCAMSHIELD™", "SCAMZY™", "LiveFaceSeal™"],
        threatScore: 72,
        alerts: ["Romance-to-crypto pipeline detected", "Pig butchering script identified"],
        consoleOutputs: [
          "[01:30:01] NLP: Financial grooming phrase detected",
          "[01:30:03] SCAMZY™: Script match — Romance → Crypto Pipeline",
          "[01:30:05] Alert: Pig butchering pattern identified",
          "[01:30:07] Threat score: 72 (HIGH)",
        ],
      },
      {
        id: 4,
        timestamp: "02:15",
        phase: "intervention",
        title: "Intervention Warning",
        description: "User shown warning overlay with deepfake evidence.",
        detections: [
          "Warning overlay displayed",
          "Deepfake evidence shown to user",
          "Scam pattern explanation provided",
          "Trusted contact notification prepared",
        ],
        activeModules: ["FreezeLock™", "Evidence Vault™"],
        threatScore: 85,
        alerts: ["User intervention triggered", "Deepfake evidence presented"],
        consoleOutputs: [
          "[02:15:01] Intervention threshold reached",
          "[02:15:03] Displaying warning overlay...",
          "[02:15:05] Showing deepfake comparison frames",
          "[02:15:07] User decision requested",
        ],
      },
    ],
  },
  {
    id: "bank-impersonation",
    title: "Bank Impersonation",
    subtitle: "Wire fraud prevention",
    duration: "3:15",
    icon: <ShieldAlert className="h-5 w-5" />,
    color: "border-red-500 bg-red-500/10",
    steps: [
      {
        id: 1,
        timestamp: "00:00",
        phase: "initiation",
        title: "Call from 'Bank'",
        description: "Caller claims to be from fraud department.",
        scammerDialogue: "This is the Chase Bank fraud department. We've detected unauthorized transactions on your account.",
        detections: ["Incoming call: Spoofed caller ID", "Claimed identity: Chase Bank", "A1SCAMSHIELD™ monitoring"],
        activeModules: ["A1SCAMSHIELD™"],
        threatScore: 25,
        alerts: ["Caller ID spoofing detected"],
        consoleOutputs: [
          "[00:00:01] Call connected",
          "[00:00:02] Caller ID: +1-800-935-9935 (Spoofed)",
          "[00:00:03] Claimed: Chase Fraud Department",
        ],
      },
      {
        id: 2,
        timestamp: "00:40",
        phase: "detection",
        title: "Safe Account Scam",
        description: "Classic bank impersonation script detected.",
        scammerDialogue: "Your money is at risk. We need you to transfer your funds to a safe account we've set up for you. I'll give you the account number.",
        detections: [
          "PHRASE: 'safe account' — Bank Impersonation Marker",
          "PHRASE: 'transfer funds' — Wire Fraud Trigger",
          "Script Family: Safe Account Scam (97% match)",
        ],
        activeModules: ["A1SCAMSHIELD™", "SCAMZY™", "BankGuard™"],
        threatScore: 68,
        alerts: ["Safe account scam detected", "Wire fraud attempt identified"],
        consoleOutputs: [
          "[00:40:01] NLP: 'Safe account' phrase detected",
          "[00:40:03] CRITICAL: Wire fraud trigger phrase",
          "[00:40:05] Script match: Safe Account Scam 97%",
        ],
      },
      {
        id: 3,
        timestamp: "01:20",
        phase: "intervention",
        title: "Guardian Pause Activated",
        description: "BankGuard™ blocks wire transfer attempt.",
        detections: [
          "Wire transfer attempt detected",
          "Guardian Pause: 72-hour hold activated",
          "Bank notified of fraud attempt",
          "Real Chase contacted for verification",
        ],
        activeModules: ["BankGuard™", "FreezeLock™", "Evidence Vault™"],
        threatScore: 95,
        alerts: ["Wire transfer BLOCKED", "Guardian Pause active", "Bank alerted"],
        consoleOutputs: [
          "[01:20:01] Wire transfer attempt intercepted",
          "[01:20:03] Guardian Pause ACTIVATED — 72hr hold",
          "[01:20:05] Notifying real Chase Bank...",
          "[01:20:07] ✓ Transfer BLOCKED — Funds safe",
        ],
      },
    ],
  },
  {
    id: "deepfake",
    title: "Deepfake Caller",
    subtitle: "AI impersonation blocked",
    duration: "2:30",
    icon: <Video className="h-5 w-5" />,
    color: "border-purple-500 bg-purple-500/10",
    steps: [
      {
        id: 1,
        timestamp: "00:00",
        phase: "initiation",
        title: "Video Call from 'CEO'",
        description: "Caller appears to be company CEO requesting urgent wire transfer.",
        scammerDialogue: "Hi, this is urgent. I need you to wire $50,000 to this account for a confidential acquisition. Don't tell anyone.",
        detections: ["Video call connected", "Claimed identity: CEO John Smith", "Urgent request detected"],
        activeModules: ["LiveFaceSeal™", "VoiceMatchSeal™"],
        threatScore: 30,
        alerts: ["Urgent financial request from executive"],
        consoleOutputs: [
          "[00:00:01] Video call initiated",
          "[00:00:02] Claimed identity: John Smith (CEO)",
          "[00:00:03] Authenticity Suite activated",
        ],
      },
      {
        id: 2,
        timestamp: "00:25",
        phase: "detection",
        title: "Voice Clone Detected",
        description: "VoiceMatchSeal™ identifies AI-generated voice.",
        detections: [
          "VoiceMatchSeal™: Neural synthesis artifacts detected",
          "Voice biometric mismatch: 34% (threshold: 85%)",
          "Pitch variance: Abnormally consistent",
          "ALERT: AI-generated voice confirmed",
        ],
        activeModules: ["VoiceMatchSeal™", "LiveFaceSeal™", "A1SCAMSHIELD™"],
        threatScore: 65,
        alerts: ["Voice clone detected", "Biometric mismatch confirmed"],
        consoleOutputs: [
          "[00:25:01] VoiceMatchSeal™ analysis complete",
          "[00:25:03] ANOMALY: Neural synthesis markers",
          "[00:25:05] Biometric match: 34% (FAIL)",
          "[00:25:07] CONFIRMED: AI-generated voice",
        ],
      },
      {
        id: 3,
        timestamp: "00:50",
        phase: "detection",
        title: "Deepfake Video Confirmed",
        description: "LiveFaceSeal™ confirms synthetic video feed.",
        detections: [
          "LiveFaceSeal™: Facial reenactment detected",
          "Eye blink rate: 0.3/min (human avg: 15-20/min)",
          "Micro-expression analysis: Absent",
          "CamViguard™: Virtual camera driver detected",
        ],
        activeModules: ["LiveFaceSeal™", "CamViguard™", "VoiceMatchSeal™"],
        threatScore: 88,
        alerts: ["CRITICAL: Full deepfake confirmed", "Virtual camera injection detected"],
        consoleOutputs: [
          "[00:50:01] LiveFaceSeal™: Deepfake confirmed",
          "[00:50:03] Eye blink analysis: ABNORMAL",
          "[00:50:05] CamViguard™: OBS Virtual Camera detected",
          "[00:50:07] THREAT: Full synthetic impersonation",
        ],
      },
      {
        id: 4,
        timestamp: "01:15",
        phase: "intervention",
        title: "Impersonation Blocked",
        description: "DualAuth Challenge issued — deepfake cannot respond.",
        detections: [
          "DualAuth Challenge issued: 'Touch your left ear'",
          "Response: None (deepfake cannot comply)",
          "Impersonation CONFIRMED",
          "Call terminated with evidence preserved",
        ],
        activeModules: ["DualAuth Challenge Generator™", "Evidence Vault™"],
        threatScore: 100,
        alerts: ["Impersonation attack blocked", "Evidence preserved for investigation"],
        consoleOutputs: [
          "[01:15:01] DualAuth Challenge: 'Touch your left ear'",
          "[01:15:05] No physical response detected",
          "[01:15:07] CONFIRMED: Deepfake cannot comply",
          "[01:15:09] Call TERMINATED — Evidence saved",
        ],
      },
    ],
  },
  {
    id: "crypto",
    title: "Crypto Investment",
    subtitle: "Pump-and-dump prevented",
    duration: "3:30",
    icon: <Globe className="h-5 w-5" />,
    color: "border-amber-500 bg-amber-500/10",
    steps: [
      {
        id: 1,
        timestamp: "00:00",
        phase: "initiation",
        title: "Investment Pitch",
        description: "Contact offers exclusive crypto investment opportunity.",
        scammerDialogue: "I have insider access to a new token launching next week. Early investors are guaranteed 500% returns. Only $10,000 minimum.",
        detections: ["Crypto investment pitch detected", "Unrealistic returns promised", "Pressure to invest quickly"],
        activeModules: ["A1SCAMSHIELD™"],
        threatScore: 35,
        alerts: ["Unrealistic return claims detected"],
        consoleOutputs: [
          "[00:00:01] Message analyzed",
          "[00:00:03] PHRASE: 'guaranteed returns' — Red flag",
          "[00:00:05] Investment scam indicators present",
        ],
      },
      {
        id: 2,
        timestamp: "01:00",
        phase: "detection",
        title: "Wallet Analysis",
        description: "SCAMZY™ traces provided wallet to known scam cluster.",
        detections: [
          "Wallet: 0x7a2B...4f91 analyzed",
          "SCAMZY™: Wallet linked to 89 prior scam reports",
          "Funds trace: Tornado Cash mixer detected",
          "Network: Crypto Investment Cluster C",
        ],
        activeModules: ["SCAMZY™", "A1SCAMSHIELD™"],
        threatScore: 78,
        alerts: ["Wallet linked to known scam network", "Mixer usage detected"],
        consoleOutputs: [
          "[01:00:01] Wallet analysis initiated",
          "[01:00:03] SCAMZY™: 89 prior scam reports linked",
          "[01:00:05] Fund flow: Tornado Cash detected",
          "[01:00:07] ALERT: Known scam infrastructure",
        ],
      },
      {
        id: 3,
        timestamp: "02:00",
        phase: "intervention",
        title: "Transaction Blocked",
        description: "BankGuard™ prevents crypto purchase.",
        detections: [
          "Crypto exchange transaction detected",
          "BankGuard™: High-risk wallet destination",
          "Transaction BLOCKED",
          "User warned with evidence summary",
        ],
        activeModules: ["BankGuard™", "SCAMZY™", "Evidence Vault™"],
        threatScore: 92,
        alerts: ["Transaction blocked", "User protected from $10,000 loss"],
        consoleOutputs: [
          "[02:00:01] Crypto purchase attempt detected",
          "[02:00:03] Destination: HIGH-RISK wallet",
          "[02:00:05] BankGuard™: BLOCKING transaction",
          "[02:00:07] ✓ User funds protected",
        ],
      },
    ],
  },
  {
    id: "recovery",
    title: "Recovery Scam",
    subtitle: "Re-exploitation prevented",
    duration: "2:00",
    icon: <AlertCircle className="h-5 w-5" />,
    color: "border-orange-500 bg-orange-500/10",
    steps: [
      {
        id: 1,
        timestamp: "00:00",
        phase: "initiation",
        title: "Recovery Offer",
        description: "Caller offers to recover funds from previous scam.",
        scammerDialogue: "We're from the Federal Fraud Recovery Bureau. We've recovered your $15,000 from the scammers. You just need to pay a $500 processing fee.",
        detections: ["Recovery scam script detected", "Fake agency name", "Upfront fee requested"],
        activeModules: ["A1SCAMSHIELD™", "SCAMZY™"],
        threatScore: 55,
        alerts: ["Recovery scam detected", "Prior victim being re-targeted"],
        consoleOutputs: [
          "[00:00:01] Call analyzed",
          "[00:00:03] PHRASE: 'recovered your money' — Recovery scam",
          "[00:00:05] Fake agency: 'Federal Fraud Recovery Bureau'",
          "[00:00:07] ALERT: Re-exploitation attempt",
        ],
      },
      {
        id: 2,
        timestamp: "00:45",
        phase: "intervention",
        title: "Immediate Block",
        description: "SCAMZY™ identifies caller as known recovery scammer.",
        detections: [
          "Phone: +1-888-555-0147 — Known recovery scammer",
          "Script match: Recovery Scam Cluster B (94%)",
          "Prior victim database: User previously scammed",
          "FreezeLock™: Call terminated immediately",
        ],
        activeModules: ["FreezeLock™", "SCAMZY™", "Evidence Vault™"],
        threatScore: 100,
        alerts: ["Known scammer blocked", "Re-exploitation prevented"],
        consoleOutputs: [
          "[00:45:01] SCAMZY™: Known scammer identified",
          "[00:45:03] User flagged as prior victim",
          "[00:45:05] FreezeLock™: IMMEDIATE TERMINATION",
          "[00:45:07] ✓ Re-exploitation PREVENTED",
        ],
      },
    ],
  },
]

const MODULE_COLORS: Record<string, string> = {
  "A1SCAMSHIELD™": "bg-primary text-primary-foreground",
  "SCAMZY™": "bg-accent text-accent-foreground",
  "FREEZEGUARD™": "bg-blue-600 text-white",
  "FreezeLock™": "bg-red-600 text-white",
  "BankGuard™": "bg-emerald-600 text-white",
  "Evidence Vault™": "bg-slate-700 text-white",
  "LiveFaceSeal™": "bg-purple-600 text-white",
  "VoiceMatchSeal™": "bg-pink-600 text-white",
  "SceneSeal™": "bg-indigo-600 text-white",
  "CamViguard™": "bg-cyan-600 text-white",
  "VictimState AI™": "bg-orange-600 text-white",
  "DualAuth Challenge Generator™": "bg-teal-600 text-white",
}

export default function DemoPage() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showConsole, setShowConsole] = useState(true)

  const currentStep = selectedScenario.steps[currentStepIndex]
  const progress = ((currentStepIndex + 1) / selectedScenario.steps.length) * 100

  // Auto-advance when playing
  useEffect(() => {
    if (!isPlaying) return
    
    const timer = setTimeout(() => {
      if (currentStepIndex < selectedScenario.steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1)
      } else {
        setIsPlaying(false)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentStepIndex, selectedScenario.steps.length])

  const handleReset = useCallback(() => {
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }, [])

  const handleScenarioChange = useCallback((scenario: Scenario) => {
    setSelectedScenario(scenario)
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }, [])

  const getThreatColor = (score: number) => {
    if (score >= 80) return "text-red-500"
    if (score >= 60) return "text-orange-500"
    if (score >= 40) return "text-yellow-500"
    return "text-green-500"
  }

  const getThreatBg = (score: number) => {
    if (score >= 80) return "bg-red-500"
    if (score >= 60) return "bg-orange-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case "initiation": return <Phone className="h-4 w-4" />
      case "detection": return <Eye className="h-4 w-4" />
      case "escalation": return <AlertTriangle className="h-4 w-4" />
      case "intervention": return <ShieldX className="h-4 w-4" />
      case "evidence": return <Database className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "initiation": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "detection": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "escalation": return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "intervention": return "bg-red-500/20 text-red-400 border-red-500/30"
      case "evidence": return "bg-green-500/20 text-green-400 border-green-500/30"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center">
              <Badge className="bg-accent text-accent-foreground mb-4">Interactive Live Demo</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 text-balance">
                See VIGISCAM™ Stop Scams in Real Time
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
                Watch an interactive simulation of how VIGISCAM™ detects, analyzes, and intervenes during active scam attempts. Select a scenario and see every module in action.
              </p>
            </div>
          </div>
        </section>

        {/* Scenario Selector */}
        <section className="py-6 bg-muted/50 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioChange(scenario)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-sm border transition-all",
                    selectedScenario.id === scenario.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border hover:border-primary hover:bg-muted"
                  )}
                >
                  {scenario.icon}
                  <span className="font-medium text-sm">{scenario.title}</span>
                  <span className="text-xs opacity-70">{scenario.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Demo Area */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              
              {/* Left Column: Timeline & Controls */}
              <div className="lg:col-span-1 space-y-4">
                {/* Playback Controls */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={isPlaying ? "secondary" : "default"}
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleReset}>
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">
                        {currentStep.timestamp}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Step {currentStepIndex + 1} of {selectedScenario.steps.length}
                    </p>
                  </CardContent>
                </Card>

                {/* Timeline Steps */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[400px] overflow-y-auto">
                      {selectedScenario.steps.map((step, index) => (
                        <button
                          key={step.id}
                          onClick={() => {
                            setCurrentStepIndex(index)
                            setIsPlaying(false)
                          }}
                          className={cn(
                            "w-full flex items-start gap-3 p-3 text-left border-b border-border last:border-0 transition-colors",
                            index === currentStepIndex
                              ? "bg-primary/10"
                              : index < currentStepIndex
                              ? "bg-muted/50"
                              : "hover:bg-muted/30"
                          )}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-mono text-muted-foreground">
                              {step.timestamp}
                            </span>
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full mt-1",
                                index <= currentStepIndex ? getThreatBg(step.threatScore) : "bg-muted"
                              )}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs border",
                                getPhaseColor(step.phase)
                              )}>
                                {getPhaseIcon(step.phase)}
                              </span>
                              <span className="text-sm font-medium truncate">{step.title}</span>
                            </div>
                          </div>
                          {index === currentStepIndex && (
                            <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Center Column: Main Display */}
              <div className="lg:col-span-2 space-y-4">
                {/* Threat Score & Active Modules */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Unified Threat Score</span>
                        <Activity className={cn("h-4 w-4", getThreatColor(currentStep.threatScore))} />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className={cn("text-4xl font-bold font-mono", getThreatColor(currentStep.threatScore))}>
                          {currentStep.threatScore}
                        </span>
                        <span className="text-sm text-muted-foreground">/ 100</span>
                      </div>
                      <Progress
                        value={currentStep.threatScore}
                        className={cn("h-2 mt-2", currentStep.threatScore >= 80 && "[&>div]:bg-red-500")}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Active Modules</span>
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {currentStep.activeModules.map((module) => (
                          <span
                            key={module}
                            className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium",
                              MODULE_COLORS[module] || "bg-secondary text-secondary-foreground"
                            )}
                          >
                            {module.replace("™", "")}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Step Details */}
                <Card className={cn(
                  "border-2 transition-colors",
                  currentStep.phase === "intervention" ? "border-red-500" : "border-border"
                )}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-1 rounded text-sm border font-medium",
                          getPhaseColor(currentStep.phase)
                        )}>
                          {getPhaseIcon(currentStep.phase)}
                          {currentStep.phase.charAt(0).toUpperCase() + currentStep.phase.slice(1)}
                        </span>
                        <CardTitle>{currentStep.title}</CardTitle>
                      </div>
                      <span className="font-mono text-sm text-muted-foreground">{currentStep.timestamp}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{currentStep.description}</p>

                    {/* Dialogue */}
                    {(currentStep.scammerDialogue || currentStep.victimDialogue) && (
                      <div className="space-y-3 p-4 bg-muted/50 rounded-sm">
                        {currentStep.scammerDialogue && (
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                              <Phone className="h-4 w-4 text-red-500" />
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-red-500">SCAMMER</span>
                              <p className="text-sm text-foreground italic">&ldquo;{currentStep.scammerDialogue}&rdquo;</p>
                            </div>
                          </div>
                        )}
                        {currentStep.victimDialogue && (
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                              <Users className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-blue-500">VICTIM</span>
                              <p className="text-sm text-foreground italic">&ldquo;{currentStep.victimDialogue}&rdquo;</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Detections */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Eye className="h-4 w-4 text-primary" />
                        Detections
                      </h4>
                      <div className="space-y-1.5">
                        {currentStep.detections.map((detection, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-sm bg-card border border-border rounded-sm px-3 py-2"
                          >
                            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                            <span className="text-foreground">{detection}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alerts */}
                    {currentStep.alerts.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          Alerts
                        </h4>
                        <div className="space-y-1.5">
                          {currentStep.alerts.map((alert, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-sm bg-warning/10 border border-warning/30 rounded-sm px-3 py-2"
                            >
                              <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                              <span className="text-foreground">{alert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Console Output */}
                <Card className="bg-slate-900 border-slate-700">
                  <CardHeader className="pb-2 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-mono text-green-400">VIGISCAM™ Console</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-400 hover:text-white h-6 px-2"
                        onClick={() => setShowConsole(!showConsole)}
                      >
                        {showConsole ? "Hide" : "Show"}
                      </Button>
                    </div>
                  </CardHeader>
                  {showConsole && (
                    <CardContent className="p-4">
                      <div className="font-mono text-xs space-y-1 max-h-[200px] overflow-y-auto">
                        {currentStep.consoleOutputs.map((output, i) => (
                          <div key={i} className={cn(
                            "leading-relaxed",
                            output.includes("CRITICAL") || output.includes("ALERT") || output.includes("⚠️")
                              ? "text-red-400"
                              : output.includes("✓") || output.includes("COMPLETE")
                              ? "text-green-400"
                              : "text-slate-300"
                          )}>
                            {output}
                          </div>
                        ))}
                        <div className="text-green-400 animate-pulse">█</div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Demonstrated */}
        <section className="py-16 bg-muted/40 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Modules Demonstrated in This Demo</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                { icon: <Brain className="h-5 w-5" />, name: "A1SCAMSHIELD™", desc: "Real-time scam phrase detection" },
                { icon: <Globe className="h-5 w-5" />, name: "SCAMZY™", desc: "Network linking & intelligence" },
                { icon: <Lock className="h-5 w-5" />, name: "FreezeLock™", desc: "Emergency intervention" },
                { icon: <Video className="h-5 w-5" />, name: "LiveFaceSeal™", desc: "Deepfake detection" },
                { icon: <Mic className="h-5 w-5" />, name: "VoiceMatchSeal™", desc: "Voice clone detection" },
                { icon: <Database className="h-5 w-5" />, name: "Evidence Vault™", desc: "Forensic preservation" },
              ].map((module) => (
                <div key={module.name} className="flex items-start gap-3 p-4 bg-card border border-border rounded-sm">
                  <div className="p-2 bg-primary/10 rounded-sm text-primary">{module.icon}</div>
                  <div>
                    <h3 className="font-semibold text-sm">{module.name}</h3>
                    <p className="text-xs text-muted-foreground">{module.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Protect What Matters?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Start your free trial today and experience the full power of VIGISCAM™ protection.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/select-account-type">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  View Pricing
                </Button>
              </Link>
              <Link href="/company/contact">
                <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground/80 hover:bg-primary-foreground/10 bg-transparent">
                  Request Enterprise Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
