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
    <div className="flex flex-col w-full bg-off-white min-h-screen pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl font-serif text-text-dark mb-6">{title}</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Dessert 1 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-border/30 flex flex-col">
          <div className="aspect-square relative bg-soft-blush">
             <img src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop" alt="Brazilian Flan" className="w-full h-full object-cover" />
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <h2 className="text-2xl font-serif text-primary mb-2">Brazilian Flan</h2>
            <div className="text-xl text-text-dark font-sans mb-4">$30</div>
            <p className="text-soft-text font-sans text-sm flex-grow">
              Smooth and creamy Brazilian condensed milk flan. Serves up to 8.
            </p>
          </div>
        </div>

        {/* Dessert 2 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-border/30 flex flex-col">
          <div className="aspect-square relative bg-soft-blush">
             <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop" alt="Brazilian Dessert Tray" className="w-full h-full object-cover" />
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <h2 className="text-2xl font-serif text-primary mb-2">Dessert Tray</h2>
            <div className="text-xl text-text-dark font-sans mb-4">$70</div>
            <p className="text-soft-text font-sans text-sm flex-grow">
              Neapolitan, Grape Bonbon, Ouro Branco, or Strawberry Meringue. Serves up to 15.
            </p>
          </div>
        </div>

        {/* Dessert 3 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-border/30 flex flex-col">
          <div className="aspect-square relative bg-soft-blush">
             <img src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop" alt="Banoffee" className="w-full h-full object-cover" />
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <h2 className="text-2xl font-serif text-primary mb-2">Banoffee</h2>
            <div className="text-xl text-text-dark font-sans mb-4">$70</div>
            <p className="text-soft-text font-sans text-sm flex-grow">
              Crunchy cookie crust, fresh bananas, dulce de leche and light whipped cream. Serves up to 12.
            </p>
          </div>
        </div>

      </div>

      <div className="text-center mt-16">
        <Link 
          href={`/${lang}/how-to-order`}
          className="inline-block px-10 py-5 bg-primary text-white text-center font-sans tracking-widest text-sm rounded hover:bg-deep-cherry transition-colors duration-300 shadow-lg"
        >
          {lang === "pt" ? "COMEÇAR MINHA ENCOMENDA" : "START YOUR ORDER"}
        </Link>
      </div>
    </div>
  );
}
