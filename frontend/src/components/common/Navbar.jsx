import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  // Sticky navbar listener
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Close mobile drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`} ref={navRef}>
      <div className="logo">
        <div
          className={`bars ${isMobileOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation Menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleMobileMenu(e);
            }
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
        <Link to="/">
          <img src="/assets/image/logo1.png" alt="Naruto Shippuden Logo" />
        </Link>
      </div>

      <div className={`links ${isMobileOpen ? 'mobile-active is-mobile-open' : ''}`}>
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/villages" className={({ isActive }) => (isActive ? 'active' : '')}>
              VILLAGES
            </NavLink>
          </li>
          <li>
            <NavLink to="/clans" className={({ isActive }) => (isActive ? 'active' : '')}>
              CLANS
            </NavLink>
          </li>
          <li>
            <NavLink to="/archive" className={({ isActive }) => (isActive ? 'active' : '')}>
              SHINOBI ARCHIVE
            </NavLink>
          </li>
          <li>
            <NavLink to="/alliance" className={({ isActive }) => (isActive ? 'active' : '')}>
              ALLIANCE
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
                  PROFILE
                </NavLink>
              </li>
              <li className="mobile-only-nav-item">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileOpen(false);
                    logout();
                  }}
                  className="mobile-nav-logout-btn"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-accent)',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    letterSpacing: '2px',
                    color: '#f87171',
                    padding: '13px 18px',
                    background: 'rgba(153, 27, 27, 0.15)',
                    border: '1px solid var(--border-crimson, rgba(153, 27, 27, 0.45))',
                    borderRadius: '8px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                >
                  <span>LOG OUT</span>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="mobile-only-nav-item">
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <span>LOG IN</span>
                  <i className="fa-solid fa-right-to-bracket" style={{ fontSize: '0.85rem' }}></i>
                </NavLink>
              </li>
              <li className="mobile-only-nav-item">
                <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <span>SIGN UP</span>
                  <i className="fa-solid fa-user-plus" style={{ fontSize: '0.85rem' }}></i>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="log">
        {isAuthenticated && user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              to="/profile"
              className="shinobi-badge"
              title="Access Shinobi Profile & Bookmarks"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--secondary-gold-bright, #e5c07b)',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <i className="fa-solid fa-user-ninja" style={{ color: 'var(--primary-crimson-bright, #dc2626)' }}></i>
              <span className="shinobi-badge-name">{user.username}</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="desktop-logout-btn"
              style={{
                background: 'rgba(153, 27, 27, 0.4)',
                border: '1px solid var(--border-crimson, rgba(153, 27, 27, 0.45))',
                color: 'var(--text-cream, #f5f0eb)',
                padding: '6px 14px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
              }}
              title="Log out from Shinobi Portal"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <nav style={{ display: 'inline' }}>LOG OUT</nav>
            </button>
          </div>
        ) : (
          <Link className="abutton" to="/login">
            <button type="button">
              <i className="fa-regular fa-user fa-xs" style={{ fontWeight: 'bolder' }}></i>
              <nav>LOG IN</nav>
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
