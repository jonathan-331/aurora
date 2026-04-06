import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/',          label: 'Home' },
  { to: '/search',    label: 'Search' },
  { to: '/geography', label: 'Geography' },
  { to: '/divisions', label: 'Divisions' },
]

export function NavBar() {
  return (
    <header className="bg-aurora-org-section sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 h-14 flex items-center gap-3">
        {/* Wordmark */}
        <NavLink
          to="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="Aurora home"
        >
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden="true">
            <path d="M2 20 Q8 10 16 13 Q24 16 30 8"  stroke="#58BBAC" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M2 16 Q9 7  16 10 Q23 13 30 5"  stroke="#20A490" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M2 12 Q9 3  16 7  Q24 11 30 2"  stroke="#FFFFFF"  strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.6" />
          </svg>
          <span className="text-aurora-on-dark font-semibold text-base tracking-tight leading-none group-hover:text-white/80 transition-colors">
            Aurora
          </span>
        </NavLink>

        <div className="h-4 w-px bg-white/20 mx-2" />

        {/* Page navigation */}
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded text-sm transition-colors ${
                  isActive
                    ? 'bg-white/15 text-aurora-on-dark font-medium'
                    : 'text-white/60 hover:text-aurora-on-dark hover:bg-white/10'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <a href="#" className="hidden md:block text-sm text-white/60 hover:text-aurora-on-dark transition-colors">
            Help
          </a>
          <div className="w-8 h-8 rounded-full bg-aurora-tbl-header border border-white/20 flex items-center justify-center text-aurora-on-dark text-xs font-semibold select-none">
            JS
          </div>
        </div>
      </div>
    </header>
  )
}
