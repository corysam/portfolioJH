'use client';

import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { cn } from '@/components/ui/utils';
import { hasRichText, toBlocks, type RichTextContent } from '@/lib/rich-text';

interface RichTextProps {
  value: RichTextContent | null | undefined;
  /** Applied to the wrapper; set the text size/color here (children inherit). */
  className?: string;
}

/**
 * Renders Strapi "Rich Text (Blocks)" content (or a plain string, normalized to
 * blocks). Block elements map to the portfolio's existing typography; color/size
 * come from `className` on the wrapper so each call site can match its surroundings.
 */
export function RichText({ value, className }: RichTextProps) {
  if (!hasRichText(value)) return null;

  return (
    <div className={cn('space-y-4', className)}>
      <BlocksRenderer
        content={toBlocks(value)}
        blocks={{
          paragraph: ({ children }) => <p className="leading-relaxed">{children}</p>,
          heading: ({ children, level }) => {
            const Tag = `h${level}` as const;
            return <Tag className="font-bold leading-tight">{children}</Tag>;
          },
          list: ({ children, format }) =>
            format === 'ordered' ? (
              <ol className="list-decimal pl-6 space-y-1">{children}</ol>
            ) : (
              <ul className="list-disc pl-6 space-y-1">{children}</ul>
            ),
          'list-item': ({ children }) => <li className="leading-relaxed">{children}</li>,
          link: ({ children, url }) => (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80 text-[#94B298]"
            >
              {children}
            </a>
          ),
          quote: ({ children }) => (
            <blockquote className="border-l-2 border-current/40 pl-4 italic">{children}</blockquote>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong className="font-extrabold">{children}</strong>,
          italic: ({ children }) => <em className="italic">{children}</em>,
          underline: ({ children }) => <u className="underline">{children}</u>,
        }}
      />
    </div>
  );
}
