import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

import {
  VILLAGE_AURAS,
  VILLAGE_CAMERA_TARGETS,
  VILLAGE_PROGRESS_TARGETS,
  VILLAGE_NAV_ITEMS,
  VILLAGE_PRESENTATION_CLASSES,
  WORLD_OVERVIEW_DATA,
} from './villageData.js';
import { fetchVillageList } from '../../api/villageApi.js';
import { useFavorites } from '../../context/FavoritesContext.jsx';

function WorldMapSection() {
  const { isFavorited, toggleFavorite } = useFavorites();
  const [activeLocation, setActiveLocation] = useState('world');
  const [villageRecords, setVillageRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const worldScrollTriggerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function loadVillages() {
      setLoading(true);
      setApiError(null);
      try {
        const data = await fetchVillageList();
        if (isMounted) {
          if (data && Array.isArray(data.results)) {
            setVillageRecords(data.results);
          } else {
            setVillageRecords([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load village dossiers from backend API:', err);
          setVillageRecords([]);
          setApiError(err.message || 'Failed to connect to village database.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadVillages();
    return () => {
      isMounted = false;
    };
  }, []);

  const allDossiers = React.useMemo(() => {
    const worldEntry = {
      ...WORLD_OVERVIEW_DATA,
      ...(VILLAGE_PRESENTATION_CLASSES.world || {}),
    };

    const apiEntries = villageRecords.map((v) => {
      const pres = VILLAGE_PRESENTATION_CLASSES[v.id] || {
        frameClass: `frame-${v.id}`,
        cardClass: `card-${v.id}`,
        badgeClass: `badge-${v.id}`,
        dataLocation: v.id,
      };
      return {
        id: v.id,
        title: v.title,
        kanji: v.kanji,
        sealText: v.seal_text || v.sealText || '',
        sealIcon: v.seal_icon || v.sealIcon || 'fa-compass',
        eraTag: v.era_tag || v.eraTag || '',
        badgeText: v.badge_text || v.badgeText || '',
        badgeIcon: v.badge_icon || v.badgeIcon || 'fa-compass',
        image: v.image,
        imageAlt: v.image_alt || v.imageAlt || v.title,
        desc: v.summary || v.desc || '',
        metaBadges: v.meta_badges || v.metaBadges || [],
        ...pres,
      };
    });

    return [worldEntry, ...apiEntries];
  }, [villageRecords]);

  // Scoped GSAP ScrollTrigger
  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 993px)', () => {
        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (isProgrammaticScroll.current) return;
            const p = self.progress;
            let nextLoc = 'world';
            if (p < 0.16) nextLoc = 'world';
            else if (p < 0.35) nextLoc = 'leaf';
            else if (p < 0.52) nextLoc = 'sand';
            else if (p < 0.69) nextLoc = 'rock';
            else if (p < 0.86) nextLoc = 'cloud';
            else nextLoc = 'mist';

            setActiveLocation(nextLoc);
          },
        });
        worldScrollTriggerRef.current = st;
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  // Camera and aura animation when activeLocation changes
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (svgRef.current && !isReducedMotion) {
      const isMobile = window.innerWidth <= 768;
      const target = isMobile || !VILLAGE_CAMERA_TARGETS[activeLocation]
        ? { scale: 1, x: 0, y: 0 }
        : VILLAGE_CAMERA_TARGETS[activeLocation];

      gsap.to(svgRef.current, {
        scale: target.scale,
        x: target.x,
        y: target.y,
        duration: 0.85,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, [activeLocation]);

  const selectLocation = (locKey) => {
    setActiveLocation(locKey);
  };

  return (
    <section id="shinobi-world-map" className="shinobi-world-section" ref={containerRef}>
      <div className="world-ambient-backdrop">
        <div
          className="world-radial-aura"
          style={{ background: VILLAGE_AURAS[activeLocation] || VILLAGE_AURAS.world }}
        ></div>
        <div className="world-grid-overlay"></div>
      </div>

      <div className="world-map-wrapper">
        <div className="world-stage-container">
          {/* LEFT / CENTER: Interactive Vector World Map Column with Integrated HUD */}
          <div className="world-map-column">
            {/* Tactical Status Label */}
            <div className="world-hud-status">
              <span className="hud-radar-blip"></span>
              <span className="hud-label">SHINOBI WORLD MAP // 5 MAJOR BASTIONS</span>
            </div>

            {/* Location Switcher Buttons */}
            <div className="world-location-nav" role="tablist" aria-label="Village Locations">
              {VILLAGE_NAV_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className={`loc-nav-btn ${activeLocation === item.id ? 'is-active' : ''}`}
                  data-location={item.id}
                  role="tab"
                  aria-selected={activeLocation === item.id ? 'true' : 'false'}
                  tabIndex={activeLocation === item.id ? 0 : -1}
                  onClick={() => selectLocation(item.id, false)}
                  onKeyDown={(e) => {
                    let targetIdx = -1;
                    if (e.key === 'ArrowRight') targetIdx = (idx + 1) % VILLAGE_NAV_ITEMS.length;
                    else if (e.key === 'ArrowLeft')
                      targetIdx = (idx - 1 + VILLAGE_NAV_ITEMS.length) % VILLAGE_NAV_ITEMS.length;
                    else if (e.key === 'Home') targetIdx = 0;
                    else if (e.key === 'End') targetIdx = VILLAGE_NAV_ITEMS.length - 1;

                    if (targetIdx !== -1) {
                      e.preventDefault();
                      selectLocation(VILLAGE_NAV_ITEMS[targetIdx].id, false);
                    }
                  }}
                >
                  <span className={`btn-dot ${item.dotClass}`}></span>
                  <span className="btn-text">{item.label}</span>
                </button>
              ))}
            </div>

            {/* SVG Canvas */}
            <div className="world-canvas-container" id="map-camera">
              <svg
                ref={svgRef}
                className={`world-map-svg ${activeLocation !== 'world' ? 'has-selection' : ''}`}
                viewBox="0 0 1000 680"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Interactive Shinobi World Map"
              >
                {/* Tactical Grid & Coordinate Rings */}
                <g className="map-grid-layer" opacity="0.35">
                  <circle
                    cx="500"
                    cy="340"
                    r="300"
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="4 6"
                  />
                  <circle cx="500" cy="340" r="200" stroke="rgba(255,255,255,0.08)" />
                  <circle
                    cx="500"
                    cy="340"
                    r="100"
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="2 4"
                  />
                  <line
                    x1="500"
                    y1="20"
                    x2="500"
                    y2="660"
                    stroke="rgba(255,255,255,0.05)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="20"
                    y1="340"
                    x2="980"
                    y2="340"
                    stroke="rgba(255,255,255,0.05)"
                    strokeDasharray="4 4"
                  />
                  <rect
                    x="30"
                    y="30"
                    width="940"
                    height="620"
                    stroke="rgba(255,255,255,0.06)"
                    fill="none"
                  />
                  <text
                    x="45"
                    y="55"
                    fill="rgba(197,160,89,0.5)"
                    fontFamily="Montserrat"
                    fontSize="10"
                    letterSpacing="2"
                  >
                    SECTOR NORTH-WEST // N 38°
                  </text>
                  <text
                    x="820"
                    y="55"
                    fill="rgba(197,160,89,0.5)"
                    fontFamily="Montserrat"
                    fontSize="10"
                    letterSpacing="2"
                  >
                    EAST ARCHIPELAGO
                  </text>
                  <text
                    x="45"
                    y="635"
                    fill="rgba(197,160,89,0.5)"
                    fontFamily="Montserrat"
                    fontSize="10"
                    letterSpacing="2"
                  >
                    GREAT DESERT ZONE
                  </text>
                  <text
                    x="820"
                    y="635"
                    fill="rgba(197,160,89,0.5)"
                    fontFamily="Montserrat"
                    fontSize="10"
                    letterSpacing="2"
                  >
                    ISOLATED WATERS
                  </text>
                </g>

                {/* Stylized Shinobi Territory Landmasses */}
                <g className="map-territories-layer">
                  {/* Land of Earth (North-West) */}
                  <path
                    className="territory-path path-earth"
                    d="M 120 80 Q 220 60 360 90 Q 380 190 320 270 Q 200 290 130 220 Z"
                    fill="rgba(180, 83, 9, 0.08)"
                    stroke="rgba(180, 83, 9, 0.35)"
                    strokeWidth="1.5"
                  />
                  <text x="210" y="115" className="territory-label">
                    土ノ国 LAND OF EARTH
                  </text>

                  {/* Land of Lightning (North-East) */}
                  <path
                    className="territory-path path-lightning"
                    d="M 640 70 Q 820 60 900 130 Q 890 250 780 270 Q 670 230 630 160 Z"
                    fill="rgba(56, 189, 248, 0.08)"
                    stroke="rgba(56, 189, 248, 0.35)"
                    strokeWidth="1.5"
                  />
                  <text x="730" y="105" className="territory-label">
                    雷ノ国 LAND OF LIGHTNING
                  </text>

                  {/* Land of Fire (Central-Heart) */}
                  <path
                    className="territory-path path-fire"
                    d="M 370 260 Q 520 220 660 270 Q 670 450 540 530 Q 380 500 360 380 Z"
                    fill="rgba(226, 90, 42, 0.09)"
                    stroke="rgba(226, 90, 42, 0.45)"
                    strokeWidth="1.5"
                  />
                  <text x="480" y="275" className="territory-label highlight-fire">
                    火ノ国 LAND OF FIRE
                  </text>

                  {/* Land of Wind (South-West) */}
                  <path
                    className="territory-path path-wind"
                    d="M 100 320 Q 280 300 340 390 Q 350 560 220 610 Q 90 560 90 440 Z"
                    fill="rgba(240, 165, 0, 0.08)"
                    stroke="rgba(240, 165, 0, 0.35)"
                    strokeWidth="1.5"
                  />
                  <text x="170" y="375" className="territory-label">
                    風ノ国 LAND OF WIND
                  </text>

                  {/* Land of Water (Far-East Islands) */}
                  <path
                    className="territory-path path-water"
                    d="M 770 360 Q 890 330 940 400 Q 930 540 820 560 Q 750 490 760 410 Z"
                    fill="rgba(37, 142, 166, 0.08)"
                    stroke="rgba(37, 142, 166, 0.35)"
                    strokeWidth="1.5"
                  />
                  <text x="820" y="375" className="territory-label">
                    水ノ国 LAND OF WATER
                  </text>
                </g>

                {/* World SVG Connection Route Lines */}
                <g className="map-routes-layer">
                  <path
                    id="route-leaf-sand"
                    className={`map-route-line ${
                      activeLocation === 'leaf' || activeLocation === 'sand' ? 'is-active' : ''
                    }`}
                    d="M 510 400 Q 370 450 240 470"
                  />
                  <path
                    id="route-leaf-rock"
                    className={`map-route-line ${
                      activeLocation === 'leaf' || activeLocation === 'rock' ? 'is-active' : ''
                    }`}
                    d="M 510 400 Q 380 290 250 190"
                  />
                  <path
                    id="route-leaf-cloud"
                    className={`map-route-line ${
                      activeLocation === 'leaf' || activeLocation === 'cloud' ? 'is-active' : ''
                    }`}
                    d="M 510 400 Q 640 280 770 180"
                  />
                  <path
                    id="route-leaf-mist"
                    className={`map-route-line ${
                      activeLocation === 'leaf' || activeLocation === 'mist' ? 'is-active' : ''
                    }`}
                    d="M 510 400 Q 680 430 850 460"
                  />
                  <path id="route-rock-sand" className="map-route-sub" d="M 250 190 Q 180 320 240 470" />
                  <path id="route-rock-cloud" className="map-route-sub" d="M 250 190 Q 500 130 770 180" />
                  <path id="route-cloud-mist" className="map-route-sub" d="M 770 180 Q 870 310 850 460" />
                </g>

                {/* INTERACTIVE LOCATION NODES */}
                {/* 01: HIDDEN LEAF */}
                <g
                  className={`svg-map-node node-leaf ${
                    activeLocation === 'leaf' ? 'is-selected' : ''
                  }`}
                  data-loc="leaf"
                  transform="translate(510, 400)"
                  onClick={() => selectLocation('leaf', true)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle className="node-sonar" r="28" />
                  <circle className="node-sonar delayed" r="42" />
                  <circle className="node-base-ring" r="14" />
                  <circle className="node-core-dot" r="6" />
                  <text y="-20" textAnchor="middle" className="node-svg-title">
                    01 LEAF
                  </text>
                  <text y="24" textAnchor="middle" className="node-svg-kanji">
                    木ノ葉
                  </text>
                </g>

                {/* 02: HIDDEN SAND */}
                <g
                  className={`svg-map-node node-sand ${
                    activeLocation === 'sand' ? 'is-selected' : ''
                  }`}
                  data-loc="sand"
                  transform="translate(240, 470)"
                  onClick={() => selectLocation('sand', true)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle className="node-sonar" r="24" />
                  <circle className="node-base-ring" r="13" />
                  <circle className="node-core-dot" r="5" />
                  <text y="-18" textAnchor="middle" className="node-svg-title">
                    02 SAND
                  </text>
                  <text y="22" textAnchor="middle" className="node-svg-kanji">
                    砂隠れ
                  </text>
                </g>

                {/* 03: HIDDEN ROCK */}
                <g
                  className={`svg-map-node node-rock ${
                    activeLocation === 'rock' ? 'is-selected' : ''
                  }`}
                  data-loc="rock"
                  transform="translate(250, 190)"
                  onClick={() => selectLocation('rock', true)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle className="node-sonar" r="24" />
                  <circle className="node-base-ring" r="13" />
                  <circle className="node-core-dot" r="5" />
                  <text y="-18" textAnchor="middle" className="node-svg-title">
                    03 ROCK
                  </text>
                  <text y="22" textAnchor="middle" className="node-svg-kanji">
                    岩隠れ
                  </text>
                </g>

                {/* 04: HIDDEN CLOUD */}
                <g
                  className={`svg-map-node node-cloud ${
                    activeLocation === 'cloud' ? 'is-selected' : ''
                  }`}
                  data-loc="cloud"
                  transform="translate(770, 180)"
                  onClick={() => selectLocation('cloud', true)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle className="node-sonar" r="24" />
                  <circle className="node-base-ring" r="13" />
                  <circle className="node-core-dot" r="5" />
                  <text y="-18" textAnchor="middle" className="node-svg-title">
                    04 CLOUD
                  </text>
                  <text y="22" textAnchor="middle" className="node-svg-kanji">
                    雲隠れ
                  </text>
                </g>

                {/* 05: HIDDEN MIST */}
                <g
                  className={`svg-map-node node-mist ${
                    activeLocation === 'mist' ? 'is-selected' : ''
                  }`}
                  data-loc="mist"
                  transform="translate(850, 460)"
                  onClick={() => selectLocation('mist', true)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle className="node-sonar" r="24" />
                  <circle className="node-base-ring" r="13" />
                  <circle className="node-core-dot" r="5" />
                  <text y="-18" textAnchor="middle" className="node-svg-title">
                    05 MIST
                  </text>
                  <text y="22" textAnchor="middle" className="node-svg-kanji">
                    霧隠れ
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* RIGHT: Village Visual Frame Reveal & Factual Information Dossier */}
          <div className="world-dossier-panel">
            {/* Visual Frame Deck */}
            <div className="dossier-media-deck">
              {allDossiers.map((village) => (
                <div
                  key={village.id}
                  className={`dossier-frame ${village.frameClass} ${
                    activeLocation === village.id ? 'is-active' : ''
                  }`}
                  data-location={village.dataLocation}
                >
                  <img
                    className="dossier-img"
                    src={village.image}
                    alt={village.imageAlt}
                  />
                  <div className="dossier-ambient-overlay"></div>
                  <div className="frame-manga-bracket top-left"></div>
                  <div className="frame-manga-bracket bottom-right"></div>
                  <div className="frame-location-seal">
                    <i className={`fa-solid ${village.sealIcon}`}></i> {village.sealText}
                  </div>
                </div>
              ))}
            </div>

            {/* Factual Information Cards Deck */}
            <div className="dossier-content-deck">
              {apiError && activeLocation !== 'world' && (
                <div
                  style={{
                    padding: '12px 16px',
                    marginBottom: '16px',
                    background: 'rgba(220, 38, 38, 0.12)',
                    border: '1px solid rgba(220, 38, 38, 0.35)',
                    borderRadius: '6px',
                    color: '#f87171',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <span>Village Registry Sync Error: {apiError}.</span>
                </div>
              )}
              {allDossiers.map((village) => (
                <div
                  key={village.id}
                  className={`dossier-card ${village.cardClass} ${
                    activeLocation === village.id ? 'is-active' : ''
                  }`}
                  data-location={village.dataLocation}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div className={`dossier-card-badge ${village.badgeClass}`}>
                      <span className="d-era-tag">{village.eraTag}</span>
                      <i className={`fa-solid ${village.badgeIcon}`}></i> {village.badgeText}
                    </div>
                    {village.id !== 'world' && (
                      <button
                        type="button"
                        className={`village-favorite-btn ${
                          isFavorited(village.id, 'village') ? 'is-favorited' : ''
                        }`}
                        aria-label={
                          isFavorited(village.id, 'village')
                            ? `Remove ${village.title} from village bookmarks`
                            : `Bookmark ${village.title} in village favorites`
                        }
                        title={
                          isFavorited(village.id, 'village')
                            ? 'Remove from Village Bookmarks'
                            : 'Bookmark in Village Favorites'
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite({
                            item_id: village.id,
                            item_type: 'village',
                            item_title: village.title,
                            item_image: village.image,
                          });
                        }}
                        style={{
                          width: '36px',
                          height: '36px',
                          minWidth: '36px',
                          borderRadius: '50%',
                          background: isFavorited(village.id, 'village')
                            ? 'rgba(153, 27, 27, 0.9)'
                            : 'rgba(8, 8, 8, 0.75)',
                          border: `1px solid ${
                            isFavorited(village.id, 'village')
                              ? 'var(--primary-crimson-bright, #dc2626)'
                              : 'var(--border-subtle, rgba(255, 255, 255, 0.2))'
                          }`,
                          color: isFavorited(village.id, 'village')
                            ? 'var(--secondary-gold-bright, #e5c07b)'
                            : 'var(--text-muted, #a8a29e)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          boxShadow: isFavorited(village.id, 'village')
                            ? '0 0 12px rgba(220, 38, 38, 0.5)'
                            : '0 2px 8px rgba(0, 0, 0, 0.5)',
                          backdropFilter: 'blur(4px)',
                          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <i className={isFavorited(village.id, 'village') ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
                      </button>
                    )}
                  </div>
                  <h2 className="dossier-card-title">{village.title}</h2>
                  <div className="dossier-card-kanji">{village.kanji}</div>
                  <p className="dossier-card-desc">{village.desc}</p>
                  <div className="dossier-meta-grid">
                    {village.metaBadges.map((badge, bIdx) => (
                      <span key={bIdx} className="d-meta-badge">
                        <i className={`fa-solid ${badge.icon}`}></i> {badge.text}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorldMapSection;
