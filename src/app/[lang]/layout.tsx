import { getDictionary, Locale } from "@/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactButton } from "@/components/ui/ContactButton";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "pt" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header lang={lang} dict={dict} />
      <main className="flex-grow pt-24">{children}</main>
      <Footer lang={lang} dict={dict} />
      <ContactButton lang={lang} />
    </div>
  );
}
