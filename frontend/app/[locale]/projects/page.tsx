// Ada kategori: Web Dev, AI Engineer, AI research, Android Dev, etc.
'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/components/i18n-provider';
import { APIClient, API_BASE_URL } from '@/lib/api-client';

const ProjectPage = () => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t('projects.categoryAll'));
  const [projects, setProjects] = useState<Array<{
    id: number;
    title: string;
    desc: string;
    link: string;
    cover_url: string;
    category: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedCategory(t('projects.categoryAll'));
  }, [t]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await APIClient.getPublicProjects('en');
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((project) => project.category)));
    return [t('projects.categoryAll'), ...unique];
  }, [projects, t]);

  const filteredPosts = projects.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === t('projects.categoryAll') || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isDefaultView = searchQuery === '' && selectedCategory === t('projects.categoryAll');

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-10 py-12 flex flex-col gap-10" data-animate="reveal">
      <div className="text-center">
        <h1 className="h1">{t('projects.heroTitle')}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">{t('projects.heroDescription')}</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-6">
        <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
            <input 
              type="text" 
              placeholder={t('projects.searchPlaceholder')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-box" 
            />
        </div>
        <div className="relative flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((tag, i) => (
                <motion.button 
                  key={i} 
                  onClick={() => setSelectedCategory(tag)}
                  className={`chip ${selectedCategory === tag ? 'chip-active' : ''}`}
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

      {/* Article Grid */}
      <div>
        <h2 className="h2-sm mb-6">
          {isDefaultView ? t('projects.allPortfolio') : `${t('projects.searchResults')} (${filteredPosts.length})`}
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                  <div key={i} className="group border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col grow">
                      <Image 
                        src={`${API_BASE_URL}${post.cover_url}`} 
                        alt={post.title} 
                        width={400}
                        height={250}
                        unoptimized
                        loading="lazy"
                        decoding="async"
                        className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                      />
                      <div className="p-6 flex flex-col gap-3 grow">
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{post.category}</span>
                          <h3 className="h3 group-hover:text-primary transition-colors">{post.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">{post.desc}</p>
                          <a href={post.link} className="text-sm">{t('projects.viewProject')}</a>
                      </div>
                  </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-4">search_off</span>
            <p className="text-gray-500 dark:text-gray-400">{t('projects.noResults')}</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory(t('projects.categoryAll')); }}
              className="mt-4 text-primary font-bold hover:underline"
            >
              {t('projects.clearFilters')}
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

export default ProjectPage;