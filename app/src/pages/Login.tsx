import { useState } from "react";
import { useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { Mic, Eye, EyeOff, Loader2 } from "lucide-react";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);
  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);
  return url.toString();
}

export default function Login() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const [signinData, setSigninData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: async () => {
      await refresh();
      navigate("/");
    },
    onError: (err) => setError(err.message),
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: async () => {
      await refresh();
      navigate("/");
    },
    onError: (err) => setError(err.message),
  });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate(signinData);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (signupData.password !== signupData.confirm) {
      setError("Passwords do not match");
      return;
    }
    registerMutation.mutate({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
    });
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C]/15 mb-4">
            <Mic className="h-7 w-7 text-[#C9A84C]" />
          </div>
          <h1 className="text-white text-2xl font-bold">Speakers Club</h1>
          <p className="text-white/50 text-sm mt-1">Find your voice, own the stage</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-md border border-[#C9A84C]/15 rounded-2xl p-8">
          {/* Tabs */}
          <div className="flex mb-6 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => { setTab("signin"); setError(""); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                tab === "signin"
                  ? "bg-[#C9A84C] text-[#0A1628]"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab("signup"); setError(""); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                tab === "signup"
                  ? "bg-[#C9A84C] text-[#0A1628]"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {tab === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={signinData.email}
                  onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
                  required
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={signinData.password}
                    onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
                    required
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl bg-[#C9A84C] py-3 text-sm font-semibold text-[#0A1628] hover:bg-[#D4BA6A] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  required
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    minLength={6}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20 pr-10"
                    placeholder="At least 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={signupData.confirm}
                    onChange={(e) => setSignupData({ ...signupData, confirm: e.target.value })}
                    required
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl bg-[#C9A84C] py-3 text-sm font-semibold text-[#0A1628] hover:bg-[#D4BA6A] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {isPending ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* OAuth */}
          <button
            onClick={() => { window.location.href = getOAuthUrl(); }}
            className="w-full rounded-xl border border-white/10 py-3 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
            </svg>
            Sign in with Kimi
          </button>
        </div>
      </div>
    </div>
  );
}
