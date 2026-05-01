import { useEffect, useRef } from "react";
import { Shield, Sprout, Heart, Users, Star } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Courage",
    description: "We celebrate the bravery it takes to speak up",
  },
  {
    icon: Sprout,
    title: "Growth",
    description: "Every voice gets better with the right environment",
  },
  {
    icon: Heart,
    title: "Authenticity",
    description: "We train real speakers, not performers",
  },
  {
    icon: Users,
    title: "Community",
    description: "We rise by lifting each other's voices",
  },
  {
    icon: Star,
    title: "Excellence",
    description: "We hold ourselves to the highest standard of communication",
  },
];

export default function CoreValuesSection() {
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
    <section ref={sectionRef} className="bg-[#0A1628] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="reveal opacity-0 translate-y-8 transition-all duration-700 text-white text-3xl lg:text-4xl font-bold mb-4"
            style={{ transitionDelay: "0.1s" }}
          >
            What We Stand For
          </h2>
          <p
            className="reveal opacity-0 translate-y-8 transition-all duration-700 text-white/50 text-lg"
            style={{ transitionDelay: "0.2s" }}
          >
            These principles guide everything we do
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 group"
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-[#C9A84C]/15 rounded-2xl p-8 h-full hover:bg-white/8 hover:border-[#C9A84C]/30 transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-[#C9A84C]/15 flex items-center justify-center mb-5 group-hover:bg-[#C9A84C]/25 transition-colors">
                  <value.icon className="h-5 w-5 text-[#C9A84C]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
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
