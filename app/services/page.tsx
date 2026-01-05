

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from 'next-themes';
import { useThemeToggle } from '@/components/ThemeToggle';

type Page = 'HOME' | 'ABOUT' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT';

const ServicesPage = () => {
  const router = useRouter();
  const [currentPage] = useState<Page>('SERVICES');
  const { resolvedTheme } = useTheme();
  const { toggleTheme } = useThemeToggle();
  
  return (
    <>
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={() => {}}
        isDarkMode={resolvedTheme === 'dark'}
        toggleTheme={toggleTheme}
      />
      <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800" data-animate="reveal">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Expert AI Services Tailored to You
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We combine cutting-edge technology with deep industry expertise to deliver solutions that drive real business value.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 px-4" data-animate="reveal">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Data Analytics & Insights",
                desc: "Transform raw data into strategic assets with our advanced analytics pipelines.",
                icon: "bar_chart",
                list: ["Data Warehousing", "Real-time Dashboards", "Business Intelligence"]
              },
              {
                title: "Machine Learning Solutions",
                desc: "Predict trends and automate decisions with custom ML models built for your data.",
                icon: "memory",
                list: ["Predictive Maintenance", "Demand Forecasting", "Anomaly Detection"]
              },
              {
                title: "Natural Language Processing",
                desc: "Unlock the value in text data with state-of-the-art NLP implementations.",
                icon: "chat",
                list: ["Sentiment Analysis", "Chatbots & AI Agents", "Document Processing"]
              },
              {
                title: "Computer Vision",
                desc: "Automate visual inspection and recognition tasks with high-accuracy models.",
                icon: "visibility",
                list: ["Quality Control", "Facial Recognition", "Object Tracking"]
              },
              {
                title: "AI Strategy Consulting",
                desc: "Navigate the AI landscape with confidence through our expert advisory services.",
                icon: "lightbulb",
                list: ["Feasibility Assessments", "Tech Stack Selection", "Roadmap Development"]
              },
              {
                title: "Custom AI Development",
                desc: "Solve unique challenges with bespoke AI solutions designed from the ground up.",
                icon: "code",
                list: ["End-to-End Development", "Model Fine-tuning", "System Integration"]
              }
            ].map((s, i) => (
              <div key={i} data-animate="reveal-stagger" className="flex flex-col p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#101622] hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6">
                   <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
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
      <section className="py-20 px-4 bg-gray-50 dark:bg-[#192233]" data-animate="reveal">
         <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Process</h2>
                <p className="text-gray-600 dark:text-gray-400">From concept to deployment, we're with you every step of the way.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { num: "01", title: "Discovery", text: "We analyze your business needs and data readiness." },
                    { num: "02", title: "Strategy", text: "We define the technical approach and project roadmap." },
                    { num: "03", title: "Development", text: "Our team builds and trains your custom AI solution." },
                    { num: "04", title: "Deployment", text: "We integrate, test, and launch the solution into production." }
                ].map((step, i) => (
                    <div key={i} className="relative p-6 rounded-xl bg-white dark:bg-[#101622] border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="text-4xl font-black text-gray-100 dark:text-gray-800 absolute top-4 right-4">{step.num}</div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 relative z-10">{step.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">{step.text}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4" data-animate="reveal">
        <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Start Your Transformation</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Ready to harness the power of AI? Let's talk about your project.</p>
            <button onClick={() => router.push('/contact')} className="px-8 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors transform hover:scale-[1.02] active:scale-95">
                Contact Sales
            </button>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default ServicesPage;