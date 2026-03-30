import React from 'react';
import './Loader.css';

export default function Loader({ message = 'Loading content...' }) {
  return (
    <div className="loader-wrap">
      <div className="loader-inner">
        <div className="loader-bars">
          {[40, 70, 55, 90, 65, 80, 45].map((h, i) => (
            <div key={i} className="loader-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
        <div className="loader-label">{message}</div>
      </div>
    </div>
  );
}

export function ErrorState({ message = 'Failed to load content.', onRetry }) {
  return (
    <div className="error-wrap">
      <div className="error-inner glass-card">
        <div className="error-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div className="error-title">Could not load content</div>
        <div className="error-msg">{message}</div>
        {onRetry && (
          <button className="btn-lime" style={{ marginTop: '1.5rem', fontSize: '0.85rem', padding: '0.7rem 1.5rem' }} onClick={onRetry}>
            Try Again
          </button>
        )}
        <div className="error-hint">
          Make sure your Sanity project ID is set in <code>.env</code> — see <code>SETUP.md</code> for instructions.
        </div>
      </div>
    </div>
  );
}
