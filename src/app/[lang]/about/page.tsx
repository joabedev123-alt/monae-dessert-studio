import { getDictionary, Locale } from "@/content";
import Link from "next/link";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const title = lang === "pt" ? "Nossa História" : "Our Story";
  const p1 = lang === "pt" 
    ? "Na Monae Dessert Studio, cada encomenda começa com uma ideia e se transforma em algo feito especialmente para você."
    : "At Monae Dessert Studio, every order begins with an idea and becomes something made especially for you.";
  const p2 = lang === "pt"
    ? "Nossos produtos são preparados artesanalmente, em pequenos lotes, com ingredientes frescos, combinações de sabores cuidadosamente escolhidas e acabamentos feitos à mão."
    : "Our desserts are handcrafted in small batches using fresh ingredients, thoughtful flavor combinations and individually finished details.";
  const p3 = lang === "pt"
    ? "Acreditamos que uma celebração merece mais do que um produto pronto de prateleira. Dos bolos personalizados aos brigadeiros e sobremesas brasileiras, cada criação Monae une o carinho do feito em casa a uma apresentação moderna e sofisticada."
    : "We believe celebrations deserve more than something simply taken from a shelf. From custom cakes to Brazilian brigadeiros and desserts, each Monae creation combines homemade warmth with a polished, modern presentation.";

  return (
    <div className="flex flex-col w-full min-h-screen bg-off-white pt-20 sm:pt-24 pb-16 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl max-w-sm mx-auto md:max-w-none">
            <img 
              src="/Imagens/confeteria03.jpeg" 
              alt="Handcrafting desserts" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-text-dark mb-6 sm:mb-8 text-center md:text-left">{title}</h1>
          <div className="space-y-4 sm:space-y-6 text-soft-text font-sans text-base sm:text-lg leading-relaxed">
            <p>{p1}</p>
            <p>{p2}</p>
            <p>{p3}</p>
          </div>
          <div className="mt-8 sm:mt-12 text-center md:text-left">
            <Link 
              href={`/${lang}/how-to-order`}
              className="inline-block w-full sm:w-auto px-8 py-4 bg-primary text-white text-center font-sans text-sm tracking-wide rounded hover:bg-deep-cherry transition-colors duration-300 shadow-md"
            >
              {dict.home.hero.ctaPrimary}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
