import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSanity } from '../hooks/useSanity';
import { SERVICES_QUERY } from '../lib/queries';
import Loader from '../components/Loader';
import './Services.css';

const ICONS = {
  brain:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  palette:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  code:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  cpu:      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  database: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  trendUp:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
};

const FALLBACK = [
  { _id:'1', number:'01', title:'AI Product Strategy',    iconName:'brain',    description:"We help you identify where AI creates genuine value — not where it's just a buzzword. Roadmaps, OKRs, and investment theses included.", tags:['Strategy','Roadmap','OKRs'], details:"Our strategic framework maps every AI touchpoint to measurable business outcomes.", deliverables:['AI Opportunity Audit','Product Roadmap','OKR Framework','Investment Thesis'] },
  { _id:'2', number:'02', title:'UX & Interface Design',  iconName:'palette',  description:'Interfaces that feel inevitable. We design for clarity, speed, and delight — using real user data to drive every pixel decision.',   tags:['Figma','Prototyping','Research'], details:'From zero-to-one product design to scaling design systems for enterprise teams.', deliverables:['User Research Report','Information Architecture','High-Fidelity Prototypes','Design System'] },
  { _id:'3', number:'03', title:'Full-Stack Engineering', iconName:'code',     description:'Production-grade code from day one. React, Next.js, Python, and cloud-native architectures built to scale to millions of users.',  tags:['Next.js','Python','AWS'], details:'Our engineering team ships clean, documented, and tested code.', deliverables:['Technical Architecture','Frontend Application','Backend APIs','CI/CD Pipeline'] },
  { _id:'4', number:'04', title:'ML Model Development',  iconName:'cpu',      description:'Custom models trained on your proprietary data. From computer vision to NLP — we own the full pipeline from data prep to inference.', tags:['PyTorch','Fine-tuning','MLOps'], details:'We build, fine-tune and deploy ML models purpose-fit to your domain.', deliverables:['Data Pipeline','Trained Model','Inference API','Monitoring Dashboard'] },
  { _id:'5', number:'05', title:'Data Infrastructure',   iconName:'database', description:"Real-time data lakes, ETL pipelines, and warehouse architectures that make your data actually useful — not just stored.",           tags:['Snowflake','dbt','Kafka'], details:'From streaming ingestion to business intelligence — we design data architectures.', deliverables:['Data Architecture Blueprint','ETL Pipelines','Data Warehouse','BI Dashboards'] },
  { _id:'6', number:'06', title:'Growth & Analytics',    iconName:'trendUp',  description:'Instrumentation, attribution modeling, A/B testing frameworks and AI-driven personalization engines that compound over time.',       tags:['Analytics','A/B Testing','Attribution'], details:'We instrument your product end-to-end and build multi-touch attribution models.', deliverables:['Analytics Instrumentation','Attribution Model','A/B Testing Framework','Growth Playbook'] },
];

const PRICING = [
  { name:'Sprint',   price:'$12k', period:'/2-week sprint', desc:'Focused delivery blocks for discrete features or investigations.' },
  { name:'Retainer', price:'$28k', period:'/month',          desc:'Dedicated team embedded in your roadmap, long-term.' },
  { name:'Project',  price:'Custom', period:'',              desc:'Fixed-scope engagements with milestone-based billing.' },
];

export default function Services() {
  const { data: rawServices, loading, error } = useSanity(SERVICES_QUERY, {}, null);
  const [active, setActive] = useState(null);

  if (loading) return <Loader message="Loading services..." />;

  const services = rawServices?.length ? rawServices : FALLBACK;

  return (
    <div className="services-page">
      <div className="page-hero">
        <div className="ai-label"><span className="ai-label-dot" /> Services Portfolio</div>
        <h1 className="page-hero-title">What we<br/><em>deliver</em></h1>
        <p className="page-hero-sub">Six core capabilities that cover the full spectrum — from strategy through to production infrastructure.</p>
      </div>

      <div className="page-content" style={{paddingTop:0}}>
        {error && !rawServices && (
          <div className="cms-notice">Showing static content — connect Sanity to manage services from the CMS.</div>
        )}
        <div className="services-grid">
          {services.map(s => (
            <div key={s._id} className={`service-card glass-card${active===s._id?' expanded':''}`} onClick={() => setActive(active===s._id ? null : s._id)}>
              <div className="service-icon-wrap">{ICONS[s.iconName] || ICONS.brain}</div>
              <div className="service-num">{s.number} &mdash;</div>
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.description}</div>
              <div className="service-tags">{s.tags?.map(t => <span className="tag" key={t}>{t}</span>)}</div>
              {active === s._id && (
                <div className="service-expanded">
                  <p className="service-detail-text">{s.details}</p>
                  <div className="deliverables-label">Deliverables</div>
                  <div className="deliverables-list">
                    {s.deliverables?.map(d => (
                      <div className="deliverable-item" key={d}>
                        <span className="deliverable-check">&#10003;</span> {d}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="service-expand-hint">{active===s._id ? '&#8593; Collapse' : '&#8595; Learn more'}</div>
            </div>
          ))}
        </div>

        <div className="pricing-strip glass-card">
          <div>
            <div className="section-label">{'// Engagement Models'}</div>
            <h3 className="pricing-title">Choose how we<br/><em>work together</em></h3>
          </div>
          <div className="pricing-tiers">
            {PRICING.map(tier => (
              <div className="pricing-tier" key={tier.name}>
                <div className="tier-name">{tier.name}</div>
                <div className="tier-price">{tier.price}<span>{tier.period}</span></div>
                <div className="tier-desc">{tier.desc}</div>
              </div>
            ))}
          </div>
          <Link to="/work" className="btn-lime">Get a Proposal &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
