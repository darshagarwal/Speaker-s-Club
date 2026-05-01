import { useEffect, useRef } from "react";
import { Link } from "react-router";

export default function PromiseSection() {
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
    <section ref={sectionRef} className="bg-[#C9A84C] py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4BA6A]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4BA6A]/15 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <blockquote
          className="reveal opacity-0 scale-95 transition-all duration-800 font-display text-[#0A1628] leading-tight mb-8"
          style={{ transitionDelay: "0.2s", fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          "We don't just teach you how to speak — we help you find what's worth saying."
        </blockquote>

        <p
          className="reveal opacity-0 translate-y-6 transition-all duration-700 text-[#0A1628]/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ transitionDelay: "0.4s" }}
        >
          Every member who walks through our doors leaves with more than just speaking skills. They leave with self-belief, a stronger presence, and a voice that commands attention.
        </p>

        <div
          className="reveal opacity-0 translate-y-6 transition-all duration-700"
          style={{ transitionDelay: "0.6s" }}
        >
          <Link
            to="/login"
            className="inline-flex items-center rounded-full bg-[#0A1628] px-8 py-3.5 text-sm font-semibold text-[#C9A84C] hover:bg-[#0F1D32] transition-all hover:-translate-y-0.5"
          >
            Join Our Community
          </Link>
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
