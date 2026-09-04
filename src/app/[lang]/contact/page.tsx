import { getDictionary, Locale } from "@/content";
import { Mail, Phone, MapPin } from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const title = lang === "pt" ? "Contato" : "Contact";

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

  return (
    <div className="flex flex-col w-full bg-cream min-h-screen pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <h1 className="text-6xl font-script text-primary mb-12 text-center">{title}</h1>
        
        <div className="bg-soft-blush p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-brand-border/20 text-center flex flex-col items-center gap-8">
          <p className="text-text-dark font-sans text-lg md:text-xl">
            {lang === "pt" ? "Estamos ansiosos para criar doces inesquecíveis para o seu momento especial." : "We are looking forward to creating unforgettable sweets for your special moment."}
          </p>
          
          <div className="w-16 h-px bg-primary/20"></div>

          <div className="flex flex-col items-center space-y-6 w-full">
            <a href="https://wa.me/15715258279" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-text-dark hover:text-primary transition-colors group">
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-sm">
                <WhatsAppIcon />
              </div>
              <span className="text-lg md:text-xl font-serif tracking-wide">WhatsApp (+1 571 525 8279)</span>
            </a>

            <a href="sms:+15715258279" className="flex items-center gap-4 text-text-dark hover:text-primary transition-colors group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                <Phone size={20} />
              </div>
              <span className="text-lg md:text-xl font-serif tracking-wide">{lang === "pt" ? "SMS" : "iMessage"}</span>
            </a>

            <a href="mailto:monaedessertstudio@gmail.com" className="flex items-center gap-4 text-text-dark hover:text-primary transition-colors group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                <Mail size={20} />
              </div>
              <span className="text-lg md:text-xl font-serif tracking-wide">monaedessertstudio@gmail.com</span>
            </a>

            <a href="https://www.instagram.com/monaedessertstudio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-text-dark hover:text-primary transition-colors group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                <InstagramIcon />
              </div>
              <span className="text-lg md:text-xl font-serif tracking-wide">@monaedessertstudio</span>
            </a>
          </div>

          <div className="w-16 h-px bg-primary/20 mt-4"></div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm mb-4">
              <MapPin size={16} />
              <span>{dict.footer.serving}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {dict.footer.servingAreas.map((area: string, idx: number) => (
                <span key={idx} className="bg-white text-text-dark text-sm px-4 py-2 rounded-full border border-brand-border/10">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
