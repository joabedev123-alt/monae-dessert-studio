"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type HeaderProps = {
  lang: string;
  dict: any;
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
    localStorage.setItem("preferredLanguage", newLang);
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath || `/${newLang}`);
  };

  const navLinks = [
    { name: dict.navigation.home, href: `/${lang}` },
    { name: dict.navigation.about, href: `/${lang}/about` },
    { 
      name: dict.navigation.menu, 
      href: "#",
      dropdown: [
        { name: dict.navigation.menuDropdown.celebrationCakes, href: `/${lang}/cakes` },
        { name: dict.navigation.menuDropdown.brigadeiros, href: `/${lang}/sweets` },
        { name: dict.navigation.menuDropdown.brazilianDesserts, href: `/${lang}/desserts` },
        { name: dict.navigation.menuDropdown.partyPackages, href: `/${lang}/party-packages` },
      ]
    },
    { name: dict.navigation.gallery, href: `/${lang}/gallery` },
    { name: dict.navigation.howToOrder, href: `/${lang}/how-to-order` },
    { name: dict.navigation.faq, href: `/${lang}/faq` },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-transparent ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${lang}`} className="relative flex items-center justify-center">
          <img src="/logo.png" alt="Monae Dessert Studio" className="w-[110px] object-contain" />
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
                <div className="flex items-center space-x-1 text-sm font-sans text-text-dark hover:text-primary cursor-pointer tracking-wide transition-colors">
                  <span>{link.name}</span>
                  <ChevronDown size={14} className="opacity-70" />
                </div>
              ) : (
                <Link
                  href={link.href}
                  className="text-sm font-sans text-text-dark hover:text-primary tracking-wide transition-colors"
                >
                  {link.name}
                </Link>
              )}

              {/* Dropdown */}
              {link.dropdown && (
                <AnimatePresence>
                  {menuDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-56 bg-white shadow-lg rounded-md overflow-hidden border border-brand-border py-2"
                    >
                      {link.dropdown.map((dropItem, dropIdx) => (
                        <Link
                          key={dropIdx}
                          href={dropItem.href}
                          className="block px-4 py-2 text-sm text-text-dark hover:bg-soft-blush hover:text-primary transition-colors"
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
          <div className="flex items-center space-x-2 text-sm font-sans">
            <Globe size={16} className="text-primary" />
            <button
              onClick={() => switchLanguage("en")}
              className={`hover:opacity-80 transition-opacity ${lang === "en" ? "opacity-100 grayscale-0" : "opacity-50 grayscale"}`}
              title="English"
            >
              <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-5 h-auto rounded-sm shadow-sm" />
            </button>
            <span className="text-soft-text">|</span>
            <button
              onClick={() => switchLanguage("pt")}
              className={`hover:opacity-80 transition-opacity ${lang === "pt" ? "opacity-100 grayscale-0" : "opacity-50 grayscale"}`}
              title="Português"
            >
              <img src="https://flagcdn.com/w40/br.png" alt="Português" className="w-5 h-auto rounded-sm shadow-sm" />
            </button>
          </div>

          <Link
            href={`/${lang}/how-to-order`}
            className="bg-primary text-white text-sm font-sans px-6 py-2.5 rounded hover:bg-deep-cherry transition-colors duration-300"
          >
            {dict.navigation.startOrder}
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
            className="lg:hidden absolute top-full left-0 w-full bg-off-white/95 backdrop-blur-md flex flex-col items-center pt-10 pb-20 overflow-y-auto"
          >
            {navLinks.map((link, idx) => (
              <div key={idx} className="w-full text-center mb-6">
                {link.dropdown ? (
                  <>
                    <div className="text-lg font-serif text-primary mb-4">{link.name}</div>
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
                    className="text-lg font-serif text-text-dark hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="flex items-center space-x-4 mt-8 mb-8">
              <button
                onClick={() => switchLanguage("en")}
                className={`hover:opacity-80 transition-opacity ${lang === "en" ? "opacity-100 grayscale-0" : "opacity-50 grayscale"}`}
                title="English"
              >
                <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-8 h-auto rounded-sm shadow-sm" />
              </button>
              <span className="text-soft-text">|</span>
              <button
                onClick={() => switchLanguage("pt")}
                className={`hover:opacity-80 transition-opacity ${lang === "pt" ? "opacity-100 grayscale-0" : "opacity-50 grayscale"}`}
                title="Português"
              >
                <img src="https://flagcdn.com/w40/br.png" alt="Português" className="w-8 h-auto rounded-sm shadow-sm" />
              </button>
            </div>

            <Link
              href={`/${lang}/how-to-order`}
              className="bg-primary text-white text-base font-sans px-8 py-3 rounded hover:bg-deep-cherry transition-colors duration-300 w-11/12 max-w-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.navigation.startOrder}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
