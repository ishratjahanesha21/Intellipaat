import React, { useState } from 'react';
import { useSanity } from '../hooks/useSanity';
import { PROCESS_QUERY } from '../lib/queries';
import Loader from '../components/Loader';
import './Process.css';

const ICONS = [
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
];

const FALLBACK_PHASES = [
  { _id:'1', number:'01', title:'Discovery & Diagnosis',   duration:'1 week',     description:'We spend the first week deep inside your product, your data, and your user interviews. No assumptions, just evidence.', activities:['Stakeholder interviews','User research sessions','Data & analytics audit','Competitive benchmarking','Technical debt review'], output:'Discovery Report & Recommendations' },
  { _id:'2', number:'02', title:'Strategy & Architecture', duration:'1-2 weeks',  description:'We synthesize discovery findings into a clear roadmap, technical architecture, and design direction before any building begins.', activities:['Product roadmap','System architecture design','Technology selection','Design principles','Sprint planning'], output:'Strategy Document & Technical Blueprint' },
  { _id:'3', number:'03', title:'Design & Prototype',      duration:'2-4 weeks',  description:'High-fidelity interactive prototypes that feel like the real product. We test, iterate, and converge on what works before a single line of production code.', activities:['Information architecture','Wireframing','Visual design','Interactive prototyping','Usability testing'], output:'Approved Prototype + Design System Foundations' },
  { _id:'4', number:'04', title:'Build & Iterate',         duration:'4-12 weeks', description:'Weekly sprints, daily standups, and relentless quality bars. We ship to production early and iterate based on real user behaviour.', activities:['Sprint planning & review','Feature development','Code review & testing','Continuous integration','User feedback loops'], output:'Production-Ready Software' },
  { _id:'5', number:'05', title:'Launch & Optimise',       duration:'Ongoing',    description:'A launch is a milestone, not a finish line. We monitor, iterate, and compound learnings to keep pushing the needle.', activities:['Launch planning','Performance monitoring','A/B testing','Analytics analysis','Quarterly roadmap reviews'], output:'Growth Playbook + Ongoing Retainer Option' },
];

const FALLBACK_TESTIMONIALS = [
  { _id:'1', quote:"Intellipaat's process is the most rigorous I've experienced. The discovery phase alone saved us from building the wrong thing.", authorName:'Sarah Rahman', authorRole:'CTO, Nexus Health',  authorInitials:'SR' },
  { _id:'2', quote:"They don't just deliver code — they think like founders. Every decision is tied to a business outcome.",                         authorName:'Marcus Lee',   authorRole:'CEO, Orbital',         authorInitials:'ML' },
  { _id:'3', quote:"The speed of iteration was remarkable. Week 2 we had a prototype in users' hands. Week 6 we were live.",                        authorName:'Priya Nair',   authorRole:'VP Product, DataLens',  authorInitials:'PN' },
];

export default function Process() {
  const { data, loading } = useSanity(PROCESS_QUERY, {}, null);
  const [open, setOpen] = useState(0);

  if (loading) return <Loader message="Loading process..." />;

  const phases       = data?.phases?.length       ? data.phases       : FALLBACK_PHASES;
  const testimonials = data?.testimonials?.length  ? data.testimonials : FALLBACK_TESTIMONIALS;

  return (
    <div className="process-page">
      <div className="page-hero">
        <div className="ai-label"><span className="ai-label-dot" /> Our Methodology</div>
        <h1 className="page-hero-title">How we<br/><em>work</em></h1>
        <p className="page-hero-sub">A five-phase methodology refined across 150+ engagements — designed to eliminate waste and ship things that actually work.</p>
      </div>

      <div className="page-content" style={{paddingTop:0}}>
        <div className="phases-list">
          {phases.map((phase, i) => (
            <div key={phase._id} className={`phase-item glass-card${open===i?' open':''}`} onClick={() => setOpen(open===i ? -1 : i)}>
              <div className="phase-header">
                <div className="phase-left">
                  <div className="phase-icon">{ICONS[i % ICONS.length]}</div>
                  <div>
                    <div className="phase-num-label">{phase.number} &mdash; {phase.duration}</div>
                    <div className="phase-title">{phase.title}</div>
                  </div>
                </div>
                <div className="phase-toggle">{open===i ? '\u2212' : '+'}</div>
              </div>
              {open === i && (
                <div className="phase-body">
                  <p className="phase-desc">{phase.description}</p>
                  <div className="phase-cols">
                    <div>
                      <div className="phase-sub-label">Key Activities</div>
                      <ul className="phase-activities">
                        {phase.activities?.map(a => <li key={a}>{a}</li>)}
                      </ul>
                    </div>
                    <div className="phase-output-box">
                      <div className="phase-sub-label">Output</div>
                      <div className="phase-output">{phase.output}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="method-light-section">
          <div className="section-label">{'// What Clients Say'}</div>
          <h2 className="section-title">The proof is<br/><em>in the process</em></h2>
          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div key={t._id} className="testimonial-card glass-card">
                <div className="testimonial-quote">&ldquo;</div>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.authorInitials}</div>
                  <div>
                    <div className="author-name">{t.authorName}</div>
                    <div className="author-role">{t.authorRole}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
