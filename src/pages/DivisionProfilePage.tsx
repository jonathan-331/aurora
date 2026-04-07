import { useParams, Link, useNavigate } from 'react-router-dom'
import { StaffNameLink } from '../components/ui/StaffNameLink'
import { mockDivisionProfiles } from '../mocks/divisionProfiles'
import { ExternalLink } from '../components/ExternalLink'
import { SortableTable, type TableColumn } from '../components/ui/SortableTable'
import type { DivisionInvestment, TeamInvestment, DivisionOrgInvestment, ProfileStaff } from '../types'

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

function DocTypeIcon({ docType }: { docType: string }) {
  const isStrategy = docType.toLowerCase().includes('strategy')
  const isResearch = docType.toLowerCase().includes('research')
  return (
    <div className={`w-9 h-9 rounded flex items-center justify-center shrink-0 ${
      isStrategy ? 'bg-aurora-status-active' : isResearch ? 'bg-blue-50' : 'bg-aurora-bg-wide'
    }`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="10" height="12" rx="1.5" stroke={isStrategy ? '#127A6A' : '#3864CD'} strokeWidth="1.3" />
        <path d="M6 6h4M6 8.5h4M6 11h2.5" stroke={isStrategy ? '#127A6A' : '#3864CD'} strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function DivisionProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const division = mockDivisionProfiles.find((d) => d.id === id)

  if (!division) {
    return (
      <div className="min-h-screen bg-aurora-bg-main flex items-center justify-center">
        <div className="text-center">
          <p className="text-aurora-label text-lg font-semibold">Division not found</p>
          <Link to="/divisions" className="text-sm text-aurora-link mt-2 inline-block">Back to Divisions</Link>
        </div>
      </div>
    )
  }

  const totalInvestments = division.activeInvestments + division.inProcessInvestments + division.closedInvestments

  // Investments table
  const invColumns: TableColumn<DivisionInvestment & Record<string, unknown>>[] = [
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
    { key: 'managingTeam', label: 'Managing Team' },
    { key: 'primaryOwner', label: 'Primary Inv Owner', render: (v) => <StaffNameLink name={String(v)} /> },
    { key: 'coordinator', label: 'Inv Coordinator', render: (v) => <StaffNameLink name={String(v)} /> },
  ]

  // Teams table
  const teamColumns: TableColumn<TeamInvestment & Record<string, unknown>>[] = [
    { key: 'teamName', label: 'Managing Team' },
    { key: 'activeCount', label: '# of Active Investments', defaultSort: 'desc' },
    { key: 'inProcessCount', label: '# of In-Process Investments' },
    { key: 'closedCount', label: '# of Closed Investments' },
    { key: 'totalCount', label: '# of Total Investments' },
    { key: 'partnerOrgCount', label: '# of Partner Organizations' },
  ]

  // Org investments table
  const orgColumns: TableColumn<DivisionOrgInvestment & Record<string, unknown>>[] = [
    {
      key: 'orgName', label: 'Partner Organization',
      render: (_, row) => (
        <Link to={`/organizations/${row.orgId}`} className="text-aurora-link hover:text-aurora-link-hover transition-colors">
          {row.orgName}
        </Link>
      ),
    },
    { key: 'activeCount', label: '# of Active Investments', defaultSort: 'desc' },
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
          <nav className="text-xs text-white/50 mb-3 flex items-center gap-3">
            <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back
            </button>
            <span>·</span>
            <Link to="/divisions" className="hover:text-white/80 transition-colors">Divisions</Link>
            <span>›</span>
            <span className="text-white/80">{division.name}</span>
          </nav>
          <h1 className="text-aurora-on-dark text-2xl font-bold tracking-tight">{division.name}</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">

        {/* Filter bar */}
        <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg px-5 py-4 flex flex-wrap items-center gap-4">
          <span className="text-xs font-semibold text-aurora-hint uppercase tracking-wider">Filter by:</span>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2">
              <span className="text-xs text-aurora-label">Start Date</span>
              <select className="text-xs border border-aurora-separator rounded px-2 py-1 bg-white text-aurora-label">
                <option>All years</option>
                <option>2024+</option>
                <option>2022–2023</option>
                <option>2020–2021</option>
                <option>Before 2020</option>
              </select>
            </label>
            <label className="flex items-center gap-2">
              <span className="text-xs text-aurora-label">Managing Team</span>
              <select className="text-xs border border-aurora-separator rounded px-2 py-1 bg-white text-aurora-label">
                <option>All teams</option>
                {division.teamInvestments.map((t) => (
                  <option key={t.teamName}>{t.teamName}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2">
              <span className="text-xs text-aurora-label">Country</span>
              <select className="text-xs border border-aurora-separator rounded px-2 py-1 bg-white text-aurora-label">
                <option>All countries</option>
                <option>Nigeria</option>
                <option>Kenya</option>
                <option>India</option>
                <option>Bangladesh</option>
                <option>Ethiopia</option>
              </select>
            </label>
          </div>
        </div>

        {/* Stats + highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Investment counts */}
          <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-3">Investment Breakdown</p>
            <div className="flex items-end gap-6">
              <div>
                <p className="text-2xl font-bold text-aurora-asf-yes tabular-nums">{division.activeInvestments}</p>
                <p className="text-xs text-aurora-hint mt-0.5">Active</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-aurora-asf-partial tabular-nums">{division.inProcessInvestments}</p>
                <p className="text-xs text-aurora-hint mt-0.5">In Process</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-aurora-label tabular-nums">{division.closedInvestments}</p>
                <p className="text-xs text-aurora-hint mt-0.5">Closed</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xl font-bold text-aurora-body tabular-nums">{totalInvestments}</p>
                <p className="text-xs text-aurora-hint mt-0.5">Total</p>
              </div>
            </div>
          </div>

          {/* Top partner orgs */}
          <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-3">Top Partner Organizations</p>
            <div className="space-y-2">
              {division.topOrgs.map((org, i) => (
                <div key={org.orgId} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-aurora-hint w-4 shrink-0">{i + 1}</span>
                    <Link to={`/organizations/${org.orgId}`} className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors leading-snug">
                      {org.orgName}
                    </Link>
                  </div>
                  <span className="text-xs font-semibold text-aurora-body shrink-0 tabular-nums">{org.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top investment owners */}
          <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-3">Top Investment Owners</p>
            <div className="space-y-2">
              {division.topOwners.map((owner, i) => (
                <div key={owner.staffId} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-aurora-hint w-4 shrink-0">{i + 1}</span>
                    <span className="text-sm text-aurora-label leading-snug">{owner.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-aurora-body shrink-0 tabular-nums">{owner.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Division head + reports */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Division head */}
          <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-3">Division Head</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-aurora-org-section flex items-center justify-center text-white font-semibold shrink-0">
                {division.head.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-aurora-body">{division.head.name}</p>
                <p className="text-xs text-aurora-label mt-0.5">{division.head.title}</p>
                <p className="text-xs text-aurora-hint mt-0.5">{division.head.managingTeam}</p>
              </div>
            </div>
          </div>

          {/* Reports & links */}
          <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-3">Reports &amp; Resources</p>
            <div className="space-y-2">
              <ExternalLink
                href="https://reporting.gatesfoundation.org/transparency"
                className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors flex items-center gap-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M5 2H2v8h8V7M7 2h3v3M7 5l3-3" stroke="#3864CD" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Transparency Reporting
              </ExternalLink>
              <ExternalLink
                href="https://reporting.gatesfoundation.org/portfolio-overview"
                className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors flex items-center gap-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M5 2H2v8h8V7M7 2h3v3M7 5l3-3" stroke="#3864CD" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Portfolio Overview Dashboard
              </ExternalLink>
              <ExternalLink
                href="https://gatesfoundation.sharepoint.com"
                className="text-sm text-aurora-link hover:text-aurora-link-hover transition-colors flex items-center gap-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M5 2H2v8h8V7M7 2h3v3M7 5l3-3" stroke="#3864CD" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Division SharePoint Page
              </ExternalLink>
            </div>
          </div>
        </div>

        {/* Top managing teams */}
        <div className="bg-aurora-bg-content border border-aurora-separator rounded-lg p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-3">Top Managing Teams</p>
          <div className="flex flex-wrap gap-4">
            {division.topManagingTeams.map((team, i) => (
              <div key={team.teamName} className="flex items-center gap-3 bg-aurora-bg-wide rounded-lg px-4 py-3">
                <span className="text-[10px] font-bold text-aurora-hint">{i + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-aurora-body">{team.teamName}</p>
                  <p className="text-xs text-aurora-hint">{team.count} investments</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investments table */}
        <div>
          <SectionHeader title={`Investments (${division.investments.length})`} />
          <div className="border border-aurora-separator border-t-0 rounded-b-md overflow-hidden">
            <SortableTable
              columns={invColumns as unknown as TableColumn<Record<string, unknown>>[]}
              data={division.investments as unknown as Record<string, unknown>[]}
              rowKey="id"
            />
          </div>
        </div>

        {/* Teams Investments table */}
        <div>
          <SectionHeader title="Teams Investments" />
          <div className="border border-aurora-separator border-t-0 rounded-b-md overflow-hidden">
            <SortableTable
              columns={teamColumns as unknown as TableColumn<Record<string, unknown>>[]}
              data={division.teamInvestments as unknown as Record<string, unknown>[]}
              rowKey="teamName"
            />
          </div>
        </div>

        {/* Organization Investments table */}
        <div>
          <SectionHeader title="Organization Investments" />
          <div className="border border-aurora-separator border-t-0 rounded-b-md overflow-hidden">
            <SortableTable
              columns={orgColumns as unknown as TableColumn<Record<string, unknown>>[]}
              data={division.orgInvestments as unknown as Record<string, unknown>[]}
              rowKey="orgId"
            />
          </div>
        </div>

        {/* Investment Owners */}
        {division.owners.length > 0 && (
          <div>
            <SectionHeader title="Investment Owners" />
            <div className="border border-aurora-separator border-t-0 rounded-b-md p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {division.owners.map((s) => <StaffCard key={s.id + s.name} staff={s} />)}
              </div>
            </div>
          </div>
        )}

        {/* Investment Coordinators */}
        {division.coordinators.length > 0 && (
          <div>
            <SectionHeader title="Investment Coordinators" />
            <div className="border border-aurora-separator border-t-0 rounded-b-md p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {division.coordinators.map((s) => <StaffCard key={s.id + s.name} staff={s} />)}
              </div>
            </div>
          </div>
        )}

        {/* Strategy Documents */}
        {division.strategyDocuments.length > 0 && (
          <div>
            <SectionHeader title="Strategy Documents" />
            <div className="border border-aurora-separator border-t-0 rounded-b-md divide-y divide-aurora-separator">
              {division.strategyDocuments.map((doc) => (
                <div key={doc.id} className="flex items-start gap-4 px-5 py-4 bg-white hover:bg-aurora-bg-wide transition-colors">
                  <DocTypeIcon docType={doc.docType} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <ExternalLink
                        href={`https://insightlibrary.gatesfoundation.org/documents/${doc.id}`}
                        className="text-sm font-semibold text-aurora-link hover:text-aurora-link-hover transition-colors leading-snug"
                      >
                        {doc.title}
                      </ExternalLink>
                      <span className="text-xs text-aurora-hint shrink-0">
                        Chair: {new Date(doc.chairMeetingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <span className="text-xs text-aurora-hint">{doc.docType}</span>
                    <p className="text-sm text-aurora-label leading-relaxed mt-1.5 line-clamp-2">{doc.summary}</p>
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
