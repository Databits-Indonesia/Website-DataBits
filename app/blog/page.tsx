'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
// import Image from 'next/image';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { useThemeToggle } from '@/components/ThemeToggle';

type Page = 'HOME' | 'ABOUT' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState<Page>('BLOG');
  const { resolvedTheme } = useTheme();
  const { toggleTheme } = useThemeToggle();

  const allPosts = [
    {
      title: 'The Future of Generative AI in Business',
      category: 'Product Updates',
      readTime: '5 min read',
      date: 'October 26, 2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6kpsvjziu-XR9FIWnr7c43CzORHO95BI-LaRSQ4_23pN6MepScVJDJLmPiuJW7DhZq9XSxPf6HJ-l8BQ96HwW9eawS42WdxywC4bJSr8uYkENWflotg5PYk5NXJVXKUsHZJGDT6vKz4WEPjuia7_aOv11d7tIhA4q8t1vFnKIXxF3qzaKh0YPYFALq1CiZEpI2z0JlUI-q382nZyzS8fZA6fMQa9GQiqt0-TsJvoBp94ImBza9f0zwXBhU0Bd9Dlu2Rz9ll29u2eh',
      desc: 'Explore how our latest advancements in generative AI are reshaping industries and what it means for your business operations.',
      featured: true
    },
    {
      title: 'Navigating the World of Big Data',
      category: 'Data Science',
      readTime: '7 min read',
      date: 'October 15, 2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZxJi1e6Gvtiin7A43Qutox0k__o8vWhk1H85U_OYCAYGT5vFlwsshm0S1pFDQBVNKWOIz1Sjjio3Mjrrr4iVvXRer655_Ln2165_vXztlCiXFBgKEDuk2pC8djUQtq4fMVjZVKgdk5EkwWFVovS3w8C_JobZVbpZVQ_98juXYaFlzQT-iVUNIA6P-wD4t7lES2uPyqCr9u1g4o7cO0kdEx0rtUB626_b61XFHOYzBqisIFvGGxWva-_jpPcaehA0bNHT-tFa9fN_',
      desc: 'A deep dive into the methodologies we use to process and analyze petabytes of data efficiently.',
      featured: false
    },
    {
      title: 'Our Tech Stack for Scalable AI',
      category: 'Engineering',
      readTime: '4 min read',
      date: 'October 02, 2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl1iVukPHABk2Vb_EAJLAKUJQ3qIQlTFwSEWW6rsHbKh-PM2bP08SisBT4IS-nEojWI1Tsz6LPwm0vJTkh4L3doc8O3lHNIGHsROUtMNtWzmk_CNQRkiAJ2lrJ0O6JB1R3sF9OAcuq7KTQDsnd-gacIT7WF7xoKHpXql7cB4J2DAXcFe0_tC-D2hulAKOAal6iaCXEw1kgMZLAVX4CaMg7bgjr5aNIuUewn6E0UwiksGlMeyfOHKMRU6Uw_kihhHPbTBVXLW401zgp',
      desc: 'Discover the technologies that power DataBits and why we chose them for performance and reliability.',
      featured: false
    },
    {
      title: 'Ethical Considerations in AI',
      category: 'AI Research',
      readTime: '9 min read',
      date: 'September 21, 2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIesjcL8TKqg13LVGjHhaUv0bxvMkvdMjZyAaDWG3Ty_RqEVvPs5uy25cuiC7NsYQCNgB-_gNrf1jgqH2QYdOCNW6LyK2gxPafBeJpT9-AggpiVreiUaLOmY9P5cI_Zv9AsVK1nRpJwo0ohtywFzvt3xuQFjakaUMqpL3Bq-6etJ7aPGnDbf29YNQl9qxaNURGRlT5AdHLWj_R_UbONmcF0fereGwpO3sPwOy51HcHBaOntpYk928vn8olZg4llcfekrgt57PeDRWX',
      desc: 'How we approach building responsible AI systems that are fair, transparent, and accountable.',
      featured: false
    }
  ];

  const categories = ['All', 'Product Updates', 'Data Science', 'Engineering', 'AI Research', 'Industry Trends'];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = allPosts.find(p => p.featured);
  const isDefaultView = searchQuery === '' && selectedCategory === 'All';
  const postsToShow = isDefaultView ? allPosts.filter(p => !p.featured) : filteredPosts;

  return (
    <>
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isDarkMode={resolvedTheme === 'dark'}
        toggleTheme={toggleTheme}
      />
      <div className="container mx-auto px-4 md:px-10 py-12 flex flex-col gap-10" data-animate="reveal">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-2">The DataBits Blog</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Insights on AI Research, Product Updates, and Industry Trends</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-6">
        <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
            <input 
              type="text" 
              placeholder="Search articles" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#232f48] text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" 
            />
        </div>
        <div className="relative flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((tag, i) => (
                <motion.button 
                  key={i} 
                  onClick={() => setSelectedCategory(tag)}
                  initial={false}
                  animate={{
                    backgroundColor: selectedCategory === tag 
                      ? 'var(--selected-bg)' 
                      : 'transparent'
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all transform hover:scale-105 active:scale-95 ${
                    selectedCategory === tag 
                      ? 'bg-black dark:bg-white text-white dark:text-black border-transparent shadow-sm' 
                      : 'border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                    {tag}
                    {selectedCategory === tag && (
                      <motion.div
                        layoutId="category-underline"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-black dark:bg-white rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                </motion.button>
            ))}
        </div>
      </div>

      {/* Featured Article - Only shown in default view */}
      {isDefaultView && featuredPost && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Articles</h2>
          <div className="group grid grid-cols-1 md:grid-cols-2 gap-8 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg dark:hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
              <img 
                src={featuredPost.img} 
                alt={featuredPost.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-64 object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500" 
              />
              <div className="flex flex-col justify-center gap-4">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{featuredPost.category} · {featuredPost.readTime}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{featuredPost.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{featuredPost.desc}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{featuredPost.date}</span>
              </div>
          </div>
        </div>
      )}

      {/* Article Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {isDefaultView ? 'All Articles' : `Search Results (${postsToShow.length})`}
        </h2>
        
        {postsToShow.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {postsToShow.map((post, i) => (
                  <div key={i} className="group border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col grow">
                      <img 
                        src={post.img} 
                        alt={post.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                      />
                      <div className="p-6 flex flex-col gap-3 grow">
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{post.category}</span>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{post.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">{post.desc}</p>
                          <div className="mt-auto flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-4">search_off</span>
            <p className="text-gray-500 dark:text-gray-400">No articles found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 text-primary font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination - Only show if we have many posts (simulated) */}
      {isDefaultView && (
        <div className="flex justify-center gap-2 mt-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"><span className="material-symbols-outlined">chevron_left</span></button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black font-bold">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"><span className="material-symbols-outlined">chevron_right</span></button>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default BlogPage;