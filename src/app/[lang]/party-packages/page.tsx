import { getDictionary, Locale } from "@/content";
import Link from "next/link";

export default async function PartyPackagesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const title = lang === "pt" ? "Kits para Festa" : "Party Packages";
  
  return (
    <div className="flex flex-col w-full bg-cream min-h-screen pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl font-serif text-text-dark mb-6">{title}</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-border/30">
          <h2 className="text-2xl font-serif text-primary mb-2">Mini Cake + 6 Brigadeiros</h2>
          <div className="text-xl text-text-dark font-sans mb-6">$45</div>
          <ul className="text-soft-text space-y-2 font-sans text-sm list-disc list-inside">
            <li>1 mini cake</li>
            <li>1 classic brigadeiro flavor</li>
          </ul>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-border/30">
          <h2 className="text-2xl font-serif text-primary mb-2">Mini Cake + 16 Brigadeiros</h2>
          <div className="text-xl text-text-dark font-sans mb-6">$60</div>
          <ul className="text-soft-text space-y-2 font-sans text-sm list-disc list-inside">
            <li>1 mini cake</li>
            <li>Up to 2 classic brigadeiro flavors</li>
          </ul>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-border/30 md:col-span-2 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 aspect-video relative rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1550983577-9069d30da644?q=80&w=1000&auto=format&fit=crop" alt="Celebration Package" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-serif text-primary mb-2">Celebration / Monthly Baby</h2>
            <div className="text-xl text-text-dark font-sans mb-6">$100</div>
            <ul className="text-soft-text space-y-2 font-sans text-sm list-disc list-inside mb-4">
              <li>4” cake</li>
              <li>15 classic brigadeiros</li>
              <li>4 cupcakes</li>
              <li>Custom toppers for cake, cupcakes and brigadeiros</li>
            </ul>
            <p className="text-xs text-soft-text/80 italic">Serves up to approximately 5 people.</p>
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
