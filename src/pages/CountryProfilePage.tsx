import { useParams, Link } from 'react-router-dom'
import { StaffNameLink } from '../components/ui/StaffNameLink'
import { mockCountryProfiles } from '../mocks/countryProfiles'
import { ExternalLink } from '../components/ExternalLink'
import { SortableTable, type TableColumn } from '../components/ui/SortableTable'
import type { CountryInvestment, CountryDivision, CountryOrgInvestment, ProfileStaff } from '../types'

function formatCurrency(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-aurora-org-section px-5 py-2.5 rounded-t-md">
      <h2 className="text-white text-sm font-semibold">{title}</h2>
    </div>
  )
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg px-5 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-1">{label}</p>
      <p className="text-xl font-bold text-aurora-body tabular-nums">{value}</p>
      {sub && <p className="text-xs text-aurora-hint mt-0.5">{sub}</p>}
    </div>
  )
}

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

export function CountryProfilePage() {
  const { id } = useParams<{ id: string }>()
  const country = mockCountryProfiles.find((c) => c.id === id)

  if (!country) {
    return (
      <div className="min-h-screen bg-aurora-bg-main flex items-center justify-center">
        <div className="text-center">
          <p className="text-aurora-label text-lg font-semibold">Country not found</p>
          <Link to="/geography" className="text-sm text-aurora-link mt-2 inline-block">Back to Geography</Link>
        </div>
      </div>
    )
  }

  const totalInvestments = country.activeInvestments + country.inProcessInvestments + country.closedInvestments

  // Investments table
  const invColumns: TableColumn<CountryInvestment & Record<string, unknown>>[] = [
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
    { key: 'approvedAmount', label: 'Approved Amt', render: (v) => formatCurrency(Number(v)) },
    { key: 'invType', label: 'Type' },
    { key: 'startDate', label: 'Start Date', render: (v) => formatDate(String(v)) },
    { key: 'endDate', label: 'End Date', defaultSort: 'desc', render: (v) => formatDate(String(v)) },
    {
      key: 'partnerOrgName', label: 'Partner Organization',
      render: (_, row) => (
        <Link to={`/organizations/${row.partnerOrgId}`} className="text-aurora-link hover:text-aurora-link-hover transition-colors">
          {row.partnerOrgName}
        </Link>
      ),
    },
    { key: 'division', label: 'Division' },
    { key: 'managingTeam', label: 'Managing Team' },
    { key: 'primaryOwner', label: 'Primary Inv Owner', render: (v) => <StaffNameLink name={String(v)} /> },
    { key: 'coordinator', label: 'Inv Coordinator', render: (v) => <StaffNameLink name={String(v)} /> },
  ]

  // Divisions table
  const divColumns: TableColumn<CountryDivision & Record<string, unknown>>[] = [
    {
      key: 'divisionName', label: 'Division',
      render: (_, row) => (
        <Link to={`/divisions/${row.divisionId}`} className="text-aurora-link hover:text-aurora-link-hover transition-colors">
          {row.divisionName}
        </Link>
      ),
    },
    { key: 'approvedAmtMultiCountry', label: 'Approved Invs Sum (Multi-Country)', render: (v) => formatCurrency(Number(v)) },
    { key: 'investmentsInCountry', label: `Investments Involving ${country.name}` },
    { key: 'partnerOrgCount', label: '# of Partner Organizations' },
  ]

  // Org investments table
  const orgInvColumns: TableColumn<CountryOrgInvestment & Record<string, unknown>>[] = [
    {
      key: 'orgName', label: 'Partner Organization',
      render: (_, row) => (
        <Link to={`/organizations/${row.orgId}`} className="text-aurora-link hover:text-aurora-link-hover transition-colors">
          {row.orgName}
        </Link>
      ),
    },
    { key: 'activeCount', label: '# of Active Investments' },
    { key: 'inProcessCount', label: '# of In-Process Investments' },
    { key: 'closedCount', label: '# of Closed Investments' },
    { key: 'totalCount', label: '# of Total Investments' },
    { key: 'orgLocation', label: 'Organization Location' },
  ]

  return (
    <div className="min-h-screen bg-aurora-bg-main">
      {/* Page header */}
      <div className="bg-aurora-org-section border-t border-white/10 pt-8 pb-8 px-6">
        <div className="max-w-screen-xl mx-auto">
          <nav className="text-xs text-white/50 mb-3">
            <Link to="/geography" className="hover:text-white/80 transition-colors">Countries</Link>
            <span className="mx-1.5">›</span>
            <span className="text-white/80">{country.name}</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-4xl" role="img" aria-label={`${country.name} flag`}>{country.flag}</span>
            <h1 className="text-aurora-on-dark text-2xl font-bold tracking-tight">{country.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">

        {/* Context bar */}
        <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">Data Basis</dt>
            <dd className="text-sm text-aurora-label">Based on Location of Work</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">Capital</dt>
            <dd className="text-sm text-aurora-label">{country.capital}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">Data Sources</dt>
            <dd className="text-sm text-aurora-label">{country.dataSources.join(', ')}</dd>
          </div>
          <div className="bg-aurora-bg-wide rounded-md p-3 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs text-aurora-hint mb-1">Map</p>
              <p className="text-sm font-semibold text-aurora-label">{country.name}</p>
              <p className="text-xs text-aurora-hint mt-0.5">Map view not available in prototype</p>
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Total Investments" value={totalInvestments} />
          <StatCard label="Active" value={country.activeInvestments} />
          <StatCard label="In Process" value={country.inProcessInvestments} />
          <StatCard label="Closed" value={country.closedInvestments} />
          <StatCard label="Partner Organizations" value={country.partnerOrgCount} />
          <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg px-4 py-3 col-span-2 sm:col-span-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-1">Top Partner Org</p>
            <p className="text-sm font-semibold text-aurora-body leading-snug">{country.topOrgName}</p>
          </div>
        </div>

        {/* Reports & links */}
        <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-3">Country Investments &amp; Risk Reports</p>
          <div className="flex flex-wrap gap-4">
            <ExternalLink
              href="https://reporting.gatesfoundation.org/geo-partner"
              className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M5 2H2v8h8V7M7 2h3v3M7 5l3-3" stroke="#3864CD" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Geo &amp; Partner Reporting
            </ExternalLink>
            <ExternalLink
              href="https://reporting.gatesfoundation.org/risk-assessment"
              className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M5 2H2v8h8V7M7 2h3v3M7 5l3-3" stroke="#3864CD" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Risk Assessment
            </ExternalLink>
          </div>
        </div>

        {/* Investments table */}
        <div>
          <SectionHeader title={`Investments (${country.investments.length})`} />
          <div className="border border-aurora-separator border-t-0 rounded-b-md overflow-hidden">
            <SortableTable
              columns={invColumns as unknown as TableColumn<Record<string, unknown>>[]}
              data={country.investments as unknown as Record<string, unknown>[]}
              rowKey="id"
            />
          </div>
        </div>

        {/* Divisions table */}
        <div>
          <SectionHeader title="Divisions" />
          <div className="border border-aurora-separator border-t-0 rounded-b-md overflow-hidden">
            <SortableTable
              columns={divColumns as unknown as TableColumn<Record<string, unknown>>[]}
              data={country.divisions as unknown as Record<string, unknown>[]}
              rowKey="divisionId"
            />
          </div>
        </div>

        {/* Organization Investments table */}
        <div>
          <SectionHeader title="Organization Investments" />
          <div className="border border-aurora-separator border-t-0 rounded-b-md overflow-hidden">
            <SortableTable
              columns={orgInvColumns as unknown as TableColumn<Record<string, unknown>>[]}
              data={country.organizationInvestments as unknown as Record<string, unknown>[]}
              rowKey="orgId"
            />
          </div>
        </div>

        {/* Recent Investment Owners */}
        {country.recentOwners.length > 0 && (
          <div>
            <SectionHeader title="Recent Investment Owners" />
            <div className="border border-aurora-separator border-t-0 rounded-b-md p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {country.recentOwners.map((s) => <StaffCard key={s.id + s.name} staff={s} />)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
