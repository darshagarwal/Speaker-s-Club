import { useEffect, useRef } from "react";
import { Target, Eye } from "lucide-react";

export default function MissionVisionSection() {
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
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F8F6F1] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Mission */}
          <div
            className="reveal opacity-0 translate-y-8 transition-all duration-700"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full border-2 border-[#C9A84C] flex items-center justify-center">
                <Target className="h-5 w-5 text-[#C9A84C]" />
              </div>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#0A1628]/60">
                Our Mission
              </span>
            </div>
            <h3 className="text-[#0A1628] text-2xl lg:text-3xl font-semibold leading-snug mb-4">
              "To empower every individual with the confidence, clarity, and communication skills to speak their truth — on any stage, in any room, at any moment."
            </h3>
          </div>

          {/* Divider */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-px bg-[#C9A84C]/30" />

          {/* Vision */}
          <div
            className="reveal opacity-0 translate-y-8 transition-all duration-700"
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full border-2 border-[#C9A84C] flex items-center justify-center">
                <Eye className="h-5 w-5 text-[#C9A84C]" />
              </div>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#0A1628]/60">
                Our Vision
              </span>
            </div>
            <h3 className="text-[#0A1628] text-2xl lg:text-3xl font-semibold leading-snug mb-4">
              "To build a generation of fearless, articulate, and influential speakers who lead conversations that matter."
            </h3>
          </div>
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
