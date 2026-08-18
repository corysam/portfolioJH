import 'server-only';

import {
  MOCK_ABOUT,
  MOCK_FOOTER,
  MOCK_HEADER,
  MOCK_HERO,
  MOCK_PROJECTS,
  MOCK_SITE_SETTINGS,
} from './mock-data';
import {
  fetchAboutFromStrapi,
  fetchFooterFromStrapi,
  fetchHeaderFromStrapi,
  fetchHeroFromStrapi,
  fetchProjectFromStrapi,
  fetchProjectsFromStrapi,
  fetchSiteSettingsFromStrapi,
  isStrapiEnabled,
} from './strapi';
import type { AboutData, FooterData, HeaderData, HeroData, Project, SiteSettings } from './types';

/**
 * Single source of truth for content. When STRAPI_URL is set we hit the CMS;
 * otherwise we serve the mock seed data so `npm run dev` works out of the box.
 * Any Strapi failure (unreachable, malformed payload, etc.) falls back to mock
 * data so callers can treat these as infallible.
 */

const activeMockProjects = () => MOCK_PROJECTS.filter((p) => !p.archived);

export async function getProjects(): Promise<Project[]> {
  if (!isStrapiEnabled()) return activeMockProjects();
  try {
    return await fetchProjectsFromStrapi();
  } catch (err) {
    console.error('[content] getProjects failed, falling back to mock data:', err);
    return activeMockProjects();
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!isStrapiEnabled()) {
    return MOCK_PROJECTS.find((p) => p.slug === slug && !p.archived) ?? null;
  }
  try {
    return await fetchProjectFromStrapi(slug);
  } catch (err) {
    console.error(`[content] getProject(${slug}) failed, falling back to mock data:`, err);
    return MOCK_PROJECTS.find((p) => p.slug === slug && !p.archived) ?? null;
  }
}

export async function getAbout(): Promise<AboutData> {
  if (!isStrapiEnabled()) return MOCK_ABOUT;
  try {
    return await fetchAboutFromStrapi();
  } catch (err) {
    console.error('[content] getAbout failed, falling back to mock data:', err);
    return MOCK_ABOUT;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isStrapiEnabled()) return MOCK_SITE_SETTINGS;
  try {
    return await fetchSiteSettingsFromStrapi();
  } catch (err) {
    console.error('[content] getSiteSettings failed, falling back to mock data:', err);
    return MOCK_SITE_SETTINGS;
  }
}

export async function getHero(): Promise<HeroData> {
  if (!isStrapiEnabled()) return MOCK_HERO;
  try {
    return await fetchHeroFromStrapi();
  } catch (err) {
    console.error('[content] getHero failed, falling back to mock data:', err);
    return MOCK_HERO;
  }
}

export async function getFooter(): Promise<FooterData> {
  if (!isStrapiEnabled()) return MOCK_FOOTER;
  try {
    return await fetchFooterFromStrapi();
  } catch (err) {
    console.error('[content] getFooter failed, falling back to mock data:', err);
    return MOCK_FOOTER;
  }
}

export async function getHeader(): Promise<HeaderData> {
  if (!isStrapiEnabled()) return MOCK_HEADER;
  try {
    return await fetchHeaderFromStrapi();
  } catch (err) {
    console.error('[content] getHeader failed, falling back to mock data:', err);
    return MOCK_HEADER;
  }
}
