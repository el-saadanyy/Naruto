import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function AllianceHeroSection() {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.faction-badge', {
        opacity: 0,
        y: -15,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          '.alliance-title',
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          '-=0.5'
        )
        .from(
          '.alliance-kanji-sub',
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.alliance-subtitle',
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          '.alliance-lead-desc',
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
          },
          '-=0.4'
        )
        .from(
          '.ranking-disclaimer-box',
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          '-=0.4'
        );
    },
    { scope: heroRef }
  );

  return (
    <section className="alliance-hero-section" ref={heroRef}>
      <div className="alliance-hero-atmosphere">
        <div className="hero-smoke-particles"></div>
        <div className="hero-crimson-vignette"></div>
        <img
          className="hero-konoha-watermark"
          src="/assets/image/konohaL.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <style>{`
        .war-archives-marker {
          display: inline-flex;
          align-items: center;
          position: relative;
          background: linear-gradient(135deg, rgba(18, 12, 12, 0.92) 0%, rgba(8, 8, 8, 0.95) 100%);
          border: 1px solid rgba(197, 160, 89, 0.32);
          border-left: 3px solid var(--primary-crimson-bright, #dc2626);
          border-radius: 2px;
          padding: 6px 16px 6px 14px;
          margin-bottom: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.75), inset 0 0 14px rgba(153, 27, 27, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          text-align: left;
        }

        .war-archives-marker .marker-corner {
          position: absolute;
          width: 5px;
          height: 5px;
          pointer-events: none;
        }

        .war-archives-marker .marker-corner-tr {
          top: -1px;
          right: -1px;
          border-top: 1px solid rgba(197, 160, 89, 0.55);
          border-right: 1px solid rgba(197, 160, 89, 0.55);
        }

        .war-archives-marker .marker-corner-bl {
          bottom: -1px;
          left: -1px;
          border-bottom: 1px solid rgba(197, 160, 89, 0.55);
          border-left: 1px solid rgba(197, 160, 89, 0.55);
        }

        .war-archives-marker .marker-inner {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }

        .war-archives-marker .marker-icon {
          color: var(--primary-crimson-bright, #dc2626);
          font-size: 0.82rem;
          display: inline-flex;
          align-items: center;
          filter: drop-shadow(0 0 6px rgba(220, 38, 38, 0.5));
        }

        .war-archives-marker .marker-title {
          font-family: var(--font-display, "Cinzel", serif);
          font-size: 0.84rem;
          font-weight: 800;
          letter-spacing: 2.8px;
          color: var(--text-cream, #f5f0eb);
          text-transform: uppercase;
        }

        .war-archives-marker .marker-divider {
          color: var(--secondary-gold, #c5a059);
          font-size: 0.72rem;
          opacity: 0.65;
          margin: 0 1px;
        }

        .war-archives-marker .marker-kanji {
          font-family: var(--font-accent, "Noto Serif JP", serif);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 1.8px;
          color: var(--secondary-gold-bright, #e5c07b);
          opacity: 0.92;
          text-shadow: 0 0 10px rgba(197, 160, 89, 0.35);
        }

        @media (max-width: 600px) {
          .war-archives-marker {
            padding: 5px 12px 5px 10px;
            margin-bottom: 14px;
          }
          .war-archives-marker .marker-inner {
            gap: 7px;
          }
          .war-archives-marker .marker-title {
            font-size: 0.74rem;
            letter-spacing: 1.8px;
          }
          .war-archives-marker .marker-kanji {
            font-size: 0.7rem;
            letter-spacing: 1.2px;
          }
          .war-archives-marker .marker-icon {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 380px) {
          .war-archives-marker .marker-inner {
            flex-wrap: wrap;
            justify-content: center;
            gap: 4px;
          }
          .war-archives-marker .marker-divider {
            display: none;
          }
        }
      `}</style>

      <div className="alliance-hero-content">
        <div className="faction-badge war-archives-marker">
          <span className="marker-corner marker-corner-tr" aria-hidden="true"></span>
          <span className="marker-corner marker-corner-bl" aria-hidden="true"></span>
          <div className="marker-inner">
            <span className="marker-icon" aria-hidden="true">
              <i className="fa-solid fa-shield-halved"></i>
            </span>
            <span className="marker-title">WAR ARCHIVES</span>
            <span className="marker-divider" aria-hidden="true">•</span>
            <span className="marker-kanji">忍の勢力記録</span>
          </div>
        </div>
        <h1 className="alliance-title">ALLIANCE</h1>
        <div className="alliance-kanji-sub">忍の勢力 • 歴史を変えた軍事連合と影の結社</div>
        <p className="alliance-subtitle">
          &quot;FACTIONS THAT CHANGED THE SHINOBI WORLD&quot;
        </p>
        <p className="alliance-lead-desc">
          A classified intelligence retrospective exploring the great military coalitions, global
          shadow syndicates, and legendary combat units that reshaped international warfare, balance
          of power, and historical destiny.
        </p>

        {/* Analytical Scale Notice */}
        <div className="ranking-disclaimer-box manga-panel">
          <i className="fa-solid fa-circle-info"></i>
          <div>
            <strong>ANALYTICAL CLASSIFICATION NOTICE:</strong>
            <span>
              This archive is an editorial historical comparison indexed by collective military
              scale, geopolitical influence, individual member lethality, and war impact across
              distinct eras. Entries distinguish between sovereign military coalitions, shadow
              syndicates, diplomatic treaties, and strike units.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllianceHeroSection;
