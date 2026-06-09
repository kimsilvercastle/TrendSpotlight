// State Management
function getDefaultState(nickname) {
  const code = `TRND-${Math.floor(1000 + Math.random() * 9000)}`;
  return {
    gems: 10000,
    likedList: [],
    bookmarkedList: [],
    uploadedList: [],
    userNickname: nickname || "솜뭉치인형",
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
    isTutorialHidden: true,
    friendsList: [],
    cameraPermGranted: false,
    recentSearches: [],
    draftsList: [],
    friendCode: code
  };
}

let state = getDefaultState("솜뭉치인형");

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
  { id: "None", name: "없음", category: "headwear", price: 0, unlock: 0 },
  { id: "Beanie Hat", name: "스트릿 미니 비니", category: "headwear", price: 70, unlock: 0 },
  { id: "Ribbon Headband", name: "벨벳 레드 머리띠", category: "headwear", price: 100, unlock: 0 },
  { id: "Earphones", name: "헤드폰 소품", category: "headwear", price: 150, unlock: 0 },
  // Back
  { id: "None", name: "없음", category: "back", price: 0, unlock: 0 },
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
  { id: "None", name: "없음", category: "hand", price: 0, unlock: 0 },
  { id: "V Sign Sparkle", name: "반짝 V 포즈", category: "hand", price: 60, unlock: 0 },
  { id: "Bubble Tea", name: "마라탕후루 소품", category: "hand", price: 80, unlock: 0 },
  { id: "Holding Mic", name: "골드 핸드 마이크", category: "hand", price: 160, unlock: 10 },
  // Contacts
  { id: "None", name: "없음", category: "contacts", price: 0, unlock: 0 },
  { id: "Standard Gray", name: "블랙 단추 단반사", category: "contacts", price: 0, unlock: 0 },
  { id: "Blue Ring", name: "오션 블루 렌즈", category: "contacts", price: 50, unlock: 0 },
  { id: "Purple Glow", name: "갤럭시 퍼플 렌즈", category: "contacts", price: 100, unlock: 0 },
  { id: "Cat Eye Gold", name: "자개 골드 오드아이", category: "contacts", price: 170, unlock: 10 },
  // Shoes
  { id: "None", name: "없음", category: "shoes", price: 0, unlock: 0 },
  { id: "Chunky Boots", name: "어글리 청키 워커", category: "shoes", price: 110, unlock: 0 },
  { id: "High Heels Red", name: "레드 미니 힐", category: "shoes", price: 160, unlock: 10 },
  // Crown
  { id: "None", name: "없음", category: "crown", price: 0, unlock: 0 },
  { id: "Golden Crown", name: "미니 황금 왕관", category: "crown", price: 500, unlock: 1 },
  { id: "Ice Tiara", name: "얼음꽃 티아라", category: "crown", price: 360, unlock: 10 },
  { id: "Flower Wreath", name: "봄꽃 머리 화관", category: "crown", price: 130, unlock: 0 }
];

function loadState() {
  if (currentUser && currentUser.email) {
    const saved = localStorage.getItem("trend_spotlight_state_" + currentUser.email);
    if (saved) {
      try {
        state = { ...getDefaultState(currentUser.nickname), ...JSON.parse(saved) };
      } catch (e) {
        console.error("Error loading state", e);
        state = getDefaultState(currentUser.nickname);
      }
    } else {
      state = getDefaultState(currentUser.nickname);
      saveState();
    }
  } else {
    state = getDefaultState("솜뭉치인형");
  }
  updateGemBadge();
}

function saveState() {
  if (currentUser && currentUser.email) {
    localStorage.setItem("trend_spotlight_state_" + currentUser.email, JSON.stringify(state));
  }
  updateGemBadge();
}

function updateGemBadge() {
  const badges = document.querySelectorAll(".gem-count-text");
  badges.forEach(b => { b.textContent = state.gems; });
}

// SVG Generator (Super Cute Fluffy Plushie Doll Design - Front and Back 2.5D Support & Seamless Joint Connections)
function generateAvatarSVG(config, isBack = false) {
  const skinColor = "#ffebdb"; // Fluffy soft fabric tone
  const outlineColor = "#ff7da7"; // Main warm outline for cozy kitsch theme
  const stitchColor = "#fca5a5"; // Light pink stitching color

  // 1. Cozy Fabric Eyes & Blush (FRONT view only)
  let eyeSVG = "";
  let mouthSVG = "";
  let accessoriesSVG = "";

  if (!isBack) {
    eyeSVG = `
      <!-- Fluffy Round Button Eyes -->
      <circle cx="66" cy="85" r="9" fill="#2d221c" stroke="#1b120c" stroke-width="1"/>
      <circle cx="114" cy="85" r="9" fill="#2d221c" stroke="#1b120c" stroke-width="1"/>
      <!-- Cute eye highlight sparkles -->
      <circle cx="63" cy="81" r="3" fill="#ffffff" />
      <circle cx="69" cy="88" r="1" fill="#ffffff" />
      <circle cx="111" cy="81" r="3" fill="#ffffff" />
      <circle cx="117" cy="88" r="1" fill="#ffffff" />
      <!-- Heart-warming Cheek Blush -->
      <ellipse cx="53" cy="95" rx="10" ry="6.5" fill="#ff7da7" opacity="0.65"/>
      <ellipse cx="127" cy="95" rx="10" ry="6.5" fill="#ff7da7" opacity="0.65"/>
    `;

    if (config.eyes === "Sparkling") {
      eyeSVG = `
        <circle cx="66" cy="85" r="9.5" fill="#2d221c" />
        <polygon points="66,79 68,83 72,83 69,85 70,89 66,87 62,89 63,85 60,83 64,83" fill="#fff"/>
        <circle cx="114" cy="85" r="9.5" fill="#2d221c" />
        <polygon points="114,79 116,83 120,83 117,85 118,89 114,87 110,89 111,85 108,83 112,83" fill="#fff"/>
        <ellipse cx="53" cy="95" rx="10" ry="6.5" fill="#ff7da7" opacity="0.65"/>
        <ellipse cx="127" cy="95" rx="10" ry="6.5" fill="#ff7da7" opacity="0.65"/>
      `;
    } else if (config.eyes === "Blinking") {
      eyeSVG = `
        <path d="M58,85 Q66,77 74,85" fill="none" stroke="#2d221c" stroke-width="4" stroke-linecap="round" />
        <circle cx="114" cy="85" r="9" fill="#2d221c" />
        <circle cx="111" cy="81" r="3" fill="#ffffff" />
        <ellipse cx="53" cy="95" rx="10" ry="6.5" fill="#ff7da7" opacity="0.65"/>
        <ellipse cx="127" cy="95" rx="10" ry="6.5" fill="#ff7da7" opacity="0.65"/>
      `;
    } else if (config.eyes === "Cat Eyes") {
      eyeSVG = `
        <ellipse cx="66" cy="85" rx="10" ry="7.5" fill="#b624ff" stroke="#fff" stroke-width="1.2"/>
        <ellipse cx="114" cy="85" rx="10" ry="7.5" fill="#b624ff" stroke="#fff" stroke-width="1.2"/>
        <ellipse cx="66" cy="85" rx="2.5" ry="6.5" fill="#000"/>
        <ellipse cx="114" cy="85" rx="2.5" ry="6.5" fill="#000"/>
        <ellipse cx="53" cy="95" rx="10" ry="6.5" fill="#ff7da7" opacity="0.65"/>
        <ellipse cx="127" cy="95" rx="10" ry="6.5" fill="#ff7da7" opacity="0.65"/>
      `;
    }

    mouthSVG = `<path d="M80,103 Q90,111 100,103" fill="none" stroke="#2d221c" stroke-width="3.5" stroke-linecap="round"/>`;
    if (config.mouth === "Surprised") {
      mouthSVG = `<circle cx="90" cy="107" r="5.5" fill="#c94a4a" stroke="#2d221c" stroke-width="2"/>`;
    } else if (config.mouth === "Cool Smirk") {
      mouthSVG = `<path d="M82,106 Q95,100 98,109" fill="none" stroke="#2d221c" stroke-width="3" stroke-linecap="round"/>`;
    } else if (config.mouth === "Whistling") {
      mouthSVG = `<circle cx="90" cy="106" r="3.5" fill="none" stroke="#2d221c" stroke-width="3"/>`;
    }

    if (config.accessory === "Cool Sunglasses") {
      accessoriesSVG = `
        <polygon points="45,78 78,78 74,94 50,94" fill="#111" opacity="0.9"/>
        <polygon points="102,78 135,78 131,94 107,94" fill="#111" opacity="0.9"/>
        <line x1="78" y1="83" x2="102" y2="83" stroke="#fff" stroke-width="2.5"/>
      `;
    } else if (config.accessory === "Cyber Visor") {
      accessoriesSVG = `<polygon points="36,75 144,73 138,96 42,98" fill="rgba(182, 36, 255, 0.75)" stroke="#ff2a85" stroke-width="2"/>`;
    } else if (config.accessory === "Cute Blush") {
      accessoriesSVG = `
        <ellipse cx="53" cy="95" rx="13" ry="8" fill="#ff4d94" opacity="0.4"/>
        <ellipse cx="127" cy="95" rx="13" ry="8" fill="#ff4d94" opacity="0.4"/>
      `;
    }
  }

  let contactsOverlay = "";
  if (!isBack && config.contacts && config.contacts !== "Standard Gray") {
    let color = "transparent";
    if (config.contacts === "Blue Ring") color = "rgba(0, 242, 254, 0.45)";
    if (config.contacts === "Purple Glow") color = "rgba(182, 36, 255, 0.45)";
    if (config.contacts === "Cat Eye Gold") color = "rgba(254, 218, 0, 0.5)";
    contactsOverlay = `
      <circle cx="66" cy="85" r="8" fill="${color}" />
      <circle cx="114" cy="85" r="8" fill="${color}" />
    `;
  }

  // 2. Hair Styling (Rounded, soft shapes - Front vs Back toggle)
  let hairSVG = "";
  if (config.hair !== "None") {
    switch(config.hair) {
      case "Long Blonde":
        if (isBack) {
          // Long back hair fully draping
          hairSVG = `
            <path d="M42,65 C25,120 30,170 30,205 L150,205 C150,170 155,120 138,65 C122,50 58,50 42,65 Z" fill="#ffd54f" stroke="${outlineColor}" stroke-width="1.5"/>
            <!-- Hair seam stitching -->
            <path d="M90,55 L90,195" fill="none" stroke="${stitchColor}" stroke-width="1.5" stroke-dasharray="3,3" />
          `;
        } else {
          hairSVG = `
            <path d="M42,65 C25,120 30,170 30,205 L48,205 C48,160 58,100 58,75 Z" fill="#ffd54f" stroke="${outlineColor}" stroke-width="1.5"/>
            <path d="M138,65 C155,120 150,170 150,205 L132,205 C132,160 122,100 122,75 Z" fill="#ffd54f" stroke="${outlineColor}" stroke-width="1.5"/>
            <path d="M43,55 Q90,20 137,55 C142,75 130,85 125,70 Q90,56 55,70 C50,85 38,75 43,55 Z" fill="#ffd54f" stroke="${outlineColor}" stroke-width="1.5"/>
          `;
        }
        break;
      case "Curly Brown":
        if (isBack) {
          hairSVG = `
            <path d="M40,55 C30,40 50,25 65,35 C75,20 95,20 105,35 C120,25 140,40 130,55 C145,70 135,95 120,85 C90,70 60,70 50,85 C35,95 25,70 40,55 Z" fill="#8d6e63" stroke="${outlineColor}" stroke-width="1.5"/>
            <path d="M44,60 C44,60 55,80 90,80 C125,80 136,60 136,60 L136,115 L44,115 Z" fill="#8d6e63" stroke="${outlineColor}" stroke-width="1.5"/>
          `;
        } else {
          hairSVG = `
            <path d="M40,55 C30,40 50,25 65,35 C75,20 95,20 105,35 C120,25 140,40 130,55 C145,70 135,95 120,85 C90,70 60,70 50,85 C35,95 25,70 40,55 Z" fill="#8d6e63" stroke="${outlineColor}" stroke-width="1.5"/>
          `;
        }
        break;
      case "Hip Pink":
        if (isBack) {
          hairSVG = `
            <circle cx="36" cy="46" r="16" fill="#ff4081" stroke="${outlineColor}" stroke-width="1.5" />
            <circle cx="144" cy="46" r="16" fill="#ff4081" stroke="${outlineColor}" stroke-width="1.5" />
            <path d="M43,52 Q90,18 137,52 L141,88 C141,88 132,115 90,115 C48,115 39,88 39,88 Z" fill="#ff4081" stroke="${outlineColor}" stroke-width="1.5"/>
          `;
        } else {
          hairSVG = `
            <circle cx="36" cy="46" r="16" fill="#ff4081" stroke="${outlineColor}" stroke-width="1.5" />
            <circle cx="144" cy="46" r="16" fill="#ff4081" stroke="${outlineColor}" stroke-width="1.5" />
            <path d="M43,52 Q90,18 137,52 L141,88 L127,92 L123,68 Q90,62 57,68 L53,92 L39,88 Z" fill="#ff4081" stroke="${outlineColor}" stroke-width="1.5"/>
          `;
        }
        break;
      default: // Short Black
        if (isBack) {
          hairSVG = `<path d="M44,55 Q90,22 136,55 C142,75 136,115 136,115 L44,115 C44,115 38,75 44,55 Z" fill="#37474f" stroke="${outlineColor}" stroke-width="1.5"/>`;
        } else {
          hairSVG = `<path d="M44,55 Q90,22 136,55 C141,75 128,78 124,70 Q90,52 56,70 C52,78 39,75 44,55 Z" fill="#37474f" stroke="${outlineColor}" stroke-width="1.5"/>`;
        }
    }
  }

  // 3. Outfit / Clothing Overlays
  let topSVG = "";
  if (config.top && config.top !== "None") {
    if(config.top === "Hoodie Grey") {
      topSVG = `
        <path d="M55,134 C55,134 50,185 60,192 C70,196 110,196 120,192 C130,185 125,134 125,134 Z" fill="#90a4ae" stroke="${outlineColor}" stroke-width="1.5"/>
        <ellipse cx="90" cy="133" rx="22" ry="7" fill="#78909c" stroke="${outlineColor}" stroke-width="1"/>
      `;
    } else if(config.top === "Leather Jacket") {
      topSVG = `
        <path d="M55,134 C55,134 50,185 60,192 C70,196 110,196 120,192 C130,185 125,134 125,134 Z" fill="#37474f" stroke="${outlineColor}" stroke-width="1.5"/>
        ${!isBack ? `
          <circle cx="82" cy="155" r="2.5" fill="#ffd54f"/>
          <circle cx="82" cy="170" r="2.5" fill="#ffd54f"/>
        ` : ''}
      `;
    } else if(config.top === "Crop Top Neon") {
      topSVG = `
        <path d="M56,134 C56,145 54,162 60,165 H120 C126,162 124,145 124,134 Z" fill="#ff4081" stroke="#00e5ff" stroke-width="1.5"/>
      `;
    }
  }

  let bottomSVG = "";
  if (config.bottom && config.bottom !== "None") {
    if(config.bottom === "Cargo Pants Black") {
      bottomSVG = `
        <path d="M54,185 C54,185 45,232 62,234 H84 L88,195 L92,195 L96,234 H118 C135,232 126,185 126,185 Z" fill="#263238" stroke="${outlineColor}" stroke-width="1.5"/>
      `;
    } else if(config.bottom === "Denim Skirt") {
      bottomSVG = `
        <path d="M55,182 L48,212 H132 L125,182 Z" fill="#1e88e5" stroke="${outlineColor}" stroke-width="1.5"/>
      `;
    } else if(config.bottom === "Wide Slacks") {
      bottomSVG = `
        <path d="M54,185 C54,185 45,236 62,238 H84 L88,198 L92,198 L96,238 H118 C135,236 126,185 126,185 Z" fill="#4f5b66" stroke="${outlineColor}" stroke-width="1.5"/>
      `;
    }
  }

  let shoesSVG = "";
  if (config.shoes && config.shoes !== "None") {
    if(config.shoes === "Chunky Boots") {
      shoesSVG = `
        <path d="M46,232 C42,238 45,248 76,248 C81,248 81,232 46,232 Z" fill="#212121" stroke="${outlineColor}" stroke-width="1"/>
        <path d="M134,232 C138,238 135,248 104,248 C101,248 101,232 134,232 Z" fill="#212121" stroke="${outlineColor}" stroke-width="1"/>
      `;
    } else if(config.shoes === "High Heels Red") {
      shoesSVG = `
        <path d="M46,235 L76,230 L78,246 Z" fill="#e91e63" stroke="${outlineColor}" stroke-width="1"/>
        <path d="M134,235 L104,230 L102,246 Z" fill="#e91e63" stroke="${outlineColor}" stroke-width="1"/>
      `;
    }
  }

  let handSVG = "";
  if (!isBack && config.hand && config.hand !== "None") {
    if(config.hand === "V Sign Sparkle") {
      handSVG = `
        <!-- Cute round paw making V shape -->
        <circle cx="145" cy="165" r="9" fill="${skinColor}" stroke="${outlineColor}" stroke-width="1.5" />
        <circle cx="142" cy="153" r="3.5" fill="${skinColor}" stroke="${outlineColor}" stroke-width="1" />
        <circle cx="150" cy="154" r="3.5" fill="${skinColor}" stroke="${outlineColor}" stroke-width="1" />
      `;
    } else if(config.hand === "Bubble Tea") {
      handSVG = `
        <rect x="135" y="155" width="12" height="18" rx="2" fill="#ffb74d" stroke="${outlineColor}" stroke-width="1.2" />
        <line x1="141" y1="150" x2="141" y2="170" stroke="#757575" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="138" cy="168" r="9" fill="${skinColor}" stroke="${outlineColor}" stroke-width="1.5" />
      `;
    } else if(config.hand === "Holding Mic") {
      handSVG = `
        <line x1="138" y1="156" x2="138" y2="176" stroke="#212121" stroke-width="3.5"/>
        <circle cx="138" cy="151" r="5" fill="#ff4081" stroke="${outlineColor}" stroke-width="1" />
        <circle cx="138" cy="168" r="9" fill="${skinColor}" stroke="${outlineColor}" stroke-width="1.5" />
      `;
    }
  }

  let headwearSVG = "";
  if (config.headwear && config.headwear !== "None") {
    if(config.headwear === "Beanie Hat") {
      headwearSVG = `
        <path d="M50,48 C50,18 130,18 130,48 Z" fill="#1e88e5" stroke="${outlineColor}" stroke-width="1.5" />
        <rect x="42" y="44" width="96" height="12" rx="4" fill="#1565c0" stroke="${outlineColor}" stroke-width="1" />
      `;
    } else if(config.headwear === "Ribbon Headband") {
      headwearSVG = `
        <path d="M46,54 Q90,38 134,54" fill="none" stroke="#ff4081" stroke-width="6" stroke-linecap="round"/>
        <circle cx="90" cy="36" r="8" fill="#ff4081" stroke="${outlineColor}" stroke-width="1"/>
      `;
    } else if(config.headwear === "Earphones") {
      headwearSVG = `
        <path d="M44,68 Q90,20 136,68" fill="none" stroke="#edf2f7" stroke-width="5" stroke-linecap="round"/>
        <rect x="36" y="60" width="12" height="20" rx="4" fill="#37474f" stroke="${outlineColor}" stroke-width="1"/>
        <rect x="132" y="60" width="12" height="20" rx="4" fill="#37474f" stroke="${outlineColor}" stroke-width="1"/>
      `;
    }
  }

  let crownSVG = "";
  if (config.crown && config.crown !== "None") {
    if(config.crown === "Golden Crown") {
      crownSVG = `<polygon points="55,46 65,18 80,32 90,12 100,32 115,18 125,46" fill="#ffd54f" stroke="#f57f17" stroke-width="1.5"/>`;
    } else if(config.crown === "Ice Tiara") {
      crownSVG = `<polygon points="58,46 72,23 90,16 108,23 122,46" fill="rgba(0, 229, 255, 0.8)" stroke="#0097a7" stroke-width="1.5"/>`;
    } else if(config.crown === "Flower Wreath") {
      crownSVG = `
        <ellipse cx="90" cy="44" rx="36" ry="7" fill="none" stroke="#4caf50" stroke-width="4"/>
        <circle cx="68" cy="42" r="4.5" fill="#f44336"/><circle cx="90" cy="40" r="4.5" fill="#e91e63"/><circle cx="112" cy="42" r="4.5" fill="#2196f3"/>
      `;
    }
  }

  let backSVG = "";
  if (config.back && config.back !== "None") {
    if(config.back === "Angel Wings") {
      backSVG = `
        <path d="M38,125 C-5,90 10,45 48,70 C38,85 40,105 48,120 Z" fill="#ffffff" opacity="0.95" stroke="${outlineColor}" stroke-width="1"/>
        <path d="M142,125 C185,90 170,45 132,70 C142,85 140,105 132,120 Z" fill="#ffffff" opacity="0.95" stroke="${outlineColor}" stroke-width="1"/>
      `;
    } else if(config.back === "Neon Boosters") {
      backSVG = `
        <rect x="36" y="112" width="14" height="42" rx="4" fill="#ff2a85" stroke="${outlineColor}" stroke-width="1" filter="drop-shadow(0 0 5px #ff2a85)"/>
        <rect x="130" y="112" width="14" height="42" rx="4" fill="#ff2a85" stroke="${outlineColor}" stroke-width="1" filter="drop-shadow(0 0 5px #ff2a85)"/>
      `;
    } else if(config.back === "School Backpack") {
      backSVG = `<rect x="60" y="132" width="60" height="50" rx="12" fill="#2196f3" stroke="${outlineColor}" stroke-width="2"/>`;
    }
  }

  // Calculate dynamic 3D projection offsets based on rotation Y angle
  // This simulates perspective translation and depth shifts (like eyes, nose, and ears moving across the sphere)
  const angleRad = (avatarRotationY * Math.PI) / 180;
  const depthShiftX = Math.sin(angleRad) * 16;
  const zScale = 0.9 + Math.cos(angleRad) * 0.1;

  // Paws and feet structures (Adjusted coordinate points to seamlessly plug legs diagonally behind the pear torso)
  // Left arm and leg are on the left side, right arm and leg on the right side.
  // Legs now extend diagonally outwards at the hips and connect securely behind the torso.
  const armLeft = `
    <g id="arm-left" transform="translate(${depthShiftX * 0.4}, 0)">
      <path d="M56,138 Q28,154 44,172 Q62,154 58,138" fill="${skinColor}" stroke="${outlineColor}" stroke-width="2.2" />
      <path d="M56,138 Q28,154 44,172" fill="none" stroke="${stitchColor}" stroke-width="1.8" stroke-dasharray="3,2" />
    </g>
  `;
  const armRight = `
    <g id="arm-right" transform="translate(${depthShiftX * 0.4}, 0)">
      <path d="M124,138 Q152,154 136,172 Q118,154 122,138" fill="${skinColor}" stroke="${outlineColor}" stroke-width="2.2" />
      <path d="M124,138 Q152,154 136,172" fill="none" stroke="${stitchColor}" stroke-width="1.8" stroke-dasharray="3,2" />
    </g>
  `;
  // Legs are shifted diagonally to intersect the lower curve of the pear body (M74,188 / M106,188)
  const legLeft = `
    <g id="leg-left" transform="translate(${depthShiftX * 0.3}, 0)">
      <path d="M68,185 Q46,224 64,236 Q84,228 78,185 Z" fill="${skinColor}" stroke="${outlineColor}" stroke-width="2.2" />
      <path d="M68,185 Q46,224 64,236" fill="none" stroke="${stitchColor}" stroke-width="1.8" stroke-dasharray="3,3" />
    </g>
  `;
  const legRight = `
    <g id="leg-right" transform="translate(${depthShiftX * 0.3}, 0)">
      <path d="M112,185 Q134,224 116,236 Q96,228 102,185 Z" fill="${skinColor}" stroke="${outlineColor}" stroke-width="2.2" />
      <path d="M112,185 Q134,224 116,236" fill="none" stroke="${stitchColor}" stroke-width="1.8" stroke-dasharray="3,3" />
    </g>
  `;


  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 260">
      <defs>
        <!-- Soft 3D lighting for fabric texture & cozy aesthetic -->
        <radialGradient id="grad-plush-head" cx="50%" cy="45%" r="55%">
          <stop offset="70%" stop-color="#fff8f2" />
          <stop offset="100%" stop-color="${skinColor}" />
        </radialGradient>
        <radialGradient id="grad-plush-body" cx="50%" cy="40%" r="60%">
          <stop offset="60%" stop-color="#fff8f2" />
          <stop offset="100%" stop-color="${skinColor}" />
        </radialGradient>
      </defs>
      
      <!-- 1. BACK DECORATIONS (If FRONT, render behind the character) -->
      ${!isBack ? backSVG : ''}

      <!-- 2. COZY BEAR EARS (Shifted dynamically to simulate 3D head rotation) -->
      <circle cx="${45 + depthShiftX * 0.25}" cy="85" r="14" fill="${skinColor}" stroke="${outlineColor}" stroke-width="2"/>
      <circle cx="${45 + depthShiftX * 0.25}" cy="85" r="8" fill="#ffccd5" />
      <circle cx="${45 + depthShiftX * 0.25}" cy="85" r="11" fill="none" stroke="${stitchColor}" stroke-width="1.5" stroke-dasharray="3,3" />

      <circle cx="${135 + depthShiftX * 0.25}" cy="85" r="14" fill="${skinColor}" stroke="${outlineColor}" stroke-width="2"/>
      <circle cx="${135 + depthShiftX * 0.25}" cy="85" r="8" fill="#ffccd5" />
      <circle cx="${135 + depthShiftX * 0.25}" cy="85" r="11" fill="none" stroke="${stitchColor}" stroke-width="1.5" stroke-dasharray="3,3" />

      <!-- 3. LIMBS (Rendered BEHIND torso for completely natural, clean joint overlap) -->
      ${armLeft}
      ${armRight}
      ${legLeft}
      ${legRight}

      <!-- 4. TORSO (Seamlessly sits ON TOP of arm/leg connections, shifts slightly for depth) -->
      <g id="torso-group" transform="translate(${depthShiftX * 0.2}, 0)">
        <path d="M58,134 Q90,126 122,134 Q132,185 90,195 Q48,185 58,134 Z" fill="url(#grad-plush-body)" stroke="${outlineColor}" stroke-width="2" />
        ${!isBack ? `<line x1="90" y1="134" x2="90" y2="193" stroke="${stitchColor}" stroke-width="2" stroke-dasharray="4,3" />` : ''}
      </g>

      <!-- 5. CHUBBY PLUSH HEAD (Shifts for parallax volumetric rotation) -->
      <g id="head-group" transform="translate(${depthShiftX * 0.5}, 0)">
        <circle cx="90" cy="92" r="44" fill="url(#grad-plush-head)" stroke="${outlineColor}" stroke-width="2" />
        <circle cx="90" cy="92" r="39" fill="none" stroke="${stitchColor}" stroke-width="1.5" stroke-dasharray="4,4" />
        
        <!-- 6. FACE FEATURES (Only if FRONT, slides across the face sphere) -->
        ${!isBack ? `
          <g id="face-features-group" transform="translate(${depthShiftX * 0.2}, 0)">
            ${eyeSVG}
            ${contactsOverlay}
            ${mouthSVG}
            <!-- Cute Heart Nose -->
            <path d="M86,96 Q90,92 94,96 Q90,102 86,96 Z" fill="#e91e63" stroke="#2d221c" stroke-width="1"/>
          </g>
        ` : ''}
      </g>


      <!-- 7. HAIR / CLOTHES / ACCESSORIES -->
      ${hairSVG}


      <!-- Clothing Layers & Accessories Overlays -->
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

// 3D Engine State
let canvasViewer = {
  scene: null,
  camera: null,
  renderer: null,
  character: null,
  reqId: null
};

let profileViewer = {
  scene: null,
  camera: null,
  renderer: null,
  character: null,
  reqId: null
};

function get3DMaterial(colorVal, roughness = 0.8, metalness = 0.1, transparent = false, opacity = 1.0) {
  return new THREE.MeshStandardMaterial({
    color: colorVal,
    roughness: roughness,
    metalness: metalness,
    transparent: transparent,
    opacity: opacity
  });
}

function createFaceTexture(config) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Clear transparent background
  ctx.clearRect(0, 0, 512, 512);

  // 1. Soft Cheeks Blush
  ctx.save();
  let blushColor = "rgba(255, 125, 167, 0.4)";
  let blushRadius = 50;
  // If Cute Blush accessory is equipped, draw extra bright decorative pink circles and crosses
  if (config.accessory === "Cute Blush") {
    blushColor = "rgba(255, 40, 110, 0.75)";
    blushRadius = 65;
  }
  
  const leftBlushGrad = ctx.createRadialGradient(145, 305, 5, 145, 305, blushRadius);
  leftBlushGrad.addColorStop(0, blushColor);
  leftBlushGrad.addColorStop(1, "rgba(255, 125, 167, 0)");
  ctx.fillStyle = leftBlushGrad;
  ctx.beginPath();
  ctx.arc(145, 305, blushRadius, 0, Math.PI * 2);
  ctx.fill();

  const rightBlushGrad = ctx.createRadialGradient(367, 305, 5, 367, 305, blushRadius);
  rightBlushGrad.addColorStop(0, blushColor);
  rightBlushGrad.addColorStop(1, "rgba(255, 125, 167, 0)");
  ctx.fillStyle = rightBlushGrad;
  ctx.beginPath();
  ctx.arc(367, 305, blushRadius, 0, Math.PI * 2);
  ctx.fill();

  if (config.accessory === "Cute Blush") {
    // Draw cute cross stitch pattern on cheeks
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    
    // Left cheek cross
    ctx.beginPath();
    ctx.moveTo(135, 300); ctx.lineTo(155, 310);
    ctx.moveTo(155, 300); ctx.lineTo(135, 310);
    ctx.stroke();

    // Right cheek cross
    ctx.beginPath();
    ctx.moveTo(357, 300); ctx.lineTo(377, 310);
    ctx.moveTo(377, 300); ctx.lineTo(357, 310);
    ctx.stroke();
  }
  ctx.restore();

  // 2. Eyebrows
  ctx.strokeStyle = "#5a3a29";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  
  // Left eyebrow
  ctx.beginPath();
  ctx.arc(175, 200, 35, Math.PI * 1.15, Math.PI * 1.75);
  ctx.stroke();

  // Right eyebrow
  ctx.beginPath();
  ctx.arc(337, 200, 35, Math.PI * 1.25, Math.PI * 1.85);
  ctx.stroke();

  // 3. Eyes (Left & Right)
  const drawEye = (x, isLeft) => {
    ctx.save();

    if (config.eyes === "Blinking" && isLeft) {
      // Blinking closed eye curve
      ctx.strokeStyle = "#2b1b11";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(x, 240, 38, Math.PI * 0.1, Math.PI * 0.9);
      ctx.stroke();
      
      // Eyelashes
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(x - 28, 252);
      ctx.lineTo(x - 40, 264);
      ctx.moveTo(x + 28, 252);
      ctx.lineTo(x + 40, 264);
      ctx.stroke();
    } else {
      // White of eye (Sclera)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(x, 245, 52, 42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#2b1b11";
      ctx.lineWidth = 5;
      ctx.stroke();

      // Iris (Dynamic colors based on config.contacts)
      let irisColor = "#2b1b11";
      if (config.contacts === "Blue Ring") irisColor = "#00f2fe";
      else if (config.contacts === "Purple Glow") irisColor = "#b624ff";
      else if (config.contacts === "Cat Eye Gold") irisColor = "#feda00";

      ctx.fillStyle = irisColor;
      ctx.beginPath();
      ctx.ellipse(x, 245, 38, 38, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pupil (Cat slit for Cat Eyes, round pupil for other eye shapes)
      ctx.fillStyle = "#160e0a";
      ctx.beginPath();
      if (config.eyes === "Cat Eyes") {
        // Feline vertical slit pupil
        ctx.ellipse(x, 245, 9, 26, 0, 0, Math.PI * 2);
      } else {
        ctx.ellipse(x, 245, 22, 22, 0, 0, Math.PI * 2);
      }
      ctx.fill();

      // Sparkles/Highlights (Glossy doll eyes look)
      ctx.fillStyle = "#ffffff";
      if (config.eyes === "Sparkling") {
        // Draw a distinct cute white heart highlight inside the eye
        ctx.save();
        ctx.translate(x, 245);
        ctx.beginPath();
        // Heart drawing path centered at eye iris
        const drawHeart = (cx, cy, w) => {
          ctx.beginPath();
          ctx.moveTo(cx, cy - w * 0.2);
          ctx.bezierCurveTo(cx - w * 0.5, cy - w * 0.7, cx - w * 0.9, cy - w * 0.3, cx - w * 0.9, cy + w * 0.15);
          ctx.bezierCurveTo(cx - w * 0.9, cy + w * 0.65, cx, cy + w * 1.1, cx, cy + w * 1.25);
          ctx.bezierCurveTo(cx, cy + w * 1.1, cx + w * 0.9, cy + w * 0.65, cx + w * 0.9, cy + w * 0.15);
          ctx.bezierCurveTo(cx + w * 0.9, cy - w * 0.3, cx + w * 0.5, cy - w * 0.7, cx, cy - w * 0.2);
          ctx.closePath();
          ctx.fill();
        };
        // Draw main heart highlight
        drawHeart(-10, -10, 16);
        // Add a small sub-sparkle dot
        ctx.beginPath();
        ctx.arc(14, 14, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(x - 12, 232, 12, 0, Math.PI * 2);
        ctx.arc(x + 12, 255, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Eyelashes & Upper Lid Line (Tilt eyelashes upwards for Cat Eyes to give Feline look)
      ctx.strokeStyle = "#2b1b11";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.beginPath();
      if (config.eyes === "Cat Eyes") {
        // Cat eyes upper wing stroke
        ctx.moveTo(x - 46, 238);
        ctx.quadraticCurveTo(x, 218, x + 46, 230);
        ctx.lineTo(x + 56, 218); // Feline winged eyeliner tip
        ctx.stroke();
      } else {
        ctx.arc(x, 243, 44, Math.PI * 1.12, Math.PI * 1.88);
        ctx.stroke();
      }
    }
    ctx.restore();
  };

  drawEye(175, true);
  drawEye(337, false);

  // 4. Nose (Cute human-doll nose shadow/tip)
  ctx.fillStyle = "#e593a4";
  ctx.beginPath();
  ctx.arc(256, 288, 5, 0, Math.PI * 2);
  ctx.fill();

  // 5. Mouth (Cute pink lips)
  ctx.strokeStyle = "#2b1b11";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.fillStyle = "#ff5d84";

  if (config.mouth === "Surprised") {
    ctx.beginPath();
    ctx.arc(256, 340, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (config.mouth === "Whistling") {
    ctx.beginPath();
    ctx.arc(256, 340, 9, 0, Math.PI * 2);
    ctx.stroke();
  } else if (config.mouth === "Cool Smirk") {
    ctx.beginPath();
    ctx.arc(264, 335, 22, Math.PI * 0.1, Math.PI * 0.8);
    ctx.stroke();
  } else {
    // Normal Smile
    ctx.beginPath();
    ctx.arc(256, 330, 26, Math.PI * 0.1, Math.PI * 0.9);
    ctx.stroke();
  }

  return new THREE.CanvasTexture(canvas);
}

function build3DCharacter(config) {
  const group = new THREE.Group();

  const skinColor = 0xffebdb;
  const skinMat = get3DMaterial(skinColor, 0.9, 0.05);
  const noseMat = get3DMaterial(0xffb3ba, 0.8, 0.1);
  const eyeMat = get3DMaterial(0x2d221c, 0.4, 0.1);
  const highlightMat = get3DMaterial(0xffffff, 0.2, 0.1);
  const blushMat = get3DMaterial(0xff7da7, 0.9, 0.0, true, 0.7);

  // Human Torso - Beautifully unified and smooth single-body flow
  const torsoGroup = new THREE.Group();
  
  // Pelvis / Lower body
  const pelvisGeom = new THREE.SphereGeometry(0.37, 32, 16);
  pelvisGeom.scale(1.02, 0.9, 0.95);
  const pelvis = new THREE.Mesh(pelvisGeom, skinMat);
  pelvis.position.set(0, -0.3, 0);
  torsoGroup.add(pelvis);

  // Chest / Upper body (Smooth shoulder slope)
  const chestGeom = new THREE.SphereGeometry(0.34, 32, 16);
  chestGeom.scale(1.05, 0.85, 0.92);
  const chest = new THREE.Mesh(chestGeom, skinMat);
  chest.position.set(0, 0.12, 0);
  torsoGroup.add(chest);

  // Waist connector (Blends pelvis and chest into a seamless curve)
  const waistGeom = new THREE.CylinderGeometry(0.31, 0.36, 0.42, 32);
  const waist = new THREE.Mesh(waistGeom, skinMat);
  waist.position.set(0, -0.09, 0);
  torsoGroup.add(waist);

  group.add(torsoGroup);

  // Neck (Seamlessly anchored inside the chest)
  const neckGeom = new THREE.CylinderGeometry(0.11, 0.125, 0.28, 16);
  const neck = new THREE.Mesh(neckGeom, skinMat);
  neck.position.set(0, 0.40, 0);
  group.add(neck);

  // Head
  const headGeom = new THREE.SphereGeometry(0.68, 32, 32);
  headGeom.scale(1.05, 1.04, 1.0);
  const head = new THREE.Mesh(headGeom, skinMat);
  head.position.y = 0.98;
  group.add(head);

  // Ears - Positioned slightly further out and forward to sit naturally outside hair
  const leftEarGeom = new THREE.SphereGeometry(0.14, 16, 16);
  leftEarGeom.scale(0.6, 1.0, 0.8);
  const leftEar = new THREE.Mesh(leftEarGeom, skinMat);
  leftEar.position.set(-0.73, 0.98, 0.06);
  leftEar.rotation.y = 0.25;
  group.add(leftEar);

  const rightEar = leftEar.clone();
  rightEar.position.x = 0.73;
  rightEar.rotation.y = -0.25;
  group.add(rightEar);

  // High Fidelity Human Faceplate (Dynamic Canvas Texture mapping)
  const faceTex = createFaceTexture(config);
  faceTex.needsUpdate = true;
  
  // Curved sphere segment mapped exactly on the front face of the head
  const faceGeom = new THREE.SphereGeometry(0.685, 32, 16, Math.PI * 0.15, Math.PI * 0.7, Math.PI * 0.25, Math.PI * 0.5);
  faceGeom.scale(1.052, 1.042, 1.002); // matches head scales
  const faceMat = new THREE.MeshBasicMaterial({
    map: faceTex,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const facePlane = new THREE.Mesh(faceGeom, faceMat);
  facePlane.position.set(0, 0.98, 0.08); // Centered and pushed forward to avoid clipping
  group.add(facePlane);

  // Smooth Human Arms (Seamlessly connected to the torso chest sides)
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.32, 0.12, 0); // Anchored on the left side (-0.32) and moved inward for seamless torso connection
  
  const armGeom = new THREE.CylinderGeometry(0.08, 0.075, 0.65, 16);
  const armMesh = new THREE.Mesh(armGeom, skinMat);
  armMesh.position.y = -0.3;
  leftArmGroup.add(armMesh);
  
  // Shoulder joint cap for smooth connection
  const shoulderGeom = new THREE.SphereGeometry(0.095, 16, 16);
  const leftShoulder = new THREE.Mesh(shoulderGeom, skinMat);
  leftShoulder.position.set(0, 0.02, 0);
  leftArmGroup.add(leftShoulder);
  
  const handGeom = new THREE.SphereGeometry(0.09, 16, 16);
  const leftHand = new THREE.Mesh(handGeom, skinMat);
  leftHand.position.y = -0.62;
  leftArmGroup.add(leftHand);

  leftArmGroup.rotation.z = -0.22; // Rotated outward to prevent clipping through body
  group.add(leftArmGroup);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.32, 0.12, 0); // Anchored on the right side (0.32) and moved inward for seamless torso connection

  const rightArmMesh = armMesh.clone();
  rightArmGroup.add(rightArmMesh);

  // Right shoulder cap
  const rightShoulder = leftShoulder.clone();
  rightArmGroup.add(rightShoulder);

  const rightHand = leftHand.clone();
  rightArmGroup.add(rightHand);

  rightArmGroup.rotation.z = 0.22; // Rotated outward to prevent clipping through body
  group.add(rightArmGroup);

  // Smooth Human Legs (No wooden joint balls)
  const leftLegGroup = new THREE.Group();
  leftLegGroup.position.set(-0.18, -0.38, 0);

  const legGeom = new THREE.CylinderGeometry(0.15, 0.11, 0.8, 16);
  const legMesh = new THREE.Mesh(legGeom, skinMat);
  legMesh.position.y = -0.4;
  leftLegGroup.add(legMesh);

  // Hide skin leg cylinder under full-length pants to prevent any clipping/bleeding
  if (config.bottom === "Cargo Pants Black" || config.bottom === "Wide Slacks") {
    legMesh.visible = false;
  }

  const footGeom = new THREE.BoxGeometry(0.14, 0.1, 0.24);
  const leftFoot = new THREE.Mesh(footGeom, skinMat);
  leftFoot.position.set(0, -0.82, 0.04);
  leftLegGroup.add(leftFoot);

  leftLegGroup.rotation.z = -0.02;
  group.add(leftLegGroup);

  const rightLegGroup = new THREE.Group();
  rightLegGroup.position.set(0.18, -0.38, 0);

  const rightLegMesh = legMesh.clone();
  rightLegGroup.add(rightLegMesh);

  const rightFoot = leftFoot.clone();
  rightLegGroup.add(rightFoot);

  rightLegGroup.rotation.z = 0.02;
  group.add(rightLegGroup);

  // Clothing - Top (Neat and clean fit, no skin gaps)
  if (config.top !== "None") {
    let topColor = 0x3b82f6;
    let isHoodie = false;
    if (config.top === "Hoodie Grey") { topColor = 0x888888; isHoodie = true; }
    else if (config.top === "Leather Jacket") topColor = 0x3a2010;
    else if (config.top === "Crop Top Neon") topColor = 0x39ff14;

    const topMat = get3DMaterial(topColor, 0.8, 0.1);
    
    // Shirt wrapping chest, waist, and overlapping pelvis
    const shirtGeom = new THREE.CylinderGeometry(0.36, 0.38, 0.66, 32);
    const shirt = new THREE.Mesh(shirtGeom, topMat);
    shirt.position.y = -0.05; // Placed to cover body waist and overlap pants perfectly
    group.add(shirt);

    // Neat collar ring
    const collarGeom = new THREE.TorusGeometry(0.14, 0.03, 8, 24);
    const collar = new THREE.Mesh(collarGeom, topMat);
    collar.position.set(0, 0.28, 0);
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    // Sleeves covering upper arms and shoulder joint smoothly
    const sleeveGeom = new THREE.CylinderGeometry(0.105, 0.095, 0.38, 16);
    const leftSleeve = new THREE.Mesh(sleeveGeom, topMat);
    leftSleeve.position.y = -0.19; // Positioned closer to shoulder
    leftArmGroup.add(leftSleeve);

    // Shoulder caps to cover the shoulder joint naturally with clothing
    const shoulderCapGeom = new THREE.SphereGeometry(0.102, 16, 16);
    const leftShoulderCap = new THREE.Mesh(shoulderCapGeom, topMat);
    leftShoulderCap.position.set(0, 0.02, 0);
    leftArmGroup.add(leftShoulderCap);

    const rightSleeve = leftSleeve.clone();
    rightArmGroup.add(rightSleeve);

    const rightShoulderCap = leftShoulderCap.clone();
    rightArmGroup.add(rightShoulderCap);

    if (isHoodie) {
      const hoodGeom = new THREE.SphereGeometry(0.36, 16, 16);
      const hood = new THREE.Mesh(hoodGeom, topMat);
      hood.position.set(0, 0.32, -0.28);
      group.add(hood);
    }
  }

  // Clothing - Bottom (Overlap shirt cleanly)
  if (config.bottom !== "None") {
    let bottomColor = 0x2563eb;
    if (config.bottom === "Cargo Pants Black") bottomColor = 0x111111;
    else if (config.bottom === "Denim Skirt") bottomColor = 0x4f46e5;
    else if (config.bottom === "Wide Slacks") bottomColor = 0xd7ccc8;

    const bottomMat = get3DMaterial(bottomColor, 0.8, 0.1);
    
    // Pants seat covering pelvis and overlapping waist (Adjusted height and size to prevent crotch gaps)
    const seatGeom = new THREE.CylinderGeometry(0.38, 0.34, 0.20, 32);
    const seat = new THREE.Mesh(seatGeom, bottomMat);
    seat.position.y = -0.52; // Lowered further to completely avoid overlapping with the shirt
    group.add(seat);

    // Crotch cover to ensure no skin/gap is shown between legs
    const crotchGeom = new THREE.SphereGeometry(0.24, 16, 16);
    crotchGeom.scale(1.1, 0.8, 1.1);
    const crotchCover = new THREE.Mesh(crotchGeom, bottomMat);
    crotchCover.position.set(0, -0.58, 0); // Lowered to align with the seat mesh
    group.add(crotchCover);

    // Pants leg covering thigh
    if (config.bottom === "Cargo Pants Black" || config.bottom === "Wide Slacks") {
      const trouserLegGeom = new THREE.CylinderGeometry(0.18, 0.155, 0.78, 16);
      const leftTrouser = new THREE.Mesh(trouserLegGeom, bottomMat);
      leftTrouser.position.y = -0.4;
      leftLegGroup.add(leftTrouser);

      const rightTrouser = leftTrouser.clone();
      rightLegGroup.add(rightTrouser);
    } else if (config.bottom === "Denim Skirt") {
      // Skirt geometry wrapping thighs (longer length)
      const skirtGeom = new THREE.CylinderGeometry(0.40, 0.46, 0.46, 32, 1, true);
      const skirt = new THREE.Mesh(skirtGeom, bottomMat);
      skirt.position.y = -0.58; // Lowered to align with the seat mesh
      group.add(skirt);
    } else {
      // Default Base Shorts (longer length for a proper short pants look)
      const trouserLegGeom = new THREE.CylinderGeometry(0.175, 0.155, 0.38, 16);
      const leftTrouser = new THREE.Mesh(trouserLegGeom, bottomMat);
      leftTrouser.position.y = -0.34; // Lowered to align with the seat mesh
      leftLegGroup.add(leftTrouser);

      const rightTrouser = leftTrouser.clone();
      rightLegGroup.add(rightTrouser);
    }
  }

  // Shoes
  let shoeColor = 0xffffff;
  if (config.shoes === "Chunky Boots") shoeColor = 0x222222;
  else if (config.shoes === "High Heels Red") shoeColor = 0xef4444;

  const shoeMat = get3DMaterial(shoeColor, 0.6, 0.2);
  const shoeGeom = new THREE.SphereGeometry(0.14, 16, 16);
  shoeGeom.scale(1.1, 0.85, 1.6);

  const leftShoe = new THREE.Mesh(shoeGeom, shoeMat);
  leftShoe.position.set(0, -1.02, 0.05);
  leftLegGroup.add(leftShoe);

  const rightShoe = leftShoe.clone();
  rightShoe.position.set(0, -1.02, 0.05);
  rightLegGroup.add(rightShoe);

  // Accessories
  if (config.accessory && config.accessory !== "None") {
    if (config.accessory === "Cool Sunglasses") {
      const glassesGroup = new THREE.Group();
      // Positioned on the face as actual spectacles
      glassesGroup.position.set(0, 1.02, 0.64);

      const glassGeom = new THREE.BoxGeometry(0.26, 0.14, 0.02);
      const glassMat = get3DMaterial(0x111111, 0.2, 0.9);
      
      const leftGlass = new THREE.Mesh(glassGeom, glassMat);
      leftGlass.position.x = -0.20;
      glassesGroup.add(leftGlass);

      const rightGlass = leftGlass.clone();
      rightGlass.position.x = 0.20;
      glassesGroup.add(rightGlass);

      const bridgeGeom = new THREE.BoxGeometry(0.16, 0.03, 0.02);
      const bridge = new THREE.Mesh(bridgeGeom, get3DMaterial(0xcccccc, 0.2, 0.9));
      bridge.position.y = 0.02;
      glassesGroup.add(bridge);

      // Spectacle Temples (Glasses sides extending back to the ears)
      const templeGeom = new THREE.BoxGeometry(0.02, 0.02, 0.64);
      const templeMat = get3DMaterial(0x111111, 0.2, 0.9);
      
      const leftTemple = new THREE.Mesh(templeGeom, templeMat);
      leftTemple.position.set(-0.33, 0.02, -0.32);
      glassesGroup.add(leftTemple);

      const rightTemple = leftTemple.clone();
      rightTemple.position.x = 0.33;
      glassesGroup.add(rightTemple);

      group.add(glassesGroup);
    } else if (config.accessory === "Cyber Visor") {
      const visorGeom = new THREE.CylinderGeometry(0.72, 0.72, 0.18, 32, 1, true, -Math.PI*0.4, Math.PI*0.8);
      const visorMat = new THREE.MeshStandardMaterial({
        color: 0xff007f,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      const visor = new THREE.Mesh(visorGeom, visorMat);
      visor.position.set(0, 1.02, 0.04);
      group.add(visor);
    }
  }

  // Hair
  if (config.hair && config.hair !== "None") {
    let hairColor = 0x1a1a1a; // Default to Short Black (Rich black)
    if (config.hair === "Long Blonde") hairColor = 0xffd54f;
    else if (config.hair === "Curly Brown") hairColor = 0x5d4037;
    else if (config.hair === "Hip Pink") hairColor = 0xff3385;

    const hairMat = get3DMaterial(hairColor, 0.9, 0.05);

    if (config.hair === "Short Black") {
      // 1. Short Black (단정한 흑발) - Back and top coverage only, leaving the face area open
      const hairCapGeom = new THREE.SphereGeometry(0.70, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.52);
      hairCapGeom.scale(1.05, 1.05, 1.06);
      const hairCap = new THREE.Mesh(hairCapGeom, hairMat);
      hairCap.position.set(0, 0.98, -0.02);
      hairCap.rotation.x = -0.32; // Rotated back to clear face
      group.add(hairCap);

      // Side burns aligned flush with the head curvature to avoid clipping
      const bangGeom = new THREE.BoxGeometry(0.06, 0.28, 0.12);
      const leftBang = new THREE.Mesh(bangGeom, hairMat);
      leftBang.position.set(-0.64, 0.92, 0.18);
      leftBang.rotation.set(-0.05, 0.25, -0.12);
      group.add(leftBang);

      const rightBang = leftBang.clone();
      rightBang.position.x = 0.52;
      rightBang.rotation.z = 0.1;
      group.add(rightBang);

      // Front bangs ending neatly above eyebrows and eyes
      const centerBang = new THREE.BoxGeometry(0.38, 0.10, 0.1);
      const centerBangMesh = new THREE.Mesh(centerBang, hairMat);
      centerBangMesh.position.set(0, 1.26, 0.48);
      group.add(centerBangMesh);

    } else if (config.hair === "Long Blonde") {
      // 2. Long Blonde (금발 생머리) - Back and top coverage only
      const hairCapGeom = new THREE.SphereGeometry(0.71, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.54);
      hairCapGeom.scale(1.05, 1.08, 1.05);
      const hairCap = new THREE.Mesh(hairCapGeom, hairMat);
      hairCap.position.set(0, 0.98, -0.02);
      hairCap.rotation.x = -0.32; // Rotated back to clear face
      group.add(hairCap);

      // Draping back hair mesh (Full volume)
      const drapeGeom = new THREE.CylinderGeometry(0.68, 0.76, 0.85, 24, 1, true);
      drapeGeom.scale(1.03, 1.0, 0.85);
      const drape = new THREE.Mesh(drapeGeom, hairMat);
      drape.position.set(0, 0.55, -0.18);
      group.add(drape);

      // Side hair shifted outward to ensure cheeks and eyes are visible
      const cheekHairGeom = new THREE.CylinderGeometry(0.12, 0.07, 0.60, 12);
      const leftCheekHair = new THREE.Mesh(cheekHairGeom, hairMat);
      leftCheekHair.position.set(-0.58, 0.75, 0.28);
      leftCheekHair.rotation.z = -0.15;
      group.add(leftCheekHair);

      const rightCheekHair = leftCheekHair.clone();
      rightCheekHair.position.x = 0.58;
      rightCheekHair.rotation.z = 0.15;
      group.add(rightCheekHair);

      // Front bangs ending neatly above eyebrows and eyes
      const frontBangsGeom = new THREE.SphereGeometry(0.24, 16, 16);
      frontBangsGeom.scale(1.3, 0.40, 0.5);
      const frontBangs = new THREE.Mesh(frontBangsGeom, hairMat);
      frontBangs.position.set(0, 1.28, 0.44);
      group.add(frontBangs);

    } else if (config.hair === "Curly Brown") {
      // 3. Curly Brown (브라운 펌헤어) - Back and top coverage only
      const baseScalpGeom = new THREE.SphereGeometry(0.70, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.54);
      baseScalpGeom.scale(1.05, 1.06, 1.05);
      const baseScalp = new THREE.Mesh(baseScalpGeom, hairMat);
      baseScalp.position.set(0, 0.98, -0.02);
      baseScalp.rotation.x = -0.32; // Rotated back to clear face
      group.add(baseScalp);

      // Curls positioned on top, sides, and back (leaving forehead clear)
      const curlGeom = new THREE.SphereGeometry(0.23, 16, 16);
      const curls = [
        [-0.45, 1.36, 0.12], [0.45, 1.36, 0.12],
        [-0.58, 1.15, 0.18], [0.58, 1.15, 0.18],
        [-0.32, 1.50, 0.05], [0.32, 1.50, 0.05],
        [0, 1.52, -0.08], [-0.55, 0.96, 0.05], [0.55, 0.96, 0.05],
        [-0.30, 1.48, -0.15], [0.30, 1.48, -0.15]
      ];
      curls.forEach(pos => {
        const curl = new THREE.Mesh(curlGeom, hairMat);
        curl.position.set(pos[0], pos[1], pos[2]);
        group.add(curl);
      });

      // Front curls ending neatly above eyebrows and eyes
      const frontCurlGeom = new THREE.SphereGeometry(0.15, 16, 16);
      const leftFrontCurl = new THREE.Mesh(frontCurlGeom, hairMat);
      leftFrontCurl.position.set(-0.18, 1.30, 0.40);
      group.add(leftFrontCurl);

      const rightFrontCurl = leftFrontCurl.clone();
      rightFrontCurl.position.x = 0.18;
      group.add(rightFrontCurl);

    } else if (config.hair === "Hip Pink") {
      // 4. Hip Pink (핑크 리본 단발) - Back and top coverage only
      const bobBaseGeom = new THREE.SphereGeometry(0.70, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.54);
      bobBaseGeom.scale(1.04, 1.06, 1.04);
      const bobBase = new THREE.Mesh(bobBaseGeom, hairMat);
      bobBase.position.set(0, 0.99, -0.04);
      bobBase.rotation.x = -0.32; // Rotated back to clear face
      group.add(bobBase);

      // Tucked side flaps
      const flapGeom = new THREE.CylinderGeometry(0.14, 0.08, 0.42, 16);
      const leftFlap = new THREE.Mesh(flapGeom, hairMat);
      leftFlap.position.set(-0.56, 0.85, 0.22);
      leftFlap.rotation.z = -0.15;
      group.add(leftFlap);

      const rightFlap = leftFlap.clone();
      rightFlap.position.x = 0.56;
      rightFlap.rotation.z = 0.15;
      group.add(rightFlap);

      // Front bangs ending neatly above eyebrows and eyes
      const miniBangGeom = new THREE.BoxGeometry(0.22, 0.09, 0.10);
      const leftMini = new THREE.Mesh(miniBangGeom, hairMat);
      leftMini.position.set(-0.16, 1.28, 0.40);
      leftMini.rotation.z = -0.2;
      group.add(leftMini);

      const rightMini = leftMini.clone();
      rightMini.position.x = 0.16;
      rightMini.rotation.z = 0.2;
      group.add(rightMini);

      const bunGeom = new THREE.SphereGeometry(0.18, 16, 16);
      const leftBun = new THREE.Mesh(bunGeom, hairMat);
      leftBun.position.set(-0.62, 1.28, 0.08);
      group.add(leftBun);

      const rightBun = leftBun.clone();
      rightBun.position.x = 0.62;
      group.add(rightBun);
    }
  }

  // Headwear & Crowns
  if (config.headwear && config.headwear !== "None") {
    if (config.headwear === "Beanie Hat") {
      const hatGeom = new THREE.CylinderGeometry(0.3, 0.52, 0.38, 16);
      const hatMat = get3DMaterial(0xff3366, 0.9, 0.05);
      const hat = new THREE.Mesh(hatGeom, hatMat);
      hat.position.set(0, 1.52, 0.04);
      hat.rotation.x = -0.15;
      group.add(hat);

      const pomGeom = new THREE.SphereGeometry(0.09, 12, 12);
      const pom = new THREE.Mesh(pomGeom, get3DMaterial(0xffffff, 0.9, 0));
      pom.position.set(0, 1.73, -0.04);
      group.add(pom);
    } else if (config.headwear === "Ribbon Headband") {
      const headbandGeom = new THREE.TorusGeometry(0.72, 0.04, 8, 32, Math.PI);
      const redMat = get3DMaterial(0xef4444, 0.8, 0.1);
      const band = new THREE.Mesh(headbandGeom, redMat);
      band.position.set(0, 1.06, 0.04);
      band.rotation.x = Math.PI / 2.2;
      group.add(band);

      const ribbonGroup = new THREE.Group();
      ribbonGroup.position.set(0.28, 1.65, 0.08);
      ribbonGroup.rotation.z = -0.3;
      
      const coneGeom = new THREE.ConeGeometry(0.12, 0.22, 4);
      coneGeom.rotateZ(Math.PI / 2);
      
      const leftRibbon = new THREE.Mesh(coneGeom, redMat);
      leftRibbon.position.x = -0.11;
      ribbonGroup.add(leftRibbon);
      
      const rightRibbon = leftRibbon.clone();
      rightRibbon.position.x = 0.11;
      rightRibbon.rotation.y = Math.PI;
      ribbonGroup.add(rightRibbon);
      
      const knot = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), get3DMaterial(0xffffff, 0.8, 0));
      ribbonGroup.add(knot);

      group.add(ribbonGroup);
    } else if (config.headwear === "Earphones") {
      const phoneGroup = new THREE.Group();
      phoneGroup.position.set(0, 0.96, 0.04);
      
      const bandGeom = new THREE.TorusGeometry(0.68, 0.025, 8, 32, Math.PI);
      const blackMat = get3DMaterial(0x111111, 0.4, 0.8);
      const neonPinkMat = get3DMaterial(0xff2a85, 0.3, 0.7);
      
      const band = new THREE.Mesh(bandGeom, blackMat);
      band.rotation.x = Math.PI / 2;
      phoneGroup.add(band);

      const speakerGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.09, 16);
      speakerGeom.rotateZ(Math.PI / 2);
      
      const leftSp = new THREE.Mesh(speakerGeom, blackMat);
      leftSp.position.x = -0.63;
      
      const leftRing = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.02, 8, 16), neonPinkMat);
      leftRing.position.set(-0.68, 0, 0);
      leftRing.rotation.y = Math.PI / 2;
      phoneGroup.add(leftSp);
      phoneGroup.add(leftRing);

      const rightSp = leftSp.clone();
      rightSp.position.x = 0.63;
      const rightRing = leftRing.clone();
      rightRing.position.x = 0.68;
      phoneGroup.add(rightSp);
      phoneGroup.add(rightRing);

      group.add(phoneGroup);
    }
  }

  if (config.crown && config.crown !== "None") {
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 1.56, 0);

    if (config.crown === "Golden Crown") {
      const crownMat = get3DMaterial(0xffd700, 0.2, 0.9);
      const baseGeom = new THREE.CylinderGeometry(0.24, 0.2, 0.12, 16, 1, true);
      const base = new THREE.Mesh(baseGeom, crownMat);
      crownGroup.add(base);

      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const pt = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 4), crownMat);
        pt.position.set(Math.cos(angle) * 0.22, 0.12, Math.sin(angle) * 0.22);
        pt.rotation.y = -angle;
        crownGroup.add(pt);
      }
    } else if (config.crown === "Ice Tiara") {
      const tiaraMat = get3DMaterial(0xa0e0ff, 0.1, 0.9, true, 0.7);
      const tiaraGeom = new THREE.TorusGeometry(0.22, 0.022, 8, 16, Math.PI);
      const tiara = new THREE.Mesh(tiaraGeom, tiaraMat);
      tiara.rotation.x = Math.PI / 2;
      crownGroup.add(tiara);

      for (let i = 0; i < 5; i++) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.11, 4), tiaraMat);
        const angle = (i / 4) * Math.PI - Math.PI/2;
        spike.position.set(Math.sin(angle) * 0.22, 0.06, Math.cos(angle) * 0.04);
        crownGroup.add(spike);
      }
    } else if (config.crown === "Flower Wreath") {
      const greenMat = get3DMaterial(0x4caf50, 0.9, 0.0);
      const flowerMat = get3DMaterial(0xff8bc3, 0.8, 0.0);
      const coreMat = get3DMaterial(0xffeb3b, 0.8, 0.0);

      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.022, 8, 32), greenMat);
      ring.rotation.x = Math.PI / 2;
      crownGroup.add(ring);

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const fl = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), flowerMat);
        fl.position.set(Math.cos(angle) * 0.28, 0.015, Math.sin(angle) * 0.28);
        crownGroup.add(fl);
        
        const core = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), coreMat);
        core.position.set(Math.cos(angle) * 0.28, 0.038, Math.sin(angle) * 0.28);
        crownGroup.add(core);
      }
    }
    group.add(crownGroup);
  }

  // Back items
  if (config.back && config.back !== "None") {
    if (config.back === "Angel Wings") {
      const wingMat = get3DMaterial(0xffffff, 0.9, 0.0);
      const wingGeom = new THREE.BoxGeometry(0.6, 0.22, 0.03);
      
      const leftWing = new THREE.Mesh(wingGeom, wingMat);
      leftWing.position.set(-0.45, 0.0, -0.45);
      leftWing.rotation.set(0.1, -0.3, 0.2);
      group.add(leftWing);

      const rightWing = leftWing.clone();
      rightWing.position.x = 0.45;
      rightWing.rotation.set(0.1, 0.3, -0.2);
      group.add(rightWing);
    } else if (config.back === "Neon Boosters") {
      const packMat = get3DMaterial(0x111111, 0.3, 0.9);
      const neonMat = get3DMaterial(0x00f2fe, 0.2, 0.9);

      const pack = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.26), packMat);
      pack.position.set(0, 0.0, -0.45);
      group.add(pack);

      const thrusterL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.38, 12), neonMat);
      thrusterL.position.set(-0.12, -0.22, -0.6);
      group.add(thrusterL);

      const thrusterR = thrusterL.clone();
      thrusterR.position.x = 0.12;
      group.add(thrusterR);
    } else if (config.back === "School Backpack") {
      const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.42, 0.24), get3DMaterial(0xffeb3b, 0.9, 0.0));
      backpack.position.set(0, 0.0, -0.4);
      group.add(backpack);

      const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 0.06), get3DMaterial(0xff7da7, 0.9, 0.0));
      pocket.position.set(0, -0.09, -0.54);
      group.add(pocket);
    }
  }

  // Hand item
  if (config.hand && config.hand !== "None") {
    if (config.hand === "Bubble Tea") {
      const cupGeom = new THREE.CylinderGeometry(0.08, 0.06, 0.18, 16);
      const bobaMat = get3DMaterial(0xffcc80, 0.5, 0.1);
      const boba = new THREE.Mesh(cupGeom, bobaMat);
      boba.position.set(0.08, -0.42, 0.14);
      
      const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.22, 8), get3DMaterial(0x9c27b0, 0.9, 0));
      straw.position.set(0.08, -0.34, 0.14);
      straw.rotation.z = 0.2;
      
      rightArmGroup.add(boba);
      rightArmGroup.add(straw);
    } else if (config.hand === "Holding Mic") {
      const micGroup = new THREE.Group();
      micGroup.position.set(0.08, -0.38, 0.14);
      micGroup.rotation.x = Math.PI / 3;

      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.16, 8), get3DMaterial(0x222222, 0.8, 0));
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), get3DMaterial(0xffd700, 0.2, 0.9));
      head.position.y = 0.08;

      micGroup.add(handle);
      micGroup.add(head);
      rightArmGroup.add(micGroup);
    } else if (config.hand === "V Sign Sparkle") {
      const sparkleMat = get3DMaterial(0xffeb3b, 0.1, 0.9);
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), sparkleMat);
      star.position.set(0.12, -0.38, 0.15);
      
      rightArmGroup.add(star);
    }
  }

  group.scale.set(0.8, 0.8, 0.8);
  return group;
}

function init3DScene(container, viewer, isProfile = false) {
  if (viewer.reqId) cancelAnimationFrame(viewer.reqId);
  container.innerHTML = "";

  const width = container.clientWidth || (isProfile ? 80 : 320);
  const height = container.clientHeight || (isProfile ? 80 : 280);

  viewer.scene = new THREE.Scene();

  viewer.camera = new THREE.PerspectiveCamera(isProfile ? 40 : 45, width / height, 0.1, 100);
  // Raised camera y to 0.45 to center the head/hair perfectly in the viewport
  viewer.camera.position.set(0, 0.45, isProfile ? 4.5 : 4.6);

  viewer.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  viewer.renderer.setSize(width, height);
  viewer.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(viewer.renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xfff5f0, 0.85);
  viewer.scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
  dirLight.position.set(5, 8, 5);
  viewer.scene.add(dirLight);

  const backLight = new THREE.DirectionalLight(0xffe0d0, 0.45);
  backLight.position.set(-5, 3, -5);
  viewer.scene.add(backLight);

  viewer.character = build3DCharacter(state.avatarConfig);
  viewer.scene.add(viewer.character);

  let time = 0;
  function animate() {
    viewer.reqId = requestAnimationFrame(animate);
    
    time += 0.05;
    if (viewer.character) {
      const breathScale = 1.0 + Math.sin(time) * 0.02;
      viewer.character.scale.set(0.8, 0.8 * breathScale, 0.8);
      viewer.character.position.y = Math.sin(time * 0.7) * 0.03;
      
      // Rotate head smoothly (includes hair/accessories attached to head or at y > 0.7)
      viewer.character.children.forEach(child => {
        if (child.position && child.position.y > 0.7) {
          child.rotation.y = Math.sin(time * 0.5) * 0.05;
        }
      });
    }
    
    viewer.renderer.render(viewer.scene, viewer.camera);
  }
  animate();
}

function updateAvatar3DCharacter() {
  if (canvasViewer.scene && canvasViewer.character) {
    const currentRotY = canvasViewer.character.rotation.y;
    const currentRotX = canvasViewer.character.rotation.x;
    canvasViewer.scene.remove(canvasViewer.character);
    canvasViewer.character = build3DCharacter(state.avatarConfig);
    canvasViewer.character.rotation.y = currentRotY;
    canvasViewer.character.rotation.x = currentRotX;
    canvasViewer.scene.add(canvasViewer.character);
  } else {
    const container = document.getElementById("avatar-display-canvas");
    if (container) {
      init3DScene(container, canvasViewer, false);
    }
  }

  if (profileViewer.scene && profileViewer.character) {
    const currentRotY = profileViewer.character.rotation.y;
    profileViewer.scene.remove(profileViewer.character);
    profileViewer.character = build3DCharacter(state.avatarConfig);
    profileViewer.character.rotation.y = currentRotY;
    profileViewer.scene.add(profileViewer.character);
  } else {
    const profileContainer = document.getElementById("profile-avatar-render");
    if (profileContainer) {
      init3DScene(profileContainer, profileViewer, true);
    }
  }
}

function updateAvatarDisplays() {
  if (typeof THREE !== "undefined") {
    updateAvatar3DCharacter();
    const container = document.getElementById("avatar-display-canvas");
    if (container) {
      setupAvatar3DRotationCue(container);
    }
  } else {
    // Fallback to SVG if Three.js fails to load
    const container = document.getElementById("avatar-display-canvas");
    if (container) {
      container.innerHTML = generateAvatarSVG(state.avatarConfig);
      setupAvatar3DRotationCue(container);
    }
    const profileContainer = document.getElementById("profile-avatar-render");
    if (profileContainer) profileContainer.innerHTML = generateAvatarSVG(state.avatarConfig);
  }
}

function updateAvatarRotation() {
  // Kept for compatibility, actual rotation is handled directly on character object
}

function setupAvatar3DRotationCue(canvas) {
  if (!canvas.querySelector(".rotation-cue")) {
    const cue = document.createElement("div");
    cue.className = "rotation-cue";
    cue.style.cssText = "position:absolute; bottom:10px; right:12px; font-size:0.6rem; color:rgba(255,255,255,0.5); pointer-events:none; background:rgba(0,0,0,0.4); padding:3px 6px; border-radius:6px; display:flex; align-items:center; gap:3px;";
    cue.innerHTML = "🔄 드래그하여 회전";
    canvas.appendChild(cue);
  }
}

function setupAvatar3DRotation() {
  const canvas = document.getElementById("avatar-display-canvas");
  if (!canvas) return;

  if (canvas.dataset.rotationInitialized) return;
  canvas.dataset.rotationInitialized = "true";

  let isDragging = false;
  let previousX = 0;
  let previousY = 0;

  const onStart = (clientX, clientY) => {
    isDragging = true;
    previousX = clientX;
    previousY = clientY;
    canvas.style.cursor = "grabbing";
  };

  const onMove = (clientX, clientY) => {
    if (!isDragging) return;
    const deltaX = clientX - previousX;
    const deltaY = clientY - previousY;
    previousX = clientX;
    previousY = clientY;

    if (canvasViewer.character) {
      canvasViewer.character.rotation.y += deltaX * 0.015;
      canvasViewer.character.rotation.x = Math.max(-0.4, Math.min(0.4, canvasViewer.character.rotation.x + deltaY * 0.01));
    }
  };

  const onEnd = () => {
    isDragging = false;
    canvas.style.cursor = "grab";
  };

  canvas.addEventListener("mousedown", (e) => onStart(e.clientX, e.clientY));
  document.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY));
  document.addEventListener("mouseup", onEnd);

  canvas.addEventListener("touchstart", (e) => {
    onStart(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  document.addEventListener("touchmove", (e) => {
    onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  document.addEventListener("touchend", onEnd);
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
    scoreBadge.innerHTML = `유행 지표 민감도: <strong style="color:#00f2fe">${percentage}</strong>`;
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
    setupAvatar3DRotation();
    
    // Smooth drag horizontal scrolling for categories and items
    const shopGrid = document.getElementById("avatar-shop-grid");
    if (shopGrid) setupDragToScroll(shopGrid);
    const shopTabs = document.getElementById("avatar-shop-tabs");
    if (shopTabs) setupDragToScroll(shopTabs);
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
  appendModalChatMessage("bot", `<div id="${typingIndicatorId}">로컬 AI 분석 중... ⚡</div>`);

  setTimeout(() => {
    const indicator = document.getElementById(typingIndicatorId);
    if (!indicator) return;

    const qLower = query.toLowerCase();
    let reply = "";

    if (qLower.includes("두바이")) {
      reply = "<strong>[🍫 두바이 초콜릿 트렌드]</strong><br>피스타치오 스프레드와 바삭하게 볶은 중동식 카다이프 면을 섞어 채워 넣은 초콜릿입니다. 2026년 SNS 숏폼 채널에서 소리까지 맛있는 'ASMR 초콜릿 깨기' 영상이 바이럴되며 메가 트렌드로 안착했습니다!";
    } else if (qLower.includes("요아정")) {
      reply = "<strong>[🍦 요아정(요거트 아이스크림의 정석) 트렌드]</strong><br>요거트 아이스크림 위에 벌집꿀, 생자몽, 초코쉘 등 본인만의 커스텀 토핑을 얹어 시켜 먹는 유행입니다. 다양한 유명인들이 최애 꿀조합 레시피를 공유하면서 인증 대란을 일으키고 있습니다.";
    } else if (qLower.includes("이븐") || qLower.includes("최강록")) {
      reply = "<strong>[🍳 최강록 이븐하게 익지 않았어요]</strong><br>요리 서바이벌 방송 중 요리사 최강록의 심사평 '고기가 이븐(even)하게 익지 않았어요'에서 유래된 패러디 밈입니다. 미숙하거나 밸런스가 맞지 않는 상황을 키치하고 귀엽게 빗대어 쓸 때 유행하는 문구입니다.";
    } else if (qLower.includes("안녕") || qLower.includes("반갑") || qLower.includes("하이")) {
      reply = "안녕하세요! 트렌드 탐색 챗봇입니다. 두바이초콜릿, 요아정, 최강록 이븐 등 유행 키워드를 저에게 물어보세요!";
    } else {
      reply = `입력하신 "${query}"에 대한 로컬 트렌드 탐색 정보가 아직 등록되지 않았습니다.<br><strong>[추천 검색어]:</strong> 두바이초콜릿, 요아정, 최강록 이븐 밈 등을 검색해 보세요!`;
    }

    if (indicator) {
      indicator.parentElement.innerHTML = `${reply} <span style="font-size:0.6rem; color:var(--text-muted); display:block; margin-top:2px;">[로컬 AI 분석 답변]</span>`;
    }
  }, 600);
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

let currentCameraStream = null;

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
    currentCameraStream = stream;
    
    state.cameraPermGranted = true;
    saveState();
    
    container.innerHTML = `<video id="live-video-player" style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0;" autoplay playsinline muted></video>`;
    const player = document.getElementById("live-video-player");
    player.srcObject = stream;
    
    player.setAttribute('autoplay', '');
    player.setAttribute('muted', '');
    player.setAttribute('playsinline', '');
    
    player.play().catch(e => console.warn("Video play error:", e));

    const slider = document.getElementById("camera-zoom-slider");
    if (slider) {
      slider.value = 1.0;
      adjustCameraZoom(1.0);
    }

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

function adjustCameraZoom(val) {
  const label = document.getElementById("camera-zoom-val");
  if (label) {
    label.textContent = `${parseFloat(val).toFixed(1)}x`;
  }
  
  if (currentCameraStream) {
    const videoTrack = currentCameraStream.getVideoTracks()[0];
    const capabilities = videoTrack.getCapabilities?.() || {};
    if (capabilities.zoom) {
      const min = capabilities.zoom.min || 1;
      const max = capabilities.zoom.max || 3;
      // Map 0.5..2.0 range to track's zoom range
      const targetZoom = min + (parseFloat(val) - 0.5) * (max - min) / 1.5;
      videoTrack.applyConstraints({
        advanced: [{ zoom: targetZoom }]
      }).catch(e => console.warn("Hardware zoom error:", e));
    }
  }

  const player = document.getElementById("live-video-player");
  if (player) {
    player.style.transform = `scaleX(-1) scale(${val})`;
  }
}

let creationMode = "photo"; // "photo" or "video"

function setupCameraSwipeGestures(container) {
  let startX = 0;
  let startY = 0;
  let isPointerDown = false;
  
  // Touch Events
  container.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
  }, { passive: true });
  
  container.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    handleSwipe(startX, startY, endX, endY);
  }, { passive: true });

  // Mouse drag fallback for swipe gesture
  container.addEventListener('mousedown', e => {
    startX = e.clientX;
    startY = e.clientY;
    isPointerDown = true;
  });

  container.addEventListener('mouseup', e => {
    if (!isPointerDown) return;
    isPointerDown = false;
    const endX = e.clientX;
    const endY = e.clientY;
    handleSwipe(startX, startY, endX, endY);
  });

  container.addEventListener('mouseleave', () => {
    isPointerDown = false;
  });
  
  function handleSwipe(sX, sY, eX, eY) {
    const diffX = eX - sX;
    const diffY = eY - sY;
    
    // Check if swipe is horizontal and meets threshold (60px)
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Swipe Right: switch to photo mode
        if (creationMode !== "photo") {
          setCreationMode("photo");
          showToast("사진 촬영 모드로 전환되었습니다. 📸");
        }
      } else {
        // Swipe Left: switch to video mode
        if (creationMode !== "video") {
          setCreationMode("video");
          showToast("동영상 촬영 모드로 전환되었습니다. 🎥");
        }
      }
    }
  }
}

function setCreationMode(mode) {
  creationMode = mode;
  document.querySelectorAll(".mode-pill").forEach(p => {
    p.classList.remove("active");
    p.style.color = "var(--text-secondary)";
    p.style.background = "rgba(255,255,255,0.06)";
  });
  const activeBtn = document.getElementById(`mode-${mode}-btn`);
  if (activeBtn) {
    activeBtn.classList.add("active");
    activeBtn.style.color = "#fff";
    activeBtn.style.background = "var(--accent-pink)";
  }
  
  const recordBtn = document.getElementById("studio-record-btn");
  if (recordBtn) {
    if (mode === "photo") {
      recordBtn.style.background = "#ffffff";
      recordBtn.style.border = "4px solid var(--accent-cyan)";
      recordBtn.style.borderRadius = "50%";
      recordBtn.style.boxShadow = "0 0 15px rgba(0, 242, 254, 0.4)";
      recordBtn.innerHTML = "<span style='font-size:1rem;'>📸</span>";
    } else {
      recordBtn.style.background = "var(--accent-pink)";
      recordBtn.style.border = "4px solid #ffffff";
      recordBtn.style.borderRadius = "8px"; // Distinct square-ish look
      recordBtn.style.boxShadow = "0 0 15px rgba(255, 42, 133, 0.6)";
      recordBtn.innerHTML = "<span style='font-size:0.55rem; color:#fff; font-weight:800; letter-spacing:0.5px;'>● REC</span>";
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
  currentCameraStream = null;
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

function capturePhoto() {
  const video = document.getElementById("live-video-player");
  let dataUrl = "";
  
  if (video && video.readyState >= 2) {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    
    const zoomScale = parseFloat(document.getElementById("camera-zoom-slider")?.value || "1");
    const vw = video.videoWidth || 640;
    const vh = video.videoHeight || 480;
    let sw, sh, sx, sy;
    
    // Mirror photo horizontally (selfie camera style)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    
    if (zoomScale >= 1) {
      sw = vw / zoomScale;
      sh = vh / zoomScale;
      sx = (vw - sw) / 2;
      sy = (vh - sh) / 2;
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      sw = canvas.width * zoomScale;
      sh = canvas.height * zoomScale;
      sx = (canvas.width - sw) / 2;
      sy = (canvas.height - sh) / 2;
      ctx.drawImage(video, 0, 0, vw, vh, sx, sy, sw, sh);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    dataUrl = canvas.toDataURL("image/png");
  } else {
    // Falls back to a mirrored clean gradient canvas representation
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, 640, 480);
    grad.addColorStop(0, '#ff2a85');
    grad.addColorStop(1, '#00f2fe');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 640, 480);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px Outfit";
    ctx.textAlign = "center";
    ctx.fillText("Trend Spotlight Selfie 📸", 320, 220);
    
    dataUrl = canvas.toDataURL("image/png");
  }
  
  const draftId = "draft-" + Date.now();
  const newDraft = {
    id: draftId,
    name: "스냅 사진 #" + (state.draftsList.length + 1),
    date: new Date().toLocaleDateString(),
    type: "photo",
    url: dataUrl
  };
  state.draftsList.push(newDraft);
  saveState();
  
  showToast("사진이 보관함에 임시 저장되었습니다! 📸");
  renderDraftsList();
}

let mediaRecorder = null;
let recordedChunks = [];

function toggleRecording() {
  const btn = document.getElementById("studio-record-btn");
  if (!btn) return;

  if (creationMode === "photo") {
    capturePhoto();
    return;
  }

  recordingActive = !recordingActive;
  if (recordingActive) {
    btn.classList.add("recording");
    btn.innerHTML = "<span style='font-size:0.55rem; color:#fff; font-weight:800; letter-spacing:0.5px;'>● 촬영 중</span>";
    showToast("동영상 녹화를 시작합니다! 🎥");
    recordedChunks = [];
    
    if (currentCameraStream) {
      try {
        mediaRecorder = new MediaRecorder(currentCameraStream, { mimeType: 'video/webm' });
      } catch (e) {
        try {
          mediaRecorder = new MediaRecorder(currentCameraStream);
        } catch (err) {
          mediaRecorder = null;
        }
      }
      
      if (mediaRecorder) {
        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        };
        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result;
            const draftId = "draft-" + Date.now();
            const newDraft = {
              id: draftId,
              name: "연습 촬영본 #" + (state.draftsList.length + 1),
              date: new Date().toLocaleDateString(),
              type: "video",
              url: base64data
            };
            state.draftsList.push(newDraft);
            saveState();
            
            showToast("동영상이 보관함에 임시 저장되었습니다! 🎥");
            renderDraftsList();
          };
          reader.readAsDataURL(blob);
        };
        mediaRecorder.start();
      }
    }
    
    recordTimer = setTimeout(() => {
      if (recordingActive) toggleRecording();
    }, 5000);
  } else {
    clearTimeout(recordTimer);
    btn.classList.remove("recording");
    btn.innerHTML = "<span style='font-size:0.55rem; color:#fff; font-weight:800; letter-spacing:0.5px;'>● REC</span>";
    
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    } else {
      // Offline fallback video url
      const fallbackUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
      const draftId = "draft-" + Date.now();
      const newDraft = {
        id: draftId,
        name: "연습 촬영본 #" + (state.draftsList.length + 1),
        date: new Date().toLocaleDateString(),
        type: "video",
        url: fallbackUrl
      };
      state.draftsList.push(newDraft);
      saveState();
      
      showToast("임시보관함 저장 완료!");
      renderDraftsList();
    }
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
        <div style="font-size:0.72rem; color:#1e293b; font-weight:700;">${d.name}</div>
        <div style="font-size:0.6rem; color:var(--text-muted)">${d.date} | 30일 보관</div>
      </div>
      <div style="display:flex; gap:4px;">
        <button class="store-btn" style="padding:2px 6px; font-size:0.65rem; margin:0; border-color:var(--accent-cyan); color:var(--accent-cyan);" onclick="viewDraft('${d.id}')">보기</button>
        <button class="store-btn" style="padding:2px 6px; font-size:0.65rem; margin:0; border-color:rgba(255,0,0,0.2); color:#ff5e9f;" onclick="deleteDraft('${d.id}')">삭제</button>
      </div>
    </div>
  `).join("");
}

function viewDraft(id) {
  const draft = state.draftsList.find(d => d.id === id);
  if (!draft) {
    showToast("파일을 찾을 수 없습니다.");
    return;
  }

  const modal = document.createElement("div");
  modal.id = "draft-viewer-modal";
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    backdrop-filter: blur(10px);
  `;

  // Provide a clean mock url or support standard file previews
  const isVideo = draft.type === "video";
  const dummyUrl = isVideo ? "https://www.w3schools.com/html/mov_bbb.mp4" : "https://picsum.photos/600/800";
  const mediaUrl = draft.url || dummyUrl;

  let mediaHtml = "";
  if (!isVideo) {
    mediaHtml = `<img src="${mediaUrl}" style="max-width:100%; max-height:70vh; border-radius:16px; border:2px solid rgba(255,255,255,0.2); object-fit:contain; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">`;
  } else {
    mediaHtml = `<video src="${mediaUrl}" controls autoplay loop style="max-width:100%; max-height:70vh; border-radius:16px; border:2px solid rgba(255,255,255,0.2); object-fit:contain; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: scaleX(-1);"></video>`;
  }

  modal.innerHTML = `
    <div style="width:100%; max-width:400px; display:flex; flex-direction:column; align-items:center; position:relative;">
      <div style="align-self:flex-end; color:#fff; font-size:2rem; font-weight:300; cursor:pointer; margin-bottom:15px; width:40px; height:40px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.1); border-radius:50%;" onclick="document.getElementById('draft-viewer-modal').remove()">✕</div>
      ${mediaHtml}
      <div style="color:#fff; font-size:0.9rem; font-weight:700; margin-top:16px; font-family:'Outfit',sans-serif;">${draft.name}</div>
      <div style="color:var(--text-secondary); font-size:0.68rem; margin-top:4px;">촬영 시간: ${draft.date}</div>
    </div>
  `;

  document.body.appendChild(modal);
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
  if (isOwned || itemId === "None" || price === 0) {
    state.avatarConfig[category] = itemId;
    if (!state.boughtAvatarItems.includes(itemId)) {
      state.boughtAvatarItems.push(itemId);
    }
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

  const fcode = document.getElementById("profile-friend-code");
  if (fcode && state.friendCode) {
    fcode.textContent = `친구코드: ${state.friendCode}`;
  }

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
      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--panel-border); border-radius:12px; padding:10px; margin-bottom: 6px;">
        <div style="font-size:0.7rem; color:var(--accent-cyan); font-weight:700;">내 업로드 | ${p.platform}</div>
        <div style="font-size:0.8rem; font-weight:700; color:var(--text-primary); margin:3px 0;">${p.title}</div>
        <div style="font-size:0.65rem; color:var(--text-muted)">설정: 좋아요(${p.likesPrivate ? '비공개' : '공개'}), 댓글(${p.commentsPrivate ? '비공개' : '공개'})</div>
      </div>
    `).join("");

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
        <span style="font-size:0.78rem; font-weight:700; color:var(--text-primary);">${t.title}</span>
        <span style="font-size:0.65rem; color:var(--accent-cyan);">${t.platform}</span>
      </div>
    `).join("");
  }
}

function renderSimpleProfileRow(t) {
  return `
    <div style="background:rgba(255,255,255,0.02); border:1px solid var(--panel-border); border-radius:12px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:0.78rem; font-weight:700; color:var(--text-primary)">${t.title}</span>
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
  updateAvatarDisplays();
  
  if (currentUser) {
    document.getElementById("app-header").style.display = "flex";
    document.getElementById("app-nav").style.display = "flex";
    document.getElementById("screen-auth").classList.remove("active");
    document.getElementById("screen-auth").style.setProperty("display", "none", "important");
    navigateTo("home");
  } else {
    document.getElementById("app-header").style.display = "none";
    document.getElementById("app-nav").style.display = "none";
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const authScreen = document.getElementById("screen-auth");
    authScreen.style.removeProperty("display");
    authScreen.classList.add("active");
  }

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

  // Bind swipe mode selector gestures
  const modeSel = document.getElementById("creation-mode-selector");
  if (modeSel) {
    setupCameraSwipeGestures(modeSel);
  }
  const streamBox = document.getElementById("camera-stream-box");
  if (streamBox) {
    setupCameraSwipeGestures(streamBox);
  }

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

// Dedicated Screen Authentication Controller
let pageAuthMode = "login"; // "login" or "signup"
let currentUser = null;

function togglePageAuthMode() {
  pageAuthMode = (pageAuthMode === "login") ? "signup" : "login";
  updatePageAuthUI();
}

function updatePageAuthUI() {
  const title = document.getElementById("page-auth-title");
  const primaryBtn = document.getElementById("page-auth-primary-btn");
  const toggleLink = document.getElementById("page-auth-toggle-link");

  if (pageAuthMode === "login") {
    title.textContent = "이메일 로그인";
    primaryBtn.textContent = "로그인";
    toggleLink.textContent = "아직 회원이 아니신가요? 회원가입";
  } else {
    title.textContent = "이메일 회원가입";
    primaryBtn.textContent = "회원등록 가입";
    toggleLink.textContent = "이미 회원이신가요? 로그인하기";
  }
}

async function handlePageAuthSubmit() {
  const email = document.getElementById("page-auth-email").value.trim();
  const password = document.getElementById("page-auth-password").value.trim();

  if (!email || !password) {
    showToast("이메일과 비밀번호를 모두 입력해 주세요.");
    return;
  }

  const isLocalFile = window.location.protocol === "file:";

  if (isLocalFile) {
    // Local offline fallback using localStorage
    let mockUsers = [];
    try {
      mockUsers = JSON.parse(localStorage.getItem("trend_spotlight_mock_users") || "[]");
    } catch (e) {
      mockUsers = [];
    }

    if (pageAuthMode === "signup") {
      const exists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        showToast("이미 가입된 이메일 주소입니다.");
        return;
      }
      const nickname = email.split('@')[0] || "유저";
      mockUsers.push({ email, password, nickname });
      localStorage.setItem("trend_spotlight_mock_users", JSON.stringify(mockUsers));
      showToast("회원가입이 완료되었습니다! 로그인해 주세요.");
      pageAuthMode = "login";
      updatePageAuthUI();
    } else {
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!user) {
        showToast("이메일 또는 비밀번호가 일치하지 않습니다.");
        return;
      }
      currentUser = { email: user.email, nickname: user.nickname };
      loadState();
      state.userNickname = user.nickname;
      saveState();

      showToast("로그인에 성공했습니다!");
      document.getElementById("app-header").style.display = "flex";
      document.getElementById("app-nav").style.display = "flex";
      document.getElementById("screen-auth").classList.remove("active");
      document.getElementById("screen-auth").style.setProperty("display", "none", "important");
      renderProfileView();
      navigateTo("home");
    }
    return;
  }

  const endpoint = pageAuthMode === "login" ? "/api/login" : "/api/signup";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      showToast(data.error || "오류가 발생했습니다.");
      return;
    }

    showToast(data.message);
    
    if (pageAuthMode === "signup") {
      pageAuthMode = "login";
      updatePageAuthUI();
    } else {
      currentUser = { email: data.email, nickname: data.nickname };
      loadState();
      state.userNickname = data.nickname;
      saveState();

      // Show application header & nav bar
      document.getElementById("app-header").style.display = "flex";
      document.getElementById("app-nav").style.display = "flex";

      // Hide auth screen and display home screen
      document.getElementById("screen-auth").classList.remove("active");
      document.getElementById("screen-auth").style.setProperty("display", "none", "important");
      
      renderProfileView();
      navigateTo("home");
    }
  } catch (err) {
    console.error("Auth submit error, falling back to local storage auth:", err);
    // Network fallback in case server is down
    let mockUsers = [];
    try {
      mockUsers = JSON.parse(localStorage.getItem("trend_spotlight_mock_users") || "[]");
    } catch (e) {
      mockUsers = [];
    }

    if (pageAuthMode === "signup") {
      const exists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        showToast("이미 가입된 이메일 주소입니다.");
        return;
      }
      const nickname = email.split('@')[0] || "유저";
      mockUsers.push({ email, password, nickname });
      localStorage.setItem("trend_spotlight_mock_users", JSON.stringify(mockUsers));
      showToast("회원가입이 완료되었습니다! (로컬 백업)");
      pageAuthMode = "login";
      updatePageAuthUI();
    } else {
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!user) {
        showToast("이메일 또는 비밀번호가 일치하지 않습니다. (서버 연결 실패)");
        return;
      }
      currentUser = { email: user.email, nickname: user.nickname };
      loadState();
      state.userNickname = user.nickname;
      saveState();

      showToast("로그인 성공! (로컬)");
      document.getElementById("app-header").style.display = "flex";
      document.getElementById("app-nav").style.display = "flex";
      document.getElementById("screen-auth").classList.remove("active");
      document.getElementById("screen-auth").style.setProperty("display", "none", "important");
      renderProfileView();
      navigateTo("home");
    }
  }
}

function handleLogout() {
  currentUser = null;
  state.currentUser = null;
  state.userNickname = "솜뭉치인형";
  saveState();

  // Hide application header & nav bar
  document.getElementById("app-header").style.display = "none";
  document.getElementById("app-nav").style.display = "none";

  // Deactivate all screens and show screen-auth
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const authScreen = document.getElementById("screen-auth");
  authScreen.style.removeProperty("display");
  authScreen.classList.add("active");

  showToast("로그아웃 되었습니다.");
}

