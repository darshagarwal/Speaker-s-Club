import { useEffect, useRef } from "react";
import { Mic2, BookOpen, Hand, Volume2, Brain, Presentation, Sparkles, Zap, Award, Users, Globe, GraduationCap } from "lucide-react";

const skills = [
  { icon: Mic2, label: "Public speaking confidence" },
  { icon: BookOpen, label: "Storytelling that connects" },
  { icon: Hand, label: "Body language mastery" },
  { icon: Volume2, label: "Voice modulation & delivery" },
  { icon: Brain, label: "Debate & quick thinking" },
  { icon: Presentation, label: "Presentation skills" },
  { icon: Sparkles, label: "Handling stage fear" },
  { icon: Zap, label: "Impromptu speaking" },
];

const opportunities = [
  { icon: Mic2, label: "Regular speaking opportunities" },
  { icon: Award, label: "Competitions & showcases" },
  { icon: Users, label: "Powerful network of communicators" },
  { icon: GraduationCap, label: "Certifications & recognition" },
  { icon: Globe, label: "Real-world speaking exposure" },
];

const transformations = [
  { from: "nervous", to: "naturally confident" },
  { from: "rambling", to: "clear and structured" },
  { from: "forgettable", to: "unforgettable" },
  { from: "avoiding the spotlight", to: "owning the room" },
];

export default function WhatYouGainSection() {
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
    <section ref={sectionRef} className="bg-[#0F1D32] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="reveal opacity-0 translate-y-8 transition-all duration-700 text-white text-3xl lg:text-4xl font-bold mb-4"
            style={{ transitionDelay: "0.1s" }}
          >
            What You Gain by Joining
          </h2>
          <p
            className="reveal opacity-0 translate-y-8 transition-all duration-700 text-white/50 text-lg"
            style={{ transitionDelay: "0.2s" }}
          >
            Build skills, seize opportunities, and transform your presence
          </p>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h3
            className="reveal opacity-0 translate-y-8 transition-all duration-700 text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-8 text-center"
            style={{ transitionDelay: "0.25s" }}
          >
            Skills You'll Build
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={skill.label}
                className="reveal opacity-0 translate-y-6 transition-all duration-500 flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl px-5 py-4 hover:bg-white/8 hover:border-[#C9A84C]/20 transition-all"
                style={{ transitionDelay: `${0.3 + index * 0.06}s` }}
              >
                <skill.icon className="h-5 w-5 text-[#C9A84C] shrink-0" />
                <span className="text-white/80 text-sm font-medium">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="mb-20">
          <h3
            className="reveal opacity-0 translate-y-8 transition-all duration-700 text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-8 text-center"
            style={{ transitionDelay: "0.4s" }}
          >
            Opportunities You'll Get
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {opportunities.map((opp, index) => (
              <div
                key={opp.label}
                className="reveal opacity-0 translate-y-6 transition-all duration-500 flex flex-col items-center text-center gap-3 bg-white/5 border border-white/5 rounded-xl p-6 hover:bg-white/8 hover:border-[#C9A84C]/20 transition-all"
                style={{ transitionDelay: `${0.45 + index * 0.06}s` }}
              >
                <div className="h-10 w-10 rounded-full bg-[#C9A84C]/15 flex items-center justify-center">
                  <opp.icon className="h-5 w-5 text-[#C9A84C]" />
                </div>
                <span className="text-white/80 text-sm font-medium">{opp.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transformations */}
        <div>
          <h3
            className="reveal opacity-0 translate-y-8 transition-all duration-700 text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-8 text-center"
            style={{ transitionDelay: "0.5s" }}
          >
            Transformations You'll Experience
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {transformations.map((t, index) => (
              <div
                key={t.from}
                className="reveal opacity-0 scale-95 transition-all duration-600 relative overflow-hidden rounded-xl p-6 text-center"
                style={{
                  transitionDelay: `${0.55 + index * 0.1}s`,
                  background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(10,22,40,0.8) 100%)",
                }}
              >
                <div className="relative z-10">
                  <p className="text-white/50 text-sm mb-1">From {t.from}</p>
                  <div className="h-px w-12 bg-[#C9A84C]/30 mx-auto my-2" />
                  <p className="text-white font-semibold">to {t.to}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .reveal.animate-in {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
      `}</style>
    </section>
  );
}
