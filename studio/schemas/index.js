import siteSettings from './siteSettings';
import post         from './post';
import project      from './project';
import teamMember   from './teamMember';
import service      from './service';
import { processPhase, testimonial, companyValue, bentoCard, clientLogo } from './misc';

export const schemaTypes = [
  // Singleton
  siteSettings,
  // Collections
  post,
  project,
  teamMember,
  service,
  processPhase,
  testimonial,
  companyValue,
  bentoCard,
  clientLogo,
];
