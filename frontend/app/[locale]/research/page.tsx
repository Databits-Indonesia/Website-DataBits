'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react'
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/components/i18n-provider';
import { APIClient } from '@/lib/api-client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// type Page = 'HOME' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT' | 'ABOUT' | 'RESEARCH' | 'PORTOFOLIO';

const ResearchPage = () => {
  const { t } = useI18n();
//   const [currentPage] = useState<Page>('PRODUCTS');
//   const router = useRouter();

  const [publications, setPublications] = useState<Array<{
    id: number;
    title: string;
    writer: string;
    journal: string;
    desc: string;
    link: string;
    publication_date: string;
  }>>([]);
  const [loadingPublications, setLoadingPublications] = useState(true);
  const [openSourceResearch, setOpenSourceResearch] = useState<Array<{
    id: number;
    title: string;
    desc: string;
    link: string;
    category_id: number;
  }>>([]);
  const [loadingResearch, setLoadingResearch] = useState(true);
  
  useEffect(() => {
    const loadPublications = async () => {
      try {
        const data = await APIClient.getPublicPublications('en');
        setPublications(data);
      } catch (error) {
        console.error('Failed to load publications:', error);
      } finally {
        setLoadingPublications(false);
      }
    };

    loadPublications();
  }, []);

  useEffect(() => {
    const loadResearch = async () => {
      try {
        const data = await APIClient.getPublicResearch('en');
        setOpenSourceResearch(data);
      } catch (error) {
        console.error('Failed to load open source research:', error);
      } finally {
        setLoadingResearch(false);
      }
    };

    loadResearch();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-[calc(100vh-(--spacing(20)))]">
        <section className="section section-muted">
        <motion.div 
          className="container mx-auto text-center max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="h1">
            {t('research.heroTitle')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('research.heroDescription')}
          </p>
        </motion.div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="section">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="code-icon">
                <span className="material-symbols-outlined text-2xl">description</span>
              </div>
            </motion.div>
            <h2 className="h2-sm">{t('research.publicationsTitle')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('research.publicationsDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {loadingPublications ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              publications.map((pub, i) => (
              <motion.div 
                key={pub.id} 
                className="card card-hover group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                  <h3 className="h3-sm group-hover:text-primary transition-colors flex-1">{pub.title}</h3>
                  <span className="text-sm font-bold px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 self-start">
                    {new Date(pub.publication_date).getFullYear()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {pub.writer}
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {pub.journal}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {pub.desc}
                </p>
                <a 
                  href={pub.link} 
                  className="inline-flex items-center gap-1 text-sm font-bold icon-color hover:text-primary transition-colors"
                >
                  {t('research.readPaper')} <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
              </motion.div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section id="open-source" className="section section-muted border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
                <motion.div 
                  className="flex items-center justify-center gap-2 mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <div className="code-icon">
                        <span className="material-symbols-outlined text-2xl">code</span>
                    </div>
                </motion.div>
                <h2 className="h2-sm">{t('research.openSourceTitle')}</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {t('research.openSourceDescription')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {loadingResearch ? (
                <div className="col-span-full flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
              openSourceResearch.map((project, i) => (
                    <motion.div 
                  key={project.id} 
                      className="card card-hover flex flex-col group grow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="h3 group-hover:text-primary transition-colors">{project.title}</h3>
                          <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Category {project.category_id}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 grow">{project.desc}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-1.5" title="Stars">
                                {/* <span className="material-symbols-outlined text-[18px]">star</span> */}
                                {/* <span className="font-mono">{project.stars}</span> */}
                            </div>
                            <div className="flex items-center gap-1.5" title="Forks">
                                {/* <span className="material-symbols-outlined text-[18px]">call_split</span> */}
                                {/* <span className="font-mono">{project.forks}</span> */}
                            </div>
                            <a href={project.link} className="ml-auto flex items-center gap-1 font-bold icon-color hover:text-primary transition-colors">
                                GitHub <span className="material-symbols-outlined text-[16px] icon-color">arrow_outward</span>
                            </a>
                        </div>
                    </motion.div>
                  ))
                  )}
            </div>
            
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
                 <motion.a 
                   href="https://github.com/Databits-Indonesia" 
                   className="btn btn-secondary"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                 >
                    {t('research.viewAllRepositories')} <span className="material-symbols-outlined">arrow_forward</span>
                 </motion.a>
            </motion.div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
};

export default ResearchPage;