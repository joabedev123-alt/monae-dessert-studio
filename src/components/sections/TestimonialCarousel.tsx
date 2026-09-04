"use client";

import { useEffect, useRef } from "react";

export function TestimonialCarousel({ dict }: { dict: any }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Check if we've reached the end
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // scroll back to beginning
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // scroll by one item width
          const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;
          scrollRef.current.scrollBy({ left: itemWidth + 24, behavior: 'smooth' }); // 24 is gap-6
        }
      }
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, []);

  if (!dict) return null;

  return (
    <section className="w-full bg-cream py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-text-dark mb-4">{dict.home.testimonials.title}</h2>
          <p className="text-primary font-script text-2xl md:text-3xl tracking-widest">{dict.home.testimonials.subheadline}</p>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar scroll-smooth"
        >
          {dict.home.testimonials.reviews.map((review: any, i: number) => (
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
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </div>
    </section>
  );
}
