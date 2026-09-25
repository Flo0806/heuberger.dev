/**
 * One data shape for every CV output: the /cv page, the print/PDF view, the
 * JSON-LD Person schema and the machine-readable /cv.md for AI crawlers.
 * Lives in shared/ so both the app and Nitro routes can import it.
 */
export type CvLocale = 'de' | 'en';

/** Which lane an entry belongs to on the dual-track timeline. */
export type CvTrack = 'tech' | 'craft';

export interface CvLink {
  label: string;
  href: string;
  icon: string;
}

export interface CvFact {
  value: string;
  label: string;
  /** Where the figure comes from - without it a number is just a claim. */
  note?: string;
  href?: string;
}

export interface CvEntry {
  track: CvTrack;
  /** ISO month, e.g. '2022-12'. */
  from: string;
  /** ISO month or null for "present". */
  to: string | null;
  role: string;
  org: string;
  orgHref?: string;
  location?: string;
  summary?: string;
  /** Achievements, phrased with numbers where possible - what ATS/AI weigh. */
  bullets?: string[];
  tags?: string[];
  /** Marks the career pivot - rendered across both lanes. */
  pivot?: boolean;
}

export interface CvProject {
  name: string;
  href: string;
  description: string;
  tags: string[];
  /** npm package name, so live download stats can be attached later. */
  npm?: string;
}

export interface CvSkillGroup {
  label: string;
  skills: { name: string }[];
}

export interface CvEducation {
  from: string;
  to: string | null;
  title: string;
  org: string;
  note?: string;
  href?: string;
}

export interface CvData {
  locale: CvLocale;
  name: string;
  title: string;
  /** The stack the title is about. Kept apart so JSON-LD jobTitle stays clean. */
  focus: string;
  /** One sentence that frames the whole story. */
  tagline: string;
  /** The sheet's opening lines - the case, made before anyone scrolls. */
  claim: string[];
  location: string;
  availability: string;
  links: CvLink[];
  /** The "in 30 seconds" pitch, 3-5 sentences. Also the JSON-LD description. */
  summary: string[];
  facts: CvFact[];
  awards: { title: string; org: string; date: string; description: string; href: string }[];
  entries: CvEntry[];
  projects: CvProject[];
  skills: CvSkillGroup[];
  education: CvEducation[];
  languages: { name: string; level: string }[];
  /** Exact job-ad vocabulary; visible on the page, so no keyword stuffing. */
  keywords: string[];
}
