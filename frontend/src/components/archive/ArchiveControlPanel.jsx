import React from 'react';

const VILLAGE_OPTIONS = [
  { value: 'all', label: 'ALL' },
  { value: 'leaf', label: 'LEAF' },
  { value: 'sand', label: 'SAND' },
  { value: 'rock', label: 'ROCK' },
  { value: 'cloud', label: 'CLOUD' },
  { value: 'mist', label: 'MIST' },
];

const RANK_OPTIONS = [
  { value: 'all', label: 'ALL' },
  { value: 'kage', label: 'KAGE' },
  { value: 'jonin', label: 'JŌNIN' },
  { value: 'chunin', label: 'CHŪNIN' },
  { value: 'genin', label: 'GENIN' },
];

const CLAN_OPTIONS = [
  { value: 'all', label: 'ALL' },
  { value: 'uchiha', label: 'UCHIHA' },
  { value: 'senju', label: 'SENJU' },
  { value: 'hyuga', label: 'HYŪGA' },
  { value: 'uzumaki', label: 'UZUMAKI' },
  { value: 'nara', label: 'NARA' },
  { value: 'sarutobi', label: 'SARUTOBI' },
  { value: 'other', label: 'OTHER' },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'ALL' },
  { value: 'active', label: 'ACTIVE' },
  { value: 'deceased', label: 'DECEASED' },
];

function ArchiveControlPanel({
  filters,
  onFilterChange,
  onSearchChange,
  onReset,
}) {
  return (
    <section className="db-control-panel">
      {/* Search Field & Reset Controls */}
      <div className="db-search-bar manga-panel">
        <div className="search-input-group">
          <i className="fa-solid fa-magnifying-glass search-icon-decor"></i>
          <input
            type="text"
            id="shinobi-search-input"
            className="shinobi-search-input"
            placeholder="SEARCH SHINOBI BY NAME, CLAN, VILLAGE OR TECHNIQUE..."
            autoComplete="off"
            aria-label="Search Shinobi Records"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button
            type="button"
            id="search-clear-btn"
            className={`search-clear-btn ${filters.search ? 'is-visible' : ''}`}
            aria-label="Clear Search Input"
            onClick={() => onSearchChange('')}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <button
          type="button"
          id="db-reset-btn"
          className="db-reset-btn"
          onClick={onReset}
        >
          <i className="fa-solid fa-rotate-left"></i> RESET FILTERS
        </button>
      </div>

      {/* Filter Matrix Rows */}
      <div className="db-filter-matrix manga-panel">
        {/* Village Filter Row */}
        <div className="filter-row">
          <span className="filter-row-label">
            <i className="fa-solid fa-mountain-sun"></i> VILLAGE // 里
          </span>
          <div className="filter-btn-group" data-filter-type="village">
            {VILLAGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`db-filter-btn ${filters.village === opt.value ? 'is-active' : ''}`}
                data-value={opt.value}
                onClick={() => onFilterChange('village', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rank Filter Row */}
        <div className="filter-row">
          <span className="filter-row-label">
            <i className="fa-solid fa-award"></i> RANK // 階級
          </span>
          <div className="filter-btn-group" data-filter-type="rank">
            {RANK_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`db-filter-btn ${filters.rank === opt.value ? 'is-active' : ''}`}
                data-value={opt.value}
                onClick={() => onFilterChange('rank', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clan Filter Row */}
        <div className="filter-row">
          <span className="filter-row-label">
            <i className="fa-solid fa-dna"></i> CLAN // 一族
          </span>
          <div className="filter-btn-group" data-filter-type="clan">
            {CLAN_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`db-filter-btn ${filters.clan === opt.value ? 'is-active' : ''}`}
                data-value={opt.value}
                onClick={() => onFilterChange('clan', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter Row */}
        <div className="filter-row">
          <span className="filter-row-label">
            <i className="fa-solid fa-heart-pulse"></i> STATUS // 状態
          </span>
          <div className="filter-btn-group" data-filter-type="status">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`db-filter-btn ${filters.status === opt.value ? 'is-active' : ''}`}
                data-value={opt.value}
                onClick={() => onFilterChange('status', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArchiveControlPanel;
