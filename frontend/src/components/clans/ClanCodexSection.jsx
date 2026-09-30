import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { CLAN_AURAS, NOBLE_CLANS_DATA } from './clanData.js';

gsap.registerPlugin(ScrollTrigger);

function ClanCodexSection() {
  const { isFavorited, toggleFavorite } = useFavorites();
  const [activeClan, setActiveClan] = useState('uchiha');
  const codexRef = useRef(null);
  const activeClanRef = useRef(activeClan);
  activeClanRef.current = activeClan;

  const handleSelectClan = (clanKey) => {
    setActiveClan(clanKey);
  };

  const handleKeyDown = (e, index) => {
    let targetIndex = -1;
    if (e.key === 'ArrowRight') {
      targetIndex = (index + 1) % NOBLE_CLANS_DATA.length;
    } else if (e.key === 'ArrowLeft') {
      targetIndex = (index - 1 + NOBLE_CLANS_DATA.length) % NOBLE_CLANS_DATA.length;
    } else if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = NOBLE_CLANS_DATA.length - 1;
    }
    if (targetIndex !== -1) {
      e.preventDefault();
      setActiveClan(NOBLE_CLANS_DATA[targetIndex].key);
    }
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 993px)', () => {
        ScrollTrigger.create({
          trigger: codexRef.current,
          start: 'top top',
          end: '+=320%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            let nextClan = 'uchiha';
            if (p < 0.18) {
              nextClan = 'uchiha';
            } else if (p < 0.36) {
              nextClan = 'senju';
            } else if (p < 0.54) {
              nextClan = 'hyuga';
            } else if (p < 0.72) {
              nextClan = 'uzumaki';
            } else if (p < 0.88) {
              nextClan = 'nara';
            } else {
              nextClan = 'sarutobi';
            }

            if (nextClan !== activeClanRef.current) {
              setActiveClan(nextClan);
            }
          },
        });
      });

      return () => mm.revert();
    },
    { scope: codexRef }
  );

  return (
    <section id="clan-codex" className="clan-codex-section" ref={codexRef}>
      <div className="clan-ambient-backdrop">
        <div
          className="clan-radial-aura"
          style={{ background: CLAN_AURAS[activeClan] || CLAN_AURAS.uchiha }}
        ></div>
        <div className="clan-grid-overlay"></div>
      </div>

      <div className="clan-stage-wrapper">
        <div className="clan-stage-container">
          {/* LEFT COLUMN: Clan Identity & Animated Vector Crest Mon */}
          <div className="clan-identity-column">
            {/* Tactical HUD Status */}
            <div className="clan-hud-status">
              <span className="clan-radar-blip"></span>
              <span className="clan-hud-label">ANCESTRAL CODEX // 6 NOBLE CLANS</span>
            </div>

            {/* Quick Clan Selector Navigation Buttons */}
            <div className="clan-location-nav" role="tablist" aria-label="Noble Shinobi Clans">
              {NOBLE_CLANS_DATA.map((clan, idx) => {
                const isActive = activeClan === clan.key;
                return (
                  <button
                    key={clan.key}
                    type="button"
                    className={`clan-nav-btn ${isActive ? 'is-active' : ''}`}
                    data-clan={clan.key}
                    role="tab"
                    aria-selected={isActive ? 'true' : 'false'}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleSelectClan(clan.key)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  >
                    <span className={`clan-btn-dot ${clan.dotClass}`}></span>
                    <span className="btn-text">{clan.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Vector Clan Crest Display Arena */}
            <div className="clan-crest-arena">
              <div className="crest-aura-ring"></div>

              {/* SVG Crest Vectors for the 6 Noble Clans */}
              <div className="clan-crest-deck">
                {/* Crest 01: Uchiha Clan Fan / Sharingan Mon */}
                <div
                  className={`clan-crest-item crest-uchiha ${activeClan === 'uchiha' ? 'is-active' : ''}`}
                  data-clan="uchiha"
                >
                  <svg
                    className="clan-svg-mon"
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Uchiha Clan Crest"
                  >
                    <circle
                      cx="150"
                      cy="150"
                      r="140"
                      stroke="rgba(226, 90, 42, 0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="115"
                      stroke="rgba(226, 90, 42, 0.5)"
                      strokeWidth="2"
                    />
                    <path
                      d="M 150 45 C 95 45 50 90 50 145 C 50 185 80 215 125 225 L 125 255 L 175 255 L 175 225 C 220 215 250 185 250 145 C 250 90 205 45 150 45 Z"
                      fill="#991b1b"
                      stroke="#dc2626"
                      strokeWidth="3"
                    />
                    <path
                      d="M 50 145 C 50 185 80 215 125 225 L 125 255 L 175 255 L 175 225 C 220 215 250 185 250 145 Z"
                      fill="#f5f0eb"
                    />
                    <line x1="150" y1="145" x2="150" y2="255" stroke="#991b1b" strokeWidth="4" />
                  </svg>
                  <div className="crest-caption">
                    <span className="crest-badge badge-crimson">
                      <i className="fa-solid fa-eye"></i> DŌJUTSU • SHARINGAN
                    </span>
                    <div className="crest-kanji">うちは一族 • 炎の血統</div>
                  </div>
                </div>

                {/* Crest 02: Senju Clan Mon */}
                <div
                  className={`clan-crest-item crest-senju ${activeClan === 'senju' ? 'is-active' : ''}`}
                  data-clan="senju"
                >
                  <svg
                    className="clan-svg-mon"
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Senju Clan Crest"
                  >
                    <circle
                      cx="150"
                      cy="150"
                      r="140"
                      stroke="rgba(52, 211, 153, 0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="115"
                      stroke="rgba(52, 211, 153, 0.5)"
                      strokeWidth="2"
                    />
                    <rect
                      x="138"
                      y="50"
                      width="24"
                      height="200"
                      rx="4"
                      fill="#059669"
                      stroke="#34d399"
                      strokeWidth="2"
                    />
                    <circle cx="150" cy="150" r="45" fill="none" stroke="#f5f0eb" strokeWidth="3" />
                    <path
                      d="M 70 150 L 230 150 M 95 95 L 205 205 M 95 205 L 205 95"
                      stroke="#34d399"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="crest-caption">
                    <span className="crest-badge badge-forest">
                      <i className="fa-solid fa-tree"></i> KEKKEI GENKAI • WOOD RELEASE
                    </span>
                    <div className="crest-kanji">千手一族 • 森の意志</div>
                  </div>
                </div>

                {/* Crest 03: Hyūga Clan Mon */}
                <div
                  className={`clan-crest-item crest-hyuga ${activeClan === 'hyuga' ? 'is-active' : ''}`}
                  data-clan="hyuga"
                >
                  <svg
                    className="clan-svg-mon"
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Hyūga Clan Crest"
                  >
                    <circle
                      cx="150"
                      cy="150"
                      r="140"
                      stroke="rgba(197, 160, 89, 0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="115"
                      stroke="rgba(197, 160, 89, 0.5)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="65"
                      fill="rgba(245, 240, 235, 0.08)"
                      stroke="#e5c07b"
                      strokeWidth="3"
                    />
                    <path
                      d="M 150 90 C 130 120 120 140 120 160 C 120 180 135 195 150 195 C 165 195 180 180 180 160 C 180 140 170 120 150 90 Z"
                      fill="#e5c07b"
                    />
                    <circle cx="150" cy="150" r="18" fill="#0e0e0e" stroke="#fff" strokeWidth="2" />
                  </svg>
                  <div className="crest-caption">
                    <span className="crest-badge badge-gold">
                      <i className="fa-solid fa-eye-low-vision"></i> DŌJUTSU • ALL-SEEING BYAKUGAN
                    </span>
                    <div className="crest-kanji">日向一族 • 白眼と柔拳</div>
                  </div>
                </div>

                {/* Crest 04: Uzumaki Clan Mon */}
                <div
                  className={`clan-crest-item crest-uzumaki ${activeClan === 'uzumaki' ? 'is-active' : ''}`}
                  data-clan="uzumaki"
                >
                  <svg
                    className="clan-svg-mon"
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Uzumaki Clan Crest"
                  >
                    <circle
                      cx="150"
                      cy="150"
                      r="140"
                      stroke="rgba(234, 88, 12, 0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="115"
                      stroke="rgba(234, 88, 12, 0.5)"
                      strokeWidth="2"
                    />
                    <circle cx="150" cy="150" r="85" fill="#dc2626" stroke="#f5f0eb" strokeWidth="3" />
                    <path
                      d="M 150 150 m 0 -55 a 55 55 0 0 1 55 55 a 45 45 0 0 1 -45 45 a 35 35 0 0 1 -35 -35 a 25 25 0 0 1 25 -25 a 15 15 0 0 1 15 15"
                      stroke="#f5f0eb"
                      strokeWidth="7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="crest-caption">
                    <span className="crest-badge badge-orange">
                      <i className="fa-solid fa-certificate"></i> FŪINJUTSU • VITALITY SEAL
                    </span>
                    <div className="crest-kanji">うずまき一族 • 渦潮と封印</div>
                  </div>
                </div>

                {/* Crest 05: Nara Clan Mon */}
                <div
                  className={`clan-crest-item crest-nara ${activeClan === 'nara' ? 'is-active' : ''}`}
                  data-clan="nara"
                >
                  <svg
                    className="clan-svg-mon"
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Nara Clan Crest"
                  >
                    <circle
                      cx="150"
                      cy="150"
                      r="140"
                      stroke="rgba(168, 85, 247, 0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="115"
                      stroke="rgba(168, 85, 247, 0.5)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="75"
                      fill="rgba(88, 28, 135, 0.3)"
                      stroke="#c084fc"
                      strokeWidth="2"
                    />
                    <path
                      d="M 110 180 Q 130 110 150 110 Q 170 110 190 180"
                      stroke="#f5f0eb"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 130 140 Q 100 120 90 90 M 170 140 Q 200 120 210 90"
                      stroke="#c084fc"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="crest-caption">
                    <span className="crest-badge badge-purple">
                      <i className="fa-solid fa-moon"></i> HIDEN • SHADOW MANIPULATION
                    </span>
                    <div className="crest-kanji">奈良一族 • 影真似と知略</div>
                  </div>
                </div>

                {/* Crest 06: Sarutobi Clan Mon */}
                <div
                  className={`clan-crest-item crest-sarutobi ${activeClan === 'sarutobi' ? 'is-active' : ''}`}
                  data-clan="sarutobi"
                >
                  <svg
                    className="clan-svg-mon"
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Sarutobi Clan Crest"
                  >
                    <circle
                      cx="150"
                      cy="150"
                      r="140"
                      stroke="rgba(245, 158, 11, 0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="115"
                      stroke="rgba(245, 158, 11, 0.5)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="80"
                      fill="rgba(180, 83, 9, 0.25)"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    <path
                      d="M 150 80 Q 190 130 150 220 Q 110 130 150 80 Z"
                      fill="#ea580c"
                      stroke="#f5f0eb"
                      strokeWidth="2"
                    />
                    <circle cx="150" cy="160" r="14" fill="#fbbf24" />
                  </svg>
                  <div className="crest-caption">
                    <span className="crest-badge badge-amber">
                      <i className="fa-solid fa-fire-flame-curved"></i> ALL-NATURE • FIRE RELEASE
                    </span>
                    <div className="crest-kanji">猿飛一族 • 飛猿の覚悟</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Frame & Canon Information Dossier Deck */}
          <div className="clan-dossier-panel">
            {/* Visual Media Reveal Deck */}
            <div className="clan-media-deck">
              {NOBLE_CLANS_DATA.map((clan) => (
                <div
                  key={clan.key}
                  className={`clan-frame ${clan.frameClass} ${activeClan === clan.key ? 'is-active' : ''} manga-panel`}
                  data-clan={clan.key}
                >
                  <img
                    className="clan-img"
                    src={clan.image}
                    alt={clan.imageAlt}
                  />
                  <div className="clan-frame-overlay"></div>
                  <div className="frame-location-seal">
                    <i className={`fa-solid ${clan.sealIcon}`}></i> {clan.sealText}
                  </div>
                </div>
              ))}
            </div>

            {/* Factual Information Dossier Cards Deck */}
            <div className="clan-content-deck">
              {NOBLE_CLANS_DATA.map((clan) => {
                const favorited = isFavorited(clan.key, 'clan');
                return (
                  <div
                    key={clan.key}
                    className={`clan-card ${clan.cardClass} ${activeClan === clan.key ? 'is-active' : ''}`}
                    data-clan={clan.key}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                      }}
                    >
                      <div className={`clan-card-badge ${clan.cardBadgeClass}`}>
                        <span className="c-era-tag">{clan.eraTag}</span>
                        <i className={`fa-solid ${clan.cardBadgeIcon}`}></i> {clan.clanNum}
                      </div>

                      <button
                        type="button"
                        className={`clan-favorite-btn ${favorited ? 'is-favorited' : ''}`}
                        aria-label={
                          favorited
                            ? `Remove ${clan.title} from clan bookmarks`
                            : `Bookmark ${clan.title} in clan favorites`
                        }
                        title={favorited ? 'Remove from bookmarked clans' : 'Bookmark in Clan Favorites'}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite({
                            item_id: clan.key,
                            item_type: 'clan',
                            item_title: clan.title,
                            item_image: clan.image,
                          });
                        }}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: favorited ? 'rgba(153, 27, 27, 0.9)' : 'rgba(8, 8, 8, 0.75)',
                          border: `1px solid ${
                            favorited
                              ? 'var(--primary-crimson-bright, #dc2626)'
                              : 'var(--border-subtle, rgba(255, 255, 255, 0.15))'
                          }`,
                          color: favorited ? 'var(--secondary-gold-bright, #e5c07b)' : 'var(--text-muted, #a8a29e)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          boxShadow: favorited ? '0 0 12px rgba(220, 38, 38, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)',
                          backdropFilter: 'blur(4px)',
                          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <i className={favorited ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
                      </button>
                    </div>

                    <h2 className="clan-card-title">{clan.title}</h2>
                    <div className="clan-card-kanji">{clan.kanji}</div>
                    <p className="clan-card-desc">{clan.desc}</p>
                    <div className="clan-meta-grid">
                      {clan.metaBadges.map((badge, bIdx) => (
                        <span key={bIdx} className="c-meta-badge">
                          <i className={`fa-solid ${badge.icon}`}></i> {badge.text}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClanCodexSection;
