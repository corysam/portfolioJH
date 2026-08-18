import type { BlocksContent } from '@strapi/blocks-react-renderer';

/**
 * A rich-text value can be either Strapi "Rich Text (Blocks)" JSON (an array of
 * block nodes) or a plain string. Strings come from the mock-data fallback (and
 * any legacy plain-text content), so every consumer must tolerate both shapes.
 */
export type RichTextContent = BlocksContent | string;

/** Normalize any rich-text value into the block array that BlocksRenderer expects. */
export function toBlocks(value: RichTextContent | null | undefined): BlocksContent {
  if (!value) return [];
  if (typeof value !== 'string') return value;
  // Split a plain string into paragraphs on blank lines; single newlines become line breaks.
  return value
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => ({
      type: 'paragraph' as const,
      children: [{ type: 'text' as const, text: para }],
    }));
}

/** Flatten a rich-text value to plain text — used for SEO metadata and teaser clamps. */
export function richTextToPlainText(value: RichTextContent | null | undefined): string {
  if (!value) return '';
  if (typeof value === 'string') return value;

  const walk = (node: unknown): string => {
    if (!node || typeof node !== 'object') return '';
    const n = node as { text?: unknown; children?: unknown };
    if (typeof n.text === 'string') return n.text;
    if (Array.isArray(n.children)) return n.children.map(walk).join('');
    return '';
  };

  return value
    .map(walk)
    .map((s) => s.trim())
    .filter(Boolean)
    .join('\n\n');
}

/** Whether a rich-text value carries any visible text (empty Strapi blocks count as empty). */
export function hasRichText(value: RichTextContent | null | undefined): boolean {
  return richTextToPlainText(value).trim() !== '';
}
