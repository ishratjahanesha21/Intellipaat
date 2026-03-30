import React, { useState } from 'react';
import { useSanity } from '../hooks/useSanity';
import { BLOG_QUERY } from '../lib/queries';
import { urlFor } from '../lib/sanityClient';
import Loader from '../components/Loader';
import './Blog.css';

const CATEGORIES = ['All','AI/ML','Design','Engineering','Strategy'];

const CAT_COLORS = {
  'AI/ML':'#ccff00', 'Design':'#10b981', 'Engineering':'#60a5fa', 'Strategy':'#f59e0b', 'Data':'#a78bfa',
};

const FALLBACK = [
  { _id:'1', category:'AI/ML',      title:'Why Most AI Products Fail in Production',              excerpt:"The gap between a demo and a deployed AI system is wider than most teams expect. Here's what we've learned from 50+ deployments.", authorName:'Arjun Mehta', authorInitials:'AM', publishedAt:'2024-03-12', readTime:'8 min read',  featured:true,  tags:['AI/ML','Strategy'],        image:{ url:'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80&auto=format&fit=crop' }},
  { _id:'2', category:'Design',     title:'Designing for AI Uncertainty: Patterns That Work',     excerpt:"AI outputs are probabilistic. Here's how we design interfaces that communicate confidence and keep users in control.",              authorName:'Layla Hassan', authorInitials:'LH', publishedAt:'2024-02-28', readTime:'6 min read',  featured:false, tags:['Design','AI/ML'],          image:{ url:'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=500&q=80&auto=format&fit=crop' }},
  { _id:'3', category:'Engineering',title:'MLOps at Scale: Lessons from 40M Daily Inferences',   excerpt:'Running ML models in production at scale requires a completely different mindset than training. We share our infrastructure playbook.', authorName:'Devon Park',  authorInitials:'DP', publishedAt:'2024-02-14', readTime:'12 min read', featured:false, tags:['Engineering','AI/ML'],     image:{ url:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80&auto=format&fit=crop' }},
  { _id:'4', category:'Strategy',   title:'The AI Audit: How to Know Where AI Adds Value',       excerpt:"Not every workflow benefits from AI. Our diagnostic framework for separating genuine opportunities from expensive distractions.",    authorName:'Oscar Diaz',  authorInitials:'OD', publishedAt:'2024-01-30', readTime:'7 min read',  featured:false, tags:['Strategy','AI/ML'],        image:{ url:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80&auto=format&fit=crop' }},
  { _id:'5', category:'Design',     title:'Building a Design System That Actually Scales',         excerpt:'Most design systems die in year two. The common failure modes and the architecture decisions that give systems longevity.',          authorName:'Layla Hassan', authorInitials:'LH', publishedAt:'2024-01-16', readTime:'9 min read',  featured:false, tags:['Design'],                  image:{ url:'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&q=80&auto=format&fit=crop' }},
  { _id:'6', category:'Engineering',title:'Real-Time Data Pipelines with Kafka and dbt',          excerpt:'A practical guide to building streaming data pipelines that are observable, testable, and maintainable — even at petabyte scale.',  authorName:'Sasha Volkov', authorInitials:'SV', publishedAt:'2024-01-03', readTime:'11 min read', featured:false, tags:['Engineering','Data'],      image:{ url:'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&q=80&auto=format&fit=crop' }},
  { _id:'7', category:'AI/ML',      title:'Fine-Tuning vs RAG: Choosing the Right Architecture', excerpt:"The two dominant approaches to customising LLMs have very different tradeoffs. Here's how we decide between them.",                  authorName:'Arjun Mehta', authorInitials:'AM', publishedAt:'2023-12-18', readTime:'10 min read', featured:false, tags:['AI/ML'],                  image:{ url:'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=500&q=80&auto=format&fit=crop' }},
  { _id:'8', category:'Strategy',   title:'From 0 to 1: How We Structure Discovery Engagements', excerpt:"Discovery is the most undervalued phase in product development. Our full methodology — questions, artifacts, and decisions.",         authorName:'Oscar Diaz',  authorInitials:'OD', publishedAt:'2023-12-04', readTime:'5 min read',  featured:false, tags:['Strategy'],                image:{ url:'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80&auto=format&fit=crop' }},
];

function imgUrl(item) {
  if (!item.image) return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80';
  if (item.image.url)   return item.image.url;
  if (item.image.asset) return urlFor(item.image).width(800).auto('format').url();
  return '';
}

function fmtDate(str) {
  if (!str) return '';
  try { return new Date(str).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }); }
  catch { return str; }
}

export default function Blog() {
  const { data: raw, loading, error } = useSanity(BLOG_QUERY, {}, null);
  const [cat, setCat]         = useState('All');
  const [email, setEmail]     = useState('');
  const [subbed, setSubbed]   = useState(false);

  if (loading) return <Loader message="Loading articles..." />;

  const posts    = raw?.length ? raw : FALLBACK;
  const featured = posts.find(p => p.featured);
  const filtered = posts.filter(p => {
    if (p.featured) return false;
    return cat === 'All' ? true : p.tags?.includes(cat);
  });

  return (
    <div className="blog-page">
      <div className="page-hero">
        <div className="ai-label"><span className="ai-label-dot" /> The Intellipaat Blog</div>
        <h1 className="page-hero-title">Insights from<br/><em>the field</em></h1>
        <p className="page-hero-sub">Long-form thinking on AI, design, engineering, and strategy — from the people building at the frontier.</p>
      </div>

      <div className="page-content" style={{paddingTop:0}}>
        {featured && (
          <div className="featured-post glass-card">
            <div className="featured-badge">Featured</div>
            <div className="featured-body">
              <div className="featured-meta">
                <span className="post-category-badge" style={{background:`${CAT_COLORS[featured.category]}18`, color:CAT_COLORS[featured.category], borderColor:`${CAT_COLORS[featured.category]}33`}}>{featured.category}</span>
                <span className="post-date">{fmtDate(featured.publishedAt)}</span>
                <span className="post-read">{featured.readTime}</span>
              </div>
              <h2 className="featured-title">{featured.title}</h2>
              <p className="featured-excerpt">{featured.excerpt}</p>
              <div className="post-author">
                <div className="post-author-avatar">{featured.authorInitials}</div>
                <div className="post-author-name">{featured.authorName}</div>
              </div>
              <button className="btn-lime" style={{marginTop:'1.5rem'}}>Read Article &rarr;</button>
            </div>
            <div className="featured-visual">
              <img src={imgUrl(featured)} alt={featured.title} className="featured-img" loading="lazy"/>
              <div className="featured-img-overlay"/>
            </div>
          </div>
        )}

        {error && !raw && (
          <div className="cms-notice">Showing static content — connect Sanity to manage posts from the CMS.</div>
        )}

        <div className="blog-filter-bar">
          {CATEGORIES.map(c => (
            <button key={c} className={`filter-btn${cat===c?' active':''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <div className="posts-grid">
          {filtered.map(post => (
            <article key={post._id} className="post-card glass-card">
              <div className="post-card-image">
                <img src={imgUrl(post)} alt={post.title} className="post-img" loading="lazy"/>
                <div className="post-img-overlay"/>
                <span className="post-category-badge post-category-over" style={{background:`${CAT_COLORS[post.category]}22`, color:CAT_COLORS[post.category], borderColor:`${CAT_COLORS[post.category]}44`}}>{post.category}</span>
              </div>
              <div className="post-card-body">
                <div className="post-top"><span className="post-read">{post.readTime}</span></div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-footer">
                  <div className="post-author">
                    <div className="post-author-avatar">{post.authorInitials}</div>
                    <div>
                      <div className="post-author-name">{post.authorName}</div>
                      <div className="post-date-sm">{fmtDate(post.publishedAt)}</div>
                    </div>
                  </div>
                  <button className="post-read-btn">Read &rarr;</button>
                </div>
                <div className="post-tags">{post.tags?.map(t => <span className="tag" key={t}>{t}</span>)}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="newsletter-block">
          <div className="newsletter-inner glass-card">
            <div className="newsletter-left">
              <div className="section-label">{'// Stay Sharp'}</div>
              <h3 className="newsletter-title">New essays, <em>every two weeks</em></h3>
              <p className="newsletter-sub">No fluff. No roundups. Just original thinking on AI, design and engineering — straight to your inbox.</p>
            </div>
            <div className="newsletter-right">
              {subbed ? (
                <div className="subscribed-msg"><span>&#10003;</span> You're on the list. Talk soon.</div>
              ) : (
                <form className="newsletter-form" onSubmit={e => { e.preventDefault(); if(email) setSubbed(true); }}>
                  <input type="email" placeholder="your@email.com" className="newsletter-input" value={email} onChange={e => setEmail(e.target.value)} required/>
                  <button type="submit" className="btn-lime">Subscribe &rarr;</button>
                </form>
              )}
              <div className="newsletter-note">No spam. Unsubscribe anytime.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
