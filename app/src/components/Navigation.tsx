import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X} from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A1628]/95 shadow-lg backdrop-blur-xl"
          : "bg-[#0A1628]/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
            >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#C9A84C]/15">
              <img
                src="/images/logo.png"
                alt="Speakers Club Logo"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="text-lg font-bold tracking-wide text-[#D4BA6A]">
              Speakers Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  location.pathname === link.href
                    ? "text-[#C9A84C]"
                    : "text-white/70 hover:text-[#D4BA6A]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              to="/about"
              className="rounded-full bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-[#0A1628] hover:bg-[#D4BA6A] transition-all hover:-translate-y-0.5"
            >
              Join Community
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/80 hover:text-[#C9A84C] transition-colors"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A1628]/98 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block text-base font-medium ${
                  location.pathname === link.href
                    ? "text-[#C9A84C]"
                    : "text-white/70 hover:text-[#D4BA6A]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/10">
              <Link
                to="/about"
                className="block text-center rounded-full bg-[#C9A84C] px-5 py-3 text-sm font-semibold text-[#0A1628]"
              >
                Join Speakers Club
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}