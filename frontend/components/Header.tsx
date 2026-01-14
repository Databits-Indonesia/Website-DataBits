'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
// import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useI18n } from "@/components/i18n-provider";
import { getCurrentLocale, localizePath, switchLocalePath } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Page Builder
type Page = 'HOME' | 'ABOUT' | 'SERVICES' | 'PRODUCTS' | 'BLOG' | 'CONTACT' | 'RESEARCH' | 'PROJECT' | 'CAREERS';

// Router
const pageRoutes: Record<Page, string> = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  PRODUCTS: '/products',
  BLOG: '/blog',
  CONTACT: '/contact',
  RESEARCH: '/research',
  PROJECT: '/projects',
  CAREERS: '/careers'
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
  const { t } = useI18n();
  const locale = getCurrentLocale(pathname);

  useEffect(() => setMounted(true), []);

  const navLinkClass = (page: Page) =>
    `${activePage === page ? 'nav-link nav-link-active' : 'nav-link'}`;

  return (
    <header className="header ">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push(localizePath(locale, '/'))}>
        <img src="/logo.jpeg" alt="DataBits Logo" className="h-8" />
      </div>

      <nav className="hidden items-center md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {/* HOME DROPDOWN */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-link">{t('header.home')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="nav-menu-grid-md">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link href={localizePath(locale, '/')} className="nav-menu-featured">
                        <div className="nav-menu-featured-title">{t('header.home')}</div>
                        <p className="nav-menu-featured-desc">
                          Welcome to DataBits - Your partner in AI innovation
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href={localizePath(locale, '/about')} title={t('header.about')}>
                    Learn about our mission and values
                  </ListItem>
                  <ListItem href={localizePath(locale, '/careers')} title={t('header.careers')}>
                    Join our team and build the future
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* SERVICES DROPDOWN */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-link">{t('header.services')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="nav-menu-multi-column">
                  <div className="nav-menu-column">
                    <h3 className="nav-menu-category-label">{t('header.servicesLabel')}</h3>
                    <ul className="nav-menu-category-list">
                      <ListItem href={localizePath(locale, '/services')} title={t('header.overview')}>
                        AI solutions for your business
                      </ListItem>
                      <ListItem href={localizePath(locale, '/services#services')} title={t('header.servicesLabel')}>
                        Explore our range of AI services
                      </ListItem>
                      <ListItem href={localizePath(locale, '/services#process')} title={t('header.process')}>
                        Our approach to delivering AI
                      </ListItem>
                    </ul>
                  </div>
                  <div className="nav-menu-column">
                    <h3 className="nav-menu-category-label">{t('header.products')}</h3>
                    <ul className="nav-menu-category-list">
                      <ListItem href={localizePath(locale, '/products')} title={t('header.bitsChat')}>
                        AI-powered chat assistant
                      </ListItem>
                      <ListItem href={localizePath(locale, '/products#convert')} title={t('header.convert')}>
                        Intelligent data conversion tools
                      </ListItem>
                      <ListItem href={localizePath(locale, '/products#shop')} title={t('header.shop')}>
                        Marketplace of AI solutions
                      </ListItem>
                    </ul>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* PROJECT DROPDOWN */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-link">{t('header.project')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="nav-menu-multi-column">
                  <div className="nav-menu-column">
                    <h3 className="nav-menu-category-label">{t('header.projects')}</h3>
                    <ul className="nav-menu-category-list">
                      <ListItem href={localizePath(locale, '/projects')} title={t('header.overview')}>
                        Explore our project portfolio
                      </ListItem>
                      <ListItem href={localizePath(locale, '/projects#case-studies')} title={t('header.caseStudies')}>
                        Real-world success stories
                      </ListItem>
                      <ListItem href={localizePath(locale, '/projects#portfolio')} title={t('header.portfolio')}>
                        Featured work and solutions
                      </ListItem>
                    </ul>
                  </div>
                  <div className="nav-menu-column">
                    <h3 className="nav-menu-category-label">{t('header.research')}</h3>
                    <ul className="nav-menu-category-list">
                      <ListItem href={localizePath(locale, '/research')} title={t('header.overview')}>
                        Innovation and exploration
                      </ListItem>
                      <ListItem href={localizePath(locale, '/research#publications')} title={t('header.publications')}>
                        Latest research papers
                      </ListItem>
                      <ListItem href={localizePath(locale, '/research#open-source')} title={t('header.openSource')}>
                        Community contributions
                      </ListItem>
                    </ul>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* BLOG - Single Link */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href={localizePath(locale, '/blog')} className="nav-link">{t('header.blog')}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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
        
        <DropdownMenu>
          <DropdownMenuTrigger className="btn btn-secondary px-3 py-1 text-sm">
            {locale.toUpperCase()}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => router.push(switchLocalePath(pathname, 'en'))}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(switchLocalePath(pathname, 'id'))}>
              Indonesian
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button className="request-demo-button" onClick={() => router.push(localizePath(locale, '/contact'))}>
          {t('header.contactUs')}
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
          <button onClick={() => { router.push(localizePath(locale, '/')); setMobileMenuOpen(false); }} className={navLinkClass('HOME')}>{t('header.home')}</button>
          <button onClick={() => { router.push(localizePath(locale, '/about')); setMobileMenuOpen(false); }} className={navLinkClass('ABOUT')}>{t('header.about')}</button>
          <button onClick={() => { router.push(localizePath(locale, '/careers')); setMobileMenuOpen(false); }} className={navLinkClass('CAREERS')}>{t('header.careers')}</button>
          <button onClick={() => { router.push(localizePath(locale, '/services')); setMobileMenuOpen(false); }} className={navLinkClass('SERVICES')}>{t('header.services')}</button>
          <button onClick={() => { router.push(localizePath(locale, '/products')); setMobileMenuOpen(false); }} className={navLinkClass('PRODUCTS')}>{t('header.products')}</button>
          <button onClick={() => { router.push(localizePath(locale, '/projects')); setMobileMenuOpen(false); }} className={navLinkClass('PROJECT')}>{t('header.projects')}</button>
          <button onClick={() => { router.push(localizePath(locale, '/research')); setMobileMenuOpen(false); }} className={navLinkClass('RESEARCH')}>{t('header.research')}</button>
          <button onClick={() => { router.push(localizePath(locale, '/blog')); setMobileMenuOpen(false); }} className={navLinkClass('BLOG')}>{t('header.blog')}</button>
          <button className="btn btn-primary w-full mt-2" onClick={() => { router.push(localizePath(locale, '/contact')); setMobileMenuOpen(false); }}>
            {t('header.contactUs')}
          </button>
        </div>
      )}
    </header>
  );
};

function ListItem({
  title,
  children,
  href,
}: {
  title: string;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href} className="nav-menu-item">
          <div className="nav-menu-item-title">{title}</div>
          <p className="nav-menu-item-desc">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default Navbar;