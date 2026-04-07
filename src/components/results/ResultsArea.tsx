import { Link } from 'react-router-dom'
import type { ActiveTab, Investment, Organization, FoundationStaff, StrategyDocument } from '../../types'
import { InvestmentCard } from './cards/InvestmentCard'
import { OrganizationCard } from './cards/OrganizationCard'
import { StaffCard } from './cards/StaffCard'
import { DocumentCard } from './cards/DocumentCard'
import { BG_SEPARATOR } from '../../styles/tokens'
import { GEOGRAPHIC_REGIONS } from '../../data/geographyData'
import { DIVISION_GROUPS } from '../../data/divisionsData'

interface ResultsAreaProps {
  activeTab: ActiveTab
  investments: Investment[]
  organizations: Organization[]
  staff: FoundationStaff[]
  documents: StrategyDocument[]
  query: string
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-xs font-semibold text-aurora-label uppercase tracking-widest">{title}</h2>
      <span className="text-xs text-aurora-hint tabular-nums">{count} results</span>
      <div className="flex-1 h-px bg-aurora-separator" />
    </div>
  )
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-full bg-aurora-bg-wide flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke={BG_SEPARATOR} strokeWidth="1.8" />
          <path d="M16.5 16.5L20 20" stroke={BG_SEPARATOR} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-aurora-label mb-1">No results found</h3>
      <p className="text-sm text-aurora-hint max-w-sm">
        {query
          ? `No results matched "${query}". Try a different search term or adjust your filters.`
          : 'No results to show. Try adjusting your filters.'}
      </p>
    </div>
  )
}

// ── Entity jump chips ────────────────────────────────────────────────────────

interface EntityMatch {
  id: string
  label: string
  type: 'country' | 'division'
  to: string
}

function findEntityMatches(query: string): EntityMatch[] {
  if (!query.trim()) return []
  const q = query.toLowerCase().trim()
  const matches: EntityMatch[] = []

  for (const region of GEOGRAPHIC_REGIONS) {
    for (const sub of region.subRegions) {
      for (const country of sub.countries) {
        const name = country.name.toLowerCase()
        if (q.includes(name) || name.includes(q)) {
          matches.push({ id: country.id, label: country.name, type: 'country', to: `/countries/${country.id}` })
        }
      }
    }
  }

  for (const group of DIVISION_GROUPS) {
    for (const division of group.divisions) {
      const name = division.name.toLowerCase()
      if (q.includes(name) || name.includes(q)) {
        matches.push({ id: division.id, label: division.name, type: 'division', to: `/divisions/${division.id}` })
      }
    }
  }

  return matches
}

function EntityJumpChips({ query }: { query: string }) {
  const matches = findEntityMatches(query)
  if (matches.length === 0) return null

  return (
    <div className="mb-5 flex flex-wrap gap-2 items-center">
      <span className="text-[11px] text-aurora-hint font-medium">Jump to:</span>
      {matches.map((m) => (
        <Link
          key={m.id}
          to={m.to}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-aurora-link/30 bg-aurora-bg-wide text-xs font-medium text-aurora-link hover:bg-aurora-link hover:text-aurora-on-dark transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            {m.type === 'country' ? (
              <>
                <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2" />
                <path d="M1 5h8M5 1c-1.5 2-1.5 6 0 8M5 1c1.5 2 1.5 6 0 8" stroke="currentColor" strokeWidth="0.9" />
              </>
            ) : (
              <>
                <rect x="1" y="1" width="3.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
                <rect x="5.5" y="1" width="3.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
                <rect x="1" y="5.5" width="3.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
                <rect x="5.5" y="5.5" width="3.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
              </>
            )}
          </svg>
          {m.label} {m.type === 'country' ? 'country profile' : 'division'}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function ResultsArea({
  activeTab,
  investments,
  organizations,
  staff,
  documents,
  query,
}: ResultsAreaProps) {
  const showInvestments = activeTab === 'all' || activeTab === 'investment'
  const showOrgs = activeTab === 'all' || activeTab === 'organization'
  const showStaff = activeTab === 'all' || activeTab === 'staff'
  const showDocs = activeTab === 'all' || activeTab === 'document'

  const totalVisible =
    (showInvestments ? investments.length : 0) +
    (showOrgs ? organizations.length : 0) +
    (showStaff ? staff.length : 0) +
    (showDocs ? documents.length : 0)

  if (totalVisible === 0) return <EmptyState query={query} />

  return (
    <div className="space-y-10">
      <EntityJumpChips query={query} />

      {showInvestments && investments.length > 0 && (
        <section>
          {activeTab === 'all' && <SectionHeader title="Investments" count={investments.length} />}
          <div className="space-y-3">
            {investments.map((inv) => (
              <InvestmentCard key={inv.id} investment={inv} />
            ))}
          </div>
        </section>
      )}

      {showOrgs && organizations.length > 0 && (
        <section>
          {activeTab === 'all' && <SectionHeader title="Organizations" count={organizations.length} />}
          <div className="space-y-3">
            {organizations.map((org) => (
              <OrganizationCard key={org.id} organization={org} />
            ))}
          </div>
        </section>
      )}

      {showStaff && staff.length > 0 && (
        <section>
          {activeTab === 'all' && <SectionHeader title="Foundation Staff" count={staff.length} />}
          <div className="space-y-3">
            {staff.map((s) => (
              <StaffCard key={s.id} staff={s} />
            ))}
          </div>
        </section>
      )}

      {showDocs && documents.length > 0 && (
        <section>
          {activeTab === 'all' && <SectionHeader title="Strategy Documents" count={documents.length} />}
          <div className="space-y-3">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
