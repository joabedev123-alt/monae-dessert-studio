"use client";

import Image from "next/image";
import { CATEGORIES, ProductCategory } from "@/data/catalog";

interface ProductCategoriesProps {
  lang: string;
  onSelectCategory: (category: ProductCategory) => void;
}

export function ProductCategories({ lang, onSelectCategory }: ProductCategoriesProps) {
  const isEn = lang === "en";

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8" id="menu">
      <div className="text-center mb-10">
        <h2 className="text-5xl md:text-6xl font-script text-primary mb-2">
          Start Here
        </h2>
        <p className="text-xl font-serif text-text-dark">
          {isEn ? "What would you like to order?" : "O que você gostaria de encomendar?"}
        </p>
      </div>

      {/* Main Categories (First 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {CATEGORIES.slice(0, 3).map((cat) => {
          return (
            <div
              key={cat.id}
              className="bg-soft-blush rounded-[2rem] p-4 flex flex-col items-center text-center cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300"
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="relative w-full aspect-square bg-cream rounded-[1.5rem] overflow-hidden mb-6">
                {cat.image ? (
                  <>
                    <Image 
                      src={cat.image} 
                      alt={cat.name[lang as 'en' | 'pt']} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-primary/30 text-4xl font-serif text-center p-4">
                    {cat.name[lang as 'en' | 'pt']}
                  </div>
                )}
              </div>
              
              <div className="px-2 flex flex-col items-center flex-grow w-full">
                <h3 className="text-2xl font-serif text-text-dark mb-1 group-hover:text-primary transition-colors">
                  {cat.name[lang as 'en' | 'pt']}
                </h3>
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full mb-4"></div>
                <p className="text-soft-text text-sm mb-6 flex-grow max-w-[250px]">
                  {cat.description[lang as 'en' | 'pt']}
                </p>
                
                <button
                  className="px-8 py-2 rounded-full text-sm font-medium transition-colors bg-transparent text-text-dark border border-text-dark/30 group-hover:bg-primary group-hover:text-white group-hover:border-primary tracking-wide mb-4 w-full md:w-auto"
                >
                  {isEn ? "Select" : "Selecionar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Categories (Remaining 4) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {CATEGORIES.slice(3).map((cat) => {
          return (
            <div
              key={cat.id}
              className="bg-soft-blush rounded-3xl p-3 flex flex-col items-center text-center cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="relative w-full aspect-[4/3] bg-cream rounded-2xl overflow-hidden mb-4">
                {cat.image ? (
                  <>
                    <Image 
                      src={cat.image} 
                      alt={cat.name[lang as 'en' | 'pt']} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-primary/30 text-xl md:text-2xl font-serif text-center p-2 leading-tight">
                    {cat.name[lang as 'en' | 'pt']}
                  </div>
                )}
              </div>
              
              <div className="px-1 flex flex-col items-center flex-grow w-full">
                <h3 className="text-lg font-serif text-text-dark mb-1 group-hover:text-primary transition-colors leading-tight">
                  {cat.name[lang as 'en' | 'pt']}
                </h3>
                <p className="text-soft-text text-xs mb-4 flex-grow line-clamp-2">
                  {cat.description[lang as 'en' | 'pt']}
                </p>
                
                <button
                  className="w-full py-2 rounded-full text-xs font-medium transition-colors bg-transparent text-text-dark border border-text-dark/20 group-hover:bg-primary group-hover:text-white group-hover:border-primary tracking-wide"
                >
                  {isEn ? "Select" : "Selecionar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
