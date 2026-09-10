// 30+ Dynamic Fictional Crisis & Opportunity Events for RashtraNiti
const GAME_EVENTS = [
  {
    id: 'monsoon_deficit_crisis',
    title: 'Severe Monsoon Deficit Threatens Kharif Harvest',
    titleHindi: 'मानसून की कमी से खरीफ फसल पर संकट',
    category: 'Agriculture Crisis',
    categoryHindi: 'कृषि संकट',
    icon: '☀️',
    severity: 'High',
    description: 'The Meteorological Department reports rainfall is 28% below normal across the fertile central plains. Reservoirs are dry, and farmer unions are demanding immediate emergency relief.',
    descHindi: 'मौसम विभाग के अनुसार उपजाऊ मैदानों में बारिश सामान्य से 28% कम रही है। जलाशय सूख रहे हैं और किसान संगठन आपातकालीन राहत की मांग कर रहे हैं।',
    options: [
      {
        text: 'Release ₹25 Billion Emergency Drought Relief Fund',
        textHindi: '₹25 बिलियन का आपातकालीन सूखा राहत पैकेज जारी करें',
        costBillion: 25,
        effects: {
          satisfaction: { farmers: +18, rural_poor: +12, middle_class: -2 },
          inflation: +0.4,
          budgetImpact: -25,
          stability: +6
        },
        feedback: 'Farmers praise your compassionate leadership! Food supply stabilized, though fiscal deficit rose slightly.',
        feedbackHindi: 'किसानों ने आपकी त्वरित सहायता की सराहना की! खाद्यान्न आपूर्ति स्थिर रही हालांकि राजकोषीय घाटा थोड़ा बढ़ा।'
      },
      {
        text: 'Subsidize Electric Tube-wells & Emergency Canal Diversion',
        textHindi: 'बिजली ट्यूबवेल पर सब्सिडी व नहरों से आपातकालीन जल आपूर्ति',
        costBillion: 12,
        effects: {
          satisfaction: { farmers: +8, middle_class: 0 },
          gdpGrowth: -0.2,
          budgetImpact: -12,
          stability: +2
        },
        feedback: 'Moderate relief delivered to key districts. Opposition claims it is insufficient.',
        feedbackHindi: 'प्रमुख जिलों को राहत मिली। विपक्ष ने इसे नाकाफी बताया।'
      },
      {
        text: 'Open Global Grain Import Windows to Tame Market Inflation',
        textHindi: 'खाद्यान्न आयात शुल्क घटाएं ताकि शहरों में महंगाई न बढ़े',
        costBillion: 4,
        effects: {
          satisfaction: { middle_class: +8, farmers: -16, business: +4 },
          inflation: -0.8,
          stability: -4
        },
        feedback: 'Urban food prices stayed calm, but farm unions staged highway protests across three states.',
        feedbackHindi: 'शहरों में कीमतें नियंत्रित रहीं लेकिन किसान संगठनों ने असंतोष जताया।'
      }
    ]
  },
  {
    id: 'global_cyber_banking_threat',
    title: 'Massive Cyber Attack on National Banking Clearing Grid',
    titleHindi: 'राष्ट्रीय बैंकिंग ग्रिड पर बड़ा साइबर हमला',
    category: 'National Security & Tech',
    categoryHindi: 'राष्ट्रीय सुरक्षा व तकनीक',
    icon: '💻',
    severity: 'Critical',
    description: 'A rogue cyber-syndicate launched a distributed ransomware attack targeting ATM switches and digital payment gateways across 14 major commercial banks.',
    descHindi: 'अंतरराष्ट्रीय साइबर गिरोह ने 14 प्रमुख वाणिज्यिक बैंकों के डिजिटल पेमेंट गेटवे और एटीएम स्विच पर रैनसमवेयर हमला किया है।',
    options: [
      {
        text: 'Authorize Emergency Defense Cyber Command Overhaul (₹30B)',
        textHindi: 'रक्षा साइबर कमांड को ₹30B का आपातकालीन अपग्रेड फंड दें',
        costBillion: 30,
        effects: {
          satisfaction: { business: +14, middle_class: +10, youth: +8 },
          stability: +8,
          gdpGrowth: +0.3,
          budgetImpact: -30
        },
        feedback: 'The threat was neutralized within hours! Global rating agencies praised the nation’s cyber resilience.',
        feedbackHindi: 'हमला कुछ ही घंटों में नाकाम कर दिया गया! वैश्विक एजेंसियों ने देश की साइबर सुरक्षा की प्रशंसा की।'
      },
      {
        text: 'Order Temporary Bank Settlement Freezes & Stricter Firewalls',
        textHindi: 'अस्थायी लेनदेन रोकें और घरेलू स्तर पर सुरक्षा मजबूत करें',
        costBillion: 5,
        effects: {
          satisfaction: { business: -12, middle_class: -8 },
          gdpGrowth: -0.5,
          stability: -3
        },
        feedback: 'System saved without heavy spending, but trade stalled for three days causing public annoyance.',
        feedbackHindi: 'कम खर्च में ग्रिड सुरक्षित हुआ लेकिन 3 दिन व्यापार रुकने से कारोबारियों में नाराजगी रही।'
      },
      {
        text: 'Form a Joint Public-Private Cyber Taskforce with Tech Giants',
        textHindi: 'निजी टेक कंपनियों के साथ संयुक्त टास्कफोर्स का गठन करें',
        costBillion: 10,
        effects: {
          satisfaction: { youth: +10, business: +10, middle_class: +5 },
          stability: +4,
          budgetImpact: -10
        },
        feedback: 'Tech startups collaborated swiftly with CERT-In to deploy AI intrusion blockers.',
        feedbackHindi: 'भारतीय टेक स्टार्टअप्स और विशेषज्ञों ने मिलकर AI सुरक्षा दीवार तैयार की।'
      }
    ]
  },
  {
    id: 'tech_giant_mega_fab_proposal',
    title: 'Global Semiconductor Giant Proposes $10B Mega-Fab',
    titleHindi: 'वैश्विक चिप निर्माता कंपनी का ₹80,000 करोड़ का निवेश प्रस्ताव',
    category: 'Economic Opportunity',
    categoryHindi: 'आर्थिक अवसर',
    icon: '🏭',
    severity: 'Positive',
    description: 'Silicon Dynamics Global wants to build their largest next-generation 3nm semiconductor foundry in your nation, requesting 40% capital subsidy and guaranteed round-the-clock green power.',
    descHindi: 'एक अग्रणी चिप निर्माता कंपनी देश में विशाल 3nm सेमीकंडक्टर फैब स्थापित करना चाहती है। उन्होंने 40% पूंजीगत सब्सिडी और निर्बाध हरित ऊर्जा की मांग की है।',
    options: [
      {
        text: 'Accept with full ₹35B State Subsidy & Dedicated Solar Corridor',
        textHindi: '₹35B सब्सिडी और विशेष सौर ऊर्जा कॉरिडोर के साथ तुरंत मंजूरी दें',
        costBillion: 35,
        effects: {
          gdpGrowth: +1.4,
          employment: +1.2,
          satisfaction: { youth: +20, business: +22, middle_class: +10 },
          stability: +8,
          budgetImpact: -35
        },
        feedback: 'Historic victory! The nation becomes a global microchip superpower creating 75,000 high-tech jobs.',
        feedbackHindi: 'ऐतिहासिक उपलब्धि! देश सेमीकंडक्टर महाशक्ति बनने की राह पर, 75,000 हाई-टेक नौकरियां उत्पन्न होंगी।'
      },
      {
        text: 'Counter-offer: 20% Subsidy with Mandatory 60% Local Hiring',
        textHindi: '20% सब्सिडी और 60% स्थानीय युवाओं को नौकरी की शर्त रखें',
        costBillion: 18,
        effects: {
          gdpGrowth: +0.8,
          employment: +0.9,
          satisfaction: { youth: +15, business: +10 },
          stability: +5,
          budgetImpact: -18
        },
        feedback: 'The company accepted your terms after tough negotiations. Balanced fiscal deal!',
        feedbackHindi: 'कंपनी ने बातचीत के बाद आपकी शर्तें मान लीं। राजकोष पर कम भार के साथ बेहतरीन समझौता!'
      },
      {
        text: 'Reject High Subsidies; Ask them to Invest purely on Free Market Merits',
        textHindi: 'सब्सिडी देने से इनकार करें; बाजार के नियमों पर निवेश को कहें',
        costBillion: 0,
        effects: {
          satisfaction: { youth: -12, business: -10 },
          stability: -2
        },
        feedback: 'The conglomerate relocated their investment to a neighboring country. Opposition called it a missed golden chance.',
        feedbackHindi: 'कंपनी ने पड़ोसी देश का रुख कर लिया। विपक्ष ने इसे हाथ से निकला सुनहरा मौका करार दिया।'
      }
    ]
  },
  {
    id: 'crude_oil_price_spike',
    title: 'Global Geopolitical Shock Triggers 35% Crude Oil Surge',
    titleHindi: 'अंतरराष्ट्रीय तनाव से कच्चे तेल में 35% की भारी तेजी',
    category: 'Macroeconomic Crisis',
    categoryHindi: 'आर्थिक संकट',
    icon: '🛢️',
    severity: 'High',
    description: 'Conflict in energy chokepoints has pushed Brent crude above $115/barrel. Fuel import costs are ballooning and freight transport rates are rising.',
    descHindi: 'वैश्विक भू-राजनीतिक तनाव के चलते कच्चा तेल $115 प्रति बैरल पार कर गया है। ईंधन आयात का बिल बढ़ रहा है और माल ढुलाई महंगी हो रही है।',
    options: [
      {
        text: 'Slash Excise Taxes by ₹15B to Protect Common Citizens',
        textHindi: 'आम जनता को राहत देने के लिए ईंधन पर उत्पाद शुल्क घटाएं',
        costBillion: 15,
        effects: {
          inflation: -0.6,
          satisfaction: { middle_class: +14, farmers: +10, business: +8 },
          stability: +6,
          budgetImpact: -15
        },
        feedback: 'Commuters and truckers celebrated. Fuel inflation halted, but government revenue took a hit.',
        feedbackHindi: 'जनता और ट्रांसपोर्टरों को बड़ी राहत मिली। ईंधन महंगाई थमी, हालांकि राजस्व में कमी आई।'
      },
      {
        text: 'Pass the Price Rise Fully to Consumers to Preserve Treasury',
        textHindi: 'सरकारी खजाने की सुरक्षा हेतु कीमतों को बाजार पर छोड़ दें',
        costBillion: 0,
        effects: {
          inflation: +1.6,
          satisfaction: { middle_class: -18, farmers: -15, youth: -10 },
          stability: -10
        },
        feedback: 'Fiscal deficit preserved, but retail inflation hit a 3-year high causing public outrage.',
        feedbackHindi: 'राजकोषीय घाटा नियंत्रित रहा लेकिन खुदरा महंगाई 3 साल के उच्चतम स्तर पर पहुंच गई।'
      },
      {
        text: 'Fast-Track 100% Biofuel Blending & Electric Bus Subsidies (₹10B)',
        textHindi: 'बायोफ्यूल सम्मिश्रण और इलेक्ट्रिक बसों के लिए ₹10B का पैकेज',
        costBillion: 10,
        effects: {
          satisfaction: { youth: +12, farmers: +8, middle_class: +4 },
          pollutionReduction: +10,
          stability: +3,
          budgetImpact: -10
        },
        feedback: 'Strategic visionary move that lowered oil dependence in the medium term.',
        feedbackHindi: 'दूरदर्शी कदम जिससे मध्यम अवधि में तेल आयात निर्भरता में कमी आएगी।'
      }
    ]
  },
  {
    id: 'rare_earth_mineral_discovery',
    title: 'Vast Lithium & Titanium Reserves Discovered in Northern Hills',
    titleHindi: 'उत्तरी पहाड़ियों में विशाल लिथियम व टाइटेनियम भंडार की खोज',
    category: 'National Wealth',
    categoryHindi: 'राष्ट्रीय संपदा',
    icon: '💎',
    severity: 'Positive',
    description: 'Geological Survey confirms over 6.5 Million Metric Tonnes of high-grade Lithium and rare earths, sufficient to power the nation’s EV and battery industry for 40 years.',
    descHindi: 'भूवैज्ञानिक सर्वेक्षण ने 65 लाख टन उच्च-गुणवत्ता वाले लिथियम और दुर्लभ खनिजों के भंडार की पुष्टि की है, जो अगले 40 वर्षों के लिए देश की EV क्रांति को ऊर्जा देंगे।',
    options: [
      {
        text: 'Establish State-Owned National Mineral Enterprise (₹20B CapEx)',
        textHindi: 'सरकारी राष्ट्रीय खनिज निगम बनाकर खनन शुरू करें',
        costBillion: 20,
        effects: {
          gdpGrowth: +0.9,
          satisfaction: { welfare_poor: +10, youth: +8 },
          stability: +6,
          budgetImpact: -20
        },
        feedback: 'Sovereign wealth created for generations. Future royalty dividends will fund education and health.',
        feedbackHindi: 'पीढ़ियों के लिए राष्ट्रीय धरोहर तैयार! भविष्य की रॉयल्टी से शिक्षा व स्वास्थ्य को मजबूती मिलेगी।'
      },
      {
        text: 'Auction Mining Blocks to Private Global Consortiums via Bidding',
        textHindi: 'पारदर्शी नीलामी के जरिए निजी कंपनियों को खनन पट्टे दें',
        costBillion: 0,
        effects: {
          budgetImpact: +30, // Direct revenue windfall!
          gdpGrowth: +1.1,
          satisfaction: { business: +16, middle_class: +8, farmers: -4 },
          stability: +5
        },
        feedback: '₹30 Billion windfall license revenue flooded the treasury! Industrial production surged.',
        feedbackHindi: 'सरकारी खजाने में ₹30 बिलियन का बंपर राजस्व आया! औद्योगिक उत्पादन में भारी तेजी।'
      },
      {
        text: 'Impose Strict Eco-Sensitive Zoning & 10% Tribal Community Royalty',
        textHindi: 'कड़े पर्यावरण मानक और स्थानीय समुदाय के लिए 10% रॉयल्टी अनिवार्य करें',
        costBillion: 8,
        effects: {
          satisfaction: { farmers: +15, welfare_poor: +14, youth: +10, business: +4 },
          pollutionReduction: +12,
          stability: +8,
          budgetImpact: -8
        },
        feedback: 'Praised globally as the gold standard of sustainable and equitable mineral governance.',
        feedbackHindi: 'पर्यावरण-अनुकूल और समावेशी विकास मॉडल की दुनिया भर में सराहना हुई।'
      }
    ]
  },
  {
    id: 'youth_skilling_unemployment_march',
    title: 'Youth Unions Rally for Employment & Exam Reforms',
    titleHindi: 'रोजगार व पारदर्शी भर्ती परीक्षाओं के लिए युवाओं का विशाल मार्च',
    category: 'Social Movement',
    categoryHindi: 'जन आंदोलन',
    icon: '📢',
    severity: 'Medium',
    description: 'Over 200,000 university graduates gathered at the capital demanding rapid government hiring, zero paper leaks, and digital apprenticeship stipends.',
    descHindi: 'राजधानी में 2 लाख से अधिक स्नातकों ने त्वरित पारदर्शी भर्ती, पेपर लीक पर पूर्ण रोक और इंटर्नशिप भत्ते की मांग को लेकर शांतिपूर्ण मार्च निकाला।',
    options: [
      {
        text: 'Launch "Rashtra Yuva Shakti" 1 Million Paid Apprenticeships (₹18B)',
        textHindi: '10 लाख सवेतन इंटर्नशिप योजना शुरू करें (₹18B)',
        costBillion: 18,
        effects: {
          employment: +1.4,
          satisfaction: { youth: +24, middle_class: +12, welfare_poor: +8 },
          stability: +10,
          budgetImpact: -18
        },
        feedback: 'Massive youth enthusiasm! College campuses echoed with pro-government celebrations.',
        feedbackHindi: 'युवाओं में जबरदस्त उत्साह! विश्वविद्यालयों में सरकार के निर्णय का भव्य स्वागत हुआ।'
      },
      {
        text: 'Enact Strict Anti-Paper Leak Law with Fast-Track Recruitment (₹6B)',
        textHindi: 'कड़ा नकल-विरोधी कानून और 6 महीने में पारदर्शी भर्तियां',
        costBillion: 6,
        effects: {
          satisfaction: { youth: +16, middle_class: +10 },
          stability: +6,
          budgetImpact: -6
        },
        feedback: 'Restored institutional trust and ensured swift clean exams.',
        feedbackHindi: 'परीक्षा व्यवस्था में भरोसा बहाल हुआ और समयबद्ध नियुक्तियों का मार्ग प्रशस्त हुआ।'
      },
      {
        text: 'Call for Patience and Highlight Macro Private Sector Growth',
        textHindi: 'संयम बरतने की अपील करें और निजी क्षेत्र में अवसरों का हवाला दें',
        costBillion: 0,
        effects: {
          satisfaction: { youth: -15, middle_class: -8 },
          stability: -7
        },
        feedback: 'Student unions announced state-wide strikes. Opposition joined the demonstrations.',
        feedbackHindi: 'छात्र संघों ने आंदोलन तेज किया, विपक्ष ने भी सरकार की आलोचना की।'
      }
    ]
  },
  {
    id: 'foreign_free_trade_agreement',
    title: 'Historic Comprehensive Free Trade Deal on the Table',
    titleHindi: 'मित्र राष्ट्र के साथ ऐतिहासिक मुक्त व्यापार समझौता (FTA)',
    category: 'International Diplomacy',
    categoryHindi: 'विदेश नीति व व्यापार',
    icon: '🤝',
    severity: 'Positive',
    description: 'An influential Western-Asian trade bloc offers zero tariffs on our pharmaceuticals, textiles, and software exports, in exchange for lower duties on luxury cars and wine.',
    descHindi: 'एक प्रमुख अंतरराष्ट्रीय व्यापार समूह ने हमारे फार्मास्यूटिकल्स, वस्त्र और आईटी सॉफ्टवेयर निर्यात पर शून्य शुल्क का प्रस्ताव रखा है।',
    options: [
      {
        text: 'Sign Comprehensive FTA with Domestic Agriculture Safeguards',
        textHindi: 'कृषि क्षेत्र को बचाते हुए ऐतिहासिक व्यापार समझौते पर हस्ताक्षर करें',
        costBillion: 0,
        effects: {
          gdpGrowth: +1.0,
          satisfaction: { business: +18, youth: +12, middle_class: +10, farmers: +4 },
          stability: +7
        },
        feedback: 'National exports jumped by $40 Billion! Ports operated at record capacity.',
        feedbackHindi: 'देश का निर्यात $40 बिलियन बढ़ा! बंदरगाहों पर रिकॉर्ड व्यापार दर्ज हुआ।'
      },
      {
        text: 'Demand Complete Visa Freedom for Our IT Engineers before Signing',
        textHindi: 'हमारे IT प्रोफेशनल्स के लिए आसान वीजा की शर्त पर अड़ें',
        costBillion: 0,
        effects: {
          satisfaction: { youth: +15, middle_class: +12 },
          stability: +4
        },
        feedback: 'Tough bargaining earned our IT sector unprecedented multi-entry tech worker visas!',
        feedbackHindi: 'सख्त वार्ता से हमारे आईटी युवाओं के लिए बहुप्रतीक्षित मल्टी-एंट्री वीजा हासिल हुआ!'
      },
      {
        text: 'Reject FTA to Protect Local Small Manufacturers',
        textHindi: 'स्थानीय उद्योगों के संरक्षण के लिए समझौता अस्वीकार करें',
        costBillion: 0,
        effects: {
          satisfaction: { business: -6, youth: -8, farmers: +2 },
          stability: 0
        },
        feedback: 'Domestic artisans felt protected, but export federations expressed deep disappointment.',
        feedbackHindi: 'स्थानीय कारीगर सुरक्षित महसूस कर रहे हैं, लेकिन निर्यातक संघों ने निराशा जताई।'
      }
    ]
  }
];

window.GAME_EVENTS = GAME_EVENTS;
