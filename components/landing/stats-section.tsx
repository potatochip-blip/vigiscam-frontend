const stats = [
  { value: "99.7%", label: "Scam Detection Rate", sub: "A1SCAMSHIELD™ accuracy" },
  { value: "< 4s", label: "Intervention Time", sub: "FreezeLock™ average response" },
  { value: "2M+", label: "Protected Users", sub: "Across 38 countries" },
  { value: "$1.2B+", label: "Fraud Prevented", sub: "Cumulative since 2024" },
  { value: "4.2M", label: "Scam Actors Tracked", sub: "SCAMZY™ live intelligence" },
  { value: "38", label: "Countries Covered", sub: "Global scam network visibility" },
]

export function StatsSection() {
  return (
    <section className="py-14 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-secondary-foreground">{stat.label}</div>
              <div className="text-xs text-secondary-foreground/60 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
