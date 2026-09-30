import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SYSTEM_STAGES = [
  { id: 'chakra', name: 'CHAKRA', stageNum: '01' },
  { id: 'nature', name: 'NATURE', stageNum: '02' },
  { id: 'jutsu', name: 'JUTSU', stageNum: '03' },
  { id: 'shinobi', name: 'SHINOBI', stageNum: '04' },
];

function ShinobiSystemSection() {
  const containerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setMobileSlideIndex((prev) => (prev > 0 ? prev - 1 : SYSTEM_STAGES.length - 1));
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setMobileSlideIndex((prev) => (prev < SYSTEM_STAGES.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 45) {
      // swipe left -> next
      setMobileSlideIndex((prev) => (prev < SYSTEM_STAGES.length - 1 ? prev + 1 : 0));
    } else if (diff < -45) {
      // swipe right -> prev
      setMobileSlideIndex((prev) => (prev > 0 ? prev - 1 : SYSTEM_STAGES.length - 1));
    }
  };

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) return;

      const systemSection = containerRef.current;
      if (!systemSection) return;

      const nodeChakra = systemSection.querySelector('.node-chakra');
      const nodeNature = systemSection.querySelector('.node-nature');
      const nodeJutsu = systemSection.querySelector('.node-jutsu');
      const nodeShinobi = systemSection.querySelector('.node-shinobi');

      const systemTl = gsap.timeline({
        scrollTrigger: {
          trigger: systemSection,
          start: () => (window.innerWidth <= 1000 ? 'top 75px' : 'top top'),
          end: '+=260%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.25) {
              nodeChakra?.classList.add('is-active');
              nodeNature?.classList.remove('is-active');
              nodeJutsu?.classList.remove('is-active');
              nodeShinobi?.classList.remove('is-active');
            } else if (p < 0.53) {
              nodeChakra?.classList.remove('is-active');
              nodeNature?.classList.add('is-active');
              nodeJutsu?.classList.remove('is-active');
              nodeShinobi?.classList.remove('is-active');
            } else if (p < 0.8) {
              nodeChakra?.classList.remove('is-active');
              nodeNature?.classList.remove('is-active');
              nodeJutsu?.classList.add('is-active');
              nodeShinobi?.classList.remove('is-active');
            } else {
              nodeChakra?.classList.remove('is-active');
              nodeNature?.classList.remove('is-active');
              nodeJutsu?.classList.remove('is-active');
              nodeShinobi?.classList.add('is-active');
            }
          },
        },
      });


      // --- 1. CHAKRA PHASE (Foundation) ---
      systemTl
        .to('.system-track-fill.fill-chakra', { width: '100%', duration: 2, ease: 'none' })
        .fromTo(
          '.svg-chakra-core-outer',
          { scale: 0.7, transformOrigin: 'center' },
          { scale: 1.15, duration: 2, ease: 'none', transformOrigin: 'center' },
          '<'
        )
        .fromTo(
          '.system-energy-halo',
          { scale: 0.6, opacity: 0.3 },
          { scale: 1.15, opacity: 0.75, duration: 2, ease: 'none' },
          '<'
        );

      // --- 2. NATURE TRANSFORMATION (Conduit Rays Draw & 5 Elements Emerge) ---
      systemTl
        .to('.system-track-fill.fill-nature', { width: '100%', duration: 2.2, ease: 'none' })
        // Text transition: Chakra exits left, Nature enters from right
        .to('.phase-chakra', { opacity: 0, x: -35, duration: 0.8, ease: 'power2.in' }, '-=2.0')
        .to('.phase-nature', { opacity: 1, x: 0, duration: 1.1, ease: 'power2.out' }, '-=1.4')
        // Conduit rays draw outward from center to the 5 elemental points
        .to(
          '.element-conduit',
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.8,
            stagger: 0.15,
            ease: 'power2.out',
          },
          '-=1.8'
        )
        // Pentagram connection lights up
        .to(
          '.svg-pentagram',
          { stroke: 'rgba(245, 240, 235, 0.25)', strokeWidth: 1.5, duration: 1.2 },
          '-=1.2'
        )
        // 5 Elemental Orbit Nodes reveal and scale up
        .to(
          '.element-node',
          {
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 1.4,
            ease: 'back.out(1.4)',
          },
          '-=1.5'
        )
        // Ambient aura shifts into elemental matrix
        .to(
          '.system-ambient-aura',
          {
            background:
              'radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.08) 0%, rgba(226, 90, 42, 0.08) 35%, rgba(8, 8, 8, 0) 70%)',
            duration: 1.5,
          },
          '-=1.5'
        );

      // --- 3. JUTSU MANIFESTATION (Energy Inward Convergence & Central Seal Burst) ---
      systemTl
        .to('.system-track-fill.fill-jutsu', { width: '100%', duration: 2.2, ease: 'none' })
        // Text transition: Nature exits upward, Jutsu enters
        .to('.phase-nature', { opacity: 0, y: -25, duration: 0.8, ease: 'power2.in' }, '-=2.0')
        .to('.phase-jutsu', { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, '-=1.4')
        // Elements converge / pulse inward
        .to('.element-node', { scale: 0.9, opacity: 0.75, duration: 1.2, ease: 'power1.inOut' }, '-=1.8')
        .to(
          '.element-conduit',
          { stroke: 'rgba(250, 204, 21, 0.6)', strokeWidth: 3, duration: 1.2 },
          '-=1.6'
        )
        // Central Jutsu Seal bursts forth
        .fromTo(
          '.jutsu-seal-stamp',
          { scale: 0, opacity: 0, rotation: -90 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.8)' },
          '-=1.2'
        )
        .to(
          '.system-energy-halo',
          {
            background:
              'radial-gradient(circle, rgba(153, 27, 27, 0.45) 0%, rgba(240, 165, 0, 0.25) 45%, transparent 75%)',
            scale: 1.35,
            opacity: 0.9,
            duration: 1.2,
          },
          '-=1.2'
        );

      // --- 4. SHINOBI SYNTHESIS (The Living Will & System Resonance) ---
      systemTl
        // Text transition: Jutsu exits upward, Shinobi enters
        .to('.phase-jutsu', { opacity: 0, y: -25, duration: 0.8, ease: 'power2.in' })
        .to('.phase-shinobi', { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, '-=0.3')
        // SVG rings and conduits achieve golden harmony
        .to(['.svg-outer-ring', '.svg-middle-ring'], { stroke: 'rgba(240, 165, 0, 0.5)', duration: 1.4 }, '-=1.0')
        .to(
          '.system-equation-badge',
          {
            borderColor: 'var(--secondary-gold-bright)',
            boxShadow: '0 8px 35px rgba(240, 165, 0, 0.35)',
            duration: 1.2,
          },
          '-=0.8'
        )
        // Aura turns into golden Will of Fire
        .to(
          '.system-ambient-aura',
          {
            background:
              'radial-gradient(circle at 50% 50%, rgba(240, 165, 0, 0.14) 0%, rgba(153, 27, 27, 0.08) 40%, rgba(8, 8, 8, 0) 70%)',
            duration: 1.5,
          },
          '-=1.2'
        );

      // --- 5. Settlement & Seamless Dissolve into Mentors ---
      systemTl.to(
        ['.system-tracker-bar', '.system-visual-core', '.system-phase-card.phase-shinobi'],
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
    <section id="shinobi-system" className="shinobi-system-section" ref={containerRef}>
      <div className="system-backdrop">
        <div className="system-ambient-aura"></div>
        <div className="system-grid-lines"></div>
      </div>

      <div className="system-container">
        {/* Top System Tracker */}
        <div className="system-tracker-bar">
          <div className="system-header-tag">
            <i className="fa-solid fa-dharmachakra"></i> THE SHINOBI SYSTEM • 忍の体系
          </div>
          <div className="system-phase-track">
            <div className="system-node node-chakra is-active">
              <span className="node-dot"></span>
              <span className="node-label">CHAKRA</span>
            </div>
            <div className="system-track-connector">
              <div className="system-track-fill fill-chakra"></div>
            </div>
            <div className="system-node node-nature">
              <span className="node-dot"></span>
              <span className="node-label">NATURE</span>
            </div>
            <div className="system-track-connector">
              <div className="system-track-fill fill-nature"></div>
            </div>
            <div className="system-node node-jutsu">
              <span className="node-dot"></span>
              <span className="node-label">JUTSU</span>
            </div>
            <div className="system-track-connector">
              <div className="system-track-fill fill-jutsu"></div>
            </div>
            <div className="system-node node-shinobi">
              <span className="node-dot"></span>
              <span className="node-label">SHINOBI</span>
            </div>
          </div>
        </div>

        {/* Central Interactive Synthesis Arena */}
        <div className="system-arena">
          {/* Left/Center: Dynamic SVG Chakra & Elemental Diagram */}
          <div className="system-visual-core">
            <div className="system-energy-halo"></div>

            <svg
              className="system-svg-matrix"
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Rotating Seal Ring */}
              <circle
                className="svg-outer-ring"
                cx="300"
                cy="300"
                r="260"
                stroke="rgba(217, 119, 6, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
              <circle
                className="svg-middle-ring"
                cx="300"
                cy="300"
                r="210"
                stroke="rgba(245, 240, 235, 0.15)"
                strokeWidth="1"
                strokeDasharray="14 10"
              />

              {/* Five Radial Connecting Conduits (Center to 5 Nature Points) */}
              {/* Top: Fire (300, 90) */}
              <line
                className="element-conduit conduit-fire"
                x1="300"
                y1="300"
                x2="300"
                y2="90"
                stroke="rgba(226, 90, 42, 0.35)"
                strokeWidth="2"
                strokeDasharray="210"
                strokeDashoffset="210"
              />
              {/* Top-Right: Lightning (495, 235) */}
              <line
                className="element-conduit conduit-lightning"
                x1="300"
                y1="300"
                x2="495"
                y2="235"
                stroke="rgba(250, 204, 21, 0.35)"
                strokeWidth="2"
                strokeDasharray="210"
                strokeDashoffset="210"
              />
              {/* Bottom-Right: Earth (420, 470) */}
              <line
                className="element-conduit conduit-earth"
                x1="300"
                y1="300"
                x2="420"
                y2="470"
                stroke="rgba(180, 83, 9, 0.35)"
                strokeWidth="2"
                strokeDasharray="210"
                strokeDashoffset="210"
              />
              {/* Bottom-Left: Water (180, 470) */}
              <line
                className="element-conduit conduit-water"
                x1="300"
                y1="300"
                x2="180"
                y2="470"
                stroke="rgba(56, 189, 248, 0.35)"
                strokeWidth="2"
                strokeDasharray="210"
                strokeDashoffset="210"
              />
              {/* Top-Left: Wind (105, 235) */}
              <line
                className="element-conduit conduit-wind"
                x1="300"
                y1="300"
                x2="105"
                y2="235"
                stroke="rgba(52, 211, 153, 0.35)"
                strokeWidth="2"
                strokeDasharray="210"
                strokeDashoffset="210"
              />

              {/* Pentagram Geometry Interconnecting Elements */}
              <polygon
                className="svg-pentagram"
                points="300,90 420,470 105,235 495,235 180,470"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />

              {/* Inner Sacred Chakra Core */}
              <circle
                className="svg-chakra-core-outer"
                cx="300"
                cy="300"
                r="75"
                stroke="var(--primary-crimson-bright)"
                strokeWidth="2"
              />
              <circle
                className="svg-chakra-core-inner"
                cx="300"
                cy="300"
                r="45"
                stroke="var(--secondary-gold-bright)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              <circle
                className="svg-chakra-center-point"
                cx="300"
                cy="300"
                r="14"
                fill="var(--primary-crimson-bright)"
              />
            </svg>

            {/* 5 Elemental Interactive Orbit Nodes */}
            <div className="element-node elem-fire" data-elem="fire">
              <div className="elem-node-inner">
                <span className="elem-kanji">火</span>
                <span className="elem-name">FIRE • KATON</span>
              </div>
            </div>
            <div className="element-node elem-wind" data-elem="wind">
              <div className="elem-node-inner">
                <span className="elem-kanji">風</span>
                <span className="elem-name">WIND • FŪTON</span>
              </div>
            </div>
            <div className="element-node elem-lightning" data-elem="lightning">
              <div className="elem-node-inner">
                <span className="elem-kanji">雷</span>
                <span className="elem-name">LIGHTNING • RAITON</span>
              </div>
            </div>
            <div className="element-node elem-earth" data-elem="earth">
              <div className="elem-node-inner">
                <span className="elem-kanji">土</span>
                <span className="elem-name">EARTH • DOTON</span>
              </div>
            </div>
            <div className="element-node elem-water" data-elem="water">
              <div className="elem-node-inner">
                <span className="elem-kanji">水</span>
                <span className="elem-name">WATER • SUITON</span>
              </div>
            </div>

            {/* Central Seal Manifestation Burst */}
            <div className="jutsu-seal-stamp">
              <span className="seal-kanji">封</span>
            </div>
          </div>

          {/* Right: Phase Storytelling Display Deck */}
          <div
            className="system-narrative-deck"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile-Only Slider Controls */}
            <div className="system-mobile-slider-controls">
              <button
                type="button"
                className="sys-slider-btn sys-prev"
                onClick={handlePrevSlide}
                aria-label="Previous Phase"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div className="sys-slider-indicator">
                <span className="sys-indicator-badge">SYSTEM GUIDE</span>
                <span className="sys-indicator-title">
                  STAGE {SYSTEM_STAGES[mobileSlideIndex].stageNum} / 04: {SYSTEM_STAGES[mobileSlideIndex].name}
                </span>
              </div>
              <button
                type="button"
                className="sys-slider-btn sys-next"
                onClick={handleNextSlide}
                aria-label="Next Phase"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            {/* Cards Viewport */}
            <div className="system-cards-viewport">
              {/* Phase 1: CHAKRA */}
              <div
                className={`system-phase-card phase-chakra ${
                  mobileSlideIndex === 0 ? 'mobile-slide-active is-active' : ''
                }`}
              >
                <div className="system-phase-badge">
                  <span className="system-badge-tag">[ FOUNDATION // 起源 ]</span>
                  <i className="fa-solid fa-atom"></i> PRIMAL ENERGY
                </div>
                <h3 className="system-phase-title">CHAKRA</h3>
                <div className="system-phase-kanji">チャクラ • 身体と精神の融合</div>
                <p className="system-phase-desc">
                  The vital energy within every living shinobi — generated by intertwining physical
                  energy from countless cells with spiritual discipline honed through training.
                </p>
                <div className="system-phase-meta">
                  <span>FORMULA: PHYSICAL ENERGY ＋ SPIRITUAL ENERGY</span>
                </div>
              </div>

              {/* Phase 2: NATURE */}
              <div
                className={`system-phase-card phase-nature ${
                  mobileSlideIndex === 1 ? 'mobile-slide-active is-active' : ''
                }`}
              >
                <div className="system-phase-badge">
                  <span className="system-badge-tag">[ TRANSFORMATION // 性質変化 ]</span>
                  <i className="fa-solid fa-fire-flame-curved"></i> ELEMENTAL MATRIX
                </div>
                <h3 className="system-phase-title">NATURE</h3>
                <div className="system-phase-kanji">五大性質変化 • 火 風 雷 土 水</div>
                <p className="system-phase-desc">
                  By altering chakra’s elemental affinity, a ninja channels raw power into five
                  primordial forces: Fire, Wind, Lightning, Earth, and Water — each holding strict
                  affinity and dominance.
                </p>
                <div className="system-phase-meta">
                  <span>SYSTEM: 5 PRIMORDIAL NATURE AFFINITIES</span>
                </div>
              </div>

              {/* Phase 3: JUTSU */}
              <div
                className={`system-phase-card phase-jutsu ${
                  mobileSlideIndex === 2 ? 'mobile-slide-active is-active' : ''
                }`}
              >
                <div className="system-phase-badge">
                  <span className="system-badge-tag">[ MANIFESTATION // 術の創出 ]</span>
                  <i className="fa-solid fa-hand-dots"></i> THE ART OF COMBAT
                </div>
                <h3 className="system-phase-title">JUTSU</h3>
                <div className="system-phase-kanji">忍術 • 体術 • 幻術 の結晶</div>
                <p className="system-phase-desc">
                  The mystical techniques executed by weaving intricate hand seals. Nature
                  transformation and chakra shape manipulation converge to produce Ninjutsu,
                  Genjutsu, and Taijutsu.
                </p>
                <div className="system-phase-meta">
                  <span>MECHANISM: HAND SEALS ✕ SHAPE MANIPULATION</span>
                </div>
              </div>

              {/* Phase 4: SHINOBI */}
              <div
                className={`system-phase-card phase-shinobi ${
                  mobileSlideIndex === 3 ? 'mobile-slide-active is-active' : ''
                }`}
              >
                <div className="system-phase-badge">
                  <span className="system-badge-tag">[ HARMONY // 忍の真髄 ]</span>
                  <i className="fa-solid fa-user-ninja"></i> THE LIVING WILL
                </div>
                <h3 className="system-phase-title">SHINOBI</h3>
                <div className="system-phase-kanji">忍 • 己の道を紡ぐ者</div>
                <p className="system-phase-desc">
                  The ultimate embodiment of the system. A shinobi is not merely a wielder of power,
                  but one who endures — harmonizing chakra, nature, and technique to protect their
                  comrades and uphold the Will of Fire.
                </p>
                <div className="system-equation-badge">
                  <span>CHAKRA</span>
                  <i className="fa-solid fa-plus"></i>
                  <span>NATURE</span>
                  <i className="fa-solid fa-plus"></i>
                  <span>JUTSU</span>
                  <i className="fa-solid fa-equals"></i>
                  <span className="shinobi-highlight">SHINOBI</span>
                </div>
              </div>
            </div>


            {/* Mobile-Only Slider Pagination Dots */}
            <div className="system-slider-dots">
              {SYSTEM_STAGES.map((st, idx) => (
                <button
                  key={st.name}
                  type="button"
                  className={`sys-dot ${mobileSlideIndex === idx ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileSlideIndex(idx);
                  }}
                  aria-label={`Go to ${st.name}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShinobiSystemSection;
