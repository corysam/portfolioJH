import type { RichTextContent } from './rich-text';

export type { RichTextContent };

export interface ProjectPhase {
  title: string;
  description: RichTextContent;
}

export interface ProjectSection {
  title: string;
  content: RichTextContent;
  photo?: string;
}

export interface ProjectCategory {
  name: string;
  /** Badge background + border. Picked in Strapi; falls back to DEFAULT_CATEGORY_COLOR. */
  color: string;
  /** Badge label color. Picked in Strapi; falls back to DEFAULT_CATEGORY_TEXT_COLOR. */
  textColor: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  categories: ProjectCategory[];
  image: string;
  description?: RichTextContent;
  buttonTitle?: string;
  buttonUrl?: string;
  software?: string[];
  archived?: boolean;
  dateAndDuration?: string;
  role?: string;
  equipe?: string;
  clientName?: string[];
  mission?: RichTextContent;
  results?: RichTextContent;
  phases?: ProjectPhase[];
  sections?: ProjectSection[];
}

export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  tags: string[];
  cvUrl: string;
  photoUrl: string;
  availableForWork: boolean;
}

export interface SiteSettings {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  linkedinUrl: string;
}

export interface FooterData {
  partnersTitle: string;
  copyrightTextBefore: string;
  copyrightTextAfter: string;
  partners: { name: string; logo?: string }[];
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  imageDesktopUrl: string;
  imageTabletUrl: string;
  imageMobileUrl: string;
}

export interface HeaderData {
  brandName: string;
  logoUrl: string;
}
