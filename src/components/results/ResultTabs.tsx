import type { ActiveTab } from '../../types'

interface TabCounts {
  all: number
  investment: number
  organization: number
  staff: number
  document: number
}

interface ResultTabsProps {
  activeTab: ActiveTab
  counts: TabCounts
  onTabChange: (tab: ActiveTab) => void
}

const TABS: { key: ActiveTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'investment', label: 'Investments' },
  { key: 'organization', label: 'Organizations' },
  { key: 'staff', label: 'Foundation Staff' },
  { key: 'document', label: 'Strategy Documents' },
]

export function ResultTabs({ activeTab, counts, onTabChange }: ResultTabsProps) {
  return (
    <div className="border-b border-aurora-separator bg-aurora-bg-content">
      <nav className="flex gap-0 overflow-x-auto" aria-label="Result categories">
        {TABS.map(({ key, label }) => {
          const count = counts[key]
          const isActive = activeTab === key
          return (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                ${isActive
                  ? 'border-aurora-link text-aurora-link'
                  : 'border-transparent text-aurora-label hover:text-aurora-body hover:border-aurora-separator'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full tabular-nums font-medium ${
                  isActive
                    ? 'bg-aurora-link text-aurora-on-dark'
                    : 'bg-aurora-bg-wide text-aurora-hint'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
