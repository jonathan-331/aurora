import { useParams, Link, useNavigate } from 'react-router-dom'
import { StaffNameLink } from '../components/ui/StaffNameLink'
import { mockStaffProfiles } from '../mocks/staffProfiles'
import { ExternalLink } from '../components/ExternalLink'
import { SortableTable, type TableColumn } from '../components/ui/SortableTable'
import type { OrgProfileInvestment } from '../types'

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

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-aurora-org-section px-5 py-2.5 rounded-t-md">
      <h2 className="text-white text-sm font-semibold">{title}</h2>
    </div>
  )
}

export function StaffProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const profile = mockStaffProfiles.find((s) => s.id === id)

  if (!profile) {
    return (
      <div className="min-h-screen bg-aurora-bg-main flex items-center justify-center">
        <div className="text-center">
          <p className="text-aurora-label text-lg font-semibold">Staff profile not found</p>
          <Link to="/search" className="text-sm text-aurora-link mt-2 inline-block">Back to Search</Link>
        </div>
      </div>
    )
  }

  const totalInvestments = profile.investmentBreakdown.owner + profile.investmentBreakdown.secondaryOwner + profile.investmentBreakdown.coordinator

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
    { key: 'managingTeam', label: 'Managing Team' },
    {
      key: 'partnerType', label: 'Partner Organization',
      render: (_, row) => (
        <span className="text-aurora-label">{row.partnerType === 'Primary' ? 'Primary' : 'Subawardee'}</span>
      ),
    },
    { key: 'primaryOwner', label: 'Primary Inv Owner', render: (v) => <StaffNameLink name={String(v)} /> },
    { key: 'coordinator', label: 'Inv Coordinator', render: (v) => <StaffNameLink name={String(v)} /> },
    { key: 'approvedAmount', label: 'Approved Amt', render: (v) => formatCurrency(Number(v)) },
  ]

  return (
    <div className="min-h-screen bg-aurora-bg-main">
      {/* Page header */}
      <div className="bg-aurora-org-section border-t border-white/10 pt-8 pb-8 px-6">
        <div className="max-w-screen-xl mx-auto">
          <nav className="text-xs text-white/50 mb-3 flex items-center gap-3">
            <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back to results
            </button>
            <span>·</span>
            <span>Foundation Staff › <span className="text-white/80">{profile.name}</span></span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-aurora-tbl-header border-2 border-white/20 flex items-center justify-center text-white text-lg font-semibold shrink-0">
              {profile.initials}
            </div>
            <div>
              <h1 className="text-aurora-on-dark text-2xl font-bold tracking-tight">{profile.name}</h1>
              <p className="text-white/60 text-sm mt-0.5">{profile.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">

        {/* Summary info */}
        <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">Title</dt>
            <dd className="text-sm text-aurora-label">{profile.title}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">Email</dt>
            <dd>
              <ExternalLink href={`mailto:${profile.email}`} className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors">
                {profile.email}
              </ExternalLink>
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">Office Location</dt>
            <dd className="text-sm text-aurora-label">{profile.officeLocation}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">Department</dt>
            <dd className="text-sm text-aurora-label">{profile.department}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">Team ID</dt>
            <dd className="text-sm font-mono text-aurora-label">{profile.teamId}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">Investment Summary</dt>
            <dd className="text-sm text-aurora-label leading-relaxed">{profile.investmentSummary}</dd>
          </div>
        </div>

        {/* Focus areas */}
        {profile.focusAreas.length > 0 && (
          <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-2">Focus Areas</p>
            <TagDots labels={profile.focusAreas} />
          </div>
        )}

        {/* Investment breakdown */}
        <div>
          <SectionHeader title={`Investment Breakdown (${totalInvestments} total)`} />
          <div className="border border-aurora-separator border-t-0 rounded-b-md overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-aurora-separator bg-aurora-bg-content">
              <BreakdownCell label="Owner" value={profile.investmentBreakdown.owner} total={totalInvestments} />
              <BreakdownCell label="Secondary Owner" value={profile.investmentBreakdown.secondaryOwner} total={totalInvestments} />
              <BreakdownCell label="Coordinator" value={profile.investmentBreakdown.coordinator} total={totalInvestments} />
            </div>
          </div>
        </div>

        {/* Investments table */}
        <div>
          <SectionHeader title={`Investments (${profile.investments.length} shown)`} />
          <div className="border border-aurora-separator border-t-0 rounded-b-md overflow-hidden">
            <SortableTable
              columns={invColumns as unknown as TableColumn<Record<string, unknown>>[]}
              data={profile.investments as unknown as Record<string, unknown>[]}
              rowKey="id"
            />
          </div>
        </div>

        {/* Partner organizations */}
        {profile.partnerOrgs.length > 0 && (
          <div>
            <SectionHeader title="Partner Organizations" />
            <div className="border border-aurora-separator border-t-0 rounded-b-md divide-y divide-aurora-separator">
              {profile.partnerOrgs.map((org) => (
                <div key={org.orgId} className="flex items-center justify-between px-5 py-3 bg-white hover:bg-aurora-bg-wide transition-colors">
                  <Link to={`/organizations/${org.orgId}`} className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors">
                    {org.orgName}
                  </Link>
                  <div className="flex items-center gap-6 text-xs text-aurora-hint">
                    <span><span className="font-semibold text-aurora-body">{org.asOwner}</span> as owner</span>
                    <span><span className="font-semibold text-aurora-body">{org.asPartner}</span> as partner</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function BreakdownCell({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div className="px-6 py-5 text-center">
      <p className="text-2xl font-bold text-aurora-body tabular-nums">{value}</p>
      <p className="text-xs text-aurora-hint mt-0.5">{label}</p>
      <p className="text-xs text-aurora-hint mt-1">{pct}% of total</p>
    </div>
  )
}
