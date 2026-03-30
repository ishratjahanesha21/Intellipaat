import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useSanity } from '../hooks/useSanity';
import { SETTINGS_QUERY } from '../lib/queries';
import './Navbar.css';

const DEFAULT_LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Work',     to: '/work'     },
  { label: 'Process',  to: '/process'  },
  { label: 'About',    to: '/about'    },
  { label: 'Blog',     to: '/blog'     },
];

const ROUTE_MAP = {
  Services: '/services', Work: '/work', Process: '/process', About: '/about', Blog: '/blog',
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const { data: settings } = useSanity(SETTINGS_QUERY, {}, null);

  const siteName   = settings?.siteName   || 'Intellipaat';
  const statusLabel = settings?.statusLabel || 'Available';

  /* Build nav links — prefer CMS navLinks if defined, else defaults */
  const navLinks = settings?.navLinks?.length
    ? settings.navLinks.map(l => ({ label: l.label, to: ROUTE_MAP[l.label] || `/${l.label.toLowerCase()}` }))
    : DEFAULT_LINKS;

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div className="logo-box">{siteName[0]}</div>
        <span className="logo-text">{siteName}</span>
      </Link>

      <div className={`nav-pill ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <NavLink
            key={link.to} to={link.to}
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="nav-right">
        <div className="status-tag">
          <div className="pulse-dot" />
          {statusLabel}
        </div>

        {/* ── Theme Toggle ── */}
        <button className="theme-toggle" onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}>
          <div className="toggle-track">
            <div className="toggle-thumb" />
          </div>
          <span className="toggle-icon sun">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </span>
          <span className="toggle-icon moon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </span>
        </button>

        <Link to="/work" className="cta-btn">Get Started</Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
