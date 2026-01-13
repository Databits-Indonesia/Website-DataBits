import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface FrontMatter {
  title?: string;
  category?: string;
  readTime?: string;
  date?: string;
  author?: string;
  cover?: string;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  // Read the MDX file to extract frontmatter using gray-matter
  const filePath = join(process.cwd(), 'content', `${slug}.mdx`);
  const fileContent = readFileSync(filePath, 'utf-8');
  const { data: frontMatter } = matter(fileContent) as { data: FrontMatter };
  
  // Import the MDX component
  const { default: Post } = await import(`@/content/${slug}.mdx`)
 
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section with Cover Image */}
        {frontMatter.cover && (
          <div className="relative w-full h-96 md:h-125 overflow-hidden">
            <Image
              src={frontMatter.cover}
              alt={frontMatter.title || 'Article cover'}
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
          {/* Article Header with Metadata */}
          <header className="mb-12">
            <h1 className="h1 mb-4">{frontMatter.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-800">
              {frontMatter.author && (
                <span className="font-medium text-gray-700 dark:text-gray-300">{frontMatter.author}</span>
              )}
              {frontMatter.date && (
                <span>{frontMatter.date}</span>
              )}
              {frontMatter.category && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  {frontMatter.category}
                </span>
              )}
              {frontMatter.readTime && (
                <span>{frontMatter.readTime}</span>
              )}
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-invert dark:prose dark:prose-invert max-w-none">
            <Post />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
 
export function generateStaticParams() {
  return [
    { slug: 'welcome' },
    { slug: 'about' },
    { slug: 'generative-ai-business' },
    { slug: 'big-data-navigation' },
    { slug: 'tech-stack-scalable-ai' },
    { slug: 'ethical-ai' }
  ]
}

export const dynamicParams = false