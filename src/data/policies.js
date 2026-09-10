// 20+ Fictional Policies & Reform Acts for RashtraNiti
const GAME_POLICIES = [
  {
    id: 'digital_rupee_act',
    title: 'Digital Public Finance Modernization Act',
    titleHindi: 'डिजिटल लोक वित्त आधुनिकीकरण अधिनियम',
    category: 'Economy & Tech',
    categoryHindi: 'अर्थव्यवस्था व तकनीक',
    icon: '💳',
    costBillion: 15,
    annualCostBillion: 2,
    parliamentDifficulty: 45, // % support required from swing parties
    status: 'unpassed',
    description: 'Direct cash transfer infrastructure eliminating middlemen leakages in welfare subsidies.',
    descHindi: 'कल्याणकारी योजनाओं में बिचौलियों को समाप्त कर सीधे खातों में पारदर्शी धन हस्तांतरण।',
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
    categoryHindi: 'कृषि एवं ग्रामीण',
    icon: '🌾',
    costBillion: 25,
    annualCostBillion: 4,
    parliamentDifficulty: 60,
    status: 'unpassed',
    description: 'Connects farmers directly to national retail chains with guaranteed minimum price floors.',
    descHindi: 'किसानों को सीधे राष्ट्रीय खुदरा श्रृंखलाओं से जोड़ना और न्यूनतम समर्थन मूल्य की गारंटी।',
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
    categoryHindi: 'उच्च प्रौद्योगिकी',
    icon: '⚡',
    costBillion: 40,
    annualCostBillion: 6,
    parliamentDifficulty: 50,
    status: 'unpassed',
    description: 'Provides 50% capital support for indigenous silicon wafer foundries and quantum R&D.',
    descHindi: 'स्वदेशी सिलिकॉन वेफर फैब और क्वांटम अनुसंधान के लिए 50% पूंजीगत सहायता।',
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
    categoryHindi: 'स्वास्थ्य एवं चिकित्सा',
    icon: '🏥',
    costBillion: 50,
    annualCostBillion: 12,
    parliamentDifficulty: 55,
    status: 'unpassed',
    description: 'Free tertiary healthcare coverage up to ₹5 Lakhs for all low-income families.',
    descHindi: 'सभी वंचित व मध्यम परिवारों के लिए ₹5 लाख तक का निशुल्क कैशलेस अस्पताल उपचार।',
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
    categoryHindi: 'बुनियादी ढांचा',
    icon: '🚄',
    costBillion: 75,
    annualCostBillion: 8,
    parliamentDifficulty: 65,
    status: 'unpassed',
    description: 'Connects the 4 mega-metro capitals with 350 km/h high-speed passenger & freight rail.',
    descHindi: 'देश के 4 प्रमुख महानगरों को 350 किमी/घंटा हाई-स्पीड बुलेट ट्रेन नेटवर्क से जोड़ना।',
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
    categoryHindi: 'पर्यावरण व ऊर्जा',
    icon: '🌱',
    costBillion: 30,
    annualCostBillion: 4,
    parliamentDifficulty: 40,
    status: 'unpassed',
    description: 'Mandates 50% renewable grid mix by 2035 with mega solar parks and zero carbon subsidies.',
    descHindi: 'विशाल सौर पार्कों और हरित हाइड्रोजन से 2035 तक 50% स्वच्छ ऊर्जा का लक्ष्य।',
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
    categoryHindi: 'राष्ट्रीय रक्षा',
    icon: '🛡️',
    costBillion: 45,
    annualCostBillion: 7,
    parliamentDifficulty: 35,
    status: 'unpassed',
    description: 'Mandates 70% indigenous manufacturing for naval vessels, fighter aircraft, and missile systems.',
    descHindi: 'लड़ाकू विमानों, युद्धपोतों और मिसाइल प्रणालियों में 70% स्वदेशी विनिर्माण अनिवार्य।',
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
    categoryHindi: 'शिक्षा एवं कौशल',
    icon: '🎓',
    costBillion: 20,
    annualCostBillion: 5,
    parliamentDifficulty: 40,
    status: 'unpassed',
    description: 'Fully funds 100,000 PhD scholars and upgrades 500 state universities with advanced STEM labs.',
    descHindi: '1 लाख पीएचडी शोधार्थियों को पूर्ण छात्रवृत्ति और 500 विश्वविद्यालयों में आधुनिक लैब।',
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
    categoryHindi: 'लघु उद्योग व व्यापार',
    icon: '💼',
    costBillion: 22,
    annualCostBillion: 5,
    parliamentDifficulty: 50,
    status: 'unpassed',
    description: 'Reduces corporate tax for small enterprises from 25% to 15% and eliminates inspector compliance burden.',
    descHindi: 'छोटे उद्योगों के लिए कॉर्पोरेट टैक्स 25% से घटाकर 15% और एकल खिड़की मंजूरी प्रणाली।',
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
    categoryHindi: 'सुशासन व न्याय',
    icon: '⚖️',
    costBillion: 12,
    annualCostBillion: 2,
    parliamentDifficulty: 45,
    status: 'unpassed',
    description: 'AI-assisted case filing and 1,000 new commercial courts to cut judicial backlog by 50%.',
    descHindi: 'AI-सक्षम केस फाइलिंग और 1,000 नई वाणिज्यिक अदालतें जिससे लंबित मामलों में 50% कमी आए।',
    effects: {
      easeOfBusiness: +15,
      corruption: -10,
      satisfaction: { middle_class: +9, business: +12 },
      stability: +7
    }
  }
];

window.GAME_POLICIES = GAME_POLICIES;
