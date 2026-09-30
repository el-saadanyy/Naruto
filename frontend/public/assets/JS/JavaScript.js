// ==========================================================================
// NARUTO — CINEMATIC ANIME INTERACTION ENGINE (PHASE 2.6)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Initialize GSAP & ScrollTrigger if available
  const hasGSAP = typeof gsap !== "undefined";
  const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

  if (hasGSAP && hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ==========================================================================
  // 1. STICKY NAVBAR ON SCROLL & MOBILE DRAWER
  // ==========================================================================
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("sticky", window.scrollY > 30);
    }
  });

  const navBars = document.querySelector("header .bars");
  const navLinks = document.querySelector("header .links");
  if (navBars && navLinks) {
    navBars.addEventListener("click", (e) => {
      e.stopPropagation();
      navBars.classList.toggle("active");
      navLinks.classList.toggle("is-mobile-open");
    });

    // Close when clicking any nav link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navBars.classList.remove("active");
        navLinks.classList.remove("is-mobile-open");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (header && !header.contains(e.target)) {
        navBars.classList.remove("active");
        navLinks.classList.remove("is-mobile-open");
      }
    });
  }


  // ==========================================================================
  // 2. HERO CINEMATIC OPENING TIMELINE (main.html)
  // ==========================================================================
  const heroSection = document.querySelector(".hero-section");
  if (heroSection && hasGSAP && !isReducedMotion) {
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Background reveal
    heroTl.fromTo(
      ".hero-bg-image",
      { scale: 1.18, filter: "brightness(0.3) contrast(1.1)" },
      { scale: 1, filter: "brightness(0.6) contrast(1.15)", duration: 2.2, ease: "power2.out" }
    );

    // Watermark & Badge
    heroTl.fromTo(
      ".hero-watermark",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1.4 },
      "-=1.8"
    );

    const konohaWatermark = document.querySelector(".hero-konoha-watermark");
    if (konohaWatermark) {
      heroTl.fromTo(
        konohaWatermark,
        { opacity: 0, scale: 0.9, rotation: -5 },
        { opacity: 0.045, scale: 1, rotation: 0, duration: 2, ease: "power2.out" },
        "-=1.6"
      );

      gsap.to(konohaWatermark, {
        y: -18,
        rotation: 4,
        repeat: -1,
        yoyo: true,
        duration: 9,
        ease: "sine.inOut"
      });
    }

    heroTl.fromTo(
      ".hero-badge",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=1.4"
    );

    // Title reveal
    heroTl.fromTo(
      ".hero-title",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.1 },
      "-=1.1"
    );

    // Energy line draw
    heroTl.fromTo(
      ".hero-energy-line",
      { width: "0%" },
      { width: "100%", duration: 1.2, ease: "power2.inOut" },
      "-=0.8"
    );

    // Description & CTA buttons
    heroTl.fromTo(
      ".hero-description",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9 },
      "-=0.7"
    );

    heroTl.fromTo(
      ".hero-actions a",
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8 },
      "-=0.6"
    );

    heroTl.fromTo(
      ".hero-scroll-indicator",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );

    // Hero Scroll Parallax
    if (hasScrollTrigger) {
      gsap.to(".hero-bg-image", {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".hero-content", {
        y: -50,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "center center",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }

  // ==========================================================================
  // 2.5. CHAKRA AWAKENING PINNED CINEMATIC EXPERIENCE (main.html)
  // ==========================================================================
  const awakeningSection = document.querySelector(".chakra-awakening-section");
  if (awakeningSection && hasGSAP && hasScrollTrigger && !isReducedMotion) {
    const awakeningTl = gsap.timeline({
      scrollTrigger: {
        trigger: awakeningSection,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 0.8,
        anticipatePin: 1
      }
    });

    // 1. Chakra Axis Line expands across center
    awakeningTl.fromTo(
      ".awakening-axis-line",
      { width: "0%", opacity: 0 },
      { width: "100%", opacity: 1, duration: 1.5, ease: "power2.inOut" }
    );

    // 2. Radial Chakra Glow blooms
    awakeningTl.fromTo(
      ".awakening-radial-glow",
      { scale: 0.5, opacity: 0 },
      { scale: 1.25, opacity: 0.9, duration: 1.8, ease: "power1.out" },
      "-=1.2"
    );

    // 3. Masked Image Reveal via clip-path
    awakeningTl.fromTo(
      ".awakening-media-wrapper",
      { clipPath: "inset(50% 0 50% 0)", opacity: 0 },
      { clipPath: "inset(0% 0 0% 0)", opacity: 1, duration: 2.2, ease: "power2.inOut" },
      "-=1.2"
    );

    awakeningTl.fromTo(
      ".awakening-img",
      { scale: 1.18, filter: "brightness(0.6) contrast(1.2)" },
      { scale: 1.02, filter: "brightness(0.9) contrast(1.1)", duration: 2.2, ease: "power1.out" },
      "<"
    );

    // 4. Typography reveal (Chakra Awakening + The Will of Fire)
    awakeningTl.fromTo(
      ".awakening-text-content",
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 1.6, ease: "power2.out" },
      "-=1.4"
    );

    // 5. Grand hold and smooth dissolve towards Chapter 01
    awakeningTl.to(
      [".awakening-text-content", ".awakening-media-wrapper", ".awakening-axis-line"],
      { opacity: 0.15, y: -25, duration: 1.2, ease: "power1.in" },
      "+=0.4"
    );
  }

  // ==========================================================================
  // 3. SCROLLTRIGGER ASYMMETRICAL STORY CHAPTERS (main.html)
  // ==========================================================================
  if (hasGSAP && hasScrollTrigger && !isReducedMotion) {
    // Chapter 01: ORIGIN
    const chOrigin = document.querySelector(".chapter-origin");
    if (chOrigin) {
      const bleedNum = chOrigin.querySelector(".chapter-bleed-num");
      const img = chOrigin.querySelector(".origin-bg-img, .portrait-frame img, img");
      const textWrap = chOrigin.querySelector(".origin-overlay, .story-text");

      const tl01 = gsap.timeline({
        scrollTrigger: {
          trigger: chOrigin,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      tl01.fromTo(chOrigin, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" });

      if (bleedNum) {
        gsap.to(bleedNum, {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: chOrigin, start: "top 90%", end: "bottom top", scrub: 0.6 }
        });
      }

      if (img) {
        gsap.fromTo(img, { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: { trigger: chOrigin, start: "top 90%", end: "bottom 30%", scrub: 0.4 } });
      }
    }

    // Chapter 02: ASCENSION
    const chAscension = document.querySelector(".chapter-ascension");
    if (chAscension) {
      const numBg = chAscension.querySelector(".chapter-num-bg");
      const img = chAscension.querySelector(".ascension-bg-img, .dynamic-image-wrap img, img");

      const tl02 = gsap.timeline({
        scrollTrigger: {
          trigger: chAscension,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      tl02.fromTo(chAscension, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" });

      if (numBg) {
        gsap.to(numBg, {
          y: -30,
          ease: "none",
          scrollTrigger: { trigger: chAscension, start: "top 90%", end: "bottom top", scrub: 0.6 }
        });
      }

      if (img) {
        gsap.fromTo(img, { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: { trigger: chAscension, start: "top 90%", end: "bottom 30%", scrub: 0.4 } });
      }
    }

    // Chapter 03: CLIMAX
    const chClimax = document.querySelector(".chapter-climax");
    if (chClimax) {
      const bgImg = chClimax.querySelector(".climax-bg-img, img");

      const tl03 = gsap.timeline({
        scrollTrigger: {
          trigger: chClimax,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      tl03.fromTo(chClimax, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" });

      if (bgImg) {
        gsap.fromTo(bgImg, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: chClimax, start: "top bottom", end: "bottom top", scrub: 0.5 } });
      }
    }

    // ==========================================================================
    // 3.5. THE SHINOBI CHRONICLE PINNED CINEMATIC EXPERIENCE (main.html)
    // ==========================================================================
    const chronicleSection = document.querySelector("#chronicle");
    if (chronicleSection) {
      const node1 = chronicleSection.querySelector(".node-1");
      const node2 = chronicleSection.querySelector(".node-2");
      const node3 = chronicleSection.querySelector(".node-3");

      const chronicleTl = gsap.timeline({
        scrollTrigger: {
          trigger: chronicleSection,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.32) {
              node1?.classList.add("is-active");
              node2?.classList.remove("is-active");
              node3?.classList.remove("is-active");
            } else if (p < 0.68) {
              node1?.classList.remove("is-active");
              node2?.classList.add("is-active");
              node3?.classList.remove("is-active");
            } else {
              node1?.classList.remove("is-active");
              node2?.classList.remove("is-active");
              node3?.classList.add("is-active");
            }
          }
        }
      });

      // Node click navigation
      const chronicleNodes = [node1, node2, node3];
      const stageProgress = [0.05, 0.50, 0.95];
      chronicleNodes.forEach((node, idx) => {
        if (!node) return;
        node.addEventListener("click", () => {
          if (!chronicleTl.scrollTrigger) return;
          const st = chronicleTl.scrollTrigger;
          const targetY = st.start + (st.end - st.start) * stageProgress[idx];
          window.scrollTo({ top: targetY, behavior: "smooth" });
        });
      });

      // --- STAGE 01 -> Active & Progress to Node 2 ---
      chronicleTl
        .to(".chronicle-track-fill.fill-1", {
          width: "100%",
          duration: 2,
          ease: "none"
        })
        .to(
          ".frame-01 img",
          {
            scale: 1.0,
            duration: 2,
            ease: "none"
          },
          "<"
        );

      // --- TRANSITION 01 -> 02 (Lateral Slash & Diagonal Wipe) ---
      chronicleTl
        // 1. Chakra Slash line streaks across the viewport
        .fromTo(
          ".chronicle-slash-line",
          { width: "0%", opacity: 0, left: "0%" },
          { width: "100%", opacity: 1, duration: 0.8, ease: "power2.inOut" }
        )
        // 2. Number 01 shifts and fades, Number 02 ascends
        .to(".num-01", { opacity: 0, x: -60, duration: 1, ease: "power2.in" }, "-=0.6")
        .to(".num-02", { opacity: 0.08, x: 0, duration: 1, ease: "power2.out" }, "-=0.4")
        // 3. Narrative Card 01 exits left, Card 02 enters from right
        .to(".card-01", { opacity: 0, x: -40, duration: 0.9, ease: "power2.in" }, "-=0.8")
        .to(".card-02", { opacity: 1, x: 0, duration: 1.1, ease: "power2.out" }, "-=0.3")
        // 4. Visual Frame 01 darkens & shifts, Frame 02 unclips diagonally
        .to(".frame-01", { opacity: 0.15, x: -50, scale: 0.96, filter: "brightness(0.3) blur(2px)", duration: 1.2, ease: "power2.inOut" }, "-=1.0")
        .to(".frame-02", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.inOut"
        }, "-=0.9")
        .to(".chronicle-slash-line", { opacity: 0, duration: 0.6, ease: "power1.out" }, "-=0.5")
        // 5. Subtle background aura shift (Chakra surge)
        .to(".chronicle-aura", { background: "radial-gradient(circle at 50% 50%, rgba(226, 90, 42, 0.12) 0%, rgba(8, 8, 8, 0) 70%)", duration: 1.2 }, "-=1.0");

      // --- STAGE 02 Progress to Node 3 ---
      chronicleTl
        .to(".chronicle-track-fill.fill-2", {
          width: "100%",
          duration: 2.2,
          ease: "none"
        })
        .to(
          ".frame-02 img",
          {
            scale: 1.0,
            duration: 2.2,
            ease: "none"
          },
          "<"
        );

      // --- TRANSITION 02 -> 03 (Vertical Pillar Beam & Circular Aperture Expansion) ---
      chronicleTl
        // 1. Vertical Chakra Pillar Beam streaks upward
        .fromTo(
          ".chronicle-pillar-beam",
          { height: "0%", opacity: 0 },
          { height: "140%", opacity: 1, duration: 0.9, ease: "power3.inOut" }
        )
        // 2. Number 02 exits, Number 03 ascends with golden presence
        .to(".num-02", { opacity: 0, y: -40, duration: 1, ease: "power2.in" }, "-=0.6")
        .to(".num-03", { opacity: 0.08, y: 0, duration: 1, ease: "power2.out" }, "-=0.4")
        // 3. Narrative Card 02 exits upward, Card 03 enters gracefully
        .to(".card-02", { opacity: 0, y: -30, duration: 0.9, ease: "power2.in" }, "-=0.8")
        .to(".card-03", { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" }, "-=0.3")
        // 4. Visual Frame 02 dissolves/scales, Frame 03 expands via circular mask
        .to(".frame-02", { opacity: 0.1, scale: 1.06, filter: "brightness(0.2) blur(3px)", duration: 1.2, ease: "power2.inOut" }, "-=1.0")
        .to(".frame-03", {
          clipPath: "circle(100% at 50% 50%)",
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.inOut"
        }, "-=0.9")
        .to(".chronicle-pillar-beam", { opacity: 0, duration: 0.6, ease: "power1.out" }, "-=0.5")
        // 5. Aura shifts to golden Hokage fire
        .to(".chronicle-aura", { background: "radial-gradient(circle at 50% 50%, rgba(240, 165, 0, 0.14) 0%, rgba(8, 8, 8, 0) 70%)", duration: 1.2 }, "-=1.0");

      // --- STAGE 03 Settlement & Natural Transition into Mentors ---
      chronicleTl
        .to(".frame-03 img", {
          scale: 1.03,
          duration: 1.8,
          ease: "none"
        })
        .to(
          [".chronicle-timeline-deck", ".chronicle-editorial-head", ".chronicle-num.num-03"],
          {
            opacity: 0.25,
            y: -20,
            duration: 1.0,
            ease: "power1.in"
          },
          "+=0.4"
        );
    }

    // ==========================================================================
    // 3.6. THE SHINOBI SYSTEM PINNED CINEMATIC EXPERIENCE (main.html)
    // ==========================================================================
    const systemSection = document.querySelector("#shinobi-system");
    if (systemSection) {
      const nodeChakra = systemSection.querySelector(".node-chakra");
      const nodeNature = systemSection.querySelector(".node-nature");
      const nodeJutsu = systemSection.querySelector(".node-jutsu");
      const nodeShinobi = systemSection.querySelector(".node-shinobi");

      const systemTl = gsap.timeline({
        scrollTrigger: {
          trigger: systemSection,
          start: () => (window.innerWidth <= 1000 ? "top 75px" : "top top"),
          end: "+=260%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.25) {
              nodeChakra?.classList.add("is-active");
              nodeNature?.classList.remove("is-active");
              nodeJutsu?.classList.remove("is-active");
              nodeShinobi?.classList.remove("is-active");
            } else if (p < 0.53) {
              nodeChakra?.classList.remove("is-active");
              nodeNature?.classList.add("is-active");
              nodeJutsu?.classList.remove("is-active");
              nodeShinobi?.classList.remove("is-active");
            } else if (p < 0.80) {
              nodeChakra?.classList.remove("is-active");
              nodeNature?.classList.remove("is-active");
              nodeJutsu?.classList.add("is-active");
              nodeShinobi?.classList.remove("is-active");
            } else {
              nodeChakra?.classList.remove("is-active");
              nodeNature?.classList.remove("is-active");
              nodeJutsu?.classList.remove("is-active");
              nodeShinobi?.classList.add("is-active");
            }
          }
        }
      });

      // --- 1. CHAKRA PHASE (Foundation) ---
      systemTl
        .to(".system-track-fill.fill-chakra", { width: "100%", duration: 2, ease: "none" })
        .fromTo(
          ".svg-chakra-core-outer",
          { scale: 0.7, transformOrigin: "center" },
          { scale: 1.15, duration: 2, ease: "none", transformOrigin: "center" },
          "<"
        )
        .fromTo(
          ".system-energy-halo",
          { scale: 0.6, opacity: 0.3 },
          { scale: 1.15, opacity: 0.75, duration: 2, ease: "none" },
          "<"
        );

      // --- 2. NATURE TRANSFORMATION (Conduit Rays Draw & 5 Elements Emerge) ---
      systemTl
        .to(".system-track-fill.fill-nature", { width: "100%", duration: 2.2, ease: "none" })
        // Text transition: Chakra exits left, Nature enters from right
        .to(".phase-chakra", { opacity: 0, x: -35, duration: 0.8, ease: "power2.in" }, "-=2.0")
        .to(".phase-nature", { opacity: 1, x: 0, duration: 1.1, ease: "power2.out" }, "-=1.4")
        // Conduit rays draw outward from center to the 5 elemental points
        .to(".element-conduit", {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.8,
          stagger: 0.15,
          ease: "power2.out"
        }, "-=1.8")
        // Pentagram connection lights up
        .to(".svg-pentagram", { stroke: "rgba(245, 240, 235, 0.25)", strokeWidth: 1.5, duration: 1.2 }, "-=1.2")
        // 5 Elemental Orbit Nodes reveal and scale up
        .to(".element-node", {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 1.4,
          ease: "back.out(1.4)"
        }, "-=1.5")
        // Ambient aura shifts into elemental matrix
        .to(".system-ambient-aura", {
          background: "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.08) 0%, rgba(226, 90, 42, 0.08) 35%, rgba(8, 8, 8, 0) 70%)",
          duration: 1.5
        }, "-=1.5");

      // --- 3. JUTSU MANIFESTATION (Energy Inward Convergence & Central Seal Burst) ---
      systemTl
        .to(".system-track-fill.fill-jutsu", { width: "100%", duration: 2.2, ease: "none" })
        // Text transition: Nature exits upward, Jutsu enters
        .to(".phase-nature", { opacity: 0, y: -25, duration: 0.8, ease: "power2.in" }, "-=2.0")
        .to(".phase-jutsu", { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" }, "-=1.4")
        // Elements converge / pulse inward
        .to(".element-node", { scale: 0.9, opacity: 0.75, duration: 1.2, ease: "power1.inOut" }, "-=1.8")
        .to(".element-conduit", { stroke: "rgba(250, 204, 21, 0.6)", strokeWidth: 3, duration: 1.2 }, "-=1.6")
        // Central Jutsu Seal bursts forth
        .fromTo(
          ".jutsu-seal-stamp",
          { scale: 0, opacity: 0, rotation: -90 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.8)" },
          "-=1.2"
        )
        .to(".system-energy-halo", {
          background: "radial-gradient(circle, rgba(153, 27, 27, 0.45) 0%, rgba(240, 165, 0, 0.25) 45%, transparent 75%)",
          scale: 1.35,
          opacity: 0.9,
          duration: 1.2
        }, "-=1.2");

      // --- 4. SHINOBI SYNTHESIS (The Living Will & System Resonance) ---
      systemTl
        // Text transition: Jutsu exits upward, Shinobi enters
        .to(".phase-jutsu", { opacity: 0, y: -25, duration: 0.8, ease: "power2.in" })
        .to(".phase-shinobi", { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "-=0.3")
        // SVG rings and conduits achieve golden harmony
        .to([".svg-outer-ring", ".svg-middle-ring"], { stroke: "rgba(240, 165, 0, 0.5)", duration: 1.4 }, "-=1.0")
        .to(".system-equation-badge", {
          borderColor: "var(--secondary-gold-bright)",
          boxShadow: "0 8px 35px rgba(240, 165, 0, 0.35)",
          duration: 1.2
        }, "-=0.8")
        // Aura turns into golden Will of Fire
        .to(".system-ambient-aura", {
          background: "radial-gradient(circle at 50% 50%, rgba(240, 165, 0, 0.14) 0%, rgba(153, 27, 27, 0.08) 40%, rgba(8, 8, 8, 0) 70%)",
          duration: 1.5
        }, "-=1.2");

      // --- 5. Settlement & Seamless Dissolve into Mentors ---
      systemTl
        .to(
          [".system-tracker-bar", ".system-visual-core", ".system-phase-card.phase-shinobi"],
          {
            opacity: 0.25,
            y: -20,
            duration: 1.0,
            ease: "power1.in"
          },
          "+=0.4"
        );

      // --- 6. Mobile-Only System Guide Slider Navigation ---
      const mobileSliderPrev = systemSection.querySelector('.sys-slider-btn.sys-prev');
      const mobileSliderNext = systemSection.querySelector('.sys-slider-btn.sys-next');
      const mobileSliderTitle = systemSection.querySelector('#sys-slider-title');
      const mobileCards = systemSection.querySelectorAll('.system-cards-viewport .system-phase-card');
      const mobileDots = systemSection.querySelectorAll('.system-slider-dots .sys-dot');
      const mobileDeck = systemSection.querySelector('.system-narrative-deck');

      const sliderStages = [
        { name: 'CHAKRA', stageNum: '01' },
        { name: 'NATURE', stageNum: '02' },
        { name: 'JUTSU', stageNum: '03' },
        { name: 'SHINOBI', stageNum: '04' }
      ];
      let currentSlideIdx = 0;

      function updateMobileSlide(index) {
        if (index < 0) index = sliderStages.length - 1;
        if (index >= sliderStages.length) index = 0;
        currentSlideIdx = index;

        if (mobileSliderTitle) {
          mobileSliderTitle.textContent = `STAGE ${sliderStages[currentSlideIdx].stageNum} / 04: ${sliderStages[currentSlideIdx].name}`;
        }

        mobileCards.forEach((card, idx) => {
          if (idx === currentSlideIdx) {
            card.classList.add('mobile-slide-active');
          } else {
            card.classList.remove('mobile-slide-active');
          }
        });

        mobileDots.forEach((dot, idx) => {
          if (idx === currentSlideIdx) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }

      if (mobileSliderPrev) {
        mobileSliderPrev.addEventListener('click', (e) => {
          e.stopPropagation();
          updateMobileSlide(currentSlideIdx - 1);
        });
      }

      if (mobileSliderNext) {
        mobileSliderNext.addEventListener('click', (e) => {
          e.stopPropagation();
          updateMobileSlide(currentSlideIdx + 1);
        });
      }

      mobileDots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          updateMobileSlide(idx);
        });
      });

      // Touch swipe gestures
      if (mobileDeck) {
        let touchStartX = 0;
        mobileDeck.addEventListener('touchstart', (e) => {
          touchStartX = e.touches[0].clientX;
        }, { passive: true });

        mobileDeck.addEventListener('touchend', (e) => {
          const touchEndX = e.changedTouches[0].clientX;
          const diff = touchStartX - touchEndX;
          if (diff > 45) {
            updateMobileSlide(currentSlideIdx + 1);
          } else if (diff < -45) {
            updateMobileSlide(currentSlideIdx - 1);
          }
        }, { passive: true });
      }
    }


    // Mentor Archive Section
    const mentorArchive = document.querySelector(".mentor-archive-grid");
    if (mentorArchive) {
      gsap.fromTo(
        mentorArchive.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: ".mentors-section", start: "top 80%", toggleActions: "play none none none" }
        }
      );
    }
  }

  // ==========================================================================
  // 4. INTERACTIVE SHINOBI WORLD MAP CONTROLLER (village.html)
  // ==========================================================================
  const shinobiWorldSection = document.querySelector("#shinobi-world-map");
  if (shinobiWorldSection) {
    const navButtons = shinobiWorldSection.querySelectorAll(".loc-nav-btn");
    const svgNodes = shinobiWorldSection.querySelectorAll(".svg-map-node");
    const dossierFrames = shinobiWorldSection.querySelectorAll(".dossier-frame");
    const dossierCards = shinobiWorldSection.querySelectorAll(".dossier-card");
    const routeLines = shinobiWorldSection.querySelectorAll(".map-route-line");
    const worldAura = shinobiWorldSection.querySelector(".world-radial-aura");
    const mapSvg = shinobiWorldSection.querySelector(".world-map-svg");
    const explorePrompt = document.querySelector(".world-explore-prompt");

    const auras = {
      world: "radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.12) 0%, rgba(8, 8, 8, 0) 70%)",
      leaf: "radial-gradient(circle at 50% 50%, rgba(226, 90, 42, 0.18) 0%, rgba(8, 8, 8, 0) 70%)",
      sand: "radial-gradient(circle at 50% 50%, rgba(240, 165, 0, 0.18) 0%, rgba(8, 8, 8, 0) 70%)",
      rock: "radial-gradient(circle at 50% 50%, rgba(180, 83, 9, 0.18) 0%, rgba(8, 8, 8, 0) 70%)",
      cloud: "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.18) 0%, rgba(8, 8, 8, 0) 70%)",
      mist: "radial-gradient(circle at 50% 50%, rgba(37, 142, 166, 0.18) 0%, rgba(8, 8, 8, 0) 70%)"
    };

    const cameraTargets = {
      world: { scale: 1, x: 0, y: 0 },
      leaf: { scale: 1.05, x: -5, y: -10 },
      sand: { scale: 1.08, x: 40, y: -25 },
      rock: { scale: 1.08, x: 40, y: 30 },
      cloud: { scale: 1.08, x: -40, y: 30 },
      mist: { scale: 1.08, x: -45, y: -20 }
    };

    // Unified progress mapping for ScrollTrigger stages
    const locationProgressTargets = {
      world: 0.05,
      leaf: 0.25,
      sand: 0.43,
      rock: 0.60,
      cloud: 0.77,
      mist: 0.94
    };

    let currentLocation = "world";
    let isProgrammaticScroll = false;
    let scrollTween = null;
    let worldScrollTrigger = null;

    function activateLocation(locKey, shouldScroll = false) {
      if (!locKey) return;
      currentLocation = locKey;

      // 1. Update Navigation Buttons & Accessible Attributes
      navButtons.forEach((btn) => {
        const isActive = btn.getAttribute("data-location") === locKey;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
        btn.setAttribute("tabindex", isActive ? "0" : "-1");
      });

      // 2. Update SVG Map Nodes (Subdue others when a specific village is focused)
      if (mapSvg) {
        mapSvg.classList.toggle("has-selection", locKey !== "world");
      }
      svgNodes.forEach((node) => {
        const isSelected = node.getAttribute("data-loc") === locKey;
        node.classList.toggle("is-selected", isSelected);
      });

      // 3. Update Route Lines
      routeLines.forEach((line) => {
        line.classList.toggle("is-active", locKey !== "world" && line.id && line.id.includes(locKey));
      });

      // 4. Update Dossier Visual Frames
      dossierFrames.forEach((frame) => {
        frame.classList.toggle("is-active", frame.getAttribute("data-location") === locKey);
      });

      // 5. Update Dossier Content Cards
      dossierCards.forEach((card) => {
        card.classList.toggle("is-active", card.getAttribute("data-location") === locKey);
      });

      // 6. Update Ambient Radial Aura
      if (worldAura && auras[locKey]) {
        worldAura.style.background = auras[locKey];
      }

      // 7. Dynamic Camera Pan / Zoom on Vector Map
      if (hasGSAP && mapSvg && !isReducedMotion) {
        const isMobileScreen = window.innerWidth <= 768;
        const target = isMobileScreen || !cameraTargets[locKey] ? { scale: 1, x: 0, y: 0 } : cameraTargets[locKey];
        gsap.to(mapSvg, {
          scale: target.scale,
          x: target.x,
          y: target.y,
          duration: 0.85,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      // 8. Synchronize Window Scroll Position if user clicked
      if (shouldScroll) {
        if (worldScrollTrigger) {
          const targetProgress = locationProgressTargets[locKey] ?? 0;
          const targetScroll = worldScrollTrigger.start + targetProgress * (worldScrollTrigger.end - worldScrollTrigger.start);

          isProgrammaticScroll = true;
          if (scrollTween) scrollTween.kill();

          const scrollObj = { y: window.scrollY };
          scrollTween = gsap.to(scrollObj, {
            y: targetScroll,
            duration: 0.75,
            ease: "power2.out",
            onUpdate: () => {
              window.scrollTo(0, scrollObj.y);
            },
            onComplete: () => {
              isProgrammaticScroll = false;
            }
          });
        } else {
          // Mobile / Tablet smooth viewport scroll directly to village photo and info card
          if (locKey === "world") {
            const topY = shinobiWorldSection.getBoundingClientRect().top + window.scrollY - 75;
            window.scrollTo({ top: Math.max(0, topY), behavior: "smooth" });
          } else {
            const dossierPanel = shinobiWorldSection.querySelector(".world-dossier-panel") || shinobiWorldSection.querySelector(".dossier-media-deck");
            if (dossierPanel) {
              const targetY = dossierPanel.getBoundingClientRect().top + window.scrollY - 75;
              window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
            } else {
              shinobiWorldSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }
      }
    }

    // Direct Click Listeners on Navigation Buttons
    navButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const loc = btn.getAttribute("data-location");
        if (loc) activateLocation(loc, false);
      });
    });

    // Keyboard Navigation for Accessible Tabs
    navButtons.forEach((btn, idx) => {
      btn.addEventListener("keydown", (e) => {
        let targetIndex = -1;
        if (e.key === "ArrowRight") {
          targetIndex = (idx + 1) % navButtons.length;
        } else if (e.key === "ArrowLeft") {
          targetIndex = (idx - 1 + navButtons.length) % navButtons.length;
        } else if (e.key === "Home") {
          targetIndex = 0;
        } else if (e.key === "End") {
          targetIndex = navButtons.length - 1;
        }
        if (targetIndex !== -1) {
          e.preventDefault();
          navButtons[targetIndex].focus();
          const loc = navButtons[targetIndex].getAttribute("data-location");
          if (loc) activateLocation(loc, false);
        }
      });
    });

    // Direct Click Listeners on SVG Map Nodes
    svgNodes.forEach((node) => {
      node.addEventListener("click", () => {
        const loc = node.getAttribute("data-loc");
        if (loc) activateLocation(loc, false);
      });
    });

    // Explore prompt scroll helper
    if (explorePrompt) {
      explorePrompt.addEventListener("click", () => {
        activateLocation("world", false);
      });
    }

    // ScrollTrigger Camera Expedition through the World (Desktop & Tablet Landscape)
    if (hasGSAP && hasScrollTrigger && !isReducedMotion) {
      ScrollTrigger.matchMedia({
        "(min-width: 993px)": function () {
          worldScrollTrigger = ScrollTrigger.create({
            trigger: shinobiWorldSection,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (isProgrammaticScroll) return; // Prevent fight during smooth programmatic scroll
              const p = self.progress;
              let nextLoc = "world";
              if (p < 0.16) {
                nextLoc = "world";
              } else if (p < 0.35) {
                nextLoc = "leaf";
              } else if (p < 0.52) {
                nextLoc = "sand";
              } else if (p < 0.69) {
                nextLoc = "rock";
              } else if (p < 0.86) {
                nextLoc = "cloud";
              } else {
                nextLoc = "mist";
              }
              if (nextLoc !== currentLocation) {
                activateLocation(nextLoc, false);
              }
            }
          });
        }
      });
    }
  }

  // ==========================================================================
  // 5. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  const hamburgerBtn = document.querySelector(".bars");
  const navLinksContainer = document.querySelector(".links");

  if (hamburgerBtn && navLinksContainer) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinksContainer.classList.toggle("mobile-active");
      hamburgerBtn.classList.toggle("active");
    });

    const navLinks = navLinksContainer.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinksContainer.classList.remove("mobile-active");
        hamburgerBtn.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!navLinksContainer.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        navLinksContainer.classList.remove("mobile-active");
        hamburgerBtn.classList.remove("active");
      }
    });
  }

  // ==========================================================================
  // 6. AUTHENTICATION PAGES ENTRANCE TIMELINE (login.html & Signup.html)
  // ==========================================================================
  const authCard = document.querySelector(".login, .signup-card");
  if (authCard && hasGSAP && !isReducedMotion) {
    gsap.fromTo(
      authCard,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );
  }

  // ==========================================================================
  // 7. INTERACTIVE CLAN ANCESTRAL CODEX CONTROLLER (clans.html)
  // ==========================================================================
  const clanCodexSection = document.querySelector("#clan-codex");
  if (clanCodexSection) {
    const clanNavButtons = clanCodexSection.querySelectorAll(".clan-nav-btn");
    const clanCrestItems = clanCodexSection.querySelectorAll(".clan-crest-item");
    const clanFrames = clanCodexSection.querySelectorAll(".clan-frame");
    const clanCards = clanCodexSection.querySelectorAll(".clan-card");
    const clanRadialAura = clanCodexSection.querySelector(".clan-radial-aura");
    const clanExplorePrompt = document.querySelector(".clan-explore-prompt");

    const clanAuras = {
      uchiha: "radial-gradient(circle at 50% 50%, rgba(226, 90, 42, 0.18) 0%, rgba(8, 8, 8, 0) 70%)",
      senju: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.18) 0%, rgba(8, 8, 8, 0) 70%)",
      hyuga: "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.18) 0%, rgba(8, 8, 8, 0) 70%)",
      uzumaki: "radial-gradient(circle at 50% 50%, rgba(234, 88, 12, 0.18) 0%, rgba(8, 8, 8, 0) 70%)",
      nara: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.18) 0%, rgba(8, 8, 8, 0) 70%)",
      sarutobi: "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.18) 0%, rgba(8, 8, 8, 0) 70%)"
    };

    // Unified progress mapping for ScrollTrigger stages across the 6 noble clans
    const clanProgressTargets = {
      uchiha: 0.08,
      senju: 0.25,
      hyuga: 0.43,
      uzumaki: 0.60,
      nara: 0.77,
      sarutobi: 0.94
    };

    let currentClan = "uchiha";
    let isClanProgrammaticScroll = false;
    let clanScrollTween = null;
    let clanScrollTrigger = null;

    function activateClan(clanKey, shouldScroll = false) {
      if (!clanKey) return;
      currentClan = clanKey;

      // 1. Update Navigation Buttons & Accessible Tab Attributes
      clanNavButtons.forEach((btn) => {
        const isActive = btn.getAttribute("data-clan") === clanKey;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
        btn.setAttribute("tabindex", isActive ? "0" : "-1");
      });

      // 2. Update Vector Clan Crest Item
      clanCrestItems.forEach((crest) => {
        const isActive = crest.getAttribute("data-clan") === clanKey;
        crest.classList.toggle("is-active", isActive);
      });

      // 3. Update Visual Dossier Reveal Frame
      clanFrames.forEach((frame) => {
        const isActive = frame.getAttribute("data-clan") === clanKey;
        frame.classList.toggle("is-active", isActive);
      });

      // 4. Update Factual Dossier Content Card
      clanCards.forEach((card) => {
        const isActive = card.getAttribute("data-clan") === clanKey;
        card.classList.toggle("is-active", isActive);
      });

      // 5. Update Ambient Radial Aura
      if (clanRadialAura && clanAuras[clanKey]) {
        clanRadialAura.style.background = clanAuras[clanKey];
      }

      // 6. Synchronize Window Scroll Position if user clicked
      if (shouldScroll) {
        if (clanScrollTrigger) {
          const targetProgress = clanProgressTargets[clanKey] ?? 0;
          const targetScroll = clanScrollTrigger.start + targetProgress * (clanScrollTrigger.end - clanScrollTrigger.start);

          isClanProgrammaticScroll = true;
          if (clanScrollTween) clanScrollTween.kill();

          const scrollObj = { y: window.scrollY };
          clanScrollTween = gsap.to(scrollObj, {
            y: targetScroll,
            duration: 0.75,
            ease: "power2.out",
            onUpdate: () => {
              window.scrollTo(0, scrollObj.y);
            },
            onComplete: () => {
              isClanProgrammaticScroll = false;
            }
          });
        } else {
          // Mobile / Tablet smooth scroll into view
          const rect = clanCodexSection.getBoundingClientRect();
          if (rect.top < -50 || rect.top > 200) {
            clanCodexSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    }

    // Direct Click Listeners on Clan Selector Buttons
    clanNavButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const clan = btn.getAttribute("data-clan");
        if (clan) activateClan(clan, true);
      });
    });

    // Keyboard Navigation for Accessible Tabs
    clanNavButtons.forEach((btn, idx) => {
      btn.addEventListener("keydown", (e) => {
        let targetIndex = -1;
        if (e.key === "ArrowRight") {
          targetIndex = (idx + 1) % clanNavButtons.length;
        } else if (e.key === "ArrowLeft") {
          targetIndex = (idx - 1 + clanNavButtons.length) % clanNavButtons.length;
        } else if (e.key === "Home") {
          targetIndex = 0;
        } else if (e.key === "End") {
          targetIndex = clanNavButtons.length - 1;
        }
        if (targetIndex !== -1) {
          e.preventDefault();
          clanNavButtons[targetIndex].focus();
          const clan = clanNavButtons[targetIndex].getAttribute("data-clan");
          if (clan) activateClan(clan, true);
        }
      });
    });

    // Explore prompt scroll helper
    if (clanExplorePrompt) {
      clanExplorePrompt.addEventListener("click", () => {
        activateClan("uchiha", true);
      });
    }

    // ScrollTrigger Ancestral Expedition across the 6 Noble Clans (Desktop & Tablet Landscape)
    if (hasGSAP && hasScrollTrigger && !isReducedMotion) {
      ScrollTrigger.matchMedia({
        "(min-width: 993px)": function () {
          clanScrollTrigger = ScrollTrigger.create({
            trigger: clanCodexSection,
            start: "top top",
            end: "+=320%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (isClanProgrammaticScroll) return; // Prevent fight during smooth programmatic scroll
              const p = self.progress;
              let nextClan = "uchiha";
              if (p < 0.18) {
                nextClan = "uchiha";
              } else if (p < 0.36) {
                nextClan = "senju";
              } else if (p < 0.54) {
                nextClan = "hyuga";
              } else if (p < 0.72) {
                nextClan = "uzumaki";
              } else if (p < 0.88) {
                nextClan = "nara";
              } else {
                nextClan = "sarutobi";
              }
              if (nextClan !== currentClan) {
                activateClan(nextClan, false);
              }
            }
          });
        }
      });
    }
  }

  // ==========================================================================
  // 8. INTERACTIVE SHINOBI DATABASE CONTROLLER (shinobi-database.html)
  // ==========================================================================
  const dbRoot = document.querySelector("#shinobi-database-root");
  if (dbRoot) {
    const SHINOBI_DATABASE_RECORDS = [
      {
            "id": "KN-012607",
            "name": "Naruto Uzumaki",
            "kanji": "うずまきナルト",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "uzumaki",
            "clanDisplay": "Uzumaki Clan",
            "rank": "kage",
            "rankDisplay": "Seventh Hokage",
            "status": "active",
            "image": "./assets/image/shinobi_naruto.png",
            "specialty": "Rasengan / Sage Mode / Kurama Link",
            "natures": "Wind, Lightning, Earth, Water, Fire, Yin-Yang",
            "classification": "Jinchūriki / Sage / Hokage",
            "summary": "Seventh Hokage of Konohagakure and Hero of the Hidden Leaf. Nine-Tails Jinchūriki who united the Five Great Shinobi Nations during the Fourth Shinobi World War and achieved world peace.",
            "techniques": [
                  "Sage Art: Massive Rasengan",
                  "Wind Release: Rasenshuriken",
                  "Kurama Chakra Cloak Avatar",
                  "Shadow Clone Jutsu (Tajū Kage Bunshin)",
                  "Six Paths Sage Mode"
            ]
      },
      {
            "id": "KN-012606",
            "name": "Sasuke Uchiha",
            "kanji": "うちはサスケ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "uchiha",
            "clanDisplay": "Uchiha Clan",
            "rank": "genin",
            "rankDisplay": "Shadow Kage (Genin)",
            "status": "active",
            "image": "./assets/image/shinobi_sasuke.png",
            "specialty": "Eternal Mangekyō Sharingan / Rinnegan / Chidori",
            "natures": "Lightning, Fire, Wind, Earth, Water, Yin",
            "classification": "Dōjutsu Prodigy / Supporting Shadow",
            "summary": "Sole surviving master of the Uchiha Clan alongside his brother. Wields the Six Paths Rinnegan and Eternal Mangekyō Sharingan, traveling across dimensions to safeguard the shinobi world.",
            "techniques": [
                  "Chidori & Chidori Stream",
                  "Amaterasu & Inferno Style: Flame Control",
                  "Perfect Susanoo",
                  "Amenotejikara (Rinnegan Space-Time Swap)",
                  "Kirin (Lightning Release)"
            ]
      },
      {
            "id": "KN-009720",
            "name": "Kakashi Hatake",
            "kanji": "はたけカカシ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Hatake Clan",
            "rank": "kage",
            "rankDisplay": "Sixth Hokage (Former Jōnin)",
            "status": "active",
            "image": "./assets/image/shinobi_kakashi.png",
            "specialty": "Raikiri (Lightning Blade) / 1000 Copied Jutsu",
            "natures": "Lightning, Earth, Water, Fire, Wind, Yin, Yang",
            "classification": "Copy Ninja / Former Anbu Captain",
            "summary": "Renowned globally as 'Kakashi of the Sharingan' and master of Team 7. Mastered over a thousand techniques and guided Konohagakure into the modern era as its Sixth Hokage.",
            "techniques": [
                  "Raikiri (Lightning Cutter)",
                  "Purple Lightning (Shiden)",
                  "Kamui (Mangekyō Space-Time)",
                  "Earth Release: Mud Wall",
                  "Water Release: Water Dragon Bullet"
            ]
      },
      {
            "id": "KN-012110",
            "name": "Itachi Uchiha",
            "kanji": "うちはイタチ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "uchiha",
            "clanDisplay": "Uchiha Clan",
            "rank": "jonin",
            "rankDisplay": "Anbu Captain (Classified)",
            "status": "deceased",
            "image": "./assets/image/shinobi_itachi.png",
            "specialty": "Tsukuyomi / Amaterasu / Totsuka Blade Susanoo",
            "natures": "Fire, Water, Wind, Yin, Yang",
            "classification": "Anbu Captain / Rogue S-Rank",
            "summary": "Genius prodigy of the Uchiha Clan who made the ultimate sacrifice to prevent civil war and protect his younger brother, maintaining his loyalty to Konohagakure from the shadows.",
            "techniques": [
                  "Tsukuyomi (Nightmare Genjutsu)",
                  "Amaterasu (Black Inextinguishable Flames)",
                  "Susanoo with Totsuka Blade & Yata Mirror",
                  "Fire Release: Great Fireball Technique",
                  "Crow Clone & Ephemeral Genjutsu"
            ]
      },
      {
            "id": "KN-000001",
            "name": "Hashirama Senju",
            "kanji": "千手柱間",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "senju",
            "clanDisplay": "Senju Clan",
            "rank": "kage",
            "rankDisplay": "First Hokage",
            "status": "deceased",
            "image": "./assets/image/shinobi_hashirama.png",
            "specialty": "Wood Release (Mokuton) / True Thousand Hands",
            "natures": "Earth, Water, Fire, Wind, Lightning, Yang",
            "classification": "God of Shinobi / Co-Founder",
            "summary": "Revered as the 'God of Shinobi' and co-founder of the Hidden Leaf Village. Commanded legendary Wood Release capable of subduing all nine tailed beasts simultaneously.",
            "techniques": [
                  "Sage Art: True Several Thousand Hands",
                  "Wood Release: Deep Forest Emergence",
                  "Wood Dragon & Wood Golem Technique",
                  "Sage Mode (Senpō)",
                  "Four Red Yang Formation"
            ]
      },
      {
            "id": "KN-000002",
            "name": "Tobirama Senju",
            "kanji": "千手扉間",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "senju",
            "clanDisplay": "Senju Clan",
            "rank": "kage",
            "rankDisplay": "Second Hokage",
            "status": "deceased",
            "image": "./assets/image/shinobi_tobirama.png",
            "specialty": "Flying Thunder God / Shadow Clone / Water Mastery",
            "natures": "Water, Fire, Wind, Lightning, Earth, Yin, Yang",
            "classification": "Village Architect / Jutsu Creator",
            "summary": "Second Hokage and master administrator who founded the Shinobi Academy, Anbu, and Chunin Exams while inventing the Shadow Clone, Flying Raijin, and Edo Tensei.",
            "techniques": [
                  "Flying Thunder God Technique (Hiraishin)",
                  "Shadow Clone Jutsu (Kage Bunshin)",
                  "Water Release: Water Severing Wave",
                  "Water Formation Wall",
                  "Impure World Reincarnation (Edo Tensei)"
            ]
      },
      {
            "id": "KN-000000",
            "name": "Madara Uchiha",
            "kanji": "うちはマダラ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "uchiha",
            "clanDisplay": "Uchiha Clan",
            "rank": "kage",
            "rankDisplay": "Legendary Leader (Co-Founder)",
            "status": "deceased",
            "image": "./assets/image/shinobi_madara.png",
            "specialty": "Perfect Susanoo / Tengai Shinsei / Majestic Destroyer",
            "natures": "Fire, Wind, Lightning, Earth, Water, Yin, Yang",
            "classification": "Legendary Clan Patriarch / Ten-Tails Host",
            "summary": "Co-founder of Konohagakure alongside Hashirama Senju and absolute master of the Uchiha Clan. Single-handedly battled entire shinobi armies with colossal Perfect Susanoo.",
            "techniques": [
                  "Tengai Shinsei (Heaven Concealed Meteorites)",
                  "Fire Release: Great Fire Annihilation",
                  "Majestic Attire: Susanoo",
                  "Limbo: Border Jail (Hengoku)",
                  "Wood Release: Deep Forest Bloom"
            ]
      },
      {
            "id": "KN-005640",
            "name": "Minato Namikaze",
            "kanji": "波風ミナト",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Namikaze Lineage",
            "rank": "kage",
            "rankDisplay": "Fourth Hokage",
            "status": "deceased",
            "image": "./assets/image/shinobi_minato.png",
            "specialty": "Flying Thunder God (Hiraishin) / Rasengan / Space-Time",
            "natures": "Fire, Wind, Lightning, Yin, Yang",
            "classification": "Yellow Flash of the Leaf / Fourth Hokage",
            "summary": "Fourth Hokage renowned worldwide as the 'Yellow Flash'. Mastered space-time ninjutsu to teleport instantaneously across tagged kunai battlefield matrices and invented the Rasengan.",
            "techniques": [
                  "Flying Thunder God (Hiraishin no Jutsu)",
                  "Rasengan (Spiralling Sphere)",
                  "Flying Thunder God: Second Step",
                  "Dead Demon Consuming Seal (Shiki Fūjin)",
                  "Eight Trigrams Sealing Style"
            ]
      },
      {
            "id": "KN-002302",
            "name": "Tsunade Senju",
            "kanji": "綱手",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "senju",
            "clanDisplay": "Senju Clan",
            "rank": "kage",
            "rankDisplay": "Fifth Hokage",
            "status": "active",
            "image": "./assets/image/shinobi_tsunade.png",
            "specialty": "Byakugō Seal / Creation Rebirth / Monster Strength",
            "natures": "Lightning, Earth, Water, Fire, Yang",
            "classification": "Medical-nin Pioneer / Legendary Sannin",
            "summary": "Granddaughter of Hashirama Senju and the world's supreme Medical-nin. Rebuilt Konohagakure after the Pain invasion and led the Allied Medical divisions in the Fourth War.",
            "techniques": [
                  "Creation Rebirth (Sōzō Saisei)",
                  "Strength of a Hundred Technique (Byakugō no Jutsu)",
                  "Heavenly Foot of Pain (Chakra Impact Punch)",
                  "Summoning: Katsuyu (Acid Slime / Telepathic Healing)",
                  "Chakra Scalpel Surgical Striking"
            ]
      },
      {
            "id": "KN-000261",
            "name": "Hiruzen Sarutobi",
            "kanji": "猿飛ヒルゼン",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "sarutobi",
            "clanDisplay": "Sarutobi Clan",
            "rank": "kage",
            "rankDisplay": "Third Hokage",
            "status": "deceased",
            "image": "./assets/image/shinobi_hiruzen.png",
            "specialty": "Master of Five Nature Releases / Monkey King Enma",
            "natures": "Fire, Earth, Water, Wind, Lightning, Yin, Yang",
            "classification": "The Professor / God of Shinobi",
            "summary": "Longest-serving Hokage known as 'The Professor' for mastering all five basic chakra natures and every combat jutsu created within Konohagakure.",
            "techniques": [
                  "Five Release Combo: Grand Elemental Torrent",
                  "Summoning: Monkey King Enma (Adamantine Staff)",
                  "Roof Tile Shuriken & Shuriken Shadow Clone",
                  "Fire Release: Dragon Fire Technique",
                  "Reaper Death Seal (Shiki Fūjin)"
            ]
      },
      {
            "id": "KN-002300",
            "name": "Jiraiya",
            "kanji": "自来也",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Independent Lineage",
            "rank": "jonin",
            "rankDisplay": "Legendary Sannin",
            "status": "deceased",
            "image": "./assets/image/shinobi_jiraiya.png",
            "specialty": "Toad Sage Mode / Ultra-Big Rasengan / Hair Needle Senbon",
            "natures": "Fire, Earth, Water, Wind, Yin, Yang",
            "classification": "Toad Sage / Legendary Sannin",
            "summary": "One of Konoha's Legendary Sannin and author who mentored both the Fourth and Seventh Hokages. Traveled the world seeking peace and gathering intelligence on the Akatsuki.",
            "techniques": [
                  "Sage Art: Goemon (Boiling Oil Storm)",
                  "Ultra-Big Ball Rasengan (Chō Ōdama Rasengan)",
                  "Toad Flat - Shadow Manipulation Technique",
                  "Needle Jizō & Hair Senbon",
                  "Summoning: Gamabunta / Mount Myōboku Toads"
            ]
      },
      {
            "id": "KN-002301",
            "name": "Orochimaru",
            "kanji": "大蛇丸",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf / Sound",
            "clan": "other",
            "clanDisplay": "Independent Lineage",
            "rank": "jonin",
            "rankDisplay": "Founder of Otogakure",
            "status": "active",
            "image": "./assets/image/shinobi_orochimaru.png",
            "specialty": "Edo Tensei / Snake Body Immortality / Kusanagi Sword",
            "natures": "Wind, Lightning, Earth, Water, Fire, Yin, Yang",
            "classification": "Legendary Sannin / Immortality Researcher",
            "summary": "Legendary Sannin obsessed with unlocking all universal knowledge and achieving true physical immortality through body transference jutsu and genetic mastery.",
            "techniques": [
                  "Summoning: Impure World Reincarnation (Edo Tensei)",
                  "Eight Branches Technique (Yamata no Jutsu)",
                  "Sword of Kusanagi: Chidori Blade Control",
                  "Living Corpse Reincarnation (Fushi Tensei)",
                  "Hidden Shadow Snake Hands (Sen'ei Jashu)"
            ]
      },
      {
            "id": "SN-015842",
            "name": "Gaara",
            "kanji": "我愛羅",
            "village": "sand",
            "villageDisplay": "Hidden Sand",
            "clan": "other",
            "clanDisplay": "Kazekage Lineage",
            "rank": "kage",
            "rankDisplay": "Fifth Kazekage",
            "status": "active",
            "image": "./assets/image/shinobi_gaara.png",
            "specialty": "Sand Manipulation / Sand Tsunami / Absolute Defense",
            "natures": "Wind, Earth, Lightning",
            "classification": "Supreme Commander / Former Jinchūriki",
            "summary": "Fifth Kazekage of Sunagakure and supreme commanding general of the Allied Shinobi Forces. Controls chakra-infused sand with impenetrable defensive resilience.",
            "techniques": [
                  "Sand Binding Coffin (Sabaku Kyū)",
                  "Sand Waterfall Imperial Funeral",
                  "Shield of Sand (Mother's Protection)",
                  "Desert Suspension (Flying Sand Cloud)",
                  "Grand Sand Mausoleum Seal"
            ]
      },
      {
            "id": "KN-012587",
            "name": "Neji Hyūga",
            "kanji": "日向ネジ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "hyuga",
            "clanDisplay": "Hyūga Clan",
            "rank": "jonin",
            "rankDisplay": "Jōnin Specialist",
            "status": "deceased",
            "image": "./assets/image/shinobi_neji.png",
            "specialty": "Eight Trigrams Sixty-Four Palms / Revolving Heaven",
            "natures": "Fire, Water, Earth",
            "classification": "Byakugan Prodigy / Branch House Pillar",
            "summary": "Greatest natural prodigy of the Hyūga Clan branch house. Mastered the 360-degree all-seeing Byakugan and surgical Gentle Fist tenketsu combat.",
            "techniques": [
                  "Eight Trigrams Sixty-Four Palms",
                  "Eight Trigrams Palms Revolving Heaven (Kaiten)",
                  "Eight Trigrams Vacuum Palm (Kūshō)",
                  "Gentle Fist Tenketsu Strike",
                  "Byakugan All-Seeing Eye Sight"
            ]
      },
      {
            "id": "KN-012612",
            "name": "Hinata Hyūga",
            "kanji": "日向ヒナタ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "hyuga",
            "clanDisplay": "Hyūga Clan",
            "rank": "chunin",
            "rankDisplay": "Heiress / Chūnin Specialist",
            "status": "active",
            "image": "./assets/image/shinobi_hinata.png",
            "specialty": "Twin Lion Fists / Gentle Step Protection",
            "natures": "Fire, Lightning",
            "classification": "Byakugan Princess / Main House Heiress",
            "summary": "Main branch heiress of the Hyūga Clan who synthesized the high-tier Gentle Step Twin Lion Fists and fought valiantly on the front lines against Pain and the Ten-Tails.",
            "techniques": [
                  "Gentle Step Twin Lion Fists (Jūho Sōshiken)",
                  "Eight Trigrams Thirty-Two Palms",
                  "Eight Trigrams Protective Revolving Palms",
                  "Byakugan Chakra Stream Sight",
                  "Chakra Infusion Medical Support"
            ]
      },
      {
            "id": "KN-012611",
            "name": "Shikamaru Nara",
            "kanji": "奈良シカマル",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "nara",
            "clanDisplay": "Nara Clan",
            "rank": "jonin",
            "rankDisplay": "Chief Strategic Advisor (Jōnin)",
            "status": "active",
            "image": "./assets/image/shinobi_shikamaru.png",
            "specialty": "Shadow Possession (Kagemane) / 200+ IQ Strategy",
            "natures": "Fire, Earth, Yin",
            "classification": "Chief War Strategist / Hokage Advisor",
            "summary": "Supreme strategist of the Allied Shinobi Forces boasting an IQ over 200. Wields the Nara Clan's signature Yin-chakra shadow binding techniques.",
            "techniques": [
                  "Shadow Possession Jutsu (Kagemane no Jutsu)",
                  "Shadow Strangle Jutsu (Kage-Kubishibari)",
                  "Shadow Stitching Jutsu (Kage Nui)",
                  "Shadow Clutch Technique",
                  "Tactical Flash-Bomb Ambush Formations"
            ]
      },
      {
            "id": "KN-010829",
            "name": "Asuma Sarutobi",
            "kanji": "猿飛アスマ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "sarutobi",
            "clanDisplay": "Sarutobi Clan",
            "rank": "jonin",
            "rankDisplay": "Team 10 Leader (Jōnin)",
            "status": "deceased",
            "image": "./assets/image/shinobi_asuma.png",
            "specialty": "Wind Chakra Trench Knives / Fire Ash Burning",
            "natures": "Wind, Fire",
            "classification": "Former Guardian Shinobi Twelve",
            "summary": "Son of the Third Hokage and former Guardian Shinobi Twelve who mentored Team 10, passing down the sacred 'King' philosophy of protecting the future generation.",
            "techniques": [
                  "Flying Swallow (Chakra-Bladed Trench Knives)",
                  "Fire Release: Ash Pile Burning (Haisekishō)",
                  "Welcoming Approaches: Thousand-Hand Strike",
                  "Wind Release: Dust Cloud Technique",
                  "Close-Quarters Taijutsu Flow"
            ]
      },
      {
            "id": "KN-007893",
            "name": "Kushina Uzumaki",
            "kanji": "うずまきクシナ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf / Whirlpool",
            "clan": "uzumaki",
            "clanDisplay": "Uzumaki Clan",
            "rank": "jonin",
            "rankDisplay": "Jōnin Sealing Master",
            "status": "deceased",
            "image": "./assets/image/shinobi_kushina.png",
            "specialty": "Adamantine Sealing Chains / High Vitality Sealing",
            "natures": "Wind, Water, Yin",
            "classification": "Second Nine-Tails Jinchūriki",
            "summary": "Princess of the Uzumaki Clan hailing from Uzushiogakure and second Nine-Tails Jinchūriki. Known for her blazing red hair and unbreakable Adamantine Sealing Chains.",
            "techniques": [
                  "Adamantine Sealing Chains (Kongō Fūsa)",
                  "Adamantine Attacking Chains",
                  "Four Symbols Seal",
                  "High-Density Vitality Recovery",
                  "Sealing Barrier Formations"
            ]
      },
      {
            "id": "IW-001001",
            "name": "Ōnoki",
            "kanji": "オオノキ",
            "village": "rock",
            "villageDisplay": "Hidden Stone",
            "clan": "other",
            "clanDisplay": "Kamizuru Lineage",
            "rank": "kage",
            "rankDisplay": "Third Tsuchikage",
            "status": "deceased",
            "image": "./assets/image/shinobi_onoki.png",
            "specialty": "Dust Release: Atomic Disintegration (Jinton)",
            "natures": "Earth, Wind, Fire, Lightning, Yang",
            "classification": "Fence-Sitter of the Rock / Kekkei Tōta",
            "summary": "Third Tsuchikage of Iwagakure wielding the extremely rare Kekkei Tōta (Dust Release) which combines Earth, Wind, and Fire to dismantle targets on a molecular level.",
            "techniques": [
                  "Dust Release: Detachment of the Primitive World (Jinton)",
                  "Earth Release: Added-Weight Rock Technique",
                  "Earth Release: Light-Weight Rock Technique (Flight)",
                  "Earth Release: Golem Technique",
                  "Earth Style Mountain Jutsu"
            ]
      },
      {
            "id": "KM-000008",
            "name": "Killer B",
            "kanji": "キラービー",
            "village": "cloud",
            "villageDisplay": "Hidden Cloud",
            "clan": "other",
            "clanDisplay": "Cloud Brotherhood",
            "rank": "jonin",
            "rankDisplay": "Hero of the Cloud (Jōnin)",
            "status": "active",
            "image": "./assets/image/shinobi_killer_b.png",
            "specialty": "Eight-Tails Full Transformation / Seven Swords Flow",
            "natures": "Lightning, Fire, Water",
            "classification": "Perfect Eight-Tails Jinchūriki",
            "summary": "Eight-Tails (Gyūki) Perfect Jinchūriki and adoptive brother of the Fourth Raikage. Acrobatic master of the Seven-Swords Dance who guided Naruto in befriending Kurama.",
            "techniques": [
                  "Tailed Beast Bomb (Bijūdama)",
                  "Acrobat Seven-Swords Dance",
                  "Lightning Release: Lariat",
                  "Eight-Tails Ink Binding Clone",
                  "Tailed Beast Full Transformation"
            ]
      },
      {
            "id": "KR-000005",
            "name": "Mei Terumī",
            "kanji": "照美メイ",
            "village": "mist",
            "villageDisplay": "Hidden Mist",
            "clan": "other",
            "clanDisplay": "Terumī Clan",
            "rank": "kage",
            "rankDisplay": "Fifth Mizukage",
            "status": "active",
            "image": "./assets/image/shinobi_mei.png",
            "specialty": "Lava Release (Yōton) / Boil Release (Futton)",
            "natures": "Water, Fire, Earth, Lightning",
            "classification": "Dual Kekkei Genkai Wielder / Mizukage",
            "summary": "Fifth Mizukage who liberated Kirigakure from its 'Bloody Mist' dark age. Extremely rare master born with two distinct Kekkei Genkai: acidic Boil Release and melting Lava Release.",
            "techniques": [
                  "Lava Release: Melting Apparition Technique",
                  "Boil Release: Skilled Mist Technique (Corrosive Acid)",
                  "Water Release: Water Dragon Bullet Technique",
                  "Water Pillar Defense Jutsu",
                  "Hidden Mist Silent Killing Counter"
            ]
      },
      {
            "id": "KN-010886",
            "name": "Obito Uchiha",
            "kanji": "うちはオビト",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf / Akatsuki",
            "clan": "uchiha",
            "clanDisplay": "Uchiha Clan",
            "rank": "chunin",
            "rankDisplay": "Leader of Akatsuki (Former Chūnin)",
            "status": "deceased",
            "image": "./assets/image/shinobi_obito.png",
            "specialty": "Kamui Intangibility / Wood Release / Rinnegan Control",
            "natures": "Fire, Wind, Lightning, Earth, Water, Wood, Yin, Yang",
            "classification": "Ten-Tails Jinchūriki / Eye of the Moon Architect",
            "summary": "Former teammate of Kakashi Hatake who orchestrated the Fourth Shinobi World War under the guise of Madara Uchiha before finding redemption alongside Naruto.",
            "techniques": [
                  "Kamui (Self-Phasing & Pocket Dimension Teleport)",
                  "Fire Release: Blast Wave Wild Dance",
                  "Wood Release: Cutting Technique (Sashiki no Jutsu)",
                  "Six Paths Ten-Tails Truth-Seeking Orbs",
                  "Izanagi Reality Distortion"
            ]
      },
      {
            "id": "AM-000001",
            "name": "Pain (Nagato)",
            "kanji": "長門 / ペイン",
            "village": "other",
            "villageDisplay": "Hidden Rain (Amegakure)",
            "clan": "uzumaki",
            "clanDisplay": "Uzumaki Lineage",
            "rank": "kage",
            "rankDisplay": "God of Amegakure / Akatsuki Leader",
            "status": "deceased",
            "image": "./assets/image/shinobi_pain.png",
            "specialty": "Six Paths of Pain / Shinra Tensei / Chibaku Tensei",
            "natures": "Fire, Wind, Lightning, Earth, Water, Yang",
            "classification": "Rinnegan Master / God of Rain",
            "summary": "Disciple of Jiraiya and leader of Akatsuki who controlled six reanimated bodies via chakra receivers, seeking world peace through universal deterrence.",
            "techniques": [
                  "Almighty Push (Shinra Tensei)",
                  "Universal Pull (Banshō Ten'in)",
                  "Catastrophic Planetary Construction (Chibaku Tensei)",
                  "Outer Path: Samsara of Heavenly Life (Gedō Rinne Tensei)",
                  "Summoning: Demonic Statue of the Outer Path (Gedō Mazō)"
            ]
      },
      {
            "id": "KN-010252",
            "name": "Might Guy",
            "kanji": "マイト・ガイ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Noble Beast Lineage",
            "rank": "jonin",
            "rankDisplay": "Konoha's Sublime Green Beast",
            "status": "active",
            "image": "./assets/image/shinobi_guy.png",
            "specialty": "Eight Inner Gates (Hachimon Tonkō) / Night Guy",
            "natures": "Fire, Lightning",
            "classification": "Master of Taijutsu / Sublime Beast",
            "summary": "Master of Team Guy and lifelong rival of Kakashi Hatake. The foremost taijutsu supreme master who forced Ten-Tails Madara to declare him the strongest.",
            "techniques": [
                  "Eight Inner Gates: Gate of Death (Shimon)",
                  "Night Guy (Yagai - Dragon Kick)",
                  "Afternoon Tiger (Hirudora - Air Pressure Cannon)",
                  "Evening Elephant (Sekizō)",
                  "Morning Peacock (Asakujaku)"
            ]
      },
      {
            "id": "KN-012561",
            "name": "Rock Lee",
            "kanji": "ロック・リー",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Pure Effort Discipline",
            "rank": "jonin",
            "rankDisplay": "Master of the Eight Gates (Jōnin)",
            "status": "active",
            "image": "./assets/image/shinobi_lee.png",
            "specialty": "Primary Lotus / Hidden Lotus / Drunken Fist",
            "natures": "None (Pure Taijutsu Flow)",
            "classification": "Taijutsu Virtuoso / Genius of Hard Work",
            "summary": "Beloved disciple of Might Guy who overcame the inability to mold ninjutsu or genjutsu through unrelenting hard work and peerless physical mastery.",
            "techniques": [
                  "Primary Lotus (Omote Renge)",
                  "Hidden Lotus (Ura Renge)",
                  "Six Gates Release (Hachimon Tonkō)",
                  "Drunken Fist Style (Suiken)",
                  "Leaf Hurricane & Whirlwind Kick Combos"
            ]
      },
      {
            "id": "KN-012601",
            "name": "Sakura Haruno",
            "kanji": "春野サクラ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Haruno Clan",
            "rank": "jonin",
            "rankDisplay": "Chief of Medical Division (Jōnin)",
            "status": "active",
            "image": "./assets/image/shinobi_sakura.png",
            "specialty": "Byakugō Seal / Monster Strength / Cellular Regeneration",
            "natures": "Earth, Water, Yin, Yang",
            "classification": "Supreme Medical-nin / Team 7 Veteran",
            "summary": "Direct apprentice of Tsunade Senju and core pillar of Team 7. Mastered pinpoint chakra control, diamond Byakugō reserve seals, and catastrophic taijutsu strikes.",
            "techniques": [
                  "Strength of a Hundred Seal (Byakugō)",
                  "Cherry Blossom Clash (Ōkashō)",
                  "Creation Rebirth Cellular Regeneration",
                  "Summoning: Katsuyu Healing Division",
                  "Chakra Extraction & Antidote Synthesis"
            ]
      },
      {
            "id": "KG-003892",
            "name": "Kisame Hoshigaki",
            "kanji": "干柿鬼鮫",
            "village": "mist",
            "villageDisplay": "Hidden Mist / Akatsuki",
            "clan": "other",
            "clanDisplay": "Hoshigaki Clan",
            "rank": "jonin",
            "rankDisplay": "Seven Ninja Swordsman / Akatsuki",
            "status": "deceased",
            "image": "./assets/image/shinobi_kisame.png",
            "specialty": "Samehada Fusion / Super Shark Bomb / Giant Water Vortex",
            "natures": "Water, Earth, Wind, Fire",
            "classification": "Monster of the Mist / Tailless Tailed Beast",
            "summary": "Renowned as the 'Monster of the Hidden Mist' and wielder of the living chakra-devouring greatsword Samehada. Boasted oceanic chakra reserves.",
            "techniques": [
                  "Water Release: Great Shark Bullet (Daikōdan no Jutsu)",
                  "Water Release: Water Prison Shark Dance",
                  "Samehada Chakra Shave & Flesh Fusion",
                  "Five Feeding Sharks (Goshokuzame)",
                  "Water Formation Dome Enclosure"
            ]
      },
      {
            "id": "KG-002100",
            "name": "Zabuza Momochi",
            "kanji": "桃地再不斬",
            "village": "mist",
            "villageDisplay": "Hidden Mist",
            "clan": "other",
            "clanDisplay": "Momochi Lineage",
            "rank": "jonin",
            "rankDisplay": "Demon of the Hidden Mist",
            "status": "deceased",
            "image": "./assets/image/shinobi_zabuza.png",
            "specialty": "Silent Killing / Kubikiribōchō / Water Dragon",
            "natures": "Water",
            "classification": "Seven Ninja Swordsman of the Mist",
            "summary": "Fierce rogue shinobi of Kirigakure renowned as the 'Demon of the Mist'. Supreme assassin utilizing thick concealment mists and the Executioner's Blade.",
            "techniques": [
                  "Silent Killing Technique (Sairento Kiringu)",
                  "Hidden Mist Technique (Kirigakure no Jutsu)",
                  "Water Release: Water Dragon Bullet",
                  "Water Release: Great Waterfall Technique",
                  "Water Clone Jutsu (Mizu Bunshin)"
            ]
      },
      {
            "id": "SN-015841",
            "name": "Temari",
            "kanji": "テマリ",
            "village": "sand",
            "villageDisplay": "Hidden Sand",
            "clan": "other",
            "clanDisplay": "Kazekage Lineage",
            "rank": "jonin",
            "rankDisplay": "Chief Diplomat / Wind Specialist",
            "status": "active",
            "image": "./assets/image/shinobi_temari.png",
            "specialty": "Giant Iron Fan / Wind Scythe Jutsu / Kamatari",
            "natures": "Wind",
            "classification": "Wind Release Virtuoso / Sand Ambassador",
            "summary": "Eldest sibling of Gaara and premier long-range combat specialist of Sunagakure. Commands hurricanes and razor-sharp slicing gales with her iron fan.",
            "techniques": [
                  "Wind Release: Great Sickle Weasel Technique",
                  "Summoning: Blade Dance (Kamatari Weasel)",
                  "Wind Release: Cast Net Snare",
                  "Sea Dragon Hurricane Vortex",
                  "Iron Folding Fan Combat Deflection"
            ]
      },
      {
            "id": "SN-015843",
            "name": "Kankurō",
            "kanji": "カンクロウ",
            "village": "sand",
            "villageDisplay": "Hidden Sand",
            "clan": "other",
            "clanDisplay": "Kazekage Lineage",
            "rank": "jonin",
            "rankDisplay": "Puppet Master Commander (Jōnin)",
            "status": "active",
            "image": "./assets/image/shinobi_kankuro.png",
            "specialty": "Puppet Master Technique / Black Secret Trio / Poison",
            "natures": "Wind, Lightning, Earth",
            "classification": "Supreme Puppet Master / Suna Pillar",
            "summary": "Master puppeteer of the Hidden Sand who commands the legendary mechanical marionettes Crow, Black Ant, Salamander, and the human puppet Sasori.",
            "techniques": [
                  "Black Secret Technique: Machine One Shot",
                  "Black Secret Technique: Machine Two Shot",
                  "Puppet Performance: Secret Poison Smoke Cannon",
                  "Puppet Shield Salamander Iron Wall",
                  "Human Puppet Sasori Mechanism Control"
            ]
      },
      {
            "id": "KN-011200",
            "name": "Shisui Uchiha",
            "kanji": "うちはシスイ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "uchiha",
            "clanDisplay": "Uchiha Clan",
            "rank": "jonin",
            "rankDisplay": "Shisui of the Body Flicker (Jōnin)",
            "status": "deceased",
            "image": "./assets/image/shinobi_shisui.png",
            "specialty": "Kotoamatsukami / Body Flicker / Green Susanoo",
            "natures": "Fire, Wind, Lightning, Yin",
            "classification": "Ultimate Genjutsu Master / Will of Fire",
            "summary": "Legendary Uchiha prodigy and mentor to Itachi. Possessed the ultimate hypnotic Mangekyō genjutsu 'Kotoamatsukami' which mind-controlled victims without their awareness.",
            "techniques": [
                  "Kotoamatsukami (Subtle Mind Control Genjutsu)",
                  "Afterimage Body Flicker Technique (Shunshin)",
                  "Green Chakra Susanoo with Tsukumo Needles",
                  "Fire Release: Great Dragon Fire Technique",
                  "Uchiha Style Halo Dance Shurikenjutsu"
            ]
      },
      {
            "id": "IW-002400",
            "name": "Deidara",
            "kanji": "デイダラ",
            "village": "rock",
            "villageDisplay": "Hidden Stone / Akatsuki",
            "clan": "other",
            "clanDisplay": "Explosion Corps",
            "rank": "jonin",
            "rankDisplay": "Akatsuki Vanguard / S-Rank Bomber",
            "status": "deceased",
            "image": "./assets/image/shinobi_deidara.png",
            "specialty": "Explosion Release (Bakuton) / C4 Karura / C0 Self-Destruct",
            "natures": "Earth, Lightning",
            "classification": "Explosion Release Master / Art of Explosion",
            "summary": "Rogue master of the Iwagakure Explosion Corps who infused explosive chakra into sculpted white clay, claiming true artistic perfection exists in an instant flash.",
            "techniques": [
                  "C3: Ohako (Sub-Atomic Village Buster)",
                  "C4 Karura (Microscopic Cellular Bombs)",
                  "C1 Clay Birds & Guided Spiders",
                  "C2 Dragon Aerial Bombardment",
                  "Ultimate Art: C0 (Self-Destruct Detonation)"
            ]
      },
      {
            "id": "SN-003300",
            "name": "Sasori",
            "kanji": "サソリ",
            "village": "sand",
            "villageDisplay": "Hidden Sand / Akatsuki",
            "clan": "other",
            "clanDisplay": "Puppet Guild",
            "rank": "jonin",
            "rankDisplay": "Sasori of the Red Sand",
            "status": "deceased",
            "image": "./assets/image/shinobi_sasori.png",
            "specialty": "Puppet Transformation / 100 Puppets / Iron Sand",
            "natures": "Fire, Wind, Earth, Lightning, Water",
            "classification": "Creator of Human Puppetry / Akatsuki",
            "summary": "Legendary artisan from the Hidden Sand who invented Human Puppetry, transformed his own living body into an immortal marionette, and wielded the Third Kazekage's Iron Sand.",
            "techniques": [
                  "Red Secret Technique: Performance of a Hundred Puppets",
                  "Third Kazekage Human Puppet: Iron Sand World Method",
                  "Flamethrower & High-Pressure Water Stream Cores",
                  "Hiruko Defensive Armor Shell",
                  "Incurable Neurotoxin Coating Blades"
            ]
      },
      {
            "id": "KG-001050",
            "name": "Haku",
            "kanji": "白",
            "village": "mist",
            "villageDisplay": "Hidden Mist",
            "clan": "other",
            "clanDisplay": "Yuki Clan",
            "rank": "genin",
            "rankDisplay": "Ice Release Prodigy",
            "status": "deceased",
            "image": "./assets/image/shinobi_haku.png",
            "specialty": "Ice Release (Hyōton) / Demonic Ice Mirrors / Senbon",
            "natures": "Wind, Water",
            "classification": "Kekkei Genkai Prodigy / Zabuza's Weapon",
            "summary": "Kind-hearted survivor of the Yuki Clan possessing the rare Ice Release Kekkei Genkai. Master of one-handed hand seals and instantaneous needle acupuncture strikes.",
            "techniques": [
                  "Demonic Mirroring Ice Crystals (Makyō Hyōshō)",
                  "Certain-Kill Senbon Acupuncture Throw",
                  "One-Handed Hand Seal Ninjutsu",
                  "Ice Release: Ice Spike Dome",
                  "Sensory Cold Air Detection"
            ]
      },
      {
            "id": "AM-000002",
            "name": "Konan",
            "kanji": "小南",
            "village": "other",
            "villageDisplay": "Hidden Rain (Amegakure)",
            "clan": "other",
            "clanDisplay": "Independent Lineage",
            "rank": "kage",
            "rankDisplay": "God's Angel / Leader of Rain",
            "status": "deceased",
            "image": "./assets/image/shinobi_konan.png",
            "specialty": "Dance of the Shikigami / 600 Billion Explosive Paper",
            "natures": "Wind, Earth, Water, Yang",
            "classification": "Angel of Amegakure / Akatsuki Co-Founder",
            "summary": "Sole female co-founder of the Akatsuki alongside Yahiko and Nagato. Transformed her entire chakra and body into millions of razor-sharp sheets of origami paper.",
            "techniques": [
                  "Dance of the Shikigami (Origami Body Transformation)",
                  "Paper Person of God Technique (600 Billion Paper Bombs)",
                  "Paper Shuriken & Origami Chakram Discs",
                  "Paper Butterfly Surveillance Grid",
                  "Origami Angel Wing Flight"
            ]
      },
      {
            "id": "KN-012602",
            "name": "Sai",
            "kanji": "サイ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Yamanaka Affiliate (Anbu Root)",
            "rank": "chunin",
            "rankDisplay": "Anbu Director (Chūnin / Special Jōnin)",
            "status": "active",
            "image": "./assets/image/shinobi_sai.png",
            "specialty": "Super Beast Imitating Drawing (Chōjū Giga)",
            "natures": "Water, Fire, Earth, Yang",
            "classification": "Former Root Operative / Team 7 Member",
            "summary": "Former elite assassin from Danzō's Root division who replaced Sasuke on Team 7. Brings ink illustrations to life on scrolls for aerial transport, tracking, and sealing.",
            "techniques": [
                  "Super Beast Imitating Drawing (Chōjū Giga)",
                  "Super God Imitating Drawing",
                  "Tiger Stalking Vision Sealing Scroll",
                  "Ink Clone Technique (Sumi Bunshin)",
                  "Ink Mist Camouflage Evasion"
            ]
      },
      {
            "id": "KN-012604",
            "name": "Kiba Inuzuka",
            "kanji": "犬塚キバ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Inuzuka Clan",
            "rank": "chunin",
            "rankDisplay": "Chūnin Scout Specialist",
            "status": "active",
            "image": "./assets/image/shinobi_kiba.png",
            "specialty": "Man Beast Clone / Fang Over Fang / Akamaru Partner",
            "natures": "Earth, Yang",
            "classification": "Canine Combat Specialist / Team 8 Tracker",
            "summary": "High-octane member of Team 8 fighting in complete synchronization with his faithful ninken partner Akamaru through feral beast-mimicry strikes.",
            "techniques": [
                  "Fang Over Fang (Gatsūga)",
                  "Man Beast Combination: Two-Headed Wolf",
                  "Four Legs Technique (Shikyaku no Jutsu)",
                  "Super Olfactory Sensory Tracking",
                  "Tail Chasing Fang Drill"
            ]
      },
      {
            "id": "KN-012618",
            "name": "Shino Aburame",
            "kanji": "油女シノ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Aburame Clan",
            "rank": "chunin",
            "rankDisplay": "Academy Instructor (Chūnin Specialist)",
            "status": "active",
            "image": "./assets/image/shinobi_shino.png",
            "specialty": "Parasitic Destruction Insects (Kikaichū)",
            "natures": "Earth, Fire, Yang",
            "classification": "Insect Master / Academy Sensei",
            "summary": "Stoic insect master of the Aburame Clan whose body serves as a living hive for thousands of chakra-draining Kikaichū beetles.",
            "techniques": [
                  "Secret Technique: Insect Sphere (Mushi Dama)",
                  "Parasitic Giant Beetle: Infestation (Kidaichū)",
                  "Insect Clone Technique (Mushi Bunshin)",
                  "Insect Jamming Technique",
                  "Human Cocoon Poison Neutralization"
            ]
      },
      {
            "id": "KN-012608",
            "name": "Chōji Akimichi",
            "kanji": "秋道チョウジ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Akimichi Clan",
            "rank": "chunin",
            "rankDisplay": "Sixteenth Clan Head (Chūnin)",
            "status": "active",
            "image": "./assets/image/shinobi_choji.png",
            "specialty": "Calorie Control / Butterfly Mode / Human Boulder",
            "natures": "Fire, Earth, Yang",
            "classification": "Ino-Shika-Chō Pillar / Clan Patriarch",
            "summary": "Sixteenth head of the Akimichi Clan and stalwart member of Team 10. Converts bodily calories directly into pure chakra for colossal physical expansion.",
            "techniques": [
                  "Butterfly Mode: Calorie Control Wings",
                  "Human Bullet Tank (Nikudan Sensha)",
                  "Super Multi-Size Technique (Chō Baika no Jutsu)",
                  "Butterfly Bullet Bombing (Chōdan Bakugeki)",
                  "Spiked Human Boulder"
            ]
      },
      {
            "id": "KN-012609",
            "name": "Ino Yamanaka",
            "kanji": "山中いの",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Yamanaka Clan",
            "rank": "chunin",
            "rankDisplay": "Head of Sensory Division (Chūnin)",
            "status": "active",
            "image": "./assets/image/shinobi_ino.png",
            "specialty": "Mind Body Switch (Shintenshin) / Telepathic Network",
            "natures": "Earth, Water, Yin, Yang",
            "classification": "Chief Sensory Divison / Ino-Shika-Chō Pillar",
            "summary": "Head of the Yamanaka Clan and commander of Konohagakure's Sensory Network. Connects the minds of thousands across continents simultaneously for telepathic coordination.",
            "techniques": [
                  "Mind Body Switch Technique (Shintenshin no Jutsu)",
                  "Mind Body Transmission Telepathic Grid",
                  "Mind Body Disturbance Jutsu",
                  "Chakra Sensory Sphere Perception",
                  "Medical Chakra Healing Palm"
            ]
      },
      {
            "id": "KN-012560",
            "name": "Tenten",
            "kanji": "テンテン",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Weapons Specialist Guild",
            "rank": "chunin",
            "rankDisplay": "Chūnin Weapon Master",
            "status": "active",
            "image": "./assets/image/shinobi_tenten.png",
            "specialty": "Bukijutsu / Twin Rising Dragons / Treasured Tools",
            "natures": "None (Pure Scroll Weapon Mastery)",
            "classification": "Ninja Tool Virtuoso / Team Guy Pillar",
            "summary": "Weapons virtuoso of Team Guy who stores and summons an arsenal of thousands of bladed tools, explosive projectiles, and the Sage of Six Paths' Treasured Tools from spatial scrolls.",
            "techniques": [
                  "Twin Rising Dragons (Sōryū)",
                  "Dynamic Entry Weapon Barrage",
                  "Sage Tool: Banana Fan (Bashōsen Five Elements)",
                  "Iron Binding Wire Formations",
                  "Exploding Dragon Strike Scroll"
            ]
      },
      {
            "id": "KN-010992",
            "name": "Yamato",
            "kanji": "ヤマト",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Anbu Special Division",
            "rank": "jonin",
            "rankDisplay": "Special Jōnin / Anbu Captain",
            "status": "active",
            "image": "./assets/image/shinobi_yamato_real.jpg",
            "specialty": "Wood Release (Mokuton) / Hokage-Style Tailed Beast Subjugation",
            "natures": "Earth, Water, Wood, Yang",
            "classification": "Wood Release Experiment Survivor / Team Kakashi Leader",
            "summary": "Sole survivor of Orochimaru's Hashirama cell experiments and Anbu veteran who commanded Wood Release to construct defenses and suppress Nine-Tails rampages.",
            "techniques": [
                  "Hokage-Style Sixty-Year-Old Technique: Kakuan Entering Society with Bliss-Bringing Hands",
                  "Wood Release: Four Pillars Prison Technique",
                  "Wood Release: Great Forest Technique",
                  "Wood Clone Jutsu (Moku Bunshin)",
                  "Earth Release: Rising Stone Spires"
            ]
      },
      {
            "id": "KN-012140",
            "name": "Kabuto Yakushi",
            "kanji": "薬師カブト",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf / Sound / Ryūchi Cave",
            "clan": "other",
            "clanDisplay": "Medical Espionage Lineage",
            "rank": "jonin",
            "rankDisplay": "Dragon Sage / Mastermind",
            "status": "active",
            "image": "./assets/image/shinobi_kabuto.png",
            "specialty": "Dragon Sage Mode / Inorganic Reincarnation / Edo Tensei Army",
            "natures": "Earth, Water, Wind, Fire, Lightning, Yin, Yang",
            "classification": "Dragon Sage / Orochimaru's Right Hand",
            "summary": "Master intelligence operative who infused genetic DNA from Sound Shinobi and achieved Dragon Sage Mode at Ryūchi Cave, raising the entire historical Edo Tensei army.",
            "techniques": [
                  "Sage Art: Inorganic Reincarnation (Muki Tensei)",
                  "Sage Art: White Rage Technique (Hakugeki no Jutsu)",
                  "Summoning: Impure World Reincarnation (Edo Tensei Vanguard)",
                  "Chakra Scalpel Surgical Severing",
                  "Dead Soul Jutsu (Shikon no Jutsu)"
            ]
      },
      {
            "id": "YU-000001",
            "name": "Hidan",
            "kanji": "飛段",
            "village": "other",
            "villageDisplay": "Hidden Steam (Yugakure)",
            "clan": "other",
            "clanDisplay": "Jashin Cult",
            "rank": "jonin",
            "rankDisplay": "Immortal Zealot of Akatsuki",
            "status": "deceased",
            "image": "./assets/image/shinobi_hidan.png",
            "specialty": "Jashin Curse Ritual / Triple-Bladed Scythe / True Immortality",
            "natures": "None (Curse Jutsu Mastery)",
            "classification": "Zombie Duo / Jashin High Priest",
            "summary": "Immortal vanguard of Akatsuki and religious zealot of Jashin. Links himself spiritually to opponents through consumed blood to inflict mutual fatal wounds with zero personal mortality.",
            "techniques": [
                  "Curse Technique: Death Controlling Possessed Blood",
                  "Triple-Bladed Scythe Hook Acrobatics",
                  "Jashin Blood Symbol Link",
                  "Impalement Retaliation Strike",
                  "Absolute Biological Immortality"
            ]
      },
      {
            "id": "TK-000001",
            "name": "Kakuzu",
            "kanji": "角都",
            "village": "other",
            "villageDisplay": "Hidden Waterfall (Takigakure)",
            "clan": "other",
            "clanDisplay": "Earth Grudge Lineage",
            "rank": "jonin",
            "rankDisplay": "Treasurer of Akatsuki / Five Hearts",
            "status": "deceased",
            "image": "./assets/image/shinobi_kakuzu.png",
            "specialty": "Earth Grudge Fear (Jiongu) / Five Living Elemental Hearts",
            "natures": "Earth, Fire, Wind, Lightning, Water",
            "classification": "Akatsuki Treasurer / Ancient Bounty Hunter",
            "summary": "Legendary bounty hunter from Takigakure who battled the First Hokage. Wove black Earth Grudge threads to harness five distinct living elemental hearts for multifaceted combat.",
            "techniques": [
                  "Earth Grudge Fear (Jiongu Thread Sewing)",
                  "Earth Release: Earth Spear (Diamond Hardening)",
                  "Fire Release: Intelligent Hard Work (Zukokku)",
                  "Wind Release: Pressure Damage (Atsugai)",
                  "Lightning Release: False Darkness (Gian)"
            ]
      },

      {
            "id": "KM-010822",
            "name": "Yugito Nii",
            "kanji": "二位ユギト",
            "village": "cloud",
            "villageDisplay": "Hidden Cloud",
            "clan": "other",
            "clanDisplay": "Kumogakure Clan",
            "rank": "jonin",
            "rankDisplay": "Jōnin / Two-Tails Jinchūriki",
            "status": "deceased",
            "specialty": "Matatabi Fire Release / Claw Taijutsu / Full Beast Transformation",
            "natures": "Fire",
            "classification": "Jinchūriki / Skilled Jōnin",
            "summary": "Highly proud, wise, and courageous kunoichi of Kumogakure. She was the Jinchūriki of Matatabi (Two-Tails) who mastered the ability to transform into her beast at will through rigorous discipline.",
            "techniques": [
                  "Mouse Hairball (Nezumi Kedama)",
                  "Cat Flame Roar (Hōsenka Claw Style)",
                  "Two-Tails Complete Transformation",
                  "Claw Creation Technique",
                  "Fire Release: Blue Blazing Sphere"
            ],
            "image": "./assets/image/jinchuriki_yugito.png"
      },
      {
            "id": "KG-000004",
            "name": "Yagura Karatachi",
            "kanji": "枸橘やぐら",
            "village": "mist",
            "villageDisplay": "Hidden Mist",
            "clan": "other",
            "clanDisplay": "Karatachi Clan",
            "rank": "kage",
            "rankDisplay": "Fourth Mizukage",
            "status": "deceased",
            "specialty": "Water Mirror Technique / Coral Palm / Three-Tails Isobu Control",
            "natures": "Water, Wind, Earth",
            "classification": "Jinchūriki / Mizukage",
            "summary": "Fourth Mizukage of Kirigakure and Jinchūriki of Isobu (Three-Tails). One of the rare shinobi in history who achieved complete synchrony and master control over his Tailed Beast.",
            "techniques": [
                  "Water Release: Water Mirror Technique (Mizu Kagami no Jutsu)",
                  "Coral Palm (Sangoshō)",
                  "Three-Tails Shadow Strike (Isobu Spin)",
                  "Water Release: Aqua Ripple Blast",
                  "Tailed Beast Ball (Bijuudama)"
            ],
            "image": "./assets/image/jinchuriki_yagura.png"
      },
      {
            "id": "IW-000004",
            "name": "Rōshi",
            "kanji": "老紫",
            "village": "stone",
            "villageDisplay": "Hidden Stone",
            "clan": "other",
            "clanDisplay": "Iwagakure Clan",
            "rank": "jonin",
            "rankDisplay": "Veteran Shinobi / Four-Tails Jinchūriki",
            "status": "deceased",
            "specialty": "Lava Release (Yōton) / Son Gokū Molten Armor",
            "natures": "Fire, Earth, Lava",
            "classification": "Jinchūriki / Wandering Hermit",
            "summary": "Elder shinobi of Iwagakure and Jinchūriki of Son Gokū (Four-Tails). Traveled the world for decades to understand the true essence of volcanic chakra, mastering devastating Lava Release ninjutsu.",
            "techniques": [
                  "Lava Release: Scorching Stream Rocks Technique",
                  "Lava Release: Molten Armor Cloak",
                  "Monkey Flame Arson",
                  "Lava Geyser Eruption",
                  "Four-Tails Great Ape Slam"
            ],
            "image": "./assets/image/jinchuriki_roshi.png"
      },
      {
            "id": "IW-000005",
            "name": "Han",
            "kanji": "ハン",
            "village": "stone",
            "villageDisplay": "Hidden Stone",
            "clan": "other",
            "clanDisplay": "Iwagakure Clan",
            "rank": "jonin",
            "rankDisplay": "Steam Shinobi / Five-Tails Jinchūriki",
            "status": "deceased",
            "specialty": "Boil Release (Futton) / Steam-Powered Taijutsu / Kokuō Charge",
            "natures": "Fire, Water, Boil",
            "classification": "Jinchūriki / Heavy Armor Specialist",
            "summary": "Towering warrior of Iwagakure clad in specialized steam-powered armor, known across nations as 'Han of the Steam'. Jinchūriki of Kokuō (Five-Tails) who converted boiling steam into colossal kinetic power.",
            "techniques": [
                  "Boil Release: Unrivaled Strength",
                  "Steam Armor Charge & Propulsion",
                  "Five-Tails Horn Break Smash",
                  "Erupting Steam Thrust",
                  "Boil Release: Boiling Mist Burst"
            ],
            "image": "./assets/image/jinchuriki_han.png"
      },
      {
            "id": "KG-000006",
            "name": "Utakata",
            "kanji": "ウタカタ",
            "village": "mist",
            "villageDisplay": "Hidden Mist",
            "clan": "other",
            "clanDisplay": "Kirigakure Clan",
            "rank": "jonin",
            "rankDisplay": "Missing-nin / Six-Tails Jinchūriki",
            "status": "deceased",
            "specialty": "Bubble Ninjutsu / Acidic Slime / Six-Tails Saiken Form",
            "natures": "Water",
            "classification": "Jinchūriki / Bubble Master",
            "summary": "Rogue shinobi from Kirigakure and Jinchūriki of Saiken (Six-Tails). Wielded a specialized bubble pipe to create floating barriers, concussive explosives, and corrosive acidic soap spheres.",
            "techniques": [
                  "Water Release: Bubble Ninjutsu (Soap Bubble Clone)",
                  "Bubble Release: Drowning Bubble Dome",
                  "Acid Bubble Detonation",
                  "Six-Tails Corrosive Gas Spray",
                  "Wispy Smoke Evasion"
            ],
            "image": "./assets/image/jinchuriki_utakata.png"
      },
      {
            "id": "TK-000007",
            "name": "Fū",
            "kanji": "フウ",
            "village": "other",
            "villageDisplay": "Hidden Waterfall",
            "clan": "other",
            "clanDisplay": "Takigakure Clan",
            "rank": "genin",
            "rankDisplay": "Seven-Tails Jinchūriki",
            "status": "deceased",
            "specialty": "Chōmei Wing Flight / Scale Powder Blindness / Insect Cocoon",
            "natures": "Wind",
            "classification": "Jinchūriki / Aerial Combatant",
            "summary": "Cheerful and free-spirited kunoichi from Takigakure and Jinchūriki of Chōmei (Seven-Tails). Used insect-like wings to soar through skies, blinding foes with glistening luminescent scales.",
            "techniques": [
                  "Scale Powder Blinding Mist (Hinpfun)",
                  "Seven-Tails Flight & Aerial Ramming",
                  "Insect Cocoon Chakra Armor",
                  "Secret Technique: Insect Net Trap",
                  "Spinning Whirlwind Horn Assault"
            ],
            "image": "./assets/image/jinchuriki_fu.png"
      },
      {
            "id": "KM-000004",
            "name": "A (Fourth Raikage)",
            "kanji": "エー・四代目雷影",
            "village": "cloud",
            "villageDisplay": "Hidden Cloud",
            "clan": "other",
            "clanDisplay": "Raikage Lineage",
            "rank": "kage",
            "rankDisplay": "Fourth Raikage (Supreme Commander)",
            "status": "active",
            "specialty": "Lightning Release Chakra Mode / Nintaijutsu / Lariat",
            "natures": "Lightning, Earth, Water",
            "classification": "Raikage / Taijutsu Titan",
            "summary": "Fourth Raikage of Kumogakure and Supreme Commander of the Allied Shinobi Forces. Renowned as the fastest and strongest physical force in the ninja world, cloaking himself in high-voltage lightning chakra.",
            "techniques": [
                  "Lightning Release Chakra Mode (Raiton no Yoroi)",
                  "Liger Bomb (Raigyaku Suihei Chōbo)",
                  "Guillotine Drop (Girochin Doroppu)",
                  "Double Lariat (with Killer B)",
                  "Lightning Oppression Horizontal Chop"
            ],
            "image": "./assets/image/shinobi_ay.png"
      },
      {
            "id": "KM-000003",
            "name": "Third Raikage",
            "kanji": "三代目雷影",
            "village": "cloud",
            "villageDisplay": "Hidden Cloud",
            "clan": "other",
            "clanDisplay": "Raikage Lineage",
            "rank": "kage",
            "rankDisplay": "Third Raikage",
            "status": "deceased",
            "specialty": "Hell Stab (Nukite) / Lightning Shield / Black Lightning",
            "natures": "Lightning, Fire, Earth",
            "classification": "Legendary Raikage / Unbreakable Wall",
            "summary": "Universally acknowledged as the greatest Raikage in Kumogakure history. Wielded the 'Strongest Spear' (One-Finger Hell Stab) and the 'Strongest Shield' (Indestructible Lightning Body), fighting 10,000 enemy shinobi for three continuous days.",
            "techniques": [
                  "Hell Stab: Four-Finger through One-Finger Spear",
                  "Black Lightning (Kuroi Kaminari)",
                  "Impenetrable Lightning Chakra Aegis",
                  "Lightning Straight Punch",
                  "Tailed Beast Wrestling Subjugation"
            ],
            "image": "./assets/image/shinobi_third_raikage.png"
      },
      {
            "id": "IW-000002",
            "name": "Mū",
            "kanji": "無・二代目土影",
            "village": "stone",
            "villageDisplay": "Hidden Stone",
            "clan": "other",
            "clanDisplay": "Iwagakure Lineage",
            "rank": "kage",
            "rankDisplay": "Second Tsuchikage",
            "status": "deceased",
            "specialty": "Dust Release (Kekkei Tōta) / Camouflage Invisibility / Fission Splitting",
            "natures": "Wind, Fire, Earth, Dust, Water, Lightning, Yang",
            "classification": "Non-Person (Mujin) / Sensor / Kage",
            "summary": "Second Tsuchikage of Iwagakure, mentor of Ōnoki and creator of Dust Release (Kekkei Tōta). Known as the 'Non-Person' due to his complete absence of chakra presence and untraceable sensory invisibility.",
            "techniques": [
                  "Dust Release: Detachment of the Primitive World (Jinton)",
                  "Dustless Bewildering Cover (Complete Erasure)",
                  "Fission Technique (Body Cleaving)",
                  "Earth Release: Weighted Boulder Jutsu",
                  "Sensory Eye Perception"
            ],
            "image": "./assets/image/shinobi_mu.png"
      },
      {
            "id": "KG-000002",
            "name": "Gengetsu Hōzuki",
            "kanji": "鬼灯幻月・二代目水影",
            "village": "mist",
            "villageDisplay": "Hidden Mist",
            "clan": "other",
            "clanDisplay": "Hōzuki Clan",
            "rank": "kage",
            "rankDisplay": "Second Mizukage",
            "status": "deceased",
            "specialty": "Steaming Danger Tyranny (Jōki Bōi) / Giant Clam Mirage / Water Gun",
            "natures": "Water, Fire, Lightning, Earth, Wind, Yin, Yang",
            "classification": "Mizukage / Genjutsu & Oil Master",
            "summary": "Charismatic Second Mizukage of Kirigakure and eternal rival of Mū. Mastered infinite explosive steam clones and impenetrable mirages cast through his summoned Giant Clam.",
            "techniques": [
                  "Steaming Danger Tyranny (Jōki Bōi Infinite Explosions)",
                  "Summoning: Giant Clam Mirage",
                  "Water Gun Technique (Mizudeppō)",
                  "Water Drip Finger Bullets",
                  "Hydrification Oil Body (Suika no Jutsu)"
            ],
            "image": "./assets/image/shinobi_gengetsu.png"
      },
      {
            "id": "KM-011226",
            "name": "Darui",
            "kanji": "ダルイ",
            "village": "cloud",
            "villageDisplay": "Hidden Cloud",
            "clan": "other",
            "clanDisplay": "Kumogakure Clan",
            "rank": "kage",
            "rankDisplay": "Fifth Raikage (Former General)",
            "status": "active",
            "specialty": "Storm Release (Ranton) / Black Lightning / Cleaver Kenjutsu",
            "natures": "Water, Lightning, Storm",
            "classification": "Fifth Raikage / Division Commander",
            "summary": "Right-hand man of the Fourth Raikage and later the Fifth Raikage of Kumogakure. Inherited the Third Raikage's sacred Black Lightning and masters laser-guided Storm Release jutsu.",
            "techniques": [
                  "Storm Release: Laser Circus (Ranton: Reizā Sākasu)",
                  "Black Lightning: Panther (Kurohyō)",
                  "Water Release: Water Wall & Lightning Infusion",
                  "Cleaver Sword Flurry",
                  "Gale Palm Deflection"
            ],
            "image": "./assets/image/shinobi_darui.png"
      },
      {
            "id": "KG-010532",
            "name": "Suigetsu Hōzuki",
            "kanji": "鬼灯水月",
            "village": "mist",
            "villageDisplay": "Hidden Mist",
            "clan": "other",
            "clanDisplay": "Hōzuki Clan",
            "rank": "jonin",
            "rankDisplay": "Seven Swordsmen Prodigy (Taka)",
            "status": "active",
            "specialty": "Hydrification Technique (Suika) / Kubikiribōchō Heavy Kenjutsu",
            "natures": "Water, Wind",
            "classification": "Taka Vanguard / Swordsman Prodigy",
            "summary": "Prodigy of the Hōzuki Clan who dreams of collecting all Seven Swords of the Mist. Able to transform his entire body into liquid at will and wield the massive Executioner's Blade with superhuman arm muscles.",
            "techniques": [
                  "Hydrification Technique (Suika no Jutsu)",
                  "Water Release: Great Water Arm Technique",
                  "Executioner's Blade (Kubikiribōchō) Heavy Cleave",
                  "Water Gun: Double Shot (Mizudeppō)",
                  "Water Monster Wave Avatar"
            ],
            "image": "./assets/image/shinobi_suigetsu.png"
      },
      {
            "id": "KN-012890",
            "name": "Karin",
            "kanji": "香燐",
            "village": "other",
            "villageDisplay": "Hidden Grass / Taka",
            "clan": "uzumaki",
            "clanDisplay": "Uzumaki Clan",
            "rank": "jonin",
            "rankDisplay": "Sensory Specialist / Healer (Taka)",
            "status": "active",
            "specialty": "Heal Bite / Mind's Eye of the Kagura / Adamantine Chains",
            "natures": "Water, Earth, Yin, Yang",
            "classification": "Sensor / Uzumaki Survivor / Taka Strategist",
            "summary": "Direct descendant of the Uzumaki Clan possessing immense life force, sensory perception spanning tens of kilometers, and the ancestral Adamantine Attacking Chains capable of smashing wood statues.",
            "techniques": [
                  "Mind's Eye of the Kagura (Kagura Shingan)",
                  "Heal Bite (Cell Regeneration Infusion)",
                  "Adamantine Attacking Chains (Kongō Fūsa)",
                  "Chakra Suppression Cloaking",
                  "Mystic Palm Healing"
            ],
            "image": "./assets/image/shinobi_karin.png"
      },
      {
            "id": "OT-000410",
            "name": "Jūgo",
            "kanji": "重吾",
            "village": "other",
            "villageDisplay": "Clan of Origin / Taka",
            "clan": "other",
            "clanDisplay": "Sage Clan Origin",
            "rank": "jonin",
            "rankDisplay": "Natural Sage Berserker (Taka)",
            "status": "active",
            "specialty": "Sage Transformation / Natural Energy Absorption / Cellular Cannons",
            "natures": "Wind, Lightning, Earth, Water, Yang",
            "classification": "Curse Mark Originator / Taka Shield",
            "summary": "The natural genetic source of Orochimaru's Curse Marks. Constantly absorbs ambient natural energy to reshape his body into lethal armor, cannons, and jet boosters, balancing gentleness with devastating fury.",
            "techniques": [
                  "Sage Transformation: Cellular Armor Morph",
                  "Piston Fist: Style One (Hakai Ken)",
                  "Chakra Blast Cannons (Kasshiken)",
                  "Cellular Regrowth Transference",
                  "Animal Communion & Communication"
            ],
            "image": "./assets/image/shinobi_jugo.png"
      },
      {
            "id": "OT-000105",
            "name": "Kimimaro",
            "kanji": "君麻呂",
            "village": "other",
            "villageDisplay": "Hidden Sound",
            "clan": "other",
            "clanDisplay": "Kaguya Clan",
            "rank": "jonin",
            "rankDisplay": "Leader of Sound Five",
            "status": "deceased",
            "specialty": "Shikotsumyaku (Dead Bone Pulse) / Five Dances of the Bone",
            "natures": "Earth, Wind, Yang",
            "classification": "Kekkei Genkai Elite / Sound Five Leader",
            "summary": "Last survivor of the warlike Kaguya Clan and leader of the Sound Five. Wielded Shikotsumyaku to freely manipulate his skeletal structure, hardening his bones denser than tempered steel in deadly dances.",
            "techniques": [
                  "Dance of the Seedling Fern (Sawarabi no Mai)",
                  "Dance of the Clematis: Vine & Flower Spear",
                  "Dance of the Camellia (Tsubaki no Mai)",
                  "Ten-Finger Drilling Bullets (Teshi Sendan)",
                  "Dance of the Larch (Karamatsu no Mai)"
            ],
            "image": "./assets/image/shinobi_kimimaro.png"
      },
      {
            "id": "KN-000350",
            "name": "Danzō Shimura",
            "kanji": "志村ダンゾウ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Shimura Clan",
            "rank": "kage",
            "rankDisplay": "Sixth Hokage Candidate (Root Founder)",
            "status": "deceased",
            "specialty": "Izanagi / Kotoamatsukami / Wind Release Blade Vacuum",
            "natures": "Wind, Fire, Water, Earth, Wood, Yin",
            "classification": "Root Leader / Darkness of the Shinobi",
            "summary": "Founder of the Foundation (Root) and rival of Hiruzen Sarutobi. Sacrificed moral boundaries to protect Konohagakure from the shadows, grafting Hashirama cells and a dozen Sharingan to cast Izanagi reality rewriting.",
            "techniques": [
                  "Izanagi (Reality Bending Immortality)",
                  "Kotoamatsukami (Shisui's Mangekyō Eye)",
                  "Wind Release: Vacuum Bullets (Fūton: Shinkūgyoku)",
                  "Summoning: Nightmare Baku",
                  "Reverse Four Symbols Sealing Technique"
            ],
            "image": "./assets/image/shinobi_danzo.png"
      },
      {
            "id": "KN-012900",
            "name": "Konohamaru Sarutobi",
            "kanji": "猿飛木ノ葉丸",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "sarutobi",
            "clanDisplay": "Sarutobi Clan",
            "rank": "jonin",
            "rankDisplay": "Elite Jōnin (Team 7 Leader)",
            "status": "active",
            "specialty": "Rasengan / Shadow Clones / Fire Release Ash Pile",
            "natures": "Fire, Wind, Lightning, Yang",
            "classification": "Elite Jōnin / Team 7 Captain",
            "summary": "Grandson of the Third Hokage and foremost disciple of Naruto Uzumaki. Mastered the Rasengan in childhood and defeated a path of Pain, growing to lead Team 7 as Konohagakure's premier elite Jōnin.",
            "techniques": [
                  "Rasengan & Big Ball Rasengan",
                  "Shadow Clone Jutsu (Kage Bunshin)",
                  "Fire Release: Ash Pile Burning (Haisekishō)",
                  "Fire Release: Dragon Fire Jutsu",
                  "Summoning: Monkey King Enra"
            ],
            "image": "./assets/image/shinobi_konohamaru.png"
      },
      {
            "id": "KN-010881",
            "name": "Kurenai Yūhi",
            "kanji": "夕日紅",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Yūhi Clan",
            "rank": "jonin",
            "rankDisplay": "Jōnin / Team 8 Captain",
            "status": "active",
            "specialty": "Demonic Illusion: Tree Binding / Botanical Genjutsu",
            "natures": "Yin",
            "classification": "Genjutsu Specialist / Team 8 Mentor",
            "summary": "Konohagakure's premier genjutsu specialist among Jōnin and captain of Team 8. Masters intricate illusionary bindings that ensnare enemy senses in phantom cherry blossoms and strangling trees.",
            "techniques": [
                  "Demonic Illusion: Tree Binding Death (Jubaku Satsu)",
                  "Flower Petal Escape Mirage",
                  "Demonic Illusion: Mirage Blossom Concealment",
                  "Genjutsu Sensory Disruption",
                  "Hair Camouflage Binding"
            ],
            "image": "./assets/image/shinobi_kurenai.png"
      },
      {
            "id": "IW-011500",
            "name": "Kurotsuchi",
            "kanji": "黒ツチ",
            "village": "stone",
            "villageDisplay": "Hidden Stone",
            "clan": "other",
            "clanDisplay": "Tsuchikage Lineage",
            "rank": "kage",
            "rankDisplay": "Fourth Tsuchikage",
            "status": "active",
            "specialty": "Lava Release (Quicklime) / Earth Fist / Water Trumpet",
            "natures": "Earth, Fire, Water, Lava, Yin",
            "classification": "Fourth Tsuchikage / Bodyguard",
            "summary": "Granddaughter of Ōnoki and Fourth Tsuchikage of Iwagakure. Combines Earth and Water with Lava Release to spray corrosive quicklime and cement, trapping any charging adversary instantaneously.",
            "techniques": [
                  "Lava Release: Quicklime Congealing Technique (Sekkaigyō)",
                  "Water Release: Water Trumpet Burst",
                  "Earth Release: Rising Earth Excavation",
                  "Earth Release: Rock Fist Punch",
                  "Earth Flight Technique"
            ],
            "image": "./assets/image/shinobi_kurotsuchi.png"
      },
      {
            "id": "KG-011050",
            "name": "Chōjūrō",
            "kanji": "長十郎",
            "village": "mist",
            "villageDisplay": "Hidden Mist",
            "clan": "other",
            "clanDisplay": "Kirigakure Clan",
            "rank": "kage",
            "rankDisplay": "Sixth Mizukage",
            "status": "active",
            "specialty": "Twin Sword Hiramekarei / Chakra Hammer & Blade Extensions",
            "natures": "Water",
            "classification": "Sixth Mizukage / Seven Swordsmen",
            "summary": "Last of the original generation Seven Swordsmen of the Mist and Sixth Mizukage. Wields the Twin Blade Hiramekarei, storing and releasing compressed chakra to morph the twin swords into colossal warhammers and long-range energy blades.",
            "techniques": [
                  "Hiramekarei Release (Hiramekarei Kaihō)",
                  "Chakra Twin Hammer Impact",
                  "Hiramekarei Long-Range Light Needles",
                  "Water Release: Great Waterfall Slice",
                  "Twin Fang Kenjutsu Counter"
            ],
            "image": "./assets/image/shinobi_chojuro.png"
      },
      {
            "id": "KN-011850",
            "name": "Iruka Umino",
            "kanji": "うみのイルカ",
            "village": "leaf",
            "villageDisplay": "Hidden Leaf",
            "clan": "other",
            "clanDisplay": "Umino Clan",
            "rank": "chunin",
            "rankDisplay": "Academy Headmaster / Chūnin",
            "status": "active",
            "specialty": "Sealing Barrier Formation / Academy Tactics / Shurikenjutsu",
            "natures": "Fire, Water, Yin",
            "classification": "Academy Headmaster / Konoha Pillar",
            "summary": "Beloved mentor and father figure to Naruto Uzumaki, whose heartfelt acknowledgment saved Naruto from loneliness and hatred. Rose through devotion to become Headmaster of the Ninja Academy.",
            "techniques": [
                  "Sealing Technique: String Light Formation (Hōjin)",
                  "Formations Barrier Tag Array",
                  "Shadow Shuriken Technique",
                  "Water Release: Water Basin Shield",
                  "Academy Shinobi Analysis & Leadership"
            ],
            "image": "./assets/image/shinobi_iruka.png"
      }

    ];

    // DOM Elements
    const searchInput = document.querySelector("#shinobi-search-input");
    const clearSearchBtn = document.querySelector("#search-clear-btn");
    const resetBtn = document.querySelector("#db-reset-btn");
    const emptyResetBtn = document.querySelector("#empty-state-reset-btn");
    const filterButtons = document.querySelectorAll(".db-filter-btn");
    const gridContainer = document.querySelector("#shinobi-grid");
    const emptyState = document.querySelector("#shinobi-empty-state");
    const totalCountEl = document.querySelector("#db-total-count");
    const visibleCountEl = document.querySelector("#db-visible-count");
    const resultsCountNum = document.querySelector("#results-count-num");

    // Modal Elements
    const modalOverlay = document.querySelector("#dossier-modal-overlay");
    const modalContentSlot = document.querySelector("#modal-content-slot");
    const modalCloseBtn = document.querySelector("#modal-close-btn");

    if (totalCountEl) totalCountEl.textContent = SHINOBI_DATABASE_RECORDS.length;

    // Filter State
    const activeFilters = {
      search: "",
      village: "all",
      rank: "all",
      clan: "all",
      status: "all"
    };

    // Render Shinobi Grid
    function renderGrid(records) {
      if (!gridContainer) return;
      gridContainer.innerHTML = "";

      if (records.length === 0) {
        if (emptyState) emptyState.style.display = "block";
        if (visibleCountEl) visibleCountEl.textContent = "0";
        if (resultsCountNum) resultsCountNum.textContent = "0";
        return;
      }

      if (emptyState) emptyState.style.display = "none";
      if (visibleCountEl) visibleCountEl.textContent = records.length;
      if (resultsCountNum) resultsCountNum.textContent = records.length;

      records.forEach((s) => {
        const card = document.createElement("div");
        card.className = "shinobi-card manga-panel";
        card.setAttribute("tabindex", "0");
        card.setAttribute("data-id", s.id);

        const statusClass = s.status === "active" ? "status-active" : "status-deceased";
        const statusText = s.status === "active" ? "ACTIVE // 生存" : "DECEASED // 物故";

        card.innerHTML = `
          <div class="card-portrait-wrap">
            <img class="card-portrait" src="${s.image}" alt="${s.name}" loading="lazy" />
            <div class="card-portrait-gradient"></div>
            <span class="card-id-tag"><i class="fa-solid fa-hashtag"></i> ${s.id}</span>
            <span class="card-status-badge ${statusClass}">
              <i class="fa-solid ${s.status === "active" ? "fa-circle-dot" : "fa-skull"}"></i> ${statusText}
            </span>
          </div>
          <div class="card-body">
            <div class="card-naming">
              <h3 class="card-name">${s.name}</h3>
              <div class="card-kanji">${s.kanji}</div>
            </div>
            <div class="card-meta-tags">
              <span class="c-tag tag-village"><i class="fa-solid fa-mountain-sun"></i> ${s.villageDisplay}</span>
              <span class="c-tag"><i class="fa-solid fa-dna"></i> ${s.clanDisplay}</span>
              <span class="c-tag tag-rank"><i class="fa-solid fa-award"></i> ${s.rankDisplay}</span>
            </div>
            <div class="card-specialty">
              <i class="fa-solid fa-bolt"></i> <span>${s.specialty}</span>
            </div>
            <p class="card-desc">${s.summary}</p>
            <button type="button" class="card-inspect-btn" data-id="${s.id}">
              <i class="fa-solid fa-folder-open"></i> INSPECT DOSSIER
            </button>
          </div>
        `;

        card.addEventListener("click", () => {
          openModal(s.id);
        });

        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(s.id);
          }
        });

        gridContainer.appendChild(card);
      });
    }

    function normalizeText(str) {
      return (str || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }

    // Filter Logic
    function applyFilters() {
      const q = normalizeText(activeFilters.search.trim());

      const filtered = SHINOBI_DATABASE_RECORDS.filter((s) => {
        // Village filter
        if (activeFilters.village !== "all" && s.village !== activeFilters.village) {
          return false;
        }
        // Rank filter
        if (activeFilters.rank !== "all" && s.rank !== activeFilters.rank) {
          return false;
        }
        // Clan filter
        if (activeFilters.clan !== "all" && s.clan !== activeFilters.clan) {
          return false;
        }
        // Status filter
        if (activeFilters.status !== "all" && s.status !== activeFilters.status) {
          return false;
        }
        // Search query filter
        if (q) {
          const matchName = normalizeText(s.name).includes(q);
          const matchKanji = s.kanji.includes(q);
          const matchClan = normalizeText(s.clanDisplay).includes(q);
          const matchVillage = normalizeText(s.villageDisplay).includes(q);
          const matchRank = normalizeText(s.rankDisplay).includes(q);
          const matchSpecialty = normalizeText(s.specialty).includes(q);
          const matchSummary = normalizeText(s.summary).includes(q);
          if (!matchName && !matchKanji && !matchClan && !matchVillage && !matchRank && !matchSpecialty && !matchSummary) {
            return false;
          }
        }
        return true;
      });

      renderGrid(filtered);
    }

    // Modal Display Logic
    function openModal(shinobiId) {
      const shinobi = SHINOBI_DATABASE_RECORDS.find((s) => s.id === shinobiId);
      if (!shinobi || !modalOverlay || !modalContentSlot) return;

      const statusClass = shinobi.status === "active" ? "status-active" : "status-deceased";
      const statusText = shinobi.status === "active" ? "ACTIVE SHINOBI // 生存" : "DECEASED LEGEND // 物故";

      const techniquesHtml = shinobi.techniques
        .map((t) => `<span class="technique-pill"><i class="fa-solid fa-scroll"></i> ${t}</span>`)
        .join("");

      modalContentSlot.innerHTML = `
        <div class="modal-header-layout">
          <div class="modal-portrait-frame">
            <img class="modal-portrait-img" src="${shinobi.image}" alt="${shinobi.name}" />
          </div>
          <div class="modal-header-meta">
            <span class="modal-reg-id"><i class="fa-solid fa-hashtag"></i> ARCHIVE ID: ${shinobi.id}</span>
            <h2 class="modal-shinobi-title">${shinobi.name}</h2>
            <div class="modal-shinobi-kanji">${shinobi.kanji}</div>
            <div class="modal-tags-row">
              <span class="card-status-badge ${statusClass}">
                <i class="fa-solid ${shinobi.status === "active" ? "fa-circle-dot" : "fa-skull"}"></i> ${statusText}
              </span>
              <span class="c-tag tag-village"><i class="fa-solid fa-mountain-sun"></i> ${shinobi.villageDisplay}</span>
              <span class="c-tag"><i class="fa-solid fa-dna"></i> ${shinobi.clanDisplay}</span>
              <span class="c-tag tag-rank"><i class="fa-solid fa-award"></i> ${shinobi.rankDisplay}</span>
            </div>
          </div>
        </div>

        <div class="modal-attribute-grid">
          <div class="attr-card">
            <span class="attr-label">NATURE AFFINITIES</span>
            <span class="attr-value">${shinobi.natures}</span>
          </div>
          <div class="attr-card">
            <span class="attr-label">TACTICAL CLASSIFICATION</span>
            <span class="attr-value">${shinobi.classification}</span>
          </div>
          <div class="attr-card">
            <span class="attr-label">SIGNATURE COMBAT SPECIALTY</span>
            <span class="attr-value">${shinobi.specialty}</span>
          </div>
        </div>

        <div class="modal-section-title">
          <i class="fa-solid fa-book-bookmark"></i> CLASSIFIED INTELLIGENCE DOSSIER
        </div>
        <p class="modal-summary-text">${shinobi.summary}</p>

        <div class="modal-section-title">
          <i class="fa-solid fa-fire"></i> SIGNATURE JUTSU & COMBAT MASTERY
        </div>
        <div class="modal-techniques-list">
          ${techniquesHtml}
        </div>
      `;

      modalOverlay.classList.add("is-open");
      modalOverlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      if (!modalOverlay) return;
      modalOverlay.classList.remove("is-open");
      modalOverlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    // Event Listeners for Search & Filters
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        activeFilters.search = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.classList.toggle("is-visible", activeFilters.search.length > 0);
        }
        applyFilters();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        activeFilters.search = "";
        clearSearchBtn.classList.remove("is-visible");
        applyFilters();
      });
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const parentGroup = btn.closest(".filter-btn-group");
        if (!parentGroup) return;
        const filterType = parentGroup.getAttribute("data-filter-type");
        const val = btn.getAttribute("data-value");

        parentGroup.querySelectorAll(".db-filter-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        activeFilters[filterType] = val;
        applyFilters();
      });
    });

    function resetAllFilters() {
      activeFilters.search = "";
      activeFilters.village = "all";
      activeFilters.rank = "all";
      activeFilters.clan = "all";
      activeFilters.status = "all";

      if (searchInput) searchInput.value = "";
      if (clearSearchBtn) clearSearchBtn.classList.remove("is-visible");

      document.querySelectorAll(".filter-btn-group").forEach((group) => {
        group.querySelectorAll(".db-filter-btn").forEach((btn) => {
          btn.classList.toggle("is-active", btn.getAttribute("data-value") === "all");
        });
      });

      applyFilters();
    }

    if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);
    if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetAllFilters);

    // Modal Close Listeners
    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("is-open")) {
        closeModal();
      }
    });

    // Initial render
    renderGrid(SHINOBI_DATABASE_RECORDS);

    // Auto-open modal if shinobi query parameter is present in URL
    const urlParams = new URLSearchParams(window.location.search);
    const targetShinobiId = urlParams.get("shinobi");
    if (targetShinobiId) {
      openModal(targetShinobiId);
    }
  }

  // ==========================================================================
  // ==========================================================================
  // 9. INTERACTIVE ALLIANCE CONTROLLER (alliance.html)
  // ==========================================================================
  const allianceRoot = document.querySelector("#alliance-main-root");
  if (allianceRoot) {
    const hudLinks = document.querySelectorAll(".hud-link, #faction-nav-hud .hud-link, .faction-sticky-hud-wrapper .hud-link");
    const factionStages = document.querySelectorAll(".faction-stage, .faction-matrix-section");

    // ScrollSpy: Highlight active faction in sticky HUD based on scroll position
    const updateActiveHud = () => {
      if (factionStages.length === 0 || hudLinks.length === 0) return;

      const threshold = window.innerHeight * 0.35;
      let currentSectionId = factionStages[0].getAttribute("id");

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (isBottom) {
        currentSectionId = factionStages[factionStages.length - 1].getAttribute("id");
      } else {
        factionStages.forEach((stage) => {
          const rect = stage.getBoundingClientRect();
          if (rect.top <= threshold) {
            const id = stage.getAttribute("id");
            if (id) currentSectionId = id;
          }
        });
      }

      if (currentSectionId) {
        hudLinks.forEach((link) => {
          const targetHref = link.getAttribute("href");
          if (targetHref === `#${currentSectionId}`) {
            link.classList.add("is-active");
          } else {
            link.classList.remove("is-active");
          }
        });
      }
    };

    window.addEventListener("scroll", updateActiveHud, { passive: true });
    window.addEventListener("resize", updateActiveHud, { passive: true });
    updateActiveHud();

    // Smooth scroll for HUD links
    hudLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            const headerOffset = 90;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });

            hudLinks.forEach((l) => l.classList.remove("is-active"));
            link.classList.add("is-active");
          }
        }
      });
    });

    // GSAP Subtle Faction Stage Animations
    if (hasGSAP && hasScrollTrigger && !isReducedMotion) {
      const isMobileScreen = typeof window !== "undefined" && window.innerWidth <= 768;

      factionStages.forEach((stage) => {
        const headerBar = stage.querySelector(".faction-header-bar, .matrix-header");
        const visualCol = stage.querySelector(".faction-visual-col, .matrix-table-wrap");
        const intelCol = stage.querySelector(".faction-intel-col");

        if (headerBar) {
          gsap.fromTo(
            headerBar,
            { opacity: 0, y: isMobileScreen ? 15 : 30 },
            {
              opacity: 1,
              y: 0,
              duration: isMobileScreen ? 0.7 : 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stage,
                start: isMobileScreen ? "top 88%" : "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        if (visualCol) {
          gsap.fromTo(
            visualCol,
            { opacity: 0, scale: isMobileScreen ? 0.98 : 0.95, y: isMobileScreen ? 20 : 40 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: isMobileScreen ? 0.8 : 1.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stage,
                start: isMobileScreen ? "top 85%" : "top 75%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        if (intelCol) {
          gsap.fromTo(
            intelCol.children,
            { opacity: 0, x: isMobileScreen ? 0 : 25, y: isMobileScreen ? 15 : 0 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              stagger: isMobileScreen ? 0.08 : 0.12,
              duration: isMobileScreen ? 0.7 : 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stage,
                start: isMobileScreen ? "top 85%" : "top 75%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    }
  }

  // ==========================================================================
  // 10. INTERACTIVE BIJUU & JINCHŪRIKI CONTROLLER (village.html)
  // ==========================================================================
  const bijuuHud = document.querySelector("#bijuu-nav-hud");
  const vesselsStage = document.querySelector("#vessels-showcase-stage");

  if (bijuuHud || vesselsStage) {
    const hudLinks = document.querySelectorAll("#bijuu-nav-hud .hud-link");
    const bijuuStages = document.querySelectorAll(".bijuu-stage, #jinchuriki-vessels-section");

    // ScrollSpy: Track active Bijuu stage and highlight corresponding HUD item
    const updateActiveBijuuHud = () => {
      if (bijuuStages.length === 0 || hudLinks.length === 0) return;

      const threshold = window.innerHeight * 0.35;
      let currentSectionId = bijuuStages[0].getAttribute("id");

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (isBottom) {
        currentSectionId = bijuuStages[bijuuStages.length - 1].getAttribute("id");
      } else {
        bijuuStages.forEach((stage) => {
          const rect = stage.getBoundingClientRect();
          if (rect.top <= threshold) {
            const id = stage.getAttribute("id");
            if (id) currentSectionId = id;
          }
        });
      }

      if (currentSectionId) {
        hudLinks.forEach((link) => {
          const targetHref = link.getAttribute("href");
          if (targetHref === `#${currentSectionId}`) {
            link.classList.add("is-active");
          } else {
            link.classList.remove("is-active");
          }
        });
      }
    };

    if (hudLinks.length > 0) {
      window.addEventListener("scroll", updateActiveBijuuHud, { passive: true });
      window.addEventListener("resize", updateActiveBijuuHud, { passive: true });
      updateActiveBijuuHud();
      updateActiveBijuuHud();

      // Collapsible Bijuu HUD Toggle Logic
      const hudToggleBtn = document.querySelector("#bijuu-hud-toggle");
      const hudCloseBtn = document.querySelector("#bijuu-hud-close");

      if (hudToggleBtn && bijuuHud) {
        hudToggleBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          bijuuHud.classList.toggle("is-collapsed");
        });
      }

      if (hudCloseBtn && bijuuHud) {
        hudCloseBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          bijuuHud.classList.add("is-collapsed");
        });
      }

      // Close HUD when clicking outside
      document.addEventListener("click", (e) => {
        if (bijuuHud && !bijuuHud.contains(e.target) && !bijuuHud.classList.contains("is-collapsed")) {
          bijuuHud.classList.add("is-collapsed");
        }
      });

      // Smooth scroll for Bijuu HUD links
      hudLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          const targetId = link.getAttribute("href");
          if (targetId && targetId.startsWith("#")) {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              e.preventDefault();
              const headerOffset = 80;
              const elementPosition = targetEl.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });

              // Auto-collapse HUD on smaller screens after clicking a link
              if (window.innerWidth <= 1200 && bijuuHud) {
                bijuuHud.classList.add("is-collapsed");
              }
            }
          }
        });
      });
    }

    // GSAP ScrollTrigger Animations for Bijuu Sections
    if (hasGSAP && hasScrollTrigger && !isReducedMotion) {
      // Transition section reveal
      const transitionSec = document.querySelector("#bijuu-world-transition");
      if (transitionSec) {
        const transArt = transitionSec.querySelector(".bijuu-transition-backdrop");
        const transBody = transitionSec.querySelector(".bijuu-trans-content");
        if (transArt && transBody) {
          gsap.fromTo(
            transArt,
            { opacity: 0, scale: 0.96 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: transitionSec,
                start: "top 75%",
                toggleActions: "play none none none"
              }
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
              ease: "power2.out",
              scrollTrigger: {
                trigger: transitionSec,
                start: "top 70%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      }

      // Individual Bijuu Stage Animations
      bijuuStages.forEach((stage) => {
        if (!stage.classList.contains("bijuu-stage")) return;

        const headerBar = stage.querySelector(".bijuu-header-bar");
        const visualCol = stage.querySelector(".bijuu-visual-col");
        const intelCol = stage.querySelector(".bijuu-intel-col");

        if (headerBar) {
          gsap.fromTo(
            headerBar,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stage,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        if (visualCol) {
          gsap.fromTo(
            visualCol,
            { opacity: 0, scale: 0.96, y: 35 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stage,
                start: "top 75%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        if (intelCol) {
          gsap.fromTo(
            intelCol.children,
            { opacity: 0, x: 25 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.12,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stage,
                start: "top 75%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    }

    // ======================================================================
    // 10.1 JINCHŪRIKI VESSELS INTERACTIVE GALLERY CONTROLLER
    // ======================================================================
    const JINCHURIKI_GALLERY_DATA = [
      {
        index: "01",
        name: "Gaara",
        kanji: "我愛羅 • 第五代風影",
        title: "Fifth Kazekage // Sand Sovereign",
        village: "SUNAGAKURE",
        bijuuTail: "1-TAIL",
        bijuuName: "SHUKAKU",
        image: "./assets/image/shinobi_gaara.png",
        objectPosition: "center 28%",
        thumbPosition: "center 16%",
        auraClass: "aura-sand",
        summary: "Transformed from an isolated, feared weapon into the revered Fifth Kazekage and Supreme Commander of the Allied Shinobi Forces. Gaara forged a bond of mutual respect with Shukaku during the Fourth Shinobi World War, wielding absolute sand manipulation and impenetrable defense.",
        traits: [
          "Absolute Sand Defense & Shield of Sand",
          "Magnet Release (Jiton) Cursed Sealing",
          "Desert Layered Imperial Funeral"
        ],
        dbId: "SN-015842",
        dbUrl: "./shinobi-database.html?shinobi=SN-015842"
      },
      {
        index: "02",
        name: "Yugito Nii",
        kanji: "二位ユギト • 雲隠れの精鋭",
        title: "Jonin of Kumogakure // Blue Blaze Mistress",
        village: "KUMOGAKURE",
        bijuuTail: "2-TAILS",
        bijuuName: "MATATABI",
        image: "./assets/image/jinchuriki_yugito.png",
        objectPosition: "center 25%",
        thumbPosition: "center 14%",
        auraClass: "aura-blue-flame",
        summary: "A highly disciplined Jonin of Kumogakure who subjected herself to unsparing training to master Matatabi. Able to freely transform into her Tailed Beast form while maintaining full tactical awareness and commanding spectral blue fireballs.",
        traits: [
          "Complete Matatabi Beast-Transformation",
          "Mouse Hairball Spectral Blue Fire",
          "Acrobatic Claw Taijutsu & High Agility"
        ],
        dbId: "KM-010822",
        dbUrl: "./shinobi-database.html?shinobi=KM-010822"
      },
      {
        index: "03",
        name: "Yagura Karatachi",
        kanji: "枸橘やぐら • 第四代水影",
        title: "Fourth Mizukage // Master of Coral & Mirror",
        village: "KIRIGAKURE",
        bijuuTail: "3-TAILS",
        bijuuName: "ISOBU",
        image: "./assets/image/jinchuriki_yagura.png",
        objectPosition: "center 25%",
        thumbPosition: "center 15%",
        auraClass: "aura-coral",
        summary: "One of the extremely rare shinobi in history to achieve absolute symbiosis and control over his Bijuu. He governed Kirigakure during the legendary 'Bloody Mist' epoch, deploying Isobu's armored coral growths and refractive water mirrors.",
        traits: [
          "Water Mirror (Mizu Kagami) Reflection Jutsu",
          "Coral Palm Hardening & Immobilization",
          "Full Perfect Jinchūriki Isobu Control"
        ],
        dbId: "KG-000004",
        dbUrl: "./shinobi-database.html?shinobi=KG-000004"
      },
      {
        index: "04",
        name: "Rōshi",
        kanji: "老紫 • 熔遁の修行僧",
        title: "Ascetic Hermit of Iwa // Lava Sovereign",
        village: "IWAGAKURE",
        bijuuTail: "4-TAILS",
        bijuuName: "SON GOKŪ",
        image: "./assets/image/jinchuriki_roshi.png",
        objectPosition: "center 25%",
        thumbPosition: "center 16%",
        auraClass: "aura-lava",
        summary: "A solitary wandering monk from Iwagakure who spent over four decades traveling the continent to decipher Son Gokū's volcanic nature. Mastered molten rock Lava Release to coat his physical body in lethal blazing magma armor.",
        traits: [
          "Lava Release: Scorching Stream Rocks",
          "Molten Magma Chakra Cloak Armor",
          "Great Blazing Volcano Impact"
        ],
        dbId: "IW-000004",
        dbUrl: "./shinobi-database.html?shinobi=IW-000004"
      },
      {
        index: "05",
        name: "Han",
        kanji: "ハン • 蒸気の巨人",
        title: "Steam Titan of the Mist & Stone",
        village: "IWAGAKURE",
        bijuuTail: "5-TAILS",
        bijuuName: "KOKUŌ",
        image: "./assets/image/jinchuriki_han.png",
        objectPosition: "center 25%",
        thumbPosition: "center 12%",
        auraClass: "aura-steam",
        summary: "A towering warrior encased in specialized furnace steam armor. By channeling Kokuō's boiling Boil Release (Futton) chakra, Han propels his physical attacks with steam propulsion, generating mountain-shattering taijutsu impact force.",
        traits: [
          "Boil Release: Unrivaled Strength Acceleration",
          "Steam Furnace Armor Kinetic Boost",
          "Five-Tails Horned Charge & Battering Ram"
        ],
        dbId: "IW-000005",
        dbUrl: "./shinobi-database.html?shinobi=IW-000005"
      },
      {
        index: "06",
        name: "Utakata",
        kanji: "ウタカタ • 泡沫の抜け忍",
        title: "Rogue Shinobi of Kiri // Bubble Master",
        village: "KIRIGAKURE",
        bijuuTail: "6-TAILS",
        bijuuName: "SAIKEN",
        image: "./assets/image/jinchuriki_utakata.png",
        objectPosition: "center 25%",
        thumbPosition: "center 15%",
        auraClass: "aura-bubble",
        summary: "A tranquil rogue shinobi wandering the lands after a tragic sealing attempt by his former master. Wields a bamboo bubble blower to weaponize Saiken's corrosive alkaline slime into explosive, blinding, and suffocating soap domes.",
        traits: [
          "Bubble Lineage: Drowning Bubble Trap",
          "Corrosive Alkaline Slime Release",
          "Six-Tails Acid Vapor Transformation"
        ],
        dbId: "KG-000006",
        dbUrl: "./shinobi-database.html?shinobi=KG-000006"
      },
      {
        index: "07",
        name: "Fū",
        kanji: "フウ • 滝隠れの飛翔者",
        title: "Kunoichi of the Waterfall // Scale Wings",
        village: "TAKIGAKURE",
        bijuuTail: "7-TAILS",
        bijuuName: "CHŌMEI",
        image: "./assets/image/jinchuriki_fu.png",
        objectPosition: "center 25%",
        thumbPosition: "center 14%",
        auraClass: "aura-chitin",
        summary: "A free-spirited, cheerful kunoichi protected within Takigakure's secret valleys. Utilizing Chōmei's insect wings protruding from her back, Fū flies at blinding velocities while releasing luminous scale powder that disorients and blinds enemies.",
        traits: [
          "Chōmei Six-Wing Aerial Supremacy",
          "Secret Technique: Scale Powder Flash",
          "Cocoon Shield & Insect Armor Barrier"
        ],
        dbId: "TK-000007",
        dbUrl: "./shinobi-database.html?shinobi=TK-000007"
      },
      {
        index: "08",
        name: "Killer B",
        kanji: "キラービー • 雲隠れの英雄",
        title: "Supreme Guardian of Kumo // Eight Swords",
        village: "KUMOGAKURE",
        bijuuTail: "8-TAILS",
        bijuuName: "GYŪKI",
        image: "./assets/image/shinobi_killer_b.png",
        objectPosition: "center 28%",
        thumbPosition: "center 15%",
        auraClass: "aura-ink",
        summary: "Kumogakure's ultimate guardian and beloved adoptive brother of the Fourth Raikage. Achieved perfect, unbreakable unity with Gyūki through mutual respect and shared rhyme, pioneering the Acrobat Eight-Sword style and devastating Tailed Beast Bombs.",
        traits: [
          "Acrobat Seven-Swords & Lightning Flow",
          "Full Perfect Gyūki Symbiosis & Beast Bomb",
          "Double Lariat & Ink Clone Sealing"
        ],
        dbId: "KM-000008",
        dbUrl: "./shinobi-database.html?shinobi=KM-000008"
      },
      {
        index: "09",
        name: "Naruto Uzumaki",
        kanji: "うずまきナルト • 七代目火影",
        title: "Child of Prophecy // Seventh Hokage",
        village: "KONOHAGAKURE",
        bijuuTail: "9-TAILS",
        bijuuName: "KURAMA",
        image: "./assets/image/shinobi_naruto.png",
        objectPosition: "center 25%",
        thumbPosition: "center 16%",
        auraClass: "aura-kurama",
        summary: "Sealed with Kurama on the day of his birth. Overcame ostracization, hatred, and despair through sheer willpower to liberate all Nine Bijuu and become the heroic Seventh Hokage who united the entire Shinobi World in eternal peace.",
        traits: [
          "Kurama Chakra Mode (KCM) & Avatar Manifestation",
          "Six Paths Sage Mode & Super-Tailed Beast Rasenshuriken",
          "Nine-Bijuu Nexus Telepathic Unification"
        ],
        dbId: "KN-012607",
        dbUrl: "./shinobi-database.html?shinobi=KN-012607"
      }
    ];

    if (vesselsStage) {
      const thumbNav = document.querySelector("#vessels-thumbnail-nav");
      const activeImg = document.querySelector("#active-vessel-img");
      const indexBadge = document.querySelector("#active-vessel-idx");
      const curNum = document.querySelector("#vessel-cur-num");
      const stampBijuuNum = document.querySelector("#stamp-bijuu-num");
      const stampBijuuName = document.querySelector("#stamp-bijuu-name");
      const villageTagEl = document.querySelector("#dossier-village-tag");
      const bijuuTagEl = document.querySelector("#dossier-bijuu-tag");
      const nameEl = document.querySelector("#dossier-name");
      const kanjiEl = document.querySelector("#dossier-kanji");
      const titleEl = document.querySelector("#dossier-title");
      const summaryEl = document.querySelector("#dossier-summary");
      const traitsListEl = document.querySelector("#dossier-traits-list");
      const dbLink = document.querySelector("#dossier-db-link");
      const restrictedBadge = document.querySelector("#dossier-restricted-badge");
      const prevBtn = document.querySelector("#vessel-prev-btn");
      const nextBtn = document.querySelector("#vessel-next-btn");

      let currentVesselIdx = 0;
      let isTransitioning = false;

      // Populate 9 interactive thumbnails
      if (thumbNav) {
        thumbNav.innerHTML = "";
        JINCHURIKI_GALLERY_DATA.forEach((item, idx) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `vessel-thumb-btn ${idx === 0 ? "is-active" : ""}`;
          btn.setAttribute("data-index", idx);
          btn.setAttribute("role", "tab");
          btn.setAttribute("aria-selected", idx === 0 ? "true" : "false");
          btn.setAttribute("aria-label", `Record ${item.index}: ${item.name} (${item.bijuuName} Vessel)`);
          btn.innerHTML = `
            <div class="thumb-header-row">
              <span class="thumb-idx">${item.index}</span>
              <span class="thumb-tail-badge">${item.bijuuTail}</span>
            </div>
            <div class="thumb-avatar-frame">
              <img src="${item.image}" alt="${item.name}" class="thumb-avatar-img" style="object-position: ${item.thumbPosition || 'center 16%'};" loading="lazy" />
              <div class="thumb-avatar-shine"></div>
            </div>
            <div class="thumb-name-wrap">
              <span class="thumb-name-label" title="${item.name}">${item.name}</span>
            </div>
          `;

          btn.addEventListener("click", () => {
            setActiveVessel(idx);
          });

          thumbNav.appendChild(btn);
        });
      }

      const setActiveVessel = (newIndex) => {
        if (newIndex < 0 || newIndex >= JINCHURIKI_GALLERY_DATA.length) return;

        const data = JINCHURIKI_GALLERY_DATA[newIndex];
        currentVesselIdx = newIndex;

        // Update Thumbnails active state without touching the window vertical scroll
        const allThumbs = thumbNav ? thumbNav.querySelectorAll(".vessel-thumb-btn") : [];
        allThumbs.forEach((thumb, i) => {
          if (i === newIndex) {
            thumb.classList.add("is-active");
            thumb.setAttribute("aria-selected", "true");
            // Only scroll the horizontal strip container if overflowing, with 0 vertical page jump
            if (thumbNav && thumbNav.scrollWidth > thumbNav.clientWidth) {
              const targetLeft = thumb.offsetLeft - (thumbNav.clientWidth / 2) + (thumb.clientWidth / 2);
              thumbNav.scrollTo({ left: targetLeft, behavior: "smooth" });
            }
          } else {
            thumb.classList.remove("is-active");
            thumb.setAttribute("aria-selected", "false");
          }
        });

        // Apply data immediately
        applyVesselData(data);

        // GSAP Cinematic In Transition
        if (hasGSAP && !isReducedMotion) {
          gsap.killTweensOf(["#active-vessel-img", "#vessel-dossier-column", "#vessel-bound-stamp"]);

          gsap.fromTo(
            "#active-vessel-img",
            { opacity: 0.25, scale: 1.04, y: 8 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );

          gsap.fromTo(
            "#vessel-dossier-column",
            { opacity: 0.25, y: 10 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
          );

          gsap.fromTo(
            "#vessel-bound-stamp",
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.4)" }
          );
        }
      };

      const applyVesselData = (data) => {
        // Main active image
        if (activeImg) {
          activeImg.src = data.image;
          activeImg.alt = `${data.name} - Jinchūriki of ${data.bijuuName}`;
          activeImg.style.objectPosition = data.objectPosition || "center 25%";
        }

        // Ambient aura
        const auraEl = document.querySelector("#vessel-ambient-aura");
        if (auraEl) {
          auraEl.className = `vessel-ambient-aura ${data.auraClass}`;
        }

        // Indices
        if (indexBadge) indexBadge.textContent = data.index;
        if (curNum) curNum.textContent = data.index;

        // Bound Bijuu Stamp
        if (stampBijuuNum) stampBijuuNum.textContent = data.bijuuTail;
        if (stampBijuuName) stampBijuuName.textContent = data.bijuuName;

        // Tags & Headers
        if (villageTagEl) {
          villageTagEl.innerHTML = `<i class="fa-solid fa-landmark"></i> ${data.village}`;
        }
        if (bijuuTagEl) {
          bijuuTagEl.innerHTML = `<i class="fa-solid fa-fire"></i> BOUND TO ${data.bijuuTail}`;
        }

        // Dossier Main Content
        if (nameEl) nameEl.textContent = data.name;
        if (kanjiEl) kanjiEl.textContent = data.kanji;
        if (titleEl) titleEl.textContent = data.title;
        if (summaryEl) summaryEl.textContent = data.summary;

        // Traits
        if (traitsListEl) {
          traitsListEl.innerHTML = data.traits
            .map(
              (trait) => `
              <div class="v-trait-item">
                <i class="fa-solid fa-circle-check"></i> ${trait}
              </div>
            `
            )
            .join("");
        }

        // Database link vs Restricted badge
        if (data.dbUrl && data.dbId) {
          if (dbLink) {
            dbLink.href = data.dbUrl;
            dbLink.style.display = "inline-flex";
          }
          if (restrictedBadge) {
            restrictedBadge.style.display = "none";
          }
        } else {
          if (dbLink) {
            dbLink.style.display = "none";
          }
          if (restrictedBadge) {
            restrictedBadge.style.display = "inline-flex";
          }
        }
      };

      // Prev & Next Buttons
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          const nextIdx = (currentVesselIdx - 1 + JINCHURIKI_GALLERY_DATA.length) % JINCHURIKI_GALLERY_DATA.length;
          setActiveVessel(nextIdx);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          const nextIdx = (currentVesselIdx + 1) % JINCHURIKI_GALLERY_DATA.length;
          setActiveVessel(nextIdx);
        });
      }

      // Keyboard Arrow Navigation (when vessels section is visible in viewport)
      window.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

        const rect = vesselsStage.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (!isVisible) return;

        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") return;

        if (e.key === "ArrowLeft") {
          e.preventDefault();
          const nextIdx = (currentVesselIdx - 1 + JINCHURIKI_GALLERY_DATA.length) % JINCHURIKI_GALLERY_DATA.length;
          setActiveVessel(nextIdx);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          const nextIdx = (currentVesselIdx + 1) % JINCHURIKI_GALLERY_DATA.length;
          setActiveVessel(nextIdx);
        }
      });

      // Section Entrance ScrollTrigger Animation
      if (hasGSAP && hasScrollTrigger && !isReducedMotion) {
        gsap.fromTo(
          vesselsStage,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#jinchuriki-vessels-section",
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }
  }
});




