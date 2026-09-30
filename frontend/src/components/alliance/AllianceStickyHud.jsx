import React, { useEffect, useState, useRef } from 'react';

const HUD_ITEMS = [
  { id: 'faction-allied-forces', num: '01', name: 'ALLIED FORCES' },
  { id: 'faction-akatsuki', num: '02', name: 'AKATSUKI' },
  { id: 'faction-kara', num: '03', name: 'KARA' },
  { id: 'faction-konoha-suna', num: '04', name: 'KONOHA × SUNA' },
  { id: 'faction-taka', num: '05', name: 'TAKA / HEBI' },
  { id: 'faction-seven-swordsmen', num: '06', name: 'SEVEN SWORDS' },
  {
    id: 'faction-comparative-matrix',
    num: <i className="fa-solid fa-chart-simple"></i>,
    name: 'COMPARATIVE INDEX',
    isMatrix: true,
  },
];

function AllianceStickyHud() {
  const [activeId, setActiveId] = useState('faction-allied-forces');
  const [isOpen, setIsOpen] = useState(false);
  const hudRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const targetIds = HUD_ITEMS.map((item) => item.id);
      const sections = targetIds
        .map((id) => document.getElementById(id))
        .filter((el) => el !== null);

      if (sections.length === 0) return;

      const threshold = window.innerHeight * 0.35;
      let currentActiveId = sections[0].id;

      // Check if at the bottom of the page
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

      setActiveId((prev) => (prev !== currentActiveId ? currentActiveId : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Click outside listener to collapse menu gracefully
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hudRef.current && !hudRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setActiveId(targetId);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const headerOffset = 90;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // On smaller screens, close after selecting a section
      if (window.innerWidth <= 992) {
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <style>{`
        .faction-sticky-hud-wrapper {
          position: fixed;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 950;
          pointer-events: auto;
          font-family: var(--font-accent, "Varsity Team", sans-serif);
        }

        /* Collapsed Trigger Button */
        .hud-toggle-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(10, 10, 10, 0.88);
          border: 1px solid rgba(197, 160, 89, 0.4);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 30px;
          padding: 10px 18px;
          color: var(--secondary-gold, #c5a059);
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 16px rgba(153, 27, 27, 0.3);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
          outline: none;
        }

        .hud-toggle-trigger:hover,
        .hud-toggle-trigger:focus-visible {
          background: rgba(18, 18, 18, 0.95);
          border-color: var(--secondary-gold-bright, #e5c07b);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.85), 0 0 22px rgba(220, 38, 38, 0.5);
          transform: translateX(-4px);
        }

        .hud-toggle-trigger .hud-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary-crimson-bright, #dc2626);
          box-shadow: 0 0 8px var(--primary-crimson-bright, #dc2626);
          animation: pulseAura 2s infinite ease-in-out;
        }

        .hud-toggle-trigger .hud-toggle-text {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--secondary-gold, #c5a059);
          white-space: nowrap;
        }

        .hud-toggle-trigger .hud-toggle-icon {
          font-size: 0.75rem;
          color: var(--text-cream, #f5f0eb);
          opacity: 0.8;
          transition: transform 0.3s ease;
        }

        /* Expanded HUD Menu Panel */
        .hud-collapsible-panel {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%) scale(0.95);
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: right center;
        }

        .hud-collapsible-panel.is-open {
          opacity: 1;
          pointer-events: auto;
          visibility: visible;
          transform: translateY(-50%) scale(1);
        }

        .hud-collapsible-panel .hud-inner {
          background: rgba(10, 10, 10, 0.92);
          border: 1px solid rgba(197, 160, 89, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 16px 14px;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(153, 27, 27, 0.35);
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 210px;
        }

        .hud-collapsible-panel .hud-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          user-select: none;
        }

        .hud-collapsible-panel .hud-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hud-collapsible-panel .hud-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary-crimson-bright, #dc2626);
          box-shadow: 0 0 8px var(--primary-crimson-bright, #dc2626);
          animation: pulseAura 2s infinite ease-in-out;
        }

        .hud-collapsible-panel .hud-title {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--secondary-gold, #c5a059);
          text-transform: uppercase;
        }

        .hud-collapsible-panel .hud-close-btn {
          background: transparent;
          border: none;
          color: rgba(245, 240, 235, 0.6);
          font-size: 0.78rem;
          cursor: pointer;
          padding: 2px 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hud-collapsible-panel .hud-close-btn:hover {
          color: #fff;
          background: rgba(153, 27, 27, 0.3);
        }

        .hud-collapsible-panel .hud-links {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .hud-collapsible-panel .hud-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: rgba(245, 240, 235, 0.6);
          border: 1px solid transparent;
          transition: all 0.25s ease;
          white-space: nowrap;
          text-decoration: none;
        }

        .hud-collapsible-panel .hud-link .h-num {
          color: var(--secondary-gold, #c5a059);
          font-weight: 800;
          font-size: 0.76rem;
        }

        .hud-collapsible-panel .hud-link:hover {
          color: #fff;
          background: rgba(153, 27, 27, 0.25);
          border-color: rgba(197, 160, 89, 0.4);
          transform: translateX(-4px);
        }

        .hud-collapsible-panel .hud-link.is-active {
          color: #fff;
          background: linear-gradient(90deg, rgba(153, 27, 27, 0.6) 0%, rgba(197, 160, 89, 0.2) 100%);
          border-color: var(--secondary-gold-bright, #e5c07b);
          box-shadow: 0 0 12px rgba(220, 38, 38, 0.4);
        }

        .hud-collapsible-panel .hud-matrix-link {
          margin-top: 4px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 8px;
        }

        /* Mobile & Tablet Adjustments */
        @media (max-width: 992px) {
          .faction-sticky-hud-wrapper {
            right: 14px;
            top: auto;
            bottom: 20px;
            transform: none;
          }

          .hud-toggle-trigger {
            padding: 8px 14px;
            border-radius: 24px;
          }

          .hud-toggle-trigger .hud-toggle-text {
            font-size: 0.7rem;
            letter-spacing: 1px;
          }

          .hud-collapsible-panel {
            right: 0;
            top: auto;
            bottom: 0;
            transform: translateY(8px) scale(0.96);
            transform-origin: right bottom;
            max-width: calc(100vw - 28px);
          }

          .hud-collapsible-panel.is-open {
            transform: translateY(0) scale(1);
          }

          .hud-collapsible-panel .hud-inner {
            max-height: 72vh;
            overflow-y: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding: 14px 12px;
            gap: 10px;
          }

          .hud-collapsible-panel .hud-inner::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }
        }
      `}</style>

      <aside
        className="faction-sticky-hud-wrapper"
        id="faction-nav-hud"
        ref={hudRef}
        aria-label="Faction Quick Navigation Index"
      >
        {!isOpen && (
          <button
            type="button"
            className="hud-toggle-trigger"
            onClick={() => setIsOpen(true)}
            aria-expanded={false}
            aria-controls="hud-collapsible-menu"
            title="Open Power Index Menu"
          >
            <span className="hud-dot" aria-hidden="true"></span>
            <span className="hud-toggle-text">POWER INDEX</span>
            <i className="fa-solid fa-chevron-left hud-toggle-icon" aria-hidden="true"></i>
          </button>
        )}

        {isOpen && (
          <div
            id="hud-collapsible-menu"
            className="hud-collapsible-panel is-open"
            aria-hidden={false}
          >
            <div className="hud-inner">
              <div
                className="hud-header"
                onClick={() => setIsOpen(false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsOpen(false)}
                title="Click to collapse Power Index"
              >
                <div className="hud-header-left">
                  <span className="hud-dot" aria-hidden="true"></span>
                  <span className="hud-title">POWER INDEX // 勢力</span>
                </div>
                <button
                  type="button"
                  className="hud-close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  aria-label="Close Power Index menu"
                >
                  <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </button>
              </div>

              <nav className="hud-links">
                {HUD_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`hud-link ${activeId === item.id ? 'is-active' : ''} ${
                      item.isMatrix ? 'hud-matrix-link' : ''
                    }`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                  >
                    <span className="h-num">{item.num}</span>
                    <span className="h-name">{item.name}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export default AllianceStickyHud;
