import { useNavigate } from 'react-router-dom'

const STATS = [
  { label: 'Active Investments', value: '425+' },
  { label: 'Partner Organizations', value: '1,200+' },
  { label: 'Countries Reached', value: '28' },
  { label: 'Total Committed', value: '$4.9B' },
]

const TILES = [
  {
    to: '/search',
    bg: '#127A6A',
    title: 'Search & Discover',
    cta: 'Browse the portfolio',
    description: 'Full-text search across investments, partner organizations, foundation staff, and strategy documents. Filter by focus area, geography, team, or status.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="9" stroke="white" strokeWidth="2" />
        <path d="M21 21L27 27" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/geography',
    bg: '#014979',
    title: 'Explore by Geography',
    cta: 'View countries',
    description: 'See the 28 countries where the Foundation has active investments. Browse by region, view approved amounts, and understand where work is concentrated.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="2" />
        <path d="M4 16h24M16 4c-4 5-4 18 0 24M16 4c4 5 4 18 0 24" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    to: '/divisions',
    bg: '#314170',
    title: 'Browse by Division',
    cta: 'See all divisions',
    description: 'Explore how the Foundation is organized — 6 Program Divisions and 7 Operational Divisions, from Global Health and Gender Equality to Finance and Legal.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="4"  width="10" height="10" rx="2" stroke="white" strokeWidth="2" />
        <rect x="18" y="4" width="10" height="10" rx="2" stroke="white" strokeWidth="2" />
        <rect x="4" y="18" width="10" height="10" rx="2" stroke="white" strokeWidth="2" />
        <rect x="18" y="18" width="10" height="10" rx="2" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },
]

export function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-aurora-bg-main">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div className="relative bg-aurora-org-section overflow-hidden" style={{ minHeight: '58vh' }}>

        {/* Decorative aurora borealis sweep */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 480"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          <path d="M-200 420 Q100 220 380 300 Q640 380 900 220 Q1100 100 1400 160"
            stroke="#58BBAC" strokeWidth="80" opacity="0.07" strokeLinecap="round" />
          <path d="M-200 330 Q150 130 380 220 Q620 310 900 140 Q1100 10 1400 80"
            stroke="#20A490" strokeWidth="60" opacity="0.09" strokeLinecap="round" />
          <path d="M-200 240 Q150 40 380 130 Q620 220 900 60 Q1100 -70 1400 0"
            stroke="#58BBAC" strokeWidth="40" opacity="0.06" strokeLinecap="round" />
          {/* Fine lines for detail */}
          <path d="M-200 415 Q100 215 380 295 Q640 375 900 215 Q1100 95 1400 155"
            stroke="white" strokeWidth="1.5" opacity="0.12" strokeLinecap="round" />
          <path d="M-200 325 Q150 125 380 215 Q620 305 900 135 Q1100 5 1400 75"
            stroke="white" strokeWidth="1" opacity="0.08" strokeLinecap="round" />
        </svg>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-24">
          {/* Large aurora logo mark */}
          <svg width="80" height="54" viewBox="0 0 80 54" fill="none" aria-hidden="true" className="mb-7">
            <path d="M2 46 Q20 24 40 32 Q60 40 78 20" stroke="#58BBAC" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M2 34 Q20 12 40 20 Q60 28 78 8"  stroke="#20A490" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M2 22 Q20  0 40  8 Q60 16 78 0"  stroke="white"   strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
          </svg>

          <h1 className="text-aurora-on-dark text-4xl sm:text-5xl font-bold tracking-tight mb-5 leading-tight">
            Aurora Knowledge Portal
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl mx-auto mb-12">
            Explore the Gates Foundation's investment portfolio, partner organizations,
            and strategic priorities — all in one place.
          </p>

          {/* Stats embedded in hero */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-16">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-aurora-on-dark tabular-nums">{stat.value}</p>
                <p className="text-[11px] text-white/45 mt-1.5 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Navigation tiles ───────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <p className="text-[11px] font-semibold text-aurora-hint uppercase tracking-widest mb-5">
          Where would you like to go?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TILES.map((tile) => (
            <button
              key={tile.to}
              type="button"
              onClick={() => navigate(tile.to)}
              className="text-left rounded-xl p-7 hover:opacity-90 active:scale-[0.99] transition-all group relative overflow-hidden"
              style={{ backgroundColor: tile.bg }}
            >
              {/* Subtle wave decoration in tile background */}
              <svg
                className="absolute bottom-0 right-0 opacity-[0.08] pointer-events-none"
                width="160" height="100" viewBox="0 0 160 100" fill="none"
                aria-hidden="true"
              >
                <path d="M-20 90 Q40 50 80 68 Q120 86 180 50" stroke="white" strokeWidth="40" strokeLinecap="round" />
                <path d="M-20 65 Q40 25 80 43 Q120 61 180 25" stroke="white" strokeWidth="28" strokeLinecap="round" />
              </svg>

              <div className="relative z-10">
                <div className="mb-5 text-white">
                  {tile.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2.5 leading-snug">
                  {tile.title}
                </h3>
                <p className="text-sm text-white/65 leading-relaxed mb-6">
                  {tile.description}
                </p>
                <div className="flex items-center gap-1.5 text-sm text-white/50 group-hover:text-white/90 transition-colors">
                  {tile.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Data sources note */}
        <p className="mt-8 text-xs text-aurora-hint text-center">
          Aurora aggregates data from INVEST and the Insight Strategy Library.
          Investment data is illustrative for prototype purposes.
        </p>
      </div>
    </div>
  )
}
