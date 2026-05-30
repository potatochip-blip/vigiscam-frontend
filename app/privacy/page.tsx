import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `VIGISCAM™ ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our anti-scam protection services, website, and applications (collectively, the "Services").

Please read this privacy policy carefully. By using the Services, you consent to the practices described in this policy.`,
  },
  {
    id: "information-collected",
    title: "Information We Collect",
    content: `We collect information that you provide directly to us and information that is collected automatically when you use our Services.

**Information You Provide:**
- Account information (name, email address, phone number)
- Payment information (processed securely by our payment providers)
- Trusted contact information you designate
- Communication preferences
- Support requests and feedback

**Information Collected Automatically:**
- Device information (type, operating system, unique identifiers)
- Usage data (features used, interaction patterns)
- Network information necessary for scam detection
- Call metadata (timing, duration - not call content unless explicitly enabled)

**Information for Scam Detection:**
- Screen activity patterns for remote access detection
- Audio patterns for voice verification (processed locally)
- Behavioral patterns for threat assessment`,
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: `We use the information we collect to:

- Provide, maintain, and improve our Services
- Detect, prevent, and respond to scam attempts and security threats
- Alert you and your trusted contacts about potential threats
- Process transactions and send related information
- Send technical notices, updates, and administrative messages
- Respond to your comments, questions, and support requests
- Analyze usage patterns to improve our AI detection capabilities
- Comply with legal obligations

**We do NOT:**
- Sell your personal information to third parties
- Use your data for advertising purposes
- Access the content of your communications without explicit consent
- Share your data with any parties except as described in this policy

FREEZEGUARD™, as part of VIGISCAM™, may monitor screen and remote-access activity patterns for protection purposes, with data handled according to this privacy policy.`,
  },
  {
    id: "data-sharing",
    title: "Information Sharing",
    content: `We share information only in the following circumstances:

**With Your Consent:**
- With trusted contacts you designate in your account
- With family members connected to your family plan

**Service Providers:**
- Cloud hosting providers (AWS, Google Cloud)
- Payment processors (Stripe)
- Analytics providers (privacy-focused, no PII shared)

**Legal Requirements:**
- To comply with applicable law or legal process
- To protect the rights, property, and safety of VIGISCAM™, our users, or others
- In connection with an investigation of fraud or other illegal activity

**Business Transfers:**
- In connection with a merger, acquisition, or sale of assets (with notice)`,
  },
  {
    id: "data-security",
    title: "Data Security",
    content: `We implement robust security measures to protect your information:

- End-to-end encryption for all data in transit
- AES-256 encryption for data at rest
- Regular security audits and penetration testing
- SOC 2 Type II compliance
- HIPAA compliance for healthcare customers
- Zero-knowledge architecture where possible
- Multi-factor authentication options
- Regular employee security training

Despite our efforts, no security measures are perfect. If you believe your account has been compromised, contact us immediately.`,
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: `We retain your information for as long as necessary to provide the Services and fulfill the purposes described in this policy:

- Account data: Until you delete your account + 30 days
- Security logs: 90 days (longer if required for investigation)
- Evidence recordings: Per your plan settings (7-90 days)
- Anonymized analytics: Indefinitely

You can request deletion of your data at any time through your account settings or by contacting support. Some data may be retained as required by law.`,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: `Depending on your location, you may have the following rights:

**Access:** Request a copy of your personal data
**Correction:** Request correction of inaccurate data
**Deletion:** Request deletion of your data
**Portability:** Receive your data in a structured format
**Objection:** Object to certain processing activities
**Restriction:** Request restriction of processing
**Withdraw Consent:** Withdraw consent where processing is based on consent

To exercise these rights, contact privacy@vigiscam.ai or use the privacy controls in your account settings.`,
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: `Our Services are not intended for children under 13 (or 16 in the EU). We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.

For family accounts protecting minors, parents or guardians maintain control over the minor's data and privacy settings.`,
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    content: `We operate globally and may transfer your information to countries other than your own. We ensure appropriate safeguards are in place:

- Standard Contractual Clauses (EU/UK)
- Data Processing Agreements with all processors
- Compliance with Privacy Shield principles
- Adequacy decisions where applicable

For EU/UK residents, you can request information about the safeguards in place by contacting our Data Protection Officer.`,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by:

- Posting the new policy on our website
- Sending an email notification
- In-app notification

Your continued use of the Services after changes become effective constitutes acceptance of the revised policy.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    content: `If you have questions about this Privacy Policy or our privacy practices:

**Email:** privacy@vigiscam.ai
**Mail:** VIGISCAM™, Attn: Privacy Team, 123 Security Lane, San Francisco, CA 94102
**Data Protection Officer:** dpo@vigiscam.ai

For EU residents, you have the right to lodge a complaint with your local supervisory authority.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
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
                    {section.title}
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
