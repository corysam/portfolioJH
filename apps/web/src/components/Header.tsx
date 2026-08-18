'use client';

import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { HeaderData } from '@/lib/types';

interface HeaderProps {
  header: HeaderData;
  /** When true, in-page navigation scrolls to anchors on the home page instead of routing. */
  onNavigate?: () => void;
}

export function Header({ header, onNavigate }: HeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.href,
        element: document.querySelector(item.href),
      }));

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = (section.element as HTMLElement).offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      if (window.scrollY < 100) setActiveSection('#home');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    if (!isHome) {
      // On project pages: route back to the homepage with the hash.
      router.push(`/${href}`);
      return;
    }
    if (onNavigate) {
      onNavigate();
      setTimeout(() => smoothScroll(href), 100);
    } else {
      smoothScroll(href);
    }
  };

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0C2723]/95 backdrop-blur-md border-b-4 border-primary dark:border-primary/40"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:max-w-[max(calc(100%_-_128px),80rem)] lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" onClick={() => isHome && smoothScroll('#home')}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-2xl bg-[#A0C4A1] dark:bg-[#5A7A5E] flex items-center justify-center text-[#000000] dark:text-[#F5E6D3] shadow-lg tracking-tighter text-[28px] overflow-hidden"
                >
                  {header.logoUrl ? (
                    <Image
                      src={header.logoUrl}
                      alt={`${header.brandName} logo`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-400 dark:bg-neutral-500 flex items-center justify-center text-xs text-neutral-600 dark:text-neutral-300">
                      LOGO
                    </div>
                  )}
                </motion.div>
                <span className="hidden sm:block text-foreground font-bold text-lg">{header.brandName}</span>
              </motion.div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = isHome && activeSection === item.href;
                return (
                  <button key={item.href} onClick={() => scrollToSection(item.href)}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className={`relative font-semibold transition-colors ${
                        isActive ? 'text-[#94B298]' : 'text-foreground hover:text-[#63746B]'
                      }`}
                    >
                      {item.label}
                    </motion.div>
                  </button>
                );
              })}

              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label="Toggle dark mode"
                className="hidden w-11 h-11 rounded-xl border-2 border-black dark:border-[#F5E6D3] items-center justify-center shadow-md bg-[#5A7A5E] text-[#F5E6D3]"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </nav>

            <div className="flex items-center gap-3 md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label="Toggle dark mode"
                className="hidden w-11 h-11 rounded-xl border-2 border-primary dark:border-primary/60 items-center justify-center shadow-md bg-[#5A7A5E] text-[#F5E6D3]"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className={`w-11 h-11 rounded-xl border-2 border-primary dark:border-primary/60 flex items-center justify-center shadow-md ${
                  isDark ? 'bg-[#5A7A5E] text-[#F5E6D3]' : 'bg-[#A0C4A1]'
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#000000] dark:text-[#F5E6D3]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#000000] dark:text-[#F5E6D3]" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-0 bottom-0 z-40 w-64 bg-background/95 backdrop-blur-md border-l-4 border-primary dark:border-primary/40 md:hidden overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-3 p-6">
              {navItems.map((item, index) => {
                const isActive = isHome && activeSection === item.href;
                return (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full py-3 px-4 text-left text-base font-medium transition-all rounded-lg ${
                      isActive
                        ? 'text-[#5A7A5E] dark:text-[#5A7A5E] bg-[#001616]'
                        : 'text-foreground hover:text-[#5A7A5E] dark:hover:text-[#5A7A5E] hover:bg-[#A0C4A1]/10 dark:hover:bg-[#5A7A5E]/10'
                    } text-[#648a68]`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function smoothScroll(href: string) {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else if (href === '#home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
