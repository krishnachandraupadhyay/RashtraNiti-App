// Main Game Controller & UI Orchestrator for RashtraNiti
class RashtraNitiApp {
  constructor() {
    this.currentScreen = 'screen-home';
    this.sim = window.simulationEngine;
    this.avatar = window.avatarSystem;
    this.sound = window.soundEngine;
    this.elections = window.electionEngine;
    this.i18n = window.i18n;
    this.pendingEvent = null;
    this.selectedEventOption = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.checkSavedGame();
    this.updateStaticTranslations();
    this.renderAvatarPreview();
    this.checkFirstTimeLanguage();
  }

  checkFirstTimeLanguage() {
    try {
      const selected = localStorage.getItem('rashtraniti_lang_selected');
      if (!selected) {
        const langModal = document.getElementById('modal-language');
        if (langModal) langModal.classList.add('open');
      }
    } catch (e) {}
  }

  setLanguage(lang) {
    this.sound.playClick();
    this.i18n.setLang(lang);
    localStorage.setItem('rashtraniti_lang_selected', 'true');
    const langModal = document.getElementById('modal-language');
    if (langModal) langModal.classList.remove('open');
    this.updateStaticTranslations();
    this.renderAll();
    this.showToast(lang === 'hi' ? '🇮🇳 भाषा: हिंदी' : '🇬🇧 Language: English');
  }

  toggleLanguage() {
    const current = this.i18n.getLang();
    const next = current === 'hi' ? 'en' : 'hi';
    this.setLanguage(next);
  }

  updateStaticTranslations() {
    const lang = this.i18n.getLang();

    // Toggle labels
    const homeLabel = document.getElementById('home-lang-label');
    if (homeLabel) homeLabel.textContent = lang === 'hi' ? 'English' : 'हिंदी';

    const headerLabel = document.getElementById('header-lang-label');
    if (headerLabel) headerLabel.textContent = lang === 'hi' ? 'ENG' : 'हिंदी';

    // Translate all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = this.i18n.t(key);
      }
    });

    // Translate bottom nav
    const navItems = {
      'screen-dashboard': 'navDashboard',
      'screen-budget': 'navBudget',
      'screen-policies': 'navPolicies',
      'screen-parliament': 'navParliament',
      'screen-country': 'navProfile'
    };

    for (let target in navItems) {
      const item = document.querySelector(`.nav-item[data-target="${target}"] .nav-label`);
      if (item) {
        item.textContent = this.i18n.t(navItems[target]);
      }
    }
  }

  checkSavedGame() {
    try {
      const saved = localStorage.getItem('rashtraniti_gamestate');
      const continueBtn = document.getElementById('btn-continue-game');
      if (saved && continueBtn) {
        continueBtn.style.display = 'block';
      } else if (continueBtn) {
        continueBtn.style.display = 'none';
      }
    } catch (e) {}
  }

  saveGame() {
    try {
      const payload = {
        state: this.sim.state,
        avatar: this.avatar.config
      };
      localStorage.setItem('rashtraniti_gamestate', JSON.stringify(payload));
      this.showToast('💾 खेल की प्रगति स्वतः सहेज ली गई है (Game Saved)');
    } catch (e) {
      console.warn('Save failed', e);
    }
  }

  loadGame() {
    try {
      const saved = localStorage.getItem('rashtraniti_gamestate');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.state) this.sim.state = parsed.state;
        if (parsed.avatar) {
          this.avatar.config = parsed.avatar;
          this.avatar.save();
        }
        this.sound.playSuccess();
        this.switchScreen('screen-dashboard');
        this.renderAll();
        this.showToast('सहेजा गया खेल लोड हो गया (Game Loaded)');
        return true;
      }
    } catch (e) {
      console.warn('Load failed', e);
    }
    return false;
  }

  startNewGame() {
    this.sound.playSuccess();
    this.sim.state = this.sim.getInitialState();
    
    // Check if player entered custom country name or PM name
    const countryInput = document.getElementById('input-country-name');
    const pmInput = document.getElementById('input-pm-name');
    if (countryInput && countryInput.value.trim()) {
      this.sim.state.countryName = countryInput.value.trim();
    }
    if (pmInput && pmInput.value.trim()) {
      this.sim.state.pmName = pmInput.value.trim();
    }

    this.saveGame();
    this.switchScreen('screen-dashboard');
    this.renderAll();
    this.showToast('✨ नया कार्यकाल शुरू! राष्ट्र की सेवा में आपका स्वागत है।');
  }

  switchScreen(screenId) {
    this.sound.playClick();
    this.currentScreen = screenId;

    // Hide all screens
    document.querySelectorAll('.app-screen').forEach((el) => {
      el.classList.remove('active');
    });

    // Show target screen
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
    }

    // Update bottom nav bar visibility & active state
    const bottomNav = document.getElementById('app-bottom-nav');
    if (screenId === 'screen-home' || screenId === 'screen-avatar') {
      if (bottomNav) bottomNav.style.display = 'none';
    } else {
      if (bottomNav) bottomNav.style.display = 'flex';
      document.querySelectorAll('.nav-item').forEach((item) => {
        if (item.getAttribute('data-target') === screenId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Screen specific renders
    if (screenId === 'screen-dashboard') this.renderDashboard();
    if (screenId === 'screen-budget') this.renderBudgetScreen();
    if (screenId === 'screen-policies') this.renderPoliciesScreen();
    if (screenId === 'screen-parliament') this.renderParliamentScreen();
    if (screenId === 'screen-country') this.renderCountryProfile();
    if (screenId === 'screen-avatar') this.renderAvatarCustomizer();
  }

  renderAll() {
    this.renderAvatarPreview();
    this.renderDashboard();
    this.renderBudgetScreen();
    this.renderPoliciesScreen();
    this.renderParliamentScreen();
    this.renderCountryProfile();
  }

  renderAvatarPreview() {
    const headerAvatar = document.querySelector('.header-avatar-mini');
    if (headerAvatar) {
      headerAvatar.innerHTML = this.avatar.renderSVG(48);
    }

    const homeAvatar = document.getElementById('home-avatar-preview');
    if (homeAvatar) {
      homeAvatar.innerHTML = this.avatar.renderSVG(130);
    }

    const profileAvatar = document.querySelector('#screen-country .pm-avatar-container');
    if (profileAvatar) {
      profileAvatar.innerHTML = this.avatar.renderSVG(90);
    }
  }

  renderDashboard() {
    const s = this.sim.state;
    const lang = this.i18n.getLang();

    // Header info
    document.querySelectorAll('.val-country-name').forEach((el) => (el.textContent = s.countryName));
    document.querySelectorAll('.val-pm-name').forEach((el) => (el.textContent = s.pmName));
    document.querySelectorAll('.val-year').forEach((el) => (el.textContent = this.i18n.t('yearPill', s.year, s.term, s.termYear)));
    document.querySelectorAll('.val-budget').forEach((el) => (el.textContent = `₹${s.totalBudgetBillion}B`));

    // KPI Cards
    const gdpEl = document.getElementById('dash-gdp');
    if (gdpEl) gdpEl.textContent = `₹${s.gdpTrillion}T`;

    const growthEl = document.getElementById('dash-growth');
    if (growthEl) {
      growthEl.textContent = `+${s.gdpGrowthRate}%`;
      growthEl.className = s.gdpGrowthRate >= 6.0 ? 'stat-value text-success' : 'stat-value text-warning';
    }

    const inflationEl = document.getElementById('dash-inflation');
    if (inflationEl) {
      inflationEl.textContent = `${s.inflationRate}%`;
      inflationEl.className = s.inflationRate <= 5.5 ? 'stat-value text-success' : 'stat-value text-danger';
    }

    const unempEl = document.getElementById('dash-unemployment');
    if (unempEl) {
      unempEl.textContent = `${s.unemploymentRate}%`;
      unempEl.className = s.unemploymentRate <= 5.0 ? 'stat-value text-success' : 'stat-value text-warning';
    }

    const approvalEl = document.getElementById('dash-approval');
    if (approvalEl) {
      approvalEl.textContent = `${s.nationalApproval}%`;
      approvalEl.className = s.nationalApproval >= 60 ? 'stat-value text-gold' : 'stat-value text-danger';
    }

    const stabilityEl = document.getElementById('dash-stability');
    if (stabilityEl) {
      stabilityEl.textContent = `${s.govtStability}%`;
      stabilityEl.className = s.govtStability >= 60 ? 'stat-value text-info' : 'stat-value text-danger';
    }

    // Approval Progress Gauge
    const approvalBar = document.getElementById('dash-approval-bar');
    if (approvalBar) {
      approvalBar.style.width = `${s.nationalApproval}%`;
    }

    // Demographic breakdown bars
    const demoContainer = document.getElementById('dash-demographics-list');
    if (demoContainer) {
      demoContainer.innerHTML = (window.GAME_FACTIONS?.demographics || [])
        .map((d) => {
          const sat = s.demographicSatisfaction[d.id] || 50;
          let colorClass = sat >= 60 ? 'bar-green' : sat >= 45 ? 'bar-amber' : 'bar-red';
          const title = lang === 'hi' ? d.nameHindi : d.name;
          return `
            <div class="demo-card">
              <div class="demo-header">
                <span class="demo-title">${d.icon} ${title}</span>
                <span class="demo-val ${sat >= 60 ? 'text-success' : 'text-danger'}">${sat}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill ${colorClass}" style="width: ${sat}%"></div>
              </div>
            </div>
          `;
        })
        .join('');
    }

    // Mini Sparkline SVG chart
    this.renderHistoryChart();

    // Breaking News Ticker
    const ticker = document.getElementById('dash-news-ticker');
    if (ticker && s.lastYearReport) {
      const gdpLbl = lang === 'hi' ? 'जीडीपी' : 'GDP';
      const infLbl = lang === 'hi' ? 'महंगाई' : 'Inflation';
      ticker.textContent = `📢 ${s.lastYearReport.headline} • ${gdpLbl} ₹${s.gdpTrillion}T • ${infLbl} ${s.inflationRate}%`;
    }
  }

  renderHistoryChart() {
    const chartContainer = document.getElementById('dash-history-chart');
    if (!chartContainer) return;

    const history = this.sim.state.history;
    if (history.length <= 1) {
      chartContainer.innerHTML = `<div class="text-muted text-center py-2" style="font-size: 0.8rem;">${this.i18n.t('gdpTrendWait')}</div>`;
      return;
    }

    const width = 320;
    const height = 90;
    const maxGrowth = Math.max(10, ...history.map((h) => h.growth));
    const minGrowth = Math.min(2, ...history.map((h) => h.growth));

    const points = history
      .map((h, i) => {
        const x = (i / (history.length - 1)) * (width - 40) + 20;
        const y = height - 20 - ((h.growth - minGrowth) / (maxGrowth - minGrowth || 1)) * (height - 35);
        return `${x},${y}`;
      })
      .join(' ');

    chartContainer.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="w-full" style="overflow: visible;">
        <defs>
          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <!-- Grid lines -->
        <line x1="20" y1="${height - 20}" x2="${width - 20}" y2="${height - 20}" stroke="#334155" stroke-width="1" />
        <polyline fill="none" stroke="#f59e0b" stroke-width="3" points="${points}" stroke-linecap="round" stroke-linejoin="round" />
        ${history
          .map((h, i) => {
            const x = (i / (history.length - 1)) * (width - 40) + 20;
            const y = height - 20 - ((h.growth - minGrowth) / (maxGrowth - minGrowth || 1)) * (height - 35);
            return `
              <circle cx="${x}" cy="${y}" r="4" fill="#f59e0b" stroke="#0f172a" stroke-width="2" />
              <text x="${x}" y="${height - 5}" font-size="9" fill="#94a3b8" text-anchor="middle">Y${h.year}</text>
              <text x="${x}" y="${y - 8}" font-size="9" font-weight="bold" fill="#f59e0b" text-anchor="middle">${h.growth}%</text>
            `;
          })
          .join('')}
      </svg>
    `;
  }

  renderBudgetScreen() {
    const s = this.sim.state;
    const lang = this.i18n.getLang();
    const sectors = window.GAME_FACTIONS?.sectors || [];
    const container = document.getElementById('budget-sectors-list');
    if (!container) return;

    // Calculate budget metrics
    const totals = this.sim.calculateBudgetTotals(s.sectorAllocations, s.totalBudgetBillion);
    const impact = this.sim.projectBudgetImpact(s.sectorAllocations);

    // Update Header Summary
    const totalEl = document.getElementById('budget-total-val');
    if (totalEl) totalEl.textContent = `₹${s.totalBudgetBillion}B`;

    const allocEl = document.getElementById('budget-allocated-val');
    if (allocEl) allocEl.textContent = `₹${totals.allocatedAmountBillion}B (${totals.totalAllocatedPercent}%)`;

    const remainingEl = document.getElementById('budget-remaining-val');
    if (remainingEl) {
      if (totals.isDeficit) {
        remainingEl.textContent = `-₹${Math.abs(totals.deficitOrSurplus)}B (${this.i18n.t('deficitText')})`;
        remainingEl.className = 'val text-danger font-bold';
      } else if (totals.isSurplus) {
        remainingEl.textContent = `+₹${totals.deficitOrSurplus}B (${this.i18n.t('surplusText')})`;
        remainingEl.className = 'val text-success font-bold';
      } else {
        remainingEl.textContent = `₹0B (${this.i18n.t('balancedText')})`;
        remainingEl.className = 'val text-success font-bold';
      }
    }

    // Update Projection Previews
    const projGrowth = document.getElementById('proj-growth');
    if (projGrowth) projGrowth.textContent = `${impact.projectedGrowth}%`;

    const projInf = document.getElementById('proj-inflation');
    if (projInf) projInf.textContent = `${impact.projectedInflation}%`;

    // Render Sector Sliders
    container.innerHTML = sectors
      .map((sec) => {
        const currentVal = s.sectorAllocations[sec.id] || sec.defaultPercent;
        const amountBillion = Math.round((s.totalBudgetBillion * currentVal) / 100);
        const name = lang === 'hi' ? sec.nameHindi : sec.name;
        const desc = lang === 'hi' ? (sec.descHindi || sec.desc) : sec.desc;

        return `
          <div class="sector-budget-card">
            <div class="sector-header">
              <div class="sector-info">
                <span class="sector-icon">${sec.icon}</span>
                <div>
                  <div class="sector-name">${name}</div>
                  <div class="sector-desc">${desc}</div>
                </div>
              </div>
              <div class="sector-val-box">
                <span class="sector-pct">${currentVal}%</span>
                <span class="sector-amount">₹${amountBillion}B</span>
              </div>
            </div>
            <div class="sector-slider-row">
              <button class="btn-step" onclick="window.gameApp.adjustSector('${sec.id}', -1)">−</button>
              <input type="range" class="budget-slider" min="${sec.minPercent}" max="${sec.maxPercent}" value="${currentVal}" 
                oninput="window.gameApp.onSliderChange('${sec.id}', this.value)" />
              <button class="btn-step" onclick="window.gameApp.adjustSector('${sec.id}', 1)">+</button>
            </div>
          </div>
        `;
      })
      .join('');
  }

  onSliderChange(sectorId, value) {
    this.sound.playSliderTick();
    this.sim.state.sectorAllocations[sectorId] = Number(value);
    this.renderBudgetScreen();
  }

  adjustSector(sectorId, delta) {
    const sec = (window.GAME_FACTIONS?.sectors || []).find((s) => s.id === sectorId);
    if (!sec) return;

    let current = this.sim.state.sectorAllocations[sectorId] || sec.defaultPercent;
    let nextVal = Math.max(sec.minPercent, Math.min(sec.maxPercent, current + delta));
    this.sim.state.sectorAllocations[sectorId] = nextVal;
    this.sound.playSliderTick();
    this.renderBudgetScreen();
  }

  autoBalanceBudget() {
    this.sound.playClick();
    const sectors = window.GAME_FACTIONS?.sectors || [];
    const equalShare = Math.floor(100 / sectors.length);
    let rem = 100 - equalShare * sectors.length;

    sectors.forEach((sec, idx) => {
      this.sim.state.sectorAllocations[sec.id] = equalShare + (idx < rem ? 1 : 0);
    });

    this.renderBudgetScreen();
    this.showToast(this.i18n.getLang() === 'hi' ? '⚖️ बजट को 100% पर संतुलित कर दिया गया' : '⚖️ Budget re-balanced to 100%');
  }

  confirmBudgetAndAdvance() {
    const totals = this.sim.calculateBudgetTotals(this.sim.state.sectorAllocations, this.sim.state.totalBudgetBillion);

    // If excessive deficit (>120%), warn player
    if (totals.totalAllocatedPercent > 125) {
      alert(this.i18n.getLang() === 'hi' 
        ? '⚠️ चेतावनी: बजट आवंटन 125% से अधिक है! इससे अत्यधिक महंगाई और ऋण संकट हो सकता है।' 
        : '⚠️ Warning: Budget allocation exceeds 125%! This will trigger severe inflation and debt crisis.');
      return;
    }

    this.sound.playBudgetConfirm();

    // Check if this year triggers a random event before review
    const availableEvents = window.GAME_EVENTS || [];
    const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];

    this.pendingEvent = randomEvent;
    this.openEventModal(randomEvent);
  }

  openEventModal(eventObj) {
    this.sound.playNewsAlert();
    const modal = document.getElementById('modal-event');
    if (!modal) return;
    const lang = this.i18n.getLang();

    document.getElementById('event-icon').textContent = eventObj.icon;
    document.getElementById('event-category').textContent = eventObj.category;
    document.getElementById('event-title').textContent = lang === 'hi' ? (eventObj.titleHindi || eventObj.title) : eventObj.title;
    document.getElementById('event-desc').textContent = eventObj.description;

    const optionsContainer = document.getElementById('event-options-container');
    if (optionsContainer) {
      optionsContainer.innerHTML = eventObj.options
        .map(
          (opt, idx) => `
          <button class="event-option-btn" onclick="window.gameApp.chooseEventOption(${idx})">
            <div class="opt-title">${lang === 'hi' ? (opt.textHindi || opt.text) : opt.text}</div>
            ${opt.costBillion > 0 ? `<div class="opt-cost">${this.i18n.t('costLabel')} ₹${opt.costBillion} Billion</div>` : `<div class="opt-cost free">${this.i18n.t('costLabel')} ${this.i18n.t('freeCost')}</div>`}
          </button>
        `
        )
        .join('');
    }

    modal.classList.add('open');
  }

  chooseEventOption(optionIndex) {
    this.sound.playClick();
    if (!this.pendingEvent) return;

    const chosenOption = this.pendingEvent.options[optionIndex];
    const modal = document.getElementById('modal-event');
    if (modal) modal.classList.remove('open');

    // Run annual simulation with the chosen event effects
    const report = this.sim.simulateYear(this.sim.state.sectorAllocations, chosenOption.effects);

    // Increment Year and Term Year
    this.sim.state.year += 1;
    this.sim.state.termYear += 1;

    this.saveGame();

    // Show Year In Review modal
    this.openYearInReviewModal(report, chosenOption.feedback);
  }

  openYearInReviewModal(report, eventFeedback) {
    const modal = document.getElementById('modal-review');
    if (!modal) return;
    const lang = this.i18n.getLang();

    document.getElementById('review-year-title').textContent = lang === 'hi' 
      ? `वर्ष ${report.year} का वार्षिक लेखा-जोखा (Annual Review)`
      : `Year ${report.year} Annual Debrief & Review`;
    document.getElementById('review-headline').textContent = report.headline;
    document.getElementById('review-event-feedback').textContent = lang === 'hi'
      ? `⚡ घटनाक्रम परिणाम: ${eventFeedback || 'वर्ष सामान्य रूप से संपन्न हुआ।'}`
      : `⚡ Event Consequence: ${eventFeedback || 'Fiscal year concluded steadily.'}`;

    document.getElementById('rev-gdp').textContent = `₹${report.gdp}T`;
    document.getElementById('rev-growth').textContent = `+${report.growth}%`;
    document.getElementById('rev-inflation').textContent = `${report.inflation}%`;
    document.getElementById('rev-approval').textContent = `${report.approval}%`;

    modal.classList.add('open');
  }

  closeYearInReview() {
    this.sound.playClick();
    const modal = document.getElementById('modal-review');
    if (modal) modal.classList.remove('open');

    // Check if 5-Year Term is Complete -> Trigger Democratic Election!
    if (this.sim.state.termYear > 5) {
      this.triggerElection();
    } else {
      this.switchScreen('screen-dashboard');
      this.renderAll();
    }
  }

  triggerElection() {
    this.sound.playNewsAlert();
    const modal = document.getElementById('modal-election');
    if (!modal) return;
    const lang = this.i18n.getLang();

    document.getElementById('election-term-title').textContent = this.i18n.t('electionTitle');
    document.getElementById('election-manifesto-step').style.display = 'block';
    document.getElementById('election-live-tally-step').style.display = 'none';
    document.getElementById('election-results-step').style.display = 'none';

    // Render manifesto choices
    const manifestoContainer = document.getElementById('election-manifesto-list');
    if (manifestoContainer) {
      manifestoContainer.innerHTML = this.elections.getManifestoOptions()
        .map(
          (m, idx) => `
          <div class="manifesto-card" onclick="window.gameApp.selectManifesto(${idx})">
            <div class="manifesto-title">📜 ${lang === 'hi' ? m.titleHindi : m.title}</div>
            <div class="manifesto-desc">${this.i18n.t('costLabel')} ₹${m.costBillion}B | ${m.focus} support boost</div>
          </div>
        `
        )
        .join('');
    }

    modal.classList.add('open');
  }

  selectManifesto(idx) {
    this.sound.playClick();
    const manifestos = this.elections.getManifestoOptions();
    const chosen = manifestos[idx];

    // Begin Live Election Tally Step
    document.getElementById('election-manifesto-step').style.display = 'none';
    document.getElementById('election-live-tally-step').style.display = 'block';

    const results = this.elections.calculateSeats(this.sim.state, 3.5);

    // Animate seat counting
    let currentRuling = 0;
    let currentOpp = 0;
    const targetRuling = results.rulingSeats;
    const targetOpp = results.mainOppSeats + results.reformOppSeats + results.indSeats;

    const rulingEl = document.getElementById('tally-ruling-count');
    const oppEl = document.getElementById('tally-opp-count');

    const interval = setInterval(() => {
      currentRuling += Math.ceil((targetRuling - currentRuling) / 6);
      currentOpp += Math.ceil((targetOpp - currentOpp) / 6);

      if (rulingEl) rulingEl.textContent = currentRuling;
      if (oppEl) oppEl.textContent = currentOpp;

      if (currentRuling >= targetRuling && currentOpp >= targetOpp) {
        clearInterval(interval);
        if (rulingEl) rulingEl.textContent = targetRuling;
        if (oppEl) oppEl.textContent = targetOpp;
        this.showElectionFinalOutcome(results);
      }
    }, 60);
  }

  showElectionFinalOutcome(results) {
    document.getElementById('election-live-tally-step').style.display = 'none';
    document.getElementById('election-results-step').style.display = 'block';
    const lang = this.i18n.getLang();

    const titleEl = document.getElementById('election-outcome-title');
    const descEl = document.getElementById('election-outcome-desc');
    const nextBtn = document.getElementById('btn-election-next');

    if (results.isVictory) {
      this.sound.playSuccess();
      if (titleEl) {
        titleEl.textContent = this.i18n.t('electionVictoryTitle');
        titleEl.className = 'text-success font-bold';
      }
      if (descEl) {
        descEl.textContent = lang === 'hi'
          ? `आपकी पार्टी ने 543 में से ${results.rulingSeats} सीटें जीतकर स्पष्ट बहुमत (272+) हासिल किया है। जनता ने आपके विकास मॉडल और बजट प्रबंधन पर अटूट विश्वास जताया है!`
          : `Your party won ${results.rulingSeats} out of 543 seats, commanding a decisive majority (272+). The electorate has reaffirmed trust in your governance!`;
      }
      if (nextBtn) {
        nextBtn.textContent = this.i18n.t('beginNextTermBtn');
        nextBtn.onclick = () => this.startNextTerm();
      }
    } else {
      this.sound.playDefeat();
      if (titleEl) {
        titleEl.textContent = this.i18n.t('electionDefeatTitle');
        titleEl.className = 'text-danger font-bold';
      }
      if (descEl) {
        descEl.textContent = lang === 'hi'
          ? `आपकी पार्टी को केवल ${results.rulingSeats} सीटें प्राप्त हुईं (बहुमत 272 आवश्यक)। जनता ने सत्ता परिवर्तन का फैसला किया।`
          : `Your party secured only ${results.rulingSeats} seats (272 needed for majority). High inflation and public discontent led to an electoral defeat.`;
      }
      if (nextBtn) {
        nextBtn.textContent = this.i18n.t('startNewGameBtn');
        nextBtn.onclick = () => {
          document.getElementById('modal-election').classList.remove('open');
          this.switchScreen('screen-home');
        };
      }
    }
  }

  startNextTerm() {
    this.sim.state.term += 1;
    this.sim.state.termYear = 1;
    this.sim.state.totalBudgetBillion += 100; // Bonus revenue for new term
    this.saveGame();

    document.getElementById('modal-election').classList.remove('open');
    this.switchScreen('screen-dashboard');
    this.renderAll();
    this.showToast(this.i18n.getLang() === 'hi' 
      ? `🇮🇳 कार्यकाल ${this.sim.state.term} आरंभ! शुभकामनाएँ।` 
      : `🇮🇳 Term ${this.sim.state.term} commenced! Best wishes.`);
  }

  renderPoliciesScreen() {
    const container = document.getElementById('policies-list-container');
    if (!container) return;
    const lang = this.i18n.getLang();

    const policies = window.GAME_POLICIES || [];
    const s = this.sim.state;

    container.innerHTML = policies
      .map((p) => {
        const isEnacted = s.enactedPolicies.includes(p.id);
        const title = lang === 'hi' ? p.titleHindi : p.title;
        const inflationTag = lang === 'hi' ? 'महंगाई' : 'Inflation';
        const stabilityTag = lang === 'hi' ? 'स्थिरता' : 'Stability';

        return `
          <div class="policy-card ${isEnacted ? 'enacted' : ''}">
            <div class="policy-top">
              <span class="policy-icon">${p.icon}</span>
              <div class="policy-info">
                <div class="policy-title">${title}</div>
                <div class="policy-cat">${p.category} • ${this.i18n.t('initialCost')}: ₹${p.costBillion}B</div>
              </div>
            </div>
            <div class="policy-desc">${p.description}</div>
            <div class="policy-effects">
              ${p.effects.gdpGrowth ? `<span class="effect-tag">+${p.effects.gdpGrowth}% GDP</span>` : ''}
              ${p.effects.inflation ? `<span class="effect-tag">${p.effects.inflation}% ${inflationTag}</span>` : ''}
              ${p.effects.stability ? `<span class="effect-tag">+${p.effects.stability}% ${stabilityTag}</span>` : ''}
            </div>
            <div class="policy-action-row">
              ${
                isEnacted
                  ? `<button class="btn-enacted" disabled>${this.i18n.t('enactedBadge')}</button>`
                  : `<button class="btn-pass-policy" onclick="window.gameApp.passPolicy('${p.id}')">${this.i18n.t('passBillBtn')}</button>`
              }
            </div>
          </div>
        `;
      })
      .join('');
  }

  passPolicy(policyId) {
    const policy = (window.GAME_POLICIES || []).find((p) => p.id === policyId);
    if (!policy) return;
    const lang = this.i18n.getLang();

    // Check government stability and parliamentary seats
    const supportRoll = Math.random() * 100;
    const requiredThreshold = policy.parliamentDifficulty || 50;

    this.sound.playGavel();

    if (supportRoll + (this.sim.state.govtStability - 50) * 0.5 >= requiredThreshold) {
      this.sound.playSuccess();
      this.sim.state.enactedPolicies.push(policyId);
      this.sim.state.govtStability = Math.min(99, this.sim.state.govtStability + 4);
      this.saveGame();
      this.renderPoliciesScreen();
      const title = lang === 'hi' ? policy.titleHindi : policy.title;
      this.showToast(lang === 'hi' ? `🏛️ बिल पारित! '${title}' संसद में पास हुआ।` : `🏛️ Bill Passed! '${title}' enacted.`);
    } else {
      this.showToast(lang === 'hi' ? `❌ बिल खारिज! संसद में बहुमत नहीं मिला।` : `❌ Bill Defeated! Lacked parliamentary majority.`);
    }
  }

  renderParliamentScreen() {
    const s = this.sim.state;
    const parliament = window.GAME_FACTIONS?.parliament;
    if (!parliament) return;

    document.getElementById('parl-majority-target').textContent = this.i18n.t('majorityNeededText', parliament.majorityNeeded, parliament.totalSeats);

    // Render Semicircle visual dots
    const seatsVisual = document.getElementById('parliament-visual-chamber');
    if (seatsVisual) {
      let dotsHTML = '';
      const dotCount = 64;
      for (let i = 0; i < dotCount; i++) {
        let color = i < 34 ? '#f59e0b' : i < 52 ? '#3b82f6' : i < 58 ? '#10b981' : '#8b5cf6';
        dotsHTML += `<div class="parl-seat-dot" style="background: ${color};"></div>`;
      }
      seatsVisual.innerHTML = dotsHTML;
    }

    // Party Distribution list
    const partyContainer = document.getElementById('parl-party-list');
    if (partyContainer) {
      partyContainer.innerHTML = parliament.parties
        .map(
          (party) => `
          <div class="party-card">
            <div class="party-header">
              <span class="party-bullet" style="background: ${party.color};"></span>
              <span class="party-name">${party.name}</span>
              <span class="party-seats">${party.initialSeats} ${this.i18n.t('seatsLabel')}</span>
            </div>
            <div class="party-meta">${party.alignment} • ${this.i18n.t('ideologyLabel')} ${party.ideology}</div>
          </div>
        `
        )
        .join('');
    }
  }

  renderCountryProfile() {
    const s = this.sim.state;
    document.getElementById('profile-country-title').textContent = s.countryName;
    document.getElementById('profile-pm-title').textContent = `${s.pmName} • Term ${s.term}`;

    document.getElementById('prof-reserves').textContent = `₹${s.foreignReservesBillion} Billion`;
    document.getElementById('prof-debt-gdp').textContent = `${s.debtToGdpRatio}%`;
    document.getElementById('prof-corruption').textContent = `${s.corruptionIndex}/100`;
    document.getElementById('prof-security').textContent = `${s.nationalSecurityIndex}/100`;
  }

  renderAvatarCustomizer() {
    const cfg = this.avatar.config;

    // Skin tones
    const skinContainer = document.getElementById('avatar-skin-options');
    if (skinContainer) {
      skinContainer.innerHTML = this.avatar.skinTones
        .map(
          (st) => `
          <button class="avatar-chip ${cfg.skinTone === st.color ? 'active' : ''}" style="background: ${st.color};" onclick="window.gameApp.setAvatarOption('skinTone', '${st.color}')" title="${st.name}"></button>
        `
        )
        .join('');
    }

    // Hairstyle
    const hairContainer = document.getElementById('avatar-hair-options');
    if (hairContainer) {
      hairContainer.innerHTML = this.avatar.hairStyles
        .map(
          (hs) => `
          <button class="avatar-option-btn ${cfg.hairStyle === hs.id ? 'active' : ''}" onclick="window.gameApp.setAvatarOption('hairStyle', '${hs.id}')">${hs.name}</button>
        `
        )
        .join('');
    }

    // Hair Color
    const hairColorContainer = document.getElementById('avatar-haircolor-options');
    if (hairColorContainer) {
      hairColorContainer.innerHTML = this.avatar.hairColors
        .map(
          (hc) => `
          <button class="avatar-chip ${cfg.hairColor === hc.color ? 'active' : ''}" style="background: ${hc.color};" onclick="window.gameApp.setAvatarOption('hairColor', '${hc.color}')" title="${hc.name}"></button>
        `
        )
        .join('');
    }

    // Facial Hair
    const facialHairContainer = document.getElementById('avatar-facial-options');
    if (facialHairContainer) {
      facialHairContainer.innerHTML = this.avatar.facialHairs
        .map(
          (fh) => `
          <button class="avatar-option-btn ${cfg.facialHair === fh.id ? 'active' : ''}" onclick="window.gameApp.setAvatarOption('facialHair', '${fh.id}')">${fh.name}</button>
        `
        )
        .join('');
    }

    // Outfit
    const outfitContainer = document.getElementById('avatar-outfit-options');
    if (outfitContainer) {
      outfitContainer.innerHTML = this.avatar.outfits
        .map(
          (out) => `
          <button class="avatar-option-btn ${cfg.outfit === out.id ? 'active' : ''}" onclick="window.gameApp.setAvatarOption('outfit', '${out.id}')">${out.name}</button>
        `
        )
        .join('');
    }

    // Glasses
    const glassesContainer = document.getElementById('avatar-glasses-options');
    if (glassesContainer) {
      glassesContainer.innerHTML = this.avatar.glasses
        .map(
          (g) => `
          <button class="avatar-option-btn ${cfg.glasses === g.id ? 'active' : ''}" onclick="window.gameApp.setAvatarOption('glasses', '${g.id}')">${g.name}</button>
        `
        )
        .join('');
    }

    // Live preview
    const previewContainer = document.getElementById('avatar-live-preview');
    if (previewContainer) {
      previewContainer.innerHTML = this.avatar.renderSVG(140);
    }
  }

  setAvatarOption(key, val) {
    this.sound.playClick();
    this.avatar.config[key] = val;
    this.avatar.save();
    this.renderAvatarCustomizer();
    this.renderAvatarPreview();
  }

  handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Crop & scale to 256x256 square canvas
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, 256, 256);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        this.avatar.setCustomPhoto(dataUrl);
        this.renderAvatarCustomizer();
        this.renderAvatarPreview();
        this.showToast('📷 आपकी फोटो अवतार के रूप में सेट हो गई है (Local Only)');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  removeUploadedPhoto() {
    this.sound.playClick();
    this.avatar.removeCustomPhoto();
    this.renderAvatarCustomizer();
    this.renderAvatarPreview();
    this.showToast('कस्टम फोटो हटा दी गई');
  }

  showToast(msg) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  bindEvents() {
    // Navigation items
    document.querySelectorAll('.nav-item').forEach((item) => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        if (target) this.switchScreen(target);
      });
    });

    // Upload photo input
    const photoInput = document.getElementById('avatar-photo-input');
    if (photoInput) {
      photoInput.addEventListener('change', (e) => this.handlePhotoUpload(e));
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.gameApp = new RashtraNitiApp();
});
