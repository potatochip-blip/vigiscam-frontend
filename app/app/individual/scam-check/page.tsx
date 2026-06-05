'use client'

import { PageLayout } from "@/components/dashboard/page-layout"
import { ScamCheckForm } from "@/components/portals/individual-tables"

export default function IndividualScamCheckPage() {
  return (
    <PageLayout role="individual" title="Scam Check" subtitle="Check a phone number, link, email, or message for scam risk">
      <div className="max-w-3xl mx-auto"><ScamCheckForm /></div>
    </PageLayout>
  )
}
