import { Link } from 'react-router-dom'
import { DIVISION_GROUPS, type DivisionData } from '../data/divisionsData'

function formatAmount(amount: number): string {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000)     return `$${(amount / 1_000_000).toFixed(0)}M`
  return `$${(amount / 1_000).toFixed(0)}K`
}

const GROUP_STYLES = {
  Program: {
    accentClass: 'border-l-aurora-asf-yes',
    dotClass: 'bg-aurora-asf-yes',
    badgeClass: 'bg-aurora-status-active text-aurora-org-section',
  },
  Operational: {
    accentClass: 'border-l-aurora-link',
    dotClass: 'bg-aurora-link',
    badgeClass: 'bg-aurora-bg-wide text-aurora-link border border-aurora-link/30',
  },
}

function DivisionCard({ division, accentClass }: { division: DivisionData; accentClass: string }) {
  return (
    <div className={`bg-aurora-bg-content border border-aurora-separator border-l-4 ${accentClass} rounded-lg p-5 hover:shadow-sm transition-shadow`}>
      <Link to={`/divisions/${division.id}`} style={{ color: '#3864CD' }} className="text-[15px] font-semibold mb-2 leading-snug block hover:opacity-80 transition-opacity">
        {division.name}
      </Link>
      <p className="text-sm text-aurora-label leading-relaxed mb-4">
        {division.description}
      </p>
      <div className="flex items-center gap-6 pt-3 border-t border-aurora-separator">
        <div>
          <p className="text-base font-bold text-aurora-body tabular-nums">{division.investmentCount}</p>
          <p className="text-[10px] text-aurora-hint uppercase tracking-wider mt-0.5">Investments</p>
        </div>
        <div>
          <p className="text-base font-bold text-aurora-body tabular-nums">{formatAmount(division.totalAmount)}</p>
          <p className="text-[10px] text-aurora-hint uppercase tracking-wider mt-0.5">Approved</p>
        </div>
      </div>
    </div>
  )
}

export function DivisionsPage() {
  const programGroup    = DIVISION_GROUPS.find((g) => g.type === 'Program')!
  const operationalGroup = DIVISION_GROUPS.find((g) => g.type === 'Operational')!

  const programTotal = programGroup.divisions.reduce(
    (acc, d) => ({ count: acc.count + d.investmentCount, amount: acc.amount + d.totalAmount }),
    { count: 0, amount: 0 }
  )
  const operationalTotal = operationalGroup.divisions.reduce(
    (acc, d) => ({ count: acc.count + d.investmentCount, amount: acc.amount + d.totalAmount }),
    { count: 0, amount: 0 }
  )

  return (
    <div className="min-h-screen bg-aurora-bg-main">
      {/* Page header */}
      <div className="bg-aurora-org-section border-t border-white/10 pt-10 pb-10 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-aurora-on-dark text-[22px] font-semibold mb-1 tracking-tight">
            Foundation Divisions
          </h1>
          <p className="text-white/55 text-sm">
            {programGroup.divisions.length} program divisions · {operationalGroup.divisions.length} operational divisions
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-10">
        {/* Program Divisions */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${GROUP_STYLES.Program.dotClass}`} />
              <h2 className="text-sm font-semibold text-aurora-label uppercase tracking-widest">
                Program Divisions
              </h2>
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${GROUP_STYLES.Program.badgeClass}`}>
                {programGroup.divisions.length} divisions
              </span>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-sm font-semibold text-aurora-body tabular-nums">{formatAmount(programTotal.amount)}</span>
              <span className="text-xs text-aurora-hint ml-2">across {programTotal.count} investments</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programGroup.divisions.map((div) => (
              <DivisionCard
                key={div.id}
                division={div}
                accentClass={GROUP_STYLES.Program.accentClass}
              />
            ))}
          </div>
        </section>

        {/* Operational Divisions */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${GROUP_STYLES.Operational.dotClass}`} />
              <h2 className="text-sm font-semibold text-aurora-label uppercase tracking-widest">
                Operational Divisions
              </h2>
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${GROUP_STYLES.Operational.badgeClass}`}>
                {operationalGroup.divisions.length} divisions
              </span>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-sm font-semibold text-aurora-body tabular-nums">{formatAmount(operationalTotal.amount)}</span>
              <span className="text-xs text-aurora-hint ml-2">across {operationalTotal.count} investments</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {operationalGroup.divisions.map((div) => (
              <DivisionCard
                key={div.id}
                division={div}
                accentClass={GROUP_STYLES.Operational.accentClass}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
