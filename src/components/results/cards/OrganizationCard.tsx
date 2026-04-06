import { Link } from 'react-router-dom'
import { ExternalLink } from '../../ExternalLink'
import type { Organization } from '../../../types'
import { TagList } from './TagList'
import { LINK } from '../../../styles/tokens'

interface OrganizationCardProps {
  organization: Organization
}

export function OrganizationCard({ organization: org }: OrganizationCardProps) {
  return (
    <article className="bg-aurora-bg-content border border-aurora-separator border-l-4 border-l-aurora-tbl-header rounded-lg p-5 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-1">
        <Link to={`/organizations/${org.id}`} className="text-[15px] font-semibold text-aurora-body hover:text-aurora-link leading-snug transition-colors">
          {org.name}
        </Link>
        <span className={`text-xs shrink-0 ${org.partnerType === 'Primary' ? 'text-aurora-org-section font-medium' : 'text-aurora-hint'}`}>
          {org.partnerType}
        </span>
      </div>

      {/* Location */}
      <p className="text-xs text-aurora-hint flex items-center gap-1.5 mb-4">
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
          <path d="M7 1a4 4 0 0 1 4 4c0 3-4 8-4 8S3 8 3 5a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="7" cy="5" r="1.2" fill="currentColor" />
        </svg>
        {org.location}
      </p>

      {/* Investment counts */}
      <div className="flex gap-6 mb-4 pb-4 border-b border-aurora-separator">
        <CountItem value={org.investmentCounts.active}    label="Active"     colorClass="text-aurora-asf-yes" />
        <CountItem value={org.investmentCounts.inProcess} label="In Process" colorClass="text-aurora-asf-partial" />
        <CountItem value={org.investmentCounts.closed}    label="Closed"     colorClass="text-aurora-label" />
      </div>

      {/* Sources */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-1.5">Sources</p>
        <div className="flex flex-wrap gap-3">
          {org.sources.map((s) => (
            <ExternalLink
              key={s.label}
              href={s.url}
              className="text-xs text-aurora-link hover:text-aurora-link-hover transition-colors flex items-center gap-1"
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M5 2H2v8h8V7M7 2h3v3M7 5l3-3" stroke={LINK} strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              {s.label}
            </ExternalLink>
          ))}
        </div>
      </div>

      <div className="border-t border-aurora-separator pt-3">
        <TagList tags={org.tags} />
      </div>
    </article>
  )
}

function CountItem({ value, label, colorClass }: { value: number; label: string; colorClass: string }) {
  return (
    <div className="text-center">
      <p className={`text-xl font-bold tabular-nums ${colorClass}`}>{value}</p>
      <p className="text-[11px] text-aurora-hint mt-0.5">{label}</p>
    </div>
  )
}
