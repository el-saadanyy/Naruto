import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { JINCHURIKI_GALLERY_DATA } from './jinchurikiData';

function JinchurikiVesselsSection() {
  const [currentVesselIdx, setCurrentVesselIdx] = useState(0);
  const containerRef = useRef(null);
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
      <div
        className={`jinchuriki-ambient-aura ${activeVessel.auraClass}`}
        id="vessel-ambient-aura"
      ></div>
      <div className="jinchuriki-container">
        {/* Gallery Header */}
        <div className="jinchuriki-header text-center">
          <div className="section-tag-gold">
            <i className="fa-solid fa-people-arrows"></i> HUMAN VESSELS • 人柱力の系譜
          </div>
          <h2 className="section-title-white">THE VESSELS OF DESTINY</h2>
          <div className="section-japanese-sub">人柱力 • 尾獣を宿し世界を支えた忍たち</div>
          <p className="section-lead-desc">
            Shunned as living weapons yet destined to shape international history, the Jinchūriki
            bore the immense burden of harboring primordial chakra calamities within their souls.
          </p>
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
