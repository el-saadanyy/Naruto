import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BIJUU_DATA } from './bijuuData.js';
import { useFavorites } from '../../context/FavoritesContext.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function BijuuStagesSection() {
  const { isFavorited, toggleFavorite } = useFavorites();
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) return;

      const stages = containerRef.current?.querySelectorAll('.bijuu-stage');
      stages?.forEach((stage) => {
        const headerBar = stage.querySelector('.bijuu-header-bar');
        const visualCol = stage.querySelector('.bijuu-visual-col');
        const intelCol = stage.querySelector('.bijuu-intel-col');

        if (headerBar) {
          gsap.fromTo(
            headerBar,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stage,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (visualCol) {
          gsap.fromTo(
            visualCol,
            { opacity: 0, scale: 0.96, y: 35 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stage,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (intelCol) {
          gsap.fromTo(
            intelCol.children,
            { opacity: 0, x: 25 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.12,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stage,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {BIJUU_DATA.map((bijuu) => (
        <section
          key={bijuu.id}
          className={`bijuu-stage ${bijuu.stageClass}`}
          id={bijuu.id}
        >
          <div className={`bijuu-env-aura ${bijuu.auraClass}`}></div>
          <div className="bijuu-container">
            <div className="bijuu-header-bar">
              <div className={`bijuu-tail-badge ${bijuu.badgeThemeClass}`}>
                <span className="tail-num">{bijuu.tailNum}</span>
                <span className="tail-kanji">{bijuu.tailKanji}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="bijuu-domain-tag">
                  <i className={`fa-solid ${bijuu.domainIcon}`}></i> {bijuu.domainTag}
                </div>
                <button
                  type="button"
                  className={`bijuu-favorite-btn ${
                    isFavorited(bijuu.id, 'bijuu') ? 'is-favorited' : ''
                  }`}
                  aria-label={
                    isFavorited(bijuu.id, 'bijuu')
                      ? `Remove ${bijuu.name} from Tailed Beast bookmarks`
                      : `Bookmark ${bijuu.name} in Tailed Beast favorites`
                  }
                  title={
                    isFavorited(bijuu.id, 'bijuu')
                      ? 'Remove from Tailed Beast Bookmarks'
                      : 'Bookmark in Tailed Beast Favorites'
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite({
                      item_id: bijuu.id,
                      item_type: 'bijuu',
                      item_title: `${bijuu.name} (${bijuu.tailNum})`,
                      item_image: bijuu.image,
                    });
                  }}
                  style={{
                    width: '36px',
                    height: '36px',
                    minWidth: '36px',
                    borderRadius: '50%',
                    background: isFavorited(bijuu.id, 'bijuu')
                      ? 'rgba(153, 27, 27, 0.9)'
                      : 'rgba(8, 8, 8, 0.75)',
                    border: `1px solid ${
                      isFavorited(bijuu.id, 'bijuu')
                        ? 'var(--primary-crimson-bright, #dc2626)'
                        : 'var(--border-subtle, rgba(255, 255, 255, 0.2))'
                    }`,
                    color: isFavorited(bijuu.id, 'bijuu')
                      ? 'var(--secondary-gold-bright, #e5c07b)'
                      : 'var(--text-muted, #a8a29e)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    boxShadow: isFavorited(bijuu.id, 'bijuu')
                      ? '0 0 12px rgba(220, 38, 38, 0.5)'
                      : '0 2px 8px rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <i
                    className={
                      isFavorited(bijuu.id, 'bijuu')
                        ? 'fa-solid fa-bookmark'
                        : 'fa-regular fa-bookmark'
                    }
                  ></i>
                </button>
              </div>
            </div>

            <div className="bijuu-stage-grid">
              <div className="bijuu-visual-col">
                <div className={`bijuu-media-frame manga-panel ${bijuu.frameClass}`}>
                  <img
                    className={`bijuu-img ${bijuu.imgClass}`}
                    src={bijuu.image}
                    alt={bijuu.imageAlt}
                  />
                  <div className="bijuu-media-overlay"></div>
                  <div className={`bijuu-seal-stamp ${bijuu.stampClass}`}>
                    <span className="stamp-kanji">{bijuu.stampKanji}</span>
                    <span className="stamp-label">{bijuu.stampLabel}</span>
                  </div>
                </div>

                <div className="bijuu-metric-strip manga-panel">
                  {bijuu.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="b-metric">
                      <span className="bm-label">{metric.label}</span>
                      <span className={`bm-value ${metric.valueClass || ''}`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bijuu-intel-col">
                <span className={`bijuu-intel-badge ${bijuu.badgeThemeClass}`}>
                  <i className={`fa-solid ${bijuu.intelBadgeIcon}`}></i> {bijuu.intelBadgeText}
                </span>
                <h3 className={`bijuu-name ${bijuu.nameClass || ''}`}>{bijuu.name}</h3>
                <div className={`bijuu-kanji-title ${bijuu.kanjiClass || ''}`}>
                  {bijuu.kanjiTitle}
                </div>

                <p className="bijuu-synopsis">{bijuu.synopsis}</p>

                <div className={`bijuu-connection-box manga-panel ${bijuu.connectionBorderClass}`}>
                  <div className="conn-header">
                    <i className="fa-solid fa-link"></i>
                    <span className="conn-title">VILLAGE ✕ JINCHŪRIKI RELATIONSHIP</span>
                  </div>
                  <div className="conn-grid">
                    <div className="conn-item">
                      <span className="conn-label">HISTORICAL VILLAGE</span>
                      <span className={`conn-val ${bijuu.historicalVillageClass || ''}`}>
                        <i className={`fa-solid ${bijuu.historicalVillageIcon}`}></i> {bijuu.historicalVillage}
                      </span>
                    </div>
                    <div className="conn-item">
                      <span className="conn-label">PRIMARY JINCHŪRIKI</span>
                      <span className="conn-val text-white">
                        {bijuu.primaryJinchuriki}
                      </span>
                    </div>
                  </div>
                  <p className="conn-summary">{bijuu.connectionSummary}</p>
                </div>

                <div className="bijuu-breakdown-card manga-panel">
                  <h4 className={`b-card-title ${bijuu.traitsTitleClass || ''}`}>
                    <i className={`fa-solid ${bijuu.traitsTitleIcon}`}></i> SIGNATURE MYTHOLOGY & COMBAT TRAITS
                  </h4>
                  <div className="bijuu-traits-grid">
                    {bijuu.traits.map((trait, tIdx) => (
                      <div key={tIdx} className="trait-node">
                        <strong>{trait.title}:</strong> {trait.desc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default BijuuStagesSection;
