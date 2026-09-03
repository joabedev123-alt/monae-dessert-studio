import { getDictionary, Locale } from "@/content";
import Link from "next/link";

export default async function SweetsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const title = lang === "pt" ? "Brigadeiros & Doces" : "Brigadeiros & Sweets";
  const desc = lang === "pt" 
    ? "Um clássico brasileiro, feito artesanalmente para a sua celebração." 
    : "A Brazilian classic, handcrafted for your celebration.";

  return (
    <div className="flex flex-col w-full bg-cream min-h-screen pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl font-serif text-text-dark mb-6">{title}</h1>
        <p className="text-soft-text font-sans text-xl mb-12">{desc}</p>
        <div className="w-full aspect-[21/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-md">
          <img 
            src="/Imagens/docinho.jpeg" 
            alt="Brigadeiros e Doces" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-border/30">
          <h2 className="text-3xl font-serif text-primary mb-8">Classic Brigadeiros</h2>
          <ul className="text-soft-text space-y-4 font-sans text-sm md:text-base">
            <li>• Brigadeiro</li>
            <li>• White Chocolate</li>
            <li>• Coconut</li>
            <li>• Duo Chocolate</li>
            <li>• Milk Brigadeiro</li>
            <li>• Strawberry</li>
            <li>• Duo Chocolate & Strawberry</li>
          </ul>
          
          <div className="mt-10 pt-6 border-t border-brand-border/20">
            <h3 className="font-serif text-text-dark text-lg mb-4">Pricing</h3>
            <div className="space-y-2 text-sm text-soft-text font-sans">
              <div className="flex justify-between"><span>25 pieces</span><span>$30</span></div>
              <div className="flex justify-between"><span>50 pieces</span><span>$50</span></div>
              <div className="flex justify-between font-semibold text-text-dark"><span>100 pieces</span><span>$90</span></div>
            </div>
            <p className="text-xs text-soft-text/80 mt-4 italic">* Minimum 25 pieces per flavor</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-border/30">
          <h2 className="text-3xl font-serif text-primary mb-8">Special Brigadeiros</h2>
          <ul className="text-soft-text space-y-4 font-sans text-sm md:text-base">
            <li>• Belgian Milk Chocolate</li>
            <li>• White Chocolate</li>
            <li>• Peanut</li>
            <li>• Strawberry & Nutella</li>
            <li>• M&M’s</li>
            <li>• Churro</li>
            <li>• Dark Chocolate</li>
            <li>• Passion Fruit</li>
            <li>• Lemon</li>
          </ul>
          
          <div className="mt-10 pt-6 border-t border-brand-border/20">
            <h3 className="font-serif text-text-dark text-lg mb-4">Pricing</h3>
            <div className="space-y-2 text-sm text-soft-text font-sans">
              <div className="flex justify-between"><span>25 pieces</span><span>$35</span></div>
              <div className="flex justify-between"><span>50 pieces</span><span>$65</span></div>
              <div className="flex justify-between font-semibold text-text-dark"><span>100 pieces</span><span>$110</span></div>
            </div>
            <p className="text-xs text-soft-text/80 mt-4 italic">* Minimum 25 pieces per flavor</p>
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
