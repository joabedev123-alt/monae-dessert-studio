"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LanguageSelectionPage() {
  const router = useRouter();

  useEffect(() => {
    // Only run on client, intentionally NOT auto-redirecting
    // so the user ALWAYS sees the language selection screen first.
  }, [router]);

  const selectLanguage = (lang: "en" | "pt") => {
    localStorage.setItem("monae-lang", lang);
    router.push(`/${lang}`);
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="z-10 flex flex-col items-center max-w-md w-full px-6">
        <div className="mb-12 flex flex-col items-center justify-center">
          <Image 
            src="/icon.png" 
            alt="Monae Dessert Studio"
            width={120}
            height={120}
            className="w-[120px] h-auto object-contain mb-4"
            priority
          />
          <h1 className="font-script text-6xl text-primary tracking-wider">
            Monae
          </h1>
        </div>

        <div className="flex flex-col items-center space-y-8 w-full">
          <p className="text-text-dark font-serif text-xl text-center">
            Choose your language
            <br />
            <span className="text-soft-text text-lg">Escolha seu idioma</span>
          </p>

          <div className="flex space-x-6">
            <button
              onClick={() => selectLanguage("en")}
              className="flex flex-col items-center space-y-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-border shadow-sm flex items-center justify-center bg-white">
                <img src="https://flagcdn.com/w80/us.png" alt="English" className="w-full h-full object-cover" />
              </div>
              <span className="text-text-dark font-medium tracking-widest text-sm uppercase">English</span>
            </button>

            <button
              onClick={() => selectLanguage("pt")}
              className="flex flex-col items-center space-y-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-border shadow-sm flex items-center justify-center bg-white">
                <img src="https://flagcdn.com/w80/br.png" alt="Português" className="w-full h-full object-cover" />
              </div>
              <span className="text-text-dark font-medium tracking-widest text-sm uppercase">Português</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
