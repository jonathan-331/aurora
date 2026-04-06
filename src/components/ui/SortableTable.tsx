import { useState, type ReactNode } from 'react'

export interface TableColumn<T> {
  key: keyof T
  label: string
  defaultSort?: 'asc' | 'desc'
  render?: (value: T[keyof T], row: T) => ReactNode
  sortable?: boolean
}

interface SortableTableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[]
  data: T[]
  rowKey: keyof T
}

function SortIcon({ direction }: { direction: 'asc' | 'desc' | null }) {
  if (!direction) {
    return (
      <svg width="8" height="10" viewBox="0 0 8 10" fill="none" aria-hidden="true" className="opacity-40">
        <path d="M4 1L4 9M1.5 3.5L4 1L6.5 3.5M1.5 6.5L4 9L6.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
      {direction === 'asc'
        ? <path d="M4 7L4 1M1.5 3.5L4 1L6.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M4 1L4 7M1.5 4.5L4 7L6.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      }
    </svg>
  )
}

export function SortableTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
}: SortableTableProps<T>) {
  const defaultSortCol = columns.find((c) => c.defaultSort)
  const [sortKey, setSortKey] = useState<keyof T | null>(defaultSortCol?.key ?? null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(defaultSortCol?.defaultSort ?? 'asc')

  function handleSort(key: keyof T) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0
    const av = a[sortKey]
    const bv = b[sortKey]
    if (av === bv) return 0
    const cmp =
      typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av ?? '').localeCompare(String(bv ?? ''))
    return sortDir === 'asc' ? cmp : -cmp
  })

  return (
    <div className="overflow-x-auto border border-aurora-separator">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {columns.map((col) => {
              const isActive = sortKey === col.key
              const sortable = col.sortable !== false
              return (
                <th
                  key={String(col.key)}
                  className={`
                    px-3 py-2.5 text-left text-xs font-semibold text-white whitespace-nowrap
                    border-r border-aurora-tbl-header-sep last:border-r-0
                    ${isActive ? 'bg-aurora-tbl-header-sort' : 'bg-aurora-tbl-header'}
                    ${sortable ? 'cursor-pointer select-none hover:bg-aurora-tbl-header-sort transition-colors' : ''}
                  `}
                  onClick={sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="flex items-center gap-1.5">
                    {col.label}
                    {sortable && (
                      <SortIcon direction={isActive ? sortDir : null} />
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={String(row[rowKey])}
              className={`border-t border-aurora-separator ${i % 2 === 1 ? 'bg-aurora-tbl-row-alt' : 'bg-white'} hover:bg-blue-50/40 transition-colors`}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-3 py-2 text-aurora-label align-top">
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-aurora-hint text-sm">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
