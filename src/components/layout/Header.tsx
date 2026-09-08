"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type HeaderProps = {
  lang: string;
  dict?: any;
};

export function Header({ lang, dict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (newLang: string) => {
    localStorage.setItem("monae-lang", newLang);
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath || `/${newLang}`);
  };

  const isEn = lang === "en";

  const navLinks = [
    { name: isEn ? "Menu" : "Menu", href: `/${lang}` },
    { name: isEn ? "About Us" : "Quem Somos", href: `/${lang}/about` },
    { name: isEn ? "Gallery" : "Galeria", href: `/${lang}/gallery` },
    { name: "FAQ", href: `/${lang}/faq` },
    { name: isEn ? "Contact" : "Contato", href: `/${lang}/contact` },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-cream/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link 
          href={`/${lang}`} 
          className="relative flex items-center justify-center font-script text-3xl sm:text-4xl font-bold text-text-dark tracking-wider gap-2 sm:gap-3"
          onClick={(e) => {
            if (window.location.pathname === `/${lang}`) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <Image 
            src="/icon.png" 
            alt="Monae Dessert Studio" 
            width={55} 
            height={55} 
            className="w-[44px] sm:w-[60px] h-auto object-contain" 
          />
          Monae
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-sans text-sm tracking-widest text-text-dark uppercase hover:text-primary transition-colors duration-300 relative group"
              onClick={(e) => {
                if (link.href === `/${lang}` && window.location.pathname === `/${lang}`) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center gap-2 font-sans font-bold text-sm tracking-widest text-text-dark">
            <button onClick={() => switchLanguage('pt')} className={lang === 'pt' ? 'text-primary' : 'hover:text-primary transition-colors'}>PT</button>
            <span className="text-brand-border">|</span>
            <button onClick={() => switchLanguage('en')} className={lang === 'en' ? 'text-primary' : 'hover:text-primary transition-colors'}>EN</button>
          </div>

          <Link
            href={`/${lang}#menu`}
            className="border-2 border-primary text-text-dark text-sm font-semibold px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-300 tracking-wider"
          >
            {isEn ? "Order Now" : "Encomendar"}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-primary p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[64px] sm:top-[76px] left-0 w-full h-[calc(100vh-64px)] sm:h-[calc(100vh-76px)] bg-off-white/98 backdrop-blur-md flex flex-col items-center pt-8 pb-20 overflow-y-auto z-40 border-t border-brand-border/20 shadow-xl"
          >
            {navLinks.map((link, idx) => (
              <div key={idx} className="w-full text-center mb-4 sm:mb-6">
                <Link
                  href={link.href}
                  className="inline-block py-2.5 px-6 text-xl sm:text-2xl font-serif text-text-dark hover:text-primary transition-colors duration-200"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.href === `/${lang}` && window.location.pathname === `/${lang}`) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {link.name}
                </Link>
              </div>
            ))}

            {/* Language switcher */}
            <div className="flex items-center justify-center gap-4 mt-2 mb-8 font-sans font-bold text-xl text-text-dark">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  switchLanguage('pt');
                }} 
                className={lang === 'pt' ? 'text-primary' : 'hover:text-primary transition-colors'}
              >
                PT
              </button>
              <span className="text-brand-border">|</span>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  switchLanguage('en');
                }} 
                className={lang === 'en' ? 'text-primary' : 'hover:text-primary transition-colors'}
              >
                EN
              </button>
            </div>

            <Link
              href={`/${lang}#menu`}
              className="mt-4 bg-primary text-white text-center text-base font-medium px-8 py-4 rounded-full hover:bg-deep-cherry transition-colors duration-300 w-11/12 max-w-sm uppercase tracking-wider shadow-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {isEn ? "Order Now" : "Encomendar"}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
