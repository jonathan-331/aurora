import type { Organization } from '../types'

export const mockOrganizations: Organization[] = [
  {
    id: 'org-001',
    name: 'Innovations for Poverty Action',
    investmentCounts: { active: 4, inProcess: 1, closed: 7 },
    partnerType: 'Primary',
    location: 'New Haven, CT, USA',
    sources: [
      { label: 'INVEST Profile', url: '#' },
      { label: 'Organization Website', url: '#' },
    ],
    tags: [
      { label: 'Research & Evaluation', matched: 'matched' },
      { label: 'Financial Inclusion', matched: 'matched' },
      { label: 'Sub-Saharan Africa', matched: 'matched' },
      { label: 'South Asia', matched: 'unmatched' },
    ],
  },
  {
    id: 'org-002',
    name: 'Gavi, the Vaccine Alliance',
    investmentCounts: { active: 3, inProcess: 0, closed: 12 },
    partnerType: 'Primary',
    location: 'Geneva, Switzerland',
    sources: [
      { label: 'INVEST Profile', url: '#' },
      { label: 'Organization Website', url: '#' },
      { label: 'Annual Report 2023', url: '#' },
    ],
    tags: [
      { label: 'Immunization', matched: 'matched' },
      { label: 'Vaccines', matched: 'matched' },
      { label: 'Global Health', matched: 'matched' },
      { label: 'Multi-lateral', matched: 'unmatched' },
    ],
  },
  {
    id: 'org-003',
    name: 'WaterAid',
    investmentCounts: { active: 2, inProcess: 1, closed: 5 },
    partnerType: 'Primary',
    location: 'London, UK',
    sources: [
      { label: 'INVEST Profile', url: '#' },
      { label: 'Organization Website', url: '#' },
    ],
    tags: [
      { label: 'WASH', matched: 'matched' },
      { label: 'South Asia', matched: 'matched' },
      { label: 'Sanitation', matched: 'matched' },
      { label: 'Water Access', matched: 'unmatched' },
    ],
  },
  {
    id: 'org-004',
    name: 'International Food Policy Research Institute',
    investmentCounts: { active: 1, inProcess: 0, closed: 9 },
    partnerType: 'Primary',
    location: 'Washington, D.C., USA',
    sources: [
      { label: 'INVEST Profile', url: '#' },
      { label: 'CGIAR Network Page', url: '#' },
    ],
    tags: [
      { label: 'Agriculture', matched: 'matched' },
      { label: 'Nutrition', matched: 'matched' },
      { label: 'Policy Research', matched: 'unmatched' },
      { label: 'West Africa', matched: 'matched' },
    ],
  },
  {
    id: 'org-005',
    name: 'Pathfinder International',
    investmentCounts: { active: 3, inProcess: 2, closed: 6 },
    partnerType: 'Subawardee',
    location: 'Watertown, MA, USA',
    sources: [
      { label: 'INVEST Profile', url: '#' },
      { label: 'Organization Website', url: '#' },
    ],
    tags: [
      { label: 'Reproductive Health', matched: 'matched' },
      { label: 'Family Planning', matched: 'matched' },
      { label: 'East Africa', matched: 'unmatched' },
      { label: 'West Africa', matched: 'matched' },
    ],
  },
  {
    id: 'org-006',
    name: 'Mastercard Foundation',
    investmentCounts: { active: 2, inProcess: 1, closed: 3 },
    partnerType: 'Primary',
    location: 'Toronto, Canada',
    sources: [
      { label: 'INVEST Profile', url: '#' },
      { label: 'Organization Website', url: '#' },
    ],
    tags: [
      { label: 'Education', matched: 'matched' },
      { label: 'Gender Equality', matched: 'matched' },
      { label: 'Youth Employment', matched: 'unmatched' },
      { label: 'East Africa', matched: 'matched' },
    ],
  },
  {
    id: 'org-007',
    name: 'Society for Family Health Nigeria',
    investmentCounts: { active: 3, inProcess: 1, closed: 4 },
    partnerType: 'Primary',
    location: 'Abuja, Nigeria',
    sources: [
      { label: 'INVEST Profile', url: '#' },
      { label: 'Organization Website', url: '#' },
    ],
    tags: [
      { label: 'Maternal Health', matched: 'matched' },
      { label: 'West Africa', matched: 'matched' },
      { label: 'Health Systems', matched: 'matched' },
      { label: 'Nigeria', matched: 'unmatched' },
    ],
  },
]
