/**
 * Naruto Bloodline Archive Data Module
 * Canonical data for Hereditary Genetics & Hiden Secret Arts.
 */

export const BLOODLINES_DATA = [
  {
    id: 'dojutsu',
    badgeClass: 'badge-crimson',
    badgeIcon: 'fa-eye',
    badgeText: 'OCULAR DŌJUTSU',
    name: 'SHARINGAN & BYAKUGAN',
    kanji: '写輪眼 • 白眼 (瞳術血統)',
    desc: 'Ancient dōjutsu originating from Kaguya Ōtsutsuki. Grants kinetic tracking, jutsu replication, and 360-degree chakra tenketsu sight.',
    flow: [
      { label: 'INDRA / HAMURA' },
      { label: 'OCULAR GENE' },
      { label: 'DŌJUTSU', highlight: true },
    ],
  },
  {
    id: 'elemental',
    badgeClass: 'badge-forest',
    badgeIcon: 'fa-dna',
    badgeText: 'ELEMENTAL SYNTHESIS',
    name: 'WOOD & ICE RELEASE',
    kanji: '木遁 • 氷遁 (二性質融合)',
    desc: 'Simultaneous chemical fusion of two primordial chakra natures to manifest living flora, organic constructs, or impenetrable crystalline ice mirrors.',
    flow: [
      { label: 'EARTH ＋ WATER' },
      { label: 'GENETIC FUSION' },
      { label: 'MOKUTON', highlight: true },
    ],
  },
  {
    id: 'hiden',
    badgeClass: 'badge-purple',
    badgeIcon: 'fa-scroll',
    badgeText: 'SECRET HIDEN ARTS',
    name: 'SHADOW & MIND JUTSU',
    kanji: '影真似 • 心転身 (秘伝伝承)',
    desc: 'Non-elemental ancestral formulas guarded strictly within clan scrolls. Encompasses shadow binding, telepathic soul transfer, and calorie expansion.',
    flow: [
      { label: 'YIN / YANG CHAKRA' },
      { label: 'HIDEN SCROLL' },
      { label: 'SECRET ART', highlight: true },
    ],
  },
];
