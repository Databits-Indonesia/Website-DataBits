'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { getCurrentLocale, localizePath } from '@/lib/i18n';
import { useI18n } from '@/components/i18n-provider';

// Navigation State
type Page = 'HOME' | 'ABOUT' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT' | 'PORTOFOLIO' | 'RESEARCH';

// SEO helpers
type PageMeta = {
  title: string;
  description: string;
  path: string;
  structuredData?: Record<string, unknown>;
};

const SITE_URL = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://databitsid.tech';
const SITE_NAME = 'DataBits';

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  sameAs: [
    'https://github.com/Databits-Indonesia',
    'https://www.linkedin.com/company/databits',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'databitsteam@gmail.com',
      telephone: '+62-896-3634-4666',
      contactType: 'customer support',
      areaServed: 'Worldwide',
      availableLanguage: ['en', 'id'],
    },
  ],
};

const breadcrumbSchema = (meta: PageMeta) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: meta.title, item: `${SITE_URL}${meta.path}` },
  ],
});

const PAGE_METADATA: Record<Page, PageMeta> = {
  HOME: {
    title: `${SITE_NAME} | AI Platform & Services`,
    description:
      'DataBits delivers AI solutions, predictive analytics, NLP, and computer vision to turn data into intelligence for modern businesses.',
    path: '/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={query}`,
        'query-input': 'required name=query',
      },
    },
  },
  SERVICES: {
    title: `${SITE_NAME} | AI Services & Consulting`,
    description: 'AI strategy, machine learning, NLP, and computer vision services tailored to your business goals.',
    path: '/services',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'AI Services',
      provider: SITE_NAME,
      url: `${SITE_URL}/services`,
      areaServed: 'Worldwide',
    },
  },
  PRODUCTS: {
    title: `${SITE_NAME} | Products & Tools`,
    description: 'Explore BitsChat, DataBits Convert, DataBits Shop, and open-source AI projects built by the DataBits team.',
    path: '/products',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Products',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'BitsChat' },
        { '@type': 'ListItem', position: 2, name: 'DataBits Convert' },
        { '@type': 'ListItem', position: 3, name: 'DataBits Shop' },
      ],
    },
  },
  ABOUT: {
    title: `${SITE_NAME} | About the Team`,
    description: 'Meet the DataBits founders, mission, vision, and the story behind building responsible, innovative AI.',
    path: '/about',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About DataBits',
      url: `${SITE_URL}/about`,
    },
  },
  BLOG: {
    title: `${SITE_NAME} | Blog & Insights`,
    description: 'AI research, engineering deep-dives, data science guides, and product updates from the DataBits team.',
    path: '/blog',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'DataBits Blog',
      url: `${SITE_URL}/blog`,
    },
  },
  CONTACT: {
    title: `${SITE_NAME} | Contact & Sales`,
    description: 'Contact DataBits for sales inquiries, partnerships, or support. We respond quickly to every message.',
    path: '/contact',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact DataBits',
      url: `${SITE_URL}/contact`,
    },
  },
  RESEARCH: {
    title: `${SITE_NAME} | Research`,
    description: 'Reseach Open Source (Open Collaboration)',
    path: '/research',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ResearchPage',
      name: 'Research DataBits',
      url: `${SITE_URL}/research`,
    },
  },
  PORTOFOLIO: {
    title: `${SITE_NAME} | Portofolio`,
    description: 'Portofolio',
    path: '/porto',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'PortofolioPage',
      name: 'Portofolio DataBits',
      url: `${SITE_URL}/porto`,
    },
  },
};

const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  const selector = `meta[${attribute}="${key}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  const selector = `link[rel="${rel}"]`;
  let tag = document.head.querySelector<HTMLLinkElement>(selector);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const injectStructuredData = (meta: PageMeta) => {
  const scriptId = 'page-structured-data';
  const existing = document.getElementById(scriptId);
  const graph = [ORGANIZATION_SCHEMA, breadcrumbSchema(meta), meta.structuredData].filter(Boolean);
  const payload = { '@context': 'https://schema.org', '@graph': graph };

  if (existing) {
    existing.textContent = JSON.stringify(payload);
    return;
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(payload);
  document.head.appendChild(script);
};

const SEO = ({ meta }: { meta: PageMeta }) => {
  useEffect(() => {
    document.title = meta.title;

    const canonical = `${SITE_URL}${meta.path}`;
    upsertLink('canonical', canonical);
    upsertMeta('name', 'description', meta.description);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'theme-color', '#000000');

    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, meta.title, meta.path);
    }

    injectStructuredData(meta);
  }, [meta]);

  return null;
};


const TypingHeadline = ({ t }: { t: (key: string) => string }) => {
  const lines = [
    { text: t('home.headline1'), className: '' },
    {
      text: t('home.headline2'),
      className: 'typing-line-2',
    },
  ];

  const [typedLines, setTypedLines] = useState<string[]>(Array(lines.length).fill(''));
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timer: number;

    const typeNext = () => {
      const currentLine = lines[lineIndex].text;
      if (charIndex <= currentLine.length) {
        setTypedLines((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine.slice(0, charIndex);
          return next;
        });
        charIndex += 1;
        timer = window.setTimeout(typeNext, 40);
      } else if (lineIndex < lines.length - 1) {
        lineIndex += 1;
        charIndex = 0;
        timer = window.setTimeout(typeNext, 150);
      } else {
        timer = window.setTimeout(() => setShowCaret(false), 1200);
      }
    };

    typeNext();

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="inline-flex flex-col items-center leading-tight">
      {lines.map((line, idx) => (
        <span key={idx} className={`typing-line ${line.className}`}>
          {typedLines[idx]}
          {showCaret && idx === lines.length - 1 && <span className="typing-caret">|</span>}
        </span>
      ))}
    </div>
  );
};

// --- Pages ---
const HomePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname);
  const { t } = useI18n();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="section" data-animate="reveal">
        <div className="container mx-auto text-center max-w-4xl flex flex-col items-center gap-6">
          <TypingHeadline t={t} />
          <p className="mx-auto max-w-2xl p mb-10">
            {t('home.heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn btn-primary w-full sm:w-auto shadow-lg" onClick={() => router.push(localizePath(locale, '/services'))}>
              {t('home.getStartedButton')}
            </button>
            <button onClick={() => router.push(localizePath(locale, '/contact'))} className="btn btn-secondary w-full sm:w-auto">
                {t('home.contactSalesButton')}
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-muted" data-animate="reveal">
        <div className="container mx-auto px-4 md:px-10">
          <div className="text-center mb-16">
            <h2 className="h2">{t('home.platformTitle')}</h2>
            <p className="p max-w-2xl mx-auto">{t('home.platformDescription')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'analytics', title: t('home.predictiveAnalyticsTitle'), desc: t('home.predictiveAnalyticsDesc') },
              { icon: 'hub', title: t('home.nlpTitle'), desc: t('home.nlpDesc') },
              { icon: 'brush', title: t('home.cvTitle'), desc: t('home.cvDesc') },
            ].map((service, idx) => (
              <div key={idx} data-animate="reveal-stagger" className="card card-hover group">
                <div className="icon-box icon-box-hover">
                  <span className="material-symbols-outlined">{service.icon}</span>
                </div>
                <h3 className="h3 mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" data-animate="reveal">
        <div className="container mx-auto">
            <div className="cta-box">
                <h2 className="h2 mb-6">{t('home.ctaTitle')}</h2>
                <p className="p mb-8 max-w-2xl mx-auto">{t('home.ctaDescription')}</p>
                <button onClick={() => router.push(localizePath(locale, '/contact'))} className="btn btn-primary">
                    {t('home.contactExpertsButton')}
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

// --- App Root ---
const App = () => {
  // const [mounted, setMounted] = useState(true);
  return (
    <div className="flex min-h-screen flex-col font-display">
      <SEO meta={PAGE_METADATA['HOME']} />
      <Navbar />
      <main className="grow">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
};

export default App;