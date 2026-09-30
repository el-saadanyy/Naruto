import React, { useState, useEffect, useRef } from 'react';
import { BIJUU_NAV_LINKS } from './bijuuData';

function BijuuStickyHud() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState('bijuu-shukaku');
  const hudRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const stageIds = BIJUU_NAV_LINKS.map((l) => l.id);
      const sections = stageIds
        .map((id) => document.getElementById(id))
        .filter((el) => el !== null);

      if (sections.length === 0) return;

      const threshold = window.innerHeight * 0.35;
      let currentActiveId = sections[0].id;

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (isBottom) {
        currentActiveId = sections[sections.length - 1].id;
      } else {
        for (let i = 0; i < sections.length; i++) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.top <= threshold) {
            currentActiveId = sections[i].id;
          }
        }
      }

      setActiveSection((prev) => (prev !== currentActiveId ? currentActiveId : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (hudRef.current && !hudRef.current.contains(e.target) && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isCollapsed]);

  const scrollToStage = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      if (window.innerWidth <= 1200) {
        setIsCollapsed(true);
      }
    }
  };

  return (
    <aside
      className={`bijuu-sticky-hud ${isCollapsed ? 'is-collapsed' : ''}`}
      id="bijuu-nav-hud"
      aria-label="Bijuu Navigation Index"
      ref={hudRef}
    >
      {/* Outer Toggle Trigger Tab */}
      <button
        type="button"
        className="hud-toggle-tab"
        id="bijuu-hud-toggle"
        aria-label="Toggle Tailed Beasts Navigation Menu"
        title="Toggle Tailed Beasts Index"
        onClick={(e) => {
          e.stopPropagation();
          setIsCollapsed((prev) => !prev);
        }}
      >
        <i className="fa-solid fa-fire-flame-curved hud-tab-icon"></i>
        <span className="hud-tab-label">TAILED BEASTS</span>
        <i className="fa-solid fa-chevron-left hud-tab-arrow"></i>
      </button>

      <div className="hud-inner">
        <div className="hud-header">
          <div className="hud-header-info">
            <span className="hud-dot"></span>
            <span className="hud-title">TAILED BEASTS // 尾獣</span>
          </div>
          <button
            type="button"
            className="hud-close-btn"
            id="bijuu-hud-close"
            aria-label="Close Tailed Beasts Menu"
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(true);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <nav className="hud-links">
          {BIJUU_NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`hud-link ${activeSection === link.id ? 'is-active' : ''} ${
                link.isVessel ? 'hud-vessels-link' : ''
              }`}
              onClick={(e) => scrollToStage(e, link.id)}
            >
              <span className="h-num">
                {link.icon ? <i className={link.icon}></i> : link.num}
              </span>
              <span className="h-name">{link.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default BijuuStickyHud;
