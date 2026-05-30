"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  AlertTriangle,
  Phone,
  Globe,
  MessageSquare,
  CreditCard,
  Users,
  Shield,
  Upload,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  ChevronRight,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ReportScamPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    scamType: "",
    contactMethod: "",
    dateOccurred: "",
    description: "",
    scammerInfo: "",
    financialLoss: "",
    lossAmount: "",
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    consent: false,
  })

  const scamTypes = [
    {
      id: "remote-access",
      label: "Remote Access Scam",
      icon: Globe,
      description: "Someone tried to access your computer remotely",
    },
    { id: "phone-scam", label: "Phone/Voice Scam", icon: Phone, description: "Suspicious or threatening phone calls" },
    {
      id: "tech-support",
      label: "Tech Support Scam",
      icon: MessageSquare,
      description: "Fake tech support or virus warnings",
    },
    {
      id: "impersonation",
      label: "Impersonation Scam",
      icon: Users,
      description: "Someone pretending to be family, government, or company",
    },
    {
      id: "financial",
      label: "Financial Fraud",
      icon: CreditCard,
      description: "Requests for payment, gift cards, or bank info",
    },
    {
      id: "deepfake",
      label: "Deepfake/AI Scam",
      icon: Shield,
      description: "Suspected fake video or voice impersonation",
    },
    {
      id: "romance",
      label: "Romance/Pig Butchering",
      icon: Users,
      description: "Fake romantic relationship leading to financial requests",
    },
    {
      id: "sextortion",
      label: "Sextortion/Blackmail",
      icon: AlertTriangle,
      description: "Threats to release intimate content unless paid",
    },
    {
      id: "recovery",
      label: "Recovery Scam",
      icon: Shield,
      description: "Someone claiming to recover money from a previous scam",
    },
    {
      id: "crypto",
      label: "Crypto/Investment Scam",
      icon: CreditCard,
      description: "Fake investment opportunities or crypto schemes",
    },
  ]

  const contactMethods = [
    { id: "phone", label: "Phone Call" },
    { id: "email", label: "Email" },
    { id: "text", label: "Text Message" },
    { id: "video", label: "Video Call" },
    { id: "social", label: "Social Media" },
    { id: "in-person", label: "In Person" },
    { id: "website", label: "Website/Pop-up" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <div className="bg-primary text-primary-foreground py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold">Report Submitted</h1>
              <p className="mt-2 text-primary-foreground/80">Thank you for helping protect others from scams</p>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Report Successfully Submitted</h2>
                  <p className="text-muted-foreground">
                    Your scam report has been received and will be reviewed by our team. We may contact you if we need
                    additional information.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium">Reference Number</p>
                    <p className="text-2xl font-mono font-bold text-primary">
                      VS-2026-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                  </div>

                  <div className="pt-6 space-y-4">
                    <h3 className="font-semibold">What happens next?</h3>
                    <div className="grid gap-4 text-left">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Review</p>
                          <p className="text-sm text-muted-foreground">
                            Our team will review your report within 24-48 hours
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Investigation</p>
                          <p className="text-sm text-muted-foreground">
                            We may reach out for additional details if needed
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Action</p>
                          <p className="text-sm text-muted-foreground">
                            Information may be shared with law enforcement and used to improve protection
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button asChild className="flex-1 bg-primary text-primary-foreground">
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 bg-transparent">
                      <Link href="/">Return Home</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-danger text-danger-foreground py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Report a Scam</h1>
                <p className="mt-1 text-danger-foreground/90">
                  Help us protect you and others by reporting suspicious activity
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Alert */}
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="container mx-auto px-4 py-4">
            <Alert className="bg-transparent border-0 p-0">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-amber-800">If you're currently being scammed</AlertTitle>
              <AlertDescription className="text-amber-700">
                Hang up immediately. Do not give any personal information, access to your computer, or send money. Call
                our emergency hotline: <strong>1-800-VIGISCAM</strong>
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">847K+</p>
                <p className="text-sm text-muted-foreground">Reports Processed</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">$2.3B</p>
                <p className="text-sm text-muted-foreground">Losses Prevented</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">4,200+</p>
                <p className="text-sm text-muted-foreground">Scam Networks Exposed</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">24-48h</p>
                <p className="text-sm text-muted-foreground">Average Response Time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                      </div>
                      {s < 3 && (
                        <div
                          className={`w-full h-1 mx-2 ${step > s ? "bg-primary" : "bg-muted"}`}
                          style={{ minWidth: "60px" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>Scam Details</span>
                  <span className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>Description</span>
                  <span className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>Your Info</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Scam Type */}
                {step === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>What type of scam occurred?</CardTitle>
                      <CardDescription>Select the category that best describes what happened</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {scamTypes.map((type) => (
                          <label
                            key={type.id}
                            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                              formData.scamType === type.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="scamType"
                              value={type.id}
                              checked={formData.scamType === type.id}
                              onChange={(e) => setFormData({ ...formData, scamType: e.target.value })}
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                formData.scamType === type.id ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <type.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{type.label}</p>
                              <p className="text-sm text-muted-foreground">{type.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <Label>How did the scammer contact you?</Label>
                        <div className="flex flex-wrap gap-2">
                          {contactMethods.map((method) => (
                            <label
                              key={method.id}
                              className={`px-4 py-2 rounded-full border cursor-pointer transition-colors ${
                                formData.contactMethod === method.id
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <input
                                type="radio"
                                name="contactMethod"
                                value={method.id}
                                checked={formData.contactMethod === method.id}
                                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                                className="sr-only"
                              />
                              {method.label}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOccurred">When did this occur?</Label>
                        <Input
                          id="dateOccurred"
                          type="date"
                          value={formData.dateOccurred}
                          onChange={(e) => setFormData({ ...formData, dateOccurred: e.target.value })}
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={() => setStep(2)}
                          disabled={!formData.scamType || !formData.contactMethod}
                          className="bg-primary text-primary-foreground"
                        >
                          Continue
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Description */}
                {step === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Describe what happened</CardTitle>
                      <CardDescription>Provide as much detail as possible to help us investigate</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="description">What happened? *</Label>
                        <Textarea
                          id="description"
                          rows={6}
                          placeholder="Please describe the scam attempt in detail. Include what was said, what they asked you to do, and how you responded..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Include any specific phrases or tactics used by the scammer
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="scammerInfo">Scammer information (if known)</Label>
                        <Textarea
                          id="scammerInfo"
                          rows={3}
                          placeholder="Phone number, email address, company name, website, or any other identifying information..."
                          value={formData.scammerInfo}
                          onChange={(e) => setFormData({ ...formData, scammerInfo: e.target.value })}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label>Did you lose money or provide financial information?</Label>
                        <RadioGroup
                          value={formData.financialLoss}
                          onValueChange={(value) => setFormData({ ...formData, financialLoss: value })}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="loss-no" />
                            <Label htmlFor="loss-no" className="font-normal">
                              No financial loss
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="info" id="loss-info" />
                            <Label htmlFor="loss-info" className="font-normal">
                              Provided financial information but no money lost
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="loss-yes" />
                            <Label htmlFor="loss-yes" className="font-normal">
                              Yes, I lost money
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {formData.financialLoss === "yes" && (
                        <div className="space-y-2">
                          <Label htmlFor="lossAmount">Approximate amount lost</Label>
                          <Select
                            value={formData.lossAmount}
                            onValueChange={(value) => setFormData({ ...formData, lossAmount: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select amount range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-100">Under $100</SelectItem>
                              <SelectItem value="100-500">$100 - $500</SelectItem>
                              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                              <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                              <SelectItem value="over-10000">Over $10,000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>Upload evidence (optional)</Label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*,.pdf,.eml,.msg,.mp3,.mp4,.txt"
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || [])
                            setUploadedFiles((prev) => [...prev, ...files].slice(0, 5))
                          }}
                        />
                        <div
                          className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-muted/30 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()
                            const files = Array.from(e.dataTransfer.files)
                            setUploadedFiles((prev) => [...prev, ...files].slice(0, 5))
                          }}
                        >
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm font-medium text-foreground">Drag and drop files here or click to select</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Screenshots, emails, PDFs, or recordings (max 10MB each, up to 5 files)
                          </p>
                          <Button type="button" variant="outline" size="sm" className="mt-4 bg-transparent pointer-events-none">
                            <Upload className="h-3.5 w-3.5 mr-2" />
                            Select Files
                          </Button>
                        </div>
                        {uploadedFiles.length > 0 && (
                          <div className="space-y-2 mt-2">
                            {uploadedFiles.map((file, i) => (
                              <div key={i} className="flex items-center justify-between px-3 py-2 bg-muted rounded text-sm">
                                <div className="flex items-center gap-2 min-w-0">
                                  <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                                  <span className="truncate text-foreground">{file.name}</span>
                                  <span className="text-muted-foreground text-xs flex-shrink-0">
                                    ({(file.size / 1024 / 1024).toFixed(1)} MB)
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-muted-foreground hover:text-danger flex-shrink-0"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== i))
                                  }}
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setStep(1)}>
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setStep(3)}
                          disabled={!formData.description}
                          className="bg-primary text-primary-foreground"
                        >
                          Continue
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Your Information */}
                {step === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Your contact information</CardTitle>
                      <CardDescription>We may need to follow up for additional details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Anonymous Option */}
                      <div className="p-4 bg-muted/50 rounded-lg border border-border">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="anonymous"
                            checked={formData.reporterName === "Anonymous"}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, reporterName: "Anonymous", reporterEmail: "anonymous@report.vigiscam.ai", reporterPhone: "" })
                              } else {
                                setFormData({ ...formData, reporterName: "", reporterEmail: "", reporterPhone: "" })
                              }
                            }}
                          />
                          <div>
                            <Label htmlFor="anonymous" className="font-medium cursor-pointer">
                              Submit anonymously
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Your report will still be processed, but we won&apos;t be able to follow up with you.
                            </p>
                          </div>
                        </div>
                      </div>

                      {formData.reporterName !== "Anonymous" && (
                        <>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="reporterName">Full Name *</Label>
                              <Input
                                id="reporterName"
                                placeholder="Enter your name"
                                value={formData.reporterName}
                                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reporterPhone">Phone Number</Label>
                              <Input
                                id="reporterPhone"
                                type="tel"
                                placeholder="(555) 123-4567"
                                value={formData.reporterPhone}
                                onChange={(e) => setFormData({ ...formData, reporterPhone: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="reporterEmail">Email Address *</Label>
                            <Input
                              id="reporterEmail"
                              type="email"
                              placeholder="your@email.com"
                              value={formData.reporterEmail}
                              onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                            />
                          </div>
                        </>
                      )}

                      <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                        />
                        <div>
                          <Label htmlFor="consent" className="font-normal cursor-pointer">
                            I consent to VIGISCAM™ processing this report *
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Your information may be shared with law enforcement agencies to help investigate and prevent
                            scams. See our{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>{" "}
                            for details.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setStep(2)}>
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={!formData.reporterName || !formData.reporterEmail || !formData.consent}
                          className="bg-danger text-danger-foreground hover:bg-danger/90"
                        >
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Submit Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-danger" />
                    </div>
                    <div>
                      <p className="font-medium">Emergency Hotline</p>
                      <p className="text-sm text-primary font-bold">1-800-VIGISCAM</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Available 24/7 for urgent scam situations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link
                    href="/resources#scam-guide"
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    How to Identify a Scam
                  </Link>
                  <Link
                    href="/resources#recovery"
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    Scam Recovery Guide
                  </Link>
                  <Link
                    href="/resources#prevention"
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Prevention Tips
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <p className="font-medium">Report Processing</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reports are typically reviewed within 24-48 hours. Critical reports involving ongoing scams or
                    significant financial loss are prioritized.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What We Do With Your Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Train SCAMZY™ AI to detect similar patterns</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Alert other potential victims in real-time</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Share with law enforcement partners</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Link to known scam network clusters</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Generate takedown evidence packets</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Also Report To</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">FTC (Federal Trade Commission)</p>
                    <a href="https://reportfraud.ftc.gov" className="text-primary hover:underline">
                      reportfraud.ftc.gov
                    </a>
                  </div>
                  <div>
                    <p className="font-medium">FBI Internet Crime Center</p>
                    <a href="https://ic3.gov" className="text-primary hover:underline">
                      ic3.gov
                    </a>
                  </div>
                  <div>
                    <p className="font-medium">Local Police</p>
                    <p className="text-muted-foreground">For financial losses over $1,000</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
