import { Link } from "react-router";
import { ArrowLeft, Mic } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C]/15 mb-6">
          <Mic className="h-8 w-8 text-[#C9A84C]" />
        </div>
        <h1 className="text-white text-6xl font-bold mb-4">404</h1>
        <p className="text-white/50 text-lg mb-8">This stage is empty. Let's get you back on track.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#C9A84C] px-6 py-3 text-sm font-semibold text-[#0A1628] hover:bg-[#D4BA6A] transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
