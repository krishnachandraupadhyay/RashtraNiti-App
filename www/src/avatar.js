// Prime Minister Avatar System - Procedural SVG & Local Photo Upload
class AvatarSystem {
  constructor() {
    this.config = {
      skinTone: '#E0AC69', // default wheatish
      hairStyle: 'classic',
      hairColor: '#1A1A1A',
      facialHair: 'none',
      outfit: 'bandhgala',
      outfitColor: '#1e293b',
      glasses: 'none',
      accessory: 'pin',
      customPhotoUrl: null // Local user uploaded photo data URL
    };

    this.skinTones = [
      { id: 'fair', name: 'Fair (गौर)', color: '#FAD7B2' },
      { id: 'wheatish', name: 'Wheatish (गेहुंआ)', color: '#E0AC69' },
      { id: 'warm', name: 'Warm Olive (सांवला)', color: '#C68642' },
      { id: 'bronze', name: 'Bronze (कांस्य)', color: '#8D5524' },
      { id: 'deep', name: 'Deep (गहरा)', color: '#5A3825' }
    ];

    this.hairColors = [
      { id: 'black', name: 'Jet Black (काला)', color: '#111827' },
      { id: 'darkbrown', name: 'Dark Brown (भूरा)', color: '#3b2219' },
      { id: 'saltpepper', name: 'Salt & Pepper (खिचड़ी)', color: '#64748b' },
      { id: 'silver', name: 'Silver White (सफेद)', color: '#e2e8f0' }
    ];

    this.hairStyles = [
      { id: 'classic', name: 'Classic Statesman (क्लासिक)' },
      { id: 'sidepart', name: 'Side Part (साइड पार्ट)' },
      { id: 'shortcrop', name: 'Short Crop (छोटा कट)' },
      { id: 'wavy', name: 'Wavy Volume (घने बाल)' },
      { id: 'turban', name: 'Turban / Pagri (पगड़ी)' },
      { id: 'bun', name: 'Elegance Bun (जूड़ा)' }
    ];

    this.facialHairs = [
      { id: 'none', name: 'Clean Shaven (क्लीन)' },
      { id: 'moustache', name: 'Dignified Moustache (मूंछ)' },
      { id: 'trimmed', name: 'Trimmed Beard (ट्रिम दाढ़ी)' },
      { id: 'full', name: 'Full Statesman Beard (पूरी दाढ़ी)' }
    ];

    this.outfits = [
      { id: 'bandhgala', name: 'Royal Bandhgala (बंदगला)' },
      { id: 'nehru_jacket', name: 'Kurta & Nehru Jacket (नेहरू जैकेट)' },
      { id: 'formal_suit', name: 'Executive Suit & Tie (सूट-टाई)' },
      { id: 'sari', name: 'Dignified Silk Sari (सिल्क साड़ी)' },
      { id: 'achkan', name: 'Heritage Achkan (अचकन)' }
    ];

    this.glasses = [
      { id: 'none', name: 'No Glasses (बिना चश्मा)' },
      { id: 'rect', name: 'Modern Executive (आधुनिक)' },
      { id: 'round', name: 'Round Visionary (गोल)' },
      { id: 'wire', name: 'Classic Wireframe (क्लासिक)' }
    ];

    this.loadSaved();
  }

  loadSaved() {
    try {
      const saved = localStorage.getItem('rashtraniti_avatar');
      if (saved) {
        this.config = { ...this.config, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not load avatar config', e);
    }
  }

  save() {
    try {
      localStorage.setItem('rashtraniti_avatar', JSON.stringify(this.config));
    } catch (e) {
      console.warn('Could not save avatar', e);
    }
  }

  setCustomPhoto(dataUrl) {
    this.config.customPhotoUrl = dataUrl;
    this.save();
  }

  removeCustomPhoto() {
    this.config.customPhotoUrl = null;
    this.save();
  }

  renderSVG(targetSize = 140) {
    if (this.config.customPhotoUrl) {
      return `
        <div class="avatar-photo-wrapper" style="width: 100%; height: 100%; max-width: ${targetSize}px; max-height: ${targetSize}px;">
          <img src="${this.config.customPhotoUrl}" alt="PM Avatar" class="avatar-photo-img" />
          <div class="avatar-badge-pin">🇮🇳</div>
        </div>
      `;
    }

    const { skinTone, hairColor, hairStyle, facialHair, outfit, glasses } = this.config;

    // Build SVG parts
    const skin = skinTone || '#E0AC69';
    const hair = hairColor || '#1A1A1A';

    // SVG elements based on options
    let hairSVG = '';
    if (hairStyle === 'classic') {
      hairSVG = `
        <path d="M 32,55 C 30,25 70,20 88,25 C 105,30 110,48 108,58 C 105,38 90,30 70,30 C 50,30 35,42 32,55 Z" fill="${hair}"/>
        <path d="M 31,52 C 28,65 29,78 33,85 C 35,74 36,65 37,55 Z" fill="${hair}"/>
        <path d="M 109,52 C 112,65 111,78 107,85 C 105,74 104,65 103,55 Z" fill="${hair}"/>
      `;
    } else if (hairStyle === 'sidepart') {
      hairSVG = `
        <path d="M 28,52 C 28,24 60,18 78,20 C 100,24 112,40 110,58 C 104,32 82,24 62,28 C 45,31 34,42 28,52 Z" fill="${hair}"/>
        <path d="M 27,50 C 24,65 26,78 30,84 C 33,72 34,60 35,50 Z" fill="${hair}"/>
      `;
    } else if (hairStyle === 'shortcrop') {
      hairSVG = `
        <path d="M 35,50 C 35,30 65,26 70,26 C 90,26 105,35 105,50 C 100,34 85,31 70,31 C 55,31 40,36 35,50 Z" fill="${hair}"/>
      `;
    } else if (hairStyle === 'turban') {
      hairSVG = `
        <!-- Saffron / Royal Pagri -->
        <ellipse cx="70" cy="40" rx="44" ry="26" fill="#f59e0b" />
        <ellipse cx="70" cy="34" rx="42" ry="22" fill="#d97706" />
        <path d="M 32,44 C 45,28 95,28 108,44 C 95,36 45,36 32,44 Z" fill="#b45309" />
        <circle cx="70" cy="30" r="5" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
      `;
    } else if (hairStyle === 'bun') {
      hairSVG = `
        <ellipse cx="70" cy="22" rx="18" ry="14" fill="${hair}" />
        <path d="M 32,55 C 32,30 60,25 70,25 C 80,25 108,30 108,55 C 105,40 90,34 70,34 C 50,34 35,40 32,55 Z" fill="${hair}" />
      `;
    } else {
      // Wavy
      hairSVG = `
        <path d="M 30,55 C 25,25 50,18 70,18 C 95,18 115,28 110,55 C 105,30 85,25 70,25 C 50,25 35,35 30,55 Z" fill="${hair}"/>
      `;
    }

    let facialHairSVG = '';
    if (facialHair === 'moustache') {
      facialHairSVG = `
        <path d="M 54,92 C 62,88 68,93 70,95 C 72,93 78,88 86,92 C 92,95 86,101 78,98 C 73,96 71,97 70,97 C 69,97 67,96 62,98 C 54,101 48,95 54,92 Z" fill="${hair}" />
      `;
    } else if (facialHair === 'trimmed') {
      facialHairSVG = `
        <path d="M 40,80 C 40,110 100,110 100,80 C 95,102 45,102 40,80 Z" fill="${hair}" opacity="0.85" />
        <path d="M 55,93 C 62,90 68,93 70,95 C 72,93 78,90 85,93 C 90,95 82,99 70,98 C 58,99 50,95 55,93 Z" fill="${hair}" />
      `;
    } else if (facialHair === 'full') {
      facialHairSVG = `
        <path d="M 36,75 C 36,118 104,118 104,75 C 98,110 42,110 36,75 Z" fill="${hair}" />
        <path d="M 52,91 C 62,87 68,92 70,94 C 72,92 78,87 88,91 C 94,95 84,102 70,99 C 56,102 46,95 52,91 Z" fill="${hair}" />
      `;
    }

    let outfitSVG = '';
    if (outfit === 'bandhgala') {
      outfitSVG = `
        <!-- Bandhgala Dark Navy Jacket with Gold Buttons & Tricolor Pocket Pin -->
        <path d="M 25,120 L 45,105 L 95,105 L 115,120 L 126,140 L 14,140 Z" fill="#0f172a" />
        <!-- Mandarin Collar -->
        <path d="M 50,105 C 50,115 90,115 90,105 L 92,98 C 92,94 48,94 48,98 Z" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <!-- Center Gold Buttons Line -->
        <line x1="70" y1="108" x2="70" y2="140" stroke="#f59e0b" stroke-width="2" stroke-dasharray="1,6" />
        <!-- Ashoka Pin -->
        <circle cx="88" cy="118" r="4" fill="#f59e0b" stroke="#ffffff" stroke-width="1" />
      `;
    } else if (outfit === 'nehru_jacket') {
      outfitSVG = `
        <!-- Kurta Base -->
        <path d="M 30,115 L 110,115 L 122,140 L 18,140 Z" fill="#f8fafc" />
        <!-- Saffron/Amber Nehru Jacket -->
        <path d="M 32,115 L 52,106 L 88,106 L 108,115 L 118,140 L 88,140 L 88,118 L 52,118 L 52,140 L 22,140 Z" fill="#b45309" stroke="#78350f" stroke-width="1" />
        <!-- Inner Kurta V -->
        <polygon points="62,106 78,106 70,122" fill="#ffffff" />
        <!-- Lapel Pin -->
        <circle cx="94" cy="120" r="3.5" fill="#10b981" />
      `;
    } else if (outfit === 'formal_suit') {
      outfitSVG = `
        <!-- Dark Charcoal Suit + White Shirt + Navy Tie -->
        <path d="M 20,125 L 50,108 L 90,108 L 120,125 L 128,140 L 12,140 Z" fill="#1e293b" />
        <!-- Shirt V -->
        <polygon points="56,108 84,108 70,132" fill="#ffffff" />
        <!-- Red/Maroon Tie -->
        <polygon points="68,112 72,112 74,136 70,140 66,136" fill="#be123c" />
        <!-- Lapel folds -->
        <polygon points="46,108 58,124 50,140 26,128" fill="#0f172a" />
        <polygon points="94,108 82,124 90,140 114,128" fill="#0f172a" />
      `;
    } else if (outfit === 'sari') {
      outfitSVG = `
        <!-- Silk Blouse -->
        <path d="M 36,112 L 104,112 L 122,140 L 18,140 Z" fill="#831843" />
        <!-- Zari Border Pallu (Drape) -->
        <path d="M 32,140 L 78,104 L 98,106 L 68,140 Z" fill="#047857" stroke="#f59e0b" stroke-width="2" />
        <!-- Gold necklace -->
        <path d="M 52,106 C 58,118 82,118 88,106" stroke="#f59e0b" stroke-width="2.5" fill="none" />
      `;
    } else {
      // Achkan
      outfitSVG = `
        <path d="M 22,120 L 48,102 L 92,102 L 118,120 L 126,140 L 14,140 Z" fill="#475569" />
        <path d="M 52,102 C 52,112 88,112 88,102 L 90,96 L 50,96 Z" fill="#334155" />
        <line x1="70" y1="104" x2="70" y2="140" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="2,5" />
        <circle cx="86" cy="116" r="3.5" fill="#f59e0b" />
      `;
    }

    let glassesSVG = '';
    if (glasses === 'rect') {
      glassesSVG = `
        <rect x="45" y="66" width="20" height="13" rx="2" fill="none" stroke="#0f172a" stroke-width="2.5" />
        <rect x="75" y="66" width="20" height="13" rx="2" fill="none" stroke="#0f172a" stroke-width="2.5" />
        <line x1="65" y1="72" x2="75" y2="72" stroke="#0f172a" stroke-width="2" />
        <line x1="45" y1="71" x2="35" y2="69" stroke="#0f172a" stroke-width="1.5" />
        <line x1="95" y1="71" x2="105" y2="69" stroke="#0f172a" stroke-width="1.5" />
      `;
    } else if (glasses === 'round') {
      glassesSVG = `
        <circle cx="55" cy="72" r="9" fill="none" stroke="#78350f" stroke-width="2" />
        <circle cx="85" cy="72" r="9" fill="none" stroke="#78350f" stroke-width="2" />
        <line x1="64" y1="72" x2="76" y2="72" stroke="#78350f" stroke-width="2" />
      `;
    } else if (glasses === 'wire') {
      glassesSVG = `
        <rect x="46" y="68" width="18" height="11" rx="3" fill="none" stroke="#94a3b8" stroke-width="1.5" />
        <rect x="76" y="68" width="18" height="11" rx="3" fill="none" stroke="#94a3b8" stroke-width="1.5" />
        <line x1="64" y1="73" x2="76" y2="73" stroke="#94a3b8" stroke-width="1.5" />
      `;
    }

    return `
      <svg class="pm-avatar-svg" viewBox="0 0 140 140" style="width: 100%; height: 100%; max-width: ${targetSize}px; max-height: ${targetSize}px; display: block;" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
          <clipPath id="avatarCircle">
            <circle cx="70" cy="70" r="66" />
          </clipPath>
        </defs>

        <!-- Outer Ring -->
        <circle cx="70" cy="70" r="68" fill="url(#bgGrad)" stroke="#f59e0b" stroke-width="2.5" />

        <g clip-path="url(#avatarCircle)">
          <!-- Background Glow -->
          <circle cx="70" cy="70" r="50" fill="#3b82f6" opacity="0.15" />

          <!-- Body / Attire -->
          ${outfitSVG}

          <!-- Neck -->
          <rect x="61" y="85" width="18" height="22" fill="${skin}" />
          <!-- Neck shadow -->
          <path d="M 61,85 C 66,93 74,93 79,85 Z" fill="#000000" opacity="0.15" />

          <!-- Ears -->
          <circle cx="36" cy="73" r="7" fill="${skin}" />
          <circle cx="104" cy="73" r="7" fill="${skin}" />

          <!-- Face Shape -->
          <path d="M 38,62 C 38,42 102,42 102,62 C 102,86 86,102 70,102 C 54,102 38,86 38,62 Z" fill="${skin}" />

          <!-- Eyebrows -->
          <path d="M 47,62 Q 55,59 63,63" stroke="${hair}" stroke-width="2.5" stroke-linecap="round" fill="none" />
          <path d="M 77,63 Q 85,59 93,62" stroke="${hair}" stroke-width="2.5" stroke-linecap="round" fill="none" />

          <!-- Eyes -->
          <circle cx="55" cy="72" r="3.2" fill="#1e293b" />
          <circle cx="56" cy="71" r="1" fill="#ffffff" />
          <circle cx="85" cy="72" r="3.2" fill="#1e293b" />
          <circle cx="86" cy="71" r="1" fill="#ffffff" />

          <!-- Nose -->
          <path d="M 70,68 L 68,81 L 73,81" stroke="#a06030" stroke-width="1.8" stroke-linecap="round" fill="none" />

          <!-- Mouth -->
          <path d="M 63,88 Q 70,92 77,88" stroke="#8d4024" stroke-width="2" stroke-linecap="round" fill="none" />

          <!-- Facial Hair (if any) -->
          ${facialHairSVG}

          <!-- Glasses (if any) -->
          ${glassesSVG}

          <!-- Hair on Top -->
          ${hairSVG}
        </g>
      </svg>
    `;
  }
}

window.avatarSystem = new AvatarSystem();
