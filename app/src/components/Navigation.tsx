import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, Mic, User, LogOut, Shield, MessageSquare } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isAdmin = user?.role === "admin";

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Chat", href: "/chat" },
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
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A84C]/15 group-hover:bg-[#C9A84C]/25 transition-colors">
              <Mic className="h-5 w-5 text-[#C9A84C]" />
            </div>
            <span className="text-lg font-bold tracking-wide text-[#D4BA6A]">
              Speakers Club
            </span>
          </Link>

          {/* Desktop Nav */}
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
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-[#C9A84C] hover:text-[#D4BA6A] transition-colors"
              >
                <Shield className="h-3.5 w-3.5" />
                Admin
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-white/80">
                  <div className="h-8 w-8 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name || "User"}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-[#C9A84C]" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{user?.name || "Member"}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-white/70 hover:text-[#D4BA6A] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="rounded-full bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-[#0A1628] hover:bg-[#D4BA6A] transition-all hover:-translate-y-0.5"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/80 hover:text-[#C9A84C] transition-colors"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 text-base font-medium text-[#C9A84C]"
              >
                <Shield className="h-4 w-4" />
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/chat"
                className="flex items-center gap-2 text-base font-medium text-white/70"
              >
                <MessageSquare className="h-4 w-4" />
                AI Speaking Assistant
              </Link>
            )}
            <div className="pt-4 border-t border-white/10">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white/80">
                    <User className="h-4 w-4 text-[#C9A84C]" />
                    <span className="font-medium">{user?.name || "Member"}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="block text-center rounded-full bg-[#C9A84C] px-5 py-3 text-sm font-semibold text-[#0A1628]"
                  >
                    Join Speakers Club
                  </Link>
                  <Link
                    to="/login"
                    className="block text-center text-sm text-white/50 hover:text-white/80"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
