/**
 * Maps the backend's `MembershipRole` (UPPER_SNAKE, fine-grained) to the
 * frontend's `UserRole` (lowercase, one per dashboard area), and shapes a
 * backend auth user into the frontend `User` the AuthContext expects.
 *
 * FE-3 (auth bridge). Kept dependency-free so it can be imported from both
 * server route handlers and client components.
 */
import type { UserRole } from './auth-context';

/** The backend membership roles (mirrors prisma `MembershipRole`). */
export type BackendRole =
  | 'INDIVIDUAL'
  | 'FAMILY_GUARDIAN'
  | 'PROTECTED_USER'
  | 'BANK_ADMIN'
  | 'BANK_ANALYST'
  | 'PLATFORM_ADMIN'
  | 'PLATFORM_MODERATOR'
  | 'INVESTIGATOR'
  | 'AGENCY_ANALYST'
  | 'ENTERPRISE_ADMIN'
  | 'SUPER_ADMIN'
  | 'REVIEWER'
  | 'COMPLIANCE_OFFICER'
  | 'SUPPORT';

const ROLE_MAP: Record<BackendRole, UserRole> = {
  INDIVIDUAL: 'individual',
  FAMILY_GUARDIAN: 'family',
  PROTECTED_USER: 'family',
  BANK_ADMIN: 'bankguard',
  BANK_ANALYST: 'bankguard',
  PLATFORM_ADMIN: 'platformshield',
  PLATFORM_MODERATOR: 'platformshield',
  INVESTIGATOR: 'investigator',
  AGENCY_ANALYST: 'agency',
  ENTERPRISE_ADMIN: 'enterprise',
  // Internal VIGISCAM staff all land on the admin console.
  SUPER_ADMIN: 'admin',
  REVIEWER: 'admin',
  COMPLIANCE_OFFICER: 'admin',
  SUPPORT: 'admin',
};

/** Map a backend role to a frontend role; unknown roles fall back to individual. */
export function mapRole(role: string): UserRole {
  return ROLE_MAP[role as BackendRole] ?? 'individual';
}

/** The user shape the backend returns inside an AuthResult. */
export interface BackendAuthUser {
  id: string;
  email: string;
  fullName: string;
  tenantId: string;
  role: string;
}

/** The frontend User shape (subset used by AuthContext). */
export interface FrontendUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId: string;
  verified: boolean;
  onboardingComplete: boolean;
}

export function toFrontendUser(u: BackendAuthUser): FrontendUser {
  return {
    id: u.id,
    email: u.email,
    name: u.fullName,
    role: mapRole(u.role),
    tenantId: u.tenantId,
    // The backend account exists, so it's a real verified session. Onboarding
    // state isn't tracked server-side yet — default to complete so the app
    // doesn't trap real users in an onboarding wall.
    verified: true,
    onboardingComplete: true,
  };
}
