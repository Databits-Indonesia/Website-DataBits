// Ada kategori: Web Dev, AI Engineer, AI research, Android Dev, etc.
'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allPosts = [
    {
      title: 'Chatbot RAG',
      category: 'AI Engineer',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6kpsvjziu-XR9FIWnr7c43CzORHO95BI-LaRSQ4_23pN6MepScVJDJLmPiuJW7DhZq9XSxPf6HJ-l8BQ96HwW9eawS42WdxywC4bJSr8uYkENWflotg5PYk5NXJVXKUsHZJGDT6vKz4WEPjuia7_aOv11d7tIhA4q8t1vFnKIXxF3qzaKh0YPYFALq1CiZEpI2z0JlUI-q382nZyzS8fZA6fMQa9GQiqt0-TsJvoBp94ImBza9f0zwXBhU0Bd9Dlu2Rz9ll29u2eh',
      desc: 'Chatbot system with Gemini AI and RAG using LangGraph.',
      link: "https://www.ainigym.my.id"
    },
    {
      title: 'Kopilee Website',
      category: 'Web Dev',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6kpsvjziu-XR9FIWnr7c43CzORHO95BI-LaRSQ4_23pN6MepScVJDJLmPiuJW7DhZq9XSxPf6HJ-l8BQ96HwW9eawS42WdxywC4bJSr8uYkENWflotg5PYk5NXJVXKUsHZJGDT6vKz4WEPjuia7_aOv11d7tIhA4q8t1vFnKIXxF3qzaKh0YPYFALq1CiZEpI2z0JlUI-q382nZyzS8fZA6fMQa9GQiqt0-TsJvoBp94ImBza9f0zwXBhU0Bd9Dlu2Rz9ll29u2eh',
      desc: 'Coffee shop website landing page with dynamic data.',
      link: "https://www.ainigym.my.id"
    },
    {
      title: 'Identification of Lung Disease',
      category: 'Data Science',
      date: 'October 15, 2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZxJi1e6Gvtiin7A43Qutox0k__o8vWhk1H85U_OYCAYGT5vFlwsshm0S1pFDQBVNKWOIz1Sjjio3Mjrrr4iVvXRer655_Ln2165_vXztlCiXFBgKEDuk2pC8djUQtq4fMVjZVKgdk5EkwWFVovS3w8C_JobZVbpZVQ_98juXYaFlzQT-iVUNIA6P-wD4t7lES2uPyqCr9u1g4o7cO0kdEx0rtUB626_b61XFHOYzBqisIFvGGxWva-_jpPcaehA0bNHT-tFa9fN_',
      desc: 'Creating a model to identify lung disease based on cough sound and medical history.',
      link: "https://www.ainigym.my.id"
    },
    {
      title: 'Cross-Attention Video Vision Transformer',
      category: 'AI Research',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl1iVukPHABk2Vb_EAJLAKUJQ3qIQlTFwSEWW6rsHbKh-PM2bP08SisBT4IS-nEojWI1Tsz6LPwm0vJTkh4L3doc8O3lHNIGHsROUtMNtWzmk_CNQRkiAJ2lrJ0O6JB1R3sF9OAcuq7KTQDsnd-gacIT7WF7xoKHpXql7cB4J2DAXcFe0_tC-D2hulAKOAal6iaCXEw1kgMZLAVX4CaMg7bgjr5aNIuUewn6E0UwiksGlMeyfOHKMRU6Uw_kihhHPbTBVXLW401zgp',
      desc: 'Creates a new ViViT-based video feature extraction architecture that has 3.5x lower GFLOPs.',
      link: "https://www.ainigym.my.id"
    },
    {
      title: 'Know Mangrove',
      category: 'Mobile Dev',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIesjcL8TKqg13LVGjHhaUv0bxvMkvdMjZyAaDWG3Ty_RqEVvPs5uy25cuiC7NsYQCNgB-_gNrf1jgqH2QYdOCNW6LyK2gxPafBeJpT9-AggpiVreiUaLOmY9P5cI_Zv9AsVK1nRpJwo0ohtywFzvt3xuQFjakaUMqpL3Bq-6etJ7aPGnDbf29YNQl9qxaNURGRlT5AdHLWj_R_UbONmcF0fereGwpO3sPwOy51HcHBaOntpYk928vn8olZg4llcfekrgt57PeDRWX',
      desc: 'Android application for classifying mangrove types.',
      link: "https://www.ainigym.my.id"
    }
  ];

  const categories = ['All', 'Data Science', 'AI Engineer', 'AI Research', 'Mobile Dev', 'Web Dev', ];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isDefaultView = searchQuery === '' && selectedCategory === 'All';

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-10 py-12 flex flex-col gap-10" data-animate="reveal">
      <div className="text-center">
        <h1 className="h1">Databits Portfolio</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">This is a portfolio of what we have worked on.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-6">
        <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
            <input 
              type="text" 
              placeholder="Search portofolio" 
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
          {isDefaultView ? 'All Portfolio' : `Search Results (${filteredPosts.length})`}
        </h2>
        
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                  <div key={i} className="group border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col grow">
                      <Image 
                        src={post.img} 
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
                          <a href={post.link} className="text-sm">View Project</a>
                      </div>
                  </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-4">search_off</span>
            <p className="text-gray-500 dark:text-gray-400">No portfolio found matching your criteria.</p>
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