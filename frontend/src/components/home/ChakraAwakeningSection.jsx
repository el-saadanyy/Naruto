import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ChakraAwakeningSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) return;

      const awakeningTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 1. Chakra Axis Line expands across center
      awakeningTl.fromTo(
        '.awakening-axis-line',
        { width: '0%', opacity: 0 },
        { width: '100%', opacity: 1, duration: 1.5, ease: 'power2.inOut' }
      );

      // 2. Radial Chakra Glow blooms
      awakeningTl.fromTo(
        '.awakening-radial-glow',
        { scale: 0.5, opacity: 0 },
        { scale: 1.25, opacity: 0.9, duration: 1.8, ease: 'power1.out' },
        '-=1.2'
      );

      // 3. Masked Image Reveal via clip-path
      awakeningTl.fromTo(
        '.awakening-media-wrapper',
        { clipPath: 'inset(50% 0 50% 0)', opacity: 0 },
        { clipPath: 'inset(0% 0 0% 0)', opacity: 1, duration: 2.2, ease: 'power2.inOut' },
        '-=1.2'
      );

      awakeningTl.fromTo(
        '.awakening-img',
        { scale: 1.18, filter: 'brightness(0.6) contrast(1.2)' },
        { scale: 1.02, filter: 'brightness(0.9) contrast(1.1)', duration: 2.2, ease: 'power1.out' },
        '<'
      );

      // 4. Typography reveal (Chakra Awakening + The Will of Fire)
      awakeningTl.fromTo(
        '.awakening-text-content',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.6, ease: 'power2.out' },
        '-=1.4'
      );

      // 5. Grand hold and smooth dissolve towards Chapter 01
      awakeningTl.to(
        ['.awakening-text-content', '.awakening-media-wrapper', '.awakening-axis-line'],
        { opacity: 0.15, y: -25, duration: 1.2, ease: 'power1.in' },
        '+=0.4'
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="awakening" className="chakra-awakening-section" ref={containerRef}>
      <div className="awakening-backdrop">
        <div className="awakening-radial-glow"></div>
        <img
          className="awakening-konoha-watermark"
          src="/assets/image/konohaL.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="awakening-container">
        {/* Central Expanding Energy Axis */}
        <div className="awakening-axis-line"></div>

        {/* Masked Image Reveal */}
        <div className="awakening-media-wrapper manga-panel">
          <img
            className="awakening-img"
            src="/assets/image/main8.jpg"
            alt="Naruto Chakra Awakening"
          />
          <div className="awakening-img-overlay"></div>
        </div>

        {/* Cinematic Awakening Typography */}
        <div className="awakening-text-content">
          <div className="awakening-badge">
            <i className="fa-solid fa-fire-flame-curved"></i> CHAKRA AWAKENING • チャクラ覚醒
          </div>
          <h2 className="awakening-title">THE WILL OF FIRE</h2>
          <p className="awakening-subtitle">The strength to endure. The will to protect.</p>
        </div>
      </div>
    </section>
  );
}

export default ChakraAwakeningSection;
