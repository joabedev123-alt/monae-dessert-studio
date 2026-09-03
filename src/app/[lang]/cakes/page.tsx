import { getDictionary, Locale } from "@/content";
import Link from "next/link";

export default async function CakesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const title = lang === "pt" ? "Bolos Personalizados" : "Custom Cakes";
  const desc = lang === "pt" 
    ? "Pensados para a sua celebração e feitos à mão em cada detalhe." 
    : "Designed around your celebration and handcrafted from the inside out.";

  const sizes = [
    { size: '4"', servings: "6–8", price: "$58" },
    { size: '6"', servings: "10–15", price: "$80" },
    { size: '8"', servings: "20–25", price: "$120" },
    { size: '10"', servings: "33–38", price: "$180" },
    { size: '12"', servings: "52–57", price: "$215" },
  ];

  return (
    <div className="flex flex-col w-full bg-off-white min-h-screen pt-24 pb-24">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-24">
        <h1 className="text-5xl font-serif text-text-dark mb-6">{title}</h1>
        <p className="text-soft-text font-sans text-xl">{desc}</p>
      </div>

      {/* Sizes Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop" 
              alt="Custom Cake" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-serif text-text-dark mb-8">
            {lang === "pt" ? "Tamanhos e Valores Base" : "Sizes and Base Pricing"}
          </h2>
          
          <div className="space-y-6">
            {sizes.map((s, i) => (
              <div key={i} className="flex justify-between items-end border-b border-brand-border/30 pb-4">
                <div>
                  <h3 className="text-xl font-serif text-primary">{s.size} Cake</h3>
                  <p className="text-soft-text text-sm font-sans mt-1">
                    {lang === "pt" ? `Serve aprox. ${s.servings} fatias` : `Serves approx. ${s.servings}`}
                  </p>
                </div>
                <div className="text-text-dark font-sans font-semibold tracking-wide">
                  {lang === "pt" ? `A partir de ${s.price}` : `Starting at ${s.price}`}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-soft-blush p-6 rounded-xl border border-brand-border/20">
            <h4 className="font-serif text-text-dark text-lg mb-2">
              {lang === "pt" ? "Informação" : "Information"}
            </h4>
            <ul className="text-soft-text text-sm font-sans space-y-2 list-disc list-inside">
              <li>{lang === "pt" ? "4 camadas de bolo" : "4 cake layers"}</li>
              <li>{lang === "pt" ? "3 camadas de recheio" : "3 filling layers"}</li>
              <li>{lang === "pt" ? "Aprox. 6\" de altura" : "Approx. 6\" tall"}</li>
            </ul>
            <p className="text-primary text-xs mt-4">
              * {lang === "pt" ? "O valor final depende da decoração e nível de detalhes." : "Final pricing varies depending on design and level of detail."}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
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
