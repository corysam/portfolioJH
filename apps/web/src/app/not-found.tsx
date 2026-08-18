import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-neutral-50 dark:bg-[#001616]">
      <div className="max-w-lg text-center space-y-6">
        <p className="text-sm uppercase tracking-widest font-bold text-primary">404</p>
        <h1 className="fascinate-title text-4xl sm:text-5xl text-foreground">Page not found</h1>
        <p className="text-[#D4D0BF] leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
