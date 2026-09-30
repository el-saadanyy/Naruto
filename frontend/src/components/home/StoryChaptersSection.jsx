import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function StoryChaptersSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) return;

      // Chapter 01: ORIGIN
      const chOrigin = containerRef.current?.querySelector('.chapter-origin');
      if (chOrigin) {
        const bleedNum = chOrigin.querySelector('.chapter-bleed-num');
        const img = chOrigin.querySelector('.portrait-frame img');

        const tl01 = gsap.timeline({
          scrollTrigger: {
            trigger: chOrigin,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl01.fromTo(
          chOrigin,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }
        );

        if (bleedNum) {
          gsap.to(bleedNum, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: chOrigin,
              start: 'top 90%',
              end: 'bottom top',
              scrub: 0.6,
            },
          });
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: chOrigin,
                start: 'top 90%',
                end: 'bottom 30%',
                scrub: 0.4,
              },
            }
          );
        }
      }

      // Chapter 02: ASCENSION
      const chAscension = containerRef.current?.querySelector('.chapter-ascension');
      if (chAscension) {
        const numBg = chAscension.querySelector('.chapter-num-bg');
        const img = chAscension.querySelector('.dynamic-image-wrap img');

        const tl02 = gsap.timeline({
          scrollTrigger: {
            trigger: chAscension,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl02.fromTo(
          chAscension,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }
        );

        if (numBg) {
          gsap.to(numBg, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: chAscension,
              start: 'top 90%',
              end: 'bottom top',
              scrub: 0.6,
            },
          });
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: chAscension,
                start: 'top 90%',
                end: 'bottom 30%',
                scrub: 0.4,
              },
            }
          );
        }
      }

      // Chapter 03: CLIMAX
      const chClimax = containerRef.current?.querySelector('.chapter-climax');
      if (chClimax) {
        const bgImg = chClimax.querySelector('.climax-bg-img');

        const tl03 = gsap.timeline({
          scrollTrigger: {
            trigger: chClimax,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl03.fromTo(
          chClimax,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }
        );

        if (bgImg) {
          gsap.fromTo(
            bgImg,
            { scale: 1.12 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: chClimax,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          );
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <main id="story" className="story-container" ref={containerRef}>
      <div className="section-header">
        <span className="section-tag">
          <i className="fa-solid fa-scroll"></i> LEGENDARY CHRONICLES • 伝説の年代記
        </span>
        <h2 className="section-heading">THE JOURNEY OF A SHINOBI</h2>
      </div>

      {/* Chapter 01: ORIGIN (Open Editorial Asymmetry) */}
      <section className="chapter-origin">
        <div className="chapter-bleed-num">01</div>
        <div className="story-text">
          <span className="chapter-badge-origin">
            <i className="fa-solid fa-fire"></i> CHAPTER 01 • ORIGIN{' '}
            <span className="ch-kanji">【起】孤独と宿命</span>
          </span>
          <h2>The Jinchūriki Boy</h2>
          <p>
            Naruto’s childhood was marked by a deep and haunting darkness. Isolated from the very
            moment he could walk, he grew up surrounded by cold stares and whispered hatred from the
            villagers who feared the Nine-Tails sealed within him. He never knew the warmth of a
            family or the comfort of being understood; instead, he wandered through empty streets and
            silent nights, questioning why he existed at all. The loneliness carved itself into his
            heart, turning every day into a quiet battle against despair. Yet, beneath that darkness,
            a stubborn spark remained—one that refused to let the world break him.
          </p>
          <p>
            Growing up as an orphan in the Hidden Leaf Village, he had no parents to guide him, no
            warm voice to comfort him, and no family to return to at the end of the day. What made it
            worse was that the villagers avoided him, whispering behind his back and treating him
            like an outcast because of the Nine-Tails sealed inside him. Naruto spent his early years
            longing for even a small piece of affection — a smile, a friend, someone who would see him
            as more than a monster. This constant isolation shaped his heart, filling it with both
            sadness and an unbreakable determination to prove his worth to the world.
          </p>
        </div>
        <div className="portrait-frame manga-panel">
          <img src="/assets/image/main5.jpg" alt="Naruto's lonely childhood in Konoha" />
        </div>
      </section>

      {/* Chapter 02: ASCENSION (Dynamic Image-Left Layout) */}
      <section className="chapter-ascension">
        <div className="chapter-num-bg">02</div>
        <div className="dynamic-image-wrap manga-panel">
          <img src="/assets/image/main9.jpg" alt="Sage Mode Naruto confronting Pain" />
        </div>
        <div className="story-text">
          <span className="chapter-badge-ascension">
            <i className="fa-solid fa-bolt"></i> CHAPTER 02 • ASCENSION{' '}
            <span className="ch-kanji">【承】師弟と継承</span>
          </span>
          <h2>The Hidden Leaf’s Chosen Savior</h2>
          <p>
            As Naruto grew older, he threw himself into intense training, determined to prove his
            worth. He spent years mastering various ninja techniques—from the Shadow Clone Jutsu to
            the Rasengan—and each skill he learned pushed him to become stronger. Over time, his power
            and confidence grew, and people started to see that he was far more than the
            troublemaking kid they once knew. His relentless training and unbreakable spirit gave him
            an important role in every major battle, until he eventually became the strongest ninja in
            Konoha and its true savior in times of danger.
          </p>
          <p>
            Naruto faced the greatest threat ever to strike the Hidden Leaf when Pain launched his
            devastating attack. Despite the destruction and the fear that spread through the village,
            Naruto stood firm as Konoha’s final hope. Through courage, growth, and unshakable
            determination, he confronted Pain head-on and ultimately defeated him, ending the terror
            and saving the entire village from complete annihilation.
          </p>
        </div>
      </section>

      {/* Chapter 03: CLIMAX (Monumental Full-Width Experience) */}
      <section className="chapter-climax manga-panel">
        <img
          className="climax-bg-img"
          src="/assets/image/main7.jpg"
          alt="Seventh Hokage Naruto Uzumaki"
        />
        <div className="climax-overlay">
          <span className="chapter-badge-climax">
            <i className="fa-solid fa-crown"></i> CHAPTER 03 • PINNACLE{' '}
            <span className="ch-kanji">【結】火の意志と英雄</span>
          </span>
          <h2>The Child Who Became a Hokage</h2>
          <div className="climax-text-grid">
            <p>
              Through countless battles and unwavering dedication, Naruto rose from being an outcast
              to becoming the strongest shinobi in the Hidden Leaf. His perseverance and unbreakable
              spirit led him to fulfill his lifelong ambition of becoming Hokage, the trusted leader
              who guides and protects the village.
            </p>
            <p>
              Naruto’s rise didn’t stop at becoming Hokage — he became an icon and a true legend of
              the Hidden Leaf. His strength, leadership, and unwavering resolve were the turning
              point in the Fourth Great Ninja War, making him one of the main reasons the shinobi
              world was saved and peace was restored.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default StoryChaptersSection;
