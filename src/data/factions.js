// Fictional Political Landscape, Factions, Demographics & Media
const GAME_FACTIONS = {
  // Total 543 Lok Sabha seats in the Parliament
  parliament: {
    totalSeats: 543,
    majorityNeeded: 272,
    parties: [
      {
        id: 'ruling_rpd',
        name: 'Rashtriya Pragati Dal (RPD)',
        shortName: 'RPD',
        color: '#f59e0b', // Saffron-Gold
        alignment: 'Ruling Coalition (Center-Right/Development)',
        initialSeats: 285,
        loyalty: 80,
        ideology: 'Economic Growth, Infrastructure & Strong Defense'
      },
      {
        id: 'opp_jvf',
        name: 'Janata Vikas Front (JVF)',
        shortName: 'JVF',
        color: '#3b82f6', // Navy Blue
        alignment: 'Main Opposition (Social Democratic)',
        initialSeats: 165,
        loyalty: 35,
        ideology: 'Welfare, Farmer Subsidies & Labor Rights'
      },
      {
        id: 'opp_nkd',
        name: 'Nav-Kranti Dal (NKD)',
        shortName: 'NKD',
        color: '#10b981', // Emerald Green
        alignment: 'Reformist / Progressive Block',
        initialSeats: 55,
        loyalty: 50,
        ideology: 'Education, Green Energy & Digital Governance'
      },
      {
        id: 'independent',
        name: 'Regional Federations & Independents',
        shortName: 'IND',
        color: '#8b5cf6', // Violet
        alignment: 'Swing Votes / Regional Interests',
        initialSeats: 38,
        loyalty: 55,
        ideology: 'State Autonomy & Local Infrastructure'
      }
    ]
  },

  // 5 Major Demographic Voter Bases
  demographics: [
    {
      id: 'farmers',
      name: 'Farmers & Agrarian Community',
      nameHindi: 'किसान एवं ग्रामीण समुदाय',
      icon: '🌾',
      weight: 0.32,
      satisfaction: 60,
      priorities: ['agriculture', 'healthcare', 'infrastructure'],
      description: 'Cares deeply about MSP, irrigation, rural roads, and crop disaster relief.'
    },
    {
      id: 'middle_class',
      name: 'Urban Middle Class & Salaried',
      nameHindi: 'शहरी मध्यम वर्ग',
      icon: '🏢',
      weight: 0.28,
      satisfaction: 58,
      priorities: ['infrastructure', 'education', 'technology'],
      description: 'Sensitive to inflation, income tax, civic amenities, and quality schools.'
    },
    {
      id: 'youth',
      name: 'Youth & Job Seekers',
      nameHindi: 'युवा एवं छात्र',
      icon: '🎓',
      weight: 0.22,
      satisfaction: 55,
      priorities: ['employment', 'technology', 'education'],
      description: 'Wants modern jobs, startup ecosystem, affordable universities, and digital freedom.'
    },
    {
      id: 'business',
      name: 'Business & Industrialists',
      nameHindi: 'उद्योग एवं व्यापारी',
      icon: '💼',
      weight: 0.10,
      satisfaction: 62,
      priorities: ['infrastructure', 'technology', 'defence'],
      description: 'Prioritizes deregulation, ease of business, logistics corridors, and stable tax laws.'
    },
    {
      id: 'welfare_poor',
      name: 'Underprivileged & Social Wage Earners',
      nameHindi: 'वंचित एवं श्रमिक वर्ग',
      icon: '🤝',
      weight: 0.08,
      satisfaction: 56,
      priorities: ['social_welfare', 'healthcare', 'employment'],
      description: 'Relies on public healthcare, food security, pension support, and direct transfers.'
    }
  ],

  // 9 Core Ministerial Sectors for Budget
  sectors: [
    {
      id: 'education',
      name: 'Education & Universities',
      nameHindi: 'शिक्षा एवं कौशल विकास',
      icon: '📚',
      defaultPercent: 12,
      minPercent: 3,
      maxPercent: 25,
      desc: 'Builds world-class universities, schools, and drives long-term human capital & GDP growth.'
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Public Hospitals',
      nameHindi: 'स्वास्थ्य एवं चिकित्सा',
      icon: '🏥',
      defaultPercent: 11,
      minPercent: 3,
      maxPercent: 25,
      desc: 'Subsidized hospitals, diagnostic centers, and epidemic resilience. Boosts public satisfaction.'
    },
    {
      id: 'defence',
      name: 'Defence & Border Security',
      nameHindi: 'रक्षा एवं सीमा सुरक्षा',
      icon: '🛡️',
      defaultPercent: 14,
      minPercent: 5,
      maxPercent: 30,
      desc: 'Modernizes armed forces, border infrastructure, and indigenous aerospace deterrence.'
    },
    {
      id: 'agriculture',
      name: 'Agriculture & Rural Irrigation',
      nameHindi: 'कृषि एवं ग्रामीण विकास',
      icon: '🚜',
      defaultPercent: 13,
      minPercent: 4,
      maxPercent: 25,
      desc: 'Canal networks, cold storage, fertilizer subsidies, and crop insurance safety nets.'
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure & Expressways',
      nameHindi: 'बुनियादी ढांचा व एक्सप्रेसवे',
      icon: '🏗️',
      defaultPercent: 15,
      minPercent: 5,
      maxPercent: 30,
      desc: 'High-speed railways, port modernizations, freight corridors, and power transmission.'
    },
    {
      id: 'employment',
      name: 'Employment Generation & MSME',
      nameHindi: 'रोजगार एवं लघु उद्योग',
      icon: '🏭',
      defaultPercent: 11,
      minPercent: 3,
      maxPercent: 22,
      desc: 'Apprenticeships, manufacturing incentives (PLI), and credit subsidies for small businesses.'
    },
    {
      id: 'technology',
      name: 'Technology, Space & AI R&D',
      nameHindi: 'प्रौद्योगिकी, अंतरिक्ष व AI',
      icon: '🚀',
      defaultPercent: 9,
      minPercent: 2,
      maxPercent: 20,
      desc: 'Semiconductor fabs, space exploration, supercomputing, and digital public infrastructure.'
    },
    {
      id: 'environment',
      name: 'Environment & Clean Energy',
      nameHindi: 'पर्यावरण एवं सौर ऊर्जा',
      icon: '🌿',
      defaultPercent: 7,
      minPercent: 2,
      maxPercent: 18,
      desc: 'Solar & wind farms, river rejuvenation, urban air quality filters, and carbon reduction.'
    },
    {
      id: 'social_welfare',
      name: 'Social Welfare & Direct Support',
      nameHindi: 'सामाजिक सुरक्षा व पेंशन',
      icon: '🍲',
      defaultPercent: 8,
      minPercent: 2,
      maxPercent: 22,
      desc: 'Elderly pensions, food security rations, disability support, and poverty alleviation.'
    }
  ],

  // Fictional National Media Houses
  mediaHouses: [
    {
      name: 'The Rashtra Times',
      tagline: 'The Voice of the Nation since 1948',
      type: 'Neutral Broadcaster',
      bias: 'Balanced'
    },
    {
      name: 'Capital Herald',
      tagline: 'Leading Business & Governance Daily',
      type: 'Financial Press',
      bias: 'Fiscal Discipline'
    },
    {
      name: 'Janata Live TV',
      tagline: 'Fearless People’s Journalism',
      type: 'Populist Media',
      bias: 'Pro-Public/Farmer'
    }
  ]
};

window.GAME_FACTIONS = GAME_FACTIONS;
