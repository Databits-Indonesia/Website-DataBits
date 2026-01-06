import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Page Builder
type Page = 'HOME' | 'ABOUT' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT' | 'RESEARCH' | 'PORTOFOLIO';

// Router
const pageRoutes: Record<Page, string> = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  PRODUCTS: '/products',
  BLOG: '/blog',
  CONTACT: '/contact',
  RESEARCH: '/research',
  PORTOFOLIO: '/porto'
};

const getCurrentPageFromPath = (pathname: string): Page => {
  // const path = pathname === '/' ? '/' : pathname.split('/')[1];
  const entry = Object.entries(pageRoutes).find(([_, route]) => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  });
  return entry ? (entry[0] as Page) : 'HOME';
};

const Navbar = ({
  // currentPage, 
  // setCurrentPage,
  isDarkMode,
  toggleTheme
}: {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activePage = getCurrentPageFromPath(pathname);

  const navLinkClass = (page: Page) =>
    `text-sm font-medium leading-normal cursor-pointer transition-colors ${activePage === page
      ? 'text-primary dark:text-white font-bold'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-background-light/80 px-4 py-4 backdrop-blur-md dark:border-gray-800 dark:bg-background-dark/80 md:px-10">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/')}>
        <img src="/logo.jpeg" alt="DataBits Logo" className="h-8" />
      </div>

      <nav className="hidden items-center gap-9 md:flex">
        {/* HOME */}
        <motion.button onClick={() => router.push('/')} className={`${navLinkClass('HOME')} relative`}>
          Home
          {activePage === 'HOME' && (
            <motion.div
              layoutId="nav-underline"
              className="absolute -bottom-5.5 left-0 right-0 h-0.5 bg-black dark:bg-white"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
        {/* ABOUT US */}
        <motion.button onClick={() => router.push('/about')} className={`${navLinkClass('ABOUT')} relative`}>
          About
          {activePage === 'ABOUT' && (
            <motion.div
              layoutId="nav-underline"
              className="absolute -bottom-5.5 left-0 right-0 h-0.5 bg-black dark:bg-white"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
        {/* SERVICES */}
        <motion.button onClick={() => router.push('/services')} className={`${navLinkClass('SERVICES')} relative`}>
          Services
          {activePage === 'SERVICES' && (
            <motion.div
              layoutId="nav-underline"
              className="absolute -bottom-5.5 left-0 right-0 h-0.5 bg-black dark:bg-white"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
        {/* PRODUCTS */}
        <motion.button onClick={() => router.push('/products')} className={`${navLinkClass('PRODUCTS')} relative`}>
          Products
          {activePage === 'PRODUCTS' && (
            <motion.div
              layoutId="nav-underline"
              className="absolute -bottom-5.5 left-0 right-0 h-0.5 bg-black dark:bg-white"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
        {/* RESEARCH */}
        <motion.button onClick={() => router.push('/research')} className={`${navLinkClass('RESEARCH')} relative`}>
          Research
          {activePage === 'RESEARCH' && (
            <motion.div
              layoutId="nav-underline"
              className="absolute -bottom-5.5 left-0 right-0 h-0.5 bg-black dark:bg-white"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
        {/* PORTOFOLIO */}
        <motion.button onClick={() => router.push('/porto')} className={`${navLinkClass('PORTOFOLIO')} relative`}>
          Portofolio
          {activePage === 'PORTOFOLIO' && (
            <motion.div
              layoutId="nav-underline"
              className="absolute -bottom-5.5 left-0 right-0 h-0.5 bg-black dark:bg-white"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
        {/* BLOG */}
        <motion.button onClick={() => router.push('/blog')} className={`${navLinkClass('BLOG')} relative`}>
          Blog
          {activePage === 'BLOG' && (
            <motion.div
              layoutId="nav-underline"
              className="absolute -bottom-5.5 left-0 right-0 h-0.5 bg-black dark:bg-white"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
        {/* CONTACT */}
        <motion.button onClick={() => router.push('/contact')} className={`${navLinkClass('CONTACT')} relative`}>
          Contact
          {activePage === 'CONTACT' && (
            <motion.div
              layoutId="nav-underline"
              className="absolute -bottom-5.5 left-0 right-0 h-0.5 bg-black dark:bg-white"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      </nav>

      {/* Button Dark Mode */}
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
        {/* Button Contact Us (Collaborate) */}
        <button className="hidden md:flex h-10 items-center justify-center rounded-lg bg-black px-4 text-sm font-bold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors transform hover:scale-[1.02] active:scale-95">
          Contact Us
        </button>
        <button
          className="md:hidden text-black dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>

      {/* Mobile View Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-4 md:hidden shadow-lg">
          <button onClick={() => { router.push('/'); setMobileMenuOpen(false); }} className={navLinkClass('HOME')}>Home</button>
          <button onClick={() => { router.push('/services'); setMobileMenuOpen(false); }} className={navLinkClass('SERVICES')}>Services</button>
          <button onClick={() => { router.push('/products'); setMobileMenuOpen(false); }} className={navLinkClass('PRODUCTS')}>Products</button>
          <button onClick={() => { router.push('/about'); setMobileMenuOpen(false); }} className={navLinkClass('ABOUT')}>About</button>
          <button onClick={() => { router.push('/blog'); setMobileMenuOpen(false); }} className={navLinkClass('BLOG')}>Blog</button>
          <button onClick={() => { router.push('/contact'); setMobileMenuOpen(false); }} className={navLinkClass('CONTACT')}>Contact</button>
          <button onClick={() => { router.push('/researh'); setMobileMenuOpen(false); }} className={navLinkClass('RESEARCH')}>Research</button>
          <button onClick={() => { router.push('/porto'); setMobileMenuOpen(false); }} className={navLinkClass('PORTOFOLIO')}>Portofolio</button>
          <button className="h-10 w-full rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold mt-2">Contact Us</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;