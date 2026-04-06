/**
 * Search service — currently backed by mock data.
 * Replace the implementations here when Azure AI Search is available.
 */
import type { Investment, Organization, FoundationStaff, StrategyDocument } from '../types'
import { mockInvestments, mockOrganizations, mockStaff, mockDocuments } from '../mocks'

export interface SearchResults {
  investments: Investment[]
  organizations: Organization[]
  staff: FoundationStaff[]
  documents: StrategyDocument[]
}

function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase())
}

export function search(query: string): SearchResults {
  if (!query.trim()) {
    return {
      investments: mockInvestments,
      organizations: mockOrganizations,
      staff: mockStaff,
      documents: mockDocuments,
    }
  }

  const q = query.trim()

  const investments = mockInvestments.filter(
    (inv) =>
      matchesQuery(inv.title, q) ||
      matchesQuery(inv.organizationName, q) ||
      matchesQuery(inv.summary, q) ||
      matchesQuery(inv.managingTeam, q) ||
      matchesQuery(inv.ownerStaff, q) ||
      inv.tags.some((t) => matchesQuery(t.label, q))
  )

  const organizations = mockOrganizations.filter(
    (org) =>
      matchesQuery(org.name, q) ||
      matchesQuery(org.location, q) ||
      org.tags.some((t) => matchesQuery(t.label, q))
  )

  const staff = mockStaff.filter(
    (s) =>
      matchesQuery(s.name, q) ||
      matchesQuery(s.title, q) ||
      matchesQuery(s.department, q) ||
      s.expertiseAreas.some((e) => matchesQuery(e, q)) ||
      s.tags.some((t) => matchesQuery(t.label, q))
  )

  const documents = mockDocuments.filter(
    (doc) =>
      matchesQuery(doc.title, q) ||
      matchesQuery(doc.division, q) ||
      matchesQuery(doc.summary, q)
  )

  return { investments, organizations, staff, documents }
}
