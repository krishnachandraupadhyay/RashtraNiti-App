// Internationalization (i18n) Engine for RashtraNiti
class I18nEngine {
  constructor() {
    this.currentLang = localStorage.getItem('rashtraniti_lang') || 'hi'; // default Hindi
    this.translations = {
      hi: {
        // App & Meta
        appName: 'Shaumya Gamers',
        appTagline: 'राष्ट्रनीति - लोकतंत्र, सरकार और बजट प्रबंधन गेम',
        republicTag: 'गणतांत्रिक नीति सिमुलेशन',
        countryDefault: 'गणराज्य भारतवर्ष',
        pmDefault: 'माननीय प्रधानमंत्री',

        // Navigation
        navDashboard: 'डैशबोर्ड',
        navBudget: 'बजट',
        navPolicies: 'नीतियां',
        navParliament: 'संसद',
        navProfile: 'प्रोफाइल',

        // Home Screen
        countryNameLabel: 'देश का नाम:',
        pmNameLabel: 'प्रधानमंत्री / आपका नाम:',
        newGame: 'नया खेल शुरू करें',
        continueGame: 'सहेजा गया खेल जारी रखें',
        customizeAvatar: 'अवतार बदलें / फोटो अपलोड करें',
        settings: 'सेटिंग्स व APK गाइड',
        selectLangModalTitle: 'भाषा चुनें / Select Language',
        langHindi: 'हिंदी (Hindi)',
        langEnglish: 'English (अंग्रेज़ी)',

        // Dashboard
        gdp: 'जीडीपी (GDP)',
        growth: 'विकास दर (Growth)',
        inflation: 'महंगाई दर (Inflation)',
        unemployment: 'बेरोजगारी (Unemp.)',
        publicApproval: 'जनता का विश्वास',
        govtStability: 'संसदीय स्थिरता',
        annualBudget: 'वार्षिक बजट',
        gdpTrend: 'जीडीपी विकास दर रुझान',
        gdpTrendWait: 'आगामी वर्षों के बाद आर्थिक रुझान चार्ट यहाँ दिखेगा',
        demographicsTitle: 'जनसांख्यिकीय संतुष्टि',
        prepareBudgetBtn: 'बजट तैयार करें और वर्ष आगे बढ़ाएं',
        yearPill: (y, t, ty) => `वर्ष ${y} • T${t}`,

        // Budget Screen
        budgetTitle: 'मंत्रालयों का बजट आवंटन',
        budgetDesc: 'मंत्रालयों का बजट समायोजित करें। अत्यधिक घाटा महंगाई को बढ़ा सकता है।',
        totalRevenueBudget: 'कुल राजस्व बजट:',
        allocatedBudget: 'आवंटित बजट:',
        remainingDeficit: 'शेष / राजकोषीय घाटा:',
        projectedImpact: 'अनुमानित विकास/महंगाई:',
        autoBalance: 'स्वतः 100% पर संतुलित करें',
        confirmBudget: 'बजट की पुष्टि करें',
        surplusText: 'बचत (Surplus)',
        deficitText: 'घाटा (Deficit)',
        balancedText: 'संतुलित (Balanced)',

        // Policies Screen
        policiesTitle: 'ऐतिहासिक सुधार एवं नीति विधेयक',
        policiesDesc: 'संसद में नए विधेयक पेश करें। आपकी संसदीय स्थिरता और जनसमर्थन से बिल पास होने की संभावना तय होती है।',
        initialCost: 'आरंभिक लागत',
        passBillBtn: 'संसद में पेश करें (Pass Bill)',
        enactedBadge: '✓ संसद से पारित (Enacted)',

        // Parliament Screen
        parliamentTitle: 'संसद (Lok Sabha Chamber)',
        majorityNeededText: (needed, total) => `बहुमत का आंकड़ा: ${needed} / ${total} सीटें`,
        partyStrengthsTitle: 'राजनीतिक दलों की स्थिति',
        ideologyLabel: 'विचारधारा:',
        seatsLabel: 'सीटें',

        // Profile Screen
        macroHealthTitle: 'व्यापक आर्थिक स्वास्थ्य',
        foreignReserves: 'विदेशी मुद्रा भंडार',
        debtToGdp: 'ऋण-जीडीपी अनुपात',
        transparencyIndex: 'पारदर्शिता सूचकांक',
        securityRating: 'राष्ट्रीय सुरक्षा रेटिंग',
        customizeAvatarBtn: 'प्रधानमंत्री अवतार अनुकूलित करें',

        // Avatar Customizer
        avatarTitle: 'प्रधानमंत्री का स्वरूप (PM Avatar)',
        uploadPhotoTitle: 'अपनी फोटो अपलोड करें (Upload Custom Photo)',
        uploadPhotoDesc: 'आपकी फोटो केवल आपके डिवाइस पर इन-गेम अवतार के लिए सुरक्षित रहेगी।',
        choosePhotoBtn: '📁 फोटो चुनें',
        removePhotoBtn: '🗑️ हटाएं',
        skinToneTitle: 'त्वचा का रंग',
        hairstyleTitle: 'हेयरस्टाइल',
        hairColorTitle: 'बालों का रंग',
        facialHairTitle: 'दाढ़ी / मूंछ',
        attireTitle: 'परिधान',
        glassesTitle: 'चश्मा',
        saveAvatarBtn: '✓ अवतार सहेजें (Save & Return)',

        // Modals
        decisionPrompt: 'प्रधानमंत्री जी, आपका निर्णय क्या होगा?',
        costLabel: 'लागत:',
        freeCost: 'शून्य (₹0)',
        nextYearBtn: 'अगले वर्ष के लिए आगे बढ़ें',
        electionTitle: '५-वर्षीय कार्यकाल पूर्ण: देश में आम चुनाव की घोषणा!',
        manifestoPrompt: 'चुनाव में जाने से पहले अपनी पार्टी का मुख्य चुनावी घोषणापत्र चुनें:',
        liveCounting: '🔴 मतगणना जारी है (Live Counting...)',
        rulingParty: 'सत्तारूढ़ पार्टी (Ruling)',
        oppAlliance: 'विपक्षी गठबंधन (Opposition)',
        majorityThreshold: 'बहुमत का आंकड़ा: 272 सीटें',
        electionVictoryTitle: '🎉 ऐतिहासिक जनादेश! प्रचंड बहुमत के साथ सरकार की वापसी',
        electionDefeatTitle: '💔 चुनाव परिणाम: विपक्ष को जनादेश',
        beginNextTermBtn: 'अगला कार्यकाल शुरू करें',
        startNewGameBtn: 'नया खेल शुरू करें',

        // Settings
        settingsTitle: 'गेम सेटिंग्स एवं APK गाइड',
        soundHapticsTitle: 'ध्वनि व हैप्टिक्स (Sound & Vibrate)',
        soundBtn: '🔊 ध्वनि ऑन/ऑफ',
        vibrateBtn: '📳 कंपन ऑन/ऑफ',
        apkGuideTitle: 'Android APK कैसे बनाएँ?',
        apkGuideDesc: 'यह ऐप Capacitor और GitHub Actions के जरिए क्लाउड पर स्वचालित रूप से APK जनरेट करता है।',
        dataMgmtTitle: 'डेटा प्रबंधन (Data Management)',
        resetDataBtn: '🗑️ गेम डेटा रीसेट करें (Reset All Data)',
        closeBtn: 'बंद करें (Close)',
        langSwitchBtn: '🌐 भाषा बदलें (Change Language)'
      },

      en: {
        // App & Meta
        appName: 'Shaumya Gamers',
        appTagline: 'RashtraNiti - Democracy & Governance Simulation Game',
        republicTag: 'Democratic Policy Simulator',
        countryDefault: 'Republic of Bharatvarsha',
        pmDefault: 'Honorable Prime Minister',

        // Navigation
        navDashboard: 'Dashboard',
        navBudget: 'Budget',
        navPolicies: 'Policies',
        navParliament: 'Parliament',
        navProfile: 'Profile',

        // Home Screen
        countryNameLabel: 'Country Name:',
        pmNameLabel: 'Prime Minister / Your Name:',
        newGame: 'Start New Game',
        continueGame: 'Continue Saved Game',
        customizeAvatar: 'Customize Avatar / Upload Photo',
        settings: 'Settings & APK Guide',
        selectLangModalTitle: 'Select Preferred Language',
        langHindi: 'हिंदी (Hindi)',
        langEnglish: 'English (English)',

        // Dashboard
        gdp: 'GDP',
        growth: 'Growth Rate',
        inflation: 'Inflation Rate',
        unemployment: 'Unemployment',
        publicApproval: 'Public Approval',
        govtStability: 'Govt Stability',
        annualBudget: 'Annual Budget',
        gdpTrend: 'Annual GDP Growth Trend',
        gdpTrendWait: 'Historical growth chart will appear after subsequent fiscal years',
        demographicsTitle: 'Demographic Approval Breakdown',
        prepareBudgetBtn: 'Prepare Budget & Advance Year',
        yearPill: (y, t, ty) => `Yr ${y} • T${t}`,

        // Budget Screen
        budgetTitle: 'Ministerial Sector Budget Allocations',
        budgetDesc: 'Allocate funds across ministerial sectors. Excessive deficit can drive inflation & national debt.',
        totalRevenueBudget: 'Total Revenue Budget:',
        allocatedBudget: 'Allocated Budget:',
        remainingDeficit: 'Balance / Fiscal Deficit:',
        projectedImpact: 'Forecasted Growth / Inflation:',
        autoBalance: 'Auto-Balance to 100%',
        confirmBudget: 'Confirm Budget & Advance',
        surplusText: 'Surplus',
        deficitText: 'Deficit',
        balancedText: 'Balanced',

        // Policies Screen
        policiesTitle: 'Landmark Reforms & Policy Acts',
        policiesDesc: 'Table legislative bills in Parliament. Approval probability depends on your stability and coalition consensus.',
        initialCost: 'Initial Cost',
        passBillBtn: 'Table Bill in Parliament',
        enactedBadge: '✓ Enacted by Parliament',

        // Parliament Screen
        parliamentTitle: 'Parliament (Lok Sabha Chamber)',
        majorityNeededText: (needed, total) => `Majority Threshold: ${needed} / ${total} Seats`,
        partyStrengthsTitle: 'Political Party Strengths',
        ideologyLabel: 'Ideology:',
        seatsLabel: 'Seats',

        // Profile Screen
        macroHealthTitle: 'Macroeconomic Health',
        foreignReserves: 'Foreign Reserves',
        debtToGdp: 'Debt-to-GDP Ratio',
        transparencyIndex: 'Transparency Index',
        securityRating: 'National Security Rating',
        customizeAvatarBtn: 'Customize Prime Minister Avatar',

        // Avatar Customizer
        avatarTitle: 'Prime Minister Appearance (PM Avatar)',
        uploadPhotoTitle: 'Upload Custom Photo',
        uploadPhotoDesc: 'Your photo remains strictly local on your device for in-game avatar display.',
        choosePhotoBtn: '📁 Choose Photo',
        removePhotoBtn: '🗑️ Remove',
        skinToneTitle: 'Skin Tone',
        hairstyleTitle: 'Hairstyle',
        hairColorTitle: 'Hair Color',
        facialHairTitle: 'Facial Hair',
        attireTitle: 'Attire & Outfit',
        glassesTitle: 'Glasses',
        saveAvatarBtn: '✓ Save & Return',

        // Modals
        decisionPrompt: 'Prime Minister, what is your executive decision?',
        costLabel: 'Cost:',
        freeCost: 'Free ($0)',
        nextYearBtn: 'Proceed to Next Fiscal Year',
        electionTitle: '5-Year Term Complete: National General Elections Announced!',
        manifestoPrompt: 'Formulate your party’s core election manifesto pledge before heading to polls:',
        liveCounting: '🔴 Live Vote Counting in Progress...',
        rulingParty: 'Ruling Party / Coalition',
        oppAlliance: 'Opposition Alliance',
        majorityThreshold: 'Majority Benchmark: 272 Seats',
        electionVictoryTitle: '🎉 Decisive Mandate! Government Re-elected with Full Majority',
        electionDefeatTitle: '💔 Election Outcome: Opposition Coalition Secures Majority',
        beginNextTermBtn: 'Begin Next Term',
        startNewGameBtn: 'Start New Game',

        // Settings
        settingsTitle: 'Game Settings & APK Guide',
        soundHapticsTitle: 'Sound & Haptics Feedback',
        soundBtn: '🔊 Sound ON/OFF',
        vibrateBtn: '📳 Haptics ON/OFF',
        apkGuideTitle: 'How to Build Android APK?',
        apkGuideDesc: 'This project is pre-configured with Capacitor and GitHub Actions to compile native APKs automatically in the cloud.',
        dataMgmtTitle: 'Data Management',
        resetDataBtn: '🗑️ Reset All Game Data',
        closeBtn: 'Close',
        langSwitchBtn: '🌐 Change Language'
      }
    };
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (lang === 'hi' || lang === 'en') {
      this.currentLang = lang;
      localStorage.setItem('rashtraniti_lang', lang);
      document.documentElement.lang = lang;
    }
  }

  t(key, ...args) {
    const dict = this.translations[this.currentLang] || this.translations['hi'];
    const val = dict[key] || this.translations['en'][key] || key;
    if (typeof val === 'function') {
      return val(...args);
    }
    return val;
  }
}

window.i18n = new I18nEngine();
