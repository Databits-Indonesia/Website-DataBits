'use client';

import { motion } from 'motion/react'
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/components/i18n-provider';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// type Page = 'HOME' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT' | 'ABOUT' | 'RESEARCH' | 'PORTOFOLIO';

const ResearchPage = () => {
  const { t } = useI18n();
//   const [currentPage] = useState<Page>('PRODUCTS');
//   const router = useRouter();
  
  const publications = [
    {
      title: t('research.pub1Title'),
      authors: t('research.pub1Authors'),
      venue: t('research.pub1Venue'),
      year: t('research.pub1Year'),
      link: '#',
      abstract: t('research.pub1Abstract')
    },
    {
      title: t('research.pub2Title'),
      authors: t('research.pub2Authors'),
      venue: t('research.pub2Venue'),
      year: t('research.pub2Year'),
      link: '#',
      abstract: t('research.pub2Abstract')
    },
    {
      title: t('research.pub3Title'),
      authors: t('research.pub3Authors'),
      venue: t('research.pub3Venue'),
      year: t('research.pub3Year'),
      link: '#',
      abstract: t('research.pub3Abstract')
    }
  ];

  const openSourceProjects = [
    {
      title: t('research.project1Title'),
      desc: t('research.project1Desc'),
      link: 'https://github.com/Databitss/Mangrove-Research',
      kategori: t('research.project1Category')
    },
    {
      title: t('research.project2Title'),
      desc: t('research.project2Desc'),
      link: 'https://github.com/Databits-Indonesia/Flask-CNN-Mangrove',
      kategori: t('research.project2Category')
    },
    {
      title: t('research.project3Title'),
      desc: t('research.project3Desc'),
      link: 'https://github.com/Databitss/databits',
      kategori: t('research.project3Category')
    },
    {
      title: t('research.project4Title'),
      desc: t('research.project4Desc'),
      link: 'https://github.com/Databitss/VideoCaptioning',
      kategori: t('research.project4Category')
    },
    {
      title: t('research.project5Title'),
      desc: t('research.project5Desc'),
      link: 'https://github.com/Databitss/AudioTransformer',
      kategori: t('research.project5Category')
    }
  ];

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
            {publications.map((pub, i) => (
              <motion.div 
                key={i} 
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
                    {pub.year}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {pub.authors}
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {pub.venue}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {pub.abstract}
                </p>
                <a 
                  href={pub.link} 
                  className="inline-flex items-center gap-1 text-sm font-bold icon-color hover:text-primary transition-colors"
                >
                  {t('research.readPaper')} <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
              </motion.div>
            ))}
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
                {openSourceProjects.map((project, i) => (
                    <motion.div 
                      key={i} 
                      className="card card-hover flex flex-col group grow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="h3 group-hover:text-primary transition-colors">{project.title}</h3>
                            <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">{project.kategori}</span>
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
                ))}
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