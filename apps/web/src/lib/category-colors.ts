/**
 * Fallbacks for the per-category colors picked in Strapi (Category →
 * categoryColor / categoryTextColor). Categories saved before those fields
 * existed come back empty, so every renderer resolves through here.
 */
export const DEFAULT_CATEGORY_COLOR = '#5A7A5E';
export const DEFAULT_CATEGORY_TEXT_COLOR = '#F5E6D3';

export const DEFAULT_CATEGORY_SCHEME = {
  color: DEFAULT_CATEGORY_COLOR,
  textColor: DEFAULT_CATEGORY_TEXT_COLOR,
};
