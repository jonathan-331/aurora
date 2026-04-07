import type { StrategyDocument } from '../../../types'
import { CONFIRM_ICON, LINK } from '../../../styles/tokens'
import { ExternalLink } from '../../ExternalLink'

interface DocumentCardProps {
  document: StrategyDocument
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function relativeAge(iso: string): string {
  const now = new Date()
  const then = new Date(iso)
  const months = (now.getFullYear() - then.getFullYear()) * 12 + (now.getMonth() - then.getMonth())
  if (months < 2) return 'Recent'
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(months / 12)
  return `${years}yr ago`
}

export function DocumentCard({ document: doc }: DocumentCardProps) {
  const age = relativeAge(doc.lastUpdated)
  const isRecent = !age.includes('yr')

  return (
    <article className="bg-aurora-bg-content border border-aurora-separator border-l-4 border-l-aurora-asf-partial rounded-lg p-5 hover:shadow-md transition-shadow">
      {/* Division + dates */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <span className="text-xs text-aurora-hint">{doc.division}</span>
        <div className="flex items-center gap-3 shrink-0 text-xs text-aurora-hint">
          <span>Chair Meeting: {formatDate(doc.chairMeetingDate)}</span>
          <span>·</span>
          <span className={isRecent ? 'text-aurora-asf-yes font-medium' : ''}>
            Updated {formatDate(doc.lastUpdated)} ({age})
          </span>
        </div>
      </div>

      <ExternalLink
        href={`https://insightlibrary.gatesfoundation.org/documents/${doc.id}`}
        className="text-[15px] font-semibold text-aurora-body hover:text-aurora-link leading-snug block mt-2 mb-3 transition-colors"
      >
        {doc.title}
      </ExternalLink>

      {/* AI summary */}
      <div className="bg-aurora-bg-wide border border-aurora-separator rounded-md p-4 mb-4">
        <div className="flex items-center gap-1.5 mb-2">
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 0.5l1.1 2.6L9 4l-2.9 1.1L5 8l-1.1-2.9L0.5 4l2.4-0.9L5 0.5Z" fill={CONFIRM_ICON} />
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-aurora-asf-yes">
            AI-Generated Summary
          </span>
        </div>
        <p className="text-sm text-aurora-label leading-relaxed line-clamp-4">
          {doc.summary}
        </p>
      </div>

      {/* Source */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint">Source:</span>
        <ExternalLink
          href={`https://insightlibrary.gatesfoundation.org/documents/${doc.id}`}
          className="text-xs text-aurora-link hover:text-aurora-link-hover transition-colors flex items-center gap-1"
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M5 2H2v8h8V7M7 2h3v3M7 5l3-3" stroke={LINK} strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {doc.source.label}
        </ExternalLink>
      </div>
    </article>
  )
}
