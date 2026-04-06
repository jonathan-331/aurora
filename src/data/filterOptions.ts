// ── Types ─────────────────────────────────────────────────────────────────────

export interface FilterLeaf {
  id: string
  label: string
}

export interface FilterGroup {
  id: string
  label: string
  children: FilterNode[]
}

export type FilterNode = FilterLeaf | FilterGroup

export function isFilterGroup(node: FilterNode): node is FilterGroup {
  return 'children' in node
}

export interface FilterCategory {
  id: string
  label: string
  nodes: FilterNode[]
}

// Flat record for search indexing
export interface FlatFilterOption {
  id: string
  label: string
  /** Labels from category down to (but not including) this node */
  ancestorLabels: string[]
}

export function buildFlatIndex(categories: FilterCategory[]): FlatFilterOption[] {
  const results: FlatFilterOption[] = []
  for (const cat of categories) {
    traverseNodes(cat.nodes, [cat.label], results)
  }
  return results
}

function traverseNodes(
  nodes: FilterNode[],
  ancestorLabels: string[],
  results: FlatFilterOption[],
) {
  for (const node of nodes) {
    results.push({ id: node.id, label: node.label, ancestorLabels })
    if (isFilterGroup(node)) {
      traverseNodes(node.children, [...ancestorLabels, node.label], results)
    }
  }
}

// ── Filter Data ───────────────────────────────────────────────────────────────

export const FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: 'focus-areas',
    label: 'Focus Areas',
    nodes: [
      {
        id: 'fa-global-health',
        label: 'Global Health',
        children: [
          { id: 'fa-vaccine-delivery',  label: 'Vaccine Delivery' },
          { id: 'fa-maternal-health',   label: 'Maternal & Newborn Health' },
          { id: 'fa-epidemic-prep',     label: 'Epidemic Preparedness' },
          { id: 'fa-family-planning',   label: 'Family Planning' },
          { id: 'fa-nutrition-health',  label: 'Nutrition' },
          { id: 'fa-wash',             label: 'Water, Sanitation & Hygiene' },
        ],
      },
      {
        id: 'fa-agricultural',
        label: 'Agricultural Development',
        children: [
          { id: 'fa-smallholder',    label: 'Smallholder Farmers' },
          { id: 'fa-food-security',  label: 'Food Security' },
          { id: 'fa-nutrition-ag',   label: 'Nutrition-Sensitive Agriculture' },
          { id: 'fa-market-systems', label: 'Market Systems' },
        ],
      },
      {
        id: 'fa-fsp',
        label: 'Financial Services for the Poor',
        children: [
          { id: 'fa-digital-finance', label: 'Digital Finance' },
          { id: 'fa-mobile-money',    label: 'Mobile Money' },
          { id: 'fa-ag-finance',      label: 'Agricultural Finance' },
        ],
      },
      {
        id: 'fa-education',
        label: 'Education',
        children: [
          { id: 'fa-primary-ed', label: 'Primary Education' },
          { id: 'fa-tertiary-ed', label: 'Tertiary Education' },
          { id: 'fa-girls-ed',   label: 'Girls Education' },
          { id: 'fa-ecd',        label: 'Early Childhood Development' },
        ],
      },
      {
        id: 'fa-gender',
        label: 'Gender Equality',
        children: [
          { id: 'fa-womens-econ',   label: "Women's Economic Empowerment" },
          { id: 'fa-gbv',           label: 'Gender-Based Violence Prevention' },
          { id: 'fa-womens-health', label: "Women's Health" },
        ],
      },
    ],
  },

  {
    id: 'work-activities',
    label: 'Work Activities',
    nodes: [
      { id: 'wa-research',  label: 'Research & Evaluation' },
      { id: 'wa-capacity',  label: 'Capacity Building' },
      { id: 'wa-service',   label: 'Direct Service Delivery' },
      { id: 'wa-advocacy',  label: 'Advocacy & Policy' },
      { id: 'wa-technical', label: 'Technical Assistance' },
      { id: 'wa-systems',   label: 'Systems Strengthening' },
      { id: 'wa-behavior',  label: 'Behavior Change Communication' },
      { id: 'wa-tech',      label: 'Technology Development' },
    ],
  },

  {
    id: 'beneficiary-demographics',
    label: 'Beneficiary Demographics',
    nodes: [
      {
        id: 'bd-women-girls',
        label: 'Women & Girls',
        children: [
          { id: 'bd-adolescent-girls', label: 'Adolescent Girls' },
          { id: 'bd-women-repro',      label: 'Women of Reproductive Age' },
          { id: 'bd-women-farmers',    label: 'Women Smallholder Farmers' },
        ],
      },
      {
        id: 'bd-children',
        label: 'Children',
        children: [
          { id: 'bd-newborns',    label: 'Newborns' },
          { id: 'bd-under5',      label: 'Children Under 5' },
          { id: 'bd-school-age',  label: 'School-Age Children' },
        ],
      },
      { id: 'bd-youth',           label: 'Youth (15–24)' },
      { id: 'bd-smallholder',     label: 'Smallholder Farmers' },
      { id: 'bd-extreme-poverty', label: 'People in Extreme Poverty' },
      { id: 'bd-refugees',        label: 'Refugees & Displaced Persons' },
      { id: 'bd-marginalized',    label: 'Marginalized Communities' },
    ],
  },

  {
    id: 'geographies-served',
    label: 'Geographies Served',
    nodes: [
      {
        id: 'gs-africa',
        label: 'Africa',
        children: [
          {
            id: 'gs-east-africa',
            label: 'East Africa',
            children: [
              { id: 'gs-ethiopia', label: 'Ethiopia' },
              { id: 'gs-kenya',    label: 'Kenya' },
              { id: 'gs-rwanda',   label: 'Rwanda' },
              { id: 'gs-tanzania', label: 'Tanzania' },
              { id: 'gs-uganda',   label: 'Uganda' },
              { id: 'gs-burundi',  label: 'Burundi' },
            ],
          },
          {
            id: 'gs-west-africa',
            label: 'West Africa',
            children: [
              { id: 'gs-burkina', label: 'Burkina Faso' },
              { id: 'gs-ghana',   label: 'Ghana' },
              { id: 'gs-niger',   label: 'Niger' },
              { id: 'gs-nigeria', label: 'Nigeria' },
            ],
          },
          {
            id: 'gs-southern-africa',
            label: 'Southern Africa',
            children: [
              { id: 'gs-mozambique', label: 'Mozambique' },
              { id: 'gs-zambia',     label: 'Zambia' },
            ],
          },
        ],
      },
      {
        id: 'gs-asia',
        label: 'Asia',
        children: [
          {
            id: 'gs-south-asia',
            label: 'South Asia',
            children: [
              { id: 'gs-bangladesh', label: 'Bangladesh' },
              { id: 'gs-india',      label: 'India' },
              { id: 'gs-pakistan',   label: 'Pakistan' },
            ],
          },
          {
            id: 'gs-se-asia',
            label: 'Southeast Asia',
            children: [
              { id: 'gs-indonesia',  label: 'Indonesia' },
              { id: 'gs-philippines', label: 'Philippines' },
            ],
          },
        ],
      },
      {
        id: 'gs-europe',
        label: 'Europe',
        children: [
          { id: 'gs-switzerland', label: 'Switzerland' },
          { id: 'gs-uk',          label: 'United Kingdom' },
        ],
      },
      {
        id: 'gs-north-america',
        label: 'North America',
        children: [
          { id: 'gs-canada', label: 'Canada' },
          { id: 'gs-usa',    label: 'United States' },
        ],
      },
      { id: 'gs-global', label: 'Global / Multi-Country' },
    ],
  },

  {
    id: 'locations-of-work',
    label: 'Locations of Work',
    nodes: [
      {
        id: 'lw-africa',
        label: 'Africa',
        children: [
          {
            id: 'lw-east-africa',
            label: 'East Africa',
            children: [
              { id: 'lw-ethiopia', label: 'Ethiopia' },
              { id: 'lw-kenya',    label: 'Kenya' },
              { id: 'lw-rwanda',   label: 'Rwanda' },
              { id: 'lw-tanzania', label: 'Tanzania' },
              { id: 'lw-uganda',   label: 'Uganda' },
            ],
          },
          {
            id: 'lw-west-africa',
            label: 'West Africa',
            children: [
              { id: 'lw-burkina', label: 'Burkina Faso' },
              { id: 'lw-nigeria', label: 'Nigeria' },
              { id: 'lw-niger',   label: 'Niger' },
            ],
          },
        ],
      },
      {
        id: 'lw-asia',
        label: 'Asia',
        children: [
          {
            id: 'lw-south-asia',
            label: 'South Asia',
            children: [
              { id: 'lw-bangladesh', label: 'Bangladesh' },
              { id: 'lw-india',      label: 'India' },
            ],
          },
        ],
      },
      {
        id: 'lw-europe',
        label: 'Europe',
        children: [
          { id: 'lw-uk',          label: 'United Kingdom' },
          { id: 'lw-switzerland', label: 'Switzerland' },
        ],
      },
      {
        id: 'lw-north-america',
        label: 'North America',
        children: [
          { id: 'lw-usa',    label: 'United States' },
          { id: 'lw-canada', label: 'Canada' },
        ],
      },
    ],
  },

  {
    id: 'investment-statuses',
    label: 'Investment Statuses',
    nodes: [
      { id: 'is-active',     label: 'Active' },
      { id: 'is-in-process', label: 'In Process' },
      { id: 'is-closed',     label: 'Closed' },
      { id: 'is-pending',    label: 'Pending' },
    ],
  },

  {
    id: 'start-dates',
    label: 'Start Dates',
    nodes: [
      { id: 'sd-before-2019', label: 'Before 2019' },
      { id: 'sd-2019-2020',   label: '2019–2020' },
      { id: 'sd-2021-2022',   label: '2021–2022' },
      { id: 'sd-2023-2024',   label: '2023–2024' },
      { id: 'sd-2025-plus',   label: '2025 and later' },
    ],
  },

  {
    id: 'approved-amounts',
    label: 'Approved Inv. Amounts',
    nodes: [
      { id: 'aa-under-1m', label: 'Under $1M' },
      { id: 'aa-1m-5m',    label: '$1M–$5M' },
      { id: 'aa-5m-15m',   label: '$5M–$15M' },
      { id: 'aa-15m-50m',  label: '$15M–$50M' },
      { id: 'aa-over-50m', label: 'Over $50M' },
    ],
  },

  {
    id: 'managing-teams',
    label: 'Managing Teams',
    nodes: [
      { id: 'mt-ag-dev',    label: 'Agricultural Development' },
      { id: 'mt-fsp',       label: 'Financial Services for the Poor' },
      { id: 'mt-gender-ed', label: 'Gender Equality — Education' },
      { id: 'mt-gender',    label: 'Gender Equality' },
      { id: 'mt-global-ed', label: 'Global Education' },
      { id: 'mt-epidemic',  label: 'Global Health — Epidemic Preparedness' },
      { id: 'mt-vaccines',  label: 'Global Health — Vaccine Delivery' },
      { id: 'mt-mnch',      label: 'Maternal, Newborn & Child Health' },
      { id: 'mt-wash',      label: 'Water, Sanitation & Hygiene' },
    ],
  },
]
