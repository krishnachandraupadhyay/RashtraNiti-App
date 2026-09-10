// Realistic Macroeconomic & Political Simulation Engine for RashtraNiti
class SimulationEngine {
  constructor() {
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      countryName: 'गणराज्य भारतवर्ष (Republic of Bharatvarsha)',
      pmName: 'प्रधानमंत्री (Prime Minister)',
      year: 1,
      term: 1,
      termYear: 1, // 1 to 5
      totalBudgetBillion: 500, // ₹500 Billion annual base revenue
      gdpTrillion: 3.8, // ₹3.8 Trillion (approx $3.8T)
      gdpGrowthRate: 6.8, // 6.8% annual growth
      inflationRate: 4.8, // 4.8% inflation
      unemploymentRate: 5.6, // 5.6%
      foreignReservesBillion: 640,
      debtToGdpRatio: 54.0, // 54%
      nationalApproval: 68, // 68% overall approval
      govtStability: 78, // 78% parliamentary stability
      corruptionIndex: 42, // Lower is cleaner (0-100)
      publicHealthIndex: 65,
      humanCapitalIndex: 62,
      nationalSecurityIndex: 82,

      // Sector budget shares in % (sum = 100% or within available limit)
      sectorAllocations: {
        education: 12,
        healthcare: 11,
        defence: 14,
        agriculture: 13,
        infrastructure: 15,
        employment: 11,
        technology: 9,
        environment: 7,
        social_welfare: 8
      },

      // Demographic satisfactions (0-100)
      demographicSatisfaction: {
        farmers: 64,
        middle_class: 62,
        youth: 60,
        business: 65,
        welfare_poor: 62
      },

      // Active passed policies
      enactedPolicies: [],

      // Historic annual snapshots for charts
      history: [
        {
          year: 0,
          gdp: 3.8,
          growth: 6.8,
          inflation: 4.8,
          unemployment: 5.6,
          approval: 68,
          stability: 78,
          deficit: 0
        }
      ],

      // Last year's headline and review
      lastYearReport: {
        summary: 'Your administration assumed office with a decisive mandate for development and economic reform.',
        headline: 'NEW GOVERNMENT TAKES CHARGE WITH VISION OF PROSPERITY',
        keyAchievements: ['Parliament convened successfully', 'Initial Five-Year Plan announced']
      }
    };
  }

  calculateBudgetTotals(sectorAllocations, totalBudget) {
    let totalAllocatedPercent = 0;
    for (let key in sectorAllocations) {
      totalAllocatedPercent += Number(sectorAllocations[key] || 0);
    }

    const allocatedAmountBillion = (totalBudget * totalAllocatedPercent) / 100;
    const remainingAmountBillion = totalBudget - allocatedAmountBillion;
    const deficitOrSurplus = totalBudget - allocatedAmountBillion; // Positive = Surplus, Negative = Deficit

    return {
      totalAllocatedPercent: Math.round(totalAllocatedPercent * 10) / 10,
      allocatedAmountBillion: Math.round(allocatedAmountBillion * 10) / 10,
      remainingAmountBillion: Math.round(remainingAmountBillion * 10) / 10,
      deficitOrSurplus: Math.round(deficitOrSurplus * 10) / 10,
      isDeficit: deficitOrSurplus < 0,
      isSurplus: deficitOrSurplus > 0
    };
  }

  // Previews the real-time projected impact of adjusting sliders
  projectBudgetImpact(allocations) {
    let growthDelta = 0;
    let inflationDelta = 0;
    let youthHappyDelta = 0;
    let farmerHappyDelta = 0;
    let businessHappyDelta = 0;

    // Infrastructure & Tech boost growth
    if (allocations.infrastructure > 15) growthDelta += (allocations.infrastructure - 15) * 0.12;
    if (allocations.technology > 9) growthDelta += (allocations.technology - 9) * 0.14;
    if (allocations.education > 12) growthDelta += (allocations.education - 12) * 0.08;

    // Agriculture stabilizes inflation
    if (allocations.agriculture > 13) inflationDelta -= (allocations.agriculture - 13) * 0.08;
    if (allocations.agriculture < 10) inflationDelta += (10 - allocations.agriculture) * 0.12;

    // Total deficit spending creates demand-pull inflation
    let totalPct = Object.values(allocations).reduce((a, b) => a + Number(b), 0);
    if (totalPct > 100) {
      inflationDelta += (totalPct - 100) * 0.15;
    }

    // Demographic impacts
    farmerHappyDelta = (allocations.agriculture - 13) * 1.5 + (allocations.healthcare - 11) * 0.5;
    youthHappyDelta = (allocations.employment - 11) * 2.0 + (allocations.technology - 9) * 1.2 + (allocations.education - 12) * 1.0;
    businessHappyDelta = (allocations.infrastructure - 15) * 1.5 + (allocations.technology - 9) * 1.0;

    return {
      projectedGrowth: Math.max(1.5, Math.min(12.5, this.state.gdpGrowthRate + growthDelta)),
      projectedInflation: Math.max(1.5, Math.min(14.0, this.state.inflationRate + inflationDelta)),
      farmerHappyDelta: Math.round(farmerHappyDelta),
      youthHappyDelta: Math.round(youthHappyDelta),
      businessHappyDelta: Math.round(businessHappyDelta)
    };
  }

  // Execute full annual fiscal simulation step
  simulateYear(allocations, eventChoiceEffects = null) {
    const s = this.state;
    const totals = this.calculateBudgetTotals(allocations, s.totalBudgetBillion);

    // Stochastic randomness factor (-0.4% to +0.4%)
    const randomEconJitter = (Math.random() - 0.5) * 0.8;

    // 1. GDP Growth Calculation
    // Base potential = 5.0%
    let growth = 5.0;
    growth += (allocations.infrastructure - 10) * 0.18;
    growth += (allocations.technology - 8) * 0.16;
    growth += (allocations.education - 10) * 0.12;
    growth += (allocations.employment - 9) * 0.10;
    growth += (allocations.agriculture - 10) * 0.06;

    // Policy bonuses
    s.enactedPolicies.forEach(pId => {
      const pol = (window.GAME_POLICIES || []).find(p => p.id === pId);
      if (pol && pol.effects && pol.effects.gdpGrowth) {
        growth += pol.effects.gdpGrowth;
      }
    });

    if (eventChoiceEffects && eventChoiceEffects.gdpGrowth) {
      growth += eventChoiceEffects.gdpGrowth;
    }

    growth += randomEconJitter;
    growth = Math.max(1.0, Math.min(12.5, Math.round(growth * 10) / 10));

    // 2. Inflation Dynamics
    let inflation = 3.5;
    // Food price stability based on agriculture
    if (allocations.agriculture < 11) inflation += (11 - allocations.agriculture) * 0.25;
    else inflation -= (allocations.agriculture - 11) * 0.15;

    // Deficit spending push
    if (totals.totalAllocatedPercent > 100) {
      const deficitRatio = (totals.totalAllocatedPercent - 100);
      inflation += deficitRatio * 0.22;
      s.debtToGdpRatio += deficitRatio * 0.4;
    } else {
      s.debtToGdpRatio = Math.max(35, s.debtToGdpRatio - 0.6);
    }

    if (eventChoiceEffects && eventChoiceEffects.inflation) {
      inflation += eventChoiceEffects.inflation;
    }

    inflation += (Math.random() - 0.5) * 0.6;
    inflation = Math.max(1.2, Math.min(15.0, Math.round(inflation * 10) / 10));

    // 3. Unemployment Dynamics
    let unemployment = s.unemploymentRate;
    let jobCreationPower = (allocations.employment - 10) * 0.18 + (allocations.infrastructure - 12) * 0.12 + (allocations.technology - 8) * 0.08;
    
    if (growth > 6.5) jobCreationPower += (growth - 6.5) * 0.2;
    if (inflation > 7.5) jobCreationPower -= (inflation - 7.5) * 0.15;

    if (eventChoiceEffects && eventChoiceEffects.employment) {
      jobCreationPower += eventChoiceEffects.employment;
    }

    unemployment = Math.max(2.8, Math.min(14.0, Math.round((unemployment - jobCreationPower) * 10) / 10));

    // 4. Update GDP & Total Budget for Next Year
    const newGdpTrillion = Math.round(s.gdpTrillion * (1 + growth / 100) * 100) / 100;
    // Tax revenue grows roughly with nominal GDP (Real growth + portion of inflation)
    const revenueGrowthRate = (growth + inflation * 0.5) / 100;
    const newTotalBudget = Math.round(s.totalBudgetBillion * (1 + revenueGrowthRate));

    // 5. Demographic Approvals
    let newSat = { ...s.demographicSatisfaction };

    // Farmers
    newSat.farmers += (allocations.agriculture - 12) * 1.6 + (allocations.healthcare - 10) * 0.6;
    if (inflation > 6.0) newSat.farmers -= (inflation - 6.0) * 1.5;

    // Middle Class
    newSat.middle_class += (allocations.infrastructure - 13) * 1.2 + (allocations.education - 11) * 1.0;
    if (inflation > 5.0) newSat.middle_class -= (inflation - 5.0) * 2.8;

    // Youth
    newSat.youth += (allocations.employment - 11) * 2.2 + (allocations.technology - 9) * 1.4 + (allocations.education - 11) * 1.2;
    if (unemployment > 6.0) newSat.youth -= (unemployment - 6.0) * 2.5;

    // Business
    newSat.business += (allocations.infrastructure - 14) * 1.6 + (allocations.technology - 8) * 1.2;
    if (growth > 7.0) newSat.business += (growth - 7.0) * 2.0;
    if (totals.totalAllocatedPercent > 108) newSat.business -= 3; // fiscal indiscipline penalty

    // Welfare Poor
    newSat.welfare_poor += (allocations.social_welfare - 8) * 2.5 + (allocations.healthcare - 10) * 1.5;
    if (inflation > 6.0) newSat.welfare_poor -= (inflation - 6.0) * 2.5;

    // Apply event effects if any
    if (eventChoiceEffects && eventChoiceEffects.satisfaction) {
      for (let demoKey in eventChoiceEffects.satisfaction) {
        if (newSat[demoKey] !== undefined) {
          newSat[demoKey] += eventChoiceEffects.satisfaction[demoKey];
        }
      }
    }

    // Clamp demographic approvals between 15% and 98%
    for (let key in newSat) {
      newSat[key] = Math.max(15, Math.min(98, Math.round(newSat[key])));
    }

    // 6. Overall Weighted Approval Rating
    let overallApproval = 0;
    const weights = { farmers: 0.32, middle_class: 0.28, youth: 0.22, business: 0.10, welfare_poor: 0.08 };
    for (let key in weights) {
      overallApproval += (newSat[key] || 50) * weights[key];
    }
    overallApproval = Math.round(overallApproval);

    // 7. Government Stability
    let stabilityDelta = (overallApproval - 60) * 0.4;
    if (totals.totalAllocatedPercent > 115) stabilityDelta -= 5;
    let newStability = Math.max(20, Math.min(99, Math.round(s.govtStability + stabilityDelta)));

    // Generate Newspaper Headline for Year in Review
    let headline = 'NATION CHARTS STEADY PATH OF ECONOMIC CONSOLIDATION';
    if (growth >= 8.0) headline = 'RECORD GDP EXPANSION PROPELS NATION TO GLOBAL PROMINENCE';
    else if (growth <= 3.5) headline = 'ECONOMIC HEADWINDS CLOUD GROWTH PROJECTIONS';
    else if (inflation >= 8.5) headline = 'PRICES SURGE SHARPLY AS CONSUMERS FEEL PINCH';
    else if (overallApproval >= 78) headline = 'PUBLIC CONFIDENCE IN PRIME MINISTER SOARS TO RECORD PEAK';

    // Commit new state values
    s.gdpTrillion = newGdpTrillion;
    s.gdpGrowthRate = growth;
    s.inflationRate = inflation;
    s.unemploymentRate = unemployment;
    s.totalBudgetBillion = newTotalBudget;
    s.sectorAllocations = { ...allocations };
    s.demographicSatisfaction = newSat;
    s.nationalApproval = overallApproval;
    s.govtStability = newStability;

    const summaryReport = {
      year: s.year,
      term: s.term,
      termYear: s.termYear,
      headline: headline,
      growth: growth,
      inflation: inflation,
      unemployment: unemployment,
      gdp: newGdpTrillion,
      approval: overallApproval,
      stability: newStability,
      deficit: totals.deficitOrSurplus
    };

    s.lastYearReport = summaryReport;
    s.history.push({
      year: s.year,
      gdp: newGdpTrillion,
      growth: growth,
      inflation: inflation,
      unemployment: unemployment,
      approval: overallApproval,
      stability: newStability,
      deficit: totals.deficitOrSurplus
    });

    return summaryReport;
  }
}

window.simulationEngine = new SimulationEngine();
