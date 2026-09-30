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

      <div className="alliance-hero-content">
        <div className="faction-badge">
          <span className="badge-line"></span>
          <span className="badge-text">
            <i className="fa-solid fa-shield-halved"></i> WAR ARCHIVES • 忍の勢力記録
          </span>
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
