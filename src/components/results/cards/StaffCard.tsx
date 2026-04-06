import { Link } from 'react-router-dom'
import type { FoundationStaff } from '../../../types'
import { TagList } from './TagList'

interface StaffCardProps {
  staff: FoundationStaff
}

export function StaffCard({ staff }: StaffCardProps) {
  return (
    <article className="bg-aurora-bg-content border border-aurora-separator border-l-4 border-l-aurora-link rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          {staff.avatarUrl ? (
            <img
              src={staff.avatarUrl}
              alt={staff.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-aurora-separator"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-aurora-hero flex items-center justify-center text-aurora-on-dark font-semibold text-base border-2 border-aurora-separator select-none">
              {staff.initials}
            </div>
          )}
        </div>

        {/* Identity */}
        <div className="flex-1 min-w-0">
          <Link to={`/staff/${staff.id}`} className="text-[15px] font-semibold text-aurora-body hover:text-aurora-link transition-colors">
            {staff.name}
          </Link>
          <p className="text-sm text-aurora-label mt-0.5">{staff.title}</p>
          <p className="text-xs text-aurora-hint mt-0.5">{staff.department}</p>
        </div>

        {/* Total investments */}
        <div className="shrink-0 text-right pl-4 border-l border-aurora-separator">
          <p className="text-2xl font-bold text-aurora-body tabular-nums">{staff.totalInvestments}</p>
          <p className="text-[10px] text-aurora-hint uppercase tracking-wider">Investments</p>
        </div>
      </div>

      {/* Investment breakdown */}
      <div className="mt-4 grid grid-cols-3 gap-px bg-aurora-separator rounded-md overflow-hidden border border-aurora-separator">
        <BreakdownItem value={staff.investmentBreakdown.owner}         label="Owner" />
        <BreakdownItem value={staff.investmentBreakdown.secondaryOwner} label="Secondary Owner" />
        <BreakdownItem value={staff.investmentBreakdown.coordinator}   label="Coordinator" />
      </div>

      {/* Expertise */}
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-aurora-hint mb-2">Expertise Areas</p>
        <p className="text-xs text-aurora-label leading-relaxed">
          {staff.expertiseAreas.join(' · ')}
        </p>
      </div>

      <div className="border-t border-aurora-separator pt-3 mt-4">
        <TagList tags={staff.tags} />
      </div>
    </article>
  )
}

function BreakdownItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1 text-center bg-aurora-bg-wide px-2 py-2.5">
      <p className="text-base font-bold text-aurora-body tabular-nums">{value}</p>
      <p className="text-[10px] text-aurora-hint mt-0.5">{label}</p>
    </div>
  )
}
