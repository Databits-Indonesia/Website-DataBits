'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react'
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/components/i18n-provider';
import { APIClient } from '@/lib/api-client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// type Page = 'HOME' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT' | 'ABOUT';

const ProductsPage = () => {
  // const [currentPage] = useState<Page>('PRODUCTS');
//   const router = useRouter();
  const { t } = useI18n();

  const [products, setProducts] = useState<Array<{
    id: number;
    name: string;
    desc: string;
    link: string;
    icon: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await APIClient.getPublicProducts('en');
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
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
            {t('products.heroTitle')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('products.heroDescription')}
          </p>
        </motion.div>
      </section>

      <section className="section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              products.map((product, i) => (
              <motion.a
                key={product.id}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover flex flex-col relative grow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className="absolute top-4 right-4 text-gray-400">
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </div>

                <motion.div 
                  className="icon-box"
                  whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
                >
                   <span className="material-symbols-outlined">{product.icon}</span>
                </motion.div>
                <h3 className="h3 mb-3">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 grow">{product.desc}</p>

                  <div className="font-bold text-primary text-sm flex items-center gap-2">
                    {t('products.openProduct')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </motion.a>
              ))
            )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;