import { getDictionary, Locale } from "@/content";
import {
  HeroSection,
  ValuesSection,
  PositioningSection,
  CategoriesSection,
  WhyMonaeSection,
  HowItWorksSection,
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
      <ValuesSection dict={dict} />
      <PositioningSection dict={dict} />
      <CategoriesSection lang={lang} dict={dict} />
      <WhyMonaeSection dict={dict} />
      <HowItWorksSection lang={lang} dict={dict} />
      <FinalCTASection lang={lang} dict={dict} />
    </div>
  );
}
