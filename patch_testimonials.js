const fs = require('fs');
const path = require('path');

// 1. Update en.ts
let enPath = path.join(__dirname, 'src/content/en.ts');
let enContent = fs.readFileSync(enPath, 'utf-8');
const newReviewEn = `,
        {
          name: "Satisfied Client",
          text: "OMG!! It is PERFECT! You are so talented, I loved it. Thank you so much!",
        }
      ],`;
enContent = enContent.replace(/\s*\]\,\s*\}\,\s*finalCta:/, newReviewEn + '\n    },\n    finalCta:');
fs.writeFileSync(enPath, enContent, 'utf-8');

// 2. Update pt.ts
let ptPath = path.join(__dirname, 'src/content/pt.ts');
let ptContent = fs.readFileSync(ptPath, 'utf-8');
const newReviewPt = `,
        {
          name: "Cliente satisfeito",
          text: "Nossa!! Ficou PERFEITO! Você é muito talentosa, eu amei. Muito obrigada!",
        }
      ],`;
ptContent = ptContent.replace(/\s*\]\,\s*\}\,\s*finalCta:/, newReviewPt + '\n    },\n    finalCta:');
fs.writeFileSync(ptPath, ptContent, 'utf-8');

// 3. Update page.tsx
let pagePath = path.join(__dirname, 'src/app/[lang]/page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf-8');
pageContent = pageContent.replace(`<TestimonialSection />`, `<TestimonialSection lang={lang} dict={dict} />`);
fs.writeFileSync(pagePath, pageContent, 'utf-8');

// 4. Update HomeSections.tsx
let homePath = path.join(__dirname, 'src/components/sections/HomeSections.tsx');
let homeContent = fs.readFileSync(homePath, 'utf-8');

const oldTestimonialSection = `export function TestimonialSection() {
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
}`;

const newTestimonialSection = `export function TestimonialSection({ lang, dict }: { lang?: string; dict?: any }) {
  if (!dict) return null;

  return (
    <section className="w-full bg-cream py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-text-dark mb-4">{dict.testimonials.title}</h2>
          <p className="text-primary font-script text-2xl md:text-3xl tracking-widest">{dict.testimonials.subheadline}</p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar scroll-smooth">
          {dict.testimonials.reviews.map((review: any, i: number) => (
            <div key={i} className="snap-center shrink-0 w-full md:w-[calc(33.333%-16px)] bg-white p-8 rounded-[2rem] shadow-sm border border-brand-border/20 flex flex-col justify-between">
              <div>
                <div className="text-6xl text-primary font-serif mb-2 opacity-20">"</div>
                <p className="text-lg font-serif text-text-dark leading-relaxed italic mb-6">
                  {review.text}
                </p>
              </div>
              <div>
                <div className="w-12 h-px bg-primary/30 mb-4"></div>
                <p className="font-sans text-sm font-bold tracking-widest text-primary uppercase">
                  {review.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Style to hide scrollbar for cleaner look */}
        <style dangerouslySetInnerHTML={{__html: \`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        \`}} />
      </div>
    </section>
  );
}`;

homeContent = homeContent.replace(oldTestimonialSection, newTestimonialSection);
fs.writeFileSync(homePath, homeContent, 'utf-8');

console.log("Testimonials carousel patched successfully!");
