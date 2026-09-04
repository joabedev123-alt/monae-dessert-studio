import { getDictionary, Locale } from "@/content";
import { CatalogFlow } from "@/components/catalog/CatalogFlow";
import {
  HeroSection,
  HowItWorksSection,
  TestimonialSection,
  PoliciesSection,
  FinalCTASection,
} from "@/components/sections/HomeSections";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col w-full">
      <HeroSection lang={lang} dict={dict} />
      
      {/* Maintain essential informational sections */}
      <div id="how-to-order">
        <HowItWorksSection lang={lang} dict={dict} />
      </div>

      {/* 
        The core flow: 
        1. Date Selection 
        2. Available Products 
        3. Order Builder 
      */}
      <CatalogFlow lang={lang} />
      
      <TestimonialSection lang={lang} dict={dict} />
      
      <PoliciesSection />
      
      <div id="contact">
        <FinalCTASection lang={lang} dict={dict} />
      </div>
    </div>
  );
}
