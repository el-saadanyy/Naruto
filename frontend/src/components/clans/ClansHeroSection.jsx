import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function ClansHeroSection() {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.clan-editorial-tag', {
        opacity: 0,
        y: -15,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          '.clan-hero-title',
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          '-=0.5'
        )
        .from(
          '.clan-japanese-sub',
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.clan-hero-subtitle',
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          '.clan-explore-prompt',
          {
            opacity: 0,
            y: 10,
            duration: 0.8,
          },
          '-=0.4'
        );
    },
    { scope: heroRef }
  );

  const handleScrollToCodex = () => {
    const codex = document.getElementById('clan-codex');
    if (codex) {
      codex.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="clan-intro-hero" ref={heroRef}>
      <div className="clan-intro-backdrop">
        <img
          className="clan-konoha-watermark"
          src="/assets/image/konohaL.png"
          alt=""
          aria-hidden="true"
        />
        <div className="clan-intro-aura"></div>
      </div>
      <div className="clan-intro-content">
        <div className="clan-editorial-tag">
          <span className="tag-accent-bar"></span>
          <span className="clan-tag-text">
            <i className="fa-solid fa-dna"></i> 忍の一族 • ANCESTRAL BLOODLINE CODEX
          </span>
        </div>
        <h1 className="clan-hero-title">THE CLAN ARCHIVES</h1>
        <div className="clan-japanese-sub">忍の一族 • 血継限界の系譜</div>
        <p className="clan-hero-subtitle">
          NOBLE LINEAGES, INHERITED TECHNIQUES & SHINOBI HERITAGE
        </p>
        <div
          className="clan-explore-prompt"
          onClick={handleScrollToCodex}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleScrollToCodex()}
        >
          <span>SCROLL OR CLICK TO INSPECT NOBLE BLOODLINES</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
    </section>
  );
}

export default ClansHeroSection;
