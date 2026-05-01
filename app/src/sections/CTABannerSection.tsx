import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";

export default function CTABannerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const subscribe = trpc.subscriber.create.useMutation({
    onSuccess: () => {
      setSubscribed(true);
      setEmail("");
    },
  });

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email });
  };

  return (
    <section ref={sectionRef} className="relative bg-[#0A1628] py-24 lg:py-32 overflow-hidden">
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C9A84C" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="reveal opacity-0 translate-y-8 transition-all duration-700 font-display text-white leading-tight mb-6"
          style={{ transitionDelay: "0.1s", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Your Voice. Your Power. Your Stage.
        </h2>

        <p
          className="reveal opacity-0 translate-y-8 transition-all duration-700 text-white/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ transitionDelay: "0.3s" }}
        >
          Your next chapter begins the moment you decide to speak. Join us today and find the speaker you were always meant to be.
        </p>

        <div
          className="reveal opacity-0 translate-y-8 transition-all duration-700 flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          style={{ transitionDelay: "0.5s" }}
        >
          <Link
            to="/login"
            className="inline-flex items-center rounded-full bg-[#C9A84C] px-8 py-4 text-sm font-bold text-[#0A1628] hover:bg-[#D4BA6A] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#C9A84C]/20"
          >
            Join Speakers Club Today
          </Link>
          <Link
            to="/chat"
            className="inline-flex items-center rounded-full border-[1.5px] border-[#C9A84C] px-8 py-4 text-sm font-semibold text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A1628] transition-all"
          >
            Try AI Speaking Coach
          </Link>
        </div>

        {/* Subscribe form */}
        <div
          className="reveal opacity-0 translate-y-8 transition-all duration-700 max-w-md mx-auto"
          style={{ transitionDelay: "0.6s" }}
        >
          <p className="text-white/40 text-sm mb-3">
            Subscribe for speaking tips and updates
          </p>
          {subscribed ? (
            <div className="rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-4 py-3">
              <p className="text-[#C9A84C] text-sm font-medium">Thanks for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20"
                required
              />
              <button
                type="submit"
                disabled={subscribe.isPending}
                className="rounded-xl bg-[#C9A84C] px-5 py-3 text-sm font-semibold text-[#0A1628] hover:bg-[#D4BA6A] transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Social proof */}
        <div
          className="reveal opacity-0 translate-y-8 transition-all duration-700 mt-8"
          style={{ transitionDelay: "0.7s" }}
        >
          <p className="text-[#C9A84C]/70 text-xs tracking-wide">
            Join 500+ members who found their voice
          </p>
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
