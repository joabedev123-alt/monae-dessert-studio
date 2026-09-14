import { getDictionary, Locale } from "@/content";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const title = lang === "pt" ? "Galeria" : "Gallery";
  
  // Real images from Imagens folder
  const images = [
    "/Imagens/bolo%2011.jpeg",
    "/Imagens/docinhos.jpeg",
    "/Imagens/bolo%20na%20caixa01.jpeg",
    "/Imagens/peda%C3%A7o%20de%20bolo.jpeg",
    "/Imagens/bolo26.jpeg",
    "/Imagens/bolo%20na%20caixa04.jpeg",
    "/Imagens/peda%C3%A7o%20de%20bolo04.jpeg",
    "/Imagens/bolo14.jpeg",
    "/Imagens/bolo%2001.jpeg"
  ];

  return (
    <div className="flex flex-col w-full bg-off-white min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-text-dark mb-4 sm:mb-6">{title}</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
        {images.map((src, i) => (
          <div key={i} className="break-inside-avoid relative rounded-xl overflow-hidden group shadow-sm">
            <img
              src={src}
              alt="Gallery item"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              loading={i < 2 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
