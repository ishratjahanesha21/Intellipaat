// ─── All GROQ queries used across the app ───────────────────────────────────
// Docs: https://www.sanity.io/docs/groq

// HOME PAGE
export const HOME_QUERY = `{
  "hero": *[_type == "siteSettings"][0]{
    heroHeading, heroSubheading, heroStats
  },
  "logos": *[_type == "clientLogo"] | order(order asc){ _id, name, order },
  "bentoCards": *[_type == "bentoCard"] | order(order asc){
    _id, title, description, cardType, order
  }
}`;

// SERVICES PAGE
export const SERVICES_QUERY = `*[_type == "service"] | order(order asc){
  _id, number, title, description, tags, details, deliverables, order
}`;

// WORK / PORTFOLIO PAGE
export const WORK_QUERY = `*[_type == "project"] | order(order asc){
  _id, title, category, tags, year, description, metric,
  tech, accent, order,
  "image": mainImage{ asset, alt }
}`;

// PROCESS PAGE
export const PROCESS_QUERY = `{
  "phases": *[_type == "processPhase"] | order(order asc){
    _id, number, title, duration, description, activities, output, order
  },
  "testimonials": *[_type == "testimonial"] | order(order asc){
    _id, quote, authorName, authorRole, authorInitials, order
  }
}`;

// ABOUT PAGE
export const ABOUT_QUERY = `{
  "mission": *[_type == "siteSettings"][0]{
    missionHeading, missionBody1, missionBody2
  },
  "values": *[_type == "companyValue"] | order(order asc){
    _id, title, description, iconName, order
  },
  "team": *[_type == "teamMember"] | order(order asc){
    _id, name, role, bio, tags, order,
    "image": photo{ asset, alt }
  },
  "stats": *[_type == "siteSettings"][0]{ aboutStats }
}`;

// BLOG PAGE
export const BLOG_QUERY = `*[_type == "post"] | order(publishedAt desc){
  _id, title, excerpt, category, tags, featured,
  publishedAt, readTime, authorName, authorInitials,
  "image": mainImage{ asset, alt }
}`;

// SITE SETTINGS (used in Navbar, Footer, Home)
export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName, tagline, statusLabel,
  footerCta, footerCtaSubtitle,
  socialX, socialLinkedIn, socialGithub, socialDribbble,
  navLinks
}`;
