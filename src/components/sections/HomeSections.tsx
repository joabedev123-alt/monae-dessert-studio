import Link from "next/link";
import { Check } from "lucide-react";

export function HeroSection({ lang, dict }: { lang: string; dict: any }) {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center pt-16">
      <div className="absolute inset-0 bg-off-white z-0" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        
        <div className="w-full md:w-1/2 md:pr-12 lg:pr-24 flex flex-col items-start pt-12 md:pt-0">
          <p className="text-primary font-sans text-xs tracking-widest font-semibold uppercase mb-6">
            {dict.home.hero.eyebrow}
          </p>
          <h1 className="text-5xl lg:text-6xl font-serif text-text-dark leading-tight mb-8 whitespace-pre-line">
            {dict.home.hero.headline}
          </h1>
          <p className="text-soft-text font-sans text-lg mb-10 max-w-lg leading-relaxed">
            {dict.home.hero.subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
            <Link 
              href={`/${lang}/how-to-order`}
              className="px-8 py-4 bg-primary text-white text-center font-sans text-sm tracking-wide rounded hover:bg-deep-cherry transition-colors duration-300"
            >
              {dict.home.hero.ctaPrimary}
            </Link>
            <Link 
              href={`/${lang}/cakes`}
              className="px-8 py-4 bg-transparent border border-primary text-primary text-center font-sans text-sm tracking-wide rounded hover:bg-soft-blush transition-colors duration-300"
            >
              {dict.home.hero.ctaSecondary}
            </Link>
          </div>

          <p className="text-xs text-soft-text/80 font-sans max-w-sm leading-relaxed border-l-2 border-brand-border pl-4">
            {dict.home.hero.trustText}
          </p>
        </div>

        <div className="w-full md:w-1/2 mt-16 md:mt-0 relative min-h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-soft-blush flex items-center justify-center">
            <img 
              src="/Imagens/bolo28.jpeg" 
              alt="Custom Cake" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export function ValuesSection({ dict }: { dict: any }) {
  return (
    <section className="w-full bg-white py-12 border-b border-brand-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-center md:text-left">
        {Object.values(dict.home.values).map((value: any, idx: number) => (
          <div key={idx} className="flex items-center justify-center space-x-3 text-text-dark">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span className="font-sans text-sm tracking-widest uppercase">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PositioningSection({ dict }: { dict: any }) {
  return (
    <section className="w-full bg-cream py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-text-dark leading-tight mb-8 whitespace-pre-line">
          {dict.home.moreThanACake.title}
        </h2>
        <p className="text-lg md:text-xl font-sans text-soft-text leading-relaxed max-w-2xl mx-auto">
          {dict.home.moreThanACake.text}
        </p>
      </div>
    </section>
  );
}

export function CategoriesSection({ lang, dict }: { lang: string; dict: any }) {
  const categories = [
    { key: "customCakes", href: `/${lang}/cakes` },
    { key: "brigadeiros", href: `/${lang}/sweets` },
    { key: "brazilianDesserts", href: `/${lang}/desserts` },
    { key: "partyPackages", href: `/${lang}/party-packages` },
  ];

  return (
    <section className="w-full bg-white py-24 border-b border-brand-border/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((cat, idx) => (
            <Link key={idx} href={cat.href} className="group block">
              <div className="relative aspect-[4/5] md:aspect-[3/4] bg-soft-blush rounded-xl overflow-hidden mb-6">
                <img 
                  src={
                    cat.key === "customCakes" ? "/Imagens/bolo%2011.jpeg" :
                    cat.key === "brigadeiros" ? "/Imagens/docinhos.jpeg" :
                    cat.key === "miniDesserts" ? "/Imagens/bolo%2002.jpeg" :
                    cat.key === "brazilianDesserts" ? "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop" :
                    "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1000&auto=format&fit=crop"
                  } 
                  alt={dict.home.categories[cat.key].title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-serif text-text-dark mb-2 group-hover:text-primary transition-colors">
                {dict.home.categories[cat.key].title}
              </h3>
              <p className="text-soft-text font-sans text-sm mb-4">
                {dict.home.categories[cat.key].description}
              </p>
              <div className="text-primary font-sans text-sm tracking-widest uppercase flex items-center space-x-2">
                <span>{dict.home.categories[cat.key].explore}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyMonaeSection({ dict }: { dict: any }) {
  return (
    <section className="w-full bg-off-white py-24 border-b border-brand-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3">
          <h2 className="text-4xl md:text-5xl font-serif text-text-dark leading-tight sticky top-32">
            {dict.home.whyMonae.title}
          </h2>
        </div>
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
          {dict.home.whyMonae.items.map((item: any, idx: number) => (
            <div key={idx} className="flex flex-col">
              <div className="w-12 h-12 rounded-full bg-soft-blush text-primary flex items-center justify-center mb-6">
                <Check size={20} />
              </div>
              <h3 className="text-xl font-serif text-text-dark mb-4">{item.title}</h3>
              <p className="text-soft-text font-sans leading-relaxed text-sm md:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection({ lang, dict }: { lang: string; dict: any }) {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-serif text-text-dark text-center mb-16">
          {dict.home.howItWorks.title}
        </h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-16 relative">
          <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-brand-border/50 z-0" />
          
          {dict.home.howItWorks.steps.map((step: any, idx: number) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-[160px] md:max-w-[200px]">
              <div className="w-12 h-12 rounded-full bg-white border border-primary text-primary flex items-center justify-center font-sans text-sm mb-6">
                {step.number}
              </div>
              <h3 className="text-lg font-serif text-text-dark">{step.title}</h3>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-soft-text font-sans text-sm max-w-lg mx-auto mb-10">
            {dict.home.howItWorks.notice}
          </p>
          <Link 
            href={`/${lang}/how-to-order`}
            className="inline-block px-8 py-4 bg-primary text-white text-center font-sans text-sm tracking-wide rounded hover:bg-deep-cherry transition-colors duration-300"
          >
            {dict.home.howItWorks.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FinalCTASection({ lang, dict }: { lang: string; dict: any }) {
  return (
    <section className="w-full bg-primary text-white py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif mb-8">
          {dict.home.finalCta.title}
        </h2>
        <p className="text-lg md:text-xl font-sans text-white/90 mb-12 max-w-2xl mx-auto">
          {dict.home.finalCta.text}
        </p>
        <Link 
          href={`/${lang}/how-to-order`}
          className="inline-block px-10 py-5 bg-white text-primary text-center font-sans tracking-widest text-sm rounded hover:bg-soft-blush transition-colors duration-300 shadow-xl"
        >
          {dict.home.finalCta.button}
        </Link>
      </div>
    </section>
  );
}
