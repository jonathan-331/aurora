import { useState, useMemo } from 'react'
import {
  FILTER_CATEGORIES,
  buildFlatIndex,
  isFilterGroup,
  type FilterNode,
  type FilterCategory,
  type FlatFilterOption,
} from '../../data/filterOptions'

// ── Props ─────────────────────────────────────────────────────────────────────

interface FilterSidebarProps {
  selectedOptions: Set<string>
  onToggle: (id: string) => void
  onClearAll: () => void
}

// ── Highlight matched text ────────────────────────────────────────────────────

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return <>{text}</>
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-100 text-aurora-body not-italic rounded-sm">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  )
}

// ── Search results list ───────────────────────────────────────────────────────

function SearchResults({
  results,
  query,
  selectedOptions,
  onToggle,
}: {
  results: FlatFilterOption[]
  query: string
  selectedOptions: Set<string>
  onToggle: (id: string) => void
}) {
  if (results.length === 0) {
    return (
      <p className="text-xs text-aurora-hint italic px-1 py-4 text-center">
        No filters match &ldquo;{query}&rdquo;
      </p>
    )
  }

  return (
    <ul className="space-y-0.5">
      {results.map((opt) => {
        const checked = selectedOptions.has(opt.id)
        return (
          <li key={opt.id}>
            <label className="flex items-start gap-2 py-1.5 px-1 rounded hover:bg-aurora-bg-wide cursor-pointer group">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(opt.id)}
                className="mt-0.5 w-3.5 h-3.5 shrink-0 accent-aurora-link cursor-pointer"
              />
              <span className="text-xs leading-relaxed">
                {/* Breadcrumb ancestors */}
                {opt.ancestorLabels.map((seg, i) => (
                  <span key={i} className="text-aurora-hint">
                    {i > 0 && <span className="mx-0.5">›</span>}
                    {seg}
                    <span className="mx-0.5">›</span>
                  </span>
                ))}
                {/* Matched node label */}
                <span className="text-aurora-label group-hover:text-aurora-body transition-colors">
                  <Highlight text={opt.label} query={query} />
                </span>
              </span>
            </label>
          </li>
        )
      })}
    </ul>
  )
}

// ── Accordion: recursive node tree ────────────────────────────────────────────

function NodeTree({
  nodes,
  depth,
  expanded,
  onToggleExpand,
  selectedOptions,
  onToggle,
}: {
  nodes: FilterNode[]
  depth: number
  expanded: Set<string>
  onToggleExpand: (id: string) => void
  selectedOptions: Set<string>
  onToggle: (id: string) => void
}) {
  return (
    <ul className="space-y-0.5">
      {nodes.map((node) => {
        const isGroup = isFilterGroup(node)
        const isExpanded = expanded.has(node.id)
        const checked = selectedOptions.has(node.id)
        const indent = depth === 0 ? '' : depth === 1 ? 'pl-3' : 'pl-6'

        return (
          <li key={node.id}>
            <div className={`flex items-center gap-1.5 ${indent}`}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(node.id)}
                className="w-3.5 h-3.5 shrink-0 accent-aurora-link cursor-pointer"
                id={node.id}
              />
              <label
                htmlFor={node.id}
                className="flex-1 text-xs text-aurora-label hover:text-aurora-body cursor-pointer py-1 leading-snug select-none"
              >
                {node.label}
              </label>
              {isGroup && (
                <button
                  type="button"
                  onClick={() => onToggleExpand(node.id)}
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  className="shrink-0 w-5 h-5 flex items-center justify-center text-aurora-hint hover:text-aurora-label rounded transition-colors"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className={`transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>

            {isGroup && isExpanded && (
              <NodeTree
                nodes={node.children}
                depth={depth + 1}
                expanded={expanded}
                onToggleExpand={onToggleExpand}
                selectedOptions={selectedOptions}
                onToggle={onToggle}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

// ── Accordion: category section ───────────────────────────────────────────────

function CategorySection({
  category,
  expanded,
  onToggleCategory,
  nodeExpanded,
  onToggleNode,
  selectedOptions,
  onToggle,
}: {
  category: FilterCategory
  expanded: boolean
  onToggleCategory: () => void
  nodeExpanded: Set<string>
  onToggleNode: (id: string) => void
  selectedOptions: Set<string>
  onToggle: (id: string) => void
}) {
  // Count how many selected options belong to this category
  const activeCount = category.nodes.length > 0
    ? countSelected(category.nodes, selectedOptions)
    : 0

  return (
    <div className="border-b border-aurora-separator last:border-b-0">
      <button
        type="button"
        onClick={onToggleCategory}
        className="w-full flex items-center justify-between py-2.5 text-left group"
        aria-expanded={expanded}
      >
        <span className="text-[11px] font-semibold uppercase tracking-wider text-aurora-label group-hover:text-aurora-body transition-colors flex items-center gap-2">
          {category.label}
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-aurora-link text-aurora-on-dark text-[9px] font-bold">
              {activeCount}
            </span>
          )}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`shrink-0 text-aurora-hint transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {expanded && (
        <div className="pb-3">
          <NodeTree
            nodes={category.nodes}
            depth={0}
            expanded={nodeExpanded}
            onToggleExpand={onToggleNode}
            selectedOptions={selectedOptions}
            onToggle={onToggle}
          />
        </div>
      )}
    </div>
  )
}

function countSelected(nodes: FilterNode[], selected: Set<string>): number {
  let n = 0
  for (const node of nodes) {
    if (selected.has(node.id)) n++
    if (isFilterGroup(node)) n += countSelected(node.children, selected)
  }
  return n
}

// ── Main component ────────────────────────────────────────────────────────────

export function FilterSidebar({ selectedOptions, onToggle, onClearAll }: FilterSidebarProps) {
  const [query, setQuery]                       = useState('')
  const [expandedCategories, setExpandedCats]   = useState<Set<string>>(new Set(['investment-statuses', 'managing-teams']))
  const [expandedNodes, setExpandedNodes]       = useState<Set<string>>(new Set())

  // Flat index for search
  const flatIndex = useMemo(() => buildFlatIndex(FILTER_CATEGORIES), [])

  // Filter search results — match nodes whose own label contains the query
  const searchResults = useMemo<FlatFilterOption[] | null>(() => {
    const q = query.trim()
    if (!q) return null
    return flatIndex.filter((opt) =>
      opt.label.toLowerCase().includes(q.toLowerCase())
    )
  }, [query, flatIndex])

  function toggleCategory(id: string) {
    setExpandedCats((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleNode(id: string) {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const totalSelected = selectedOptions.size

  return (
    <aside className="w-72 shrink-0 pt-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-0.5">
        <h2 className="text-sm font-semibold text-aurora-label">
          Filters
          {totalSelected > 0 && (
            <span className="ml-2 text-xs font-normal text-aurora-hint">
              {totalSelected} active
            </span>
          )}
        </h2>
        {totalSelected > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-aurora-link hover:text-aurora-link-hover transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-aurora-hint pointer-events-none">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search filters…"
          className="w-full pl-8 pr-3 py-2 text-xs text-aurora-body placeholder-aurora-hint bg-aurora-bg-wide border border-aurora-separator rounded-md outline-none focus:ring-2 focus:ring-aurora-link/30 focus:border-aurora-link transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-aurora-hint hover:text-aurora-label transition-colors"
            aria-label="Clear search"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Content — scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0 pr-0.5">
        {searchResults !== null ? (
          /* Search results mode */
          <SearchResults
            results={searchResults}
            query={query}
            selectedOptions={selectedOptions}
            onToggle={onToggle}
          />
        ) : (
          /* Accordion mode */
          <div>
            {FILTER_CATEGORIES.map((cat) => (
              <CategorySection
                key={cat.id}
                category={cat}
                expanded={expandedCategories.has(cat.id)}
                onToggleCategory={() => toggleCategory(cat.id)}
                nodeExpanded={expandedNodes}
                onToggleNode={toggleNode}
                selectedOptions={selectedOptions}
                onToggle={onToggle}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
