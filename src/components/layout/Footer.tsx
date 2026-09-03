"use client";

import Link from "next/link";
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
    <footer className="bg-dark-wine text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 */}
          <div>
            <div className="mb-6">
              <img src="/logo.png" alt="Monae Dessert Studio" className="w-[110px] object-contain" />
            </div>
            <p className="text-white/80 font-sans text-sm leading-relaxed max-w-xs">
              {dict.footer.description}
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-serif mb-6">{dict.footer.explore}</h3>
            <ul className="space-y-3 font-sans text-sm text-white/80">
              <li><Link href={`/${lang}`} className="hover:text-white transition-colors">{dict.navigation.home}</Link></li>
              <li><Link href={`/${lang}/about`} className="hover:text-white transition-colors">{dict.navigation.about}</Link></li>
              <li><Link href={`/${lang}/cakes`} className="hover:text-white transition-colors">{dict.navigation.menuDropdown.celebrationCakes}</Link></li>
              <li><Link href={`/${lang}/sweets`} className="hover:text-white transition-colors">{dict.navigation.menuDropdown.brigadeiros}</Link></li>
              <li><Link href={`/${lang}/desserts`} className="hover:text-white transition-colors">{dict.navigation.menuDropdown.brazilianDesserts}</Link></li>
              <li><Link href={`/${lang}/party-packages`} className="hover:text-white transition-colors">{dict.navigation.menuDropdown.partyPackages}</Link></li>
              <li><Link href={`/${lang}/gallery`} className="hover:text-white transition-colors">{dict.navigation.gallery}</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-serif mb-6">{dict.footer.information}</h3>
            <ul className="space-y-3 font-sans text-sm text-white/80">
              <li><Link href={`/${lang}/how-to-order`} className="hover:text-white transition-colors">{dict.navigation.howToOrder}</Link></li>
              <li><Link href={`/${lang}/faq`} className="hover:text-white transition-colors">{dict.navigation.faq}</Link></li>
              <li><Link href={`/${lang}/policies`} className="hover:text-white transition-colors">Policies</Link></li>
              <li><Link href={`/${lang}/policies#storage`} className="hover:text-white transition-colors">Storage & Care</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-serif mb-6">{dict.footer.contact}</h3>
            <ul className="space-y-3 font-sans text-sm text-white/80">
              <li>+1 571 525 8279</li>
              <li>monaedessertstudio@gmail.com</li>
              <li className="mt-4">
                <a href="https://www.instagram.com/monaedessertstudio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram: @monaedessertstudio
                </a>
              </li>
              <li className="mt-6 font-semibold">{dict.footer.serving}</li>
              {dict.footer.servingAreas.map((area: string, idx: number) => (
                <li key={idx}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-sm text-white/60">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
            <p>{dict.footer.rights}</p>
            <p>
              Produzida com 💚 por <a href="https://camaly.com.br/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-semibold">CAMALY</a>
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">{dict.footer.links.privacy}</Link>
            <Link href={`/${lang}/terms`} className="hover:text-white transition-colors">{dict.footer.links.terms}</Link>
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
