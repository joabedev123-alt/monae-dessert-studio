import { getDictionary, Locale } from "@/content";

export default async function PoliciesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const title = lang === "pt" ? "Políticas e Cuidados" : "Policies and Care";
  
  return (
    <div className="flex flex-col w-full bg-off-white min-h-screen pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-5xl font-serif text-text-dark mb-16 text-center">{title}</h1>
        
        <div className="space-y-12">
          
          <section className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-border/30">
            <h2 className="text-2xl font-serif text-primary mb-4" id="storage">
              {lang === "pt" ? "Armazenamento & Frescor" : "Storage & Freshness"}
            </h2>
            <div className="text-soft-text font-sans space-y-4 leading-relaxed">
              <p>
                {lang === "pt" 
                  ? "Para melhor qualidade, recomendamos consumir os doces em aproximadamente 2 dias após a produção."
                  : "For best quality, enjoy sweets within approximately 2 days of production."}
              </p>
              <p>
                {lang === "pt" 
                  ? "Após o evento, mantenha os produtos restantes refrigerados."
                  : "Keep remaining sweets refrigerated."}
              </p>
              <p>
                {lang === "pt" 
                  ? "A textura e o sabor podem sofrer alterações naturais com o tempo."
                  : "Texture and flavor may naturally change over time."}
              </p>
            </div>
          </section>

          <section className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-border/30">
            <h2 className="text-2xl font-serif text-primary mb-4">
              {lang === "pt" ? "Transporte" : "Transport & Care"}
            </h2>
            <ul className="text-soft-text font-sans space-y-2 list-disc list-inside">
              <li>{lang === "pt" ? "Transporte o bolo em uma superfície plana." : "Transport cake on a flat surface."}</li>
              <li>{lang === "pt" ? "Preferencialmente no chão do veículo." : "Preferably on the vehicle floor."}</li>
              <li>{lang === "pt" ? "Mantenha o ar condicionado ligado." : "Keep air conditioning on."}</li>
              <li>{lang === "pt" ? "Dirija com cuidado." : "Drive carefully."}</li>
              <li>{lang === "pt" ? "Mantenha refrigerado dentro da caixa até pouco antes de servir." : "Keep refrigerated inside the box until shortly before serving."}</li>
              <li>{lang === "pt" ? "Evite luz solar direta e calor excessivo." : "Avoid direct sunlight and excessive heat."}</li>
            </ul>
          </section>

          <section className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-border/30">
            <h2 className="text-2xl font-serif text-primary mb-4">
              {lang === "pt" ? "Pagamento e Cancelamento" : "Payment and Cancellation"}
            </h2>
            <div className="text-soft-text font-sans space-y-4 leading-relaxed">
              <p>
                {lang === "pt" 
                  ? "É necessário um sinal para reservar a data de produção. Entre em contato para consultar as formas de pagamento disponíveis."
                  : "A deposit is required to reserve your production date. Contact us for current payment options."}
              </p>
              <p>
                {lang === "pt" 
                  ? "Como cada pedido é feito artesanalmente e especificamente para cada cliente, os termos de cancelamento e reembolso dependem da proximidade do cancelamento em relação à data agendada. Por favor, revise a política atual antes de confirmar seu pedido."
                  : "Because every order is handcrafted specifically for each client, cancellation and refund terms depend on how close the cancellation occurs to the scheduled production/pickup date. Please review the current cancellation policy before confirming your order."}
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
