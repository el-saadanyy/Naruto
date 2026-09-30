import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { SUPPORTING_CLANS_DATA } from './clanData.js';

gsap.registerPlugin(ScrollTrigger);

function SupportingClansSection() {
  const { isFavorited, toggleFavorite } = useFavorites();
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from('.support-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="supporting-clans" className="supporting-clans-section" ref={sectionRef}>
      <div className="supporting-container">
        <div className="section-tag" style={{ textAlign: 'center', marginBottom: '8px' }}>
          <i className="fa-solid fa-users-viewfinder"></i> ALLIED BASTIONS • 名門各派
        </div>
        <h2 className="supporting-title">ALLIED CLANS OF THE SHINOBI WORLD</h2>

        <div className="supporting-clan-grid">
          {SUPPORTING_CLANS_DATA.map((clan) => {
            const favorited = isFavorited(clan.id, 'clan');
            return (
              <div key={clan.id || clan.name} className="support-card manga-panel" tabIndex={0} data-clan={clan.id}>
                <div
                  className="support-card-head"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="support-icon">
                      <i className={`fa-solid ${clan.icon}`}></i>
                    </span>
                    <div className="support-naming">
                      <h4>{clan.name}</h4>
                      <span>{clan.kanji}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`clan-favorite-btn ${favorited ? 'is-favorited' : ''}`}
                    aria-label={
                      favorited ? `Remove ${clan.name} from clan bookmarks` : `Bookmark ${clan.name} in clan favorites`
                    }
                    title={favorited ? 'Remove from bookmarked clans' : 'Bookmark in Clan Favorites'}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite({
                        item_id: clan.id,
                        item_type: 'clan',
                        item_title: clan.name,
                        item_image: '',
                      });
                    }}
                    style={{
                      width: '32px',
                      height: '32px',
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
                      fontSize: '0.85rem',
                      boxShadow: favorited ? '0 0 10px rgba(220, 38, 38, 0.4)' : 'none',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      flexShrink: 0,
                    }}
                  >
                    <i className={favorited ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
                  </button>
                </div>
                <p className="support-text">{clan.desc}</p>
                <div className="support-footer">
                  <span className="s-badge">
                    <i className="fa-solid fa-shield"></i> {clan.badge1}
                  </span>
                  <span className="s-badge">{clan.badge2}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SupportingClansSection;
