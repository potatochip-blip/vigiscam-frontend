"use client"

import Link from "next/link"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, CheckCircle2, Mail, Edit, Users, Loader2, Activity } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { backend } from "@/lib/backend"
import { useAuth } from "@/lib/auth-context"
import { useSubscription } from "@/lib/hooks"

type RiskEvent = { id: string; eventType?: string; riskLevel?: string; createdAt?: string }
type Contact = { id: string; name?: string; relationship?: string; email?: string; phone?: string }

async function getArr<T>(path: string): Promise<T[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, response } = await (backend.GET as any)(path)
  if (error || !response.ok) throw new Error(`Failed (${response.status})`)
  return (data as T[]) ?? []
}

const initials = (name?: string) =>
  (name ?? "").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?"
const since = (v?: string) => {
  if (!v) return "—"
  const d = new Date(v)
  if (isNaN(d.getTime())) return "—"
  const mins = Math.round((Date.now() - d.getTime()) / 60000)
  if (mins < 60) return `${Math.max(mins, 1)}m ago`
  if (mins < 1440) return `${Math.round(mins / 60)}h ago`
  return `${Math.round(mins / 1440)}d ago`
}

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const { data: events } = useSWR(isAuthenticated ? "profile-events" : null, () => getArr<RiskEvent>("/api/v1/risk-events"), { revalidateOnFocus: false })
  const { data: contacts } = useSWR(isAuthenticated ? "profile-contacts" : null, () => getArr<Contact>("/api/v1/trusted-contacts"), { revalidateOnFocus: false })
  const { data: sub } = useSubscription()

  const evs = events ?? []
  const blocked = evs.filter((e) => ["HIGH", "CRITICAL"].includes((e.riskLevel ?? "").toUpperCase())).length
  const recent = [...evs].sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()).slice(0, 5)

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href={user ? `/app/${user.role}/overview` : "/dashboard"}><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"><Shield className="h-4 w-4 text-primary-foreground" /></div>
            <span className="font-semibold">Profile</span>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl py-8 px-4">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6">
              <Avatar className="h-24 w-24"><AvatarFallback className="text-2xl">{initials(user?.name)}</AvatarFallback></Avatar>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <h1 className="text-2xl font-bold">{user?.name ?? "—"}</h1>
                  {user?.verified && <Badge variant="secondary" className="w-fit mx-auto md:mx-0"><CheckCircle2 className="mr-1 h-3 w-3" /> Verified</Badge>}
                  <Badge variant="outline" className="w-fit mx-auto md:mx-0 capitalize">{user?.role ?? "user"}</Badge>
                </div>
                {user?.organization && <p className="text-muted-foreground mt-1">{user.organization}</p>}
                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground"><Mail className="h-4 w-4" /> {user?.email ?? "—"}</div>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href={user ? `/app/${user.role}/settings` : "/dashboard/settings"}><Edit className="mr-2 h-4 w-4" /> Settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Protection Statistics</CardTitle><CardDescription>Your security at a glance</CardDescription></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-primary">{evs.length}</p>
                  <p className="text-sm text-muted-foreground">Risk Events</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-green-600">{blocked}</p>
                  <p className="text-sm text-muted-foreground">High-Risk Blocked</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold">{contacts?.length ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Trusted Contacts</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-primary capitalize">{user?.role ?? "—"}</p>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Subscription</CardTitle><CardDescription>Your current plan details</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{sub?.plan ?? "—"}</p>
                    <p className="text-sm text-muted-foreground">{sub?.status === "ACTIVE" ? "Active subscription" : "No active subscription"}</p>
                  </div>
                  <Badge className={sub?.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700 border-0" : "bg-muted text-muted-foreground border-0"}>{sub?.status ?? "—"}</Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Renews</span><span>{sub?.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString() : "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Cancels at period end</span><span>{sub?.cancelAtPeriodEnd ? "Yes" : "No"}</span></div>
              </div>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/dashboard/settings">Manage Subscription</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Trusted Contacts</CardTitle><CardDescription>People who receive alerts and can verify your identity</CardDescription></div>
                <Button variant="outline" size="sm" asChild><Link href="/dashboard/trusted-contacts"><Users className="mr-2 h-4 w-4" /> Manage</Link></Button>
              </div>
            </CardHeader>
            <CardContent>
              {!contacts ? (
                <div className="flex items-center gap-2 py-6 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
              ) : contacts.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No trusted contacts yet.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-3">
                  {contacts.map((c) => (
                    <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      <Avatar><AvatarFallback>{initials(c.name)}</AvatarFallback></Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{c.name ?? "—"}</p>
                        <p className="text-xs text-muted-foreground">{c.relationship ?? c.email ?? c.phone ?? "—"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader><CardTitle>Recent Activity</CardTitle><CardDescription>Your latest security events</CardDescription></CardHeader>
            <CardContent>
              {!events ? (
                <div className="flex items-center gap-2 py-6 justify-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading…</div>
              ) : recent.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No activity yet.</p>
              ) : (
                <div className="space-y-4">
                  {recent.map((a) => {
                    const high = ["HIGH", "CRITICAL"].includes((a.riskLevel ?? "").toUpperCase())
                    return (
                      <div key={a.id} className="flex items-start gap-4">
                        <div className={`rounded-full p-2 ${high ? "bg-amber-500/20 text-amber-600" : "bg-primary/20 text-primary"}`}>
                          {high ? <Shield className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{a.eventType ?? "Risk event"}</p>
                          <p className="text-sm text-muted-foreground">Risk level {a.riskLevel ?? "—"}</p>
                          <p className="text-xs text-muted-foreground mt-1">{since(a.createdAt)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
