import React, { useState } from 'react';
import { useSanity } from '../hooks/useSanity';
import { WORK_QUERY } from '../lib/queries';
import { urlFor } from '../lib/sanityClient';
import Loader from '../components/Loader';
import './Work.css';

const FILTERS = ['All','AI/ML','Web App','Design System','Data'];

const FALLBACK = [
  { _id:'1', title:'Nexus Health Platform',  category:'AI/ML',         tags:['AI/ML','Web App'],         year:'2024', description:'A full-stack AI-powered health analytics platform processing 2M+ patient records daily with real-time anomaly detection.', metric:'2M+ records/day', accent:true,  tech:['PyTorch','Next.js','AWS','PostgreSQL'],        image:{ url:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&auto=format&fit=crop' }},
  { _id:'2', title:'Orbital Design System',  category:'Design System', tags:['Design System'],           year:'2024', description:'A 400+ component design system built for a Series B fintech — reducing designer handoff time by 60%.', metric:'400+ components', accent:false, tech:['Figma','React','Storybook','Tokens Studio'],       image:{ url:'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&auto=format&fit=crop' }},
  { _id:'3', title:'DataLens Analytics',     category:'Data',          tags:['Data','Web App'],          year:'2024', description:'Real-time BI dashboard for a logistics company — integrating 14 data sources into a single queryable interface.', metric:'14 sources unified', accent:false, tech:['dbt','Snowflake','Metabase','Kafka'],           image:{ url:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop' }},
  { _id:'4', title:'Conversara LLM App',     category:'AI/ML',         tags:['AI/ML','Web App'],         year:'2023', description:'Multi-agent conversational platform enabling enterprise teams to query internal knowledge bases using natural language.', metric:'99ms avg latency', accent:false, tech:['LangChain','Pinecone','FastAPI','React'],       image:{ url:'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80&auto=format&fit=crop' }},
  { _id:'5', title:'Meridian E-Commerce',    category:'Web App',       tags:['Web App','Design System'], year:'2023', description:'Ground-up rebuild of a $40M/year e-commerce brand — new design system, headless commerce stack, and AI-driven recommendations.', metric:'+31% conversion', accent:true, tech:['Next.js','Shopify','Algolia','Tailwind'],     image:{ url:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&auto=format&fit=crop' }},
  { _id:'6', title:'Vantage ML Pipeline',    category:'AI/ML',         tags:['AI/ML','Data'],            year:'2023', description:'End-to-end MLOps pipeline for a climate-tech startup — automating model retraining, drift detection and production deployment.', metric:'6h to 40min retraining', accent:false, tech:['MLflow','Airflow','GCP','Terraform'], image:{ url:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80&auto=format&fit=crop' }},
];

const STATS = [
  { num:'150+', label:'Projects Shipped' },
  { num:'$2B+', label:'Client Revenue Influenced' },
  { num:'12',   label:'Countries' },
  { num:'98%',  label:'Retention Rate' },
];

function getImg(proj) {
  if (!proj.image) return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80';
  if (proj.image.url)   return proj.image.url;
  if (proj.image.asset) return urlFor(proj.image).width(600).auto('format').url();
  return '';
}

export default function Work() {
  const { data: raw, loading, error } = useSanity(WORK_QUERY, {}, null);
  const [filter, setFilter] = useState('All');

  if (loading) return <Loader message="Loading portfolio..." />;

  const projects = raw?.length ? raw : FALLBACK;
  const filtered = filter === 'All' ? projects : projects.filter(p => p.tags?.includes(filter));

  return (
    <div className="work-page">
      <div className="page-hero">
        <div className="ai-label"><span className="ai-label-dot" /> Selected Work</div>
        <h1 className="page-hero-title">Proof in<br/><em>production</em></h1>
        <p className="page-hero-sub">A curated selection of our most impactful work — across AI, design, data, and full-stack engineering.</p>
      </div>

      <div className="page-content" style={{paddingTop:0}}>
        <div className="filter-bar">
          {FILTERS.map(f => (
            <button key={f} className={`filter-btn${filter===f?' active':''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>

        {error && !raw && (
          <div className="cms-notice">Showing static content — connect Sanity to manage projects from the CMS.</div>
        )}

        <div className="work-grid">
          {filtered.map(p => (
            <div key={p._id} className={`work-card glass-card${p.accent?' work-card-accent':''}`}>
              <div className="work-card-top">
                <div className="work-tags">{p.tags?.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                <div className="work-year">{p.year}</div>
              </div>
              <div className="work-card-visual">
                <img src={getImg(p)} alt={p.title} className="work-card-img" loading="lazy"/>
                <div className="work-card-img-overlay"/>
              </div>
              <div className="work-metric">{p.metric}</div>
              <h3 className="work-title">{p.title}</h3>
              <p className="work-desc">{p.description || p.desc}</p>
              <div className="work-tech">{p.tech?.map(t => <span className="tag" key={t}>{t}</span>)}</div>
              <div className="work-cta">
                {p.caseStudyUrl
                  ? <a href={p.caseStudyUrl} target="_blank" rel="noreferrer">View Case Study &rarr;</a>
                  : 'View Case Study \u2192'}
              </div>
            </div>
          ))}
        </div>

        <div className="work-stats glass-card">
          {STATS.map(s => (
            <div className="work-stat" key={s.label}>
              <div className="work-stat-num">{s.num}</div>
              <div className="work-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
