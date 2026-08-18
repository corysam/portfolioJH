'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app/error]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-neutral-50 dark:bg-[#001616]">
      <div className="max-w-lg text-center space-y-6">
        <h1 className="fascinate-title text-4xl sm:text-5xl text-foreground">Something went wrong</h1>
        <p className="text-[#D4D0BF] leading-relaxed">
          An unexpected error occurred while rendering this page. You can retry, or head back home.
        </p>
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-2xl border-2 border-primary text-foreground font-bold hover:bg-primary/10 transition-all"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
