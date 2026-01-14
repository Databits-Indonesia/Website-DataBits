'use client';

import { motion } from 'motion/react'
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/components/i18n-provider';

const CareersPage = () => {
  const { t } = useI18n();
  
  const benefits = [
    {
      icon: 'workspace_premium',
      title: t('careers.benefit1Title'),
      desc: t('careers.benefit1Desc')
    },
    {
      icon: 'schedule',
      title: t('careers.benefit2Title'),
      desc: t('careers.benefit2Desc')
    },
    {
      icon: 'health_and_safety',
      title: t('careers.benefit3Title'),
      desc: t('careers.benefit3Desc')
    },
    {
      icon: 'school',
      title: t('careers.benefit4Title'),
      desc: t('careers.benefit4Desc')
    },
    {
      icon: 'diversity_3',
      title: t('careers.benefit5Title'),
      desc: t('careers.benefit5Desc')
    },
    {
      icon: 'rocket_launch',
      title: t('careers.benefit6Title'),
      desc: t('careers.benefit6Desc')
    }
  ];

  const openPositions = [
    {
      title: 'Senior Machine Learning Engineer',
      department: 'Engineering',
      location: 'Remote / Jakarta',
      type: 'Full-time',
      description: 'Lead the development of advanced ML models and contribute to our core AI infrastructure.'
    },
    {
      title: 'Data Scientist',
      department: 'Research',
      location: 'Remote / Jakarta',
      type: 'Full-time',
      description: 'Analyze complex datasets and develop predictive models to drive business insights.'
    },
    {
      title: 'AI Research Scientist',
      department: 'Research',
      location: 'Remote',
      type: 'Full-time',
      description: 'Conduct cutting-edge research in deep learning and publish in top-tier conferences.'
    },
    {
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote / Jakarta',
      type: 'Full-time',
      description: 'Build scalable web applications and APIs that power our AI solutions.'
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote / Jakarta',
      type: 'Full-time',
      description: 'Manage infrastructure, CI/CD pipelines, and ensure system reliability.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Jakarta',
      type: 'Full-time',
      description: 'Define product strategy and roadmap for our AI-powered solutions.'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-[calc(100vh-(--spacing(20)))]">
        {/* Hero Section */}
        <section className="section section-muted">
          <motion.div 
            className="container mx-auto text-center max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="h1">
              {t('careers.heroTitle')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('careers.heroDescription')}
            </p>
          </motion.div>
        </section>

        {/* Why Join Us Section */}
        <section className="section">
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
                  <span className="material-symbols-outlined text-2xl">favorite</span>
                </div>
              </motion.div>
              <h2 className="h2-sm">{t('careers.whyJoinTitle')}</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('careers.whyJoinDescription')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={i} 
                  className="card group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="icon-box icon-box-hover mb-4">
                    <span className="material-symbols-outlined text-2xl">{benefit.icon}</span>
                  </div>
                  <h3 className="h3-sm mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="section section-muted border-t border-gray-200 dark:border-gray-800">
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
                  <span className="material-symbols-outlined text-2xl">work</span>
                </div>
              </motion.div>
              <h2 className="h2-sm">{t('careers.openPositionsTitle')}</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('careers.openPositionsDescription')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              {openPositions.map((position, i) => (
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
                    <div className="flex-1">
                      <h3 className="h3-sm group-hover:text-primary transition-colors mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs font-medium px-2 py-1 rounded bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 flex items-center gap-1">
                          {position.department}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 rounded bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          {position.location}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 rounded bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 flex items-center gap-1">
                          {position.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {position.description}
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-1 text-sm font-bold icon-color hover:text-primary transition-colors"
                  >
                    {t('careers.applyNow')} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
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
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('careers.noPositionText')}
              </p>
              <motion.a 
                href="#" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('careers.sendResumeButton')} <span className="material-symbols-outlined">mail</span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container mx-auto">
            <motion.div 
              className="cta-box"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="h2-sm mb-4">{t('careers.ctaTitle')}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                {t('careers.ctaDescription')}
              </p>
              <motion.a 
                href="#" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('careers.viewAllPositions')} <span className="material-symbols-outlined">arrow_forward</span>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CareersPage;
