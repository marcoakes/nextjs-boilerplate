import * as React from "react";

// =============== Types ===============
type GaugeProps = { label: string; value: number };
type TileProps = {
  name: string;
  value: number; // percent 0..100
  spanCols?: number;
  spanRows?: number;
};

// =============== Helpers ===============
function pctToGradient(p: number) {
  // Cooler hues for higher uptime, warmer for lower.
  // We compute inline style so Tailwind preflight is not needed.
  if (p >= 99.9) return "linear-gradient(135deg,#0ea5e9,#2563eb)"; // sky→indigo
  if (p >= 99.5) return "linear-gradient(135deg,#10b981,#059669)"; // emerald
  if (p >= 98.0) return "linear-gradient(135deg,#22c55e,#16a34a)"; // green
  if (p >= 95.0) return "linear-gradient(135deg,#f59e0b,#ef4444)"; // amber→red
  return "linear-gradient(135deg,#f97316,#dc2626)"; // orange→red
}

function pctColor(p: number) {
  if (p >= 99.9) return "text-sky-50";
  if (p >= 99.5) return "text-emerald-50";
  if (p >= 98.0) return "text-lime-50";
  if (p >= 95.0) return "text-amber-50";
  return "text-red-50";
}

// =============== Primitives ===============
const Card: React.FC<{ children: React.ReactNode; className?: string }>
  = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 shadow-sm backdrop-blur ${className}`}>
    {children}
  </div>
);

const Gauge: React.FC<GaugeProps> = ({ label, value }) => {
  const size = 74; // px
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const angle = pct / 100; // 0..1 of the circumference
  const dash = angle * c;

  const track = "stroke-zinc-200 dark:stroke-zinc-800";
  const color = value >= 99.5 ? "stroke-emerald-500" : value >= 98 ? "stroke-amber-500" : "stroke-rose-500";

  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} className={track} strokeWidth={stroke} fill="none"/>
        <circle
          cx={size/2}
          cy={size/2}
          r={r}
          className={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c-dash}`}
        />
      </svg>
      <div className="leading-tight">
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{label}</div>
        <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{value.toFixed(2)}%</div>
      </div>
    </div>
  );
};

const Tile: React.FC<TileProps> = ({ name, value, spanCols = 1, spanRows = 1 }) => {
  const gradient = pctToGradient(value);
  const txt = pctColor(value);
  return (
    <div
      className={`relative rounded-xl p-4 md:p-6 lg:p-8 shadow-sm border border-black/5 flex flex-col justify-between select-none overflow-hidden col-span-${spanCols} row-span-${spanRows}`}
      style={{ background: gradient }}
    >
      <div className="text-xs md:text-sm font-medium/none text-white/90 drop-shadow-sm">{name}</div>
      <div className={`text-4xl md:text-5xl lg:text-7xl font-extrabold ${txt}`}>{value.toFixed(1)}%</div>
    </div>
  );
};

// =============== Demo Data ===============
const tiles: TileProps[] = [
  { name: "Backend-ops-01", value: 99.11 },
  { name: "Backend-ops-02", value: 98.58 },
  { name: "Backend-ops-03", value: 97.78 },
  { name: "Backend-ops-04", value: 96.61 },
  { name: "Frontend-web-01", value: 92.63 },
  { name: "Frontend-web-02", value: 99.18 },
  { name: "Frontend-web-03", value: 99.96, spanCols: 2, spanRows: 2 },
  { name: "Payments", value: 99.72 },
  { name: "Search", value: 99.31 },
];

const gauges: GaugeProps[] = [
  { label: "Backend-ops-01", value: 99.11 },
  { label: "Backend-ops-02", value: 98.14 },
  { label: "Backend-ops-03", value: 99.63 },
  { label: "Backend-ops-04", value: 97.80 },
  { label: "Frontend-web-01", value: 92.05 },
  { label: "Frontend-web-02", value: 99.40 },
  { label: "CDN-edge", value: 99.96 },
];

// =============== Page ===============
export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-zinc-900/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-lg font-semibold tracking-tight">SRE Uptime Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <select className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>7 days</option>
            </select>
            <select className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm">
              <option>All Regions</option>
              <option>us-east-1</option>
              <option>eu-west-1</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-4">
        {/* Left rail gauges */}
        <Card className="col-span-12 md:col-span-3 lg:col-span-2 p-4 space-y-4 bg-zinc-900/80">
          <div className="text-xs uppercase tracking-wide text-zinc-400">Services</div>
          <div className="space-y-4">
            {gauges.map((g, i) => (
              <Gauge key={i} label={g.label} value={g.value} />
            ))}
          </div>
        </Card>

        {/* Tiled uptime wall */}
        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 auto-rows-[140px] md:auto-rows-[180px] gap-4">
            {tiles.map((t, i) => (
              <div key={i} className={`col-span-${t.spanCols ?? 1} row-span-${t.spanRows ?? 1}`}>
                <Tile {...t} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer legend */}
      <div className="max-w-7xl mx-auto px-4 pb-8 text-sm text-zinc-400 flex flex-wrap gap-4">
        <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-sm bg-sky-500"/> ≥ 99.9%</span>
        <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-sm bg-emerald-500"/> ≥ 99.5%</span>
        <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-sm bg-green-600"/> ≥ 98%</span>
        <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-sm bg-amber-500"/> ≥ 95%</span>
        <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-sm bg-rose-600"/> < 95%</span>
      </div>
    </div>
  );
}

