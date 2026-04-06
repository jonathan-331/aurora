import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GEOGRAPHIC_REGIONS, getTotals, type CountryData } from '../data/geographyData'

function formatAmount(amount: number): string {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000)     return `$${(amount / 1_000_000).toFixed(1)}M`
  return `$${(amount / 1_000).toFixed(0)}K`
}

function CountryRow({ country }: { country: CountryData }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-aurora-separator last:border-b-0 group">
      <div className="flex items-center gap-2">
        {country.hasFieldOffice && (
          <span title="Field office" className="shrink-0">
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M5 1a3 3 0 0 1 3 3c0 2.5-3 6-3 6S2 6.5 2 4a3 3 0 0 1 3-3Z" fill="#20A490" />
              <circle cx="5" cy="4" r="1" fill="white" />
            </svg>
          </span>
        )}
        {!country.hasFieldOffice && <span className="w-[9px] shrink-0" />}
        <Link to={`/countries/${country.id}`} style={{ color: '#3864CD' }} className="text-sm hover:opacity-80 transition-opacity">
          {country.name}
        </Link>
      </div>
      <div className="flex items-center gap-6 text-right">
        <div>
          <span className="text-sm font-semibold text-aurora-body tabular-nums">
            {country.investmentCount}
          </span>
          <span className="text-xs text-aurora-hint ml-1">inv.</span>
        </div>
        <div className="w-20">
          <span className="text-sm text-aurora-label tabular-nums">{formatAmount(country.approvedAmount)}</span>
        </div>
      </div>
    </div>
  )
}

export function GeographyPage() {
  const [expandedRegions, setExpanded] = useState<Set<string>>(
    new Set(GEOGRAPHIC_REGIONS.map((r) => r.id))
  )
  const totals = getTotals()

  function toggleRegion(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-aurora-bg-main">
      {/* Page header */}
      <div className="bg-aurora-org-section border-t border-white/10 pt-10 pb-10 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-aurora-on-dark text-[22px] font-semibold mb-1 tracking-tight">
            Countries with Foundation Investments
          </h1>
          <p className="text-white/55 text-sm">
            {totals.totalCountries} countries · {totals.totalInvestments} investments · {formatAmount(totals.totalAmount)} total approved
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Legend */}
        <div className="flex items-center gap-4 mb-6 text-xs text-aurora-hint">
          <span className="flex items-center gap-1.5">
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M5 1a3 3 0 0 1 3 3c0 2.5-3 6-3 6S2 6.5 2 4a3 3 0 0 1 3-3Z" fill="#20A490" />
              <circle cx="5" cy="4" r="1" fill="white" />
            </svg>
            Field office present
          </span>
          <span className="text-aurora-separator">·</span>
          <span>Investments = active + closed grants and contracts</span>
        </div>

        {/* Column headers */}
        <div className="flex items-center justify-between mb-3 px-0 text-[10px] font-semibold uppercase tracking-wider text-aurora-hint border-b border-aurora-separator pb-2">
          <span>Country</span>
          <div className="flex items-center gap-6 text-right">
            <span>Investments</span>
            <span className="w-20">Approved Amt.</span>
          </div>
        </div>

        {/* Regions */}
        <div className="space-y-4">
          {GEOGRAPHIC_REGIONS.map((region) => {
            const isOpen = expandedRegions.has(region.id)
            const regionTotal = region.subRegions.reduce(
              (acc, sub) => ({
                count: acc.count + sub.countries.reduce((s, c) => s + c.investmentCount, 0),
                amount: acc.amount + sub.countries.reduce((s, c) => s + c.approvedAmount, 0),
              }),
              { count: 0, amount: 0 }
            )

            return (
              <div key={region.id} className="bg-aurora-bg-content border border-aurora-separator rounded-lg overflow-hidden">
                {/* Region header */}
                <button
                  type="button"
                  onClick={() => toggleRegion(region.id)}
                  className="w-full flex items-center justify-between px-5 py-3.5 bg-aurora-bg-wide hover:bg-aurora-padding transition-colors group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <svg
                      width="10" height="10" viewBox="0 0 10 10" fill="none"
                      className={`text-aurora-hint transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    >
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-semibold text-aurora-body group-hover:text-aurora-link transition-colors">
                      {region.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-right text-sm text-aurora-hint">
                    <span className="tabular-nums">{regionTotal.count} inv.</span>
                    <span className="w-20 tabular-nums">{formatAmount(regionTotal.amount)}</span>
                  </div>
                </button>

                {/* Sub-regions and countries */}
                {isOpen && (
                  <div className="divide-y divide-aurora-separator">
                    {region.subRegions.map((sub) => (
                      <div key={sub.name} className="px-5 py-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-2">
                          {sub.name}
                        </p>
                        <div>
                          {sub.countries.map((country) => (
                            <CountryRow key={country.name} country={country} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-xs text-aurora-hint text-center">
          Investment counts and amounts are illustrative for prototype purposes.
          Field office indicators reflect Gates Foundation regional offices.
        </p>
      </div>
    </div>
  )
}
