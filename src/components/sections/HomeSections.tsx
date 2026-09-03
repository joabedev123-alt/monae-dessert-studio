import Link from "next/link";
import Image from "next/image";
import { Check, CalendarDays, CakeSlice, Palette, PlusCircle, Send } from "lucide-react";
import { TornEdge } from "@/components/ui/TornEdge";

export function HeroSection({ lang, dict }: { lang: string; dict: any }) {
  return (
    <section className="relative w-full flex items-center pt-32 pb-24 bg-off-white text-text-dark overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
        
        <div className="w-full md:w-1/2 flex flex-col items-start pt-12 md:pt-0">
          <p className="font-script text-4xl lg:text-5xl text-primary tracking-widest mb-4">
            Monae Dessert Studio
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-8 whitespace-pre-line text-text-dark">
            {lang === "en" ? "Made For\nSweet Moments" : "Feito Para\nMomentos Doces"}
          </h1>
          <p className="text-soft-text font-sans text-lg mb-10 max-w-lg leading-relaxed">
            {lang === "en" 
              ? "Our artisanal bakery combines flavor, design, and love in every single detail, bringing a premium experience to your celebration."
              : "Nossa confeitaria artesanal une sabor, design e amor em cada detalhe, trazendo uma experiência premium para a sua celebração."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
            <a 
              href="#menu"
              className="px-8 py-3 bg-primary text-white text-center font-sans font-semibold rounded-full hover:bg-deep-cherry transition-colors duration-300"
            >
              {lang === "en" ? "Explore Cakes" : "Ver Cardápio"}
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-10 md:mt-0 relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="aspect-[4/3] bg-soft-blush flex items-center justify-center relative">
            <Image 
              src="/Imagens/pedaço de bolo04.jpeg" 
              alt="Custom Cake" 
              fill
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
      <TornEdge position="bottom" fill="text-off-white" />
    </section>
  );
}

export function ValuesSection({ dict }: { dict: any }) {
  return (
    <section className="w-full bg-white py-12 border-b border-brand-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-4 text-center md:text-left">
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
    <section className="w-full bg-cream py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-text-dark leading-tight mb-8 whitespace-pre-line">
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
    <section className="w-full bg-white py-16 border-b border-brand-border/20">
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
    <section className="w-full bg-off-white py-16 border-b border-brand-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="lg:w-1/3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-text-dark leading-tight sticky top-32">
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
  const icons = [
    <CalendarDays size={24} key="cal" />,
    <CakeSlice size={24} key="cake" />,
    <Palette size={24} key="palette" />,
    <PlusCircle size={24} key="plus" />,
    <Send size={24} key="send" />
  ];

  return (
    <section className="w-full bg-off-white pt-2 pb-6 md:pt-4 md:pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-5xl font-script text-primary">
            {dict.home.howItWorks.title}
          </h2>
          <div className="hidden md:flex gap-1 items-center">
            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
            <div className="w-2 h-2 rounded-full bg-primary/70"></div>
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8 relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-brand-border/50 z-0" />
          
          {dict.home.howItWorks.steps.map((step: any, idx: number) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-[160px] md:max-w-[200px]">
              <div className="w-16 h-16 rounded-full bg-white border border-primary text-primary flex items-center justify-center font-sans text-sm mb-4">
                {icons[idx]}
              </div>
              <div className="text-primary font-bold text-sm mb-2">{step.number}</div>
              <h3 className="text-lg font-serif text-text-dark">{step.title}</h3>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block bg-blush text-primary font-medium text-sm md:text-base max-w-lg mx-auto px-6 py-4 rounded-2xl border border-primary/20 shadow-sm">
            <p>
              {dict.home.howItWorks.notice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTASection({ lang, dict }: { lang: string; dict: any }) {
  return (
    <section className="w-full bg-footer-bg text-text-dark py-16 lg:py-24 relative overflow-hidden">
      {/* Torn Edge separating from content above */}
      <TornEdge position="top" fill="text-off-white" />
      
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-white/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-8 text-text-dark">
          {dict.home.finalCta.title}
        </h2>
        <p className="text-lg md:text-xl font-sans text-soft-text mb-12 max-w-2xl mx-auto">
          {dict.home.finalCta.text}
        </p>
        <Link 
          href={`/${lang}/how-to-order`}
          className="inline-block px-10 py-5 bg-primary text-white text-center font-sans tracking-widest text-sm rounded-full hover:bg-deep-cherry transition-colors duration-300 shadow-xl"
        >
          {dict.home.finalCta.button}
        </Link>
      </div>
    </section>
  );
}

export function TestimonialSection() {
  return (
    <section className="w-full bg-cream py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="text-6xl text-primary font-serif mb-4 opacity-50">"</div>
        <p className="text-2xl md:text-4xl font-serif text-text-dark leading-relaxed italic mb-8">
          OMG!! It is PERFECT you’re so so talent, I love it. Thank you SO much
        </p>
        <div className="w-16 h-px bg-primary/30 mx-auto mb-4"></div>
        <p className="font-sans text-sm tracking-widest text-soft-text uppercase">
          Happy Client
        </p>
      </div>
    </section>
  );
}

export function PoliciesSection() {
  return (
    <section className="w-full bg-off-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column */}
          <div className="space-y-12">
            {/* Quantidade Recomendada */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-brand-border/20">
              <h3 className="text-2xl font-serif text-primary mb-2 uppercase tracking-wide">QUANTIDADE</h3>
              <p className="font-script text-3xl text-text-dark mb-6 -mt-2">recomendada doces</p>
              <p className="text-soft-text font-sans text-sm md:text-base leading-relaxed">
                As quantidades podem variar conforme o horário da festa, o tipo de evento e a forma de servir (self-service ou com garçons). 
                Para evitar imprevistos, recomendamos acrescentar cerca de 10% à quantidade total de doces e salgados.
              </p>
            </div>

            {/* Consumo e Conservação */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-brand-border/20">
              <h3 className="text-2xl font-serif text-primary mb-6 uppercase tracking-wide">CONSUMO E CONSERVAÇÃO</h3>
              <p className="text-soft-text font-sans text-sm md:text-base leading-relaxed">
                Para garantir a melhor qualidade, recomendamos consumir os doces em até 2 dias após a fabricação. 
                Após a festa, todos os doces devem ser armazenados na geladeira. Com o passar dos dias, eles podem cristalizar e perder parte de sua textura e sabor originais.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Informações Importantes */}
            <div className="bg-soft-blush p-8 md:p-10 rounded-[2rem] shadow-sm border border-primary/10">
              <h3 className="text-2xl font-serif text-primary mb-6 uppercase tracking-wide">Informações Importantes</h3>
              <div className="space-y-4 text-text-dark font-sans text-sm md:text-base leading-relaxed">
                <p>Nossa produção é artesanal e possui vagas limitadas. Recomendamos realizar sua encomenda com antecedência para garantir a disponibilidade da data.</p>
                <p>Os valores estão sujeitos a reajustes sem aviso prévio. Consulte sempre o catálogo atualizado.</p>
                <p>Todos os produtos são preparados próximos ao horário de entrega para garantir máximo frescor, sabor e qualidade.</p>
              </div>
            </div>

            {/* Pagamento */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-brand-border/20">
              <h3 className="text-2xl font-serif text-primary mb-6 uppercase tracking-wide">PAGAMENTO</h3>
              <p className="text-soft-text font-sans text-sm md:text-base leading-relaxed">
                O pedido é confirmado mediante o pagamento integral ou de um sinal de 50% no ato da encomenda.
                Aceitamos PIX, transferência bancária e cartão de crédito (com taxa da operadora).
              </p>
            </div>

            {/* Cancelamento */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-brand-border/20">
              <h3 className="text-2xl font-serif text-primary mb-6 uppercase tracking-wide">CANCELAMENTO</h3>
              <p className="text-soft-text font-sans text-sm md:text-base leading-relaxed">
                Como nossos produtos são artesanais e feitos sob encomenda, cancelamentos seguem a seguinte política:
                <br /><br />
                • Até 5 dias antes da data agendada: reembolso integral.<br />
                • Entre 5 e 3 dias: reembolso de 50%.<br />
                • Com menos de 2 dias de antecedência: não haverá reembolso, pois a produção já estará em andamento.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
