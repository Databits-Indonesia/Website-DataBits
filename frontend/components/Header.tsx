'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

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

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activePage = getCurrentPageFromPath(pathname);

  useEffect(() => setMounted(true), []);

  const navLinkClass = (page: Page) =>
    `${activePage === page ? 'nav-link nav-link-active' : 'nav-link'}`;

  return (
    <header className="header ">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/')}>
        <img src="/logo.jpeg" alt="DataBits Logo" className="h-8" />
      </div>

      <nav className="hidden items-center gap-7 md:flex">
        {/* HOME */}
        <motion.button onClick={() => router.push('/')} className={`${navLinkClass('HOME')} relative`}>
          Home
          {activePage === 'HOME' && (
            <motion.div
              layoutId="nav-underline"
              className="nav-underline"
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
              className="nav-underline"
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
                className="nav-underline"
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
                className="nav-underline"
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
              className="nav-underline"
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
              className="nav-underline"
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
              className="nav-underline"
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
              className="nav-underline"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      </nav>

      {/* Button Dark Mode */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="btn-icon"
          aria-label="Toggle Dark Mode"
          disabled={!mounted}
        >
          <Sun className="theme-toggle-icon theme-toggle-sun" />
          <Moon className="theme-toggle-icon theme-toggle-moon" />
        </button>

        <button className="request-demo-button" onClick={() => router.push('/contact')}>
          Contact Us
        </button>
        <button
          className="menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>

      {/* Mobile View Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-nav">
          <button onClick={() => { router.push('/'); setMobileMenuOpen(false); }} className={navLinkClass('HOME')}>Home</button>
          <button onClick={() => { router.push('/services'); setMobileMenuOpen(false); }} className={navLinkClass('SERVICES')}>Services</button>
          <button onClick={() => { router.push('/products'); setMobileMenuOpen(false); }} className={navLinkClass('PRODUCTS')}>Products</button>
          <button onClick={() => { router.push('/about'); setMobileMenuOpen(false); }} className={navLinkClass('ABOUT')}>About</button>
          <button onClick={() => { router.push('/research'); setMobileMenuOpen(false); }} className={navLinkClass('RESEARCH')}>Research </button>
          <button onClick={() => { router.push('/porto'); setMobileMenuOpen(false); }} className={navLinkClass('PORTOFOLIO')}>Portofolio</button>
          <button onClick={() => { router.push('/blog'); setMobileMenuOpen(false); }} className={navLinkClass('BLOG')}>Blog</button>
          <button onClick={() => { router.push('/contact'); setMobileMenuOpen(false); }} className={navLinkClass('CONTACT')}>Contact</button>
          <button className="btn btn-primary w-full mt-2" onClick={() => { router.push('/contact'); setMobileMenuOpen(false); }}>
            Request a Demo
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;