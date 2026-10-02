import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { fetchShinobiById } from '../api/archiveApi.js';
import { fetchVillageById } from '../api/villageApi.js';
import { NOBLE_CLANS_DATA, SUPPORTING_CLANS_DATA } from '../components/clans/clanData.js';
import { BIJUU_DATA } from '../components/villages/bijuuData.js';
import { API_ENDPOINTS } from '../api/config.js';
import ShinobiCard from '../components/archive/ShinobiCard.jsx';
import ShinobiDetailModal from '../components/archive/ShinobiDetailModal.jsx';

function ProfilePage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { favorites, isFavorited, toggleFavorite, loading: favsLoading } = useFavorites();
  const [profileData, setProfileData] = useState(null);
  const [selectedShinobi, setSelectedShinobi] = useState(null);
  const [shinobiDetailMap, setShinobiDetailMap] = useState({});
  const [shinobiLoading, setShinobiLoading] = useState(false);
  const [villageDetailMap, setVillageDetailMap] = useState({});
  const [villageLoading, setVillageLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${API_ENDPOINTS.PROFILE}/`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setProfileData(data);
        })
        .catch((err) => console.error('Error fetching profile:', err));
    }
  }, [isAuthenticated]);

  // Segregate favorites by type
  const shinobiFavorites = useMemo(() => {
    return (favorites || []).filter((f) => (f.item_type || 'shinobi') === 'shinobi');
  }, [favorites]);

  const clanFavorites = useMemo(() => {
    return (favorites || []).filter((f) => f.item_type === 'clan');
  }, [favorites]);

  const villageFavorites = useMemo(() => {
    return (favorites || []).filter((f) => f.item_type === 'village');
  }, [favorites]);

  const bijuuFavorites = useMemo(() => {
    return (favorites || []).filter((f) => f.item_type === 'bijuu');
  }, [favorites]);

  useEffect(() => {
    let isMounted = true;
    if (!shinobiFavorites || shinobiFavorites.length === 0) {
      setShinobiDetailMap({});
      return;
    }

    const missingIds = shinobiFavorites
      .map((f) => f.item_id)
      .filter((id) => id && !shinobiDetailMap[id]);

    if (missingIds.length === 0) return;

    async function loadShinobiDetails() {
      setShinobiLoading(true);
      try {
        const results = await Promise.all(
          missingIds.map(async (id) => {
            try {
              const detail = await fetchShinobiById(id);
              return { id, detail };
            } catch (err) {
              console.warn(`Could not load shinobi detail for ${id}:`, err);
              return { id, detail: null };
            }
          })
        );
        if (isMounted) {
          setShinobiDetailMap((prev) => {
            const next = { ...prev };
            results.forEach(({ id, detail }) => {
              if (detail) {
                next[id] = detail;
              }
            });
            return next;
          });
        }
      } finally {
        if (isMounted) {
          setShinobiLoading(false);
        }
      }
    }

    loadShinobiDetails();

    return () => {
      isMounted = false;
    };
  }, [shinobiFavorites]);

  // Match favorited IDs with canonical Shinobi records from PostgreSQL API
  const favoritedShinobiRecords = useMemo(() => {
    if (!shinobiFavorites || shinobiFavorites.length === 0) return [];

    return shinobiFavorites
      .map((fav) => {
        const canonical = shinobiDetailMap[fav.item_id];
        if (canonical) return canonical;

        // Fallback placeholder record while loading or if detail lookup fails
        return {
          id: fav.item_id,
          name: fav.item_title || 'Unknown Shinobi',
          kanji: '忍',
          village: 'leaf',
          villageDisplay: 'Hidden Leaf',
          clan: 'other',
          clanDisplay: 'Shinobi Clan',
          rank: 'jonin',
          rankDisplay: 'Jōnin',
          status: 'active',
          image: fav.item_image || '/assets/image/shinobi_naruto.png',
          specialty: 'Classified Jutsu',
          natures: 'Classified',
          classification: 'Classified Operative',
          summary: 'Classified intelligence dossier on this shinobi operative.',
          techniques: ['Secret Technique'],
        };
      })
      .filter(Boolean);
  }, [shinobiFavorites, shinobiDetailMap]);

  // Match favorited IDs with canonical Clan records
  const favoritedClanRecords = useMemo(() => {
    if (!clanFavorites || clanFavorites.length === 0) return [];

    const nobleMap = new Map();
    NOBLE_CLANS_DATA.forEach((clan) => {
      nobleMap.set(clan.key, clan);
    });

    const supportingMap = new Map();
    SUPPORTING_CLANS_DATA.forEach((clan) => {
      supportingMap.set(clan.id, clan);
    });

    return clanFavorites
      .map((fav) => {
        const noble = nobleMap.get(fav.item_id);
        if (noble) {
          return {
            id: noble.key,
            item_type: 'clan',
            isNoble: true,
            title: noble.title,
            kanji: noble.kanji,
            desc: noble.desc,
            image: noble.image,
            eraTag: noble.eraTag,
            clanNum: noble.clanNum,
            sealText: noble.sealText,
            sealIcon: noble.sealIcon,
            badges: noble.metaBadges,
          };
        }

        const supporting = supportingMap.get(fav.item_id);
        if (supporting) {
          return {
            id: supporting.id,
            item_type: 'clan',
            isNoble: false,
            title: supporting.name,
            kanji: supporting.kanji,
            desc: supporting.desc,
            icon: supporting.icon,
            badge1: supporting.badge1,
            badge2: supporting.badge2,
          };
        }

        // Fallback placeholder record
        return {
          id: fav.item_id,
          item_type: 'clan',
          isNoble: false,
          title: fav.item_title || 'Shinobi Clan',
          kanji: '一族',
          desc: 'Ancestral shinobi bloodline record.',
          icon: 'fa-shield-halved',
          badge1: 'ANCIENT BLOODLINE',
          badge2: 'ALLIED CLAN',
        };
      })
      .filter(Boolean);
  }, [clanFavorites]);

  useEffect(() => {
    let isMounted = true;
    if (!villageFavorites || villageFavorites.length === 0) {
      setVillageDetailMap({});
      return;
    }

    const missingIds = villageFavorites
      .map((f) => f.item_id)
      .filter((id) => id && !villageDetailMap[id]);

    if (missingIds.length === 0) return;

    async function loadVillageDetails() {
      setVillageLoading(true);
      try {
        const results = await Promise.all(
          missingIds.map(async (id) => {
            try {
              const detail = await fetchVillageById(id);
              return { id, detail };
            } catch (err) {
              console.warn(`Could not load village detail for ${id}:`, err);
              return { id, detail: null };
            }
          })
        );
        if (isMounted) {
          setVillageDetailMap((prev) => {
            const next = { ...prev };
            results.forEach(({ id, detail }) => {
              if (detail) {
                next[id] = detail;
              }
            });
            return next;
          });
        }
      } finally {
        if (isMounted) {
          setVillageLoading(false);
        }
      }
    }

    loadVillageDetails();

    return () => {
      isMounted = false;
    };
  }, [villageFavorites]);

  // Match favorited IDs with canonical Village records from PostgreSQL API
  const favoritedVillageRecords = useMemo(() => {
    if (!villageFavorites || villageFavorites.length === 0) return [];

    return villageFavorites
      .map((fav) => {
        const canonical = villageDetailMap[fav.item_id];
        if (canonical) {
          return {
            id: canonical.id,
            item_type: 'village',
            title: canonical.title,
            kanji: canonical.kanji,
            eraTag: canonical.era_tag || canonical.eraTag || 'SOVEREIGN TERRITORY',
            desc: canonical.summary || canonical.desc || '',
            image: canonical.image,
            sealIcon: canonical.seal_icon || canonical.sealIcon || 'fa-landmark',
            sealText: canonical.seal_text || canonical.sealText || 'VILLAGE',
            metaBadges: canonical.meta_badges || canonical.metaBadges || [],
          };
        }

        // Fallback placeholder record while loading or if lookup fails
        return {
          id: fav.item_id,
          item_type: 'village',
          title: fav.item_title || 'Hidden Shinobi Village',
          kanji: '忍の里',
          eraTag: 'SOVEREIGN TERRITORY',
          desc: 'Classified territorial village dossier.',
          image: fav.item_image || '/assets/image/world_map_overview.jpg',
          sealIcon: 'fa-landmark',
          sealText: 'VILLAGE',
          metaBadges: [],
        };
      })
      .filter(Boolean);
  }, [villageFavorites, villageDetailMap]);

  // Match favorited IDs with canonical Bijuu records
  const favoritedBijuuRecords = useMemo(() => {
    if (!bijuuFavorites || bijuuFavorites.length === 0) return [];

    const bijuuMap = new Map();
    BIJUU_DATA.forEach((b) => {
      bijuuMap.set(b.id, b);
    });

    return bijuuFavorites
      .map((fav) => {
        const canonical = bijuuMap.get(fav.item_id);
        if (canonical) {
          return {
            id: canonical.id,
            item_type: 'bijuu',
            num: canonical.num,
            name: canonical.name,
            tailNum: canonical.tailNum,
            tailKanji: canonical.tailKanji,
            kanjiTitle: canonical.kanjiTitle,
            synopsis: canonical.synopsis,
            image: canonical.image,
            domainIcon: canonical.domainIcon,
            domainTag: canonical.domainTag,
            historicalVillage: canonical.historicalVillage,
            metrics: canonical.metrics,
          };
        }

        // Fallback placeholder record
        return {
          id: fav.item_id,
          item_type: 'bijuu',
          num: '00',
          name: fav.item_title || 'Tailed Beast',
          tailNum: 'TAILED BEAST',
          tailKanji: '尾獣',
          kanjiTitle: '生けるチャクラの巨獣',
          synopsis: 'Classified primordial tailed beast chronicle record.',
          image: fav.item_image || '/assets/image/bijuu_01_shukaku.png',
          domainIcon: 'fa-fire-flame-curved',
          domainTag: 'PRIMORDIAL CHAKRA TITAN',
          historicalVillage: 'Classified',
          metrics: [],
        };
      })
      .filter(Boolean);
  }, [bijuuFavorites]);

  const formatDate = (isoString) => {
    if (!isoString) return 'Active Era';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  if (authLoading) {
    return (
      <main
        className="profile-page"
        style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div
          style={{
            color: 'var(--secondary-gold-bright, #e5c07b)',
            fontSize: '1.2rem',
            fontFamily: 'var(--font-heading, sans-serif)',
          }}
        >
          <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
          ACCESSING CLASSIFIED SHINOBI REGISTRY...
        </div>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <main
        className="profile-page auth-page"
        style={{
          padding: '80px 20px',
          minHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="login manga-panel" style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
          <div className="auth-header">
            <i
              className="fa-solid fa-lock"
              style={{ fontSize: '2.5rem', color: 'var(--primary-crimson-bright, #dc2626)', marginBottom: '12px' }}
            ></i>
            <h1 className="auth-title">Shinobi Clearance Required • 認証要</h1>
            <p className="auth-subtitle">
              You must authenticate with your shinobi credentials to access your personal dossier and bookmarked
              favorites.
            </p>
          </div>
          <div
            className="profile-unauth-actions"
            style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link
              to="/login"
              className="card-inspect-btn"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <i className="fa-solid fa-right-to-bracket"></i> LOG IN TO REGISTRY
            </Link>
            <Link
              to="/signup"
              style={{
                color: 'var(--secondary-gold-bright, #e5c07b)',
                textDecoration: 'none',
                padding: '10px 16px',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              ENROLL IN REGISTRY
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page" style={{ minHeight: '85vh', paddingBottom: '80px' }}>
      <img
        className="hero-konoha-watermark"
        src="/assets/image/konohaL.png"
        alt=""
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      />

      {/* Profile Header Dossier Section */}
      <section className="profile-hero-section">
        <div className="manga-panel profile-dossier-card">
          <div className="profile-dossier-header">
            {/* Left: Avatar & Identity */}
            <div className="profile-dossier-identity">
              <div className="profile-avatar-circle">
                <i className="fa-solid fa-user-ninja"></i>
              </div>

              <div className="profile-identity-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span
                    style={{
                      background: 'rgba(153, 27, 27, 0.4)',
                      border: '1px solid var(--primary-crimson-bright, #dc2626)',
                      color: 'var(--text-cream, #f5f0eb)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    REGISTERED OPERATIVE
                  </span>
                  <span style={{ color: 'var(--secondary-gold, #c5a059)', fontSize: '0.85rem' }}>ID #{user.id}</span>
                </div>
                <h1 className="profile-username">
                  {user.username}
                </h1>
                <p className="profile-email">
                  <i
                    className="fa-regular fa-envelope"
                    style={{ marginRight: '6px', color: 'var(--secondary-gold, #c5a059)' }}
                  ></i>
                  {user.email}
                </p>
              </div>
            </div>

            {/* Right: Enrolled info & Quick Action */}
            <div className="profile-dossier-meta">
              <span style={{ color: 'var(--text-dim, #78716c)', fontSize: '0.85rem' }}>
                <i className="fa-regular fa-calendar-check" style={{ marginRight: '6px' }}></i>
                Enrolled: {formatDate(profileData?.date_joined)}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#4ade80',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                <i className="fa-solid fa-shield-halved"></i> SESSION ACTIVE // 認証済み
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="profile-stats-grid">
            <div
              style={{
                background: 'rgba(8, 8, 8, 0.6)',
                padding: '16px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(197, 160, 89, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <i
                className="fa-solid fa-bookmark"
                style={{ fontSize: '1.8rem', color: 'var(--secondary-gold-bright, #e5c07b)' }}
              ></i>
              <div>
                <div
                  style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-cream, #f5f0eb)', lineHeight: 1 }}
                >
                  {favorites.length}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted, #a8a29e)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Total Bookmarks
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(8, 8, 8, 0.6)',
                padding: '16px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(220, 38, 38, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <i
                className="fa-solid fa-user-ninja"
                style={{ fontSize: '1.8rem', color: 'var(--primary-crimson-bright, #dc2626)' }}
              ></i>
              <div>
                <div
                  style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-cream, #f5f0eb)', lineHeight: 1 }}
                >
                  {shinobiFavorites.length}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted, #a8a29e)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Shinobi Bookmarks
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(8, 8, 8, 0.6)',
                padding: '16px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <i className="fa-solid fa-users-viewfinder" style={{ fontSize: '1.8rem', color: '#38bdf8' }}></i>
              <div>
                <div
                  style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-cream, #f5f0eb)', lineHeight: 1 }}
                >
                  {clanFavorites.length}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted, #a8a29e)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Clan Bookmarks
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(8, 8, 8, 0.6)',
                padding: '16px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(249, 115, 22, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <i className="fa-solid fa-landmark" style={{ fontSize: '1.8rem', color: '#f97316' }}></i>
              <div>
                <div
                  style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-cream, #f5f0eb)', lineHeight: 1 }}
                >
                  {villageFavorites.length}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted, #a8a29e)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Village Bookmarks
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(8, 8, 8, 0.6)',
                padding: '16px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(236, 72, 153, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <i className="fa-solid fa-fire-flame-curved" style={{ fontSize: '1.8rem', color: '#ec4899' }}></i>
              <div>
                <div
                  style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-cream, #f5f0eb)', lineHeight: 1 }}
                >
                  {bijuuFavorites.length}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted, #a8a29e)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Bijuu Bookmarks
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Bookmarked Shinobi Grid Section */}
      <section style={{ maxWidth: '1280px', margin: '20px auto 0', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.07))',
            paddingBottom: '16px',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-heading, "Long Shot", sans-serif)',
                fontSize: '1.8rem',
                color: 'var(--text-cream, #f5f0eb)',
                letterSpacing: '1px',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <i className="fa-solid fa-bookmark" style={{ color: 'var(--secondary-gold-bright, #e5c07b)' }}></i>
              CLASSIFIED SHINOBI BOOKMARKS • お気に入り忍
            </h2>
            <p style={{ color: 'var(--text-muted, #a8a29e)', margin: '4px 0 0', fontSize: '0.9rem' }}>
              Your personally selected registry of legendary shinobi dossiers.
            </p>
          </div>

          <Link
            to="/archive"
            className="card-inspect-btn"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
            }}
          >
            <i className="fa-solid fa-magnifying-glass"></i> BROWSE ARCHIVE
          </Link>
        </div>

        {favsLoading || shinobiLoading ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--secondary-gold, #c5a059)' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
            Loading classified dossiers...
          </div>
        ) : favoritedShinobiRecords.length > 0 ? (
          <div id="shinobi-grid" className="db-grid">
            {favoritedShinobiRecords.map((s) => (
              <ShinobiCard key={s.id} shinobi={s} onSelect={(shinobi) => setSelectedShinobi(shinobi)} />
            ))}
          </div>
        ) : (
          <div
            className="db-empty-state manga-panel"
            style={{
              padding: '48px 30px',
              textAlign: 'center',
              background: 'rgba(14, 14, 14, 0.7)',
              borderRadius: '12px',
              border: '1px dashed var(--border-subtle, rgba(255, 255, 255, 0.15))',
            }}
          >
            <i
              className="fa-solid fa-bookmark"
              style={{ fontSize: '2.5rem', color: 'var(--text-dim, #78716c)', marginBottom: '14px' }}
            ></i>
            <h3
              style={{
                fontFamily: 'var(--font-heading, "Long Shot", sans-serif)',
                fontSize: '1.5rem',
                color: 'var(--text-cream, #f5f0eb)',
                letterSpacing: '1px',
                marginBottom: '8px',
              }}
            >
              NO CLASSIFIED SHINOBI BOOKMARKED YET
            </h3>
            <p
              style={{
                color: 'var(--text-muted, #a8a29e)',
                maxWidth: '480px',
                margin: '0 auto 20px',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}
            >
              Explore the 45 legendary shinobi archives and click the bookmark seal on any operative card to pin them
              to your personal dossier.
            </p>
            <Link
              to="/archive"
              className="card-inspect-btn"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className="fa-solid fa-compass"></i> EXPLORE SHINOBI ARCHIVE
            </Link>
          </div>
        )}
      </section>

      {/* SECTION 2: Bookmarked Clans Section */}
      <section style={{ maxWidth: '1280px', margin: '50px auto 0', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.07))',
            paddingBottom: '16px',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-heading, "Long Shot", sans-serif)',
                fontSize: '1.8rem',
                color: 'var(--text-cream, #f5f0eb)',
                letterSpacing: '1px',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <i className="fa-solid fa-shield-halved" style={{ color: 'var(--primary-crimson-bright, #dc2626)' }}></i>
              BOOKMARKED NOBLE & ALLIED CLANS • お気に入り一族
            </h2>
            <p style={{ color: 'var(--text-muted, #a8a29e)', margin: '4px 0 0', fontSize: '0.9rem' }}>
              Your preserved ancestral bloodline codex and allied clan records.
            </p>
          </div>

          <Link
            to="/clans"
            className="card-inspect-btn"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
            }}
          >
            <i className="fa-solid fa-dna"></i> EXPLORE CLANS
          </Link>
        </div>

        {favsLoading ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--secondary-gold, #c5a059)' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
            Loading clan bookmarks...
          </div>
        ) : favoritedClanRecords.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {favoritedClanRecords.map((clan) => (
              <div
                key={clan.id}
                className="manga-panel"
                style={{
                  background: 'linear-gradient(145deg, rgba(17, 17, 17, 0.95), rgba(10, 10, 10, 0.95))',
                  border: '1px solid rgba(153, 27, 27, 0.35)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
              >
                {/* Visual Header if noble clan has image */}
                {clan.image ? (
                  <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                    <img
                      src={clan.image}
                      alt={clan.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(30%) contrast(1.1)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(14, 14, 14, 1) 0%, rgba(14, 14, 14, 0.2) 70%)',
                      }}
                    ></div>
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '12px',
                        background: 'rgba(153, 27, 27, 0.75)',
                        color: '#f5f0eb',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {clan.eraTag || 'NOBLE CLAN'}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${clan.title} from favorites`}
                      title="Remove Clan Bookmark"
                      onClick={() =>
                        toggleFavorite({
                          item_id: clan.id,
                          item_type: 'clan',
                          item_title: clan.title,
                          item_image: clan.image,
                        })
                      }
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(153, 27, 27, 0.9)',
                        border: '1px solid var(--primary-crimson-bright, #dc2626)',
                        color: 'var(--secondary-gold-bright, #e5c07b)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        boxShadow: '0 0 10px rgba(220, 38, 38, 0.5)',
                      }}
                    >
                      <i className="fa-solid fa-bookmark"></i>
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: '16px 20px 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          background: 'rgba(153, 27, 27, 0.3)',
                          border: '1px solid rgba(153, 27, 27, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--secondary-gold-bright, #e5c07b)',
                          fontSize: '1rem',
                        }}
                      >
                        <i className={`fa-solid ${clan.icon || 'fa-shield-halved'}`}></i>
                      </span>
                      <span
                        style={{
                          color: 'var(--secondary-gold, #c5a059)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                        }}
                      >
                        ALLIED CLAN
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${clan.title} from favorites`}
                      title="Remove Clan Bookmark"
                      onClick={() =>
                        toggleFavorite({
                          item_id: clan.id,
                          item_type: 'clan',
                          item_title: clan.title,
                        })
                      }
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(153, 27, 27, 0.9)',
                        border: '1px solid var(--primary-crimson-bright, #dc2626)',
                        color: 'var(--secondary-gold-bright, #e5c07b)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        boxShadow: '0 0 10px rgba(220, 38, 38, 0.5)',
                      }}
                    >
                      <i className="fa-solid fa-bookmark"></i>
                    </button>
                  </div>
                )}

                {/* Clan Information Body */}
                <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading, "Long Shot", sans-serif)',
                        fontSize: '1.4rem',
                        color: 'var(--text-cream, #f5f0eb)',
                        letterSpacing: '0.8px',
                        margin: 0,
                      }}
                    >
                      {clan.title}
                    </h3>
                    <div style={{ color: 'var(--secondary-gold, #c5a059)', fontSize: '0.85rem', marginTop: '2px' }}>
                      {clan.kanji}
                    </div>
                  </div>

                  <p
                    style={{
                      color: 'var(--text-muted, #a8a29e)',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      margin: '0 0 16px',
                      flex: 1,
                    }}
                  >
                    {clan.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                    {clan.badges &&
                      clan.badges.slice(0, 2).map((b, idx) => (
                        <span key={idx} className="c-meta-badge" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>
                          <i className={`fa-solid ${b.icon}`} style={{ marginRight: '4px' }}></i>
                          {b.text}
                        </span>
                      ))}
                    {clan.badge1 && (
                      <span className="s-badge" style={{ fontSize: '0.75rem' }}>
                        <i className="fa-solid fa-shield" style={{ marginRight: '4px' }}></i> {clan.badge1}
                      </span>
                    )}
                    {clan.badge2 && (
                      <span className="s-badge" style={{ fontSize: '0.75rem' }}>
                        {clan.badge2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="db-empty-state manga-panel"
            style={{
              padding: '48px 30px',
              textAlign: 'center',
              background: 'rgba(14, 14, 14, 0.7)',
              borderRadius: '12px',
              border: '1px dashed var(--border-subtle, rgba(255, 255, 255, 0.15))',
            }}
          >
            <i
              className="fa-solid fa-shield-halved"
              style={{ fontSize: '2.5rem', color: 'var(--text-dim, #78716c)', marginBottom: '14px' }}
            ></i>
            <h3
              style={{
                fontFamily: 'var(--font-heading, "Long Shot", sans-serif)',
                fontSize: '1.5rem',
                color: 'var(--text-cream, #f5f0eb)',
                letterSpacing: '1px',
                marginBottom: '8px',
              }}
            >
              NO CLANS BOOKMARKED YET
            </h3>
            <p
              style={{
                color: 'var(--text-muted, #a8a29e)',
                maxWidth: '480px',
                margin: '0 auto 20px',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}
            >
              Visit the Ancestral Codex to bookmark noble bloodlines and allied clan bastions to your profile.
            </p>
            <Link
              to="/clans"
              className="card-inspect-btn"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className="fa-solid fa-shield-halved"></i> EXPLORE ANCESTRAL CODEX
            </Link>
          </div>
        )}
      </section>

      {/* SECTION 3: Bookmarked Shinobi Villages Section */}
      <section style={{ maxWidth: '1280px', margin: '50px auto 0', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.07))',
            paddingBottom: '16px',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-heading, "Long Shot", sans-serif)',
                fontSize: '1.8rem',
                color: 'var(--text-cream, #f5f0eb)',
                letterSpacing: '1px',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <i className="fa-solid fa-landmark" style={{ color: '#f97316' }}></i>
              BOOKMARKED SHINOBI VILLAGES • お気に入り里
            </h2>
            <p style={{ color: 'var(--text-muted, #a8a29e)', margin: '4px 0 0', fontSize: '0.9rem' }}>
              Your sovereign hidden village strongholds across the Five Great Nations.
            </p>
          </div>

          <Link
            to="/villages"
            className="card-inspect-btn"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
            }}
          >
            <i className="fa-solid fa-compass"></i> EXPLORE SHINOBI ATLAS
          </Link>
        </div>

        {favsLoading || villageLoading ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--secondary-gold, #c5a059)' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
            Loading village bookmarks...
          </div>
        ) : favoritedVillageRecords.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {favoritedVillageRecords.map((village) => (
              <div
                key={village.id}
                className="manga-panel"
                style={{
                  background: 'linear-gradient(145deg, rgba(17, 17, 17, 0.95), rgba(10, 10, 10, 0.95))',
                  border: '1px solid rgba(249, 115, 22, 0.35)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
              >
                {/* Visual Header Image */}
                <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                  <img
                    src={village.image}
                    alt={village.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(20%) contrast(1.1)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(14, 14, 14, 1) 0%, rgba(14, 14, 14, 0.2) 70%)',
                    }}
                  ></div>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '12px',
                      background: 'rgba(249, 115, 22, 0.8)',
                      color: '#f5f0eb',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {village.eraTag || 'SOVEREIGN VILLAGE'}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${village.title} from favorites`}
                    title="Remove Village Bookmark"
                    onClick={() =>
                      toggleFavorite({
                        item_id: village.id,
                        item_type: 'village',
                        item_title: village.title,
                        item_image: village.image,
                      })
                    }
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(153, 27, 27, 0.9)',
                      border: '1px solid var(--primary-crimson-bright, #dc2626)',
                      color: 'var(--secondary-gold-bright, #e5c07b)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      boxShadow: '0 0 10px rgba(220, 38, 38, 0.5)',
                    }}
                  >
                    <i className="fa-solid fa-bookmark"></i>
                  </button>
                </div>

                {/* Village Body */}
                <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading, "Long Shot", sans-serif)',
                        fontSize: '1.4rem',
                        color: 'var(--text-cream, #f5f0eb)',
                        letterSpacing: '0.8px',
                        margin: 0,
                      }}
                    >
                      {village.title}
                    </h3>
                    <div style={{ color: 'var(--secondary-gold, #c5a059)', fontSize: '0.85rem', marginTop: '2px' }}>
                      {village.kanji}
                    </div>
                  </div>

                  <p
                    style={{
                      color: 'var(--text-muted, #a8a29e)',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      margin: '0 0 16px',
                      flex: 1,
                    }}
                  >
                    {village.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                    {village.metaBadges &&
                      village.metaBadges.slice(0, 3).map((b, idx) => (
                        <span key={idx} className="c-meta-badge" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>
                          <i className={`fa-solid ${b.icon}`} style={{ marginRight: '4px' }}></i>
                          {b.text}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="db-empty-state manga-panel"
            style={{
              padding: '48px 30px',
              textAlign: 'center',
              background: 'rgba(14, 14, 14, 0.7)',
              borderRadius: '12px',
              border: '1px dashed var(--border-subtle, rgba(255, 255, 255, 0.15))',
            }}
          >
            <i
              className="fa-solid fa-landmark"
              style={{ fontSize: '2.5rem', color: 'var(--text-dim, #78716c)', marginBottom: '14px' }}
            ></i>
            <h3
              style={{
                fontFamily: 'var(--font-heading, "Long Shot", sans-serif)',
                fontSize: '1.5rem',
                color: 'var(--text-cream, #f5f0eb)',
                letterSpacing: '1px',
                marginBottom: '8px',
              }}
            >
              NO SHINOBI VILLAGES BOOKMARKED YET
            </h3>
            <p
              style={{
                color: 'var(--text-muted, #a8a29e)',
                maxWidth: '480px',
                margin: '0 auto 20px',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}
            >
              Explore the Shinobi World Atlas to bookmark sovereign hidden villages to your profile.
            </p>
            <Link
              to="/villages"
              className="card-inspect-btn"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className="fa-solid fa-compass"></i> EXPLORE SHINOBI ATLAS
            </Link>
          </div>
        )}
      </section>

      {/* SECTION 4: Bookmarked Tailed Beasts Section */}
      <section style={{ maxWidth: '1280px', margin: '50px auto 0', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.07))',
            paddingBottom: '16px',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-heading, "Long Shot", sans-serif)',
                fontSize: '1.8rem',
                color: 'var(--text-cream, #f5f0eb)',
                letterSpacing: '1px',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <i className="fa-solid fa-fire-flame-curved" style={{ color: '#ec4899' }}></i>
              BOOKMARKED TAILED BEASTS • お気に入り尾獣
            </h2>
            <p style={{ color: 'var(--text-muted, #a8a29e)', margin: '4px 0 0', fontSize: '0.9rem' }}>
              Your catalog of primordial chakra titans and living calamities.
            </p>
          </div>

          <Link
            to="/villages"
            className="card-inspect-btn"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
            }}
          >
            <i className="fa-solid fa-fire"></i> EXPLORE TAILED BEASTS
          </Link>
        </div>

        {favsLoading ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--secondary-gold, #c5a059)' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
            Loading tailed beast bookmarks...
          </div>
        ) : favoritedBijuuRecords.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {favoritedBijuuRecords.map((bijuu) => (
              <div
                key={bijuu.id}
                className="manga-panel"
                style={{
                  background: 'linear-gradient(145deg, rgba(17, 17, 17, 0.95), rgba(10, 10, 10, 0.95))',
                  border: '1px solid rgba(236, 72, 153, 0.35)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
              >
                {/* Visual Header Image */}
                <div style={{ position: 'relative', height: '170px', overflow: 'hidden', background: '#0a0a0a' }}>
                  <img
                    src={bijuu.image}
                    alt={bijuu.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '8px',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(14, 14, 14, 0.9) 0%, rgba(14, 14, 14, 0.1) 60%)',
                      pointerEvents: 'none',
                    }}
                  ></div>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '12px',
                      background: 'rgba(153, 27, 27, 0.85)',
                      color: '#f5f0eb',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {bijuu.tailNum}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${bijuu.name} from favorites`}
                    title="Remove Tailed Beast Bookmark"
                    onClick={() =>
                      toggleFavorite({
                        item_id: bijuu.id,
                        item_type: 'bijuu',
                        item_title: `${bijuu.name} (${bijuu.tailNum})`,
                        item_image: bijuu.image,
                      })
                    }
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(153, 27, 27, 0.9)',
                      border: '1px solid var(--primary-crimson-bright, #dc2626)',
                      color: 'var(--secondary-gold-bright, #e5c07b)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      boxShadow: '0 0 10px rgba(220, 38, 38, 0.5)',
                    }}
                  >
                    <i className="fa-solid fa-bookmark"></i>
                  </button>
                </div>

                {/* Beast Body */}
                <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading, "Long Shot", sans-serif)',
                          fontSize: '1.4rem',
                          color: 'var(--text-cream, #f5f0eb)',
                          letterSpacing: '0.8px',
                          margin: 0,
                        }}
                      >
                        {bijuu.name}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: '#ec4899', fontWeight: 600 }}>
                        {bijuu.tailKanji}
                      </span>
                    </div>
                    <div style={{ color: 'var(--secondary-gold, #c5a059)', fontSize: '0.8rem', marginTop: '2px' }}>
                      {bijuu.kanjiTitle}
                    </div>
                  </div>

                  <p
                    style={{
                      color: 'var(--text-muted, #a8a29e)',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      margin: '0 0 14px',
                      flex: 1,
                    }}
                  >
                    {bijuu.synopsis}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                    {bijuu.historicalVillage && (
                      <span className="c-meta-badge" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>
                        <i className="fa-solid fa-landmark" style={{ marginRight: '4px' }}></i>
                        {bijuu.historicalVillage}
                      </span>
                    )}
                    {bijuu.domainTag && (
                      <span className="s-badge" style={{ fontSize: '0.75rem' }}>
                        <i className="fa-solid fa-shield-halved" style={{ marginRight: '4px' }}></i>
                        {bijuu.domainTag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="db-empty-state manga-panel"
            style={{
              padding: '48px 30px',
              textAlign: 'center',
              background: 'rgba(14, 14, 14, 0.7)',
              borderRadius: '12px',
              border: '1px dashed var(--border-subtle, rgba(255, 255, 255, 0.15))',
            }}
          >
            <i
              className="fa-solid fa-fire-flame-curved"
              style={{ fontSize: '2.5rem', color: 'var(--text-dim, #78716c)', marginBottom: '14px' }}
            ></i>
            <h3
              style={{
                fontFamily: 'var(--font-heading, "Long Shot", sans-serif)',
                fontSize: '1.5rem',
                color: 'var(--text-cream, #f5f0eb)',
                letterSpacing: '1px',
                marginBottom: '8px',
              }}
            >
              NO TAILED BEASTS BOOKMARKED YET
            </h3>
            <p
              style={{
                color: 'var(--text-muted, #a8a29e)',
                maxWidth: '480px',
                margin: '0 auto 20px',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}
            >
              Explore the Nine Tailed Beasts chronicle to bookmark primordial chakra titans to your profile.
            </p>
            <Link
              to="/villages"
              className="card-inspect-btn"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className="fa-solid fa-fire"></i> EXPLORE TAILED BEASTS
            </Link>
          </div>
        )}
      </section>

      {/* Classified Dossier Detail Modal */}
      <ShinobiDetailModal shinobi={selectedShinobi} onClose={() => setSelectedShinobi(null)} />
    </main>
  );
}

export default ProfilePage;
