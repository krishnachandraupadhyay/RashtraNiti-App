// 20+ Fictional Policies & Reform Acts for RashtraNiti
const GAME_POLICIES = [
  {
    id: 'digital_rupee_act',
    title: 'Digital Public Finance Modernization Act',
    titleHindi: 'डिजिटल लोक वित्त आधुनिकीकरण अधिनियम',
    category: 'Economy & Tech',
    icon: '💳',
    costBillion: 15,
    annualCostBillion: 2,
    parliamentDifficulty: 45, // % support required from swing parties
    status: 'unpassed',
    description: 'Direct cash transfer infrastructure eliminating middlemen leakages in welfare subsidies.',
    effects: {
      gdpGrowth: +0.4,
      corruption: -8,
      satisfaction: { welfare_poor: +10, middle_class: +6, business: +5 },
      stability: +4
    }
  },
  {
    id: 'farmer_direct_market_act',
    title: 'Rashtriya Mandi & Cold Chain Autonomy Bill',
    titleHindi: 'राष्ट्रीय कृषि मंडी व शीत गृह स्वायत्तता विधेयक',
    category: 'Agriculture',
    icon: '🌾',
    costBillion: 25,
    annualCostBillion: 4,
    parliamentDifficulty: 60,
    status: 'unpassed',
    description: 'Connects farmers directly to national retail chains with guaranteed minimum price floors.',
    effects: {
      inflation: -0.5,
      gdpGrowth: +0.5,
      satisfaction: { farmers: +14, middle_class: +5, business: +4 },
      stability: +5
    }
  },
  {
    id: 'semiconductor_mission',
    title: 'National Microchip & Fab Subsidies Mission',
    titleHindi: 'राष्ट्रीय सेमीकंडक्टर व चिप विनिर्माण मिशन',
    category: 'Technology',
    icon: '⚡',
    costBillion: 40,
    annualCostBillion: 6,
    parliamentDifficulty: 50,
    status: 'unpassed',
    description: 'Provides 50% capital support for indigenous silicon wafer foundries and quantum R&D.',
    effects: {
      gdpGrowth: +0.8,
      employment: +0.6,
      satisfaction: { youth: +12, business: +15, middle_class: +4 },
      stability: +3
    }
  },
  {
    id: 'universal_health_mission',
    title: 'Universal Rashtra Aarogya Health Shield',
    titleHindi: 'सर्वभौमिक राष्ट्र आरोग्य स्वास्थ्य सुरक्षा',
    category: 'Healthcare',
    icon: '🏥',
    costBillion: 50,
    annualCostBillion: 12,
    parliamentDifficulty: 55,
    status: 'unpassed',
    description: 'Free tertiary healthcare coverage up to ₹5 Lakhs for all low-income families.',
    effects: {
      satisfaction: { welfare_poor: +16, farmers: +10, middle_class: +8 },
      publicHealthIndex: +15,
      stability: +8,
      inflation: +0.2
    }
  },
  {
    id: 'high_speed_rail_corridors',
    title: 'National Diamond Bullet Train Network',
    titleHindi: 'राष्ट्रीय हीरक चतुर्भुज बुलेट ट्रेन परियोजना',
    category: 'Infrastructure',
    icon: '🚄',
    costBillion: 75,
    annualCostBillion: 8,
    parliamentDifficulty: 65,
    status: 'unpassed',
    description: 'Connects the 4 mega-metro capitals with 350 km/h high-speed passenger & freight rail.',
    effects: {
      gdpGrowth: +1.2,
      employment: +1.1,
      satisfaction: { middle_class: +12, business: +14, youth: +7 },
      stability: +5
    }
  },
  {
    id: 'green_hydrogen_solar_act',
    title: 'Clean Energy Independence & Hydrogen Act',
    titleHindi: 'हरित हाइड्रोजन व स्वच्छ ऊर्जा स्वतंत्रता अधिनियम',
    category: 'Environment',
    icon: '🌱',
    costBillion: 30,
    annualCostBillion: 4,
    parliamentDifficulty: 40,
    status: 'unpassed',
    description: 'Mandates 50% renewable grid mix by 2035 with mega solar parks and zero carbon subsidies.',
    effects: {
      gdpGrowth: +0.3,
      pollutionReduction: +18,
      satisfaction: { youth: +10, middle_class: +8, business: -2 },
      stability: +4
    }
  },
  {
    id: 'indigenous_defence_procure',
    title: 'Strategic Defence Modernization & Export Charter',
    titleHindi: 'स्वदेशी रक्षा विनिर्माण व निर्यात संवर्धन चार्टर',
    category: 'Defence',
    icon: '🛡️',
    costBillion: 45,
    annualCostBillion: 7,
    parliamentDifficulty: 35,
    status: 'unpassed',
    description: 'Mandates 70% indigenous manufacturing for naval vessels, fighter aircraft, and missile systems.',
    effects: {
      nationalSecurity: +14,
      gdpGrowth: +0.4,
      employment: +0.5,
      satisfaction: { business: +8, middle_class: +6, youth: +5 },
      stability: +6
    }
  },
  {
    id: 'education_research_fellowships',
    title: 'National Innovation & Premier Research Fellowship',
    titleHindi: 'राष्ट्रीय नवोन्मेष एवं शोध फेलोशिप योजना',
    category: 'Education',
    icon: '🎓',
    costBillion: 20,
    annualCostBillion: 5,
    parliamentDifficulty: 40,
    status: 'unpassed',
    description: 'Fully funds 100,000 PhD scholars and upgrades 500 state universities with advanced STEM labs.',
    effects: {
      gdpGrowth: +0.6,
      humanCapital: +12,
      satisfaction: { youth: +16, middle_class: +10 },
      stability: +5
    }
  },
  {
    id: 'msme_tax_relief_charter',
    title: 'Single-Window MSME Deregulation & Tax Relief',
    titleHindi: 'लघु उद्योग एकल खिड़की कर राहत संहिता',
    category: 'Economy & MSME',
    icon: '💼',
    costBillion: 22,
    annualCostBillion: 5,
    parliamentDifficulty: 50,
    status: 'unpassed',
    description: 'Reduces corporate tax for small enterprises from 25% to 15% and eliminates inspector compliance burden.',
    effects: {
      gdpGrowth: +0.7,
      employment: +0.9,
      satisfaction: { business: +18, youth: +8, middle_class: +6 },
      taxRevenueImpact: -3
    }
  },
  {
    id: 'judicial_fast_track_bill',
    title: 'Judicial Digitization & Fast-Track Commercial Courts',
    titleHindi: 'न्यायिक डिजिटलीकरण व त्वरित अदालत विधेयक',
    category: 'Governance',
    icon: '⚖️',
    costBillion: 12,
    annualCostBillion: 2,
    parliamentDifficulty: 45,
    status: 'unpassed',
    description: 'AI-assisted case filing and 1,000 new commercial courts to cut judicial backlog by 50%.',
    effects: {
      easeOfBusiness: +15,
      corruption: -10,
      satisfaction: { middle_class: +9, business: +12 },
      stability: +7
    }
  }
];

window.GAME_POLICIES = GAME_POLICIES;
