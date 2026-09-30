import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchShinobiList } from '../api/archiveApi';
import ArchiveHeroSection from '../components/archive/ArchiveHeroSection';
import ArchiveControlPanel from '../components/archive/ArchiveControlPanel';
import ShinobiCard from '../components/archive/ShinobiCard';
import ShinobiDetailModal from '../components/archive/ShinobiDetailModal';

function normalizeText(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function ShinobiArchivePage() {
  const [searchParams] = useSearchParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    village: 'all',
    rank: 'all',
    clan: 'all',
    status: 'all',
  });

  const [selectedShinobi, setSelectedShinobi] = useState(null);

  useEffect(() => {
    const shinobiId = searchParams.get('shinobi');
    if (shinobiId && records.length > 0) {
      const found = records.find((r) => r.id === shinobiId);
      if (found) {
        setSelectedShinobi(found);
      }
    }
  }, [records, searchParams]);

  useEffect(() => {
    let isMounted = true;

    async function loadShinobiRecords() {
      setLoading(true);
      setApiError(null);
      try {
        const data = await fetchShinobiList();
        if (isMounted) {
          if (data && Array.isArray(data.results)) {
            setRecords(data.results);
          } else {
            setRecords([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch live Shinobi records from PostgreSQL API:', err);
          setRecords([]);
          setApiError(err.message || 'Shinobi Archive API is currently unreachable.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadShinobiRecords();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleSearchChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      village: 'all',
      rank: 'all',
      clan: 'all',
      status: 'all',
    });
  };

  const filteredRecords = useMemo(() => {
    const q = normalizeText(filters.search.trim());

    return records.filter((s) => {
      // Village filter
      if (filters.village !== 'all' && s.village !== filters.village) {
        return false;
      }
      // Rank filter
      if (filters.rank !== 'all' && s.rank !== filters.rank) {
        return false;
      }
      // Clan filter
      if (filters.clan !== 'all' && s.clan !== filters.clan) {
        return false;
      }
      // Status filter
      if (filters.status !== 'all' && s.status !== filters.status) {
        return false;
      }
      // Search query filter
      if (q) {
        const matchName = normalizeText(s.name).includes(q);
        const matchKanji = (s.kanji || '').includes(q);
        const matchClan = normalizeText(s.clanDisplay).includes(q);
        const matchVillage = normalizeText(s.villageDisplay).includes(q);
        const matchRank = normalizeText(s.rankDisplay).includes(q);
        const matchSpecialty = normalizeText(s.specialty).includes(q);
        const matchSummary = normalizeText(s.summary).includes(q);
        if (
          !matchName &&
          !matchKanji &&
          !matchClan &&
          !matchVillage &&
          !matchRank &&
          !matchSpecialty &&
          !matchSummary
        ) {
          return false;
        }
      }
      return true;
    });
  }, [records, filters]);

  return (
    <main id="shinobi-database-root" className="shinobi_db_page">
      <ArchiveHeroSection
        totalCount={records.length}
        visibleCount={filteredRecords.length}
      />

      <ArchiveControlPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onReset={handleResetFilters}
      />

      {/* Clear error alert when API connection fails */}
      {apiError && !loading && (
        <div
          className="db-fallback-notice"
          style={{
            maxWidth: '1280px',
            margin: '0 auto 1.5rem auto',
            padding: '0.85rem 1.25rem',
            background: 'rgba(220, 38, 38, 0.12)',
            border: '1px solid rgba(220, 38, 38, 0.35)',
            borderRadius: '6px',
            color: '#f87171',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>
            Database Connection Error: {apiError}. Unable to synchronize classified dossiers from PostgreSQL registry.
          </span>
        </div>
      )}

      {/* Shinobi Records Grid Section */}
      <section className="db-records-section">
        <div className="db-results-header">
          <div className="db-results-count">
            <i className="fa-solid fa-address-card"></i> DOSSIER ARCHIVE (
            <span id="results-count-num">{filteredRecords.length}</span> MATCHES)
          </div>
        </div>

        {loading ? (
          <div
            id="shinobi-loading-state"
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              color: 'var(--text-muted, #a8a29e)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2.5rem', color: 'var(--primary-crimson-bright, #dc2626)' }}></i>
            <h3 style={{ letterSpacing: '2px', fontSize: '1.1rem', color: 'var(--text-main, #fff)' }}>
              SYNCHRONIZING CLASSIFIED SHINOBI DOSSIERS...
            </h3>
            <p style={{ fontSize: '0.85rem' }}>Decrypting records from Ninja Archive Registry</p>
          </div>
        ) : filteredRecords.length > 0 ? (
          <div id="shinobi-grid" className="db-grid">
            {filteredRecords.map((s) => (
              <ShinobiCard
                key={s.id}
                shinobi={s}
                onSelect={(shinobi) => setSelectedShinobi(shinobi)}
              />
            ))}
          </div>
        ) : (
          <div id="shinobi-empty-state" className="db-empty-state">
            <i className="fa-solid fa-user-slash"></i>
            <h3>NO SHINOBI RECORDS FOUND</h3>
            <p>No classified dossier matches the specified search and filter combination.</p>
            <button
              type="button"
              className="db-reset-btn"
              id="empty-state-reset-btn"
              onClick={handleResetFilters}
            >
              <i className="fa-solid fa-rotate-left"></i> CLEAR FILTERS
            </button>
          </div>
        )}
      </section>

      {/* Classified Dossier Detail Modal */}
      <ShinobiDetailModal
        shinobi={selectedShinobi}
        onClose={() => setSelectedShinobi(null)}
      />
    </main>
  );
}

export default ShinobiArchivePage;
