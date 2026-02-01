import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { APIClient, API_BASE_URL } from '@/lib/api-client';

// Helper to estimate read time from content
function estimateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Helper to render markdown content as HTML
function MarkdownContent({ content }: { content: string }) {
  return (
    <div 
      className="blog-content"
      dangerouslySetInnerHTML={{ 
        __html: content
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
          .replace(/\*(.*)\*/gim, '<em>$1</em>')
          .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code>$2</code></pre>')
          .replace(/`([^`]+)`/gim, '<code>$1</code>')
          .replace(/^\- (.*$)/gim, '<li>$1</li>')
          .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
          .replace(/\n\n/g, '</p><p>')
          .replace(/\n/g, '<br />')
          .replace(/^(?!<[hup]|<li|<code|<pre)/gim, '<p>')
          .replace(/(?<!>)$/gim, '</p>')
          .replace(/<p><\/p>/g, '')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
          .replace(/\|(.+)\|/g, (match) => {
            const cells = match.split('|').filter(c => c.trim());
            return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
          })
          .replace(/(<tr>.*<\/tr>)/s, '<table>$1</table>')
      }}
    />
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params;

  const blog = await APIClient.getPublicBlogById(slug, (locale as 'id' | 'en') || 'en');
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section with Cover Image */}
        {blog.cover_url && (
          <div className="relative w-full h-96 md:h-125 overflow-hidden">
            <Image
              src={`${API_BASE_URL}${blog.cover_url}`}
              alt={blog.title}
              fill
              className="w-full h-full object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-40"></div>
          </div>
        )}

        {/* Article Content */}
        <article className="container mx-auto px-4 md:px-10 py-12 md:py-20 max-w-4xl">
          
          {/* Back to Blog Button */}
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-8">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back to Blog
          </Link>

          {/* Article Header with Metadata */}
          <header className="mb-12">
            <h1 className="h1 mb-4">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">{blog.user}</span>
              <span>{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                {blog.category}
              </span>
              <span>{estimateReadTime(blog.content)}</span>
              <span>{blog.views} views</span>
            </div>
          </header>

          {/* Article Body */}
          <MarkdownContent content={blog.content} />
        </article>
      </main>
      <Footer />
    </>
  );
}