import Navbar from '@/components/Header';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// type Page = 'HOME' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'RESEARCH' | 'CONTACT' | 'ABOUT';

const AboutPage = () => {
  // const [currentPage] = useState<Page>('ABOUT');
  // const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-16 pb-20">
      {/* Hero */}
      <motion.section 
        className="pt-20 pb-10 px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="h1">Pioneering the Future of AI</h1>
        <h2 className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          DataBits is dedicated to building intelligent systems that solve complex real-world problems and drive human progress forward.
        </h2>
      </motion.section>

      {/* Philosophy */}
      <section className="section container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
            <h2 className="h2">Our Philosophy</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Our work is guided by a core set of principles that define our identity and drive every decision we make.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { icon: 'rocket_launch', title: 'Our Mission', text: 'To democratize access to powerful AI tools, enabling businesses of all sizes to innovate and thrive.' },
                { icon: 'visibility', title: 'Our Vision', text: 'To create a future where intelligent technology seamlessly integrates with human life to solve the world\'s biggest challenges.' },
                { icon: 'group', title: 'Our Values', text: 'Innovation, Integrity, and Collaboration are the pillars that support our work and our culture.' }
            ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="card card-hover flex flex-col gap-4 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                    <span className="material-symbols-outlined text-4xl icon-color">{item.icon}</span>
                    <div>
                        <h3 className="h3 mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.text}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Story */}
      <section className="section container mx-auto">
        <motion.h2 
          className="h2 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >Our Story</motion.h2>
        <div className="max-w-xl mx-auto">
            {[
                { icon: 'flag', title: 'Foundation', date: 'March 2024' },
                { icon: 'auto_awesome', title: 'First Product Launch', date: 'January 2025' },
                { icon: 'monetization_on', title: 'Series A Funding', date: 'September 2025' },
                { icon: 'public', title: 'Global Expansion', date: 'June 2026' }
            ].map((event, i, arr) => (
                <motion.div 
                  key={i} 
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                >
                    <div className="flex flex-col items-center">
                        <div className="icon-color"><span className="material-symbols-outlined">{event.icon}</span></div>
                        {i < arr.length - 1 && <div className="w-0.5 bg-gray-300 dark:bg-[#324467] grow my-2"></div>}
                    </div>
                    <div className="pb-8 pt-0.5">
                        <h3 className="h3-sm">{event.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Team */}
      <section className="section container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
            <h2 className="h2">Meet the Team</h2>
            <p className="text-gray-600 dark:text-gray-400">The brilliant minds behind DataBits.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { name: 'Abdurrahman Al-atsary', role: 'CEO & Co-Founder', img: 'https://media.licdn.com/dms/image/v2/D5603AQFH2iJ523ZBaQ/profile-displayphoto-crop_800_800/B56Zn_uEFGI0AI-/0/1760931890307?e=1766620800&v=beta&t=VtMJHPSSqRmUr8zgYQP-fU5gu8tcEIi_-DRdOOxTJ4E' },
                { name: 'Miftahul Huda', role: 'CTO & Co-Founder', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYd3xCEQszxZaXLQJJggOLxPfb4nL6f_rKTaysHNg55ZPaF3CYrDfnPCbI40mbpdbCLMcYQKXnDGslbmQIn9gCELUo1QkMifYTMC_JkQDNBvwLQkN2xgQJndcxmVDLI43vYa3jzveR858sAdkulvHt8oQ-RfeF7g9IGOgPVZcDbvxAt5y2yk1iA4ryZK5GZ9uyhFEZUWgEjkqE9b1CUoiKGExupiPnbIrHZTf7dd0mdfC8O3UrqRdd17YS73Iwf0D3r5njqtZZvO8I' },
                { name: 'Sasa Rahmalia', role: 'CMO', img: 'https://avatars.githubusercontent.com/u/112261654?v=4' },
                { name: 'Husni Nafa Mubarok', role: 'Lead Data Scientist', img: 'https://avatars.githubusercontent.com/u/79038126?v=4' }
            ].map((member, i) => (
                <motion.div 
                  key={i} 
                  className="flex flex-col items-center text-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                    <motion.img 
                      src={member.img} 
                      alt={`Portrait of ${member.name}`}
                      loading="lazy"
                      decoding="async"
                      className="w-40 h-40 rounded-full object-cover grayscale ring-2 ring-gray-200 dark:ring-gray-700"
                      whileHover={{ 
                        scale: 1.05, 
                        filter: 'grayscale(0%)',
                        transition: { duration: 0.3 } 
                      }}
                    />
                    <div>
                        <h4 className="h4">{member.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{member.role}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Join Us */}
      <section className="section container mx-auto">
         <motion.div 
           className="cta-box flex flex-col md:flex-row items-center justify-between gap-8 md:text-left"
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           whileHover={{ y: -4, transition: { duration: 0.2 } }}
         >
            <div>
                <h2 className="h2-sm mb-2">Join Us</h2>
                <p className="text-gray-600 dark:text-gray-300">Help us build the future. We're looking for passionate individuals.</p>
            </div>
            <motion.button 
              className="btn btn-primary whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >View Open Positions</motion.button>
         </motion.div>
      </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;