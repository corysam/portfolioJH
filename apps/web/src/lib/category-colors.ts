/**
 * Fallbacks for the per-category fields picked in Strapi (Category →
 * categoryColor / categoryTextColor / order). Categories saved before those
 * fields existed come back empty, so every renderer resolves through here.
 */
export const DEFAULT_CATEGORY_COLOR = '#5A7A5E';
export const DEFAULT_CATEGORY_TEXT_COLOR = '#F5E6D3';

/** Matches the Strapi schema default: unordered categories sink to the end. */
export const DEFAULT_CATEGORY_ORDER = 999;

export const DEFAULT_CATEGORY_SCHEME = {
  color: DEFAULT_CATEGORY_COLOR,
  textColor: DEFAULT_CATEGORY_TEXT_COLOR,
  order: DEFAULT_CATEGORY_ORDER,
};
