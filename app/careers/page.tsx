import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  MapPin,
  Clock,
  Briefcase,
  Heart,
  Users,
  Zap,
  GraduationCap,
  Coffee,
  Plane,
  DollarSign,
  ChevronRight,
  Building,
  Code,
  Headphones,
  BarChart,
  Megaphone,
} from "lucide-react"

const departments = [
  { name: "Engineering", icon: Code, count: 8 },
  { name: "Product", icon: Zap, count: 3 },
  { name: "Customer Success", icon: Headphones, count: 4 },
  { name: "Data Science", icon: BarChart, count: 2 },
  { name: "Marketing", icon: Megaphone, count: 2 },
  { name: "Operations", icon: Building, count: 3 },
]

const jobs = [
  {
    id: 1,
    title: "Senior AI/ML Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "Hybrid",
    salary: "$180K - $250K",
    posted: "2 days ago",
    featured: true,
  },
  {
    id: 2,
    title: "Frontend Engineer (React/Next.js)",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "Remote OK",
    salary: "$140K - $200K",
    posted: "1 week ago",
    featured: true,
  },
  {
    id: 3,
    title: "Voice Recognition Specialist",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "On-site",
    salary: "$150K - $220K",
    posted: "3 days ago",
    featured: false,
  },
  {
    id: 4,
    title: "Product Manager - Consumer Safety",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "Hybrid",
    salary: "$160K - $210K",
    posted: "5 days ago",
    featured: true,
  },
  {
    id: 5,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Austin, TX",
    type: "Full-time",
    remote: "Hybrid",
    salary: "$90K - $120K",
    posted: "1 week ago",
    featured: false,
  },
  {
    id: 6,
    title: "Senior Data Scientist",
    department: "Data Science",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "Hybrid",
    salary: "$170K - $230K",
    posted: "4 days ago",
    featured: false,
  },
  {
    id: 7,
    title: "Security Researcher",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "Hybrid",
    salary: "$160K - $220K",
    posted: "1 week ago",
    featured: false,
  },
  {
    id: 8,
    title: "Technical Support Specialist",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    remote: "Remote",
    salary: "$60K - $80K",
    posted: "2 weeks ago",
    featured: false,
  },
]

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive medical, dental, and vision coverage for you and your family",
  },
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description: "Top-tier salaries plus equity packages for all employees",
  },
  { icon: Plane, title: "Unlimited PTO", description: "Take the time you need to recharge and be your best self" },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description: "$5,000 annual budget for courses, conferences, and books",
  },
  { icon: Coffee, title: "Remote Flexibility", description: "Work from home, office, or anywhere that works for you" },
  { icon: Users, title: "Team Events", description: "Regular team offsites, happy hours, and company retreats" },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-accent text-accent-foreground mb-4">We're Hiring</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Join the Fight Against Scams</h1>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Help us protect millions of vulnerable people from fraud, deepfakes, and digital deception. Build
                technology that makes a real difference in people's lives.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  View Open Positions
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  Learn About Our Culture
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every year, Americans lose over $10 billion to scams and fraud. Our elderly population is
                disproportionately targeted, with devastating financial and emotional consequences. At VIGISCAM™,
                we're building cutting-edge technology to protect the most vulnerable members of our society.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-4xl font-bold text-primary">500K+</p>
                  <p className="text-sm text-muted-foreground">People Protected</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">$47M+</p>
                  <p className="text-sm text-muted-foreground">Fraud Prevented</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground">Detection Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Work at FreezeGuard?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We believe in taking care of our team so they can focus on taking care of others
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-background" id="positions">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-lg text-muted-foreground">Find your next role at VIGISCAM™</p>
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <Button variant="secondary" className="bg-primary text-primary-foreground">
                All Departments
              </Button>
              {departments.map((dept) => (
                <Button key={dept.name} variant="outline">
                  {dept.name} ({dept.count})
                </Button>
              ))}
            </div>

            {/* Job Listings */}
            <div className="max-w-4xl mx-auto space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className={job.featured ? "border-primary/50" : ""}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          {job.featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{job.remote}</Badge>
                          <Badge variant="outline">{job.salary}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{job.posted}</span>
                        <Button className="bg-primary text-primary-foreground">
                          Apply
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-secondary-foreground">Our Values</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-foreground">Protection First</h3>
                      <p className="text-secondary-foreground/80">Every decision we make prioritizes user safety</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <Heart className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-foreground">Empathy Driven</h3>
                      <p className="text-secondary-foreground/80">We understand the real-world impact of our work</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-foreground">Relentless Innovation</h3>
                      <p className="text-secondary-foreground/80">Scammers evolve - we evolve faster</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-foreground">Inclusive by Design</h3>
                      <p className="text-secondary-foreground/80">Accessible technology for everyone</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg p-8">
                <img src="/diverse-team-collaboration.png" alt="FreezeGuard team" className="rounded-lg w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              We're always looking for talented people who share our mission. Send us your resume and we'll reach out
              when a matching position opens up.
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Submit General Application
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
