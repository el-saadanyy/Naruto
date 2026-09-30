import React, { useEffect } from 'react';
import { useFavorites } from '../../context/FavoritesContext.jsx';

function ShinobiDetailModal({ shinobi, onClose }) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = shinobi ? isFavorited(shinobi.id) : false;

  useEffect(() => {
    if (!shinobi) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [shinobi, onClose]);

  if (!shinobi) return null;

  const statusClass = shinobi.status === 'active' ? 'status-active' : 'status-deceased';
  const statusText =
    shinobi.status === 'active' ? 'ACTIVE SHINOBI // 生存' : 'DECEASED LEGEND // 物故';

  const handleFavoriteClick = async () => {
    await toggleFavorite({
      item_id: shinobi.id,
      item_type: 'shinobi',
      item_title: shinobi.name,
      item_image: shinobi.image,
    });
  };

  return (
    <div
      id="dossier-modal-overlay"
      className="dossier-modal-overlay is-open"
      role="dialog"
      aria-modal="true"
      aria-hidden="false"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="dossier-modal-dialog manga-panel" id="dossier-modal-dialog">
        <button
          type="button"
          className={`modal-favorite-btn ${favorited ? 'is-favorited' : ''}`}
          aria-label={favorited ? 'Remove from favorites' : 'Bookmark in favorites'}
          title={favorited ? 'Remove from classified bookmarks' : 'Bookmark in Shinobi Favorites'}
          onClick={handleFavoriteClick}
          style={{
            position: 'absolute',
            top: '16px',
            right: '60px',
            zIndex: 10,
            background: favorited ? 'rgba(153, 27, 27, 0.85)' : 'rgba(255, 255, 255, 0.08)',
            border: `1px solid ${favorited ? 'var(--primary-crimson-bright, #dc2626)' : 'var(--border-subtle, rgba(255, 255, 255, 0.15))'}`,
            color: favorited ? 'var(--secondary-gold-bright, #e5c07b)' : 'var(--text-muted, #a8a29e)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.2s ease',
          }}
        >
          <i className={favorited ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
        </button>

        <button
          type="button"
          id="modal-close-btn"
          className="modal-close-btn"
          aria-label="Close Dossier Modal"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div id="modal-content-slot">
          <div className="modal-header-layout">
            <div className="modal-portrait-frame">
              <img
                className="modal-portrait-img"
                src={shinobi.image}
                alt={shinobi.name}
              />
            </div>
            <div className="modal-header-meta">
              <span className="modal-reg-id">
                <i className="fa-solid fa-hashtag"></i> ARCHIVE ID: {shinobi.id}
              </span>
              <h2 className="modal-shinobi-title">{shinobi.name}</h2>
              <div className="modal-shinobi-kanji">{shinobi.kanji}</div>
              <div className="modal-tags-row">
                <span className={`card-status-badge ${statusClass}`}>
                  <i
                    className={`fa-solid ${shinobi.status === 'active' ? 'fa-circle-dot' : 'fa-skull'}`}
                  ></i>{' '}
                  {statusText}
                </span>
                <span className="c-tag tag-village">
                  <i className="fa-solid fa-mountain-sun"></i> {shinobi.villageDisplay}
                </span>
                <span className="c-tag">
                  <i className="fa-solid fa-dna"></i> {shinobi.clanDisplay}
                </span>
                <span className="c-tag tag-rank">
                  <i className="fa-solid fa-award"></i> {shinobi.rankDisplay}
                </span>
              </div>
            </div>
          </div>

          <div className="modal-attribute-grid">
            <div className="attr-card">
              <span className="attr-label">NATURE AFFINITIES</span>
              <span className="attr-value">{shinobi.natures}</span>
            </div>
            <div className="attr-card">
              <span className="attr-label">TACTICAL CLASSIFICATION</span>
              <span className="attr-value">{shinobi.classification}</span>
            </div>
            <div className="attr-card">
              <span className="attr-label">SIGNATURE COMBAT SPECIALTY</span>
              <span className="attr-value">{shinobi.specialty}</span>
            </div>
          </div>

          <div className="modal-section-title">
            <i className="fa-solid fa-book-bookmark"></i> CLASSIFIED INTELLIGENCE DOSSIER
          </div>
          <p className="modal-summary-text">{shinobi.summary}</p>

          <div className="modal-section-title">
            <i className="fa-solid fa-fire"></i> SIGNATURE JUTSU & COMBAT MASTERY
          </div>
          <div className="modal-techniques-list">
            {shinobi.techniques.map((t, idx) => (
              <span key={idx} className="technique-pill">
                <i className="fa-solid fa-scroll"></i> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShinobiDetailModal;
