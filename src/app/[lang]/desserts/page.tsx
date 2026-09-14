import { getDictionary, Locale } from "@/content";
import Link from "next/link";

export default async function DessertsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const title = lang === "pt" ? "Sobremesas" : "Desserts";
  
  return (
    <div className="flex flex-col w-full bg-off-white min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-text-dark mb-4 sm:mb-6">{title}</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Dessert 1 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-border/30 flex flex-col">
          <div className="aspect-square relative bg-soft-blush">
             <img src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop" alt="Brazilian Flan" className="w-full h-full object-cover" />
          </div>
          <div className="p-5 sm:p-8 flex-grow flex flex-col">
            <h2 className="text-xl sm:text-2xl font-serif text-primary mb-2">Brazilian Flan</h2>
            <div className="text-lg sm:text-xl text-text-dark font-sans mb-3 sm:mb-4">$30</div>
            <p className="text-soft-text font-sans text-sm flex-grow">
              Smooth and creamy Brazilian condensed milk flan. Serves up to 8.
            </p>
          </div>
        </div>

        {/* Dessert 2 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-border/30 flex flex-col">
          <div className="aspect-square relative bg-soft-blush">
             <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop" alt="Brazilian Dessert Tray" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="p-5 sm:p-8 flex-grow flex flex-col">
            <h2 className="text-xl sm:text-2xl font-serif text-primary mb-2">{lang === "pt" ? "Sobremesa de travessa" : "Dessert Tray"}</h2>
            <div className="text-lg sm:text-xl text-text-dark font-sans mb-3 sm:mb-4">$35</div>
            <p className="text-soft-text font-sans text-sm flex-grow">
              {lang === "pt"
                ? "Napolitano, Bombom de uva, Maracujá trufado, Merengue de morango, Morango moreno ou Travessa de limão. Serve até 6 pessoas."
                : "Neapolitan, Grape Bonbon, Passion Fruit Truffle, Strawberry Meringue, Brown Strawberry or Lemon Bowl. Serves up to 6 people."}
            </p>
          </div>
        </div>

        {/* Dessert 3 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-border/30 flex flex-col">
          <div className="aspect-square relative bg-soft-blush">
             <img src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop" alt="Tortas" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="p-5 sm:p-8 flex-grow flex flex-col">
            <h2 className="text-xl sm:text-2xl font-serif text-primary mb-2">{lang === "pt" ? "Tortas" : "Pies"}</h2>
            <div className="text-lg sm:text-xl text-text-dark font-sans mb-3 sm:mb-4">$70</div>
            <p className="text-soft-text font-sans text-sm flex-grow">
              {lang === "pt"
                ? "Banoffee, Limão, Creme e framboesa ou Prestígio. Rende 12 fatias."
                : "Banoffee, Lemon, Cream & Raspberry or Prestige. Serves 12 slices."}
            </p>
          </div>
        </div>

      </div>

      <div className="text-center mt-10 sm:mt-16 px-4">
        <Link 
          href={`/${lang}/how-to-order`}
          className="inline-block w-full max-w-xs sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-primary text-white text-center font-sans tracking-widest text-sm rounded hover:bg-deep-cherry transition-colors duration-300 shadow-lg"
        >
          {lang === "pt" ? "COMEÇAR MINHA ENCOMENDA" : "START YOUR ORDER"}
        </Link>
      </div>
    </div>
  );
}
