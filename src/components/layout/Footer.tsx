"use client";

import Link from "next/link";
import { TornEdge } from "@/components/ui/TornEdge";
import { usePathname, useRouter } from "next/navigation";

type FooterProps = {
  lang: string;
  dict: any;
};

export function Footer({ lang, dict }: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLang: string) => {
    localStorage.setItem("preferredLanguage", newLang);
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath || `/${newLang}`);
  };

  return (
    <footer className="w-full bg-footer-bg text-text-dark pt-20 pb-8 mt-auto border-t border-brand-border/20 relative">
      <TornEdge position="top" fill="text-off-white" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="font-script text-4xl text-primary mb-6 tracking-wide">
              Monae
            </h3>
            <p className="text-soft-text font-sans text-sm leading-relaxed max-w-xs">
              {dict.footer.description}
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-serif mb-6 text-text-dark">{dict.footer.explore}</h3>
            <ul className="space-y-3 font-sans text-sm text-soft-text">
              <li><Link href={`/${lang}`} className="hover:text-primary transition-colors">{dict.navigation.home}</Link></li>
              <li><Link href={`/${lang}/about`} className="hover:text-primary transition-colors">{dict.navigation.about}</Link></li>
              <li><Link href={`/${lang}/cakes`} className="hover:text-primary transition-colors">{dict.navigation.menuDropdown.celebrationCakes}</Link></li>
              <li><Link href={`/${lang}/sweets`} className="hover:text-primary transition-colors">{dict.navigation.menuDropdown.brigadeiros}</Link></li>
              <li><Link href={`/${lang}/desserts`} className="hover:text-primary transition-colors">{dict.navigation.menuDropdown.brazilianDesserts}</Link></li>
              <li><Link href={`/${lang}/party-packages`} className="hover:text-primary transition-colors">{dict.navigation.menuDropdown.partyPackages}</Link></li>
              <li><Link href={`/${lang}/gallery`} className="hover:text-primary transition-colors">{dict.navigation.gallery}</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-serif mb-6 text-text-dark">{dict.footer.information}</h3>
            <ul className="space-y-3 font-sans text-sm text-soft-text">
              <li><Link href={`/${lang}/how-to-order`} className="hover:text-primary transition-colors">{dict.navigation.howToOrder}</Link></li>
              <li><Link href={`/${lang}/faq`} className="hover:text-primary transition-colors">{dict.navigation.faq}</Link></li>
              <li><Link href={`/${lang}/policies`} className="hover:text-primary transition-colors">Policies</Link></li>
              <li><Link href={`/${lang}/policies#storage`} className="hover:text-primary transition-colors">Storage & Care</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-serif mb-6 text-text-dark">{dict.footer.contact}</h3>
            <ul className="space-y-3 font-sans text-sm text-soft-text">
              <li>+1 571 525 8279</li>
              <li>monaedessertstudio@gmail.com</li>
              <li className="mt-4">
                <a href="https://www.instagram.com/monaedessertstudio" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Instagram: @monaedessertstudio
                </a>
              </li>
              <li className="mt-6 font-semibold text-text-dark">{dict.footer.serving}</li>
              {dict.footer.servingAreas.map((area: string, idx: number) => (
                <li key={idx}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-border/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-soft-text">
          <p>{dict.footer.rights}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href={`/${lang}/privacy`} className="hover:text-primary transition-colors">
              {dict.footer.links.privacy}
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-primary transition-colors">
              {dict.footer.links.terms}
            </Link>
            <Link href={`/${lang}/accessibility`} className="hover:text-white transition-colors">{dict.footer.links.accessibility}</Link>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => switchLanguage("en")}
              className={`hover:opacity-100 transition-opacity ${lang === "en" ? "opacity-100 grayscale-0" : "opacity-50 grayscale"}`}
              title="English"
            >
              <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-5 h-auto rounded-sm shadow-sm" />
            </button>
            <span className="mx-1 text-white/40">|</span>
            <button
              onClick={() => switchLanguage("pt")}
              className={`hover:opacity-100 transition-opacity ${lang === "pt" ? "opacity-100 grayscale-0" : "opacity-50 grayscale"}`}
              title="Português"
            >
              <img src="https://flagcdn.com/w40/br.png" alt="Português" className="w-5 h-auto rounded-sm shadow-sm" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
