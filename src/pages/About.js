import React from 'react';
import { useSanity } from '../hooks/useSanity';
import { ABOUT_QUERY } from '../lib/queries';
import { urlFor } from '../lib/sanityClient';
import Loader from '../components/Loader';
import './About.css';

const VALUE_ICONS = {
  clock: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  bars:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  eye:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  flash: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
};

const FALLBACK_MISSION = {
  missionHeading: 'We believe AI should work for everyone, not just the few',
  missionBody1: 'Founded in 2021, Intellipaat was built on a simple conviction: the gap between what AI can do and what most businesses actually ship is embarrassingly wide — and we exist to close it.',
  missionBody2: 'We partner with ambitious teams — from seed-stage startups to public companies — to design, build and deploy AI-powered products that change how people work and live.',
};

const FALLBACK_VALUES = [
  { _id:'1', title:'Outcomes Over Outputs', description:'We measure success by the impact on your business, not the features we shipped.', iconName:'clock' },
  { _id:'2', title:'Evidence-Driven',       description:'Every decision starts with data — not assumptions, trends, or gut instinct.',      iconName:'bars'  },
  { _id:'3', title:'Radical Transparency',  description:'We share problems as soon as we find them. No surprises at the end of a sprint.',  iconName:'eye'   },
  { _id:'4', title:'Bias to Action',        description:"We move fast, ship early, and learn from production — not from Confluence docs.",   iconName:'flash' },
];

const FALLBACK_TEAM = [
  { _id:'1', name:'Arjun Mehta',  role:'Founder & CEO',        bio:'Former ML lead at Google Brain. 12 years building AI systems at scale.',               tags:['Strategy','ML','Vision'],             image:{ url:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&crop=face' }},
  { _id:'2', name:'Layla Hassan', role:'Design Director',       bio:'Led design at Stripe and Linear. Obsessed with reducing friction in complex systems.',  tags:['UX','Systems','Research'],            image:{ url:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop&crop=face' }},
  { _id:'3', name:'Devon Park',   role:'CTO',                  bio:'Built infrastructure for 50M+ user platforms. Loves distributed systems and clean APIs.',tags:['Engineering','Architecture','DevOps'], image:{ url:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop&crop=face' }},
  { _id:'4', name:'Sasha Volkov', role:'Head of Data Science', bio:'PhD in Statistics, ex-Palantir. Turns messy data into business-critical signals.',       tags:['ML','Data','Analytics'],              image:{ url:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop&crop=face' }},
  { _id:'5', name:'Nadia Chen',   role:'Engineering Lead',     bio:'10 years full-stack. Shipped products used by millions across fintech and health.',       tags:['React','Python','AWS'],               image:{ url:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop&crop=face' }},
  { _id:'6', name:'Oscar Diaz',   role:'Product Strategist',   bio:'Former PM at Notion and Figma. Bridges the gap between user needs and business goals.',   tags:['Strategy','PM','Growth'],             image:{ url:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop&crop=face' }},
];

const FALLBACK_STATS = [
  { number:'2021', label:'Founded' }, { number:'40+', label:'Team Size' },
  { number:'12',   label:'Countries' }, { number:'150+', label:'Projects' },
  { number:'$2B+', label:'Value Created' },
];

function getPhotoUrl(member) {
  if (!member.image) return null;
  if (member.image.url)   return member.image.url;
  if (member.image.asset) return urlFor(member.image).width(200).height(200).auto('format').url();
  return null;
}

export default function About() {
  const { data, loading } = useSanity(ABOUT_QUERY, {}, null);
  if (loading) return <Loader message="Loading team..." />;

  const mission = data?.mission  || FALLBACK_MISSION;
  const values  = data?.values?.length ? data.values : FALLBACK_VALUES;
  const team    = data?.team?.length   ? data.team   : FALLBACK_TEAM;
  const stats   = data?.stats?.aboutStats || FALLBACK_STATS;

  return (
    <div className="about-page">
      <div className="page-hero">
        <div className="ai-label"><span className="ai-label-dot" /> About Intellipaat</div>
        <h1 className="page-hero-title">Intelligence<br/><em>by design</em></h1>
        <p className="page-hero-sub">We're a 40-person AI agency on a mission to make intelligent software the default — not the exception.</p>
      </div>

      <div className="page-content" style={{paddingTop:0}}>
        <div className="mission-block glass-card">
          <div className="mission-left">
            <div className="section-label">{'// Our Mission'}</div>
            <h2 className="mission-title">{mission.missionHeading}</h2>
          </div>
          <div className="mission-right">
            <p className="mission-body">{mission.missionBody1}</p>
            {mission.missionBody2 && <p className="mission-body" style={{marginTop:'1rem'}}>{mission.missionBody2}</p>}
          </div>
        </div>

        <div style={{margin:'3rem 0'}}>
          <div className="section-label">{'// Our Values'}</div>
          <h2 className="section-title">What we<br/><em>stand for</em></h2>
          <div className="values-grid">
            {values.map(v => (
              <div key={v._id} className="value-card glass-card">
                <div className="value-icon">{VALUE_ICONS[v.iconName] || VALUE_ICONS.flash}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{margin:'3rem 0'}}>
          <div className="section-label">{'// The Team'}</div>
          <h2 className="section-title">People behind<br/><em>the work</em></h2>
          <div className="team-grid">
            {team.map(member => {
              const photo = getPhotoUrl(member);
              return (
                <div key={member._id} className="team-card glass-card">
                  <div className="team-avatar-wrap">
                    {photo
                      ? <img src={photo} alt={member.name} className="team-avatar-img" loading="lazy"/>
                      : <div className="team-avatar-initials">{member.initials || member.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                    }
                  </div>
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <div className="team-bio">{member.bio}</div>
                  <div className="team-tags">{member.tags?.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                  {member.socialLinkedIn && (
                    <a href={member.socialLinkedIn} target="_blank" rel="noreferrer" className="team-linkedin">LinkedIn &rarr;</a>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="about-numbers glass-card">
          {stats.map(n => (
            <div key={n.label} className="about-num-item">
              <div className="about-num">{n.number || n.num}</div>
              <div className="about-num-label">{n.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
