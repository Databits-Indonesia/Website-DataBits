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

  useEffect(() => setMounted(true), []);

  const navLinkClass = (page: Page) =>
    `${activePage === page ? 'nav-link nav-link-active' : 'nav-link'}`;

  return (
    <header className="header ">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/')}>
        <img src="/logo.jpeg" alt="DataBits Logo" className="h-8" />
      </div>

      <nav className="hidden items-center md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {/* HOME DROPDOWN */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-link">Home</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="nav-menu-grid-md">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link href="/" className="nav-menu-featured">
                        <div className="nav-menu-featured-title">Home</div>
                        <p className="nav-menu-featured-desc">
                          Welcome to DataBits - Your partner in AI innovation
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/about" title="About">
                    Learn about our mission and values
                  </ListItem>
                  <ListItem href="/careers" title="Careers">
                    Join our team and build the future
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* SERVICES DROPDOWN */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-link">Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="nav-menu-multi-column">
                  <div className="nav-menu-column">
                    <h3 className="nav-menu-category-label">Services</h3>
                    <ul className="nav-menu-category-list">
                      <ListItem href="/services" title="Overview">
                        AI solutions for your business
                      </ListItem>
                      <ListItem href="/services#services" title="Services">
                        Explore our range of AI services
                      </ListItem>
                      <ListItem href="/services#process" title="Process">
                        Our approach to delivering AI
                      </ListItem>
                    </ul>
                  </div>
                  <div className="nav-menu-column">
                    <h3 className="nav-menu-category-label">Products</h3>
                    <ul className="nav-menu-category-list">
                      <ListItem href="/products" title="BitsChat">
                        AI-powered chat assistant
                      </ListItem>
                      <ListItem href="/products#convert" title="DataBits Convert">
                        Intelligent data conversion tools
                      </ListItem>
                      <ListItem href="/products#shop" title="Databits Shop">
                        Marketplace of AI solutions
                      </ListItem>
                    </ul>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* PROJECT DROPDOWN */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-link">Project</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="nav-menu-multi-column">
                  <div className="nav-menu-column">
                    <h3 className="nav-menu-category-label">Projects</h3>
                    <ul className="nav-menu-category-list">
                      <ListItem href="/projects" title="Overview">
                        Explore our project portfolio
                      </ListItem>
                      <ListItem href="/projects#case-studies" title="Case Studies">
                        Real-world success stories
                      </ListItem>
                      <ListItem href="/projects#portfolio" title="Portfolio">
                        Featured work and solutions
                      </ListItem>
                    </ul>
                  </div>
                  <div className="nav-menu-column">
                    <h3 className="nav-menu-category-label">Research</h3>
                    <ul className="nav-menu-category-list">
                      <ListItem href="/research" title="Overview">
                        Innovation and exploration
                      </ListItem>
                      <ListItem href="/research#publications" title="Publications">
                        Latest research papers
                      </ListItem>
                      <ListItem href="/research#open-source" title="Open Source">
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
                <Link href="/blog" className="nav-link">Blog</Link>
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
          <button onClick={() => { router.push('/about'); setMobileMenuOpen(false); }} className={navLinkClass('ABOUT')}>About</button>
          <button onClick={() => { router.push('/careers'); setMobileMenuOpen(false); }} className={navLinkClass('CAREERS')}>Careers</button>
          <button onClick={() => { router.push('/services'); setMobileMenuOpen(false); }} className={navLinkClass('SERVICES')}>Services</button>
          <button onClick={() => { router.push('/products'); setMobileMenuOpen(false); }} className={navLinkClass('PRODUCTS')}>Products</button>
          <button onClick={() => { router.push('/projects'); setMobileMenuOpen(false); }} className={navLinkClass('PROJECT')}>Projects</button>
          <button onClick={() => { router.push('/research'); setMobileMenuOpen(false); }} className={navLinkClass('RESEARCH')}>Research</button>
          <button onClick={() => { router.push('/blog'); setMobileMenuOpen(false); }} className={navLinkClass('BLOG')}>Blog</button>
          <button className="btn btn-primary w-full mt-2" onClick={() => { router.push('/contact'); setMobileMenuOpen(false); }}>
            Contact Us
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