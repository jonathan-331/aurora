export type TagMatchStatus = 'matched' | 'unmatched'

export interface Tag {
  label: string
  matched: TagMatchStatus
}

// ── Investment ────────────────────────────────────────────────────────────────

export type InvestmentType = 'Grant' | 'Contract'
export type InvestmentStatus = 'Active' | 'Closed' | 'In Process' | 'Pending'

export interface Investment {
  id: string
  title: string
  summary: string
  organizationName: string
  subawardeeCount?: number
  investmentType: InvestmentType
  status: InvestmentStatus
  investmentId: string
  startDate: string
  approvedAmount: number
  ownerStaff: string
  managingTeam: string
  tags: Tag[]
}

// ── Organization ──────────────────────────────────────────────────────────────

export type PartnerType = 'Primary' | 'Subawardee'

export interface InvestmentCounts {
  active: number
  inProcess: number
  closed: number
}

export interface Organization {
  id: string
  name: string
  investmentCounts: InvestmentCounts
  partnerType: PartnerType
  location: string
  sources: Array<{ label: string; url: string }>
  tags: Tag[]
}

// ── Foundation Staff ──────────────────────────────────────────────────────────

export interface InvestmentBreakdown {
  owner: number
  secondaryOwner: number
  coordinator: number
}

export interface FoundationStaff {
  id: string
  avatarUrl?: string
  initials: string
  name: string
  title: string
  department: string
  totalInvestments: number
  investmentBreakdown: InvestmentBreakdown
  expertiseAreas: string[]
  tags: Tag[]
}

// ── Strategy Document ─────────────────────────────────────────────────────────

export interface StrategyDocument {
  id: string
  title: string
  division: string
  chairMeetingDate: string
  source: { label: string; url: string }
  summary: string
}

// ── Organization Profile ──────────────────────────────────────────────────────

export interface OrgProfileInvestment {
  id: string
  investmentId: string
  invType: InvestmentType
  invStatus: InvestmentStatus
  invName: string
  source: string
  startDate: string
  endDate: string
  partnerType: PartnerType
  managingTeam: string
  primaryOwner: string
  coordinator: string
  approvedAmount: number
}

export interface ProfileStaff {
  id: string
  initials: string
  avatarUrl?: string
  name: string
  title: string
  managingTeam: string
  stillWithFoundation: boolean
  investmentCount?: number
}

export interface GeographyBreakdown {
  continent: string
  countryCount: number
  investmentCount: number
  countries: { name: string; id: string; investmentCount: number }[]
}

export interface PartnerRelationship {
  orgId: string
  orgName: string
  investmentCount: number
}

export interface OrganizationProfile {
  id: string
  name: string
  partnerType: PartnerType
  legalName: string
  alternativeNames: string[]
  address: string
  website: string
  sourceDetails: Array<{ label: string; url: string }>
  focusAreaTags: string[]
  workActivityTags: string[]
  investments: OrgProfileInvestment[]
  recentOwners: ProfileStaff[]
  recentCoordinators: ProfileStaff[]
  locationOfWork: GeographyBreakdown[]
  geographiesServed: GeographyBreakdown[]
  subawardeePartners: PartnerRelationship[]
  primaryPartners: PartnerRelationship[]
}

// ── Country Profile ───────────────────────────────────────────────────────────

export interface CountryInvestment {
  id: string
  investmentId: string
  invName: string
  source: string
  approvedAmount: number
  invType: InvestmentType
  startDate: string
  endDate: string
  partnerOrgId: string
  partnerOrgName: string
  division: string
  managingTeam: string
  primaryOwner: string
  coordinator: string
}

export interface CountryDivision {
  divisionId: string
  divisionName: string
  approvedAmtMultiCountry: number
  investmentsInCountry: number
  partnerOrgCount: number
}

export interface CountryOrgInvestment {
  orgId: string
  orgName: string
  orgLocation: string
  activeCount: number
  inProcessCount: number
  closedCount: number
  totalCount: number
}

export interface CountryProfile {
  id: string
  name: string
  flag: string
  capital: string
  dataSources: string[]
  activeInvestments: number
  inProcessInvestments: number
  closedInvestments: number
  partnerOrgCount: number
  topOrgName: string
  topOwnerName: string
  investments: CountryInvestment[]
  divisions: CountryDivision[]
  organizationInvestments: CountryOrgInvestment[]
  recentOwners: ProfileStaff[]
}

// ── Division Profile ──────────────────────────────────────────────────────────

export interface DivisionInvestment {
  id: string
  investmentId: string
  invName: string
  source: string
  approvedAmount: number
  invType: InvestmentType
  startDate: string
  endDate: string
  partnerOrgId: string
  partnerOrgName: string
  managingTeam: string
  primaryOwner: string
  coordinator: string
}

export interface TeamInvestment {
  teamName: string
  activeCount: number
  inProcessCount: number
  closedCount: number
  totalCount: number
  partnerOrgCount: number
}

export interface DivisionOrgInvestment {
  orgId: string
  orgName: string
  orgLocation: string
  activeCount: number
  inProcessCount: number
  closedCount: number
  totalCount: number
}

export interface DivisionDocument {
  id: string
  title: string
  docType: string
  chairMeetingDate: string
  summary: string
}

export interface DivisionProfile {
  id: string
  name: string
  activeInvestments: number
  inProcessInvestments: number
  closedInvestments: number
  topOrgs: { orgId: string; orgName: string; count: number }[]
  topOwners: { staffId: string; name: string; count: number }[]
  head: ProfileStaff
  topManagingTeams: { teamName: string; count: number }[]
  investments: DivisionInvestment[]
  teamInvestments: TeamInvestment[]
  orgInvestments: DivisionOrgInvestment[]
  owners: ProfileStaff[]
  coordinators: ProfileStaff[]
  strategyDocuments: DivisionDocument[]
}

// ── Search / UI ───────────────────────────────────────────────────────────────

export type EntityType = 'investment' | 'organization' | 'staff' | 'document'

export type ActiveTab = 'all' | EntityType

export interface FilterState {
  /** IDs of selected filter nodes from the hierarchical filter tree */
  selectedOptions: Set<string>
}
