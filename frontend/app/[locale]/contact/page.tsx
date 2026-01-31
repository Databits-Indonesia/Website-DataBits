'use client';

import { useState } from 'react';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';
import { useI18n } from '@/components/i18n-provider';
import { APIClient } from '@/lib/api-client';
// import { useRouter } from 'next/navigation';

// type Page = 'HOME' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT' | 'ABOUT';

const ContactPage = () => {
  const { t } = useI18n();
  // const [currentPage] = useState<Page>('CONTACT');
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
    
    if (!formData.fullName.trim()) newErrors.fullName = t('contact.errorFullNameRequired');
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errorEmailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errorEmailInvalid');
    }

    if (!formData.companyName.trim()) newErrors.companyName = t('contact.errorCompanyRequired');
    if (!formData.subject.trim()) newErrors.subject = t('contact.errorSubjectRequired');
    if (!formData.message.trim()) newErrors.message = t('contact.errorMessageRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await APIClient.createPublicMessage({
        name: formData.fullName,
        email: formData.email,
        subject: formData.subject,
        company: formData.companyName,
        message_content: formData.message,
      });

      setSuccessMessage(t('contact.successMessage'));
      setFormData({
        fullName: '',
        email: '',
        companyName: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message');
    } finally {
      setIsSubmitting(false);
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
        <h1 className="h1">{t('contact.heroTitle')}</h1>
        <p className="p">{t('contact.heroDescription')}</p>
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
                    { icon: 'mail', text: t('contact.emailValue'), sub: t('contact.emailLabel'), href: 'mailto:databitsteam@gmail.com' },
                    { icon: 'call', text: t('contact.phoneValue'), sub: t('contact.phoneLabel'), href: 'https://wa.me/6289636344666' },
                    { icon: 'location_on', text: t('contact.locationValue'), sub: t('contact.locationLabel'), href: 'https://www.google.com/maps/place/Bandar+Lampung+City,+Lampung' }
                ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                        <div className="contact-logo-box">
                            <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div>
                            {item.sub && <p className="font-bold icon-color">{item.sub}</p>}
                            <a href={item.href} className="text-color">{item.text}</a>
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.div 
              className="h-64 rounded-xl overflow-hidden dark:brightness-75 dark:contrast-125"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127107.05764654197!2d105.2423897!3d-5.4024126!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dbcabf21b51f%3A0xdcb06324bff3cb9e!2sBandar%20Lampung%20City%2C%20Lampung!5e0!3m2!1sen!2sid!4v1769841402759!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
            </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div 
          className="lg:w-2/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="contact-form bg-white dark:bg-[#14202e] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="h3 mb-8">{t('contact.formTitle')}</h3>
                
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
                        <label htmlFor="fullName" className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('contact.fullNameLabel')}</label>
                        <input 
                          type="text" 
                          id="fullName"
                          name="fullName"
                          autoComplete="name"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={t('contact.fullNamePlaceholder')} 
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
                        <label htmlFor="email" className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('contact.emailLabel2')}</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t('contact.emailPlaceholder')} 
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
                        <label htmlFor="companyName" className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('contact.companyLabel')}</label>
                        <input 
                          type="text" 
                          id="companyName"
                          name="companyName"
                          autoComplete="organization"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder={t('contact.companyPlaceholder')} 
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
                        <label htmlFor="subject" className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('contact.subjectLabel')}</label>
                        <input 
                          type="text" 
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={t('contact.subjectPlaceholder')} 
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
                        <label htmlFor="message" className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('contact.messageLabel')}</label>
                        <textarea 
                          rows={5} 
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t('contact.messagePlaceholder')} 
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
                              {t('contact.buttonSending')}
                            </motion.span>
                          ) : (
                            t('contact.buttonSend')
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