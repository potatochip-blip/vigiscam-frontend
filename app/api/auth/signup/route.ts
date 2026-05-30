/**
 * POST /api/auth/signup
 * 
 * Registers a new user account.
 * 
 * BACKEND INTEGRATION:
 * - Validate email uniqueness
 * - Hash password securely (bcrypt)
 * - Create user record in database
 * - Send verification email
 * - Return user data (without password)
 */

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, role = "individual", organization } = body

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: "Email, password, and name are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    // TODO: Replace with real user creation
    // Example with Supabase:
    // const { data, error } = await supabase.auth.signUp({ email, password })
    // if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    // 
    // await supabase.from('users').insert({
    //   id: data.user.id,
    //   email,
    //   name,
    //   role,
    //   organization,
    // })

    // Mock successful signup for development
    const mockUser = {
      id: `usr_${Date.now()}`,
      email,
      name,
      role,
      organization,
      verified: false,
      onboardingComplete: false,
    }

    return NextResponse.json({
      success: true,
      user: mockUser,
      verificationRequired: true,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
