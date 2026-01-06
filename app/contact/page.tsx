'use client';

import { useState } from 'react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';

type Page = 'HOME' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT' | 'ABOUT';

const ContactPage = () => {
  const [currentPage] = useState<Page>('CONTACT');
//   const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setSuccessMessage("Thank you for reaching out! We'll get back to you shortly.");
        setFormData({
          fullName: '',
          email: '',
          companyName: '',
          subject: '',
          message: ''
        });
        setErrors({});
        setIsSubmitting(false);
      }, 800);
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
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-10 py-16 flex flex-col gap-12" data-animate="reveal">
      <div className="max-w-xl">
        <h1 className="h1">Get in Touch</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">We’d love to hear from you. Reach out for partnerships, inquiries, or support.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Info & Map */}
        <motion.div 
          className="lg:w-1/3 flex flex-col gap-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="flex flex-col gap-6">
                {[
                    { icon: 'mail', text: 'databitsteam@gmail.com', href: 'mailto:databitsteam@gmail.com' },
                    { icon: 'call', text: '+62 896-3634-4666', href: 'https://wa.me/6289636344666' },
                    { icon: 'location_on', text: 'Lampung, Indonesia', sub: 'DataBits Headquarters', href: '#' }
                ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white shrink-0">
                            <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div>
                            {item.sub && <p className="font-bold text-gray-900 dark:text-white">{item.sub}</p>}
                            <a href={item.href} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">{item.text}</a>
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.div 
              className="h-64 rounded-xl overflow-hidden grayscale contrast-125 brightness-75"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02, filter: 'grayscale(0%)', transition: { duration: 0.3 } }}
            >
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuATGO_DGoz8Fe5XAhIRTNLShlpGBirZdKuA3ud_5ufDirt3JwEvDuGTHgV6T5XdrFtixSPCzalyNiU2gzEUQYK06eKWuX3zlJanjivun-0FI4WcNgLkoCWxi9wJArhYL76x7y6KhSgIxy8XklXGtNlE8FQdHAfY9ChBAJKRUxsXhhOuVXZmgA1maPDLzHnK0fYbFIjHFVsLJu7yX2t_49YFGxe-uS4ttxL3910qP6qTU5jPV-OECaFU8ue_aMmSkyo89sDqG60uStJj" 
                  alt="Map showing DataBits headquarters"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover" 
                />
            </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div 
          className="lg:w-2/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="bg-white dark:bg-[#1C1C1C] border border-gray-200 dark:border-[#333333] rounded-2xl p-8">
                <h3 className="h3-lg mb-8">Send us a message</h3>
                
                {successMessage && (
                  <motion.div 
                    className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 flex items-center gap-2"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    {successMessage}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      className="flex flex-col gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <label htmlFor="fullName" className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                        <input 
                          type="text" 
                          id="fullName"
                          name="fullName"
                          autoComplete="name"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe" 
                          className={`input ${errors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`} 
                        />
                        {errors.fullName && (
                          <motion.span 
                            className="text-xs text-red-500 mt-1"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >{errors.fullName}</motion.span>
                        )}
                    </motion.div>
                    <motion.div 
                      className="flex flex-col gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                        <label htmlFor="email" className="text-sm font-medium text-gray-500 dark:text-gray-400">Work Email</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com" 
                          className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`} 
                        />
                        {errors.email && (
                          <motion.span 
                            className="text-xs text-red-500 mt-1"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >{errors.email}</motion.span>
                        )}
                    </motion.div>
                    <motion.div 
                      className="flex flex-col gap-2 md:col-span-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <label htmlFor="companyName" className="text-sm font-medium text-gray-500 dark:text-gray-400">Company Name</label>
                        <input 
                          type="text" 
                          id="companyName"
                          name="companyName"
                          autoComplete="organization"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Innovate Inc." 
                          className={`input ${errors.companyName ? 'border-red-500 focus:ring-red-500' : ''}`} 
                        />
                        {errors.companyName && (
                          <motion.span 
                            className="text-xs text-red-500 mt-1"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >{errors.companyName}</motion.span>
                        )}
                    </motion.div>
                    <motion.div 
                      className="flex flex-col gap-2 md:col-span-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                    >
                        <label htmlFor="subject" className="text-sm font-medium text-gray-500 dark:text-gray-400">Subject</label>
                        <input 
                          type="text" 
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Partnership Inquiry" 
                          className={`input ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`} 
                        />
                        {errors.subject && (
                          <motion.span 
                            className="text-xs text-red-500 mt-1"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >{errors.subject}</motion.span>
                        )}
                    </motion.div>
                    <motion.div 
                      className="flex flex-col gap-2 md:col-span-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        <label htmlFor="message" className="text-sm font-medium text-gray-500 dark:text-gray-400">Message</label>
                        <textarea 
                          rows={5} 
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message..." 
                          className={`input ${errors.message ? 'border-red-500 focus:ring-red-500' : ''} resize-none`}
                        ></textarea>
                        {errors.message && (
                          <motion.span 
                            className="text-xs text-red-500 mt-1"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >{errors.message}</motion.span>
                        )}
                    </motion.div>
                    <motion.div 
                      className="md:col-span-2 mt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                    >
                        <motion.button 
                          type="submit" 
                          className="btn btn-primary w-full relative overflow-hidden"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center justify-center gap-2"
                            >
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="material-symbols-outlined"
                              >progress_activity</motion.span>
                              Sending...
                            </motion.span>
                          ) : (
                            "Send Message"
                          )}
                        </motion.button>
                    </motion.div>
                </form>
            </div>
        </motion.div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;