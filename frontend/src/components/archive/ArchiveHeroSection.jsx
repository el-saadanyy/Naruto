import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function ArchiveHeroSection({ totalCount, visibleCount }) {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.db-editorial-tag', {
        opacity: 0,
        y: -15,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          '.db-title',
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          '-=0.5'
        )
        .from(
          '.db-japanese-sub',
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.db-subtitle',
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          '.db-metrics-ribbon',
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
    <section className="db-hero-section" ref={heroRef}>
      <img
        className="hero-konoha-watermark"
        src="/assets/image/konohaL.png"
        alt=""
        aria-hidden="true"
      />
      <div className="db-hero-content">
        <div className="db-editorial-tag">
          <span className="tag-accent-bar"></span>
          <span className="db-tag-text">
            <i className="fa-solid fa-scroll"></i> CLASSIFIED DOSSIER ARCHIVE • 忍名簿
          </span>
        </div>
        <h1 className="db-title">SHINOBI ARCHIVE</h1>
        <div className="db-japanese-sub">忍の体系 • 歴代忍名簿</div>
        <p className="db-subtitle">
          CENTRALIZED INTELLIGENCE DOSSIER ACROSS ALL FIVE GREAT NATIONS, NOBLE CLANS, S-RANK NINJA & HISTORICAL ERAS
        </p>

        {/* Metrics Ribbon */}
        <div className="db-metrics-ribbon">
          <div className="metric-pill">
            <i className="fa-solid fa-database"></i>
            <span>
              TOTAL PROFILES: <span className="metric-highlight">{totalCount}</span>
            </span>
          </div>
          <div className="metric-pill">
            <i className="fa-solid fa-filter"></i>
            <span>
              MATCHING: <span className="metric-highlight">{visibleCount}</span>
            </span>
          </div>
          <div className="metric-pill">
            <i className="fa-solid fa-shield-halved"></i>
            <span>
              CLEARANCE: <span className="metric-highlight">S-RANK // TOP SECRET</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArchiveHeroSection;
