'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
  params,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  params?: { locale: string };
}) {
  const locale = params?.locale || 'en';

  return (
    <div className="min-h-screen container mx-auto px-4 py-20 flex flex-col items-center justify-center">
      <h1 className="h1 mb-4">Something went wrong</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
        {error.message || 'Failed to load the blog post. Please try again.'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          Try Again
        </button>
        <Link
          href={`/${locale}/blog`}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
