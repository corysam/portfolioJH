import type { Metadata } from 'next';
import { Fascinate_Inline, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { getAbout } from '@/lib/content';
import './globals.css';
import CursorTrail from '@/components/CursorTrail';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const fascinate = Fascinate_Inline({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-fascinate',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  const title = `${about.title ?? ''} ${about.subtitle ?? ''}`.trim();
  const description = about.description?.split('\n\n')[0] ?? '';
  const siteName = about.subtitle ?? '';
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: siteName ? `%s · ${siteName}` : '%s',
    },
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url: siteUrl,
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${fascinate.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="min-h-screen bg-neutral-50 dark:bg-[#001616] text-neutral-900 dark:text-neutral-100 transition-colors duration-500">
            {children}
            <CursorTrail size={9} lifetime={600} density={0.020} zIndex={9999} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
