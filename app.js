// State Management
let state = {
  gems: 600,
  likedList: ["dubai-chocolate"],
  bookmarkedList: ["even-cook"],
  uploadedList: [],
  userNickname: "솜뭉치인형",
  isSecondNickChange: false,
  avatarConfig: {
    hair: "Short Black",
    accessory: "None",
    headwear: "None",
    back: "None",
    eyes: "Normal",
    mouth: "Smile",
    top: "Base Shirt",
    bottom: "Base Shorts",
    hand: "None",
    contacts: "Standard Gray",
    shoes: "Sneakers White",
    crown: "None"
  },
  boughtAvatarItems: ["Short Black", "Normal", "Smile", "Base Shirt", "Base Shorts", "Standard Gray", "Sneakers White"],
  lastAttendance: null,
  isTutorialHidden: false,
  friendsList: ["유행추적기#2048", "릴스중독자#9901"],
  cameraPermGranted: false,
  recentSearches: ["두바이초콜릿", "요아정", "최강록 이븐", "위플래시"],
  draftsList: [
    { id: "draft-mock1", type: "video", date: "2026-05-26", name: "두바이 초콜릿 믹싱 ASMR" }
  ]
};

let currentActiveFilters = {
  mainTab: "chart",
  subTab: "일간",
  platformInner: "YouTube",
  formatInner: "숏폼",
  themeInner: "감성",
  eraInner: "2026"
};

let currentSelectedPartCategory = "hair";

const shopItems = [
  // Hairs
  { id: "Short Black", name: "단정한 흑발", category: "hair", price: 0, unlock: 0 },
  { id: "Long Blonde", name: "금발 생머리", category: "hair", price: 90, unlock: 0 },
  { id: "Curly Brown", name: "브라운 펌헤어", category: "hair", price: 130, unlock: 0 },
  { id: "Hip Pink", name: "핑크 리본 단발", category: "hair", price: 210, unlock: 10 },
  // Accessories
  { id: "None", name: "없음", category: "accessory", price: 0, unlock: 0 },
  { id: "Cool Sunglasses", name: "힙스터 선글라스", category: "accessory", price: 60, unlock: 0 },
  { id: "Cyber Visor", name: "네온 사이버 고글", category: "accessory", price: 160, unlock: 10 },
  { id: "Cute Blush", name: "볼터치 자수", category: "accessory", price: 40, unlock: 0 },
  // Headwear
  { id: "Beanie Hat", name: "스트릿 미니 비니", category: "headwear", price: 70, unlock: 0 },
  { id: "Ribbon Headband", name: "벨벳 레드 머리띠", category: "headwear", price: 100, unlock: 0 },
  { id: "Earphones", name: "헤드폰 소품", category: "headwear", price: 150, unlock: 0 },
  // Back
  { id: "Angel Wings", name: "날개 솜인형 장식", category: "back", price: 320, unlock: 1 },
  { id: "Neon Boosters", name: "네온 테크 백팩", category: "back", price: 260, unlock: 10 },
  { id: "School Backpack", name: "병아리 캐릭터 가방", category: "back", price: 60, unlock: 0 },
  // Eyes
  { id: "Normal", name: "초롱초롱 눈", category: "eyes", price: 0, unlock: 0 },
  { id: "Sparkling", name: "반짝 하트 눈", category: "eyes", price: 70, unlock: 0 },
  { id: "Blinking", name: "윙크 솜눈", category: "eyes", price: 90, unlock: 0 },
  { id: "Cat Eyes", name: "고양이 눈매", category: "eyes", price: 110, unlock: 10 },
  // Mouth
  { id: "Smile", name: "스마일 자수", category: "mouth", price: 0, unlock: 0 },
  { id: "Surprised", name: "놀란 입", category: "mouth", price: 50, unlock: 0 },
  { id: "Cool Smirk", name: "새침한 슥 입", category: "mouth", price: 70, unlock: 0 },
  { id: "Whistling", name: "휘파람 입", category: "mouth", price: 60, unlock: 0 },
  // Top
  { id: "Base Shirt", name: "멜빵 면티", category: "top", price: 0, unlock: 0 },
  { id: "Hoodie Grey", name: "그레이 후디", category: "top", price: 90, unlock: 0 },
  { id: "Leather Jacket", name: "가죽 숏자켓", category: "top", price: 190, unlock: 0 },
  { id: "Crop Top Neon", name: "네온 테크웨어 탑", category: "top", price: 230, unlock: 10 },
  // Bottom
  { id: "Base Shorts", name: "기본 반바지", category: "bottom", price: 0, unlock: 0 },
  { id: "Cargo Pants Black", name: "카고 블랙 조거", category: "bottom", price: 95, unlock: 0 },
  { id: "Denim Skirt", name: "데님 오버롤 스커트", category: "bottom", price: 120, unlock: 0 },
  { id: "Wide Slacks", name: "와이드 핏 슬랙스", category: "bottom", price: 140, unlock: 10 },
  // Hand
  { id: "V Sign Sparkle", name: "반짝 V 포즈", category: "hand", price: 60, unlock: 0 },
  { id: "Bubble Tea", name: "마라탕후루 소품", category: "hand", price: 80, unlock: 0 },
  { id: "Holding Mic", name: "골드 핸드 마이크", category: "hand", price: 160, unlock: 10 },
  // Contacts
  { id: "Standard Gray", name: "블랙 단추 단반사", category: "contacts", price: 0, unlock: 0 },
  { id: "Blue Ring", name: "오션 블루 렌즈", category: "contacts", price: 50, unlock: 0 },
  { id: "Purple Glow", name: "갤럭시 퍼플 렌즈", category: "contacts", price: 100, unlock: 0 },
  { id: "Cat Eye Gold", name: "자개 골드 오드아이", category: "contacts", price: 170, unlock: 10 },
  // Shoes
  { id: "Sneakers White", name: "화이트 단화", category: "shoes", price: 0, unlock: 0 },
  { id: "Chunky Boots", name: "어글리 청키 워커", category: "shoes", price: 110, unlock: 0 },
  { id: "High Heels Red", name: "레드 미니 힐", category: "shoes", price: 160, unlock: 10 },
  // Crown
  { id: "Golden Crown", name: "미니 황금 왕관", category: "crown", price: 500, unlock: 1 },
  { id: "Ice Tiara", name: "얼음꽃 티아라", category: "crown", price: 360, unlock: 10 },
  { id: "Flower Wreath", name: "봄꽃 머리 화관", category: "crown", price: 130, unlock: 0 }
];

function loadState() {
  const saved = localStorage.getItem("trend_spotlight_plushie_state");
  if (saved) {
    try {
      state = { ...state, ...JSON.parse(saved) };
    } catch (e) {
      console.error("Error loading state", e);
    }
  }
  updateGemBadge();
}

function saveState() {
  localStorage.setItem("trend_spotlight_plushie_state", JSON.stringify(state));
  updateGemBadge();
}

function updateGemBadge() {
  const badges = document.querySelectorAll(".gem-count-text");
  badges.forEach(b => { b.textContent = state.gems; });
}

// SVG Generator (Cute Humanoid Plushie Doll Design - Safeguards basic shape even if all config is None)
function generateAvatarSVG(config) {
  const skinColor = "#ffdbac";
  
  let eyeSVG = `<circle cx="65" cy="85" r="7.5" fill="#111" /><circle cx="115" cy="85" r="7.5" fill="#111" /><circle cx="62" cy="82" r="2.5" fill="#fff" /><circle cx="112" cy="82" r="2.5" fill="#fff" />`;
  if (config.eyes === "Sparkling") {
    eyeSVG = `<circle cx="65" cy="85" r="7" fill="#111" />
              <circle cx="115" cy="85" r="7" fill="#111" />
              <polygon points="65,81 67,85 71,85 68,87 69,91 65,89 61,91 62,87 59,85 63,85" fill="#fff"/>
              <polygon points="115,81 117,85 121,85 118,87 119,91 115,89 111,91 112,87 109,85 113,85" fill="#fff"/>`;
  } else if (config.eyes === "Blinking") {
    eyeSVG = `<path d="M57,85 Q65,78 73,85" fill="none" stroke="#222" stroke-width="4" stroke-linecap="round" />
              <circle cx="115" cy="85" r="7.5" fill="#111" />
              <circle cx="117" cy="82" r="2.5" fill="#fff"/>`;
  } else if (config.eyes === "Cat Eyes") {
    eyeSVG = `<ellipse cx="65" cy="85" rx="8" ry="5.5" fill="#b624ff" stroke="#fff" stroke-width="1.2"/>
              <ellipse cx="115" cy="85" rx="8" ry="5.5" fill="#b624ff" stroke="#fff" stroke-width="1.2"/>
              <ellipse cx="65" cy="85" rx="2" ry="5" fill="#000"/>
              <ellipse cx="115" cy="85" rx="2" ry="5" fill="#000"/>`;
  }

  let contactsOverlay = "";
  if (config.contacts && config.contacts !== "Standard Gray") {
    let color = "transparent";
    if (config.contacts === "Blue Ring") color = "rgba(0, 242, 254, 0.4)";
    if (config.contacts === "Purple Glow") color = "rgba(182, 36, 255, 0.4)";
    if (config.contacts === "Cat Eye Gold") color = "rgba(254, 218, 0, 0.5)";
    contactsOverlay = `<circle cx="65" cy="85" r="7.5" fill="${color}" />
                       <circle cx="115" cy="85" r="7.5" fill="${color}" />`;
  }

  let mouthSVG = `<path d="M78,103 Q90,113 102,103" fill="none" stroke="#222" stroke-width="3" stroke-linecap="round" stroke-dasharray="2.5,1.5"/>`;
  if (config.mouth === "Surprised") {
    mouthSVG = `<circle cx="90" cy="108" r="5" fill="#8b0000"/>`;
  } else if (config.mouth === "Cool Smirk") {
    mouthSVG = `<path d="M82,106 Q95,101 98,109" fill="none" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>`;
  } else if (config.mouth === "Whistling") {
    mouthSVG = `<circle cx="90" cy="107" r="3.5" fill="none" stroke="#222" stroke-width="3"/>`;
  }

  let accessoriesSVG = "";
  if (config.accessory === "Cool Sunglasses") {
    accessoriesSVG = `<polygon points="45,78 78,78 74,94 50,94" fill="#111" opacity="0.9"/>
                      <polygon points="102,78 135,78 131,94 107,94" fill="#111" opacity="0.9"/>
                      <line x1="78" y1="83" x2="102" y2="83" stroke="#fff" stroke-width="2"/>`;
  } else if (config.accessory === "Cyber Visor") {
    accessoriesSVG = `<polygon points="36,75 144,73 138,96 42,98" fill="rgba(182, 36, 255, 0.7)" stroke="#ff2a85" stroke-width="2"/>`;
  } else if (config.accessory === "Cute Blush") {
    accessoriesSVG = `<ellipse cx="54" cy="94" rx="10" ry="5.5" fill="#ff5e9f" opacity="0.5"/>
                      <ellipse cx="126" cy="94" rx="10" ry="5.5" fill="#ff5e9f" opacity="0.5"/>`;
  }

  let hairSVG = "";
  if (config.hair !== "None") {
    switch(config.hair) {
      case "Long Blonde":
        hairSVG = `<path d="M45,55 Q90,20 135,55 L138,120 L124,120 L120,68 L60,68 L56,120 L42,120 Z" fill="#ffd700" stroke="#d5b500" stroke-width="1.5" stroke-dasharray="3,2"/>`;
        break;
      case "Curly Brown":
        hairSVG = `<path d="M40,55 Q90,15 140,55 Q150,68 136,78 L125,82 Q90,62 55,82 L44,78 Q28,68 40,55 Z" fill="#8b4513" stroke="#60300d" stroke-width="1.5" stroke-dasharray="3,2"/>`;
        break;
      case "Hip Pink":
        hairSVG = `<path d="M45,52 Q90,22 135,52 L142,95 L128,100 L124,70 L56,70 L52,100 L38,95 Z" fill="#ff2a85" stroke="#cc1a65" stroke-width="1.5" stroke-dasharray="3,2"/>`;
        break;
      default: // Short Black
        hairSVG = `<path d="M46,55 Q90,28 134,55 L138,82 L126,82 Q90,52 54,82 L42,82 Z" fill="#222" stroke="#000" stroke-dasharray="3,2"/>`;
    }
  }

  let topSVG = `<path d="M50,138 H130 L145,180 L125,185 L115,165 V190 H65 V165 L55,185 L35,180 Z" fill="#444" stroke="#222" stroke-dasharray="4,2" />`; // safety basic top
  if (config.top && config.top !== "None") {
    if(config.top === "Hoodie Grey") {
      topSVG = `<path d="M48,138 H132 L145,180 L125,185 L115,165 V195 H65 V165 L55,185 L35,180 Z" fill="#78909c" stroke="#546e7a" stroke-dasharray="4,2"/>`;
    } else if(config.top === "Leather Jacket") {
      topSVG = `<path d="M48,138 H132 L145,180 L125,185 L115,165 V195 H65 V165 L55,185 L35,180 Z" fill="#263238" stroke="#102027" stroke-dasharray="4,2"/>`;
    } else if(config.top === "Crop Top Neon") {
      topSVG = `<path d="M50,138 H130 L140,165 L120,168 L112,156 V158 H68 V156 L60,168 L40,165 Z" fill="#b624ff" stroke="#00f2fe" stroke-dasharray="4,2"/>`;
    }
  }

  let bottomSVG = `<path d="M64,185 H116 V220 H64 Z" fill="#1e3a8a" stroke="#172554" stroke-dasharray="3,2"/>`; // safety basic bottom
  if (config.bottom && config.bottom !== "None") {
    if(config.bottom === "Cargo Pants Black") {
      bottomSVG = `<path d="M64,185 H116 V230 H64 Z" fill="#1e293b" stroke="#0f172a" stroke-dasharray="3,2"/>`;
    } else if(config.bottom === "Denim Skirt") {
      bottomSVG = `<path d="M62,185 H118 L122,215 H58 Z" fill="#2563eb" stroke="#1d4ed8" stroke-dasharray="3,2"/>`;
    } else if(config.bottom === "Wide Slacks") {
      bottomSVG = `<path d="M62,185 H118 L120,235 H93 V205 H87 V235 H60 Z" fill="#334155" stroke="#1e293b" stroke-dasharray="3,2"/>`;
    }
  }

  let shoesSVG = `<rect x="64" y="235" width="18" height="8" rx="2" fill="#fff" stroke="#ccc" stroke-dasharray="2,1"/><rect x="98" y="235" width="18" height="8" rx="2" fill="#fff" stroke="#ccc" stroke-dasharray="2,1"/>`;
  if (config.shoes && config.shoes !== "None") {
    if(config.shoes === "Chunky Boots") {
      shoesSVG = `<rect x="62" y="232" width="22" height="12" rx="3" fill="#111"/>
                  <rect x="96" y="232" width="22" height="12" rx="3" fill="#111"/>`;
    } else if(config.shoes === "High Heels Red") {
      shoesSVG = `<path d="M64,237 L78,230 L80,240 Z" fill="#ff2a85"/>
                  <path d="M98,237 L112,230 L114,240 Z" fill="#ff2a85"/>`;
    }
  }

  let handSVG = "";
  if (config.hand && config.hand !== "None") {
    if(config.hand === "V Sign Sparkle") {
      handSVG = `<circle cx="28" cy="155" r="6" fill="${skinColor}" stroke="#e0a890" />
                 <line x1="28" y1="150" x2="22" y2="140" stroke="${skinColor}" stroke-width="4"/>
                 <line x1="30" y1="150" x2="36" y2="140" stroke="${skinColor}" stroke-width="4"/>`;
    } else if(config.hand === "Bubble Tea") {
      handSVG = `<line x1="25" y1="130" x2="25" y2="175" stroke="#d2b48c" stroke-width="2.5" stroke-linecap="round"/>
                 <circle cx="25" cy="133" r="4.5" fill="#ff2a85"/>
                 <circle cx="25" cy="144" r="4.5" fill="#f59e0b"/>
                 <circle cx="25" cy="155" r="4.5" fill="#10b981"/>
                 <circle cx="25" cy="160" r="6" fill="${skinColor}" stroke="#e0a890" />`;
    } else if(config.hand === "Holding Mic") {
      handSVG = `<line x1="26" y1="150" x2="26" y2="175" stroke="#111" stroke-width="4"/>
                 <circle cx="26" cy="144" r="5" fill="#ff2a85"/>
                 <circle cx="26" cy="158" r="6" fill="${skinColor}" stroke="#e0a890" />`;
    }
  }

  let headwearSVG = "";
  if (config.headwear && config.headwear !== "None") {
    if(config.headwear === "Beanie Hat") {
      headwearSVG = `<path d="M50,55 C50,25 130,25 130,55 Z" fill="#3b82f6" stroke="#2563eb" stroke-dasharray="3,2"/>
                     <rect x="45" y="50" width="90" height="12" rx="4" fill="#1d4ed8"/>`;
    } else if(config.headwear === "Ribbon Headband") {
      headwearSVG = `<path d="M46,55 Q90,40 134,55" fill="none" stroke="#ff2a85" stroke-width="6"/>
                     <circle cx="90" cy="42" r="8" fill="#ff2a85"/>`;
    } else if(config.headwear === "Earphones") {
      headwearSVG = `<path d="M44,70 Q90,25 136,70" fill="none" stroke="#fff" stroke-width="4"/>
                     <rect x="36" y="65" width="12" height="20" rx="4" fill="#111"/>
                     <rect x="132" y="65" width="12" height="20" rx="4" fill="#111"/>`;
    }
  }

  let crownSVG = "";
  if (config.crown && config.crown !== "None") {
    if(config.crown === "Golden Crown") {
      crownSVG = `<polygon points="52,48 62,20 78,34 90,14 102,34 118,20 128,48" fill="#ffd700" stroke="#d97706" stroke-width="1"/>`;
    } else if(config.crown === "Ice Tiara") {
      crownSVG = `<polygon points="56,48 72,25 90,18 108,25 124,48" fill="rgba(0, 242, 254, 0.7)" stroke="#00f2fe" stroke-width="1"/>`;
    } else if(config.crown === "Flower Wreath") {
      crownSVG = `<ellipse cx="90" cy="46" rx="40" ry="8" fill="none" stroke="#10b981" stroke-width="3"/>
                  <circle cx="65" cy="44" r="4.5" fill="#ef4444"/><circle cx="90" cy="42" r="4.5" fill="#ff2a85"/><circle cx="115" cy="44" r="4.5" fill="#3b82f6"/>`;
    }
  }

  let backSVG = "";
  if (config.back && config.back !== "None") {
    if(config.back === "Angel Wings") {
      backSVG = `<path d="M38,120 C0,90 10,50 50,70 C40,85 42,100 50,115 Z" fill="#fff" opacity="0.9" stroke="#ddd" stroke-dasharray="3,2"/>
                 <path d="M142,120 C180,90 170,50 130,70 C140,85 138,100 130,115 Z" fill="#fff" opacity="0.9" stroke="#ddd" stroke-dasharray="3,2"/>`;
    } else if(config.back === "Neon Boosters") {
      backSVG = `<rect x="35" y="110" width="16" height="40" rx="3" fill="#ff2a85" filter="drop-shadow(0 0 6px #ff2a85)"/>
                 <rect x="129" y="110" width="16" height="40" rx="3" fill="#ff2a85" filter="drop-shadow(0 0 6px #ff2a85)"/>`;
    } else if(config.back === "School Backpack") {
      backSVG = `<rect x="58" y="130" width="64" height="46" rx="12" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>`;
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 260">
      <defs>
        <radialGradient id="grad-face" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff5f0" />
          <stop offset="100%" stop-color="${skinColor}" />
        </radialGradient>
      </defs>
      
      <!-- Back Item -->
      ${backSVG}

      <!-- Ears (Stitched humanoid side ears) -->
      <circle cx="48" cy="95" r="10" fill="${skinColor}" stroke="#e0a890" stroke-width="1.5" stroke-dasharray="2,2"/>
      <circle cx="132" cy="95" r="10" fill="${skinColor}" stroke="#e0a890" stroke-width="1.5" stroke-dasharray="2,2"/>

      <!-- Body / Head Base -->
      <path d="M70,120 Q90,135 110,120 L115,138 H65 Z" fill="${skinColor}" stroke="#e0a890" stroke-width="1.5" stroke-dasharray="2,2" />
      <circle cx="90" cy="95" r="42" fill="url(#grad-face)" stroke="#e0a890" stroke-width="1.5" stroke-dasharray="3,2" />
      
      <!-- Face details -->
      ${eyeSVG}
      ${contactsOverlay}
      ${mouthSVG}

      <!-- Nose Snout -->
      <ellipse cx="90" cy="100" rx="6" ry="4" fill="#fff" stroke="#e0a890" stroke-width="1" />
      <polygon points="90,98 88,100 92,100" fill="#111" />

      <!-- Hair Layer (Back) -->
      ${hairSVG}

      <!-- Clothing Layers -->
      ${bottomSVG}
      ${topSVG}
      ${shoesSVG}
      ${handSVG}
      ${accessoriesSVG}
      ${headwearSVG}
      ${crownSVG}
    </svg>
  `;
}

// Update components visual
function updateAvatarDisplays() {
  const container = document.getElementById("avatar-display-canvas");
  if (container) container.innerHTML = generateAvatarSVG(state.avatarConfig);
  const profileContainer = document.getElementById("profile-avatar-render");
  if (profileContainer) profileContainer.innerHTML = generateAvatarSVG(state.avatarConfig);
}

// Calculate Dynamic rank score
function getTrendWeightedScore(t) {
  return window.trendsData.calculateScore(t.likes, t.comments, t.challenges, t.shares, t.platform);
}

function calculateTrendSensitivity() {
  const likesCount = state.likedList.length;
  const bookmarksCount = state.bookmarkedList.length;
  const itemsCount = state.boughtAvatarItems.length;
  const uploadsCount = state.uploadedList.length;

  const totalScore = (likesCount * 5) + (bookmarksCount * 10) + (itemsCount * 15) + (uploadsCount * 20);
  
  let percentage = "Top 50%";
  let rankName = "초보 유행 인형 🧸";
  let activeLevelIndex = 3;

  if (totalScore >= 180) {
    percentage = "Top 1%";
    rankName = "핵인싸 봉제인형 👑";
    activeLevelIndex = 0;
  } else if (totalScore >= 100) {
    percentage = "Top 5%";
    rankName = "트렌드 선도인형 ⚡";
    activeLevelIndex = 1;
  } else if (totalScore >= 50) {
    percentage = "Top 20%";
    rankName = "우수 솜뭉치 🔥";
    activeLevelIndex = 2;
  }

  return { totalScore, percentage, rankName, activeLevelIndex };
}

function renderPyramid() {
  const { percentage, rankName, activeLevelIndex } = calculateTrendSensitivity();
  const pyramid = document.getElementById("profile-pyramid-svg");
  if (!pyramid) return;

  const levels = [
    { points: "100,10 80,40 120,40", label: "Top 1%", index: 0 },
    { points: "80,40 120,40 140,75 60,75", label: "Top 5%", index: 1 },
    { points: "60,75 140,75 160,110 40,110", label: "Top 20%", index: 2 },
    { points: "40,110 160,110 180,140 20,140", label: "Top 50%", index: 3 }
  ];

  let svgHtml = `
    <defs>
      <linearGradient id="pyramid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00f2fe" />
        <stop offset="100%" stop-color="#b624ff" />
      </linearGradient>
    </defs>
  `;

  levels.forEach(lvl => {
    const isActive = lvl.index === activeLevelIndex;
    svgHtml += `
      <polygon class="pyramid-polygon ${isActive ? 'active' : ''}" points="${lvl.points}" />
      <text class="pyramid-text ${isActive ? 'active-text' : ''}" x="100" y="${(lvl.index * 32) + 32}">${lvl.label}</text>
    `;
  });

  pyramid.innerHTML = svgHtml;

  const scoreBadge = document.getElementById("profile-sensitivity-badge");
  if (scoreBadge) {
    scoreBadge.innerHTML = `유행 지표 민감도: <strong style="color:#00f2fe">${percentage}</strong> (${rankName})`;
  }
}

// Navigation Tabs
function navigateTo(screenId) {
  const isCurrentlyHome = document.getElementById("screen-home").classList.contains("active");
  
  if (screenId === "home" && isCurrentlyHome) {
    const viewport = document.getElementById("app-viewport");
    if (viewport) {
      viewport.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  
  const targetScreen = document.getElementById(`screen-${screenId}`);
  const targetNav = document.querySelector(`.nav-item[data-screen="${screenId}"]`);
  
  if (targetScreen) targetScreen.classList.add("active");
  if (targetNav) targetNav.classList.add("active");

  if (screenId === "home") {
    renderTrendFeed();
  } else if (screenId === "search") {
    renderAlgoFeeds();
    renderTopSearchKeywords();
    renderRecentSearches();
  } else if (screenId === "avatar") {
    renderAvatarShop();
    updateAvatarDisplays();
  } else if (screenId === "profile") {
    renderProfileView();
  }
}

// --- 2.5D Kitsch Cards Configuration ---
const kitschCardsData = [
  { theme: "tree", tag: "Tiktok Hot 🌳", title: "카더가든 - 나무 챌린지", emoji: "🌳🕺", desc: "2026년 상반기를 휩쓸고 있는 코믹 관절 안무! 잔잔한 나무 노래에 맞춰 일부러 몸치처럼 삐걱거리며 추는 코믹 챌린지.", btnText: "틱톡에서 챌린지 보기 🚀", sourceUrl: "https://www.tiktok.com/tag/나무챌린지" },
  { theme: "yoajung", tag: "Dessert Hit 🍯", title: "요아정 벌집꿀 꿀조합 인증", emoji: "🍯🍦", desc: "상콤한 요거트 아이스크림 위에 바삭한 초코쉘과 달콤 쫀득한 리얼 벌집꿀을 올려 SNS에 인증하는 디저트 트렌드!", btnText: "인스타그램 릴스 확인 📸", sourceUrl: "https://www.instagram.com/explore/tags/요아정/" },
  { theme: "cook", tag: "Chef Meme 🍳", title: "최강록 '이븐(Even)하게 구워졌네요'", emoji: "🍳👨‍🍳", desc: "최강록 셰프의 시그니처 심사평! 특유의 눈 감고 안경을 치켜올리는 말투를 흉내 내는 상황극이자 2026 독보적 유머 밈.", btnText: "유튜브 숏츠 더빙 감상 🎬", sourceUrl: "https://www.youtube.com/results?search_query=최강록+이븐하게" },
  { theme: "dubai", tag: "Choc Wave 🍫", title: "두바이 초콜릿 ASMR 뽀개기", emoji: "🍫🎧", desc: "카다이프 면을 고소한 피스타치오 크림과 볶아 초콜릿 안에 넣은 디저트! 반으로 가를 때 나는 바작바작한 소리 유행.", btnText: "원조 틱톡 챌린지 시청 🎧", sourceUrl: "https://www.tiktok.com/tag/두바이초콜릿" },
  { theme: "citizen", tag: "Family Funny 👨‍💼", title: "아빠는 그냥 시민 챌린지", emoji: "👨‍💼📷", desc: "부모님의 눈부신 리즈 시절을 소개하며 엄마는 공주님처럼 칭송하지만, 아빠 차례에선 단호하게 '그냥 시민'이라고 답하는 유머 챌린지!", btnText: "스레드 반응 모아보기 💬", sourceUrl: "https://www.threads.net/search?q=아빠는그냥시민" },
  { theme: "tree", tag: "Future Tech 🧠", title: "뇌파 텔레파시 메신저 챌린지", emoji: "🧠📱", desc: "생각만으로 상대방에게 메세지를 보낼 수 있는 가상의 2.5D 헤드기어를 머리에 쓰고, 엉뚱한 생각을 보낸 척 연출하는 유머 챌린지!", btnText: "가상 필터 체험하기 🔮", sourceUrl: "https://www.youtube.com/results?search_query=뇌파+챌린지" },
  { theme: "yoajung", tag: "Y2K Retro 📸", title: "눈물 셀카 2.0 세이클럽 리턴", emoji: "😢🤳", desc: "2000년대 감성 미니홈피의 눈물 짤을 2026년식 초고화질 슬로우 모션 필터로 리메이크하여 오글거리는 대사와 함께 올리는 밈.", btnText: "Y2K 피드 구경하기 🎞️", sourceUrl: "https://www.instagram.com/explore/tags/Y2K감성" },
  { theme: "cook", tag: "Pet Trend 🪨", title: "반려돌 고기 에이징 온실 챌린지", emoji: "🪨🥩", desc: "반려 돌멩이에게 최고급 한우를 에이징해 대접하고, 돌멩이가 맛있게 식사하는 척 스톱모션 애니메이션으로 연출한 괴짜 펫 밈.", btnText: "괴짜 숏폼 영상 감상 🪨", sourceUrl: "https://www.tiktok.com/tag/반려돌" },
  { theme: "dubai", tag: "Office Life 🐟", title: "책상 위 스마트 어항 감성 브이로그", emoji: "🐟💻", desc: "사무실 데스크에 미니 아쿠아리움을 설치하고 스마트 워터펌프 물소리로 업무 집중력을 올리는 키치한 오피스 테리어 영상.", btnText: "데스크테리어 룩북 💻", sourceUrl: "https://www.instagram.com/explore/tags/데스크테리어" },
  { theme: "citizen", tag: "Cyber Gear 🕶️", title: "네온 사이버 고글 챌린지", emoji: "🕶️⚡", desc: "어두운 밤거리를 배경으로 눈이 시리도록 밝은 발광 네온 안경을 쓰고 웅장한 테크노 비트에 맞춰 줌인 아웃 편집을 뽐내는 댄스.", btnText: "사이버펑크 안무 시청 ⚡", sourceUrl: "https://www.tiktok.com/tag/네온고글" },
  { theme: "tree", tag: "Comedy Dance 🦡", title: "양세형 - 시시시 시라소니 코믹 안무", emoji: "🦡🕺", desc: "양세형의 맹수 시라소니 흉내 코믹 모션 안무! 손가락을 할퀴는 듯 털며 까불거리는 스텝으로 좌중을 폭소케 하는 대세 드립.", btnText: "코믹 스텝 따라하기 🕺", sourceUrl: "https://www.youtube.com/results?search_query=시라소니+챌린지" },
  { theme: "yoajung", tag: "Cat Meme 🐱", title: "꽁꽁 얼어붙은 한강 위 고양이 댄스", emoji: "🐱❄️", desc: "뉴스의 시그니처 멘트에 맞춰 뚱뚱한 고양이가 절도 있게 걸어 다니는 짤방 댄스! 오토튠 리믹스 음원과 환상적인 조합.", btnText: "고양이 걷기 챌린지 🐾", sourceUrl: "https://www.youtube.com/results?search_query=꽁꽁고양이" },
  { theme: "cook", tag: "Sweet Fire 🍡", title: "선배 마음에 탕탕 후루후루 댄스", emoji: "🍡🔫", desc: "선배의 심장에 달콤한 탕후루 총을 탕탕 쏘아 저격하는 마성의 중독성 숏폼 안무! 누적 조회수 수억 뷰를 돌파한 전설의 밈.", btnText: "탕탕 후루후루 챌린지 🍡", sourceUrl: "https://www.tiktok.com/tag/마라탕후루" },
  { theme: "dubai", tag: "Sora AI 🛸", title: "소라 AI 우주 도시 여행기", emoji: "🛸🪐", desc: "텍스트 한 줄로 우주 정거장 복도를 탐험하는 시네마틱 가상 영상을 제작해 올리고 미래 기술의 경이로움을 토론하는 테크 포스트.", btnText: "Sora 생성 비디오 감상 🛸", sourceUrl: "https://www.youtube.com/results?search_query=sora+ai" },
  { theme: "citizen", tag: "MR Fit 🏋️", title: "애플 비전 프로 2 입고 스쿼트 100개", emoji: "🏋️👓", desc: "공간 컴퓨터 글래스를 쓴 상태로 가상의 PT 강사와 눈을 맞추며 땀방울을 흘리는 리얼 피지컬 증강현실 운동 챌린지.", btnText: "비전프로 운동기 🏋️", sourceUrl: "https://x.com/search?q=vision+pro" },
  { theme: "tree", tag: "Spicy Food 🌶️", title: "민트초코 고수 치즈 불닭 볶음면", emoji: "🌶️🧀", desc: "도저히 섞일 수 없는 맛의 조합! 민트초코 소스에 향긋한 고수를 듬뿍 얹어 먹고 평화로운 표정 리액션을 보여주는 지옥의 먹방.", btnText: "불지옥 먹방 구경 🌶️", sourceUrl: "https://www.youtube.com/results?search_query=불닭챌린지" },
  { theme: "yoajung", tag: "Y2K High 🎒", title: "부캐 황은정 세이클럽 얼짱 시절 재현", emoji: "🎒🛹", desc: "패딩 점퍼에 깻잎머리, 폴더폰 키보드 타자 소리로 2000년대 중학생들의 하교 시간 일상을 완벽 재현해 낸 스케치 코미디.", btnText: "은정이 싸이월드 가기 🎒", sourceUrl: "https://www.youtube.com/results?search_query=사내뷰공업" },
  { theme: "cook", tag: "Star Pick 💎", title: "홍석천의 보석함 꽃미남 습격", emoji: "💎✨", desc: "홍석천이 발굴해 내는 신인 남배우들의 보석 같은 비주얼과 센스 넘치는 주접 멘트로 매주 폭발적인 화제를 모으는 예능.", btnText: "이번 주 보석 감상 💎", sourceUrl: "https://www.youtube.com/results?search_query=보석함" },
  { theme: "dubai", tag: "Survival UDT 🧗", title: "덱스 피지컬 UDT 오지 레펠 챌린지", emoji: "🧗🔥", desc: "오지 계곡 절벽에서 레펠로 하강한 뒤, 야외 차가운 계곡물 입수와 함께 UDT 시그니처 훈련 자세로 마무리하는 쿨앤시크 챌린지.", btnText: "덱스 레펠 하강 보기 🧗", sourceUrl: "https://www.youtube.com/results?search_query=덱스" },
  { theme: "citizen", tag: "South Pole 🐧", title: "빠니보틀 남극 세종과학기지 브이로그", emoji: "🐧❄️", desc: "인도 기차 여행을 넘어 지구의 끝 남극 기지까지 날아가서 펭귄들과 교감하고 극한 환경의 대원 일상을 취재하는 탐험 롱폼.", btnText: "남극 탐험 비디오 🐧", sourceUrl: "https://www.youtube.com/results?search_query=빠니보틀" },
  { theme: "tree", tag: "Siberian Food 🐻", title: "곽튜브 영하 40도 야외 횡단 열차 컵라면", emoji: "🐻🍜", desc: "러시아 시베리아 벌판 횡단 열차의 꽁꽁 얼어붙은 야외 정차역에서, 뜨거운 컵라면 면발을 공중에 띄워 3초 만에 얼리는 엽기 먹방.", btnText: "시베리아 열차 먹방 🍜", sourceUrl: "https://www.youtube.com/results?search_query=곽튜브" },
  { theme: "yoajung", tag: "Calm Down 📜", title: "침착맨 삼국지 오토튠 랩 리믹스", emoji: "📜🎙️", desc: "삼국지 도원결의 에피소드를 침착맨 특유의 차분하면서도 킹받는 말투에 웅장한 힙합 비트와 오토튠을 입혀 탄생한 중독적 리믹스.", btnText: "오토튠 리믹스 청취 🎙️", sourceUrl: "https://www.youtube.com/results?search_query=침착맨+리믹스" },
  { theme: "cook", tag: "Minimal fashion 🧥", title: "주우재 시티보이 겨울 패션 하울", emoji: "🧥👞", desc: "오버사이즈 바람막이와 카고 팬츠, 청키한 로퍼를 매치해 2026 겨울 스트릿 패션을 선도하는 미니멀 시티 룩 가이드.", btnText: "주우재 패션 룩북 🧥", sourceUrl: "https://www.youtube.com/results?search_query=주우재+룩북" },
  { theme: "dubai", tag: "Studying hard 🎓", title: "미미미누 재수생 동기부여 밀착 카메라", emoji: "🎓😢", desc: "대입 입시 분석 1인자 미미미누가 하루 14시간 열공하는 N수생들의 헬스터디 독서실 현장을 방문해 팩트 폭행을 선사하는 롱폼.", btnText: "헬스터디 눈물 훔치기 🎓", sourceUrl: "https://www.youtube.com/results?search_query=미미미누" },
  { theme: "citizen", tag: "Sketch Comedy 🚗", title: "숏박스 장기연애 드라이브 현실 콩트", emoji: "🚗💬", desc: "연애 7년 차 커플이 고속도로 드라이브 중 단 한마디 대화도 없이 라디오 볼륨 조절 눈치 싸움만으로 리얼 공감을 자아내는 코미디.", btnText: "장기연애 상황극 🚗", sourceUrl: "https://www.youtube.com/results?search_query=숏박스" },
  { theme: "tree", tag: "Office Menu ☕", title: "너덜트 회사 점심 아메리카노 통일 눈치 싸움", emoji: "☕💼", desc: "부장님은 뜨거운 차, 대리는 아이스 라떼, 신입사원은 눈치를 보다가 결국 '아이스 아메리카노로 통일하겠다'고 선언하며 벌어지는 직장 유머.", btnText: "아메리카노 통일 ☕", sourceUrl: "https://www.youtube.com/results?search_query=너덜트" },
  { theme: "yoajung", tag: "Sweet Boom 💥", title: "요아정 대왕 초코쉘 압착 폭발 챌린지", emoji: "💥🍨", desc: "엄청난 크기의 둥근 초코쉘을 뜨거운 에스프레소 샷을 부어 쾅 깨뜨려 무너뜨리는 비주얼 폭발 릴스 숏폼 트렌드.", btnText: "초코쉘 브레이크 보기 💥", sourceUrl: "https://www.instagram.com/explore/tags/요아정" },
  { theme: "cook", tag: "Autotune Chef 🎛️", title: "최강록 이븐 오토튠 리믹스 루프", emoji: "🎛️👨‍🍳", desc: "최강록 셰프의 주옥같은 심사평에 묵직한 하우스 테크노 비트와 오토튠 보코더를 얹어 빌보드 급 중독성을 자랑하는 오토튠 믹스.", btnText: "테크노 리믹스 댄스 🎛️", sourceUrl: "https://www.youtube.com/results?search_query=최강록+오토튠" },
  { theme: "dubai", tag: "Keyboard Master ⌨️", title: "67 밈 고속 갈광 키보드 타자 대결", emoji: "⌨️⚡", desc: "Say The Word On Beat 음원에 맞추어 초당 15타의 속도로 기계식 키보드를 광속 타건해 화면에 타이포그래피를 띄우는 챌린지.", btnText: "광속 타건 리플 시청 ⌨️", sourceUrl: "https://www.tiktok.com/tag/67meme" },
  { theme: "citizen", tag: "Walking Robot 🤖", title: "젓가락 워킹 로봇 셔플 걸음", emoji: "🤖👠", desc: "마치 젓가락처럼 일직선으로 곧게 뻗은 긴 다리를 이용해 관절을 꺾으며 기계적인 모션으로 무표정 질주하는 틱톡/릴스 댄스.", btnText: "로봇 워킹 챌린지 🤖", sourceUrl: "https://www.tiktok.com/tag/chopstickwalking" }
];

function renderTrendFeed() {
  renderKitschCards();
}

function renderKitschCards() {
  const container = document.getElementById("kitsch-deck");
  if (!container) return;

  container.innerHTML = kitschCardsData.map((c, idx) => {
    const isEven = (idx % 2 === 0);
    const tilt = isEven ? "-2.2deg" : "2.2deg";
    const style = `transform: rotate(${tilt});`;
    
    // Check if card is bookmarked
    const isBookmarked = state.bookmarkedList.includes(c.title);

    return `
      <div class="kitsch-card" style="${style}" data-theme="${c.theme}" data-card-id="${idx}">
        <div class="kitsch-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <!-- Bookmark star button placed on the left -->
            <button class="kitsch-bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="toggleKitschBookmark(${idx}, event)">
              <svg viewBox="0 0 24 24" class="star-icon">
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
            </button>
            <span class="kitsch-tag">${c.tag}</span>
          </div>
          <span class="kitsch-emoji-sticker">${c.emoji}</span>
        </div>
        <div class="kitsch-card-body">
          <h2 class="kitsch-card-title">${c.title}</h2>
          <p class="kitsch-card-desc">${c.desc}</p>
          <div class="kitsch-card-btn" onclick="openKitschSource('${c.sourceUrl}', event)">
            ${c.btnText}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function toggleKitschBookmark(idx, event) {
  event.stopPropagation();
  const cardData = kitschCardsData[idx % kitschCardsData.length];
  const title = cardData.title;
  
  const isBookmarked = state.bookmarkedList.includes(title);
  if (isBookmarked) {
    state.bookmarkedList = state.bookmarkedList.filter(item => item !== title);
    showToast("즐겨찾기가 해제되었습니다. 💨");
  } else {
    state.bookmarkedList.push(title);
    showToast("즐겨찾는 유행에 기록되었습니다! ⭐");
    
    // Trigger sparkle/burst particles effect
    const btn = event.currentTarget;
    createStarSparkleEffect(btn);
  }
  
  saveState();
  renderKitschCards();
  renderAlgoFeeds();
}

function createStarSparkleEffect(element) {
  const rect = element.getBoundingClientRect();
  const container = document.querySelector(".app-container") || document.body;
  const containerRect = container.getBoundingClientRect();
  
  const originX = rect.left - containerRect.left + rect.width / 2;
  const originY = rect.top - containerRect.top + rect.height / 2;

  // Generate 8 tiny burst stars/circles
  for (let i = 0; i < 10; i++) {
    const p = document.createElement("div");
    p.className = "sparkle-particle";
    p.style.left = `${originX}px`;
    p.style.top = `${originY}px`;
    
    // Random direction and distances
    const angle = Math.random() * Math.PI * 2;
    const distance = 25 + Math.random() * 35;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;
    
    p.style.setProperty("--tx", `${destX}px`);
    p.style.setProperty("--ty", `${destY}px`);
    
    // Randomized background colors (hot-pink, cyan, yellow)
    const colors = ["#ffd700", "#ff007f", "#00ffff", "#39ff14"];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(p);
    
    // Remove element after animation completes
    setTimeout(() => {
      p.remove();
    }, 800);
  }
}

window.toggleKitschBookmark = toggleKitschBookmark;

function openKitschSource(url, event) {
  event.stopPropagation();
  window.open(url, "_blank");
}

window.openKitschSource = openKitschSource;

function renderThemeGuidePanel() {
  const secondary = document.getElementById("secondary-filters-container");
  if (!secondary) return;
  
  const currentTheme = currentActiveFilters.themeInner;
  let text = "";
  if (currentTheme === "감성") {
    text = "🎨 <strong>감성 테마 게시물 활용법:</strong> 나른하고 따뜻한 색감의 브이로그 필터, 캠코더 Y2K 노스텔지어 연출, 또는 편안하게 나만 즐기는 디저트(요아정 등)의 감각적인 단면 컷 연출에 주로 사용됩니다.";
  } else if (currentTheme === "유머") {
    text = "😂 <strong>유머 테마 게시물 활용법:</strong> 상황 극단 더빙, 셰프 어조 흉내(이븐한 익힘 상태 등)의 드립, 반려동물의 엉뚱한 행동 자막 합성 등 유쾌하고 가볍게 웃길 수 있는 소통 포스트에 사용됩니다.";
  } else if (currentTheme === "간지") {
    text = "⚡ <strong>간지 테마 게시물 활용법:</strong> 기하학적 카메라 구도와 로봇 댄스(위플래시 테크노 등), 바작거리는 ASMR 사운드 극대화 컷, 시크한 올블랙 아웃도어 의류 OOTD 연출에 주로 활용됩니다.";
  }

  const guideBox = document.createElement("div");
  guideBox.style.cssText = "background:rgba(0, 242, 254, 0.08); border-left:3px solid var(--accent-cyan); padding:8px 12px; border-radius:8px; font-size:0.75rem; color:#fff; line-height:1.4; margin-bottom:12px;";
  guideBox.innerHTML = text;
  
  secondary.appendChild(guideBox);
}

function getRandomGradient(idx) {
  const colors = [
    "#ff2a85, #b624ff",
    "#00f2fe, #4facfe",
    "#f59e0b, #ef4444",
    "#10b981, #059669",
    "#a855f7, #ec4899"
  ];
  return colors[idx % colors.length];
}



// Earn Gems Popover Modal
function togglePlusModal(show) {
  const modal = document.getElementById("gem-plus-modal");
  if (modal) modal.style.display = show ? "flex" : "none";
}

function claimAttendance() {
  const today = new Date().toDateString();
  if (state.lastAttendance === today) {
    showToast("오늘 출석체크는 완료했습니다. 내일 다시 참여하세요! 📅");
    return;
  }
  state.gems += 100;
  state.lastAttendance = today;
  showToast("출석 체크 보상 +100 💎 지급되었습니다!");
  saveState();
  updateAvatarDisplays();
  togglePlusModal(false);
}

function watchAdSimulator() {
  togglePlusModal(false);
  showToast("광고 로딩 중... 🎬");
  const adOverlay = document.createElement("div");
  adOverlay.style.cssText = "position:absolute; inset:0; background:#050508; z-index:9999; display:flex; flex-direction:column; align-items:center; justify-content:center;";
  adOverlay.innerHTML = `
    <div style="font-family:var(--font-title); font-size:1.25rem; font-weight:800; color:var(--accent-pink); margin-bottom:12px;">바이럴 방지 필터광고 🚫</div>
    <div id="ad-timer" style="font-size:1rem; color:#fff;">광고 시청 중... (4초)</div>
  `;
  document.querySelector(".app-container").appendChild(adOverlay);

  let seconds = 4;
  const interval = setInterval(() => {
    seconds--;
    const timer = document.getElementById("ad-timer");
    if (timer) timer.textContent = `광고 시청 중... (${seconds}초)`;
    if (seconds <= 0) {
      clearInterval(interval);
      adOverlay.remove();
      state.gems += 50;
      showToast("광고 시청 완료! +50 💎");
      saveState();
      updateAvatarDisplays();
    }
  }, 1000);
}

// Likes & Bookmarks
function toggleLike(id) {
  if (state.likedList.includes(id)) {
    state.likedList = state.likedList.filter(item => item !== id);
  } else {
    state.likedList.push(id);
    showToast("좋아요 한 목록에 반영되었습니다! ❤️");
  }
  saveState();
  renderTrendFeed();
  renderAlgoFeeds();
}

function toggleBookmark(id) {
  if (state.bookmarkedList.includes(id)) {
    state.bookmarkedList = state.bookmarkedList.filter(item => item !== id);
  } else {
    state.bookmarkedList.push(id);
    showToast("즐겨찾는 유행에 기록되었습니다! ⭐");
  }
  saveState();
  renderTrendFeed();
  renderAlgoFeeds();
}

// Search and Baemin top 10 keywords grid columns (with 2026-05-26 05:12 AM context)
function renderTopSearchKeywords() {
  const container = document.getElementById("search-top-keywords");
  if (!container) return;

  const kws = window.trendsData.topSearchKeywords;
  
  let html = "";
  for (let i = 0; i < 5; i++) {
    const leftKw = kws[i];
    const rightKw = kws[i + 5];
    const leftUp = i % 2 === 0;
    const rightUp = i % 3 === 0;

    html += `
      <div class="keyword-item" onclick="triggerKeywordSearch('${leftKw}')">
        <div class="keyword-left-block">
          <span class="keyword-num">${i + 1}</span>
          <span style="color:#fff;">${leftKw}</span>
        </div>
        <span class="keyword-trend-tag ${leftUp ? 'up' : 'down'}">${leftUp ? '▲' : '▼'}</span>
      </div>
      <div class="keyword-item" onclick="triggerKeywordSearch('${rightKw}')">
        <div class="keyword-left-block">
          <span class="keyword-num">${i + 6}</span>
          <span style="color:#fff;">${rightKw}</span>
        </div>
        <span class="keyword-trend-tag ${rightUp ? 'up' : 'down'}">${rightUp ? '▲' : '▼'}</span>
      </div>
    `;
  }
  
  container.innerHTML = html;
}

// Recent search terms
function renderRecentSearches() {
  const box = document.getElementById("search-recent-tags");
  if (!box) return;
  
  if (state.recentSearches.length === 0) {
    box.innerHTML = `<span style="font-size:0.68rem; color:var(--text-muted)">최근 검색 기록이 없습니다.</span>`;
    return;
  }

  box.innerHTML = state.recentSearches.map(kw => `
    <span class="recent-tag">
      <span onclick="triggerKeywordSearch('${kw}')">${kw}</span>
      <span class="recent-tag-del" onclick="deleteRecentSearch('${kw}')">×</span>
    </span>
  `).join("");
}

function deleteRecentSearch(kw) {
  state.recentSearches = state.recentSearches.filter(s => s !== kw);
  saveState();
  renderRecentSearches();
}

function clearRecentSearches() {
  state.recentSearches = [];
  saveState();
  renderRecentSearches();
}

// Gemini Chatbot dialog functions
function openAIChatbotModal() {
  document.getElementById("ai-chatbot-modal").style.display = "flex";
  document.getElementById("chat-modal-input-field").focus();
}

function closeAIChatbotModal() {
  document.getElementById("ai-chatbot-modal").style.display = "none";
}

function handleChatModalKey(e) {
  if (e.key === "Enter") submitChatModalQuery();
}

async function submitChatModalQuery() {
  const input = document.getElementById("chat-modal-input-field");
  if (!input || !input.value.trim()) return;

  const query = input.value.trim();
  input.value = "";

  appendModalChatMessage("user", query);

  if (!state.recentSearches.includes(query)) {
    state.recentSearches.unshift(query);
    if (state.recentSearches.length > 5) state.recentSearches.pop();
    saveState();
    renderRecentSearches();
  }

  // Display typing status
  const typingIndicatorId = "typing-" + Date.now();
  appendModalChatMessage("bot", `<div id="${typingIndicatorId}">Gemini AI 생각 중... ⚡</div>`);

  const timeStamp = `<span style="font-size:0.6rem; color:var(--text-muted); display:block; margin-top:2px;">[Gemini 1.5 Flash 실시간 답변]</span>`;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: query }),
    });

    const data = await response.json();
    const indicator = document.getElementById(typingIndicatorId);

    if (data.error) {
      // Fallback if API Key is not set or server fails
      let fallbackText = `[로컬 백엔드 서버 안내]: ${data.error}<br><br><strong>(원격 API 미구성 상태에 따른 AI 간이 시뮬레이션 답변):</strong><br>`;
      const qLower = query.toLowerCase();
      if (qLower.includes("안녕") || qLower.includes("반갑") || qLower.includes("하이")) {
        fallbackText += "안녕하세요! 구글의 Gemini AI입니다. 트렌드 분석뿐만 아니라 과학, 역사, 코딩, 일상 대화 등 무엇이든 편하게 여쭤보세요!";
      } else {
        fallbackText += `질문하신 "${query}"에 대한 트렌드 탐색 안내입니다. 해당 토픽은 최근 SNS와 온라인 커뮤니티에서 키치한 챌린지 및 유행 요소로 뜨겁게 주목받고 있습니다.`;
      }

      if (indicator) {
        indicator.parentElement.innerHTML = `${fallbackText} <span style="font-size:0.6rem; color:var(--text-muted); display:block; margin-top:2px;">[Gemini AI 로컬 가이드 모드]</span>`;
      }
    } else {
      if (indicator) {
        // Safe formatting for linebreaks in markdown response
        const formattedReply = data.reply.replace(/\n/g, '<br>');
        indicator.parentElement.innerHTML = `${formattedReply} ${timeStamp}`;
      }
    }
  } catch (err) {
    console.error("Fetch Gemini API error:", err);
    const indicator = document.getElementById(typingIndicatorId);
    if (indicator) {
      indicator.parentElement.innerHTML = `서버 연결에 실패했습니다. server.js 백엔드 서버가 제대로 켜져 있는지 확인해 주세요. <span style="font-size:0.6rem; color:var(--text-muted); display:block; margin-top:2px;">[연결 에러]</span>`;
    }
  }
}

function appendModalChatMessage(sender, text) {
  const box = document.getElementById("chat-modal-window-box");
  if (!box) return;
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = text;
  box.appendChild(bubble);
  box.scrollTop = box.scrollHeight;
}

function triggerKeywordSearch(kw) {
  openAIChatbotModal();
  const input = document.getElementById("chat-modal-input-field");
  if (input) {
    input.value = kw;
    submitChatModalQuery();
  }
}

// Algorithmic feeds (15 tall cards rendered inside a scrollable grid row, doubled height, no title/source)
function renderAlgoFeeds() {
  const container = document.getElementById("algorithm-cards-row");
  if (!container) return;

  const trends = window.trendsData.trends;
  
  // Duplicate trend items to make a total of 15 vertical cards
  const items = [];
  for (let i = 0; i < 15; i++) {
    items.push(trends[i % trends.length]);
  }

  container.innerHTML = items.map((t, idx) => {
    return `
      <div class="algo-tall-card" style="background: rgba(22, 26, 37, 0.55); border: 1.5px solid var(--panel-border); border-radius: 12px; padding: 6px; display: flex; flex-direction: column; justify-content: space-between; min-height: 200px; text-align: center; transition: all 0.2s ease;">
        <!-- Tall vertical mock image display (Doubled Height: 160px) showing 썸네일 -->
        <div style="height: 160px; border-radius: 8px; background: ${getTrendThumbnail(t.id)}; font-size: 0.72rem; color: #fff; font-weight: 800; text-shadow: 0 1px 2px rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 6px;">
          썸네일
        </div>
        <button class="submit-btn" style="padding: 4px 6px; font-size: 0.58rem; width: 100%; border-radius: 6px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" onclick="triggerKeywordSearch('${t.title.split(' ')[0]}')">${t.title.split(' ')[0]}</button>
      </div>
    `;
  }).join("");
}

function getTrendThumbnail(id) {
  if (id === "dubai-chocolate") return "linear-gradient(to bottom, #4d7c0f, #7c2d12)";
  if (id === "yoajung-custom") return "linear-gradient(to bottom, #ffe8e8, #fbbf24)";
  if (id === "even-cook") return "linear-gradient(to bottom, #1e293b, #ef4444)";
  if (id === "whiplash-techno") return "linear-gradient(to bottom, #a855f7, #1e1b4b)";
  return "linear-gradient(to bottom, #00f2fe, #b624ff)";
}

// Add mouse drag scroll handler to any horizontally scrollable tags element
function setupDragToScroll(element) {
  let isDown = false;
  let startX;
  let scrollLeft;

  element.addEventListener('mousedown', (e) => {
    isDown = true;
    element.classList.add('dragging');
    startX = e.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
  });

  element.addEventListener('mouseleave', () => {
    isDown = false;
    element.classList.remove('dragging');
  });

  element.addEventListener('mouseup', () => {
    isDown = false;
    element.classList.remove('dragging');
  });

  element.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX) * 2.2; // scroll speed multiplier
    element.scrollLeft = scrollLeft - walk;
  });
}



// Home filters
function setHomeFilter(type, value) {
  currentActiveFilters.mainTab = type;

  // Ensure daily, weekly, monthly pills are always displayed
  const dailyPill = document.getElementById("pill-daily");
  const weeklyPill = document.getElementById("pill-weekly");
  const monthlyPill = document.getElementById("pill-monthly");
  if (dailyPill) dailyPill.style.display = "inline-block";
  if (weeklyPill) weeklyPill.style.display = "inline-block";
  if (monthlyPill) monthlyPill.style.display = "inline-block";

  if (type === "chart" && value) {
    currentActiveFilters.subTab = value;
  }

  // Highlight the active top-level subtab
  document.querySelectorAll(".sub-tabs-container .sub-tab").forEach(tab => {
    if (tab.getAttribute("data-type") === type) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Highlight active period pill
  const period = currentActiveFilters.subTab;
  document.querySelectorAll(".melon-pill").forEach(p => {
    const txt = p.textContent.trim();
    if (txt === period || (period === "TOP100" && p.id === "pill-top100")) {
      p.classList.add("active");
    } else {
      if (["TOP100", "일간", "주간", "월간"].includes(txt) || p.id === "pill-top100") {
        p.classList.remove("active");
      }
    }
  });

  const secondaryContainer = document.getElementById("secondary-filters-container");
  if (secondaryContainer) {
    secondaryContainer.innerHTML = "";

    // Generate horizontal button group for the secondary choices
    const btnGroup = document.createElement("div");
    btnGroup.className = "secondary-pills-row";
    btnGroup.style.cssText = "display:flex; gap:6px; overflow-x:auto; padding-bottom:8px; margin-bottom:12px;";

    if (type === "chart") {
      if (value) currentActiveFilters.subTab = value;
      // Secondary buttons for chart are removed to prevent duplicate selectors at the bottom
    } else if (type === "platform") {
      if (value) currentActiveFilters.platformInner = value;
      // Strict order: YouTube, Instagram, TikTok, X, Threads
      const plist = ["YouTube", "Instagram", "TikTok", "X", "Threads"];
      const pnames = {
        "YouTube": "유튜브",
        "Instagram": "인스타그램",
        "TikTok": "틱톡",
        "X": "X",
        "Threads": "Threads"
      };
      btnGroup.innerHTML = plist.map(p => {
        const activeClass = currentActiveFilters.platformInner === p ? "active" : "";
        return `<button class="melon-pill ${activeClass}" onclick="setPlatformInner('${p}')">${pnames[p]}</button>`;
      }).join("");
      secondaryContainer.appendChild(btnGroup);

    } else if (type === "format") {
      if (value) currentActiveFilters.formatInner = value;
      const flist = ["숏폼", "롱폼", "게시물"];
      btnGroup.innerHTML = flist.map(f => {
        const activeClass = currentActiveFilters.formatInner === f ? "active" : "";
        return `<button class="melon-pill ${activeClass}" onclick="setFormatInner('${f}')">${f}</button>`;
      }).join("");
      secondaryContainer.appendChild(btnGroup);

    } else if (type === "theme") {
      if (value) currentActiveFilters.themeInner = value;
      const tlist = ["감성", "유머", "간지"];
      btnGroup.innerHTML = tlist.map(t => {
        const activeClass = currentActiveFilters.themeInner === t ? "active" : "";
        return `<button class="melon-pill ${activeClass}" onclick="setThemeInner('${t}')">${t}</button>`;
      }).join("");
      secondaryContainer.appendChild(btnGroup);

    } else if (type === "era") {
      if (value) currentActiveFilters.eraInner = value;
      const elist = [2026, 2025, 2024, 2023];
      btnGroup.innerHTML = elist.map(e => {
        const activeClass = Number(currentActiveFilters.eraInner) === Number(e) ? "active" : "";
        return `<button class="melon-pill ${activeClass}" onclick="setEraInner(${e})">${e}년</button>`;
      }).join("");
      secondaryContainer.appendChild(btnGroup);
    }
  }

  renderTrendFeed();
}

function setPeriodFilter(period) {
  currentActiveFilters.subTab = period;

  // Highlight active period pill
  document.querySelectorAll(".melon-pill").forEach(p => {
    const txt = p.textContent.trim();
    if (txt === period || (period === "TOP100" && p.id === "pill-top100")) {
      p.classList.add("active");
    } else {
      if (["TOP100", "일간", "주간", "월간"].includes(txt) || p.id === "pill-top100") {
        p.classList.remove("active");
      }
    }
  });

  renderTrendFeed();
}

function setPlatformInner(p) { currentActiveFilters.platformInner = p; setHomeFilter("platform", p); }
function setFormatInner(f) { currentActiveFilters.formatInner = f; setHomeFilter("format", f); }
function setThemeInner(t) { currentActiveFilters.themeInner = t; setHomeFilter("theme", t); }
function setEraInner(e) { currentActiveFilters.eraInner = e; setHomeFilter("era", e); }

let currentFacingMode = "user";

// Camera Simulator
async function startCameraSimulator() {
  const container = document.getElementById("camera-stream-box");
  if (!container) return;

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    loadMockWebcam(container);
    return;
  }

  // Stop any active stream first to release the hardware camera lock
  stopCameraStream();

  try {
    let stream;
    try {
      // Use the active camera direction
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: currentFacingMode } });
    } catch (e) {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
    }
    
    state.cameraPermGranted = true;
    saveState();
    
    container.innerHTML = `<video id="live-video-player" style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0;" autoplay playsinline muted></video>`;
    const player = document.getElementById("live-video-player");
    player.srcObject = stream;
    
    player.setAttribute('autoplay', '');
    player.setAttribute('muted', '');
    player.setAttribute('playsinline', '');
    
    player.play().catch(e => console.warn("Video play error:", e));

    // Initialize swipe gesture listener once
    if (!container.dataset.swipeInitialized) {
      setupCameraSwipeGestures(container);
      container.dataset.swipeInitialized = "true";
    }
  } catch (err) {
    loadMockWebcam(container);
  }
}

function toggleCameraFacing() {
  currentFacingMode = (currentFacingMode === "user") ? "environment" : "user";
  showToast(currentFacingMode === "user" ? "전면 카메라로 전환합니다 🤳" : "후면 카메라로 전환합니다 📸");
  startCameraSimulator();
}

function setupCameraSwipeGestures(container) {
  let touchstartX = 0;
  let touchendX = 0;
  
  container.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  container.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
  }, { passive: true });
  
  function handleGesture() {
    // Detect horizontal swipe of at least 80px
    if (Math.abs(touchendX - touchstartX) > 80) {
      toggleCameraFacing();
    }
  }
}


function loadMockWebcam(container) {
  container.innerHTML = `
    <div class="camera-sim-fallback">
      <span style="font-size:2rem; margin-bottom:10px;">📸</span>
      <div style="font-size:0.75rem; color:var(--text-secondary);">카메라 프레임 구동중</div>
      <div style="font-size:0.6rem; color:var(--text-muted); margin-top:4px;">(목업 가이드 활성화됨)</div>
    </div>
  `;
}

function stopCameraStream() {
  const player = document.getElementById("live-video-player");
  if (player && player.srcObject) {
    player.srcObject.getTracks().forEach(track => track.stop());
    player.srcObject = null;
  }
}

// Tutorial Option Prompt
function requestTutorialOption(category) {
  const confirmLoad = confirm(`유형 제작법 가이드라인과 참고 예시 자료를 로딩하시겠습니까? (인기 참고 영상 포함)`);
  if (confirmLoad) {
    const overlay = document.getElementById("camera-overlay-instructions");
    if (overlay) {
      let txt = "";
      if (category === "숏폼") txt = "위플래시(Whiplash) 테크노 댄스 스텝 가이드<br>1단계: 절도 있게 어깨를 올리고 박자에 맞춰 고개를 꺾으세요";
      if (category === "게시물") txt = "내돈내산 솔직 리뷰 가이드<br>1단계: 영수증 인증 사진을 캡처해 올리세요";
      if (category === "스토리") txt = "요아정 꿀조합 스토리 가이드<br>1단계: 초코쉘을 수저로 깨뜨리는 순간을 줌인 촬영하세요";

      overlay.innerHTML = `<div class="camera-overlay-text">${txt}</div>`;
      overlay.style.display = "flex";
      showToast(`${category} 유행 가이드를 로딩했습니다.`);
    }
  }
}

function toggleTutorial(hide) {
  state.isTutorialHidden = hide;
  saveState();
  const banner = document.getElementById("studio-tutorial-banner");
  if (banner) banner.style.display = hide ? "none" : "block";
  if (hide) showToast("가이드 배너가 꺼졌습니다. 설정(프로필)에서 다시 켤 수 있습니다.");
}

// Creation Studio features - Music, GIF, Photo, Filter controllers
const mockMusicData = [
  { title: "Whiplash - aespa", artist: "에스파", trendInfo: "위플래시 테크노 댄스 챌린지 공식 음원 🔥" },
  { title: "나무 (Tree) - 카더가든", artist: "카더가든", trendInfo: "삐걱거리는 몸치 나무 댄스 배경 음악 🌳" },
  { title: "마라탕후루 - 서이브", artist: "서이브", trendInfo: "선배 마음에 탕탕 후루후루 유행 댄스곡 🍡" },
  { title: "APT. - 로제 & 브루노 마스", artist: "ROSE & Bruno Mars", trendInfo: "글로벌 술게임 아파트 아파트 챌린지 🍻" },
  { title: "Supernova - aespa", artist: "에스파", trendInfo: "사건은 다가와 아 오! 쇠맛 감성 댄스곡 ⚡" }
];

const mockGifsData = [
  { emoji: "😆", name: "최강록 이븐 짤", tag: "이븐" },
  { emoji: "🐱", name: "꽁꽁 한강 고양이", tag: "고양이" },
  { emoji: "🍯", name: "요아정 벌집꿀 폭발", tag: "요아정" },
  { emoji: "🍫", name: "두바이 뽀개기 ASMR", tag: "두바이" },
  { emoji: "🕶️", name: "네온 고글 사이버", tag: "네온" },
  { emoji: "🧸", name: "우는 솜뭉치 2.0", tag: "눈물" }
];

function toggleStudioPopover(type) {
  closeStudioPopovers();
  const popover = document.getElementById(`studio-popover-${type}`);
  if (popover) {
    popover.style.display = "block";
    if (type === "music") {
      renderStudioMusicList(mockMusicData);
    } else if (type === "gif") {
      renderStudioGifGrid(mockGifsData);
    }
  }
}

function closeStudioPopovers() {
  document.querySelectorAll(".studio-popover").forEach(p => p.style.display = "none");
}

function renderStudioMusicList(songs) {
  const container = document.getElementById("studio-music-list");
  if (!container) return;
  
  container.innerHTML = songs.map(s => `
    <div style="background:rgba(255,255,255,0.04); border:1px solid var(--panel-border); border-radius:10px; padding:6px 10px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="selectStudioMusic('${s.title}')">
      <div>
        <div style="font-size:0.75rem; font-weight:700; color:#fff;">${s.title}</div>
        <div style="font-size:0.58rem; color:var(--text-muted);">${s.trendInfo}</div>
      </div>
      <span style="font-size:0.65rem; color:var(--accent-cyan);">[선택]</span>
    </div>
  `).join("");
}

function filterStudioMusic(query) {
  const q = query.toLowerCase();
  const filtered = mockMusicData.filter(s => s.title.toLowerCase().includes(q) || s.trendInfo.toLowerCase().includes(q));
  renderStudioMusicList(filtered);
}


function renderStudioGifGrid(gifs) {
  const grid = document.getElementById("studio-gif-grid");
  if (!grid) return;

  grid.innerHTML = gifs.map(g => `
    <div style="background:rgba(255,255,255,0.04); border:1.5px dashed var(--panel-border); border-radius:8px; padding:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; min-height:60px;" onclick="selectStudioGif('${g.name}')">
      <div style="font-size:1.4rem; margin-bottom:2px;">${g.emoji}</div>
      <div style="font-size:0.55rem; color:var(--text-secondary); text-align:center; font-weight:700; overflow:hidden; text-overflow:ellipsis; width:100%; white-space:nowrap;">${g.name}</div>
    </div>
  `).join("");
}

function filterStudioGifs(query) {
  const q = query.toLowerCase();
  const filtered = mockGifsData.filter(g => g.name.toLowerCase().includes(q) || g.tag.toLowerCase().includes(q));
  renderStudioGifGrid(filtered);
}

// Real HTML5 Audio element for active streaming music files
let studioAudioPlayer = null;

const trackUrls = {
  "Whiplash": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Feral_Glint_-_01_-_Feral_Glint.mp3", // Energetic retro synth
  "나무": "https://upload.wikimedia.org/wikipedia/commons/d/df/Mozart_-_Clarinet_Concerto_in_A_major_K._622_-_II._Adagio.mp3", // Calm classic
  "마라탕후루": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Pachabel_Canon_in_D_major.mp3", // Sweet string melody
  "APT.": "https://upload.wikimedia.org/wikipedia/commons/a/af/Tchaikovsky_-_Piano_Concerto_1_-_1st_movement.mp3", // Grand melody
  "Supernova": "https://upload.wikimedia.org/wikipedia/commons/e/ec/J.S._Bach_-_Brandenburg_Concerto_No._3_in_G_major_K._1048_-_I._Allegro.mp3" // Bright baroque
};

async function selectStudioMusic(title) {
  showToast(`배경음악 '${title}' 검색 중... 🎵`);

  if (studioAudioPlayer) {
    studioAudioPlayer.pause();
    studioAudioPlayer = null;
  }

  // Simple clean for search term
  const cleanTitle = title.replace(/\(Tree\)/gi, '').replace(/-/g, ' ').trim();
  let selectedUrl = null;

  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(cleanTitle)}&limit=3&media=music`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      selectedUrl = data.results[0].previewUrl;
    }
  } catch (err) {
    console.error("Failed to query iTunes search API:", err);
  }

  // Fallback to wiki royalty free files if iTunes fails or has no results
  if (!selectedUrl) {
    selectedUrl = trackUrls["Whiplash"];
    for (const key in trackUrls) {
      if (title.includes(key)) {
        selectedUrl = trackUrls[key];
        break;
      }
    }
  }

  try {
    studioAudioPlayer = new Audio(selectedUrl);
    studioAudioPlayer.volume = 0.35; // Keep sound comfortable
    
    // Play the actual audio track
    studioAudioPlayer.play()
      .then(() => {
        showToast(`배경음악 '${title}' (실제 음원) 재생이 시작되었습니다! 🎧`);
      })
      .catch(err => {
        console.error("Audio playback error:", err);
        showToast("오디오 재생 권한이 거부되었습니다. 화면을 클릭해 활성화해 주세요.");
      });
  } catch (e) {
    console.error("Audio error:", e);
    showToast("음원 파일 로드 중 오류가 발생했습니다.");
  }

  closeStudioPopovers();
}

function selectStudioGif(name) {
  const match = mockGifsData.find(g => g.name === name);
  const emoji = match ? match.emoji : "✨";
  
  const canvas = document.getElementById("camera-stream-box");
  if (canvas) {
    // Sticker element container with size handle and delete button
    const container = document.createElement("div");
    container.className = "floating-sticker-wrapper";
    container.style.cssText = `
      position: absolute;
      left: ${30 + Math.random() * 30}%;
      top: ${30 + Math.random() * 30}%;
      width: 60px;
      height: 60px;
      z-index: 12;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      border: 1.5px dashed rgba(255,255,255,0.4);
      user-select: none;
    `;
    
    // 1. Emoji sticker content
    const sticker = document.createElement("div");
    sticker.style.cssText = `
      font-size: 2.5rem;
      pointer-events: none;
      transition: font-size 0.05s ease;
    `;
    sticker.innerHTML = emoji;
    container.appendChild(sticker);
    
    // 2. Delete (X) button top-right
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "×";
    delBtn.style.cssText = `
      position: absolute;
      top: -10px;
      right: -10px;
      background: #ff2a85;
      color: #fff;
      border: 1.5px solid #000;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 0.7rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 15;
    `;
    delBtn.onclick = (e) => {
      e.stopPropagation();
      container.remove();
      showToast("스티커를 삭제했습니다.");
    };
    container.appendChild(delBtn);
    
    // 3. Resize Handle bottom-right
    const resizeHandle = document.createElement("div");
    resizeHandle.style.cssText = `
      position: absolute;
      bottom: -4px;
      right: -4px;
      width: 10px;
      height: 10px;
      background: #00f2fe;
      border: 1.5px solid #000;
      cursor: se-resize;
      z-index: 15;
    `;
    container.appendChild(resizeHandle);
    
    // Drag logic
    let isDragging = false;
    let isResizing = false;
    let startX, startY, startWidth, startHeight, offset = [0, 0];
    
    container.addEventListener('mousedown', (e) => {
      if (e.target === resizeHandle) return;
      isDragging = true;
      const rect = container.getBoundingClientRect();
      offset = [
        e.clientX - rect.left,
        e.clientY - rect.top
      ];
    });
    
    resizeHandle.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(container).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(container).height, 10);
    });
    
    document.addEventListener('mousemove', (e) => {
      const parentRect = canvas.getBoundingClientRect();
      
      if (isDragging) {
        const left = e.clientX - parentRect.left - offset[0];
        const top = e.clientY - parentRect.top - offset[1];
        container.style.left = `${left}px`;
        container.style.top = `${top}px`;
      }
      
      if (isResizing) {
        const width = startWidth + (e.clientX - startX);
        const height = startHeight + (e.clientY - startY);
        const newSize = Math.max(30, Math.min(200, Math.max(width, height))); // Limit size bounds
        
        container.style.width = `${newSize}px`;
        container.style.height = `${newSize}px`;
        sticker.style.fontSize = `${newSize / 1.7}px`;
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
      isResizing = false;
    });
    
    canvas.appendChild(container);
    showToast(`짤 '${name}' 삽입! 드래그 이동 / 우하단 크기 조절 / X 삭제 가능 🖼️`);
  }
  closeStudioPopovers();
}

function triggerStudioPhotoUpload() {
  const input = document.getElementById("studio-photo-file-input");
  if (input) {
    showToast("사용자 사진 보관함 갤러리를 연동합니다 📷");
    input.click();
  }
}

function handleStudioPhotoSelected(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      const container = document.getElementById("camera-stream-box");
      if (container) {
        container.innerHTML = `<img src="${evt.target.result}" style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0; z-index:1;">`;
        showToast("보관함 사진이 카메라 백스크린에 업로드되었습니다!");
      }
    };
    reader.readAsDataURL(file);
  }
}

function toggleStudioFiltersList() {
  const drawer = document.getElementById("studio-filters-drawer");
  if (drawer) {
    const isHidden = drawer.style.display === "none";
    drawer.style.display = isHidden ? "block" : "none";
  }
}

function closeStudioFiltersList() {
  const drawer = document.getElementById("studio-filters-drawer");
  if (drawer) drawer.style.display = "none";
}

function applyStudioFilter(filterType) {
  const container = document.getElementById("camera-stream-box");
  if (!container) return;

  // Clear previous filters
  container.style.filter = "none";
  
  if (filterType === "vhs") {
    container.style.filter = "contrast(1.2) saturate(0.8) hue-rotate(10deg)";
    showToast("Retro VHS 📼 필터가 카메라 렌즈에 적용되었습니다.");
  } else if (filterType === "neon") {
    container.style.filter = "hue-rotate(180deg) saturate(1.8) contrast(1.1)";
    showToast("Cyber Neon ⚡ 필터가 카메라 렌즈에 적용되었습니다.");
  } else if (filterType === "y2k") {
    container.style.filter = "brightness(1.15) contrast(0.95) saturate(1.4)";
    showToast("Y2K Sticker 💖 뽀샤시 감성 필터가 카메라 렌즈에 적용되었습니다.");
  } else if (filterType === "warm") {
    container.style.filter = "sepia(0.4) saturate(1.1) brightness(0.95)";
    showToast("Warm Cozy ☕ 필터가 카메라 렌즈에 적용되었습니다.");
  } else {
    showToast("필터 해제 완료");
  }
  closeStudioFiltersList();
}


let recordingActive = false;
let recordTimer = null;
function toggleRecording() {
  const btn = document.getElementById("studio-record-btn");
  if (!btn) return;

  recordingActive = !recordingActive;
  if (recordingActive) {
    btn.classList.add("recording");
    showToast("가이드에 맞춰 녹화를 시작합니다! 🎥");
    
    recordTimer = setTimeout(() => {
      if (recordingActive) toggleRecording();
    }, 5000);
  } else {
    clearTimeout(recordTimer);
    btn.classList.remove("recording");
    
    const draftId = "draft-" + Date.now();
    const newDraft = {
      id: draftId,
      name: "연습 촬영본 #" + (state.draftsList.length + 1),
      date: new Date().toLocaleDateString(),
      type: "video"
    };
    state.draftsList.push(newDraft);
    saveState();
    
    showToast("임시보관함 저장 완료!");
    renderDraftsList();
  }
}

function renderDraftsList() {
  const list = document.getElementById("creation-drafts-list");
  if (!list) return;

  if (state.draftsList.length === 0) {
    list.innerHTML = `<div style="font-size:0.7rem; color:var(--text-muted); text-align:center;">보관함이 비어 있습니다.</div>`;
    return;
  }

  list.innerHTML = state.draftsList.map(d => `
    <div style="background:rgba(255,255,255,0.02); border:1px solid var(--panel-border); border-radius:12px; padding:6px 10px; display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
      <div>
        <div style="font-size:0.72rem; color:#fff; font-weight:700;">${d.name}</div>
        <div style="font-size:0.6rem; color:var(--text-muted)">${d.date} | 30일 보관</div>
      </div>
      <div style="display:flex; gap:4px;">
        <button class="store-btn" style="padding:2px 6px; font-size:0.65rem; margin:0;" onclick="downloadDraft('${d.id}')">저장</button>
        <button class="store-btn" style="padding:2px 6px; font-size:0.65rem; margin:0; border-color:rgba(255,0,0,0.2); color:#ff5e9f;" onclick="deleteDraft('${d.id}')">삭제</button>
      </div>
    </div>
  `).join("");
}

function downloadDraft(id) {
  showToast("갤러리/사진 앨범 저장을 완료했습니다! 💾");
}

function deleteDraft(id) {
  state.draftsList = state.draftsList.filter(d => d.id !== id);
  saveState();
  showToast("휴지통으로 이동되었습니다 (30일 보관).");
  renderDraftsList();
}

function handlePublishPost(e) {
  e.preventDefault();
  const input = document.getElementById("publish-title");
  if (!input || !input.value.trim()) return;

  const privLikes = document.getElementById("publish-private-likes").checked;
  const privComments = document.getElementById("publish-private-comments").checked;
  const privShares = document.getElementById("publish-private-shares").checked;

  const newPost = {
    id: "post-" + Date.now(),
    title: input.value.trim(),
    platform: "인앱피드",
    date: new Date().toLocaleDateString(),
    likesPrivate: privLikes,
    commentsPrivate: privComments,
    sharesPrivate: privShares
  };

  state.uploadedList.push(newPost);
  state.gems += 150;
  saveState();
  showToast("게시물 업로드 완료! 보상 +150💎");
  input.value = "";
  navigateTo("profile");
}

// Avatar customizer shop controller
function renderAvatarShop() {
  const grid = document.getElementById("avatar-shop-grid");
  if (!grid) return;

  const filtered = shopItems.filter(item => item.category === currentSelectedPartCategory);
  grid.innerHTML = filtered.map(item => {
    const isOwned = state.boughtAvatarItems.includes(item.id);
    const isEquipped = state.avatarConfig[item.category] === item.id;
    const { totalScore } = calculateTrendSensitivity();
    
    let locked = false;
    if (item.unlock === 1 && totalScore < 180) locked = true;
    if (item.unlock === 10 && totalScore < 50) locked = true;

    let label = "";
    if (locked) {
      label = `<span style="font-size:0.6rem; color:var(--text-muted);">🔒 Top ${item.unlock === 1 ? '1%' : '20%'}</span>`;
    } else if (isEquipped) {
      label = `<span class="avatar-item-unlocked">장착됨</span>`;
    } else if (isOwned) {
      label = `<span style="font-size:0.65rem; color:var(--text-muted);">보유중</span>`;
    } else {
      label = `<span class="avatar-item-price">${item.price} 💎</span>`;
    }

    return `
      <div class="avatar-item-card ${isEquipped ? 'equipped' : ''}" onclick="selectShopItem('${item.id}', ${isOwned}, ${locked}, ${item.price}, '${item.category}')">
        <div style="font-size:1.15rem;">${getCategoryEmoji(item.category)}</div>
        <div class="avatar-item-name">${item.name}</div>
        <div>${label}</div>
      </div>
    `;
  }).join("");
}

function selectShopItem(itemId, isOwned, locked, price, category) {
  if (locked) {
    showToast("아바타 아이템이 잠겨있습니다. 민감도 랭킹을 높이세요! 🔒");
    return;
  }
  if (isOwned) {
    state.avatarConfig[category] = itemId;
    saveState();
    updateAvatarDisplays();
    renderAvatarShop();
  } else {
    if (state.gems >= price) {
      state.gems -= price;
      state.boughtAvatarItems.push(itemId);
      state.avatarConfig[category] = itemId;
      showToast(`구매 및 장착 완료!`);
      saveState();
      updateAvatarDisplays();
      renderAvatarShop();
    } else {
      showToast("보석이 모자랍니다! + 버튼을 눌러 보석을 모으세요.");
    }
  }
}

function setShopCategory(cat) {
  currentSelectedPartCategory = cat;
  document.querySelectorAll(".part-tab").forEach(tab => {
    if (tab.getAttribute("data-cat") === cat) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
  renderAvatarShop();
}

function getCategoryEmoji(cat) {
  switch (cat) {
    case "hair": return "💇";
    case "accessory": return "🕶️";
    case "headwear": return "🧢";
    case "back": return "🎒";
    case "eyes": return "👀";
    case "mouth": return "👄";
    case "top": return "👕";
    case "bottom": return "🩳";
    case "hand": return "🍡";
    case "contacts": return "👁️";
    case "shoes": return "👟";
    case "crown": return "👑";
    default: return "🎀";
  }
}

// Profile views
function renderProfileView() {
  const name = document.getElementById("profile-display-name");
  if (name) name.textContent = state.userNickname;

  renderPyramid();
  renderProfileTabContent("my");
}

function renderProfileTabContent(tab) {
  const container = document.getElementById("profile-tab-cards-container");
  if (!container) return;

  document.querySelectorAll(".profile-tab-item").forEach(item => {
    if (item.getAttribute("data-tab") === tab) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  if (tab === "my") {
    if (state.uploadedList.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:0.75rem;">업로드한 콘텐츠가 없습니다.</div>`;
      return;
    }
    container.innerHTML = state.uploadedList.map(p => `
      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--panel-border); border-radius:12px; padding:10px;">
        <div style="font-size:0.7rem; color:var(--accent-cyan); font-weight:700;">내 업로드 | ${p.platform}</div>
        <div style="font-size:0.8rem; font-weight:700; color:#fff; margin:3px 0;">${p.title}</div>
        <div style="font-size:0.65rem; color:var(--text-muted)">설정: 좋아요(${p.likesPrivate ? '비공개' : '공개'}), 댓글(${p.commentsPrivate ? '비공개' : '공개'})</div>
      </div>
    `).join("");
  } else if (tab === "like") {
    const list = window.trendsData.trends.filter(t => state.likedList.includes(t.id));
    if (list.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:0.75rem;">좋아요 한 유행이 없습니다.</div>`;
      return;
    }
    container.innerHTML = list.map(t => renderSimpleProfileRow(t)).join("");
  } else if (tab === "bookmark") {
    // Collect unique bookmarks from bookmarkedList (supports both title strings and IDs)
    const list = [];
    state.bookmarkedList.forEach(bookmark => {
      // Find matching item in kitsch cards data
      const kitschMatch = kitschCardsData.find(k => k.title === bookmark);
      if (kitschMatch) {
        list.push({ title: kitschMatch.title, platform: kitschMatch.tag });
      } else {
        // Fallback to old trendsData
        const trendMatch = window.trendsData.trends.find(t => t.id === bookmark);
        if (trendMatch) {
          list.push({ title: trendMatch.title, platform: trendMatch.platform });
        }
      }
    });

    if (list.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:0.75rem;">즐겨찾기 한 유행이 없습니다.</div>`;
      return;
    }
    container.innerHTML = list.map(t => `
      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--panel-border); border-radius:12px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
        <span style="font-size:0.78rem; font-weight:700; color:#fff">${t.title}</span>
        <span style="font-size:0.65rem; color:var(--accent-cyan);">${t.platform}</span>
      </div>
    `).join("");
  }
}

function renderSimpleProfileRow(t) {
  return `
    <div style="background:rgba(255,255,255,0.02); border:1px solid var(--panel-border); border-radius:12px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:0.78rem; font-weight:700; color:#fff">${t.title}</span>
      <span style="font-size:0.7rem; color:var(--accent-cyan);">${t.platform}</span>
    </div>
  `;
}

// Nickname Modify Modal
function showNicknameModal() {
  const modal = document.getElementById("nickname-modal");
  const cost = document.getElementById("nickname-cost-label");
  if (!modal || !cost) return;

  if (state.isSecondNickChange) {
    cost.innerHTML = `비용: <strong style="color:var(--accent-pink)">100 보석</strong> 필요`;
  } else {
    cost.innerHTML = `비용: <strong style="color:#10b981">첫번째 수정 무료!</strong>`;
  }
  modal.style.display = "flex";
}

function closeNicknameModal() {
  document.getElementById("nickname-modal").style.display = "none";
}

function submitNicknameChange() {
  const input = document.getElementById("nickname-input-field");
  if (!input || !input.value.trim()) return;

  const val = input.value.trim();
  if (state.isSecondNickChange) {
    if (state.gems >= 100) {
      state.gems -= 100;
      state.userNickname = val;
      showToast(`닉네임이 '${val}'(으)로 변경되었습니다. (100💎 사용)`);
      saveState();
      renderProfileView();
      closeNicknameModal();
    } else {
      showToast("보석이 모자랍니다!");
    }
  } else {
    state.userNickname = val;
    state.isSecondNickChange = true;
    showToast(`닉네임 무료 설정 완료: '${val}'`);
    saveState();
    renderProfileView();
    closeNicknameModal();
  }
}

// Friend Modal
function showFriendModal() {
  document.getElementById("friend-modal").style.display = "flex";
}
function closeFriendModal() {
  document.getElementById("friend-modal").style.display = "none";
}
function submitAddFriend() {
  const input = document.getElementById("friend-code-input");
  if (!input || !input.value.trim()) return;
  const name = input.value.trim();
  if (state.friendsList.includes(name)) {
    showToast("이미 친구 목록에 존재합니다!");
    return;
  }
  state.friendsList.push(name);
  saveState();
  showToast(`친구 '${name}' 추가 성공!`);
  closeFriendModal();
}

// Custom photo profile picture upload
function triggerCustomAvatarUpload() {
  showToast("프로필 사진 파일을 탐색합니다.");
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        const wrap = document.getElementById("profile-avatar-render");
        if (wrap) {
          wrap.innerHTML = `<img src="${evt.target.result}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
        }
        showToast("사용자 지정 프로필 설정 완료!");
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
}

function showToast(msg) {
  let toast = document.getElementById("toast-msg");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-msg";
    toast.style.cssText = "position:absolute; bottom:92px; left:50%; transform:translateX(-50%); background:rgba(10,10,15,0.95); border:1px solid var(--accent-cyan); color:#fff; padding:6px 14px; border-radius:10px; font-size:0.74rem; z-index:9999; text-align:center; pointer-events:none; transition:all 0.3s ease;";
    document.querySelector(".app-container").appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  setTimeout(() => { toast.style.opacity = "0"; }, 2000);
}

// Global actions setup
window.addEventListener("DOMContentLoaded", () => {
  loadState();
  setHomeFilter("chart", "TOP100");
  navigateTo("home");

  // Hook search triggers
  const inp = document.getElementById("search-query-input");
  if (inp) {
    inp.addEventListener("keypress", (e) => {
      if (e.key === "Enter") submitSearchQuery();
    });
  }

  // Navigation trackers
  document.querySelector(".nav-item[data-screen='creation']").addEventListener("click", () => {
    startCameraSimulator();
    renderDraftsList();
  });
  document.querySelectorAll(".nav-item:not([data-screen='creation'])").forEach(n => {
    n.addEventListener("click", () => {
      stopCameraStream();
    });
  });

  // Infinite Loop Scroll implementation for Home view
  const viewport = document.getElementById("app-viewport");
  if (viewport) {
    viewport.addEventListener("scroll", () => {
      // Only trigger if Home screen is active
      const isHome = document.getElementById("screen-home").classList.contains("active");
      if (!isHome) return;

      // When reaching near the bottom, duplicate items into the deck container to continue scrolling infinitely
      const scrollPos = viewport.scrollTop + viewport.clientHeight;
      const totalHeight = viewport.scrollHeight;

      if (scrollPos >= totalHeight - 200) {
        appendKitschCardsLoop();
      }
    });
  }

  // Setup drag to scroll for recent searches
  const recentTagsBox = document.getElementById("search-recent-tags");
  if (recentTagsBox) {
    setupDragToScroll(recentTagsBox);
  }
});

let kitschCardLoopIndex = kitschCardsData.length;

function appendKitschCardsLoop() {
  const container = document.getElementById("kitsch-deck");
  if (!container) return;

  // Append next batch of 15 cards from kitschCardsData
  const batchSize = 15;
  let newHtml = "";
  
  for (let i = 0; i < batchSize; i++) {
    const dataIndex = kitschCardLoopIndex % kitschCardsData.length;
    const c = kitschCardsData[dataIndex];
    
    const isEven = (kitschCardLoopIndex % 2 === 0);
    const tilt = isEven ? "-2.2deg" : "2.2deg";
    const style = `transform: rotate(${tilt});`;
    const isBookmarked = state.bookmarkedList.includes(c.title);

    newHtml += `
      <div class="kitsch-card" style="${style}" data-theme="${c.theme}" data-card-id="${kitschCardLoopIndex}">
        <div class="kitsch-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <!-- Bookmark star button placed on the left -->
            <button class="kitsch-bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="toggleKitschBookmark(${kitschCardLoopIndex}, event)">
              <svg viewBox="0 0 24 24" class="star-icon">
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
            </button>
            <span class="kitsch-tag">${c.tag}</span>
          </div>
          <span class="kitsch-emoji-sticker">${c.emoji}</span>
        </div>
        <div class="kitsch-card-body">
          <h2 class="kitsch-card-title">${c.title}</h2>
          <p class="kitsch-card-desc">${c.desc}</p>
          <div class="kitsch-card-btn" onclick="openKitschSource('${c.sourceUrl}', event)">
            ${c.btnText}
          </div>
        </div>
      </div>
    `;
    
    kitschCardLoopIndex++;
  }
  
  container.insertAdjacentHTML('beforeend', newHtml);
}

