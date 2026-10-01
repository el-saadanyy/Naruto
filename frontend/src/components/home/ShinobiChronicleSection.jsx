import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ShinobiChronicleSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) return;

      const chronicleSection = containerRef.current;
      if (!chronicleSection) return;

      const node1 = chronicleSection.querySelector('.node-1');
      const node2 = chronicleSection.querySelector('.node-2');
      const node3 = chronicleSection.querySelector('.node-3');

      const chronicleTl = gsap.timeline({
        scrollTrigger: {
          trigger: chronicleSection,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.32) {
              node1?.classList.add('is-active');
              node2?.classList.remove('is-active');
              node3?.classList.remove('is-active');
            } else if (p < 0.68) {
              node1?.classList.remove('is-active');
              node2?.classList.add('is-active');
              node3?.classList.remove('is-active');
            } else {
              node1?.classList.remove('is-active');
              node2?.classList.remove('is-active');
              node3?.classList.add('is-active');
            }
          },
        },
      });

      // Node click navigation
      const chronicleNodes = [node1, node2, node3];
      const stageProgress = [0.05, 0.5, 0.95];
      chronicleNodes.forEach((node, idx) => {
        if (!node) return;
        node.addEventListener('click', () => {
          if (!chronicleTl.scrollTrigger) return;
          const st = chronicleTl.scrollTrigger;
          const targetY = st.start + (st.end - st.start) * stageProgress[idx];
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        });
      });

      // --- STAGE 01 -> Active & Progress to Node 2 ---
      chronicleTl
        .to(['.track-fill.fill-1', '.chronicle-track-fill.fill-1'], {
          width: '100%',
          duration: 2,
          ease: 'none',
        })
        .to(
          '.frame-01 img',
          {
            scale: 1.0,
            duration: 2,
            ease: 'none',
          },
          '<'
        );

      // --- TRANSITION 01 -> 02 (Lateral Slash & Diagonal Wipe) ---
      chronicleTl
        // 1. Chakra Slash line streaks across the viewport
        .fromTo(
          '.chronicle-slash-line',
          { width: '0%', opacity: 0, left: '0%' },
          { width: '100%', opacity: 1, duration: 0.8, ease: 'power2.inOut' }
        )
        // 2. Number 01 shifts and fades, Number 02 ascends
        .to('.num-01', { opacity: 0, x: -60, duration: 1, ease: 'power2.in' }, '-=0.6')
        .to('.num-02', { opacity: 0.08, x: 0, duration: 1, ease: 'power2.out' }, '-=0.4')
        // 3. Narrative Card 01 exits left, Card 02 enters from right
        .to('.card-01', { opacity: 0, x: -40, duration: 0.9, ease: 'power2.in' }, '-=0.8')
        .to('.card-02', { opacity: 1, x: 0, duration: 1.1, ease: 'power2.out' }, '-=0.3')
        // 4. Visual Frame 01 darkens & shifts, Frame 02 unclips diagonally
        .to(
          '.frame-01',
          {
            opacity: 0.15,
            x: -50,
            scale: 0.96,
            filter: 'brightness(0.3) blur(2px)',
            duration: 1.2,
            ease: 'power2.inOut',
          },
          '-=1.0'
        )
        .to(
          '.frame-02',
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power2.inOut',
          },
          '-=0.9'
        )
        .to('.chronicle-slash-line', { opacity: 0, duration: 0.6, ease: 'power1.out' }, '-=0.5')
        // 5. Subtle background aura shift (Chakra surge)
        .to(
          ['.chronicle-ambient-aura', '.chronicle-aura'],
          {
            background:
              'radial-gradient(circle at 50% 50%, rgba(226, 90, 42, 0.12) 0%, rgba(8, 8, 8, 0) 70%)',
            duration: 1.2,
          },
          '-=1.0'
        );

      // --- STAGE 02 Progress to Node 3 ---
      chronicleTl
        .to(['.track-fill.fill-2', '.chronicle-track-fill.fill-2'], {
          width: '100%',
          duration: 2.2,
          ease: 'none',
        })
        .to(
          '.frame-02 img',
          {
            scale: 1.0,
            duration: 2.2,
            ease: 'none',
          },
          '<'
        );

      // --- TRANSITION 02 -> 03 (Vertical Pillar Beam & Circular Aperture Expansion) ---
      chronicleTl
        // 1. Vertical Chakra Pillar Beam streaks upward
        .fromTo(
          '.chronicle-pillar-beam',
          { height: '0%', opacity: 0 },
          { height: '140%', opacity: 1, duration: 0.9, ease: 'power3.inOut' }
        )
        // 2. Number 02 exits, Number 03 ascends with golden presence
        .to('.num-02', { opacity: 0, y: -40, duration: 1, ease: 'power2.in' }, '-=0.6')
        .to('.num-03', { opacity: 0.08, y: 0, duration: 1, ease: 'power2.out' }, '-=0.4')
        // 3. Narrative Card 02 exits upward, Card 03 enters gracefully
        .to('.card-02', { opacity: 0, y: -30, duration: 0.9, ease: 'power2.in' }, '-=0.8')
        .to('.card-03', { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, '-=0.3')
        // 4. Visual Frame 02 dissolves/scales, Frame 03 expands via circular mask
        .to(
          '.frame-02',
          {
            opacity: 0.1,
            scale: 1.06,
            filter: 'brightness(0.2) blur(3px)',
            duration: 1.2,
            ease: 'power2.inOut',
          },
          '-=1.0'
        )
        .to(
          '.frame-03',
          {
            clipPath: 'circle(100% at 50% 50%)',
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power2.inOut',
          },
          '-=0.9'
        )
        .to('.chronicle-pillar-beam', { opacity: 0, duration: 0.6, ease: 'power1.out' }, '-=0.5')
        // 5. Aura shifts to golden Hokage fire
        .to(
          ['.chronicle-ambient-aura', '.chronicle-aura'],
          {
            background:
              'radial-gradient(circle at 50% 50%, rgba(240, 165, 0, 0.14) 0%, rgba(8, 8, 8, 0) 70%)',
            duration: 1.2,
          },
          '-=1.0'
        );

      // --- STAGE 03 Settlement & Natural Transition into Mentors ---
      chronicleTl
        .to('.frame-03 img', {
          scale: 1.03,
          duration: 1.8,
          ease: 'none',
        })
        .to(
          ['.chronicle-timeline-bar', '.chronicle-narrative-deck', '.num-03'],
          {
            opacity: 0.25,
            y: -20,
            duration: 1.0,
            ease: 'power1.in',
          },
          '+=0.4'
        );
    },
    { scope: containerRef }
  );

  return (
    <section id="chronicle" className="chronicle-section" ref={containerRef}>
      <div className="chronicle-backdrop">
        <div className="chronicle-ambient-aura chronicle-aura"></div>
        <img
          className="chronicle-watermark"
          src="/assets/image/konohaL.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="chronicle-container">
        {/* Top Cinematic Stage Progress Indicator */}
        <div className="chronicle-timeline-bar">
          <div className="chronicle-header-tag">
            <i className="fa-solid fa-scroll"></i> THE SHINOBI CHRONICLE • 忍の年代記
          </div>
          <div className="chronicle-progress-track">
            <div className="chronicle-node node-1 is-active">
              <span className="node-num">01</span>
              <span className="node-label">ORIGIN</span>
            </div>
            <div className="chronicle-track-line">
              <div className="track-fill fill-1 chronicle-track-fill"></div>
            </div>
            <div className="chronicle-node node-2">
              <span className="node-num">02</span>
              <span className="node-label">SHINOBI</span>
            </div>
            <div className="chronicle-track-line">
              <div className="track-fill fill-2 chronicle-track-fill"></div>
            </div>
            <div className="chronicle-node node-3">
              <span className="node-num">03</span>
              <span className="node-label">HOKAGE</span>
            </div>
          </div>
        </div>

        {/* Master Viewport with 3 Synchronized Evolution Stages */}
        <div className="chronicle-stage-viewport">
          {/* Background Stage Numbers */}
          <div className="chronicle-bg-numbers" aria-hidden="true">
            <span className="bg-num num-01 active">01</span>
            <span className="bg-num num-02">02</span>
            <span className="bg-num num-03">03</span>
          </div>

          {/* Central Cinematic Visual Viewport with Stacked Visual Stages */}
          <div className="chronicle-visual-deck">
            {/* Slash / Energy Beam Transition Elements */}
            <div className="chronicle-slash-line" aria-hidden="true"></div>
            <div className="chronicle-pillar-beam" aria-hidden="true"></div>

            {/* Stage 01 Image Frame */}
            <div className="chronicle-frame frame-01 active manga-panel">
              <img
                src="/assets/image/main5.jpg"
                alt="Naruto as the Lonely Boy"
                className="chronicle-img img-01"
              />
              <div className="frame-overlay"></div>
            </div>

            {/* Stage 02 Image Frame (Diagonal Clip Reveal) */}
            <div className="chronicle-frame frame-02 manga-panel">
              <img
                src="/assets/image/shinobi_naruto.jpg"
                alt="Naruto as the Rising Shinobi"
                className="chronicle-img img-02"
              />
              <div className="frame-overlay"></div>
            </div>

            {/* Stage 03 Image Frame (Aperture / Scale Reveal) */}
            <div className="chronicle-frame frame-03 manga-panel">
              <img
                src="/assets/image/main7.jpg"
                alt="Naruto as the Seventh Hokage"
                className="chronicle-img img-03"
              />
              <div className="frame-overlay"></div>
            </div>
          </div>

          {/* Text Narrative Deck */}
          <div className="chronicle-narrative-deck">
            {/* Stage 01 Narrative */}
            <div className="chronicle-card card-01 active">
              <div className="chronicle-stage-badge">
                <span className="era-tag">[ ERA 01 // 宿命の影 ]</span>
                <i className="fa-solid fa-moon"></i> THE LONELY BOY
              </div>
              <h3 className="chronicle-stage-title">ISOLATION & THE SPARK</h3>
              <p className="chronicle-stage-desc">
                Bearing the burden of the Nine-Tails in profound solitude, an ostracized child found
                resolve in empty streets — vowing that the village that shunned him would one day
                acknowledge his existence.
              </p>
              <div className="chronicle-stage-meta">
                <span>STATUS: JINCHŪRIKI OUTCAST</span>
                <span>•</span>
                <span>ERA: PRE-GENIN</span>
              </div>
            </div>

            {/* Stage 02 Narrative */}
            <div className="chronicle-card card-02">
              <div className="chronicle-stage-badge">
                <span className="era-tag">[ ERA 02 // 英雄の胎動 ]</span>
                <i className="fa-solid fa-bolt"></i> THE SHINOBI
              </div>
              <h3 className="chronicle-stage-title">UNBREAKABLE BONDS & SAGE RESOLVE</h3>
              <p className="chronicle-stage-desc">
                Forged through relentless battles, sacred Senjutsu disciplines, and unwavering
                loyalty to his comrades, Naruto inherited Jiraiya's dream of peace and stood as
                Konoha’s ultimate savior against Pain.
              </p>
              <div className="chronicle-stage-meta">
                <span>STATUS: HERO OF KONOHA</span>
                <span>•</span>
                <span>ERA: SAGE MODE SHINOBI</span>
              </div>
            </div>

            {/* Stage 03 Narrative */}
            <div className="chronicle-card card-03">
              <div className="chronicle-stage-badge">
                <span className="era-tag">[ ERA 03 // 永遠の火影 ]</span>
                <i className="fa-solid fa-crown"></i> THE HOKAGE
              </div>
              <h3 className="chronicle-stage-title">THE SEVENTH HOKAGE</h3>
              <p className="chronicle-stage-desc">
                Culminating a lifetime of perseverance, the outcast stands atop the Hokage Monument.
                Donning the mantle of leadership, he unites the Five Great Shinobi Nations and
                preserves the eternal Will of Fire.
              </p>
              <div className="chronicle-stage-meta">
                <span>STATUS: SUPREME LEADER</span>
                <span>•</span>
                <span>ERA: SEVENTH HOKAGE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShinobiChronicleSection;
