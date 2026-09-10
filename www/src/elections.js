// 5-Year Democratic General Election Engine for RashtraNiti
class ElectionEngine {
  constructor() {
    this.campaignFocus = null;
    this.manifestoPromises = [];
    this.electionResults = null;
  }

  getManifestoOptions() {
    return [
      {
        id: 'jobs_startup',
        title: 'Youth Employment & Innovation Guarantee',
        titleHindi: '1 करोड़ युवा रोजगार व स्टार्टअप गारंटी',
        focus: 'youth',
        costBillion: 15,
        voterBoost: { youth: +12, middle_class: +6 }
      },
      {
        id: 'farmer_prosperity',
        title: 'Kisan Samman, Solar Tube-wells & MSP Floor',
        titleHindi: 'किसान समृद्धि, सौर पंप व न्यूनतम समर्थन मूल्य',
        focus: 'farmers',
        costBillion: 20,
        voterBoost: { farmers: +15, welfare_poor: +6 }
      },
      {
        id: 'middle_class_tax_cut',
        title: 'Middle Class Income Tax Exemption to ₹10 Lakhs',
        titleHindi: 'मध्यम वर्ग आयकर छूट सीमा ₹10 लाख तक',
        focus: 'middle_class',
        costBillion: 12,
        voterBoost: { middle_class: +16, business: +8 }
      },
      {
        id: 'modern_infra_expressway',
        title: '100 New Smart Cities & Bullet Train Expressways',
        titleHindi: '100 नए स्मार्ट शहर व हीरक बुलेट ट्रेन गलियारे',
        focus: 'business',
        costBillion: 25,
        voterBoost: { business: +14, youth: +8, middle_class: +8 }
      }
    ];
  }

  calculateSeats(state, manifestoBonus = 0) {
    const approval = state.nationalApproval;
    const growth = state.gdpGrowthRate;
    const inflation = state.inflationRate;
    const unemployment = state.unemploymentRate;
    const stability = state.govtStability;

    // Base vote share calculation
    let voteShare = approval * 0.65;
    if (growth >= 7.0) voteShare += (growth - 7.0) * 1.5;
    if (inflation <= 4.5) voteShare += (4.5 - inflation) * 1.8;
    else if (inflation > 7.0) voteShare -= (inflation - 7.0) * 2.5;

    if (unemployment <= 4.5) voteShare += 3.0;
    else if (unemployment > 7.5) voteShare -= (unemployment - 7.5) * 2.2;

    voteShare += manifestoBonus;
    // Add small regional variance
    const variance = (Math.random() - 0.5) * 4.0;
    voteShare = Math.max(22, Math.min(68, voteShare + variance));

    // Convert vote share to 543 Parliamentary Seats
    // Majority needed is 272
    let rulingSeats = 0;
    if (voteShare >= 52) {
      // Landslide victory
      rulingSeats = Math.round(280 + (voteShare - 52) * 8.5);
    } else if (voteShare >= 44) {
      // Clear majority
      rulingSeats = Math.round(260 + (voteShare - 44) * 6.5);
    } else if (voteShare >= 38) {
      // Coalition territory / hung parliament
      rulingSeats = Math.round(210 + (voteShare - 38) * 6.0);
    } else {
      // Defeat
      rulingSeats = Math.round(110 + (voteShare - 22) * 5.5);
    }

    rulingSeats = Math.max(90, Math.min(410, rulingSeats));

    const remainingSeats = 543 - rulingSeats;
    const mainOppSeats = Math.round(remainingSeats * 0.62);
    const reformOppSeats = Math.round(remainingSeats * 0.22);
    const indSeats = 543 - (rulingSeats + mainOppSeats + reformOppSeats);

    const isVictory = rulingSeats >= 272;
    const isCoalition = rulingSeats >= 240 && rulingSeats < 272;

    this.electionResults = {
      rulingSeats,
      mainOppSeats,
      reformOppSeats,
      indSeats,
      voteShare: Math.round(voteShare * 10) / 10,
      isVictory: isVictory || isCoalition,
      isClearMajority: isVictory,
      isCoalitionFormation: isCoalition,
      isDefeat: rulingSeats < 240
    };

    return this.electionResults;
  }
}

window.electionEngine = new ElectionEngine();
