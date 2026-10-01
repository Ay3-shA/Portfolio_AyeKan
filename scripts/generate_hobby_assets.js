import fs from 'fs';
import path from 'path';

const hobbies = [
  {
    folder: 'music',
    items: [
      { num: '01', title: 'Analog Valves & Vinyl', sub: 'Warm acoustic resonance', color1: '#3A1425', color2: '#651F3B', accent: '#E875A0', icon: 'VINYL' },
      { num: '02', title: 'Violin Concerto Score', sub: 'Bach Partita in D Minor', color1: '#240D18', color2: '#3A1425', accent: '#F2A9C2', icon: 'SCORE' },
      { num: '03', title: 'Atmospheric Waves', sub: 'Ambient synthesizer harmonics', color1: '#651F3B', color2: '#9D315C', accent: '#F8DCE8', icon: 'WAVE' },
    ]
  },
  {
    folder: 'travel',
    items: [
      { num: '01', title: 'Nocturnal Paris Haussmann', sub: 'Rue de Rivoli at 5 AM', color1: '#240D18', color2: '#651F3B', accent: '#E875A0', icon: 'CITY' },
      { num: '02', title: 'Kyoto Mist & Bamboo', sub: 'Arashiyama rain cadence', color1: '#3A1425', color2: '#240D18', accent: '#F2A9C2', icon: 'HORIZON' },
      { num: '03', title: 'Cobblestone Passage', sub: 'Old port twilight light', color1: '#651F3B', color2: '#3A1425', accent: '#F8DCE8', icon: 'PASSAGE' },
    ]
  },
  {
    folder: 'design',
    items: [
      { num: '01', title: 'Haute Couture Silhouette', sub: 'Structural minimalism & draping', color1: '#240D18', color2: '#3A1425', accent: '#E875A0', icon: 'SILHOUETTE' },
      { num: '02', title: 'Editorial Typographic Grid', sub: 'Generous whitespace & tension', color1: '#3A1425', color2: '#651F3B', accent: '#F2A9C2', icon: 'GRID' },
      { num: '03', title: 'Botanical & Brutalist Stone', sub: 'Travertine marble and rose petal', color1: '#651F3B', color2: '#240D18', accent: '#F8DCE8', icon: 'SCULPT' },
    ]
  },
  {
    folder: 'photography',
    items: [
      { num: '01', title: 'Silver Gelatin 35mm', sub: 'Leica Summicron f/2.0 shadow', color1: '#240D18', color2: '#3A1425', accent: '#E875A0', icon: 'LENS' },
      { num: '02', title: 'Natural Window Illumination', sub: 'Raking angle on linen drape', color1: '#3A1425', color2: '#651F3B', accent: '#F2A9C2', icon: 'LIGHT' },
      { num: '03', title: 'Macro Botanical Petal', sub: 'Translucent cellular veins', color1: '#651F3B', color2: '#9D315C', accent: '#F8DCE8', icon: 'MACRO' },
    ]
  },
  {
    folder: 'coffee',
    items: [
      { num: '01', title: 'Morning Pour-Over Ritual', sub: 'Ethiopian heirloom single origin', color1: '#240D18', color2: '#3A1425', accent: '#E875A0', icon: 'DRIP' },
      { num: '02', title: 'Handcrafted Ceramic Vessel', sub: 'Unglazed stoneware & crema', color1: '#3A1425', color2: '#651F3B', accent: '#F2A9C2', icon: 'CUP' },
      { num: '03', title: 'First Daylight Steam', sub: 'Contemplative morning solitude', color1: '#651F3B', color2: '#240D18', accent: '#F8DCE8', icon: 'STEAM' },
    ]
  },
  {
    folder: 'curiosity',
    items: [
      { num: '01', title: 'Brass Celestial Astrolabe', sub: 'Medieval coordinate mapping', color1: '#240D18', color2: '#651F3B', accent: '#E875A0', icon: 'ASTRO' },
      { num: '02', title: 'Botanical Taxonomy Notes', sub: 'Hand-drawn petal morphology', color1: '#3A1425', color2: '#240D18', accent: '#F2A9C2', icon: 'PETAL' },
      { num: '03', title: 'Constellation Geometric Web', sub: 'Calculus in the night sky', color1: '#651F3B', color2: '#3A1425', accent: '#F8DCE8', icon: 'STARS' },
    ]
  },
  {
    folder: 'late-night-ideas',
    items: [
      { num: '01', title: '03:14 AM Terminal Glow', sub: 'When algorithms become poems', color1: '#240D18', color2: '#3A1425', accent: '#E875A0', icon: 'TERMINAL' },
      { num: '02', title: 'Nocturnal Skyline Horizon', sub: 'Quiet city asleep beneath rain', color1: '#3A1425', color2: '#651F3B', accent: '#F2A9C2', icon: 'NIGHT' },
      { num: '03', title: 'Paper Napkin Neural Sketch', sub: 'The sudden insight before dawn', color1: '#651F3B', color2: '#9D315C', accent: '#F8DCE8', icon: 'SKETCH' },
    ]
  }
];

function generateSVG(item, hobby) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.color1}"/>
      <stop offset="60%" stop-color="${item.color2}"/>
      <stop offset="100%" stop-color="#240D18"/>
    </linearGradient>
    <radialGradient id="bloom" cx="70%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${item.accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${item.color1}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(242, 169, 194, 0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#bloom)"/>
  <rect width="800" height="600" fill="url(#grid)"/>

  <!-- Aesthetic Editorial Artwork Lines -->
  <g opacity="0.6" stroke="${item.accent}" stroke-width="1" fill="none">
    <circle cx="400" cy="300" r="180" stroke-dasharray="2 6"/>
    <circle cx="400" cy="300" r="140" stroke-opacity="0.4"/>
    <circle cx="400" cy="300" r="220" stroke-opacity="0.2"/>
    <path d="M 220 300 Q 400 180 580 300 T 700 300" stroke-opacity="0.5"/>
    <path d="M 260 240 Q 400 360 540 240" stroke-opacity="0.3"/>
  </g>

  <!-- Editorial typography and framing -->
  <rect x="40" y="40" width="720" height="520" fill="none" stroke="rgba(242, 169, 194, 0.2)" stroke-width="1"/>
  
  <text x="70" y="85" font-family="'Cormorant Garamond', Georgia, serif" font-size="14" letter-spacing="4" fill="${item.accent}" font-weight="600">AYEKAN ARCHIVE // ${hobby.toUpperCase()}</text>
  <text x="730" y="85" font-family="sans-serif" font-size="12" letter-spacing="2" fill="rgba(248, 220, 232, 0.6)" text-anchor="end">PLATE ${item.num}</text>

  <g transform="translate(70, 480)">
    <text x="0" y="0" font-family="'Cormorant Garamond', Georgia, serif" font-size="28" fill="#FFF8FA" font-style="italic">${item.title}</text>
    <text x="0" y="24" font-family="sans-serif" font-size="12" letter-spacing="1.5" fill="${item.accent}" opacity="0.9">${item.sub}</text>
  </g>

  <text x="730" y="504" font-family="monospace" font-size="10" letter-spacing="2" fill="rgba(248, 220, 232, 0.5)" text-anchor="end">35MM · F/1.4 · ISO 100</text>
</svg>`;
}

for (const h of hobbies) {
  const dir = path.join(process.cwd(), 'src/assets/images/hobbies', h.folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  for (const item of h.items) {
    const filePath = path.join(dir, `${item.num}.svg`);
    // Only write if SVG doesn't exist or if JPG isn't the primary
    fs.writeFileSync(filePath, generateSVG(item, h.folder));
  }
}

console.log('All 21 hobby assets generated successfully.');
