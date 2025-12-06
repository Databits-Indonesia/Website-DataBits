
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Navigation State
type Page = 'HOME' | 'ABOUT' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT';

// --- Components ---

const Navbar = ({ 
  currentPage, 
  setCurrentPage,
  isDarkMode,
  toggleTheme
}: { 
  currentPage: Page; 
  setCurrentPage: (page: Page) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = (page: Page) =>
    `text-sm font-medium leading-normal cursor-pointer transition-colors ${
      currentPage === page
        ? 'text-primary dark:text-white font-bold'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-background-light/80 px-4 py-4 backdrop-blur-md dark:border-gray-800 dark:bg-background-dark/80 md:px-10">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentPage('HOME')}>
        <div className="flex items-center border border-black dark:border-white h-8 overflow-hidden rounded-sm">
          <div className="bg-black px-3 h-full flex items-center justify-center">
            <span className="font-bold text-white text-sm tracking-widest">DATA</span>
          </div>
          <div className="bg-white px-3 h-full flex items-center justify-center dark:bg-white">
            <span className="font-bold text-black text-sm tracking-widest">BITS</span>
          </div>
        </div>
      </div>

      <nav className="hidden items-center gap-9 md:flex">
        <button onClick={() => setCurrentPage('HOME')} className={navLinkClass('HOME')}>
          Home
        </button>
        <button onClick={() => setCurrentPage('SERVICES')} className={navLinkClass('SERVICES')}>
            Services
        </button>
        <button onClick={() => setCurrentPage('PRODUCTS')} className={navLinkClass('PRODUCTS')}>
            Products
        </button>
        <button onClick={() => setCurrentPage('ABOUT')} className={navLinkClass('ABOUT')}>
          About
        </button>
        <button onClick={() => setCurrentPage('BLOG')} className={navLinkClass('BLOG')}>
          Blog
        </button>
        <button onClick={() => setCurrentPage('CONTACT')} className={navLinkClass('CONTACT')}>
          Contact
        </button>
      </nav>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-black dark:text-white"
          aria-label="Toggle Dark Mode"
        >
          <span className="material-symbols-outlined">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <button className="hidden md:flex h-10 items-center justify-center rounded-lg bg-black px-4 text-sm font-bold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors">
          Request a Demo
        </button>
        <button
          className="md:hidden text-black dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-4 md:hidden shadow-lg">
          <button onClick={() => { setCurrentPage('HOME'); setMobileMenuOpen(false); }} className={navLinkClass('HOME')}>Home</button>
          <button onClick={() => { setCurrentPage('SERVICES'); setMobileMenuOpen(false); }} className={navLinkClass('SERVICES')}>Services</button>
          <button onClick={() => { setCurrentPage('PRODUCTS'); setMobileMenuOpen(false); }} className={navLinkClass('PRODUCTS')}>Products</button>
          <button onClick={() => { setCurrentPage('ABOUT'); setMobileMenuOpen(false); }} className={navLinkClass('ABOUT')}>About</button>
          <button onClick={() => { setCurrentPage('BLOG'); setMobileMenuOpen(false); }} className={navLinkClass('BLOG')}>Blog</button>
          <button onClick={() => { setCurrentPage('CONTACT'); setMobileMenuOpen(false); }} className={navLinkClass('CONTACT')}>Contact</button>
          <button className="h-10 w-full rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold mt-2">
            Request a Demo
          </button>
        </div>
      )}
    </header>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  return (
    <footer className="border-t border-gray-200 bg-background-light py-12 dark:border-gray-800 dark:bg-background-dark">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
             <div className="flex items-center border border-black dark:border-white h-7 overflow-hidden rounded-sm">
              <div className="bg-black px-2 h-full flex items-center justify-center">
                <span className="font-bold text-white text-xs tracking-widest">DATA</span>
              </div>
              <div className="bg-white px-2 h-full flex items-center justify-center dark:bg-white">
                <span className="font-bold text-black text-xs tracking-widest">BITS</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 DataBits, Inc.</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
            Unlock Insights.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-900 dark:from-gray-400 dark:to-gray-100">
              Automate Intelligence.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400 mb-10">
            DataBits provides state-of-the-art AI solutions to transform your data into actionable intelligence, driving growth and efficiency for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-bold transition-all shadow-lg" onClick={() => { setCurrentPage('SERVICES'); }}>
              Get Started Free
            </button>
            <button onClick={() => setCurrentPage('CONTACT')} className="w-full sm:w-auto px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold transition-all">
                Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">The Modern AI Platform</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Everything you need to build, deploy, and scale AI applications.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'analytics', title: 'Predictive Analytics', desc: 'Forecast trends and outcomes with high accuracy using our advanced machine learning models.' },
              { icon: 'hub', title: 'Natural Language Processing', desc: 'Extract insights from unstructured text data, from sentiment analysis to document summarization.' },
              { icon: 'brush', title: 'Computer Vision', desc: 'Analyze images and videos to identify objects, faces, and patterns at scale for your applications.' },
            ].map((service, idx) => (
              <div key={idx} className="p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
            <div className="mx-auto max-w-4xl rounded-2xl bg-gray-100 dark:bg-[#192233] p-12 text-center border border-gray-200 dark:border-gray-800">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Ready to Innovate?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">Let's discuss how DataBits can tailor an AI solution for your specific needs.</p>
                <button onClick={() => setCurrentPage('CONTACT')} className="px-8 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                    Contact Our Experts
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero */}
      <section className="pt-20 pb-10 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">Pioneering the Future of AI</h1>
        <h2 className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          DataBits is dedicated to building intelligent systems that solve complex real-world problems and drive human progress forward.
        </h2>
      </section>

      {/* Philosophy */}
      <section className="px-4 container mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Philosophy</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Our work is guided by a core set of principles that define our identity and drive every decision we make.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { icon: 'rocket_launch', title: 'Our Mission', text: 'To democratize access to powerful AI tools, enabling businesses of all sizes to innovate and thrive.' },
                { icon: 'visibility', title: 'Our Vision', text: 'To create a future where intelligent technology seamlessly integrates with human life to solve the world\'s biggest challenges.' },
                { icon: 'group', title: 'Our Values', text: 'Innovation, Integrity, and Collaboration are the pillars that support our work and our culture.' }
            ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4 p-8 rounded-xl border border-gray-200 dark:border-[#324467] bg-white dark:bg-[#192233] shadow-sm">
                    <span className="material-symbols-outlined text-4xl text-gray-900 dark:text-white">{item.icon}</span>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.text}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Story */}
      <section className="px-4 container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Story</h2>
        <div className="max-w-xl mx-auto">
            {[
                { icon: 'flag', title: 'Foundation', date: 'March 2024' },
                { icon: 'auto_awesome', title: 'First Product Launch', date: 'January 2025' },
                { icon: 'monetization_on', title: 'Series A Funding', date: 'September 2025' },
                { icon: 'public', title: 'Global Expansion', date: 'June 2026' }
            ].map((event, i, arr) => (
                <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="text-gray-900 dark:text-white"><span className="material-symbols-outlined">{event.icon}</span></div>
                        {i < arr.length - 1 && <div className="w-0.5 bg-gray-300 dark:bg-[#324467] grow my-2"></div>}
                    </div>
                    <div className="pb-8 pt-0.5">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{event.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-4 container mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet the Team</h2>
            <p className="text-gray-600 dark:text-gray-400">The brilliant minds behind DataBits.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { name: 'Abdurrahman Al-atsary', role: 'CEO & Co-Founder', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYd3xCEQszxZaXLQJJggOLxPfb4nL6f_rKTaysHNg55ZPaF3CYrDfnPCbI40mbpdbCLMcYQKXnDGslbmQIn9gCELUo1QkMifYTMC_JkQDNBvwLQkN2xgQJndcxmVDLI43vYa3jzveR858sAdkulvHt8oQ-RfeF7g9IGOgPVZcDbvxAt5y2yk1iA4ryZK5GZ9uyhFEZUWgEjkqE9b1CUoiKGExupiPnbIrHZTf7dd0mdfC8O3UrqRdd17YS73Iwf0D3r5njqtZZvO8I' },
                { name: 'Miftahul Huda', role: 'CTO & Co-Founder', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYd3xCEQszxZaXLQJJggOLxPfb4nL6f_rKTaysHNg55ZPaF3CYrDfnPCbI40mbpdbCLMcYQKXnDGslbmQIn9gCELUo1QkMifYTMC_JkQDNBvwLQkN2xgQJndcxmVDLI43vYa3jzveR858sAdkulvHt8oQ-RfeF7g9IGOgPVZcDbvxAt5y2yk1iA4ryZK5GZ9uyhFEZUWgEjkqE9b1CUoiKGExupiPnbIrHZTf7dd0mdfC8O3UrqRdd17YS73Iwf0D3r5njqtZZvO8I' },
                { name: 'Emily White', role: 'Head of Research', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqU4lqOJ24MIZDuD0fdUomG0BJPrZ64eorCHJCTsgP9pgp44LR39w-34WZY6G-IOkkZ-BQ2OZljfqs7dAQsKYV1WQY8lT1bXEPoWuSvevbUhLUQBbtw0WVoGoCrFabEBvBjpnwa0nAtr-zeuDj8iW8zUY0JyiraCVOAT3sGUrWOJXJR1g9-nWK0D2_9Z_Kh89Ci2Nn2ARlpgudLPEZHyp9trhKubn6ztdzAv0XqmDKcodhd_yOzmbEBsBlY3AAtQerF1KQNVfaqYbu' },
                { name: 'Husni Nafa Mubarok', role: 'Lead AI Engineer', img: 'https://avatars.githubusercontent.com/u/79038126?v=4' }
            ].map((member, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-4">
                    <img src={member.img} alt={member.name} className="w-40 h-40 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300 ring-2 ring-gray-200 dark:ring-gray-700" />
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">{member.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{member.role}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Join Us */}
      <section className="px-4 container mx-auto">
         <div className="bg-gray-100 dark:bg-[#192233] rounded-xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Join Us</h2>
                <p className="text-gray-600 dark:text-gray-300">Help us build the future. We're looking for passionate individuals.</p>
            </div>
            <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg whitespace-nowrap">View Open Positions</button>
         </div>
      </section>
    </div>
  );
};

const ServicesPage = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
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
      <section className="py-20 px-4">
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
              <div key={i} className="flex flex-col p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#101622] hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6">
                   <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{s.desc}</p>
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
      <section className="py-20 px-4 bg-gray-50 dark:bg-[#192233]">
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
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Start Your Transformation</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Ready to harness the power of AI? Let's talk about your project.</p>
            <button onClick={() => setCurrentPage('CONTACT')} className="px-8 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Contact Sales
            </button>
        </div>
      </section>
    </div>
  );
};

const ProductsPage = () => {
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
     <div className="flex flex-col min-h-[calc(100vh-theme(spacing.20))]">
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tools and platforms built to empower your data journey.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <a
                key={i}
                href={product.link}
                target={product.external ? "_blank" : "_self"}
                rel={product.external ? "noopener noreferrer" : ""}
                className={`flex flex-col p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#101622] hover:shadow-lg transition-all relative ${!product.external && product.link === '#' ? 'cursor-default opacity-80' : 'hover:-translate-y-1'}`}
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

                <div className="w-12 h-12 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6">
                   <span className="material-symbols-outlined">{product.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{product.desc}</p>

                {product.link !== '#' ? (
                     <div className="font-bold text-primary text-sm flex items-center gap-2">
                        Open Product <span className="material-symbols-outlined text-sm">arrow_forward</span>
                     </div>
                ) : (
                    <div className="font-bold text-gray-400 text-sm flex items-center gap-2">
                        Stay Tuned
                     </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="p-3 bg-black dark:bg-white rounded-full text-white dark:text-black">
                        <span className="material-symbols-outlined text-2xl">code</span>
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Open Source</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    We believe in giving back to the community. Check out our open source contributions that are powering the next generation of AI tools.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {openSourceProjects.map((project, i) => (
                    <div key={i} className="flex flex-col p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#101622] hover:border-gray-400 dark:hover:border-gray-600 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{project.title}</h3>
                            <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">{project.language}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{project.desc}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-1.5" title="Stars">
                                <span className="material-symbols-outlined text-[18px]">star</span>
                                <span className="font-mono">{project.stars}</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Forks">
                                <span className="material-symbols-outlined text-[18px]">call_split</span>
                                <span className="font-mono">{project.forks}</span>
                            </div>
                            <a href={project.link} className="ml-auto flex items-center gap-1 font-bold text-gray-900 dark:text-white hover:text-primary transition-colors">
                                GitHub <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 text-center">
                 <a href="https://github.com/Databits-Indonesia" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold transition-all text-gray-900 dark:text-white">
                    View all repositories <span className="material-symbols-outlined">arrow_forward</span>
                 </a>
            </div>
        </div>
      </section>
    </div>
  );
};

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allPosts = [
    {
      title: 'The Future of Generative AI in Business',
      category: 'Product Updates',
      readTime: '5 min read',
      date: 'October 26, 2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6kpsvjziu-XR9FIWnr7c43CzORHO95BI-LaRSQ4_23pN6MepScVJDJLmPiuJW7DhZq9XSxPf6HJ-l8BQ96HwW9eawS42WdxywC4bJSr8uYkENWflotg5PYk5NXJVXKUsHZJGDT6vKz4WEPjuia7_aOv11d7tIhA4q8t1vFnKIXxF3qzaKh0YPYFALq1CiZEpI2z0JlUI-q382nZyzS8fZA6fMQa9GQiqt0-TsJvoBp94ImBza9f0zwXBhU0Bd9Dlu2Rz9ll29u2eh',
      desc: 'Explore how our latest advancements in generative AI are reshaping industries and what it means for your business operations.',
      featured: true
    },
    {
      title: 'Navigating the World of Big Data',
      category: 'Data Science',
      readTime: '7 min read',
      date: 'October 15, 2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZxJi1e6Gvtiin7A43Qutox0k__o8vWhk1H85U_OYCAYGT5vFlwsshm0S1pFDQBVNKWOIz1Sjjio3Mjrrr4iVvXRer655_Ln2165_vXztlCiXFBgKEDuk2pC8djUQtq4fMVjZVKgdk5EkwWFVovS3w8C_JobZVbpZVQ_98juXYaFlzQT-iVUNIA6P-wD4t7lES2uPyqCr9u1g4o7cO0kdEx0rtUB626_b61XFHOYzBqisIFvGGxWva-_jpPcaehA0bNHT-tFa9fN_',
      desc: 'A deep dive into the methodologies we use to process and analyze petabytes of data efficiently.',
      featured: false
    },
    {
      title: 'Our Tech Stack for Scalable AI',
      category: 'Engineering',
      readTime: '4 min read',
      date: 'October 02, 2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl1iVukPHABk2Vb_EAJLAKUJQ3qIQlTFwSEWW6rsHbKh-PM2bP08SisBT4IS-nEojWI1Tsz6LPwm0vJTkh4L3doc8O3lHNIGHsROUtMNtWzmk_CNQRkiAJ2lrJ0O6JB1R3sF9OAcuq7KTQDsnd-gacIT7WF7xoKHpXql7cB4J2DAXcFe0_tC-D2hulAKOAal6iaCXEw1kgMZLAVX4CaMg7bgjr5aNIuUewn6E0UwiksGlMeyfOHKMRU6Uw_kihhHPbTBVXLW401zgp',
      desc: 'Discover the technologies that power DataBits and why we chose them for performance and reliability.',
      featured: false
    },
    {
      title: 'Ethical Considerations in AI',
      category: 'AI Research',
      readTime: '9 min read',
      date: 'September 21, 2023',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIesjcL8TKqg13LVGjHhaUv0bxvMkvdMjZyAaDWG3Ty_RqEVvPs5uy25cuiC7NsYQCNgB-_gNrf1jgqH2QYdOCNW6LyK2gxPafBeJpT9-AggpiVreiUaLOmY9P5cI_Zv9AsVK1nRpJwo0ohtywFzvt3xuQFjakaUMqpL3Bq-6etJ7aPGnDbf29YNQl9qxaNURGRlT5AdHLWj_R_UbONmcF0fereGwpO3sPwOy51HcHBaOntpYk928vn8olZg4llcfekrgt57PeDRWX',
      desc: 'How we approach building responsible AI systems that are fair, transparent, and accountable.',
      featured: false
    }
  ];

  const categories = ['All', 'Product Updates', 'Data Science', 'Engineering', 'AI Research', 'Industry Trends'];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = allPosts.find(p => p.featured);
  const isDefaultView = searchQuery === '' && selectedCategory === 'All';
  const postsToShow = isDefaultView ? allPosts.filter(p => !p.featured) : filteredPosts;

  return (
    <div className="container mx-auto px-4 md:px-10 py-12 flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">The DataBits Blog</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Insights on AI Research, Product Updates, and Industry Trends</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-6">
        <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
            <input 
              type="text" 
              placeholder="Search articles" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#232f48] text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" 
            />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((tag, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedCategory(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
                    selectedCategory === tag 
                      ? 'bg-black dark:bg-white text-white dark:text-black border-transparent' 
                      : 'bg-transparent border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                    {tag}
                </button>
            ))}
        </div>
      </div>

      {/* Featured Article - Only shown in default view */}
      {isDefaultView && featuredPost && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Articles</h2>
          <div className="group grid grid-cols-1 md:grid-cols-2 gap-8 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg dark:hover:bg-white/5 transition-all duration-300 hover:-translate-y-1">
              <img src={featuredPost.img} alt={featuredPost.title} className="w-full h-64 object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="flex flex-col justify-center gap-4">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{featuredPost.category} · {featuredPost.readTime}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{featuredPost.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{featuredPost.desc}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{featuredPost.date}</span>
              </div>
          </div>
        </div>
      )}

      {/* Article Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {isDefaultView ? 'All Articles' : `Search Results (${postsToShow.length})`}
        </h2>
        
        {postsToShow.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {postsToShow.map((post, i) => (
                  <div key={i} className="group border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                      <img src={post.img} alt={post.title} className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="p-6 flex flex-col gap-3 flex-grow">
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{post.category}</span>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{post.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">{post.desc}</p>
                          <div className="mt-auto flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-4">search_off</span>
            <p className="text-gray-500 dark:text-gray-400">No articles found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 text-primary font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination - Only show if we have many posts (simulated) */}
      {isDefaultView && (
        <div className="flex justify-center gap-2 mt-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"><span className="material-symbols-outlined">chevron_left</span></button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black font-bold">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"><span className="material-symbols-outlined">chevron_right</span></button>
        </div>
      )}
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (validateForm()) {
      // Simulate API call
      setSuccessMessage("Thank you for reaching out! We'll get back to you shortly.");
      setFormData({
        fullName: '',
        email: '',
        companyName: '',
        subject: '',
        message: ''
      });
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[name];
            return newErrors;
        });
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-10 py-16 flex flex-col gap-12">
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">We’d love to hear from you. Reach out for partnerships, inquiries, or support.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Info & Map */}
        <div className="lg:w-1/3 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                {[
                    { icon: 'mail', text: 'databitsteam@gmail.com', href: 'mailto:databitsteam@gmail.com' },
                    { icon: 'call', text: '+62 896-3634-4666', href: 'https://wa.me/6289636344666' },
                    { icon: 'location_on', text: 'Lampung, Indonesia', sub: 'DataBits Headquarters', href: '#' }
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white shrink-0">
                            <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div>
                            {item.sub && <p className="font-bold text-gray-900 dark:text-white">{item.sub}</p>}
                            <a href={item.href} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{item.text}</a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="h-64 rounded-xl overflow-hidden grayscale contrast-125 brightness-75">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuATGO_DGoz8Fe5XAhIRTNLShlpGBirZdKuA3ud_5ufDirt3JwEvDuGTHgV6T5XdrFtixSPCzalyNiU2gzEUQYK06eKWuX3zlJanjivun-0FI4WcNgLkoCWxi9wJArhYL76x7y6KhSgIxy8XklXGtNlE8FQdHAfY9ChBAJKRUxsXhhOuVXZmgA1maPDLzHnK0fYbFIjHFVsLJu7yX2t_49YFGxe-uS4ttxL3910qP6qTU5jPV-OECaFU8ue_aMmSkyo89sDqG60uStJj" alt="Map" className="w-full h-full object-cover" />
            </div>
        </div>

        {/* Form */}
        <div className="lg:w-2/3">
            <div className="bg-white dark:bg-[#1C1C1C] border border-gray-200 dark:border-[#333333] rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send us a message</h3>
                
                {successMessage && (
                  <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                        <input 
                          type="text" 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe" 
                          className={`bg-gray-50 dark:bg-[#121212] border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-[#333333] focus:ring-black dark:focus:ring-white'} rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2`} 
                        />
                        {errors.fullName && <span className="text-xs text-red-500 mt-1">{errors.fullName}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Work Email</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com" 
                          className={`bg-gray-50 dark:bg-[#121212] border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-[#333333] focus:ring-black dark:focus:ring-white'} rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2`} 
                        />
                        {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Company Name</label>
                        <input 
                          type="text" 
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Innovate Inc." 
                          className={`bg-gray-50 dark:bg-[#121212] border ${errors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-[#333333] focus:ring-black dark:focus:ring-white'} rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2`} 
                        />
                        {errors.companyName && <span className="text-xs text-red-500 mt-1">{errors.companyName}</span>}
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Subject</label>
                        <input 
                          type="text" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Partnership Inquiry" 
                          className={`bg-gray-50 dark:bg-[#121212] border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-[#333333] focus:ring-black dark:focus:ring-white'} rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2`} 
                        />
                        {errors.subject && <span className="text-xs text-red-500 mt-1">{errors.subject}</span>}
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Message</label>
                        <textarea 
                          rows={5} 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message..." 
                          className={`bg-gray-50 dark:bg-[#121212] border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-[#333333] focus:ring-black dark:focus:ring-white'} rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 resize-none`}
                        ></textarea>
                        {errors.message && <span className="text-xs text-red-500 mt-1">{errors.message}</span>}
                    </div>
                    <div className="md:col-span-2 mt-2">
                        <button type="submit" className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- App Root ---

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex min-h-screen flex-col font-display">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <main className="flex-grow">
        {currentPage === 'HOME' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'SERVICES' && <ServicesPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'PRODUCTS' && <ProductsPage />}
        {currentPage === 'ABOUT' && <AboutPage />}
        {currentPage === 'BLOG' && <BlogPage />}
        {currentPage === 'CONTACT' && <ContactPage />}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
