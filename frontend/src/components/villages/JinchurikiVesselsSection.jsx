import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { JINCHURIKI_GALLERY_DATA } from './jinchurikiData';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function JinchurikiVesselsSection() {
  const [currentVesselIdx, setCurrentVesselIdx] = useState(0);
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const thumbNavRef = useRef(null);

  const activeVessel = JINCHURIKI_GALLERY_DATA[currentVesselIdx];

  const handleSelectVessel = (newIndex) => {
    if (newIndex < 0 || newIndex >= JINCHURIKI_GALLERY_DATA.length) return;
    setCurrentVesselIdx(newIndex);

    // Scroll thumbnail strip smoothly if needed
    if (thumbNavRef.current) {
      const activeThumb = thumbNavRef.current.children[newIndex];
      if (activeThumb && thumbNavRef.current.scrollWidth > thumbNavRef.current.clientWidth) {
        const targetLeft =
          activeThumb.offsetLeft -
          thumbNavRef.current.clientWidth / 2 +
          activeThumb.clientWidth / 2;
        thumbNavRef.current.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
    }
  };

  // Entrance ScrollTrigger animation for the Lore Archive header
  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) return;

      const introCard = introRef.current?.querySelector('.lore-content-wrapper');
      const sealSvg = introRef.current?.querySelector('.lore-seal-matrix');
      const kanjiWatermark = introRef.current?.querySelector('.lore-watermark-kanji');

      if (introCard) {
        gsap.fromTo(
          introCard,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (sealSvg) {
        gsap.fromTo(
          sealSvg,
          { opacity: 0, scale: 0.88, rotate: -15 },
          {
            opacity: 0.55,
            scale: 1,
            rotate: 0,
            duration: 1.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (kanjiWatermark) {
        gsap.fromTo(
          kanjiWatermark,
          { opacity: 0, x: -24 },
          {
            opacity: 0.04,
            x: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  // GSAP animation on active vessel change
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReducedMotion && containerRef.current) {
      const activeImg = containerRef.current.querySelector('#active-vessel-img');
      const dossierCol = containerRef.current.querySelector('#vessel-dossier-column');
      const boundStamp = containerRef.current.querySelector('#vessel-bound-stamp');

      if (activeImg) {
        gsap.fromTo(
          activeImg,
          { opacity: 0.25, scale: 1.04, y: 8 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }

      if (dossierCol) {
        gsap.fromTo(
          dossierCol,
          { opacity: 0.25, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      }

      if (boundStamp) {
        gsap.fromTo(
          boundStamp,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.4)' }
        );
      }
    }
  }, [currentVesselIdx]);

  return (
    <section
      className="jinchuriki-section"
      id="jinchuriki-vessels-section"
      ref={containerRef}
    >
      {/* Scoped CSS for the Jinchuriki Lore Archive Header */}
      <style>{`
        .jinchuriki-lore-intro {
          position: relative;
          max-width: 1240px;
          margin: 0 auto 34px;
        }
        .lore-bg-layer {
          position: absolute;
          inset: -20px -30px;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }
        .lore-watermark-kanji {
          position: absolute;
          left: 2%;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-display, "Street Culture", serif);
          font-size: clamp(130px, 17vw, 230px);
          font-weight: 900;
          line-height: 1;
          color: #fff;
          opacity: 0.04;
          user-select: none;
          letter-spacing: 0.05em;
        }
        .lore-seal-matrix {
          position: absolute;
          right: 4%;
          top: 50%;
          transform: translateY(-50%);
          width: clamp(240px, 30vw, 400px);
          height: clamp(240px, 30vw, 400px);
          opacity: 0.55;
          filter: drop-shadow(0 0 20px rgba(220, 38, 38, 0.22));
          animation: sealGentleSpin 120s linear infinite;
        }
        @keyframes sealGentleSpin {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lore-seal-matrix {
            animation: none;
          }
        }
        .lore-ambient-glow {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 220px;
          background: radial-gradient(ellipse, rgba(153, 27, 27, 0.22) 0%, rgba(197, 160, 89, 0.08) 45%, transparent 70%);
          filter: blur(40px);
        }
        .lore-content-wrapper {
          position: relative;
          z-index: 2;
          background: linear-gradient(135deg, rgba(14, 11, 10, 0.94) 0%, rgba(8, 7, 7, 0.96) 100%);
          border: 1px solid rgba(197, 160, 89, 0.28);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85), 0 0 24px rgba(153, 27, 27, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.06);
          padding: 24px 28px 20px;
          border-radius: 8px;
          backdrop-filter: blur(12px);
        }
        .lore-corner {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: #c5a059;
          border-style: solid;
          pointer-events: none;
          opacity: 0.85;
        }
        .corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
        .lore-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          margin-bottom: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-accent, "Varsity Team", monospace, sans-serif);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
        }
        .lore-archive-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #c5a059;
        }
        .lore-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #dc2626;
          box-shadow: 0 0 8px #dc2626;
          animation: loreDotPulse 2s ease-in-out infinite;
        }
        @keyframes loreDotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .lore-divider-slash {
          color: rgba(255, 255, 255, 0.2);
        }
        .lore-archive-sub {
          color: #a3a3a3;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
        }
        .lore-classification-stamp .stamp-box {
          display: inline-block;
          padding: 2px 8px;
          background: rgba(153, 27, 27, 0.2);
          border: 1px solid rgba(220, 38, 38, 0.45);
          color: #ef4444;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .lore-body-grid {
          display: grid;
          grid-template-columns: 1.05fr 1.15fr;
          gap: 32px;
          align-items: center;
        }
        .lore-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.76rem;
          letter-spacing: 0.14em;
          color: #e5c07b;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .lore-main-title {
          font-family: var(--font-heading, "Long Shot", sans-serif);
          font-size: clamp(2rem, 3.4vw, 2.85rem);
          line-height: 1.08;
          letter-spacing: 0.04em;
          color: #f5f0eb;
          margin: 0 0 10px;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.8), 0 0 20px rgba(153, 27, 27, 0.25);
        }
        .title-accent-gold {
          color: #c5a059;
          font-style: italic;
          font-size: 0.88em;
          margin: 0 4px;
        }
        .lore-japanese-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 4px;
        }
        .seal-mini-mark {
          display: inline-block;
          padding: 1px 6px;
          background: rgba(220, 38, 38, 0.22);
          border: 1px solid rgba(220, 38, 38, 0.5);
          color: #fca5a5;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          border-radius: 2px;
        }
        .lore-kanji-sub {
          font-size: 0.82rem;
          color: #c5a059;
          letter-spacing: 0.12em;
          font-weight: 500;
        }
        .lore-quote-box {
          position: relative;
          padding-left: 20px;
          border-left: 2px solid #dc2626;
          background: rgba(18, 14, 12, 0.5);
          padding: 14px 16px 14px 18px;
          border-radius: 0 6px 6px 0;
          margin-bottom: 14px;
        }
        .lore-quote-mark {
          position: absolute;
          top: -8px;
          right: 12px;
          font-size: 1.6rem;
          color: rgba(197, 160, 89, 0.14);
          line-height: 1;
        }
        .lore-lead-text {
          font-size: 0.9rem;
          line-height: 1.65;
          color: #d1d5db;
          margin: 0;
          letter-spacing: 0.01em;
        }
        .lore-telemetry-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .telemetry-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.67rem;
          letter-spacing: 0.1em;
          color: #9ca3af;
          font-family: var(--font-accent, monospace, sans-serif);
        }
        .pill-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }
        .dot-crimson { background: #dc2626; box-shadow: 0 0 6px #dc2626; }
        .dot-gold { background: #c5a059; box-shadow: 0 0 6px #c5a059; }
        .dot-amber { background: #f59e0b; box-shadow: 0 0 6px #f59e0b; }
        .lore-footer-rule {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 18px;
          opacity: 0.5;
        }
        .rule-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(197, 160, 89, 0.4), transparent);
        }
        .rule-diamond {
          color: #c5a059;
          font-size: 0.65rem;
        }
        @media (max-width: 991px) {
          .lore-content-wrapper {
            padding: 20px 22px;
          }
          .lore-body-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .title-break {
            display: none;
          }
          .lore-seal-matrix {
            right: 2%;
            opacity: 0.32;
          }
        }
        @media (max-width: 767px) {
          .jinchuriki-lore-intro {
            margin-bottom: 26px;
          }
          .lore-content-wrapper {
            padding: 16px 14px;
          }
          .lore-top-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding-bottom: 10px;
            margin-bottom: 14px;
          }
          .lore-main-title {
            font-size: 1.8rem;
          }
          .lore-lead-text {
            font-size: 0.85rem;
            line-height: 1.55;
          }
          .lore-watermark-kanji {
            font-size: 110px;
            opacity: 0.03;
          }
          .lore-seal-matrix {
            width: 220px;
            height: 220px;
            right: -20px;
            top: 60%;
            opacity: 0.2;
          }
          .lore-telemetry-tags {
            gap: 6px;
          }
          .telemetry-pill {
            padding: 3px 8px;
            font-size: 0.62rem;
          }
        }
      `}</style>

      <div
        className={`jinchuriki-ambient-aura ${activeVessel.auraClass}`}
        id="vessel-ambient-aura"
      ></div>
      <div className="jinchuriki-container">
        {/* Cinematic Lore Archive Opening Composition */}
        <div className="jinchuriki-lore-intro" ref={introRef}>
          {/* Atmospheric Background & Seal Layer */}
          <div className="lore-bg-layer" aria-hidden="true">
            {/* Giant Kanji Watermark */}
            <span className="lore-watermark-kanji">人柱力</span>

            {/* SVG Seal Matrix: Concentric Eight Trigrams / Torii Seal Runes */}
            <svg
              className="lore-seal-matrix"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="250"
                cy="250"
                r="235"
                stroke="rgba(197, 160, 89, 0.15)"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
              <circle
                cx="250"
                cy="250"
                r="215"
                stroke="rgba(220, 38, 38, 0.22)"
                strokeWidth="1.5"
              />
              <circle
                cx="250"
                cy="250"
                r="185"
                stroke="rgba(197, 160, 89, 0.12)"
                strokeWidth="1"
              />
              <circle
                cx="250"
                cy="250"
                r="150"
                stroke="rgba(220, 38, 38, 0.18)"
                strokeWidth="1.2"
                strokeDasharray="12 8"
              />
              <circle
                cx="250"
                cy="250"
                r="110"
                stroke="rgba(197, 160, 89, 0.2)"
                strokeWidth="1"
              />
              <circle
                cx="250"
                cy="250"
                r="70"
                stroke="rgba(220, 38, 38, 0.28)"
                strokeWidth="1.5"
              />
              {/* Eight Cardinal & Intercardinal Seal Spokes */}
              <line
                x1="250"
                y1="15"
                x2="250"
                y2="485"
                stroke="rgba(197, 160, 89, 0.12)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="15"
                y1="250"
                x2="485"
                y2="250"
                stroke="rgba(197, 160, 89, 0.12)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="84"
                y1="84"
                x2="416"
                y2="416"
                stroke="rgba(220, 38, 38, 0.1)"
                strokeWidth="1"
              />
              <line
                x1="84"
                y1="416"
                x2="416"
                y2="84"
                stroke="rgba(220, 38, 38, 0.1)"
                strokeWidth="1"
              />
              {/* Trigram / Seal Accent Rectangles */}
              <rect x="238" y="24" width="24" height="6" fill="rgba(197, 160, 89, 0.3)" />
              <rect x="238" y="470" width="24" height="6" fill="rgba(197, 160, 89, 0.3)" />
              <rect x="24" y="238" width="6" height="24" fill="rgba(197, 160, 89, 0.3)" />
              <rect x="470" y="238" width="6" height="24" fill="rgba(197, 160, 89, 0.3)" />
              {/* Center Seal Kanji */}
              <text
                x="250"
                y="262"
                textAnchor="middle"
                fill="rgba(220, 38, 38, 0.38)"
                fontSize="38"
                fontFamily="serif"
                fontWeight="bold"
              >
                封
              </text>
            </svg>

            {/* Ambient Chakra Hotspot Glow */}
            <div className="lore-ambient-glow"></div>
          </div>

          {/* Main Editorial Lore Dossier Wrapper */}
          <div className="lore-content-wrapper manga-panel">
            {/* Manga panel corner decorations */}
            <span className="lore-corner corner-tl" aria-hidden="true"></span>
            <span className="lore-corner corner-tr" aria-hidden="true"></span>
            <span className="lore-corner corner-bl" aria-hidden="true"></span>
            <span className="lore-corner corner-br" aria-hidden="true"></span>

            {/* Top Archival Header Bar */}
            <div className="lore-top-bar">
              <div className="lore-archive-badge">
                <span className="lore-pulse-dot"></span>
                <span className="lore-archive-code">ARCHIVE RECORD // SEC-09</span>
                <span className="lore-divider-slash">/</span>
                <span className="lore-archive-sub">S-RANK CONTAINMENT DOSSIER</span>
              </div>
              <div className="lore-classification-stamp">
                <span className="stamp-box">極秘 • CLASSIFIED</span>
              </div>
            </div>

            {/* Main Editorial Body */}
            <div className="lore-body-grid">
              {/* Left Column: Monumental Title & Kanji Identity */}
              <div className="lore-title-col">
                <div className="section-tag-gold lore-eyebrow">
                  <i className="fa-solid fa-people-arrows"></i>
                  <span>HUMAN VESSELS • 人柱力の系譜</span>
                </div>

                <h2 className="section-title-white lore-main-title">
                  THE VESSELS <br className="title-break" />
                  <span className="title-accent-gold">OF</span> DESTINY
                </h2>

                <div className="lore-japanese-badge">
                  <span className="seal-mini-mark">封印録</span>
                  <span className="section-japanese-sub lore-kanji-sub">
                    人柱力 • 尾獣を宿し世界を支えた忍たち
                  </span>
                </div>
              </div>

              {/* Right Column: Editorial Lore Narrative & Historical Context */}
              <div className="lore-desc-col">
                <div className="lore-quote-box">
                  <div className="lore-quote-mark" aria-hidden="true">
                    <i className="fa-solid fa-quote-left"></i>
                  </div>
                  <p className="section-lead-desc lore-lead-text">
                    Across generations, the Jinchūriki became the living boundary between humanity and
                    the ancient forces sealed within them. Feared as weapons, isolated as outcasts, and
                    wielded as instruments of war, they carried powers capable of altering the fate of
                    entire nations.
                  </p>
                </div>

                {/* Archival Metadata Strip */}
                <div className="lore-telemetry-tags">
                  <div className="telemetry-pill">
                    <span className="pill-dot dot-crimson"></span>
                    <span className="pill-label">9 RECORDED HOSTS</span>
                  </div>
                  <div className="telemetry-pill">
                    <span className="pill-dot dot-gold"></span>
                    <span className="pill-label">EIGHT TRIGRAMS MATRIX</span>
                  </div>
                  <div className="telemetry-pill">
                    <span className="pill-dot dot-amber"></span>
                    <span className="pill-label">SUPREME DETERRENT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Editorial Ornamentation Line */}
            <div className="lore-footer-rule" aria-hidden="true">
              <span className="rule-line"></span>
              <span className="rule-diamond">◆</span>
              <span className="rule-line"></span>
            </div>
          </div>
        </div>

        {/* Master Interactive Character Showcase Stage */}
        <div className="vessels-showcase-stage manga-panel" id="vessels-showcase-stage">
          {/* Top Telemetry Bar */}
          <div className="vessels-telemetry-bar">
            <div className="v-telemetry-left">
              <span className="v-status-dot"></span>
              <span className="v-telemetry-label">
                CLASSIFIED JINCHŪRIKI ARCHIVE // 09 RECORDS
              </span>
            </div>
            <div className="v-telemetry-controls">
              <button
                type="button"
                className="vessel-arrow-btn"
                id="vessel-prev-btn"
                aria-label="Previous Jinchūriki"
                onClick={() =>
                  handleSelectVessel(
                    (currentVesselIdx - 1 + JINCHURIKI_GALLERY_DATA.length) %
                      JINCHURIKI_GALLERY_DATA.length
                  )
                }
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <span className="vessel-counter" id="vessel-counter">
                <span id="vessel-cur-num">{activeVessel.index}</span>{' '}
                <span className="counter-slash">/</span> 09
              </span>
              <button
                type="button"
                className="vessel-arrow-btn"
                id="vessel-next-btn"
                aria-label="Next Jinchūriki"
                onClick={() =>
                  handleSelectVessel((currentVesselIdx + 1) % JINCHURIKI_GALLERY_DATA.length)
                }
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Main Gallery Split */}
          <div className="vessel-display-grid">
            {/* Left: Portrait Column */}
            <div className="vessel-portrait-column">
              <div className="vessel-portrait-frame" id="vessel-portrait-frame">
                <img
                  id="active-vessel-img"
                  className="active-vessel-img"
                  src={activeVessel.image}
                  alt={activeVessel.name}
                  style={{ objectPosition: activeVessel.objectPosition || 'center 25%' }}
                />
                <div className="vessel-portrait-gradient"></div>
                <div className="vessel-frame-border-glow"></div>

                {/* Overlay Bound Bijuu Watermark / Stamp */}
                <div className="vessel-bound-stamp" id="vessel-bound-stamp">
                  <span className="stamp-icon">
                    <i className="fa-solid fa-link"></i>
                  </span>
                  <div className="stamp-meta">
                    <span className="stamp-bijuu-num" id="stamp-bijuu-num">
                      {activeVessel.bijuuTail}
                    </span>
                    <span className="stamp-bijuu-name" id="stamp-bijuu-name">
                      {activeVessel.bijuuName}
                    </span>
                  </div>
                </div>

                {/* Index Badge */}
                <div className="vessel-index-badge" id="vessel-index-badge">
                  <span className="idx-text">RECORD</span>
                  <span className="idx-num" id="active-vessel-idx">
                    {activeVessel.index}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Dossier Column */}
            <div className="vessel-dossier-column" id="vessel-dossier-column">
              <div className="v-dossier-header">
                <div className="v-dossier-tags">
                  <span className="v-tag v-tag-village" id="dossier-village-tag">
                    <i className="fa-solid fa-landmark"></i> {activeVessel.village}
                  </span>
                  <span className="v-tag v-tag-bijuu" id="dossier-bijuu-tag">
                    <i className="fa-solid fa-fire"></i> BOUND TO {activeVessel.bijuuTail}
                  </span>
                </div>
                <h3 className="v-dossier-name" id="dossier-name">
                  {activeVessel.name}
                </h3>
                <div className="v-dossier-kanji" id="dossier-kanji">
                  {activeVessel.kanji}
                </div>
                <div className="v-dossier-title" id="dossier-title">
                  {activeVessel.title}
                </div>
              </div>

              <div className="v-dossier-body">
                <div className="v-section-label">
                  <i className="fa-solid fa-scroll"></i> CLASSIFIED HISTORICAL DOSSIER
                </div>
                <p className="v-dossier-summary" id="dossier-summary">
                  {activeVessel.summary}
                </p>

                <div className="v-section-label">
                  <i className="fa-solid fa-bolt"></i> SIGNATURE TRAITS & BIJUU MASTERY
                </div>
                <div className="v-traits-list" id="dossier-traits-list">
                  {activeVessel.traits.map((trait, i) => (
                    <div key={i} className="v-trait-item">
                      <i className="fa-solid fa-circle-check"></i> {trait}
                    </div>
                  ))}
                </div>
              </div>

              <div className="v-dossier-footer" id="dossier-footer">
                <Link
                  to={
                    activeVessel.dbId
                      ? `/archive?shinobi=${activeVessel.dbId}`
                      : '/archive'
                  }
                  className="vessel-record-link"
                  id="dossier-db-link"
                >
                  <i className="fa-solid fa-folder-open"></i> VIEW SHINOBI RECORD →
                </Link>
                <span
                  className="vessel-restricted-badge"
                  id="dossier-restricted-badge"
                  style={{ display: 'none' }}
                >
                  <i className="fa-solid fa-lock"></i> RECORD RESTRICTED // ANBU ARCHIVE
                </span>
              </div>
            </div>
          </div>

          {/* Bottom: Interactive Thumbnail Navigation Strip */}
          <div
            className="vessels-thumbnail-nav"
            id="vessels-thumbnail-nav"
            role="tablist"
            aria-label="Jinchūriki Vessels Gallery"
            ref={thumbNavRef}
          >
            {JINCHURIKI_GALLERY_DATA.map((item, idx) => (
              <button
                key={item.index}
                type="button"
                className={`vessel-thumb-btn ${idx === currentVesselIdx ? 'is-active' : ''}`}
                data-index={idx}
                role="tab"
                aria-selected={idx === currentVesselIdx ? 'true' : 'false'}
                aria-label={`Record ${item.index}: ${item.name} (${item.bijuuName} Vessel)`}
                onClick={() => handleSelectVessel(idx)}
              >
                <div className="thumb-header-row">
                  <span className="thumb-idx">{item.index}</span>
                  <span className="thumb-tail-badge">{item.bijuuTail}</span>
                </div>
                <div className="thumb-avatar-frame">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="thumb-avatar-img"
                    style={{ objectPosition: item.thumbPosition || 'center 16%' }}
                  />
                  <div className="thumb-avatar-shine"></div>
                </div>
                <div className="thumb-name-wrap">
                  <span className="thumb-name-label" title={item.name}>
                    {item.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default JinchurikiVesselsSection;
