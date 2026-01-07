'use client';

import { motion } from 'framer-motion'
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// type Page = 'HOME' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT' | 'ABOUT';

const ProductsPage = () => {
  // const [currentPage] = useState<Page>('PRODUCTS');
//   const router = useRouter();

  const products = [
    {
      title: 'BitsChat',
      desc: 'Advanced AI conversational assistant tailored for enterprise needs.',
      link: '#',
      icon: 'forum',
      badge: 'Coming Soon',
      external: false
    },
    {
      title: 'DataBits Convert',
      desc: 'Seamlessly convert data between various formats with our powerful online tool.',
      link: 'https://databits.co-id.id/convert',
      icon: 'transform',
      badge: null,
      external: true
    },
    {
      title: 'DataBits Shop',
      desc: 'Get exclusive DataBits merchandise, digital assets, and resources.',
      link: 'https://sociabuzz.com/databits/shop',
      icon: 'shopping_bag',
      badge: null,
      external: true
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
            Our Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tools and platforms built to empower your data journey.
          </p>
        </motion.div>
      </section>

      <section className="section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.a
                key={i}
                href={product.link}
                target={product.external ? "_blank" : "_self"}
                rel={product.external ? "noopener noreferrer" : ""}
                className={`card card-hover flex flex-col relative grow ${!product.external && product.link === '#' ? 'cursor-default opacity-80' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: product.link !== '#' ? -8 : 0, transition: { duration: 0.2 } }}
                onClick={(e) => {
                    if (product.link === '#') e.preventDefault();
                  }}
                >
                  {product.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                      {product.badge}
                    </div>
                  )}
                  {product.external && (
                    <div className="absolute top-4 right-4 text-gray-400">
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </div>
                  )}

                <motion.div 
                  className="icon-box"
                  whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
                >
                   <span className="material-symbols-outlined">{product.icon}</span>
                </motion.div>
                <h3 className="h3 mb-3">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 grow">{product.desc}</p>

                  {product.link !== '#' ? (
                    <div className="font-bold text-primary text-sm flex items-center gap-2">
                      Open Product <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  ) : (
                    <div className="font-bold text-gray-400 text-sm flex items-center gap-2">
                      Stay Tuned
                    </div>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;