import { getDictionary, Locale } from "@/content";
import { OrderBuilder } from "@/components/ui/OrderBuilder";

export default async function HowToOrderPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col w-full bg-off-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-text-dark mb-6">
            {dict.home.howItWorks.title}
          </h1>
          <p className="text-soft-text font-sans max-w-2xl mx-auto text-lg leading-relaxed">
            {lang === "pt" 
              ? "Siga os passos abaixo para personalizar o seu pedido. Preencha o formulário para enviar os detalhes iniciais da sua encomenda e retornaremos o mais breve possível com a confirmação." 
              : "Follow the steps below to customize your order. Fill out the form to send the initial details of your request, and we will get back to you as soon as possible with confirmation."}
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-24 relative">
          <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-brand-border/50 z-0" />
          
          {dict.home.howItWorks.steps.map((step: any, idx: number) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-[160px] md:max-w-[200px]">
              <div className="w-12 h-12 rounded-full bg-white border border-primary text-primary flex items-center justify-center font-sans text-sm mb-6 shadow-sm">
                {step.number}
              </div>
              <h3 className="text-lg font-serif text-text-dark">{step.title}</h3>
            </div>
          ))}
        </div>

        {/* Order Builder Form */}
        <OrderBuilder lang={lang} />
      </div>
    </div>
  );
}
