/**
 * CANONICAL SHINOBI VILLAGES & WORLD MAP ATLAS DATASET
 * Contains tactical map coordinates, camera viewports, auras, and factual dossiers
 * for the 5 Great Shinobi Nations + World Overview.
 */

export const VILLAGE_AURAS = {
  world: 'radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.12) 0%, rgba(8, 8, 8, 0) 70%)',
  leaf: 'radial-gradient(circle at 50% 50%, rgba(226, 90, 42, 0.18) 0%, rgba(8, 8, 8, 0) 70%)',
  sand: 'radial-gradient(circle at 50% 50%, rgba(240, 165, 0, 0.18) 0%, rgba(8, 8, 8, 0) 70%)',
  rock: 'radial-gradient(circle at 50% 50%, rgba(180, 83, 9, 0.18) 0%, rgba(8, 8, 8, 0) 70%)',
  cloud: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.18) 0%, rgba(8, 8, 8, 0) 70%)',
  mist: 'radial-gradient(circle at 50% 50%, rgba(37, 142, 166, 0.18) 0%, rgba(8, 8, 8, 0) 70%)',
};

export const VILLAGE_CAMERA_TARGETS = {
  world: { scale: 1, x: 0, y: 0 },
  leaf: { scale: 1.05, x: -5, y: -10 },
  sand: { scale: 1.08, x: 40, y: -25 },
  rock: { scale: 1.08, x: 40, y: 30 },
  cloud: { scale: 1.08, x: -40, y: 30 },
  mist: { scale: 1.08, x: -45, y: -20 },
};

export const VILLAGE_PROGRESS_TARGETS = {
  world: 0.05,
  leaf: 0.25,
  sand: 0.43,
  rock: 0.6,
  cloud: 0.77,
  mist: 0.94,
};

export const VILLAGE_NAV_ITEMS = [
  { id: 'world', label: 'WORLD MAP', dotClass: 'dot-world' },
  { id: 'leaf', label: '01 LEAF', dotClass: 'dot-leaf' },
  { id: 'sand', label: '02 SAND', dotClass: 'dot-sand' },
  { id: 'rock', label: '03 ROCK', dotClass: 'dot-rock' },
  { id: 'cloud', label: '04 CLOUD', dotClass: 'dot-cloud' },
  { id: 'mist', label: '05 MIST', dotClass: 'dot-mist' },
];

export const VILLAGE_PRESENTATION_CLASSES = {
  world: { frameClass: 'frame-world', cardClass: 'card-world', badgeClass: 'badge-world', dataLocation: 'world' },
  leaf: { frameClass: 'frame-leaf', cardClass: 'card-leaf', badgeClass: 'badge-leaf', dataLocation: 'leaf' },
  sand: { frameClass: 'frame-sand', cardClass: 'card-sand', badgeClass: 'badge-sand', dataLocation: 'sand' },
  rock: { frameClass: 'frame-rock', cardClass: 'card-rock', badgeClass: 'badge-rock', dataLocation: 'rock' },
  cloud: { frameClass: 'frame-cloud', cardClass: 'card-cloud', badgeClass: 'badge-cloud', dataLocation: 'cloud' },
  mist: { frameClass: 'frame-mist', cardClass: 'card-mist', badgeClass: 'badge-mist', dataLocation: 'mist' },
};

export const WORLD_OVERVIEW_DATA = {
  id: 'world',
  image: '/assets/image/world_map_overview.jpg',
  imageAlt: 'The Shinobi World Overview',
  sealIcon: 'fa-compass',
  sealText: 'SHINOBI ATLAS',
  badgeClass: 'badge-world',
  eraTag: '【五大国】 FIVE GREAT SHINOBI NATIONS',
  badgeIcon: 'fa-compass',
  badgeText: 'TERRITORIAL ATLAS',
  title: 'SHINOBI WORLD MAP',
  kanji: '忍の世界 • 五大忍術大国',
  desc: 'The geopolitical landscape dominated by the Five Great Shinobi Nations. Each sovereign territory maintains military supremacy through its Hidden Village and elemental mastery.',
  summary: 'The geopolitical landscape dominated by the Five Great Shinobi Nations. Each sovereign territory maintains military supremacy through its Hidden Village and elemental mastery.',
  metaBadges: [
    { icon: 'fa-fire', text: 'Fire (火遁)' },
    { icon: 'fa-wind', text: 'Wind (風遁)' },
    { icon: 'fa-mountain', text: 'Earth (土遁)' },
    { icon: 'fa-bolt', text: 'Lightning (雷遁)' },
    { icon: 'fa-droplet', text: 'Water (水遁)' },
  ],
};

export const VILLAGES_DOSSIER_DATA = [
  {
    id: 'world',
    frameClass: 'frame-world',
    cardClass: 'card-world',
    dataLocation: 'world',
    image: '/assets/image/world_map_overview.jpg',
    imageAlt: 'The Shinobi World Overview',
    sealIcon: 'fa-compass',
    sealText: 'SHINOBI ATLAS',
    badgeClass: 'badge-world',
    eraTag: '【五大国】 FIVE GREAT SHINOBI NATIONS',
    badgeIcon: 'fa-compass',
    badgeText: 'TERRITORIAL ATLAS',
    title: 'SHINOBI WORLD MAP',
    kanji: '忍の世界 • 五大忍術大国',
    desc: 'The geopolitical landscape dominated by the Five Great Shinobi Nations. Each sovereign territory maintains military supremacy through its Hidden Village and elemental mastery.',
    metaBadges: [
      { icon: 'fa-fire', text: 'Fire (火遁)' },
      { icon: 'fa-wind', text: 'Wind (風遁)' },
      { icon: 'fa-mountain', text: 'Earth (土遁)' },
      { icon: 'fa-bolt', text: 'Lightning (雷遁)' },
      { icon: 'fa-droplet', text: 'Water (水遁)' },
    ],
  },
  {
    id: 'leaf',
    frameClass: 'frame-leaf',
    cardClass: 'card-leaf',
    dataLocation: 'leaf',
    image: '/assets/image/leaf viliage.jpg',
    imageAlt: 'The Hidden Leaf Village',
    sealIcon: 'fa-fire',
    sealText: 'KONOHAGAKURE',
    badgeClass: 'badge-leaf',
    eraTag: '【火ノ国】 LAND OF FIRE',
    badgeIcon: 'fa-fire',
    badgeText: 'LOCATION 01',
    title: 'THE HIDDEN LEAF',
    kanji: '木ノ葉隠れの里 • 火の意志',
    desc: 'Founded on the eternal Will of Fire and nestled deep within dense forests, Konoha stands as the primary bastion of the Land of Fire and birthplace of legendary Hokage leadership.',
    metaBadges: [
      { icon: 'fa-fire', text: 'Fire (火遁)' },
      { icon: 'fa-crown', text: 'Hokage (火影)' },
      { icon: 'fa-shield', text: 'Uchiha / Senju' },
    ],
  },
  {
    id: 'sand',
    frameClass: 'frame-sand',
    cardClass: 'card-sand',
    dataLocation: 'sand',
    image: '/assets/image/sand viliage3.jpg',
    imageAlt: 'The Hidden Sand Village',
    sealIcon: 'fa-wind',
    sealText: 'SUNAGAKURE',
    badgeClass: 'badge-sand',
    eraTag: '【風の国】 LAND OF WIND',
    badgeIcon: 'fa-wind',
    badgeText: 'LOCATION 02',
    title: 'THE HIDDEN SAND',
    kanji: '砂隠れの里 • 砂漠の防壁',
    desc: 'Fortified within harsh desert valleys, Sunagakure harnesses the howling winds and arid sands, commanding formidable puppet mastery and resilient Kazekage defense.',
    metaBadges: [
      { icon: 'fa-wind', text: 'Wind (風遁)' },
      { icon: 'fa-crown', text: 'Kazekage (風影)' },
      { icon: 'fa-shield', text: 'Kazekage Clan' },
    ],
  },
  {
    id: 'rock',
    frameClass: 'frame-rock',
    cardClass: 'card-rock',
    dataLocation: 'rock',
    image: '/assets/image/rockk villiage.jpg',
    imageAlt: 'The Hidden Rock Village',
    sealIcon: 'fa-mountain',
    sealText: 'IWAGAKURE',
    badgeClass: 'badge-rock',
    eraTag: '【土の国】 LAND OF EARTH',
    badgeIcon: 'fa-mountain',
    badgeText: 'LOCATION 03',
    title: 'THE HIDDEN ROCK',
    kanji: '岩隠れの里 • 難攻不落の岩壁',
    desc: 'Surrounded by jagged stone mountain ranges and steep ravines, Iwagakure boasts impenetrable natural ramparts, unyielding stone discipline, and tactical Tsuchikage supremacy.',
    metaBadges: [
      { icon: 'fa-mountain', text: 'Earth (土遁)' },
      { icon: 'fa-crown', text: 'Tsuchikage (土影)' },
      { icon: 'fa-shield', text: 'Kamizuru Clan' },
    ],
  },
  {
    id: 'cloud',
    frameClass: 'frame-cloud',
    cardClass: 'card-cloud',
    dataLocation: 'cloud',
    image: '/assets/image/cloud villiage1.jpg',
    imageAlt: 'The Hidden Cloud Village',
    sealIcon: 'fa-bolt',
    sealText: 'KUMOGAKURE',
    badgeClass: 'badge-cloud',
    eraTag: '【雷の国】 LAND OF LIGHTNING',
    badgeIcon: 'fa-bolt',
    badgeText: 'LOCATION 04',
    title: 'THE HIDDEN CLOUD',
    kanji: '雲隠れの里 • 雷鳴の高嶺',
    desc: 'Perched high upon cloud-shrouded mountain peaks, Kumogakure channels the raw fury of lightning, famed for thunderous Taijutsu swordsmanship and decisive Raikage authority.',
    metaBadges: [
      { icon: 'fa-bolt', text: 'Lightning (雷遁)' },
      { icon: 'fa-crown', text: 'Raikage (雷影)' },
      { icon: 'fa-shield', text: 'Yotsuki Clan' },
    ],
  },
  {
    id: 'mist',
    frameClass: 'frame-mist',
    cardClass: 'card-mist',
    dataLocation: 'mist',
    image: '/assets/image/smoke viliage.jpg',
    imageAlt: 'The Hidden Mist Village',
    sealIcon: 'fa-droplet',
    sealText: 'KIRIGAKURE',
    badgeClass: 'badge-mist',
    eraTag: '【水の国】 LAND OF WATER',
    badgeIcon: 'fa-droplet',
    badgeText: 'LOCATION 05',
    title: 'THE HIDDEN MIST',
    kanji: '霧隠れの里 • 深霧の湖島',
    desc: 'Enveloped by deep oceanic fog and isolated islands, Kirigakure commands the lethal arts of silent killing, water release mastery, and the legendary Seven Ninja Swordsmen.',
    metaBadges: [
      { icon: 'fa-droplet', text: 'Water (水遁)' },
      { icon: 'fa-crown', text: 'Mizukage (水影)' },
      { icon: 'fa-shield', text: 'Hozuki Clan' },
    ],
  },
];

export function getVillageById(id) {
  return VILLAGES_DOSSIER_DATA.find((v) => v.id === id) || null;
}
