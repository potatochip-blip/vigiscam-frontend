import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Download, Trash2, Eye, Edit, Ban } from "lucide-react"
import Link from "next/link"

const rights = [
  {
    icon: Eye,
    title: "Right to Access",
    description: "You can request a copy of all personal data we hold about you. We will provide this within 30 days.",
  },
  {
    icon: Edit,
    title: "Right to Rectification",
    description: "You can request correction of inaccurate or incomplete personal data.",
  },
  {
    icon: Trash2,
    title: "Right to Erasure",
    description: 'You can request deletion of your personal data (the "right to be forgotten").',
  },
  {
    icon: Ban,
    title: "Right to Restrict Processing",
    description: "You can request that we limit how we use your data in certain circumstances.",
  },
  {
    icon: Download,
    title: "Right to Data Portability",
    description: "You can receive your data in a structured, commonly used format.",
  },
  {
    icon: Shield,
    title: "Right to Object",
    description: "You can object to processing based on legitimate interests or direct marketing.",
  },
]

export default function GDPRPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">GDPR Compliance</h1>
              <p className="text-lg text-muted-foreground">
                VIGISCAM™ is committed to protecting your data rights under the General Data Protection Regulation
                (GDPR).
              </p>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Your Data Rights</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Under GDPR, you have the following rights regarding your personal data.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rights.map((right, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <right.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{right.title}</h3>
                    <p className="text-sm text-muted-foreground">{right.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Exercise Rights */}
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">How to Exercise Your Rights</h2>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Via Your Account</h3>
                      <p className="text-muted-foreground">
                        Many data rights can be exercised directly through your account settings, including downloading
                        your data and deleting your account.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Contact Our DPO</h3>
                      <p className="text-muted-foreground">
                        For any data rights requests or questions, contact our Data Protection Officer at{" "}
                        <a href="mailto:dpo@vigiscam.ai" className="text-primary hover:underline">
                          dpo@vigiscam.ai
                        </a>
                        .
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Response Time</h3>
                      <p className="text-muted-foreground">
                        We will respond to your request within 30 days. Complex requests may take up to 90 days, and we
                        will notify you if this is the case.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Verification</h3>
                      <p className="text-muted-foreground">
                        To protect your privacy, we may need to verify your identity before processing certain requests.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Legal Basis */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Legal Basis for Processing</h2>

              <div className="space-y-4">
                {[
                  {
                    basis: "Contract Performance",
                    description:
                      "Processing necessary to provide you with our Services, including scam detection and protection.",
                  },
                  {
                    basis: "Legitimate Interests",
                    description:
                      "Processing for fraud prevention, security, and service improvement, balanced against your rights.",
                  },
                  {
                    basis: "Legal Obligation",
                    description: "Processing required to comply with applicable laws and regulations.",
                  },
                  {
                    basis: "Consent",
                    description:
                      "For optional features like marketing communications, we rely on your explicit consent.",
                  },
                ].map((item, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-primary mb-2">{item.basis}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Questions About GDPR?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our Data Protection Officer is available to answer any questions about your data rights or our GDPR
              compliance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="mailto:dpo@vigiscam.ai">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Contact DPO</Button>
              </Link>
              <Link href="/privacy">
                <Button variant="outline" className="bg-transparent">
                  View Privacy Policy
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
