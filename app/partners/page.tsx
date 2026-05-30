import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building,
  Landmark,
  Phone,
  Globe,
  Handshake,
  CheckCircle2,
  ArrowRight,
  BadgeCheck,
  TrendingUp,
  Users,
} from "lucide-react"

const partnerTypes = [
  {
    icon: Landmark,
    title: "Financial Institutions",
    description: "Banks, credit unions, and financial services companies protecting customers from fraud",
    benefits: [
      "White-label integration",
      "Real-time fraud alerts",
      "Customer protection dashboard",
      "Compliance reporting",
    ],
  },
  {
    icon: Phone,
    title: "Telecommunications",
    description: "Phone carriers and VoIP providers integrating scam protection at the network level",
    benefits: ["Network-level integration", "Call screening APIs", "Scam number database", "Carrier analytics"],
  },
  {
    icon: Building,
    title: "Technology Companies",
    description: "Software and hardware companies embedding scam protection into their products",
    benefits: ["SDK integration", "API access", "Co-branded solutions", "Technical support"],
  },
  {
    icon: Globe,
    title: "Government & Nonprofits",
    description: "Public sector organizations and NGOs protecting vulnerable populations",
    benefits: ["Special pricing", "Community programs", "Data sharing agreements", "Public awareness campaigns"],
  },
]

const stats = [
  { value: "150+", label: "Partner Organizations" },
  { value: "50M+", label: "Protected Users" },
  { value: "$2.3B", label: "Fraud Prevented" },
  { value: "99.2%", label: "Partner Satisfaction" },
]

const testimonials = [
  {
    quote: "FreezeGuard's integration has reduced fraud-related losses by 67% for our elderly customers.",
    author: "James Wilson",
    title: "VP of Customer Protection",
    company: "First National Bank",
  },
  {
    quote: "The API was easy to integrate and their support team was exceptional throughout the process.",
    author: "Maria Chen",
    title: "CTO",
    company: "SecureCall Networks",
  },
  {
    quote: "Our members feel safer knowing FreezeGuard is protecting them. It's been a game-changer.",
    author: "Robert Thompson",
    title: "Executive Director",
    company: "Senior Citizens Alliance",
  },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Handshake className="h-6 w-6" />
                <span className="text-primary-foreground/80 font-medium">Partner Program</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner With VIGISCAM™</h1>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Join our network of leading organizations committed to protecting people from scams and fraud. Together,
                we can make a bigger impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Become a Partner
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  View Partner Directory
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-secondary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Partnership Opportunities</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We work with organizations across industries to bring scam protection to more people
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {partnerTypes.map((type, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <type.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Partner With Us?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Benefits of joining the FreezeGuard partner ecosystem
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BadgeCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Industry-Leading Technology</h3>
                  <p className="text-muted-foreground">
                    Access our proprietary AI that detects 98% of scams with best-in-class accuracy
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Revenue Opportunities</h3>
                  <p className="text-muted-foreground">
                    Competitive revenue sharing and referral programs for qualified partners
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Dedicated Support</h3>
                  <p className="text-muted-foreground">
                    Partner success managers, technical support, and co-marketing resources
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Partners Say</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      <p className="text-sm text-primary">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Application Form */}
        <section className="py-16 bg-secondary" id="apply">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Apply to Become a Partner</CardTitle>
                  <CardDescription>
                    Fill out the form below and our partnerships team will be in touch within 2 business days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email *</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input id="company" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title *</Label>
                      <Input id="title" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="partnerType">Partnership Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select partnership type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="financial">Financial Institution</SelectItem>
                          <SelectItem value="telecom">Telecommunications</SelectItem>
                          <SelectItem value="technology">Technology Company</SelectItem>
                          <SelectItem value="government">Government/Nonprofit</SelectItem>
                          <SelectItem value="reseller">Reseller/Distributor</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-50">1-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-1000">201-1000 employees</SelectItem>
                          <SelectItem value="1001-5000">1001-5000 employees</SelectItem>
                          <SelectItem value="5000+">5000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">How would you like to partner with us?</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your organization and how you envision working together..."
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary text-primary-foreground">
                      Submit Partnership Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Questions About Partnering?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our partnerships team is here to help. Reach out to discuss how we can work together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Contact Partnerships Team
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Download Partner Kit
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
