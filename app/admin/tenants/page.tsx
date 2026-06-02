'use client'

import useSWR from 'swr'
import { PageLayout } from '@/components/dashboard/page-layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Globe, Loader2, Users, Smartphone } from 'lucide-react'
import { backend } from '@/lib/backend'
import { useAuth } from '@/lib/auth-context'

interface Tenant {
  id: string
  name: string
  type: string
  status: string
  createdAt: string
  _count?: { memberships: number; devices: number }
}

async function fetchTenants(): Promise<Tenant[]> {
  const { data, error, response } = await backend.GET('/api/v1/admin/oversight/tenants')
  if (error || !response.ok) throw new Error(`Failed to load tenants (${response.status})`)
  return (data as unknown as Tenant[]) ?? []
}

const statusColor = (s: string) =>
  s === 'ACTIVE'
    ? 'bg-green-100 text-green-700 border-0'
    : s === 'SUSPENDED'
      ? 'bg-amber-100 text-amber-700 border-0'
      : 'bg-muted text-muted-foreground border-0'

export default function AdminTenantsPage() {
  const { isAuthenticated } = useAuth()
  const { data, error, isLoading } = useSWR(
    isAuthenticated ? 'admin-tenants' : null,
    fetchTenants,
    { revalidateOnFocus: false },
  )

  return (
    <PageLayout role="admin" title="Tenant Management" subtitle="All tenants on the platform">
      <div className="space-y-6">
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            Could not load tenants. {String((error as Error).message ?? error)}
          </div>
        )}
        {isLoading && !data && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading tenants…
          </div>
        )}
        {data && data.length === 0 && (
          <p className="text-sm text-muted-foreground">No tenants found.</p>
        )}

        {data?.map((tenant) => (
          <Card key={tenant.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-foreground">{tenant.name}</h3>
                  <Badge className={statusColor(tenant.status)}>{tenant.status}</Badge>
                  <Badge className="bg-muted text-muted-foreground border-0">{tenant.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {tenant._count?.memberships ?? 0} members
                  </span>
                  <span className="flex items-center gap-1">
                    <Smartphone className="h-3 w-3" /> {tenant._count?.devices ?? 0} devices
                  </span>
                  <span>since {new Date(tenant.createdAt).toLocaleDateString()}</span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
