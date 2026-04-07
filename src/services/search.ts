/**
 * Search service — currently backed by mock data.
 * Replace the implementations here when Azure AI Search is available.
 */
import type { Investment, Organization, FoundationStaff, StrategyDocument } from '../types'
import { mockInvestments, mockOrganizations, mockStaff, mockDocuments } from '../mocks'
import { FILTER_CATEGORIES, buildFlatIndex } from '../data/filterOptions'

export interface SearchResults {
  investments: Investment[]
  organizations: Organization[]
  staff: FoundationStaff[]
  documents: StrategyDocument[]
}

function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase())
}

// ── Filter label map ─────────────────────────────────────────────────────────
// Maps every filter node ID → its display label for tag-based matching
const FILTER_LABEL_MAP: Record<string, string> = {}
for (const opt of buildFlatIndex(FILTER_CATEGORIES)) {
  FILTER_LABEL_MAP[opt.id] = opt.label
}

const STATUS_FILTER: Record<string, string> = {
  'is-active':     'Active',
  'is-in-process': 'In Process',
  'is-closed':     'Closed',
  'is-pending':    'Pending',
}

const TEAM_FILTER: Record<string, string> = {
  'mt-ag-dev':    'Agricultural Development',
  'mt-fsp':       'Financial Services for the Poor',
  'mt-gender-ed': 'Gender Equality — Education',
  'mt-gender':    'Gender Equality',
  'mt-global-ed': 'Global Education',
  'mt-epidemic':  'Global Health — Epidemic Preparedness',
  'mt-vaccines':  'Global Health — Vaccine Delivery',
  'mt-mnch':      'Maternal, Newborn & Child Health',
  'mt-wash':      'Water, Sanitation & Hygiene',
}

function matchesStartDate(inv: Investment, id: string): boolean {
  const year = new Date(inv.startDate).getFullYear()
  if (id === 'sd-before-2019') return year < 2019
  if (id === 'sd-2019-2020')   return year >= 2019 && year <= 2020
  if (id === 'sd-2021-2022')   return year >= 2021 && year <= 2022
  if (id === 'sd-2023-2024')   return year >= 2023 && year <= 2024
  if (id === 'sd-2025-plus')   return year >= 2025
  return false
}

function matchesAmount(inv: Investment, id: string): boolean {
  const amt = inv.approvedAmount
  if (id === 'aa-under-1m') return amt < 1_000_000
  if (id === 'aa-1m-5m')    return amt >= 1_000_000 && amt < 5_000_000
  if (id === 'aa-5m-15m')   return amt >= 5_000_000 && amt < 15_000_000
  if (id === 'aa-15m-50m')  return amt >= 15_000_000 && amt < 50_000_000
  if (id === 'aa-over-50m') return amt >= 50_000_000
  return false
}

// Group selected IDs by their category
function groupByCategory(selectedOptions: Set<string>): Map<string, string[]> {
  const groups = new Map<string, string[]>()
  for (const cat of FILTER_CATEGORIES) {
    const ids = buildFlatIndex([cat])
      .filter((opt) => selectedOptions.has(opt.id))
      .map((opt) => opt.id)
    if (ids.length > 0) groups.set(cat.id, ids)
  }
  return groups
}

function applyFilters(
  results: SearchResults,
  selectedOptions: Set<string>,
): SearchResults {
  if (selectedOptions.size === 0) return results

  const groups = groupByCategory(selectedOptions)
  let { investments, organizations, staff, documents } = results

  for (const [catId, ids] of groups) {
    if (catId === 'investment-statuses') {
      investments = investments.filter((inv) =>
        ids.some((id) => STATUS_FILTER[id] === inv.status)
      )
    } else if (catId === 'managing-teams') {
      investments = investments.filter((inv) =>
        ids.some((id) => TEAM_FILTER[id] === inv.managingTeam)
      )
      documents = documents.filter((doc) =>
        ids.some((id) => matchesQuery(doc.division, TEAM_FILTER[id] ?? ''))
      )
    } else if (catId === 'start-dates') {
      investments = investments.filter((inv) =>
        ids.some((id) => matchesStartDate(inv, id))
      )
    } else if (catId === 'approved-amounts') {
      investments = investments.filter((inv) =>
        ids.some((id) => matchesAmount(inv, id))
      )
    } else {
      // Tag-based categories: focus-areas, work-activities, beneficiary-demographics,
      // geographies-served, locations-of-work
      const labels = ids.map((id) => FILTER_LABEL_MAP[id]).filter(Boolean).map((l) => l.toLowerCase())
      if (labels.length > 0) {
        investments  = investments.filter((inv) =>
          labels.some((lbl) => inv.tags.some((t) => t.label.toLowerCase() === lbl))
        )
        organizations = organizations.filter((org) =>
          labels.some((lbl) => org.tags.some((t) => t.label.toLowerCase() === lbl))
        )
        staff = staff.filter((s) =>
          labels.some((lbl) => s.tags.some((t) => t.label.toLowerCase() === lbl))
        )
      }
    }
  }

  return { investments, organizations, staff, documents }
}

export function search(query: string, selectedOptions: Set<string> = new Set()): SearchResults {
  let results: SearchResults

  if (!query.trim()) {
    results = {
      investments: mockInvestments,
      organizations: mockOrganizations,
      staff: mockStaff,
      documents: mockDocuments,
    }
  } else {
    const q = query.trim()
    results = {
      investments: mockInvestments.filter(
        (inv) =>
          matchesQuery(inv.title, q) ||
          matchesQuery(inv.organizationName, q) ||
          matchesQuery(inv.summary, q) ||
          matchesQuery(inv.managingTeam, q) ||
          matchesQuery(inv.ownerStaff, q) ||
          inv.tags.some((t) => matchesQuery(t.label, q))
      ),
      organizations: mockOrganizations.filter(
        (org) =>
          matchesQuery(org.name, q) ||
          matchesQuery(org.location, q) ||
          org.tags.some((t) => matchesQuery(t.label, q))
      ),
      staff: mockStaff.filter(
        (s) =>
          matchesQuery(s.name, q) ||
          matchesQuery(s.title, q) ||
          matchesQuery(s.department, q) ||
          s.expertiseAreas.some((e) => matchesQuery(e, q)) ||
          s.tags.some((t) => matchesQuery(t.label, q))
      ),
      documents: mockDocuments.filter(
        (doc) =>
          matchesQuery(doc.title, q) ||
          matchesQuery(doc.division, q) ||
          matchesQuery(doc.summary, q)
      ),
    }
  }

  return applyFilters(results, selectedOptions)
}
