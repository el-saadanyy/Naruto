import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function MentorsSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReducedMotion) return;

      const mentorGrid = containerRef.current?.querySelector('.mentor-archive-grid');
      if (mentorGrid) {
        gsap.fromTo(
          mentorGrid.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section id="mentors" className="mentors-section main4" ref={containerRef}>
      <div className="section-tag" style={{ textAlign: 'center', marginBottom: '8px' }}>
        <i className="fa-solid fa-users-viewfinder"></i> SHINOBI MENTOR ARCHIVE • 師弟の絆
      </div>
      <div className="galary-title">The Masters Who Shaped The Legend</div>
      <div className="mentor-archive-grid">
        {/* Featured Master (Jiraiya) */}
        <div className="featured-mentor-card manga-panel">
          <img src="/assets/image/jiraya.jpg" alt="Jiraiya Sensei" />
          <div className="featured-mentor-overlay">
            <span className="role-badge">
              <i className="fa-solid fa-stamp"></i> SANNIN MASTER • 伝説の三忍{' '}
              <span className="ninja-id">[REG. 002300]</span>
            </span>
            <nav>Jiraiya Sensei</nav>
            <p className="P_test">
              The Legendary Sannin who shaped Naruto’s philosophy, taught him the Rasengan, guided
              him in harnessing the Nine-Tails, and passed on the dream of peace.
            </p>
          </div>
        </div>

        {/* Supporting Profiles Column */}
        <div className="supporting-mentors-column">
          <div className="supporting-mentor-item manga-panel">
            <img src="/assets/image/kakashi2.jpg" alt="Kakashi Hatake Sensei" />
            <div className="supporting-mentor-info">
              <span className="role-badge">
                TEAM 7 JŌNIN • 写輪眼のカカシ <span className="ninja-id">[REG. 009720]</span>
              </span>
              <nav>Kakashi Sensei</nav>
              <p className="P_test">The mentor who stood by Naruto and taught him teamwork.</p>
            </div>
          </div>

          <div className="supporting-mentor-item manga-panel">
            <img src="/assets/image/Iruka.jpeg" alt="Iruka Umino Sensei" />
            <div className="supporting-mentor-info">
              <span className="role-badge">
                FIRST BOND • 初代の恩師 <span className="ninja-id">[REG. 011850]</span>
              </span>
              <nav>Iruka Sensei</nav>
              <p className="P_test">The first person in Konoha who recognized Naruto’s humanity.</p>
            </div>
          </div>

          <div className="supporting-mentor-item manga-panel">
            <img src="/assets/image/Fucasaku.jpg" alt="Fukasaku Sage Master" />
            <div className="supporting-mentor-info">
              <span className="role-badge">MYŌBOKUZAN SAGE • 妙木山の大仙人</span>
              <nav>Fukasaku Sensei</nav>
              <p className="P_test">Guided Naruto through Mount Myōboku's Senjutsu discipline.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MentorsSection;
