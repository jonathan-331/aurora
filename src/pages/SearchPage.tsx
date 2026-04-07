import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchHero } from '../components/search/SearchHero'
import { FilterSidebar } from '../components/filters/FilterSidebar'
import { ResultTabs } from '../components/results/ResultTabs'
import { ResultsArea } from '../components/results/ResultsArea'
import { AiChatPanel } from '../components/search/AiChatPanel'
import type { ActiveTab, FilterState } from '../types'
import { search } from '../services/search'
import { FILTER_CATEGORIES, buildFlatIndex } from '../data/filterOptions'

const FILTER_LABEL_MAP: Record<string, string> = {}
for (const opt of buildFlatIndex(FILTER_CATEGORIES)) {
  FILTER_LABEL_MAP[opt.id] = opt.label
}

type SearchMode = 'browse' | 'chat'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const initialTab   = (searchParams.get('tab') as ActiveTab) ?? 'all'
  const [inputValue, setInputValue]     = useState(initialQuery)
  const [submittedQuery, setSubmitted]  = useState(initialQuery)
  const [activeTab, setActiveTab]       = useState<ActiveTab>(initialTab)
  const [filters, setFilters]           = useState<FilterState>({ selectedOptions: new Set() })
  const [mode, setMode]                 = useState<SearchMode>('browse')

  const results = useMemo(
    () => search(submittedQuery, filters.selectedOptions),
    [submittedQuery, filters.selectedOptions]
  )

  const counts = {
    all:          results.investments.length + results.organizations.length + results.staff.length + results.documents.length,
    investment:   results.investments.length,
    organization: results.organizations.length,
    staff:        results.staff.length,
    document:     results.documents.length,
  }

  function handleSearch(query: string) {
    setSubmitted(query)
    setActiveTab('all')
    setMode('browse')
  }

  function handleToggle(id: string) {
    setFilters((prev) => {
      const next = new Set(prev.selectedOptions)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return { selectedOptions: next }
    })
  }

  return (
    <div className="min-h-screen bg-aurora-bg-main">
      <SearchHero
        query={inputValue}
        onChange={setInputValue}
        onSubmit={handleSearch}
        mode={mode}
        onModeChange={setMode}
      />

      <div className="max-w-screen-xl mx-auto px-6 py-6 flex gap-8 items-start">

        {/* Sidebar — hidden in chat mode */}
        {mode === 'browse' && (
          <div className="sticky top-14 max-h-[calc(100vh-4rem)] flex flex-col w-72 shrink-0">
            <FilterSidebar
              selectedOptions={filters.selectedOptions}
              onToggle={handleToggle}
              onClearAll={() => setFilters({ selectedOptions: new Set() })}
            />
          </div>
        )}

        {/* Main area */}
        <div className="flex-1 min-w-0">
          {mode === 'chat' ? (
            <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-6">
              <AiChatPanel />
            </div>
          ) : (
            <>
              {/* Result summary */}
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-aurora-label">
                  {submittedQuery ? (
                    <>
                      <span className="font-semibold text-aurora-body">{counts.all}</span>
                      {' '}results for{' '}
                      <span className="font-semibold text-aurora-body">"{submittedQuery}"</span>
                    </>
                  ) : (
                    <>
                      Browsing{' '}
                      <span className="font-semibold text-aurora-body">{counts.all}</span>
                      {' '}items in the portfolio
                    </>
                  )}
                </p>
                {counts.all > 0 && (
                  <p className="text-xs text-aurora-hint">Showing all entity types</p>
                )}
              </div>

              {/* Active filter banner */}
              {filters.selectedOptions.size > 0 && (
                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs bg-aurora-bg-content border border-aurora-separator rounded-lg px-4 py-2.5">
                  <span className="text-aurora-hint font-medium shrink-0">Filtered by:</span>
                  {Array.from(filters.selectedOptions).map((id) => (
                    <span key={id} className="flex items-center gap-1 text-aurora-label">
                      <span className="w-1.5 h-1.5 rounded-full bg-aurora-link shrink-0" />
                      {FILTER_LABEL_MAP[id] ?? id}
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFilters({ selectedOptions: new Set() })}
                    className="ml-auto text-aurora-link hover:text-aurora-link-hover transition-colors shrink-0"
                  >
                    Clear all
                  </button>
                </div>
              )}

              <div className="rounded-t-lg overflow-hidden border border-b-0 border-aurora-separator">
                <ResultTabs activeTab={activeTab} counts={counts} onTabChange={setActiveTab} />
              </div>

              <div className="border border-aurora-separator rounded-b-lg bg-aurora-bg-wide p-5">
                <ResultsArea
                  activeTab={activeTab}
                  investments={results.investments}
                  organizations={results.organizations}
                  staff={results.staff}
                  documents={results.documents}
                  query={submittedQuery}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
