import { DEFAULT_CATEGORY_COLOR, DEFAULT_CATEGORY_TEXT_COLOR } from './category-colors';
import { MOCK_ABOUT, MOCK_FOOTER, MOCK_HEADER, MOCK_HERO, MOCK_SITE_SETTINGS } from './mock-data';
import type {
  AboutData,
  FooterData,
  HeaderData,
  HeroData,
  Project,
  ProjectCategory,
  ProjectPhase,
  ProjectSection,
  RichTextContent,
  SiteSettings,
} from './types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? '';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN ?? '';

export const isStrapiEnabled = (): boolean => STRAPI_URL.length > 0;
//export const isStrapiEnabled = (): boolean => false;

type StrapiMedia =
  | {
      url: string;
      formats?: Record<string, { url: string }>;
    }
  | null
  | undefined;

interface StrapiResponse<T> {
  data: T;
  meta?: unknown;
}

type StrapiAttributes<T> = T & { id?: number; documentId?: string };

const headers = (): HeadersInit => {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (STRAPI_TOKEN) h.Authorization = `Bearer ${STRAPI_TOKEN}`;
  return h;
};

async function strapiFetch<T>(
  path: string,
  init?: RequestInit & { allowNotFound?: boolean },
): Promise<StrapiResponse<T>> {
  const { allowNotFound, ...fetchInit } = init ?? {};
  const url = `${STRAPI_URL.replace(/\/$/, '')}/api${path}`;
  const res = await fetch(url, {
    ...fetchInit,
    headers: { ...headers(), ...(fetchInit.headers ?? {}) },
    next: { revalidate: 60, tags: ['strapi'] },
  });
  if (res.status === 404 && allowNotFound) {
    return { data: null as T };
  }
  if (!res.ok) {
    throw new Error(`Strapi ${path} → ${res.status} ${res.statusText} ${res.body}`);
  }
  return (await res.json()) as StrapiResponse<T>;
}

const absoluteUrl = (url: string | undefined): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL.replace(/\/$/, '')}${url}`;
};

const mediaUrl = (media: StrapiMedia): string => absoluteUrl(media?.url);

interface StrapiCategory {
  name: string;
  categoryColor?: string | null;
  categoryTextColor?: string | null;
}

interface StrapiPhase {
  title: string;
  description: RichTextContent;
}

interface StrapiSection {
  title: string;
  content: RichTextContent;
  photo?: StrapiMedia;
}

interface StrapiNamedItem {
  name: string;
}

interface StrapiProject {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description?: RichTextContent;
  buttonTitle?: string;
  buttonUrl?: string;
  archived?: boolean;
  dateAndDuration?: string;
  role?: string;
  Equipe?: string;
  mission?: RichTextContent;
  results?: RichTextContent;
  image: StrapiMedia;
  categories?: StrapiAttributes<StrapiCategory>[] | null;
  software?: StrapiNamedItem[];
  clientName?: StrapiNamedItem[];
  phases?: StrapiPhase[];
  sections?: StrapiSection[];
}

const toProject = (p: StrapiProject): Project => ({
  id: p.documentId ?? String(p.id),
  slug: p.slug,
  title: p.title,
  categories:
    p.categories
      ?.filter((c) => Boolean(c?.name))
      .map<ProjectCategory>((c) => ({
        name: c.name,
        color: c.categoryColor || DEFAULT_CATEGORY_COLOR,
        textColor: c.categoryTextColor || DEFAULT_CATEGORY_TEXT_COLOR,
      })) ?? [],
  image: mediaUrl(p.image),
  description: p.description,
  buttonTitle: p.buttonTitle,
  buttonUrl: p.buttonUrl,
  software: p.software?.map((s) => s.name),
  archived: p.archived,
  dateAndDuration: p.dateAndDuration,
  role: p.role,
  equipe: p.Equipe,
  clientName: p.clientName?.map((c) => c.name),
  mission: p.mission,
  results: p.results,
  phases: p.phases as ProjectPhase[] | undefined,
  sections: p.sections?.map<ProjectSection>((s) => ({
    title: s.title,
    content: s.content,
    photo: mediaUrl(s.photo),
  })),
});

// `populate=*` is one level deep in Strapi 5: repeatable components come back, but
// media nested inside them (section.photo, partner.logo) does not. Those need an
// explicit nested populate, so list the fields instead of relying on the wildcard.
const PROJECT_POPULATE = [
  'populate[image]=true',
  'populate[categories]=true',
  'populate[software]=true',
  'populate[clientName]=true',
  'populate[phases]=true',
  'populate[sections][populate][photo]=true',
].join('&');

export async function fetchProjectsFromStrapi(): Promise<Project[]> {
  const res = await strapiFetch<StrapiProject[]>(
    `/projects?${PROJECT_POPULATE}&filters[archived][$ne]=true&sort=dateAndDuration:desc`,
  );
  return res.data.map(toProject);
}

export async function fetchProjectFromStrapi(slug: string): Promise<Project | null> {
  const res = await strapiFetch<StrapiProject[]>(
    `/projects?${PROJECT_POPULATE}&filters[slug][$eq]=${encodeURIComponent(slug)}`,
  );
  const first = res.data[0];
  return first ? toProject(first) : null;
}

interface StrapiAbout {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  tags?: { label: string }[];
  cv?: StrapiMedia;
  photo?: StrapiMedia;
  availableForWork: boolean;
}

export async function fetchAboutFromStrapi(): Promise<AboutData> {
  const res = await strapiFetch<StrapiAbout | null>('/about?populate=*');
  const a = res.data;
  if (!a) return MOCK_ABOUT;
  return {
    title: a.title,
    subtitle: a.subtitle,
    description: a.description,
    tag: a.tag,
    tags: a.tags?.map((t) => t.label) ?? [],
    cvUrl: mediaUrl(a.cv),
    photoUrl: mediaUrl(a.photo),
    availableForWork: a.availableForWork,
  };
}

interface StrapiSiteSettings {
  title?: string;
  subtitle?: string;
  email: string;
  phone: string;
  linkedinUrl: string;
}

export async function fetchSiteSettingsFromStrapi(): Promise<SiteSettings> {
  const res = await strapiFetch<StrapiSiteSettings | null>('/site-setting?populate=*');
  const s = res.data;
  if (!s) return MOCK_SITE_SETTINGS;
  return {
    title: s.title ?? MOCK_SITE_SETTINGS.title,
    subtitle: s.subtitle ?? MOCK_SITE_SETTINGS.subtitle,
    email: s.email,
    phone: s.phone,
    linkedinUrl: s.linkedinUrl,
  };
}

interface StrapiFooter {
  partnersTitle: string;
  copyrightTextBefore: string;
  copyrightTextAfter: string;
  partners?: { name: string; logo?: StrapiMedia }[];
}

export async function fetchFooterFromStrapi(): Promise<FooterData> {
  const res = await strapiFetch<StrapiFooter | null>('/footer?populate[partners][populate][logo]=true', {
    allowNotFound: true,
  });
  const f = res.data;
  if (!f) return MOCK_FOOTER;
  return {
    partnersTitle: f.partnersTitle ?? MOCK_FOOTER.partnersTitle,
    copyrightTextBefore: f.copyrightTextBefore ?? MOCK_FOOTER.copyrightTextBefore,
    copyrightTextAfter: f.copyrightTextAfter ?? MOCK_FOOTER.copyrightTextAfter,
    partners:
      f.partners?.map((p) => ({
        name: p.name,
        logo: mediaUrl(p.logo),
      })) ?? [],
  };
}

interface StrapiHero {
  title: string;
  subtitle?: string;
  description?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  heroImageDesktop?: StrapiMedia;
  heroImageTablet?: StrapiMedia;
  heroImageMobile?: StrapiMedia;
}

export async function fetchHeroFromStrapi(): Promise<HeroData> {
  const res = await strapiFetch<StrapiHero | null>('/hero?populate=*', { allowNotFound: true });
  const h = res.data;
  if (!h) return MOCK_HERO;
  return {
    title: h.title,
    subtitle: h.subtitle ?? '',
    description: h.description ?? '',
    ctaPrimaryLabel: h.ctaPrimaryLabel ?? MOCK_HERO.ctaPrimaryLabel,
    ctaSecondaryLabel: h.ctaSecondaryLabel ?? MOCK_HERO.ctaSecondaryLabel,
    imageDesktopUrl: mediaUrl(h.heroImageDesktop),
    imageTabletUrl: mediaUrl(h.heroImageTablet),
    imageMobileUrl: mediaUrl(h.heroImageMobile),
  };
}

interface StrapiHeader {
  brandName: string;
  logo?: StrapiMedia;
}

export async function fetchHeaderFromStrapi(): Promise<HeaderData> {
  const res = await strapiFetch<StrapiHeader | null>('/header?populate=*', { allowNotFound: true });
  const h = res.data;
  if (!h) return MOCK_HEADER;
  return {
    brandName: h.brandName,
    logoUrl: mediaUrl(h.logo),
  };
}
