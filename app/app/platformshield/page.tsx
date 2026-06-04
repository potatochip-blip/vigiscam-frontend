'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PlatformShieldIndexPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/app/platformshield/overview")
  }, [router])
  return null
}
