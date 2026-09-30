import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function HeroSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) return;

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background reveal
      heroTl.fromTo(
        '.hero-bg-image',
        { scale: 1.18, filter: 'brightness(0.3) contrast(1.1)' },
        { scale: 1, filter: 'brightness(0.6) contrast(1.15)', duration: 2.2, ease: 'power2.out' }
      );

      // Watermark & Badge
      heroTl.fromTo(
        '.hero-watermark',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.4 },
        '-=1.8'
      );

      const konohaWatermark = containerRef.current?.querySelector('.hero-konoha-watermark');
      if (konohaWatermark) {
        heroTl.fromTo(
          konohaWatermark,
          { opacity: 0, scale: 0.9, rotation: -5 },
          { opacity: 0.045, scale: 1, rotation: 0, duration: 2, ease: 'power2.out' },
          '-=1.6'
        );

        gsap.to(konohaWatermark, {
          y: -18,
          rotation: 4,
          repeat: -1,
          yoyo: true,
          duration: 9,
          ease: 'sine.inOut',
        });
      }

      heroTl.fromTo(
        '.hero-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=1.4'
      );

      // Title reveal
      heroTl.fromTo(
        '.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1 },
        '-=1.1'
      );

      // Energy line draw
      heroTl.fromTo(
        '.hero-energy-line',
        { width: '0%' },
        { width: '100%', duration: 1.2, ease: 'power2.inOut' },
        '-=0.8'
      );

      // Description & CTA buttons
      heroTl.fromTo(
        '.hero-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.7'
      );

      heroTl.fromTo(
        '.hero-actions a',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8 },
        '-=0.6'
      );

      heroTl.fromTo(
        '.hero-scroll-indicator',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );

      // Hero Scroll Parallax
      gsap.to('.hero-bg-image', {
        y: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.hero-content', {
        y: -50,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="hero-bg-wrapper">
        <img
          className="hero-bg-image"
          src="/assets/image/main.jpeg"
          alt="Naruto Uzumaki Shinobi World"
        />
        <div className="hero-overlay"></div>
      </div>
      <img
        className="hero-konoha-watermark"
        src="/assets/image/konohaL.png"
        alt=""
        aria-hidden="true"
      />
      <div className="hero-watermark">NARUTO</div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="shinobi-seal-tag">[ SHINOBI CHRONICLE // NO. 010260 ]</span>
          <i className="fa-solid fa-fire"></i> THE WILL OF FIRE • 火の意志
        </div>
        <h1 className="hero-title">
          UZUMAKI NARUTO
          <span className="kanji-sub">THE SEVENTH HOKAGE • うずまきナルト</span>
        </h1>
        <div className="hero-energy-line">
          <span className="chakra-spark"></span>
        </div>
        <p className="hero-description">
          From a feared and ostracized orphan carrying the Nine-Tails beast to the legendary savior of
          the shinobi world. Witness the unbreakable journey of perseverance, bonds, and destiny.
        </p>
        <div className="hero-actions">
          <a href="#story" className="btn-primary">
            <i className="fa-solid fa-scroll"></i> Explore Saga
          </a>
          <Link to="/villages" className="btn-secondary">
            <i className="fa-solid fa-mountain-sun"></i> Shinobi Villages
          </Link>
        </div>
      </div>
      <a href="#awakening" className="hero-scroll-indicator" aria-label="Scroll down">
        <span>Scroll</span>
        <i className="fa-solid fa-chevron-down"></i>
      </a>
    </section>
  );
}

export default HeroSection;
