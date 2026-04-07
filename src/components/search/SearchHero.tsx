
type SearchMode = 'browse' | 'chat'

interface SearchHeroProps {
  query: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  mode: SearchMode
  onModeChange: (mode: SearchMode) => void
}

const QUICK_TERMS = [
  'Reproductive Health',
  'East Africa',
  'Vaccine Delivery',
  'Digital Finance',
  'WASH',
]

export function SearchHero({ query, onChange, onSubmit, mode, onModeChange }: SearchHeroProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(query)
  }

  return (
    <div className="bg-aurora-org-section border-t border-white/10 pt-5 pb-5 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Mode toggle */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex rounded-lg bg-white/10 p-0.5 gap-0.5">
            <button
              type="button"
              onClick={() => onModeChange('browse')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mode === 'browse'
                  ? 'bg-white text-aurora-org-section'
                  : 'text-white/60 hover:text-aurora-on-dark'
              }`}
            >
              Browse
            </button>
            <button
              type="button"
              onClick={() => onModeChange('chat')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                mode === 'chat'
                  ? 'bg-white text-aurora-org-section'
                  : 'text-white/60 hover:text-aurora-on-dark'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1L7.3 4H11L8.5 6L9.5 9.5L6 7.5L2.5 9.5L3.5 6L1 4H4.7L6 1Z"
                  fill={mode === 'chat' ? '#0B3C38' : 'currentColor'} />
              </svg>
              Ask Aurora AI
            </button>
          </div>
        </div>

        {mode === 'browse' ? (
          <>
            <h1 className="text-aurora-on-dark text-base font-semibold mb-4 tracking-tight text-center">
              Search the Gates Foundation Portfolio
            </h1>

            {/* Search input */}
            <form onSubmit={handleSubmit}>
              <div className="flex rounded-lg overflow-hidden shadow-lg ring-2 ring-transparent focus-within:ring-aurora-link/50 transition-all bg-aurora-bg-content">
                <span className="flex items-center pl-4 text-aurora-hint shrink-0">
                  <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Search by topic, organization, staff name, region…"
                  className="flex-1 px-3 py-3.5 text-aurora-body placeholder-aurora-hint text-[15px] outline-none bg-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-aurora-tbl-header hover:bg-aurora-tbl-header-sort active:bg-aurora-org-section-active text-aurora-on-dark font-medium text-sm px-6 py-3.5 shrink-0 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick-search chips */}
            <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
              {QUICK_TERMS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => { onChange(term); onSubmit(term) }}
                  className="px-2.5 py-0.5 rounded-full text-xs text-white/70 border border-white/25 hover:bg-white/10 hover:text-aurora-on-dark transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Chat mode header */
          <h1 className="text-aurora-on-dark text-base font-semibold tracking-tight">
            Ask Aurora AI
          </h1>
        )}
      </div>
    </div>
  )
}
