# VIGISCAM™ Backend Integration Guide

## Overview

This document provides comprehensive instructions for integrating the VIGISCAM™ frontend with a production backend. The frontend is fully built and ready for backend connection.

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 16)                     │
├─────────────────────────────────────────────────────────────────┤
│  Pages (app/)          │  Components           │  Lib            │
│  - 100+ pages          │  - UI components      │  - api-client.ts│
│  - All roles           │  - Dashboard shell    │  - hooks.ts     │
│  - Public & protected  │  - Forms              │  - types.ts     │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API LAYER                                │
├─────────────────────────────────────────────────────────────────┤
│  lib/api-client.ts     - Typed HTTP client for all endpoints    │
│  lib/hooks.ts          - SWR hooks with caching & revalidation  │
│  lib/types.ts          - TypeScript interfaces for all models   │
│  app/api/              - Next.js API routes (stubs ready)       │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR BACKEND (To Implement)                   │
├─────────────────────────────────────────────────────────────────┤
│  Database              │  Auth Provider        │  Services       │
│  - PostgreSQL/Supabase │  - Supabase Auth      │  - Scam Intel   │
│  - Redis (cache)       │  - Custom JWT         │  - ML Models    │
│  - Blob storage        │  - OAuth providers    │  - Takedowns    │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Set Environment Variables

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.vigiscam.com

# Authentication
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Database
DATABASE_URL=postgresql://...

# External Services
STRIPE_SECRET_KEY=sk_...
SENDGRID_API_KEY=SG....

# Feature Flags
NEXT_PUBLIC_ENABLE_MFA=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### 2. Connect Authentication

The authentication system is in `lib/auth-context.tsx`. Currently uses localStorage for demo purposes.

**To connect to Supabase Auth:**

```typescript
// lib/auth-context.tsx - Replace the login function:

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

const login = async (email: string, password: string): Promise<boolean> => {
  setIsLoading(true)
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    setIsLoading(false)
    return false
  }
  
  // Fetch user profile from your database
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single()
  
  setUser(profile)
  setIsLoading(false)
  return true
}
```

### 3. Replace Mock Data

All mock data is centralized in `lib/scam-intelligence-data.ts`. The hooks in `lib/hooks.ts` reference this mock data.

**To connect to real API:**

```typescript
// lib/hooks.ts - Update each hook:

export function useRegistry(params = {}) {
  return useSWR(
    ["registry", params],
    async () => {
      // BEFORE (mock):
      // return { data: mockRegistryEntries, pagination: {...} }
      
      // AFTER (real API):
      const response = await api.scamIntelligence.getRegistry(params)
      if (!response.success) throw new Error(response.error?.message)
      return response.data
    },
    SWR_CONFIG
  )
}
```

## API Endpoints Reference

### Authentication

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/auth/login` | User login | `{ email, password, mfaCode? }` | `LoginResponse` |
| POST | `/api/auth/signup` | User registration | `{ email, password, name, role }` | `SignupResponse` |
| POST | `/api/auth/logout` | User logout | - | `void` |
| GET | `/api/auth/session` | Get current session | - | `AuthSession` |
| POST | `/api/auth/refresh` | Refresh access token | `{ refreshToken }` | `AuthSession` |
| POST | `/api/auth/forgot-password` | Request password reset | `{ email }` | `void` |
| POST | `/api/auth/reset-password` | Reset password | `{ token, password }` | `void` |
| POST | `/api/auth/verify-mfa` | Verify MFA code | `{ code }` | `AuthSession` |

### Scam Intelligence

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/scam-intelligence/check` | Check indicator | `{ indicator, type? }` | `IndicatorCheckResponse` |
| GET | `/api/scam-intelligence/registry` | Get registry entries | Query params | `PaginatedResponse<RegistryEntry>` |
| GET | `/api/scam-intelligence/registry/:id` | Get single entry | - | `RegistryEntry` |
| GET | `/api/scam-intelligence/networks` | Get scam networks | Query params | `PaginatedResponse<ScamNetwork>` |
| GET | `/api/scam-intelligence/networks/:id` | Get single network | - | `ScamNetwork` |
| GET | `/api/scam-intelligence/latest-alerts` | Get latest alerts | `?limit=10` | `RegistryEntry[]` |
| GET | `/api/scam-intelligence/takedowns` | Get takedowns | Query params | `PaginatedResponse<RegistryEntry>` |
| POST | `/api/scam-intelligence/submit-report` | Submit scam report | `FormData` | `SubmitReportResponse` |

### Dashboard & Analytics

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/api/dashboard/stats` | Get dashboard statistics | `DashboardStats` |
| GET | `/api/dashboard/activity` | Get activity log | `PaginatedResponse<ActivityLogEntry>` |
| GET | `/api/dashboard/threats-trend` | Get threats trend | `{ date, count }[]` |

### Cases (Investigators, Agencies)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/cases` | Get cases | Query params | `PaginatedResponse<Case>` |
| GET | `/api/cases/:id` | Get single case | - | `Case` |
| POST | `/api/cases` | Create case | `Partial<Case>` | `Case` |
| PATCH | `/api/cases/:id` | Update case | `Partial<Case>` | `Case` |
| POST | `/api/cases/:id/notes` | Add case note | `{ content, isInternal }` | `CaseNote` |
| GET | `/api/cases/:id/notes` | Get case notes | - | `CaseNote[]` |

### Admin Operations

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/admin/verification-queue` | Get verification queue | Query params | `PaginatedResponse<VerificationQueueItem>` |
| POST | `/api/admin/verification-queue/:id/decision` | Make decision | `{ decision, notes? }` | `VerificationQueueItem` |
| GET | `/api/admin/public-registry` | Get public drafts | Query params | `PaginatedResponse<PublicRegistryDraft>` |
| PATCH | `/api/admin/public-registry/:id` | Update entry | `Partial<PublicRegistryDraft>` | `PublicRegistryDraft` |
| POST | `/api/admin/public-registry/:id/publish` | Publish entry | - | `PublicRegistryDraft` |
| POST | `/api/admin/public-registry/:id/unpublish` | Unpublish entry | `{ reason? }` | `PublicRegistryDraft` |
| GET | `/api/admin/appeals` | Get appeals | Query params | `PaginatedResponse<CorrectionAppeal>` |
| POST | `/api/admin/appeals/:id/resolve` | Resolve appeal | `{ resolution, notes? }` | `CorrectionAppeal` |
| GET | `/api/admin/users` | Get all users | Query params | `PaginatedResponse<User>` |
| PATCH | `/api/admin/users/:id` | Update user | `Partial<User>` | `User` |

### Alerts & Notifications

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/api/alerts` | Get user alerts | `PaginatedResponse<Alert>` |
| POST | `/api/alerts/:id/read` | Mark alert as read | `Alert` |
| POST | `/api/alerts/read-all` | Mark all as read | `void` |
| GET | `/api/alerts/unread-count` | Get unread count | `{ count: number }` |

### Settings

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/settings/user` | Get user settings | - | `UserSettings` |
| PATCH | `/api/settings/user` | Update user settings | `Partial<UserSettings>` | `UserSettings` |
| GET | `/api/settings/organization` | Get org settings | - | `OrganizationSettings` |
| PATCH | `/api/settings/organization` | Update org settings | `Partial<OrganizationSettings>` | `OrganizationSettings` |

## Database Schema

### Recommended Tables

```sql
-- Users & Authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  organization VARCHAR(255),
  avatar TEXT,
  verified BOOLEAN DEFAULT FALSE,
  onboarding_complete BOOLEAN DEFAULT FALSE,
  mfa_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scam Intelligence Registry
CREATE TABLE registry_entries (
  id VARCHAR(50) PRIMARY KEY,
  indicator TEXT NOT NULL,
  indicator_type indicator_type NOT NULL,
  scam_family scam_family NOT NULL,
  status verification_status NOT NULL,
  first_seen DATE NOT NULL,
  last_seen DATE NOT NULL,
  linked_network VARCHAR(255),
  case_count INTEGER DEFAULT 0,
  takedown_status takedown_status DEFAULT 'pending',
  region VARCHAR(100),
  summary TEXT,
  common_phrases TEXT[],
  related_indicators TEXT[],
  date_verified DATE,
  recommended_action TEXT,
  evidence_summary TEXT,
  confidence_score DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scam Networks
CREATE TABLE scam_networks (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  aliases TEXT[],
  risk network_risk NOT NULL,
  description TEXT,
  first_identified DATE,
  last_activity DATE,
  total_indicators INTEGER DEFAULT 0,
  active_indicators INTEGER DEFAULT 0,
  confirmed_cases INTEGER DEFAULT 0,
  estimated_victims INTEGER DEFAULT 0,
  estimated_losses DECIMAL(15,2) DEFAULT 0,
  origin_regions TEXT[],
  target_regions TEXT[],
  primary_scam_types scam_family[],
  tactics TEXT[],
  signatures TEXT[],
  takedown_status takedown_status DEFAULT 'pending',
  law_enforcement_involved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports
CREATE TABLE scam_reports (
  id VARCHAR(50) PRIMARY KEY,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_by UUID REFERENCES users(id),
  status report_status DEFAULT 'submitted',
  priority report_priority DEFAULT 'medium',
  scam_type scam_family NOT NULL,
  indicator_type indicator_type NOT NULL,
  indicator_value TEXT NOT NULL,
  victim_impact VARCHAR(50),
  financial_loss DECIMAL(15,2),
  currency VARCHAR(10) DEFAULT 'USD',
  description TEXT,
  assigned_to UUID REFERENCES users(id),
  review_notes TEXT,
  reviewed_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cases
CREATE TABLE cases (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status case_status DEFAULT 'open',
  priority case_priority DEFAULT 'medium',
  assigned_to UUID REFERENCES users(id),
  team VARCHAR(100),
  evidence_count INTEGER DEFAULT 0,
  victim_count INTEGER DEFAULT 0,
  estimated_loss DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Verification Queue
CREATE TABLE verification_queue (
  id VARCHAR(50) PRIMARY KEY,
  submission_id VARCHAR(50) NOT NULL,
  indicator_value TEXT NOT NULL,
  indicator_type indicator_type NOT NULL,
  suspected_scam_family scam_family NOT NULL,
  reviewer_confidence DECIMAL(5,2),
  repeated_report_count INTEGER DEFAULT 0,
  scamzy_network_match VARCHAR(255),
  a1_scamshield_match BOOLEAN DEFAULT FALSE,
  linked_entities TEXT[],
  public_safe_reviewed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  decision review_decision,
  assigned_reviewer UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- Alerts
CREATE TABLE alerts (
  id VARCHAR(50) PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type alert_type NOT NULL,
  severity alert_severity NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  action_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX idx_registry_indicator ON registry_entries(indicator);
CREATE INDEX idx_registry_type ON registry_entries(indicator_type);
CREATE INDEX idx_registry_status ON registry_entries(status);
CREATE INDEX idx_reports_status ON scam_reports(status);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_alerts_user ON alerts(user_id, read_at);
```

## User Roles & Permissions

| Role | Description | Accessible Routes |
|------|-------------|-------------------|
| `individual` | Personal protection users | `/app/individual/*` |
| `family` | Family protection plans | `/app/family/*` |
| `bankguard` | Financial institution staff | `/app/bankguard/*` |
| `platformshield` | Marketplace operators | `/app/platformshield/*` |
| `investigator` | Law enforcement / PI | `/app/investigator/*` |
| `agency` | Government agencies | `/app/agency/*` |
| `enterprise` | Enterprise customers | `/app/enterprise/*` |
| `admin` | Platform administrators | `/admin/*` |

### Permission Matrix

```typescript
const permissions = {
  // Registry
  "registry:read": ["all"],
  "registry:write": ["admin"],
  "registry:publish": ["admin"],
  
  // Reports
  "reports:create": ["all"],
  "reports:read:own": ["all"],
  "reports:read:all": ["admin", "investigator", "agency"],
  "reports:verify": ["admin"],
  
  // Cases
  "cases:read": ["admin", "investigator", "agency", "bankguard"],
  "cases:create": ["admin", "investigator", "agency"],
  "cases:assign": ["admin"],
  
  // Users
  "users:read": ["admin"],
  "users:manage": ["admin"],
  
  // Settings
  "settings:org": ["admin", "enterprise"],
}
```

## File Structure

```
lib/
├── api-client.ts      # Centralized HTTP client with all endpoints
├── auth-context.tsx   # Authentication provider (connect to Supabase/Auth0)
├── hooks.ts           # SWR hooks (replace mock data with API calls)
├── types.ts           # TypeScript interfaces (use as API contracts)
├── scam-intelligence-data.ts  # Mock data (remove after backend ready)
└── utils.ts           # Utility functions

app/api/
├── auth/
│   ├── login/route.ts
│   ├── signup/route.ts
│   ├── logout/route.ts
│   └── ...
├── scam-intelligence/
│   ├── check/route.ts         # Already implemented
│   ├── submit-report/route.ts # Already implemented
│   ├── registry/route.ts      # To implement
│   └── ...
├── dashboard/
│   ├── stats/route.ts
│   └── ...
├── admin/
│   ├── verification-queue/route.ts
│   ├── public-registry/route.ts
│   └── ...
└── ...
```

## Checklist

### Phase 1: Authentication
- [ ] Set up Supabase project
- [ ] Configure environment variables
- [ ] Update `lib/auth-context.tsx` to use Supabase Auth
- [ ] Implement session management
- [ ] Add MFA support
- [ ] Test login/signup/logout flows

### Phase 2: Core API
- [ ] Create database schema
- [ ] Implement `/api/scam-intelligence/*` routes
- [ ] Update hooks in `lib/hooks.ts` to call real API
- [ ] Remove mock data dependencies
- [ ] Add error handling

### Phase 3: Admin Features
- [ ] Implement verification queue API
- [ ] Implement public registry management
- [ ] Implement appeals/corrections system
- [ ] Add audit logging

### Phase 4: Real-time Features
- [ ] Set up WebSocket/SSE for live updates
- [ ] Implement real-time alerts
- [ ] Add live threat monitoring

### Phase 5: External Integrations
- [ ] Set up Stripe for payments
- [ ] Configure email provider (SendGrid/Postmark)
- [ ] Add analytics (Vercel Analytics)
- [ ] Set up error tracking (Sentry)

## Testing

### API Testing with curl

```bash
# Check indicator
curl -X POST http://localhost:3000/api/scam-intelligence/check \
  -H "Content-Type: application/json" \
  -d '{"indicator": "microsoft-support"}'

# Submit report
curl -X POST http://localhost:3000/api/scam-intelligence/submit-report \
  -H "Content-Type: application/json" \
  -d '{"scamType": "tech-support", "indicatorValue": "fake-support.com", "description": "..."}'
```

## Support

For questions about backend integration:
- Review the TypeScript types in `lib/types.ts`
- Check the API client methods in `lib/api-client.ts`
- Examine the hooks in `lib/hooks.ts` for data fetching patterns

The frontend is production-ready. All UI components, forms, validation, loading states, and error handling are implemented. Simply connect the API endpoints and replace mock data with real database queries.
