import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Ear, Hand, Brain, Monitor, Keyboard, ZoomIn, CheckCircle2, Phone, Mail } from "lucide-react"

const accessibilityFeatures = [
  {
    icon: Eye,
    title: "Visual Accessibility",
    features: [
      "High contrast mode support",
      "Screen reader compatible (NVDA, JAWS, VoiceOver)",
      "Alt text for all images",
      "Scalable fonts up to 200%",
      "Color-blind friendly design",
    ],
  },
  {
    icon: Ear,
    title: "Auditory Accessibility",
    features: [
      "Visual alerts for all audio notifications",
      "Closed captions for video content",
      "Text transcripts for audio content",
      "Adjustable alert volumes",
    ],
  },
  {
    icon: Hand,
    title: "Motor Accessibility",
    features: [
      "Full keyboard navigation",
      "Large click targets (minimum 44px)",
      "No time-limited interactions",
      "Voice control compatible",
      "Reduced motion options",
    ],
  },
  {
    icon: Brain,
    title: "Cognitive Accessibility",
    features: [
      "Clear, simple language",
      "Consistent navigation patterns",
      "Error prevention and recovery",
      "Progress indicators",
      "Help text and tooltips",
    ],
  },
]

const standards = [
  { name: "WCAG 2.1 AA", description: "Web Content Accessibility Guidelines compliance" },
  { name: "Section 508", description: "US federal accessibility requirements" },
  { name: "ADA", description: "Americans with Disabilities Act compliance" },
  { name: "EN 301 549", description: "European accessibility standard" },
]

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Accessibility Statement</h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl">
              VIGISCAM™ is committed to ensuring digital accessibility for people with disabilities. We are
              continually improving the user experience for everyone and applying relevant accessibility standards.
            </p>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="border-l-4 border-primary pl-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
                <p className="text-muted-foreground">
                  We believe that the internet should be available and accessible to anyone, and are committed to
                  providing a website that is accessible to the widest possible audience, regardless of circumstance or
                  ability. This is especially important for our mission of protecting vulnerable populations from scams,
                  as many of our users may have visual, auditory, motor, or cognitive challenges.
                </p>
              </div>

              {/* Standards */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Standards We Follow</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {standards.map((standard, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">{standard.name}</p>
                          <p className="text-sm text-muted-foreground">{standard.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Accessibility Features</h2>
            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              {accessibilityFeatures.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">How to Use Accessibility Features</h2>

              <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Keyboard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Keyboard Navigation</h3>
                        <p className="text-muted-foreground mb-4">
                          Our entire website can be navigated using only a keyboard. Use these shortcuts:
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <kbd className="bg-muted px-2 py-1 rounded">Tab</kbd> - Move to next interactive element
                          </li>
                          <li>
                            <kbd className="bg-muted px-2 py-1 rounded">Shift + Tab</kbd> - Move to previous element
                          </li>
                          <li>
                            <kbd className="bg-muted px-2 py-1 rounded">Enter</kbd> - Activate buttons and links
                          </li>
                          <li>
                            <kbd className="bg-muted px-2 py-1 rounded">Space</kbd> - Toggle checkboxes, activate
                            buttons
                          </li>
                          <li>
                            <kbd className="bg-muted px-2 py-1 rounded">Esc</kbd> - Close modals and menus
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ZoomIn className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Text Resizing</h3>
                        <p className="text-muted-foreground mb-4">
                          You can resize text using your browser's built-in zoom features:
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <kbd className="bg-muted px-2 py-1 rounded">Ctrl/Cmd + +</kbd> - Increase text size
                          </li>
                          <li>
                            <kbd className="bg-muted px-2 py-1 rounded">Ctrl/Cmd + -</kbd> - Decrease text size
                          </li>
                          <li>
                            <kbd className="bg-muted px-2 py-1 rounded">Ctrl/Cmd + 0</kbd> - Reset to default size
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Monitor className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Screen Readers</h3>
                        <p className="text-muted-foreground">
                          VIGISCAM™ is optimized for screen readers including NVDA, JAWS, VoiceOver (Mac/iOS), and
                          TalkBack (Android). All interactive elements have appropriate ARIA labels and descriptions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4 text-secondary-foreground">Feedback & Assistance</h2>
              <p className="text-secondary-foreground/80 mb-8">
                We welcome your feedback on the accessibility of VIGISCAM™. If you encounter accessibility barriers
                or have suggestions for improvement, please contact us:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Email</p>
                      <a href="mailto:accessibility@vigiscam.ai" className="text-primary hover:underline">
                        accessibility@vigiscam.ai
                      </a>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Phone</p>
                      <a href="tel:1-800-FREEZE-AI" className="text-primary hover:underline">
                        1-800-FREEZE-AI
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-secondary-foreground/60 mt-8">Last updated: December 2025</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
