'use client';

import { motion } from 'motion/react'
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// type Page = 'HOME' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT' | 'ABOUT' | 'RESEARCH' | 'PORTOFOLIO';

const ResearchPage = () => {
//   const [currentPage] = useState<Page>('PRODUCTS');
//   const router = useRouter();
  
  const openSourceProjects = [
    {
      title: 'Mangrove-Research',
      desc: 'CNN model to predict mangrove species based on their leaves.',
      // stars: '1.2k',
      // forks: '234',
      link: 'https://github.com/Databitss/Mangrove-Research',
      kategori: 'CNN Model'
    },
    {
      title: 'Flask CNN Mangrove',
      desc: 'Web application with flask to predict mangrove types based on leaves with CNN.',
      // stars: '1.2k',
      // forks: '234',
      link: 'https://github.com/Databits-Indonesia/Flask-CNN-Mangrove',
      kategori: 'Website'
    },
    {
      title: 'databits',
      desc: 'Python library for Text Classifier using LSTM, GRU, and Transformer BERT.',
      // stars: '890',
      // forks: '156',
      link: 'https://github.com/Databitss/databits',
      kategori: 'Python Library'
    },
    {
      title: 'C-A ViViT',
      desc: 'Creates a new ViViT-based video feature extraction architecture that has 3.5x lower GFLOPs by reducing the quadratic complexity of self-attention.',
      // stars: '2.5k',
      // forks: '402',
      link: 'https://github.com/Databitss/VideoCaptioning',
      kategori: 'AI Architecture'
    },
    {
      title: 'AudioTransformer',
      desc: 'AudioTransformer to process and analyze audio data using transformer-based architectures. It leverages the power of self-attention mechanisms to capture temporal and spectral features in audio signals.',
      // stars: '2.5k',
      // forks: '402',
      link: 'https://github.com/Databitss/AudioTransformer',
      kategori: 'AI Architecture'
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
            Our Research
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Frontier of knowledge and innovation.
          </p>
        </motion.div>
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

export default ResearchPage;