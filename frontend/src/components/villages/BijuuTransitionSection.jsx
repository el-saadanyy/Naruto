import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function BijuuTransitionSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) return;

      const transArt = containerRef.current?.querySelector('.bijuu-transition-backdrop');
      const transBody = containerRef.current?.querySelector('.bijuu-trans-content');

      if (transArt && transBody) {
        gsap.fromTo(
          transArt,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          transBody.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const handleScrollDown = () => {
    const target = document.querySelector('#bijuu-shukaku');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bijuu-transition-section" id="bijuu-world-transition" ref={containerRef}>
      <div className="bijuu-transition-backdrop">
        <img
          className="bijuu-trans-bg-img"
          src="/assets/image/bijuu_transition_assembly.png"
          alt="Nine Tailed Beasts Gathering"
        />
        <div className="bijuu-trans-overlay"></div>
        <div className="bijuu-trans-particles"></div>
      </div>
      <div className="bijuu-trans-content">
        <div className="trans-badge">
          <span className="badge-accent-bar"></span>
          <span className="trans-badge-text">
            <i className="fa-solid fa-fire-flame-curved"></i> PRIMORDIAL POWER • 忍と尾獣の歴史
          </span>
        </div>
        <h2 className="trans-title">THE NINE TAILED BEASTS</h2>
        <div className="trans-kanji-sub">九大尾獣 • 歴史と国境を形作った生けるチャクラ</div>
        <p className="trans-lead-quote">
          "THE FIVE GREAT VILLAGES WERE FORGED BY BOUNDARIES. THE NINE BEASTS FORGED THEIR DESTINY."
        </p>
        <p className="trans-desc">
          Born from the shattered chakra of the Ten-Tails and distributed by the First Hokage at the
          historic First Five Kage Summit, the Bijuu served as the supreme military deterrents of the
          shinobi world. Explore the nine living titans and the unbreakable bonds forged with their
          human vessels.
        </p>
        <div
          className="trans-scroll-down"
          onClick={handleScrollDown}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleScrollDown();
            }
          }}
        >
          <span>BEGIN TAILED BEAST CHRONICLE</span>
          <i className="fa-solid fa-angles-down"></i>
        </div>
      </div>
    </section>
  );
}

export default BijuuTransitionSection;
