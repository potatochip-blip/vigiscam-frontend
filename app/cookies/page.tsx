import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
              <p className="text-muted-foreground">Last updated: December 1, 2024</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card border-border">
                <CardContent className="p-8 md:p-12">
                  <div className="prose prose-invert max-w-none space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-foreground">What Are Cookies</h2>
                      <p className="text-muted-foreground">
                        Cookies are small text files that are placed on your device when you visit a website. They help
                        websites remember your preferences and improve your experience.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-foreground">How We Use Cookies</h2>
                      <p className="text-muted-foreground mb-4">We use cookies for the following purposes:</p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            <strong className="text-foreground">Essential Cookies:</strong> Required for basic website
                            functionality and security
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            <strong className="text-foreground">Authentication:</strong> To keep you logged in and
                            secure your session
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            <strong className="text-foreground">Preferences:</strong> To remember your settings and
                            preferences
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            <strong className="text-foreground">Analytics:</strong> To understand how you use our
                            website (privacy-focused, no PII)
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-foreground">Types of Cookies We Use</h2>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/20 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Strictly Necessary Cookies</h3>
                          <p className="text-sm text-muted-foreground">
                            These cookies are essential for the website to function properly. They cannot be disabled.
                          </p>
                        </div>
                        <div className="p-4 bg-muted/20 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Functional Cookies</h3>
                          <p className="text-sm text-muted-foreground">
                            These cookies enable personalized features and remember your preferences.
                          </p>
                        </div>
                        <div className="p-4 bg-muted/20 rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">Analytics Cookies</h3>
                          <p className="text-sm text-muted-foreground">
                            These cookies help us understand how visitors interact with our website. We use
                            privacy-focused analytics that do not track personal information.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-foreground">Managing Cookies</h2>
                      <p className="text-muted-foreground mb-4">
                        You can control cookies through your browser settings:
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Block all cookies (may affect website functionality)
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Block third-party cookies only
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Delete cookies when you close your browser
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Receive notifications before cookies are placed
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
                      <p className="text-muted-foreground">
                        If you have questions about our use of cookies, please contact us at{" "}
                        <a href="mailto:privacy@vigiscam.ai" className="text-primary hover:underline">
                          privacy@vigiscam.ai
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <Link href="/privacy">
                  <Button variant="outline" className="bg-transparent">
                    View Full Privacy Policy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
