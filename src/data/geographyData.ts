export interface CountryData {
  id: string
  name: string
  investmentCount: number
  approvedAmount: number
  hasFieldOffice?: boolean
}

export interface SubRegion {
  name: string
  countries: CountryData[]
}

export interface GeographicRegion {
  id: string
  name: string
  subRegions: SubRegion[]
}

export const GEOGRAPHIC_REGIONS: GeographicRegion[] = [
  {
    id: 'africa',
    name: 'Africa',
    subRegions: [
      {
        name: 'East Africa',
        countries: [
          { id: 'ethiopia',  name: 'Ethiopia',  investmentCount: 12, approvedAmount: 47200000, hasFieldOffice: true },
          { id: 'kenya',     name: 'Kenya',     investmentCount: 18, approvedAmount: 83400000, hasFieldOffice: true },
          { id: 'rwanda',    name: 'Rwanda',    investmentCount:  8, approvedAmount: 31600000 },
          { id: 'tanzania',  name: 'Tanzania',  investmentCount: 11, approvedAmount: 52100000 },
          { id: 'uganda',    name: 'Uganda',    investmentCount:  9, approvedAmount: 38700000 },
          { id: 'burundi',   name: 'Burundi',   investmentCount:  3, approvedAmount:  8400000 },
        ],
      },
      {
        name: 'West Africa',
        countries: [
          { id: 'nigeria',      name: 'Nigeria',      investmentCount: 22, approvedAmount: 156800000, hasFieldOffice: true },
          { id: 'ghana',        name: 'Ghana',        investmentCount:  7, approvedAmount:  28300000 },
          { id: 'burkina-faso', name: 'Burkina Faso', investmentCount:  5, approvedAmount:  19800000 },
          { id: 'niger',        name: 'Niger',        investmentCount:  4, approvedAmount:  14600000 },
        ],
      },
      {
        name: 'Southern Africa',
        countries: [
          { id: 'zambia',     name: 'Zambia',     investmentCount: 6, approvedAmount: 24500000 },
          { id: 'mozambique', name: 'Mozambique', investmentCount: 4, approvedAmount: 18200000 },
        ],
      },
    ],
  },
  {
    id: 'asia',
    name: 'Asia',
    subRegions: [
      {
        name: 'South Asia',
        countries: [
          { id: 'india',      name: 'India',      investmentCount: 31, approvedAmount: 284600000, hasFieldOffice: true },
          { id: 'bangladesh', name: 'Bangladesh', investmentCount: 14, approvedAmount:  67300000 },
          { id: 'pakistan',   name: 'Pakistan',   investmentCount:  9, approvedAmount:  43200000 },
        ],
      },
      {
        name: 'Southeast Asia',
        countries: [
          { id: 'indonesia',   name: 'Indonesia',   investmentCount: 8, approvedAmount: 39100000 },
          { id: 'philippines', name: 'Philippines', investmentCount: 5, approvedAmount: 21400000 },
        ],
      },
    ],
  },
  {
    id: 'europe',
    name: 'Europe',
    subRegions: [
      {
        name: 'Western Europe',
        countries: [
          { id: 'united-kingdom', name: 'United Kingdom', investmentCount: 7,  approvedAmount:  45600000, hasFieldOffice: true },
          { id: 'switzerland',    name: 'Switzerland',    investmentCount: 3,  approvedAmount:  12800000 },
        ],
      },
    ],
  },
  {
    id: 'north-america',
    name: 'North America',
    subRegions: [
      {
        name: 'North America',
        countries: [
          { id: 'united-states', name: 'United States', investmentCount: 84, approvedAmount: 1240000000, hasFieldOffice: true },
          { id: 'canada',        name: 'Canada',        investmentCount:  6, approvedAmount:   28700000 },
        ],
      },
    ],
  },
]

export function getTotals() {
  let totalCountries = 0
  let totalInvestments = 0
  let totalAmount = 0
  for (const region of GEOGRAPHIC_REGIONS) {
    for (const sub of region.subRegions) {
      totalCountries += sub.countries.length
      for (const c of sub.countries) {
        totalInvestments += c.investmentCount
        totalAmount += c.approvedAmount
      }
    }
  }
  return { totalCountries, totalInvestments, totalAmount }
}
