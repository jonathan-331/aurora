export interface DivisionData {
  id: string
  name: string
  description: string
  investmentCount: number
  totalAmount: number
}

export interface DivisionGroup {
  type: 'Program' | 'Operational'
  divisions: DivisionData[]
}

export const DIVISION_GROUPS: DivisionGroup[] = [
  {
    type: 'Program',
    divisions: [
      {
        id: 'gender-equality',
        name: 'Gender Equality',
        description: "Advances gender equality through women's economic empowerment, girls' education, and reproductive health investments.",
        investmentCount: 47,
        totalAmount: 312000000,
      },
      {
        id: 'global-development',
        name: 'Global Development',
        description: 'Focuses on poverty reduction in developing countries through targeted nutrition, water, and agricultural programs.',
        investmentCount: 83,
        totalAmount: 541000000,
      },
      {
        id: 'global-growth-opportunity',
        name: 'Global Growth & Opportunity',
        description: 'Promotes economic opportunity through financial inclusion, agriculture market development, and digital finance.',
        investmentCount: 61,
        totalAmount: 428000000,
      },
      {
        id: 'global-health',
        name: 'Global Health',
        description: 'Invests in preventing and treating infectious diseases, improving nutrition, and strengthening health systems worldwide.',
        investmentCount: 124,
        totalAmount: 1870000000,
      },
      {
        id: 'global-policy-advocacy',
        name: 'Global Policy & Advocacy',
        description: "Shapes enabling policies and mobilizes resources to accelerate progress across the Foundation's priorities.",
        investmentCount: 38,
        totalAmount: 198000000,
      },
      {
        id: 'us-program',
        name: 'U.S. Program',
        description: 'Expands opportunity in the United States through investments in education, economic mobility, and civic engagement.',
        investmentCount: 72,
        totalAmount: 634000000,
      },
    ],
  },
  {
    type: 'Operational',
    divisions: [
      {
        id: 'business-operations',
        name: 'Business Operations',
        description: 'Provides operational infrastructure, technology, and services that support the Foundation across all divisions.',
        investmentCount: 4,
        totalAmount: 18000000,
      },
      {
        id: 'communications',
        name: 'Communications',
        description: "Builds awareness and understanding of the Foundation's goals, strategies, and impact with global audiences.",
        investmentCount: 11,
        totalAmount: 34000000,
      },
      {
        id: 'executive',
        name: 'Executive',
        description: 'Provides leadership and strategic direction, guiding investment decisions and organizational priorities.',
        investmentCount: 6,
        totalAmount: 52000000,
      },
      {
        id: 'finance-resource-planning',
        name: 'Finance & Resource Planning',
        description: 'Manages financial resources, planning, and reporting to ensure responsible stewardship of Foundation assets.',
        investmentCount: 2,
        totalAmount: 7000000,
      },
      {
        id: 'foundation-strategy-office',
        name: 'Foundation Strategy Office',
        description: 'Coordinates cross-cutting strategic initiatives and monitors organizational performance against goals.',
        investmentCount: 9,
        totalAmount: 41000000,
      },
      {
        id: 'legal',
        name: 'Legal',
        description: 'Provides legal counsel and compliance support for grants, contracts, and organizational governance.',
        investmentCount: 1,
        totalAmount: 3000000,
      },
      {
        id: 'people',
        name: 'People',
        description: 'Attracts, develops, and supports Foundation talent to build an inclusive and high-performing organization.',
        investmentCount: 3,
        totalAmount: 9000000,
      },
    ],
  },
]
