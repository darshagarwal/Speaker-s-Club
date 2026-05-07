import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-[#D4BA6A] text-xl font-bold">
              Speakers Club
            </h2>

            <p className="text-white/50 text-sm mt-2">
              Empowering confident speakers and future leaders.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/"
              className="text-white/60 hover:text-[#D4BA6A] transition"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-white/60 hover:text-[#D4BA6A] transition"
            >
              About
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          © 2026 Speakers Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
}