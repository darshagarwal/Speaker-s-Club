import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";

const comparisons = [
  { other: "Generic scripts and templates", us: "Personalized coaching for your unique voice" },
  { other: "One-size-fits-all approach", us: "Structured levels — beginner to advanced" },
  { other: "Focus only on formal speeches", us: "Real-world speaking — interviews, pitches, debates, storytelling" },
  { other: "Occasional meetups", us: "Consistent, curriculum-driven sessions" },
  { other: "No feedback system", us: "Structured, constructive feedback every session" },
  { other: "Just a hobby group", us: "A professional growth ecosystem" },
  { other: "No clear outcomes", us: "Measurable milestones and certifications" },
  { other: "Isolated learning", us: "A thriving community that grows together" },
];

export default function DifferenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F8F6F1] py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="reveal opacity-0 translate-y-8 transition-all duration-700 text-[#0A1628] text-3xl lg:text-4xl font-bold mb-4"
            style={{ transitionDelay: "0.1s" }}
          >
            Why We're Different
          </h2>
          <p
            className="reveal opacity-0 translate-y-8 transition-all duration-700 text-[#0A1628]/50 text-lg"
            style={{ transitionDelay: "0.2s" }}
          >
            We are NOT just another speaking club
          </p>
        </div>

        <div className="space-y-3">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-2 gap-4 pb-4 border-b-2 border-[#C9A84C]/20">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#0A1628]/40 pl-4">
              Other Clubs
            </div>
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C] pl-4">
              Speakers Club
            </div>
          </div>

          {comparisons.map((row, index) => (
            <div
              key={index}
              className="reveal opacity-0 translate-y-4 transition-all duration-500 grid md:grid-cols-2 gap-3 md:gap-4"
              style={{ transitionDelay: `${0.25 + index * 0.08}s` }}
            >
              <div className="flex items-start gap-3 bg-white/50 rounded-xl px-4 py-4 border border-[#0A1628]/5">
                <X className="h-4 w-4 text-[#0A1628]/30 mt-0.5 shrink-0" />
                <span className="text-[#0A1628]/50 text-sm">{row.other}</span>
              </div>
              <div className="flex items-start gap-3 bg-[#0A1628]/5 rounded-xl px-4 py-4 border border-[#C9A84C]/10">
                <Check className="h-4 w-4 text-[#C9A84C] mt-0.5 shrink-0" />
                <span className="text-[#0A1628] text-sm font-medium">{row.us}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reveal.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
