import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using VIGISCAM™'s services, website, or applications (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Services.

These Terms apply to all visitors, users, and others who access or use the Services. By using our Services, you represent that you are at least 18 years of age or have parental consent to use the Services.`,
  },
  {
    id: "description",
    title: "2. Description of Services",
    content: `VIGISCAM™ provides AI-powered protection against scams, fraud, and digital threats including:

- Real-time scam detection and prevention
- Remote access protection
- Deepfake and voice cloning detection
- Safety alerts and notifications
- Evidence logging and forensics
- Family monitoring and oversight features

We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time with reasonable notice.`,
  },
  {
    id: "accounts",
    title: "3. User Accounts",
    content: `**Account Creation:**
You must provide accurate, complete, and current information when creating an account. You are responsible for maintaining the security of your account credentials.

**Account Responsibilities:**
- You are responsible for all activities under your account
- You must notify us immediately of any unauthorized use
- You may not share your account credentials with others
- You may not create multiple accounts for fraudulent purposes

**Account Termination:**
We may suspend or terminate your account if you violate these Terms or engage in activities harmful to VIGISCAM™ or other users.`,
  },
  {
    id: "subscription",
    title: "4. Subscription and Billing",
    content: `**Subscription Plans:**
We offer various subscription plans with different features and pricing. Plan details are available on our pricing page.

**Billing:**
- Subscription fees are billed in advance on a recurring basis
- You authorize us to charge your payment method automatically
- Prices may change with 30 days notice

**Cancellation:**
- You may cancel your subscription at any time
- Cancellation takes effect at the end of your current billing period
- No refunds for partial months, except as required by law

**Free Trials:**
- Free trials convert to paid subscriptions unless cancelled
- One free trial per person/household`,
  },
  {
    id: "acceptable-use",
    title: "5. Acceptable Use",
    content: `You agree NOT to use the Services to:

- Violate any applicable laws or regulations
- Infringe upon intellectual property rights
- Harass, abuse, or harm others
- Distribute malware or malicious code
- Attempt to gain unauthorized access to our systems
- Interfere with the proper working of the Services
- Use the Services to commit fraud or identity theft
- Circumvent security features or usage limits
- Reverse engineer or decompile our software
- Use automated systems to access the Services without permission

Violation of these terms may result in immediate termination of your account.`,
  },
  {
    id: "intellectual-property",
    title: "6. Intellectual Property",
    content: `**Our Property:**
The Services, including all content, features, and functionality, are owned by VIGISCAM™ and protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.

**Your Content:**
You retain ownership of content you submit to the Services. By submitting content, you grant us a license to use it as necessary to provide the Services.

**Feedback:**
Any feedback, suggestions, or ideas you provide may be used by us without compensation or attribution.`,
  },
  {
    id: "privacy",
    title: "7. Privacy",
    content: `Your use of the Services is subject to our Privacy Policy, which explains how we collect, use, and protect your personal information. By using the Services, you consent to our data practices as described in the Privacy Policy.

For family and enterprise accounts, account administrators may have access to certain usage data and alerts as described in our documentation.`,
  },
  {
    id: "disclaimers",
    title: "8. Disclaimers",
    content: `THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:

- Warranties of merchantability or fitness for a particular purpose
- Warranties that the Services will be uninterrupted or error-free
- Warranties that defects will be corrected
- Warranties regarding the accuracy of scam detection

While we strive for high accuracy in scam detection, no system is perfect. We cannot guarantee prevention of all scams or fraudulent activities. Users should maintain vigilance and use good judgment. FREEZEGUARD™, as a component of VIGISCAM™, provides real-time remote-access protection but does not guarantee prevention of all attempted takeovers.`,
  },
  {
    id: "liability",
    title: "9. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:

VIGISCAM™ shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
- Loss of profits, data, or goodwill
- Service interruption or system failure
- Financial losses from scams not detected
- Unauthorized access to your accounts

Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.

Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.`,
  },
  {
    id: "indemnification",
    title: "10. Indemnification",
    content: `You agree to indemnify and hold harmless VIGISCAM™, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:

- Your use of the Services
- Your violation of these Terms
- Your violation of any rights of another party
- Any content you submit to the Services`,
  },
  {
    id: "disputes",
    title: "11. Dispute Resolution",
    content: `**Informal Resolution:**
Before filing a claim, you agree to try to resolve the dispute informally by contacting legal@vigiscam.ai.

**Arbitration:**
Any disputes that cannot be resolved informally shall be resolved through binding arbitration in San Francisco, California, under the rules of the American Arbitration Association.

**Class Action Waiver:**
You agree to resolve disputes individually and waive any right to participate in class action lawsuits or class-wide arbitration.

**Exceptions:**
Either party may seek injunctive relief in court for intellectual property infringement or unauthorized access to systems.`,
  },
  {
    id: "governing-law",
    title: "12. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to conflict of law principles.

For users outside the United States, local consumer protection laws may provide additional rights that cannot be waived by contract.`,
  },
  {
    id: "changes",
    title: "13. Changes to Terms",
    content: `We may update these Terms from time to time. We will notify you of material changes by:

- Posting the new Terms on our website
- Sending an email notification
- In-app notification

Your continued use of the Services after changes become effective constitutes acceptance of the new Terms. If you do not agree to the new Terms, you must stop using the Services.`,
  },
  {
    id: "contact",
    title: "14. Contact Information",
    content: `If you have questions about these Terms, please contact us:

**Email:** legal@vigiscam.ai
**Mail:** VIGISCAM™, Attn: Legal Department, 123 Security Lane, San Francisco, CA 94102

For support inquiries, please contact support@vigiscam.ai.`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: December 1, 2024</p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-semibold mb-4">Table of Contents</h2>
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm text-primary hover:underline px-3 py-1 rounded-full bg-primary/10"
                  >
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card border-border">
                <CardContent className="p-8 md:p-12">
                  <div className="prose prose-invert max-w-none">
                    {sections.map((section) => (
                      <div key={section.id} id={section.id} className="mb-12 last:mb-0">
                        <h2 className="text-2xl font-bold mb-4 text-foreground">{section.title}</h2>
                        <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                          {section.content.split("\n").map((paragraph, index) => {
                            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                              return (
                                <p key={index} className="font-semibold text-foreground mt-4 mb-2">
                                  {paragraph.replace(/\*\*/g, "")}
                                </p>
                              )
                            }
                            if (paragraph.startsWith("- ")) {
                              return (
                                <li key={index} className="ml-4">
                                  {paragraph.substring(2)}
                                </li>
                              )
                            }
                            return (
                              <p key={index} className="mb-4">
                                {paragraph}
                              </p>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
