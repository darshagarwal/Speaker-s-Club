import { useEffect, useRef } from "react";
import { Link } from "react-router";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export default function About() {
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

  const contact = trpc.contact.create.useMutation();

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    contact.mutate({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      <Navigation />

      {/* Hero */}
      <div className="bg-[#0A1628] pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-white text-4xl lg:text-5xl font-bold mb-4">
            Our Story
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We started with a simple belief — that the world changes when the right people learn to speak.
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="reveal opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-[#0A1628] text-2xl lg:text-3xl font-bold mb-6">
                Why We Exist
              </h2>
              <div className="space-y-4 text-[#0A1628]/70 leading-relaxed">
                <p>
                  Too many brilliant minds stay silent because of fear, lack of training, or simply never having the right space to grow. We created this club to change that.
                </p>
                <p>
                  Whether you're a student preparing for your first presentation, a professional aiming for the corner office, or someone who simply wants to be heard — this is your stage.
                </p>
                <p>
                  Founded by a group of passionate communicators who once struggled with stage fright themselves, Speakers Club has grown into a thriving community where every voice matters.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/login"
                  className="inline-flex items-center rounded-full bg-[#C9A84C] px-6 py-3 text-sm font-semibold text-[#0A1628] hover:bg-[#D4BA6A] transition-all"
                >
                  Become a Member
                </Link>
              </div>
            </div>
            <div className="reveal opacity-0 translate-x-8 transition-all duration-1000" style={{ transitionDelay: "0.3s" }}>
              <img
                src="/images/about-group.jpg"
                alt="Speakers Club community"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#0A1628]/5 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-[#0A1628] text-2xl font-bold mb-2">Get in Touch</h2>
                <p className="text-[#0A1628]/50 mb-8">Have questions? We'd love to hear from you.</p>

                {contact.isSuccess && (
                  <div className="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3">
                    <p className="text-green-700 text-sm font-medium">Message sent successfully!</p>
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      required
                      className="w-full rounded-xl border border-[#0A1628]/10 px-4 py-3 text-sm text-[#0A1628] placeholder:text-[#0A1628]/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20"
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      required
                      className="w-full rounded-xl border border-[#0A1628]/10 px-4 py-3 text-sm text-[#0A1628] placeholder:text-[#0A1628]/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20"
                    />
                  </div>
                  <input
                    name="subject"
                    type="text"
                    placeholder="Subject (optional)"
                    className="w-full rounded-xl border border-[#0A1628]/10 px-4 py-3 text-sm text-[#0A1628] placeholder:text-[#0A1628]/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={4}
                    className="w-full rounded-xl border border-[#0A1628]/10 px-4 py-3 text-sm text-[#0A1628] placeholder:text-[#0A1628]/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={contact.isPending}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C9A84C] px-6 py-3 text-sm font-semibold text-[#0A1628] hover:bg-[#D4BA6A] transition-all disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    {contact.isPending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>

              <div className="bg-[#0A1628] p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-white font-semibold text-lg mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-[#C9A84C]/15 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Email</p>
                      <p className="text-white text-sm">hello@speakersclub.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-[#C9A84C]/15 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-white text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-[#C9A84C]/15 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Location</p>
                      <p className="text-white text-sm">123 Speaker Avenue, Downtown<br />New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .reveal.animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
      `}</style>

      <Footer />
    </div>
  );
}
