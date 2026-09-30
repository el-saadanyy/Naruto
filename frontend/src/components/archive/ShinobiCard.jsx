import React from 'react';
import { useFavorites } from '../../context/FavoritesContext.jsx';

function ShinobiCard({ shinobi, onSelect, onAuthRequired }) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(shinobi.id);

  const statusClass = shinobi.status === 'active' ? 'status-active' : 'status-deceased';
  const statusText = shinobi.status === 'active' ? 'ACTIVE // 生存' : 'DECEASED // 物故';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(shinobi);
    }
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    const result = await toggleFavorite({
      item_id: shinobi.id,
      item_type: 'shinobi',
      item_title: shinobi.name,
      item_image: shinobi.image,
    });

    if (result && result.authRequired) {
      if (onAuthRequired) {
        onAuthRequired();
      } else {
        alert('Shinobi Authentication Required: Please log in to bookmark classified dossiers.');
      }
    }
  };

  return (
    <div
      className="shinobi-card manga-panel"
      tabIndex={0}
      data-id={shinobi.id}
      onClick={() => onSelect(shinobi)}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Inspect ${shinobi.name} classified dossier`}
    >
      <div className="card-portrait-wrap">
        <img
          className="card-portrait"
          src={shinobi.image}
          alt={shinobi.name}
        />
        <div className="card-portrait-gradient"></div>
        <span className="card-id-tag">
          <i className="fa-solid fa-hashtag"></i> {shinobi.id}
        </span>
        <span className={`card-status-badge ${statusClass}`}>
          <i
            className={`fa-solid ${shinobi.status === 'active' ? 'fa-circle-dot' : 'fa-skull'}`}
          ></i>{' '}
          {statusText}
        </span>

        <button
          type="button"
          className={`card-favorite-btn ${favorited ? 'is-favorited' : ''}`}
          aria-label={favorited ? `Remove ${shinobi.name} from favorites` : `Bookmark ${shinobi.name} in favorites`}
          title={favorited ? 'Remove from classified bookmarks' : 'Bookmark in Shinobi Favorites'}
          onClick={handleFavoriteClick}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 4,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: favorited ? 'rgba(153, 27, 27, 0.9)' : 'rgba(8, 8, 8, 0.75)',
            border: `1px solid ${favorited ? 'var(--primary-crimson-bright, #dc2626)' : 'var(--border-subtle, rgba(255, 255, 255, 0.15))'}`,
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
      <div className="card-body">
        <div className="card-naming">
          <h3 className="card-name">{shinobi.name}</h3>
          <div className="card-kanji">{shinobi.kanji}</div>
        </div>
        <div className="card-meta-tags">
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
        <div className="card-specialty">
          <i className="fa-solid fa-bolt"></i> <span>{shinobi.specialty}</span>
        </div>
        <p className="card-desc">{shinobi.summary}</p>
        <button
          type="button"
          className="card-inspect-btn"
          data-id={shinobi.id}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(shinobi);
          }}
        >
          <i className="fa-solid fa-folder-open"></i> INSPECT DOSSIER
        </button>
      </div>
    </div>
  );
}

export default ShinobiCard;
