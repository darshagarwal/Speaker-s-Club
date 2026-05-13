import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
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
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-[#0A1628] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0F1D32] via-[#0A1628] to-[#0A1628]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#C9A84C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#C9A84C]/3 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 pt-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-100"
              style={{ transitionDelay: "0.1s" }}
            >
              <span className="inline-block text-[#C9A84C] text-xs font-semibold tracking-[0.15em] uppercase">
                FIND YOUR VOICE
              </span>
            </div>

            <h1
              className="reveal opacity-0 translate-y-8 transition-all duration-700 font-display text-white leading-[1.1]"
              style={{ transitionDelay: "0.3s", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Speak with Confidence.
              <br />
              <span className="text-[#C9A84C]">Lead with Purpose.</span>
            </h1>

            <p
              className="reveal opacity-0 translate-y-8 transition-all duration-700 text-white/60 text-lg leading-relaxed max-w-lg"
              style={{ transitionDelay: "0.5s" }}
            >
              Join a community of fearless communicators who are transforming their personal and professional lives through the power of public speaking.
            </p>

            <div
              className="reveal opacity-0 translate-y-8 transition-all duration-700 flex flex-wrap gap-4"
              style={{ transitionDelay: "0.7s" }}
            >
              <Link
                to="/about"
                className="inline-flex items-center rounded-full bg-[#C9A84C] px-8 py-3.5 text-sm font-semibold text-[#0A1628] hover:bg-[#D4BA6A] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C9A84C]/20"
              >
                Join Speakers Club
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-full border-[1.5px] border-[#C9A84C] px-8 py-3.5 text-sm font-semibold text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A1628] transition-all"
              >
                Explore Programs
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          <div
            className="reveal opacity-0 translate-x-8 transition-all duration-1000 relative"
            style={{ transitionDelay: "0.6s" }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/hero-speaker.jpg"
                alt="Confident speaker on stage"
                className="w-full h-auto object-cover rounded-2xl"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-[#0A1628]/90 backdrop-blur-md border border-[#C9A84C]/20 rounded-xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                  <span className="text-[#C9A84C] text-lg font-bold">500+</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Members</p>
                  <p className="text-white/50 text-xs">Found their voice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 text-[#C9A84C] animate-bounce" />
      </div>

      <style>{`
        .reveal.animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
      `}</style>
    </section>
  );
}
