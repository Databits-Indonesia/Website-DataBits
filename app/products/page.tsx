'use client';

import { motion } from 'framer-motion'
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';

type Page = 'HOME' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT' | 'ABOUT';

const ProductsPage = () => {
  const [currentPage] = useState<Page>('PRODUCTS');
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

  const openSourceProjects = [
    {
      title: 'Flask CNN Mangrove',
      desc: 'Web application with flask to predict mangrove types based on leaves with CNN.',
      stars: '1.2k',
      forks: '234',
      link: 'https://github.com/Databits-Indonesia/Flask-CNN-Mangrove',
      language: 'Website'
    },
    {
      title: 'databits',
      desc: 'Python library for Text Classifier using LSTM, GRU, and Transformer BERT.',
      stars: '890',
      forks: '156',
      link: 'https://github.com/Databitss/databits',
      language: 'Python'
    },
    {
      title: 'ResCB',
      desc: 'Res4net base network with the Convolutional Block Attention Module (CBAM) to improve performance and efficiency.',
      stars: '2.5k',
      forks: '402',
      link: 'https://github.com/Databitss/ResCB',
      language: 'Python'
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

      {/* Open Source Section */}
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
                        <span className="material-symbols-outlined text-2xl">code</span>
                    </div>
                </motion.div>
                <h2 className="h2-sm">Open Source</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    We believe in giving back to the community. Check out our open source contributions that are powering the next generation of AI tools.
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
                            <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">{project.language}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 grow">{project.desc}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-1.5" title="Stars">
                                <span className="material-symbols-outlined text-[18px]">star</span>
                                <span className="font-mono">{project.stars}</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Forks">
                                <span className="material-symbols-outlined text-[18px]">call_split</span>
                                <span className="font-mono">{project.forks}</span>
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
                    View all repositories <span className="material-symbols-outlined">arrow_forward</span>
                 </motion.a>
            </motion.div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;