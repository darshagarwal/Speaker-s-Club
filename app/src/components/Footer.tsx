import { Link } from "react-router";
import { Mic, ArrowRight } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/providers/trpc";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const subscribe = trpc.subscriber.create.useMutation({
    onSuccess: () => {
      setSubscribed(true);
      setEmail("");
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email });
  };

  return (
    <footer className="bg-[#0A1628] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A84C]/15">
                <Mic className="h-5 w-5 text-[#C9A84C]" />
              </div>
              <span className="text-lg font-bold tracking-wide text-[#D4BA6A]">
                Speakers Club
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Empowering individuals with confidence, clarity, and communication skills to speak their truth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "AI Chat", href: "/chat" },
                { label: "Join Now", href: "/login" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/50 hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              Resources
            </h4>
            <ul className="space-y-3">
              {["Public Speaking Tips", "Storytelling Guide", "Confidence Building", "Event Calendar"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-white/50 text-sm">{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              Stay Updated
            </h4>
            <p className="text-white/50 text-sm mb-4">
              Get speaking tips and event updates delivered to your inbox.
            </p>
            {subscribed ? (
              <div className="rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-4 py-3">
                <p className="text-[#C9A84C] text-sm font-medium">
                  Thanks for subscribing!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribe.isPending}
                  className="rounded-lg bg-[#C9A84C] px-3 py-2 text-[#0A1628] hover:bg-[#D4BA6A] transition-colors disabled:opacity-50"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Speakers Club. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
              <span key={item} className="text-white/30 text-xs hover:text-white/50 transition-colors cursor-pointer">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
