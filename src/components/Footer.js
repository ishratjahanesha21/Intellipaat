import React from 'react';
import { Link } from 'react-router-dom';
import { useSanity } from '../hooks/useSanity';
import { SETTINGS_QUERY } from '../lib/queries';

export default function Footer() {
  const { data: settings } = useSanity(SETTINGS_QUERY, {}, null);

  const siteName     = settings?.siteName       || 'Intellipaat';
  const ctaSubtitle  = settings?.footerCtaSubtitle || '// Ready to Build?';
  const ctaLines     = (settings?.footerCta || "Let's make|something great").split('|');
  const ctaBtn       = settings?.footerCtaButton   || 'Start Your Project →';
  const socialX      = settings?.socialX        || 'https://x.com';
  const socialLI     = settings?.socialLinkedIn || 'https://linkedin.com';
  const socialGH     = settings?.socialGithub   || 'https://github.com';
  const socialDR     = settings?.socialDribbble || 'https://dribbble.com';
  const year         = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-watermark">{siteName.toUpperCase()}</div>
      <div className="footer-cta">
        <div className="footer-cta-label">{ctaSubtitle}</div>
        <h2 className="footer-cta-title">
          {ctaLines[0]}<br/>
          <em>{ctaLines[1]}</em>
        </h2>
        <Link to="/work" className="btn-cta-big"><span>{ctaBtn}</span></Link>
      </div>
      <div className="footer-bottom">
        <div className="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#cookies">Cookies</a>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="footer-socials">
          <a className="social-icon" href={socialX}  target="_blank" rel="noreferrer">𝕏</a>
          <a className="social-icon" href={socialLI}  target="_blank" rel="noreferrer">in</a>
          <a className="social-icon" href={socialGH}  target="_blank" rel="noreferrer">gh</a>
          <a className="social-icon" href={socialDR}  target="_blank" rel="noreferrer">dr</a>
        </div>
        <div className="footer-copy">© {year} {siteName}. All rights reserved.</div>
      </div>
    </footer>
  );
}
