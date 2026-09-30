import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function VillagesHeroSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) return;

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl.fromTo(
        '.world-intro-aura',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' }
      );

      heroTl.fromTo(
        '.world-konoha-watermark',
        { opacity: 0, scale: 0.9, rotation: -4 },
        { opacity: 0.045, scale: 1, rotation: 0, duration: 2, ease: 'power2.out' },
        '-=1.4'
      );

      heroTl.fromTo(
        '.world-editorial-tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=1.4'
      );

      heroTl.fromTo(
        '.world-hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1 },
        '-=1.0'
      );

      heroTl.fromTo(
        ['.world-japanese-sub', '.world-hero-subtitle'],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        '-=0.8'
      );

      heroTl.fromTo(
        '.world-explore-prompt',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );
    },
    { scope: containerRef }
  );

  const handleExploreClick = () => {
    const target = document.querySelector('#shinobi-world-map');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="world-intro-hero" ref={containerRef}>
      <div className="world-intro-backdrop">
        <img
          className="world-konoha-watermark"
          src="/assets/image/konohaL.png"
          alt=""
          aria-hidden="true"
        />
        <div className="world-intro-aura"></div>
      </div>
      <div className="world-intro-content">
        <div className="world-editorial-tag">
          <span className="tag-accent-bar"></span>
          <span className="world-tag-text">
            <i className="fa-solid fa-compass"></i> 忍の世界 • TERRITORIAL ATLAS
          </span>
        </div>
        <h1 className="world-hero-title">THE SHINOBI WORLD</h1>
        <div className="world-japanese-sub">忍の世界 • 五大国</div>
        <p className="world-hero-subtitle">THE FIVE GREAT SHINOBI VILLAGES</p>
        <div
          className="world-explore-prompt"
          onClick={handleExploreClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleExploreClick();
            }
          }}
        >
          <span>SCROLL OR CLICK TO EXPLORE LOCATIONS</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
    </section>
  );
}

export default VillagesHeroSection;
