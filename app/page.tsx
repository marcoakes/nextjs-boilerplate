import React from "react";

// ---------- Helper UI Primitives (no external deps) ----------
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 shadow-sm backdrop-blur p-5 ${className}`}>
    {children}
  </div>
);

const Pill = ({ icon, label }) => (
  <div className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
    <div className="grid place-items-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
      {icon}
    </div>
    <div className="flex flex-col leading-tight">
      <span className="text-xs text-zinc-500">{label}</span>
      <span className="text-2xl font-semibold tracking-tight">{typeof icon === 'number' ? icon.toLocaleString() : null}</span>
    </div>
  </div>
);

const KPI = ({ icon, title, value, tone = "default" }) => {
  const toneClasses = {
    default: "",
    green: "ring-1 ring-green-100 bg-green-50/60 dark:ring-green-900/30 dark:bg-green-900/20",
    amber: "ring-1 ring-amber-100 bg-amber-50/60 dark:ring-amber-900/30 dark:bg-amber-900/20",
    blue: "ring-1 ring-blue-100 bg-blue-50/60 dark:ring-blue-900/30 dark:bg-blue-900/20",
    indigo: "ring-1 ring-indigo-100 bg-indigo-50/60 dark:ring-indigo-900/30 dark:bg-indigo-900/20",
  }[tone];

  return (
    <div className={`flex items-center gap-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 px-5 py-4 shadow-sm ${toneClasses}`}>
      <div className="grid place-items-center w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm text-zinc-700 dark:text-zinc-200">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-zinc-500 truncate">{title}</div>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
      </div>
    </div>
  );
};

const SegmentedBar = ({ segments, height = 12 }) => {
  return (
    <div className="w-full rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800" style={{ height }}>
      <div className="flex w-full h-full">
        {segments.map((s, i) => (
          <div
            key={i}
            title={`${s.label}: ${s.value}%`}
            style={{ width: `${s.value}%` }}
            className={`h-full ${(s.className ?? "")} transition-all`}
          />
        ))}
      </div>
    </div>
  );
};

const MiniLegend = ({ items }) => (
  <div className="flex flex-wrap gap-4 mt-3">
    {items.map((it, i) => (
      <div key={i} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
        <span className={`inline-block w-3 h-3 rounded-sm ${it.className}`} />
        <span className="font-medium">{it.label}</span>
        <span className="text-zinc-400">{it.aux}</span>
      </div>
    ))}
  </div>
);

// ---------- Demo Data ----------
const data = {
  teams: 64,
  features: 462,
  services: 1288,
  avgCoverage: 24,
  totals: 3697,
  breakdown: {
    component: { count: 1630, pct: 44.1 },
    integration: { count: 1818, pct: 49.2 },
    e2e: { count: 249, pct: 6.7 },
  },
};

// ---------- Dashboard ----------
export default function QADashboard() {
  const coverage = data.avgCoverage;
  const b = data.breakdown;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-50">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/40 border-b border-zinc-200/70 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Dashboard</h1>
          <div className="flex gap-3">
            <select className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm">
              <option>All Teams</option>
              <option>Platform</option>
              <option>Core Search</option>
              <option>Mobile</option>
            </select>
            <select className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>YTD</option>
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Test Coverage Overview</h2>
          <p className="text-sm text-zinc-500 mt-1">Real-time analytics dashboard for test coverage, team performance, and mission-critical service monitoring across the entire engineering organization.</p>
        </div>

        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPI
            icon={<UsersIcon />}
            title="Teams"
            value={data.teams}
            tone="blue"
          />
          <KPI
            icon={<TargetIcon />}
            title="Features"
            value={data.features}
            tone="green"
          />
          <KPI
            icon={<FlaskIcon />}
            title="Services"
            value={data.services}
            tone="amber"
          />
          <KPI
            icon={<TrendIcon />}
            title="Avg Coverage"
            value={`${coverage}%`}
            tone="indigo"
          />
        </section>

        {/* Overall Test Distribution */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 grid place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800"><ArrowUpRightIcon /></div>
            <h3 className="text-lg font-semibold tracking-tight">Overall Test Distribution</h3>
          </div>
          <p className="text-sm text-zinc-500 -mt-2">Complete testing coverage breakdown across all components, integration, and end-to-end tests</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Test Pyramid */}
            <Card>
              <h4 className="text-base font-semibold mb-4">Test Pyramid</h4>
              <div className="space-y-6">
                <div className="grid gap-2">
                  <div className="mx-auto">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-xl">E2E Tests <span className="opacity-60">{b.e2e.count} tests ({b.e2e.pct}%)</span></span>
                  </div>
                  <div className="h-10 rounded-xl bg-green-600/90 shadow-inner"></div>
                  <div className="h-16 rounded-xl bg-blue-600/90 shadow-inner"></div>
                </div>
                <div className="text-center text-3xl font-semibold">{data.totals.toLocaleString()}</div>
                <div className="text-center text-sm text-zinc-500 -mt-3">Total Tests</div>
              </div>
            </Card>

            {/* Overall Coverage */}
            <Card>
              <h4 className="text-base font-semibold mb-4">Overall Test Coverage</h4>
              <div className="flex items-baseline gap-3">
                <div className="text-4xl font-extrabold text-rose-600">{coverage.toFixed(1)}%</div>
                <div className="text-sm text-zinc-500">Overall Coverage</div>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-300">Component Tests</span>
                    <span className="text-zinc-400">{b.component.count.toLocaleString()} ({b.component.pct}%)</span>
                  </div>
                  <SegmentedBar
                    segments={[{ label: "Component", value: b.component.pct, className: "bg-blue-600" }]}
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-300">Integration Tests</span>
                    <span className="text-zinc-400">{b.integration.count.toLocaleString()} ({b.integration.pct}%)</span>
                  </div>
                  <SegmentedBar
                    segments={[{ label: "Integration", value: b.integration.pct, className: "bg-green-600" }]}
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-300">E2E Tests</span>
                    <span className="text-zinc-400">{b.e2e.count.toLocaleString()} ({b.e2e.pct}%)</span>
                  </div>
                  <SegmentedBar
                    segments={[{ label: "E2E", value: b.e2e.pct, className: "bg-amber-500" }]}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-zinc-500">
                  <span>Total Tests</span>
                  <span className="font-medium text-zinc-700 dark:text-zinc-200">{data.totals.toLocaleString()}</span>
                </div>
              </div>

              <MiniLegend
                items={[
                  { label: "Component", className: "bg-blue-600", aux: `${b.component.pct}%` },
                  { label: "Integration", className: "bg-green-600", aux: `${b.integration.pct}%` },
                  { label: "E2E", className: "bg-amber-500", aux: `${b.e2e.pct}%` },
                ]}
              />
            </Card>
          </div>
        </section>

        {/* Secondary grid (room for expansion) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2">
            <h4 className="text-base font-semibold mb-2">Recent Activity</h4>
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {[
                { t: "Service registry", a: "+37 component tests added", when: "2h ago" },
                { t: "Checkout flow", a: "3 flaky tests quarantined", when: "Yesterday" },
                { t: "Notifications", a: "E2E suite stabilized (CI pass rate 99.1%)", when: "Mon" },
              ].map((r, i) => (
                <li key={i} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.t}</div>
                    <div className="text-sm text-zinc-500">{r.a}</div>
                  </div>
                  <div className="text-xs text-zinc-400">{r.when}</div>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h4 className="text-base font-semibold mb-4">Quality Gates</h4>
            <ul className="space-y-3">
              {[
                { label: "Critical services ≥ 40% coverage", ok: false },
                { label: "All services ≥ 25% coverage", ok: true },
                { label: "No high-severity flaky tests", ok: true },
              ].map((g, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${g.ok ? "bg-emerald-500" : "bg-rose-500"}`} />
                  <span className="text-sm">{g.label}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </main>
    </div>
  );
}

// ---------- Tiny Icon Set (inline SVG to avoid deps) ----------
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <path d="M7.05 7.05a7 7 0 1 0 9.9 0" />
    <path d="M5 12a7 7 0 0 1 7-7" />
    <path d="M12 3v4m0 10v4m-9-9h4m10 0h4" />
  </svg>
);

const FlaskIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M10 2v6l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V2" />
    <path d="M8 6h8" />
  </svg>
);

const TrendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M3 3v18h18" />
    <path d="M19 7l-6 6-3-3-4 4" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);
