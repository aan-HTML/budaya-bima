"use client";

import FadeIn from "./FadeIn";

interface SejarahProps {
  messages: {
    sejarah: {
      title: string;
      items: { title: string; desc: string }[];
    };
  };
}

const icons = [Landmark, Crown, Moon, Building2];

export default function Sejarah({ messages }: SejarahProps) {
  const s = messages.sejarah;

  return (
    <section id="sejarah" className="py-24 px-6 max-w-7xl mx-auto">
      <FadeIn className="text-center mb-16">
        <h2 className="text-4xl font-serif text-[#d4af37] mb-4">{s.title}</h2>
        <div className="w-24 h-px bg-[#d4af37] mx-auto" />
      </FadeIn>

      <div className="hidden md:block relative">
        <div className="grid grid-cols-4">
          {s.items.map((item, i) =>
            i % 2 === 1 ? (
              <FadeIn key={item.title} delay={i * 0.12}>
                <div className="px-6 pb-8 text-center">
                  <h3 className="font-serif text-[#d4af37] text-base font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ) : (
              <div key={item.title} />
            )
          )}
        </div>

        <div className="relative flex items-center h-8">
          <div className="absolute inset-x-0 top-1/2 h-px bg-[#d4af37] opacity-40" />
          <div className="grid grid-cols-4 w-full relative z-10">
            {s.items.map((_, i) => (
              <div key={i} className="flex justify-center">
                <div
                  className={`w-[18px] h-[18px] rounded-full border-2 border-[#d4af37] bg-[#0d0d0d] ${
                    i % 2 === 1 ? "bg-[#d4af37]" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4">
          {s.items.map((item, i) =>
            i % 2 === 0 ? (
              <FadeIn key={item.title} delay={i * 0.12}>
                <div className="px-6 pt-8 text-center">
                  <h3 className="font-serif text-[#d4af37] text-base font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ) : (
              <div key={item.title} />
            )
          )}
        </div>
      </div>

      <div className="md:hidden flex flex-col">
        {s.items.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.1}>
            <div className={`flex gap-4 ${i < s.items.length - 1 ? "pb-7" : ""}`}>
              <div className="flex flex-col items-center w-5 flex-shrink-0">
                <div
                  className={`w-4 h-4 rounded-full border-2 border-[#d4af37] flex-shrink-0 ${
                    i % 2 === 1 ? "bg-[#d4af37]" : "bg-[#0d0d0d]"
                  }`}
                />
                {i < s.items.length - 1 && (
                  <div className="flex-1 w-px bg-[#d4af37] opacity-40 mt-1 mb-1 min-h-[24px]" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[#333] text-[9px] font-semibold tracking-widest mb-1">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-[#d4af37] text-lg font-bold mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
