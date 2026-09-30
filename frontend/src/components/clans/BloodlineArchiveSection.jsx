import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BLOODLINES_DATA } from './bloodlineData.js';

gsap.registerPlugin(ScrollTrigger);

function BloodlineArchiveSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from('.bloodline-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="bloodline-archive" className="bloodline-section" ref={sectionRef}>
      <div className="bloodline-container">
        <div className="section-tag" style={{ textAlign: 'center', marginBottom: '8px' }}>
          <i className="fa-solid fa-dna"></i> HEREDITARY GENETICS • 血継限界の覚醒
        </div>
        <h2 className="bloodline-main-title">THE BLOODLINE ARCHIVE</h2>
        <p className="bloodline-subtitle">
          GENETIC ANOMALIES & SECRET HIDEN TRANSMISSIONS PASSED THROUGH NOBLE SHINOBI BLOOD
        </p>

        <div className="bloodline-grid">
          {BLOODLINES_DATA.map((item) => (
            <div key={item.id} className="bloodline-card manga-panel" data-bloodline={item.id}>
              <div className={`bloodline-type-badge ${item.badgeClass}`}>
                <i className={`fa-solid ${item.badgeIcon}`}></i> {item.badgeText}
              </div>
              <h3 className="bloodline-card-name">{item.name}</h3>
              <div className="bloodline-kanji">{item.kanji}</div>
              <p className="bloodline-desc">{item.desc}</p>
              <div className="lineage-flow">
                {item.flow.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className={`flow-step ${step.highlight ? 'highlight' : ''}`}>
                      {step.label}
                    </span>
                    {idx < item.flow.length - 1 && (
                      <i className="fa-solid fa-arrow-right"></i>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BloodlineArchiveSection;
