"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type HeaderProps = {
  lang: string;
};

export function Header({ lang }: HeaderProps) {
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${lang}`} className="relative flex items-center justify-center font-script text-4xl font-bold text-text-dark tracking-wider gap-3">
          <Image 
            src="/icon.png" 
            alt="Monae Dessert Studio" 
            width={65} 
            height={65} 
            className="w-[65px] h-auto object-contain" 
          />
          Monae
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link, idx) => (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => link.dropdown && setMenuDropdownOpen(true)}
              onMouseLeave={() => link.dropdown && setMenuDropdownOpen(false)}
            >
              {link.dropdown ? (
                <div className="flex items-center space-x-1 text-sm font-medium text-text-dark hover:text-primary transition-colors uppercase tracking-wider cursor-pointer">
                  <span>{link.name}</span>
                  <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                </div>
              ) : (
                <Link
                  href={link.href}
                  className="text-sm font-medium text-text-dark hover:text-primary transition-colors uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              )}

              {/* Desktop Dropdown */}
              {link.dropdown && (
                <AnimatePresence>
                  {menuDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-64 bg-white shadow-lg rounded-xl border border-brand-border py-4 overflow-hidden"
                    >
                      {link.dropdown.map((dropItem, dropIdx) => (
                        <Link
                          key={dropIdx}
                          href={dropItem.href}
                          className="block px-6 py-3 text-sm text-text-dark hover:bg-blush hover:text-primary transition-colors uppercase tracking-wider"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            href={`/${lang}#menu`}
            className="border-2 border-primary text-text-dark text-sm font-semibold px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-300 tracking-wider"
          >
            {isEn ? "Order Now" : "Encomendar"}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-off-white flex flex-col items-center pt-10 pb-20 overflow-y-auto z-40"
          >
            {navLinks.map((link, idx) => (
              <div key={idx} className="w-full text-center mb-6">
                {link.dropdown ? (
                  <>
                    <div className="text-xl font-serif text-primary mb-4">{link.name}</div>
                    <div className="flex flex-col space-y-3">
                      {link.dropdown.map((dropItem, dropIdx) => (
                        <Link
                          key={dropIdx}
                          href={dropItem.href}
                          className="text-text-dark font-sans"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="text-xl font-serif text-text-dark hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Language switcher removed from mobile menu too */}

            <Link
              href={`/${lang}#menu`}
              className="bg-primary text-white text-center text-sm font-medium px-8 py-4 rounded-full hover:bg-deep-cherry transition-colors duration-300 w-11/12 max-w-sm uppercase tracking-wider"
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
