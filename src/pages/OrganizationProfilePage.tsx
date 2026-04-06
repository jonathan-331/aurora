import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { StaffNameLink } from '../components/ui/StaffNameLink'
import { mockOrgProfiles } from '../mocks/orgProfiles'
import { ExternalLink } from '../components/ExternalLink'
import { SortableTable, type TableColumn } from '../components/ui/SortableTable'
import type { OrgProfileInvestment, ProfileStaff, GeographyBreakdown, PartnerRelationship } from '../types'

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function TagDots({ labels }: { labels: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 items-center">
      {labels.map((label) => (
        <span key={label} className="flex items-center gap-1.5 text-xs text-aurora-label">
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-aurora-confirm" />
          {label}
        </span>
      ))}
    </div>
  )
}

// ── Section divider ───────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-aurora-org-section px-5 py-2.5 rounded-t-md">
      <h2 className="text-white text-sm font-semibold">{title}</h2>
    </div>
  )
}

// ── Staff card ────────────────────────────────────────────────────────────────

function StaffCard({ staff }: { staff: ProfileStaff }) {
  return (
    <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-aurora-tbl-header flex items-center justify-center text-white text-sm font-semibold shrink-0">
        {staff.initials}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link to={`/staff/${staff.id}`} className="text-sm font-semibold text-aurora-body hover:text-aurora-link transition-colors">
              {staff.name}
            </Link>
          {!staff.stillWithFoundation && (
            <span className="text-[10px] font-semibold bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
              No longer with Foundation
            </span>
          )}
        </div>
        <p className="text-xs text-aurora-label mt-0.5">{staff.title}</p>
        <p className="text-xs text-aurora-hint mt-0.5">{staff.managingTeam}</p>
        {staff.investmentCount !== undefined && (
          <p className="text-xs text-aurora-hint mt-1">
            <span className="font-semibold text-aurora-body">{staff.investmentCount}</span> investment{staff.investmentCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  )
}

// ── Geography accordion ───────────────────────────────────────────────────────

function GeographySection({ title, data }: { title: string; data: GeographyBreakdown[] }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(data.map((d) => d.continent)))

  return (
    <div>
      <SectionHeader title={title} />
      <div className="border border-aurora-separator border-t-0 rounded-b-md overflow-hidden divide-y divide-aurora-separator">
        {data.map((region) => {
          const isOpen = expanded.has(region.continent)
          return (
            <div key={region.continent}>
              <button
                type="button"
                onClick={() => {
                  setExpanded((prev) => {
                    const next = new Set(prev)
                    if (next.has(region.continent)) next.delete(region.continent)
                    else next.add(region.continent)
                    return next
                  })
                }}
                className="w-full flex items-center justify-between px-5 py-3 bg-aurora-bg-wide hover:bg-aurora-padding transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-aurora-body">{region.continent}</span>
                <span className="flex items-center gap-4 text-xs text-aurora-hint">
                  <span>{region.countryCount} countries</span>
                  <span>{region.investmentCount} investments</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div className="bg-white px-5 py-2 divide-y divide-aurora-separator/50">
                  {region.countries.map((c) => (
                    <div key={c.name} className="flex items-center justify-between py-2">
                      <Link to={`/countries/${c.id}`} className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors">
                        {c.name}
                      </Link>
                      <span className="text-sm text-aurora-hint tabular-nums">{c.investmentCount} inv.</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Partner relationships ──────────────────────────────────────────────────────

function PartnerList({ title, partners }: { title: string; partners: PartnerRelationship[] }) {
  if (partners.length === 0) return null
  return (
    <div>
      <SectionHeader title={title} />
      <div className="border border-aurora-separator border-t-0 rounded-b-md divide-y divide-aurora-separator">
        {partners.map((p) => (
          <div key={p.orgId} className="flex items-center justify-between px-5 py-3">
            <Link to={`/organizations/${p.orgId}`} className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors">
              {p.orgName}
            </Link>
            <span className="text-sm text-aurora-hint tabular-nums">{p.investmentCount} investment{p.investmentCount !== 1 ? 's' : ''}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function OrganizationProfilePage() {
  const { id } = useParams<{ id: string }>()
  const org = mockOrgProfiles.find((o) => o.id === id)

  if (!org) {
    return (
      <div className="min-h-screen bg-aurora-bg-main flex items-center justify-center">
        <div className="text-center">
          <p className="text-aurora-label text-lg font-semibold">Organization not found</p>
          <Link to="/search" className="text-sm text-aurora-link mt-2 inline-block">Back to Search</Link>
        </div>
      </div>
    )
  }

  const invColumns: TableColumn<OrgProfileInvestment & Record<string, unknown>>[] = [
    { key: 'invType', label: 'Inv Type' },
    { key: 'invStatus', label: 'Inv Status' },
    {
      key: 'invName', label: 'Inv Name',
      render: (_, row) => (
        <ExternalLink
          href={`https://invest.gatesfoundation.org/investments/${row.investmentId}`}
          className="text-aurora-link hover:text-aurora-link-hover transition-colors line-clamp-2"
        >
          {row.invName}
        </ExternalLink>
      ),
    },
    { key: 'source', label: 'Source' },
    { key: 'startDate', label: 'Start Date', render: (v) => formatDate(String(v)) },
    { key: 'endDate', label: 'End Date', defaultSort: 'desc', render: (v) => formatDate(String(v)) },
    { key: 'partnerType', label: 'Partner Type' },
    { key: 'managingTeam', label: 'Managing Team' },
    { key: 'primaryOwner', label: 'Primary Inv Owner', render: (v) => <StaffNameLink name={String(v)} /> },
    { key: 'coordinator', label: 'Inv Coordinator', render: (v) => <StaffNameLink name={String(v)} /> },
    { key: 'approvedAmount', label: 'Approved Inv Amt', render: (v) => formatCurrency(Number(v)) },
  ]

  return (
    <div className="min-h-screen bg-aurora-bg-main">
      {/* Page header */}
      <div className="bg-aurora-org-section border-t border-white/10 pt-8 pb-8 px-6">
        <div className="max-w-screen-xl mx-auto">
          <nav className="text-xs text-white/50 mb-3">
            <Link to="/search" className="hover:text-white/80 transition-colors">Organizations</Link>
            <span className="mx-1.5">›</span>
            <span className="text-white/80">{org.name}</span>
          </nav>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-aurora-on-dark text-2xl font-bold tracking-tight">{org.name}</h1>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded shrink-0 mt-1 ${
              org.partnerType === 'Primary'
                ? 'bg-aurora-status-active text-aurora-org-section'
                : 'bg-white/10 text-white/80'
            }`}>
              {org.partnerType} Partner
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">

        {/* Summary info */}
        <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          <InfoItem label="Legal Name" value={org.legalName} />
          {org.alternativeNames.length > 0 && (
            <InfoItem label="Also Known As" value={org.alternativeNames.join(', ')} />
          )}
          <InfoItem label="Address" value={org.address} />
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">Website</dt>
            <dd>
              <ExternalLink href={org.website} className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors">
                {org.website.replace(/^https?:\/\//, '')}
              </ExternalLink>
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">Sources</dt>
            <dd className="flex flex-wrap gap-3">
              {org.sourceDetails.map((s) => (
                <ExternalLink key={s.label} href={s.url} className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M5 2H2v8h8V7M7 2h3v3M7 5l3-3" stroke="#3864CD" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  {s.label}
                </ExternalLink>
              ))}
            </dd>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5 space-y-3">
          {org.focusAreaTags.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-2">Focus Areas</p>
              <TagDots labels={org.focusAreaTags} />
            </div>
          )}
          {org.workActivityTags.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-2">Work Activities</p>
              <TagDots labels={org.workActivityTags} />
            </div>
          )}
        </div>

        {/* Investments table */}
        <div>
          <SectionHeader title={`Investments (${org.investments.length})`} />
          <div className="border border-aurora-separator border-t-0 rounded-b-md overflow-hidden">
            <SortableTable
              columns={invColumns as unknown as TableColumn<Record<string, unknown>>[]}
              data={org.investments as unknown as Record<string, unknown>[]}
              rowKey="id"
            />
          </div>
        </div>

        {/* Recent Investment Owners */}
        {org.recentOwners.length > 0 && (
          <div>
            <SectionHeader title="Recent Investment Owners" />
            <div className="border border-aurora-separator border-t-0 rounded-b-md p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {org.recentOwners.map((s) => <StaffCard key={s.id + s.name} staff={s} />)}
              </div>
            </div>
          </div>
        )}

        {/* Recent Investment Coordinators */}
        {org.recentCoordinators.length > 0 && (
          <div>
            <SectionHeader title="Recent Investment Coordinators" />
            <div className="border border-aurora-separator border-t-0 rounded-b-md p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {org.recentCoordinators.map((s) => <StaffCard key={s.id + s.name} staff={s} />)}
              </div>
            </div>
          </div>
        )}

        {/* Geography sections */}
        {org.locationOfWork.length > 0 && (
          <GeographySection title="Location of Work" data={org.locationOfWork} />
        )}
        {org.geographiesServed.length > 0 && (
          <GeographySection title="Geographies Served" data={org.geographiesServed} />
        )}

        {/* Partner relationships */}
        <PartnerList
          title={`Subawardees that have partnered with ${org.name}`}
          partners={org.subawardeePartners}
        />
        <PartnerList
          title={`${org.name} was a subawardee to these primary partners`}
          partners={org.primaryPartners}
        />
      </div>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">{label}</dt>
      <dd className="text-sm text-aurora-label">{value}</dd>
    </div>
  )
}
