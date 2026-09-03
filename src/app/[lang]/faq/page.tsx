import { getDictionary, Locale } from "@/content";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const title = "FAQ";
  
  const faqs = lang === "pt" ? [
    { q: "Com quanta antecedência devo fazer meu pedido?", a: "Os pedidos geralmente devem ser feitos com pelo menos 3 dias de antecedência. A disponibilidade depende de nossa agenda de produção." },
    { q: "Vocês fazem decorações personalizadas?", a: "Sim. Nossos clientes podem compartilhar inspirações e discutir cores, estilo e detalhes decorativos." },
    { q: "Posso solicitar outro sabor?", a: "Sim. Se um sabor não estiver listado, entre em contato para discutirmos uma opção personalizada." },
    { q: "Como minha data é reservada?", a: "É necessário um sinal/pagamento de acordo com nossa política de reservas atual." },
    { q: "Vocês fazem entregas?", a: "Por favor, entre em contato com sua localização para que possamos confirmar as opções de retirada ou entrega disponíveis." },
    { q: "Como os bolos devem ser transportados?", a: "Mantenha os bolos em superfície plana, refrigerados e protegidos da luz solar direta ou calor excessivo." },
    { q: "Vocês atendem Massachusetts?", a: "Atendemos cidades selecionadas. Entre em contato com sua localização para confirmar." }
  ] : [
    { q: "How far in advance should I order?", a: "Orders should generally be placed at least 3 days in advance. Availability depends on the production schedule." },
    { q: "Do you make custom designs?", a: "Yes. Clients can share inspiration and discuss colors, style and decorative details." },
    { q: "Can I request another flavor?", a: "Yes. If a flavor is not listed, customers are encouraged to contact Monae to discuss a custom option." },
    { q: "How is my date reserved?", a: "A deposit/payment is required according to Monae's current booking policy." },
    { q: "Do you deliver?", a: "Please contact us with your location so we can confirm available pickup or delivery options." },
    { q: "How should cakes be transported?", a: "Keep cakes flat, refrigerated and protected from direct sunlight or excessive heat." },
    { q: "Do you serve Massachusetts?", a: "Selected towns are served. Contact us with your location to confirm." }
  ];

  return (
    <div className="flex flex-col w-full bg-cream min-h-screen pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <h1 className="text-5xl font-serif text-text-dark mb-16 text-center">{title}</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-brand-border/30">
              <h2 className="text-xl font-serif text-primary mb-3">{faq.q}</h2>
              <p className="text-soft-text font-sans leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
