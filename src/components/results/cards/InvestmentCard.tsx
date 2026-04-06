import type { Investment } from '../../../types'
import { TagList } from './TagList'
import { ExternalLink } from '../../ExternalLink'

const STATUS_DOT: Record<Investment['status'], string> = {
  Active:       'bg-aurora-asf-yes',
  'In Process': 'bg-aurora-asf-partial',
  Closed:       'bg-aurora-separator',
  Pending:      'bg-aurora-link',
}

const STATUS_TEXT: Record<Investment['status'], string> = {
  Active:       'text-aurora-org-section',
  'In Process': 'text-amber-900',
  Closed:       'text-aurora-label',
  Pending:      'text-aurora-link',
}

function formatCurrency(amount: number) {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`
  return `$${amount}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

interface InvestmentCardProps {
  investment: Investment
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  return (
    <article className="bg-aurora-bg-content border border-aurora-separator border-l-4 border-l-aurora-asf-yes rounded-lg p-5 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1 min-w-0">
          <ExternalLink
            href={`https://invest.gatesfoundation.org/investments/${investment.investmentId}`}
            className="text-[15px] font-semibold text-aurora-body hover:text-aurora-link line-clamp-2 leading-snug transition-colors"
          >
            {investment.title}
          </ExternalLink>
          <p className="text-sm text-aurora-label mt-0.5">{investment.organizationName}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 mt-0.5">
          <span className="text-xs text-aurora-hint">{investment.investmentType}</span>
          <span className={`flex items-center gap-1.5 text-xs font-medium ${STATUS_TEXT[investment.status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[investment.status]}`} />
            {investment.status}
          </span>
        </div>
      </div>

      {/* AI Summary */}
      <p className="text-sm text-aurora-label leading-relaxed line-clamp-3 mb-4">
        {investment.summary}
      </p>

      {/* Metadata */}
      <div className="bg-aurora-bg-wide rounded-md px-4 py-3 mb-4 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3">
        <MetaItem label="Investment ID" value={investment.investmentId} mono />
        <MetaItem label="Start Date" value={formatDate(investment.startDate)} />
        <MetaItem label="Approved Amount" value={formatCurrency(investment.approvedAmount)} />
        {investment.subawardeeCount !== undefined
          ? <MetaItem label="Subawardees" value={String(investment.subawardeeCount)} />
          : <div />
        }
        <MetaItem label="Staff Owner" value={investment.ownerStaff} />
        <MetaItem label="Managing Team" value={investment.managingTeam} className="col-span-2 sm:col-span-3" />
      </div>

      {/* Tags */}
      <div className="border-t border-aurora-separator pt-3">
        <TagList tags={investment.tags} />
      </div>
    </article>
  )
}

function MetaItem({
  label,
  value,
  mono,
  className = '',
}: {
  label: string
  value: string
  mono?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-0.5">
        {label}
      </dt>
      <dd className={`text-aurora-body truncate ${mono ? 'font-mono text-xs' : 'text-sm'}`}>
        {value}
      </dd>
    </div>
  )
}
