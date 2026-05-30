'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-primary text-primary-foreground mb-4">Contact Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Let&apos;s Talk
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Have questions? We&apos;re here to help. Reach out to our team anytime.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    className="w-full bg-muted border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">Get in touch</h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">support@vigiscam.ai</p>
                    <p className="text-muted-foreground text-sm">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground text-sm">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Office</h3>
                    <p className="text-muted-foreground">123 Tech Street</p>
                    <p className="text-muted-foreground">San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/pricing" className="block text-primary hover:underline text-sm">
                    View Pricing
                  </Link>
                  <Link href="/demo" className="block text-primary hover:underline text-sm">
                    Watch Demo
                  </Link>
                  <Link href="/company/press" className="block text-primary hover:underline text-sm">
                    Press Kit
                  </Link>
                  <Link href="/careers" className="block text-primary hover:underline text-sm">
                    Careers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Departments & Teams</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { dept: "Sales", email: "sales@vigiscam.ai", info: "Enterprise & B2B inquiries" },
              { dept: "Support", email: "support@vigiscam.ai", info: "Technical assistance" },
              { dept: "Press", email: "press@vigiscam.ai", info: "Media & press inquiries" },
              { dept: "Partnerships", email: "partners@vigiscam.ai", info: "Integration & API partners" },
            ].map((dept, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <h3 className="font-bold text-foreground mb-2">{dept.dept}</h3>
                <a href={`mailto:${dept.email}`} className="text-primary text-sm hover:underline">
                  {dept.email}
                </a>
                <p className="text-muted-foreground text-xs mt-2">{dept.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Need Emergency Support?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Call our 24/7 emergency line for immediate assistance.</p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            +1 (555) 999-1234
          </Button>
        </div>
      </section>
    </div>
  )
}
