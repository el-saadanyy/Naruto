/**
 * CANONICAL JINCHŪRIKI (HUMAN VESSELS) DATASET
 * Contains tactical dossier data, elemental/bijuu mastery, telemetry records,
 * and shinobi archive mappings for the 9 legendary Jinchūriki.
 */

export const JINCHURIKI_GALLERY_DATA = [
  {
    index: '01',
    name: 'Gaara',
    kanji: '我愛羅 • 第五代風影',
    title: 'Fifth Kazekage // Sand Sovereign',
    village: 'SUNAGAKURE',
    bijuuTail: '1-TAIL',
    bijuuName: 'SHUKAKU',
    image: '/assets/image/shinobi_gaara.png',
    objectPosition: 'center 28%',
    thumbPosition: 'center 16%',
    auraClass: 'aura-sand',
    summary:
      'Transformed from an isolated, feared weapon into the revered Fifth Kazekage and Supreme Commander of the Allied Shinobi Forces. Gaara forged a bond of mutual respect with Shukaku during the Fourth Shinobi World War, wielding absolute sand manipulation and impenetrable defense.',
    traits: [
      'Absolute Sand Defense & Shield of Sand',
      'Magnet Release (Jiton) Cursed Sealing',
      'Desert Layered Imperial Funeral',
    ],
    dbId: 'SN-015842',
  },
  {
    index: '02',
    name: 'Yugito Nii',
    kanji: '二位ユギト • 雲隠れの精鋭',
    title: 'Jonin of Kumogakure // Blue Blaze Mistress',
    village: 'KUMOGAKURE',
    bijuuTail: '2-TAILS',
    bijuuName: 'MATATABI',
    image: '/assets/image/jinchuriki_yugito.png',
    objectPosition: 'center 25%',
    thumbPosition: 'center 14%',
    auraClass: 'aura-blue-flame',
    summary:
      'A highly disciplined Jonin of Kumogakure who subjected herself to unsparing training to master Matatabi. Able to freely transform into her Tailed Beast form while maintaining full tactical awareness and commanding spectral blue fireballs.',
    traits: [
      'Complete Matatabi Beast-Transformation',
      'Mouse Hairball Spectral Blue Fire',
      'Acrobatic Claw Taijutsu & High Agility',
    ],
    dbId: 'KM-010822',
  },
  {
    index: '03',
    name: 'Yagura Karatachi',
    kanji: '枸橘やぐら • 第四代水影',
    title: 'Fourth Mizukage // Master of Coral & Mirror',
    village: 'KIRIGAKURE',
    bijuuTail: '3-TAILS',
    bijuuName: 'ISOBU',
    image: '/assets/image/jinchuriki_yagura.png',
    objectPosition: 'center 25%',
    thumbPosition: 'center 15%',
    auraClass: 'aura-coral',
    summary:
      "One of the extremely rare shinobi in history to achieve absolute symbiosis and control over his Bijuu. He governed Kirigakure during the legendary 'Bloody Mist' epoch, deploying Isobu's armored coral growths and refractive water mirrors.",
    traits: [
      'Water Mirror (Mizu Kagami) Reflection Jutsu',
      'Coral Palm Hardening & Immobilization',
      'Full Perfect Jinchūriki Isobu Control',
    ],
    dbId: 'KG-000004',
  },
  {
    index: '04',
    name: 'Rōshi',
    kanji: '老紫 • 熔遁の修行僧',
    title: 'Ascetic Hermit of Iwa // Lava Sovereign',
    village: 'IWAGAKURE',
    bijuuTail: '4-TAILS',
    bijuuName: 'SON GOKŪ',
    image: '/assets/image/jinchuriki_roshi.png',
    objectPosition: 'center 25%',
    thumbPosition: 'center 16%',
    auraClass: 'aura-lava',
    summary:
      "A solitary wandering monk from Iwagakure who spent over four decades traveling the continent to decipher Son Gokū's volcanic nature. Mastered molten rock Lava Release to coat his physical body in lethal blazing magma armor.",
    traits: [
      'Lava Release: Scorching Stream Rocks',
      'Molten Magma Chakra Cloak Armor',
      'Great Blazing Volcano Impact',
    ],
    dbId: 'IW-000004',
  },
  {
    index: '05',
    name: 'Han',
    kanji: 'ハン • 蒸気の巨人',
    title: 'Steam Titan of the Mist & Stone',
    village: 'IWAGAKURE',
    bijuuTail: '5-TAILS',
    bijuuName: 'KOKUŌ',
    image: '/assets/image/jinchuriki_han.png',
    objectPosition: 'center 25%',
    thumbPosition: 'center 12%',
    auraClass: 'aura-steam',
    summary:
      "A towering warrior encased in specialized furnace steam armor. By channeling Kokuō's boiling Boil Release (Futton) chakra, Han propels his physical attacks with steam propulsion, generating mountain-shattering taijutsu impact force.",
    traits: [
      'Boil Release: Unrivaled Strength Acceleration',
      'Steam Furnace Armor Kinetic Boost',
      'Five-Tails Horned Charge & Battering Ram',
    ],
    dbId: 'IW-000005',
  },
  {
    index: '06',
    name: 'Utakata',
    kanji: 'ウタカタ • 泡沫の抜け忍',
    title: 'Rogue Shinobi of Kiri // Bubble Master',
    village: 'KIRIGAKURE',
    bijuuTail: '6-TAILS',
    bijuuName: 'SAIKEN',
    image: '/assets/image/jinchuriki_utakata.png',
    objectPosition: 'center 25%',
    thumbPosition: 'center 15%',
    auraClass: 'aura-bubble',
    summary:
      "A tranquil rogue shinobi wandering the lands after a tragic sealing attempt by his former master. Wields a bamboo bubble blower to weaponize Saiken's corrosive alkaline slime into explosive, blinding, and suffocating soap domes.",
    traits: [
      'Bubble Lineage: Drowning Bubble Trap',
      'Corrosive Alkaline Slime Release',
      'Six-Tails Acid Vapor Transformation',
    ],
    dbId: 'KG-000006',
  },
  {
    index: '07',
    name: 'Fū',
    kanji: 'フウ • 滝隠れの飛翔者',
    title: 'Kunoichi of the Waterfall // Scale Wings',
    village: 'TAKIGAKURE',
    bijuuTail: '7-TAILS',
    bijuuName: 'CHŌMEI',
    image: '/assets/image/jinchuriki_fu.png',
    objectPosition: 'center 25%',
    thumbPosition: 'center 14%',
    auraClass: 'aura-chitin',
    summary:
      "A free-spirited, cheerful kunoichi protected within Takigakure's secret valleys. Utilizing Chōmei's insect wings protruding from her back, Fū flies at blinding velocities while releasing luminous scale powder that disorients and blinds enemies.",
    traits: [
      'Chōmei Six-Wing Aerial Supremacy',
      'Secret Technique: Scale Powder Flash',
      'Cocoon Shield & Insect Armor Barrier',
    ],
    dbId: 'TK-000007',
  },
  {
    index: '08',
    name: 'Killer B',
    kanji: 'キラービー • 雲隠れの英雄',
    title: 'Supreme Guardian of Kumo // Eight Swords',
    village: 'KUMOGAKURE',
    bijuuTail: '8-TAILS',
    bijuuName: 'GYŪKI',
    image: '/assets/image/shinobi_killer_b.png',
    objectPosition: 'center 28%',
    thumbPosition: 'center 15%',
    auraClass: 'aura-ink',
    summary:
      'Kumogakure’s ultimate guardian and beloved adoptive brother of the Fourth Raikage. Achieved perfect, unbreakable unity with Gyūki through mutual respect and shared rhyme, pioneering the Acrobat Eight-Sword style and devastating Tailed Beast Bombs.',
    traits: [
      'Acrobat Seven-Swords & Lightning Flow',
      'Full Perfect Gyūki Symbiosis & Beast Bomb',
      'Double Lariat & Ink Clone Sealing',
    ],
    dbId: 'KM-000008',
  },
  {
    index: '09',
    name: 'Naruto Uzumaki',
    kanji: 'うずまきナルト • 七代目火影',
    title: 'Child of Prophecy // Seventh Hokage',
    village: 'KONOHAGAKURE',
    bijuuTail: '9-TAILS',
    bijuuName: 'KURAMA',
    image: '/assets/image/shinobi_naruto.png',
    objectPosition: 'center 25%',
    thumbPosition: 'center 16%',
    auraClass: 'aura-kurama',
    summary:
      'Sealed with Kurama on the day of his birth. Overcame ostracization, hatred, and despair through sheer willpower to liberate all Nine Bijuu and become the heroic Seventh Hokage who united the entire Shinobi World in eternal peace.',
    traits: [
      'Kurama Chakra Mode (KCM) & Avatar Manifestation',
      'Six Paths Sage Mode & Super-Tailed Beast Rasenshuriken',
      'Nine-Bijuu Nexus Telepathic Unification',
    ],
    dbId: 'KN-012607',
  },
];

export function getJinchurikiByIndex(index) {
  return JINCHURIKI_GALLERY_DATA.find((j) => j.index === index) || null;
}

export function getJinchurikiByName(name) {
  return JINCHURIKI_GALLERY_DATA.find((j) => j.name.toLowerCase() === name.toLowerCase()) || null;
}
