import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Strapi webhook target. Configure Strapi → Settings → Webhooks with:
 *   URL: https://yourdomain.com/api/revalidate?secret=<REVALIDATE_SECRET>
 *   Events: Entry create/update/delete/publish/unpublish
 *
 * The handler revalidates the home page, the project list cache tag, and
 * (when the event payload includes a `slug`) the matching detail page.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'invalid secret' }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = (await req.json()) as { entry?: { slug?: string } };
    slug = body?.entry?.slug;
  } catch {
    // Strapi sometimes posts without a body — that's fine, revalidate broadly.
  }

  try {
    revalidateTag('strapi');
    revalidatePath('/');
    if (slug) revalidatePath(`/projects/${slug}`);
  } catch (err) {
    console.error('[revalidate] failed:', err);
    return NextResponse.json(
      { ok: false, error: 'revalidation failed' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, revalidated: { home: true, slug: slug ?? null } });
}
