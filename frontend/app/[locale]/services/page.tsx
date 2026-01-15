'use client';

// import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/components/i18n-provider';

// type Page = 'HOME' | 'ABOUT' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT';

const ServicesPage = () => {
  const router = useRouter();
  const { t } = useI18n();
  // const [currentPage] = useState<Page>('SERVICES');
  
  return (
    <>
      <Navbar />
      <div className="flex flex-col">
      {/* Hero */}
      <section id="hero" className="section section-muted" data-animate="reveal">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="h1">
            {t('services.heroTitle')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('services.heroDescription')}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section id="services" className="section" data-animate="reveal">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: t('services.dataAnalyticsTitle'),
                desc: t('services.dataAnalyticsDesc'),
                icon: "bar_chart",
                list: [t('services.dataAnalyticsItem1'), t('services.dataAnalyticsItem2'), t('services.dataAnalyticsItem3')]
              },
              {
                title: t('services.mlTitle'),
                desc: t('services.mlDesc'),
                icon: "memory",
                list: [t('services.mlItem1'), t('services.mlItem2'), t('services.mlItem3')]
              },
              {
                title: t('services.nlpTitle'),
                desc: t('services.nlpDesc'),
                icon: "chat",
                list: [t('services.nlpItem1'), t('services.nlpItem2'), t('services.nlpItem3')]
              },
              {
                title: t('services.cvTitle'),
                desc: t('services.cvDesc'),
                icon: "visibility",
                list: [t('services.cvItem1'), t('services.cvItem2'), t('services.cvItem3')]
              },
              {
                title: t('services.strategyTitle'),
                desc: t('services.strategyDesc'),
                icon: "lightbulb",
                list: [t('services.strategyItem1'), t('services.strategyItem2'), t('services.strategyItem3')]
              },
              {
                title: t('services.customTitle'),
                desc: t('services.customDesc'),
                icon: "code",
                list: [t('services.customItem1'), t('services.customItem2'), t('services.customItem3')]
              }
            ].map((s, i) => (
                <div key={i} data-animate="reveal-stagger" className="card card-hover flex flex-col">
                 <div className="icon-box">
                   <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <h3 className="h3 mb-3">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 grow">{s.desc}</p>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
                    <ul className="space-y-2">
                        {s.list.map((item, k) => (
                            <li key={k} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="material-symbols-outlined text-[18px] text-green-600 dark:text-green-400">check</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process/How we work */}
      <section id="process" className="section section-muted" data-animate="reveal">
         <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className="h2">{t('services.processTitle')}</h2>
                <p className="text-gray-600 dark:text-gray-400">{t('services.processDescription')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { num: "01", title: t('services.process1Title'), text: t('services.process1Desc') },
                    { num: "02", title: t('services.process2Title'), text: t('services.process2Desc') },
                    { num: "03", title: t('services.process3Title'), text: t('services.process3Desc') },
                    { num: "04", title: t('services.process4Title'), text: t('services.process4Desc') }
                ].map((step, i) => (
                    <div key={i} className="card card-hover relative">
                        <div className="text-4xl font-black text-gray-100 dark:text-gray-800 absolute top-4 right-4">{step.num}</div>
                        <h3 className="h3-sm mb-2 relative z-10">{step.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">{step.text}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section id="cta" className="section" data-animate="reveal">
        <div className="container mx-auto max-w-4xl text-center">
            <h2 className="h2">{t('services.ctaTitle')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{t('services.ctaDescription')}</p>
            <button onClick={() => router.push('/contact')} className="btn btn-primary">
                {t('services.ctaButton')}
            </button>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default ServicesPage;