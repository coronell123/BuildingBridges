import type { AppLanguage } from '@/lib/hooks/useLanguage';

type L<T> = { en: T; de: T };

const pick = <T>(value: L<T>, lang: AppLanguage): T => (lang === 'de' ? value.de : value.en);
const pickMaybeLocalized = <T>(value: T | L<T>, lang: AppLanguage): T =>
  typeof value === 'object' && value !== null && 'en' in value && 'de' in value
    ? pick(value as L<T>, lang)
    : (value as T);

export type WorkshopItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  mode: 'Online' | 'In Person' | 'Hybrid';
  modeLabel: string;
  category: 'Mentoring' | 'Workshop' | 'Research' | 'Community' | 'Networking';
  categoryLabel: string;
  image: string;
  registrationUrl?: string;
  tags: string[];
};

export type ArchiveItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  status: string;
  image: string;
  href: string;
};

export type ReflectionItem = {
  id: string;
  quote: string;
  role: string;
};

type WorkshopSource = {
  id: string;
  title: L<string>;
  description: L<string>;
  date: string;
  time: L<string>;
  location: L<string>;
  mode: WorkshopItem['mode'];
  category: WorkshopItem['category'];
  image: string | L<string>;
  registrationUrl?: string;
  tags: L<string[]>;
};

const MODE_LABELS: Record<WorkshopItem['mode'], L<string>> = {
  Online: { en: 'Online', de: 'Online' },
  'In Person': { en: 'In person', de: 'Vor Ort' },
  Hybrid: { en: 'Hybrid', de: 'Hybrid' },
};

const CATEGORY_LABELS: Record<WorkshopItem['category'], L<string>> = {
  Mentoring: { en: 'Mentoring', de: 'Mentoring' },
  Workshop: { en: 'Workshop', de: 'Workshop' },
  Research: { en: 'Research', de: 'Forschung' },
  Community: { en: 'Community', de: 'Community' },
  Networking: { en: 'Networking', de: 'Networking' },
};

const UPDATED_FLYER_BASE = '/workshops/updated';
const UPDATED_FLYERS = {
  offerTemplate: `${UPDATED_FLYER_BASE}/Workshop%20archive%20data%20-%20Classroom_page-0001.jpg`,
  eventTemplate: `${UPDATED_FLYER_BASE}/Workshop%20archive%20data%202-%20Classroom_page-0001.jpg`,
  mentoringProgramme: `${UPDATED_FLYER_BASE}/2025%20Building%20Bridges%20Mentoringprogramm%20f%C3%BCr%20M%C3%A4dchen%20und%20FLINTA%20of%20Colour_page-0001.jpg`,
  johannaEckIntro: `${UPDATED_FLYER_BASE}/20251008%20Flyer%20Workshop%20Johanna%20Eck%20Angebot_page-0001.jpg`,
  perlenPower: `${UPDATED_FLYER_BASE}/20251218%20Flyer%20BB%20und%20JE%20-%20Perlen%20und%20Power_page-0001.jpg`,
  mentoringJohannaEck: `${UPDATED_FLYER_BASE}/2.3.26%20Building%20Bridges%20-%20Johanna%20eck%20Flyer_page-0001.jpg`,
  fruehlingsfest: `${UPDATED_FLYER_BASE}/20260326%20Fr%C3%BChlingsfest%20M%C3%84DEA%20x%20Building%20Bridges%2020.03.2026_page-0001.jpg`,
  selfCare: `${UPDATED_FLYER_BASE}/20260613%20Self%20Care%20Workshop%20Building%20Bridges_page-0001.jpg`,
};

function toWorkshopItem(source: WorkshopSource, lang: AppLanguage): WorkshopItem {
  return {
    id: source.id,
    title: pick(source.title, lang),
    description: pick(source.description, lang),
    date: source.date,
    time: pick(source.time, lang),
    location: pick(source.location, lang),
    mode: source.mode,
    modeLabel: pick(MODE_LABELS[source.mode], lang),
    category: source.category,
    categoryLabel: pick(CATEGORY_LABELS[source.category], lang),
    image: pickMaybeLocalized(source.image, lang),
    registrationUrl: source.registrationUrl,
    tags: pick(source.tags, lang),
  };
}

const featuredSource: WorkshopSource = {
  id: 'featured-online-workshop-tp3',
  title: {
    en: 'Online workshop: Evaluating storytelling formats with mentors',
    de: 'Online-Workshop: Storytelling-Formate mit Mentor:innen evaluieren',
  },
  description: {
    en: 'Help shape the future of the Building Bridges storytelling platform: explore five storytelling prototypes, share impressions on comprehensibility, emotional connection and usability, and co-create ideas for an accessible, empowering platform.',
    de: 'Gestalte die Zukunft der Building-Bridges-Storytelling-Plattform mit: Erkunde fünf Storytelling-Prototypen, teile Eindrücke zu Verständlichkeit, emotionaler Verbindung und Nutzbarkeit und entwickle Ideen für eine zugängliche, empowernde Plattform.',
  },
  date: '31.07.2026',
  time: { en: 'TBD · 90 minutes', de: 'Uhrzeit folgt · 90 Minuten' },
  location: { en: 'Zoom + Miro', de: 'Zoom + Miro' },
  mode: 'Online',
  category: 'Research',
  image: {
    en: '/workshops/updated/31%20Juli%20eng.jpg',
    de: '/workshops/updated/31%20Juli%20German.jpg',
  },
  registrationUrl: 'https://forms.gle/19nHSdjAbFwFXxgq6',
  tags: {
    en: ['Upcoming', 'Online', 'TP3', 'Storytelling'],
    de: ['Bevorstehend', 'Online', 'TP3', 'Storytelling'],
  },
};

const feedSources: WorkshopSource[] = [
  featuredSource,
  {
    id: 'individual-mentoring',
    title: { en: 'Individual mentoring', de: 'Individuelles Mentoring' },
    description: {
      en: 'Mentoring programme from September 2025 to September 2026 with exchange, self-care, skills training, and empowerment workshops for girls and young FLINTA of Colour.',
      de: 'Mentoring-Programm von September 2025 bis September 2026 mit Austausch, Self-Care, Skillstraining und Empowerment-Workshops für Mädchen und junge FLINTA of Colour.',
    },
    date: '09.2025 - 09.2026',
    time: { en: 'Flexible', de: 'Flexibel' },
    location: { en: 'MÄDEA', de: 'MÄDEA' },
    mode: 'Hybrid',
    category: 'Mentoring',
    image: UPDATED_FLYERS.mentoringProgramme,
    tags: { en: ['Mentoring', 'Empowerment'], de: ['Mentoring', 'Empowerment'] },
  },
  {
    id: 'mentoring-workshop-johanna-eck',
    title: { en: 'Mentoring workshop — Johanna-Eck', de: 'Mentoring-Workshop — Johanna-Eck' },
    description: {
      en: 'Workshop introducing the mentoring offer and reflecting on what topics participants want to explore through Building Bridges one-to-one mentoring.',
      de: 'Workshop mit kurzer Einführung ins Mentoring und Austausch darüber, welche Themen die Teilnehmenden im 1:1-Angebot von Building Bridges nutzen möchten.',
    },
    date: '02.03.2026',
    time: { en: '13:30 - 16:00', de: '13:30 - 16:00 Uhr' },
    location: { en: 'Johanna-Eck Schule', de: 'Johanna-Eck-Schule' },
    mode: 'In Person',
    category: 'Workshop',
    image: UPDATED_FLYERS.mentoringJohannaEck,
    tags: { en: ['Mentoring', 'Community'], de: ['Mentoring', 'Community'] },
  },
  {
    id: 'johanna-eck-intro-workshop',
    title: { en: 'Kick-off workshop — Johanna-Eck', de: 'Auftaktworkshop — Johanna-Eck' },
    description: {
      en: 'First workshop with Johanna-Eck-Schule at anigo space, focused on getting to know the mentors and students and discussing discrimination and empowerment.',
      de: 'Erster Workshop mit der Johanna-Eck-Schule im anigo space zum Kennenlernen der Mentor:innen und Schülerinnen sowie zum Austausch über (Anti-)Diskriminierung und Empowerment.',
    },
    date: '08.10.2025',
    time: { en: '12:30 - 16:00', de: '12:30 - 16:00 Uhr' },
    location: { en: 'anigo space Berlin', de: 'anigo space Berlin' },
    mode: 'In Person',
    category: 'Workshop',
    image: UPDATED_FLYERS.johannaEckIntro,
    tags: { en: ['Empowerment', 'Anti-discrimination'], de: ['Empowerment', 'Antidiskriminierung'] },
  },
  {
    id: 'perlen-power-johanna-eck',
    title: { en: 'Perlen & Power — Johanna-Eck', de: 'Perlen & Power — Johanna-Eck' },
    description: {
      en: 'Self-care workshop where mentors and participants made pearl necklaces and exchanged around self-care.',
      de: 'Self-Care-Workshop, in dem die Mentor:innen gemeinsam mit den Teilnehmerinnen Perlenketten gestaltet und sich über Selbstfürsorge ausgetauscht haben.',
    },
    date: '18.12.2025',
    time: { en: '13:00 - 16:00', de: '13:00 - 16:00 Uhr' },
    location: { en: 'Johanna-Eck Schule', de: 'Johanna-Eck-Schule' },
    mode: 'In Person',
    category: 'Community',
    image: UPDATED_FLYERS.perlenPower,
    tags: { en: ['Self-care', 'Empowerment'], de: ['Self-Care', 'Empowerment'] },
  },
  {
    id: 'get-together',
    title: { en: 'Get Together', de: 'Get Together' },
    description: {
      en: 'First get-together used as the postponed kick-off event for mentoring matching and vision work with Mary Ivic.',
      de: 'Das erste Get Together wurde als verschobene Auftaktveranstaltung zur Mentoring-Zuordnung und Visionsarbeit mit Mary Ivic genutzt.',
    },
    date: '09.12.2025',
    time: { en: 'Time TBD', de: 'Uhrzeit folgt' },
    location: { en: 'MÄDEA', de: 'MÄDEA' },
    mode: 'In Person',
    category: 'Networking',
    image: UPDATED_FLYERS.eventTemplate,
    tags: { en: ['Mentoring', 'Community'], de: ['Mentoring', 'Community'] },
  },
  {
    id: 'fruehlingsfest',
    title: { en: 'Frühlingsfest', de: 'Frühlingsfest' },
    description: {
      en: 'Building Bridges joined the spring festival organized with MÄDEA, using the Perlen & Power concept for a stand with interested girls and young FLINTA.',
      de: 'Building Bridges nahm am gemeinsam mit MÄDEA organisierten Frühlingsfest teil und nutzte das Konzept Perlen & Power für einen Stand mit interessierten Mädchen und jungen FLINTA.',
    },
    date: '20.03.2026',
    time: { en: 'from 16:00', de: 'ab 16:00 Uhr' },
    location: { en: 'MÄDEA', de: 'MÄDEA' },
    mode: 'In Person',
    category: 'Community',
    image: UPDATED_FLYERS.fruehlingsfest,
    tags: { en: ['Self-care'], de: ['Self-Care'] },
  },
];

type ArchiveSource = {
  id: string;
  title: L<string>;
  type: L<string>;
  date: string;
  status: L<string>;
  image: string;
  href: string;
};

const archiveSources: ArchiveSource[] = [
  {
    id: 'archive-self-care',
    title: { en: 'Self-Care Workshop', de: 'Self-Care-Workshop' },
    type: { en: 'Self-Care Workshop', de: 'Self-Care-Workshop' },
    date: '13.06.2026',
    status: { en: 'Past workshop', de: 'Vergangener Workshop' },
    image: UPDATED_FLYERS.selfCare,
    href: UPDATED_FLYERS.selfCare,
  },
  {
    id: 'archive-fruehlingsfest',
    title: { en: 'Frühlingsfest', de: 'Frühlingsfest' },
    type: { en: 'Community celebration', de: 'Community-Fest' },
    date: '20.03.2026',
    status: { en: 'Community event', de: 'Community-Event' },
    image: UPDATED_FLYERS.fruehlingsfest,
    href: UPDATED_FLYERS.fruehlingsfest,
  },
  {
    id: 'archive-mentoring-wellbeing',
    title: { en: 'Mentoring workshop — Johanna-Eck', de: 'Mentoring-Workshop — Johanna-Eck' },
    type: { en: 'Empowerment workshop', de: 'Empowerment-Workshop' },
    date: '02.03.2026',
    status: { en: 'Past workshop', de: 'Vergangener Workshop' },
    image: UPDATED_FLYERS.mentoringJohannaEck,
    href: UPDATED_FLYERS.mentoringJohannaEck,
  },
  {
    id: 'archive-perlen-power',
    title: { en: 'Perlen & Power', de: 'Perlen & Power' },
    type: { en: 'Reflection event', de: 'Reflexions-Event' },
    date: '18.12.2025',
    status: { en: 'Flyer', de: 'Flyer' },
    image: UPDATED_FLYERS.perlenPower,
    href: UPDATED_FLYERS.perlenPower,
  },
  {
    id: 'archive-johanna-eck-intro',
    title: { en: 'Kick-off workshop — Johanna-Eck', de: 'Auftaktworkshop — Johanna-Eck' },
    type: { en: 'Introduction workshop', de: 'Kennenlern-Workshop' },
    date: '08.10.2025',
    status: { en: 'Past workshop', de: 'Vergangener Workshop' },
    image: UPDATED_FLYERS.johannaEckIntro,
    href: UPDATED_FLYERS.johannaEckIntro,
  },
  {
    id: 'archive-programm',
    title: { en: 'Mentoring programme 2025/26', de: 'Mentoring-Programm 2025/26' },
    type: { en: 'Programme flyer', de: 'Programm-Flyer' },
    date: '2025 - 2026',
    status: { en: 'Programme', de: 'Programm' },
    image: UPDATED_FLYERS.mentoringProgramme,
    href: UPDATED_FLYERS.mentoringProgramme,
  },
  {
    id: 'archive-basic-training',
    title: { en: 'Basis Training', de: 'Basis-Training' },
    type: { en: 'Mentor training', de: 'Mentor:innen-Training' },
    date: '20.06.2025 - 22.06.2025',
    status: { en: 'Training', de: 'Training' },
    image: UPDATED_FLYERS.offerTemplate,
    href: UPDATED_FLYERS.offerTemplate,
  },
  {
    id: 'archive-basic-training-ii',
    title: { en: 'Basis Training II', de: 'Basis-Training II' },
    type: { en: 'Mentor training', de: 'Mentor:innen-Training' },
    date: '30.01.2026',
    status: { en: 'Training', de: 'Training' },
    image: UPDATED_FLYERS.offerTemplate,
    href: UPDATED_FLYERS.offerTemplate,
  },
  {
    id: 'archive-get-together',
    title: { en: 'Get Together', de: 'Get Together' },
    type: { en: 'Mentoring kick-off', de: 'Mentoring-Auftakt' },
    date: '09.12.2025',
    status: { en: 'Community event', de: 'Community-Event' },
    image: UPDATED_FLYERS.eventTemplate,
    href: UPDATED_FLYERS.eventTemplate,
  },
];

const reflectionSources: { id: string; quote: L<string>; role: L<string> }[] = [
  {
    id: 'reflection-1',
    quote: {
      en: 'This workshop helped me feel represented and heard.',
      de: 'Durch diesen Workshop habe ich mich gesehen und gehört gefühlt.',
    },
    role: { en: 'Participant', de: 'Teilnehmerin' },
  },
  {
    id: 'reflection-2',
    quote: {
      en: 'Meeting mentors with similar experiences inspired me to continue.',
      de: 'Mentor:innen mit ähnlichen Erfahrungen haben mich inspiriert, weiterzumachen.',
    },
    role: { en: 'Mentee', de: 'Mentee' },
  },
  {
    id: 'reflection-3',
    quote: {
      en: 'I found practical tools for self-care and confidence in academic spaces.',
      de: 'Ich habe praktische Tools für Self-Care und Selbstvertrauen im Studium gefunden.',
    },
    role: { en: 'Workshop attendee', de: 'Workshop-Teilnehmerin' },
  },
];

export function getFeaturedWorkshop(lang: AppLanguage): WorkshopItem {
  return toWorkshopItem(featuredSource, lang);
}

export type UpcomingWorkshopAlertData = {
  badge: string;
  headline: string;
  title: string;
  dateLine: string;
  location: string;
  cta: string;
  dismissLabel: string;
};

/** Copy for the upcoming-workshop alert. */
export function getUpcomingWorkshopAlert(lang: AppLanguage): UpcomingWorkshopAlertData {
  const w = toWorkshopItem(featuredSource, lang);
  if (lang === 'de') {
    return {
      badge: 'Neu im Kalender',
      headline: 'Bevorstehender Workshop',
      title: w.title,
      dateLine: `${w.date} · ${w.time}`,
      location: w.location,
      cta: 'Details ansehen',
      dismissLabel: 'Schließen',
    };
  }
  return {
    badge: 'New on the calendar',
    headline: 'Upcoming workshop',
    title: w.title,
    dateLine: `${w.date} · ${w.time}`,
    location: w.location,
    cta: 'View details',
    dismissLabel: 'Dismiss',
  };
}

export function getWorkshopFeed(lang: AppLanguage): WorkshopItem[] {
  return feedSources.map((s) => toWorkshopItem(s, lang));
}

export function getArchiveItems(lang: AppLanguage): ArchiveItem[] {
  return archiveSources.map((s) => ({
    id: s.id,
    title: pick(s.title, lang),
    type: pick(s.type, lang),
    date: s.date,
    status: pick(s.status, lang),
    image: s.image,
    href: s.href,
  }));
}

export function getReflections(lang: AppLanguage): ReflectionItem[] {
  return reflectionSources.map((s) => ({
    id: s.id,
    quote: pick(s.quote, lang),
    role: pick(s.role, lang),
  }));
}

export type WorkshopPageLabels = {
  eyebrow: string;
  title: string;
  intro: string;
  feedEyebrow: string;
  feedTitle: string;
  archiveEyebrow: string;
  archiveTitle: string;
  reflectionEyebrow: string;
  reflectionTitle: string;
};

export function getWorkshopPageLabels(lang: AppLanguage): WorkshopPageLabels {
  return lang === 'de'
    ? {
        eyebrow: 'Angebote & Veranstaltungen',
        title: 'Workshops & Community-Lernen',
        intro:
          'Mentoring, Empowerment, Forschungsaustausch und inklusives Community-Lernen — mit Storytelling im Mittelpunkt.',
        feedEyebrow: 'Workshop-Übersicht',
        feedTitle: 'Bevorstehende & laufende Formate',
        archiveEyebrow: 'Archiv',
        archiveTitle: 'Workshop-Archiv',
        reflectionEyebrow: 'Stimmen aus der Community',
        reflectionTitle: 'Momente aus unseren Workshops',
      }
    : {
        eyebrow: 'Training & Events',
        title: 'Workshops & Community Learning',
        intro:
          'A storytelling-focused space for mentoring, empowerment, research exchange, and inclusive community building.',
        feedEyebrow: 'Workshop feed',
        feedTitle: 'Browse upcoming sessions',
        archiveEyebrow: 'Archive',
        archiveTitle: 'Curated workshop archive',
        reflectionEyebrow: 'Community reflection',
        reflectionTitle: 'Moments from our workshops',
      };
}

/** @deprecated Use getFeaturedWorkshop(lang) */
export const featuredWorkshop = getFeaturedWorkshop('en');
/** @deprecated Use getWorkshopFeed(lang) */
export const workshopFeed = getWorkshopFeed('en');
/** @deprecated Use getArchiveItems(lang) */
export const archiveItems = getArchiveItems('en');
/** @deprecated Use getReflections(lang) */
export const reflections = getReflections('en');
