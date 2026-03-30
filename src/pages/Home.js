import React from 'react';
import { Link } from 'react-router-dom';
import { useSanity } from '../hooks/useSanity';
import { HOME_QUERY } from '../lib/queries';
import Loader from '../components/Loader';
import './Home.css';

const FALLBACK = {
  hero: {
    heroLabel: 'AI-Powered Agency · Est. 2024',
    heroHeading: 'We Build|Intelligent|Experiences',
    heroSubheading: "Intellipaat fuses artificial intelligence with strategic design to create digital products that don't just look stunning — they think, adapt, and perform.",
    heroStats: [
      { value: '150+', label: 'Projects Shipped' },
      { value: '98%',  label: 'Client Satisfaction' },
      { value: '40+',  label: 'Team Members' },
    ],
  },
  logos: ['Vercel','Stripe','Notion','Linear','Figma','Loom','Supabase','Railway'].map(n => ({ name: n, _id: n })),
  bentoCards: [
    { _id:'1', title:'LLM Integration',   description:'Embed powerful language models directly into your product workflows.', cardType:'regular', iconName:'ai' },
    { _id:'2', title:'150+',              description:'Projects shipped with a 98% client satisfaction rate across 12 countries.', cardType:'accent', iconName:'flash' },
    { _id:'3', title:'AI Security Layer', description:'Enterprise-grade guardrails and compliance frameworks baked into every deployment.', cardType:'regular', iconName:'security' },
    { _id:'4', title:'Rapid Prototyping', description:'From concept to clickable prototype in 72 hours. Ship faster without sacrificing quality.', cardType:'regular', iconName:'rocket' },
  ],
};

const barHeights = [40,60,85,70,50,100,75,55,40,90];
const barTypes   = ['','','hi','md','','hi','md','','','hi'];
const swatches   = [
  { color:'#ccff00', name:'Lime Accent',   hex:'#CCFF00' },
  { color:'#10b981', name:'Emerald',       hex:'#10B981' },
  { color:'#0c0c0c', name:'Obsidian',      hex:'#0C0C0C', border:true },
  { color:'#ebebeb', name:'Primary White', hex:'#EBEBEB' },
];

const ICONS = {
  analytics: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  design:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  ai:        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V5"/><path d="M8 5h8"/><circle cx="12" cy="3" r="1"/><path d="M7 15h.01"/><path d="M12 15h.01"/><path d="M17 15h.01"/></svg>,
  flash:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  security:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  rocket:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
};

export default function Home() {
  const { data, loading, error } = useSanity(HOME_QUERY, {}, null);
  if (loading) return <Loader message="Loading homepage..." />;

  const hero       = data?.hero        || FALLBACK.hero;
  const logos      = data?.logos?.length  ? data.logos      : FALLBACK.logos;
  const bentoCards = data?.bentoCards?.length ? data.bentoCards : FALLBACK.bentoCards;
  const headingLines = (hero.heroHeading || 'We Build|Intelligent|Experiences').split('|');

  return (
    <div className="home-page">
      {error && (
        <div className="sanity-notice">
          Using static content — connect Sanity to go live
        </div>
      )}

      <section className="hero">
        <div className="hero-left">
          <div className="ai-label">
            <span className="ai-label-dot" />
            {hero.heroLabel || 'AI-Powered Agency · Est. 2024'}
          </div>
          <h1 className="hero-heading">
            {headingLines[0]}<br />
            <em>{headingLines[1]}</em><br />
            {headingLines[2]}
          </h1>
          <p className="hero-sub">{hero.heroSubheading}</p>
          <div className="hero-actions">
            <Link to="/work" className="btn-lime">Start a Project &rarr;</Link>
            <Link to="/process" className="btn-ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Watch Reel
            </Link>
          </div>
          <div className="hero-stats">
            {(hero.heroStats || FALLBACK.hero.heroStats).map((s) => (
              <div className="stat-item" key={s.label}>
                <div className="stat-num">{s.value || s.number}<span /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="floating-card-sm fc2">
            <div className="fc-label">Model Accuracy</div>
            <div className="fc-val">99.2%</div>
          </div>
          <div className="mockup-shell">
            <div className="ai-cursor-tag">AI Active</div>
            <div className="mockup-header">
              <span className="mockup-title">INTELLIPAAT DASH</span>
              <div className="mockup-dots"><span className="d1"/><span className="d2"/><span className="d3"/></div>
            </div>
            <div className="mini-chart">
              <div className="chart-label">Revenue Growth — Q4 2024</div>
              <div className="chart-bars">
                {barHeights.map((h,i) => <div key={i} className={`bar ${barTypes[i]}`} style={{height:`${h}%`}}/>)}
              </div>
            </div>
            <div className="mockup-metric">
              <div><div className="metric-name">Monthly Active Users</div><div className="metric-val">284,912</div></div>
              <div className="metric-badge">24.3%</div>
            </div>
            <div className="mockup-metric">
              <div><div className="metric-name">AI Inference Speed</div><div className="metric-val">12ms</div></div>
              <div className="metric-badge">3.1%</div>
            </div>
          </div>
          <div className="floating-card-sm fc1">
            <div className="fc-label">NPS Score</div>
            <div className="fc-val">94</div>
          </div>
        </div>
      </section>

      <div className="logos-strip">
        <div className="logos-label">Trusted by</div>
        <div className="logos-scroll-wrap">
          <div className="logos-scroll">
            {[...logos, ...logos].map((l,i) => <span className="logo-item" key={i}>{l.name}</span>)}
          </div>
        </div>
      </div>

      <section className="bento-section page-content">
        <div className="section-label">{'// What We Do'}</div>
        <h2 className="section-title">Built for the<br/><em>intelligence era</em></h2>
        <div className="bento-grid">
          <div className="bcard bcard-lg glass-card">
            <div className="bcard-icon">{ICONS.analytics}</div>
            <div className="bcard-title">Real-Time AI Analytics</div>
            <div className="bcard-desc">Transform raw data streams into actionable intelligence with our embedded ML pipelines. Live dashboards that predict before problems arise.</div>
            <div className="data-bars">
              {barHeights.map((h,i) => <div key={i} className={`data-bar ${barTypes[i]}`} style={{height:`${h}%`}}/>)}
            </div>
          </div>
          <div className="bcard bcard-tall glass-card">
            <div className="bcard-icon">{ICONS.design}</div>
            <div className="bcard-title">Design Systems</div>
            <div className="bcard-desc">Scalable, tokenized design systems that keep your product cohesive across every touchpoint.</div>
            <div className="swatches">
              {swatches.map((s) => (
                <div className="swatch" key={s.hex}>
                  <div className="swatch-dot" style={{background:s.color, border: s.border?'1px solid rgba(255,255,255,0.2)':'none'}}/>
                  <div>
                    <div className="swatch-name">{s.name}</div>
                    <div className="swatch-hex">{s.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {bentoCards.map((card) => (
            <div key={card._id} className={`bcard glass-card ${card.cardType === 'accent' ? 'bcard-accent' : ''}`}>
              <div className="bcard-icon">{ICONS[card.iconName] || ICONS.flash}</div>
              <div className="bcard-title">{card.title}</div>
              <div className="bcard-desc">{card.description}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="home-cta-row page-content" style={{paddingTop:0}}>
        <Link to="/services" className="btn-lime">Explore Services &rarr;</Link>
        <Link to="/work" className="btn-ghost">View Our Work</Link>
      </div>
    </div>
  );
}
